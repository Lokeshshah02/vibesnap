import React, { createContext, useContext, useEffect, useState } from "react";
import supabase from "../db/dbConfig";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    theme: "light",
  });

  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Update user state
  const updateUser = (user) => {
    setState((prev) => ({ ...prev, user }));
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  const signInWithGooglePopup = async () => {
    setIsLoading(true);
    try {
      const { user, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          skipBrowserRedirect: true,
        },
        popup: true, // This ensures OAuth is handled via popup, not a full-page redirect
      });
      if (error) throw error;

      // Return the user data after successful sign-in
      return user;
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      return null;
    } finally {
      setIsLoading(false); // Set loading state to false after the process ends
    }
  };

  // Add this to the AppContext code
  const uploadFile = async (file) => {
    try {
      const user = state.user;
      if (!user) {
        throw new Error("User not signed in");
      }

      const fileExtension = file.name.split(".").pop();
      const fileName = `${user.id}_${Date.now()}_${Math.floor(
        Math.random() * 100
      )}.${fileExtension}`;
      const { data, error } = await supabase.storage
        .from("posts") // Create a 'posts' bucket in Supabase Storage
        .upload(fileName, file);

      if (error) throw error;

      // Get the public URL for the uploaded file
      const publicUrlData = await supabase.storage
        .from("posts")
        .getPublicUrl(fileName);

      console.log(publicUrlData);

      // if (urlError) throw urlError;

      return publicUrlData; // Return the public URL of the uploaded file
    } catch (error) {
      console.error("Error uploading file to Supabase:", error);
      return null;
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession();
    setUser(session?.user || null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Monitor auth state changes
  useEffect(() => {
    const handleAuthChange = async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        const user = session.user;

        // Check if user exists in database
        const { data: users, error } = await supabase
          .from("users")
          .select()
          .eq("email", user.email);

        if (error) {
          console.error("Error fetching user from database:", error);
          return;
        }

        if (users.length === 0) {
          // Insert new user into database
          const { error: upsertError } = await supabase.from("users").upsert({
            email: user.email,
            name: user.user_metadata.full_name,
            img_url: user.user_metadata.avatar_url,
          });

          if (upsertError) {
            console.error(
              "Error inserting/updating user profile:",
              upsertError
            );
            return;
          }
        }

        // Update user state and store user info in localStorage
        updateUser(user);
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email,
            name: user.user_metadata.full_name,
            img_url: user.user_metadata.avatar_url,
          })
        );
      } else if (event === "SIGNED_OUT") {
        // Clear user state on sign-out
        updateUser(null);
        localStorage.removeItem("user");
      }
    };

    // Check the session on initial mount and subscribe to auth state changes
    const session = supabase.auth.getSession();
    if (session) {
      handleAuthChange("SIGNED_IN", session);
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session);
    });

    // Cleanup the subscription when the component is unmounted
    return () => subscription.unsubscribe();
  }, []); // Empty dependency array to ensure it runs only once

  return (
    <AppContext.Provider
      value={{
        state,
        updateUser,
        toggleTheme,
        signInWithGooglePopup,
        isLoading,
        setIsLoading,
        uploadFile,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

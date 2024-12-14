import React, { createContext, useContext, useEffect, useState } from "react";
import supabase from "../db/dbConfig";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const updateUser = (user) => {
    setState((prev) => ({ ...prev, user }));
  };

  const signInWithGooglePopup = async (navigate) => {
    setIsLoading(true);
    try {
      const { user, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          skipBrowserRedirect: true,
        },
        // options: {
        //     redirectTo: "http://localhost:5173/home",
        //   },
        popup: true,
      });
      if (error) throw error;
      navigate("/home");
      return user;
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert(`Error: ${error.message}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

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

      return publicUrlData; // Return the public URL of the uploaded file
    } catch (error) {
      console.error("Error uploading file to Supabase:", error);
      return null;
    }
  };

  useEffect(() => {
    const handleAuthChange = async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        let user = session.user;

        const { data: existingData } = await supabase
          .from("users")
          .select("id, email, google_id, name, img_url, bio, cover_url")
          .eq("email", user.email)
          .limit(1)
          .single();

        if (existingData) {
          user = {
            ...user,
            dbId: existingData.id,
            bio: existingData.bio,
            cover_url: existingData?.cover_url,
            user_metadata: {
              ...user.user_metadata,
              avatar_url: existingData.img_url,
              full_name: existingData.name,
            },
          };
        }

        const { data: users } = await supabase
          .from("users")
          .select("id")
          .eq("email", user.email)
          .eq("google_id", user.id);

        if (!users?.length) {
          const { error: upsertError } = await supabase.from("users").upsert({
            email: user.email,
            name: user.user_metadata.full_name,
            img_url: user.user_metadata.avatar_url,
            google_id: user.id,
          });

          if (upsertError) {
            console.error(
              "Error inserting/updating user profile:",
              upsertError
            );
            return;
          }
        }

        updateUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } else if (event === "SIGNED_OUT") {
        updateUser(null);
        localStorage.removeItem("user");
      }
    };

    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        await handleAuthChange("SIGNED_IN", session);
      } else if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        updateUser(user);
      }

      const { data: subscription } = supabase.auth.onAuthStateChange(
        (event, session) => {
          handleAuthChange(event, session);
        }
      );

      return () => subscription.unsubscribe();
    };

    initializeAuth();
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        updateUser,
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

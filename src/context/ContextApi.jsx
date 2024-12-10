import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig"; // Make sure this is correctly imported

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    theme: "light",
  });
  const [currentUser, setCurrentUser] = useState(null); // Current user state

  // Update the user in state
  const updateUser = (user) => setState((prev) => ({ ...prev, user }));

  // Toggle theme (light/dark)
  const toggleTheme = () =>
    setState((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));

  // Google Auth provider setup
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  // Sign in with Google popup
  const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  // Sign out function
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setCurrentUser(null);
      })
      .catch((error) => {
        console.error("Sign out error: ", error);
      });
  };

  // Monitor the user's auth state (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        updateUser(user); // Set user info in context state
      } else {
        setCurrentUser(null);
        updateUser(null); // Clear user info when logged out
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        updateUser,
        toggleTheme,
        signInWithGooglePopup,
        currentUser,
        setCurrentUser,
        signOutUser,
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

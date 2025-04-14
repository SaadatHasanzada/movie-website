import { createContext, useContext, useEffect, useState } from "react";

import { authService } from "../services/supabase";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isUserUpdated?: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isUserUpdated: false,
  isLoading: true
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = authService.onAuthStateChanged((session, event) => {
      // console.log("Auth State Change:", { event, session });
      setIsAuthenticated(!!session);

      if (event === "USER_UPDATED" || event === "SIGNED_IN") {
        setIsUserUpdated(true);

        // Reset flag after a short delay
        const timer = setTimeout(() => {
          setIsUserUpdated(false);
        }, 2000);

        return () => clearTimeout(timer);
      }

      setIsLoading(false);
    });

    // Cleanup subscription
    return () => {
      unsubscribe.unsubscribe();
    };
  }, []);

  const value = {
    isAuthenticated,
    isUserUpdated,
    isLoading
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

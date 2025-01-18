import { createContext, useContext, useEffect, useState } from "react";

import { authService } from "../services/supabase";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Check initial authentication state
        const authenticated = await authService.isAuthenticated();
        if (mounted) {
          setIsAuthenticated(authenticated);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        if (mounted) {
          setIsAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Set up auth state listener
    const unsubscribe = authService.onAuthStateChanged((session) => {
      if (mounted) {
        setIsAuthenticated(!!session);
        setIsLoading(false);
      }
    });

    // Check initial auth state
    initializeAuth();

    // Cleanup subscription and mounted flag
    return () => {
      mounted = false;
      unsubscribe.unsubscribe();
    };
  }, []);

  const value = {
    isAuthenticated,
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

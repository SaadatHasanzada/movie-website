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
    const checkAuth = async () => {
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    // Set up auth listener
    const unsubscribe = authService.onAuthStateChanged((session) => {
      setIsAuthenticated(!!session); // Convert session to boolean
      setIsLoading(false);
    });
    checkAuth();
    // Set up auth listener
    // Cleanup subscription on unmount
    return () => {
      unsubscribe.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

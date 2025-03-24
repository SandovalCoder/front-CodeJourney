import { useContext } from "react";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";

// Custom hook para acceder al contexto de autenticación
export const useAuth = (): AuthContextType & {
  isAuthenticated: boolean;
  isInitialized: boolean;
} => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }

  return {
    ...context,
    isAuthenticated: context.status === "authenticated",
    isInitialized: context.status !== "loading",
  };
};

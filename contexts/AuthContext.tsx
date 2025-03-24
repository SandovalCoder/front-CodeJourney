"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import {
  loginUser as loginService,
  registerUser as registerService,
  getUserProfile as getUserProfileService,
  updateUser as updateUserService,
} from "../services/userService";
import { User } from "../types/user";
import { toast } from "sonner";
import { LoginResponse } from "@/types/LoginResponse";

export type AuthStatus = "authenticated" | "unauthenticated" | "loading";

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  status: AuthStatus;
  error: string | null;
  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (userData: Partial<User>) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  logoutUser: () => void;
  refreshUserProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  status: "loading",
  error: null,
  loginUser: async () => false,
  registerUser: async () => false,
  updateUser: async () => false,
  logoutUser: () => {},
  refreshUserProfile: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  // Recupera el perfil de usuario usando el token almacenado
  const fetchProfile = useCallback(async (token: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const profile = await getUserProfileService(token);
      
      if (profile) {
        setUser(profile);
        setStatus("authenticated");
      } else {
        // Si no hay perfil, limpiamos todo
        setUser(null);
        setStatus("unauthenticated");
        localStorage.removeItem("token");
        toast.error("Sesión expirada");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUser(null);
      setStatus("unauthenticated");
      setError("Error al obtener el perfil");
      localStorage.removeItem("token");
      toast.error("Error al obtener el perfil");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await fetchProfile(token);
    }
  };

  // Inicialización del estado de autenticación
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await fetchProfile(token);
        } else {
          setStatus("unauthenticated");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error during initialization:", error);
        setStatus("unauthenticated");
        setIsLoading(false);
        localStorage.removeItem("token");
      }
    };

    initializeAuth();
  }, [fetchProfile]);

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await loginService(email, password);

      // Verificar si hay error en la respuesta
      if ('error' in response) {
        setError(response.error);
        toast.error(response.error);
        return false;
      }

      // Si no hay error, la respuesta es LoginResponse
      const { token, user } = response as LoginResponse;
      if (token && user) {
        localStorage.setItem("token", token);
        setUser(user);
        setStatus("authenticated");
        toast.success("Inicio de sesión exitoso");
        return true;
      }

      setError("Error inesperado al iniciar sesión");
      toast.error("Error inesperado al iniciar sesión");
      return false;
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setError("Error al conectar con el servidor");
      toast.error("Error al conectar con el servidor");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (userData: Partial<User>): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await registerService(userData);
      if (res) {
        toast.success("Registro exitoso");
        return true;
      } else {
        setError("Error en el registro");
        toast.error("Error al registrar usuario");
        return false;
      }
    } catch (error) {
      setError("Error en el registro");
      toast.error("Error al registrar usuario");
      console.error("Error en el registro:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      
      if (!token || !user?._id) {
        toast.error("Sesión expirada");
        return false;
      }

      const updatedUser = await updateUserService(token, user._id, userData);
      
      if (updatedUser) {
        setUser(updatedUser);
        toast.success("Perfil actualizado exitosamente");
        return true;
      } else {
        setError("Error al actualizar el perfil");
        toast.error("Error al actualizar el perfil");
        return false;
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Error al actualizar el perfil");
      toast.error("Error al actualizar el perfil");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    setStatus("unauthenticated");
    setError(null);
    toast.success("Sesión cerrada exitosamente");
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        isLoading, 
        status, 
        error,
        loginUser, 
        registerUser, 
        updateUser,
        logoutUser,
        refreshUserProfile 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const Protected = ({ children, redirectTo = "/login" }: ProtectedProps) => {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isInitialized, isAuthenticated, router, redirectTo]);

  // Mostrar un loader mientras se inicializa
  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Si está autenticado, mostrar el contenido protegido
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Si no está autenticado, no mostrar nada mientras se redirige
  return null;
};

export default Protected;

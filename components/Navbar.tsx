"use client";
import React, { useState } from "react";
import { LogIn, UserPlus, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Profile from "@/components/auth/Profile";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logoutUser, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/login");
  };

  // Manejo seguro de la información del usuario
  const getUserInfo = () => {
    if (!user) return { fullName: "", email: "", initial: "" };
    
    const fullName = `${user.name || ""} ${user.lastName || ""}`.trim();
    return {
      fullName: fullName || "Usuario",
      email: user.email || "",
      initial: fullName ? fullName.charAt(0).toUpperCase() : "U"
    };
  };

  const { fullName, email, initial } = getUserInfo();

  // Si está cargando, mostrar un skeleton loader
  if (isLoading) {
    return (
      <nav className="fixed w-full bg-gradient-to-r from-codePrimary to-codeSecondary text-white z-50 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <Image src="/logo.png" alt="logo" width={40} height={40} />
                <span className="text-xl font-bold tracking-wide">CodeJourney</span>
              </Link>
            </div>
            <div className="animate-pulse bg-white/20 h-8 w-8 rounded-full"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed w-full bg-gradient-to-r from-codePrimary to-codeSecondary text-white z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="logo" width={40} height={40} />
              <span className="text-xl font-bold tracking-wide">CodeJourney</span>
            </Link>
          </div>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/">Inicio</Link>
            <Link href="/posts">Posts</Link>
            <Link href="/about">Acerca de</Link>

            <div className="h-6 w-px bg-white"></div>

            {isAuthenticated ? (
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>{initial}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {fullName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {email}
                        </p>
                      </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onSelect={() => setIsProfileOpen(true)}>
                      Perfil
                      <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onSelect={handleLogout}>
                      Cerrar sesión
                      <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link href="/register" passHref>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 hover:text-codeSecondary"
                  >
                    <UserPlus size={20} />
                    <span>Registrarse</span>
                  </Button>
                </Link>
                <Link href="/login" passHref>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 hover:text-codeSecondary"
                  >
                    <LogIn size={20} />
                    <span>Login</span>
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Botón hamburguesa (mobile) */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir menú"
              className="focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Menú mobile estilo Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-r from-codePrimary to-codeSecondary shadow-xl transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col space-y-4">
          {/* Botón para cerrar Drawer */}
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="self-end text-white"
          >
            <X size={24} />
          </Button>

          {/* Enlaces mobile */}
          <Link href="/" passHref>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-lg hover:text-codeSecondary"
              onClick={() => setIsOpen(false)}
            >
              <span>Inicio</span>
            </Button>
          </Link>
          <Link href="/posts" passHref>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-lg hover:text-codeSecondary"
              onClick={() => setIsOpen(false)}
            >
              <span>Posts</span>
            </Button>
          </Link>
          <Link href="/about" passHref>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-lg hover:text-codeSecondary"
              onClick={() => setIsOpen(false)}
            >
              <span>Acerca de</span>
            </Button>
          </Link>

          <div className="h-px bg-gray-500"></div>

          {isAuthenticated ? (
            <>
              <div className="flex items-center space-x-3 px-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>{initial}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{fullName}</p>
                  <p className="text-xs text-gray-300">{email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-lg hover:text-codeSecondary"
                onClick={() => {
                  setIsProfileOpen(true);
                  setIsOpen(false);
                }}
              >
                <span>Perfil</span>
              </Button>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-lg hover:text-codeSecondary"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                <span>Cerrar sesión</span>
              </Button>
            </>
          ) : (
            <>
              <Link href="/register" passHref>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-lg hover:text-codeSecondary"
                  onClick={() => setIsOpen(false)}
                >
                  <UserPlus size={20} />
                  <span>Registrarse</span>
                </Button>
              </Link>
              <Link href="/login" passHref>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-lg hover:text-codeSecondary"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Diálogo de Profile */}
      <Profile open={isProfileOpen} onOpenChange={setIsProfileOpen} />
    </nav>
  );
};

export default Navbar;

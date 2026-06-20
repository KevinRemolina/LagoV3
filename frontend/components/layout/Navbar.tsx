"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
    { name: "Especialistas", path: "/especialistas" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Droplets className="h-8 w-8 text-primary" />
              <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                Lago Spa
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className="text-muted-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
                >
                  {route.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Button className="font-semibold shadow-md">Agendar Cita</Button>
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="md:hidden p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú principal</span>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="font-heading text-left flex items-center gap-2">
                    <Droplets className="h-6 w-6 text-primary" />
                    Lago Spa
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  {routes.map((route) => (
                    <Link
                      key={route.path}
                      href={route.path}
                      onClick={() => setIsOpen(false)}
                      className="text-foreground hover:text-primary block px-3 py-2 text-base font-medium transition-colors"
                    >
                      {route.name}
                    </Link>
                  ))}
                  <div className="mt-4 px-3">
                    <Button className="w-full font-semibold">Agendar Cita</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

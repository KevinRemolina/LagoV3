"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  ChevronDown,
  Sparkles,
  Waves,
  HeartPulse,
  Flower2,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Facial",
    path: "/servicios/facial",
    description: "Tratamientos de renovación y cuidado facial",
    icon: Sparkles,
  },
  {
    name: "Corporal",
    path: "/servicios/corporal",
    description: "Bienestar y estética corporal",
    icon: Waves,
  },
  {
    name: "Salud",
    path: "/servicios/salud",
    description: "Quiropraxia y bienestar integral",
    icon: HeartPulse,
  },
  {
    name: "Spa",
    path: "/servicios/spa",
    description: "Relajación y experiencias premium",
    icon: Flower2,
  },
];

const routes = [
  { name: "Inicio", path: "/" },
  { name: "Especialistas", path: "/especialistas" },
  { name: "Contacto", path: "/contacto" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/assets/LogoPrincipal.avif"
                alt="Lago Spa Logo"
                width={160}
                height={50}
                className="object-contain h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Navegación Desktop */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <nav className="flex items-center space-x-10">
              <Link
                href="/"
                className="text-foreground/80 hover:text-foreground transition-colors text-xs uppercase tracking-[0.2em] font-semibold"
              >
                Inicio
              </Link>

              {/* Dropdown de Servicios */}
              <DropdownMenu>
                <DropdownMenuTrigger className="group flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors text-xs uppercase tracking-[0.2em] font-semibold outline-none">
                  Tratamientos
                  <ChevronDown className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  sideOffset={24}
                  className="w-80 p-6 rounded-none border border-border/30 shadow-2xl bg-background"
                >
                  <Link
                    href="/servicios"
                    className="block text-center text-xs uppercase tracking-widest font-semibold text-foreground mb-6 hover:text-primary transition-colors"
                  >
                    Ver todos los tratamientos
                  </Link>
                  <div className="h-px bg-border/30 mb-6" />
                  <div className="flex flex-col gap-6">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <Link
                          key={category.path}
                          href={category.path}
                          className="group flex items-start gap-4 text-left transition-colors"
                        >
                          <Icon className="h-5 w-5 mt-0.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" strokeWidth={1} />
                          <div className="flex flex-col">
                            <span className="text-sm font-heading font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                              {category.name}
                            </span>
                            <span className="text-xs font-serif text-muted-foreground">
                              {category.description}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {routes.slice(1).map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className="text-foreground/80 hover:text-foreground transition-colors text-xs uppercase tracking-[0.2em] font-semibold"
                >
                  {route.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center justify-end">
            <a href="https://wa.me/573113118625" target="_blank" rel="noopener noreferrer" className="border border-foreground px-6 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-foreground hover:text-background transition-colors duration-300">
              Agendar Cita
            </a>
          </div>

          {/* Navegación Mobile */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="p-2 -mr-2 text-foreground/80 hover:text-foreground transition-colors">
                <Menu className="h-6 w-6" strokeWidth={1.5} />
                <span className="sr-only">Menú</span>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-[400px] p-0 border-l-0 bg-background"
              >
                <div className="flex flex-col h-full px-6 py-8">
                  <SheetHeader className="mb-12 text-left">
                    <SheetTitle>
                      <Image
                        src="/assets/LogoPrincipal.avif"
                        alt="Lago Spa Logo"
                        width={140}
                        height={40}
                        className="object-contain h-10 w-auto"
                      />
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-8">
                    <Link
                      href="/"
                      onClick={() => setIsOpen(false)}
                      className="text-foreground font-heading text-3xl font-light hover:text-primary transition-colors"
                    >
                      Inicio
                    </Link>

                    {/* Acordeón de Servicios Mobile */}
                    <div className="border-b border-border/30 pb-8">
                      <button
                        onClick={() => setIsServicesExpanded((prev) => !prev)}
                        className="w-full flex items-center justify-between text-foreground font-heading text-3xl font-light hover:text-primary transition-colors text-left"
                      >
                        Colecciones
                        <ChevronDown
                          className={cn(
                            "h-6 w-6 transition-transform duration-500",
                            isServicesExpanded && "rotate-180"
                          )}
                          strokeWidth={1}
                        />
                      </button>

                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-500 ease-in-out",
                          isServicesExpanded ? "max-h-[500px] opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"
                        )}
                      >
                        <div className="flex flex-col gap-6 pl-4 border-l border-border/30">
                          <Link
                            href="/servicios"
                            onClick={() => setIsOpen(false)}
                            className="text-sm uppercase tracking-widest font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            Ver todas
                          </Link>
                          {categories.map((category) => {
                            return (
                              <Link
                                key={category.path}
                                href={category.path}
                                onClick={() => setIsOpen(false)}
                                className="text-foreground/80 font-serif text-lg hover:text-primary transition-colors"
                              >
                                {category.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {routes.slice(1).map((route) => (
                      <Link
                        key={route.path}
                        href={route.path}
                        onClick={() => setIsOpen(false)}
                        className="text-foreground font-heading text-3xl font-light hover:text-primary transition-colors"
                      >
                        {route.name}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-auto pt-12">
                    <a
                      href="https://wa.me/573113118625"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center w-full border border-foreground bg-foreground text-background py-5 text-sm uppercase tracking-widest font-semibold hover:bg-transparent hover:text-foreground transition-colors duration-300"
                    >
                      Agendar Valoración
                    </a>
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
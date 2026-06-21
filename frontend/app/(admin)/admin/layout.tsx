"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Sparkles, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut,
  Droplets,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Toaster } from "sonner";
import { Badge } from "@/components/ui/badge";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Servicios", href: "/admin/servicios", icon: Sparkles },
  { name: "Especialistas", href: "/admin/especialistas", icon: Users },
  { name: "Mensajes", href: "/admin/mensajes", icon: MessageSquare },
  { name: "Configuración", href: "#", icon: Settings, isWip: true },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 text-primary-foreground">
          <Droplets className="h-8 w-8 text-primary" />
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">
            Lago Spa Admin
          </span>
        </Link>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-2">
        {sidebarLinks.map((link) => {
          const isActive = pathname.startsWith(link.href) && link.href !== "#";
          
          if (link.isWip) {
            return (
              <div
                key={link.name}
                className="flex flex-col gap-1 px-4 py-3 rounded-xl transition-colors font-medium text-muted-foreground opacity-60 cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-primary ml-8">Próximamente</span>
              </div>
            );
          }

          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10">
          <LogOut className="w-5 h-5 mr-3" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/20 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 z-50">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 bg-card border-b border-border px-4 h-16 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Droplets className="h-6 w-6 text-primary" />
            <span className="font-heading font-bold text-foreground">
              Admin
            </span>
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="p-2 -mr-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <SheetHeader className="sr-only">
                <SheetTitle>Menú Administrativo</SheetTitle>
              </SheetHeader>
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 lg:p-10">
          {children}
        </main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}

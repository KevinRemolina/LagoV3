"use client";

import * as React from "react";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-full border border-transparent transition-all duration-300",
          className
        )}
        disabled
      >
        <span className="sr-only">Cambiar tema</span>
        <Moon className="h-4 w-4" strokeWidth={1} />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-500",
        isDark 
          ? "bg-foreground/5 text-foreground hover:bg-foreground/10 border-border/30" 
          : "text-foreground/70 hover:text-foreground hover:bg-black/5",
        className
      )}
      aria-label="Alternar modo oscuro"
    >
      <Moon 
        className={cn(
          "h-4 w-4 transition-all duration-500",
          isDark ? "scale-100 opacity-100" : "scale-90 opacity-70 group-hover:scale-100 group-hover:opacity-100"
        )} 
        strokeWidth={isDark ? 1.5 : 1} 
      />
    </button>
  );
}

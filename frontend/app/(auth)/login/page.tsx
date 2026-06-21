import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Droplets } from "lucide-react"
import Image from "next/image"
import { login } from "./actions"

export default async function LoginPage(props: { searchParams: Promise<{ message?: string }> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4 relative overflow-hidden">
      {/* Subtle Background Image */}
      <div className="absolute inset-0 z-0 opacity-[0.08] dark:opacity-[0.12] pointer-events-none">
        <Image 
          src="/assets/MainBackgroundLight.webp" 
          alt="Texture" 
          fill 
          className="object-cover" 
          priority
        />
      </div>

      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-2xl shadow-xl border border-border relative z-10">
        <div className="text-center flex flex-col items-center">
          <Image 
            src="/assets/LogoPrincipal.avif" 
            alt="Lago Spa Logo" 
            width={160} 
            height={50} 
            className="object-contain h-12 w-auto"
          />
          <h2 className="mt-6 font-heading text-3xl font-bold text-foreground">
            Acceso Administrativo
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Panel exclusivo para personal de Lago Spa.
          </p>
        </div>
        
        {searchParams?.message && (
          <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20 text-center font-medium">
            {searchParams.message}
          </div>
        )}

        <form className="mt-8 space-y-6" action={login}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium">Correo Electrónico</label>
              <Input id="email" name="email" type="email" required className="mt-1" placeholder="admin@lagospa.com" />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium">Contraseña</label>
              <Input id="password" name="password" type="password" required className="mt-1" />
            </div>
          </div>
          <Button type="submit" className="w-full h-12 text-base font-semibold">
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  )
}

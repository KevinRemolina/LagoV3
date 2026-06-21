import Link from "next/link";
import { Droplets, MapPin, Phone, Mail } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export async function Footer() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const staffLink = user ? "/admin/dashboard" : "/login";
  const staffText = user ? "Ir al Dashboard" : "Acceso Staff";

  return (
    <footer className="bg-foreground text-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-primary-foreground">
              <Droplets className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold tracking-tight">
                Lago Spa
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Tu santuario de paz y belleza. Especialistas en tratamientos estéticos, relajación y salud corporal integral.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="https://www.instagram.com/lagospaesteticasalud" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Instagram
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=61577780604356" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Facebook
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-primary-foreground">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/servicios" className="text-muted-foreground hover:text-primary transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/especialistas" className="text-muted-foreground hover:text-primary transition-colors">
                  Especialistas
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-primary-foreground">Tratamientos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/servicios/facial" className="text-muted-foreground hover:text-primary transition-colors">
                  Estética Facial
                </Link>
              </li>
              <li>
                <Link href="/servicios/corporal" className="text-muted-foreground hover:text-primary transition-colors">
                  Estética Corporal
                </Link>
              </li>
              <li>
                <Link href="/servicios/spa" className="text-muted-foreground hover:text-primary transition-colors">
                  Spa & Relajación
                </Link>
              </li>
              <li>
                <Link href="/servicios/salud" className="text-muted-foreground hover:text-primary transition-colors">
                  Salud y Bienestar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-primary-foreground">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>
                  Cra. 14 #11-88, Sogamoso, Boyacá <br />
                </span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <span>+57 311 311 8625</span>
                  <span>+57 314 341 1955</span>
                  <span>+57 313 510 5205</span>
                </div>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>contacto@lagospa.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lago Spa · Estética · Salud. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacidad" className="hover:text-primary transition-colors">Política de Privacidad</Link>
            <Link href="/terminos" className="hover:text-primary transition-colors">Términos de Servicio</Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href={staffLink} className="hover:text-primary transition-colors flex items-center gap-1 opacity-70 hover:opacity-100">
              {staffText}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

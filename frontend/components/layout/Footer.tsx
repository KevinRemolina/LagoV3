import Link from "next/link";
import { Droplets, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
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
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Instagram
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
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
              <li>
                <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">
                  Portal Administrativo
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
                  Av. Principal 123, Centro Comercial Plaza<br />
                  Ciudad, Estado
                </span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
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
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/privacidad" className="hover:text-primary transition-colors">Política de Privacidad</Link>
            <Link href="/terminos" className="hover:text-primary transition-colors">Términos de Servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

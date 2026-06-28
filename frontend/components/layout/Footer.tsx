import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export async function Footer() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const staffLink = user ? "/admin/dashboard" : "/login";
  const staffText = user ? "Ir al Dashboard" : "Acceso Staff";

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Columna 1: Brand & About */}
          <div className="flex flex-col gap-8 pr-0 lg:pr-8">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/LogoPrincipal.avif"
                alt="Lago Spa Logo"
                width={160}
                height={50}
                className="object-contain h-10 w-auto opacity-90"
                priority
              />
            </Link>
            <p className="text-sm font-light text-background/80 leading-relaxed">
              Santuario de paz y belleza. Especialistas en estética, relajación y salud corporal integral.
            </p>
            <div className="flex gap-6 pt-4">
              <Link href="https://www.instagram.com/lagospaesteticasalud" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest text-background/60 hover:text-white transition-colors">
                Instagram
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=61577780604356" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest text-background/60 hover:text-white transition-colors">
                Facebook
              </Link>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-background/40 mb-8 font-semibold">Descubrir</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/servicios" className="text-sm font-light text-background/80 hover:text-white transition-colors">
                  Tratamientos
                </Link>
              </li>
              <li>
                <Link href="/especialistas" className="text-sm font-light text-background/80 hover:text-white transition-colors">
                  Especialistas
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm font-light text-background/80 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Colecciones */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-background/40 mb-8 font-semibold">Colecciones</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/servicios/facial" className="text-sm font-light text-background/80 hover:text-white transition-colors">
                  Estética Facial
                </Link>
              </li>
              <li>
                <Link href="/servicios/corporal" className="text-sm font-light text-background/80 hover:text-white transition-colors">
                  Estética Corporal
                </Link>
              </li>
              <li>
                <Link href="/servicios/spa" className="text-sm font-light text-background/80 hover:text-white transition-colors">
                  Spa & Relajación
                </Link>
              </li>
              <li>
                <Link href="/servicios/salud" className="text-sm font-light text-background/80 hover:text-white transition-colors">
                  Salud Integral
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-background/40 mb-8 font-semibold">Ubicación & Contacto</h3>
            <ul className="flex flex-col gap-6 text-sm font-light text-background/80">
              <li className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-background/40 shrink-0 mt-0.5" strokeWidth={1} />
                <div>
                  Cra. 14 #11-88<br />
                  Sogamoso, Boyacá
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="w-4 h-4 text-background/40 shrink-0 mt-0.5" strokeWidth={1} />
                <div className="flex flex-col gap-2">
                  <span>+57 311 311 8625</span>
                  <span>+57 314 341 1955</span>
                  <span>+57 313 510 5205</span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-background/40 shrink-0" strokeWidth={1} />
                <span>contacto@lagospa.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-light text-background/50 tracking-wide">
            © {new Date().getFullYear()} Lago Spa. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-light text-background/50">
            <Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
            <Link href="/terminos" className="hover:text-white transition-colors">Términos de Servicio</Link>
            <span className="text-background/20 hidden sm:inline-block">|</span>
            <Link href={staffLink} className="hover:text-white transition-colors flex items-center gap-1">
              {staffText}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

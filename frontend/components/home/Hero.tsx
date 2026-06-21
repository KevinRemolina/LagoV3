import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export async function Hero() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('settings').select('*').eq('key', 'whatsapp_primary').single();
  let defaultPhone = "573113118625"; // Fallback
  if (settings?.value) {
    const rawWa = typeof settings.value === 'string' ? settings.value : String(settings.value);
    defaultPhone = rawWa.replace(/[^0-9]/g, '');
  }

  const waMessage = encodeURIComponent("Hola, me gustaría agendar una cita de valoración o recibir más información.");

  return (
    <section className="relative overflow-hidden bg-background pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24 lg:pb-32">
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

      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-secondary/30 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary-foreground">Tu oasis de relajación y salud</span>
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Renueva tu cuerpo,<br />
              <span className="text-primary">armoniza tu mente.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 md:text-xl leading-relaxed max-w-lg">
              Expertos en tratamientos estéticos avanzados, spa terapéutico y bienestar integral en un entorno diseñado exclusivamente para tu tranquilidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={`https://wa.me/${defaultPhone}?text=${waMessage}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={buttonVariants({ size: "lg", className: "h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all" })}
              >
                Agendar tu cita
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <Link 
                href="/servicios" 
                className={buttonVariants({ variant: "outline", size: "lg", className: "h-12 px-8 text-base font-semibold border-primary text-primary hover:bg-primary/5" })}
              >
                Ver tratamientos
              </Link>
            </div>
            
            <div className="mt-10 flex items-center gap-8 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <span>Especialistas certificados</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <span>Tecnología avanzada</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-primary/20">
              {/* Placeholder image */}
              <div className="absolute inset-0 bg-secondary flex items-center justify-center text-primary-foreground">
                <span className="font-heading text-xl opacity-50">[Imagen Principal del Spa]</span>
              </div>
              <Image
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
                alt="Tratamiento de Spa relajante"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-background p-4 shadow-xl border border-border/50 hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden">
                      {/* Avatar placeholder */}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-foreground">+1,000</p>
                  <p className="text-xs text-muted-foreground">Clientes felices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

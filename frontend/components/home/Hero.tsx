import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import BlurFade from "@/components/ui/blur-fade";

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
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
          alt="LAGO Spa - Santuario de bienestar"
          fill
          className="object-cover"
          priority
        />
        {/* Gradiente sutil para legibilidad */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center mt-20">
        <BlurFade delay={0.1} inView={false}>
          <p className="uppercase tracking-[0.3em] text-white/80 text-xs md:text-sm font-semibold mb-6">
            Un santuario para tu bienestar
          </p>
        </BlurFade>
        
        <BlurFade delay={0.3} inView={false}>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] max-w-5xl">
            Renueva tu cuerpo,<br />
            armoniza tu mente.
          </h1>
        </BlurFade>
        
        <BlurFade delay={0.5} inView={false}>
          <p className="text-white/80 font-serif text-lg md:text-xl max-w-2xl mb-12">
            Descubre el equilibrio perfecto entre estética avanzada y relajación profunda en un entorno diseñado exclusivamente para ti.
          </p>
        </BlurFade>

        <BlurFade delay={0.7} inView={false}>
          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href={`https://wa.me/${defaultPhone}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white bg-white text-black px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-transparent hover:text-white transition-colors duration-300"
            >
              Agendar Valoración
            </a>
            <Link
              href="/servicios"
              className="border border-white/50 text-white px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black hover:border-white transition-colors duration-300"
            >
              Nuestras Colecciones
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

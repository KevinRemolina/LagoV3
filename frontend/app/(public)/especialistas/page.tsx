import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Award, CheckCircle2, ChevronRight, GraduationCap } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 60;

export default async function SpecialistsPage() {
  const supabase = await createClient();

  const { data: specialists } = await supabase
    .from('specialists')
    .select('*')
    .eq('is_visible', true)
    .order('created_at', { ascending: true });

  const { data: settings } = await supabase.from('settings').select('*').eq('key', 'whatsapp_primary').single();
  let defaultPhone = "573113118625"; // Fallback
  if (settings?.value) {
    const rawWa = typeof settings.value === 'string' ? settings.value : String(settings.value);
    defaultPhone = rawWa.replace(/[^0-9]/g, '');
  }

  return (
    <div className="bg-background min-h-screen pt-8 pb-32 relative overflow-hidden">
      {/* Subtle Background Image */}
      <div className="absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.08] pointer-events-none">
        <Image 
          src="/assets/MainBackgroundLight.webp" 
          alt="Texture" 
          fill 
          className="object-cover" 
          priority
        />
      </div>

      {/* Header */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-4xl mx-auto text-center border-b border-border/30 pb-12">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8">
            Nuestros Especialistas
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-serif max-w-3xl mx-auto leading-relaxed">
            Tu bienestar en manos de profesionales de la salud y la estética altamente cualificados, certificados y comprometidos con tu seguridad.
          </p>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col gap-24 lg:gap-40">
          {specialists?.map((specialist, index) => {
            const certs = Array.isArray(specialist.certifications) ? specialist.certifications : [];
            const firstName = specialist.name.split(' ')[0];
            
            const rawSpecPhone = specialist.whatsapp || defaultPhone;
            const phone = typeof rawSpecPhone === 'string' ? rawSpecPhone.replace(/[^0-9]/g, '') : defaultPhone;
            const waMessage = encodeURIComponent(`Hola ${firstName}, quisiera agendar una cita contigo.`);

            const isEven = index % 2 === 0;

            return (
              <div id={`especialista-${specialist.id}`} key={specialist.id} className={`flex flex-col gap-10 lg:gap-20 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Photo Section */}
                <div className="w-full lg:w-1/2">
                  <div className="relative w-full aspect-[4/5] bg-muted overflow-hidden border border-border/20">
                    <Image
                      src={specialist.photo_url || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"}
                      alt={specialist.name}
                      fill
                      className="object-cover transition-transform duration-1000 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Info Section */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="border-b border-border/30 pb-6 mb-8">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">{specialist.position}</p>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                      {specialist.name}
                    </h2>
                  </div>
                  
                  <p className="text-foreground font-serif text-lg leading-relaxed mb-10 whitespace-pre-wrap">
                    {specialist.description}
                  </p>

                  {certs.length > 0 && (
                    <div className="mb-10">
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
                        Credenciales y Certificaciones
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {certs.map((cert: any, sIndex: number) => (
                           <li key={sIndex} className="text-foreground font-serif text-base flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-muted-foreground shrink-0 mt-1" strokeWidth={1.5} />
                              <span>{String(cert)}</span>
                           </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-8 border-t border-border/30">
                    <a 
                      href={`https://wa.me/${phone}?text=${waMessage}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-sm uppercase tracking-widest font-semibold hover:text-primary transition-colors group"
                    >
                      Solicitar Cita con {firstName} <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, GraduationCap, CheckCircle2 } from "lucide-react";
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
    <div className="bg-background min-h-screen pt-8 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-secondary rounded-full text-primary">
            <Award className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Nuestros Especialistas
          </h1>
          <p className="text-lg text-muted-foreground">
            En Lago Spa, tu bienestar está en manos de profesionales de la salud y la estética altamente cualificados, certificados y comprometidos con tu seguridad.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {specialists?.map((specialist) => {
            const certs = Array.isArray(specialist.certifications) ? specialist.certifications : [];
            const firstName = specialist.name.split(' ')[0];
            
            // Link to specialist's whatsapp if exists, else default
            const rawSpecPhone = specialist.whatsapp || defaultPhone;
            const phone = typeof rawSpecPhone === 'string' ? rawSpecPhone.replace(/[^0-9]/g, '') : defaultPhone;
            const waMessage = encodeURIComponent(`Hola ${firstName}, quisiera agendar una cita contigo.`);

            return (
              <Card key={specialist.id} className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="relative w-full sm:w-2/5 aspect-square sm:aspect-auto">
                    <Image
                      src={specialist.photo_url || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"}
                      alt={specialist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6 sm:w-3/5 flex flex-col justify-center">
                    <div className="mb-4">
                      <h3 className="font-heading text-2xl font-bold text-foreground">{specialist.name}</h3>
                      <p className="text-primary font-medium">{specialist.position}</p>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6 flex-grow">
                      {specialist.description}
                    </p>
                    {certs.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" /> Especialidades / Certificaciones
                        </h4>
                        <ul className="space-y-2">
                          {certs.map((cert: any, sIndex: number) => (
                             <li key={sIndex} className="text-sm font-medium flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                {String(cert)}
                             </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="mt-8 pt-6 border-t mt-auto">
                      <a href={`https://wa.me/${phone}?text=${waMessage}`} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", className: "w-full text-primary border-primary/20 hover:bg-primary/5 font-semibold" })}>
                        Agendar con {firstName}
                      </a>
                    </div>
                  </CardContent>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
}

import { createClient } from "@/utils/supabase/server";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BlurFade from "@/components/ui/blur-fade";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";

export async function FeaturedSpecialists() {
  const supabase = await createClient();

  // Traeremos los primeros 4 especialistas visibles
  const { data: specialists } = await supabase
    .from('specialists')
    .select('*')
    .eq('is_visible', true)
    .order('created_at', { ascending: true })
    .limit(4);

  if (!specialists || specialists.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <BlurFade inView={true} delay={0.1}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              Manos Expertas
            </h2>
            <p className="text-xl text-muted-foreground font-serif">
              Profesionales altamente cualificados, comprometidos con tu bienestar y seguridad.
            </p>
          </div>
        </BlurFade>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {specialists.map((specialist) => {
            return (
              <StaggerItem key={specialist.id}>
                <Link href="/especialistas" className="group flex flex-col items-center text-center h-full">
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-muted mb-6">
                    <Image
                      src={specialist.photo_url || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"}
                      alt={specialist.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                  </div>
                  
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2 uppercase tracking-widest">{specialist.name}</h3>
                  <div className="w-12 h-px bg-primary/30 mb-4" />
                  <p className="text-muted-foreground font-serif text-sm">{specialist.position}</p>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <BlurFade inView={true} delay={0.3}>
          <div className="mt-20 text-center border-t border-border/30 pt-12">
            <Link href="/especialistas" className="inline-flex items-center text-sm uppercase tracking-widest font-semibold hover:text-primary transition-colors group">
              Conocer a todo el equipo <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

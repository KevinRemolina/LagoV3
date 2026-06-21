import { createClient } from "@/utils/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

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
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-secondary rounded-full text-primary">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Manos Expertas
          </h2>
          <p className="text-lg text-muted-foreground">
            Nuestro equipo está conformado por profesionales altamente cualificados, comprometidos con brindarte la mejor experiencia y resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialists.map((specialist) => {
            return (
              <Card key={specialist.id} className="overflow-hidden border-border/50 bg-background hover:shadow-xl transition-shadow text-center group">
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={specialist.photo_url || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"}
                    alt={specialist.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-1">{specialist.name}</h3>
                  <p className="text-primary font-medium text-sm line-clamp-1">{specialist.position}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/especialistas" className={buttonVariants({ size: "lg", className: "font-semibold" })}>
            Conoce a todo el equipo <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

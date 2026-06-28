import { createClient } from "@/utils/supabase/server";
import { Droplets, Flower2, Heart, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import BlurFade from "@/components/ui/blur-fade";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";

const categoryMeta: Record<string, { icon: any, image: string }> = {
  'facial': { icon: Sparkles, image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop" },
  'corporal': { icon: Droplets, image: "https://images.unsplash.com/photo-1544161515-4abfbcece6b4?q=80&w=2070&auto=format&fit=crop" },
  'spa': { icon: Flower2, image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2148&auto=format&fit=crop" },
  'salud': { icon: Heart, image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop" }
};

export const revalidate = 60; // Revalidate every minute if needed

export default async function ServicesHubPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('name');

  return (
    <div className="bg-background min-h-screen pt-8 pb-20 relative overflow-hidden">
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
        <BlurFade inView={false} delay={0.1}>
          <div className="max-w-4xl mx-auto text-center border-b border-border/30 pb-12">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-8">
              Nuestras Especialidades
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-serif max-w-2xl mx-auto leading-relaxed">
              Explora nuestras áreas de especialidad. En Lago Spa, combinamos tecnología avanzada con una delicadeza artesanal para tu bienestar.
            </p>
          </div>
        </BlurFade>
      </div>

      {/* Categories Hub */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer delayChildren={0.2} staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 lg:gap-20">
          {categories?.map((category, index) => {
            const meta = categoryMeta[category.slug] || { icon: Sparkles, image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c" };
            const Icon = meta.icon;
            
            // Asimetría:
            // 1. Desplazar los elementos pares hacia abajo
            // 2. Variar sutilmente las proporciones de las imágenes
            const isEvenColumn = index % 2 === 1;
            const marginTop = isEvenColumn ? 'md:mt-32 lg:mt-48' : '';
            const aspectRatio = index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]';
            const padding = index % 4 === 0 ? 'lg:px-10' : '';

            return (
              <StaggerItem key={category.id} className={`${marginTop} ${padding}`}>
                <Link href={`/servicios/${category.slug}`} className="group flex flex-col gap-8 items-center text-center">
                  <div className={`relative w-full ${aspectRatio} overflow-hidden bg-muted`}>
                    <Image
                      src={meta.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  </div>

                  <div className="flex flex-col items-center">
                    <Icon className="w-6 h-6 text-primary mb-6" strokeWidth={1.5} />
                    <h2 className="font-heading text-3xl font-bold text-foreground mb-4 uppercase tracking-wider">
                      {category.name}
                    </h2>
                    <p className="text-muted-foreground font-serif text-lg mb-8 max-w-md line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center text-primary text-sm tracking-widest uppercase font-semibold group-hover:underline underline-offset-4">
                      Explorar Colección <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>

      {/* Call to action */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-40">
        <BlurFade inView={true} delay={0.2} yOffset={20}>
          <div className="border border-border/30 bg-muted/10 p-12 md:p-20 text-center flex flex-col items-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-foreground">
              El comienzo de tu transformación
            </h2>
            <p className="text-muted-foreground font-serif text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Permítenos guiarte. Solicita una consulta privada con nuestros especialistas para diseñar un protocolo a tu medida.
            </p>
            <Link href="/contacto" className="border border-foreground text-foreground px-8 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-foreground hover:text-background transition-colors">
              Solicitar Valoración
            </Link>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}

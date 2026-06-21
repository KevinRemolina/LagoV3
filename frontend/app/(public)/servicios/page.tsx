import { createClient } from "@/utils/supabase/server";
import { Droplets, Flower2, Heart, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

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
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Nuestras Especialidades
          </h1>
          <p className="text-lg text-muted-foreground">
            Explora nuestras diferentes áreas de especialidad. En Lago Spa, combinamos tecnología de punta con la delicadeza humana para ofrecerte resultados excepcionales.
          </p>
        </div>
      </div>

      {/* Categories Hub */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {categories?.map((category) => {
            const meta = categoryMeta[category.slug] || { icon: Sparkles, image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c" };
            const Icon = meta.icon;

            return (
              <Link key={category.id} href={`/servicios/${category.slug}`} className="group relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] flex items-end">
                {/* Background Image */}
                <Image
                  src={meta.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10 p-8 md:p-10 w-full">
                  <div className="mb-4 inline-flex items-center justify-center p-3 rounded-2xl bg-primary/20 backdrop-blur-md text-white border border-white/20">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-white mb-3">
                    {category.name}
                  </h2>
                  <p className="text-white/80 text-lg mb-6 line-clamp-2">
                    {category.description}
                  </p>
                  <div className={buttonVariants({ variant: "outline", className: "text-black border-white/30 hover:bg-white hover:text-black transition-colors w-full sm:w-auto" })}>
                    Ver Tratamientos <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Call to action */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-16 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            ¿No estás seguro de qué tratamiento necesitas?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Programa una consulta de valoración gratuita con nuestros especialistas. Ellos analizarán tu caso y te recomendarán el plan perfecto para ti.
          </p>
          <Link href="/contacto" className={buttonVariants({ size: "lg", variant: "secondary", className: "font-bold h-12 px-8" })}>
            Solicitar Valoración Gratuita
          </Link>
        </div>
      </div>
    </div>
  );
}

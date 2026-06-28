import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Tag, CalendarDays, ArrowRight } from "lucide-react";

export const revalidate = 60;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category_slug: string }>
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.category_slug;
  const supabase = await createClient();

  // 1. Fetch category
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (!category) {
    notFound();
  }

  const { data: { user } } = await supabase.auth.getUser();
  const allowedStatuses = user ? ['PUBLIC', 'PRIVATE'] : ['PUBLIC'];

  // 2. Fetch services for this category
  const { data: services } = await supabase
    .from('services')
    .select('*, service_images(*)')
    .eq('category_id', category.id)
    .in('status', allowedStatuses)
    .order('created_at', { ascending: false });

  // 3. Fetch Settings for WhatsApp
  const { data: settings } = await supabase.from('settings').select('*').eq('key', 'whatsapp_primary').single();
  let defaultPhone = "573113118625"; // Fallback
  if (settings?.value) {
    const rawWa = typeof settings.value === 'string' ? settings.value : String(settings.value);
    defaultPhone = rawWa.replace(/[^0-9]/g, '');
  }

  return (
    <div className="bg-background min-h-screen pt-8 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="mb-12">
          <Link href="/servicios" className="inline-flex items-center text-sm tracking-widest uppercase font-semibold text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Volver a Colecciones
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-4xl mb-24 border-b border-border/30 pb-12">
          <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 uppercase">
            {category.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-serif max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Services Grid */}
        {services && services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              // Find cover image or use first image
              const coverImage = service.service_images?.find((img: any) => img.is_cover) 
                || service.service_images?.[0];
              
              // We need the public URL of the image
              let imageUrl = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"; // fallback
              if (coverImage?.storage_path) {
                const { data } = supabase.storage.from('services').getPublicUrl(coverImage.storage_path);
                imageUrl = data.publicUrl;
              }

              // WhatsApp Message logic
              const waMessage = encodeURIComponent(`Hola, estoy interesado/a en el tratamiento: ${service.title}. ¿Podrían brindarme más información?`);

              return (
                <div key={service.id} className="group flex flex-col gap-6">
                  <Link href={`/servicios/${slug}/${service.slug}`} className="relative w-full aspect-[4/5] overflow-hidden bg-muted block">
                    <Image
                      src={imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                    
                    {/* Badges Flotantes */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {service.is_promotional && (
                        <div className="bg-background/90 backdrop-blur text-foreground px-4 py-1.5 text-xs font-semibold uppercase tracking-widest border border-border/50">
                          Promoción
                        </div>
                      )}
                      {service.status === 'PRIVATE' && (
                        <div className="bg-foreground/90 backdrop-blur text-background px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                          🔒 Oculto
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  <div className="flex flex-col flex-1">
                    <Link href={`/servicios/${slug}/${service.slug}`}>
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground font-serif text-lg line-clamp-2 mb-6 flex-1">
                      {service.short_description || service.description}
                    </p>
                    
                    <div className="flex items-center justify-between border-t border-border/30 pt-6 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Inversión</span>
                        {service.show_price && service.price > 0 ? (
                          <span className="text-lg font-bold font-serif text-foreground">
                            ${service.price.toLocaleString()} COP
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-foreground">Previa Valoración</span>
                        )}
                      </div>
                      
                      <Link 
                        href={`/servicios/${slug}/${service.slug}`} 
                        className="text-xs uppercase tracking-widest font-semibold flex items-center hover:text-primary transition-colors"
                      >
                        Descubrir <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-32 border border-border/30 bg-muted/10">
            <h3 className="text-3xl font-heading font-bold text-foreground mb-4">Colección en Preparación</h3>
            <p className="text-muted-foreground font-serif text-xl max-w-lg mx-auto">Estamos seleccionando los mejores tratamientos para esta categoría. Pronto revelaremos nuestras novedades.</p>
          </div>
        )}

      </div>
    </div>
  );
}

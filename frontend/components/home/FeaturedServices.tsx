import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BlurFade from "@/components/ui/blur-fade";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger-container";

export async function FeaturedServices() {
  const adminClient = createAdminClient();
  const regularClient = await createClient();
  const { data: { user } } = await regularClient.auth.getUser();
  const allowedStatuses = user ? ['PUBLIC', 'PRIVATE'] : ['PUBLIC'];

  const { data: services } = await adminClient
    .from('services')
    .select('*, service_images(*), categories!inner(slug)')
    .in('status', allowedStatuses)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(3);

  if (!services || services.length === 0) {
    return null; // No renderizamos la sección si no hay destacados
  }

  const { data: settings } = await adminClient.from('settings').select('*').eq('key', 'whatsapp_primary').single();
  let defaultPhone = "573113118625";
  if (settings?.value) {
    const rawWa = typeof settings.value === 'string' ? settings.value : String(settings.value);
    defaultPhone = rawWa.replace(/[^0-9]/g, '');
  }

  return (
    <section className="py-24 bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <BlurFade inView={true} delay={0.1}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-border/30 pb-8">
            <div className="max-w-2xl">
              <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
                Tratamientos Destacados
              </h2>
              <p className="text-xl text-muted-foreground font-serif">
                Nuestros protocolos más solicitados, perfeccionados para brindarte resultados excepcionales.
              </p>
            </div>
            <Link href="/servicios" className="hidden md:inline-flex items-center text-sm uppercase tracking-widest font-semibold hover:text-primary transition-colors">
              Ver Catálogo <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </BlurFade>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const coverImage = service.service_images?.find((img: any) => img.is_cover) || service.service_images?.[0];
            let imageUrl = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop";
            if (coverImage?.storage_path) {
              const { data } = adminClient.storage.from('services').getPublicUrl(coverImage.storage_path);
              imageUrl = data.publicUrl;
            }

            const waMessage = encodeURIComponent(`Hola, estoy interesado/a en el tratamiento destacado: ${service.title}.`);
            const catSlug = service.categories?.slug || 'facial';

            return (
              <StaggerItem key={service.id}>
                <div className="group flex flex-col gap-6 h-full">
                  <Link href={`/servicios/${catSlug}/${service.slug}`} className="relative w-full aspect-[4/5] overflow-hidden bg-muted block">
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
                    <Link href={`/servicios/${catSlug}/${service.slug}`}>
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
                        href={`/servicios/${catSlug}/${service.slug}`} 
                        className="text-xs uppercase tracking-widest font-semibold flex items-center hover:text-primary transition-colors"
                      >
                        Descubrir <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/servicios" className="inline-flex items-center text-sm uppercase tracking-widest font-semibold hover:text-primary transition-colors">
            Ver todos los tratamientos <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

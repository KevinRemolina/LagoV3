import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight, CalendarDays, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export async function FeaturedServices() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const allowedStatuses = user ? ['PUBLIC', 'PRIVATE'] : ['PUBLIC'];

  const { data: services } = await supabase
    .from('services')
    .select('*, service_images(*), categories!inner(slug)')
    .in('status', allowedStatuses)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(3);

  if (!services || services.length === 0) {
    return null; // No renderizamos la sección si no hay destacados
  }

  const { data: settings } = await supabase.from('settings').select('*').eq('key', 'whatsapp_primary').single();
  let defaultPhone = "573113118625";
  if (settings?.value) {
    const rawWa = typeof settings.value === 'string' ? settings.value : String(settings.value);
    defaultPhone = rawWa.replace(/[^0-9]/g, '');
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Tratamientos Destacados
            </h2>
            <p className="text-lg text-muted-foreground">
              Conoce los tratamientos más solicitados por nuestros pacientes y descubre por qué son los favoritos.
            </p>
          </div>
          <Link href="/servicios" className={buttonVariants({ variant: "outline", className: "hidden md:flex mt-4 md:mt-0 text-primary border-primary/20 hover:bg-primary/5" })}>
            Ver todos <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const coverImage = service.service_images?.find((img: any) => img.is_cover) || service.service_images?.[0];
            let imageUrl = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop";
            if (coverImage?.storage_path) {
              const { data } = supabase.storage.from('services').getPublicUrl(coverImage.storage_path);
              imageUrl = data.publicUrl;
            }

            const waMessage = encodeURIComponent(`Hola, estoy interesado/a en el tratamiento destacado: ${service.title}.`);
            const catSlug = service.categories?.slug || 'facial';

            return (
              <Card key={service.id} className="overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300 border-primary/10">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  {service.is_promotional && (
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-lg">
                      <Tag className="w-4 h-4 mr-1" />
                      Promoción
                    </div>
                  )}
                  {service.status === 'PRIVATE' && (
                    <div className="absolute top-4 right-4 bg-gray-900/90 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-lg backdrop-blur-sm">
                      🔒 Privado
                    </div>
                  )}
                </div>
                <CardHeader>
                  <h3 className="font-heading text-xl font-bold line-clamp-2" title={service.title}>
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 mt-2 text-sm">
                    {service.short_description || service.description}
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  {service.show_price && service.price > 0 && (
                    <div className="flex items-end gap-2 mt-2">
                      <span className="text-2xl font-bold text-foreground">
                        ${service.price.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground text-sm mb-1">COP</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-0 flex flex-col gap-3">
                  <a href={`https://wa.me/${defaultPhone}?text=${waMessage}`} target="_blank" rel="noopener noreferrer" className={buttonVariants({ className: "w-full font-semibold" })}>
                    <CalendarDays className="w-4 h-4 mr-2" />
                    Reservar Cita
                  </a>
                  <Link href={`/servicios/${catSlug}/${service.slug}`} className={buttonVariants({ variant: "ghost", className: "w-full text-primary hover:text-primary hover:bg-primary/10" })}>
                    Ver detalles completos
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
        
        <Link href="/servicios" className={buttonVariants({ variant: "outline", className: "w-full mt-8 md:hidden text-primary border-primary/20 hover:bg-primary/5" })}>
          Ver todos los tratamientos <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

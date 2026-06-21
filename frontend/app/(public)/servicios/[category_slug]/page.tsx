import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Tag, Clock, CalendarDays, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

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
        <div className="mb-8">
          <Link href="/servicios" className={buttonVariants({ variant: "ghost", className: "text-muted-foreground hover:text-primary -ml-4" })}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Especialidades
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-muted-foreground">
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
                <Card key={service.id} className="overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
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
                    <Link href={`/servicios/${slug}/${service.slug}`} className={buttonVariants({ variant: "ghost", className: "w-full text-primary hover:text-primary hover:bg-primary/10" })}>
                      Ver detalles completos
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-muted/30 rounded-3xl">
            <h3 className="text-2xl font-bold text-muted-foreground">Próximamente nuevos tratamientos</h3>
            <p className="text-muted-foreground mt-2">Estamos trabajando para ofrecerte los mejores servicios en esta categoría.</p>
          </div>
        )}

      </div>
    </div>
  );
}

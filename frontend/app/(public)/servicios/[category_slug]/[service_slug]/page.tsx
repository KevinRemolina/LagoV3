import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, Info, Award, Plus, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const revalidate = 60;

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ category_slug: string, service_slug: string }>
}) {
  const resolvedParams = await params;
  const { category_slug, service_slug } = resolvedParams;
  const supabase = await createClient();

  // 1. Fetch category
  const { data: category } = await supabase
    .from('categories')
    .select('id, name, slug')
    .eq('slug', category_slug)
    .single();

  if (!category) {
    notFound();
  }

  const { data: { user } } = await supabase.auth.getUser();
  const allowedStatuses = user ? ['PUBLIC', 'PRIVATE'] : ['PUBLIC'];

  // 2. Fetch service with relations
  const { data: service } = await supabase
    .from('services')
    .select(`
      *,
      service_images(*),
      service_specialists(
        specialists(*)
      )
    `)
    .eq('slug', service_slug)
    .eq('category_id', category.id)
    .in('status', allowedStatuses)
    .single();

  if (!service) {
    notFound();
  }

  // 3. Settings for WhatsApp
  const { data: settings } = await supabase.from('settings').select('*').eq('key', 'whatsapp_primary').single();
  let defaultPhone = "573113118625";
  if (settings?.value) {
    const rawWa = typeof settings.value === 'string' ? settings.value : String(settings.value);
    defaultPhone = rawWa.replace(/[^0-9]/g, '');
  }

  const waMessage = encodeURIComponent(`Hola, quisiera más información y agendar el tratamiento: ${service.title}`);

  // Images logic
  const images = service.service_images || [];
  const coverImage = images.find((img: any) => img.is_cover) || images[0];
  let coverUrl = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop";
  if (coverImage?.storage_path) {
    const { data } = supabase.storage.from('services').getPublicUrl(coverImage.storage_path);
    coverUrl = data.publicUrl;
  }

  const benefits = Array.isArray(service.benefits) ? service.benefits : [];
  const included = Array.isArray(service.included_services) ? service.included_services : [];

  const specialistsList = service.service_specialists
    ?.map((ss: any) => ss.specialists)
    .filter((s: any) => s && s.is_visible) || [];

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] bg-muted flex items-end">
        <Image
          src={coverUrl}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        <div className="relative z-10 w-full p-6 md:p-12 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <Link href={`/servicios/${category_slug}`} className="inline-flex items-center text-white/70 hover:text-white mb-10 text-sm tracking-widest uppercase font-semibold transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Colección {category.name}
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              {service.is_promotional && (
                <div className="bg-white text-black px-4 py-1 text-xs font-semibold uppercase tracking-widest">
                  Promoción
                </div>
              )}
              {service.status === 'PRIVATE' && (
                <div className="bg-black/50 backdrop-blur border border-white/20 text-white px-4 py-1 text-xs font-semibold uppercase tracking-widest">
                  🔒 Privado
                </div>
              )}
            </div>

            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-none">
              {service.title}
            </h1>

            {service.short_description && (
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-serif">
                {service.short_description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Columna Izquierda: Información Principal */}
          <div className="lg:col-span-2 space-y-16 mt-8">

            {/* Descripción Completa */}
            <section>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6 border-b border-border/30 pb-4">
                El Tratamiento
              </h2>
              <div className="prose prose-slate max-w-none text-foreground font-serif text-xl leading-relaxed whitespace-pre-wrap">
                {service.description}
              </div>
            </section>

            {/* Beneficios */}
            {benefits.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6 border-b border-border/30 pb-4">
                  Beneficios
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {benefits.map((benefit: any, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-foreground font-serif text-lg">
                      <Plus className="w-5 h-5 text-muted-foreground shrink-0 mt-1" strokeWidth={1} />
                      <span>{String(benefit)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Qué incluye */}
            {included.length > 0 && (
              <section>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6 border-b border-border/30 pb-4">
                  Incluye
                </h2>
                <ul className="space-y-4">
                  {included.map((item: any, index: number) => (
                    <li key={index} className="flex items-center gap-3 text-foreground font-serif text-lg border-b border-border/10 pb-4">
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      {String(item)}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Recomendaciones y Contraindicaciones */}
            {(service.recommendations || service.contraindications) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {service.recommendations && (
                  <section>
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                      Recomendaciones
                    </h2>
                    <p className="text-muted-foreground font-serif text-lg whitespace-pre-wrap leading-relaxed">{service.recommendations}</p>
                  </section>
                )}

                {service.contraindications && (
                  <section>
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                      Contraindicaciones
                    </h2>
                    <p className="text-muted-foreground font-serif text-lg whitespace-pre-wrap leading-relaxed">{service.contraindications}</p>
                  </section>
                )}
              </div>
            )}

            {/* Galería Adicional */}
            {images.length > 1 && (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">Galería</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.filter((img: any) => !img.is_cover).map((img: any, i: number) => {
                    const { data } = supabase.storage.from('services').getPublicUrl(img.storage_path);
                    return (
                      <div key={i} className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                        <Image src={data.publicUrl} alt={img.alt_text || "Galería"} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    )
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Columna Derecha: Sticky Checkout & Especialistas */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-12">
              <div className="border border-border/30 bg-background p-10 shadow-sm">
                {service.show_price && service.price > 0 ? (
                  <div className="mb-10 text-center border-b border-border/30 pb-10">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-4">Inversión</p>
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-4xl lg:text-5xl font-serif text-foreground">
                        ${service.price.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground text-sm tracking-widest uppercase mt-2">COP</span>
                    </div>
                  </div>
                ) : (
                  <div className="mb-10 text-center border-b border-border/30 pb-10">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-4">Valoración</p>
                    <span className="text-2xl font-serif text-foreground">Personalizada</span>
                  </div>
                )}

                <a
                  href={`https://wa.me/${defaultPhone}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-foreground text-background py-5 px-6 text-sm uppercase tracking-widest font-semibold hover:bg-muted-foreground transition-colors"
                >
                  Agendar Cita
                </a>

                <p className="text-xs text-center text-muted-foreground mt-6 font-serif italic">
                  Nuestro especialista se pondrá en contacto para confirmar disponibilidad.
                </p>
              </div>

              {/* Especialistas Asignados */}
              {specialistsList.length > 0 && (
                <div className="pt-6">
                  <h3 className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-6">
                    A cargo de
                  </h3>
                  <div className="flex flex-col gap-6">
                    {specialistsList.map((specialist: any) => (
                      <div key={specialist.id} className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-border/30">
                          <Image src={specialist.photo_url || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"} alt={specialist.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-serif text-lg text-foreground">{specialist.name}</h4>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{specialist.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

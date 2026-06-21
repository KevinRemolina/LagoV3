import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, CheckCircle2, AlertCircle, Clock, Info, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-muted">
        <Image
          src={coverUrl}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href={`/servicios/${category_slug}`} className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a {category.name}
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="secondary" className="bg-primary/90 text-white hover:bg-primary border-none">
                {category.name}
              </Badge>
              {service.is_promotional && (
                <Badge className="bg-green-100 hover:bg-green-200 text-green-700 border border-green-300 shadow-sm">
                  ¡Promoción Especial!
                </Badge>
              )}
              {service.status === 'PRIVATE' && (
                <Badge variant="outline" className="bg-gray-900/80 text-white border-gray-600 backdrop-blur-md">
                  🔒 Oculto al público
                </Badge>
              )}
            </div>

            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 max-w-4xl">
              {service.title}
            </h1>

            {service.short_description && (
              <p className="text-lg md:text-xl text-white/90 max-w-2xl line-clamp-2">
                {service.short_description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Columna Izquierda: Información Principal */}
          <div className="lg:col-span-2 space-y-12">

            {/* Descripción Completa */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 font-heading flex items-center gap-2">
                <Info className="text-primary w-6 h-6" /> Acerca de este tratamiento
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {service.description}
              </div>
            </section>

            {/* Beneficios */}
            {benefits.length > 0 && (
              <section className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                <h2 className="text-2xl font-bold text-foreground mb-6 font-heading flex items-center gap-2">
                  <CheckCircle2 className="text-primary w-6 h-6" /> Beneficios principales
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit: any, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{String(benefit)}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Qué incluye */}
            {included.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6 font-heading">El tratamiento incluye:</h2>
                <ul className="space-y-3">
                  {included.map((item: any, index: number) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground p-3 rounded-lg bg-muted/50">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {String(item)}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Recomendaciones y Contraindicaciones */}
            {(service.recommendations || service.contraindications) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.recommendations && (
                  <Card className="border-border/50 shadow-sm bg-muted/20">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        Recomendaciones
                      </h3>
                      <p className="text-muted-foreground text-sm whitespace-pre-wrap">{service.recommendations}</p>
                    </CardContent>
                  </Card>
                )}

                {service.contraindications && (
                  <Card className="border-border/50 shadow-sm bg-red-50/50 dark:bg-red-950/20">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-red-600 dark:text-red-400">
                        <AlertCircle className="w-5 h-5" />
                        Contraindicaciones
                      </h3>
                      <p className="text-muted-foreground text-sm whitespace-pre-wrap">{service.contraindications}</p>
                    </CardContent>
                  </Card>
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
            <div className="sticky top-24 space-y-8">
              <Card className="border-primary/20 shadow-xl overflow-hidden">
                <div className="h-2 bg-primary w-full" />
                <CardContent className="p-8">
                  {service.show_price && service.price > 0 ? (
                    <div className="mb-8 text-center">
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-2">Inversión en ti</p>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-4xl font-bold text-foreground">
                          ${service.price.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground font-medium">COP</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-8 text-center">
                      <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-2">Reserva tu lugar</p>
                      <span className="text-2xl font-bold text-foreground">Consulta de valoración</span>
                    </div>
                  )}

                  <a
                    href={`https://wa.me/${defaultPhone}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ size: "lg", className: "w-full font-bold text-lg h-14" })}
                  >
                    <CalendarDays className="w-5 h-5 mr-2" />
                    Agendar Cita Ahora
                  </a>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Te responderemos a la brevedad para confirmar tu horario ideal.
                  </p>
                </CardContent>
              </Card>

              {/* Especialistas Asignados */}
              {specialistsList.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg font-heading flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" /> Especialistas a cargo
                  </h3>
                  <div className="grid gap-4">
                    {specialistsList.map((specialist: any) => (
                      <div key={specialist.id} className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-background hover:bg-muted/30 transition-colors shadow-sm">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-primary/10">
                          <Image src={specialist.photo_url || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop"} alt={specialist.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-foreground">{specialist.name}</h4>
                          <p className="text-xs text-primary font-medium">{specialist.position}</p>
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

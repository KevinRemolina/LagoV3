import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import BlurFade from "@/components/ui/blur-fade";
import { PromotionsCarousel } from "./PromotionsCarousel";

export async function PromotionsSection() {
  // Use the admin client to read settings and services without RLS restrictions.
  // This is safe because this is a Server Component — the service role key
  // never reaches the browser.
  const adminClient = createAdminClient();

  // We still use the regular client ONLY to know if the current visitor is a
  // logged-in admin, so we can decide whether to include PRIVATE services.
  const regularClient = await createClient();
  const { data: { user } } = await regularClient.auth.getUser();
  const allowedStatuses = user ? ['PUBLIC', 'PRIVATE'] : ['PUBLIC'];

  // ── Read settings ──────────────────────────────────────────────────────────
  const { data: settingsData, error: settingsError } = await adminClient
    .from('settings')
    .select('*')
    .in('key', ['promotions_title', 'promotions_subtitle', 'promotions_selected_ids']);

  if (settingsError) {
    console.error('[PromotionsSection] Error fetching settings:', settingsError.message);
    return null;
  }

  let title = 'Colección Exclusiva';
  let subtitle = 'Experiencias diseñadas para tu bienestar absoluto, por tiempo limitado.';
  let selectedIds: string[] = [];

  if (settingsData) {
    const settingsMap = new Map(settingsData.map(s => [s.key, s.value]));

    if (settingsMap.has('promotions_title')) {
      title = String(settingsMap.get('promotions_title'));
    }
    if (settingsMap.has('promotions_subtitle')) {
      subtitle = String(settingsMap.get('promotions_subtitle'));
    }
    if (settingsMap.has('promotions_selected_ids')) {
      const rawVal = settingsMap.get('promotions_selected_ids');
      // Supabase can return the value already parsed (jsonb) or as a string (text)
      if (Array.isArray(rawVal)) {
        selectedIds = rawVal;
      } else if (typeof rawVal === 'string' && rawVal.trim() !== '') {
        try { selectedIds = JSON.parse(rawVal); } catch (_) {}
      }
    }
  }

  // Nothing to show if no promotions have been selected from the admin panel
  if (!selectedIds || selectedIds.length === 0) {
    return null;
  }

  // ── Read services ──────────────────────────────────────────────────────────
  const { data: services, error: servicesError } = await adminClient
    .from('services')
    .select('*, service_images(*), categories!inner(slug)')
    .in('status', allowedStatuses)
    .in('id', selectedIds)
    .eq('is_promotional', true);

  if (servicesError) {
    console.error('[PromotionsSection] Error fetching services:', servicesError.message);
    return null;
  }

  if (!services || services.length === 0) {
    return null;
  }

  // Preserve the order defined in the admin panel
  const sortedServices = [...services].sort(
    (a, b) => selectedIds.indexOf(a.id) - selectedIds.indexOf(b.id)
  );

  // Build absolute image URLs server-side so the client component is pure
  const servicesWithUrls = sortedServices.map((service) => {
    const coverImage =
      service.service_images?.find((img: any) => img.is_cover) ??
      service.service_images?.[0];

    let imageUrl =
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop';

    if (coverImage?.storage_path) {
      const { data } = adminClient.storage
        .from('services')
        .getPublicUrl(coverImage.storage_path);
      imageUrl = data.publicUrl;
    }

    const catSlug: string = (service.categories as any)?.slug ?? 'facial';

    return { ...service, imageUrl, catSlug };
  });

  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
        <BlurFade inView={true} delay={0.1}>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 md:mb-6">
              Selección Especial
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-4 md:mb-6">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-serif leading-relaxed">
              {subtitle}
            </p>
          </div>
        </BlurFade>
      </div>

      <PromotionsCarousel services={servicesWithUrls} />
    </section>
  );
}

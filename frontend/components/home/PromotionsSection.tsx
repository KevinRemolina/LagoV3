import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";
import BlurFade from "@/components/ui/blur-fade";
import { PromotionsCarousel } from "./PromotionsCarousel";

export async function PromotionsSection() {
  // Admin client bypasses RLS — used only to read public config (settings table)
  const adminSupabase = createAdminClient();
  // Regular client respects RLS and auth — used for service queries
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const allowedStatuses = user ? ['PUBLIC', 'PRIVATE'] : ['PUBLIC'];

  // Read settings with admin client so RLS never blocks public visitors
  const { data: settingsData } = await adminSupabase
    .from('settings')
    .select('*')
    .in('key', ['promotions_title', 'promotions_subtitle', 'promotions_selected_ids']);
    
  let title = 'Colección Exclusiva';
  let subtitle = 'Experiencias diseñadas para tu bienestar absoluto, por tiempo limitado.';
  let selectedIds: string[] = [];

  if (settingsData && settingsData.length > 0) {
    const settingsMap = new Map(settingsData.map(s => [s.key, s.value]));
    if (settingsMap.has('promotions_title') && settingsMap.get('promotions_title')) {
      title = String(settingsMap.get('promotions_title'));
    }
    if (settingsMap.has('promotions_subtitle') && settingsMap.get('promotions_subtitle')) {
      subtitle = String(settingsMap.get('promotions_subtitle'));
    }
    if (settingsMap.has('promotions_selected_ids')) {
      const rawVal = settingsMap.get('promotions_selected_ids');
      try {
        // The value can be already a JSON array (if Supabase stores it as jsonb) 
        // or a stringified JSON array
        if (Array.isArray(rawVal)) {
          selectedIds = rawVal;
        } else if (typeof rawVal === 'string') {
          selectedIds = JSON.parse(rawVal);
        }
      } catch (e) {
        selectedIds = [];
      }
    }
  }

  // If admin hasn't selected any promotions to display, hide the section entirely
  if (selectedIds.length === 0) {
    return null;
  }

  const { data: services } = await supabase
    .from('services')
    .select('*, service_images(*), categories!inner(slug)')
    .in('status', allowedStatuses)
    .in('id', selectedIds)
    .eq('is_promotional', true);

  if (!services || services.length === 0) {
    return null;
  }

  // Preserve the order defined in the admin panel
  const sortedServices = services.sort((a, b) => selectedIds.indexOf(a.id) - selectedIds.indexOf(b.id));

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

      <PromotionsCarousel services={sortedServices} />
    </section>
  );
}

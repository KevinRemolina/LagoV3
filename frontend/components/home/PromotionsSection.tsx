import { createClient } from "@/utils/supabase/server";
import BlurFade from "@/components/ui/blur-fade";
import { PromotionsCarousel } from "./PromotionsCarousel";

export async function PromotionsSection() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const allowedStatuses = user ? ['PUBLIC', 'PRIVATE'] : ['PUBLIC'];

  // Fetch settings
  const { data: settingsData } = await supabase
    .from('settings')
    .select('*')
    .in('key', ['promotions_title', 'promotions_subtitle', 'promotions_selected_ids']);
    
  let title = 'Colección Exclusiva';
  let subtitle = 'Experiencias diseñadas para tu bienestar absoluto, por tiempo limitado.';
  let selectedIds: string[] = [];

  if (settingsData) {
    const settingsMap = new Map(settingsData.map(s => [s.key, s.value]));
    if (settingsMap.has('promotions_title')) title = settingsMap.get('promotions_title') as string;
    if (settingsMap.has('promotions_subtitle')) subtitle = settingsMap.get('promotions_subtitle') as string;
    if (settingsMap.has('promotions_selected_ids')) {
      try {
        selectedIds = JSON.parse(settingsMap.get('promotions_selected_ids') as string);
      } catch (e) {}
    }
  }

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
  
  // Sort based on the selectedIds array
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

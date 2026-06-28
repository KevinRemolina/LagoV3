import { getPromotionalServices, getSettings } from "./actions";
import { ConfiguracionForm } from "./ConfiguracionForm";

export const metadata = {
  title: "Configuración | Lago Admin",
};

export default async function ConfiguracionPage() {
  const settings = await getSettings();
  const promotionalServices = await getPromotionalServices();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Configuración
        </h1>
      </div>

      <ConfiguracionForm 
        settings={settings} 
        promotionalServices={promotionalServices || []} 
      />
    </div>
  );
}

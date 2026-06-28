"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";
import { saveSettings } from "./actions";
import { toast } from "sonner";
import { ConfirmModal } from "../components/ConfirmModal";

export function ConfiguracionForm({
  settings,
  promotionalServices
}: {
  settings: any,
  promotionalServices: any[]
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);

  const initialSelectedIds = settings?.promotions_selected_ids
    ? JSON.parse(settings.promotions_selected_ids)
    : [];

  const [selectedServices, setSelectedServices] = useState<string[]>(initialSelectedIds);

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPendingFormData(new FormData(e.currentTarget));
    setIsConfirmOpen(true);
  };

  const processSubmit = async () => {
    if (!pendingFormData) return;
    setIsConfirmOpen(false);
    setIsSubmitting(true);

    try {
      const formData = pendingFormData;
      formData.append("promotions_selected_ids", JSON.stringify(selectedServices));

      const result = await saveSettings(formData);
      if (result?.success) {
        toast.success("Configuración guardada con éxito");
      }
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Error al guardar la configuración");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Sección de Promociones (Página Principal)</CardTitle>
            <CardDescription>
              Configura los textos y selecciona qué servicios promocionales deseas mostrar en el inicio.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Título de la sección</label>
                <Input
                  name="promotions_title"
                  defaultValue={settings?.promotions_title}
                  required
                  placeholder="Ej. Promociones Especiales"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subtítulo de la sección</label>
                <Input
                  name="promotions_subtitle"
                  defaultValue={settings?.promotions_subtitle}
                  required
                  placeholder="Ej. Aprovecha nuestras ofertas por tiempo limitado..."
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium">Servicios a Mostrar</h3>
                <p className="text-xs text-muted-foreground">
                  Selecciona qué servicios marcados como "Promoción" quieres destacar en la página principal.
                </p>
              </div>

              {promotionalServices.length === 0 ? (
                <div className="p-4 bg-muted/50 rounded-lg text-sm text-center text-muted-foreground">
                  No hay servicios marcados como promoción actualmente.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {promotionalServices.map(service => {
                    const isSelected = selectedServices.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:border-primary/50'
                          }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isSelected ? 'bg-primary border-primary' : 'border-input'}`}>
                          {isSelected && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm line-clamp-1">{service.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {service.status === 'PRIVATE' ? '🔒 Privado' : 'Público'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  'Guardar Configuración'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      <ConfirmModal
        isOpen={isConfirmOpen}
        title="¿Guardar cambios de configuración?"
        onConfirm={processSubmit}
        onCancel={() => setIsConfirmOpen(false)}
        confirmText="Guardar"
      />
    </>
  );
}

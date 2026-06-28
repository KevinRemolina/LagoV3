"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, X, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { saveSpecialist } from "./actions";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "../components/ConfirmModal";

type SpecialistInitialData = {
  id?: string;
  photo_url?: string;
  certifications?: string[];
  schedules?: string[];
  name?: string;
  position?: string;
  description?: string;
  whatsapp?: string;
  is_visible?: boolean;
};

export function SpecialistForm({ initialData }: { initialData?: SpecialistInitialData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [photoPreview, setPhotoPreview] = useState<string | null>(initialData?.photo_url || null);
  
  // JSONB fields state
  const [certifications, setCertifications] = useState<string[]>(initialData?.certifications || []);
  const [newCert, setNewCert] = useState("");

  const [schedules, setSchedules] = useState<string[]>(initialData?.schedules || []);
  const [newSchedule, setNewSchedule] = useState("");

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingFormElement, setPendingFormElement] = useState<HTMLFormElement | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPendingFormElement(e.currentTarget);
    setIsConfirmOpen(true);
  };

  const processSubmit = async () => {
    if (!pendingFormElement) return;
    setIsConfirmOpen(false);
    setIsSubmitting(true);
    
    try {
      const form = pendingFormElement;
      const formData = new FormData(form);
      formData.append("certifications", JSON.stringify(certifications));
      formData.append("schedules", JSON.stringify(schedules));
      
      const photoInput = form.elements.namedItem('photo') as HTMLInputElement;
      const file = photoInput?.files?.[0];
      
      // Delete the actual file from formData to avoid Next.js 1MB Server Action limit
      formData.delete('photo');
      
      const generatedId = initialData?.id || crypto.randomUUID();
      formData.append("generated_id", generatedId);

      if (file) {
        const { createClient } = await import('@/utils/supabase/client');
        const supabase = createClient();
        
        const fileExt = file.name.split('.').pop();
        const filePath = `${generatedId}/photo.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage.from('specialists').upload(filePath, file, { upsert: true });
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage.from('specialists').getPublicUrl(filePath);
        formData.append("photo_url", data.publicUrl);
      }
      
      // We send it to the server action
      const result = await saveSpecialist(formData);
      if (result?.success) {
        toast.success("Especialista guardado con éxito");
        router.push('/admin/especialistas');
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'NEXT_REDIRECT') throw error;
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Error al guardar el especialista");
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/especialistas" className={buttonVariants({ variant: "ghost", size: "icon" })}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-heading text-3xl font-bold text-foreground">
          {initialData ? "Editar Especialista" : "Nuevo Especialista"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}
        {initialData?.photo_url && <input type="hidden" name="existing_photo_url" value={initialData.photo_url} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nombre Completo *</label>
                    <Input name="name" defaultValue={initialData?.name} required placeholder="Dr. Juan Pérez" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cargo / Rol *</label>
                    <Input name="position" defaultValue={initialData?.position} required placeholder="Médico Estético" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Descripción (Biografía)</label>
                  <textarea 
                    name="description" 
                    defaultValue={initialData?.description} 
                    rows={4} 
                    className="w-full px-3 py-2 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Escribe un breve resumen de su experiencia y especialidad."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Número de WhatsApp</label>
                  <Input name="whatsapp" defaultValue={initialData?.whatsapp} placeholder="+573000000000" />
                  <p className="text-xs text-muted-foreground">Incluye el código de país (ej. +57)</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certificaciones y Horarios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Certifications */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Certificaciones</label>
                  <div className="flex gap-2">
                    <Input 
                      value={newCert} 
                      onChange={e => setNewCert(e.target.value)} 
                      placeholder="Ej. Diplomado en Medicina Estética" 
                      onKeyDown={e => { if(e.key === 'Enter') { e.preventDefault(); if(newCert) { setCertifications([...certifications, newCert]); setNewCert("") } } }}
                    />
                    <Button type="button" variant="secondary" onClick={() => { if(newCert) { setCertifications([...certifications, newCert]); setNewCert("") } }}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    {certifications.map((cert, i) => (
                      <div key={i} className="flex justify-between items-center bg-muted/50 p-2 rounded-md text-sm">
                        <span>{cert}</span>
                        <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => setCertifications(certifications.filter((_, index) => index !== i))}>
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Schedules */}
                <div className="space-y-3 pt-4 border-t">
                  <label className="text-sm font-medium">Horarios de Atención</label>
                  <div className="flex gap-2">
                    <Input 
                      value={newSchedule} 
                      onChange={e => setNewSchedule(e.target.value)} 
                      placeholder="Ej. Lunes y Miércoles 8:00am - 12:00pm" 
                      onKeyDown={e => { if(e.key === 'Enter') { e.preventDefault(); if(newSchedule) { setSchedules([...schedules, newSchedule]); setNewSchedule("") } } }}
                    />
                    <Button type="button" variant="secondary" onClick={() => { if(newSchedule) { setSchedules([...schedules, newSchedule]); setNewSchedule("") } }}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    {schedules.map((sch, i) => (
                      <div key={i} className="flex justify-between items-center bg-muted/50 p-2 rounded-md text-sm">
                        <span>{sch}</span>
                        <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => setSchedules(schedules.filter((_, index) => index !== i))}>
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fotografía *</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-xl p-4 text-center">
                  {photoPreview ? (
                    <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-4">
                      <Image src={photoPreview} alt="Preview" fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="aspect-square w-full bg-muted rounded-lg flex flex-col items-center justify-center mb-4 text-muted-foreground">
                      <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                      <span className="text-sm">Sin imagen</span>
                    </div>
                  )}
                  
                  <div className="relative">
                    <Input 
                      type="file" 
                      name="photo" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required={!initialData?.photo_url}
                    />
                    <Button type="button" variant="secondary" className="w-full pointer-events-none">
                      {photoPreview ? 'Cambiar Foto' : 'Subir Foto'}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG o WEBP. Máximo 5MB.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Visibilidad</label>
                    <p className="text-xs text-muted-foreground">Mostrar en la web pública</p>
                  </div>
                  <div className="relative flex items-center">
                    <select 
                      name="is_visible" 
                      defaultValue={initialData?.is_visible === false ? "false" : "true"}
                      className="p-2 border rounded-md text-sm bg-background"
                    >
                      <option value="true">Activo (Público)</option>
                      <option value="false">Oculto (Privado)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t pt-6">
          <Link href="/admin/especialistas" className={buttonVariants({ variant: "outline" })}>Cancelar</Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar Especialista'
            )}
          </Button>
        </div>
      </form>

      <ConfirmModal 
        isOpen={isConfirmOpen}
        title="¿Estás seguro de que deseas guardar los cambios?"
        onConfirm={processSubmit}
        onCancel={() => setIsConfirmOpen(false)}
        confirmText="Guardar"
      />
    </div>
  );
}

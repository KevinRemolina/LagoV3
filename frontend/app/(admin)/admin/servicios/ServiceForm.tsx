"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowLeft, Image as ImageIcon, Trash2, CheckCircle2 } from "lucide-react";
import { saveService, deleteServiceImage, setServiceCoverImage } from "./actions";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "../components/ConfirmModal";

export function ServiceForm({ 
  initialData, 
  categories, 
  specialistsList 
}: { 
  initialData?: any, 
  categories: any[], 
  specialistsList: any[] 
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Validation States
  const [title, setTitle] = useState(initialData?.title || '');
  const [categoryId, setCategoryId] = useState(initialData?.category_id || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [isPromotional, setIsPromotional] = useState(initialData?.is_promotional || false);
  const [promoStart, setPromoStart] = useState(initialData?.promotion_start ? new Date(initialData.promotion_start).toISOString().slice(0,16) : '');
  const [promoEnd, setPromoEnd] = useState(initialData?.promotion_end ? new Date(initialData.promotion_end).toISOString().slice(0,16) : '');

  // Multi-select for Specialists
  const initialSpecialists = initialData?.specialists?.map((s: any) => s.specialist_id) || [];
  const [selectedSpecialists, setSelectedSpecialists] = useState<string[]>(initialSpecialists);

  // JSONB Arrays
  const [benefits, setBenefits] = useState<string[]>(initialData?.benefits || []);
  const [included, setIncluded] = useState<string[]>(initialData?.included_services || []);
  
  // Image Preview State (New uploads)
  const [newImages, setNewImages] = useState<File[]>([]);
  const [coverIndex, setCoverIndex] = useState<number>(0);
  const router = useRouter();

  // Existing images
  const [existingImages, setExistingImages] = useState<any[]>(initialData?.images || []);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);
  const [imageToDelete, setImageToDelete] = useState<{id: string, path: string} | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const titleVal = formData.get('title') as string;
    const catVal = formData.get('category_id') as string;
    const descVal = formData.get('description') as string;

    if (!titleVal.trim() || !catVal) {
      toast.error("Faltan campos obligatorios en la pestaña General.");
      setActiveTab('general');
      return;
    }

    if (!descVal.trim()) {
      toast.error("La descripción completa es obligatoria en la pestaña Detalles.");
      setActiveTab('details');
      return;
    }

    // Validaciones de la pestaña Promociones
    const isPromotional = formData.get('is_promotional') === 'true';
    if (isPromotional) {
      const start = formData.get('promotion_start') as string;
      const end = formData.get('promotion_end') as string;
      
      if (!start || !end) {
        toast.error("Debes establecer las fechas de inicio y fin para la promoción.");
        setActiveTab('promo');
        return;
      }
      
      if (new Date(start) >= new Date(end)) {
        toast.error("La fecha de fin debe ser posterior a la fecha de inicio.");
        setActiveTab('promo');
        return;
      }
    }
    
    setPendingFormData(formData);
    setIsConfirmOpen(true);
  };

  const processSubmit = async () => {
    if (!pendingFormData) return;
    setIsConfirmOpen(false);
    setIsSubmitting(true);
    
    try {
      const formData = pendingFormData;
      
      formData.append("benefits", JSON.stringify(benefits));
      formData.append("included_services", JSON.stringify(included));
      formData.append("specialists", JSON.stringify(selectedSpecialists));
      
      // Delete any file blobs from formData
      formData.delete("images");
      
      let generatedId = initialData?.id || crypto.randomUUID();
      formData.append("generated_id", generatedId);
      
      const uploadedImagesData = [];
      
      if (newImages.length > 0) {
        const { createClient } = await import('@/utils/supabase/client');
        const supabase = createClient();
        
        for (let i = 0; i < newImages.length; i++) {
          const file = newImages[i];
          if (file && file.size > 0) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${crypto.randomUUID()}.${fileExt}`;
            const filePath = `${generatedId}/${fileName}`;
            
            const { error: uploadError } = await supabase.storage.from('services').upload(filePath, file, { upsert: true });
            
            if (!uploadError) {
              uploadedImagesData.push({
                storage_path: filePath,
                is_cover: (existingImages.length === 0 && i === coverIndex),
                sort_order: i
              });
            }
          }
        }
      }

      formData.append("uploaded_images_json", JSON.stringify(uploadedImagesData));

      const result = await saveService(formData);
      if (result?.success) {
        toast.success("Servicio guardado con éxito");
        router.push('/admin/servicios');
      }
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Error al guardar el servicio");
      setIsSubmitting(false);
    }
  };

  const toggleSpecialist = (id: string) => {
    setSelectedSpecialists(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const addToArray = (stateAction: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    if (val.trim()) {
      stateAction(prev => [...prev, val.trim()]);
    }
  };

  const removeFromArray = (stateAction: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    stateAction(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(prev => [...prev, ...Array.from(e.target.files as FileList)]);
    }
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    if (coverIndex === index) setCoverIndex(0);
    else if (coverIndex > index) setCoverIndex(coverIndex - 1);
  };

  const handleDeleteExistingImage = (imgId: string, path: string) => {
    setImageToDelete({ id: imgId, path });
  };

  const processDeleteImage = async () => {
    if (!imageToDelete) return;
    await deleteServiceImage(imageToDelete.id, imageToDelete.path);
    setExistingImages(prev => prev.filter(img => img.id !== imageToDelete.id));
    setImageToDelete(null);
  };

  const handleSetExistingCover = async (imgId: string) => {
    await setServiceCoverImage(initialData.id, imgId);
    setExistingImages(prev => prev.map(img => ({
      ...img,
      is_cover: img.id === imgId
    })));
  };

  const tabs = [
    { id: 'general', label: 'General', hasError: !title.trim() || !categoryId },
    { id: 'details', label: 'Detalles', hasError: !description.trim() },
    { id: 'promo', label: 'Promociones', hasError: isPromotional && (!promoStart || !promoEnd) },
    { id: 'specialists', label: 'Especialistas', hasError: false },
    { id: 'images', label: 'Imágenes', hasError: false },
  ];

  const totalRequired = 3 + (isPromotional ? 2 : 0);
  const filledRequired = (title.trim() ? 1 : 0) + 
                         (categoryId ? 1 : 0) + 
                         (description.trim() ? 1 : 0) + 
                         (isPromotional ? ((promoStart ? 1 : 0) + (promoEnd ? 1 : 0)) : 0);
  const progressPercentage = Math.round((filledRequired / totalRequired) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/servicios" className={buttonVariants({ variant: "ghost", size: "icon" })}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-heading text-3xl font-bold text-foreground">
          {initialData ? "Editar Servicio" : "Nuevo Servicio"}
        </h1>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-sm text-muted-foreground font-medium">
            <span>Completitud del servicio</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${progressPercentage === 100 ? 'bg-green-500' : 'bg-primary'}`} 
              style={{ width: `${progressPercentage}%` }} 
            />
          </div>
        </div>

        <div className="flex overflow-x-auto gap-2 border-b border-border pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={(e) => { e.preventDefault(); setActiveTab(tab.id); }}
              className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors whitespace-nowrap ${
                activeTab === tab.id 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab.label} {tab.hasError && <span className="text-red-500 ml-1" title="Falta información requerida">⚠️</span>}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-card border border-border p-6 rounded-xl shadow-sm">
        {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}
        
        {/* TAB: GENERAL */}
        <div className={activeTab === 'general' ? 'space-y-6' : 'hidden'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título del Servicio *</label>
              <Input name="title" defaultValue={initialData?.title} onChange={e => setTitle(e.target.value)} placeholder="Ej. Limpieza Facial Profunda" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoría *</label>
              <select name="category_id" defaultValue={initialData?.category_id || ''} onChange={e => setCategoryId(e.target.value)} className="w-full p-2 border rounded-md bg-background">
                <option value="" disabled>Seleccione una categoría</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Precio (Opcional)</label>
              <Input name="price" type="number" step="0.01" defaultValue={initialData?.price} placeholder="0.00" />
            </div>
            <div className="space-y-2 flex flex-col justify-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="show_price" value="true" defaultChecked={initialData?.show_price ?? true} className="w-4 h-4" />
                <span className="text-sm font-medium">Mostrar precio al público</span>
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <div className="space-y-2">
              <label className="text-sm font-medium">Estado del Servicio</label>
              <select name="status" defaultValue={initialData?.status || 'PUBLIC'} className="w-full p-2 border rounded-md bg-background">
                <option value="PUBLIC">Público (Visible en la web)</option>
                <option value="PRIVATE">Privado (Oculto, pero activo)</option>
                <option value="ARCHIVED">Archivado (Descontinuado)</option>
              </select>
            </div>
            <div className="space-y-2 flex flex-col justify-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="is_featured" value="true" defaultChecked={initialData?.is_featured} className="w-4 h-4" />
                <span className="text-sm font-medium">Marcar como Destacado (Aparecerá en el inicio)</span>
              </label>
            </div>
          </div>
        </div>

        {/* TAB: DETAILS */}
        <div className={activeTab === 'details' ? 'space-y-6' : 'hidden'}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción Corta</label>
            <textarea name="short_description" defaultValue={initialData?.short_description} rows={2} className="w-full px-3 py-2 border rounded-md bg-transparent" placeholder="Un resumen de una línea para tarjetas." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción Completa *</label>
            <textarea name="description" defaultValue={initialData?.description} onChange={e => setDescription(e.target.value)} rows={6} className="w-full px-3 py-2 border rounded-md bg-transparent" placeholder="Detalles exhaustivos del tratamiento." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t">
            <div className="space-y-4">
              <label className="text-sm font-medium">Beneficios</label>
              <div className="flex gap-2">
                <Input id="newBenefit" placeholder="Añadir beneficio..." onKeyDown={e => { if(e.key==='Enter') { e.preventDefault(); addToArray(setBenefits, e.currentTarget.value); e.currentTarget.value = '' } }} />
                <Button type="button" variant="secondary" onClick={() => { const el = document.getElementById('newBenefit') as HTMLInputElement; addToArray(setBenefits, el.value); el.value='' }}>Añadir</Button>
              </div>
              <ul className="space-y-2">
                {benefits.map((item, i) => (
                  <li key={i} className="flex justify-between items-center bg-muted p-2 rounded text-sm">
                    {item} <Button type="button" variant="ghost" size="icon" onClick={() => removeFromArray(setBenefits, i)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-medium">¿Qué Incluye?</label>
              <div className="flex gap-2">
                <Input id="newIncluded" placeholder="Añadir ítem..." onKeyDown={e => { if(e.key==='Enter') { e.preventDefault(); addToArray(setIncluded, e.currentTarget.value); e.currentTarget.value = '' } }} />
                <Button type="button" variant="secondary" onClick={() => { const el = document.getElementById('newIncluded') as HTMLInputElement; addToArray(setIncluded, el.value); el.value='' }}>Añadir</Button>
              </div>
              <ul className="space-y-2">
                {included.map((item, i) => (
                  <li key={i} className="flex justify-between items-center bg-muted p-2 rounded text-sm">
                    {item} <Button type="button" variant="ghost" size="icon" onClick={() => removeFromArray(setIncluded, i)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* TAB: PROMO */}
        <div className={activeTab === 'promo' ? 'space-y-6' : 'hidden'}>
          <div className="space-y-4">
            <label className="flex items-center gap-2 cursor-pointer bg-muted p-4 rounded-lg">
              <input type="checkbox" name="is_promotional" value="true" defaultChecked={initialData?.is_promotional} onChange={e => setIsPromotional(e.target.checked)} className="w-5 h-5 accent-primary" />
              <span className="text-base font-bold">Activar como Promoción Temporal</span>
            </label>
            <p className="text-sm text-muted-foreground">Al activarlo, debes establecer una fecha de inicio y fin. El servicio se archivará automáticamente cuando expire.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Fecha de Inicio</label>
              <Input name="promotion_start" type="datetime-local" defaultValue={initialData?.promotion_start ? new Date(initialData.promotion_start).toISOString().slice(0,16) : ''} onChange={e => setPromoStart(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fecha de Fin</label>
              <Input name="promotion_end" type="datetime-local" defaultValue={initialData?.promotion_end ? new Date(initialData.promotion_end).toISOString().slice(0,16) : ''} onChange={e => setPromoEnd(e.target.value)} />
            </div>
          </div>
        </div>

        {/* TAB: SPECIALISTS */}
        <div className={activeTab === 'specialists' ? 'space-y-6' : 'hidden'}>
          <p className="text-sm text-muted-foreground mb-4">Selecciona los especialistas que están capacitados para realizar este servicio.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialistsList.map(spec => {
              const isSelected = selectedSpecialists.includes(spec.id);
              return (
                <div 
                  key={spec.id} 
                  onClick={() => toggleSpecialist(spec.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                    isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isSelected ? 'bg-primary border-primary' : 'border-input'}`}>
                    {isSelected && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{spec.name}</p>
                    <p className="text-xs text-muted-foreground">{spec.position}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TAB: IMAGES */}
        <div className={activeTab === 'images' ? 'space-y-8' : 'hidden'}>
          
          {/* Existentes */}
          {existingImages.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Imágenes Actuales</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {existingImages.map(img => (
                  <div key={img.id} className={`relative rounded-lg overflow-hidden border-2 ${img.is_cover ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border'}`}>
                    <Image src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/services/${img.storage_path}`} alt="" width={300} height={300} className="object-cover aspect-square" />
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <Button type="button" size="icon" variant="destructive" className="h-8 w-8 rounded-full" onClick={() => handleDeleteExistingImage(img.id, img.storage_path)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      {!img.is_cover && (
                        <Button type="button" size="icon" variant="secondary" className="h-8 w-8 rounded-full" title="Hacer Portada" onClick={() => handleSetExistingCover(img.id)}>
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    {img.is_cover && <div className="absolute bottom-0 inset-x-0 bg-primary text-primary-foreground text-xs text-center py-1 font-bold">PORTADA</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nuevas */}
          <div className="space-y-4 pt-6 border-t">
            <h3 className="text-lg font-bold">Subir Nuevas Imágenes</h3>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/20 relative hover:bg-muted/50 transition-colors">
              <ImageIcon className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
              <p className="text-foreground font-medium mb-1">Arrastra y suelta imágenes o haz click</p>
              <p className="text-sm text-muted-foreground">Puedes seleccionar múltiples archivos JPG, PNG o WEBP.</p>
              <Input type="file" multiple accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>

            {newImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {newImages.map((file, idx) => (
                  <div key={idx} className={`relative rounded-lg overflow-hidden border-2 ${coverIndex === idx && existingImages.length === 0 ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border'}`}>
                    <img src={URL.createObjectURL(file)} alt="preview" className="object-cover aspect-square w-full" />
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <Button type="button" size="icon" variant="destructive" className="h-8 w-8 rounded-full" onClick={() => removeNewImage(idx)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      {existingImages.length === 0 && coverIndex !== idx && (
                        <Button type="button" size="icon" variant="secondary" className="h-8 w-8 rounded-full" title="Hacer Portada" onClick={() => setCoverIndex(idx)}>
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    {existingImages.length === 0 && coverIndex === idx && <div className="absolute bottom-0 inset-x-0 bg-primary text-primary-foreground text-xs text-center py-1 font-bold">PORTADA</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 border-t pt-6">
          <Link href="/admin/servicios" className={buttonVariants({ variant: "outline" })}>
            Cancelar
          </Link>
          <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar Servicio'
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
      
      <ConfirmModal 
        isOpen={!!imageToDelete}
        title="¿Seguro que deseas eliminar esta imagen permanentemente?"
        onConfirm={processDeleteImage}
        onCancel={() => setImageToDelete(null)}
        confirmText="Eliminar"
        confirmVariant="destructive"
      />
    </div>
  );
}

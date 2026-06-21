"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitContactForm } from "@/app/(public)/contacto/actions";

export function ContactForm({ services }: { services: { id: string, title: string }[] }) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("¡Mensaje enviado con éxito!", {
          description: "Nos pondremos en contacto contigo lo antes posible."
        });
        form.reset();
      }
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-sm font-medium">Nombre completo</label>
          <input 
            type="text" 
            id="fullName" 
            name="fullName"
            required
            placeholder="Tu nombre" 
            className="w-full h-12 px-3 rounded-md border border-input bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">Teléfono / WhatsApp</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone"
            required
            placeholder="+57 300 000 0000" 
            className="w-full h-12 px-3 rounded-md border border-input bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Correo electrónico</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            required
            placeholder="tucorreo@ejemplo.com" 
            className="w-full h-12 px-3 rounded-md border border-input bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="serviceInterestId" className="text-sm font-medium">Servicio de interés</label>
          <select 
            id="serviceInterestId" 
            name="serviceInterestId"
            className="w-full h-12 px-3 py-2 rounded-md border border-input bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="">Selecciona un servicio</option>
            {services.map(s => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">Mensaje</label>
        <textarea 
          id="message" 
          name="message"
          required
          rows={4} 
          placeholder="¿En qué podemos ayudarte?" 
          className="w-full px-3 py-2 rounded-md border border-input bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
        />
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto font-semibold" disabled={isPending}>
        {isPending ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
        Enviar Mensaje
      </Button>
    </form>
  );
}

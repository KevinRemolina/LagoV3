"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitContactForm } from "@/app/(public)/contacto/actions";

interface ContactFormProps {
  services: { id: string; title: string }[];
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  message?: string;
}

// Acepta números colombianos (con o sin +57) y formatos internacionales básicos.
// Permite dígitos, espacios, guiones, paréntesis y un signo + inicial.
const PHONE_FORMAT_REGEX = /^\+?[\d\s()-]{7,20}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(name: keyof FormErrors, value: string): string | undefined {
  switch (name) {
    case "fullName": {
      const trimmed = value.trim();
      if (trimmed.length < 2) return "Ingresa tu nombre completo.";
      if (trimmed.length > 150) return "El nombre es demasiado largo.";
      return undefined;
    }
    case "phone": {
      const trimmed = value.trim();
      const digitsOnly = trimmed.replace(/\D/g, "");
      if (!trimmed) return "El teléfono es obligatorio.";
      if (!PHONE_FORMAT_REGEX.test(trimmed)) return "Ingresa un teléfono válido.";
      if (digitsOnly.length < 7 || digitsOnly.length > 15) return "Ingresa un teléfono válido.";
      return undefined;
    }
    case "email": {
      const trimmed = value.trim();
      if (!trimmed) return "El correo es obligatorio.";
      if (!EMAIL_REGEX.test(trimmed)) return "Ingresa un correo electrónico válido.";
      return undefined;
    }
    case "message": {
      const trimmed = value.trim();
      if (trimmed.length < 10) return "Cuéntanos un poco más (mínimo 10 caracteres).";
      if (trimmed.length > 2000) return "El mensaje es demasiado largo.";
      return undefined;
    }
    default:
      return undefined;
  }
}

export function ContactForm({ services }: ContactFormProps) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FormErrors>({});

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "fullName" || name === "phone" || name === "email" || name === "message") {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot: si un bot llenó este campo oculto, no mostramos error,
    // simplemente simulamos éxito sin enviar nada al servidor.
    const honeypot = (formData.get("website") as string) || "";
    if (honeypot.trim().length > 0) {
      toast.success("¡Mensaje enviado con éxito!", {
        description: "Nos pondremos en contacto contigo lo antes posible.",
      });
      form.reset();
      return;
    }

    const newErrors: FormErrors = {
      fullName: validateField("fullName", (formData.get("fullName") as string) || ""),
      phone: validateField("phone", (formData.get("phone") as string) || ""),
      email: validateField("email", (formData.get("email") as string) || ""),
      message: validateField("message", (formData.get("message") as string) || ""),
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      toast.error("Revisa los campos marcados antes de continuar.");
      return;
    }

    startTransition(() => {
      submitContactForm(formData).then((result) => {
        if ("error" in result) {
          toast.error(result.error);
        } else {
          toast.success("¡Mensaje enviado con éxito!", {
            description: "Nos pondremos en contacto contigo lo antes posible.",
          });
          form.reset();
          setErrors({});
        }
      });
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {/* Honeypot anti-spam: oculto visualmente, pero accesible para bots simples */}
      <div className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">No llenar este campo</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Teléfono primero: es el canal de contacto prioritario (WhatsApp) */}
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Teléfono / WhatsApp <span className="text-primary">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          placeholder="+57 300 000 0000"
          onBlur={handleBlur}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className={`w-full h-12 px-3 rounded-md border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${errors.phone ? "border-destructive" : "border-input"
            }`}
        />
        {errors.phone && (
          <p id="phone-error" className="text-xs text-destructive">
            {errors.phone}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Te contactaremos preferiblemente por este número vía WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-sm font-medium">
            Nombre completo <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            placeholder="Tu nombre"
            onBlur={handleBlur}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={`w-full h-12 px-3 rounded-md border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${errors.fullName ? "border-destructive" : "border-input"
              }`}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-xs text-destructive">
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Correo electrónico <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="tucorreo@ejemplo.com"
            onBlur={handleBlur}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full h-12 px-3 rounded-md border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${errors.email ? "border-destructive" : "border-input"
              }`}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-destructive">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="serviceInterestId" className="text-sm font-medium">
          Servicio de interés (Opcional)
        </label>
        <select
          id="serviceInterestId"
          name="serviceInterestId"
          className="w-full h-12 px-3 py-2 rounded-md border border-input bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <option value="">Selecciona un servicio</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Mensaje <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="¿En qué podemos ayudarte?"
          onBlur={handleBlur}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full px-3 py-2 rounded-md border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none ${errors.message ? "border-destructive" : "border-input"
            }`}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto font-semibold" disabled={isPending}>
        {isPending ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
        Enviar Mensaje
      </Button>
    </form>
  );
}
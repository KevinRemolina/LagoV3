"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { z } from "zod";

const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Ingresa tu nombre completo.")
    .max(150, "El nombre es demasiado largo."),
  phone: z
    .string()
    .trim()
    .min(7, "Ingresa un teléfono válido.")
    .max(20, "Ingresa un teléfono válido.")
    .regex(/^\+?[\d\s()-]{7,20}$/, "Ingresa un teléfono válido."),
  email: z.string().trim().email("Ingresa un correo electrónico válido."),
  serviceInterestId: z
    .string()
    .trim()
    .uuid("Selecciona un servicio válido.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres).")
    .max(2000, "El mensaje es demasiado largo."),
  // Campo honeypot: si llega con contenido, es un bot.
  website: z.string().max(0).optional().or(z.literal("")),
});

type ContactFormResult = { success: true } | { error: string };

export async function submitContactForm(formData: FormData): Promise<ContactFormResult> {
  const rawData = {
    fullName: formData.get("fullName")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    serviceInterestId: formData.get("serviceInterestId")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
    website: formData.get("website")?.toString() ?? "",
  };

  const parsed = contactFormSchema.safeParse(rawData);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return { error: firstIssue?.message ?? "Revisa los datos ingresados." };
  }

  // Honeypot activado: respondemos éxito falso sin guardar nada,
  // para no delatar la protección anti-spam al bot.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { success: true };
  }

  const supabase = await createClient();

  let ipAddress: string | null = null;
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : null;
  } catch {
    ipAddress = null;
  }

  const { error } = await supabase.from("contact_forms").insert({
    full_name: parsed.data.fullName,
    phone: parsed.data.phone,
    email: parsed.data.email,
    service_interest_id: parsed.data.serviceInterestId || null,
    message: parsed.data.message,
    ip_address: ipAddress,
    status: "PENDING",
  });

  if (error) {
    console.error("Error al guardar formulario de contacto:", error);
    return { error: "No fue posible enviar tu solicitud. Inténtalo nuevamente." };
  }

  return { success: true };
}
"use server";

import { createClient } from "@/utils/supabase/server";

export async function submitContactForm(formData: FormData) {
  try {
    const fullName = formData.get('fullName')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const serviceInterestId = formData.get('serviceInterestId')?.toString();
    const message = formData.get('message')?.toString().trim();

    if (!fullName || fullName.length < 2) {
      return { error: "El nombre es obligatorio y debe tener al menos 2 caracteres." };
    }
    if (!phone) {
      return { error: "El número de teléfono es obligatorio." };
    }
    if (!email || !email.includes('@')) {
      return { error: "El correo electrónico es inválido." };
    }
    if (!message || message.length < 10) {
      return { error: "El mensaje debe tener al menos 10 caracteres." };
    }

    const supabase = await createClient();

    const insertData: any = {
      full_name: fullName,
      phone,
      email,
      message,
    };

    if (serviceInterestId) {
      insertData.service_interest_id = serviceInterestId;
    }

    const { error } = await supabase
      .from('contact_forms')
      .insert([insertData]);

    if (error) {
      console.error("Error inserting contact form:", error);
      return { error: "Hubo un error al procesar tu solicitud. Por favor intenta más tarde." };
    }

    return { success: true };
  } catch (err: any) {
    return { error: "Error interno del servidor." };
  }
}

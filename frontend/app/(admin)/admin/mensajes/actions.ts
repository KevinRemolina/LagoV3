"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function markAsRead(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('contact_forms')
    .update({ status: 'READ', read_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { error: "No se pudo actualizar el estado del mensaje." };
  }

  revalidatePath("/admin/mensajes");
  return { success: true };
}

export async function markAsArchived(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('contact_forms')
    .update({ status: 'ARCHIVED', archived_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    return { error: "No se pudo archivar el mensaje." };
  }

  revalidatePath("/admin/mensajes");
  return { success: true };
}

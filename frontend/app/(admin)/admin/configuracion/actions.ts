'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getPromotionalServices() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('services')
    .select('id, title, status')
    .eq('is_promotional', true)
    .order('title')
    
  if (error) throw error
  return data
}

export async function getSettings() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .in('key', ['promotions_title', 'promotions_subtitle', 'promotions_selected_ids'])
    
  if (error) throw error
  
  const settingsObj: Record<string, any> = {
    promotions_title: 'Promociones Especiales',
    promotions_subtitle: 'Aprovecha nuestras ofertas por tiempo limitado y agenda tu cita hoy mismo.',
    promotions_selected_ids: '[]'
  }
  
  if (data) {
    data.forEach(item => {
      settingsObj[item.key] = item.value
    })
  }
  
  return settingsObj
}

export async function saveSettings(formData: FormData) {
  const supabase = await createClient()
  
  const title = formData.get('promotions_title') as string
  const subtitle = formData.get('promotions_subtitle') as string
  const selectedIdsStr = formData.get('promotions_selected_ids') as string
  
  const updates = [
    { key: 'promotions_title', value: title },
    { key: 'promotions_subtitle', value: subtitle },
    { key: 'promotions_selected_ids', value: selectedIdsStr },
  ]
  
  // Upsert settings
  for (const item of updates) {
    const { error } = await supabase
      .from('settings')
      .upsert({ key: item.key, value: item.value }, { onConflict: 'key' })
      
    if (error) throw error
  }
  
  revalidatePath('/admin/configuracion')
  revalidatePath('/')
  
  return { success: true }
}

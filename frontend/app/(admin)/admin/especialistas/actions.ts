'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getSpecialists() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('specialists').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getSpecialist(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('specialists').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function deleteSpecialist(id: string) {
  const supabase = await createClient()
  
  // Delete from storage
  const { data: files } = await supabase.storage.from('specialists').list(id)
  if (files && files.length > 0) {
    const filePaths = files.map(x => `${id}/${x.name}`)
    await supabase.storage.from('specialists').remove(filePaths)
  }

  const { error } = await supabase.from('specialists').delete().eq('id', id)
  if (error) throw error

  revalidatePath('/admin/especialistas')
  revalidatePath('/especialistas')
}

export async function saveSpecialist(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string | null
  const generated_id = formData.get('generated_id') as string
  const name = formData.get('name') as string
  const position = formData.get('position') as string
  const description = formData.get('description') as string
  const is_visible = formData.get('is_visible') === 'true'
  const whatsapp = formData.get('whatsapp') as string
  
  // Parse JSON fields
  const certificationsStr = formData.get('certifications') as string
  const certifications = certificationsStr ? JSON.parse(certificationsStr) : []
  
  const schedulesStr = formData.get('schedules') as string
  const schedules = schedulesStr ? JSON.parse(schedulesStr) : []
  
  const socialLinksStr = formData.get('social_links') as string
  const social_links = socialLinksStr ? JSON.parse(socialLinksStr) : {}

  let specialistId = id || generated_id || crypto.randomUUID()
  
  let photo_url = formData.get('photo_url') as string | null
  if (!photo_url) {
    photo_url = formData.get('existing_photo_url') as string | null
  }

  if (!photo_url) {
    throw new Error("La foto es obligatoria")
  }

  const payload: any = {
    id: specialistId,
    name,
    position,
    description,
    is_visible,
    whatsapp,
    certifications,
    schedules,
    social_links,
    photo_url
  }

  if (id) {
    const { error } = await supabase.from('specialists').update(payload).eq('id', specialistId)
    if (error) throw error
  } else {
    const { error } = await supabase.from('specialists').insert(payload)
    if (error) throw error
  }

  revalidatePath('/admin/especialistas')
  revalidatePath('/especialistas')
  return { success: true }
}

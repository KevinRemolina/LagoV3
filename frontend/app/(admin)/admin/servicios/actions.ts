'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getServices() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      category:categories(name),
      images:service_images(storage_path, is_cover)
    `)
    .order('created_at', { ascending: false })
    
  if (error) throw error
  return data
}

export async function getService(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      images:service_images(*),
      specialists:service_specialists(specialist_id)
    `)
    .eq('id', id)
    .single()
    
  if (error) throw error
  return data
}

export async function getCategories() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('categories').select('*').order('name')
  if (error) throw error
  return data
}

export async function getSpecialistsList() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('specialists').select('id, name, position').order('name')
  if (error) throw error
  return data
}

export async function deleteService(id: string) {
  const supabase = await createClient()
  
  // Storage removal
  const { data: files } = await supabase.storage.from('services').list(id)
  if (files && files.length > 0) {
    const filePaths = files.map(x => `${id}/${x.name}`)
    await supabase.storage.from('services').remove(filePaths)
  }

  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) throw error

  revalidatePath('/admin/servicios')
  revalidatePath('/servicios')
}

export async function saveService(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string | null
  const title = formData.get('title') as string
  const category_id = formData.get('category_id') as string
  const short_description = formData.get('short_description') as string
  const description = formData.get('description') as string
  const recommendations = formData.get('recommendations') as string
  const contraindications = formData.get('contraindications') as string
  const observations = formData.get('observations') as string
  
  const priceStr = formData.get('price') as string
  const price = priceStr ? parseFloat(priceStr) : null
  const show_price = formData.get('show_price') === 'true'
  const status = formData.get('status') as string
  const is_featured = formData.get('is_featured') === 'true'
  
  const is_promotional = formData.get('is_promotional') === 'true'
  const promotion_start = formData.get('promotion_start') as string || null
  const promotion_end = formData.get('promotion_end') as string || null

  const benefitsStr = formData.get('benefits') as string
  const benefits = benefitsStr ? JSON.parse(benefitsStr) : []
  
  const includedStr = formData.get('included_services') as string
  const included_services = includedStr ? JSON.parse(includedStr) : []

  const generated_id = formData.get('generated_id') as string
  const serviceId = id || generated_id || crypto.randomUUID()

  const payload: any = {
    id: serviceId,
    category_id,
    title,
    short_description,
    description,
    recommendations,
    contraindications,
    observations,
    price,
    show_price,
    status,
    is_featured,
    is_promotional,
    promotion_start: is_promotional ? promotion_start : null,
    promotion_end: is_promotional ? promotion_end : null,
    benefits,
    included_services
  }

  if (id) {
    const { error } = await supabase.from('services').update(payload).eq('id', serviceId)
    if (error) throw error
  } else {
    const { error } = await supabase.from('services').insert(payload)
    if (error) throw error
  }

  // Handle Specialists (service_specialists pivot)
  const specialistsStr = formData.get('specialists') as string
  const selectedSpecialists: string[] = specialistsStr ? JSON.parse(specialistsStr) : []
  
  // First, delete old relations
  await supabase.from('service_specialists').delete().eq('service_id', serviceId)
  
  // Insert new relations
  if (selectedSpecialists.length > 0) {
    const pivotData = selectedSpecialists.map(specId => ({
      service_id: serviceId,
      specialist_id: specId
    }))
    await supabase.from('service_specialists').insert(pivotData)
  }

  // Handle Images (Now uploaded directly from client)
  const uploadedImagesStr = formData.get('uploaded_images_json') as string
  const newUploadedImages = uploadedImagesStr ? JSON.parse(uploadedImagesStr) : []
  
  const uploadedImages = newUploadedImages.map((img: any) => ({
    ...img,
    service_id: serviceId
  }))

  if (uploadedImages.length > 0) {
    await supabase.from('service_images').insert(uploadedImages)
  }

  revalidatePath('/admin/servicios')
  revalidatePath('/servicios')
  return { success: true }
}

export async function deleteServiceImage(imageId: string, storagePath: string) {
  const supabase = await createClient()
  
  // Remove from storage
  await supabase.storage.from('services').remove([storagePath])
  
  // Remove from database
  const { error } = await supabase.from('service_images').delete().eq('id', imageId)
  if (error) throw error
  
  // No redirect, just return success so the client can update UI
  return { success: true }
}

export async function setServiceCoverImage(serviceId: string, imageId: string) {
  const supabase = await createClient()
  // Database constraint logic: `service_images_enforce_single_cover` automatically un-sets others
  // when one is marked is_cover = true.
  const { error } = await supabase.from('service_images').update({ is_cover: true }).eq('id', imageId)
  if (error) throw error
  return { success: true }
}

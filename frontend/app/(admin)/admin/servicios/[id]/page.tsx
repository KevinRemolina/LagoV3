import { getService, getCategories, getSpecialistsList } from "../actions"
import { ServiceForm } from "../ServiceForm"
import { notFound } from "next/navigation"

export default async function EditServicePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  let service, categories, specialistsList;
  try {
    [service, categories, specialistsList] = await Promise.all([
      getService(params.id),
      getCategories(),
      getSpecialistsList()
    ])
  } catch (error) {
    notFound()
  }

  return <ServiceForm initialData={service} categories={categories} specialistsList={specialistsList} />
}

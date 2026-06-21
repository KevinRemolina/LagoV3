import { getService, getCategories, getSpecialistsList } from "../actions"
import { ServiceForm } from "../ServiceForm"
import { notFound } from "next/navigation"

export default async function EditServicePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const [service, categories, specialistsList] = await Promise.all([
      getService(params.id),
      getCategories(),
      getSpecialistsList()
    ])

    return <ServiceForm initialData={service} categories={categories} specialistsList={specialistsList} />
  } catch (error) {
    notFound()
  }
}

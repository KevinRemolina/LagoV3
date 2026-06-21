import { getCategories, getSpecialistsList } from "../actions"
import { ServiceForm } from "../ServiceForm"

export default async function NewServicePage() {
  const [categories, specialistsList] = await Promise.all([
    getCategories(),
    getSpecialistsList()
  ])

  return <ServiceForm categories={categories} specialistsList={specialistsList} />
}

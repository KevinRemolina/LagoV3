import { getSpecialist } from "../actions"
import { SpecialistForm } from "../SpecialistForm"
import { notFound } from "next/navigation"

export default async function EditSpecialistPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const specialist = await getSpecialist(params.id)
    return <SpecialistForm initialData={specialist} />
  } catch (error) {
    notFound()
  }
}

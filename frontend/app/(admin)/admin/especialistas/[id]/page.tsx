import { getSpecialist } from "../actions"
import { SpecialistForm } from "../SpecialistForm"
import { notFound } from "next/navigation"

export default async function EditSpecialistPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  let specialist;
  try {
    specialist = await getSpecialist(params.id)
  } catch (error) {
    notFound()
  }

  return <SpecialistForm initialData={specialist} />
}

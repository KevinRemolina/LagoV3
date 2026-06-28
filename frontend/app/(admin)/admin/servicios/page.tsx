import { getServices, deleteService, getCategories, getSpecialistsList } from "./actions"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ServicesList } from "./ServicesList"

export default async function ServicesPage() {
  const [services, categories, specialists] = await Promise.all([
    getServices(),
    getCategories(),
    getSpecialistsList()
  ])

  const deleteAction = async (id: string) => {
    'use server'
    await deleteService(id)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Servicios</h1>
          <p className="text-muted-foreground mt-1">Catálogo de tratamientos y promociones</p>
        </div>
        <Link href="/admin/servicios/nuevo" className={buttonVariants({ variant: "default" })}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Servicio
        </Link>
      </div>

      <ServicesList 
        services={services || []} 
        categories={categories || []} 
        specialists={specialists || []} 
        deleteServiceAction={deleteAction}
      />
    </div>
  )
}
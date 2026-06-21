import { getSpecialists, deleteSpecialist } from "./actions"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import Image from "next/image"

export default async function SpecialistsPage() {
  const specialists = await getSpecialists()

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Especialistas</h1>
          <p className="text-muted-foreground mt-1">Gestiona el equipo de profesionales del Spa</p>
        </div>
        <Link href="/admin/especialistas/nuevo" className={buttonVariants({ variant: "default" })}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Especialista
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4">Especialista</th>
                  <th className="px-6 py-4">Cargo</th>
                  <th className="px-6 py-4">Visibilidad</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {specialists?.map((spec) => (
                  <tr key={spec.id} className="bg-card border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-medium flex items-center gap-4">
                      {spec.photo_url ? (
                        <Image src={spec.photo_url} alt={spec.name} width={40} height={40} className="rounded-full object-cover w-10 h-10 border border-border" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground border border-border">
                          {spec.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="text-foreground">{spec.name}</p>
                        <p className="text-muted-foreground text-xs font-normal">{spec.whatsapp || 'Sin WhatsApp'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{spec.position}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${spec.is_visible ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {spec.is_visible ? 'Público' : 'Oculto'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/especialistas/${spec.id}`} className={buttonVariants({ variant: "ghost", size: "icon" }) + " hover:text-primary"}>
                          <Edit className="w-4 h-4" />
                        </Link>
                        <form action={async () => {
                          'use server'
                          await deleteSpecialist(spec.id)
                        }}>
                          <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" type="submit">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!specialists || specialists.length === 0) && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                      No hay especialistas registrados. ¡Crea el primero!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

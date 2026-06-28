import { getServices, deleteService } from "./actions"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, Trash2, Tag, CheckCircle } from "lucide-react"

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
      status === 'PUBLIC' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
      status === 'PRIVATE' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    }`}>
      {status}
    </span>
  )
}

export default async function ServicesPage() {
  const services = await getServices()

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

      {(!services || services.length === 0) ? (
        <Card>
          <CardContent className="px-6 py-12 text-center text-muted-foreground">
            No hay servicios registrados. ¡Crea el primero!
          </CardContent>
        </Card>
      ) : (
        <>
          {/* ===== VISTA DESKTOP / TABLET (md+) — Tabla completa ===== */}
          <Card className="hidden md:block">
            <CardContent className="p-0">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                    <tr>
                      <th className="px-6 py-4">Título</th>
                      <th className="px-6 py-4">Categoría</th>
                      <th className="px-6 py-4">Estado</th>
                      <th className="px-6 py-4">Precio</th>
                      <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((svc) => (
                      <tr key={svc.id} className="bg-card border-b border-border hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4 font-medium">
                          <div className="flex items-center gap-2">
                            <span className="truncate max-w-[250px]" title={svc.title}>{svc.title}</span>
                            {svc.is_promotional && <Tag className="w-4 h-4 text-primary shrink-0" />}
                            {svc.is_featured && <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />}
                          </div>
                        </td>
                        <td className="px-6 py-4">{svc.category?.name}</td>
                        <td className="px-6 py-4"><StatusBadge status={svc.status} /></td>
                        <td className="px-6 py-4">${svc.price ? svc.price.toLocaleString() : 'N/A'}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/servicios/${svc.id}`} className={buttonVariants({ variant: "ghost", size: "icon" }) + " hover:text-primary"}>
                              <Edit className="w-4 h-4" />
                            </Link>
                            <form action={async () => {
                              'use server'
                              await deleteService(svc.id)
                            }}>
                              <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" type="submit">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* ===== VISTA MOBILE (<md) — Cards apiladas ===== */}
          <div className="grid gap-3 md:hidden">
            {services.map((svc) => (
              <Card key={svc.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-medium truncate" title={svc.title}>{svc.title}</span>
                      {svc.is_promotional && <Tag className="w-4 h-4 text-primary shrink-0" />}
                      {svc.is_featured && <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />}
                    </div>
                    <StatusBadge status={svc.status} />
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{svc.category?.name}</span>
                    <span className="font-medium text-foreground">
                      ${svc.price ? svc.price.toLocaleString() : 'N/A'}
                    </span>
                  </div>

                  <div className="flex justify-end gap-2 pt-1 border-t">
                    <Link
                      href={`/admin/servicios/${svc.id}`}
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Link>
                    <form action={async () => {
                      'use server'
                      await deleteService(svc.id)
                    }}>
                      <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" type="submit">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Eliminar
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
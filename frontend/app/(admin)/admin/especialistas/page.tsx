import { getSpecialists, deleteSpecialist } from "./actions"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react"
import Image from "next/image"
import { DeleteButton } from "../components/DeleteButton"

function VisibilityBadge({ isVisible }: { isVisible: boolean }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
      isVisible
        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    }`}>
      {isVisible ? 'Público' : 'Oculto'}
    </span>
  )
}

function SpecialistAvatar({ photoUrl, name, size = 40 }: { photoUrl: string | null; name: string; size?: number }) {
  if (photoUrl) {
    return (
      <Image
        src={photoUrl}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover border border-border shrink-0"
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <div
      className="rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground border border-border shrink-0"
      style={{ width: size, height: size }}
    >
      {name.charAt(0)}
    </div>
  )
}

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

      {(!specialists || specialists.length === 0) ? (
        <Card>
          <CardContent className="px-6 py-12 text-center text-muted-foreground">
            No hay especialistas registrados. ¡Crea el primero!
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
                      <th className="px-6 py-4">Especialista</th>
                      <th className="px-6 py-4">Cargo</th>
                      <th className="px-6 py-4">Visibilidad</th>
                      <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specialists.map((spec) => (
                      <tr key={spec.id} className="bg-card border-b border-border hover:bg-muted/20 transition-colors">
                        <td className="px-6 py-4 font-medium">
                          <div className="flex items-center gap-4">
                            <SpecialistAvatar photoUrl={spec.photo_url} name={spec.name} />
                            <div>
                              <p className="text-foreground">{spec.name}</p>
                              <p className="text-muted-foreground text-xs font-normal">{spec.whatsapp || 'Sin WhatsApp'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">{spec.position}</td>
                        <td className="px-6 py-4"><VisibilityBadge isVisible={spec.is_visible} /></td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/especialistas#especialista-${spec.id}`} target="_blank" className={buttonVariants({ variant: "ghost", size: "icon" }) + " hover:text-primary"} title="Vista previa pública">
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                            <Link href={`/admin/especialistas/${spec.id}`} className={buttonVariants({ variant: "ghost", size: "icon" }) + " hover:text-primary"} title="Editar">
                              <Edit className="w-4 h-4" />
                            </Link>
                            <DeleteButton 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive hover:bg-destructive/10" 
                              onDelete={async () => {
                                'use server'
                                await deleteSpecialist(spec.id)
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </DeleteButton>
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
            {specialists.map((spec) => (
              <Card key={spec.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <SpecialistAvatar photoUrl={spec.photo_url} name={spec.name} size={48} />
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{spec.name}</p>
                        <p className="text-muted-foreground text-xs truncate">{spec.whatsapp || 'Sin WhatsApp'}</p>
                      </div>
                    </div>
                    <VisibilityBadge isVisible={spec.is_visible} />
                  </div>

                  <div className="text-sm text-muted-foreground border-t pt-3">
                    <span className="text-foreground font-medium">{spec.position}</span>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/especialistas#especialista-${spec.id}`}
                      target="_blank"
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                      title="Vista previa pública"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Ver
                    </Link>
                    <Link
                      href={`/admin/especialistas/${spec.id}`}
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Link>
                    <DeleteButton 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive hover:bg-destructive/10" 
                      onDelete={async () => {
                        'use server'
                        await deleteSpecialist(spec.id)
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Eliminar
                    </DeleteButton>
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
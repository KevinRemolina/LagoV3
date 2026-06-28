'use client'

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, Trash2, Tag, CheckCircle, Search, X, ExternalLink } from "lucide-react"
import { DeleteButton } from "../components/DeleteButton"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

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

export function ServicesList({
  services,
  categories,
  specialists,
  deleteServiceAction
}: {
  services: any[]
  categories: any[]
  specialists: any[]
  deleteServiceAction: (id: string) => Promise<void>
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("ALL")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [specialistFilter, setSpecialistFilter] = useState("ALL")
  const [isPromotionalFilter, setIsPromotionalFilter] = useState(false)

  const filteredServices = useMemo(() => {
    return services.filter((svc) => {
      // Name filter
      if (searchTerm && !svc.title.toLowerCase().includes(searchTerm.toLowerCase())) return false
      // Category filter
      if (categoryFilter !== "ALL" && String(svc.category_id) !== categoryFilter) return false
      // Status filter
      if (statusFilter !== "ALL" && svc.status !== statusFilter) return false
      // Promotional filter
      if (isPromotionalFilter && !svc.is_promotional) return false
      // Specialist filter
      if (specialistFilter !== "ALL") {
        if (!svc.specialists?.some((s: any) => String(s.specialist_id) === specialistFilter)) {
          return false
        }
      }
      return true
    })
  }, [services, searchTerm, categoryFilter, statusFilter, specialistFilter, isPromotionalFilter])

  const hasActiveFilters = searchTerm !== "" || categoryFilter !== "ALL" || statusFilter !== "ALL" || specialistFilter !== "ALL" || isPromotionalFilter

  const resetFilters = () => {
    setSearchTerm("")
    setCategoryFilter("ALL")
    setStatusFilter("ALL")
    setSpecialistFilter("ALL")
    setIsPromotionalFilter(false)
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Buscar por nombre</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val || "ALL")}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Todas">
                    {categoryFilter === "ALL" 
                      ? "Todas" 
                      : categories.find((c: any) => String(c.id) === categoryFilter)?.name || categoryFilter}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todas</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "ALL")}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Todos">
                    {statusFilter === "ALL" 
                      ? "Todos" 
                      : statusFilter === "PUBLIC" 
                        ? "Público" 
                        : "Privado"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todos</SelectItem>
                  <SelectItem value="PUBLIC">Público</SelectItem>
                  <SelectItem value="PRIVATE">Privado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialist">Especialista</Label>
              <Select value={specialistFilter} onValueChange={(val) => setSpecialistFilter(val || "ALL")}>
                <SelectTrigger id="specialist">
                  <SelectValue placeholder="Todos">
                    {specialistFilter === "ALL" 
                      ? "Todos" 
                      : specialists.find((s: any) => String(s.id) === specialistFilter)?.name || specialistFilter}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todos</SelectItem>
                  {specialists.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="promotional"
                checked={isPromotionalFilter}
                onCheckedChange={setIsPromotionalFilter}
              />
              <Label htmlFor="promotional">Solo promociones</Label>
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground h-8">
                <X className="w-4 h-4 mr-2" />
                Limpiar filtros
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {(!filteredServices || filteredServices.length === 0) ? (
        <Card>
          <CardContent className="px-6 py-12 text-center text-muted-foreground">
            No se encontraron servicios con los filtros actuales.
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
                    {filteredServices.map((svc) => (
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
                            {svc.category?.slug && svc.slug && (
                              <Link 
                                href={`/servicios/${svc.category.slug}/${svc.slug}`} 
                                target="_blank" 
                                className={buttonVariants({ variant: "ghost", size: "icon" }) + " hover:text-primary"}
                                title="Vista previa pública"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                            )}
                            <Link href={`/admin/servicios/${svc.id}`} className={buttonVariants({ variant: "ghost", size: "icon" }) + " hover:text-primary"} title="Editar">
                              <Edit className="w-4 h-4" />
                            </Link>
                            <DeleteButton 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive hover:bg-destructive/10" 
                              onDelete={async () => {
                                await deleteServiceAction(svc.id)
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
            {filteredServices.map((svc) => (
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
                    {svc.category?.slug && svc.slug && (
                      <Link
                        href={`/servicios/${svc.category.slug}/${svc.slug}`}
                        target="_blank"
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                        title="Vista previa pública"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Ver
                      </Link>
                    )}
                    <Link
                      href={`/admin/servicios/${svc.id}`}
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
                        await deleteServiceAction(svc.id)
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

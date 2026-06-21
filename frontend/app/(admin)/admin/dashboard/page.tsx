import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, CalendarCheck, MessageSquare, Plus } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export const revalidate = 0;

export default async function DashboardPage() {
  const supabase = await createClient();

  const { count: servicesCount } = await supabase
    .from('services')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'PUBLIC');

  const { count: specialistsCount } = await supabase
    .from('specialists')
    .select('*', { count: 'exact', head: true })
    .eq('is_visible', true);

  const { count: messagesCount } = await supabase
    .from('contact_forms')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'PENDING');

  const stats = [
    { name: "Nuevos Mensajes", value: messagesCount || 0, icon: MessageSquare },
    { name: "Servicios Activos", value: servicesCount || 0, icon: Sparkles },
    { name: "Especialistas Visibles", value: specialistsCount || 0, icon: Users },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Panel Principal</h1>
          <p className="text-muted-foreground mt-1">Resumen en tiempo real de tu Spa</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/servicios">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Servicio
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Próximas Citas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
              <CalendarCheck className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Módulo de citas en construcción.</p>
              <p className="text-sm mt-2">Próximamente verás aquí la agenda del día.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/servicios" className="w-full">
              <Button variant="outline" className="w-full justify-start font-medium h-12 mb-4">
                <Sparkles className="w-4 h-4 mr-3 text-primary" />
                Gestionar Servicios
              </Button>
            </Link>
            <Link href="/admin/especialistas" className="w-full">
              <Button variant="outline" className="w-full justify-start font-medium h-12 mb-4">
                <Users className="w-4 h-4 mr-3 text-primary" />
                Ver Especialistas
              </Button>
            </Link>
            <Link href="/admin/mensajes" className="w-full">
              <Button variant="outline" className="w-full justify-start font-medium h-12">
                <MessageSquare className="w-4 h-4 mr-3 text-primary" />
                Leer Mensajes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

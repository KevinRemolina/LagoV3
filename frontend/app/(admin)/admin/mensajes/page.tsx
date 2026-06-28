import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, CheckCircle, Archive, Phone, Calendar, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markAsArchived } from "./actions";
import { WhatsAppReplyButton } from "@/components/admin/WhatsAppReplyButton";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const revalidate = 0; // Always fresh for admin

export default async function InboxPage() {
  const supabase = await createClient();

  // Fetch pending and read messages. We don't fetch archived by default to keep it clean.
  const { data: messages, error } = await supabase
    .from("contact_forms")
    .select(
      `
      *,
      services(title)
    `
    )
    .in("status", ["PENDING", "READ"])
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching messages", error);
  }

  const pendingCount = messages?.filter((m) => m.status === "PENDING").length || 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Bandeja de Entrada</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona los mensajes recibidos a través del formulario de contacto.
          </p>
        </div>
        {pendingCount > 0 && (
          <Badge variant="destructive" className="px-4 py-1.5 text-sm">
            {pendingCount} {pendingCount === 1 ? "mensaje nuevo" : "mensajes nuevos"}
          </Badge>
        )}
      </div>

      {messages && messages.length === 0 ? (
        <Card className="border-dashed border-2 bg-muted/20">
          <CardContent className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">¡Todo al día!</h3>
            <p className="text-muted-foreground max-w-sm">
              No tienes mensajes nuevos ni pendientes de lectura.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {messages?.map((msg) => (
            <Card
              key={msg.id}
              className={`transition-all ${msg.status === "PENDING"
                  ? "border-primary/50 shadow-md bg-primary/5"
                  : "border-border/50 bg-card"
                }`}
            >
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl flex items-center gap-2">
                        {msg.status === "PENDING" && (
                          <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                        )}
                        {msg.full_name}
                      </CardTitle>
                      {msg.status === "PENDING" ? (
                        <Badge variant="default" className="bg-primary">
                          Nuevo
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Leído
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-4 pt-1">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {format(new Date(msg.created_at), "d 'de' MMMM, yyyy 'a las' h:mm a", {
                          locale: es,
                        })}
                      </span>
                    </CardDescription>
                  </div>

                  <div className="flex items-center gap-2">
                    <WhatsAppReplyButton
                      messageId={msg.id}
                      phone={msg.phone}
                      fullName={msg.full_name}
                      serviceTitle={msg.services?.title ?? null}
                      alreadyRead={msg.status === "READ"}
                    />
                    <form
                      action={async () => {
                        "use server";
                        await markAsArchived(msg.id);
                      }}
                    >
                      <Button
                        type="submit"
                        variant="ghost"
                        size="sm"
                        className="h-9 text-muted-foreground hover:text-red-500"
                      >
                        <Archive className="w-4 h-4" />
                        <span className="sr-only">Archivar</span>
                      </Button>
                    </form>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Datos del cliente */}
                  <div className="col-span-1 space-y-4 p-4 rounded-xl bg-muted/40 border border-border/50">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        Contacto
                      </p>
                      <div className="space-y-2">

                      <a
                        href={`tel:${msg.phone}`}
                        className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                      >
                        <Phone className="w-4 h-4 text-primary shrink-0" />
                        {msg.phone}
                      </a>

                      <a
                        href={`mailto:${msg.email}`}
                        className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                      >
                        <Mail className="w-4 h-4 text-primary shrink-0" />
                        {msg.email}
                      </a>
                  </div>
                </div>
                {msg.services && (
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Interés
                    </p>
                    <Badge variant="secondary" className="font-normal">
                      {msg.services.title}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Mensaje */}
              <div className="col-span-1 md:col-span-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Mensaje
                </p>
                <div className="p-4 rounded-xl bg-card border border-border/50 text-foreground whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </div>
              </div>
            </div>
              </CardContent>
            </Card>
  ))
}
        </div >
      )}
    </div >
  );
}
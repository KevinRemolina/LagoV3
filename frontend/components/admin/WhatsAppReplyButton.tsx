"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Loader2 } from "lucide-react";
import { markAsRead } from "@/app/(admin)/admin/mensajes/actions";

interface WhatsAppReplyButtonProps {
    messageId: string;
    phone: string;
    fullName: string;
    serviceTitle?: string | null;
    alreadyRead: boolean;
}

/**
 * Normaliza un número de teléfono colombiano (o internacional)
 * al formato que requiere wa.me: solo dígitos, con código de país.
 */
function formatPhoneForWhatsApp(rawPhone: string): string {
    const digitsOnly = rawPhone.replace(/\D/g, "");

    // Si ya incluye código de país (Colombia = 57) y tiene longitud típica, se respeta.
    if (digitsOnly.startsWith("57") && digitsOnly.length >= 11) {
        return digitsOnly;
    }

    // Número local colombiano de 10 dígitos (ej: 3001234567) → se le agrega 57.
    if (digitsOnly.length === 10 && digitsOnly.startsWith("3")) {
        return `57${digitsOnly}`;
    }

    // Cualquier otro caso, se envía tal cual (ya podría ser otro país).
    return digitsOnly;
}

export function WhatsAppReplyButton({
    messageId,
    phone,
    fullName,
    serviceTitle,
    alreadyRead,
}: WhatsAppReplyButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        const firstName = fullName.trim().split(" ")[0] || fullName;
        const whatsappPhone = formatPhoneForWhatsApp(phone);

        const greeting = serviceTitle
            ? `Hola ${firstName}, gracias por contactar a Lago Spa · Estética · Salud. Vimos tu interés en "${serviceTitle}". ¿En qué podemos ayudarte?`
            : `Hola ${firstName}, gracias por contactar a Lago Spa · Estética · Salud. ¿En qué podemos ayudarte?`;

        const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(greeting)}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");

        if (!alreadyRead) {
            startTransition(async () => {
                await markAsRead(messageId);
            });
        }
    };

    return (
        <Button
            type="button"
            variant="default"
            size="sm"
            className="h-9 bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={handleClick}
            disabled={isPending}
        >
            {isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
                <MessageCircle className="w-4 h-4 mr-2" />
            )}
            Responder por WhatsApp
        </Button>
    );
}
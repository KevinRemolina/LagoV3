"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useTransition, useState } from "react"
import { Loader2 } from "lucide-react"
import React from "react"
import { ConfirmModal } from "./ConfirmModal"

interface DeleteButtonProps extends React.ComponentProps<typeof Button> {
  onDelete: () => Promise<any>;
  confirmMessage?: string;
  successMessage?: string;
}

export function DeleteButton({ 
  onDelete, 
  confirmMessage = "¿Estás seguro de que deseas eliminar este elemento?", 
  successMessage = "Eliminado con éxito",
  children,
  ...props 
}: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    setIsOpen(false);
    startTransition(async () => {
      try {
        await onDelete();
        toast.success(successMessage);
      } catch (error) {
        toast.error("Error al eliminar");
      }
    });
  }

  return (
    <>
      <Button 
        {...props}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
        disabled={isPending}
        type="button"
      >
        {isPending ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : null}
        {children}
      </Button>
      <ConfirmModal 
        isOpen={isOpen}
        title={confirmMessage}
        description="Esta acción no se puede deshacer."
        onConfirm={handleConfirm}
        onCancel={() => setIsOpen(false)}
        confirmText="Eliminar"
        confirmVariant="destructive"
      />
    </>
  )
}

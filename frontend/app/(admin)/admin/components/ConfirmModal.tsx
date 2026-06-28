"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "default" | "destructive";
}

export function ConfirmModal({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmVariant = "default"
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-background border border-border shadow-lg rounded-lg w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200 text-left">
        <button 
          onClick={onCancel}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <h2 className="text-lg font-semibold leading-none tracking-tight mb-2">{title}</h2>
        {description && <p className="text-sm text-muted-foreground mb-6">{description}</p>}
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onCancel} type="button">{cancelText}</Button>
          <Button variant={confirmVariant} onClick={onConfirm} type="button">{confirmText}</Button>
        </div>
      </div>
    </div>
  )
}

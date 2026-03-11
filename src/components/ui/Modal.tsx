"use client"

import { ReactNode } from "react"
import Button from "./Button"

interface ModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({
  title,
  isOpen,
  onClose,
  children
}: ModalProps) {

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface border border-border rounded-xl w-full max-w-lg p-6 shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">

          <h2 className="text-lg font-semibold text-white">
            {title}
          </h2>

          <button
            aria-label="Fechar modal"
            onClick={onClose}
            className="text-secondary hover:text-white"
          >
            ✕
          </button>

        </div>

        {/* Conteúdo */}
        <div className="text-secondary">
          {children}
        </div>

      </div>

    </div>
  )
}
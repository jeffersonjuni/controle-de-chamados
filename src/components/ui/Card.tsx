import { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  title?: string
}

export default function Card({ children, title }: CardProps) {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">

      {title && (
        <h2 className="text-lg font-semibold text-white mb-4">
          {title}
        </h2>
      )}

      {children}

    </div>
  )
}
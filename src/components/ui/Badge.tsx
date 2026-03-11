interface BadgeProps {
  status: "open" | "in_progress" | "resolved" | "closed"
}

export default function Badge({ status }: BadgeProps) {

  const styles = {
    open: "bg-warning/20 text-warning",
    in_progress: "bg-primary/20 text-primary",
    resolved: "bg-success/20 text-success",
    closed: "bg-secondary/20 text-secondary",
  }

  const labels = {
    open: "Aberto",
    in_progress: "Em andamento",
    resolved: "Resolvido",
    closed: "Fechado",
  }

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${styles[status]}`}
    >
      {labels[status]}
    </span>
  )
}
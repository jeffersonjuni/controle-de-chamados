import { TicketStatus, Role } from "@prisma/client"

const allowedTransitions: Record<TicketStatus, TicketStatus[]> = {
  OPEN: ["IN_PROGRESS", "CANCELED"],
  IN_PROGRESS: ["WAITING_CLIENT", "RESOLVED", "CANCELED"],
  WAITING_CLIENT: ["IN_PROGRESS", "CANCELED"],
  RESOLVED: ["CLOSED", "IN_PROGRESS"],
  CLOSED: [],
  CANCELED: [],
}

export function canTransition(
  current: TicketStatus,
  next: TicketStatus
) {
  return allowedTransitions[current].includes(next)
}
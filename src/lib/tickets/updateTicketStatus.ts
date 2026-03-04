import { prisma } from "@/src/lib/prisma"
import { TicketStatus, TicketField, Role } from "@prisma/client"
import { canTransition } from "./statusTransitions"
import { hasPermission } from "@/src/lib/permissions"

interface UpdateTicketStatusInput {
  ticketId: string
  newStatus: TicketStatus
  userId: string
  userRole: Role
}

export async function updateTicketStatus({
  ticketId,
  newStatus,
  userId,
  userRole,
}: UpdateTicketStatusInput) {

  if (!hasPermission(userRole, "CLOSE_TICKET")) {
    throw new Error("You don't have permission to update ticket status")
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  })

  if (!ticket) {
    throw new Error("Ticket not found")
  }

  if (ticket.status === newStatus) {
    throw new Error("Ticket is already in this status")
  }

  if (!canTransition(ticket.status, newStatus)) {
    throw new Error("Invalid status transition")
  }

  const now = new Date()

  const updatedTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: newStatus,
      resolvedAt: newStatus === "RESOLVED" ? now : ticket.resolvedAt,
      closedAt: newStatus === "CLOSED" ? now : ticket.closedAt,
      histories: {
        create: {
          changedById: userId,
          fieldChanged: TicketField.STATUS,
          oldValue: ticket.status,
          newValue: newStatus,
        },
      },
    },
  })

  return updatedTicket
}
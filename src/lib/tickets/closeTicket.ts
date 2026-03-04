import { prisma } from "@/src/lib/prisma"
import { TicketField, Role } from "@prisma/client"
import { hasPermission } from "@/src/lib/permissions"

interface CloseTicketInput {
  ticketId: string
  userId: string
  userRole: Role
}

export async function closeTicket({
  ticketId,
  userId,
  userRole,
}: CloseTicketInput) {

  if (!hasPermission(userRole, "CLOSE_TICKET")) {
    throw new Error("You don't have permission to close tickets")
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  })

  if (!ticket) {
    throw new Error("Ticket not found")
  }

  if (ticket.status !== "RESOLVED") {
    throw new Error("Only resolved tickets can be closed")
  }

  const now = new Date()

  const updatedTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: "CLOSED",
      closedAt: now,
      histories: {
        create: {
          changedById: userId,
          fieldChanged: TicketField.STATUS,
          oldValue: ticket.status,
          newValue: "CLOSED",
        },
      },
    },
  })

  return updatedTicket
}
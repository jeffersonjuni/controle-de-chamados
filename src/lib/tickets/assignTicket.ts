import { prisma } from "@/src/lib/prisma"
import { Role, TicketField } from "@prisma/client"
import { hasPermission } from "@/src/lib/permissions"

interface AssignTicketInput {
  ticketId: string
  assignedToId: string | null
  userId: string
  userRole: Role
}

export async function assignTicket({
  ticketId,
  assignedToId,
  userId,
  userRole,
}: AssignTicketInput) {

  if (!hasPermission(userRole, "ASSIGN_TICKET")) {
    throw new Error("You don't have permission to assign tickets")
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: { assignedTo: true },
  })

  if (!ticket) {
    throw new Error("Ticket not found")
  }

  let newAssignee = null

  if (assignedToId) {
    newAssignee = await prisma.user.findUnique({
      where: { id: assignedToId },
    })

    if (!newAssignee) {
      throw new Error("User not found")
    }

    if (newAssignee.role === "CLIENT") {
      throw new Error("Cannot assign ticket to a client")
    }
  }

  const updatedTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      assignedToId,
      histories: {
        create: {
          changedById: userId,
          fieldChanged: TicketField.ASSIGNED_TO,
          oldValue: ticket.assignedToId ?? null,
          newValue: assignedToId ?? null,
        },
      },
    },
  })

  return updatedTicket
}
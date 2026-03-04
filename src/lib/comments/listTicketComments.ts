import { prisma } from "@/src/lib/prisma"
import { Role } from "@prisma/client"

interface ListTicketCommentsInput {
  ticketId: string
  userId: string
  userRole: Role
}

export async function listTicketComments({
  ticketId,
  userId,
  userRole,
}: ListTicketCommentsInput) {

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  })

  if (!ticket) {
    throw new Error("Ticket not found")
  }

  // CLIENT só pode ver comentários do próprio ticket
  if (userRole === "CLIENT" && ticket.createdById !== userId) {
    throw new Error("You can only view your own tickets")
  }

  const comments = await prisma.ticketComment.findMany({
    where: {
      ticketId,
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  })

  return comments
}
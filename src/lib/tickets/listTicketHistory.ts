import { prisma } from "@/src/lib/prisma"
import { Role } from "@prisma/client"

interface Input {
  ticketId: string
  userId: string
  userRole: Role
}

export async function listTicketHistory({
  ticketId,
  userId,
  userRole,
}: Input) {

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  })

  if (!ticket) {
    throw new Error("Ticket not found")
  }

  if (userRole === "CLIENT" && ticket.createdById !== userId) {
    throw new Error("You can only view your own tickets")
  }

  return prisma.ticketHistory.findMany({
    where: { ticketId },
    orderBy: { createdAt: "asc" },
    include: {
      changedBy: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  })
}
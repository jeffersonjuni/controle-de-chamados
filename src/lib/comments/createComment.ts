import { prisma } from "@/src/lib/prisma"
import { Role, TicketField } from "@prisma/client"

interface CreateCommentInput {
  ticketId: string
  content: string
  userId: string
  userRole: Role
}

export async function createComment({
  ticketId,
  content,
  userId,
  userRole,
}: CreateCommentInput) {

  if (!content || content.trim().length === 0) {
    throw new Error("Comment cannot be empty")
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  })

  if (!ticket) {
    throw new Error("Ticket not found")
  }

  // CLIENT só comenta no próprio ticket
  if (userRole === "CLIENT" && ticket.createdById !== userId) {
    throw new Error("You can only comment on your own tickets")
  }

  const result = await prisma.$transaction(async (tx) => {
    const comment = await tx.ticketComment.create({
      data: {
        content,
        ticketId,
        authorId: userId,
      },
    })

    await tx.ticketHistory.create({
      data: {
        ticketId,
        changedById: userId,
        fieldChanged: TicketField.COMMENT,
        oldValue: null,
        newValue: "Comment added",
      },
    })

    return comment
  })

  return result
}
import { prisma } from "@/src/lib/prisma";

export async function calculateResponseTime(ticketId: string) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      comments: {
        include: {
          author: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      category: {
        include: {
          sla: true,
        },
      },
    },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  if (!ticket.category.sla) {
    throw new Error("SLA not configured for this category");
  }

  const firstSupportComment = ticket.comments.find(
    (comment) =>
      comment.author.role === "SUPPORT" ||
      comment.author.role === "ADMIN"
  );

  if (!firstSupportComment) {
    return {
      responded: false,
      responseTimeInMinutes: null,
      withinSLA: null,
    };
  }

  const diffMs =
    firstSupportComment.createdAt.getTime() - ticket.createdAt.getTime();

  const responseTimeInMinutes = Math.floor(diffMs / 60000);

  const withinSLA =
    responseTimeInMinutes <= ticket.category.sla.responseTimeInMinutes;

  return {
    responded: true,
    responseTimeInMinutes,
    withinSLA,
    slaLimit: ticket.category.sla.responseTimeInMinutes,
  };
}
import { prisma } from "@/src/lib/prisma";

export async function calculateResolutionTime(ticketId: string) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
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

  if (!ticket.resolvedAt) {
    return {
      resolved: false,
      resolutionTimeInMinutes: null,
      withinSLA: null,
    };
  }

  const diffMs =
    ticket.resolvedAt.getTime() - ticket.createdAt.getTime();

  const resolutionTimeInMinutes = Math.floor(diffMs / 60000);

  const withinSLA =
    resolutionTimeInMinutes <=
    ticket.category.sla.resolutionTimeInMinutes;

  return {
    resolved: true,
    resolutionTimeInMinutes,
    withinSLA,
    slaLimit: ticket.category.sla.resolutionTimeInMinutes,
  };
}
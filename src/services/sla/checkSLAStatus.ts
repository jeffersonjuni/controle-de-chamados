import { prisma } from "@/src/lib/prisma";

export async function checkSLAStatus(ticketId: string) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      category: {
        include: {
          sla: true,
        },
      },
      comments: true,
    },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  if (!ticket.category.sla) {
    throw new Error("SLA not configured for this category");
  }

  const sla = ticket.category.sla;

  //////////////////////////////////////////////////
  // Calcular tempo de resposta
  //////////////////////////////////////////////////

  const firstSupportComment = ticket.comments
    .filter((comment) => comment.authorId !== ticket.createdById)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0];

  let responseTimeInMinutes = null;
  let responseSLABreached = false;

  if (firstSupportComment) {
    const diffMs =
      firstSupportComment.createdAt.getTime() -
      ticket.createdAt.getTime();

    responseTimeInMinutes = Math.floor(diffMs / 60000);

    responseSLABreached =
      responseTimeInMinutes > sla.responseTimeInMinutes;
  }

  //////////////////////////////////////////////////
  // Calcular tempo de resolução
  //////////////////////////////////////////////////

  let resolutionTimeInMinutes = null;
  let resolutionSLABreached = false;

  if (ticket.resolvedAt) {
    const diffMs =
      ticket.resolvedAt.getTime() - ticket.createdAt.getTime();

    resolutionTimeInMinutes = Math.floor(diffMs / 60000);

    resolutionSLABreached =
      resolutionTimeInMinutes > sla.resolutionTimeInMinutes;
  }

  //////////////////////////////////////////////////
  // Retorno consolidado
  //////////////////////////////////////////////////

  return {
    response: {
      time: responseTimeInMinutes,
      slaLimit: sla.responseTimeInMinutes,
      breached: responseSLABreached,
    },
    resolution: {
      time: resolutionTimeInMinutes,
      slaLimit: sla.resolutionTimeInMinutes,
      breached: resolutionSLABreached,
    },
  };
}
import { prisma } from "@/src/lib/prisma";
import { checkSLAStatus } from "./checkSLAStatus";

export async function saveSLAMetrics(ticketId: string) {
  const slaStatus = await checkSLAStatus(ticketId);

  return prisma.ticketSLA.upsert({
    where: { ticketId },
    update: {
      responseTimeInMinutes: slaStatus.response.time,
      resolutionTimeInMinutes: slaStatus.resolution.time,
      responseSLABreached: slaStatus.response.breached,
      resolutionSLABreached: slaStatus.resolution.breached,
    },
    create: {
      ticketId,
      responseTimeInMinutes: slaStatus.response.time,
      resolutionTimeInMinutes: slaStatus.resolution.time,
      responseSLABreached: slaStatus.response.breached,
      resolutionSLABreached: slaStatus.resolution.breached,
    },
  });
}
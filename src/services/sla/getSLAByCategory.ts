import { prisma } from "@/src/lib/prisma";

export async function getSLAByCategory(categoryId: string) {
  const sla = await prisma.sLA.findUnique({
    where: {
      categoryId,
    },
  });

  if (!sla) {
    throw new Error("SLA not configured for this category");
  }

  return sla;
}
import { prisma } from "@/src/lib/prisma";

interface CreateSLAInput {
  categoryId: string;
  responseTimeInMinutes: number;
  resolutionTimeInMinutes: number;
}

export async function createSLA(data: CreateSLAInput) {
  const category = await prisma.ticketCategory.findUnique({
    where: { id: data.categoryId },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const existingSLA = await prisma.sLA.findUnique({
    where: { categoryId: data.categoryId },
  });

  if (existingSLA) {
    throw new Error("SLA already defined for this category");
  }

  const sla = await prisma.sLA.create({
    data: {
      categoryId: data.categoryId,
      responseTimeInMinutes: data.responseTimeInMinutes,
      resolutionTimeInMinutes: data.resolutionTimeInMinutes,
    },
  });

  return sla;
}
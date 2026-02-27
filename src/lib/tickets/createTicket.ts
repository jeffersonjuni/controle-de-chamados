import { prisma } from '@/src/lib/prisma';
import { Role, Priority } from '@prisma/client';
import { TicketField } from "@prisma/client";

interface CreateTicketDTO {
  title: string;
  description: string;
  categoryId: string;
  priority?: string;
  userId: string;
  userRole: Role;
}

export async function createTicket(data: CreateTicketDTO) {
  const { title, description, categoryId, priority, userId, userRole } = data;

  if (userRole !== 'CLIENT') {
    throw new Error('Apenas Clientes podem criar chamados');
  }

  //  Validação segura do enum
  const validatedPriority = priority ? (priority as Priority) : undefined;

  const ticket = await prisma.ticket.create({
    data: {
      title,
      description,
      categoryId,
      priority: validatedPriority,
      createdById: userId,
      status: 'OPEN',
      histories: {
        create: {
          changedById: userId,
          fieldChanged: TicketField.STATUS,
          oldValue: null,
          newValue: 'OPEN',
        },
      },
    },
  });

  return ticket;
}

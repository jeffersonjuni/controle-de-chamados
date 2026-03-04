import { prisma } from '@/src/lib/prisma';
import { TicketField, Role } from '@prisma/client';
import { hasPermission } from '@/src/lib/permissions';

interface ReopenTicketInput {
  ticketId: string;
  userId: string;
  userRole: Role;
}

export async function reopenTicket({
  ticketId,
  userId,
  userRole,
}: ReopenTicketInput) {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) {
    throw new Error('Ticket not found');
  }

  if (ticket.status !== 'RESOLVED') {
    throw new Error('Only resolved tickets can be reopened');
  }

  // CLIENT só pode reabrir se for dono
  if (userRole === 'CLIENT' && ticket.createdById !== userId) {
    throw new Error('You can only reopen your own tickets');
  }

  // SUPPORT ou ADMIN precisam ter permissão
  if (userRole !== 'CLIENT' && !hasPermission(userRole, 'CLOSE_TICKET')) {
    throw new Error("You don't have permission to reopen tickets");
  }

  const updatedTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: 'IN_PROGRESS',
      closedAt: null, // remove fechamento se existir
      histories: {
        create: {
          changedById: userId,
          fieldChanged: TicketField.STATUS,
          oldValue: ticket.status,
          newValue: 'IN_PROGRESS',
        },
      },
    },
  });

  return updatedTicket;
}

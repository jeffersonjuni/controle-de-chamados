import { NextResponse } from "next/server"
import { getAuthSession } from "@/src/lib/auth/auth"
import { createTicket } from "@/src/lib/tickets/createTicket"
import { prisma } from "@/src/lib/prisma"
import { TicketStatus } from "@prisma/client"

//////////////////////////////////////////////////////
// POST - Criar Ticket 
//////////////////////////////////////////////////////

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    const ticket = await createTicket({
      ...body,
      userId: session.user.id,
      userRole: session.user.role
    })

    return NextResponse.json(ticket, { status: 201 })

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}

//////////////////////////////////////////////////////
// GET - Listar Tickets por Usuário + Filtro Status
//////////////////////////////////////////////////////

export async function GET(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const statusParam = searchParams.get("status")

    const { id, role } = session.user

    let statusFilter: TicketStatus | undefined

    // valida enum
    if (statusParam) {
      if (!Object.values(TicketStatus).includes(statusParam as TicketStatus)) {
        return NextResponse.json(
          { error: "Invalid status filter" },
          { status: 400 }
        )
      }

      statusFilter = statusParam as TicketStatus
    }

    // monta where baseado na role
    const where: any = {}

    if (role === "SUPPORT") {
      where.assignedToId = id
    } else if (role === "CLIENT") {
      where.createdById = id
    }

    if (statusFilter) {
      where.status = statusFilter
    }

    const tickets = await prisma.ticket.findMany({
      where,
      include: {
        category: true,
        assignedTo: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(tickets)

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}
import { NextResponse } from "next/server"
import { getAuthSession } from "@/src/lib/auth/auth"
import { assignTicket } from "@/src/lib/tickets/assignTicket"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    const ticket = await assignTicket({
      ticketId: params.id,
      assignedToId: body.assignedToId ?? null,
      userId: session.user.id,
      userRole: session.user.role,
    })

    return NextResponse.json(ticket)

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}
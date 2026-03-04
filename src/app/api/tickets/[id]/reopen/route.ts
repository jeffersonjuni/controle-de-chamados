import { NextResponse } from "next/server"
import { getAuthSession } from "@/src/lib/auth/auth"
import { reopenTicket } from "@/src/lib/tickets/reopenTicket"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const ticket = await reopenTicket({
      ticketId: params.id,
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
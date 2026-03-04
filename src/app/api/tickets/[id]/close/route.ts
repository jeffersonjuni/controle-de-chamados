import { NextResponse } from "next/server"
import { getAuthSession } from "@/src/lib/auth/auth"
import { closeTicket } from "@/src/lib/tickets/closeTicket"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const ticket = await closeTicket({
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
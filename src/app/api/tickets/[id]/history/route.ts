import { NextResponse } from "next/server"
import { getAuthSession } from "@/src/lib/auth/auth"
import { listTicketHistory } from "@/src/lib/tickets/listTicketHistory"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const history = await listTicketHistory({
      ticketId: params.id,
      userId: session.user.id,
      userRole: session.user.role,
    })

    return NextResponse.json(history)

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}
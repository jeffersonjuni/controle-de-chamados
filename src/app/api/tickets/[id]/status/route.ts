import { NextResponse } from "next/server"
import { getAuthSession } from "@/src/lib/auth/auth"
import { updateTicketStatus } from "@/src/lib/tickets/updateTicketStatus"

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

    const updated = await updateTicketStatus({
      ticketId: params.id,
      newStatus: body.status,
      userId: session.user.id,
      userRole: session.user.role,
    })

    return NextResponse.json(updated)

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}
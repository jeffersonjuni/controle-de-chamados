import { NextResponse } from "next/server"
import { getAuthSession } from "@/src/lib/auth/auth"
import { createTicket } from "@/src/lib/tickets/createTicket"

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
import { NextResponse } from "next/server"
import { getAuthSession } from "@/src/lib/auth/auth"
import { createComment } from "@/src/lib/comments/createComment"
import { listTicketComments } from "@/src/lib/comments/listTicketComments"

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    const comment = await createComment({
      ticketId: params.id,
      content: body.content,
      userId: session.user.id,
      userRole: session.user.role,
    })

    return NextResponse.json(comment, { status: 201 })

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const comments = await listTicketComments({
      ticketId: params.id,
      userId: session.user.id,
      userRole: session.user.role,
    })

    return NextResponse.json(comments)

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
}
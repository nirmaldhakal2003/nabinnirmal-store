import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message } = body

    if (!message) {
      return new NextResponse("Message is required", { status: 400 })
    }

    const whatsappUrl = `https://wa.me/9779748845865?text=${encodeURIComponent(message)}`

    return NextResponse.json({ url: whatsappUrl })
  } catch (error) {
    console.log("[CHAT_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

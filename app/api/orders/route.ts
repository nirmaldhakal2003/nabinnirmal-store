import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (replace with MongoDB in production)
const orders: any[] = []

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const newOrder = {
      id: `ORD-${Date.now()}`,
      ...orderData,
      status: "pending",
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    }

    orders.push(newOrder)

    // In production, send confirmation SMS/email and WhatsApp message to admin

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get("customerId")

    let filteredOrders = orders

    if (customerId) {
      filteredOrders = orders.filter((order) => order.customer.id === customerId)
    }

    return NextResponse.json(filteredOrders)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

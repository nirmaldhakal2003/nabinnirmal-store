import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pid = searchParams.get("pid") // Product/Order ID

    console.log("eSewa Payment Failed for order:", pid)

    // Redirect to failure page
    return NextResponse.redirect(new URL(`/payment/failure?orderId=${pid}`, request.url))
  } catch (error) {
    console.error("eSewa failure handler error:", error)
    return NextResponse.redirect(new URL("/payment/failure", request.url))
  }
}

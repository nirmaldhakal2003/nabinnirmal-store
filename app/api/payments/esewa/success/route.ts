import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const oid = searchParams.get("oid") // Order ID
    const amt = searchParams.get("amt") // Amount
    const refId = searchParams.get("refId") // eSewa reference ID

    // Verify payment with eSewa (in production, verify with eSewa API)
    console.log("eSewa Payment Success:", { oid, amt, refId })

    // Update order status in your database
    // In production, verify the payment with eSewa's verification API

    // Redirect to success page
    return NextResponse.redirect(new URL(`/payment/success?orderId=${oid}&refId=${refId}`, request.url))
  } catch (error) {
    console.error("eSewa success handler error:", error)
    return NextResponse.redirect(new URL("/payment/failure", request.url))
  }
}

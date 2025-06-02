import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { amount, orderId, customerInfo } = await request.json()

    // eSewa integration parameters
    const esewaConfig = {
      amt: amount,
      pdc: 0, // Delivery charge
      psc: 0, // Service charge
      txAmt: 0, // Tax amount
      tAmt: amount, // Total amount
      pid: orderId, // Product/Order ID
      scd: "EPAYTEST", // Merchant code (use your actual merchant code)
      su: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/payments/esewa/success`,
      fu: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/payments/esewa/failure`,
    }

    // Create eSewa payment URL
    const esewaUrl = "https://uat.esewa.com.np/epay/main" // Use production URL for live
    const formData = new URLSearchParams(esewaConfig as any).toString()

    return NextResponse.json({
      success: true,
      paymentUrl: esewaUrl,
      formData: esewaConfig,
      message: "eSewa payment URL generated successfully",
    })
  } catch (error) {
    console.error("eSewa payment error:", error)
    return NextResponse.json({ success: false, error: "Payment initialization failed" }, { status: 500 })
  }
}

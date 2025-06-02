import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { amount, orderId, customerInfo } = await request.json()

    // Khalti integration
    const khaltiConfig = {
      publicKey: process.env.KHALTI_PUBLIC_KEY || "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
      productIdentity: orderId,
      productName: "नबिन निर्मल स्टोर - Order",
      productUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/orders/${orderId}`,
      eventHandler: {
        onSuccess: (payload: any) => {
          console.log("Khalti Payment Success:", payload)
        },
        onError: (error: any) => {
          console.log("Khalti Payment Error:", error)
        },
      },
    }

    return NextResponse.json({
      success: true,
      config: khaltiConfig,
      message: "Khalti payment configuration generated",
    })
  } catch (error) {
    console.error("Khalti payment error:", error)
    return NextResponse.json({ success: false, error: "Payment initialization failed" }, { status: 500 })
  }
}

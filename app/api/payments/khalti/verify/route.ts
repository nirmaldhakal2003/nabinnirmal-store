import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { token, amount } = await request.json()

    // Verify payment with Khalti
    const khaltiVerifyUrl = "https://khalti.com/api/v2/payment/verify/"
    const secretKey = process.env.KHALTI_SECRET_KEY || "test_secret_key_f59e8b7d18b4499ca40f68195a846e9b"

    const verifyResponse = await fetch(khaltiVerifyUrl, {
      method: "POST",
      headers: {
        Authorization: `Key ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, amount }),
    })

    const verifyData = await verifyResponse.json()

    if (verifyData.state?.name === "Completed") {
      return NextResponse.json({
        success: true,
        data: verifyData,
        message: "Payment verified successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Payment verification failed",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Khalti verification error:", error)
    return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { adminId, password } = await request.json()

    console.log("Login attempt:", { adminId, password }) // Debug log

    // Use the exact credentials you specified
    const validAdminId = "nabin2003"
    const validPassword = "nirmal2003"

    if (adminId === validAdminId && password === validPassword) {
      // Create simple token payload
      const tokenPayload = {
        adminId,
        role: "admin",
        timestamp: Date.now(),
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      }

      // Generate token
      const token = Buffer.from(JSON.stringify(tokenPayload)).toString("base64")

      // Create response
      const response = NextResponse.json({
        success: true,
        message: "Login successful",
        user: {
          adminId,
          role: "admin",
          name: "नबिन निर्मल",
          loginTime: new Date().toISOString(),
        },
      })

      // Set cookie
      response.cookies.set("admin-token", token, {
        httpOnly: true,
        secure: false, // Set to false for development
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      })

      console.log("Login successful for:", adminId) // Debug log
      return response
    } else {
      console.log("Invalid credentials:", {
        provided: { adminId, password },
        expected: { validAdminId, validPassword },
      })
      return NextResponse.json(
        {
          success: false,
          error: "Invalid admin credentials",
          message: "गलत एडमिन ID वा पासवर्ड",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "सर्भर त्रुटि भयो",
      },
      { status: 500 },
    )
  }
}

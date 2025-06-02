import { type NextRequest, NextResponse } from "next/server"

// Simple token generation
function generateToken(userId: string, role: string) {
  const payload = {
    userId,
    role,
    timestamp: Date.now(),
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  }
  return Buffer.from(JSON.stringify(payload)).toString("base64")
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // In real app, check if user already exists and hash password
    const userId = Date.now().toString()

    // Generate simple token
    const token = generateToken(userId, "user")

    return NextResponse.json({
      token,
      user: {
        id: userId,
        email,
        name,
        role: "user",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

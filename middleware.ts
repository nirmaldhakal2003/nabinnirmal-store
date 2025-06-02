import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

function verifyToken(token: string): boolean {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString())
    const isValid = payload.expires > Date.now() && payload.role === "admin"
    console.log("Token verification:", { isValid, expires: new Date(payload.expires), now: new Date() })
    return isValid
  } catch (error) {
    console.log("Token verification failed:", error)
    return false
  }
}

export function middleware(request: NextRequest) {
  console.log("Middleware called for:", request.nextUrl.pathname)

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Skip login page and API routes
    if (request.nextUrl.pathname === "/admin/login" || request.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.next()
    }

    const token = request.cookies.get("admin-token")?.value
    console.log("Token found:", !!token)

    if (!token || !verifyToken(token)) {
      console.log("Redirecting to login - invalid or missing token")
      const response = NextResponse.redirect(new URL("/admin/login", request.url))
      // Clear invalid token
      if (token) {
        response.cookies.delete("admin-token")
      }
      return response
    }

    console.log("Token valid, allowing access")
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

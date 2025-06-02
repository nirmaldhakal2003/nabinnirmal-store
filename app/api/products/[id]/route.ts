import { type NextRequest, NextResponse } from "next/server"

// Demo products data - same as in route.ts
const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    image: "nns.png?height=300&width=300",
    description:
      "High-quality wireless headphones with noise cancellation technology. Perfect for music lovers and professionals.",
    category: "audio",
    inStock: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  // ... other products
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = products.find((p) => p.id === params.id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productData = await request.json()
    const productIndex = products.findIndex((p) => p.id === params.id)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // In real app, validate JWT token and admin role
    products[productIndex] = { ...products[productIndex], ...productData }

    return NextResponse.json(products[productIndex])
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productIndex = products.findIndex((p) => p.id === params.id)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // In real app, validate JWT token and admin role
    products.splice(productIndex, 1)

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

// In-memory storage (replace with MongoDB in production)
const products: any[] = [
  {
    id: "1",
    name: "बासमती चामल",
    nameEn: "Basmati Rice",
    price: 180,
    originalPrice: 200,
    image: "nns.png?height=300&width=300",
    description: "उच्च गुणस्तरको बासमती चामल - १ केजी। खुसबुदार र स्वादिष्ट।",
    category: "grocery",
    inStock: true,
    stock: 50,
    discount: 10,
    weight: "1kg",
    brand: "Premium",
    createdAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const inStock = searchParams.get("inStock") === "true"

    let filteredProducts = [...products]

    // Apply filters
    if (category) {
      filteredProducts = filteredProducts.filter((p) => p.category === category)
    }

    if (search) {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.nameEn?.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter((p) => p.price >= Number.parseFloat(minPrice))
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter((p) => p.price <= Number.parseFloat(maxPrice))
    }

    if (inStock) {
      filteredProducts = filteredProducts.filter((p) => p.inStock)
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit),
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const nameEn = formData.get("nameEn") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const originalPrice = formData.get("originalPrice")
      ? Number.parseFloat(formData.get("originalPrice") as string)
      : null
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const inStock = formData.get("inStock") === "true"
    const stock = Number.parseInt(formData.get("stock") as string) || 0
    const weight = formData.get("weight") as string
    const brand = formData.get("brand") as string
    const image = formData.get("image") as File

    let imagePath = "nns.png?height=300&width=300"

    // Handle image upload
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), "public", "uploads")
      try {
        await mkdir(uploadsDir, { recursive: true })
      } catch (error) {
        // Directory already exists
      }

      // Generate unique filename
      const filename = `${Date.now()}-${image.name}`
      const filepath = path.join(uploadsDir, filename)

      await writeFile(filepath, buffer)
      imagePath = `/uploads/${filename}`
    }

    // Calculate discount
    const discount =
      originalPrice && originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

    const newProduct = {
      id: Date.now().toString(),
      name,
      nameEn,
      price,
      originalPrice,
      image: imagePath,
      description,
      category,
      inStock,
      stock,
      weight,
      brand,
      discount,
      createdAt: new Date().toISOString(),
    }

    products.push(newProduct)

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

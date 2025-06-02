import { type NextRequest, NextResponse } from "next/server"

// Store location
const STORE_LOCATION = {
  name: "नबिन निर्मल स्टोर",
  address: "रामपुर-६, तालपोखरा, पाल्पा, नेपाल",
  coordinates: {
    lat: 27.8742, // Approximate coordinates for Rampur, Palpa
    lng: 83.4534,
  },
  phone: "+977-9876543210",
  hours: {
    weekdays: "बिहान ६:०० - बेलुका ९:००",
    weekends: "बिहान ७:०० - बेलुका ८:००",
  },
}

export async function GET() {
  return NextResponse.json(STORE_LOCATION)
}

export async function POST(request: NextRequest) {
  try {
    const { customerLocation, orderId } = await request.json()

    // Calculate distance (simplified - in production use proper distance calculation)
    const distance = calculateDistance(STORE_LOCATION.coordinates, customerLocation.coordinates)

    // Calculate delivery fee based on distance
    let deliveryFee = 0
    if (distance <= 5) {
      deliveryFee = 50 // Within 5km
    } else if (distance <= 15) {
      deliveryFee = 100 // 5-15km
    } else if (distance <= 30) {
      deliveryFee = 200 // 15-30km
    } else {
      deliveryFee = 300 // Above 30km
    }

    // Estimate delivery time
    let estimatedTime = "२-३ घण्टा" // Default
    if (distance <= 5) {
      estimatedTime = "१-२ घण्टा"
    } else if (distance <= 15) {
      estimatedTime = "२-४ घण्टा"
    } else if (distance <= 30) {
      estimatedTime = "४-६ घण्टा"
    } else {
      estimatedTime = "१ दिन"
    }

    return NextResponse.json({
      distance: Math.round(distance * 100) / 100,
      deliveryFee,
      estimatedTime,
      storeLocation: STORE_LOCATION,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Simple distance calculation (Haversine formula)
function calculateDistance(coord1: any, coord2: any) {
  const R = 6371 // Earth's radius in kilometers
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180
  const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

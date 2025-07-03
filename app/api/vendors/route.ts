import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export const dynamic = "force-dynamic" // Ensures the route is always dynamic

export async function GET() {
  try {
    const { rows: vendors } = await sql`SELECT * FROM vendors ORDER BY name;`

    // The data from Postgres will have snake_case keys. We map them to camelCase for the frontend.
    const formattedVendors = vendors.map((vendor) => ({
      id: vendor.id,
      name: vendor.name,
      vendorType: vendor.vendor_type,
      logoUrl: vendor.logo_url,
      description: vendor.description,
      strengths: vendor.strengths,
      weaknesses: vendor.weaknesses,
      features: vendor.features,
      pricing: vendor.pricing,
      compliance: vendor.compliance,
      tcoFactors: vendor.tco_factors,
    }))

    return NextResponse.json(formattedVendors)
  } catch (error) {
    console.error("API Error fetching vendors:", error)
    return NextResponse.json({ message: "Failed to fetch vendors" }, { status: 500 })
  }
}

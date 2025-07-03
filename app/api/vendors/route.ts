import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import type { VendorRecord } from "@/lib/db"

export async function GET() {
  try {
    const vendors = (await sql`
      SELECT * FROM vendors 
      ORDER BY name ASC
    `) as VendorRecord[]

    return NextResponse.json({ vendors })
  } catch (error) {
    console.error("Error fetching vendors:", error)
    return NextResponse.json({ error: "Failed to fetch vendors" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { vendor } = body

    const result = await sql`
      INSERT INTO vendors (
        id, name, category, pricing_model, base_cost, per_user_cost, 
        setup_cost, annual_discount, features, compliance_certifications,
        security_features, integration_capabilities, support_tiers,
        deployment_options, scalability_limits, vendor_lock_in_risk,
        market_position, financial_stability, innovation_score, customer_satisfaction
      ) VALUES (
        ${vendor.id}, ${vendor.name}, ${vendor.category}, ${vendor.pricing_model},
        ${vendor.base_cost}, ${vendor.per_user_cost}, ${vendor.setup_cost},
        ${vendor.annual_discount}, ${JSON.stringify(vendor.features)},
        ${JSON.stringify(vendor.compliance_certifications)},
        ${JSON.stringify(vendor.security_features)},
        ${JSON.stringify(vendor.integration_capabilities)},
        ${JSON.stringify(vendor.support_tiers)},
        ${JSON.stringify(vendor.deployment_options)},
        ${JSON.stringify(vendor.scalability_limits)},
        ${vendor.vendor_lock_in_risk}, ${vendor.market_position},
        ${vendor.financial_stability}, ${vendor.innovation_score},
        ${vendor.customer_satisfaction}
      )
      RETURNING *
    `

    return NextResponse.json({ vendor: result[0] })
  } catch (error) {
    console.error("Error creating vendor:", error)
    return NextResponse.json({ error: "Failed to create vendor" }, { status: 500 })
  }
}

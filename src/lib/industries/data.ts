// src/lib/industries/data.ts

export interface Industry {
  id: IndustryId
  name: string
  description: string
}

export type IndustryId =
  | "healthcare"
  | "financial_services"
  | "government"
  | "manufacturing"
  | "education"
  | "technology"
  | "retail"
  | "telecommunications"
  | "energy_utilities"
  | "legal_services"
  | "insurance"
  | "pharmaceuticals"

export const getIndustryById = (industryId: IndustryId): Industry | undefined => {
  return INDUSTRIES.find((industry) => industry.id === industryId)
}

export const INDUSTRIES: Industry[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Hospitals, clinics, insurance companies, and healthcare technology providers",
  },
  {
    id: "financial_services",
    name: "Financial Services",
    description: "Banks, credit unions, insurance companies, investment firms",
  },
  {
    id: "government",
    name: "Government",
    description: "Federal, state, and local government agencies",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Industrial manufacturing, automotive, aerospace, pharmaceuticals",
  },
  {
    id: "education",
    name: "Education",
    description: "K-12 schools, universities, research institutions",
  },
  {
    id: "technology",
    name: "Technology",
    description: "Software companies, SaaS providers, tech startups",
  },
  {
    id: "retail",
    name: "Retail",
    description: "Physical stores, e-commerce, hospitality, restaurants",
  },
  {
    id: "telecommunications",
    name: "Telecommunications",
    description: "Telecommunications service providers",
  },
  {
    id: "energy_utilities",
    name: "Energy & Utilities",
    description: "Power generation, oil & gas, water treatment, renewable energy",
  },
  {
    id: "legal_services",
    name: "Legal Services",
    description: "Law firms, legal tech companies",
  },
  {
    id: "insurance",
    name: "Insurance",
    description: "Insurance carriers and agencies",
  },
  {
    id: "pharmaceuticals",
    name: "Pharmaceuticals",
    description: "Pharmaceutical manufacturers and distributors",
  },
]

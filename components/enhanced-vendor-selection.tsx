"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search,
  Filter,
  Star,
  TrendingUp,
  Shield,
  DollarSign,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Sparkles,
  Award,
  Target,
} from "lucide-react"

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  onVendorToggle: (vendorId: string) => void
  onClearAll: () => void
  onSelectRecommended: () => void
  darkMode?: boolean
}

// Safe string conversion utility
function safeString(value: any): string {
  if (value === null || value === undefined) return ""
  if (typeof value === "string") return value
  if (typeof value === "number") return value.toString()
  if (typeof value === "boolean") return value.toString()
  if (typeof value === "object") {
    try {
      return JSON.stringify(value)
    } catch {
      return String(value)
    }
  }
  return String(value)
}

// Safe number conversion utility
function safeNumber(value: any, defaultValue = 0): number {
  if (value === null || value === undefined) return defaultValue
  const num = Number(value)
  return isNaN(num) || !isFinite(num) ? defaultValue : num
}

// Comprehensive vendor database - using the same structure as the existing data
const COMPREHENSIVE_VENDOR_DATA = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    category: "visionary",
    marketShare: 8.5,
    deploymentType: "cloud",
    logo: "/portnox-logo.png",
    description: "Pure cloud-native NAC with zero infrastructure requirements and industry-leading security posture.",

    pricing: {
      model: "per-device",
      basePrice: 0,
      pricePerDevice: 4.0,
      additionalCosts: {
        hardware: 0,
        services: 0,
        training: 0,
        maintenance: 0,
      },
    },

    implementation: {
      timeToDeployDays: 1,
      complexity: "low",
      professionalServicesRequired: false,
      trainingHours: 2,
    },

    security: {
      securityRating: 95,
      cveCount: 0,
      complianceSupport: ["HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST", "ISO27001", "FedRAMP"],
      zeroTrustMaturity: 95,
    },

    features: {
      core: ["Device Discovery", "Policy Enforcement", "Guest Access", "Certificate Management"],
      advanced: ["AI-Powered Analytics", "Automated Remediation", "Risk Scoring", "Behavioral Analysis"],
      integrations: ["Active Directory", "SIEM", "ITSM", "MDM", "Cloud Platforms"],
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 1 hour",
      customerSatisfaction: 96,
    },

    strengths: [
      "Zero infrastructure requirements",
      "Fastest deployment in industry",
      "No CVEs in security history",
      "95% Zero Trust maturity score",
      "All-inclusive pricing model",
    ],
    weaknesses: ["Newer market presence", "Limited on-premise options"],
    bestFor: [
      "Cloud-first organizations",
      "Rapid deployment requirements",
      "Cost-conscious enterprises",
      "Zero Trust initiatives",
    ],
    isRecommended: true,
  },

  cisco: {
    id: "cisco",
    name: "Cisco Identity Services Engine (ISE)",
    category: "leader",
    marketShare: 35.2,
    deploymentType: "on-premise",
    logo: "/cisco-logo.png",
    description:
      "Industry-leading identity services engine with comprehensive policy management and extensive ecosystem integration.",

    pricing: {
      model: "per-device",
      basePrice: 50000,
      pricePerDevice: 12.0,
      minimumDevices: 100,
      additionalCosts: {
        hardware: 150000,
        services: 75000,
        training: 25000,
        maintenance: 30000,
      },
    },

    implementation: {
      timeToDeployDays: 180,
      complexity: "high",
      professionalServicesRequired: true,
      trainingHours: 40,
    },

    security: {
      securityRating: 85,
      cveCount: 47,
      lastSecurityIncident: "2023-Q4",
      complianceSupport: ["HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST", "ISO27001", "Common Criteria"],
      zeroTrustMaturity: 75,
    },

    features: {
      core: ["Policy Management", "Device Profiling", "Guest Access", "Certificate Services"],
      advanced: ["TrustSec", "pxGrid", "Threat Intelligence", "Compliance Reporting"],
      integrations: ["Cisco Security Portfolio", "Third-party SIEM", "MDM Solutions", "Threat Intelligence"],
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 4 hours",
      customerSatisfaction: 78,
    },

    strengths: [
      "Market leader with proven track record",
      "Comprehensive feature set",
      "Extensive ecosystem integration",
      "Strong enterprise support",
    ],
    weaknesses: [
      "Complex deployment and management",
      "High total cost of ownership",
      "Significant hardware requirements",
      "Multiple CVEs annually",
    ],
    bestFor: [
      "Large enterprises",
      "Cisco-centric environments",
      "Complex policy requirements",
      "Regulatory compliance needs",
    ],
    isRecommended: true,
  },

  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    category: "challenger",
    marketShare: 18.7,
    deploymentType: "hybrid",
    logo: "/aruba-logo.png",
    description: "Comprehensive network access control with strong policy management and multi-vendor support.",

    pricing: {
      model: "per-device",
      basePrice: 25000,
      pricePerDevice: 8.5,
      minimumDevices: 50,
      additionalCosts: {
        hardware: 80000,
        services: 40000,
        training: 15000,
        maintenance: 20000,
      },
    },

    implementation: {
      timeToDeployDays: 90,
      complexity: "medium",
      professionalServicesRequired: true,
      trainingHours: 24,
    },

    security: {
      securityRating: 82,
      cveCount: 12,
      lastSecurityIncident: "2023-Q2",
      complianceSupport: ["HIPAA", "PCI-DSS", "SOX", "GDPR", "NIST"],
      zeroTrustMaturity: 70,
    },

    features: {
      core: ["Policy Manager", "Device Insight", "Guest Access", "OnGuard"],
      advanced: ["IntroSpect UEBA", "Policy Enforcement", "Threat Detection", "Compliance Reporting"],
      integrations: ["Aruba Infrastructure", "Third-party Switches", "SIEM Solutions", "MDM Platforms"],
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 2 hours",
      customerSatisfaction: 84,
    },

    strengths: [
      "Strong policy management",
      "Multi-vendor support",
      "Good price-performance ratio",
      "Comprehensive feature set",
    ],
    weaknesses: ["Complex initial setup", "Hardware dependencies", "Limited cloud-native features"],
    bestFor: [
      "Mid to large enterprises",
      "Multi-vendor environments",
      "Policy-heavy deployments",
      "Budget-conscious organizations",
    ],
    isRecommended: true,
  },

  forescout: {
    id: "forescout",
    name: "Forescout Platform",
    category: "challenger",
    marketShare: 12.3,
    deploymentType: "hybrid",
    logo: "/forescout-logo.png",
    description: "Device visibility and control platform with strong IoT and OT security capabilities.",

    pricing: {
      model: "per-device",
      basePrice: 30000,
      pricePerDevice: 6.5,
      minimumDevices: 100,
      additionalCosts: {
        hardware: 60000,
        services: 35000,
        training: 18000,
        maintenance: 25000,
      },
    },

    implementation: {
      timeToDeployDays: 120,
      complexity: "medium",
      professionalServicesRequired: true,
      trainingHours: 32,
    },

    security: {
      securityRating: 80,
      cveCount: 8,
      lastSecurityIncident: "2023-Q1",
      complianceSupport: ["HIPAA", "PCI-DSS", "NIST", "IEC 62443"],
      zeroTrustMaturity: 65,
    },

    features: {
      core: ["Device Discovery", "Classification", "Policy Enforcement", "Compliance Monitoring"],
      advanced: ["IoT Security", "OT Visibility", "Threat Detection", "Automated Response"],
      integrations: ["Security Orchestration", "SIEM Platforms", "Firewalls", "Endpoint Protection"],
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 3 hours",
      customerSatisfaction: 79,
    },

    strengths: [
      "Excellent IoT/OT visibility",
      "Strong device classification",
      "Good integration capabilities",
      "Comprehensive compliance features",
    ],
    weaknesses: ["Complex deployment", "Higher learning curve", "Limited cloud-native options"],
    bestFor: [
      "IoT-heavy environments",
      "OT/Industrial networks",
      "Compliance-focused organizations",
      "Large device inventories",
    ],
    isRecommended: true,
  },

  juniper: {
    id: "juniper",
    name: "Juniper Mist Access Assurance",
    category: "visionary",
    marketShare: 3.1,
    deploymentType: "cloud",
    logo: "/juniper-logo.png",
    description: "AI-driven cloud-native access assurance with machine learning capabilities.",

    pricing: {
      model: "per-device",
      basePrice: 10000,
      pricePerDevice: 6.0,
      minimumDevices: 50,
      additionalCosts: {
        hardware: 30000,
        services: 15000,
        training: 8000,
        maintenance: 12000,
      },
    },

    implementation: {
      timeToDeployDays: 30,
      complexity: "low",
      professionalServicesRequired: false,
      trainingHours: 12,
    },

    security: {
      securityRating: 82,
      cveCount: 3,
      complianceSupport: ["HIPAA", "PCI-DSS", "GDPR"],
      zeroTrustMaturity: 80,
    },

    features: {
      core: ["AI-Driven Insights", "Dynamic Policies", "User Experience Monitoring"],
      advanced: ["Machine Learning", "Predictive Analytics", "Automated Troubleshooting"],
      integrations: ["Mist Cloud", "Juniper Infrastructure", "Third-party Systems"],
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 2 hours",
      customerSatisfaction: 85,
    },

    strengths: ["AI-driven capabilities", "Cloud-native architecture", "Excellent user experience", "Low CVE count"],
    weaknesses: ["Requires Mist ecosystem", "Limited on-premise options", "Newer to market"],
    bestFor: ["Juniper Mist users", "AI-driven operations", "Cloud-first organizations", "User experience focus"],
  },

  extreme: {
    id: "extreme",
    name: "Extreme NAC",
    category: "niche",
    marketShare: 5.8,
    deploymentType: "hybrid",
    logo: "/extreme-logo.png",
    description: "Flexible network access control with cloud and on-premise deployment options.",

    pricing: {
      model: "per-device",
      basePrice: 15000,
      pricePerDevice: 5.0,
      minimumDevices: 50,
      additionalCosts: {
        hardware: 40000,
        services: 20000,
        training: 10000,
        maintenance: 15000,
      },
    },

    implementation: {
      timeToDeployDays: 60,
      complexity: "medium",
      professionalServicesRequired: false,
      trainingHours: 16,
    },

    security: {
      securityRating: 75,
      cveCount: 5,
      complianceSupport: ["HIPAA", "PCI-DSS", "SOX"],
      zeroTrustMaturity: 60,
    },

    features: {
      core: ["Access Control", "Guest Management", "Device Profiling", "Policy Enforcement"],
      advanced: ["Cloud Management", "Analytics", "Automated Remediation"],
      integrations: ["Extreme Infrastructure", "Third-party Systems", "Cloud Platforms"],
    },

    support: {
      availability: "Business Hours",
      responseTime: "< 4 hours",
      customerSatisfaction: 76,
    },

    strengths: ["Flexible deployment options", "Good value proposition", "Easy to manage", "Quick deployment"],
    weaknesses: ["Limited advanced features", "Smaller ecosystem", "Basic analytics capabilities"],
    bestFor: [
      "SMB to mid-market",
      "Extreme infrastructure users",
      "Simple NAC requirements",
      "Budget-conscious deployments",
    ],
  },

  fortinet: {
    id: "fortinet",
    name: "Fortinet FortiNAC",
    category: "niche",
    marketShare: 4.2,
    deploymentType: "on-premise",
    logo: "/fortinet-logo.png",
    description: "Network access control integrated with Fortinet Security Fabric for comprehensive security.",

    pricing: {
      model: "quote-based",
      basePrice: 20000,
      pricePerDevice: 7.0,
      minimumDevices: 100,
      additionalCosts: {
        hardware: 50000,
        services: 25000,
        training: 12000,
        maintenance: 18000,
      },
    },

    implementation: {
      timeToDeployDays: 90,
      complexity: "medium",
      professionalServicesRequired: true,
      trainingHours: 24,
    },

    security: {
      securityRating: 78,
      cveCount: 15,
      complianceSupport: ["HIPAA", "PCI-DSS", "SOX", "GDPR"],
      zeroTrustMaturity: 65,
    },

    features: {
      core: ["Device Discovery", "Access Control", "Guest Portal", "Compliance Monitoring"],
      advanced: ["Security Fabric Integration", "Threat Intelligence", "Automated Response"],
      integrations: ["Fortinet Security Fabric", "FortiGate", "FortiAnalyzer", "Third-party SIEM"],
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 4 hours",
      customerSatisfaction: 74,
    },

    strengths: [
      "Strong Fortinet integration",
      "Comprehensive security features",
      "Good threat intelligence",
      "Unified management",
    ],
    weaknesses: ["Limited multi-vendor support", "Complex without Fortinet infrastructure", "Higher CVE count"],
    bestFor: [
      "Fortinet-centric environments",
      "Security-focused organizations",
      "Integrated security requirements",
      "Threat intelligence needs",
    ],
  },

  microsoft: {
    id: "microsoft",
    name: "Microsoft Network Policy Server (NPS)",
    category: "niche",
    marketShare: 15.2,
    deploymentType: "on-premise",
    logo: "/microsoft-logo.png",
    description: "Basic RADIUS authentication included with Windows Server. Limited NAC capabilities.",

    pricing: {
      model: "flat-rate",
      basePrice: 0,
      pricePerDevice: 0,
      additionalCosts: {
        hardware: 25000,
        services: 15000,
        training: 5000,
        maintenance: 10000,
      },
    },

    implementation: {
      timeToDeployDays: 30,
      complexity: "medium",
      professionalServicesRequired: false,
      trainingHours: 16,
    },

    security: {
      securityRating: 65,
      cveCount: 12,
      complianceSupport: ["Basic Windows Security"],
      zeroTrustMaturity: 30,
    },

    features: {
      core: ["RADIUS Authentication", "Basic Policy Management", "Windows Integration"],
      advanced: ["Limited - Basic RADIUS only"],
      integrations: ["Active Directory", "Windows Infrastructure", "Basic LDAP"],
    },

    support: {
      availability: "Business Hours",
      responseTime: "Varies",
      customerSatisfaction: 68,
    },

    strengths: ["Free with Windows Server", "Native AD integration", "Simple RADIUS functionality"],
    weaknesses: [
      "Very limited NAC features",
      "No advanced security capabilities",
      "Basic policy management",
      "Limited scalability",
    ],
    bestFor: [
      "Basic RADIUS needs only",
      "Small Windows environments",
      "Budget-constrained deployments",
      "Simple authentication requirements",
    ],
  },

  foxpass: {
    id: "foxpass",
    name: "FoxPass",
    category: "niche",
    marketShare: 1.2,
    deploymentType: "cloud",
    logo: "/foxpass-logo.png",
    description: "Cloud-based RADIUS service focused on simplicity and ease of use for SMB market.",

    pricing: {
      model: "per-user",
      basePrice: 0,
      pricePerDevice: 3.0,
      minimumDevices: 10,
      additionalCosts: {
        hardware: 0,
        services: 2000,
        training: 1000,
        maintenance: 0,
      },
    },

    implementation: {
      timeToDeployDays: 7,
      complexity: "low",
      professionalServicesRequired: false,
      trainingHours: 4,
    },

    security: {
      securityRating: 72,
      cveCount: 2,
      complianceSupport: ["Basic Security"],
      zeroTrustMaturity: 45,
    },

    features: {
      core: ["Cloud RADIUS", "User Management", "Basic Policies"],
      advanced: ["API Integration", "SSO Support", "Basic Analytics"],
      integrations: ["Google Workspace", "Office 365", "LDAP", "SAML"],
    },

    support: {
      availability: "Business Hours",
      responseTime: "< 24 hours",
      customerSatisfaction: 81,
    },

    strengths: ["Simple cloud deployment", "Good for SMB market", "Affordable pricing", "Easy to use"],
    weaknesses: [
      "Limited enterprise features",
      "Basic security capabilities",
      "No advanced NAC functions",
      "Limited scalability",
    ],
    bestFor: [
      "Small to medium businesses",
      "Simple RADIUS needs",
      "Cloud-first organizations",
      "Budget-conscious deployments",
    ],
  },

  securew2: {
    id: "securew2",
    name: "SecureW2",
    category: "niche",
    marketShare: 0.8,
    deploymentType: "cloud",
    logo: "/securew2-logo.png",
    description: "Cloud-based certificate management and WiFi security solution with PKI focus.",

    pricing: {
      model: "per-device",
      basePrice: 5000,
      pricePerDevice: 3.5,
      minimumDevices: 500,
      additionalCosts: {
        hardware: 0,
        services: 8000,
        training: 3000,
        maintenance: 0,
      },
    },

    implementation: {
      timeToDeployDays: 14,
      complexity: "low",
      professionalServicesRequired: false,
      trainingHours: 8,
    },

    security: {
      securityRating: 85,
      cveCount: 2,
      complianceSupport: ["HIPAA", "PCI-DSS", "GDPR"],
      zeroTrustMaturity: 75,
    },

    features: {
      core: ["Certificate Management", "WiFi Security", "RADIUS-as-a-Service", "User Onboarding"],
      advanced: ["Cloud PKI", "BYOD Onboarding", "Certificate Lifecycle Management", "API Integration"],
      integrations: ["Active Directory", "Azure AD", "Google Workspace", "SAML IdPs", "MDM Solutions"],
    },

    support: {
      availability: "Business Hours",
      responseTime: "< 4 hours",
      customerSatisfaction: 83,
    },

    strengths: [
      "Strong certificate management",
      "Excellent WiFi security",
      "Cloud-native architecture",
      "Good BYOD support",
    ],
    weaknesses: [
      "Limited NAC features beyond WiFi",
      "Focused on certificate-based auth",
      "Niche market focus",
      "Limited wired network support",
    ],
    bestFor: [
      "Certificate-based authentication",
      "Educational institutions",
      "WiFi-focused security",
      "BYOD environments",
    ],
  },

  meraki: {
    id: "meraki",
    name: "Cisco Meraki",
    category: "niche",
    marketShare: 6.8,
    deploymentType: "cloud",
    logo: "/meraki-logo.png",
    description: "Cloud-managed network access control integrated with Meraki infrastructure.",

    pricing: {
      model: "per-device",
      basePrice: 10000,
      pricePerDevice: 4.5,
      minimumDevices: 50,
      additionalCosts: {
        hardware: 80000,
        services: 15000,
        training: 8000,
        maintenance: 12000,
      },
    },

    implementation: {
      timeToDeployDays: 14,
      complexity: "low",
      professionalServicesRequired: false,
      trainingHours: 8,
    },

    security: {
      securityRating: 78,
      cveCount: 6,
      complianceSupport: ["HIPAA", "PCI-DSS", "SOX"],
      zeroTrustMaturity: 65,
    },

    features: {
      core: ["Cloud Management", "Policy Enforcement", "Guest Access"],
      advanced: ["Analytics", "Threat Protection", "SD-WAN Integration"],
      integrations: ["Meraki Infrastructure", "Cisco Security", "Third-party APIs"],
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 2 hours",
      customerSatisfaction: 86,
    },

    strengths: ["Easy cloud management", "Quick deployment", "Good user experience", "Strong Meraki integration"],
    weaknesses: [
      "Requires Meraki infrastructure",
      "Limited multi-vendor support",
      "Subscription-based pricing",
      "Vendor lock-in",
    ],
    bestFor: ["Meraki customers", "Cloud-managed networks", "Simple deployments", "SMB to mid-market"],
  },
}

export default function EnhancedVendorSelection({
  selectedVendors,
  onVendorToggle,
  onClearAll,
  onSelectRecommended,
  darkMode = false,
}: EnhancedVendorSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [deploymentFilter, setDeploymentFilter] = useState("all")
  const [priceRangeFilter, setPriceRangeFilter] = useState("all")
  const [showOnlyRecommended, setShowOnlyRecommended] = useState(false)
  const [sortBy, setSortBy] = useState("recommendation")

  // Enhanced vendor data processing with comprehensive error handling
  const processedVendors = useMemo(() => {
    try {
      return Object.entries(COMPREHENSIVE_VENDOR_DATA).map(([id, vendor]) => {
        // Safe data extraction with fallbacks
        const vendorData = vendor || {}
        const pricing = vendorData.pricing || {}
        const features = vendorData.features || {}
        const implementation = vendorData.implementation || {}
        const support = vendorData.support || {}
        const security = vendorData.security || {}

        return {
          id: safeString(id),
          name: safeString(vendorData.name) || safeString(id).toUpperCase(),
          category: safeString(vendorData.category) || "niche",
          description: safeString(vendorData.description) || "Network Access Control Solution",
          logo: safeString(vendorData.logo) || "/placeholder-logo.png",

          // Pricing information with safe conversion
          pricing: {
            model: safeString(pricing.model) || "per-device",
            range: `$${safeNumber(pricing.pricePerDevice, 50)}-${safeNumber(pricing.pricePerDevice * 1.5, 75)}/device/year`,
            minPrice: safeNumber(pricing.pricePerDevice, 50),
            maxPrice: safeNumber(pricing.pricePerDevice * 1.5, 75),
            currency: "USD",
            billingCycle: "annual",
          },

          // Feature scores with safe conversion (convert to 1-10 scale)
          features: {
            easeOfUse: implementation.complexity === "low" ? 9 : implementation.complexity === "medium" ? 7 : 5,
            scalability: Math.min(safeNumber(vendorData.marketShare, 5) / 5, 10), // Convert market share to scalability score
            integration: Array.isArray(vendorData.features?.integrations)
              ? Math.min(vendorData.features.integrations.length / 2, 10)
              : 6,
            security: Math.round(safeNumber(security.securityRating, 70) / 10),
            support: Math.round(safeNumber(support.customerSatisfaction, 75) / 10),
            innovation:
              vendorData.category === "visionary"
                ? 9
                : vendorData.category === "leader"
                  ? 8
                  : vendorData.category === "challenger"
                    ? 7
                    : 6,
          },

          // Deployment information
          deployment: {
            type: safeString(vendorData.deploymentType) || "hybrid",
            timeToValue: safeString(implementation.timeToDeployDays)
              ? `${implementation.timeToDeployDays} days`
              : "3-6 months",
            complexity: safeString(implementation.complexity) || "medium",
            requirements: ["Standard infrastructure"],
          },

          // Support and maintenance
          support: {
            availability: safeString(support.availability) || "business-hours",
            channels: Array.isArray(support.channels) ? support.channels : ["email", "phone"],
            documentation: "good",
            community: "moderate",
          },

          // Security and compliance
          security: {
            certifications: Array.isArray(security.complianceSupport) ? security.complianceSupport : [],
            vulnerabilities: safeNumber(security.cveCount, 5),
            lastAudit: "2024",
            complianceScore: safeNumber(security.securityRating, 75),
          },

          // Market position
          marketShare: safeNumber(vendorData.marketShare, 5),
          customerSatisfaction: safeNumber(support.customerSatisfaction, 75),
          yearFounded: 2010,
          employeeCount: 1000,

          // Recommendation data
          isRecommended: Boolean(
            vendorData.isRecommended || vendorData.category === "leader" || vendorData.category === "visionary",
          ),
          recommendationReason:
            Array.isArray(vendorData.strengths) && vendorData.strengths.length > 0 ? vendorData.strengths[0] : "",
          pros: Array.isArray(vendorData.strengths) ? vendorData.strengths.slice(0, 3) : [],
          cons: Array.isArray(vendorData.weaknesses) ? vendorData.weaknesses.slice(0, 3) : [],

          // Status and availability
          status: "active",
          availability: "global",
          lastUpdated: new Date().toISOString(),
        }
      })
    } catch (error) {
      console.error("Error processing vendor data:", error)
      return []
    }
  }, [])

  // Enhanced filtering logic with comprehensive error handling
  const filteredVendors = useMemo(() => {
    try {
      let filtered = [...processedVendors]

      // Search filter
      if (searchTerm.trim()) {
        const searchLower = safeString(searchTerm).toLowerCase()
        filtered = filtered.filter(
          (vendor) =>
            safeString(vendor.name).toLowerCase().includes(searchLower) ||
            safeString(vendor.description).toLowerCase().includes(searchLower) ||
            safeString(vendor.category).toLowerCase().includes(searchLower),
        )
      }

      // Category filter
      if (categoryFilter !== "all") {
        filtered = filtered.filter(
          (vendor) => safeString(vendor.category).toLowerCase() === safeString(categoryFilter).toLowerCase(),
        )
      }

      // Deployment filter
      if (deploymentFilter !== "all") {
        filtered = filtered.filter(
          (vendor) => safeString(vendor.deployment.type).toLowerCase() === safeString(deploymentFilter).toLowerCase(),
        )
      }

      // Price range filter
      if (priceRangeFilter !== "all") {
        filtered = filtered.filter((vendor) => {
          const maxPrice = safeNumber(vendor.pricing.maxPrice, 0)
          switch (priceRangeFilter) {
            case "low":
              return maxPrice <= 50
            case "medium":
              return maxPrice > 50 && maxPrice <= 100
            case "high":
              return maxPrice > 100
            default:
              return true
          }
        })
      }

      // Recommended filter
      if (showOnlyRecommended) {
        filtered = filtered.filter((vendor) => Boolean(vendor.isRecommended))
      }

      // Sorting with safe comparison
      filtered.sort((a, b) => {
        try {
          switch (sortBy) {
            case "name":
              return safeString(a.name).localeCompare(safeString(b.name))
            case "price":
              return safeNumber(a.pricing.minPrice, 0) - safeNumber(b.pricing.minPrice, 0)
            case "rating":
              return safeNumber(b.customerSatisfaction, 0) - safeNumber(a.customerSatisfaction, 0)
            case "marketShare":
              return safeNumber(b.marketShare, 0) - safeNumber(a.marketShare, 0)
            case "recommendation":
            default:
              // Portnox first, then recommended, then by market share
              if (safeString(a.id) === "portnox") return -1
              if (safeString(b.id) === "portnox") return 1
              if (Boolean(a.isRecommended) !== Boolean(b.isRecommended)) {
                return Boolean(b.isRecommended) ? 1 : -1
              }
              return safeNumber(b.marketShare, 0) - safeNumber(a.marketShare, 0)
          }
        } catch (error) {
          console.error("Error sorting vendors:", error)
          return 0
        }
      })

      return filtered
    } catch (error) {
      console.error("Error filtering vendors:", error)
      return processedVendors
    }
  }, [processedVendors, searchTerm, categoryFilter, deploymentFilter, priceRangeFilter, showOnlyRecommended, sortBy])

  // Enhanced vendor card component with comprehensive error handling
  const VendorCard = ({ vendor }: { vendor: any }) => {
    try {
      const isSelected = selectedVendors.includes(safeString(vendor.id))
      const isPortnox = safeString(vendor.id) === "portnox"

      // Safe feature calculation
      const avgFeatureScore =
        Object.values(vendor.features || {})
          .map((score) => safeNumber(score, 0))
          .reduce((sum, score) => sum + score, 0) / 6

      return (
        <Card
          className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
            isSelected
              ? isPortnox
                ? "ring-2 ring-green-500 bg-green-50 dark:bg-green-950/20"
                : "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/20"
              : "hover:shadow-md"
          } ${isPortnox ? "border-green-200 dark:border-green-800" : ""}`}
          onClick={() => onVendorToggle(safeString(vendor.id))}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={safeString(vendor.logo) || "/placeholder.svg"}
                    alt={`${safeString(vendor.name)} logo`}
                    className="w-12 h-12 object-contain rounded-lg bg-white p-1 border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder-logo.png"
                    }}
                  />
                  {isPortnox && (
                    <div className="absolute -top-1 -right-1">
                      <Badge className="bg-green-600 text-white text-xs px-1 py-0">
                        <Star className="h-3 w-3 mr-1" />
                        BEST
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {safeString(vendor.name)}
                    {Boolean(vendor.isRecommended) && (
                      <Badge variant="secondary" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        Recommended
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm mt-1">{safeString(vendor.description)}</CardDescription>
                </div>
              </div>
              <Checkbox checked={isSelected} onChange={() => onVendorToggle(safeString(vendor.id))} className="mt-1" />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Pricing Information */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm">Pricing</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm">{safeString(vendor.pricing.range)}</div>
                <div className="text-xs text-muted-foreground capitalize">
                  {safeString(vendor.pricing.model)} • {safeString(vendor.pricing.billingCycle)}
                </div>
              </div>
            </div>

            {/* Feature Scores */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Score</span>
                <div className="flex items-center gap-2">
                  <Progress value={avgFeatureScore * 10} className="w-16 h-2" />
                  <span className="text-sm font-semibold">{avgFeatureScore.toFixed(1)}/10</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span>Security:</span>
                  <span className="font-medium">{safeNumber(vendor.features.security, 0)}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Ease of Use:</span>
                  <span className="font-medium">{safeNumber(vendor.features.easeOfUse, 0)}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Scalability:</span>
                  <span className="font-medium">{safeNumber(vendor.features.scalability, 0)}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Integration:</span>
                  <span className="font-medium">{safeNumber(vendor.features.integration, 0)}/10</span>
                </div>
              </div>
            </div>

            {/* Deployment Information */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span>Deployment:</span>
              </div>
              <div className="text-right">
                <div className="font-medium">{safeString(vendor.deployment.timeToValue)}</div>
                <div className="text-xs text-muted-foreground capitalize">
                  {safeString(vendor.deployment.type)} • {safeString(vendor.deployment.complexity)}
                </div>
              </div>
            </div>

            {/* Market Position */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <span>Market Share:</span>
              </div>
              <div className="text-right">
                <div className="font-medium">{safeNumber(vendor.marketShare, 0)}%</div>
                <div className="text-xs text-muted-foreground">
                  {safeNumber(vendor.customerSatisfaction, 0)}% satisfaction
                </div>
              </div>
            </div>

            {/* Security Status */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-600" />
                <span>Security:</span>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {safeNumber(vendor.security.vulnerabilities, 0) === 0 ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Zero CVEs
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {safeNumber(vendor.security.vulnerabilities, 0)} CVEs
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {safeNumber(vendor.security.complianceScore, 0)}% compliance
                </div>
              </div>
            </div>

            {/* Recommendation Reason */}
            {Boolean(vendor.isRecommended) && safeString(vendor.recommendationReason) && (
              <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
                <Sparkles className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  <strong>Why recommended:</strong> {safeString(vendor.recommendationReason)}
                </AlertDescription>
              </Alert>
            )}

            {/* Pros and Cons */}
            {(Array.isArray(vendor.pros) && vendor.pros.length > 0) ||
            (Array.isArray(vendor.cons) && vendor.cons.length > 0) ? (
              <div className="grid grid-cols-1 gap-2 text-xs">
                {Array.isArray(vendor.pros) && vendor.pros.length > 0 && (
                  <div>
                    <div className="font-medium text-green-600 mb-1">Strengths:</div>
                    <ul className="space-y-1">
                      {vendor.pros.slice(0, 2).map((pro: any, index: number) => (
                        <li key={index} className="flex items-start gap-1">
                          <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{safeString(pro)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {Array.isArray(vendor.cons) && vendor.cons.length > 0 && (
                  <div>
                    <div className="font-medium text-red-600 mb-1">Considerations:</div>
                    <ul className="space-y-1">
                      {vendor.cons.slice(0, 2).map((con: any, index: number) => (
                        <li key={index} className="flex items-start gap-1">
                          <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>{safeString(con)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : null}
          </CardContent>
        </Card>
      )
    } catch (error) {
      console.error("Error rendering vendor card:", error)
      return (
        <Card className="p-4">
          <div className="text-center text-muted-foreground">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
            <p>Error loading vendor information</p>
          </div>
        </Card>
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Vendor Selection</h2>
            <p className="text-muted-foreground">Compare and select NAC vendors for your analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{selectedVendors.length} selected</Badge>
            <Badge variant="outline">{filteredVendors.length} available</Badge>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={onSelectRecommended} size="sm" className="bg-green-600 hover:bg-green-700">
            <Target className="h-4 w-4 mr-2" />
            Select Recommended
          </Button>
          <Button onClick={onClearAll} variant="outline" size="sm">
            Clear All
          </Button>
          <Button
            onClick={() => setShowOnlyRecommended(!showOnlyRecommended)}
            variant={showOnlyRecommended ? "default" : "outline"}
            size="sm"
          >
            <Award className="h-4 w-4 mr-2" />
            Recommended Only
          </Button>
        </div>
      </div>

      {/* Enhanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Basic Filters</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Criteria</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search">Search Vendors</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="leader">Leader</SelectItem>
                      <SelectItem value="challenger">Challenger</SelectItem>
                      <SelectItem value="visionary">Visionary</SelectItem>
                      <SelectItem value="niche">Niche</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Deployment Filter */}
                <div className="space-y-2">
                  <Label>Deployment</Label>
                  <Select value={deploymentFilter} onValueChange={setDeploymentFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Deployments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Deployments</SelectItem>
                      <SelectItem value="cloud">Cloud</SelectItem>
                      <SelectItem value="on-premise">On-Premise</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <Select value={priceRangeFilter} onValueChange={setPriceRangeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Prices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="low">Low (&lt;=$50/device)</SelectItem>
                      <SelectItem value="medium">Medium ($50-100/device)</SelectItem>
                      <SelectItem value="high">High (&gt;$100/device)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sort Options */}
                <div className="space-y-2">
                  <Label>Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommendation">Recommendation</SelectItem>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                      <SelectItem value="price">Price (Low to High)</SelectItem>
                      <SelectItem value="rating">Customer Rating</SelectItem>
                      <SelectItem value="marketShare">Market Share</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Filters */}
                <div className="space-y-3">
                  <Label>Additional Criteria</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="recommended-only"
                        checked={showOnlyRecommended}
                        onCheckedChange={setShowOnlyRecommended}
                      />
                      <Label htmlFor="recommended-only" className="text-sm">
                        Show only recommended vendors
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Results Summary */}
      {filteredVendors.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-4">
            <Info className="h-5 w-5 text-blue-600" />
            <span className="font-medium">
              Showing {filteredVendors.length} vendor{filteredVendors.length !== 1 ? "s" : ""}
              {searchTerm && ` matching "${searchTerm}"`}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{selectedVendors.length} selected for comparison</span>
          </div>
        </div>
      )}

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVendors.length > 0 ? (
          filteredVendors.map((vendor) => <VendorCard key={safeString(vendor.id)} vendor={vendor} />)
        ) : (
          <div className="col-span-full">
            <Card className="p-8">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">No vendors found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search terms to find more vendors.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setCategoryFilter("all")
                    setDeploymentFilter("all")
                    setPriceRangeFilter("all")
                    setShowOnlyRecommended(false)
                  }}
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Selection Summary */}
      {selectedVendors.length > 0 && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-green-800 dark:text-green-200">
              <CheckCircle2 className="h-5 w-5" />
              Selected Vendors ({selectedVendors.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedVendors.map((vendorId) => {
                const vendor = processedVendors.find((v) => safeString(v.id) === vendorId)
                if (!vendor) return null

                return (
                  <Badge key={vendorId} variant="secondary" className="flex items-center gap-2 px-3 py-1">
                    <img
                      src={safeString(vendor.logo) || "/placeholder.svg"}
                      alt={safeString(vendor.name)}
                      className="w-4 h-4 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder-logo.png"
                      }}
                    />
                    {safeString(vendor.name)}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onVendorToggle(vendorId)
                      }}
                      className="ml-1 hover:bg-red-100 rounded-full p-0.5"
                    >
                      <XCircle className="h-3 w-3" />
                    </button>
                  </Badge>
                )
              })}
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Ready to analyze {selectedVendors.length} vendor{selectedVendors.length !== 1 ? "s" : ""}
                for your NAC requirements
              </p>
              <div className="flex gap-2">
                <Button onClick={onClearAll} variant="outline" size="sm">
                  Clear Selection
                </Button>
                <Button onClick={onSelectRecommended} size="sm" className="bg-green-600 hover:bg-green-700">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Use Recommended
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

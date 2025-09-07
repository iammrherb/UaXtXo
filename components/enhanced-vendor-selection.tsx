"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronRight,
  Cloud,
  Filter,
  Info,
  Search,
  Server,
  Shield,
  Star,
  X,
  AlertTriangle,
  DollarSign,
  Clock,
  Users,
  Zap,
  Award,
  Database,
  Lock,
  Network,
  Settings,
  TrendingUp,
  Phone,
  Mail,
} from "lucide-react"
import Image from "next/image"

interface EnhancedVendorSelectionProps {
  selectedVendors: string[]
  onVendorToggle: (vendorId: string) => void
  onClearAll: () => void
  onSelectRecommended: () => void
  darkMode: boolean
}

// Safe string conversion utility
function safeString(value: any): string {
  if (value === null || value === undefined) return ""
  if (typeof value === "string") return value
  if (typeof value === "number") return value.toString()
  if (typeof value === "boolean") return value.toString()
  if (typeof value === "object") return JSON.stringify(value)
  return String(value)
}

// Safe number conversion utility
function safeNumber(value: any, defaultValue = 0): number {
  if (value === null || value === undefined) return defaultValue
  const num = Number(value)
  return isNaN(num) || !isFinite(num) ? defaultValue : num
}

// Comprehensive vendor data with detailed specifications and pricing
const VENDOR_DISPLAY_DATA = {
  portnox: {
    name: "Portnox CLEAR",
    description: "Cloud-native NAC with AI-powered automation and zero-trust architecture",
    category: "leader",
    deploymentType: "cloud",
    marketShare: 8.5,
    securityRating: 95,
    logo: "/portnox-logo.png",
    isRecommended: true,
    isDefault: true,

    pricing: {
      model: "Per Device/Month",
      startingPrice: "$4.00",
      enterprisePrice: "$3.00",
      minimumDevices: 10,
      contractTerms: ["Monthly", "Annual", "Multi-year"],
      volumeDiscounts: [
        { threshold: 500, discount: "5%" },
        { threshold: 1000, discount: "10%" },
        { threshold: 2500, discount: "15%" },
        { threshold: 5000, discount: "20%" },
        { threshold: 10000, discount: "25%" },
      ],
      includedFeatures: [
        "Unlimited policies",
        "24/7 support",
        "All integrations",
        "Advanced analytics",
        "Compliance reporting",
      ],
      additionalCosts: {
        implementation: "$0",
        training: "Included",
        support: "Included",
        hardware: "$0",
      },
    },

    technical: {
      protocols: ["RADIUS", "802.1X", "TACACS+", "LDAP", "SAML", "OAuth", "OpenID Connect"],
      integrations: [
        "Active Directory",
        "Azure AD",
        "Okta",
        "Ping Identity",
        "Splunk",
        "QRadar",
        "ArcSight",
        "Elastic",
        "ServiceNow",
        "Jira",
        "PagerDuty",
        "Intune",
        "VMware Workspace ONE",
        "MobileIron",
        "AWS",
        "Azure",
        "GCP",
        "Oracle Cloud",
      ],
      supportedDevices: ["Windows", "macOS", "iOS", "Android", "Linux", "IoT devices", "Network equipment"],
      networkEquipment: [
        "Cisco",
        "Aruba",
        "Juniper",
        "Extreme",
        "Fortinet",
        "Meraki",
        "Ubiquiti",
        "All 802.1X capable",
      ],
      scalability: {
        maxDevices: "Unlimited",
        maxPolicies: "Unlimited",
        maxSites: "Unlimited",
        performance: "Sub-second response",
      },
      compliance: ["SOC 2 Type II", "ISO 27001", "HIPAA", "PCI DSS", "GDPR", "FedRAMP Ready", "NIST", "CMMC"],
      security: {
        encryption: "AES-256",
        dataResidency: "Customer choice",
        sso: "Full SSO support",
        mfa: "Built-in MFA",
        zeroTrust: "95% maturity",
      },
    },

    implementation: {
      deploymentTime: "30 minutes",
      complexity: "Low",
      professionalServices: "Optional",
      trainingRequired: "2 hours",
      successRate: "99%",
      timeToValue: "Same day",
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 1 hour",
      channels: ["Phone", "Email", "Chat", "Portal"],
      satisfaction: "96%",
      documentation: "Comprehensive",
      community: "Active forum",
    },

    performance: {
      uptime: "99.99%",
      latency: "< 50ms",
      throughput: "Unlimited",
      cveCount: 0,
      mttr: "15 minutes",
    },
  },

  cisco: {
    name: "Cisco Identity Services Engine",
    description: "Enterprise NAC solution with comprehensive policy enforcement",
    category: "leader",
    deploymentType: "on-premise",
    marketShare: 25.3,
    securityRating: 72,
    logo: "/cisco-logo.png",
    isRecommended: true,

    pricing: {
      model: "Per Device/Year + Hardware",
      startingPrice: "$125",
      enterprisePrice: "$165",
      minimumDevices: 100,
      contractTerms: ["3-year", "5-year"],
      volumeDiscounts: [
        { threshold: 1000, discount: "5%" },
        { threshold: 5000, discount: "10%" },
        { threshold: 10000, discount: "15%" },
      ],
      includedFeatures: ["Base license features", "Standard support", "Basic reporting"],
      additionalCosts: {
        implementation: "$150,000",
        training: "$25,000",
        support: "22% annually",
        hardware: "$65,000 - $175,000",
      },
    },

    technical: {
      protocols: ["RADIUS", "802.1X", "TACACS+", "LDAP", "Active Directory"],
      integrations: [
        "Cisco Security Portfolio",
        "pxGrid",
        "TrustSec",
        "Third-party SIEM",
        "MDM Solutions",
        "Threat Intelligence Feeds",
      ],
      supportedDevices: ["Windows", "macOS", "iOS", "Android", "Linux", "Network devices"],
      networkEquipment: ["Cisco (optimized)", "Multi-vendor support"],
      scalability: {
        maxDevices: "500,000",
        maxPolicies: "10,000",
        maxSites: "1,000",
        performance: "2-5 second response",
      },
      compliance: ["HIPAA", "PCI DSS", "SOX", "NIST", "Common Criteria", "FIPS 140-2"],
      security: {
        encryption: "AES-256",
        dataResidency: "On-premise",
        sso: "Limited SSO",
        mfa: "Third-party required",
        zeroTrust: "75% maturity",
      },
    },

    implementation: {
      deploymentTime: "6 months",
      complexity: "High",
      professionalServices: "Required",
      trainingRequired: "80 hours",
      successRate: "67%",
      timeToValue: "6-9 months",
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 4 hours",
      channels: ["Phone", "Email", "Portal"],
      satisfaction: "78%",
      documentation: "Extensive but complex",
      community: "Large community",
    },

    performance: {
      uptime: "99.5%",
      latency: "200-500ms",
      throughput: "Hardware dependent",
      cveCount: 55,
      mttr: "12 hours",
    },
  },

  aruba: {
    name: "Aruba ClearPass",
    description: "Policy management platform with network access control",
    category: "challenger",
    deploymentType: "hybrid",
    marketShare: 15.2,
    securityRating: 70,
    logo: "/aruba-logo.png",
    isRecommended: true,

    pricing: {
      model: "Per Device/Year + Hardware",
      startingPrice: "$60",
      enterprisePrice: "$85",
      minimumDevices: 50,
      contractTerms: ["1-year", "3-year", "5-year"],
      volumeDiscounts: [
        { threshold: 500, discount: "5%" },
        { threshold: 2000, discount: "10%" },
        { threshold: 5000, discount: "15%" },
      ],
      includedFeatures: ["Policy Manager", "Device Insight", "Guest Access", "OnGuard"],
      additionalCosts: {
        implementation: "$80,000",
        training: "$15,000",
        support: "18% annually",
        hardware: "$29,000 - $70,000",
      },
    },

    technical: {
      protocols: ["RADIUS", "802.1X", "TACACS+", "LDAP", "SAML"],
      integrations: [
        "Aruba Infrastructure",
        "Third-party Switches",
        "SIEM Solutions",
        "MDM Platforms",
        "IntroSpect UEBA",
      ],
      supportedDevices: ["Windows", "macOS", "iOS", "Android", "Linux", "IoT"],
      networkEquipment: ["Aruba (optimized)", "Multi-vendor"],
      scalability: {
        maxDevices: "100,000",
        maxPolicies: "5,000",
        maxSites: "500",
        performance: "1-3 second response",
      },
      compliance: ["HIPAA", "PCI DSS", "SOX", "GDPR", "ISO 27001"],
      security: {
        encryption: "AES-256",
        dataResidency: "Hybrid options",
        sso: "SAML support",
        mfa: "Third-party integration",
        zeroTrust: "70% maturity",
      },
    },

    implementation: {
      deploymentTime: "3 months",
      complexity: "Medium",
      professionalServices: "Recommended",
      trainingRequired: "40 hours",
      successRate: "78%",
      timeToValue: "3-4 months",
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 2 hours",
      channels: ["Phone", "Email", "Chat", "Portal"],
      satisfaction: "84%",
      documentation: "Good",
      community: "Active",
    },

    performance: {
      uptime: "99.7%",
      latency: "100-300ms",
      throughput: "Hardware dependent",
      cveCount: 29,
      mttr: "6 hours",
    },
  },

  forescout: {
    name: "Forescout Platform",
    description: "Device visibility and control for enterprise networks",
    category: "specialist",
    deploymentType: "hybrid",
    marketShare: 12.1,
    securityRating: 75,
    logo: "/forescout-logo.png",
    isRecommended: true,

    pricing: {
      model: "Per Device/Year",
      startingPrice: "$84",
      enterprisePrice: "$65",
      minimumDevices: 100,
      contractTerms: ["1-year", "3-year"],
      volumeDiscounts: [
        { threshold: 1000, discount: "10%" },
        { threshold: 5000, discount: "20%" },
      ],
      includedFeatures: ["Device Discovery", "Classification", "Policy Enforcement", "Compliance Monitoring"],
      additionalCosts: {
        implementation: "$120,000",
        training: "$18,000",
        support: "20% annually",
        hardware: "$25,000 - $55,000",
      },
    },

    technical: {
      protocols: ["RADIUS", "802.1X", "SNMP", "WMI", "SSH"],
      integrations: [
        "Security Orchestration",
        "SIEM Platforms",
        "Firewalls",
        "Endpoint Protection",
        "Threat Intelligence",
      ],
      supportedDevices: ["All IP devices", "IoT", "OT", "Medical devices", "Printers"],
      networkEquipment: ["Agentless discovery", "Multi-vendor"],
      scalability: {
        maxDevices: "1,000,000",
        maxPolicies: "Unlimited",
        maxSites: "Unlimited",
        performance: "Real-time discovery",
      },
      compliance: ["HIPAA", "PCI DSS", "NIST", "IEC 62443", "NERC CIP"],
      security: {
        encryption: "AES-256",
        dataResidency: "On-premise/Cloud",
        sso: "SAML/LDAP",
        mfa: "Supported",
        zeroTrust: "65% maturity",
      },
    },

    implementation: {
      deploymentTime: "4 months",
      complexity: "Medium-High",
      professionalServices: "Required",
      trainingRequired: "60 hours",
      successRate: "75%",
      timeToValue: "4-5 months",
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 3 hours",
      channels: ["Phone", "Email", "Portal"],
      satisfaction: "79%",
      documentation: "Comprehensive",
      community: "Specialized",
    },

    performance: {
      uptime: "99.6%",
      latency: "< 100ms",
      throughput: "High",
      cveCount: 22,
      mttr: "3 hours",
    },
  },

  juniper: {
    name: "Juniper Mist Access Assurance",
    description: "AI-driven network access control with cloud management",
    category: "visionary",
    deploymentType: "cloud",
    marketShare: 6.8,
    securityRating: 82,
    logo: "/juniper-logo.png",

    pricing: {
      model: "Per Device/Year + Mist Infrastructure",
      startingPrice: "$72",
      enterprisePrice: "$60",
      minimumDevices: 50,
      contractTerms: ["1-year", "3-year"],
      volumeDiscounts: [
        { threshold: 500, discount: "8%" },
        { threshold: 2000, discount: "15%" },
      ],
      includedFeatures: ["AI-Driven Insights", "Dynamic Policies", "User Experience Monitoring", "Cloud Management"],
      additionalCosts: {
        implementation: "$15,000",
        training: "$4,000",
        support: "Included",
        hardware: "$25,000 (Mist required)",
      },
    },

    technical: {
      protocols: ["RADIUS", "802.1X", "SAML", "OAuth"],
      integrations: ["Mist Cloud", "Juniper Infrastructure", "Third-party Systems", "AI/ML Analytics"],
      supportedDevices: ["Windows", "macOS", "iOS", "Android", "IoT"],
      networkEquipment: ["Juniper Mist (required)", "Limited third-party"],
      scalability: {
        maxDevices: "Unlimited",
        maxPolicies: "AI-driven",
        maxSites: "Unlimited",
        performance: "AI-optimized",
      },
      compliance: ["HIPAA", "PCI DSS", "GDPR", "SOC 2"],
      security: {
        encryption: "AES-256",
        dataResidency: "Cloud regions",
        sso: "Full SSO",
        mfa: "Built-in",
        zeroTrust: "80% maturity",
      },
    },

    implementation: {
      deploymentTime: "1 month",
      complexity: "Low-Medium",
      professionalServices: "Optional",
      trainingRequired: "16 hours",
      successRate: "85%",
      timeToValue: "1-2 months",
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 2 hours",
      channels: ["Phone", "Email", "Chat"],
      satisfaction: "85%",
      documentation: "AI-enhanced",
      community: "Growing",
    },

    performance: {
      uptime: "99.9%",
      latency: "< 60ms",
      throughput: "Cloud-scale",
      cveCount: 10,
      mttr: "1 hour",
    },
  },

  extreme: {
    name: "Extreme NAC",
    description: "Network access control for campus and data center environments",
    category: "niche",
    deploymentType: "hybrid",
    marketShare: 4.2,
    securityRating: 62,
    logo: "/extreme-logo.png",

    pricing: {
      model: "Per Device/Year",
      startingPrice: "$60",
      enterprisePrice: "$45",
      minimumDevices: 25,
      contractTerms: ["1-year", "3-year"],
      volumeDiscounts: [
        { threshold: 500, discount: "10%" },
        { threshold: 2000, discount: "20%" },
      ],
      includedFeatures: ["Access Control", "Guest Management", "Device Profiling", "Policy Enforcement"],
      additionalCosts: {
        implementation: "$30,000",
        training: "$6,000",
        support: "15% annually",
        hardware: "$15,000",
      },
    },

    technical: {
      protocols: ["RADIUS", "802.1X", "LDAP"],
      integrations: ["Extreme Infrastructure", "Third-party Systems", "Cloud Platforms", "Basic SIEM"],
      supportedDevices: ["Windows", "macOS", "iOS", "Android", "Basic IoT"],
      networkEquipment: ["Extreme (optimized)", "Limited third-party"],
      scalability: {
        maxDevices: "50,000",
        maxPolicies: "1,000",
        maxSites: "100",
        performance: "Standard",
      },
      compliance: ["HIPAA", "PCI DSS", "SOX"],
      security: {
        encryption: "AES-128/256",
        dataResidency: "On-premise/Cloud",
        sso: "Basic LDAP",
        mfa: "Third-party",
        zeroTrust: "60% maturity",
      },
    },

    implementation: {
      deploymentTime: "2 months",
      complexity: "Medium",
      professionalServices: "Optional",
      trainingRequired: "24 hours",
      successRate: "80%",
      timeToValue: "2-3 months",
    },

    support: {
      availability: "Business Hours",
      responseTime: "< 4 hours",
      channels: ["Phone", "Email"],
      satisfaction: "76%",
      documentation: "Basic",
      community: "Small",
    },

    performance: {
      uptime: "99.3%",
      latency: "200-400ms",
      throughput: "Medium",
      cveCount: 14,
      mttr: "5 hours",
    },
  },

  fortinet: {
    name: "Fortinet FortiNAC",
    description: "Integrated security fabric with network access control",
    category: "challenger",
    deploymentType: "on-premise",
    marketShare: 8.9,
    securityRating: 70,
    logo: "/fortinet-logo.png",

    pricing: {
      model: "Quote-based + Hardware",
      startingPrice: "$84",
      enterprisePrice: "Quote",
      minimumDevices: 100,
      contractTerms: ["1-year", "3-year", "5-year"],
      volumeDiscounts: [{ threshold: 1000, discount: "Negotiable" }],
      includedFeatures: ["Device Discovery", "Access Control", "Guest Portal", "Compliance Monitoring"],
      additionalCosts: {
        implementation: "$50,000",
        training: "$10,000",
        support: "20% annually",
        hardware: "$40,000",
      },
    },

    technical: {
      protocols: ["RADIUS", "802.1X", "TACACS+", "LDAP"],
      integrations: ["Fortinet Security Fabric", "FortiGate", "FortiAnalyzer", "Third-party SIEM"],
      supportedDevices: ["Windows", "macOS", "iOS", "Android", "Linux"],
      networkEquipment: ["Fortinet (optimized)", "Limited third-party"],
      scalability: {
        maxDevices: "100,000",
        maxPolicies: "5,000",
        maxSites: "200",
        performance: "Fabric-integrated",
      },
      compliance: ["HIPAA", "PCI DSS", "SOX", "GDPR"],
      security: {
        encryption: "AES-256",
        dataResidency: "On-premise",
        sso: "FortiAuthenticator",
        mfa: "Fortinet MFA",
        zeroTrust: "65% maturity",
      },
    },

    implementation: {
      deploymentTime: "3 months",
      complexity: "Medium-High",
      professionalServices: "Required",
      trainingRequired: "32 hours",
      successRate: "72%",
      timeToValue: "3-4 months",
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 4 hours",
      channels: ["Phone", "Email", "Portal"],
      satisfaction: "74%",
      documentation: "Good",
      community: "Fortinet ecosystem",
    },

    performance: {
      uptime: "99.4%",
      latency: "150-400ms",
      throughput: "Hardware dependent",
      cveCount: 30,
      mttr: "8 hours",
    },
  },

  microsoft: {
    name: "Microsoft Network Policy Server",
    description: "Basic RADIUS authentication for Windows environments",
    category: "niche",
    deploymentType: "on-premise",
    marketShare: 18.5,
    securityRating: 45,
    logo: "/microsoft-logo.png",

    pricing: {
      model: "Windows Server License",
      startingPrice: "$0",
      enterprisePrice: "$0",
      minimumDevices: 1,
      contractTerms: ["Server license dependent"],
      volumeDiscounts: [],
      includedFeatures: ["Basic RADIUS", "Windows Integration", "Simple Policies"],
      additionalCosts: {
        implementation: "$20,000",
        training: "$3,000",
        support: "Microsoft support",
        hardware: "$15,000",
      },
    },

    technical: {
      protocols: ["RADIUS", "LDAP", "Kerberos"],
      integrations: ["Active Directory", "Windows Infrastructure", "Basic LDAP", "Limited third-party"],
      supportedDevices: ["Windows (optimized)", "Basic support for others"],
      networkEquipment: ["Any RADIUS-capable"],
      scalability: {
        maxDevices: "10,000",
        maxPolicies: "Limited",
        maxSites: "Limited",
        performance: "Basic",
      },
      compliance: ["Basic Windows Security"],
      security: {
        encryption: "Basic",
        dataResidency: "On-premise",
        sso: "Windows SSO only",
        mfa: "Third-party required",
        zeroTrust: "30% maturity",
      },
    },

    implementation: {
      deploymentTime: "1 month",
      complexity: "Medium",
      professionalServices: "Optional",
      trainingRequired: "16 hours",
      successRate: "60%",
      timeToValue: "1-2 months",
    },

    support: {
      availability: "Business Hours",
      responseTime: "Varies",
      channels: ["Microsoft Support"],
      satisfaction: "68%",
      documentation: "Microsoft docs",
      community: "Windows community",
    },

    performance: {
      uptime: "99.0%",
      latency: "Variable",
      throughput: "Limited",
      cveCount: 45,
      mttr: "24 hours",
    },
  },

  foxpass: {
    name: "FoxPass Cloud RADIUS",
    description: "Cloud-based RADIUS service for SMB environments",
    category: "niche",
    deploymentType: "cloud",
    marketShare: 2.1,
    securityRating: 55,
    logo: "/foxpass-logo.png",

    pricing: {
      model: "Per User/Month",
      startingPrice: "$3.00",
      enterprisePrice: "$2.50",
      minimumDevices: 10,
      contractTerms: ["Monthly", "Annual"],
      volumeDiscounts: [
        { threshold: 100, discount: "10%" },
        { threshold: 500, discount: "20%" },
      ],
      includedFeatures: ["Cloud RADIUS", "User Management", "Basic Policies", "API Access"],
      additionalCosts: {
        implementation: "$2,000",
        training: "$1,000",
        support: "Email only",
        hardware: "$0",
      },
    },

    technical: {
      protocols: ["RADIUS", "LDAP", "SAML"],
      integrations: ["Google Workspace", "Office 365", "LDAP", "SAML IdPs"],
      supportedDevices: ["All devices with RADIUS support"],
      networkEquipment: ["Any RADIUS-capable"],
      scalability: {
        maxDevices: "10,000",
        maxPolicies: "Basic",
        maxSites: "Unlimited",
        performance: "Cloud-based",
      },
      compliance: ["Basic Security"],
      security: {
        encryption: "TLS",
        dataResidency: "US-based",
        sso: "SAML/LDAP",
        mfa: "Third-party",
        zeroTrust: "45% maturity",
      },
    },

    implementation: {
      deploymentTime: "1 week",
      complexity: "Low",
      professionalServices: "Not required",
      trainingRequired: "4 hours",
      successRate: "90%",
      timeToValue: "1 week",
    },

    support: {
      availability: "Business Hours",
      responseTime: "< 24 hours",
      channels: ["Email"],
      satisfaction: "81%",
      documentation: "Basic",
      community: "Small",
    },

    performance: {
      uptime: "99.5%",
      latency: "< 100ms",
      throughput: "Cloud-scale",
      cveCount: 10,
      mttr: "2 hours",
    },
  },

  securew2: {
    name: "SecureW2",
    description: "Certificate-based authentication and onboarding platform",
    category: "niche",
    deploymentType: "cloud",
    marketShare: 1.8,
    securityRating: 78,
    logo: "/securew2-logo.png",

    pricing: {
      model: "Per Device/Year",
      startingPrice: "$180",
      enterprisePrice: "$150",
      minimumDevices: 500,
      contractTerms: ["1-year", "3-year"],
      volumeDiscounts: [
        { threshold: 2000, discount: "10%" },
        { threshold: 5000, discount: "15%" },
      ],
      includedFeatures: ["Certificate Management", "WiFi Security", "RADIUS-as-a-Service", "User Onboarding"],
      additionalCosts: {
        implementation: "$8,000",
        training: "$3,000",
        support: "Included",
        hardware: "$0",
      },
    },

    technical: {
      protocols: ["802.1X", "EAP-TLS", "RADIUS", "SCEP"],
      integrations: ["Active Directory", "Azure AD", "Google Workspace", "SAML IdPs", "MDM Solutions"],
      supportedDevices: ["Windows", "macOS", "iOS", "Android", "ChromeOS"],
      networkEquipment: ["Any 802.1X capable"],
      scalability: {
        maxDevices: "Unlimited",
        maxPolicies: "Certificate-based",
        maxSites: "Unlimited",
        performance: "Cloud PKI",
      },
      compliance: ["HIPAA", "PCI DSS", "GDPR"],
      security: {
        encryption: "EAP-TLS",
        dataResidency: "Global",
        sso: "Full SSO",
        mfa: "Certificate-based",
        zeroTrust: "75% maturity",
      },
    },

    implementation: {
      deploymentTime: "2 weeks",
      complexity: "Low-Medium",
      professionalServices: "Optional",
      trainingRequired: "8 hours",
      successRate: "88%",
      timeToValue: "2-3 weeks",
    },

    support: {
      availability: "Business Hours",
      responseTime: "< 4 hours",
      channels: ["Phone", "Email", "Chat"],
      satisfaction: "83%",
      documentation: "Good",
      community: "Education-focused",
    },

    performance: {
      uptime: "99.8%",
      latency: "< 75ms",
      throughput: "High",
      cveCount: 6,
      mttr: "1.5 hours",
    },
  },

  meraki: {
    name: "Cisco Meraki",
    description: "Cloud-managed networking with basic access control",
    category: "niche",
    deploymentType: "cloud",
    marketShare: 7.3,
    securityRating: 65,
    logo: "/meraki-logo.png",

    pricing: {
      model: "Per Device/Year + Hardware",
      startingPrice: "$180",
      enterprisePrice: "$150",
      minimumDevices: 25,
      contractTerms: ["1-year", "3-year", "5-year", "7-year", "10-year"],
      volumeDiscounts: [
        { threshold: 100, discount: "5%" },
        { threshold: 500, discount: "10%" },
      ],
      includedFeatures: ["Cloud Management", "Policy Enforcement", "Guest Access", "Basic Analytics"],
      additionalCosts: {
        implementation: "$15,000",
        training: "$5,000",
        support: "Included",
        hardware: "$50,000",
      },
    },

    technical: {
      protocols: ["RADIUS", "802.1X", "LDAP"],
      integrations: ["Meraki Infrastructure", "Cisco Security", "Third-party APIs", "SIEM (limited)"],
      supportedDevices: ["Windows", "macOS", "iOS", "Android"],
      networkEquipment: ["Meraki (required)", "No third-party"],
      scalability: {
        maxDevices: "50,000",
        maxPolicies: "Meraki-defined",
        maxSites: "Unlimited",
        performance: "Cloud-managed",
      },
      compliance: ["HIPAA", "PCI DSS", "SOX"],
      security: {
        encryption: "WPA2/WPA3",
        dataResidency: "Cisco cloud",
        sso: "SAML",
        mfa: "Third-party",
        zeroTrust: "65% maturity",
      },
    },

    implementation: {
      deploymentTime: "6 weeks",
      complexity: "Low-Medium",
      professionalServices: "Optional",
      trainingRequired: "12 hours",
      successRate: "82%",
      timeToValue: "6-8 weeks",
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 2 hours",
      channels: ["Phone", "Email", "Chat"],
      satisfaction: "86%",
      documentation: "Excellent",
      community: "Large Meraki community",
    },

    performance: {
      uptime: "99.9%",
      latency: "< 100ms",
      throughput: "Hardware dependent",
      cveCount: 20,
      mttr: "4 hours",
    },
  },

  packetfence: {
    name: "PacketFence Open Source",
    description: "Open source network access control solution",
    category: "niche",
    deploymentType: "on-premise",
    marketShare: 3.2,
    securityRating: 50,
    logo: "/packetfence-logo.png",

    pricing: {
      model: "Open Source + Support",
      startingPrice: "$0",
      enterprisePrice: "Support contract",
      minimumDevices: 1,
      contractTerms: ["Open source", "Support contracts available"],
      volumeDiscounts: [],
      includedFeatures: ["Open Source NAC", "Device Registration", "Policy Enforcement", "Captive Portal"],
      additionalCosts: {
        implementation: "$95,000",
        training: "$15,000",
        support: "$50,000/year",
        hardware: "$20,000",
      },
    },

    technical: {
      protocols: ["RADIUS", "802.1X", "DHCP", "DNS"],
      integrations: ["Various Network Equipment", "LDAP", "RADIUS", "Custom Integrations"],
      supportedDevices: ["All IP devices"],
      networkEquipment: ["Multi-vendor", "Extensive compatibility"],
      scalability: {
        maxDevices: "Unlimited",
        maxPolicies: "Unlimited",
        maxSites: "Unlimited",
        performance: "Hardware dependent",
      },
      compliance: ["Basic Open Source"],
      security: {
        encryption: "Configurable",
        dataResidency: "On-premise",
        sso: "LDAP/RADIUS",
        mfa: "Third-party",
        zeroTrust: "50% maturity",
      },
    },

    implementation: {
      deploymentTime: "6 months",
      complexity: "Very High",
      professionalServices: "Required",
      trainingRequired: "80 hours",
      successRate: "55%",
      timeToValue: "6-12 months",
    },

    support: {
      availability: "Community/Commercial",
      responseTime: "Varies",
      channels: ["Community", "Commercial support"],
      satisfaction: "65%",
      documentation: "Community-driven",
      community: "Open source community",
    },

    performance: {
      uptime: "Variable",
      latency: "Configurable",
      throughput: "Hardware dependent",
      cveCount: 27,
      mttr: "Variable",
    },
  },

  arista: {
    name: "Arista CloudVision AGNI",
    description: "Network-centric access control with AI analytics",
    category: "visionary",
    deploymentType: "cloud",
    marketShare: 2.9,
    securityRating: 75,
    logo: "/arista-logo.png",

    pricing: {
      model: "Quote-based + Arista Infrastructure",
      startingPrice: "$96",
      enterprisePrice: "Quote",
      minimumDevices: 100,
      contractTerms: ["1-year", "3-year"],
      volumeDiscounts: [{ threshold: 1000, discount: "Negotiable" }],
      includedFeatures: ["Identity Management", "Access Control", "Policy Automation", "CloudVision Integration"],
      additionalCosts: {
        implementation: "$35,000",
        training: "$8,000",
        support: "Included",
        hardware: "$75,000 (Arista required)",
      },
    },

    technical: {
      protocols: ["RADIUS", "802.1X", "TACACS+"],
      integrations: ["Arista Switches", "CloudVision", "Third-party Security Tools", "Telemetry"],
      supportedDevices: ["Network-focused", "Limited endpoint support"],
      networkEquipment: ["Arista (required)", "No third-party"],
      scalability: {
        maxDevices: "Data center scale",
        maxPolicies: "AI-driven",
        maxSites: "Unlimited",
        performance: "High-performance",
      },
      compliance: ["HIPAA", "PCI DSS", "SOX"],
      security: {
        encryption: "AES-256",
        dataResidency: "Cloud regions",
        sso: "SAML",
        mfa: "Third-party",
        zeroTrust: "70% maturity",
      },
    },

    implementation: {
      deploymentTime: "2 months",
      complexity: "Medium-High",
      professionalServices: "Required",
      trainingRequired: "24 hours",
      successRate: "75%",
      timeToValue: "2-3 months",
    },

    support: {
      availability: "Business Hours",
      responseTime: "< 4 hours",
      channels: ["Phone", "Email"],
      satisfaction: "77%",
      documentation: "Technical",
      community: "Arista ecosystem",
    },

    performance: {
      uptime: "99.8%",
      latency: "< 50ms",
      throughput: "Very high",
      cveCount: 12,
      mttr: "2 hours",
    },
  },

  ivanti: {
    name: "Ivanti Neurons (Pulse Secure)",
    description: "Legacy VPN/NAC solution with known security vulnerabilities",
    category: "legacy",
    deploymentType: "hybrid",
    marketShare: 5.4,
    securityRating: 35,
    logo: "/default-logo.png",
    hasWarning: true,
    warningMessage: "⚠️ CRITICAL: Active security vulnerabilities - immediate migration recommended",

    pricing: {
      model: "Per Device/Year + Hardware",
      startingPrice: "$120",
      enterprisePrice: "$100",
      minimumDevices: 50,
      contractTerms: ["1-year", "3-year"],
      volumeDiscounts: [{ threshold: 500, discount: "5%" }],
      includedFeatures: ["VPN Access", "Device Compliance", "Policy Enforcement", "Legacy Features"],
      additionalCosts: {
        implementation: "$85,000",
        training: "$12,000",
        support: "25% annually",
        hardware: "$45,000",
      },
    },

    technical: {
      protocols: ["RADIUS", "802.1X", "SSL VPN", "IPSec"],
      integrations: ["Ivanti Security Suite", "Third-party Endpoints", "SIEM Solutions", "Legacy Systems"],
      supportedDevices: ["Windows", "macOS", "iOS", "Android", "Legacy"],
      networkEquipment: ["Multi-vendor", "Legacy support"],
      scalability: {
        maxDevices: "50,000",
        maxPolicies: "5,000",
        maxSites: "500",
        performance: "Legacy performance",
      },
      compliance: ["HIPAA", "PCI DSS"],
      security: {
        encryption: "Legacy encryption",
        dataResidency: "On-premise/Cloud",
        sso: "Limited",
        mfa: "Third-party",
        zeroTrust: "40% maturity",
      },
    },

    implementation: {
      deploymentTime: "4 months",
      complexity: "High",
      professionalServices: "Required",
      trainingRequired: "40 hours",
      successRate: "65%",
      timeToValue: "4-6 months",
    },

    support: {
      availability: "24/7/365",
      responseTime: "< 6 hours",
      channels: ["Phone", "Email"],
      satisfaction: "62%",
      documentation: "Legacy",
      community: "Declining",
    },

    performance: {
      uptime: "98.5%",
      latency: "Variable",
      throughput: "Limited",
      cveCount: 89,
      mttr: "48 hours",
    },
  },
}

export default function EnhancedVendorSelection({
  selectedVendors,
  onVendorToggle,
  onClearAll,
  onSelectRecommended,
  darkMode,
}: EnhancedVendorSelectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [filterDeployment, setFilterDeployment] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"name" | "marketShare" | "securityRating" | "pricing">("marketShare")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [activeTab, setActiveTab] = useState("all")
  const [expandedVendor, setExpandedVendor] = useState<string | null>(null)
  const [detailView, setDetailView] = useState<"overview" | "pricing" | "technical" | "support">("overview")

  const vendors = Object.entries(VENDOR_DISPLAY_DATA).map(([id, data]) => ({ id, ...data }))

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      searchQuery === "" ||
      safeString(vendor.name).toLowerCase().includes(safeString(searchQuery).toLowerCase()) ||
      safeString(vendor.description).toLowerCase().includes(safeString(searchQuery).toLowerCase())

    const matchesCategory = !filterCategory || safeString(vendor.category) === safeString(filterCategory)
    const matchesDeployment = !filterDeployment || safeString(vendor.deploymentType) === safeString(filterDeployment)

    if (activeTab === "selected") {
      return matchesSearch && matchesCategory && matchesDeployment && selectedVendors.includes(vendor.id)
    } else if (activeTab === "cloud") {
      return matchesSearch && matchesCategory && safeString(vendor.deploymentType) === "cloud"
    } else if (activeTab === "onprem") {
      return matchesSearch && matchesCategory && safeString(vendor.deploymentType) === "on-premise"
    } else if (activeTab === "hybrid") {
      return matchesSearch && matchesCategory && safeString(vendor.deploymentType) === "hybrid"
    } else if (activeTab === "recommended") {
      return matchesSearch && matchesCategory && matchesDeployment && vendor.isRecommended
    }

    return matchesSearch && matchesCategory && matchesDeployment
  })

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    if (sortBy === "name") {
      return sortDirection === "asc"
        ? safeString(a.name).localeCompare(safeString(b.name))
        : safeString(b.name).localeCompare(safeString(a.name))
    } else if (sortBy === "marketShare") {
      return sortDirection === "asc"
        ? safeNumber(a.marketShare) - safeNumber(b.marketShare)
        : safeNumber(b.marketShare) - safeNumber(a.marketShare)
    } else if (sortBy === "pricing") {
      const aPrice = Number.parseFloat(safeString(a.pricing.startingPrice).replace("$", ""))
      const bPrice = Number.parseFloat(safeString(b.pricing.startingPrice).replace("$", ""))
      return sortDirection === "asc" ? aPrice - bPrice : bPrice - aPrice
    } else {
      return sortDirection === "asc"
        ? safeNumber(a.securityRating) - safeNumber(b.securityRating)
        : safeNumber(b.securityRating) - safeNumber(a.securityRating)
    }
  })

  const handleSort = (newSortBy: "name" | "marketShare" | "securityRating" | "pricing") => {
    if (sortBy === newSortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(newSortBy)
      setSortDirection("desc")
    }
  }

  const handleFilterCategory = (category: string | null) => {
    setFilterCategory(category === filterCategory ? null : category)
  }

  const handleFilterDeployment = (deployment: string | null) => {
    setFilterDeployment(deployment === filterDeployment ? null : deployment)
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setFilterCategory(null)
    setFilterDeployment(null)
    setActiveTab("all")
  }

  const getCategoryColor = (category: string) => {
    switch (safeString(category).toLowerCase()) {
      case "leader":
        return "bg-blue-500 text-white"
      case "challenger":
        return "bg-green-500 text-white"
      case "visionary":
        return "bg-purple-500 text-white"
      case "specialist":
        return "bg-orange-500 text-white"
      case "niche":
        return "bg-gray-500 text-white"
      case "legacy":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getDeploymentIcon = (deploymentType: string) => {
    switch (safeString(deploymentType).toLowerCase()) {
      case "cloud":
        return <Cloud className="h-3 w-3 text-blue-500" />
      case "on-premise":
        return <Server className="h-3 w-3 text-gray-500" />
      case "hybrid":
        return (
          <div className="flex">
            <Cloud className="h-3 w-3 text-blue-500" />
            <Server className="h-3 w-3 text-gray-500 ml-0.5" />
          </div>
        )
      default:
        return <Server className="h-3 w-3" />
    }
  }

  const canSelectVendor = (vendorId: string) => {
    if (vendorId === "portnox") return true
    if (!selectedVendors.includes("portnox")) return false
    if (selectedVendors.includes(vendorId)) return true
    return selectedVendors.length < 2
  }

  const formatCurrency = (value: string) => {
    if (safeString(value) === "$0") return "Free"
    return safeString(value)
  }

  const getSecurityColor = (rating: number) => {
    const safeRating = safeNumber(rating)
    if (safeRating >= 90) return "text-green-600"
    if (safeRating >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-sm">Vendor Selection & Comparison</h3>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs">
              {selectedVendors.length}/2 max
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Info className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Compare Portnox with one other vendor</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search vendors, features, or pricing..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 h-7 w-7 p-0"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                  <Filter className="h-3 w-3 mr-1" />
                  Filter
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <div className="p-2">
                  <h4 className="text-xs font-medium mb-1">Category</h4>
                  <div className="space-y-1">
                    {["leader", "challenger", "visionary", "specialist", "niche", "legacy"].map((category) => (
                      <div key={category} className="flex items-center">
                        <Checkbox
                          id={`category-${category}`}
                          checked={filterCategory === category}
                          onCheckedChange={() => handleFilterCategory(category)}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-xs ml-2 flex items-center gap-1 cursor-pointer"
                        >
                          <Badge className={`${getCategoryColor(category)} text-[10px] py-0 h-4`}>
                            {safeString(category).charAt(0).toUpperCase() + safeString(category).slice(1)}
                          </Badge>
                        </label>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-2" />

                  <h4 className="text-xs font-medium mb-1">Deployment</h4>
                  <div className="space-y-1">
                    {["cloud", "on-premise", "hybrid"].map((deployment) => (
                      <div key={deployment} className="flex items-center">
                        <Checkbox
                          id={`deployment-${deployment}`}
                          checked={filterDeployment === deployment}
                          onCheckedChange={() => handleFilterDeployment(deployment)}
                        />
                        <label
                          htmlFor={`deployment-${deployment}`}
                          className="text-xs ml-2 flex items-center gap-1 cursor-pointer"
                        >
                          {getDeploymentIcon(deployment)}
                          <span>
                            {safeString(deployment).charAt(0).toUpperCase() + safeString(deployment).slice(1)}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-2" />

                  <Button variant="ghost" size="sm" className="w-full text-xs h-7" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Sort
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => handleSort("name")}>
                  <Check className={`mr-2 h-3 w-3 ${sortBy === "name" ? "opacity-100" : "opacity-0"}`} />
                  <span>Name</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("marketShare")}>
                  <Check className={`mr-2 h-3 w-3 ${sortBy === "marketShare" ? "opacity-100" : "opacity-0"}`} />
                  <span>Market Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("securityRating")}>
                  <Check className={`mr-2 h-3 w-3 ${sortBy === "securityRating" ? "opacity-100" : "opacity-0"}`} />
                  <span>Security Rating</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("pricing")}>
                  <Check className={`mr-2 h-3 w-3 ${sortBy === "pricing" ? "opacity-100" : "opacity-0"}`} />
                  <span>Starting Price</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={onClearAll}>
              Reset
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={onSelectRecommended}>
              Recommended
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 h-8">
            <TabsTrigger value="all" className="text-xs">
              All
            </TabsTrigger>
            <TabsTrigger value="recommended" className="text-xs">
              Top
            </TabsTrigger>
            <TabsTrigger value="selected" className="text-xs">
              Selected
            </TabsTrigger>
            <TabsTrigger value="cloud" className="text-xs">
              Cloud
            </TabsTrigger>
            <TabsTrigger value="onprem" className="text-xs">
              On-Prem
            </TabsTrigger>
            <TabsTrigger value="hybrid" className="text-xs">
              Hybrid
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Vendor List */}
      <div className="flex-1 overflow-y-auto p-2">
        {sortedVendors.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="font-medium mb-1">No vendors found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            <Button variant="outline" size="sm" className="mt-4 bg-transparent" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {sortedVendors.map((vendor) => {
              const isSelected = selectedVendors.includes(vendor.id)
              const isPortnox = vendor.id === "portnox"
              const hasWarning = vendor.hasWarning
              const canSelect = canSelectVendor(vendor.id)
              const isExpanded = expandedVendor === vendor.id

              return (
                <Card
                  key={vendor.id}
                  className={`overflow-hidden transition-all ${
                    isSelected
                      ? "ring-2 ring-blue-500 dark:ring-blue-400"
                      : "hover:border-blue-200 dark:hover:border-blue-800"
                  } ${isPortnox ? "bg-blue-50 dark:bg-blue-950/20" : ""} ${
                    hasWarning ? "border-red-200 dark:border-red-800" : ""
                  } ${!canSelect && !isSelected ? "opacity-50" : ""}`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      {/* Logo */}
                      <div
                        className={`relative flex-shrink-0 w-10 h-10 rounded-md border overflow-hidden ${
                          darkMode ? "bg-gray-800" : "bg-white"
                        }`}
                      >
                        <Image
                          src={safeString(vendor.logo) || "/placeholder.svg"}
                          alt={safeString(vendor.name)}
                          width={40}
                          height={40}
                          className="object-contain p-1"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-sm flex items-center gap-1">
                                {safeString(vendor.name)}
                                {isPortnox && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                                {hasWarning && <AlertTriangle className="h-3 w-3 text-red-500" />}
                                {vendor.isDefault && (
                                  <Badge variant="secondary" className="text-[10px] py-0 h-4">
                                    Default
                                  </Badge>
                                )}
                              </h3>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  checked={isSelected}
                                  disabled={!canSelect && !isSelected}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (canSelect) onVendorToggle(vendor.id)
                                  }}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => setExpandedVendor(isExpanded ? null : vendor.id)}
                                >
                                  <ChevronRight
                                    className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                                  />
                                </Button>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 mt-0.5">
                              <Badge
                                className={`${getCategoryColor(vendor.category)} text-[10px] py-0 h-4`}
                                variant="secondary"
                              >
                                {safeString(vendor.category).charAt(0).toUpperCase() +
                                  safeString(vendor.category).slice(1)}
                              </Badge>
                              <Badge variant="outline" className="text-[10px] py-0 h-4 flex items-center gap-0.5">
                                {getDeploymentIcon(vendor.deploymentType)}
                                <span className="capitalize">{safeString(vendor.deploymentType)}</span>
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {safeString(vendor.description)}
                        </p>

                        {hasWarning && (
                          <div className="mt-2 p-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-md">
                            <p className="text-xs text-red-600 dark:text-red-400">
                              {safeString(vendor.warningMessage)}
                            </p>
                          </div>
                        )}

                        {/* Quick Stats */}
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Shield className={`h-3 w-3 ${getSecurityColor(vendor.securityRating)}`} />
                              <span className={`text-xs font-medium ${getSecurityColor(vendor.securityRating)}`}>
                                {safeNumber(vendor.securityRating)}
                              </span>
                            </div>
                            <p className="text-[10px] text-muted-foreground">Security</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <TrendingUp className="h-3 w-3 text-blue-500" />
                              <span className="text-xs font-medium">{safeNumber(vendor.marketShare)}%</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground">Market</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <DollarSign className="h-3 w-3 text-green-500" />
                              <span className="text-xs font-medium">
                                {formatCurrency(vendor.pricing.startingPrice)}
                              </span>
                            </div>
                            <p className="text-[10px] text-muted-foreground">Starting</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Clock className="h-3 w-3 text-orange-500" />
                              <span className="text-xs font-medium">
                                {safeString(vendor.implementation.deploymentTime)}
                              </span>
                            </div>
                            <p className="text-[10px] text-muted-foreground">Deploy</p>
                          </div>
                        </div>

                        {vendor.isRecommended && (
                          <div className="mt-2">
                            <Badge variant="outline" className="text-[10px] py-0 h-4">
                              Recommended
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <Collapsible open={isExpanded}>
                      <CollapsibleContent className="mt-3">
                        <Separator className="mb-3" />

                        <Tabs value={detailView} onValueChange={setDetailView} className="w-full">
                          <TabsList className="grid w-full grid-cols-4 h-8 mb-3">
                            <TabsTrigger value="overview" className="text-xs">
                              Overview
                            </TabsTrigger>
                            <TabsTrigger value="pricing" className="text-xs">
                              Pricing
                            </TabsTrigger>
                            <TabsTrigger value="technical" className="text-xs">
                              Technical
                            </TabsTrigger>
                            <TabsTrigger value="support" className="text-xs">
                              Support
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="overview" className="mt-0">
                            <div className="space-y-3">
                              <div>
                                <h4 className="text-xs font-medium mb-1 flex items-center gap-1">
                                  <Info className="h-3 w-3" />
                                  Key Metrics
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-muted-foreground">Security Score</span>
                                      <span
                                        className={`text-xs font-medium ${getSecurityColor(vendor.securityRating)}`}
                                      >
                                        {safeNumber(vendor.securityRating)}/100
                                      </span>
                                    </div>
                                    <Progress value={safeNumber(vendor.securityRating)} className="h-1 mt-1" />
                                  </div>
                                  <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-muted-foreground">Market Share</span>
                                      <span className="text-xs font-medium">{safeNumber(vendor.marketShare)}%</span>
                                    </div>
                                    <Progress value={safeNumber(vendor.marketShare)} className="h-1 mt-1" />
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-xs font-medium mb-1 flex items-center gap-1">
                                  <Zap className="h-3 w-3" />
                                  Implementation
                                </h4>
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                  <div>
                                    <span className="text-muted-foreground">Time:</span>
                                    <p className="font-medium">{safeString(vendor.implementation.deploymentTime)}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Complexity:</span>
                                    <p className="font-medium">{safeString(vendor.implementation.complexity)}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Success Rate:</span>
                                    <p className="font-medium">
                                      {Math.round(safeNumber(vendor.implementation.successRate) * 100)}%
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-xs font-medium mb-1 flex items-center gap-1">
                                  <Award className="h-3 w-3" />
                                  Compliance
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {vendor.technical.compliance.slice(0, 6).map((cert) => (
                                    <Badge key={cert} variant="outline" className="text-[10px] py-0 h-4">
                                      {safeString(cert)}
                                    </Badge>
                                  ))}
                                  {vendor.technical.compliance.length > 6 && (
                                    <Badge variant="outline" className="text-[10px] py-0 h-4">
                                      +{vendor.technical.compliance.length - 6} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="pricing" className="mt-0">
                            <div className="space-y-3">
                              <div>
                                <h4 className="text-xs font-medium mb-2 flex items-center gap-1">
                                  <DollarSign className="h-3 w-3" />
                                  Pricing Model
                                </h4>
                                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">{safeString(vendor.pricing.model)}</span>
                                    <div className="text-right">
                                      <div className="text-lg font-bold text-green-600">
                                        {formatCurrency(vendor.pricing.startingPrice)}
                                      </div>
                                      <div className="text-xs text-muted-foreground">Starting price</div>
                                    </div>
                                  </div>

                                  {safeNumber(vendor.pricing.minimumDevices) > 1 && (
                                    <p className="text-xs text-muted-foreground">
                                      Minimum: {safeNumber(vendor.pricing.minimumDevices)} devices
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div>
                                <h4 className="text-xs font-medium mb-1">Volume Discounts</h4>
                                <div className="space-y-1">
                                  {vendor.pricing.volumeDiscounts.map((discount, index) => (
                                    <div key={index} className="flex justify-between text-xs">
                                      <span>{safeNumber(discount.threshold)}+ devices:</span>
                                      <span className="font-medium text-green-600">
                                        {safeString(discount.discount)} off
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="text-xs font-medium mb-1">Additional Costs</h4>
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span>Implementation:</span>
                                    <span className="font-medium">
                                      {safeString(vendor.pricing.additionalCosts.implementation)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span>Training:</span>
                                    <span className="font-medium">
                                      {safeString(vendor.pricing.additionalCosts.training)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span>Hardware:</span>
                                    <span className="font-medium">
                                      {safeString(vendor.pricing.additionalCosts.hardware)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span>Support:</span>
                                    <span className="font-medium">
                                      {safeString(vendor.pricing.additionalCosts.support)}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-xs font-medium mb-1">Included Features</h4>
                                <div className="space-y-1">
                                  {vendor.pricing.includedFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-1 text-xs">
                                      <Check className="h-3 w-3 text-green-500" />
                                      <span>{safeString(feature)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="technical" className="mt-0">
                            <div className="space-y-3">
                              <div>
                                <h4 className="text-xs font-medium mb-1 flex items-center gap-1">
                                  <Network className="h-3 w-3" />
                                  Protocols & Standards
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {vendor.technical.protocols.map((protocol) => (
                                    <Badge key={protocol} variant="outline" className="text-[10px] py-0 h-4">
                                      {safeString(protocol)}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="text-xs font-medium mb-1 flex items-center gap-1">
                                  <Database className="h-3 w-3" />
                                  Scalability
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <span className="text-muted-foreground">Max Devices:</span>
                                    <p className="font-medium">{safeString(vendor.technical.scalability.maxDevices)}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Max Policies:</span>
                                    <p className="font-medium">
                                      {safeString(vendor.technical.scalability.maxPolicies)}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Max Sites:</span>
                                    <p className="font-medium">{safeString(vendor.technical.scalability.maxSites)}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Performance:</span>
                                    <p className="font-medium">
                                      {safeString(vendor.technical.scalability.performance)}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-xs font-medium mb-1 flex items-center gap-1">
                                  <Lock className="h-3 w-3" />
                                  Security Features
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <span className="text-muted-foreground">Encryption:</span>
                                    <p className="font-medium">{safeString(vendor.technical.security.encryption)}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Zero Trust:</span>
                                    <p className="font-medium">{safeString(vendor.technical.security.zeroTrust)}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">SSO:</span>
                                    <p className="font-medium">{safeString(vendor.technical.security.sso)}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">MFA:</span>
                                    <p className="font-medium">{safeString(vendor.technical.security.mfa)}</p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-xs font-medium mb-1 flex items-center gap-1">
                                  <Settings className="h-3 w-3" />
                                  Key Integrations
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {vendor.technical.integrations.slice(0, 8).map((integration) => (
                                    <Badge key={integration} variant="secondary" className="text-[10px] py-0 h-4">
                                      {safeString(integration)}
                                    </Badge>
                                  ))}
                                  {vendor.technical.integrations.length > 8 && (
                                    <Badge variant="secondary" className="text-[10px] py-0 h-4">
                                      +{vendor.technical.integrations.length - 8} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="support" className="mt-0">
                            <div className="space-y-3">
                              <div>
                                <h4 className="text-xs font-medium mb-1 flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  Support Details
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <span className="text-muted-foreground">Availability:</span>
                                    <p className="font-medium">{safeString(vendor.support.availability)}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Response Time:</span>
                                    <p className="font-medium">{safeString(vendor.support.responseTime)}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Satisfaction:</span>
                                    <p className="font-medium">{safeString(vendor.support.satisfaction)}%</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Documentation:</span>
                                    <p className="font-medium">{safeString(vendor.support.documentation)}</p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-xs font-medium mb-1 flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  Support Channels
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {vendor.support.channels.map((channel) => (
                                    <Badge key={channel} variant="outline" className="text-[10px] py-0 h-4">
                                      {safeString(channel)}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="text-xs font-medium mb-1 flex items-center gap-1">
                                  <TrendingUp className="h-3 w-3" />
                                  Performance Metrics
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <span className="text-muted-foreground">Uptime:</span>
                                    <p className="font-medium">{safeString(vendor.performance.uptime)}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Latency:</span>
                                    <p className="font-medium">{safeString(vendor.performance.latency)}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">CVE Count:</span>
                                    <p
                                      className={`font-medium ${safeNumber(vendor.performance.cveCount) === 0 ? "text-green-600" : safeNumber(vendor.performance.cveCount) > 50 ? "text-red-600" : "text-yellow-600"}`}
                                    >
                                      {safeNumber(vendor.performance.cveCount)}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">MTTR:</span>
                                    <p className="font-medium">{safeString(vendor.performance.mttr)}</p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-xs font-medium mb-1 flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  Community & Resources
                                </h4>
                                <p className="text-xs text-muted-foreground">{safeString(vendor.support.community)}</p>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Selection Info */}
      <div className="p-4 border-t bg-gray-50 dark:bg-gray-900/50">
        <div className="text-xs text-muted-foreground">
          <p className="mb-1">
            <strong>Selection Rules:</strong>
          </p>
          <ul className="space-y-0.5 ml-2">
            <li>• Portnox CLEAR is always included for comparison</li>
            <li>• Select one additional vendor to compare</li>
            <li>• Maximum 2 vendors can be compared at once</li>
            <li>• Click the arrow to expand detailed specifications</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

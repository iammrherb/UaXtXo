"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { calculateFullTCOForVendor } from "@/src/lib/calculators/tco"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import {
  Download,
  BarChart3,
  DollarSign,
  LayoutGrid,
  ShieldCheck,
  BarChartHorizontal,
  FileText,
  RouteIcon as Road,
  FilePieChart,
  Clock,
  SlidersHorizontal,
  InfoIcon,
  TrendingUpIcon,
  Settings,
  X,
  RefreshCw,
  Upload,
  Save,
  Building,
  Zap,
} from "lucide-react"

type CalculationResult = NonNullable<ReturnType<typeof calculateFullTCOForVendor>> & { id?: string }

// Enhanced Modern Color Palette with Cutting-Edge Gradients
const MODERN_COLORS = {
  // Primary Brand Colors
  primary: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6", // Main teal
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e",
  },

  // Accent Colors
  accent: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444", // Main red
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },

  // Purple Spectrum
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7", // Main purple
    600: "#9333ea",
    700: "#7c3aed",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764",
  },

  // Blue Spectrum
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // Main blue
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  },

  // Gradient Definitions
  gradients: {
    // Primary Gradients
    ocean: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    sunset: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    aurora: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    cosmic: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",

    // Tech Gradients
    cyber: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
    neon: "linear-gradient(135deg, #08fdd8 0%, #00d4aa 50%, #0693e3 100%)",
    matrix: "linear-gradient(135deg, #00ff88 0%, #00d4aa 50%, #0693e3 100%)",
    hologram: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",

    // Glass Morphism
    glass: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
    glassDark: "linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%)",

    // Vendor Specific
    portnox: "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)",
    cisco: "linear-gradient(135deg, #1ba1e2 0%, #0078d4 50%, #005a9e 100%)",
    aruba: "linear-gradient(135deg, #ff6900 0%, #e55100 50%, #bf360c 100%)",
    microsoft: "linear-gradient(135deg, #00bcf2 0%, #0078d4 50%, #106ebe 100%)",

    // Status Gradients
    success: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
    warning: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
    danger: "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
    info: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)",
  },
}

// Enhanced Animation Variants
const modernAnimations = {
  // Container animations
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  // Item animations
  slideInUp: {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  },

  // Floating animation
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },

  // Glow pulse
  glowPulse: {
    boxShadow: [
      "0 0 20px rgba(20, 184, 166, 0.3)",
      "0 0 40px rgba(20, 184, 166, 0.6)",
      "0 0 20px rgba(20, 184, 166, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },

  // Scale on hover
  scaleHover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },

  // Rotate on hover
  rotateHover: {
    rotate: [0, 5, -5, 0],
    transition: { duration: 0.5 },
  },
}

// Organization size configurations
const initialOrgSizeDetails: Record<string, { devices: number; users: number; label: string }> = {
  startup: { devices: 100, users: 50, label: "Startup (50-100 employees)" },
  smb: { devices: 500, users: 250, label: "Small Business (100-500 employees)" },
  medium: { devices: 2500, users: 1500, label: "Mid-Market (500-2500 employees)" },
  enterprise: { devices: 10000, users: 7500, label: "Enterprise (2500+ employees)" },
  xlarge: { devices: 50000, users: 35000, label: "Global Enterprise (10000+ employees)" },
  custom: { devices: 2500, users: 1500, label: "Custom Configuration" },
}

// Industry options
const industryOptions = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "financial", label: "Financial Services" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "education", label: "Education" },
  { value: "government", label: "Government" },
  { value: "retail", label: "Retail" },
  { value: "energy", label: "Energy & Utilities" },
  { value: "media", label: "Media & Entertainment" },
  { value: "other", label: "Other" },
]

// Region options
const regionOptions = [
  { value: "north-america", label: "North America" },
  { value: "europe", label: "Europe" },
  { value: "asia-pacific", label: "Asia Pacific" },
  { value: "latin-america", label: "Latin America" },
  { value: "middle-east-africa", label: "Middle East & Africa" },
]

// Main navigation configuration
const MAIN_TABS_CONFIG = [
  { value: "dashboard", label: "Executive Dashboard", icon: <BarChartHorizontal /> },
  { value: "analysis", label: "TCO Analysis", icon: <BarChart3 /> },
  { value: "comparison", label: "Vendor Comparison", icon: <LayoutGrid /> },
  { value: "compliance", label: "Compliance & Risk", icon: <ShieldCheck /> },
  { value: "reports", label: "Reports", icon: <FileText /> },
]

const ANALYSIS_SUB_TABS = [
  { value: "cost-breakdown", label: "Cost Breakdown", icon: <FilePieChart /> },
  { value: "roi-analysis", label: "ROI & Business Value", icon: <TrendingUpIcon /> },
  { value: "operations", label: "Operations Impact", icon: <SlidersHorizontal /> },
  { value: "timeline", label: "Timeline View", icon: <Clock /> },
]

const COMPARISON_SUB_TABS = [
  { value: "feature-matrix", label: "Feature Matrix", icon: <LayoutGrid /> },
  { value: "roadmap", label: "Implementation Roadmap", icon: <Road /> },
  { value: "vendor-details", label: "Vendor Details", icon: <InfoIcon /> },
]

// Enhanced Vendor data with complete information
const VENDOR_DATA = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    category: "Cloud-Native NAC",
    marketShare: 8.5,
    logo: "/portnox-logo-color.png",
    description: "AI-powered, cloud-native Zero Trust Network Access Control",
    priceIndicator: "$$",
    difficulty: 1,
    features: {
      core: {
        "802.1X": true,
        "Risk-Based Auth": true,
        "Device Profiling": true,
        "Policy Automation": true,
        "Cloud Management": true,
        "API Integration": true,
        "Real-time Monitoring": true,
        "Automated Remediation": true,
        SSO: true,
        TACACS: true,
        "Guest Portal": true,
        PKI: true,
        RADIUS: true,
      },
      advanced: {
        "AI/ML Analytics": true,
        "Zero Trust": true,
        Microsegmentation: true,
        "Threat Detection": true,
        "Compliance Automation": true,
        "Multi-tenant": true,
        "IoT Security": true,
      },
    },
    implementation: {
      deploymentTime: { poc: 24, fullDeployment: 168, fullScale: 168 },
      complexity: "Low",
      requiresHardware: false,
      cloudNative: true,
    },
    pricing: {
      model: "Per device/user subscription",
      startingPrice: 3.5,
      enterprise: 2.8,
    },
    roi: {
      breachRiskReduction: 0.94,
      operationalEfficiency: 0.85,
      complianceAutomation: 0.92,
    },
    strengths: [
      "Fastest deployment (7 days)",
      "100% cloud-native",
      "AI-powered automation",
      "Zero hardware requirements",
      "Comprehensive API",
    ],
    weaknesses: ["Newer market presence", "Requires internet connectivity"],
  },
  cisco: {
    id: "cisco",
    name: "Cisco ISE",
    category: "Traditional NAC",
    marketShare: 35.2,
    logo: "/cisco-logo.png",
    description: "Industry-leading identity services engine with comprehensive NAC",
    priceIndicator: "$$$$",
    difficulty: 5,
    features: {
      core: {
        "802.1X": true,
        "Risk-Based Auth": false,
        "Device Profiling": true,
        "Policy Automation": false,
        "Cloud Management": false,
        "API Integration": true,
        "Real-time Monitoring": true,
        "Automated Remediation": false,
        SSO: true,
        TACACS: true,
        "Guest Portal": true,
        PKI: true,
        RADIUS: true,
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: true,
        "Threat Detection": true,
        "Compliance Automation": false,
        "Multi-tenant": false,
        "IoT Security": false,
      },
    },
    implementation: {
      deploymentTime: { poc: 120, fullDeployment: 2880, fullScale: 2880 },
      complexity: "Very High",
      requiresHardware: true,
      cloudNative: false,
    },
    pricing: {
      model: "Appliance + licensing",
      startingPrice: 8.5,
      enterprise: 12.0,
    },
    roi: {
      breachRiskReduction: 0.65,
      operationalEfficiency: 0.45,
      complianceAutomation: 0.55,
    },
    strengths: ["Market leader", "Comprehensive features", "Strong ecosystem", "Enterprise proven"],
    weaknesses: ["Complex deployment", "High TCO", "Hardware dependent", "Slow innovation"],
  },
  aruba: {
    id: "aruba",
    name: "Aruba ClearPass",
    category: "Traditional NAC",
    marketShare: 18.7,
    logo: "/aruba-logo.png",
    description: "Comprehensive network access control with policy enforcement",
    priceIndicator: "$$$",
    difficulty: 4,
    features: {
      core: {
        "802.1X": true,
        "Risk-Based Auth": false,
        "Device Profiling": true,
        "Policy Automation": true,
        "Cloud Management": false,
        "API Integration": true,
        "Real-time Monitoring": true,
        "Automated Remediation": false,
        SSO: true,
        TACACS: true,
        "Guest Portal": true,
        PKI: true,
        RADIUS: true,
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: true,
        "Threat Detection": true,
        "Compliance Automation": false,
        "Multi-tenant": false,
        "IoT Security": true,
      },
    },
    implementation: {
      deploymentTime: { poc: 96, fullDeployment: 2160, fullScale: 2160 },
      complexity: "High",
      requiresHardware: true,
      cloudNative: false,
    },
    pricing: {
      model: "Appliance + licensing",
      startingPrice: 7.2,
      enterprise: 9.8,
    },
    roi: {
      breachRiskReduction: 0.72,
      operationalEfficiency: 0.55,
      complianceAutomation: 0.6,
    },
    strengths: ["Strong policy engine", "Good for Aruba environments", "Scalable", "Comprehensive features"],
    weaknesses: ["Complex configuration", "Hardware dependent", "High operational overhead"],
  },
  meraki: {
    id: "meraki",
    name: "Cisco Meraki",
    category: "Cloud-Managed",
    marketShare: 12.3,
    logo: "/meraki-logo.png",
    description: "Cloud-managed networking with integrated security",
    priceIndicator: "$$$",
    difficulty: 2,
    features: {
      core: {
        "802.1X": true,
        "Risk-Based Auth": false,
        "Device Profiling": true,
        "Policy Automation": true,
        "Cloud Management": true,
        "API Integration": true,
        "Real-time Monitoring": true,
        "Automated Remediation": false,
        SSO: true,
        TACACS: false,
        "Guest Portal": true,
        PKI: false,
        RADIUS: true,
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: false,
        "Threat Detection": true,
        "Compliance Automation": false,
        "Multi-tenant": true,
        "IoT Security": false,
      },
    },
    implementation: {
      deploymentTime: { poc: 48, fullDeployment: 720, fullScale: 720 },
      complexity: "Medium",
      requiresHardware: true,
      cloudNative: true,
    },
    pricing: {
      model: "Hardware + cloud licensing",
      startingPrice: 6.8,
      enterprise: 8.5,
    },
    roi: {
      breachRiskReduction: 0.58,
      operationalEfficiency: 0.65,
      complianceAutomation: 0.45,
    },
    strengths: ["Easy to manage", "Cloud dashboard", "Good for distributed sites", "Integrated solution"],
    weaknesses: ["Limited NAC features", "Vendor lock-in", "Hardware dependent", "Basic policy control"],
  },
  fortinet: {
    id: "fortinet",
    name: "FortiNAC",
    category: "Integrated Security",
    marketShare: 9.8,
    logo: "/fortinet-logo.png",
    description: "Network access control integrated with security fabric",
    priceIndicator: "$$$",
    difficulty: 3,
    features: {
      core: {
        "802.1X": true,
        "Risk-Based Auth": false,
        "Device Profiling": true,
        "Policy Automation": true,
        "Cloud Management": false,
        "API Integration": true,
        "Real-time Monitoring": true,
        "Automated Remediation": true,
        SSO: true,
        TACACS: false,
        "Guest Portal": true,
        PKI: true,
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: true,
        "Threat Detection": true,
        "Compliance Automation": false,
        "Multi-tenant": false,
        "IoT Security": true,
      },
    },
    implementation: {
      deploymentTime: { poc: 72, fullDeployment: 1800, fullScale: 1800 },
      complexity: "Medium",
      requiresHardware: true,
      cloudNative: false,
    },
    pricing: {
      model: "Appliance + licensing",
      startingPrice: 6.5,
      enterprise: 8.2,
    },
    roi: {
      breachRiskReduction: 0.68,
      operationalEfficiency: 0.6,
      complianceAutomation: 0.5,
    },
    strengths: ["Security fabric integration", "Good IoT visibility", "Competitive pricing", "Automated responses"],
    weaknesses: ["Best with Fortinet ecosystem", "Limited standalone features", "Hardware dependent"],
  },
  forescout: {
    id: "forescout",
    name: "Forescout eyeSight",
    category: "Device Visibility",
    marketShare: 7.2,
    logo: "/forescout-logo.png",
    description: "Agentless device visibility and control platform",
    priceIndicator: "$$$$",
    difficulty: 4,
    features: {
      core: {
        "802.1X": false,
        "Risk-Based Auth": false,
        "Device Profiling": true,
        "Policy Automation": true,
        "Cloud Management": false,
        "API Integration": true,
        "Real-time Monitoring": true,
        "Automated Remediation": true,
        SSO: true,
        TACACS: false,
        "Guest Portal": true,
        PKI: false,
        RADIUS: true,
      },
      advanced: {
        "AI/ML Analytics": true,
        "Zero Trust": false,
        Microsegmentation: true,
        "Threat Detection": true,
        "Compliance Automation": true,
        "Multi-tenant": false,
        "IoT Security": true,
      },
    },
    implementation: {
      deploymentTime: { poc: 96, fullDeployment: 2400, fullScale: 2400 },
      complexity: "High",
      requiresHardware: true,
      cloudNative: false,
    },
    pricing: {
      model: "Appliance + per device",
      startingPrice: 9.2,
      enterprise: 11.5,
    },
    roi: {
      breachRiskReduction: 0.75,
      operationalEfficiency: 0.7,
      complianceAutomation: 0.8,
    },
    strengths: ["Excellent device visibility", "Strong IoT/OT support", "Agentless discovery", "Broad integrations"],
    weaknesses: ["Complex implementation", "High cost", "Limited NAC features", "Requires expertise"],
  },
  extreme: {
    id: "extreme",
    name: "ExtremeControl",
    category: "Network-Integrated",
    marketShare: 4.1,
    logo: "/extreme-logo.png",
    description: "NAC solution integrated with Extreme Networks infrastructure",
    priceIndicator: "$$",
    difficulty: 3,
    features: {
      core: {
        "802.1X": true,
        "Risk-Based Auth": false,
        "Device Profiling": true,
        "Policy Automation": true,
        "Cloud Management": true,
        "API Integration": true,
        "Real-time Monitoring": true,
        "Automated Remediation": false,
        SSO: true,
        TACACS: false,
        "Guest Portal": true,
        PKI: false,
        RADIUS: true,
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: false,
        "Threat Detection": false,
        "Compliance Automation": false,
        "Multi-tenant": false,
        "IoT Security": false,
      },
    },
    implementation: {
      deploymentTime: { poc: 72, fullDeployment: 2040, fullScale: 2040 },
      complexity: "Medium",
      requiresHardware: false,
      cloudNative: true,
    },
    pricing: {
      model: "Per device licensing",
      startingPrice: 5.8,
      enterprise: 7.2,
    },
    roi: {
      breachRiskReduction: 0.55,
      operationalEfficiency: 0.5,
      complianceAutomation: 0.4,
    },
    strengths: [
      "Extreme ecosystem integration",
      "Cloud management",
      "Fabric automation",
      "Good for existing customers",
    ],
    weaknesses: ["Limited to Extreme environments", "Basic feature set", "Narrow market focus"],
  },
  juniper: {
    id: "juniper",
    name: "Juniper Mist AA",
    category: "AI-Driven",
    marketShare: 3.8,
    logo: "/juniper-logo.png",
    description: "AI-driven access assurance with Mist cloud platform",
    priceIndicator: "$$",
    difficulty: 2,
    features: {
      core: {
        "802.1X": true,
        "Risk-Based Auth": true,
        "Device Profiling": true,
        "Policy Automation": true,
        "Cloud Management": true,
        "API Integration": true,
        "Real-time Monitoring": true,
        "Automated Remediation": true,
        SSO: true,
        TACACS: false,
        "Guest Portal": true,
        PKI: true,
        RADIUS: true,
      },
      advanced: {
        "AI/ML Analytics": true,
        "Zero Trust": true,
        Microsegmentation: true,
        "Threat Detection": false,
        "Compliance Automation": false,
        "Multi-tenant": true,
        "IoT Security": true,
      },
    },
    implementation: {
      deploymentTime: { poc: 48, fullDeployment: 480, fullScale: 480 },
      complexity: "Medium",
      requiresHardware: false,
      cloudNative: true,
    },
    pricing: {
      model: "Subscription per AP/user",
      startingPrice: 5.2,
      enterprise: 6.8,
    },
    roi: {
      breachRiskReduction: 0.78,
      operationalEfficiency: 0.75,
      complianceAutomation: 0.65,
    },
    strengths: ["AI-driven operations", "Cloud-native", "Mist platform integration", "Proactive troubleshooting"],
    weaknesses: ["Juniper ecosystem focus", "Newer NAC offering", "Limited standalone deployment"],
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft NPS/Intune",
    category: "Ecosystem NAC",
    marketShare: 15.6,
    logo: "/microsoft-logo.png",
    description: "Microsoft ecosystem NAC using NPS, Intune, and Conditional Access",
    priceIndicator: "$",
    difficulty: 3,
    features: {
      core: {
        "802.1X": true,
        "Risk-Based Auth": true,
        "Device Profiling": true,
        "Policy Automation": true,
        "Cloud Management": true,
        "API Integration": true,
        "Real-time Monitoring": true,
        "Automated Remediation": false,
        SSO: true,
        TACACS: false,
        "Guest Portal": false,
        PKI: true,
        RADIUS: true,
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: false,
        "Threat Detection": true,
        "Compliance Automation": true,
        "Multi-tenant": true,
        "IoT Security": false,
      },
    },
    implementation: {
      deploymentTime: { poc: 96, fullDeployment: 1080, fullScale: 1080 },
      complexity: "Medium",
      requiresHardware: false,
      cloudNative: true,
    },
    pricing: {
      model: "M365 licensing",
      startingPrice: 4.2,
      enterprise: 5.8,
    },
    roi: {
      breachRiskReduction: 0.62,
      operationalEfficiency: 0.58,
      complianceAutomation: 0.7,
    },
    strengths: [
      "Microsoft ecosystem integration",
      "Conditional access",
      "Good endpoint compliance",
      "Cost-effective for M365 customers",
    ],
    weaknesses: ["Windows-centric", "Limited non-Windows support", "Complex NPS scaling", "Not dedicated NAC"],
  },
  packetfence: {
    id: "packetfence",
    name: "PacketFence",
    category: "Open Source",
    marketShare: 2.1,
    logo: "/packetfence-logo.png",
    description: "Open-source network access control solution",
    priceIndicator: "$",
    difficulty: 5,
    features: {
      core: {
        "802.1X": true,
        "Risk-Based Auth": false,
        "Device Profiling": true,
        "Policy Automation": false,
        "Cloud Management": false,
        "API Integration": true,
        "Real-time Monitoring": true,
        "Automated Remediation": false,
        SSO: true,
        TACACS: true,
        "Guest Portal": true,
        PKI: true,
        RADIUS: true,
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: false,
        "Threat Detection": false,
        "Compliance Automation": false,
        "Multi-tenant": false,
        "IoT Security": false,
      },
    },
    implementation: {
      deploymentTime: { poc: 240, fullDeployment: 3600, fullScale: 3600 },
      complexity: "Very High",
      requiresHardware: true,
      cloudNative: false,
    },
    pricing: {
      model: "Open source + support",
      startingPrice: 0,
      enterprise: 2.5,
    },
    roi: {
      breachRiskReduction: 0.45,
      operationalEfficiency: 0.35,
      complianceAutomation: 0.25,
    },
    strengths: ["No licensing costs", "Highly customizable", "Community support", "Full source access"],
    weaknesses: ["Very complex setup", "Requires expertise", "Limited enterprise support", "High operational overhead"],
  },
}

// Settings Panel Component
const SettingsPanel = ({
  isOpen,
  onClose,
  orgSizeKey,
  setOrgSizeKey,
  customDevices,
  setCustomDevices,
  customUsers,
  setCustomUsers,
  industry,
  setIndustry,
  region,
  setRegion,
  projectionYears,
  setProjectionYears,
  portnoxBasePrice,
  setPortnoxBasePrice,
  portnoxAddons,
  setPortnoxAddons,
  darkMode,
}: {
  isOpen: boolean
  onClose: () => void
  orgSizeKey: string
  setOrgSizeKey: (value: string) => void
  customDevices: number
  setCustomDevices: (value: number) => void
  customUsers: number
  setCustomUsers: (value: number) => void
  industry: string
  setIndustry: (value: string) => void
  region: string
  setRegion: (value: string) => void
  projectionYears: number
  setProjectionYears: (value: number) => void
  portnoxBasePrice: number
  setPortnoxBasePrice: (value: number) => void
  portnoxAddons: any
  setPortnoxAddons: (value: any) => void
  darkMode: boolean
}) => {
  const [activeTab, setActiveTab] = useState("organization")

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={cn(
              "w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl border shadow-2xl",
              darkMode
                ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-slate-800/50"
                : "bg-gradient-to-br from-white via-slate-50 to-white border-slate-200/50",
            )}
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full"
                style={{
                  background: MODERN_COLORS.gradients.hologram,
                  backgroundSize: "400% 400%",
                  animation: "gradient 15s ease infinite",
                }}
              />
            </div>

            {/* Header */}
            <div
              className={cn(
                "flex items-center justify-between p-6 border-b backdrop-blur-xl relative z-10",
                darkMode ? "border-slate-800/50" : "border-slate-200/50",
              )}
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500"
                  whileHover={modernAnimations.scaleHover}
                >
                  <Settings className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h2 className={cn("text-2xl font-bold", darkMode ? "text-white" : "text-slate-900")}>
                    Settings & Configuration
                  </h2>
                  <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                    Customize your TCO analysis parameters
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0"
                >
                  <Save className="h-4 w-4 mr-1.5" />
                  Save Changes
                </Button>
                <Button size="sm" variant="outline" onClick={() => {}}>
                  <RefreshCw className="h-4 w-4 mr-1.5" />
                  Reset
                </Button>
                <Button size="sm" variant="outline" onClick={() => {}}>
                  <Upload className="h-4 w-4 mr-1.5" />
                  Export
                </Button>
                <Button size="sm" variant="outline" onClick={() => {}}>
                  <Download className="h-4 w-4 mr-1.5" />
                  Import
                </Button>
                <Button size="sm" variant="ghost" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Enhanced Tabs */}
            <div className={cn("border-b relative z-10", darkMode ? "border-slate-800/50" : "border-slate-200/50")}>
              <div className="flex space-x-8 px-6">
                {[
                  {
                    id: "organization",
                    label: "Organization",
                    icon: <Building />,
                    gradient: MODERN_COLORS.gradients.info,
                  },
                  { id: "pricing", label: "Pricing", icon: <DollarSign />, gradient: MODERN_COLORS.gradients.success },
                  {
                    id: "preferences",
                    label: "Preferences",
                    icon: <Settings />,
                    gradient: MODERN_COLORS.gradients.purple,
                  },
                  { id: "advanced", label: "Advanced", icon: <Zap />, gradient: MODERN_COLORS.gradients.warning },
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center space-x-2 py-4 border-b-2 transition-all duration-300 relative",
                      activeTab === tab.id ? "border-emerald-500" : "border-transparent hover:border-emerald-300/50",
                    )}
                    whileHover={modernAnimations.scaleHover}
                  >
                    <motion.div
                      className="p-2 rounded-xl"
                      style={{
                        background: activeTab === tab.id ? tab.gradient : "transparent",
                      }}
                      animate={{
                        scale: activeTab === tab.id ? 1.1 : 1,
                      }}
                    >
                      {React.cloneElement(tab.icon, {
                        className: cn(
                          "h-4 w-4 transition-colors",
                          activeTab === tab.id ? "text-white" : darkMode ? "text-slate-400" : "text-slate-600",
                        ),
                      })}
                    </motion.div>
                    <span
                      className={cn(
                        "font-medium transition-colors",
                        activeTab === tab.id
                          ? "text-emerald-600 dark:text-emerald-400"
                          : darkMode
                            ? "text-slate-400"
                            : "text-slate-600",
                      )}
                    >
                      {tab.label}
                    </span>
                    {activeTab === tab.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
                        layoutId="activeSettingsTab"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Content */}
            <ScrollArea className="h-[60vh] p-6 relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "organization" && (
                    <div className="space-y-8">
                      <div>
                        <h3 className={cn("text-xl font-bold mb-6", darkMode ? "text-white" : "text-slate-900")}>
                          Organization Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Label
                              className={cn("text-sm font-semibold", darkMode ? "text-slate-300" : "text-slate-700")}
                            >
                              Number of Devices
                            </Label>
                            <Input
                              type="number"
                              value={customDevices}
                              onChange={(e) => setCustomDevices(Number(e.target.value))}
                              className={cn(
                                "border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-xl",
                                darkMode
                                  ? "text-white placeholder:text-slate-400"
                                  : "text-slate-900 placeholder:text-slate-500",
                              )}
                            />
                            <p className={cn("text-xs", darkMode ? "text-slate-400" : "text-slate-500")}>
                              Include all network-connected devices
                            </p>
                          </motion.div>

                          <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Label
                              className={cn("text-sm font-semibold", darkMode ? "text-slate-300" : "text-slate-700")}
                            >
                              Number of Users
                            </Label>
                            <Input
                              type="number"
                              value={customUsers}
                              onChange={(e) => setCustomUsers(Number(e.target.value))}
                              className={cn(
                                "border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-xl",
                                darkMode
                                  ? "text-white placeholder:text-slate-400"
                                  : "text-slate-900 placeholder:text-slate-500",
                              )}
                            />
                            <p className={cn("text-xs", darkMode ? "text-slate-400" : "text-slate-500")}>
                              Total user accounts requiring access
                            </p>
                          </motion.div>

                          <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Label
                              className={cn("text-sm font-semibold", darkMode ? "text-slate-300" : "text-slate-700")}
                            >
                              Industry
                            </Label>
                            <select
                              value={industry}
                              onChange={(e) => setIndustry(e.target.value)}
                              className={cn(
                                "w-full border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-xl",
                                darkMode
                                  ? "text-white placeholder:text-slate-400"
                                  : "text-slate-900 placeholder:text-slate-500",
                              )}
                            >
                              {industryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <p className={cn("text-xs", darkMode ? "text-slate-400" : "text-slate-500")}>
                              Select the primary industry of your organization
                            </p>
                          </motion.div>

                          <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <Label
                              className={cn("text-sm font-semibold", darkMode ? "text-slate-300" : "text-slate-700")}
                            >
                              Region
                            </Label>
                            <select
                              value={region}
                              onChange={(e) => setRegion(e.target.value)}
                              className={cn(
                                "w-full border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-xl",
                                darkMode
                                  ? "text-white placeholder:text-slate-400"
                                  : "text-slate-900 placeholder:text-slate-500",
                              )}
                            >
                              {regionOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <p className={cn("text-xs", darkMode ? "text-slate-400" : "text-slate-500")}>
                              Select the primary operating region
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "pricing" && (
                    <div className="space-y-8">
                      <div>
                        <h3 className={cn("text-xl font-bold mb-6", darkMode ? "text-white" : "text-slate-900")}>
                          Pricing Configuration
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Label
                              className={cn("text-sm font-semibold", darkMode ? "text-slate-300" : "text-slate-700")}
                            >
                              Portnox Base Price
                            </Label>
                            <Input
                              type="number"
                              value={portnoxBasePrice}
                              onChange={(e) => setPortnoxBasePrice(Number(e.target.value))}
                              className={cn(
                                "border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-xl",
                                darkMode
                                  ? "text-white placeholder:text-slate-400"
                                  : "text-slate-900 placeholder:text-slate-500",
                              )}
                            />
                            <p className={cn("text-xs", darkMode ? "text-slate-400" : "text-slate-500")}>
                              Base price per device/user for Portnox CLEAR
                            </p>
                          </motion.div>

                          <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Label
                              className={cn("text-sm font-semibold", darkMode ? "text-slate-300" : "text-slate-700")}
                            >
                              Portnox Addons
                            </Label>
                            {/* Addon selection component here */}
                            <p className={cn("text-xs", darkMode ? "text-slate-400" : "text-slate-500")}>
                              Select additional addons for Portnox CLEAR
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "preferences" && (
                    <div className="space-y-8">
                      <div>
                        <h3 className={cn("text-xl font-bold mb-6", darkMode ? "text-white" : "text-slate-900")}>
                          Preferences
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Label
                              className={cn("text-sm font-semibold", darkMode ? "text-slate-300" : "text-slate-700")}
                            >
                              Projection Years
                            </Label>
                            <Input
                              type="number"
                              value={projectionYears}
                              onChange={(e) => setProjectionYears(Number(e.target.value))}
                              className={cn(
                                "border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-xl",
                                darkMode
                                  ? "text-white placeholder:text-slate-400"
                                  : "text-slate-900 placeholder:text-slate-500",
                              )}
                            />
                            <p className={cn("text-xs", darkMode ? "text-slate-400" : "text-slate-500")}>
                              Number of years to project TCO
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "advanced" && (
                    <div className="space-y-8">
                      <div>
                        <h3 className={cn("text-xl font-bold mb-6", darkMode ? "text-white" : "text-slate-900")}>
                          Advanced Settings
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Label
                              className={cn("text-sm font-semibold", darkMode ? "text-slate-300" : "text-slate-700")}
                            >
                              Advanced Setting 1
                            </Label>
                            <Input
                              type="text"
                              placeholder="Advanced Setting 1"
                              className={cn(
                                "border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-xl",
                                darkMode
                                  ? "text-white placeholder:text-slate-400"
                                  : "text-slate-900 placeholder:text-slate-500",
                              )}
                            />
                            <p className={cn("text-xs", darkMode ? "text-slate-400" : "text-slate-500")}>
                              Description of advanced setting 1
                            </p>
                          </motion.div>

                          <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Label
                              className={cn("text-sm font-semibold", darkMode ? "text-slate-300" : "text-slate-700")}
                            >
                              Advanced Setting 2
                            </Label>
                            <Input
                              type="text"
                              placeholder="Advanced Setting 2"
                              className={cn(
                                "border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-xl",
                                darkMode
                                  ? "text-white placeholder:text-slate-400"
                                  : "text-slate-900 placeholder:text-slate-500",
                              )}
                            />
                            <p className={cn("text-xs", darkMode ? "text-slate-400" : "text-slate-500")}>
                              Description of advanced setting 2
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </ScrollArea>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Make sure the component is properly exported as default at the end of the file
export default function TcoAnalyzerUltimate() {
  return (
    <SettingsPanel
      isOpen={true}
      onClose={() => {}}
      orgSizeKey={"startup"}
      setOrgSizeKey={() => {}}
      customDevices={100}
      setCustomDevices={() => {}}
      customUsers={50}
      setCustomUsers={() => {}}
      industry={"technology"}
      setIndustry={() => {}}
      region={"north-america"}
      setRegion={() => {}}
      projectionYears={3}
      setProjectionYears={() => {}}
      portnoxBasePrice={3.5}
      setPortnoxBasePrice={() => {}}
      portnoxAddons={{}}
      setPortnoxAddons={() => {}}
      darkMode={false}
    />
  )
}

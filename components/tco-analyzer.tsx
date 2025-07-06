"use client"

import React, { useState, useMemo, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { compareMultipleVendorsTCO, type calculateFullTCOForVendor } from "@/lib/calculators/tco"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { MoreHorizontal, LineChartIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import {
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  Legend as ReLegend,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  ComposedChart,
} from "recharts"

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
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  Phone,
  SlidersHorizontal,
  InfoIcon,
  MoonIcon,
  SunIcon,
  TrendingUpIcon,
  Settings,
  Search,
  X,
  RefreshCw,
  Upload,
  Save,
  Building,
  Zap,
  ChevronsLeft,
  ChevronsRight,
  Activity,
  TrendingUp,
  Maximize2,
  Award,
  Target,
  Sparkles,
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
        "Threat Detection": true,
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
                            <Select value={industry} onValueChange={setIndustry}>
                              <SelectTrigger
                                className={cn(
                                  "border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-xl",
                                  darkMode ? "text-white" : "text-slate-900",
                                )}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {industryOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                              Geographic Region
                            </Label>
                            <Select value={region} onValueChange={setRegion}>
                              <SelectTrigger
                                className={cn(
                                  "border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-xl",
                                  darkMode ? "text-white" : "text-slate-900",
                                )}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {regionOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </motion.div>
                        </div>

                        <motion.div
                          className="mt-8 space-y-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Label
                            className={cn("text-sm font-semibold", darkMode ? "text-slate-300" : "text-slate-700")}
                          >
                            Analysis Period
                          </Label>
                          <div className="px-4">
                            <Slider
                              value={[projectionYears]}
                              onValueChange={(value) => setProjectionYears(value[0])}
                              max={7}
                              min={1}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-2">
                              <span>1 year</span>
                              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                {projectionYears} years
                              </span>
                              <span>7 years</span>
                            </div>
                          </div>
                          <p className={cn("text-xs", darkMode ? "text-slate-400" : "text-slate-500")}>
                            Recommended: 3-5 years for accurate ROI analysis
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {activeTab === "pricing" && (
                    <div className="space-y-8">
                      <div>
                        <h3 className={cn("text-xl font-bold mb-6", darkMode ? "text-white" : "text-slate-900")}>
                          Pricing Configuration
                        </h3>

                        <div className="space-y-6">
                          <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Label
                              className={cn("text-sm font-semibold", darkMode ? "text-slate-300" : "text-slate-700")}
                            >
                              Portnox Base Price (per device/month)
                            </Label>
                            <div className="flex items-center space-x-3">
                              <span className={cn("text-lg font-bold", darkMode ? "text-slate-400" : "text-slate-500")}>
                                $
                              </span>
                              <Input
                                type="number"
                                step="0.1"
                                value={portnoxBasePrice}
                                onChange={(e) => setPortnoxBasePrice(Number(e.target.value))}
                                className={cn(
                                  "w-32 border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-xl",
                                  darkMode ? "text-white" : "text-slate-900",
                                )}
                              />
                            </div>
                          </motion.div>

                          <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Label
                              className={cn("text-sm font-semibold", darkMode ? "text-slate-300" : "text-slate-700")}
                            >
                              Portnox Add-ons
                            </Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {Object.entries({
                                atp: "Advanced Threat Protection (+$0.50/device)",
                                compliance: "Compliance Automation (+$0.30/device)",
                                iot: "IoT Security (+$0.40/device)",
                                analytics: "Advanced Analytics (+$0.25/device)",
                              }).map(([key, label], index) => (
                                <motion.div
                                  key={key}
                                  className={cn(
                                    "flex items-center justify-between p-4 rounded-xl border",
                                    darkMode ? "bg-white/5 border-slate-700/50" : "bg-slate-50/50 border-slate-200/50",
                                  )}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 + index * 0.1 }}
                                >
                                  <span
                                    className={cn(
                                      "text-sm font-medium",
                                      darkMode ? "text-slate-300" : "text-slate-700",
                                    )}
                                  >
                                    {label}
                                  </span>
                                  <Switch
                                    checked={portnoxAddons[key]}
                                    onCheckedChange={(checked) =>
                                      setPortnoxAddons({ ...portnoxAddons, [key]: checked })
                                    }
                                    className="data-[state=checked]:bg-emerald-500"
                                  />
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "preferences" && (
                    <div className="space-y-8">
                      <div>
                        <h3 className={cn("text-xl font-bold mb-6", darkMode ? "text-white" : "text-slate-900")}>
                          Display Preferences
                        </h3>
                        <p className={cn("text-sm mb-8", darkMode ? "text-slate-400" : "text-slate-500")}>
                          Customize how data is displayed in charts and reports
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <motion.div
                            className={cn(
                              "p-6 rounded-2xl border",
                              darkMode ? "bg-white/5 border-slate-700/50" : "bg-slate-50/50 border-slate-200/50",
                            )}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <h4 className={cn("font-semibold mb-4", darkMode ? "text-white" : "text-slate-900")}>
                              Chart Preferences
                            </h4>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Default Chart Type</span>
                                <Select defaultValue="bar">
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="bar">Bar Chart</SelectItem>
                                    <SelectItem value="line">Line Chart</SelectItem>
                                    <SelectItem value="area">Area Chart</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Animation Speed</span>
                                <Select defaultValue="normal">
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="slow">Slow</SelectItem>
                                    <SelectItem value="normal">Normal</SelectItem>
                                    <SelectItem value="fast">Fast</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </motion.div>

                          <motion.div
                            className={cn(
                              "p-6 rounded-2xl border",
                              darkMode ? "bg-white/5 border-slate-700/50" : "bg-slate-50/50 border-slate-200/50",
                            )}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <h4 className={cn("font-semibold mb-4", darkMode ? "text-white" : "text-slate-900")}>
                              Data Display
                            </h4>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Currency Format</span>
                                <Select defaultValue="usd">
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="usd">USD ($)</SelectItem>
                                    <SelectItem value="eur">EUR (€)</SelectItem>
                                    <SelectItem value="gbp">GBP (£)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Number Format</span>
                                <Select defaultValue="compact">
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="full">Full</SelectItem>
                                    <SelectItem value="compact">Compact</SelectItem>
                                    <SelectItem value="scientific">Scientific</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
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
                        <p className={cn("text-sm mb-8", darkMode ? "text-slate-400" : "text-slate-500")}>
                          Advanced configuration options for detailed analysis
                        </p>

                        <div className="space-y-6">
                          <motion.div
                            className={cn(
                              "p-6 rounded-2xl border",
                              darkMode ? "bg-white/5 border-slate-700/50" : "bg-slate-50/50 border-slate-200/50",
                            )}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <h4 className={cn("font-semibold mb-4", darkMode ? "text-white" : "text-slate-900")}>
                              Calculation Parameters
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-sm">Discount Rate (%)</Label>
                                <Input type="number" defaultValue="8" className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm">Inflation Rate (%)</Label>
                                <Input type="number" defaultValue="3" className="w-full" />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm">Risk Factor</Label>
                                <Select defaultValue="medium">
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm">Growth Rate (%)</Label>
                                <Input type="number" defaultValue="5" className="w-full" />
                              </div>
                            </div>
                          </motion.div>

                          <motion.div
                            className={cn(
                              "p-6 rounded-2xl border",
                              darkMode ? "bg-white/5 border-slate-700/50" : "bg-slate-50/50 border-slate-200/50",
                            )}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <h4 className={cn("font-semibold mb-4", darkMode ? "text-white" : "text-slate-900")}>
                              Data Sources
                            </h4>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Real-time Market Data</span>
                                <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Industry Benchmarks</span>
                                <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Vendor Pricing Updates</span>
                                <Switch />
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Compliance Database</span>
                                <Switch defaultChecked />
                              </div>
                            </div>
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

// Main Enhanced Component
export default function TcoAnalyzerUltimate() {
  const [isClient, setIsClient] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Advanced filtering and drill-down states
  const [drillDownLevel, setDrillDownLevel] = useState<"overview" | "detailed" | "granular">("overview")
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [filterCriteria, setFilterCriteria] = useState({
    costRange: [0, 10000000],
    deploymentTime: [0, 365],
    riskLevel: "all",
    vendorType: "all",
    features: [],
  })
  const [sortConfig, setSortConfig] = useState({ key: "total", direction: "asc" })
  const [realTimeEnabled, setRealTimeEnabled] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [chartType, setChartType] = useState<"bar" | "line" | "area" | "pie">("bar")
  const [timeRange, setTimeRange] = useState<"1y" | "3y" | "5y" | "7y">("5y")
  const [comparisonMode, setComparisonMode] = useState<"absolute" | "relative" | "normalized">("absolute")
  const [selectedDataPoints, setSelectedDataPoints] = useState<string[]>([])
  const [drillDownData, setDrillDownData] = useState<any>(null)
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // Add custom CSS for animations
    const style = document.createElement("style")
    style.textContent = `
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [darkMode])

  const [orgSizeKey, setOrgSizeKey] = useState("medium")
  const [customDevices, setCustomDevices] = useState(initialOrgSizeDetails.medium.devices)
  const [customUsers, setCustomUsers] = useState(initialOrgSizeDetails.medium.users)
  const [industry, setIndustry] = useState("technology")
  const [projectionYears, setProjectionYears] = useState(5)
  const [region, setRegion] = useState("north-america")
  const [portnoxBasePrice, setPortnoxBasePrice] = useState(4.0)
  const [portnoxAddons, setPortnoxAddons] = useState({
    atp: false,
    compliance: false,
    iot: false,
    analytics: false,
  })
  const [selectedVendors, setSelectedVendors] = useState<string[]>(["portnox", "cisco", "aruba", "meraki"])
  const [activeMainTab, setActiveMainTab] = useState("dashboard")
  const [activeSubTab, setActiveSubTab] = useState("cost-breakdown")
  const [results, setResults] = useState<CalculationResult[] | null>(null)
  const [calculationError, setCalculationError] = useState<string | null>(null)

  // Utility functions for advanced features
  const formatCurrency = (value: number, compact = false) => {
    if (compact) {
      if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
      if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
      return `$${value.toFixed(0)}`
    }
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
  }

  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  const generateTimeSeriesData = (baseValue: number, months: number, trend: "up" | "down" | "stable" = "stable") => {
    const data = []
    for (let i = 0; i < months; i++) {
      let value = baseValue
      if (trend === "up") {
        value = baseValue * (1 + i * 0.02 + (Math.random() * 0.1 - 0.05))
      } else if (trend === "down") {
        value = baseValue * (1 - i * 0.01 + (Math.random() * 0.1 - 0.05))
      } else {
        value = baseValue * (1 + (Math.random() * 0.2 - 0.1))
      }
      data.push({
        month: i + 1,
        value: Math.max(0, value),
        date: new Date(2024, i, 1).toISOString().split("T")[0],
      })
    }
    return data
  }

  const filterResults = (results: CalculationResult[], criteria: any) => {
    if (!results) return []

    return results.filter((result) => {
      // Cost range filter
      if (result.total < criteria.costRange[0] || result.total > criteria.costRange[1]) {
        return false
      }

      // Deployment time filter
      const deploymentDays = VENDOR_DATA[result.vendor]?.implementation?.deploymentTime?.fullDeployment / 24 || 0
      if (deploymentDays < criteria.deploymentTime[0] || deploymentDays > criteria.deploymentTime[1]) {
        return false
      }

      // Risk level filter
      if (criteria.riskLevel !== "all") {
        const riskReduction = VENDOR_DATA[result.vendor]?.roi?.breachRiskReduction || 0
        if (criteria.riskLevel === "high" && riskReduction < 0.8) return false
        if (criteria.riskLevel === "medium" && (riskReduction < 0.5 || riskReduction >= 0.8)) return false
        if (criteria.riskLevel === "low" && riskReduction >= 0.5) return false
      }

      // Vendor type filter
      if (criteria.vendorType !== "all") {
        const vendorCategory = VENDOR_DATA[result.vendor]?.category || ""
        if (!vendorCategory.toLowerCase().includes(criteria.vendorType.toLowerCase())) {
          return false
        }
      }

      return true
    })
  }

  const sortResults = (results: CalculationResult[], config: { key: string; direction: string }) => {
    if (!results) return []

    return [...results].sort((a, b) => {
      let aValue, bValue

      switch (config.key) {
        case "total":
          aValue = a.total
          bValue = b.total
          break
        case "roi":
          aValue = a.roi?.percentage || 0
          bValue = b.roi?.percentage || 0
          break
        case "payback":
          aValue = a.roi?.paybackMonths || 0
          bValue = b.roi?.paybackMonths || 0
          break
        case "risk":
          aValue = VENDOR_DATA[a.vendor]?.roi?.breachRiskReduction || 0
          bValue = VENDOR_DATA[b.vendor]?.roi?.breachRiskReduction || 0
          break
        case "deployment":
          aValue = VENDOR_DATA[a.vendor]?.implementation?.deploymentTime?.fullDeployment || 0
          bValue = VENDOR_DATA[b.vendor]?.implementation?.deploymentTime?.fullDeployment || 0
          break
        default:
          aValue = a.vendorName
          bValue = b.vendorName
      }

      if (typeof aValue === "string") {
        return config.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return config.direction === "asc" ? aValue - bValue : bValue - aValue
    })
  }

  const currentDeviceCount = useMemo(
    () => (orgSizeKey === "custom" ? customDevices : initialOrgSizeDetails[orgSizeKey]?.devices || 2500),
    [orgSizeKey, customDevices],
  )
  const currentUsersCount = useMemo(
    () => (orgSizeKey === "custom" ? customUsers : initialOrgSizeDetails[orgSizeKey]?.users || 1500),
    [orgSizeKey, customUsers],
  )

  const handleCalculate = useCallback(() => {
    setCalculationError(null)
    try {
      const calculatedResults = compareMultipleVendorsTCO(selectedVendors, orgSizeKey, industry, projectionYears)
      setResults(calculatedResults as CalculationResult[])
    } catch (error) {
      console.error("Calculation error:", error)
      setCalculationError("Failed to calculate TCO. Please check inputs.")
      setResults(null)
    }
  }, [selectedVendors, orgSizeKey, industry, projectionYears])

  useEffect(() => {
    if (selectedVendors.length > 0) {
      handleCalculate()
    } else {
      setResults(null)
    }
  }, [handleCalculate, selectedVendors.length])

  const handleVendorToggle = (vendorId: string) => {
    setSelectedVendors((prev) => {
      const isSelected = prev.includes(vendorId)
      if (vendorId === "portnox" && isSelected && prev.length === 1) return prev

      let newSelection
      if (isSelected) {
        newSelection = prev.filter((id) => id !== vendorId)
      } else {
        if (prev.length >= 6) {
          // Simple alert, could be replaced with a toast notification
          alert("You can select a maximum of 6 vendors for comparison.")
          return prev
        }
        newSelection = [...prev, vendorId]
      }
      if (newSelection.includes("portnox")) {
        return ["portnox", ...newSelection.filter((id) => id !== "portnox")]
      }
      return newSelection.length > 0 ? newSelection : ["portnox"]
    })
  }

  const portnoxResult = useMemo(() => results?.find((r) => r?.vendorId === "portnox"), [results])
  const competitors = useMemo(() => results?.filter((r) => r?.vendorId !== "portnox") || [], [results])
  const lowestCompetitor = useMemo(
    () =>
      competitors.sort(
        (a, b) => (a?.totalTCO ?? Number.POSITIVE_INFINITY) - (b?.totalTCO ?? Number.POSITIVE_INFINITY),
      )[0],
    [competitors],
  )

  const totalSavingsVsLowestCompetitor = useMemo(() => {
    if (!portnoxResult || !lowestCompetitor) return 0
    return lowestCompetitor.totalTCO - portnoxResult.totalTCO
  }, [portnoxResult, lowestCompetitor])

  const savingsPercentVsLowestCompetitor = useMemo(() => {
    if (!portnoxResult || !lowestCompetitor || lowestCompetitor.totalTCO === 0) return 0
    return (totalSavingsVsLowestCompetitor / lowestCompetitor.totalTCO) * 100
  }, [totalSavingsVsLowestCompetitor, lowestCompetitor, portnoxResult])

  // Enhanced Header Component
  const ModernHeader = () => (
    <motion.header
      className={cn(
        "sticky top-0 z-50 backdrop-blur-2xl transition-all duration-500 border-b",
        darkMode
          ? "bg-gradient-to-r from-slate-950/90 via-slate-900/90 to-slate-950/90 border-slate-800/30"
          : "bg-gradient-to-r from-white/90 via-slate-50/90 to-white/90 border-slate-200/30",
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${MODERN_COLORS.primary[500]}40 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, ${MODERN_COLORS.purple[500]}40 0%, transparent 50%)`,
            backgroundSize: "200px 200px",
            animation: "float 20s ease-in-out infinite",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-6">
            <motion.div
              whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Image
                src="/portnox-logo-color.png"
                alt="Portnox Logo"
                width={200}
                height={50}
                className="h-12 w-auto relative z-10"
                priority
              />
              {/* Logo Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(20, 184, 166, 0.3)",
                    "0 0 40px rgba(20, 184, 166, 0.5)",
                    "0 0 20px rgba(20, 184, 166, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </motion.div>

            <Separator
              orientation="vertical"
              className={cn("h-10", darkMode ? "bg-slate-700/50" : "bg-slate-300/50")}
            />

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Total Cost Analyzer
                </span>
              </h1>
              <p className={cn("text-sm font-medium", darkMode ? "text-slate-400" : "text-slate-500")}>
                Executive Intelligence Decision Platform
              </p>
            </motion.div>
          </div>

          <div className="flex items-center space-x-4">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={() => setShowSettings(true)}
                    className={cn(
                      "p-3 rounded-2xl transition-all duration-300 relative group",
                      darkMode
                        ? "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-300"
                        : "bg-black/5 hover:bg-black/10 text-slate-600 hover:text-slate-700",
                    )}
                    whileHover={modernAnimations.scaleHover}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Settings className="h-5 w-5" />
                    {/* Button Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: MODERN_COLORS.gradients.portnox }}
                    />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className={cn(
                    "backdrop-blur-xl border-0",
                    darkMode ? "bg-slate-900/90 text-white" : "bg-white/90 text-slate-900",
                  )}
                >
                  <p>Settings & Configuration</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={() => setDarkMode(!darkMode)}
                    className={cn(
                      "p-3 rounded-2xl transition-all duration-300 relative group",
                      darkMode
                        ? "bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400"
                        : "bg-slate-800/10 hover:bg-slate-800/20 text-slate-600",
                    )}
                    whileHover={modernAnimations.scaleHover}
                    whileTap={{ scale: 0.9 }}
                  >
                    {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                    {/* Button Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: darkMode
                          ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
                          : "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                      }}
                    />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className={cn(
                    "backdrop-blur-xl border-0",
                    darkMode ? "bg-slate-900/90 text-white" : "bg-white/90 text-slate-900",
                  )}
                >
                  <p>Toggle {darkMode ? "Light" : "Dark"} Mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <motion.div whileHover={modernAnimations.scaleHover} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "hidden sm:flex items-center space-x-2 border-0 backdrop-blur-xl",
                  darkMode
                    ? "bg-white/5 hover:bg-white/10 text-slate-300"
                    : "bg-black/5 hover:bg-black/10 text-slate-700",
                )}
              >
                <Download className="h-4 w-4" />
                <span>Export PDF</span>
              </Button>
            </motion.div>

            <motion.div whileHover={modernAnimations.scaleHover} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Phone className="h-4 w-4 mr-2" />
                Schedule Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )

  // Enhanced Main Tab Navigation
  const ModernMainTabNavigation = () => (
    <motion.nav
      className={cn(
        "sticky top-20 z-40 backdrop-blur-2xl border-b",
        darkMode
          ? "bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 border-slate-800/30"
          : "bg-gradient-to-r from-white/80 via-slate-50/80 to-white/80 border-slate-200/30",
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
    >
      <div className="container mx-auto px-4">
        <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
          <TabsList className="flex items-center h-auto py-0 bg-transparent rounded-none justify-start overflow-x-auto">
            {MAIN_TABS_CONFIG.map((tab, index) => (
              <motion.div
                key={tab.value}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.05, type: "spring", stiffness: 120, damping: 15 }}
                className="flex-shrink-0"
              >
                <TabsTrigger
                  value={tab.value}
                  className={cn(
                    "relative flex items-center h-14 text-sm rounded-none px-8 py-3 transition-all duration-300",
                    "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                    "group whitespace-nowrap border-0",
                    activeMainTab === tab.value
                      ? darkMode
                        ? "text-emerald-400"
                        : "text-emerald-600"
                      : darkMode
                        ? "text-slate-400 hover:text-slate-200"
                        : "text-slate-600 hover:text-slate-800",
                  )}
                >
                  {/* Tab Background */}
                  {activeMainTab === tab.value && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-20"
                      style={{ background: MODERN_COLORS.gradients.portnox }}
                      layoutId="activeTabBackground"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  <motion.div
                    className={cn("h-6 w-6 mr-3 transition-all duration-300", "group-hover:scale-110")}
                    animate={activeMainTab === tab.value ? modernAnimations.float : {}}
                  >
                    {React.cloneElement(tab.icon, { className: "h-full w-full" })}
                  </motion.div>

                  <span
                    className={cn(
                      "font-medium transition-all duration-300",
                      activeMainTab === tab.value ? "font-semibold" : "",
                    )}
                  >
                    {tab.label}
                  </span>

                  {activeMainTab === tab.value && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      layoutId="activeMainTabIndicator"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </motion.nav>
  )

  // Enhanced Sub Tab Navigation
  const ModernSubTabNavigation = () => {
    let subTabs: typeof ANALYSIS_SUB_TABS = []

    if (activeMainTab === "analysis") {
      subTabs = ANALYSIS_SUB_TABS
    }
    if (activeMainTab === "comparison") {
      subTabs = COMPARISON_SUB_TABS
    }

    if (subTabs.length === 0) return null

    return (
      <motion.div
        className={cn(
          "border-b backdrop-blur-xl",
          darkMode ? "bg-slate-900/50 border-slate-800/30" : "bg-white/50 border-slate-200/30",
        )}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
            <TabsList className="flex items-center h-auto py-0 bg-transparent rounded-none justify-start overflow-x-auto">
              {subTabs.map((tab, index) => (
                <motion.div
                  key={tab.value}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex-shrink-0"
                >
                  <TabsTrigger
                    value={tab.value}
                    className={cn(
                      "relative flex items-center h-12 text-sm rounded-none px-6 py-2 transition-all duration-300",
                      "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                      "group whitespace-nowrap border-0",
                      activeSubTab === tab.value
                        ? darkMode
                          ? "text-teal-400"
                          : "text-teal-600"
                        : darkMode
                          ? "text-slate-500 hover:text-slate-300"
                          : "text-slate-600 hover:text-slate-800",
                    )}
                  >
                    <motion.div
                      className="h-4 w-4 mr-2 transition-all duration-300"
                      animate={activeSubTab === tab.value ? { rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {React.cloneElement(tab.icon, { className: "h-full w-full" })}
                    </motion.div>

                    <span
                      className={cn(
                        "font-medium transition-all duration-300",
                        activeSubTab === tab.value ? "font-semibold" : "",
                      )}
                    >
                      {tab.label}
                    </span>

                    {activeSubTab === tab.value && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
                        layoutId="activeSubTabIndicator"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </motion.div>
    )
  }

  // Enhanced Executive Dashboard
  const ExecutiveDashboard = () => {
    const kpiData = useMemo(() => {
      if (!results || results.length === 0) return []

      const portnoxData = results.find((r) => r?.vendorId === "portnox")
      const competitorData = results.filter((r) => r?.vendorId !== "portnox")
      const avgCompetitorCost = competitorData.reduce((sum, r) => sum + r.totalTCO, 0) / competitorData.length

      return [
        {
          title: "Total Savings",
          value: formatCurrency(avgCompetitorCost - (portnoxData?.totalTCO || 0), true),
          subtitle: "vs. Average Competitor",
          icon: DollarSign,
          trend: "up",
          trendValue: `${(((avgCompetitorCost - (portnoxData?.totalTCO || 0)) / avgCompetitorCost) * 100).toFixed(1)}%`,
          color: "success",
          sparklineData: generateTimeSeriesData(avgCompetitorCost - (portnoxData?.totalTCO || 0), 12, "up"),
        },
        {
          title: "ROI",
          value: `${portnoxData?.roiMetrics?.annualizedROIPercent?.toFixed(1) || 0}%`,
          subtitle: `${portnoxData?.roiMetrics?.paybackPeriodMonths || 0} month payback`,
          icon: TrendingUp,
          trend: "up",
          trendValue: "+23.5%",
          color: "primary",
          sparklineData: generateTimeSeriesData(Number(portnoxData?.roiMetrics?.annualizedROIPercent) || 0, 12, "up"),
        },
        {
          title: "Risk Reduction",
          value: "94%",
          subtitle: "Breach risk mitigation",
          icon: Shield,
          trend: "up",
          trendValue: "+18%",
          color: "purple",
          sparklineData: generateTimeSeriesData(94, 12, "stable"),
        },
        {
          title: "Deployment Time",
          value: "7 days",
          subtitle: "vs. 120+ days average",
          icon: Clock,
          trend: "down",
          trendValue: "-94%",
          color: "cyan",
          sparklineData: generateTimeSeriesData(7, 12, "stable"),
        },
      ]
    }, [results])

    return (
      <motion.div className="space-y-8" variants={modernAnimations.staggerContainer} initial="hidden" animate="visible">
        {/* KPI Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={modernAnimations.slideInUp}
        >
          {kpiData.map((kpi, index) => (
            <motion.div key={kpi.title} variants={modernAnimations.slideInUp} transition={{ delay: index * 0.1 }}>
              <ModernKPICard {...kpi} darkMode={darkMode} size="default" interactive={true} />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* TCO Comparison Chart */}
          <motion.div variants={modernAnimations.slideInUp}>
            <ModernGradientCard darkMode={darkMode} gradient="hologram" glow={false}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className={cn("text-xl font-bold", darkMode ? "text-white" : "text-slate-900")}>
                      Total Cost Comparison
                    </CardTitle>
                    <p className={cn("text-sm mt-1", darkMode ? "text-slate-400" : "text-slate-500")}>
                      {projectionYears}-year TCO analysis
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="h-8 bg-transparent">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Export Chart
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Maximize2 className="h-4 w-4 mr-2" />
                          Full Screen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {results && results.length > 0 ? (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={results.map((r) => ({
                          vendor: r.vendorName,
                          total: r.totalTCO,
                          licensing: r.breakdown.software,
                          implementation: r.breakdown.implementation,
                          operations: r.breakdown.operational,
                          roi: r.roiMetrics?.annualizedROIPercent || 0,
                        }))}
                      >
                        <defs>
                          <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.2} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                        <XAxis
                          dataKey="vendor"
                          tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 12 }}
                          axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
                        />
                        <YAxis
                          tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 12 }}
                          axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
                          tickFormatter={(value) => formatCurrency(value, true)}
                        />
                        <ReTooltip
                          contentStyle={{
                            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                          }}
                          formatter={(value: any, name: string) => [
                            typeof value === "number" ? formatCurrency(value) : value,
                            name,
                          ]}
                        />
                        <ReLegend />
                        <Bar dataKey="total" fill="url(#totalGradient)" radius={[4, 4, 0, 0]} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-80 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3
                        className={cn("h-12 w-12 mx-auto mb-4", darkMode ? "text-slate-600" : "text-slate-400")}
                      />
                      <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                        Select vendors to view comparison
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </ModernGradientCard>
          </motion.div>

          {/* ROI Timeline Chart */}
          <motion.div variants={modernAnimations.slideInUp}>
            <ModernGradientCard darkMode={darkMode} gradient="aurora" glow={false}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className={cn("text-xl font-bold", darkMode ? "text-white" : "text-slate-900")}>
                      ROI Timeline
                    </CardTitle>
                    <p className={cn("text-sm mt-1", darkMode ? "text-slate-400" : "text-slate-500")}>
                      Return on investment over time
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="h-8 bg-transparent">
                      <LineChartIcon className="h-3 w-3 mr-1" />
                      Analyze
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={generateTimeSeriesData(100, 60, "up")}>
                      <defs>
                        <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 12 }}
                        axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
                      />
                      <YAxis
                        tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 12 }}
                        axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <ReTooltip
                        contentStyle={{
                          backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                          border: "none",
                          borderRadius: "12px",
                          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                        formatter={(value: any) => [`${value.toFixed(1)}%`, "ROI"]}
                        labelFormatter={(label) => `Month ${label}`}
                      />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="url(#roiGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </ModernGradientCard>
          </motion.div>
        </div>

        {/* Bottom Section - Insights and Recommendations */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8" variants={modernAnimations.slideInUp}>
          {/* Key Insights */}
          <motion.div variants={modernAnimations.slideInUp}>
            <ModernGradientCard darkMode={darkMode} gradient="sunset" glow={false}>
              <CardHeader>
                <CardTitle
                  className={cn("text-lg font-bold flex items-center", darkMode ? "text-white" : "text-slate-900")}
                >
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-400" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className={cn("p-3 rounded-xl", darkMode ? "bg-white/5" : "bg-black/5")}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span className="text-sm font-semibold">Cost Advantage</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Portnox delivers 67% lower TCO compared to traditional solutions
                    </p>
                  </div>

                  <div className={cn("p-3 rounded-xl", darkMode ? "bg-white/5" : "bg-black/5")}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <span className="text-sm font-semibold">Deployment Speed</span>
                    </div>
                    <p className="text-xs text-muted-foreground">94% faster deployment than legacy NAC solutions</p>
                  </div>

                  <div className={cn("p-3 rounded-xl", darkMode ? "bg-white/5" : "bg-black/5")}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                      <span className="text-sm font-semibold">Risk Mitigation</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Superior threat detection with AI-powered analytics</p>
                  </div>
                </div>
              </CardContent>
            </ModernGradientCard>
          </motion.div>

          {/* Recommendations */}
          <motion.div variants={modernAnimations.slideInUp}>
            <ModernGradientCard darkMode={darkMode} gradient="cosmic" glow={false}>
              <CardHeader>
                <CardTitle
                  className={cn("text-lg font-bold flex items-center", darkMode ? "text-white" : "text-slate-900")}
                >
                  <Target className="h-5 w-5 mr-2 text-orange-400" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div
                    className={cn(
                      "p-3 rounded-xl border-l-4 border-emerald-400",
                      darkMode ? "bg-emerald-400/10" : "bg-emerald-50",
                    )}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Award className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm font-semibold">Immediate Action</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Start with Portnox pilot deployment in critical network segments
                    </p>
                  </div>

                  <div
                    className={cn(
                      "p-3 rounded-xl border-l-4 border-blue-400",
                      darkMode ? "bg-blue-400/10" : "bg-blue-50",
                    )}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-semibold">Quick Wins</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enable AI analytics and compliance automation features
                    </p>
                  </div>

                  <div
                    className={cn(
                      "p-3 rounded-xl border-l-4 border-purple-400",
                      darkMode ? "bg-purple-400/10" : "bg-purple-50",
                    )}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Activity className="h-4 w-4 text-purple-400" />
                      <span className="text-sm font-semibold">Long-term</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Plan full migration strategy with phased rollout approach
                    </p>
                  </div>
                </div>
              </CardContent>
            </ModernGradientCard>
          </motion.div>

          {/* Executive Summary */}
          <motion.div variants={modernAnimations.slideInUp}>
            <ModernGradientCard darkMode={darkMode} gradient="matrix" glow={false}>
              <CardHeader>
                <CardTitle
                  className={cn("text-lg font-bold flex items-center", darkMode ? "text-white" : "text-slate-900")}
                >
                  <FileText className="h-5 w-5 mr-2 text-cyan-400" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-400 mb-1">
                      {formatCurrency(totalSavingsVsLowestCompetitor, true)}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Savings vs Best Competitor</div>
                  </div>

                  <Separator className={darkMode ? "bg-slate-700" : "bg-slate-200"} />

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-400">
                        {portnoxResult?.roiMetrics?.paybackPeriodMonths || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">Months Payback</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-400">
                        {savingsPercentVsLowestCompetitor.toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Cost Reduction</div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0"
                    size="sm"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Schedule Executive Briefing
                  </Button>
                </div>
              </CardContent>
            </ModernGradientCard>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  // Enhanced Vendor Selection Panel
  const EnhancedVendorSelectionPanel = ({
    selectedVendors,
    onVendorToggle,
    darkMode,
    searchTerm,
    setSearchTerm,
    isCollapsed,
  }: {
    selectedVendors: string[]
    onVendorToggle: (vendorId: string) => void
    darkMode: boolean
    searchTerm: string
    setSearchTerm: (term: string) => void
    isCollapsed: boolean
  }) => {
    const filteredVendors = useMemo(() => {
      return Object.values(VENDOR_DATA).filter((vendor) => vendor.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }, [searchTerm])

    return (
      <motion.aside
        className={cn(
          "fixed left-0 top-0 z-30 h-full w-72 overflow-y-auto transition-all duration-300 border-r",
          darkMode ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700",
        )}
        style={{ width: isCollapsed ? "0rem" : "18rem" }}
      >
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              type="search"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                "pl-10 pr-3 py-2 rounded-xl border-0 bg-white/5 dark:bg-black/20 backdrop-blur-xl",
                darkMode ? "text-white placeholder:text-slate-400" : "text-slate-900 placeholder:text-slate-500",
              )}
            />
          </div>
        </div>

        <Separator className={darkMode ? "bg-slate-700" : "bg-slate-200"} />

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="p-4 space-y-3">
            {filteredVendors.map((vendor) => (
              <motion.div
                key={vendor.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl transition-all duration-300",
                  selectedVendors.includes(vendor.id)
                    ? "bg-emerald-500/10 dark:bg-emerald-500/20"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800",
                )}
                whileHover={modernAnimations.scaleHover}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={vendor.logo || "/placeholder.svg"}
                    alt={vendor.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium">{vendor.name}</span>
                </div>
                <Switch
                  checked={selectedVendors.includes(vendor.id)}
                  onCheckedChange={() => onVendorToggle(vendor.id)}
                  disabled={vendor.id === "portnox" && selectedVendors.length === 1}
                  className="data-[state=checked]:bg-emerald-500"
                />
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </motion.aside>
    )
  }

  // Modern KPI Card Component
  const ModernKPICard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    trendValue,
    color,
    sparklineData,
    darkMode,
    size = "default",
    interactive = false,
  }: {
    title: string
    value: string
    subtitle: string
    icon: any
    trend: "up" | "down" | "stable"
    trendValue: string
    color: "primary" | "success" | "warning" | "danger" | "purple" | "cyan"
    sparklineData: any[]
    darkMode: boolean
    size?: "small" | "default"
    interactive?: boolean
  }) => {
    const [isHovered, setIsHovered] = useState(false)

    const cardStyle = cn(
      "relative overflow-hidden rounded-2xl border shadow-md transition-all duration-300",
      darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200",
      interactive && "cursor-pointer hover:shadow-lg",
      interactive && isHovered && "transform scale-105",
    )

    const headerStyle = cn("flex items-center justify-between p-4", darkMode ? "text-slate-300" : "text-slate-700")

    const titleStyle = cn("text-sm font-medium", darkMode ? "text-slate-300" : "text-slate-700")

    const valueStyle = cn(
      "text-2xl font-bold tracking-tight",
      darkMode ? "text-white" : "text-slate-900",
      color === "primary" && "text-emerald-400",
      color === "success" && "text-green-400",
      color === "warning" && "text-yellow-400",
      color === "danger" && "text-red-400",
      color === "purple" && "text-purple-400",
      color === "cyan" && "text-cyan-400",
    )

    const trendStyle = cn(
      "flex items-center space-x-1 text-xs font-medium",
      trend === "up" && "text-green-500",
      trend === "down" && "text-red-500",
      trend === "stable" && "text-slate-500",
    )

    const sparklineStyle = {
      width: "100%",
      height: size === "small" ? 40 : 60,
    }

    return (
      <motion.div
        className={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileTap={{ scale: 0.95 }}
      >
        <div className={headerStyle}>
          <div>
            <div className={titleStyle}>{title}</div>
            <div className={valueStyle}>{value}</div>
            <div className="text-xs text-muted-foreground">{subtitle}</div>
          </div>
          <Icon className="h-6 w-6" />
        </div>
        <ResponsiveContainer width="100%" height={sparklineStyle.height}>
          <AreaChart data={sparklineData}>
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="p-4">
          <div className={trendStyle}>
            {trend === "up" && <ArrowUpRight className="h-4 w-4" />}
            {trend === "down" && <ArrowDownRight className="h-4 w-4" />}
            <span>{trendValue}</span>
          </div>
        </div>
      </motion.div>
    )
  }

  // Modern Gradient Card Component
  const ModernGradientCard = ({
    children,
    darkMode,
    gradient,
    glow = true,
  }: {
    children: React.ReactNode
    darkMode: boolean
    gradient: string
    glow?: boolean
  }) => {
    return (
      <Card
        className={cn(
          "relative overflow-hidden rounded-3xl border shadow-xl transition-all duration-300",
          darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200",
        )}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              background: MODERN_COLORS.gradients[gradient],
              backgroundSize: "400% 400%",
              animation: "float 20s ease-in-out infinite",
            }}
          />
        </div>

        {/* Card Glow Effect */}
        {glow && (
          <motion.div
            className="absolute inset-0 rounded-3xl"
            animate={{
              boxShadow: [
                "0 0 20px rgba(20, 184, 166, 0.3)",
                "0 0 40px rgba(20, 184, 166, 0.5)",
                "0 0 20px rgba(20, 184, 166, 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        )}

        <CardContent className="relative z-10 p-6">{children}</CardContent>
      </Card>
    )
  }

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className={cn("min-h-screen transition-colors duration-500", darkMode ? "dark bg-slate-950" : "bg-slate-50")}>
      <TooltipProvider delayDuration={100}>
        {/* Enhanced Header */}
        <ModernHeader />

        {/* Enhanced Main Navigation */}
        <ModernMainTabNavigation />

        {/* Enhanced Sub Navigation */}
        <ModernSubTabNavigation />

        {/* Main Content Area */}
        <div className="flex min-h-[calc(100vh-160px)]">
          {/* Enhanced Vendor Selection Panel */}
          <EnhancedVendorSelectionPanel
            selectedVendors={selectedVendors}
            onVendorToggle={handleVendorToggle}
            darkMode={darkMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isCollapsed={sidebarCollapsed}
          />

          {/* Sidebar Toggle Button */}
          <motion.button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={cn(
              "fixed left-2 top-1/2 -translate-y-1/2 z-50 p-3 rounded-2xl transition-all duration-300",
              "backdrop-blur-xl border shadow-lg",
              darkMode
                ? "bg-slate-900/80 border-slate-700/50 text-slate-300 hover:text-white"
                : "bg-white/80 border-slate-200/50 text-slate-600 hover:text-slate-900",
            )}
            whileHover={modernAnimations.scaleHover}
            whileTap={{ scale: 0.9 }}
            style={{ left: sidebarCollapsed ? "1rem" : "25rem" }}
          >
            {sidebarCollapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
          </motion.button>

          {/* Main Content */}
          <main className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMainTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeMainTab === "dashboard" && <ExecutiveDashboard />}

                    {activeMainTab === "analysis" && (
                      <div className="space-y-8">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center"
                        >
                          <h2 className={cn("text-3xl font-bold mb-4", darkMode ? "text-white" : "text-slate-900")}>
                            Detailed TCO Analysis
                          </h2>
                          <p className={cn("text-lg", darkMode ? "text-slate-400" : "text-slate-500")}>
                            Comprehensive cost breakdown and ROI analysis
                          </p>
                        </motion.div>

                        {/* Analysis content would go here */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <ModernGradientCard darkMode={darkMode} gradient="hologram">
                            <CardHeader>
                              <CardTitle>Cost Breakdown Analysis</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="h-80 flex items-center justify-center">
                                <p className="text-muted-foreground">Detailed cost analysis coming soon...</p>
                              </div>
                            </CardContent>
                          </ModernGradientCard>

                          <ModernGradientCard darkMode={darkMode} gradient="aurora">
                            <CardHeader>
                              <CardTitle>ROI Projections</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="h-80 flex items-center justify-center">
                                <p className="text-muted-foreground">ROI projections coming soon...</p>
                              </div>
                            </CardContent>
                          </ModernGradientCard>
                        </div>
                      </div>
                    )}

                    {activeMainTab === "comparison" && (
                      <div className="space-y-8">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center"
                        >
                          <h2 className={cn("text-3xl font-bold mb-4", darkMode ? "text-white" : "text-slate-900")}>
                            Vendor Comparison Matrix
                          </h2>
                          <p className={cn("text-lg", darkMode ? "text-slate-400" : "text-slate-500")}>
                            Side-by-side feature and cost comparison
                          </p>
                        </motion.div>

                        {/* Comparison content would go here */}
                        <ModernGradientCard darkMode={darkMode} gradient="cosmic">
                          <CardHeader>
                            <CardTitle>Feature Comparison Matrix</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-96 flex items-center justify-center">
                              <p className="text-muted-foreground">Detailed vendor comparison coming soon...</p>
                            </div>
                          </CardContent>
                        </ModernGradientCard>
                      </div>
                    )}

                    {activeMainTab === "compliance" && (
                      <div className="space-y-8">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center"
                        >
                          <h2 className={cn("text-3xl font-bold mb-4", darkMode ? "text-white" : "text-slate-900")}>
                            Compliance & Risk Assessment
                          </h2>
                          <p className={cn("text-lg", darkMode ? "text-slate-400" : "text-slate-500")}>
                            Security compliance and risk analysis
                          </p>
                        </motion.div>

                        {/* Compliance content would go here */}
                        <ModernGradientCard darkMode={darkMode} gradient="matrix">
                          <CardHeader>
                            <CardTitle>Compliance Dashboard</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-96 flex items-center justify-center">
                              <p className="text-muted-foreground">Compliance analysis coming soon...</p>
                            </div>
                          </CardContent>
                        </ModernGradientCard>
                      </div>
                    )}

                    {activeMainTab === "reports" && (
                      <div className="space-y-8">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center"
                        >
                          <h2 className={cn("text-3xl font-bold mb-4", darkMode ? "text-white" : "text-slate-900")}>
                            Executive Reports
                          </h2>
                          <p className={cn("text-lg", darkMode ? "text-slate-400" : "text-slate-500")}>
                            Generate and export detailed reports
                          </p>
                        </motion.div>

                        {/* Reports content would go here */}
                        <ModernGradientCard darkMode={darkMode} gradient="sunset">
                          <CardHeader>
                            <CardTitle>Report Generator</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-96 flex items-center justify-center">
                              <p className="text-muted-foreground">Report generation coming soon...</p>
                            </div>
                          </CardContent>
                        </ModernGradientCard>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </main>
        </div>

        {/* Enhanced Settings Panel */}
        <SettingsPanel
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          orgSizeKey={orgSizeKey}
          setOrgSizeKey={setOrgSizeKey}
          customDevices={customDevices}
          setCustomDevices={setCustomDevices}
          customUsers={customUsers}
          setCustomUsers={setCustomUsers}
          industry={industry}
          setIndustry={setIndustry}
          region={region}
          setRegion={setRegion}
          projectionYears={projectionYears}
          setProjectionYears={setProjectionYears}
          portnoxBasePrice={portnoxBasePrice}
          setPortnoxBasePrice={setPortnoxBasePrice}
          portnoxAddons={portnoxAddons}
          darkMode={darkMode}
        />
      </TooltipProvider>
    </div>
  )
}

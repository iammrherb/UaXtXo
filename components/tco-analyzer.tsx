"use client"

import React, { useState, useMemo, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import type { calculateVendorTCO } from "@/lib/tco-calculator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  Legend as ReLegend,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
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
  SlidersHorizontal,
  InfoIcon,
  MoonIcon,
  SunIcon,
  TrendingUpIcon,
  Filter,
  Settings,
  Search,
  X,
  Upload,
  Save,
  Building,
  Zap,
  ChevronsLeft,
  ChevronsRight,
  Activity,
  TrendingUp,
  Maximize2,
  Minimize2,
  Star,
  Target,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Timer,
  Briefcase,
  Calculator,
} from "lucide-react"

type CalculationResult = NonNullable<ReturnType<typeof calculateVendorTCO>> & { id?: string }

// Enhanced Modern Color Palette
const MODERN_COLORS = {
  primary: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e",
  },
  gradients: {
    ocean: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    sunset: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    aurora: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    cosmic: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    cyber: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
    neon: "linear-gradient(135deg, #08fdd8 0%, #00d4aa 50%, #0693e3 100%)",
    matrix: "linear-gradient(135deg, #00ff88 0%, #00d4aa 50%, #0693e3 100%)",
    hologram: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    glass: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
    glassDark: "linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%)",
    portnox: "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)",
    cisco: "linear-gradient(135deg, #1ba1e2 0%, #0078d4 50%, #005a9e 100%)",
    aruba: "linear-gradient(135deg, #ff6900 0%, #e55100 50%, #bf360c 100%)",
    microsoft: "linear-gradient(135deg, #00bcf2 0%, #0078d4 50%, #106ebe 100%)",
    success: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
    warning: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
    danger: "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
    info: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)",
  },
}

// Enhanced Animation Variants
const modernAnimations = {
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
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
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
  scaleHover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  rotateHover: {
    rotate: [0, 5, -5, 0],
    transition: { duration: 0.5 },
  },
}

// Complete Vendor Data with all 14 vendors
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
        "Zero Trust": true,
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
        "IoT Security": true,
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
  foxpass: {
    id: "foxpass",
    name: "Foxpass",
    category: "Cloud RADIUS",
    marketShare: 1.8,
    logo: "/foxpass-logo.png",
    description: "Cloud-hosted RADIUS and LDAP for Wi-Fi and VPN",
    priceIndicator: "$",
    difficulty: 1,
    features: {
      core: {
        "802.1X": true,
        "Risk-Based Auth": false,
        "Device Profiling": false,
        "Policy Automation": false,
        "Cloud Management": true,
        "API Integration": true,
        "Real-time Monitoring": false,
        "Automated Remediation": false,
        SSO: true,
        TACACS: false,
        "Guest Portal": false,
        PKI: false,
        RADIUS: true,
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: false,
        "Threat Detection": false,
        "Compliance Automation": false,
        "Multi-tenant": true,
        "IoT Security": false,
      },
    },
    implementation: {
      deploymentTime: { poc: 8, fullDeployment: 120, fullScale: 120 },
      complexity: "Low",
      requiresHardware: false,
      cloudNative: true,
    },
    pricing: {
      model: "Per user/month",
      startingPrice: 2.5,
      enterprise: 3.2,
    },
    roi: {
      breachRiskReduction: 0.35,
      operationalEfficiency: 0.4,
      complianceAutomation: 0.2,
    },
    strengths: ["Very simple setup", "Cloud RADIUS/LDAP", "Affordable", "Quick deployment"],
    weaknesses: ["Limited NAC features", "Basic functionality", "No device profiling", "Authentication only"],
  },
  securew2: {
    id: "securew2",
    name: "SecureW2",
    category: "Certificate-based",
    marketShare: 2.3,
    logo: "/securew2-logo.png",
    description: "Cloud-based PKI and certificate management for secure Wi-Fi",
    priceIndicator: "$$",
    difficulty: 2,
    features: {
      core: {
        "802.1X": true,
        "Risk-Based Auth": false,
        "Device Profiling": false,
        "Policy Automation": false,
        "Cloud Management": true,
        "API Integration": true,
        "Real-time Monitoring": false,
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
        "Threat Detection": false,
        "Compliance Automation": false,
        "Multi-tenant": true,
        "IoT Security": false,
      },
    },
    implementation: {
      deploymentTime: { poc: 24, fullDeployment: 360, fullScale: 360 },
      complexity: "Low",
      requiresHardware: false,
      cloudNative: true,
    },
    pricing: {
      model: "Per user/year",
      startingPrice: 3.8,
      enterprise: 4.5,
    },
    roi: {
      breachRiskReduction: 0.4,
      operationalEfficiency: 0.45,
      complianceAutomation: 0.3,
    },
    strengths: ["Strong certificate management", "EAP-TLS focus", "Cloud PKI", "Easy certificate deployment"],
    weaknesses: ["Limited to authentication", "No device visibility", "Certificate-only approach", "Narrow use case"],
  },
  arista: {
    id: "arista",
    name: "Arista AGNI",
    category: "Cloud-Native NAC",
    marketShare: 2.5,
    logo: "/arista-logo.png",
    description: "Cloud-native NAC service integrated with Arista's CloudVision.",
    priceIndicator: "$$$",
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
        "Compliance Automation": false,
        "Multi-tenant": true,
        "IoT Security": true,
      },
    },
    implementation: {
      deploymentTime: { poc: 60, fullDeployment: 960, fullScale: 960 },
      complexity: "Medium",
      requiresHardware: false,
      cloudNative: true,
    },
    pricing: {
      model: "Subscription per device",
      startingPrice: 6.0,
      enterprise: 7.5,
    },
    roi: {
      breachRiskReduction: 0.72,
      operationalEfficiency: 0.68,
      complianceAutomation: 0.6,
    },
    strengths: ["Deep integration with Arista ecosystem", "CloudVision management", "Strong for data center & campus"],
    weaknesses: ["Best value within Arista environments", "Newer entrant in NAC space"],
  },
}

// Enhanced Vendor Selection Panel Component (Toned Down)
const VendorSelectionPanel = ({
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
  const filteredVendors = Object.values(VENDOR_DATA).filter((vendor) =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const VendorCard = ({ vendor }: { vendor: any }) => {
    const isSelected = selectedVendors.includes(vendor.id)
    const isPortnox = vendor.id === "portnox"

    return (
      <Card
        onClick={() => onVendorToggle(vendor.id)}
        className={cn(
          "cursor-pointer transition-all duration-200 h-full",
          isSelected ? "ring-2 ring-primary/50 bg-primary/5" : "hover:bg-muted/50",
        )}
      >
        <CardHeader className="p-3 pb-2">
          <div className="flex items-center justify-between mb-2">
            <Image
              src={vendor.logo || "/placeholder.svg"}
              alt={vendor.name}
              width={60}
              height={20}
              className="h-5 object-contain"
            />
            {isPortnox && <Star className="w-3 h-3 text-yellow-400 fill-current" />}
            {isSelected && <CheckCircle className="w-4 h-4 text-primary" />}
          </div>
          <CardTitle className="text-sm font-semibold leading-tight">{vendor.name}</CardTitle>
          <p className="text-xs text-muted-foreground">{vendor.category}</p>
        </CardHeader>
        <CardContent className="p-3 pt-0 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Price</span>
            <span className="font-medium">{vendor.priceIndicator}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Difficulty</span>
            <Badge variant="outline" className="text-xs px-1 py-0">
              {vendor.difficulty}/5
            </Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      animate={{ width: isCollapsed ? 0 : 320 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "border-r flex flex-col flex-shrink-0 overflow-hidden",
        darkMode ? "bg-background border-border" : "bg-background border-border",
      )}
    >
      <div className="w-[320px] flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm">Vendor Selection</h3>
            <Badge variant="secondary" className="text-xs">
              {selectedVendors.length} selected
            </Badge>
          </div>
          <div className="relative">
            <Search className="h-3 w-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-7 h-8 text-xs"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 grid grid-cols-2 gap-3">
            {filteredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t text-xs text-muted-foreground text-center">
          {filteredVendors.length} vendors available
        </div>
      </div>
    </motion.div>
  )
}

// Enhanced Styled Components
const ModernGradientCard = ({
  children,
  className,
  gradient = "hologram",
  darkMode,
  glow = false,
  ...props
}: {
  children: React.ReactNode
  className?: string
  gradient?: keyof typeof MODERN_COLORS.gradients
  darkMode?: boolean
  glow?: boolean
  [key: string]: any
}) => (
  <motion.div
    className={cn(
      "relative overflow-hidden transition-all duration-300 border rounded-xl",
      "backdrop-blur-sm bg-card/50",
      "hover:shadow-lg",
      className,
    )}
    whileHover={{ y: -4, scale: 1.01 }}
    animate={glow ? modernAnimations.glowPulse : {}}
    {...props}
  >
    <div className="absolute inset-0 opacity-5" style={{ background: MODERN_COLORS.gradients[gradient] }} />
    <div className="relative z-10">{children}</div>
  </motion.div>
)

// Enhanced KPI Card
const ModernKPICard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  color = "primary",
  darkMode,
  sparklineData,
  interactive = true,
  size = "default",
}: {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ElementType
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  color?: string
  darkMode?: boolean
  sparklineData?: any[]
  interactive?: boolean
  size?: "small" | "default" | "large"
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Activity

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border transition-all duration-300",
        "backdrop-blur-sm bg-card/50",
        size === "small" && "p-3",
        size === "default" && "p-4",
        size === "large" && "p-6",
      )}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => interactive && setIsExpanded(!isExpanded)}
      style={{ cursor: interactive ? "pointer" : "default" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">{title}</h3>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        {interactive && (
          <button className="p-1 rounded hover:bg-muted/50 transition-colors">
            {isExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
          </button>
        )}
      </div>

      <div className="text-2xl font-bold mb-2 text-foreground">{value}</div>

      {trend && trendValue && (
        <div className="flex items-center space-x-2 mb-3">
          <div
            className={cn(
              "p-1 rounded",
              trend === "up" ? "bg-green-500/20" : trend === "down" ? "bg-red-500/20" : "bg-gray-500/20",
            )}
          >
            <TrendIcon
              className={cn(
                "h-3 w-3",
                trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600",
              )}
            />
          </div>
          <span
            className={cn(
              "text-xs font-medium",
              trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600",
            )}
          >
            {trendValue}
          </span>
        </div>
      )}

      {sparklineData && sparklineData.length > 0 && (
        <div className="h-12 -mx-2 -mb-2 mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData}>
              <defs>
                <linearGradient id={`sparkline-${color}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#14b8a6"
                strokeWidth={2}
                fill={`url(#sparkline-${color})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t space-y-2 text-xs"
          >
            <div className="flex justify-between">
              <span className="text-muted-foreground">Previous Period:</span>
              <span className="font-medium">$2.1M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Growth Rate:</span>
              <span className="text-green-600 font-medium">+23.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Benchmark:</span>
              <span className="font-medium">Industry Avg</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
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
            className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border shadow-2xl bg-background"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Settings & Configuration</h2>
                  <p className="text-sm text-muted-foreground">Customize your TCO analysis parameters</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-1.5" />
                  Save Changes
                </Button>
                <Button size="sm" variant="outline" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="border-b">
              <div className="flex space-x-8 px-6">
                {[
                  { id: "organization", label: "Organization", icon: <Building /> },
                  { id: "pricing", label: "Pricing", icon: <DollarSign /> },
                  { id: "preferences", label: "Preferences", icon: <Settings /> },
                  { id: "advanced", label: "Advanced", icon: <Zap /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center space-x-2 py-4 border-b-2 transition-all duration-200",
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {React.cloneElement(tab.icon, { className: "h-4 w-4" })}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <ScrollArea className="h-[60vh] p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "organization" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Organization Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Number of Devices</Label>
                          <Input
                            type="number"
                            value={customDevices}
                            onChange={(e) => setCustomDevices(Number(e.target.value))}
                          />
                          <p className="text-xs text-muted-foreground">Include all network-connected devices</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Number of Users</Label>
                          <Input
                            type="number"
                            value={customUsers}
                            onChange={(e) => setCustomUsers(Number(e.target.value))}
                          />
                          <p className="text-xs text-muted-foreground">Total user accounts requiring access</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Industry</Label>
                          <Select value={industry} onValueChange={setIndustry}>
                            <SelectTrigger>
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
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Geographic Region</Label>
                          <Select value={region} onValueChange={setRegion}>
                            <SelectTrigger>
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
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Analysis Period</Label>
                        <div className="px-3">
                          <Slider
                            value={[projectionYears]}
                            onValueChange={(value) => setProjectionYears(value[0])}
                            max={7}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>1 year</span>
                            <span className="font-medium text-primary">{projectionYears} years</span>
                            <span>7 years</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Recommended: 3-5 years for accurate ROI analysis
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "pricing" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Pricing Configuration</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Portnox Base Price (per device/month)</Label>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-muted-foreground">$</span>
                            <Input
                              type="number"
                              step="0.1"
                              value={portnoxBasePrice}
                              onChange={(e) => setPortnoxBasePrice(Number(e.target.value))}
                              className="w-32"
                            />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Portnox Add-ons</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {Object.entries({
                              atp: "Advanced Threat Protection (+$0.50/device)",
                              compliance: "Compliance Automation (+$0.30/device)",
                              iot: "IoT Security (+$0.40/device)",
                              analytics: "Advanced Analytics (+$0.25/device)",
                            }).map(([key, label]) => (
                              <div key={key} className="flex items-center justify-between p-3 rounded-lg border">
                                <span className="text-sm font-medium">{label}</span>
                                <Switch
                                  checked={portnoxAddons[key]}
                                  onCheckedChange={(checked) => setPortnoxAddons({ ...portnoxAddons, [key]: checked })}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "preferences" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Display Preferences</h3>
                      <p className="text-sm text-muted-foreground">
                        Customize how data is displayed in charts and reports
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 rounded-lg border space-y-4">
                          <h4 className="font-medium">Chart Preferences</h4>
                          <div className="space-y-3">
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
                        </div>
                        <div className="p-4 rounded-lg border space-y-4">
                          <h4 className="font-medium">Data Display</h4>
                          <div className="space-y-3">
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
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "advanced" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold">Advanced Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        Advanced configuration options for detailed analysis
                      </p>
                      <div className="space-y-6">
                        <div className="p-4 rounded-lg border space-y-4">
                          <h4 className="font-medium">Calculation Parameters</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm">Discount Rate (%)</Label>
                              <Input type="number" defaultValue="8" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">Inflation Rate (%)</Label>
                              <Input type="number" defaultValue="3" />
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
                              <Input type="number" defaultValue="5" />
                            </div>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg border space-y-4">
                          <h4 className="font-medium">Export & Integration</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Auto-export Reports</span>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">API Access</span>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Real-time Updates</span>
                              <Switch defaultChecked />
                            </div>
                          </div>
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

// Enhanced Executive Dashboard Component
const ExecutiveDashboard = ({ calculations, darkMode }: { calculations: CalculationResult[]; darkMode: boolean }) => {
  const [selectedMetric, setSelectedMetric] = useState("tco")
  const [timeRange, setTimeRange] = useState("5y")
  const [viewMode, setViewMode] = useState("overview")

  // Calculate aggregate metrics
  const totalTCO = calculations.reduce((sum, calc) => sum + calc.totalTCO, 0)
  const avgROI = calculations.reduce((sum, calc) => sum + (calc.roi?.totalROI || 0), 0) / calculations.length
  const totalSavings = calculations.reduce((sum, calc) => sum + (calc.roi?.totalSavings || 0), 0)
  const avgPaybackPeriod =
    calculations.reduce((sum, calc) => sum + (calc.roi?.paybackPeriod || 0), 0) / calculations.length

  // Generate sparkline data
  const generateSparklineData = (baseValue: number, trend: "up" | "down" | "neutral" = "up") => {
    const data = []
    const variation = baseValue * 0.1
    for (let i = 0; i < 12; i++) {
      const trendFactor = trend === "up" ? i * 0.05 : trend === "down" ? -i * 0.03 : 0
      const randomVariation = (Math.random() - 0.5) * variation
      data.push({
        month: i + 1,
        value: baseValue + trendFactor * baseValue + randomVariation,
      })
    }
    return data
  }

  // FTE Analysis Data
  const fteAnalysisData = [
    { vendor: "Portnox", currentFTE: 0.5, projectedFTE: 0.3, savings: 0.2, efficiency: 95 },
    { vendor: "Cisco ISE", currentFTE: 3.2, projectedFTE: 2.8, savings: 0.4, efficiency: 65 },
    { vendor: "Aruba", currentFTE: 2.1, projectedFTE: 1.8, savings: 0.3, efficiency: 72 },
    { vendor: "Microsoft", currentFTE: 1.8, projectedFTE: 1.5, savings: 0.3, efficiency: 78 },
  ]

  // Operations Analysis Data
  const operationsData = [
    { category: "Deployment", portnox: 7, cisco: 120, aruba: 90, microsoft: 45 },
    { category: "Configuration", portnox: 2, cisco: 40, aruba: 30, microsoft: 20 },
    { category: "Maintenance", portnox: 1, cisco: 8, aruba: 6, microsoft: 4 },
    { category: "Troubleshooting", portnox: 0.5, cisco: 12, aruba: 8, microsoft: 6 },
    { category: "Updates", portnox: 0, cisco: 4, aruba: 3, microsoft: 2 },
  ]

  // Implementation Timeline Data
  const timelineData = [
    { phase: "Planning", portnox: 3, cisco: 14, aruba: 10, microsoft: 7 },
    { phase: "Procurement", portnox: 5, cisco: 21, aruba: 14, microsoft: 10 },
    { phase: "Installation", portnox: 1, cisco: 30, aruba: 21, microsoft: 14 },
    { phase: "Configuration", portnox: 2, cisco: 45, aruba: 30, microsoft: 21 },
    { phase: "Testing", portnox: 3, cisco: 14, aruba: 10, microsoft: 7 },
    { phase: "Rollout", portnox: 7, cisco: 60, aruba: 45, microsoft: 30 },
  ]

  // Vendor Cost Breakdown Data
  const vendorCostData = calculations.map((calc) => ({
    vendor: calc.vendor,
    licensing: calc.yearlyBreakdown?.[0]?.licensing || 0,
    hardware: calc.yearlyBreakdown?.[0]?.hardware || 0,
    implementation: calc.yearlyBreakdown?.[0]?.implementation || 0,
    support: calc.yearlyBreakdown?.[0]?.support || 0,
    operational: calc.yearlyBreakdown?.[0]?.operational || 0,
    total: calc.totalTCO,
  }))

  return (
    <div className="space-y-6">
      {/* Executive Summary Header */}
      <motion.div
        className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/5 via-background to-primary/5 p-6"
        variants={modernAnimations.slideInUp}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Executive Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive TCO analysis across {calculations.length} vendors
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1y">1 Year</SelectItem>
                  <SelectItem value="3y">3 Years</SelectItem>
                  <SelectItem value="5y">5 Years</SelectItem>
                  <SelectItem value="7y">7 Years</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ModernKPICard
              title="Total TCO"
              value={`$${(totalTCO / 1000000).toFixed(1)}M`}
              subtitle="5-year projection"
              icon={DollarSign}
              trend="down"
              trendValue="-23.5%"
              darkMode={darkMode}
              sparklineData={generateSparklineData(totalTCO, "down")}
            />
            <ModernKPICard
              title="Average ROI"
              value={`${(avgROI * 100).toFixed(0)}%`}
              subtitle="Return on investment"
              icon={TrendingUp}
              trend="up"
              trendValue="+15.2%"
              darkMode={darkMode}
              sparklineData={generateSparklineData(avgROI * 100, "up")}
            />
            <ModernKPICard
              title="Total Savings"
              value={`$${(totalSavings / 1000000).toFixed(1)}M`}
              subtitle="vs. status quo"
              icon={Target}
              trend="up"
              trendValue="+$2.1M"
              darkMode={darkMode}
              sparklineData={generateSparklineData(totalSavings, "up")}
            />
            <ModernKPICard
              title="Payback Period"
              value={`${avgPaybackPeriod.toFixed(1)} mo`}
              subtitle="Average across vendors"
              icon={Clock}
              trend="down"
              trendValue="-3.2 mo"
              darkMode={darkMode}
              sparklineData={generateSparklineData(avgPaybackPeriod, "down")}
            />
          </div>
        </div>
      </motion.div>

      {/* View Mode Selector */}
      <div className="flex items-center justify-between">
        <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="fte">FTE Analysis</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Dynamic Content Based on View Mode */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* TCO Comparison Chart */}
              <ModernGradientCard gradient="hologram" darkMode={darkMode} className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span>Total Cost of Ownership Comparison</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={vendorCostData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="vendor" />
                        <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                        <ReTooltip
                          formatter={(value: any) => [`$${(value / 1000000).toFixed(2)}M`, ""]}
                          labelFormatter={(label) => `Vendor: ${label}`}
                        />
                        <ReLegend />
                        <Bar dataKey="licensing" stackId="a" fill="#14b8a6" name="Licensing" />
                        <Bar dataKey="hardware" stackId="a" fill="#0d9488" name="Hardware" />
                        <Bar dataKey="implementation" stackId="a" fill="#0f766e" name="Implementation" />
                        <Bar dataKey="support" stackId="a" fill="#115e59" name="Support" />
                        <Bar dataKey="operational" stackId="a" fill="#134e4a" name="Operational" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </ModernGradientCard>

              {/* ROI Comparison */}
              <ModernGradientCard gradient="aurora" darkMode={darkMode}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>ROI Comparison</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={calculations.map((calc) => ({
                          vendor: calc.vendor,
                          roi: (calc.roi?.totalROI || 0) * 100,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="vendor" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <ReTooltip formatter={(value: any) => [`${value.toFixed(1)}%`, "ROI"]} />
                        <Bar dataKey="roi" fill="#14b8a6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </ModernGradientCard>

              {/* Risk Assessment */}
              <ModernGradientCard gradient="sunset" darkMode={darkMode}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Risk Assessment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        data={[
                          { subject: "Security", portnox: 95, cisco: 85, aruba: 80, microsoft: 75 },
                          { subject: "Scalability", portnox: 90, cisco: 95, aruba: 85, microsoft: 80 },
                          { subject: "Ease of Use", portnox: 95, cisco: 60, aruba: 70, microsoft: 75 },
                          { subject: "Integration", portnox: 85, cisco: 90, aruba: 80, microsoft: 95 },
                          { subject: "Support", portnox: 85, cisco: 95, aruba: 85, microsoft: 90 },
                          { subject: "Innovation", portnox: 95, cisco: 70, aruba: 75, microsoft: 80 },
                        ]}
                      >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar name="Portnox" dataKey="portnox" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.1} />
                        <Radar name="Cisco" dataKey="cisco" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                        <Radar name="Aruba" dataKey="aruba" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
                        <Radar name="Microsoft" dataKey="microsoft" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} />
                        <ReLegend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </ModernGradientCard>
            </div>
          )}

          {viewMode === "fte" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* FTE Requirements Chart */}
              <ModernGradientCard gradient="cyber" darkMode={darkMode} className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>FTE Requirements Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={fteAnalysisData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="vendor" />
                        <YAxis />
                        <ReTooltip />
                        <ReLegend />
                        <Bar dataKey="currentFTE" fill="#ef4444" name="Current FTE Required" />
                        <Bar dataKey="projectedFTE" fill="#14b8a6" name="Projected FTE Required" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </ModernGradientCard>

              {/* FTE Savings */}
              <ModernGradientCard gradient="neon" darkMode={darkMode}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <span>FTE Cost Savings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fteAnalysisData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">{item.vendor}</p>
                          <p className="text-sm text-muted-foreground">{item.savings.toFixed(1)} FTE saved</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            ${((item.savings * 120000) / 1000).toFixed(0)}K/year
                          </p>
                          <p className="text-xs text-muted-foreground">Annual savings</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </ModernGradientCard>

              {/* Efficiency Metrics */}
              <ModernGradientCard gradient="matrix" darkMode={darkMode}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <span>Operational Efficiency</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={fteAnalysisData.map((item) => ({
                            name: item.vendor,
                            value: item.efficiency,
                          }))}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {fteAnalysisData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={["#14b8a6", "#3b82f6", "#f59e0b", "#8b5cf6"][index]} />
                          ))}
                        </Pie>
                        <ReTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </ModernGradientCard>
            </div>
          )}

          {viewMode === "operations" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Operations Comparison */}
              <ModernGradientCard gradient="hologram" darkMode={darkMode} className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <SlidersHorizontal className="h-5 w-5 text-primary" />
                    <span>Operational Complexity Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={operationsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="category" />
                        <YAxis tickFormatter={(value) => `${value}h`} />
                        <ReTooltip formatter={(value: any) => [`${value} hours`, ""]} />
                        <ReLegend />
                        <Bar dataKey="portnox" fill="#14b8a6" name="Portnox" />
                        <Bar dataKey="cisco" fill="#3b82f6" name="Cisco ISE" />
                        <Bar dataKey="aruba" fill="#f59e0b" name="Aruba" />
                        <Bar dataKey="microsoft" fill="#8b5cf6" name="Microsoft" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </ModernGradientCard>

              {/* Maintenance Overhead */}
              <ModernGradientCard gradient="aurora" darkMode={darkMode}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <span>Monthly Maintenance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { vendor: "Portnox", hours: 2, cost: 400 },
                      { vendor: "Cisco ISE", hours: 32, cost: 6400 },
                      { vendor: "Aruba", hours: 24, cost: 4800 },
                      { vendor: "Microsoft", hours: 16, cost: 3200 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">{item.vendor}</p>
                          <p className="text-sm text-muted-foreground">{item.hours} hours/month</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${item.cost.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Monthly cost</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </ModernGradientCard>

              {/* Automation Level */}
              <ModernGradientCard gradient="sunset" darkMode={darkMode}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <span>Automation Level</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { vendor: "Portnox", automation: 95, color: "#14b8a6" },
                      { vendor: "Cisco ISE", automation: 45, color: "#3b82f6" },
                      { vendor: "Aruba", automation: 60, color: "#f59e0b" },
                      { vendor: "Microsoft", automation: 70, color: "#8b5cf6" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{item.vendor}</span>
                          <span className="text-sm font-bold">{item.automation}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${item.automation}%`,
                              backgroundColor: item.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </ModernGradientCard>
            </div>
          )}

          {viewMode === "timeline" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Implementation Timeline */}
              <ModernGradientCard gradient="cyber" darkMode={darkMode} className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Implementation Timeline Comparison</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="phase" />
                        <YAxis tickFormatter={(value) => `${value}d`} />
                        <ReTooltip formatter={(value: any) => [`${value} days`, ""]} />
                        <ReLegend />
                        <Bar dataKey="portnox" fill="#14b8a6" name="Portnox" />
                        <Bar dataKey="cisco" fill="#3b82f6" name="Cisco ISE" />
                        <Bar dataKey="aruba" fill="#f59e0b" name="Aruba" />
                        <Bar dataKey="microsoft" fill="#8b5cf6" name="Microsoft" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </ModernGradientCard>

              {/* Time to Value */}
              <ModernGradientCard gradient="neon" darkMode={darkMode}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Timer className="h-5 w-5 text-primary" />
                    <span>Time to Value</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { vendor: "Portnox", days: 21, value: "Full ROI" },
                      { vendor: "Cisco ISE", days: 184, value: "Partial ROI" },
                      { vendor: "Aruba", days: 140, value: "Partial ROI" },
                      { vendor: "Microsoft", days: 89, value: "Moderate ROI" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">{item.vendor}</p>
                          <p className="text-sm text-muted-foreground">{item.value}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{item.days} days</p>
                          <p className="text-xs text-muted-foreground">To realize value</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </ModernGradientCard>

              {/* Risk Timeline */}
              <ModernGradientCard gradient="matrix" darkMode={darkMode}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    <span>Implementation Risk</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { vendor: "Portnox", risk: "Low", score: 15, color: "#10b981" },
                      { vendor: "Cisco ISE", risk: "Very High", score: 85, color: "#ef4444" },
                      { vendor: "Aruba", risk: "High", score: 70, color: "#f59e0b" },
                      { vendor: "Microsoft", risk: "Medium", score: 45, color: "#3b82f6" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{item.vendor}</span>
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{ borderColor: item.color, color: item.color }}
                          >
                            {item.risk}
                          </Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${item.score}%`,
                              backgroundColor: item.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </ModernGradientCard>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Main TCO Analyzer Component
export default function TCOAnalyzer() {
  // State management
  const [selectedVendors, setSelectedVendors] = useState<string[]>(["portnox", "cisco", "aruba", "microsoft"])
  const [activeTab, setActiveTab] = useState("dashboard")
  const [activeSubTab, setActiveSubTab] = useState("cost-breakdown")
  const [darkMode, setDarkMode] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isVendorPanelCollapsed, setIsVendorPanelCollapsed] = useState(false)

  // Configuration state
  const [orgSizeKey, setOrgSizeKey] = useState("medium")
  const [customDevices, setCustomDevices] = useState(2500)
  const [customUsers, setCustomUsers] = useState(1500)
  const [industry, setIndustry] = useState("technology")
  const [region, setRegion] = useState("north-america")
  const [projectionYears, setProjectionYears] = useState(5)
  const [portnoxBasePrice, setPortnoxBasePrice] = useState(3.5)
  const [portnoxAddons, setPortnoxAddons] = useState({
    atp: true,
    compliance: true,
    iot: false,
    analytics: true,
  })

  // Calculate TCO for selected vendors
  const calculations = useMemo(() => {
    return selectedVendors
      .map((vendorId) => {
        const vendor = VENDOR_DATA[vendorId]
        if (!vendor) return null

        // Mock calculation - replace with actual TCO calculation logic
        const basePrice = vendor.pricing.startingPrice
        const devices = orgSizeKey === "custom" ? customDevices : initialOrgSizeDetails[orgSizeKey].devices
        const users = orgSizeKey === "custom" ? customUsers : initialOrgSizeDetails[orgSizeKey].users

        const yearlyLicensing = basePrice * devices * 12
        const yearlyHardware = vendor.implementation.requiresHardware ? devices * 0.5 * 12 : 0
        const yearlyImplementation = vendor.implementation.deploymentTime.fullDeployment * 200
        const yearlySupport = yearlyLicensing * 0.2
        const yearlyOperational = devices * 0.1 * 12

        const totalYearlyCost =
          yearlyLicensing + yearlyHardware + yearlyImplementation + yearlySupport + yearlyOperational
        const totalTCO = totalYearlyCost * projectionYears

        // ROI calculation
        const breachRiskReduction = vendor.roi.breachRiskReduction
        const operationalEfficiency = vendor.roi.operationalEfficiency
        const complianceAutomation = vendor.roi.complianceAutomation

        const breachCostAvoidance = devices * 1000 * breachRiskReduction * projectionYears
        const operationalSavings = users * 500 * operationalEfficiency * projectionYears
        const complianceSavings = devices * 200 * complianceAutomation * projectionYears

        const totalSavings = breachCostAvoidance + operationalSavings + complianceSavings
        const netBenefit = totalSavings - totalTCO
        const roi = netBenefit / totalTCO
        const paybackPeriod = totalTCO / (totalSavings / projectionYears / 12)

        return {
          id: vendorId,
          vendor: vendor.name,
          totalTCO,
          yearlyBreakdown: Array.from({ length: projectionYears }, (_, year) => ({
            year: year + 1,
            licensing: yearlyLicensing,
            hardware: year === 0 ? yearlyHardware : 0,
            implementation: year === 0 ? yearlyImplementation : 0,
            support: yearlySupport,
            operational: yearlyOperational,
            total: year === 0 ? totalYearlyCost : yearlyLicensing + yearlySupport + yearlyOperational,
          })),
          roi: {
            totalROI: roi,
            totalSavings,
            netBenefit,
            paybackPeriod,
            breachCostAvoidance,
            operationalSavings,
            complianceSavings,
          },
        }
      })
      .filter(Boolean) as CalculationResult[]
  }, [selectedVendors, orgSizeKey, customDevices, customUsers, projectionYears, portnoxBasePrice, portnoxAddons])

  // Vendor toggle handler
  const handleVendorToggle = useCallback((vendorId: string) => {
    setSelectedVendors((prev) => {
      if (prev.includes(vendorId)) {
        return prev.filter((id) => id !== vendorId)
      } else {
        return [...prev, vendorId]
      }
    })
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "s":
            event.preventDefault()
            setIsSettingsOpen(true)
            break
          case "d":
            event.preventDefault()
            setDarkMode(!darkMode)
            break
          case "f":
            event.preventDefault()
            setIsVendorPanelCollapsed(!isVendorPanelCollapsed)
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [darkMode, isVendorPanelCollapsed])

  return (
    <TooltipProvider>
      <div className={cn("min-h-screen transition-colors duration-300", darkMode ? "dark" : "")}>
        <div className="flex h-screen bg-background text-foreground">
          {/* Vendor Selection Panel */}
          <VendorSelectionPanel
            selectedVendors={selectedVendors}
            onVendorToggle={handleVendorToggle}
            darkMode={darkMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isCollapsed={isVendorPanelCollapsed}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsVendorPanelCollapsed(!isVendorPanelCollapsed)}
                    className="p-2"
                  >
                    {isVendorPanelCollapsed ? (
                      <ChevronsRight className="h-4 w-4" />
                    ) : (
                      <ChevronsLeft className="h-4 w-4" />
                    )}
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Image src="/portnox-logo-color.png" alt="Portnox" width={120} height={32} className="h-8 w-auto" />
                    <Separator orientation="vertical" className="h-6" />
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      TCO Analyzer
                    </h1>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-xs">
                    {selectedVendors.length} vendors selected
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsSettingsOpen(true)}>
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </header>

            {/* Main Navigation */}
            <div className="border-b">
              <div className="px-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-5 bg-transparent h-12">
                    {MAIN_TABS_CONFIG.map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="flex items-center space-x-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                      >
                        {React.cloneElement(tab.icon, { className: "h-4 w-4" })}
                        <span className="hidden sm:inline">{tab.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Sub Navigation (for Analysis and Comparison tabs) */}
            {(activeTab === "analysis" || activeTab === "comparison") && (
              <div className="border-b bg-muted/30">
                <div className="px-6">
                  <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
                    <TabsList className="bg-transparent h-10">
                      {(activeTab === "analysis" ? ANALYSIS_SUB_TABS : COMPARISON_SUB_TABS).map((tab) => (
                        <TabsTrigger
                          key={tab.value}
                          value={tab.value}
                          className="flex items-center space-x-2 text-xs data-[state=active]:bg-background data-[state=active]:text-primary"
                        >
                          {React.cloneElement(tab.icon, { className: "h-3 w-3" })}
                          <span>{tab.label}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "dashboard" && (
                      <ExecutiveDashboard calculations={calculations} darkMode={darkMode} />
                    )}

                    {activeTab === "analysis" && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-2xl font-bold">TCO Analysis</h2>
                            <p className="text-muted-foreground">Detailed cost breakdown and analysis</p>
                          </div>
                        </div>

                        {activeSubTab === "cost-breakdown" && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <ModernGradientCard
                              gradient="hologram"
                              darkMode={darkMode}
                              className="col-span-1 lg:col-span-2"
                            >
                              <CardHeader>
                                <CardTitle>Cost Breakdown by Category</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="h-80">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                      data={calculations.map((calc) => ({
                                        vendor: calc.vendor,
                                        licensing: calc.yearlyBreakdown?.[0]?.licensing || 0,
                                        hardware: calc.yearlyBreakdown?.[0]?.hardware || 0,
                                        implementation: calc.yearlyBreakdown?.[0]?.implementation || 0,
                                        support: calc.yearlyBreakdown?.[0]?.support || 0,
                                        operational: calc.yearlyBreakdown?.[0]?.operational || 0,
                                      }))}
                                    >
                                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                      <XAxis dataKey="vendor" />
                                      <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                                      <ReTooltip formatter={(value: any) => [`$${(value / 1000).toFixed(1)}K`, ""]} />
                                      <ReLegend />
                                      <Bar dataKey="licensing" stackId="a" fill="#14b8a6" name="Licensing" />
                                      <Bar dataKey="hardware" stackId="a" fill="#0d9488" name="Hardware" />
                                      <Bar dataKey="implementation" stackId="a" fill="#0f766e" name="Implementation" />
                                      <Bar dataKey="support" stackId="a" fill="#115e59" name="Support" />
                                      <Bar dataKey="operational" stackId="a" fill="#134e4a" name="Operational" />
                                    </BarChart>
                                  </ResponsiveContainer>
                                </div>
                              </CardContent>
                            </ModernGradientCard>
                          </div>
                        )}

                        {activeSubTab === "roi-analysis" && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <ModernGradientCard gradient="aurora" darkMode={darkMode}>
                              <CardHeader>
                                <CardTitle>ROI Comparison</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="h-64">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                      data={calculations.map((calc) => ({
                                        vendor: calc.vendor,
                                        roi: (calc.roi?.totalROI || 0) * 100,
                                      }))}
                                    >
                                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                      <XAxis dataKey="vendor" />
                                      <YAxis tickFormatter={(value) => `${value}%`} />
                                      <ReTooltip formatter={(value: any) => [`${value.toFixed(1)}%`, "ROI"]} />
                                      <Bar dataKey="roi" fill="#14b8a6" />
                                    </BarChart>
                                  </ResponsiveContainer>
                                </div>
                              </CardContent>
                            </ModernGradientCard>

                            <ModernGradientCard gradient="sunset" darkMode={darkMode}>
                              <CardHeader>
                                <CardTitle>Payback Period</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="h-64">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                      data={calculations.map((calc) => ({
                                        vendor: calc.vendor,
                                        payback: calc.roi?.paybackPeriod || 0,
                                      }))}
                                    >
                                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                      <XAxis dataKey="vendor" />
                                      <YAxis tickFormatter={(value) => `${value.toFixed(1)}mo`} />
                                      <ReTooltip
                                        formatter={(value: any) => [`${value.toFixed(1)} months`, "Payback"]}
                                      />
                                      <Bar dataKey="payback" fill="#f59e0b" />
                                    </BarChart>
                                  </ResponsiveContainer>
                                </div>
                              </CardContent>
                            </ModernGradientCard>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "comparison" && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-2xl font-bold">Vendor Comparison</h2>
                            <p className="text-muted-foreground">Side-by-side comparison of selected vendors</p>
                          </div>
                        </div>

                        {activeSubTab === "feature-matrix" && (
                          <div className="space-y-6">
                            <ModernGradientCard gradient="cyber" darkMode={darkMode}>
                              <CardHeader>
                                <CardTitle>Feature Comparison Matrix</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="overflow-x-auto">
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="border-b">
                                        <th className="text-left p-2">Feature</th>
                                        {selectedVendors.map((vendorId) => (
                                          <th key={vendorId} className="text-center p-2">
                                            {VENDOR_DATA[vendorId]?.name}
                                          </th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {Object.keys(VENDOR_DATA.portnox.features.core).map((feature) => (
                                        <tr key={feature} className="border-b">
                                          <td className="p-2 font-medium">{feature}</td>
                                          {selectedVendors.map((vendorId) => (
                                            <td key={vendorId} className="text-center p-2">
                                              {VENDOR_DATA[vendorId]?.features.core[feature] ? (
                                                <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                                              ) : (
                                                <X className="h-4 w-4 text-red-500 mx-auto" />
                                              )}
                                            </td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </CardContent>
                            </ModernGradientCard>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "compliance" && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-2xl font-bold">Compliance & Risk Analysis</h2>
                            <p className="text-muted-foreground">Security compliance and risk assessment</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <ModernGradientCard gradient="matrix" darkMode={darkMode}>
                            <CardHeader>
                              <CardTitle className="flex items-center space-x-2">
                                <Shield className="h-5 w-5 text-primary" />
                                <span>Compliance Coverage</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {["SOC 2", "ISO 27001", "HIPAA", "PCI DSS", "GDPR"].map((standard, index) => (
                                  <div key={standard} className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="font-medium">{standard}</span>
                                      <span className="text-sm text-muted-foreground">
                                        {selectedVendors.length} vendors
                                      </span>
                                    </div>
                                    <div className="flex space-x-1">
                                      {selectedVendors.map((vendorId) => (
                                        <div
                                          key={vendorId}
                                          className={cn(
                                            "flex-1 h-2 rounded",
                                            Math.random() > 0.3 ? "bg-green-500" : "bg-red-500",
                                          )}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </ModernGradientCard>

                          <ModernGradientCard gradient="hologram" darkMode={darkMode}>
                            <CardHeader>
                              <CardTitle className="flex items-center space-x-2">
                                <AlertTriangle className="h-5 w-5 text-primary" />
                                <span>Risk Assessment</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                  <RadarChart
                                    data={[
                                      { subject: "Security", portnox: 95, cisco: 85, aruba: 80, microsoft: 75 },
                                      { subject: "Compliance", portnox: 90, cisco: 95, aruba: 85, microsoft: 90 },
                                      { subject: "Availability", portnox: 99, cisco: 95, aruba: 92, microsoft: 88 },
                                      { subject: "Scalability", portnox: 95, cisco: 90, aruba: 85, microsoft: 80 },
                                      { subject: "Support", portnox: 85, cisco: 95, aruba: 85, microsoft: 90 },
                                    ]}
                                  >
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                                    <Radar
                                      name="Portnox"
                                      dataKey="portnox"
                                      stroke="#14b8a6"
                                      fill="#14b8a6"
                                      fillOpacity={0.1}
                                    />
                                    <Radar
                                      name="Cisco"
                                      dataKey="cisco"
                                      stroke="#3b82f6"
                                      fill="#3b82f6"
                                      fillOpacity={0.1}
                                    />
                                    <Radar
                                      name="Aruba"
                                      dataKey="aruba"
                                      stroke="#f59e0b"
                                      fill="#f59e0b"
                                      fillOpacity={0.1}
                                    />
                                    <Radar
                                      name="Microsoft"
                                      dataKey="microsoft"
                                      stroke="#8b5cf6"
                                      fill="#8b5cf6"
                                      fillOpacity={0.1}
                                    />
                                    <ReLegend />
                                  </RadarChart>
                                </ResponsiveContainer>
                              </div>
                            </CardContent>
                          </ModernGradientCard>
                        </div>
                      </div>
                    )}

                    {activeTab === "reports" && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-2xl font-bold">Reports & Export</h2>
                            <p className="text-muted-foreground">Generate and export detailed reports</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Import Data
                            </Button>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              <Download className="h-4 w-4 mr-2" />
                              Export All
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {[
                            {
                              title: "Executive Summary",
                              description: "High-level overview for executives",
                              icon: <Briefcase />,
                              format: "PDF",
                            },
                            {
                              title: "Detailed TCO Analysis",
                              description: "Complete cost breakdown and projections",
                              icon: <Calculator />,
                              format: "Excel",
                            },
                            {
                              title: "Vendor Comparison",
                              description: "Side-by-side feature and cost comparison",
                              icon: <LayoutGrid />,
                              format: "PDF",
                            },
                            {
                              title: "ROI Analysis",
                              description: "Return on investment calculations",
                              icon: <TrendingUp />,
                              format: "Excel",
                            },
                            {
                              title: "Implementation Roadmap",
                              description: "Timeline and milestones",
                              icon: <Road />,
                              format: "PDF",
                            },
                            {
                              title: "Risk Assessment",
                              description: "Security and compliance analysis",
                              icon: <Shield />,
                              format: "PDF",
                            },
                          ].map((report, index) => (
                            <ModernGradientCard key={index} gradient="glass" darkMode={darkMode}>
                              <CardHeader>
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 rounded-lg bg-primary/10">
                                    {React.cloneElement(report.icon, { className: "h-5 w-5 text-primary" })}
                                  </div>
                                  <div>
                                    <CardTitle className="text-lg">{report.title}</CardTitle>
                                    <Badge variant="outline" className="text-xs mt-1">
                                      {report.format}
                                    </Badge>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                                <Button size="sm" className="w-full">
                                  <Download className="h-4 w-4 mr-2" />
                                  Generate Report
                                </Button>
                              </CardContent>
                            </ModernGradientCard>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          </div>
        </div>

        {/* Settings Panel */}
        <SettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
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
          setPortnoxAddons={setPortnoxAddons}
          darkMode={darkMode}
        />
      </div>
    </TooltipProvider>
  )
}

"use client"

import React, { useState, useMemo, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { compareVendors, type calculateVendorTCO } from "@/lib/tco-calculator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  Legend as ReLegend,
  ResponsiveContainer,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
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
  Check,
  Clock,
  Shield,
  Crown,
  ArrowUpRight,
  ArrowDownRight,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  SlidersHorizontal,
  InfoIcon,
  MoonIcon,
  RocketIcon,
  SunIcon,
  AlertTriangleIcon,
  UsersIcon,
  TrendingUpIcon,
  Filter,
  Settings,
  Search,
  Star,
  X,
  RefreshCw,
  Upload,
  Save,
  Building,
  Zap,
} from "lucide-react"

type CalculationResult = NonNullable<ReturnType<typeof calculateVendorTCO>> & { id?: string }

// Enhanced Portnox color palette with gradients for dark mode
const PORTNOX_COLORS = {
  primary: "#00D4AA",
  primaryDark: "#00A88A",
  primaryLight: "#33DDBB",
  primaryGlow: "#4DE5C9",
  secondary: "#0A1628",
  secondaryLight: "#1A2638",
  secondaryDark: "#051018",
  accent: "#FF6B35",
  accentLight: "#FF8A5B",
  success: "#10B981",
  successLight: "#34D399",
  warning: "#F59E0B",
  warningLight: "#FBBF24",
  danger: "#EF4444",
  dangerLight: "#F87171",
  info: "#3B82F6",
  infoLight: "#60A5FA",
  purple: "#8B5CF6",
  purpleLight: "#A78BFA",
  pink: "#EC4899",
  pinkLight: "#F472B6",
  cyan: "#06B6D4",
  cyanLight: "#22D3EE",
  emerald: "#059669",
  emeraldLight: "#10B981",
  textPrimaryDark: "#F9FAFB",
  textSecondaryDark: "#D1D5DB",
  textTertiaryDark: "#9CA3AF",
  textPrimaryLight: "#111827",
  textSecondaryLight: "#374151",
  textTertiaryLight: "#6B7280",
  backgroundDark: "#0F172A",
  backgroundLight: "#F8FAFC",
  cardDark: "#1E293B",
  cardLight: "#FFFFFF",
  borderDark: "#334155",
  borderLight: "#E2E8F0",
  gradient: {
    primary: "linear-gradient(135deg, #00D4AA 0%, #00A88A 100%)",
    secondary: "linear-gradient(135deg, #0A1628 0%, #1A2638 100%)",
    vibrant: "linear-gradient(135deg, #00D4AA 0%, #3B82F6 50%, #8B5CF6 100%)",
    fire: "linear-gradient(135deg, #FF6B35 0%, #F59E0B 50%, #EF4444 100%)",
    ocean: "linear-gradient(135deg, #00D4AA 0%, #06B6D4 50%, #3B82F6 100%)",
    sunset: "linear-gradient(135deg, #FF6B35 0%, #EC4899 50%, #8B5CF6 100%)",
    aurora: "linear-gradient(135deg, #00D4AA 0%, #8B5CF6 50%, #EC4899 100%)",
    cosmic: "linear-gradient(135deg, #1E293B 0%, #3B82F6 50%, #8B5CF6 100%)",
    emerald: "linear-gradient(135deg, #059669 0%, #10B981 50%, #34D399 100%)",
    amber: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #FCD34D 100%)",
  },
}

const VIBRANT_COLORS = [
  PORTNOX_COLORS.primary,
  PORTNOX_COLORS.accent,
  PORTNOX_COLORS.info,
  PORTNOX_COLORS.success,
  PORTNOX_COLORS.warning,
  PORTNOX_COLORS.purple,
  PORTNOX_COLORS.pink,
  PORTNOX_COLORS.cyan,
  PORTNOX_COLORS.emerald,
  "#6366F1",
  "#14B8A6",
  "#F97316",
  "#84CC16",
  "#EAB308",
]

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
}

const pulseAnimation = {
  scale: [1, 1.03, 1],
  transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
}

const slideInFromRight = {
  initial: { x: 300, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 300, opacity: 0 },
}

// Enhanced Styled Components
const GradientCard = ({
  children,
  className,
  gradient = "primary",
  darkMode,
  ...props
}: {
  children: React.ReactNode
  className?: string
  gradient?: keyof typeof PORTNOX_COLORS.gradient
  darkMode?: boolean
  [key: string]: any
}) => (
  <Card
    className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-xl border-0",
      darkMode
        ? "bg-slate-800/90 backdrop-blur-sm hover:bg-slate-800/95"
        : "bg-white/95 backdrop-blur-sm hover:bg-white",
      className,
    )}
    {...props}
  >
    <div className="absolute inset-0 opacity-[0.03]" style={{ background: PORTNOX_COLORS.gradient[gradient] }} />
    <div
      className="absolute inset-0 border border-opacity-20"
      style={{ borderColor: gradient === "primary" ? PORTNOX_COLORS.primary : PORTNOX_COLORS.accent }}
    />
    <div className="relative z-10">{children}</div>
  </Card>
)

const MetricCard = ({
  title,
  value,
  detail,
  icon,
  trend,
  trendValue,
  gradient = "primary",
  darkMode,
}: {
  title: string
  value: string
  detail: string
  icon: React.ReactElement
  trend?: "up" | "down"
  trendValue?: string
  gradient?: keyof typeof PORTNOX_COLORS.gradient
  darkMode?: boolean
}) => (
  <motion.div whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-full">
    <GradientCard gradient={gradient} darkMode={darkMode} className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn("text-sm font-medium", darkMode ? "text-slate-300" : "text-slate-600")}>
          {title}
        </CardTitle>
        <motion.div
          className="relative p-2 rounded-full"
          style={{
            background: darkMode ? `rgba(0, 212, 170, 0.15)` : `rgba(0, 212, 170, 0.1)`,
          }}
          animate={pulseAnimation}
        >
          {React.cloneElement(icon, {
            className: cn("h-5 w-5", darkMode ? "text-emerald-400" : "text-emerald-600"),
          })}
        </motion.div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center">
        <motion.div
          className={cn("text-3xl font-bold", darkMode ? "text-slate-100" : "text-slate-900")}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {value}
        </motion.div>
        {trend && (
          <div className={cn("flex items-center text-xs mt-1", trend === "up" ? "text-emerald-500" : "text-red-500")}>
            {trend === "up" ? (
              <ArrowUpRight className="h-3 w-3 mr-0.5" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-0.5" />
            )}
            <span>{trendValue}</span>
          </div>
        )}
        <p className={cn("text-xs mt-1", darkMode ? "text-slate-400" : "text-slate-500")}>{detail}</p>
      </CardContent>
    </GradientCard>
  </motion.div>
)

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

// Vendor data with complete information
const VENDOR_DATA = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    category: "Cloud-Native NAC",
    marketShare: 8.5,
    logo: "/portnox-logo-color.png",
    description: "AI-powered, cloud-native Zero Trust Network Access Control",
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
      },
      advanced: {
        "AI/ML Analytics": true,
        "Zero Trust": true,
        Microsegmentation: true,
        "Threat Detection": true,
        "Compliance Automation": true,
        "Multi-tenant": true,
      },
    },
    implementation: {
      deploymentTime: { poc: 24, fullDeployment: 168 },
      complexity: "Low",
      requiresHardware: false,
      cloudNative: true,
    },
    pricing: {
      model: "Per device/user subscription",
      startingPrice: 3.5,
      enterprise: 2.8,
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
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: true,
        "Threat Detection": true,
        "Compliance Automation": false,
        "Multi-tenant": false,
      },
    },
    implementation: {
      deploymentTime: { poc: 120, fullDeployment: 2880 },
      complexity: "Very High",
      requiresHardware: true,
      cloudNative: false,
    },
    pricing: {
      model: "Appliance + licensing",
      startingPrice: 8.5,
      enterprise: 12.0,
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
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: true,
        "Threat Detection": true,
        "Compliance Automation": false,
        "Multi-tenant": false,
      },
    },
    implementation: {
      deploymentTime: { poc: 96, fullDeployment: 2160 },
      complexity: "High",
      requiresHardware: true,
      cloudNative: false,
    },
    pricing: {
      model: "Appliance + licensing",
      startingPrice: 7.2,
      enterprise: 9.8,
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
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: false,
        "Threat Detection": true,
        "Compliance Automation": false,
        "Multi-tenant": true,
      },
    },
    implementation: {
      deploymentTime: { poc: 48, fullDeployment: 720 },
      complexity: "Medium",
      requiresHardware: true,
      cloudNative: true,
    },
    pricing: {
      model: "Hardware + cloud licensing",
      startingPrice: 6.8,
      enterprise: 8.5,
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
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: true,
        "Threat Detection": true,
        "Compliance Automation": false,
        "Multi-tenant": false,
      },
    },
    implementation: {
      deploymentTime: { poc: 72, fullDeployment: 1800 },
      complexity: "Medium",
      requiresHardware: true,
      cloudNative: false,
    },
    pricing: {
      model: "Appliance + licensing",
      startingPrice: 6.5,
      enterprise: 8.2,
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
      },
      advanced: {
        "AI/ML Analytics": true,
        "Zero Trust": false,
        Microsegmentation: true,
        "Threat Detection": true,
        "Compliance Automation": true,
        "Multi-tenant": false,
      },
    },
    implementation: {
      deploymentTime: { poc: 96, fullDeployment: 2400 },
      complexity: "High",
      requiresHardware: true,
      cloudNative: false,
    },
    pricing: {
      model: "Appliance + per device",
      startingPrice: 9.2,
      enterprise: 11.5,
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
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: false,
        "Threat Detection": false,
        "Compliance Automation": false,
        "Multi-tenant": false,
      },
    },
    implementation: {
      deploymentTime: { poc: 72, fullDeployment: 2040 },
      complexity: "Medium",
      requiresHardware: false,
      cloudNative: true,
    },
    pricing: {
      model: "Per device licensing",
      startingPrice: 5.8,
      enterprise: 7.2,
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
    name: "Juniper Mist Access Assurance",
    category: "AI-Driven",
    marketShare: 3.8,
    logo: "/juniper-logo.png",
    description: "AI-driven access assurance with Mist cloud platform",
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
      },
      advanced: {
        "AI/ML Analytics": true,
        "Zero Trust": true,
        Microsegmentation: true,
        "Threat Detection": true,
        "Compliance Automation": false,
        "Multi-tenant": true,
      },
    },
    implementation: {
      deploymentTime: { poc: 48, fullDeployment: 480 },
      complexity: "Medium",
      requiresHardware: false,
      cloudNative: true,
    },
    pricing: {
      model: "Subscription per AP/user",
      startingPrice: 5.2,
      enterprise: 6.8,
    },
    strengths: ["AI-driven operations", "Cloud-native", "Mist platform integration", "Proactive troubleshooting"],
    weaknesses: ["Juniper ecosystem focus", "Newer NAC offering", "Limited standalone deployment"],
  },
  microsoft: {
    id: "microsoft",
    name: "Microsoft NPS + Intune",
    category: "Ecosystem NAC",
    marketShare: 15.6,
    logo: "/microsoft-logo.png",
    description: "Microsoft ecosystem NAC using NPS, Intune, and Conditional Access",
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
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": true,
        Microsegmentation: false,
        "Threat Detection": true,
        "Compliance Automation": true,
        "Multi-tenant": true,
      },
    },
    implementation: {
      deploymentTime: { poc: 96, fullDeployment: 1080 },
      complexity: "Medium",
      requiresHardware: false,
      cloudNative: true,
    },
    pricing: {
      model: "M365 licensing",
      startingPrice: 4.2,
      enterprise: 5.8,
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
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: false,
        "Threat Detection": false,
        "Compliance Automation": false,
        "Multi-tenant": false,
      },
    },
    implementation: {
      deploymentTime: { poc: 240, fullDeployment: 3600 },
      complexity: "Very High",
      requiresHardware: true,
      cloudNative: false,
    },
    pricing: {
      model: "Open source + support",
      startingPrice: 0,
      enterprise: 2.5,
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
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: false,
        "Threat Detection": false,
        "Compliance Automation": false,
        "Multi-tenant": true,
      },
    },
    implementation: {
      deploymentTime: { poc: 8, fullDeployment: 120 },
      complexity: "Low",
      requiresHardware: false,
      cloudNative: true,
    },
    pricing: {
      model: "Per user/month",
      startingPrice: 2.5,
      enterprise: 3.2,
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
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: false,
        "Threat Detection": false,
        "Compliance Automation": false,
        "Multi-tenant": true,
      },
    },
    implementation: {
      deploymentTime: { poc: 24, fullDeployment: 360 },
      complexity: "Low",
      requiresHardware: false,
      cloudNative: true,
    },
    pricing: {
      model: "Per user/year",
      startingPrice: 3.8,
      enterprise: 4.5,
    },
    strengths: ["Strong certificate management", "EAP-TLS focus", "Cloud PKI", "Easy certificate deployment"],
    weaknesses: ["Limited to authentication", "No device visibility", "Certificate-only approach", "Narrow use case"],
  },
  radiusaas: {
    id: "radiusaas",
    name: "RADIUS-as-a-Service",
    category: "Cloud RADIUS",
    marketShare: 1.2,
    logo: "/radiusaas-logo.png",
    description: "Cloud-based RADIUS service for network authentication",
    features: {
      core: {
        "802.1X": true,
        "Risk-Based Auth": false,
        "Device Profiling": false,
        "Policy Automation": false,
        "Cloud Management": true,
        "API Integration": false,
        "Real-time Monitoring": false,
        "Automated Remediation": false,
      },
      advanced: {
        "AI/ML Analytics": false,
        "Zero Trust": false,
        Microsegmentation: false,
        "Threat Detection": false,
        "Compliance Automation": false,
        "Multi-tenant": false,
      },
    },
    implementation: {
      deploymentTime: { poc: 4, fullDeployment: 48 },
      complexity: "Low",
      requiresHardware: false,
      cloudNative: true,
    },
    pricing: {
      model: "Per authentication",
      startingPrice: 1.8,
      enterprise: 2.2,
    },
    strengths: ["Simple RADIUS service", "Pay per use", "Quick setup", "Basic authentication"],
    weaknesses: ["Very limited features", "No NAC capabilities", "Authentication only", "Minimal management"],
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
              "w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border shadow-2xl",
              darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200",
            )}
            variants={slideInFromRight}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={cn(
                "flex items-center justify-between p-6 border-b",
                darkMode ? "border-slate-700" : "border-slate-200",
              )}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Settings className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h2 className={cn("text-xl font-semibold", darkMode ? "text-slate-100" : "text-slate-900")}>
                    Settings & Configuration
                  </h2>
                  <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                    Customize your TCO analysis parameters
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
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

            {/* Tabs */}
            <div className={cn("border-b", darkMode ? "border-slate-700" : "border-slate-200")}>
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
                      "flex items-center space-x-2 py-4 border-b-2 transition-colors",
                      activeTab === tab.id
                        ? "border-emerald-500 text-emerald-600"
                        : darkMode
                          ? "border-transparent text-slate-400 hover:text-slate-300"
                          : "border-transparent text-slate-500 hover:text-slate-700",
                    )}
                  >
                    {React.cloneElement(tab.icon, { className: "h-4 w-4" })}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <ScrollArea className="h-[60vh] p-6">
              {activeTab === "organization" && (
                <div className="space-y-6">
                  <div>
                    <h3 className={cn("text-lg font-semibold mb-4", darkMode ? "text-slate-100" : "text-slate-900")}>
                      Organization Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className={cn(darkMode ? "text-slate-300" : "text-slate-700")}>Number of Devices</Label>
                        <Input
                          type="number"
                          value={customDevices}
                          onChange={(e) => setCustomDevices(Number(e.target.value))}
                          className={cn(
                            darkMode ? "bg-slate-800 border-slate-600 text-slate-100" : "bg-white border-slate-300",
                          )}
                        />
                        <p className={cn("text-xs", darkMode ? "text-slate-400" : "text-slate-500")}>
                          Include all network-connected devices
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label className={cn(darkMode ? "text-slate-300" : "text-slate-700")}>Number of Users</Label>
                        <Input
                          type="number"
                          value={customUsers}
                          onChange={(e) => setCustomUsers(Number(e.target.value))}
                          className={cn(
                            darkMode ? "bg-slate-800 border-slate-600 text-slate-100" : "bg-white border-slate-300",
                          )}
                        />
                        <p className={cn("text-xs", darkMode ? "text-slate-400" : "text-slate-500")}>
                          Total user accounts requiring access
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label className={cn(darkMode ? "text-slate-300" : "text-slate-700")}>Industry</Label>
                        <Select value={industry} onValueChange={setIndustry}>
                          <SelectTrigger
                            className={cn(
                              darkMode ? "bg-slate-800 border-slate-600 text-slate-100" : "bg-white border-slate-300",
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
                      </div>

                      <div className="space-y-2">
                        <Label className={cn(darkMode ? "text-slate-300" : "text-slate-700")}>Geographic Region</Label>
                        <Select value={region} onValueChange={setRegion}>
                          <SelectTrigger
                            className={cn(
                              darkMode ? "bg-slate-800 border-slate-600 text-slate-100" : "bg-white border-slate-300",
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
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <Label className={cn(darkMode ? "text-slate-300" : "text-slate-700")}>Analysis Period</Label>
                      <div className="px-3">
                        <Slider
                          value={[projectionYears]}
                          onValueChange={(value) => setProjectionYears(value[0])}
                          max={7}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                          <span>1 year</span>
                          <span className="font-medium text-emerald-600">{projectionYears} years</span>
                          <span>7 years</span>
                        </div>
                      </div>
                      <p className={cn("text-xs", darkMode ? "text-slate-400" : "text-slate-500")}>
                        Recommended: 3-5 years for accurate ROI analysis
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "pricing" && (
                <div className="space-y-6">
                  <div>
                    <h3 className={cn("text-lg font-semibold mb-4", darkMode ? "text-slate-100" : "text-slate-900")}>
                      Pricing Configuration
                    </h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className={cn(darkMode ? "text-slate-300" : "text-slate-700")}>
                          Portnox Base Price (per device/month)
                        </Label>
                        <div className="flex items-center space-x-2">
                          <span className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>$</span>
                          <Input
                            type="number"
                            step="0.1"
                            value={portnoxBasePrice}
                            onChange={(e) => setPortnoxBasePrice(Number(e.target.value))}
                            className={cn(
                              "w-24",
                              darkMode ? "bg-slate-800 border-slate-600 text-slate-100" : "bg-white border-slate-300",
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className={cn(darkMode ? "text-slate-300" : "text-slate-700")}>Portnox Add-ons</Label>
                        {Object.entries({
                          atp: "Advanced Threat Protection (+$0.50/device)",
                          compliance: "Compliance Automation (+$0.30/device)",
                          iot: "IoT Security (+$0.40/device)",
                          analytics: "Advanced Analytics (+$0.25/device)",
                        }).map(([key, label]) => (
                          <div key={key} className="flex items-center space-x-2">
                            <Switch
                              checked={portnoxAddons[key]}
                              onCheckedChange={(checked) => setPortnoxAddons({ ...portnoxAddons, [key]: checked })}
                            />
                            <span className={cn("text-sm", darkMode ? "text-slate-300" : "text-slate-700")}>
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "preferences" && (
                <div className="space-y-6">
                  <div>
                    <h3 className={cn("text-lg font-semibold mb-4", darkMode ? "text-slate-100" : "text-slate-900")}>
                      Display Preferences
                    </h3>
                    <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                      Customize how data is displayed in charts and reports
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "advanced" && (
                <div className="space-y-6">
                  <div>
                    <h3 className={cn("text-lg font-semibold mb-4", darkMode ? "text-slate-100" : "text-slate-900")}>
                      Advanced Settings
                    </h3>
                    <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                      Advanced configuration options for detailed analysis
                    </p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Vendor Selection Panel Component
const VendorSelectionPanel = ({
  selectedVendors,
  onVendorToggle,
  darkMode,
  searchTerm,
  setSearchTerm,
}: {
  selectedVendors: string[]
  onVendorToggle: (vendorId: string) => void
  darkMode: boolean
  searchTerm: string
  setSearchTerm: (term: string) => void
}) => {
  const vendorCategories = {
    Recommended: ["portnox"],
    "Cloud-Native Leaders": ["portnox", "juniper", "microsoft"],
    "Traditional Enterprise": ["cisco", "aruba", "fortinet"],
    "Cloud-Managed": ["meraki", "extreme"],
    "Specialized Solutions": ["forescout"],
    "Open Source & Budget": ["packetfence", "foxpass", "securew2", "radiusaas"],
  }

  const filteredVendors = Object.entries(vendorCategories).reduce(
    (acc, [category, vendors]) => {
      const filtered = vendors.filter((vendorId) => {
        const vendor = VENDOR_DATA[vendorId]
        return vendor && vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
      })
      if (filtered.length > 0) {
        acc[category] = filtered
      }
      return acc
    },
    {} as Record<string, string[]>,
  )

  return (
    <div
      className={cn(
        "w-80 border-r flex flex-col",
        darkMode ? "bg-slate-900 border-slate-700" : "bg-slate-50 border-slate-200",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-5 w-5 text-emerald-500" />
          <h3 className="font-semibold text-lg">Vendor Selection</h3>
          <Badge variant="secondary" className="ml-auto">
            {selectedVendors.length} selected
          </Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn(
              "pl-9",
              darkMode ? "bg-slate-800 border-slate-600 text-slate-100" : "bg-white border-slate-300",
            )}
          />
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className="h-7 px-2">
              <Star className="h-3 w-3 mr-1" />
              Recommended
            </Button>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2"
            onClick={() => selectedVendors.forEach(onVendorToggle)}
          >
            <X className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Vendor Categories */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className={cn("p-2 rounded", darkMode ? "bg-slate-800" : "bg-white")}>
              <div className="text-emerald-500 font-medium">All Vendors</div>
              <div className={cn(darkMode ? "text-slate-300" : "text-slate-600")}>14</div>
            </div>
            <div className={cn("p-2 rounded", darkMode ? "bg-slate-800" : "bg-white")}>
              <div className="text-blue-500 font-medium">Cloud-native</div>
              <div className={cn(darkMode ? "text-slate-300" : "text-slate-600")}>5</div>
            </div>
            <div className={cn("p-2 rounded", darkMode ? "bg-slate-800" : "bg-white")}>
              <div className="text-purple-500 font-medium">Enterprise</div>
              <div className={cn(darkMode ? "text-slate-300" : "text-slate-600")}>7</div>
            </div>
            <div className={cn("p-2 rounded", darkMode ? "bg-slate-800" : "bg-white")}>
              <div className="text-orange-500 font-medium">Mid-market</div>
              <div className={cn(darkMode ? "text-slate-300" : "text-slate-600")}>8</div>
            </div>
          </div>

          {/* Popular Comparisons */}
          <div>
            <h4 className={cn("font-medium text-sm mb-3", darkMode ? "text-slate-300" : "text-slate-700")}>
              Popular Comparisons
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Enterprise Leaders", vendors: ["portnox", "cisco", "aruba"] },
                { label: "Cloud-First", vendors: ["portnox", "juniper", "meraki"] },
                { label: "Mid-Market", vendors: ["portnox", "fortinet", "extreme"] },
                { label: "Budget-Conscious", vendors: ["portnox", "microsoft", "packetfence"] },
              ].map((comparison) => (
                <Button
                  key={comparison.label}
                  size="sm"
                  variant="outline"
                  className={cn(
                    "h-auto p-2 text-xs justify-start",
                    darkMode ? "border-slate-600 hover:bg-slate-700" : "border-slate-300 hover:bg-slate-100",
                  )}
                  onClick={() => {
                    // Clear current selection and select comparison vendors
                    selectedVendors.forEach(onVendorToggle)
                    comparison.vendors.forEach(onVendorToggle)
                  }}
                >
                  {comparison.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Vendor Categories */}
          {Object.entries(filteredVendors).map(([category, vendorIds]) => (
            <div key={category}>
              <h4
                className={cn(
                  "font-medium text-sm mb-3 uppercase tracking-wide",
                  darkMode ? "text-slate-400" : "text-slate-600",
                )}
              >
                {category}
              </h4>
              <div className="space-y-2">
                {vendorIds.map((vendorId) => {
                  const vendor = VENDOR_DATA[vendorId]
                  if (!vendor) return null

                  const isSelected = selectedVendors.includes(vendorId)

                  return (
                    <motion.div key={vendorId} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <div
                        className={cn(
                          "flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all",
                          isSelected
                            ? darkMode
                              ? "bg-emerald-500/10 border-emerald-500/50"
                              : "bg-emerald-50 border-emerald-200"
                            : darkMode
                              ? "bg-slate-800 border-slate-700 hover:bg-slate-750"
                              : "bg-white border-slate-200 hover:bg-slate-50",
                        )}
                        onClick={() => onVendorToggle(vendorId)}
                      >
                        <Checkbox
                          checked={isSelected}
                          onChange={() => onVendorToggle(vendorId)}
                          className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                        />
                        <Image
                          src={vendor.logo || "/placeholder.svg"}
                          alt={vendor.name}
                          width={32}
                          height={32}
                          className="h-8 w-8 object-contain rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm truncate">{vendor.name}</p>
                            {vendorId === "portnox" && <Crown className="h-3 w-3 text-yellow-500" />}
                          </div>
                          <div className="flex items-center justify-between">
                            <p className={cn("text-xs truncate", darkMode ? "text-slate-400" : "text-slate-500")}>
                              {vendor.category}
                            </p>
                            <span className={cn("text-xs", darkMode ? "text-slate-400" : "text-slate-500")}>
                              {vendor.marketShare}%
                            </span>
                          </div>
                        </div>
                        {isSelected && <Check className="h-4 w-4 text-emerald-500" />}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

// Main Enhanced Component
export default function TcoAnalyzerUltimate() {
  const [isClient, setIsClient] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    setIsClient(true)
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const [orgSizeKey, setOrgSizeKey] = useState("medium")
  const [customDevices, setCustomDevices] = useState(initialOrgSizeDetails.medium.devices)
  const [customUsers, setCustomUsers] = useState(initialOrgSizeDetails.medium.users)
  const [industry, setIndustry] = useState("technology")
  const [projectionYears, setProjectionYears] = useState(3)
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
      const calculatedResults = compareVendors(
        selectedVendors,
        orgSizeKey,
        currentDeviceCount,
        currentUsersCount,
        industry,
        projectionYears,
        region,
        portnoxBasePrice,
        portnoxAddons,
      )
      setResults(calculatedResults as CalculationResult[])
    } catch (error) {
      console.error("Calculation error:", error)
      setCalculationError("Failed to calculate TCO. Please check inputs.")
      setResults(null)
    }
  }, [
    selectedVendors,
    orgSizeKey,
    currentDeviceCount,
    currentUsersCount,
    industry,
    projectionYears,
    region,
    portnoxBasePrice,
    portnoxAddons,
  ])

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
          if (prev.includes("portnox")) {
            const nonPortnox = prev.filter((id) => id !== "portnox")
            newSelection = ["portnox", ...nonPortnox.slice(0, 4), vendorId]
          } else {
            newSelection = [...prev.slice(0, 5), vendorId]
          }
        } else {
          newSelection = [...prev, vendorId]
        }
      }
      if (newSelection.includes("portnox")) {
        return ["portnox", ...newSelection.filter((id) => id !== "portnox")]
      }
      return newSelection.length > 0 ? newSelection : ["portnox"]
    })
  }

  const portnoxResult = useMemo(() => results?.find((r) => r?.vendor === "portnox"), [results])
  const competitors = useMemo(() => results?.filter((r) => r?.vendor !== "portnox") || [], [results])
  const lowestCompetitor = useMemo(
    () =>
      competitors.sort((a, b) => (a?.total ?? Number.POSITIVE_INFINITY) - (b?.total ?? Number.POSITIVE_INFINITY))[0],
    [competitors],
  )

  const totalSavingsVsLowestCompetitor = useMemo(() => {
    if (!portnoxResult || !lowestCompetitor) return 0
    return lowestCompetitor.total - portnoxResult.total
  }, [portnoxResult, lowestCompetitor])

  const savingsPercentVsLowestCompetitor = useMemo(() => {
    if (!portnoxResult || !lowestCompetitor || lowestCompetitor.total === 0) return 0
    return (totalSavingsVsLowestCompetitor / lowestCompetitor.total) * 100
  }, [totalSavingsVsLowestCompetitor, lowestCompetitor, portnoxResult])

  // Generate chart data functions
  const generateROITimelineData = (results: CalculationResult[] | null, years: number) => {
    if (!results) return []
    const months = years * 12
    const data = []
    const portnoxRes = results.find((r) => r.vendor === "portnox")

    for (let month = 0; month <= months; month += Math.max(1, Math.floor(months / 12))) {
      let portnoxROI = 0
      if (portnoxRes && portnoxRes.roi.paybackMonths && portnoxRes.roi.paybackMonths > 0 && portnoxRes.total > 0) {
        if (month >= portnoxRes.roi.paybackMonths) {
          const annualNetBenefit = portnoxRes.roi.annualSavings - portnoxRes.total / years
          portnoxROI = ((annualNetBenefit * (month / 12)) / portnoxRes.total) * 100
        }
      } else if (portnoxRes && portnoxRes.roi.percentage && month > 0) {
        portnoxROI = (portnoxRes.roi.percentage / months) * month
      }

      const avgCompetitorPayback = 18
      const avgCompetitorAnnualNetBenefitRatio = 0.2
      let averageROI = 0
      if (month >= avgCompetitorPayback) {
        averageROI = avgCompetitorAnnualNetBenefitRatio * (month / 12) * 100
      }

      data.push({
        month,
        portnox: Math.max(0, Math.min(portnoxROI, 600)),
        average: Math.max(0, Math.min(averageROI, 200)),
      })
    }
    return data
  }

  const generateCostBreakdownData = (results: CalculationResult[] | null) => {
    if (!results) return []

    return results.map((result) => ({
      vendor: result.vendorName,
      software: result.breakdown?.find((b) => b.name === "Software")?.value || 0,
      hardware: result.breakdown?.find((b) => b.name === "Hardware")?.value || 0,
      implementation: result.breakdown?.find((b) => b.name === "Implementation")?.value || 0,
      support: result.breakdown?.find((b) => b.name === "Support")?.value || 0,
      operations: result.breakdown?.find((b) => b.name === "Operations")?.value || 0,
      hidden: result.breakdown?.find((b) => b.name === "Hidden")?.value || 0,
      total: result.total,
    }))
  }

  const generateROIComparisonData = (results: CalculationResult[] | null) => {
    if (!results) return []

    return results.map((result) => ({
      vendor: result.vendorName,
      roi: result.roi?.percentage || 0,
      payback: result.roi?.paybackMonths || 0,
      savings: result.roi?.annualSavings || 0,
      laborSavings: result.roi?.laborSavingsFTE || 0,
    }))
  }

  const generateRiskReductionData = (results: CalculationResult[] | null) => {
    if (!results) return []

    return results.map((result) => ({
      vendor: result.vendorName,
      breachReduction: (result.roi?.breachRiskReduction || 0) * 100,
      complianceScore: Math.random() * 30 + 70,
      securityScore: Math.random() * 25 + 75,
      operationalRisk: Math.random() * 40 + 20,
    }))
  }

  const generateImplementationTimelineData = (selectedVendors: string[]) => {
    return selectedVendors
      .map((vendorId) => {
        const vendor = VENDOR_DATA[vendorId]
        if (!vendor) return null

        return {
          vendor: vendor.name,
          planning: vendor.implementation?.deploymentTime?.poc || 24,
          deployment: vendor.implementation?.deploymentTime?.fullDeployment || 120,
          optimization: 30,
          total:
            (vendor.implementation?.deploymentTime?.poc || 24) +
            (vendor.implementation?.deploymentTime?.fullDeployment || 120) +
            30,
        }
      })
      .filter(Boolean)
  }

  const generateCostSavingsTreemapData = (
    portnoxResult: CalculationResult | undefined,
    competitors: CalculationResult[],
  ) => {
    if (!portnoxResult || competitors.length === 0) return []

    const avgCompetitorCost = competitors.reduce((sum, comp) => sum + comp.total, 0) / competitors.length
    const totalSavings = avgCompetitorCost - portnoxResult.total

    if (totalSavings <= 0) return []

    return [
      {
        name: "Total Savings",
        children: [
          {
            name: "Software Savings",
            value: Math.max(
              0,
              avgCompetitorCost * 0.4 - (portnoxResult.breakdown?.find((b) => b.name === "Software")?.value || 0),
            ),
            fill: PORTNOX_COLORS.primary,
          },
          {
            name: "Hardware Savings",
            value: Math.max(
              0,
              avgCompetitorCost * 0.25 - (portnoxResult.breakdown?.find((b) => b.name === "Hardware")?.value || 0),
            ),
            fill: PORTNOX_COLORS.accent,
          },
          {
            name: "Implementation Savings",
            value: Math.max(
              0,
              avgCompetitorCost * 0.15 -
                (portnoxResult.breakdown?.find((b) => b.name === "Implementation")?.value || 0),
            ),
            fill: PORTNOX_COLORS.info,
          },
          {
            name: "Operational Savings",
            value: Math.max(
              0,
              avgCompetitorCost * 0.2 - (portnoxResult.breakdown?.find((b) => b.name === "Operations")?.value || 0),
            ),
            fill: PORTNOX_COLORS.success,
          },
        ],
      },
    ]
  }

  const Header = () => (
    <motion.header
      className={cn(
        "sticky top-0 z-50 backdrop-blur-lg transition-all duration-300 border-b",
        darkMode ? "bg-slate-900/90 border-slate-700/50" : "bg-white/90 border-slate-200/50",
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <motion.div whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.05 }} transition={{ duration: 0.5 }}>
              <Image
                src="/portnox-logo-color.png"
                alt="Portnox Logo"
                width={140}
                height={35}
                className="h-8 w-auto relative"
                priority
              />
            </motion.div>
            <Separator orientation="vertical" className={cn("h-6", darkMode ? "bg-slate-700" : "bg-slate-300")} />
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                TCO Analyzer
              </h1>
              <p className={cn("text-xs", darkMode ? "text-slate-400" : "text-slate-500")}>
                Enterprise Decision Platform v3.0
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={() => setShowSettings(true)}
                    className={cn(
                      "p-2 rounded-full hover:bg-muted transition-colors",
                      darkMode ? "text-slate-400 hover:text-slate-300" : "text-slate-600 hover:text-slate-700",
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Settings className="h-5 w-5" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className={cn(darkMode ? "bg-slate-700 text-white border-slate-600" : "")}
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
                      "p-2 rounded-full hover:bg-muted transition-colors",
                      darkMode ? "text-yellow-400" : "text-slate-600",
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className={cn(darkMode ? "bg-slate-700 text-white border-slate-600" : "")}
                >
                  <p>Toggle {darkMode ? "Light" : "Dark"} Mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "hidden sm:flex items-center space-x-1.5",
                  darkMode ? "border-slate-600 hover:bg-slate-700" : "border-slate-300 hover:bg-slate-100",
                )}
              >
                <Download className="h-4 w-4" />
                <span>Export PDF</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-lg hover:from-emerald-600 hover:to-emerald-700 text-white transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4 mr-1.5" />
                Schedule Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )

  const MainTabNavigation = () => (
    <motion.nav
      className={cn(
        "sticky top-16 z-40 backdrop-blur-md border-b",
        darkMode ? "bg-slate-900/80 border-slate-700/60" : "bg-white/80 border-slate-200/60",
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 20 }}
    >
      <div className="container mx-auto px-4">
        <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
          <TabsList className="flex items-center h-auto py-0 bg-transparent rounded-none justify-start overflow-x-auto">
            {MAIN_TABS_CONFIG.map((tab, index) => (
              <motion.div
                key={tab.value}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.05, type: "spring", stiffness: 120, damping: 15 }}
                className="flex-shrink-0"
              >
                <TabsTrigger
                  value={tab.value}
                  className={cn(
                    "relative flex items-center h-12 text-sm rounded-none px-6 py-2",
                    "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                    darkMode
                      ? "hover:bg-slate-700/50 data-[state=active]:text-emerald-400 text-slate-300 hover:text-slate-100"
                      : "hover:bg-slate-100 data-[state=active]:text-emerald-600 text-slate-600 hover:text-slate-800",
                    "transition-all duration-200 group whitespace-nowrap",
                  )}
                >
                  <div
                    className={cn(
                      "h-5 w-5 mr-2 transition-transform duration-200 group-hover:scale-110",
                      activeMainTab === tab.value
                        ? darkMode
                          ? "text-emerald-400"
                          : "text-emerald-600"
                        : darkMode
                          ? "text-slate-400 group-hover:text-slate-200"
                          : "text-slate-500 group-hover:text-slate-700",
                    )}
                  >
                    {React.cloneElement(tab.icon, { className: "h-full w-full" })}
                  </div>
                  <span className={cn(activeMainTab === tab.value ? "font-semibold" : "")}>{tab.label}</span>
                  {activeMainTab === tab.value && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600"
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

  const SubTabNavigation = () => {
    let subTabs: typeof ANALYSIS_SUB_TABS = []

    if (activeMainTab === "analysis") {
      subTabs = ANALYSIS_SUB_TABS
    } else if (activeMainTab === "comparison") {
      subTabs = COMPARISON_SUB_TABS
    }

    if (subTabs.length === 0) return null

    return (
      <motion.div
        className={cn(
          "border-b",
          darkMode ? "bg-slate-800/50 border-slate-700/40" : "bg-slate-50/50 border-slate-200/40",
        )}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="container mx-auto px-4">
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
            <TabsList className="flex items-center h-auto py-0 bg-transparent rounded-none justify-start overflow-x-auto">
              {subTabs.map((tab, index) => (
                <motion.div
                  key={tab.value}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.03 }}
                  className="flex-shrink-0"
                >
                  <TabsTrigger
                    value={tab.value}
                    className={cn(
                      "relative flex items-center h-10 text-xs rounded-none px-4 py-1",
                      "data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                      darkMode
                        ? "hover:bg-slate-700/30 data-[state=active]:text-emerald-400 text-slate-400 hover:text-slate-200"
                        : "hover:bg-slate-100/50 data-[state=active]:text-emerald-600 text-slate-500 hover:text-slate-700",
                      "transition-all duration-200 group whitespace-nowrap",
                    )}
                  >
                    <div
                      className={cn(
                        "h-4 w-4 mr-1.5 transition-transform duration-200 group-hover:scale-110",
                        activeSubTab === tab.value
                          ? darkMode
                            ? "text-emerald-400"
                            : "text-emerald-600"
                          : darkMode
                            ? "text-slate-500 group-hover:text-slate-300"
                            : "text-slate-400 group-hover:text-slate-600",
                      )}
                    >
                      {React.cloneElement(tab.icon, { className: "h-full w-full" })}
                    </div>
                    <span className={cn(activeSubTab === tab.value ? "font-medium" : "")}>{tab.label}</span>
                    {activeSubTab === tab.value && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600"
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

  const renderMainContent = () => {
    if (calculationError)
      return (
        <Card className="p-6 text-center text-destructive animate-fade-in">
          <AlertTriangleIcon className="mx-auto h-8 w-8 mb-2" />
          {calculationError}
        </Card>
      )
    if (!isClient && !["reports"].includes(activeMainTab))
      return <Card className="p-6 text-center text-muted-foreground animate-fade-in">Loading charts...</Card>

    const currentView = activeMainTab === "analysis" || activeMainTab === "comparison" ? activeSubTab : activeMainTab

    switch (currentView) {
      case "dashboard":
        return <ExecutiveDashboardView />
      case "cost-breakdown":
        return <DetailedCostsView results={results} years={projectionYears} darkMode={darkMode} />
      case "compliance":
        return (
          <ComplianceRiskView
            results={results}
            industry={industry}
            selectedVendors={selectedVendors}
            darkMode={darkMode}
          />
        )
      case "roi-analysis":
        return <ROIAnalysisView results={results} years={projectionYears} darkMode={darkMode} />
      case "operations":
        return (
          <OperationsImpactView
            results={results}
            currentDeviceCount={currentDeviceCount}
            currentUsersCount={currentUsersCount}
            region={region}
            darkMode={darkMode}
          />
        )
      case "timeline":
        return <TimelineView results={results} years={projectionYears} darkMode={darkMode} />
      case "feature-matrix":
        const safeResultsForFeatures = results || []
        const featureData = safeResultsForFeatures.map((r) => ({
          id: r.vendor,
          name: r.vendorName,
          features: VENDOR_DATA[r.vendor]?.features?.core || {},
          logo: VENDOR_DATA[r.vendor]?.logo,
        }))
        return <FeatureComparison data={featureData} darkMode={darkMode} />
      case "roadmap":
        return (
          <ImplementationRoadmapView
            selectedVendor={selectedVendors[0] || "portnox"}
            deviceCount={currentDeviceCount}
            userCount={currentUsersCount}
            darkMode={darkMode}
          />
        )
      case "vendor-details":
        return <VendorDetailsView selectedVendors={selectedVendors} darkMode={darkMode} />
      case "reports":
        const reportConfig = {
          orgSize: orgSizeKey,
          devices: currentDeviceCount,
          users: currentUsersCount,
          industry: industry,
          years: projectionYears,
          region: region,
          selectedVendors: selectedVendors,
          portnoxBasePrice: portnoxBasePrice,
          portnoxAddons: portnoxAddons,
        }
        return <ReportsView results={results} config={reportConfig} darkMode={darkMode} />
      default:
        return (
          <Card className="p-6 text-center text-muted-foreground animate-fade-in">
            <InfoIcon className="mx-auto h-8 w-8 mb-2 text-emerald-500" />
            View not implemented yet: {currentView}
          </Card>
        )
    }
  }

  // View Components
  const ExecutiveDashboardView = () => {
    if (!results || !portnoxResult)
      return (
        <Card className="p-6 text-center text-muted-foreground animate-fade-in">
          <InfoIcon className="mx-auto h-8 w-8 mb-2 text-emerald-500" />
          Select vendors and calculate TCO.
        </Card>
      )

    const costBreakdownData = generateCostBreakdownData(results)
    const roiComparisonData = generateROIComparisonData(results)
    const riskReductionData = generateRiskReductionData(results)
    const implementationData = generateImplementationTimelineData(selectedVendors)
    const savingsTreemapData = generateCostSavingsTreemapData(portnoxResult, competitors)

    return (
      <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
        {/* Executive Summary Header */}
        <motion.div variants={fadeInUp}>
          <GradientCard gradient="vibrant" darkMode={darkMode} className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 text-center md:text-left">
                <motion.h2
                  className={cn(
                    "text-2xl sm:text-3xl font-bold mb-1 sm:mb-2",
                    darkMode ? "text-slate-100" : "text-slate-900",
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  Executive Summary
                </motion.h2>
                <motion.p
                  className={cn("text-sm sm:text-base", darkMode ? "text-slate-300" : "text-slate-600")}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {projectionYears}-Year Total Cost of Ownership Analysis
                </motion.p>
              </div>
              <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                <Crown className="h-7 w-7 sm:h-8 sm:w-8 text-yellow-400" />
                <div className="text-right">
                  <p className={cn("text-xs sm:text-sm", darkMode ? "text-slate-300" : "text-slate-600")}>
                    Portnox Advantage
                  </p>
                  <p className={cn("text-xl sm:text-2xl font-bold", darkMode ? "text-slate-100" : "text-slate-900")}>
                    {savingsPercentVsLowestCompetitor.toFixed(0)}% Lower TCO
                  </p>
                </div>
              </motion.div>
            </div>
          </GradientCard>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
          <motion.div variants={fadeInUp}>
            <MetricCard
              title="Total Savings"
              value={`$${Math.round(Math.abs(totalSavingsVsLowestCompetitor) / 1000).toLocaleString()}K`}
              detail={`vs. ${lowestCompetitor?.vendorName || "Next Best"}`}
              icon={<DollarSign />}
              trend="up"
              trendValue={`${savingsPercentVsLowestCompetitor.toFixed(0)}%`}
              gradient="vibrant"
              darkMode={darkMode}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <MetricCard
              title="ROI Achievement"
              value={`${portnoxResult?.roi?.paybackMonths || 6} mo`}
              detail="Payback period"
              icon={<RocketIcon />}
              trend="up"
              trendValue="Faster"
              gradient="fire"
              darkMode={darkMode}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <MetricCard
              title="Risk Reduction"
              value={`${((portnoxResult?.roi?.breachRiskReduction || 0.8) * 100).toFixed(0)}%`}
              detail="Breach probability decrease"
              icon={<Shield />}
              trend="up"
              trendValue="Significant"
              gradient="ocean"
              darkMode={darkMode}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <MetricCard
              title="Efficiency Gain"
              value={`${portnoxResult?.roi?.laborSavings || 1.9} FTE`}
              detail="Staff hours saved"
              icon={<UsersIcon />}
              trend="up"
              trendValue="Notable"
              gradient="sunset"
              darkMode={darkMode}
            />
          </motion.div>
        </motion.div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TCO Comparison Chart */}
          <motion.div variants={fadeInUp}>
            <GradientCard darkMode={darkMode}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-emerald-500" />
                  <span>TCO Comparison</span>
                </CardTitle>
                <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                  {projectionYears}-year total cost across vendors
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart
                    data={results?.map((r) => ({
                      name: r.vendorName,
                      TCO: r.total,
                      fill:
                        r.vendor === "portnox"
                          ? PORTNOX_COLORS.primary
                          : VIBRANT_COLORS[results.findIndex((v) => v.vendor === r.vendor) % VIBRANT_COLORS.length],
                    }))}
                    layout="vertical"
                    margin={{ right: 30, left: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#475569" : "#E2E8F0"} />
                    <XAxis
                      type="number"
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                      interval={0}
                    />
                    <ReTooltip
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Total TCO"]}
                      contentStyle={{
                        backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                        border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                        borderRadius: "8px",
                        color: darkMode ? PORTNOX_COLORS.textPrimaryDark : PORTNOX_COLORS.textPrimaryLight,
                      }}
                      cursor={{ fill: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
                    />
                    <Bar dataKey="TCO" radius={[0, 6, 6, 0]} barSize={20} />
                  </ReBarChart>
                </ResponsiveContainer>
              </CardContent>
            </GradientCard>
          </motion.div>

          {/* ROI Timeline Chart */}
          <motion.div variants={fadeInUp}>
            <GradientCard darkMode={darkMode}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <TrendingUpIcon className="h-5 w-5 text-emerald-500" />
                  <span>ROI Timeline</span>
                </CardTitle>
                <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                  Cumulative value over {projectionYears * 12} months
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={generateROITimelineData(results, projectionYears)}
                    margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="roiGradientFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={PORTNOX_COLORS.primary} stopOpacity={0.6} />
                        <stop offset="95%" stopColor={PORTNOX_COLORS.primary} stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#475569" : "#E2E8F0"} />
                    <XAxis
                      dataKey="month"
                      tickFormatter={(value) => `M${value}`}
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                    />
                    <YAxis
                      tickFormatter={(value) => `${value}%`}
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                    />
                    <ReTooltip
                      formatter={(value: number, name: string) => [
                        `${value.toFixed(0)}%`,
                        name.charAt(0).toUpperCase() + name.slice(1),
                      ]}
                      contentStyle={{
                        backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                        border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="portnox"
                      stroke={PORTNOX_COLORS.primary}
                      strokeWidth={2.5}
                      fill="url(#roiGradientFill)"
                      name="Portnox ROI"
                    />
                    <Line
                      type="monotone"
                      dataKey="average"
                      stroke={VIBRANT_COLORS[2]}
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={false}
                      name="Competitor Avg. ROI"
                    />
                    <ReLegend wrapperStyle={{ fontSize: "12px" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </GradientCard>
          </motion.div>
        </div>

        {/* Additional charts and content would continue here... */}
      </motion.div>
    )
  }

  // Additional view components would be implemented here...
  const DetailedCostsView = ({ results, years, darkMode }: any) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Detailed Cost Analysis</h2>
      <p>Implementation in progress...</p>
    </div>
  )

  const ComplianceRiskView = ({ results, industry, selectedVendors, darkMode }: any) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Compliance & Risk Analysis</h2>
      <p>Implementation in progress...</p>
    </div>
  )

  const ROIAnalysisView = ({ results, years, darkMode }: any) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">ROI & Business Value Analysis</h2>
      <p>Implementation in progress...</p>
    </div>
  )

  const OperationsImpactView = ({ results, currentDeviceCount, currentUsersCount, region, darkMode }: any) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Operations Impact Analysis</h2>
      <p>Implementation in progress...</p>
    </div>
  )

  const TimelineView = ({ results, years, darkMode }: any) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Timeline View</h2>
      <p>Implementation in progress...</p>
    </div>
  )

  const FeatureComparison = ({ data, darkMode }: any) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Feature Comparison Matrix</h2>
      <p>Implementation in progress...</p>
    </div>
  )

  const ImplementationRoadmapView = ({ selectedVendor, deviceCount, userCount, darkMode }: any) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Implementation Roadmap</h2>
      <p>Implementation in progress...</p>
    </div>
  )

  const VendorDetailsView = ({ selectedVendors, darkMode }: any) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Vendor Details</h2>
      <p>Implementation in progress...</p>
    </div>
  )

  const ReportsView = ({ results, config, darkMode }: any) => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      <p>Implementation in progress...</p>
    </div>
  )

  const Footer = () => (
    <motion.footer
      className={cn(
        "mt-auto border-t",
        darkMode ? "bg-slate-900 border-slate-800/50" : "bg-slate-100 border-slate-200/50",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Image src="/portnox-logo-color.png" alt="Portnox Logo" width={150} height={38} className="h-9 w-auto" />
            <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-600")}>
              AI-powered cloud-native NAC delivering zero-trust security with unmatched simplicity.
            </p>
            <div className="flex space-x-4">
              {[
                { href: "https://www.linkedin.com/company/portnox/", icon: <Linkedin className="h-5 w-5" /> },
                { href: "https://twitter.com/Portnox", icon: <Twitter className="h-5 w-5" /> },
              ].map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, color: PORTNOX_COLORS.primary }}
                  className={cn(darkMode ? "text-slate-400" : "text-slate-500", "transition-colors")}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h4 className={cn("font-semibold mb-3", darkMode ? "text-slate-200" : "text-slate-800")}>Resources</h4>
            <ul className="space-y-1.5 text-sm">
              {["Documentation", "API Reference", "Case Studies", "Webinars", "Blog"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className={cn(
                      darkMode ? "text-slate-400 hover:text-emerald-400" : "text-slate-600 hover:text-emerald-600",
                      "transition-colors",
                    )}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={cn("font-semibold mb-3", darkMode ? "text-slate-200" : "text-slate-800")}>Company</h4>
            <ul className="space-y-1.5 text-sm">
              {["About Us", "Careers", "Partners", "Newsroom", "Contact Us"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className={cn(
                      darkMode ? "text-slate-400 hover:text-emerald-400" : "text-slate-600 hover:text-emerald-600",
                      "transition-colors",
                    )}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={cn("font-semibold mb-3", darkMode ? "text-slate-200" : "text-slate-800")}>Get Started</h4>
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-md transition-all transform hover:-translate-y-px">
                <Phone className="h-4 w-4 mr-2" />
                Schedule Demo
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "w-full",
                  darkMode ? "border-slate-600 hover:bg-slate-700" : "border-slate-300 hover:bg-slate-100",
                )}
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
        <Separator className={cn("my-6", darkMode ? "bg-slate-700" : "bg-slate-200")} />
        <div
          className={cn(
            "flex flex-col md:flex-row items-center justify-between text-xs",
            darkMode ? "text-slate-500" : "text-slate-400",
          )}
        >
          <p>
            &copy; {new Date().getFullYear()} Portnox. All rights reserved. This TCO Analyzer is for estimation purposes
            only.
          </p>
          <div className="flex items-center space-x-3 mt-3 md:mt-0">
            <a href="#" className="hover:text-emerald-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-emerald-500 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )

  return (
    <TooltipProvider delayDuration={150}>
      <div
        className={cn(
          "min-h-screen flex font-sans antialiased",
          darkMode ? "dark bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900",
        )}
      >
        {/* Vendor Selection Sidebar */}
        <VendorSelectionPanel
          selectedVendors={selectedVendors}
          onVendorToggle={handleVendorToggle}
          darkMode={darkMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <Header />
          <MainTabNavigation />
          <SubTabNavigation />
          <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-screen-2xl">
              <motion.div
                key={`${activeMainTab}-${activeSubTab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {renderMainContent()}
              </motion.div>
            </div>
          </main>
          <Footer />
        </div>

        {/* Settings Panel */}
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
          setPortnoxAddons={setPortnoxAddons}
          darkMode={darkMode}
        />
      </div>
    </TooltipProvider>
  )
}

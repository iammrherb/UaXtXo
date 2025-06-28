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
import { Progress } from "@/components/ui/progress"
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
  LineChart,
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
  ComposedChart,
  Treemap,
  LabelList,
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
  Phone,
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
  ChevronLeft,
  ChevronRight,
  Calculator,
  Server,
  Wrench,
  LifeBuoy,
  Eye,
  Target,
  Gauge,
  Activity,
  Globe,
  Cpu,
  Tv,
  MapPin,
  Building2,
  Factory,
  GraduationCap,
  Landmark,
  Store,
  Truck,
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

const slideInFromLeft = {
  initial: { x: -300, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },
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

// Industry options with icons
const industryOptions = [
  { value: "technology", label: "Technology", icon: <Cpu /> },
  { value: "healthcare", label: "Healthcare", icon: <Building2 /> },
  { value: "financial", label: "Financial Services", icon: <Landmark /> },
  { value: "manufacturing", label: "Manufacturing", icon: <Factory /> },
  { value: "education", label: "Education", icon: <GraduationCap /> },
  { value: "government", label: "Government", icon: <Building2 /> },
  { value: "retail", label: "Retail", icon: <Store /> },
  { value: "energy", label: "Energy & Utilities", icon: <Zap /> },
  { value: "media", label: "Media & Entertainment", icon: <Tv /> },
  { value: "transportation", label: "Transportation", icon: <Truck /> },
  { value: "other", label: "Other", icon: <Building /> },
]

// Region options
const regionOptions = [
  { value: "north-america", label: "North America", icon: <MapPin /> },
  { value: "europe", label: "Europe", icon: <Globe /> },
  { value: "asia-pacific", label: "Asia Pacific", icon: <Globe /> },
  { value: "latin-america", label: "Latin America", icon: <Globe /> },
  { value: "middle-east-africa", label: "Middle East & Africa", icon: <Globe /> },
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
                                <div className="flex items-center space-x-2">
                                  {React.cloneElement(option.icon, { className: "h-4 w-4" })}
                                  <span>{option.label}</span>
                                </div>
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
                                <div className="flex items-center space-x-2">
                                  {React.cloneElement(option.icon, { className: "h-4 w-4" })}
                                  <span>{option.label}</span>
                                </div>
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

// Collapsible Vendor Selection Panel Component
const VendorSelectionPanel = ({
  selectedVendors,
  onVendorToggle,
  darkMode,
  searchTerm,
  setSearchTerm,
  isCollapsed,
  setIsCollapsed,
}: {
  selectedVendors: string[]
  onVendorToggle: (vendorId: string) => void
  darkMode: boolean
  searchTerm: string
  setSearchTerm: (term: string) => void
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
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
    <motion.div
      className={cn(
        "border-r flex flex-col transition-all duration-300",
        darkMode ? "bg-slate-900 border-slate-700" : "bg-slate-50 border-slate-200",
      )}
      animate={{ width: isCollapsed ? 60 : 320 }}
      initial={{ width: 320 }}
    >
      {/* Collapse/Expand Button */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-emerald-500" />
            <h3 className="font-semibold text-lg">Vendor Selection</h3>
            <Badge variant="secondary" className="ml-auto">
              {selectedVendors.length}
            </Badge>
          </div>
        )}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("p-2", isCollapsed && "mx-auto")}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {!isCollapsed && (
        <>
          {/* Search */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
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
        </>
      )}

      {/* Collapsed State - Show selected vendors count */}
      {isCollapsed && (
        <div className="flex-1 flex flex-col items-center justify-start pt-4 space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-500">{selectedVendors.length}</div>
            <div className="text-xs text-slate-500">Selected</div>
          </div>
          {selectedVendors.slice(0, 3).map((vendorId) => {
            const vendor = VENDOR_DATA[vendorId]
            if (!vendor) return null
            return (
              <div key={vendorId} className="relative">
                <Image
                  src={vendor.logo || "/placeholder.svg"}
                  alt={vendor.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain rounded border border-emerald-500/30"
                />
                {vendorId === "portnox" && <Crown className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500" />}
              </div>
            )
          })}
          {selectedVendors.length > 3 && (
            <div className="text-xs text-slate-500">+{selectedVendors.length - 3} more</div>
          )}
        </div>
      )}
    </motion.div>
  )
}

// Main Enhanced Component
export default function TcoAnalyzerUltimate() {
  const [isClient, setIsClient] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

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

  // Static Header Component
  const Header = () => (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-all duration-300 border-b",
        darkMode ? "bg-slate-900/95 border-slate-700/50" : "bg-white/95 border-slate-200/50",
      )}
    >
      <div className="px-4 sm:px-6 lg:px-8">
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
    </header>
  )

  const MainTabNavigation = () => (
    <nav
      className={cn(
        "fixed top-16 left-0 right-0 z-40 backdrop-blur-md border-b",
        darkMode ? "bg-slate-900/90 border-slate-700/60" : "bg-white/90 border-slate-200/60",
      )}
    >
      <div className="px-4 sm:px-6 lg:px-8">
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
    </nav>
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
      <div
        className={cn(
          "fixed top-28 left-0 right-0 z-30 border-b",
          darkMode ? "bg-slate-800/90 border-slate-700/40" : "bg-slate-50/90 border-slate-200/40",
        )}
      >
        <div className="px-4 sm:px-6 lg:px-8">
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
      </div>
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

  // View Components with Complete Chart Implementations
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

        {/* Detailed Analysis Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cost Breakdown Stacked Chart */}
          <motion.div variants={fadeInUp}>
            <GradientCard darkMode={darkMode}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <FilePieChart className="h-5 w-5 text-emerald-500" />
                  <span>Cost Breakdown</span>
                </CardTitle>
                <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                  Cost components by vendor
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart data={costBreakdownData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                    <XAxis
                      dataKey="vendor"
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 10,
                      }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                    />
                    <ReTooltip
                      formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                      contentStyle={{
                        backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                        border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                        borderRadius: "8px",
                      }}
                    />
                    <ReLegend wrapperStyle={{ fontSize: "10px" }} />
                    <Bar dataKey="software" stackId="a" fill={VIBRANT_COLORS[0]} name="Software" />
                    <Bar dataKey="hardware" stackId="a" fill={VIBRANT_COLORS[1]} name="Hardware" />
                    <Bar dataKey="implementation" stackId="a" fill={VIBRANT_COLORS[2]} name="Implementation" />
                    <Bar dataKey="support" stackId="a" fill={VIBRANT_COLORS[3]} name="Support" />
                    <Bar dataKey="operations" stackId="a" fill={VIBRANT_COLORS[4]} name="Operations" />
                    <Bar dataKey="hidden" stackId="a" fill={VIBRANT_COLORS[5]} name="Hidden" />
                  </ReBarChart>
                </ResponsiveContainer>
              </CardContent>
            </GradientCard>
          </motion.div>

          {/* ROI Comparison Radar */}
          <motion.div variants={fadeInUp}>
            <GradientCard darkMode={darkMode}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Target className="h-5 w-5 text-emerald-500" />
                  <span>ROI Metrics</span>
                </CardTitle>
                <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                  Multi-dimensional ROI analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={roiComparisonData.slice(0, 3)}
                    margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                  >
                    <PolarGrid stroke={darkMode ? "#374151" : "#E5E7EB"} />
                    <PolarAngleAxis
                      dataKey="vendor"
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 10,
                      }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 8,
                      }}
                    />
                    <Radar
                      name="ROI %"
                      dataKey="roi"
                      stroke={PORTNOX_COLORS.primary}
                      fill={PORTNOX_COLORS.primary}
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <ReTooltip
                      contentStyle={{
                        backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                        border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                        borderRadius: "8px",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </GradientCard>
          </motion.div>

          {/* Risk Reduction Chart */}
          <motion.div variants={fadeInUp}>
            <GradientCard darkMode={darkMode}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Shield className="h-5 w-5 text-emerald-500" />
                  <span>Risk Reduction</span>
                </CardTitle>
                <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                  Security risk mitigation
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={riskReductionData} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                    <XAxis
                      dataKey="vendor"
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 10,
                      }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                    />
                    <ReTooltip
                      contentStyle={{
                        backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                        border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                        borderRadius: "8px",
                      }}
                    />
                    <ReLegend wrapperStyle={{ fontSize: "10px" }} />
                    <Bar dataKey="breachReduction" fill={PORTNOX_COLORS.success} name="Breach Reduction %" />
                    <Line
                      type="monotone"
                      dataKey="securityScore"
                      stroke={PORTNOX_COLORS.primary}
                      strokeWidth={2}
                      name="Security Score"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </GradientCard>
          </motion.div>
        </div>

        {/* Implementation Timeline and Savings Treemap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Implementation Timeline */}
          <motion.div variants={fadeInUp}>
            <GradientCard darkMode={darkMode}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Clock className="h-5 w-5 text-emerald-500" />
                  <span>Implementation Timeline</span>
                </CardTitle>
                <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                  Deployment time comparison (hours)
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart
                    data={implementationData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                    <XAxis
                      type="number"
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                    />
                    <YAxis
                      type="category"
                      dataKey="vendor"
                      width={100}
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                    />
                    <ReTooltip
                      formatter={(value: number) => [`${value} hours`, ""]}
                      contentStyle={{
                        backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                        border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                        borderRadius: "8px",
                      }}
                    />
                    <ReLegend wrapperStyle={{ fontSize: "10px" }} />
                    <Bar dataKey="planning" stackId="a" fill={VIBRANT_COLORS[0]} name="Planning" />
                    <Bar dataKey="deployment" stackId="a" fill={VIBRANT_COLORS[1]} name="Deployment" />
                    <Bar dataKey="optimization" stackId="a" fill={VIBRANT_COLORS[2]} name="Optimization" />
                  </ReBarChart>
                </ResponsiveContainer>
              </CardContent>
            </GradientCard>
          </motion.div>

          {/* Cost Savings Treemap */}
          <motion.div variants={fadeInUp}>
            <GradientCard darkMode={darkMode}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <DollarSign className="h-5 w-5 text-emerald-500" />
                  <span>Savings Breakdown</span>
                </CardTitle>
                <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                  Portnox savings by category
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {savingsTreemapData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                      data={savingsTreemapData}
                      dataKey="value"
                      aspectRatio={4 / 3}
                      stroke={darkMode ? "#374151" : "#E5E7EB"}
                      strokeWidth={2}
                    >
                      <ReTooltip
                        formatter={(value: number) => [`$${value.toLocaleString()}`, "Savings"]}
                        contentStyle={{
                          backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                          border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                          borderRadius: "8px",
                        }}
                      />
                    </Treemap>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500">
                    <div className="text-center">
                      <InfoIcon className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">No savings data available</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </GradientCard>
          </motion.div>
        </div>

        {/* Value Proposition Cards */}
        <motion.div className="grid gap-4 md:grid-cols-3" variants={staggerChildren}>
          {[
            {
              icon: <Zap />,
              title: "Rapid Deployment",
              description: `Live in ${VENDOR_DATA.portnox.implementation.deploymentTime.fullDeployment} hours vs. months`,
              stat: "99% Faster",
              gradient: "fire" as const,
            },
            {
              icon: <Activity />,
              title: "AI-Powered Security",
              description: "Predictive threat detection & response",
              stat: "85% Incident Reduction",
              gradient: "ocean" as const,
            },
            {
              icon: <DollarSign />,
              title: "Lowest TCO",
              description: "Cloud-native, no hardware",
              stat: `${savingsPercentVsLowestCompetitor.toFixed(0)}% Savings`,
              gradient: "sunset" as const,
            },
          ].map((item, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <GradientCard gradient={item.gradient} darkMode={darkMode} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <motion.div className="p-3 rounded-lg bg-white/10" whileHover={{ scale: 1.1, rotate: 5 }}>
                      {React.cloneElement(item.icon, { className: "h-6 w-6 text-white" })}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-white/80 mb-2">{item.description}</p>
                      <motion.p
                        className="text-2xl font-bold text-white"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {item.stat}
                      </motion.p>
                    </div>
                  </div>
                </CardContent>
              </GradientCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    )
  }

  // Detailed Cost Analysis View
  const DetailedCostsView = ({
    results,
    years,
    darkMode,
  }: {
    results: CalculationResult[] | null
    years: number
    darkMode?: boolean
  }) => {
    if (!results)
      return (
        <Card className="p-6 text-center text-muted-foreground animate-fade-in">
          <InfoIcon className="mx-auto h-8 w-8 mb-2 text-emerald-500" />
          Calculate TCO to see Detailed Costs.
        </Card>
      )

    const costCategories = ["Software", "Hardware", "Implementation", "Support", "Operations", "Hidden"]
    const categoryIcons: Record<string, JSX.Element> = {
      Software: <DollarSign />,
      Hardware: <Server />,
      Implementation: <Wrench />,
      Support: <LifeBuoy />,
      Operations: <UsersIcon />,
      Hidden: <Eye />,
    }

    // Generate pie chart data for cost distribution
    const generateCostDistributionData = (result: CalculationResult) => {
      return costCategories
        .map((category, index) => ({
          name: category,
          value: result.breakdown?.find((b) => b.name === category)?.value || 0,
          fill: VIBRANT_COLORS[index % VIBRANT_COLORS.length],
        }))
        .filter((item) => item.value > 0)
    }

    // Generate year-over-year cost projection
    const generateYearlyProjection = () => {
      const yearlyData = []
      for (let year = 1; year <= years; year++) {
        const yearData: any = { year: `Year ${year}` }
        results.forEach((result) => {
          yearData[result.vendorName] = (result.total / years) * year
        })
        yearlyData.push(yearData)
      }
      return yearlyData
    }

    const yearlyProjectionData = generateYearlyProjection()

    return (
      <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <GradientCard darkMode={darkMode}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <FilePieChart className="h-5 w-5 text-emerald-500" />
                <span>Detailed Cost Analysis ({years}-Year)</span>
              </CardTitle>
              <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                Comprehensive breakdown of cost components and projections for selected vendors.
              </CardDescription>
            </CardHeader>
          </GradientCard>
        </motion.div>

        {/* Cost Distribution Pie Charts */}
        <motion.div variants={fadeInUp}>
          <GradientCard darkMode={darkMode}>
            <CardHeader>
              <CardTitle className="text-lg">Cost Distribution by Vendor</CardTitle>
              <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                Percentage breakdown of cost categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.slice(0, 6).map((result, index) => (
                  <div key={result.vendor} className="text-center">
                    <h4 className="font-medium mb-2 text-sm">{result.vendorName}</h4>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={generateCostDistributionData(result)}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {generateCostDistributionData(result).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <LabelList
                              dataKey="name"
                              position="outside"
                              style={{
                                fontSize: "10px",
                                fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                              }}
                            />
                          </Pie>
                          <ReTooltip
                            formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                            contentStyle={{
                              backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                              border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                              borderRadius: "8px",
                              fontSize: "12px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Total: ${result.total.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </GradientCard>
        </motion.div>

        {/* Year-over-Year Projection */}
        <motion.div variants={fadeInUp}>
          <GradientCard darkMode={darkMode}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <TrendingUpIcon className="h-5 w-5 text-emerald-500" />
                <span>Cumulative Cost Projection</span>
              </CardTitle>
              <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                Year-over-year cost accumulation
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyProjectionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                  <XAxis
                    dataKey="year"
                    tick={{
                      fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                      fontSize: 12,
                    }}
                  />
                  <YAxis
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    tick={{
                      fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                      fontSize: 12,
                    }}
                  />
                  <ReTooltip
                    formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                    contentStyle={{
                      backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                      border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                      borderRadius: "8px",
                    }}
                  />
                  <ReLegend />
                  {results.map((result, index) => (
                    <Line
                      key={result.vendor}
                      type="monotone"
                      dataKey={result.vendorName}
                      stroke={
                        result.vendor === "portnox"
                          ? PORTNOX_COLORS.primary
                          : VIBRANT_COLORS[index % VIBRANT_COLORS.length]
                      }
                      strokeWidth={result.vendor === "portnox" ? 3 : 2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </GradientCard>
        </motion.div>

        {/* Detailed Cost Breakdown Table */}
        <motion.div variants={fadeInUp}>
          <GradientCard darkMode={darkMode}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <BarChart3 className="h-5 w-5 text-emerald-500" />
                <span>Cost Category Comparison</span>
              </CardTitle>
              <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                Side-by-side comparison of all cost categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={cn("border-b", darkMode ? "border-slate-700" : "border-slate-200")}>
                      <th className="text-left p-3 font-medium">Category</th>
                      {results.map((result) => (
                        <th key={result.vendor} className="text-right p-3 font-medium">
                          {result.vendorName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {costCategories.map((category, categoryIndex) => (
                      <tr
                        key={category}
                        className={cn(
                          "border-b",
                          darkMode ? "border-slate-700/50" : "border-slate-200/50",
                          categoryIndex % 2 === 0
                            ? darkMode
                              ? "bg-slate-800/30"
                              : "bg-slate-50/50"
                            : "bg-transparent",
                        )}
                      >
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <div className="p-1 rounded">
                              {React.cloneElement(categoryIcons[category], {
                                className: "h-4 w-4 text-emerald-500",
                              })}
                            </div>
                            <span className="font-medium">{category}</span>
                          </div>
                        </td>
                        {results.map((result) => {
                          const categoryValue = result.breakdown?.find((b) => b.name === category)?.value || 0
                          const percentage = result.total > 0 ? (categoryValue / result.total) * 100 : 0
                          return (
                            <td key={result.vendor} className="p-3 text-right">
                              <div>
                                <div className="font-medium">${categoryValue.toLocaleString()}</div>
                                <div className="text-xs text-slate-500">{percentage.toFixed(1)}%</div>
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                    <tr className={cn("border-t-2 font-bold", darkMode ? "border-slate-600" : "border-slate-300")}>
                      <td className="p-3">Total TCO</td>
                      {results.map((result) => (
                        <td key={result.vendor} className="p-3 text-right">
                          <div className="text-lg font-bold">${result.total.toLocaleString()}</div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </GradientCard>
        </motion.div>

        {/* Cost Efficiency Metrics */}
        <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
          {results.slice(0, 4).map((result, index) => (
            <motion.div key={result.vendor} variants={fadeInUp}>
              <MetricCard
                title={`${result.vendorName} Efficiency`}
                value={`$${(result.total / currentDeviceCount).toFixed(0)}`}
                detail="Cost per device"
                icon={<Calculator />}
                gradient={result.vendor === "portnox" ? "primary" : "secondary"}
                darkMode={darkMode}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    )
  }

  // ROI Analysis View
  const ROIAnalysisView = ({
    results,
    years,
    darkMode,
  }: {
    results: CalculationResult[] | null
    years: number
    darkMode?: boolean
  }) => {
    if (!results)
      return (
        <Card className="p-6 text-center text-muted-foreground animate-fade-in">
          <InfoIcon className="mx-auto h-8 w-8 mb-2 text-emerald-500" />
          Calculate TCO to see ROI Analysis.
        </Card>
      )

    const generateBusinessValueData = () => {
      return results.map((result) => ({
        vendor: result.vendorName,
        roi: result.roi?.percentage || 0,
        payback: result.roi?.paybackMonths || 0,
        savings: result.roi?.annualSavings || 0,
        laborSavings: result.roi?.laborSavingsFTE || 0,
        breachReduction: (result.roi?.breachRiskReduction || 0) * 100,
        productivityGain: Math.random() * 20 + 10, // Simulated
      }))
    }

    const businessValueData = generateBusinessValueData()

    const generateROIWaterfallData = () => {
      const portnoxResult = results.find((r) => r.vendor === "portnox")
      if (!portnoxResult) return []

      const baseline = 0
      const softwareSavings = 50000
      const hardwareSavings = 75000
      const operationalSavings = 40000
      const riskReduction = 30000
      const productivityGains = 25000

      return [
        { name: "Baseline", value: baseline, cumulative: baseline },
        { name: "Software Savings", value: softwareSavings, cumulative: baseline + softwareSavings },
        {
          name: "Hardware Savings",
          value: hardwareSavings,
          cumulative: baseline + softwareSavings + hardwareSavings,
        },
        {
          name: "Operational Savings",
          value: operationalSavings,
          cumulative: baseline + softwareSavings + hardwareSavings + operationalSavings,
        },
        {
          name: "Risk Reduction",
          value: riskReduction,
          cumulative: baseline + softwareSavings + hardwareSavings + operationalSavings + riskReduction,
        },
        {
          name: "Productivity Gains",
          value: productivityGains,
          cumulative:
            baseline + softwareSavings + hardwareSavings + operationalSavings + riskReduction + productivityGains,
        },
      ]
    }

    const roiWaterfallData = generateROIWaterfallData()

    return (
      <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <GradientCard darkMode={darkMode}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <TrendingUpIcon className="h-5 w-5 text-emerald-500" />
                <span>ROI & Business Value Analysis</span>
              </CardTitle>
              <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                Comprehensive return on investment and business value metrics across all vendors.
              </CardDescription>
            </CardHeader>
          </GradientCard>
        </motion.div>

        {/* ROI Metrics Grid */}
        <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
          {businessValueData.slice(0, 4).map((data, index) => (
            <motion.div key={data.vendor} variants={fadeInUp}>
              <MetricCard
                title={`${data.vendor} ROI`}
                value={`${data.roi.toFixed(0)}%`}
                detail={`${data.payback} mo payback`}
                icon={<RocketIcon />}
                trend="up"
                trendValue={`$${(data.savings / 1000).toFixed(0)}K savings`}
                gradient={data.vendor.includes("Portnox") ? "primary" : "secondary"}
                darkMode={darkMode}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ROI Comparison Chart */}
        <motion.div variants={fadeInUp}>
          <GradientCard darkMode={darkMode}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <BarChart3 className="h-5 w-5 text-emerald-500" />
                <span>ROI Comparison</span>
              </CardTitle>
              <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                Return on investment percentage by vendor
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={businessValueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                  <XAxis
                    dataKey="vendor"
                    tick={{
                      fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                      fontSize: 12,
                    }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    tickFormatter={(value) => `${value}%`}
                    tick={{
                      fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                      fontSize: 12,
                    }}
                  />
                  <ReTooltip
                    formatter={(value: number) => [`${value.toFixed(1)}%`, "ROI"]}
                    contentStyle={{
                      backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                      border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="roi"
                    fill={PORTNOX_COLORS.primary}
                    radius={[4, 4, 0, 0]}
                    name="ROI %"
                    barSize={40}
                  />
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </GradientCard>
        </motion.div>

        {/* Business Value Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payback Period Comparison */}
          <motion.div variants={fadeInUp}>
            <GradientCard darkMode={darkMode}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Clock className="h-5 w-5 text-emerald-500" />
                  <span>Payback Period</span>
                </CardTitle>
                <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                  Time to recover initial investment (months)
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart
                    data={businessValueData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                    <XAxis
                      type="number"
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                    />
                    <YAxis
                      type="category"
                      dataKey="vendor"
                      width={100}
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                    />
                    <ReTooltip
                      formatter={(value: number) => [`${value} months`, "Payback Period"]}
                      contentStyle={{
                        backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                        border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="payback" fill={PORTNOX_COLORS.accent} radius={[0, 4, 4, 0]} barSize={20} />
                  </ReBarChart>
                </ResponsiveContainer>
              </CardContent>
            </GradientCard>
          </motion.div>

          {/* Labor Savings */}
          <motion.div variants={fadeInUp}>
            <GradientCard darkMode={darkMode}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <UsersIcon className="h-5 w-5 text-emerald-500" />
                  <span>Labor Savings</span>
                </CardTitle>
                <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                  Full-time equivalent (FTE) savings
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart data={businessValueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                    <XAxis
                      dataKey="vendor"
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      tickFormatter={(value) => `${value} FTE`}
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                    />
                    <ReTooltip
                      formatter={(value: number) => [`${value.toFixed(1)} FTE`, "Labor Savings"]}
                      contentStyle={{
                        backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                        border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="laborSavings"
                      fill={PORTNOX_COLORS.success}
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                    />
                  </ReBarChart>
                </ResponsiveContainer>
              </CardContent>
            </GradientCard>
          </motion.div>
        </div>

        {/* ROI Waterfall Chart */}
        <motion.div variants={fadeInUp}>
          <GradientCard darkMode={darkMode}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Activity className="h-5 w-5 text-emerald-500" />
                <span>Portnox Value Creation Waterfall</span>
              </CardTitle>
              <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                Breakdown of value creation components
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={roiWaterfallData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                  <XAxis
                    dataKey="name"
                    tick={{
                      fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                      fontSize: 10,
                    }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    tick={{
                      fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                      fontSize: 12,
                    }}
                  />
                  <ReTooltip
                    formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                    contentStyle={{
                      backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                      border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill={PORTNOX_COLORS.primary} radius={[4, 4, 0, 0]} barSize={40} />
                  <Line
                    type="monotone"
                    dataKey="cumulative"
                    stroke={PORTNOX_COLORS.accent}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </GradientCard>
        </motion.div>

        {/* Business Impact Summary */}
        <motion.div className="grid gap-4 md:grid-cols-3" variants={staggerChildren}>
          {[
            {
              icon: <Shield />,
              title: "Risk Mitigation",
              value: `${((results.find((r) => r.vendor === "portnox")?.roi?.breachRiskReduction || 0.8) * 100).toFixed(0)}%`,
              description: "Reduction in security breach probability",
              gradient: "ocean" as const,
            },
            {
              icon: <Gauge />,
              title: "Operational Efficiency",
              value: "85%",
              description: "Improvement in network operations",
              gradient: "fire" as const,
            },
            {
              icon: <TrendingUpIcon />,
              title: "Business Agility",
              value: "3x Faster",
              description: "Time to deploy new network policies",
              gradient: "sunset" as const,
            },
          ].map((item, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <GradientCard gradient={item.gradient} darkMode={darkMode} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <motion.div className="p-3 rounded-lg bg-white/10" whileHover={{ scale: 1.1, rotate: 5 }}>
                      {React.cloneElement(item.icon, { className: "h-6 w-6 text-white" })}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <motion.p
                        className="text-2xl font-bold text-white mb-2"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {item.value}
                      </motion.p>
                      <p className="text-sm text-white/80">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </GradientCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    )
  }

  // Compliance & Risk View
  const ComplianceRiskView = ({
    results,
    industry,
    selectedVendors,
    darkMode,
  }: {
    results: CalculationResult[] | null
    industry: string
    selectedVendors: string[]
    darkMode?: boolean
  }) => {
    const complianceStandards = [
      { name: "SOX", fullName: "Sarbanes-Oxley Act", required: ["financial"] },
      { name: "HIPAA", fullName: "Health Insurance Portability", required: ["healthcare"] },
      { name: "PCI DSS", fullName: "Payment Card Industry", required: ["retail", "financial"] },
      { name: "GDPR", fullName: "General Data Protection Regulation", required: ["all"] },
      { name: "ISO 27001", fullName: "Information Security Management", required: ["all"] },
      { name: "NIST", fullName: "Cybersecurity Framework", required: ["government", "financial"] },
      { name: "FedRAMP", fullName: "Federal Risk Authorization", required: ["government"] },
      { name: "FISMA", fullName: "Federal Information Security", required: ["government"] },
    ]

    const generateComplianceData = () => {
      return selectedVendors.map((vendorId) => {
        const vendor = VENDOR_DATA[vendorId]
        if (!vendor) return null

        return {
          vendor: vendor.name,
          sox: Math.random() * 30 + 70,
          hipaa: Math.random() * 25 + 75,
          pci: Math.random() * 20 + 80,
          gdpr: Math.random() * 15 + 85,
          iso27001: Math.random() * 20 + 80,
          nist: Math.random() * 25 + 75,
          overall: Math.random() * 20 + 80,
        }
      }).filter(Boolean)
    }

    const generateRiskAssessmentData = () => {
      return selectedVendors.map((vendorId) => {
        const vendor = VENDOR_DATA[vendorId]
        if (!vendor) return null

        return {
          vendor: vendor.name,
          dataBreachRisk: Math.random() * 40 + 10,
          complianceRisk: Math.random() * 30 + 15,
          operationalRisk: Math.random() * 35 + 20,
          financialRisk: Math.random() * 45 + 25,
          reputationalRisk: Math.random() * 30 + 20,
          overallRisk: Math.random() * 25 + 15,
        }
      }).filter(Boolean)
    }

    const complianceData = generateComplianceData()
    const riskAssessmentData = generateRiskAssessmentData()

    return (
      <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <GradientCard darkMode={darkMode}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <span>Compliance & Risk Assessment</span>
              </CardTitle>
              <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                Regulatory compliance scores and risk analysis for {industry} industry.
              </CardDescription>
            </CardHeader>
          </GradientCard>
        </motion.div>

        {/* Compliance Standards Overview */}
        <motion.div variants={fadeInUp}>
          <GradientCard darkMode={darkMode}>
            <CardHeader>
              <CardTitle className="text-lg">Industry Compliance Requirements</CardTitle>
              <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                Relevant standards for your industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {complianceStandards
                  .filter(
                    (standard) =>
                      standard.required.includes(industry) || standard.required.includes("all"),
                  )
                  .map((standard, index) => (
                    <div
                      key={standard.name}
                      className={cn(
                        "p-4 rounded-lg border",
                        darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200",
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">{standard.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          Required
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">{standard.fullName}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Portnox Compliance</span>
                          <span className="font-medium text-emerald-600">95%</span>
                        </div>
                        <Progress value={95} className="h-1" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </GradientCard>
        </motion.div>

        {/* Compliance Scores Radar Chart */}
        <motion.div variants={fadeInUp}>
          <GradientCard darkMode={darkMode}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Target className="h-5 w-5 text-emerald-500" />
                <span>Compliance Score Comparison</span>
              </CardTitle>
              <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                Multi-standard compliance assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={complianceData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid stroke={darkMode ? "#374151" : "#E5E7EB"} />
                  <PolarAngleAxis
                    dataKey="vendor"
                    tick={{
                      fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                      fontSize: 12,
                    }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{
                      fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                      fontSize: 10,
                    }}
                  />
                  {["sox", "hipaa", "pci", "gdpr", "iso27001", "nist"].map((standard, index) => (
                    <Radar
                      key={standard}
                      name={standard.toUpperCase()}
                      dataKey={standard}
                      stroke={VIBRANT_COLORS[index % VIBRANT_COLORS.length]}
                      fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]}
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  ))}
                  <ReTooltip
                    contentStyle={{
                      backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                      border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                      borderRadius: "8px",
                    }}
                  />
                  <ReLegend wrapperStyle={{ fontSize: "12px" }} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </GradientCard>
        </motion.div>

        {/* Risk Assessment Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Levels Chart */}
          <motion.div variants={fadeInUp}>
            <GradientCard darkMode={darkMode}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <AlertTriangleIcon className="h-5 w-5 text-emerald-500" />
                  <span>Risk Assessment</span>
                </CardTitle>
                <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                  Risk levels by category
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart data={riskAssessmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                    <XAxis
                      dataKey="vendor"
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                    />
                    <ReTooltip
                      contentStyle={{
                        backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                        border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                        borderRadius: "8px",
                      }}
                    />
                    <ReLegend wrapperStyle={{ fontSize: "10px" }} />
                    <Bar dataKey="dataBreachRisk" fill={PORTNOX_COLORS.danger} name="Data Breach" />
                    <Bar dataKey="complianceRisk" fill={PORTNOX_COLORS.warning} name="Compliance" />
                    <Bar dataKey="operationalRisk" fill={PORTNOX_COLORS.info} name="Operational" />
                    <Bar dataKey="financialRisk" fill={PORTNOX_COLORS.purple} name="Financial" />
                  </ReBarChart>
                </ResponsiveContainer>
              </CardContent>
            </GradientCard>
          </motion.div>

          {/* Risk Mitigation Timeline */}
          <motion.div variants={fadeInUp}>
            <GradientCard darkMode={darkMode}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Shield className="h-5 w-5 text-emerald-500" />
                  <span>Risk Mitigation Timeline</span>
                </CardTitle>
                <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                  Risk reduction over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { month: 0, portnox: 45, average: 65 },
                      { month: 3, portnox: 35, average: 60 },
                      { month: 6, portnox: 25, average: 55 },
                      { month: 12, portnox: 15, average: 50 },
                      { month: 18, portnox: 10, average: 45 },
                      { month: 24, portnox: 8, average: 40 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={PORTNOX_COLORS.primary} stopOpacity={0.6} />
                        <stop offset="95%" stopColor={PORTNOX_COLORS.primary} stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                    <XAxis
                      dataKey="month"
                      tickFormatter={(value) => `${value}mo`}
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
                        `${value}% risk`,
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
                      strokeWidth={2}
                      fill="url(#riskGradient)"
                      name="Portnox"
                    />
                    <Line
                      type="monotone"
                      dataKey="average"
                      stroke={VIBRANT_COLORS[1]}
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={false}
                      name="Industry Average"
                    />
                    <ReLegend wrapperStyle={{ fontSize: "12px" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </GradientCard>
          </motion.div>
        </div>

        {/* Compliance Action Items */}
        <motion.div variants={fadeInUp}>
          <GradientCard darkMode={darkMode}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <FileText className="h-5 w-5 text-emerald-500" />
                <span>Compliance Action Plan</span>
              </CardTitle>
              <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                Recommended actions to achieve full compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    priority: "High",
                    action: "Implement Zero Trust Network Access",
                    timeline: "30 days",
                    impact: "Addresses 85% of compliance gaps",
                    status: "recommended",
                  },
                  {
                    priority: "Medium",
                    action: "Deploy Advanced Threat Protection",
                    timeline: "60 days",
                    impact: "Enhances security posture by 40%",
                    status: "optional",
                  },
                  {
                    priority: "Medium",
                    action: "Enable Compliance Automation",
                    timeline: "45 days",
                    impact: "Reduces manual audit effort by 70%",
                    status: "recommended",
                  },
                  {
                    priority: "Low",
                    action: "Implement Advanced Analytics",
                    timeline: "90 days",
                    impact: "Provides predictive compliance insights",
                    status: "future",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-lg border",
                      darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200",
                    )}
                  >
                    <div className="flex items-center space-x-4">
                      <Badge
                        variant={
                          item.priority === "High" ? "destructive" : item.priority === "Medium" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {item.priority}
                      </Badge>
                      <div>
                        <h4 className="font-medium text-sm">{item.action}</h4>
                        <p className="text-xs text-slate-500">{item.impact}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{item.timeline}</p>
                      <Badge
                        variant={item.status === "recommended" ? "default" : "secondary"}
                        className="text-xs mt-1"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </GradientCard>
        </motion.div>
      </motion.div>
    )
  }

  // Operations Impact View
  const OperationsImpactView = ({
    results,
    currentDeviceCount,
    currentUsersCount,
    region,
    darkMode,
  }: {
    results: CalculationResult[] | null
    currentDeviceCount: number
    currentUsersCount: number
    region: string
    darkMode?: boolean
  }) => {
    const generateOperationalMetrics = () => {
      return selectedVendors.map((vendorId) => {
        const vendor = VENDOR_DATA[vendorId]
        if (!vendor) return null

        return {
          vendor: vendor.name,
          deploymentTime: vendor.implementation?.deploymentTime?.fullDeployment || 120,
          complexity: vendor.implementation?.complexity || "Medium",
          staffRequired: vendorId === "portnox" ? 1 : Math.floor(Math.random() * 4) + 2,
          maintenanceHours: vendorId === "portnox" ? 2 : Math.floor(Math.random() * 15) + 5,
          automationLevel: vendorId === "portnox" ? 95 : Math.floor(Math.random() * 40) + 30,
          userSatisfaction: vendorId === "portnox" ? 4.8 : Math.random() * 1.5 + 3.0,
        }
      }).filter(Boolean)
    }

    const operationalMetrics = generateOperationalMetrics()

    const generateEfficiencyData = () => {
      const months = 12
      const data = []
      for (let month = 1; month <= months; month++) {
        const monthData: any = { month: `M${month}` }
        operationalMetrics.forEach((metric) => {
          if (metric) {
            const baseEfficiency = metric.vendor.includes("Portnox") ? 85 : 60
            const improvement = (month / months) * 20
            monthData[metric.vendor] = Math.min(100, baseEfficiency + improvement + Math.random() * 5)
          }
        })
        data.push(monthData)
      }
      return data
    }

    const efficiencyData = generateEfficiencyData()

    return (
      <motion.div className="space-y-6" initial="initial" animate="animate" variants={staggerChildren}>
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <GradientCard darkMode={darkMode}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-xl">
                <SlidersHorizontal className="h-5 w-5 text-emerald-500" />
                <span>Operations Impact Analysis</span>
              </CardTitle>
              <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                Operational efficiency, staffing requirements, and maintenance impact assessment.
              </CardDescription>
            </CardHeader>
          </GradientCard>
        </motion.div>

        {/* Operational Metrics Grid */}
        <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerChildren}>
          {operationalMetrics.slice(0, 4).map((metric, index) => (
            <motion.div key={metric?.vendor} variants={fadeInUp}>
              <MetricCard
                title={`${metric?.vendor} Efficiency`}
                value={`${metric?.automationLevel}%`}
                detail="Automation level"
                icon={<Activity />}
                trend="up"
                trendValue={`${metric?.staffRequired} staff req.`}
                gradient={metric?.vendor.includes("Portnox") ? "primary" : "secondary"}
                darkMode={darkMode}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Operational Efficiency Timeline */}
        <motion.div variants={fadeInUp}>
          <GradientCard darkMode={darkMode}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <TrendingUpIcon className="h-5 w-5 text-emerald-500" />
                <span>Operational Efficiency Over Time</span>
              </CardTitle>
              <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                Monthly efficiency improvements
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={efficiencyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                  <XAxis
                    dataKey="month"
                    tick={{
                      fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                      fontSize: 12,
                    }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    tick={{
                      fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                      fontSize: 12,
                    }}
                  />
                  <ReTooltip
                    formatter={(value: number, name: string) => [`${value.toFixed(1)}%`, name]}
                    contentStyle={{
                      backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                      border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                      borderRadius: "8px",
                    }}
                  />
                  <ReLegend wrapperStyle={{ fontSize: "12px" }} />
                  {operationalMetrics.map((metric, index) => (
                    <Line
                      key={metric?.vendor}
                      type="monotone"
                      dataKey={metric?.vendor}
                      stroke={
                        metric?.vendor.includes("Portnox")
                          ? PORTNOX_COLORS.primary
                          : VIBRANT_COLORS[index % VIBRANT_COLORS.length]
                      }
                      strokeWidth={metric?.vendor.includes("Portnox") ? 3 : 2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </GradientCard>
        </motion.div>

        {/* Staffing and Maintenance Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Staffing Requirements */}
          <motion.div variants={fadeInUp}>
            <GradientCard darkMode={darkMode}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <UsersIcon className="h-5 w-5 text-emerald-500" />
                  <span>Staffing Requirements</span>
                </CardTitle>
                <CardDescription className={cn(darkMode ? "text-slate-400" : "text-slate-500")}>
                  Full-time staff needed for operations
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart
                    data={operationalMetrics}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#E5E7EB"} />
                    <XAxis
                      type="number"
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                    />
                    <YAxis
                      type="category"
                      dataKey="vendor"
                      width={100}
                      tick={{
                        fill: darkMode ? PORTNOX_COLORS.textSecondaryDark : PORTNOX_COLORS.textSecondaryLight,
                        fontSize: 12,
                      }}
                    />
                    <ReTooltip
                      formatter={(value: number) => [`${value} FTE`, "Staff Required"]}
                      contentStyle={{
                        backgroundColor: darkMode ? PORTNOX_COLORS.cardDark : PORTNOX_COLORS.cardLight,
                        border: `1px solid ${darkMode ? PORTNOX_COLORS.borderDark : PORTNOX_COLORS.borderLight}`,
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="staffRequired" fill={PORTNOX_COLORS.accent} radius={[0, 4, 4, 0]} barSize={20} />
                  </ReBarChart>
                </ResponsiveContainer>
              </CardContent>
            </GradientCard>
          </motion.div>

          {/* Maintenance Hours */}
          <motion.div variants={fadeInUp}>
            <GradientCard darkMode={darkMode}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Wrench className="h-5 w-5 text-emerald-500" />
                  <span>Weekly Maintenance</span>
                </\

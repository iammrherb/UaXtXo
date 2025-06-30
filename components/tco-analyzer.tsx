"use client"

import React, { useState, useMemo, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { compareVendors, type calculateVendorTCO } from "@/lib/tco-calculator"
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
import { Badge } from "@/components/ui/badge"
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
  Line,
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
  Filter,
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
  Minimize2,
  Star,
  Award,
  Target,
  Sparkles,
  Cpu,
  Globe,
  Lock,
  Users,
  AlertTriangle,
  CheckCircle,
  FileDown,
  Printer,
  Share2,
  Calendar,
  Calculator,
  PieChartIcon,
  FileSpreadsheet,
} from "lucide-react"

type CalculationResult = NonNullable<ReturnType<typeof calculateVendorTCO>> & { id?: string }

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

// Compact Vendor Selection Panel Component
const CompactVendorSelectionPanel = ({
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

  // Compact Vendor Card with essential information
  const CompactVendorCard = ({ vendor }: { vendor: any }) => {
    const isSelected = selectedVendors.includes(vendor.id)
    const isPortnox = vendor.id === "portnox"

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative group"
      >
        <Card
          onClick={() => onVendorToggle(vendor.id)}
          className={cn(
            "relative cursor-pointer transition-all duration-300 border-0 overflow-hidden p-3",
            "backdrop-blur-xl bg-white/10 dark:bg-black/20",
            isSelected && "ring-2 ring-primary/50 shadow-lg bg-white/20 dark:bg-black/30",
            darkMode ? "hover:bg-white/20" : "hover:bg-black/5",
          )}
        >
          {/* Selection Indicator */}
          {isSelected && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2 z-10">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            </motion.div>
          )}

          <div className="space-y-2">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={vendor.logo || "/placeholder.svg"}
                  alt={vendor.name}
                  width={24}
                  height={24}
                  className="h-4 w-auto object-contain"
                />
                {isPortnox && <Star className="w-3 h-3 text-yellow-400 fill-current" />}
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs px-1.5 py-0.5",
                  vendor.difficulty <= 2
                    ? "border-green-500/30 text-green-400"
                    : vendor.difficulty <= 3
                      ? "border-yellow-500/30 text-yellow-400"
                      : "border-red-500/30 text-red-400",
                )}
              >
                {vendor.difficulty}/5
              </Badge>
            </div>

            {/* Vendor Name */}
            <h4 className="text-sm font-semibold text-white leading-tight">{vendor.name}</h4>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400">Price:</span>
                <span className="text-white font-medium ml-1">{vendor.priceIndicator}</span>
              </div>
              <div>
                <span className="text-slate-400">Share:</span>
                <span className="text-white font-medium ml-1">{vendor.marketShare}%</span>
              </div>
            </div>

            {/* Deployment Info */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="text-slate-300">
                  {Math.round(vendor.implementation?.deploymentTime?.fullDeployment / 24 || 30)} days
                </span>
              </div>
              <div className="flex items-center gap-1">
                {vendor.implementation?.cloudNative ? (
                  <Globe className="w-3 h-3 text-blue-400" />
                ) : (
                  <Building className="w-3 h-3 text-slate-400" />
                )}
                <span className="text-slate-300">{vendor.implementation?.cloudNative ? "Cloud" : "On-Prem"}</span>
              </div>
            </div>

            {/* Key Features (top 2) */}
            <div className="flex flex-wrap gap-1">
              {Object.entries(vendor.features?.advanced || {})
                .filter(([_, enabled]) => enabled)
                .slice(0, 2)
                .map(([feature, _]) => (
                  <span key={feature} className="px-1.5 py-0.5 text-xs rounded bg-primary/20 text-primary font-medium">
                    {feature.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                ))}
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      animate={{ width: isCollapsed ? 0 : 320 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={cn(
        "border-r flex flex-col flex-shrink-0 overflow-hidden relative",
        darkMode
          ? "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-slate-800/50"
          : "bg-gradient-to-b from-slate-50 via-white to-slate-50 border-slate-200/50",
      )}
    >
      <div className="w-[320px] flex flex-col h-full relative z-10">
        {/* Compact Header */}
        <motion.div
          className={cn(
            "p-4 border-b backdrop-blur-xl",
            darkMode ? "border-slate-800/50 bg-slate-900/50" : "border-slate-200/50 bg-white/50",
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500">
              <Filter className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-white">Vendors</h3>
              <p className="text-xs text-muted-foreground">{selectedVendors.length} selected</p>
            </div>
          </div>

          {/* Compact Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                "pl-8 pr-3 h-8 text-sm border-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl",
                darkMode ? "text-white placeholder:text-slate-400" : "text-slate-900 placeholder:text-slate-500",
              )}
            />
          </div>
        </motion.div>

        {/* Compact Vendor Grid */}
        <ScrollArea className="flex-1">
          <motion.div
            className="p-3 space-y-2"
            variants={modernAnimations.staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredVendors.map((vendor, index) => (
              <motion.div key={vendor.id} variants={modernAnimations.slideInUp} transition={{ delay: index * 0.05 }}>
                <CompactVendorCard vendor={vendor} />
              </motion.div>
            ))}
          </motion.div>
        </ScrollArea>

        {/* Compact Footer */}
        <motion.div
          className={cn(
            "p-3 border-t backdrop-blur-xl",
            darkMode ? "border-slate-800/50 bg-slate-900/50" : "border-slate-200/50 bg-white/50",
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{filteredVendors.length} available</span>
            <span>Max 6 vendors</span>
          </div>
        </motion.div>
      </div>
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

// Enhanced KPI Card with Modern Styling
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

  const colorMap = {
    primary: MODERN_COLORS.gradients.portnox,
    success: MODERN_COLORS.gradients.success,
    warning: MODERN_COLORS.gradients.warning,
    danger: MODERN_COLORS.gradients.danger,
    info: MODERN_COLORS.gradients.info,
    purple: MODERN_COLORS.gradients.hologram,
    cyan: MODERN_COLORS.gradients.aurora,
    pink: MODERN_COLORS.gradients.sunset,
  }

  const selectedGradient = colorMap[color] || MODERN_COLORS.gradients.portnox
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Activity

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-3xl border-0 transition-all duration-500",
        "backdrop-blur-xl bg-white/5 dark:bg-black/10",
        size === "small" && "p-4",
        size === "default" && "p-6",
        size === "large" && "p-8",
      )}
      whileHover={{ y: -12, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => interactive && setIsExpanded(!isExpanded)}
      style={{ cursor: interactive ? "pointer" : "default" }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ background: selectedGradient }}
        animate={{
          opacity: isHovered ? 0.3 : 0.1,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Mesh Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${MODERN_COLORS.primary[400]}60 0%, transparent 50%)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Glass Border */}
      <motion.div
        className="absolute inset-0 rounded-3xl border"
        style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
        animate={{
          borderColor: isHovered ? "rgba(20, 184, 166, 0.5)" : "rgba(255, 255, 255, 0.2)",
          boxShadow: isHovered ? "0 0 40px rgba(20, 184, 166, 0.3)" : "0 0 0px rgba(20, 184, 166, 0)",
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <motion.div
              className="p-4 rounded-2xl relative"
              style={{ background: selectedGradient }}
              animate={isHovered ? modernAnimations.float : {}}
            >
              <Icon className="h-6 w-6 text-white" />

              {/* Icon Glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ background: selectedGradient }}
                animate={{
                  scale: isHovered ? [1, 1.2, 1] : 1,
                  opacity: isHovered ? [0.5, 0.8, 0.5] : 0,
                }}
                transition={{ duration: 1, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
              />
            </motion.div>

            <div>
              <h3 className={cn("text-sm font-semibold", darkMode ? "text-slate-200" : "text-slate-700")}>{title}</h3>
              {subtitle && (
                <p className={cn("text-xs mt-1", darkMode ? "text-slate-400" : "text-slate-500")}>{subtitle}</p>
              )}
            </div>
          </div>

          {interactive && (
            <motion.button
              className={cn("p-2 rounded-xl transition-colors", darkMode ? "hover:bg-white/10" : "hover:bg-black/5")}
              whileHover={modernAnimations.scaleHover}
              whileTap={{ scale: 0.9 }}
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </motion.button>
          )}
        </div>

        {/* Value Display */}
        <motion.div
          className={cn("text-4xl font-bold mb-4", darkMode ? "text-white" : "text-slate-900")}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{value}</span>
        </motion.div>

        {/* Trend Indicator */}
        {trend && trendValue && (
          <motion.div
            className="flex items-center space-x-3 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div
              className={cn(
                "p-2 rounded-xl",
                trend === "up" ? "bg-emerald-500/20" : trend === "down" ? "bg-red-500/20" : "bg-slate-500/20",
              )}
            >
              <TrendIcon
                className={cn(
                  "h-4 w-4",
                  trend === "up" ? "text-emerald-400" : trend === "down" ? "text-red-400" : "text-slate-400",
                )}
              />
            </div>
            <span
              className={cn(
                "text-sm font-semibold",
                trend === "up" ? "text-emerald-400" : trend === "down" ? "text-red-400" : "text-slate-400",
              )}
            >
              {trendValue}
            </span>
          </motion.div>
        )}

        {/* Sparkline Chart */}
        {sparklineData && sparklineData.length > 0 && (
          <motion.div
            className="h-16 -mx-2 -mb-2 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
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
                  strokeWidth={3}
                  fill={`url(#sparkline-${color})`}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 pt-6 border-t border-white/10"
            >
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Previous Period:</span>
                  <span className="text-slate-200 font-semibold">$2.1M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Growth Rate:</span>
                  <span className="text-emerald-400 font-semibold">+23.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Benchmark:</span>
                  <span className="text-slate-200 font-semibold">Industry Avg</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
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
                        : "text-slate-500 hover:text-slate-700",
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

      const portnoxData = results.find((r) => r.vendor === "portnox")
      const competitorData = results.filter((r) => r.vendor !== "portnox")
      const avgCompetitorCost = competitorData.reduce((sum, r) => sum + r.total, 0) / competitorData.length

      return [
        {
          title: "Total Savings",
          value: formatCurrency(avgCompetitorCost - (portnoxData?.total || 0), true),
          subtitle: "vs. Average Competitor",
          icon: DollarSign,
          trend: "up",
          trendValue: `${(((avgCompetitorCost - (portnoxData?.total || 0)) / avgCompetitorCost) * 100).toFixed(1)}%`,
          color: "success",
          sparklineData: generateTimeSeriesData(avgCompetitorCost - (portnoxData?.total || 0), 12, "up"),
        },
        {
          title: "ROI",
          value: `${portnoxData?.roi?.percentage?.toFixed(1) || 0}%`,
          subtitle: `${portnoxData?.roi?.paybackMonths || 0} month payback`,
          icon: TrendingUp,
          trend: "up",
          trendValue: "+23.5%",
          color: "primary",
          sparklineData: generateTimeSeriesData(portnoxData?.roi?.percentage || 0, 12, "up"),
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
        {
          title: "FTE Reduction",
          value: "2.5 FTE",
          subtitle: "IT staff savings",
          icon: Users,
          trend: "down",
          trendValue: "-70%",
          color: "warning",
          sparklineData: generateTimeSeriesData(2.5, 12, "stable"),
        },
        {
          title: "Operational Efficiency",
          value: "85%",
          subtitle: "Process automation",
          icon: Zap,
          trend: "up",
          trendValue: "+65%",
          color: "info",
          sparklineData: generateTimeSeriesData(85, 12, "up"),
        },
      ]
    }, [results])

    return (
      <motion.div className="space-y-8" variants={modernAnimations.staggerContainer} initial="hidden" animate="visible">
        {/* Enhanced KPI Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={modernAnimations.slideInUp}
        >
          {kpiData.map((kpi, index) => (
            <motion.div key={kpi.title} variants={modernAnimations.slideInUp} transition={{ delay: index * 0.1 }}>
              <ModernKPICard {...kpi} darkMode={darkMode} size="default" interactive={true} />
            </motion.div>
          ))}
        </motion.div>

        {/* Comprehensive TCO Comparison Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced TCO Comparison Chart */}
          <motion.div variants={modernAnimations.slideInUp}>
            <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className={cn("text-xl font-bold", darkMode ? "text-white" : "text-slate-900")}>
                      Comprehensive TCO Analysis
                    </CardTitle>
                    <p className={cn("text-sm mt-1", darkMode ? "text-slate-400" : "text-slate-500")}>
                      {projectionYears}-year total cost breakdown with operational impact
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="h-8 bg-transparent">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Drill Down
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
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" />
                          Share Analysis
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
                          total: r.total,
                          licensing: r.licensing,
                          implementation: r.implementation,
                          operations: r.operations,
                          roi: r.roi?.percentage || 0,
                          fteReduction: VENDOR_DATA[r.vendor]?.roi?.operationalEfficiency * 3 || 0,
                        }))}
                      >
                        <defs>
                          <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.2} />
                          </linearGradient>
                          <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.2} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                        <XAxis
                          dataKey="vendor"
                          tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 12 }}
                          axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
                        />
                        <YAxis
                          yAxisId="cost"
                          tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 12 }}
                          axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
                          tickFormatter={(value) => formatCurrency(value, true)}
                        />
                        <YAxis
                          yAxisId="roi"
                          orientation="right"
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
                          formatter={(value: any, name: string) => [
                            typeof value === "number"
                              ? name === "roi"
                                ? `${value.toFixed(1)}%`
                                : name === "fteReduction"
                                  ? `${value.toFixed(1)} FTE`
                                  : formatCurrency(value)
                              : value,
                            name === "roi"
                              ? "ROI"
                              : name === "fteReduction"
                                ? "FTE Reduction"
                                : name.charAt(0).toUpperCase() + name.slice(1),
                          ]}
                        />
                        <ReLegend />
                        <Bar
                          yAxisId="cost"
                          dataKey="total"
                          fill="url(#totalGradient)"
                          radius={[4, 4, 0, 0]}
                          name="Total TCO"
                        />
                        <Line
                          yAxisId="roi"
                          type="monotone"
                          dataKey="roi"
                          stroke="#f59e0b"
                          strokeWidth={3}
                          name="ROI %"
                        />
                        <Area
                          yAxisId="cost"
                          type="monotone"
                          dataKey="fteReduction"
                          fill="url(#roiGradient)"
                          stroke="#8b5cf6"
                          name="FTE Reduction"
                        />
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
                        Select vendors to view comprehensive analysis
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced ROI Timeline Chart */}
          <motion.div variants={modernAnimations.slideInUp}>
            <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className={cn("text-xl font-bold", darkMode ? "text-white" : "text-slate-900")}>
                      ROI & Operational Impact Timeline
                    </CardTitle>
                    <p className={cn("text-sm mt-1", darkMode ? "text-slate-400" : "text-slate-500")}>
                      Return on investment and operational efficiency over time
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="h-8 bg-transparent">
                      <LineChartIcon className="h-3 w-3 mr-1" />
                      Forecast
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={generateTimeSeriesData(100, 60, "up").map((item, index) => ({
                        ...item,
                        roi: item.value,
                        efficiency: Math.min(95, 40 + index * 0.8),
                        fteReduction: Math.min(3, index * 0.05),
                      }))}
                    >
                      <defs>
                        <linearGradient id="roiTimelineGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 12 }}
                        axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
                      />
                      <YAxis
                        yAxisId="left"
                        tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 12 }}
                        axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 12 }}
                        axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
                        tickFormatter={(value) => `${value.toFixed(1)} FTE`}
                      />
                      <ReTooltip
                        contentStyle={{
                          backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                          border: "none",
                          borderRadius: "12px",
                          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                        formatter={(value: any, name: string) => [
                          name === "fteReduction" ? `${value.toFixed(1)} FTE` : `${value.toFixed(1)}%`,
                          name === "roi" ? "ROI" : name === "efficiency" ? "Operational Efficiency" : "FTE Reduction",
                        ]}
                        labelFormatter={(label) => `Month ${label}`}
                      />
                      <ReLegend />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="roi"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fill="url(#roiTimelineGradient)"
                        name="ROI %"
                      />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="efficiency"
                        stroke="#10b981"
                        strokeWidth={2}
                        fill="url(#efficiencyGradient)"
                        name="Efficiency %"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="fteReduction"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        name="FTE Reduction"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Enhanced Bottom Section - Detailed Analytics */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8" variants={modernAnimations.slideInUp}>
          {/* Detailed Key Insights */}
          <motion.div variants={modernAnimations.slideInUp}>
            <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle
                  className={cn("text-lg font-bold flex items-center", darkMode ? "text-white" : "text-slate-900")}
                >
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-400" />
                  Detailed Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className={cn("p-4 rounded-xl", darkMode ? "bg-white/5" : "bg-black/5")}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span className="text-sm font-semibold">67% TCO Reduction</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Portnox delivers industry-leading cost efficiency through cloud-native architecture and automated
                      operations
                    </p>
                  </div>

                  <div className={cn("p-4 rounded-xl", darkMode ? "bg-white/5" : "bg-black/5")}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <span className="text-sm font-semibold">94% Faster Deployment</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      7-day deployment vs 120+ days for traditional solutions, enabling rapid time-to-value
                    </p>
                  </div>

                  <div className={cn("p-4 rounded-xl", darkMode ? "bg-white/5" : "bg-black/5")}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                      <span className="text-sm font-semibold">2.5 FTE Savings</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Automated policy management and AI-driven operations reduce IT overhead by 70%
                    </p>
                  </div>

                  <div className={cn("p-4 rounded-xl", darkMode ? "bg-white/5" : "bg-black/5")}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                      <span className="text-sm font-semibold">98% Risk Reduction</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      AI-powered threat detection and automated remediation significantly reduce security incidents
                    </p>
                  </div>

                  <div className={cn("p-4 rounded-xl", darkMode ? "bg-white/5" : "bg-black/5")}>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                      <span className="text-sm font-semibold">85% Process Automation</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Comprehensive automation of compliance, monitoring, and policy enforcement workflows
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Portnox Competitive Advantages */}
          <motion.div variants={modernAnimations.slideInUp}>
            <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle
                  className={cn("text-lg font-bold flex items-center", darkMode ? "text-white" : "text-slate-900")}
                >
                  <Award className="h-5 w-5 mr-2 text-emerald-400" />
                  Portnox Advantages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div
                    className={cn(
                      "p-4 rounded-xl border-l-4 border-emerald-400",
                      darkMode ? "bg-emerald-400/10" : "bg-emerald-50",
                    )}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Globe className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm font-semibold">100% Cloud-Native</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      No hardware dependencies, infinite scalability, automatic updates
                    </p>
                  </div>

                  <div
                    className={cn(
                      "p-4 rounded-xl border-l-4 border-blue-400",
                      darkMode ? "bg-blue-400/10" : "bg-blue-50",
                    )}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Cpu className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-semibold">AI-Powered Analytics</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Machine learning for threat detection, behavioral analysis, and predictive insights
                    </p>
                  </div>

                  <div
                    className={cn(
                      "p-4 rounded-xl border-l-4 border-purple-400",
                      darkMode ? "bg-purple-400/10" : "bg-purple-50",
                    )}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Zap className="h-4 w-4 text-purple-400" />
                      <span className="text-sm font-semibold">Agentless Deployment</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      97% agentless coverage, minimal endpoint impact, simplified management
                    </p>
                  </div>

                  <div
                    className={cn(
                      "p-4 rounded-xl border-l-4 border-orange-400",
                      darkMode ? "bg-orange-400/10" : "bg-orange-50",
                    )}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Lock className="h-4 w-4 text-orange-400" />
                      <span className="text-sm font-semibold">Zero Trust Architecture</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Native zero trust implementation with continuous verification and risk assessment
                    </p>
                  </div>

                  <div
                    className={cn(
                      "p-4 rounded-xl border-l-4 border-cyan-400",
                      darkMode ? "bg-cyan-400/10" : "bg-cyan-50",
                    )}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Activity className="h-4 w-4 text-cyan-400" />
                      <span className="text-sm font-semibold">Real-Time Response</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Instant threat response, automated remediation, sub-second policy enforcement
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Executive Summary */}
          <motion.div variants={modernAnimations.slideInUp}>
            <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle
                  className={cn("text-lg font-bold flex items-center", darkMode ? "text-white" : "text-slate-900")}
                >
                  <Target className="h-5 w-5 mr-2 text-teal-400" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-emerald-400">Business Impact</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Portnox CLEAR delivers a {savingsPercentVsLowestCompetitor.toFixed(1)}% cost advantage over the
                      nearest competitor, translating to {formatCurrency(totalSavingsVsLowestCompetitor)} in savings
                      over {projectionYears} years. The solution enables rapid deployment with 94% faster time-to-value
                      and 70% reduction in operational overhead.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-blue-400">Strategic Advantages</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Cloud-native architecture eliminates hardware dependencies and provides infinite scalability.
                      AI-powered automation reduces manual processes by 85%, while comprehensive API integration enables
                      seamless ecosystem connectivity and future-proof operations.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-purple-400">Risk Mitigation</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Zero Trust architecture with continuous verification reduces breach risk by 94%. Real-time threat
                      detection and automated remediation provide comprehensive security coverage with minimal IT
                      resource requirements.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-orange-400">Recommendation</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Portnox CLEAR represents the optimal choice for organizations seeking comprehensive NAC
                      capabilities with minimal complexity and maximum ROI. The solution's cloud-native design and
                      AI-powered automation provide sustainable competitive advantages.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  // TCO Analysis Tab Content
  const TcoAnalysisContent = () => {
    return (
      <motion.div className="space-y-8" variants={modernAnimations.staggerContainer} initial="hidden" animate="visible">
        {activeSubTab === "cost-breakdown" && (
          <motion.div variants={modernAnimations.slideInUp}>
            <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className={cn("text-xl font-bold", darkMode ? "text-white" : "text-slate-900")}>
                  Detailed Cost Breakdown Analysis
                </CardTitle>
                <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                  Comprehensive breakdown of all cost components over {projectionYears} years
                </p>
              </CardHeader>
              <CardContent>
                {results && results.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Stacked Bar Chart */}
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <Bar
                          data={results.map((r) => ({
                            vendor: r.vendorName,
                            licensing: r.licensing,
                            implementation: r.implementation,
                            operations: r.operations,
                            hardware: r.hardware || 0,
                            training: r.training || 0,
                            support: r.support || 0,
                          }))}
                        >
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
                              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                            }}
                            formatter={(value: any) => [formatCurrency(value), ""]}
                          />
                          <ReLegend />
                          <Bar dataKey="licensing" stackId="a" fill="#14b8a6" name="Licensing" />
                          <Bar dataKey="implementation" stackId="a" fill="#3b82f6" name="Implementation" />
                          <Bar dataKey="operations" stackId="a" fill="#f59e0b" name="Operations" />
                          <Bar dataKey="hardware" stackId="a" fill="#ef4444" name="Hardware" />
                          <Bar dataKey="training" stackId="a" fill="#8b5cf6" name="Training" />
                          <Bar dataKey="support" stackId="a" fill="#06b6d4" name="Support" />
                        </Bar>
                      </ResponsiveContainer>
                    </div>

                    {/* Cost Breakdown Table */}
                    <div className="space-y-4">
                      <h4 className={cn("text-lg font-semibold", darkMode ? "text-white" : "text-slate-900")}>
                        Cost Component Analysis
                      </h4>
                      <div className="space-y-3">
                        {results.map((result) => (
                          <div
                            key={result.vendor}
                            className={cn(
                              "p-4 rounded-xl border",
                              darkMode ? "bg-white/5 border-slate-700/50" : "bg-slate-50/50 border-slate-200/50",
                            )}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <Image
                                  src={VENDOR_DATA[result.vendor]?.logo || "/placeholder.svg"}
                                  alt={result.vendorName}
                                  width={24}
                                  height={24}
                                  className="h-6 w-auto"
                                />
                                <span className="font-semibold">{result.vendorName}</span>
                              </div>
                              <span className="text-lg font-bold text-emerald-400">{formatCurrency(result.total)}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Licensing:</span>
                                <span>{formatCurrency(result.licensing)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Implementation:</span>
                                <span>{formatCurrency(result.implementation)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Operations:</span>
                                <span>{formatCurrency(result.operations)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Hardware:</span>
                                <span>{formatCurrency(result.hardware || 0)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center">
                    <div className="text-center">
                      <FilePieChart
                        className={cn("h-12 w-12 mx-auto mb-4", darkMode ? "text-slate-600" : "text-slate-400")}
                      />
                      <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                        Select vendors to view detailed cost breakdown
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeSubTab === "roi-analysis" && (
          <motion.div variants={modernAnimations.slideInUp}>
            <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className={cn("text-xl font-bold", darkMode ? "text-white" : "text-slate-900")}>
                  ROI & Business Value Analysis
                </CardTitle>
                <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                  Return on investment and business value metrics comparison
                </p>
              </CardHeader>
              <CardContent>
                {results && results.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* ROI Comparison Chart */}
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                          data={results.map((r) => ({
                            vendor: r.vendorName,
                            roi: r.roi?.percentage || 0,
                            payback: r.roi?.paybackMonths || 0,
                            npv: r.roi?.npv || 0,
                          }))}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                          <XAxis
                            dataKey="vendor"
                            tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 12 }}
                            axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
                          />
                          <YAxis
                            yAxisId="left"
                            tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 12 }}
                            axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <YAxis
                            yAxisId="right"
                            orientation="right"
                            tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 12 }}
                            axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
                            tickFormatter={(value) => `${value}mo`}
                          />
                          <ReTooltip
                            contentStyle={{
                              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                              border: "none",
                              borderRadius: "12px",
                              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                            }}
                            formatter={(value: any, name: string) => [
                              name === "roi"
                                ? `${value.toFixed(1)}%`
                                : name === "payback"
                                  ? `${value} months`
                                  : formatCurrency(value),
                              name === "roi" ? "ROI" : name === "payback" ? "Payback Period" : "NPV",
                            ]}
                          />
                          <ReLegend />
                          <Bar yAxisId="left" dataKey="roi" fill="#10b981" name="ROI %" />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="payback"
                            stroke="#f59e0b"
                            strokeWidth={3}
                            name="Payback (months)"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>

                    {/* ROI Metrics Table */}
                    <div className="space-y-4">
                      <h4 className={cn("text-lg font-semibold", darkMode ? "text-white" : "text-slate-900")}>
                        Business Value Metrics
                      </h4>
                      <div className="space-y-3">
                        {results.map((result) => (
                          <div
                            key={result.vendor}
                            className={cn(
                              "p-4 rounded-xl border",
                              darkMode ? "bg-white/5 border-slate-700/50" : "bg-slate-50/50 border-slate-200/50",
                            )}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <Image
                                  src={VENDOR_DATA[result.vendor]?.logo || "/placeholder.svg"}
                                  alt={result.vendorName}
                                  width={24}
                                  height={24}
                                  className="h-6 w-auto"
                                />
                                <span className="font-semibold">{result.vendorName}</span>
                              </div>
                              <Badge
                                variant={
                                  result.roi?.percentage && result.roi.percentage > 100 ? "default" : "secondary"
                                }
                                className={
                                  result.roi?.percentage && result.roi.percentage > 100
                                    ? "bg-emerald-500/20 text-emerald-400"
                                    : ""
                                }
                              >
                                {result.roi?.percentage?.toFixed(1) || 0}% ROI
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Payback Period:</span>
                                <span>{result.roi?.paybackMonths || 0} months</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">NPV:</span>
                                <span>{formatCurrency(result.roi?.npv || 0)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Risk Reduction:</span>
                                <span>
                                  {((VENDOR_DATA[result.vendor]?.roi?.breachRiskReduction || 0) * 100).toFixed(0)}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Efficiency Gain:</span>
                                <span>
                                  {((VENDOR_DATA[result.vendor]?.roi?.operationalEfficiency || 0) * 100).toFixed(0)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp
                        className={cn("h-12 w-12 mx-auto mb-4", darkMode ? "text-slate-600" : "text-slate-400")}
                      />
                      <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                        Select vendors to view ROI analysis
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeSubTab === "operations" && (
          <motion.div variants={modernAnimations.slideInUp}>
            <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className={cn("text-xl font-bold", darkMode ? "text-white" : "text-slate-900")}>
                  Operations Impact Analysis
                </CardTitle>
                <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                  Operational efficiency and resource impact comparison
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* FTE Impact Chart */}
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={
                          results?.map((r) => ({
                            vendor: r.vendorName,
                            fteReduction: (VENDOR_DATA[r.vendor]?.roi?.operationalEfficiency || 0) * 3,
                            deploymentTime:
                              (VENDOR_DATA[r.vendor]?.implementation?.deploymentTime?.fullDeployment || 0) / 24,
                            complexity: VENDOR_DATA[r.vendor]?.difficulty || 1,
                          })) || []
                        }
                      >
                        <defs>
                          <linearGradient id="fteGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
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
                          tickFormatter={(value) => `${value.toFixed(1)} FTE`}
                        />
                        <ReTooltip
                          contentStyle={{
                            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                          }}
                          formatter={(value: any, name: string) => [
                            name === "fteReduction"
                              ? `${value.toFixed(1)} FTE`
                              : name === "deploymentTime"
                                ? `${value} days`
                                : `${value}/5`,
                            name === "fteReduction"
                              ? "FTE Reduction"
                              : name === "deploymentTime"
                                ? "Deployment Time"
                                : "Complexity",
                          ]}
                        />
                        <ReLegend />
                        <Area
                          type="monotone"
                          dataKey="fteReduction"
                          stroke="#8b5cf6"
                          fill="url(#fteGradient)"
                          name="FTE Reduction"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Operations Metrics */}
                  <div className="space-y-4">
                    <h4 className={cn("text-lg font-semibold", darkMode ? "text-white" : "text-slate-900")}>
                      Operational Metrics
                    </h4>
                    <div className="space-y-3">
                      {results?.map((result) => (
                        <div
                          key={result.vendor}
                          className={cn(
                            "p-4 rounded-xl border",
                            darkMode ? "bg-white/5 border-slate-700/50" : "bg-slate-50/50 border-slate-200/50",
                          )}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <Image
                                src={VENDOR_DATA[result.vendor]?.logo || "/placeholder.svg"}
                                alt={result.vendorName}
                                width={24}
                                height={24}
                                className="h-6 w-auto"
                              />
                              <span className="font-semibold">{result.vendorName}</span>
                            </div>
                            <Badge
                              variant={VENDOR_DATA[result.vendor]?.difficulty <= 2 ? "default" : "secondary"}
                              className={
                                VENDOR_DATA[result.vendor]?.difficulty <= 2
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : VENDOR_DATA[result.vendor]?.difficulty <= 3
                                    ? "bg-yellow-500/20 text-yellow-400"
                                    : "bg-red-500/20 text-red-400"
                              }
                            >
                              {VENDOR_DATA[result.vendor]?.difficulty}/5 Complexity
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Deployment:</span>
                              <span>
                                {Math.round(
                                  (VENDOR_DATA[result.vendor]?.implementation?.deploymentTime?.fullDeployment || 0) /
                                    24,
                                )}{" "}
                                days
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">FTE Reduction:</span>
                              <span>
                                {((VENDOR_DATA[result.vendor]?.roi?.operationalEfficiency || 0) * 3).toFixed(1)} FTE
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Automation:</span>
                              <span>
                                {((VENDOR_DATA[result.vendor]?.roi?.operationalEfficiency || 0) * 100).toFixed(0)}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Cloud Native:</span>
                              <span>{VENDOR_DATA[result.vendor]?.implementation?.cloudNative ? "Yes" : "No"}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeSubTab === "timeline" && (
          <motion.div variants={modernAnimations.slideInUp}>
            <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className={cn("text-xl font-bold", darkMode ? "text-white" : "text-slate-900")}>
                  Implementation Timeline View
                </CardTitle>
                <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                  Deployment timeline and milestone comparison
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {results?.map((result) => (
                    <div key={result.vendor} className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={VENDOR_DATA[result.vendor]?.logo || "/placeholder.svg"}
                          alt={result.vendorName}
                          width={32}
                          height={32}
                          className="h-8 w-auto"
                        />
                        <div>
                          <h4 className={cn("text-lg font-semibold", darkMode ? "text-white" : "text-slate-900")}>
                            {result.vendorName}
                          </h4>
                          <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                            Total deployment:{" "}
                            {Math.round(
                              (VENDOR_DATA[result.vendor]?.implementation?.deploymentTime?.fullDeployment || 0) / 24,
                            )}{" "}
                            days
                          </p>
                        </div>
                      </div>

                      {/* Timeline visualization */}
                      <div className="relative">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                          <span className="text-sm font-medium">Planning & Design</span>
                          <span className="text-xs text-muted-foreground">
                            {Math.round((VENDOR_DATA[result.vendor]?.implementation?.deploymentTime?.poc || 24) / 24)}{" "}
                            days
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                          <span className="text-sm font-medium">Implementation</span>
                          <span className="text-xs text-muted-foreground">
                            {Math.round(
                              ((VENDOR_DATA[result.vendor]?.implementation?.deploymentTime?.fullDeployment || 0) -
                                (VENDOR_DATA[result.vendor]?.implementation?.deploymentTime?.poc || 0)) /
                                24,
                            )}{" "}
                            days
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                          <span className="text-sm font-medium">Testing & Validation</span>
                          <span className="text-xs text-muted-foreground">
                            {Math.round(
                              ((VENDOR_DATA[result.vendor]?.implementation?.deploymentTime?.fullScale || 0) / 24) * 0.2,
                            )}{" "}
                            days
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                          <span className="text-sm font-medium">Go-Live & Support</span>
                          <span className="text-xs text-muted-foreground">Ongoing</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    )
  }

  // Vendor Comparison Tab Content
  const VendorComparisonContent = () => {
    return (
      <motion.div className="space-y-8" variants={modernAnimations.staggerContainer} initial="hidden" animate="visible">
        {activeSubTab === "feature-matrix" && (
          <motion.div variants={modernAnimations.slideInUp}>
            <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className={cn("text-xl font-bold", darkMode ? "text-white" : "text-slate-900")}>
                  Feature Comparison Matrix
                </CardTitle>
                <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                  Comprehensive feature comparison across selected vendors
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={cn("border-b", darkMode ? "border-slate-700" : "border-slate-200")}>
                        <th className="text-left p-4 font-semibold">Feature</th>
                        {selectedVendors.map((vendorId) => (
                          <th key={vendorId} className="text-center p-4 font-semibold min-w-32">
                            <div className="flex flex-col items-center space-y-2">
                              <Image
                                src={VENDOR_DATA[vendorId]?.logo || "/placeholder.svg"}
                                alt={VENDOR_DATA[vendorId]?.name || ""}
                                width={24}
                                height={24}
                                className="h-6 w-auto"
                              />
                              <span className="text-xs">{VENDOR_DATA[vendorId]?.name}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Core Features */}
                      <tr className={cn("border-b", darkMode ? "border-slate-800" : "border-slate-100")}>
                        <td colSpan={selectedVendors.length + 1} className="p-4 font-semibold text-emerald-400">
                          Core Features
                        </td>
                      </tr>
                      {Object.keys(VENDOR_DATA.portnox.features.core).map((feature) => (
                        <tr
                          key={feature}
                          className={cn("border-b", darkMode ? "border-slate-800/50" : "border-slate-100")}
                        >
                          <td className="p-4 text-sm">{feature}</td>
                          {selectedVendors.map((vendorId) => (
                            <td key={vendorId} className="text-center p-4">
                              {VENDOR_DATA[vendorId]?.features?.core?.[feature] ? (
                                <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-red-400 mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}

                      {/* Advanced Features */}
                      <tr className={cn("border-b", darkMode ? "border-slate-800" : "border-slate-100")}>
                        <td colSpan={selectedVendors.length + 1} className="p-4 font-semibold text-blue-400">
                          Advanced Features
                        </td>
                      </tr>
                      {Object.keys(VENDOR_DATA.portnox.features.advanced).map((feature) => (
                        <tr
                          key={feature}
                          className={cn("border-b", darkMode ? "border-slate-800/50" : "border-slate-100")}
                        >
                          <td className="p-4 text-sm">{feature}</td>
                          {selectedVendors.map((vendorId) => (
                            <td key={vendorId} className="text-center p-4">
                              {VENDOR_DATA[vendorId]?.features?.advanced?.[feature] ? (
                                <CheckCircle className="h-5 w-5 text-emerald-400 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-red-400 mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeSubTab === "roadmap" && (
          <motion.div variants={modernAnimations.slideInUp}>
            <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className={cn("text-xl font-bold", darkMode ? "text-white" : "text-slate-900")}>
                  Implementation Roadmap Comparison
                </CardTitle>
                <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                  Deployment timeline and complexity comparison
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {selectedVendors.map((vendorId) => (
                    <div key={vendorId} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Image
                            src={VENDOR_DATA[vendorId]?.logo || "/placeholder.svg"}
                            alt={VENDOR_DATA[vendorId]?.name || ""}
                            width={32}
                            height={32}
                            className="h-8 w-auto"
                          />
                          <div>
                            <h4 className={cn("text-lg font-semibold", darkMode ? "text-white" : "text-slate-900")}>
                              {VENDOR_DATA[vendorId]?.name}
                            </h4>
                            <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                              {VENDOR_DATA[vendorId]?.implementation?.complexity} complexity
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={VENDOR_DATA[vendorId]?.difficulty <= 2 ? "default" : "secondary"}
                          className={
                            VENDOR_DATA[vendorId]?.difficulty <= 2
                              ? "bg-emerald-500/20 text-emerald-400"
                              : VENDOR_DATA[vendorId]?.difficulty <= 3
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }
                        >
                          {Math.round(
                            (VENDOR_DATA[vendorId]?.implementation?.deploymentTime?.fullDeployment || 0) / 24,
                          )}{" "}
                          days
                        </Badge>
                      </div>

                      {/* Roadmap visualization */}
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-blue-500"></div>

                        <div className="space-y-6">
                          <div className="relative">
                            <div className="absolute -left-2 w-4 h-4 rounded-full bg-emerald-500"></div>
                            <div className="ml-4">
                              <h5 className="font-semibold text-sm">Phase 1: Planning & Assessment</h5>
                              <p className="text-xs text-muted-foreground">
                                {Math.round((VENDOR_DATA[vendorId]?.implementation?.deploymentTime?.poc || 24) / 24)}{" "}
                                days
                              </p>
                              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                                <li>• Requirements gathering</li>
                                <li>• Network assessment</li>
                                <li>• Architecture design</li>
                              </ul>
                            </div>
                          </div>

                          <div className="relative">
                            <div className="absolute -left-2 w-4 h-4 rounded-full bg-blue-500"></div>
                            <div className="ml-4">
                              <h5 className="font-semibold text-sm">Phase 2: Implementation</h5>
                              <p className="text-xs text-muted-foreground">
                                {Math.round(
                                  ((VENDOR_DATA[vendorId]?.implementation?.deploymentTime?.fullDeployment || 0) -
                                    (VENDOR_DATA[vendorId]?.implementation?.deploymentTime?.poc || 0)) /
                                    24,
                                )}{" "}
                                days
                              </p>
                              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                                <li>
                                  •{" "}
                                  {VENDOR_DATA[vendorId]?.implementation?.requiresHardware
                                    ? "Hardware installation"
                                    : "Cloud deployment"}
                                </li>
                                <li>• Policy configuration</li>
                                <li>• Integration setup</li>
                              </ul>
                            </div>
                          </div>

                          <div className="relative">
                            <div className="absolute -left-2 w-4 h-4 rounded-full bg-purple-500"></div>
                            <div className="ml-4">
                              <h5 className="font-semibold text-sm">Phase 3: Testing & Validation</h5>
                              <p className="text-xs text-muted-foreground">
                                {Math.round(
                                  ((VENDOR_DATA[vendorId]?.implementation?.deploymentTime?.fullScale || 0) / 24) * 0.2,
                                )}{" "}
                                days
                              </p>
                              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                                <li>• Pilot testing</li>
                                <li>• Performance validation</li>
                                <li>• Security verification</li>
                              </ul>
                            </div>
                          </div>

                          <div className="relative">
                            <div className="absolute -left-2 w-4 h-4 rounded-full bg-orange-500"></div>
                            <div className="ml-4">
                              <h5 className="font-semibold text-sm">Phase 4: Go-Live & Support</h5>
                              <p className="text-xs text-muted-foreground">Ongoing</p>
                              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                                <li>• Production rollout</li>
                                <li>• User training</li>
                                <li>• Ongoing support</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeSubTab === "vendor-details" && (
          <motion.div variants={modernAnimations.slideInUp}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {selectedVendors.map((vendorId) => (
                <Card key={vendorId} className="bg-slate-800/30 border-slate-700/50 shadow-xl">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={VENDOR_DATA[vendorId]?.logo || "/placeholder.svg"}
                        alt={VENDOR_DATA[vendorId]?.name || ""}
                        width={48}
                        height={48}
                        className="h-12 w-auto"
                      />
                      <div>
                        <CardTitle className={cn("text-xl font-bold", darkMode ? "text-white" : "text-slate-900")}>
                          {VENDOR_DATA[vendorId]?.name}
                        </CardTitle>
                        <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                          {VENDOR_DATA[vendorId]?.category} • {VENDOR_DATA[vendorId]?.marketShare}% market share
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{VENDOR_DATA[vendorId]?.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Key Metrics</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Price Range:</span>
                          <span>{VENDOR_DATA[vendorId]?.priceIndicator}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Complexity:</span>
                          <span>{VENDOR_DATA[vendorId]?.difficulty}/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cloud Native:</span>
                          <span>{VENDOR_DATA[vendorId]?.implementation?.cloudNative ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Hardware Req:</span>
                          <span>{VENDOR_DATA[vendorId]?.implementation?.requiresHardware ? "Yes" : "No"}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Strengths</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {VENDOR_DATA[vendorId]?.strengths?.map((strength, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-3 w-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Considerations</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {VENDOR_DATA[vendorId]?.weaknesses?.map((weakness, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <AlertTriangle className="h-3 w-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span>{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    )
  }

  // Compliance & Risk Tab Content
  const ComplianceRiskContent = () => {
    const complianceData = [
      { framework: "SOX", portnox: 95, cisco: 85, aruba: 80, meraki: 70 },
      { framework: "HIPAA", portnox: 98, cisco: 90, aruba: 85, meraki: 75 },
      { framework: "PCI DSS", portnox: 96, cisco: 88, aruba: 82, meraki: 72 },
      { framework: "GDPR", portnox: 94, cisco: 86, aruba: 81, meraki: 71 },
      { framework: "ISO 27001", portnox: 97, cisco: 89, aruba: 84, meraki: 74 },
    ]

    const riskMetrics = [
      { category: "Breach Risk", portnox: 6, cisco: 35, aruba: 28, meraki: 42 },
      { category: "Downtime Risk", portnox: 2, cisco: 15, aruba: 12, meraki: 18 },
      { category: "Compliance Risk", portnox: 5, cisco: 14, aruba: 19, meraki: 29 },
      { category: "Operational Risk", portnox: 8, cisco: 25, aruba: 22, meraki: 31 },
    ]

    return (
      <motion.div className="space-y-8" variants={modernAnimations.staggerContainer} initial="hidden" animate="visible">
        {/* Compliance Scorecard */}
        <motion.div variants={modernAnimations.slideInUp}>
          <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className={cn("text-xl font-bold", darkMode ? "text-white" : "text-slate-900")}>
                Compliance Framework Scorecard
              </CardTitle>
              <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                Compliance readiness across major regulatory frameworks
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <Bar data={complianceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis
                      dataKey="framework"
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
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                      formatter={(value: any) => [`${value}%`, ""]}
                    />
                    <ReLegend />
                    <Bar dataKey="portnox" fill="#14b8a6" name="Portnox" />
                    <Bar dataKey="cisco" fill="#3b82f6" name="Cisco" />
                    <Bar dataKey="aruba" fill="#f59e0b" name="Aruba" />
                    <Bar dataKey="meraki" fill="#8b5cf6" name="Meraki" />
                  </Bar>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Risk Assessment */}
        <motion.div variants={modernAnimations.slideInUp}>
          <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className={cn("text-xl font-bold", darkMode ? "text-white" : "text-slate-900")}>
                Risk Assessment Matrix
              </CardTitle>
              <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                Comparative risk levels across security categories
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <Bar data={riskMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis
                      dataKey="category"
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
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                      formatter={(value: any) => [`${value}% Risk`, ""]}
                    />
                    <ReLegend />
                    <Bar dataKey="portnox" fill="#10b981" name="Portnox" />
                    <Bar dataKey="cisco" fill="#ef4444" name="Cisco" />
                    <Bar dataKey="aruba" fill="#f59e0b" name="Aruba" />
                    <Bar dataKey="meraki" fill="#8b5cf6" name="Meraki" />
                  </Bar>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Risk Analysis */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8" variants={modernAnimations.slideInUp}>
          <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className={cn("text-lg font-bold", darkMode ? "text-white" : "text-slate-900")}>
                Security Risk Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className={cn("p-4 rounded-xl", darkMode ? "bg-emerald-500/10" : "bg-emerald-50")}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">Data Breach Risk</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400">Low</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Portnox's AI-powered threat detection reduces breach probability by 94%
                  </p>
                </div>

                <div className={cn("p-4 rounded-xl", darkMode ? "bg-blue-500/10" : "bg-blue-50")}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">Compliance Violations</span>
                    <Badge className="bg-blue-500/20 text-blue-400">Very Low</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Automated compliance monitoring ensures continuous adherence to regulations
                  </p>
                </div>

                <div className={cn("p-4 rounded-xl", darkMode ? "bg-purple-500/10" : "bg-purple-50")}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">Operational Disruption</span>
                    <Badge className="bg-purple-500/20 text-purple-400">Minimal</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Cloud-native architecture eliminates single points of failure
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className={cn("text-lg font-bold", darkMode ? "text-white" : "text-slate-900")}>
                Compliance Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className={cn("p-4 rounded-xl", darkMode ? "bg-white/5" : "bg-slate-50")}>
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-semibold">Automated Audit Trails</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Comprehensive logging and reporting for all compliance frameworks
                  </p>
                </div>

                <div className={cn("p-4 rounded-xl", darkMode ? "bg-white/5" : "bg-slate-50")}>
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-semibold">Real-time Monitoring</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Continuous compliance monitoring with instant violation alerts
                  </p>
                </div>

                <div className={cn("p-4 rounded-xl", darkMode ? "bg-white/5" : "bg-slate-50")}>
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-semibold">Policy Automation</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Automated policy enforcement reduces human error and ensures consistency
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    )
  }

  // Reports Tab Content
  const ReportsContent = () => {
    const [reportType, setReportType] = useState("executive")
    const [reportFormat, setReportFormat] = useState("pdf")
    const [customizations, setCustomizations] = useState({
      includeCostBreakdown: true,
      includeROIAnalysis: true,
      includeRiskAssessment: true,
      includeComplianceMatrix: true,
      includeVendorComparison: true,
      includeExecutiveSummary: true,
      includeCharts: true,
      includeRecommendations: true,
    })

    const reportTemplates = [
      {
        id: "executive",
        name: "Executive Summary Report",
        description: "High-level overview for C-suite and decision makers",
        icon: <FileText />,
        pages: "8-12 pages",
        sections: ["Executive Summary", "Key Findings", "ROI Analysis", "Recommendations"],
      },
      {
        id: "technical",
        name: "Technical Analysis Report",
        description: "Detailed technical comparison and implementation guide",
        icon: <FileSpreadsheet />,
        pages: "15-25 pages",
        sections: ["Technical Specifications", "Feature Matrix", "Implementation Roadmap", "Risk Analysis"],
      },
      {
        id: "financial",
        name: "Financial Impact Report",
        description: "Comprehensive financial analysis and cost modeling",
        icon: <Calculator />,
        pages: "10-15 pages",
        sections: ["Cost Breakdown", "ROI Projections", "Budget Planning", "Financial Recommendations"],
      },
      {
        id: "compliance",
        name: "Compliance & Risk Report",
        description: "Regulatory compliance and security risk assessment",
        icon: <Shield />,
        pages: "12-18 pages",
        sections: ["Compliance Matrix", "Risk Assessment", "Security Analysis", "Audit Readiness"],
      },
    ]

    const generateReport = () => {
      // This would typically trigger the actual report generation
      console.log("Generating report:", { reportType, reportFormat, customizations })
      // For demo purposes, we'll just show a success message
      alert(`Generating ${reportType} report in ${reportFormat.toUpperCase()} format...`)
    }

    const exportToHTML = () => {
      // Generate HTML report
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Portnox TCO Analysis Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 40px; }
            .section { margin-bottom: 30px; }
            .chart { background: #f5f5f5; padding: 20px; margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Portnox TCO Analysis Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="section">
            <h2>Executive Summary</h2>
            <p>Portnox CLEAR delivers significant cost advantages and operational benefits...</p>
          </div>
          
          <div class="section">
            <h2>Cost Analysis</h2>
            <table>
              <tr><th>Vendor</th><th>Total TCO</th><th>Savings vs Portnox</th></tr>
              ${
                results
                  ?.map(
                    (r) => `
                <tr>
                  <td>${r.vendorName}</td>
                  <td>$${r.total.toLocaleString()}</td>
                  <td>${r.vendor === "portnox" ? "Baseline" : `$${(r.total - (portnoxResult?.total || 0)).toLocaleString()}`}</td>
                </tr>
              `,
                  )
                  .join("") || ""
              }
            </table>
          </div>
        </body>
        </html>
      `

      const blob = new Blob([htmlContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "portnox-tco-report.html"
      a.click()
      URL.revokeObjectURL(url)
    }

    return (
      <motion.div className="space-y-8" variants={modernAnimations.staggerContainer} initial="hidden" animate="visible">
        {/* Report Templates */}
        <motion.div variants={modernAnimations.slideInUp}>
          <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className={cn("text-xl font-bold", darkMode ? "text-white" : "text-slate-900")}>
                Professional Report Templates
              </CardTitle>
              <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                Choose from professionally designed report templates
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    className={cn(
                      "p-6 rounded-xl border-2 cursor-pointer transition-all duration-300",
                      reportType === template.id
                        ? "border-emerald-500 bg-emerald-500/10"
                        : darkMode
                          ? "border-slate-700/50 bg-white/5 hover:bg-white/10"
                          : "border-slate-200/50 bg-slate-50/50 hover:bg-slate-100/50",
                    )}
                    onClick={() => setReportType(template.id)}
                    whileHover={modernAnimations.scaleHover}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={cn(
                          "p-3 rounded-xl",
                          reportType === template.id
                            ? "bg-emerald-500 text-white"
                            : darkMode
                              ? "bg-slate-700 text-slate-300"
                              : "bg-slate-200 text-slate-600",
                        )}
                      >
                        {React.cloneElement(template.icon, { className: "h-6 w-6" })}
                      </div>
                      <div className="flex-1">
                        <h4 className={cn("font-semibold mb-2", darkMode ? "text-white" : "text-slate-900")}>
                          {template.name}
                        </h4>
                        <p className={cn("text-sm mb-3", darkMode ? "text-slate-400" : "text-slate-500")}>
                          {template.description}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{template.pages}</span>
                          <Badge variant="outline" className="text-xs">
                            {template.sections.length} sections
                          </Badge>
                        </div>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {template.sections.slice(0, 2).map((section) => (
                              <span key={section} className="px-2 py-1 text-xs rounded bg-slate-500/20 text-slate-400">
                                {section}
                              </span>
                            ))}
                            {template.sections.length > 2 && (
                              <span className="px-2 py-1 text-xs rounded bg-slate-500/20 text-slate-400">
                                +{template.sections.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Report Customization */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8" variants={modernAnimations.slideInUp}>
          <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className={cn("text-lg font-bold", darkMode ? "text-white" : "text-slate-900")}>
                Report Customization
              </CardTitle>
              <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                Customize report content and sections
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {Object.entries(customizations).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </span>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => setCustomizations({ ...customizations, [key]: checked })}
                      className="data-[state=checked]:bg-emerald-500"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className={cn("text-lg font-bold", darkMode ? "text-white" : "text-slate-900")}>
                Export Options
              </CardTitle>
              <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                Choose format and delivery options
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Report Format</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "pdf", label: "PDF", icon: <FileDown /> },
                    { value: "html", label: "HTML", icon: <Globe /> },
                    { value: "excel", label: "Excel", icon: <FileSpreadsheet /> },
                    { value: "powerpoint", label: "PowerPoint", icon: <PieChartIcon /> },
                  ].map((format) => (
                    <motion.button
                      key={format.value}
                      onClick={() => setReportFormat(format.value)}
                      className={cn(
                        "p-3 rounded-xl border-2 transition-all duration-300 flex items-center space-x-2",
                        reportFormat === format.value
                          ? "border-emerald-500 bg-emerald-500/10"
                          : darkMode
                            ? "border-slate-700/50 bg-white/5 hover:bg-white/10"
                            : "border-slate-200/50 bg-slate-50/50 hover:bg-slate-100/50",
                      )}
                      whileHover={modernAnimations.scaleHover}
                      whileTap={{ scale: 0.98 }}
                    >
                      {React.cloneElement(format.icon, {
                        className: cn(
                          "h-4 w-4",
                          reportFormat === format.value ? "text-emerald-400" : "text-muted-foreground",
                        ),
                      })}
                      <span className="text-sm font-medium">{format.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Generated on: {new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Organization: {initialOrgSizeDetails[orgSizeKey]?.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Industry: {industryOptions.find((i) => i.value === industry)?.label}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Generate Report Actions */}
        <motion.div variants={modernAnimations.slideInUp}>
          <Card className="bg-slate-800/30 border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className={cn("text-lg font-bold", darkMode ? "text-white" : "text-slate-900")}>
                Generate Professional Report
              </CardTitle>
              <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                Create and export your customized TCO analysis report
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <motion.div whileHover={modernAnimations.scaleHover} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={generateReport}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                  >
                    <FileDown className="h-4 w-4 mr-2" />
                    Generate {reportFormat.toUpperCase()} Report
                  </Button>
                </motion.div>

                <motion.div whileHover={modernAnimations.scaleHover} whileTap={{ scale: 0.95 }}>
                  <Button onClick={exportToHTML} variant="outline">
                    <Globe className="h-4 w-4 mr-2" />
                    Export HTML
                  </Button>
                </motion.div>

                <motion.div whileHover={modernAnimations.scaleHover} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline">
                    <Printer className="h-4 w-4 mr-2" />
                    Print Preview
                  </Button>
                </motion.div>

                <motion.div whileHover={modernAnimations.scaleHover} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Report
                  </Button>
                </motion.div>

                <motion.div whileHover={modernAnimations.scaleHover} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save Template
                  </Button>
                </motion.div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                <div className="flex items-start space-x-3">
                  <InfoIcon className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-1">Professional Report Features</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Executive-ready formatting with professional branding</li>
                      <li>• Interactive charts and visualizations</li>
                      <li>• Comprehensive data analysis and insights</li>
                      <li>• Customizable sections and content</li>
                      <li>• Multiple export formats (PDF, HTML, Excel, PowerPoint)</li>
                      <li>• Automated calculations and projections</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    )
  }

  // Main content renderer
  const renderMainContent = () => {
    switch (activeMainTab) {
      case "dashboard":
        return <ExecutiveDashboard />
      case "analysis":
        return <TcoAnalysisContent />
      case "comparison":
        return <VendorComparisonContent />
      case "compliance":
        return <ComplianceRiskContent />
      case "reports":
        return <ReportsContent />
      default:
        return <ExecutiveDashboard />
    }
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading TCO Analyzer...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "min-h-screen transition-all duration-500",
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-50",
      )}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/5 to-pink-500/5 blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <ModernHeader />

      {/* Main Navigation */}
      <ModernMainTabNavigation />

      {/* Sub Navigation */}
      <ModernSubTabNavigation />

      {/* Main Layout */}
      <div className="flex relative z-10">
        {/* Compact Vendor Selection Sidebar */}
        <CompactVendorSelectionPanel
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
            "fixed left-2 top-1/2 transform -translate-y-1/2 z-50 p-2 rounded-full transition-all duration-300",
            darkMode
              ? "bg-slate-800/80 hover:bg-slate-700/80 text-slate-300"
              : "bg-white/80 hover:bg-slate-100/80 text-slate-700",
            "backdrop-blur-xl border shadow-lg",
            darkMode ? "border-slate-700/50" : "border-slate-200/50",
          )}
          whileHover={modernAnimations.scaleHover}
          whileTap={{ scale: 0.9 }}
        >
          {sidebarCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </motion.button>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-hidden">
          <motion.div
            className="max-w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {renderMainContent()}
          </motion.div>
        </main>
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
  )
}

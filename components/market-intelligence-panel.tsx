"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  AlertTriangle,
  Archive,
  Bell,
  Clock,
  DollarSign,
  ExternalLink,
  Globe,
  Search,
  Shield,
  TrendingUp,
  Zap,
  Calendar,
  BookOpen,
  Newspaper,
  Rss,
} from "lucide-react"
import { useMarketAlerts, type MarketAlert } from "@/lib/hooks/use-market-data"

interface MarketIntelligencePanelProps {
  isOpen: boolean
  onClose: () => void
  selectedVendors: string[]
}

interface NewsArticle {
  id: string
  title: string
  summary: string
  source: string
  url: string
  timestamp: Date
  category: "security" | "pricing" | "market" | "regulatory" | "product"
  vendor: string
  verified: boolean
}

interface ProductRelease {
  id: string
  vendor: string
  product: string
  version: string
  releaseDate: Date
  features: string[]
  impact: "high" | "medium" | "low"
  description: string
  url: string
}

const SAMPLE_NEWS: NewsArticle[] = [
  {
    id: "1",
    title: "Cisco ISE Critical Vulnerability Exploited in the Wild",
    summary: "CVE-2024-0001 allows remote code execution on unpatched ISE deployments. CISA adds to KEV catalog.",
    source: "CISA",
    url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    category: "security",
    vendor: "cisco",
    verified: true,
  },
  {
    id: "2",
    title: "Aruba Networks Announces Price Increases for 2024",
    summary: "HPE Aruba announces 15% price increase across ClearPass portfolio effective Q2 2024.",
    source: "HPE Aruba",
    url: "https://www.arubanetworks.com/support-services/end-of-life/",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    category: "pricing",
    vendor: "aruba",
    verified: true,
  },
  {
    id: "3",
    title: "Portnox Expands European Data Center Footprint",
    summary: "New facilities in Frankfurt and Amsterdam improve latency and data sovereignty for EU customers.",
    source: "Portnox Press Release",
    url: "https://www.portnox.com/press-releases/",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    category: "market",
    vendor: "portnox",
    verified: true,
  },
  {
    id: "4",
    title: "EU NIS2 Directive Impact on Network Access Control",
    summary: "New cybersecurity requirements mandate enhanced NAC capabilities for critical infrastructure.",
    source: "European Commission",
    url: "https://digital-strategy.ec.europa.eu/en/library/nis2-directive",
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
    category: "regulatory",
    vendor: "all",
    verified: true,
  },
  {
    id: "5",
    title: "Forescout Releases Enhanced IoT Device Profiling",
    summary: "New machine learning algorithms improve device identification accuracy by 23%.",
    source: "Forescout Blog",
    url: "https://www.forescout.com/blog/",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    category: "product",
    vendor: "forescout",
    verified: true,
  },
]

const SAMPLE_RELEASES: ProductRelease[] = [
  {
    id: "1",
    vendor: "portnox",
    product: "Portnox CLEAR",
    version: "24.1",
    releaseDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    features: ["Enhanced Zero Trust policies", "AI-powered threat detection", "Improved API performance"],
    impact: "high",
    description: "Major release with enhanced Zero Trust capabilities and AI-powered threat detection.",
    url: "https://www.portnox.com/release-notes/",
  },
  {
    id: "2",
    vendor: "cisco",
    product: "Cisco ISE",
    version: "3.2 Patch 4",
    releaseDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    features: ["Security patches", "Bug fixes", "Performance improvements"],
    impact: "high",
    description: "Critical security patch addressing CVE-2024-0001 and other vulnerabilities.",
    url: "https://www.cisco.com/c/en/us/support/security/identity-services-engine/products-release-notes-list.html",
  },
  {
    id: "3",
    vendor: "aruba",
    product: "ClearPass",
    version: "6.11.2",
    releaseDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    features: ["New device profiling", "Enhanced reporting", "API improvements"],
    impact: "medium",
    description: "Feature release with improved device profiling and enhanced reporting capabilities.",
    url: "https://www.arubanetworks.com/techdocs/ClearPass/",
  },
]

export default function MarketIntelligencePanel({ isOpen, onClose, selectedVendors }: MarketIntelligencePanelProps) {
  const [activeTab, setActiveTab] = useState("alerts")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showArchived, setShowArchived] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<MarketAlert | null>(null)
  const { alerts, unreadCount, markAsRead, markAllAsRead } = useMarketAlerts()

  const [archivedAlerts, setArchivedAlerts] = useState<MarketAlert[]>([])
  const [news, setNews] = useState<NewsArticle[]>(SAMPLE_NEWS)
  const [releases, setReleases] = useState<ProductRelease[]>(SAMPLE_RELEASES)

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || alert.type === selectedCategory
    const matchesVendor =
      selectedVendors.length === 0 || selectedVendors.includes(alert.vendor) || alert.vendor === "all"
    return matchesSearch && matchesCategory && matchesVendor
  })

  const filteredNews = news.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    const matchesVendor =
      selectedVendors.length === 0 || selectedVendors.includes(article.vendor) || article.vendor === "all"
    return matchesSearch && matchesCategory && matchesVendor
  })

  const filteredReleases = releases.filter((release) => {
    const matchesSearch =
      release.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      release.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesVendor = selectedVendors.length === 0 || selectedVendors.includes(release.vendor)
    return matchesSearch && matchesVendor
  })

  const archiveAlert = (alertId: number) => {
    const alertToArchive = alerts.find((a) => a.id === alertId)
    if (alertToArchive) {
      setArchivedAlerts((prev) => [...prev, alertToArchive])
      // In a real app, you'd remove from alerts array
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security":
        return <Shield className="h-4 w-4 text-red-400" />
      case "pricing":
        return <DollarSign className="h-4 w-4 text-orange-400" />
      case "market":
        return <TrendingUp className="h-4 w-4 text-blue-400" />
      case "regulatory":
        return <AlertTriangle className="h-4 w-4 text-purple-400" />
      case "product":
        return <Zap className="h-4 w-4 text-green-400" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-600"
      case "high":
        return "bg-orange-600"
      case "medium":
        return "bg-yellow-600"
      case "low":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[800px] lg:w-[1000px] bg-slate-900 border-gray-700 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 border-b border-gray-800/50 bg-black/20 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="p-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg shadow-lg"
                >
                  <Globe className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Market Intelligence Center
                  </SheetTitle>
                  <p className="text-sm text-gray-400 mt-1">
                    Real-time NAC market insights, alerts, and competitive intelligence
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Badge variant="destructive" className="bg-red-600 shadow-lg">
                      {unreadCount} new
                    </Badge>
                  </motion.div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700"
                >
                  Mark All Read
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search alerts, news, and releases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-gray-200"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-gray-200 text-sm"
              >
                <option value="all">All Categories</option>
                <option value="security">Security</option>
                <option value="pricing">Pricing</option>
                <option value="market">Market</option>
                <option value="regulatory">Regulatory</option>
                <option value="product">Product</option>
              </select>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 border-b border-gray-800/50 rounded-none">
                <TabsTrigger value="alerts" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Alerts
                  {unreadCount > 0 && (
                    <Badge className="h-4 w-4 p-0 text-xs bg-red-600 text-white border-0 rounded-full flex items-center justify-center">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="news" className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4" />
                  News & Analysis
                </TabsTrigger>
                <TabsTrigger value="releases" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Product Releases
                </TabsTrigger>
                <TabsTrigger value="archive" className="flex items-center gap-2">
                  <Archive className="h-4 w-4" />
                  Archive
                </TabsTrigger>
              </TabsList>

              {/* Alerts Tab */}
              <TabsContent value="alerts" className="flex-1 m-0">
                <ScrollArea className="h-full">
                  <div className="p-6 space-y-4">
                    <AnimatePresence>
                      {filteredAlerts.map((alert, index) => (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.01, x: 5 }}
                          className={`p-4 rounded-xl border backdrop-blur-sm cursor-pointer transition-all duration-200 ${
                            !alert.read
                              ? "bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-700/50"
                              : "bg-gray-800/30 border-gray-700/50"
                          }`}
                          onClick={() => setSelectedAlert(alert)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">{getCategoryIcon(alert.type)}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-white">{alert.title}</h4>
                                <Badge className={`text-xs ${getSeverityColor(alert.severity)} text-white border-0`}>
                                  {alert.severity}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-gray-800/50 border-gray-600 text-gray-300"
                                >
                                  {alert.vendor}
                                </Badge>
                                {!alert.read && (
                                  <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                    className="w-2 h-2 bg-orange-400 rounded-full"
                                  />
                                )}
                              </div>
                              <p className="text-sm text-gray-300 mb-3">{alert.description}</p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {alert.timestamp.toLocaleString()}
                                  </div>
                                  {alert.source && (
                                    <div className="flex items-center gap-1">
                                      <BookOpen className="h-3 w-3" />
                                      {alert.source}
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      archiveAlert(alert.id)
                                    }}
                                    className="h-6 px-2 text-xs text-gray-400 hover:text-white"
                                  >
                                    <Archive className="h-3 w-3 mr-1" />
                                    Archive
                                  </Button>
                                  <ExternalLink className="h-3 w-3" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* News Tab */}
              <TabsContent value="news" className="flex-1 m-0">
                <ScrollArea className="h-full">
                  <div className="p-6 space-y-4">
                    <AnimatePresence>
                      {filteredNews.map((article, index) => (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.01, x: 5 }}
                          className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/50 backdrop-blur-sm cursor-pointer transition-all duration-200"
                          onClick={() => window.open(article.url, "_blank")}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">{getCategoryIcon(article.category)}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-white">{article.title}</h4>
                                {article.verified && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-green-900/30 border-green-700 text-green-300"
                                  >
                                    Verified
                                  </Badge>
                                )}
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-gray-800/50 border-gray-600 text-gray-300"
                                >
                                  {article.vendor}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-300 mb-3">{article.summary}</p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {article.timestamp.toLocaleString()}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Rss className="h-3 w-3" />
                                    {article.source}
                                  </div>
                                </div>
                                <ExternalLink className="h-3 w-3" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Releases Tab */}
              <TabsContent value="releases" className="flex-1 m-0">
                <ScrollArea className="h-full">
                  <div className="p-6 space-y-4">
                    <AnimatePresence>
                      {filteredReleases.map((release, index) => (
                        <motion.div
                          key={release.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.01, x: 5 }}
                          className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/50 backdrop-blur-sm cursor-pointer transition-all duration-200"
                          onClick={() => window.open(release.url, "_blank")}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                              <Zap className="h-5 w-5 text-green-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-white">
                                  {release.product} {release.version}
                                </h4>
                                <Badge
                                  className={`text-xs border-0 ${
                                    release.impact === "high"
                                      ? "bg-red-600"
                                      : release.impact === "medium"
                                        ? "bg-yellow-600"
                                        : "bg-blue-600"
                                  } text-white`}
                                >
                                  {release.impact} impact
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-gray-800/50 border-gray-600 text-gray-300"
                                >
                                  {release.vendor}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-300 mb-3">{release.description}</p>
                              <div className="mb-3">
                                <h5 className="text-xs font-medium text-gray-400 mb-1">Key Features:</h5>
                                <div className="flex flex-wrap gap-1">
                                  {release.features.slice(0, 3).map((feature, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="secondary"
                                      className="text-xs bg-blue-900/30 text-blue-300"
                                    >
                                      {feature}
                                    </Badge>
                                  ))}
                                  {release.features.length > 3 && (
                                    <Badge variant="secondary" className="text-xs bg-gray-800/50 text-gray-400">
                                      +{release.features.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  Released: {release.releaseDate.toLocaleDateString()}
                                </div>
                                <ExternalLink className="h-3 w-3" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* Archive Tab */}
              <TabsContent value="archive" className="flex-1 m-0">
                <ScrollArea className="h-full">
                  <div className="p-6">
                    {archivedAlerts.length === 0 ? (
                      <div className="text-center py-12">
                        <Archive className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-300 mb-2">No Archived Items</h3>
                        <p className="text-gray-500">Archived alerts and notifications will appear here.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {archivedAlerts.map((alert, index) => (
                          <motion.div
                            key={alert.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-4 rounded-xl bg-gray-800/20 border border-gray-700/30 backdrop-blur-sm opacity-60"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 mt-1">{getCategoryIcon(alert.type)}</div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold text-gray-300">{alert.title}</h4>
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-gray-800/50 border-gray-600 text-gray-400"
                                  >
                                    Archived
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-400">{alert.description}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Alert Detail Dialog */}
        <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
          <DialogContent className="max-w-2xl bg-slate-900 border-gray-700">
            {selectedAlert && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                    {getCategoryIcon(selectedAlert.type)}
                    {selectedAlert.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <p className="text-gray-300">{selectedAlert.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-400">Severity:</span>
                        <Badge className={`text-xs ${getSeverityColor(selectedAlert.severity)} text-white border-0`}>
                          {selectedAlert.severity}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-400">Impact:</span>
                        <span className="text-sm text-gray-300">{selectedAlert.impact || "Medium"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-400">Vendor:</span>
                        <span className="text-sm text-gray-300">{selectedAlert.vendor}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-400">Source:</span>
                        <span className="text-sm text-gray-300">{selectedAlert.source || "Market Intelligence"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-400">Time:</span>
                        <span className="text-sm text-gray-300">{selectedAlert.timestamp.toLocaleString()}</span>
                      </div>
                      {selectedAlert.effectiveDate && (
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-400">Effective:</span>
                          <span className="text-sm text-gray-300">{selectedAlert.effectiveDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                    <h4 className="font-medium text-blue-300 mb-2">Recommendation:</h4>
                    <p className="text-sm text-blue-200">
                      {selectedAlert.recommendation || "Monitor situation and assess impact on your environment."}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        markAsRead(selectedAlert.id)
                        setSelectedAlert(null)
                      }}
                      className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700"
                    >
                      Mark as Read
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        archiveAlert(selectedAlert.id)
                        setSelectedAlert(null)
                      }}
                      className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700"
                    >
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </SheetContent>
    </Sheet>
  )
}

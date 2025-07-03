"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useModalStore } from "@/src/stores/useModalStore"
import { useVendorData } from "@/hooks/useVendorData"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, XCircle } from "lucide-react"

const VendorDetailModal = () => {
  const { isOpen, vendorId, closeModal } = useModalStore()
  const { getVendorById } = useVendorData()
  const vendor = vendorId ? getVendorById(vendorId) : null

  if (!vendor) return null

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="max-w-3xl bg-slate-900/80 border-slate-700 text-white backdrop-blur-lg">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-cyan-400 flex items-center gap-4">
                  <img
                    src={vendor.logoUrl || "/placeholder.svg"}
                    alt={`${vendor.name} logo`}
                    className="h-8 bg-white/10 p-1 rounded"
                  />
                  {vendor.name}
                </DialogTitle>
                <DialogDescription className="text-slate-400">{vendor.shortDescription}</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[70vh] mt-4 pr-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg text-emerald-400 mb-2">Key Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="p-3 bg-slate-800/50 rounded-lg">
                        <p className="text-xs text-slate-400">Security Score</p>
                        <p className="text-xl font-bold">{vendor.comparativeScores?.securityEffectiveness}/100</p>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg">
                        <p className="text-xs text-slate-400">Ease of Deployment</p>
                        <p className="text-xl font-bold">{vendor.comparativeScores?.easeOfDeployment}/100</p>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg">
                        <p className="text-xs text-slate-400">TCO Score</p>
                        <p className="text-xl font-bold">{vendor.comparativeScores?.totalCostOfOwnershipScore}/100</p>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg">
                        <p className="text-xs text-slate-400">Deployment Time</p>
                        <p className="text-xl font-bold">{vendor.implementation.averageDeploymentTimeDays} days</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-lg text-emerald-400 mb-2">Strengths</h3>
                      <ul className="space-y-2">
                        {vendor.strengths?.map((strength, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-red-400 mb-2">Weaknesses</h3>
                      <ul className="space-y-2">
                        {vendor.weaknesses?.map((weakness, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-300">{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-emerald-400 mb-2">Core Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(vendor.features || {}).flatMap(([category, features]) =>
                        Object.entries(features)
                          .filter(([_, value]) => (value?.score || 0) >= 80)
                          .map(([feature, _]) => (
                            <Badge key={feature} variant="secondary" className="bg-slate-700 text-slate-300">
                              {feature}
                            </Badge>
                          )),
                      )}
                    </div>
                  </div>

                  {vendor.licensingDetails && (
                    <div>
                      <h3 className="font-semibold text-lg text-emerald-400 mb-2">Pricing & Licensing</h3>
                      <p className="text-sm text-slate-400 mb-3">{vendor.licensingDetails.modelDescription}</p>
                      <div className="space-y-2">
                        {Object.entries(vendor.licensingDetails.licensingTiers).map(([tier, details]) => (
                          <div key={tier} className="p-3 bg-slate-800/50 rounded-lg">
                            <p className="font-semibold text-cyan-300">{tier}</p>
                            <p className="text-xs text-slate-400">
                              List Price: {details.listPrice} | Street Price: {details.streetPrice || "N/A"}
                            </p>
                            <p className="text-xs text-slate-400">Features: {details.features?.join(", ")}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

export default VendorDetailModal

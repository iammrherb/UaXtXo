import type { VendorDetails } from "@/types/vendor-analysis"

export const COMPREHENSIVE_VENDOR_DATA: Record<string, VendorDetails> = {
  portnox: {
    id: "portnox",
    name: "Portnox CLEAR",
    description: "AI-powered cloud-native NAC delivering zero-trust security with unmatched simplicity. Portnox CLEAR revolutionizes network access control with intelligent device classification, automated policy enforcement, and seamless cloud deployment that takes minutes, not months.",
    category: "cloud-native",
    marketPosition: "visionary",
    licensing: {
      base: [
        {
          name: "Essentials",
          listPrice: 20,
          unit: "device",
          period: "year",
          features: ["Basic NAC", "Cloud RADIUS", "Device Discovery", "Basic Policies"]
        },
        {
          name: "Professional",
          listPrice: 30,
          unit: "device", 
          period: "year",
          features: ["Advanced NAC", "Risk Scoring", "AI Classification", "Advanced Policies", "Guest Access"]

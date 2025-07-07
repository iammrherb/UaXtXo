"use client"

import { useState, useMemo } from "react"
import { INDUSTRIES, INDUSTRY_ROI } from "@/lib/vendors/comprehensive-vendor-data"

interface ROICalculatorProps {
  industry?: string
  deviceCount?: number
  currentSpend?: number
}

export function ComprehensiveROICalculator({
  industry = 'HEALTHCARE',
  deviceCount = 500,
  currentSpend = 0
}: ROICalculatorProps) {
  const [activeTab, setActiveTab] = useState('financial')
  
  // Input parameters
  const [avgSalary, setAvgSalary] = useState(120000)
  const [currentFTE, setCurrentFTE] = useState(2.5)
  const [breachInsurance, setBreachInsurance] = useState(250000)
  const [complianceFines, setComplianceFines] = useState(500000)
  const [downtime, setDowntime] = useState(24) // hours per year
  const [downtimeCost, setDowntimeCost] = useState(10000) // per hour
  const [helpDeskTickets, setHelpDeskTickets] = useState(200) // per month
  const [ticketCost, setTicketCost] = useState(50) // per ticket

  // Calculate financial benefits
  const financialBenefits = useMemo(() => {
    const industryData = INDUSTRIES[industry]
    const roiData = INDUSTRY_ROI[industry]
    
    // Direct cost savings
    const laborSavings = (currentFTE - 0.1) * avgSalary // Portnox requires only 0.1 FTE
    const downtimeReduction = downtime * 0.9 * downtimeCost // 90% reduction
    const helpDeskReduction = helpDeskTickets * 12 * ticketCost * 0.7 // 70% reduction
    
    // Risk reduction benefits
    const breachRiskReduction = industryData.avgBreachCost * 0.92 * 0.05 // 92% reduction, 5% annual probability
    const insurancePremiumReduction = breachInsurance * 0.3 // 30% reduction
    const complianceRiskReduction = complianceFines * 0.94 * 0.1 // 94% reduction, 10% annual probability
    
    // Productivity gains
    const userProductivity = deviceCount * 2 * 250 * (50 / 60) // 2 hours/year saved per user, $50/hour
    const itProductivity = (currentFTE * avgSalary * 0.2) // 20% productivity gain
    
    // Portnox-specific benefits from industry data
    const industrySpecificBenefits = roiData

"use client"

import { useState, useEffect } from "react"

export interface ComplianceStandard {
  id: string
  name: string
  description: string
  requirements: string[]
  portnoxCoverage: number
  competitorCoverage: { [vendor: string]: number }
  riskLevel: "low" | "medium" | "high" | "critical"
  penaltyRange: { min: number; max: number }
}

export interface ComplianceData {
  standards: ComplianceStandard[]
  overallScore: number
  riskAssessment: {
    totalRisk: number
    mitigatedRisk: number
    residualRisk: number
  }
}

const COMPLIANCE_STANDARDS: ComplianceStandard[] = [
  {
    id: "pci-dss",
    name: "PCI DSS",
    description: "Payment Card Industry Data Security Standard",
    requirements: ["Network segmentation", "Access control", "Regular monitoring", "Vulnerability management"],
    portnoxCoverage: 95,
    competitorCoverage: {
      "cisco-ise": 85,
      "aruba-clearpass": 80,
      forescout: 75,
      "extreme-nac": 70,
    },
    riskLevel: "critical",
    penaltyRange: { min: 5000, max: 100000 },
  },
  {
    id: "hipaa",
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act",
    requirements: ["Administrative safeguards", "Physical safeguards", "Technical safeguards", "Audit controls"],
    portnoxCoverage: 92,
    competitorCoverage: {
      "cisco-ise": 78,
      "aruba-clearpass": 75,
      forescout: 72,
      "extreme-nac": 68,
    },
    riskLevel: "critical",
    penaltyRange: { min: 100, max: 1600000 },
  },
  {
    id: "sox",
    name: "SOX",
    description: "Sarbanes-Oxley Act",
    requirements: ["Internal controls", "Financial reporting", "IT general controls", "Change management"],
    portnoxCoverage: 88,
    competitorCoverage: {
      "cisco-ise": 82,
      "aruba-clearpass": 78,
      forescout: 75,
      "extreme-nac": 72,
    },
    riskLevel: "high",
    penaltyRange: { min: 1000000, max: 5000000 },
  },
  {
    id: "gdpr",
    name: "GDPR",
    description: "General Data Protection Regulation",
    requirements: [
      "Data protection by design",
      "Privacy impact assessments",
      "Breach notification",
      "Data subject rights",
    ],
    portnoxCoverage: 90,
    competitorCoverage: {
      "cisco-ise": 75,
      "aruba-clearpass": 72,
      forescout: 70,
      "extreme-nac": 65,
    },
    riskLevel: "critical",
    penaltyRange: { min: 10000000, max: 20000000 },
  },
]

export function useComplianceData() {
  const [complianceData, setComplianceData] = useState<ComplianceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const calculateComplianceData = (): ComplianceData => {
      const totalCoverage = COMPLIANCE_STANDARDS.reduce((sum, standard) => sum + standard.portnoxCoverage, 0)
      const overallScore = totalCoverage / COMPLIANCE_STANDARDS.length

      const totalRisk = COMPLIANCE_STANDARDS.reduce((sum, standard) => {
        const avgPenalty = (standard.penaltyRange.min + standard.penaltyRange.max) / 2
        return sum + avgPenalty
      }, 0)

      const mitigatedRisk = COMPLIANCE_STANDARDS.reduce((sum, standard) => {
        const avgPenalty = (standard.penaltyRange.min + standard.penaltyRange.max) / 2
        return sum + avgPenalty * (standard.portnoxCoverage / 100)
      }, 0)

      const residualRisk = totalRisk - mitigatedRisk

      return {
        standards: COMPLIANCE_STANDARDS,
        overallScore,
        riskAssessment: {
          totalRisk,
          mitigatedRisk,
          residualRisk,
        },
      }
    }

    setTimeout(() => {
      setComplianceData(calculateComplianceData())
      setLoading(false)
    }, 500)
  }, [])

  const getComplianceByStandard = (standardId: string) => {
    return COMPLIANCE_STANDARDS.find((s) => s.id === standardId)
  }

  const getComplianceGap = (vendor: string) => {
    return COMPLIANCE_STANDARDS.map((standard) => ({
      standard: standard.name,
      portnox: standard.portnoxCoverage,
      competitor: standard.competitorCoverage[vendor] || 0,
      gap: standard.portnoxCoverage - (standard.competitorCoverage[vendor] || 0),
    }))
  }

  return {
    complianceData,
    loading,
    getComplianceByStandard,
    getComplianceGap,
  }
}

export interface IndustryComplianceData {
  industry: string
  riskProfile: {
    dataBreachCost: number
    breachProbability: number
    cyberInsuranceRequirements: {
      typicalPremium: number
      nacDiscountAvailable: number
    }
  }
  standards: string[]
  complianceAutomationSavings: {
    manualEffortHours: number
    hourlyRate: number
    totalSavings: number
  }
}

export const industryComplianceData: Record<string, IndustryComplianceData> = {
  technology: {
    industry: "Technology",
    riskProfile: {
      dataBreachCost: 4880000,
      breachProbability: 0.25,
      cyberInsuranceRequirements: {
        typicalPremium: 75000,
        nacDiscountAvailable: 15,
      },
    },
    standards: ["ISO 27001", "SOC 2", "GDPR", "CCPA"],
    complianceAutomationSavings: {
      manualEffortHours: 400,
      hourlyRate: 150,
      totalSavings: 60000,
    },
  },
  healthcare: {
    industry: "Healthcare",
    riskProfile: {
      dataBreachCost: 10930000,
      breachProbability: 0.35,
      cyberInsuranceRequirements: {
        typicalPremium: 120000,
        nacDiscountAvailable: 25,
      },
    },
    standards: ["HIPAA", "HITECH", "GDPR"],
    complianceAutomationSavings: {
      manualEffortHours: 600,
      hourlyRate: 200,
      totalSavings: 120000,
    },
  },
  financial_services: {
    industry: "Financial Services",
    riskProfile: {
      dataBreachCost: 5970000,
      breachProbability: 0.4,
      cyberInsuranceRequirements: {
        typicalPremium: 150000,
        nacDiscountAvailable: 30,
      },
    },
    standards: ["PCI DSS", "SOX", "GLBA"],
    complianceAutomationSavings: {
      manualEffortHours: 800,
      hourlyRate: 250,
      totalSavings: 200000,
    },
  },
  manufacturing: {
    industry: "Manufacturing",
    riskProfile: {
      dataBreachCost: 4470000,
      breachProbability: 0.3,
      cyberInsuranceRequirements: {
        typicalPremium: 60000,
        nacDiscountAvailable: 10,
      },
    },
    standards: ["ISO 27001", "NIST CSF", "CMMC"],
    complianceAutomationSavings: {
      manualEffortHours: 300,
      hourlyRate: 120,
      totalSavings: 36000,
    },
  },
  education: {
    industry: "Education",
    riskProfile: {
      dataBreachCost: 3860000,
      breachProbability: 0.2,
      cyberInsuranceRequirements: {
        typicalPremium: 45000,
        nacDiscountAvailable: 5,
      },
    },
    standards: ["FERPA", "COPPA", "GDPR"],
    complianceAutomationSavings: {
      manualEffortHours: 200,
      hourlyRate: 100,
      totalSavings: 20000,
    },
  },
  government: {
    industry: "Government",
    riskProfile: {
      dataBreachCost: 5240000,
      breachProbability: 0.35,
      cyberInsuranceRequirements: {
        typicalPremium: 180000,
        nacDiscountAvailable: 35,
      },
    },
    standards: ["FISMA", "FedRAMP", "NIST 800-53"],
    complianceAutomationSavings: {
      manualEffortHours: 1000,
      hourlyRate: 300,
      totalSavings: 300000,
    },
  },
}

export function calculateComplianceSavings(
  industryData: IndustryComplianceData,
  complianceCoverage: number,
): {
  manualEffortHours: number
  hourlyRate: number
  totalSavings: number
} {
  const { manualEffortHours, hourlyRate } = industryData.complianceAutomationSavings
  const savingsMultiplier = complianceCoverage / 100
  const totalSavings = manualEffortHours * hourlyRate * savingsMultiplier

  return {
    manualEffortHours,
    hourlyRate,
    totalSavings,
  }
}

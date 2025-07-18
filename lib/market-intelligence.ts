// Market Intelligence and Analyst Data
export interface AnalystReport {
  id: string
  firm: "Gartner" | "Forrester" | "IDC" | "Omdia" | "KuppingerCole" | "Frost&Sullivan"
  title: string
  publishDate: string
  reportType: "Magic Quadrant" | "Wave" | "MarketScape" | "Leadership Compass" | "Market Analysis"
  summary: string
  keyFindings: string[]
  vendorMentions: {
    vendorId: string
    position: "Leader" | "Challenger" | "Visionary" | "Niche" | "Strong Performer" | "Contender"
    score?: number
    strengths: string[]
    weaknesses: string[]
    recommendation: string
  }[]
  marketTrends: string[]
  predictions: string[]
  url?: string
}

export interface MarketIntelligence {
  vendorId: string
  marketPosition: {
    gartnerQuadrant: "Leader" | "Challenger" | "Visionary" | "Niche"
    forresterWave: "Leader" | "Strong Performer" | "Contender" | "Challenger"
    idcMarketscape: "Leader" | "Major Player" | "Contender" | "Participant"
    overallRating: number
  }
  marketShare: {
    current: number
    yearOverYear: number
    trend: "Growing" | "Stable" | "Declining"
    projectedGrowth: number
  }
  customerSentiment: {
    satisfaction: number
    nps: number
    churnRate: number
    renewalRate: number
    supportRating: number
    implementationSuccess: number
  }
  competitiveIntelligence: {
    strengths: string[]
    weaknesses: string[]
    threats: string[]
    opportunities: string[]
    differentiators: string[]
    vulnerabilities: string[]
  }
  financialHealth: {
    revenue: number
    growth: number
    profitability: "High" | "Medium" | "Low"
    funding: string
    stability: number
  }
  innovation: {
    rAnddInvestment: number
    patentCount: number
    innovationScore: number
    technologyRoadmap: string[]
    emergingCapabilities: string[]
  }
  partnerships: {
    strategic: string[]
    technology: string[]
    channel: string[]
    ecosystem: string[]
  }
  marketTrends: {
    adoption: "Early" | "Growth" | "Mature" | "Declining"
    demandDrivers: string[]
    challenges: string[]
    futureOutlook: string
  }
}

export const ANALYST_REPORTS: AnalystReport[] = [
  {
    id: "gartner-mq-nac-2024",
    firm: "Gartner",
    title: "Magic Quadrant for Network Access Control",
    publishDate: "2024-03-15",
    reportType: "Magic Quadrant",
    summary:
      "Gartner evaluates 15 vendors in the NAC market, highlighting the shift toward cloud-native solutions and Zero Trust architectures.",
    keyFindings: [
      "Cloud-native NAC solutions are gaining significant traction",
      "Zero Trust integration is becoming a key differentiator",
      "Traditional on-premise solutions face declining demand",
      "API-first architectures enable better ecosystem integration",
      "Simplified deployment models reduce time-to-value",
    ],
    vendorMentions: [
      {
        vendorId: "cisco",
        position: "Leader",
        score: 85,
        strengths: [
          "Comprehensive feature set",
          "Strong ecosystem integration",
          "Mature platform with proven scalability",
          "Extensive partner network",
        ],
        weaknesses: [
          "Complex deployment and management",
          "High total cost of ownership",
          "Significant infrastructure requirements",
          "Steep learning curve",
        ],
        recommendation: "Best for large enterprises with complex requirements and existing Cisco infrastructure",
      },
      {
        vendorId: "aruba",
        position: "Challenger",
        score: 78,
        strengths: [
          "Strong policy management capabilities",
          "Good multi-vendor support",
          "Competitive pricing",
          "Solid customer satisfaction",
        ],
        weaknesses: ["Limited cloud-native features", "Complex initial setup", "Hardware dependencies"],
        recommendation: "Suitable for mid to large enterprises seeking multi-vendor NAC solutions",
      },
      {
        vendorId: "portnox",
        position: "Visionary",
        score: 92,
        strengths: [
          "Pure cloud-native architecture",
          "Fastest deployment in market (30 minutes)",
          "Zero infrastructure requirements",
          "Exceptional security posture (0 CVEs)",
          "95% Zero Trust maturity score",
          "Transparent, predictable pricing",
        ],
        weaknesses: ["Newer market presence compared to incumbents", "Limited on-premise deployment options"],
        recommendation:
          "Ideal for organizations prioritizing rapid deployment, cloud-first strategy, and Zero Trust implementation",
      },
      {
        vendorId: "forescout",
        position: "Challenger",
        score: 76,
        strengths: [
          "Excellent device visibility and classification",
          "Strong IoT and OT security capabilities",
          "Comprehensive compliance features",
        ],
        weaknesses: ["Complex deployment process", "Higher learning curve", "Limited cloud-native options"],
        recommendation: "Best for IoT-heavy environments and industrial networks",
      },
    ],
    marketTrends: [
      "Accelerating shift to cloud-native NAC solutions",
      "Integration with Zero Trust architectures",
      "Emphasis on simplified deployment and management",
      "Growing importance of IoT and OT device security",
      "API-first approaches for ecosystem integration",
    ],
    predictions: [
      "Cloud-native NAC will represent 60% of new deployments by 2025",
      "Traditional on-premise NAC growth will decline by 15% annually",
      "Zero Trust integration will become mandatory for enterprise NAC",
      "Deployment time will become a key competitive differentiator",
    ],
  },
  {
    id: "forrester-wave-nac-2024",
    firm: "Forrester",
    title: "The Forrester Wave: Network Access Control, Q2 2024",
    publishDate: "2024-06-20",
    reportType: "Wave",
    summary:
      "Forrester evaluates NAC vendors based on current offering, strategy, and market presence, emphasizing cloud-native capabilities and Zero Trust integration.",
    keyFindings: [
      "Cloud-native solutions demonstrate superior agility and scalability",
      "Zero Trust integration is critical for modern security architectures",
      "Simplified deployment models significantly reduce implementation risk",
      "API-first architectures enable better security ecosystem integration",
      "Total cost of ownership varies dramatically between cloud and on-premise solutions",
    ],
    vendorMentions: [
      {
        vendorId: "portnox",
        position: "Leader",
        score: 94,
        strengths: [
          "Industry-leading cloud-native architecture",
          "Exceptional deployment speed (30 minutes to production)",
          "Zero infrastructure requirements eliminate complexity",
          "Outstanding security record with zero CVEs",
          "Comprehensive Zero Trust implementation",
          "Transparent, all-inclusive pricing model",
        ],
        weaknesses: ["Relatively new market entrant", "Limited on-premise deployment options for legacy environments"],
        recommendation:
          "Strongly recommended for organizations seeking rapid NAC deployment with cloud-first strategy and Zero Trust implementation",
      },
      {
        vendorId: "cisco",
        position: "Strong Performer",
        score: 82,
        strengths: [
          "Comprehensive feature portfolio",
          "Strong integration with Cisco ecosystem",
          "Proven enterprise scalability",
          "Extensive professional services",
        ],
        weaknesses: [
          "Complex deployment requiring significant expertise",
          "High total cost of ownership",
          "Multiple security vulnerabilities (47 CVEs in 3 years)",
          "Lengthy implementation timelines (6-9 months typical)",
        ],
        recommendation:
          "Suitable for large enterprises with existing Cisco infrastructure and dedicated security teams",
      },
      {
        vendorId: "aruba",
        position: "Strong Performer",
        score: 79,
        strengths: [
          "Solid policy management capabilities",
          "Good multi-vendor environment support",
          "Competitive pricing for traditional NAC",
          "Strong customer support",
        ],
        weaknesses: [
          "Limited cloud-native capabilities",
          "Complex initial configuration",
          "Hardware infrastructure requirements",
        ],
        recommendation: "Good choice for multi-vendor environments with traditional NAC requirements",
      },
    ],
    marketTrends: [
      "Rapid adoption of cloud-native NAC solutions",
      "Integration with SASE and Zero Trust architectures",
      "Emphasis on operational simplicity and reduced complexity",
      "Growing focus on IoT and BYOD device management",
      "Shift from CapEx to OpEx spending models",
    ],
    predictions: [
      "Cloud-native NAC will dominate new deployments by 2025",
      "Deployment complexity will become a key vendor differentiator",
      "Zero Trust integration will be table stakes for NAC vendors",
      "Traditional hardware-based NAC will decline significantly",
    ],
  },
  {
    id: "idc-marketscape-nac-2024",
    firm: "IDC",
    title: "IDC MarketScape: Worldwide Network Access Control 2024 Vendor Assessment",
    publishDate: "2024-05-10",
    reportType: "MarketScape",
    summary:
      "IDC analyzes the NAC market landscape, highlighting the transformation toward cloud-native solutions and the critical importance of Zero Trust integration.",
    keyFindings: [
      "Market is experiencing fundamental shift toward cloud-native architectures",
      "Zero Trust integration is becoming mandatory for enterprise deployments",
      "Deployment simplicity is a critical success factor",
      "Total cost of ownership varies significantly between deployment models",
      "Security posture and vulnerability management are key differentiators",
    ],
    vendorMentions: [
      {
        vendorId: "portnox",
        position: "Leader",
        score: 96,
        strengths: [
          "Revolutionary cloud-native architecture",
          "Industry-fastest deployment (30 minutes)",
          "Zero infrastructure requirements",
          "Exceptional security posture (0 CVEs)",
          "95% Zero Trust maturity rating",
          "Predictable, transparent pricing",
          "90% reduction in operational overhead",
        ],
        weaknesses: ["Newer market presence", "Limited legacy on-premise options"],
        recommendation:
          "Top choice for organizations prioritizing rapid deployment, cloud-first strategy, and comprehensive Zero Trust implementation",
      },
      {
        vendorId: "cisco",
        position: "Major Player",
        score: 80,
        strengths: [
          "Market-leading feature breadth",
          "Strong ecosystem integration",
          "Proven enterprise scalability",
          "Comprehensive support organization",
        ],
        weaknesses: [
          "Complex deployment and management",
          "High total cost of ownership",
          "Significant security vulnerabilities",
          "Long implementation cycles",
        ],
        recommendation: "Appropriate for large enterprises with complex requirements and existing Cisco investments",
      },
    ],
    marketTrends: [
      "Accelerating cloud-native adoption",
      "Zero Trust architecture integration",
      "Simplified deployment and management",
      "API-first ecosystem integration",
      "Focus on operational efficiency",
    ],
    predictions: [
      "Cloud-native solutions will capture 70% market share by 2026",
      "Deployment time will become primary vendor selection criteria",
      "Zero Trust integration will be universal requirement",
      "Traditional NAC vendors must transform or face obsolescence",
    ],
  },
]

export const MARKET_INTELLIGENCE: Record<string, MarketIntelligence> = {
  portnox: {
    vendorId: "portnox",
    marketPosition: {
      gartnerQuadrant: "Visionary",
      forresterWave: "Leader",
      idcMarketscape: "Leader",
      overallRating: 94,
    },
    marketShare: {
      current: 8.5,
      yearOverYear: 285,
      trend: "Growing",
      projectedGrowth: 150,
    },
    customerSentiment: {
      satisfaction: 96,
      nps: 78,
      churnRate: 2,
      renewalRate: 98,
      supportRating: 96,
      implementationSuccess: 99,
    },
    competitiveIntelligence: {
      strengths: [
        "Pure cloud-native architecture eliminates infrastructure complexity",
        "Industry-fastest deployment (30 minutes to production)",
        "Zero CVE security record demonstrates superior security posture",
        "95% Zero Trust maturity score leads industry",
        "Transparent, all-inclusive pricing model",
        "90% reduction in operational overhead",
        "API-first architecture enables seamless integrations",
      ],
      weaknesses: [
        "Newer market presence compared to established incumbents",
        "Limited on-premise deployment options for legacy environments",
        "Smaller partner ecosystem compared to traditional vendors",
      ],
      threats: [
        "Incumbent vendors may attempt to replicate cloud-native approach",
        "Market consolidation could impact competitive positioning",
        "Economic downturns may favor lower-cost alternatives",
      ],
      opportunities: [
        "Massive market shift toward cloud-native solutions",
        "Growing Zero Trust adoption creates demand for integrated solutions",
        "Digital transformation initiatives drive NAC modernization",
        "Remote work trends increase demand for simplified, cloud-based security",
      ],
      differentiators: [
        "Only true cloud-native NAC platform",
        "Zero infrastructure requirements",
        "30-minute deployment vs 6-9 months for competitors",
        "Zero CVE security record",
        "95% Zero Trust maturity",
        "All-inclusive pricing with no hidden costs",
      ],
      vulnerabilities: [
        "Dependence on cloud infrastructure availability",
        "Need to build brand recognition in conservative enterprise market",
        "Requirement to educate market on cloud-native benefits",
      ],
    },
    financialHealth: {
      revenue: 45000000,
      growth: 285,
      profitability: "High",
      funding: "Series B - $50M raised",
      stability: 95,
    },
    innovation: {
      rAnddInvestment: 35,
      patentCount: 12,
      innovationScore: 94,
      technologyRoadmap: [
        "AI-powered threat detection and response",
        "Advanced behavioral analytics",
        "Automated policy optimization",
        "Enhanced IoT device classification",
        "Integration with SASE platforms",
      ],
      emergingCapabilities: [
        "Machine learning-based anomaly detection",
        "Automated compliance reporting",
        "Advanced threat intelligence integration",
        "Self-healing network policies",
        "Predictive security analytics",
      ],
    },
    partnerships: {
      strategic: ["Microsoft Azure", "Amazon Web Services", "Google Cloud Platform", "Okta", "CrowdStrike"],
      technology: ["Splunk", "ServiceNow", "Palo Alto Networks", "Fortinet", "Check Point"],
      channel: ["CDW", "Insight", "SHI", "Presidio", "World Wide Technology"],
      ecosystem: [
        "SIEM platforms",
        "SOAR solutions",
        "Identity providers",
        "Cloud security platforms",
        "Network infrastructure vendors",
      ],
    },
    marketTrends: {
      adoption: "Growth",
      demandDrivers: [
        "Digital transformation initiatives",
        "Zero Trust architecture adoption",
        "Remote work security requirements",
        "Cloud-first strategies",
        "Operational simplification needs",
      ],
      challenges: [
        "Market education on cloud-native benefits",
        "Competition from established incumbents",
        "Integration with legacy systems",
      ],
      futureOutlook:
        "Extremely positive - positioned to capture significant market share as organizations modernize NAC infrastructure",
    },
  },
  cisco: {
    vendorId: "cisco",
    marketPosition: {
      gartnerQuadrant: "Leader",
      forresterWave: "Strong Performer",
      idcMarketscape: "Major Player",
      overallRating: 82,
    },
    marketShare: {
      current: 35.2,
      yearOverYear: -8,
      trend: "Declining",
      projectedGrowth: -12,
    },
    customerSentiment: {
      satisfaction: 78,
      nps: 45,
      churnRate: 12,
      renewalRate: 85,
      supportRating: 82,
      implementationSuccess: 65,
    },
    competitiveIntelligence: {
      strengths: [
        "Market leader with proven track record",
        "Comprehensive feature set and capabilities",
        "Strong integration with Cisco ecosystem",
        "Extensive partner and support network",
        "Proven scalability for large enterprises",
      ],
      weaknesses: [
        "Complex deployment requiring specialized expertise",
        "High total cost of ownership",
        "Significant infrastructure requirements",
        "47 CVEs in past 3 years including critical vulnerabilities",
        "6-9 month typical implementation timeline",
        "Steep learning curve for administrators",
      ],
      threats: [
        "Cloud-native competitors offering simpler alternatives",
        "Market shift away from hardware-based solutions",
        "Security vulnerabilities damaging reputation",
        "High TCO driving customers to alternatives",
      ],
      opportunities: [
        "Leverage existing customer base for upselling",
        "Develop cloud-native offerings to compete",
        "Expand into adjacent security markets",
        "Improve deployment simplicity",
      ],
      differentiators: [
        "Comprehensive feature portfolio",
        "Strong ecosystem integration",
        "Proven enterprise scalability",
        "Extensive professional services",
      ],
      vulnerabilities: [
        "Legacy architecture limits cloud-native capabilities",
        "Complex deployment model",
        "High security vulnerability count",
        "Declining market share",
      ],
    },
    financialHealth: {
      revenue: 2800000000,
      growth: -5,
      profitability: "High",
      funding: "Public company",
      stability: 88,
    },
    innovation: {
      rAnddInvestment: 22,
      patentCount: 156,
      innovationScore: 75,
      technologyRoadmap: [
        "Cloud-native ISE development",
        "Enhanced Zero Trust integration",
        "Simplified deployment tools",
        "AI-powered analytics",
        "SASE integration",
      ],
      emergingCapabilities: [
        "Cloud-hosted ISE options",
        "Simplified policy management",
        "Enhanced threat intelligence",
        "Automated compliance reporting",
      ],
    },
    partnerships: {
      strategic: ["Microsoft", "VMware", "Splunk", "ServiceNow", "AWS"],
      technology: ["Palo Alto Networks", "Fortinet", "Check Point", "CrowdStrike", "Okta"],
      channel: ["Global partner network", "System integrators", "Distributors", "Resellers"],
      ecosystem: [
        "Cisco Security portfolio",
        "Network infrastructure",
        "Data center solutions",
        "Collaboration platforms",
      ],
    },
    marketTrends: {
      adoption: "Mature",
      demandDrivers: [
        "Existing Cisco infrastructure investments",
        "Enterprise feature requirements",
        "Regulatory compliance needs",
        "Large-scale deployments",
      ],
      challenges: [
        "Market shift to cloud-native solutions",
        "Competitive pressure on pricing",
        "Complexity concerns from customers",
        "Security vulnerability management",
      ],
      futureOutlook: "Challenging - must transform to cloud-native model to maintain market position",
    },
  },
  aruba: {
    vendorId: "aruba",
    marketPosition: {
      gartnerQuadrant: "Challenger",
      forresterWave: "Strong Performer",
      idcMarketscape: "Major Player",
      overallRating: 79,
    },
    marketShare: {
      current: 18.7,
      yearOverYear: -3,
      trend: "Stable",
      projectedGrowth: -5,
    },
    customerSentiment: {
      satisfaction: 84,
      nps: 52,
      churnRate: 8,
      renewalRate: 88,
      supportRating: 86,
      implementationSuccess: 78,
    },
    competitiveIntelligence: {
      strengths: [
        "Strong policy management capabilities",
        "Good multi-vendor environment support",
        "Competitive pricing for traditional NAC",
        "Solid customer satisfaction ratings",
        "Comprehensive feature set",
      ],
      weaknesses: [
        "Limited cloud-native capabilities",
        "Complex initial setup and configuration",
        "Hardware infrastructure dependencies",
        "12 CVEs in past 3 years",
        "3-6 month typical deployment timeline",
      ],
      threats: [
        "Cloud-native competitors gaining market share",
        "Pressure to reduce pricing",
        "Technology refresh cycles favoring cloud solutions",
      ],
      opportunities: [
        "Develop cloud-native offerings",
        "Expand in mid-market segment",
        "Enhance Zero Trust capabilities",
        "Improve deployment simplicity",
      ],
      differentiators: [
        "Multi-vendor support",
        "Policy management strength",
        "Good price-performance ratio",
        "Strong customer support",
      ],
      vulnerabilities: ["Limited cloud-native architecture", "Hardware dependencies", "Complex deployment model"],
    },
    financialHealth: {
      revenue: 890000000,
      growth: 2,
      profitability: "Medium",
      funding: "HPE subsidiary",
      stability: 85,
    },
    innovation: {
      rAnddInvestment: 18,
      patentCount: 89,
      innovationScore: 72,
      technologyRoadmap: [
        "Cloud-native ClearPass development",
        "Enhanced AI analytics",
        "Simplified deployment tools",
        "Zero Trust integration",
        "IoT security enhancements",
      ],
      emergingCapabilities: [
        "Cloud-hosted options",
        "AI-powered insights",
        "Automated policy management",
        "Enhanced threat detection",
      ],
    },
    partnerships: {
      strategic: ["HPE", "Microsoft", "VMware", "AWS", "Google Cloud"],
      technology: ["Fortinet", "Palo Alto Networks", "Splunk", "ServiceNow", "CrowdStrike"],
      channel: ["HPE partner network", "System integrators", "Regional partners", "Distributors"],
      ecosystem: ["HPE infrastructure", "Aruba networking", "Third-party integrations", "Security platforms"],
    },
    marketTrends: {
      adoption: "Mature",
      demandDrivers: [
        "Multi-vendor environment needs",
        "Policy management requirements",
        "Budget-conscious deployments",
        "HPE ecosystem integration",
      ],
      challenges: ["Cloud-native competition", "Deployment complexity concerns", "Market commoditization pressure"],
      futureOutlook: "Stable but challenged - needs cloud-native transformation to grow",
    },
  },
  forescout: {
    vendorId: "forescout",
    marketPosition: {
      gartnerQuadrant: "Challenger",
      forresterWave: "Contender",
      idcMarketscape: "Contender",
      overallRating: 76,
    },
    marketShare: {
      current: 12.3,
      yearOverYear: -5,
      trend: "Declining",
      projectedGrowth: -8,
    },
    customerSentiment: {
      satisfaction: 79,
      nps: 48,
      churnRate: 10,
      renewalRate: 86,
      supportRating: 81,
      implementationSuccess: 72,
    },
    competitiveIntelligence: {
      strengths: [
        "Excellent device visibility and classification",
        "Strong IoT and OT security capabilities",
        "Comprehensive compliance features",
        "Good integration capabilities",
        "20M+ device fingerprints database",
      ],
      weaknesses: [
        "Complex deployment process",
        "Higher learning curve",
        "Limited cloud-native options",
        "8 CVEs in past 3 years",
        "4-6 month typical deployment",
      ],
      threats: ["Cloud-native competitors", "Market consolidation", "Pricing pressure from alternatives"],
      opportunities: [
        "IoT security market growth",
        "OT/Industrial network security",
        "Compliance automation",
        "Cloud transformation",
      ],
      differentiators: [
        "Device classification expertise",
        "IoT/OT specialization",
        "Compliance automation",
        "Extensive device database",
      ],
      vulnerabilities: [
        "Complex deployment model",
        "Limited cloud-native capabilities",
        "High implementation complexity",
      ],
    },
    financialHealth: {
      revenue: 425000000,
      growth: -2,
      profitability: "Medium",
      funding: "Public company",
      stability: 78,
    },
    innovation: {
      rAnddInvestment: 20,
      patentCount: 67,
      innovationScore: 74,
      technologyRoadmap: [
        "Cloud-native platform development",
        "Enhanced AI/ML capabilities",
        "Simplified deployment",
        "Zero Trust integration",
        "OT security expansion",
      ],
      emergingCapabilities: [
        "Cloud-hosted options",
        "AI-powered classification",
        "Automated response",
        "Enhanced analytics",
      ],
    },
    partnerships: {
      strategic: ["AWS", "Microsoft Azure", "ServiceNow", "Splunk", "Palo Alto Networks"],
      technology: ["Fortinet", "Check Point", "CrowdStrike", "Rapid7", "Qualys"],
      channel: ["System integrators", "Security specialists", "Regional partners", "Distributors"],
      ecosystem: ["SIEM platforms", "Security orchestration", "Network infrastructure", "Endpoint protection"],
    },
    marketTrends: {
      adoption: "Mature",
      demandDrivers: [
        "IoT security requirements",
        "OT network protection",
        "Compliance automation",
        "Device visibility needs",
      ],
      challenges: ["Cloud-native competition", "Deployment complexity", "Market commoditization"],
      futureOutlook: "Challenging - must simplify and modernize to compete effectively",
    },
  },
}

export const MARKET_TRENDS = {
  overall: {
    marketSize: 2.8, // Billion USD
    growthRate: 12.5, // Annual percentage
    keyDrivers: [
      "Zero Trust architecture adoption",
      "Remote work security requirements",
      "Cloud-first strategies",
      "IoT device proliferation",
      "Regulatory compliance mandates",
    ],
    challenges: [
      "Legacy infrastructure constraints",
      "Skills shortage in cybersecurity",
      "Budget constraints",
      "Integration complexity",
    ],
    predictions: {
      "2025": "Cloud-native NAC will represent 60% of new deployments",
      "2026": "Traditional on-premise NAC growth will decline by 25%",
      "2027": "Zero Trust integration will be mandatory for enterprise NAC",
      "2028": "AI-powered NAC will become standard offering",
    },
  },
  segments: {
    cloudNative: {
      growth: 285,
      leaders: ["Portnox", "Juniper Mist"],
      marketShare: 25,
      projectedShare2025: 60,
    },
    traditional: {
      growth: -12,
      leaders: ["Cisco", "Aruba", "Forescout"],
      marketShare: 75,
      projectedShare2025: 40,
    },
    hybrid: {
      growth: 15,
      leaders: ["Aruba", "Fortinet"],
      marketShare: 20,
      projectedShare2025: 25,
    },
  },
}

export const COMPETITIVE_LANDSCAPE = {
  marketDynamics: {
    disruption: "High - Cloud-native solutions disrupting traditional market",
    consolidation: "Medium - Some M&A activity expected",
    innovation: "High - Rapid technology advancement",
    priceCompetition: "High - Significant pricing pressure on traditional vendors",
  },
  winLossAnalysis: {
    portnox: {
      winRate: 78,
      primaryWinReasons: [
        "Fastest deployment (30 minutes)",
        "Zero infrastructure requirements",
        "Superior security posture",
        "Transparent pricing",
        "Cloud-native architecture",
      ],
      lossReasons: [
        "Newer market presence",
        "Customer preference for established vendors",
        "Existing vendor relationships",
      ],
    },
    cisco: {
      winRate: 45,
      primaryWinReasons: [
        "Existing customer relationships",
        "Comprehensive feature set",
        "Enterprise scalability",
        "Professional services",
      ],
      lossReasons: [
        "High total cost of ownership",
        "Complex deployment",
        "Security vulnerabilities",
        "Long implementation timeline",
      ],
    },
  },
}

/**
 * Vendor Data Module
 * Provides consistent and reliable data for NAC vendors
 */
(function() {
    console.log("📊 Initializing comprehensive vendor data...");

    // Define vendor data structure
    window.vendorData = {
        "portnox": {
            name: "Portnox Cloud",
            description: "Cloud-native NAC solution",
            badge: "Best Value",
            logo: "img/vendors/portnox-logo.png",
            architecture: "Cloud-Native",
            initialCosts: {
                hardware: 0,
                software: 15000,
                implementation: 15000
            },
            annualCosts: {
                licensing: 45000,
                maintenance: 0,
                support: 5000,
                personnel: 25000
            },
            implementationDays: 21,
            implementationSavingsPercent: 75,
            paybackMonths: 7,
            roi: 287,
            productivityGains: 130000,
            features: {
                cloudNative: 95,
                zeroTrust: 90,
                deploymentSpeed: 95,
                costEfficiency: 85,
                scalability: 90,
                operationalEfficiency: 85,
                integration: 85,
                userExperience: 90,
                authentication: 90,
                endpointVisibility: 95,
                cloudIntegration: 95,
                multiVendor: 85,
                automation: 90,
                remoteAccess: 95,
                iotSupport: 80,
                apiExtensibility: 90,
                accessControl: 85,
                riskAssessment: 90,
                networkSegmentation: 80,
                postureAssessment: 85,
                threatDetection: 80,
                riskReduction: 58
            },
            complianceRatings: {
                pci: 95,
                hipaa: 90,
                nist: 95,
                gdpr: 90,
                iso: 90,
                cmmc: 85,
                ferpa: 90,
                sox: 85
            },
            strengths: [
                "Zero infrastructure requirements", 
                "Rapid deployment (days vs months)",
                "Continuous automatic updates",
                "Comprehensive device visibility", 
                "Unified remote & on-premises security",
                "Simple subscription model"
            ],
            weaknesses: [
                "Limited hardware integration for specialized devices",
                "Requires internet connectivity"
            ]
        },
        "cisco": {
            name: "Cisco ISE",
            description: "Enterprise NAC solution",
            badge: "Complex",
            logo: "img/vendors/cisco-logo.png",
            architecture: "On-Premises",
            initialCosts: {
                hardware: 120000,
                software: 85000,
                implementation: 75000
            },
            annualCosts: {
                licensing: 65000,
                maintenance: 35000,
                support: 35000,
                personnel: 75000
            },
            implementationDays: 90,
            paybackMonths: 18,
            roi: 85,
            productivityGains: 55000,
            features: {
                cloudNative: 40,
                zeroTrust: 65,
                deploymentSpeed: 30,
                costEfficiency: 35,
                scalability: 75,
                operationalEfficiency: 40,
                integration: 80,
                userExperience: 50,
                authentication: 80,
                endpointVisibility: 70,
                cloudIntegration: 40,
                multiVendor: 65,
                automation: 55,
                remoteAccess: 45,
                iotSupport: 60,
                apiExtensibility: 50,
                accessControl: 85,
                riskAssessment: 50,
                networkSegmentation: 85,
                postureAssessment: 65,
                threatDetection: 60,
                riskReduction: 45
            },
            complianceRatings: {
                pci: 80,
                hipaa: 75,
                nist: 85,
                gdpr: 70,
                iso: 80,
                cmmc: 80,
                ferpa: 75,
                sox: 80
            },
            strengths: [
                "Deep network integration", 
                "Comprehensive Cisco ecosystem compatibility",
                "Extensive policy controls", 
                "Strong on-premises capability"
            ],
            weaknesses: [
                "High complexity", 
                "Requires dedicated expertise",
                "Expensive hardware and licensing", 
                "Long implementation timeline",
                "High operational overhead"
            ]
        },
        "aruba": {
            name: "Aruba ClearPass",
            description: "Policy manager",
            logo: "img/vendors/aruba-logo.png",
            architecture: "On-Premises",
            initialCosts: {
                hardware: 85000,
                software: 60000,
                implementation: 45000
            },
            annualCosts: {
                licensing: 55000,
                maintenance: 25000,
                support: 20000,
                personnel: 60000
            },
            implementationDays: 60,
            paybackMonths: 14,
            roi: 110,
            productivityGains: 65000,
            features: {
                cloudNative: 40,
                zeroTrust: 60,
                deploymentSpeed: 50,
                costEfficiency: 45,
                scalability: 65,
                operationalEfficiency: 55,
                integration: 75,
                userExperience: 65,
                authentication: 85,
                endpointVisibility: 70,
                cloudIntegration: 45,
                multiVendor: 70,
                automation: 60,
                remoteAccess: 50,
                iotSupport: 65,
                apiExtensibility: 55,
                accessControl: 80,
                riskAssessment: 55,
                networkSegmentation: 70,
                postureAssessment: 60,
                threatDetection: 65,
                riskReduction: 42
            },
            complianceRatings: {
                pci: 75,
                hipaa: 70,
                nist: 80,
                gdpr: 65,
                iso: 75,
                cmmc: 75,
                ferpa: 70,
                sox: 75
            },
            strengths: [
                "Strong wireless integration", 
                "Good guest management",
                "Context-aware policies", 
                "Friendly user interface"
            ],
            weaknesses: [
                "Hardware dependency", 
                "Complex deployment",
                "Requires specialist knowledge", 
                "Limited cloud capabilities"
            ]
        },
        "forescout": {
            name: "Forescout",
            description: "Device visibility",
            logo: "img/vendors/forescout-logo.png",
            architecture: "On-Premises",
            initialCosts: {
                hardware: 90000,
                software: 75000,
                implementation: 65000
            },
            annualCosts: {
                licensing: 60000,
                maintenance: 25000,
                support: 25000,
                personnel: 65000
            },
            implementationDays: 75,
            paybackMonths: 16,
            roi: 95,
            productivityGains: 70000,
            features: {
                cloudNative: 35,
                zeroTrust: 55,
                deploymentSpeed: 45,
                costEfficiency: 40,
                scalability: 60,
                operationalEfficiency: 50,
                integration: 70,
                userExperience: 55,
                authentication: 70,
                endpointVisibility: 90,
                cloudIntegration: 40,
                multiVendor: 75,
                automation: 60,
                remoteAccess: 45,
                iotSupport: 80,
                apiExtensibility: 60,
                accessControl: 75,
                riskAssessment: 60,
                networkSegmentation: 75,
                postureAssessment: 70,
                threatDetection: 75,
                riskReduction: 45
            },
            complianceRatings: {
                pci: 80,
                hipaa: 75,
                nist: 75,
                gdpr: 70,
                iso: 75,
                cmmc: 70,
                ferpa: 65,
                sox: 70
            },
            strengths: [
                "Superior device discovery", 
                "Strong IoT device management",
                "Agentless approach", 
                "Extensive integrations"
            ],
            weaknesses: [
                "High initial investment", 
                "Complex infrastructure requirements",
                "Limited cloud support", 
                "Long deployment timeline",
                "Ongoing management complexity"
            ]
        },
        "fortinac": {
            name: "FortiNAC",
            description: "Fortinet NAC",
            logo: "img/vendors/fortinac-logo.png",
            architecture: "On-Premises",
            initialCosts: {
                hardware: 70000,
                software: 55000,
                implementation: 50000
            },
            annualCosts: {
                licensing: 45000,
                maintenance: 20000,
                support: 20000,
                personnel: 55000
            },
            implementationDays: 60,
            paybackMonths: 15,
            roi: 105,
            productivityGains: 60000,
            features: {
                cloudNative: 35,
                zeroTrust: 50,
                deploymentSpeed: 50,
                costEfficiency: 45,
                scalability: 65,
                operationalEfficiency: 50,
                integration: 75,
                userExperience: 50,
                authentication: 75,
                endpointVisibility: 75,
                cloudIntegration: 45,
                multiVendor: 60,
                automation: 65,
                remoteAccess: 50,
                iotSupport: 70,
                apiExtensibility: 55,
                accessControl: 70,
                riskAssessment: 55,
                networkSegmentation: 80,
                postureAssessment: 60,
                threatDetection: 70,
                riskReduction: 40
            },
            complianceRatings: {
                pci: 75,
                hipaa: 70,
                nist: 75,
                gdpr: 65,
                iso: 70,
                cmmc: 75,
                ferpa: 65,
                sox: 70
            },
            strengths: [
                "Strong Fortinet ecosystem integration", 
                "Good security fabric integration",
                "Solid network visibility", 
                "Security-focused approach"
            ],
            weaknesses: [
                "Limited standalone capability", 
                "Complex deployment",
                "On-premises infrastructure dependency", 
                "Significant management overhead"
            ]
        },
        "juniper": {
            name: "Juniper Mist",
            description: "AI-driven NAC",
            logo: "img/vendors/juniper-logo.png",
            architecture: "Hybrid",
            initialCosts: {
                hardware: 65000,
                software: 55000,
                implementation: 45000
            },
            annualCosts: {
                licensing: 50000,
                maintenance: 20000,
                support: 20000,
                personnel: 55000
            },
            implementationDays: 45,
            paybackMonths: 12,
            roi: 140,
            productivityGains: 75000,
            features: {
                cloudNative: 70,
                zeroTrust: 65,
                deploymentSpeed: 60,
                costEfficiency: 55,
                scalability: 70,
                operationalEfficiency: 65,
                integration: 65,
                userExperience: 75,
                authentication: 75,
                endpointVisibility: 70,
                cloudIntegration: 65,
                multiVendor: 60,
                automation: 75,
                remoteAccess: 60,
                iotSupport: 65,
                apiExtensibility: 70,
                accessControl: 70,
                riskAssessment: 60,
                networkSegmentation: 75,
                postureAssessment: 65,
                threatDetection: 70,
                riskReduction: 45
            },
            complianceRatings: {
                pci: 75,
                hipaa: 70,
                nist: 75,
                gdpr: 70,
                iso: 75,
                cmmc: 70,
                ferpa: 65,
                sox: 70
            },
            strengths: [
                "Strong AI capabilities", 
                "Modern cloud interface",
                "Good wireless integration", 
                "Detailed analytics"
            ],
            weaknesses: [
                "Still requires on-premises components", 
                "Limited non-Juniper hardware support",
                "Complex policy management", 
                "Ongoing management overhead"
            ]
        },
        "securew2": {
            name: "SecureW2",
            description: "Cloud RADIUS",
            logo: "img/vendors/securew2-logo.png",
            architecture: "Cloud",
            initialCosts: {
                hardware: 0,
                software: 25000,
                implementation: 20000
            },
            annualCosts: {
                licensing: 40000,
                maintenance: 5000,
                support: 10000,
                personnel: 35000
            },
            implementationDays: 30,
            paybackMonths: 9,
            roi: 180,
            productivityGains: 85000,
            features: {
                cloudNative: 85,
                zeroTrust: 70,
                deploymentSpeed: 75,
                costEfficiency: 70,
                scalability: 80,
                operationalEfficiency: 75,
                integration: 65,
                userExperience: 75,
                authentication: 85,
                endpointVisibility: 60,
                cloudIntegration: 80,
                multiVendor: 65,
                automation: 70,
                remoteAccess: 80,
                iotSupport: 55,
                apiExtensibility: 70,
                accessControl: 75,
                riskAssessment: 60,
                networkSegmentation: 65,
                postureAssessment: 60,
                threatDetection: 55,
                riskReduction: 40
            },
            complianceRatings: {
                pci: 70,
                hipaa: 65,
                nist: 70,
                gdpr: 75,
                iso: 65,
                cmmc: 65,
                ferpa: 75,
                sox: 65
            },
            strengths: [
                "Cloud-native RADIUS", 
                "Strong certificate management",
                "Easy deployment", 
                "Good user experience"
            ],
            weaknesses: [
                "Limited device visibility features", 
                "Less comprehensive than full NAC",
                "Limited advanced security controls", 
                "Narrower feature set"
            ]
        },
        "microsoft": {
            name: "Microsoft NPS",
            description: "Windows Server NAC",
            logo: "img/vendors/microsoft-logo.png",
            architecture: "On-Premises",
            initialCosts: {
                hardware: 50000,
                software: 25000,
                implementation: 35000
            },
            annualCosts: {
                licensing: 20000,
                maintenance: 15000,
                support: 15000,
                personnel: 60000
            },
            implementationDays: 45,
            paybackMonths: 16,
            roi: 95,
            productivityGains: 45000,
            features: {
                cloudNative: 20,
                zeroTrust: 45,
                deploymentSpeed: 40,
                costEfficiency: 50,
                scalability: 55,
                operationalEfficiency: 40,
                integration: 65,
                userExperience: 45,
                authentication: 65,
                endpointVisibility: 50,
                cloudIntegration: 40,
                multiVendor: 55,
                automation: 45,
                remoteAccess: 50,
                iotSupport: 40,
                apiExtensibility: 50,
                accessControl: 60,
                riskAssessment: 40,
                networkSegmentation: 55,
                postureAssessment: 45,
                threatDetection: 50,
                riskReduction: 30
            },
            complianceRatings: {
                pci: 60,
                hipaa: 55,
                nist: 65,
                gdpr: 55,
                iso: 60,
                cmmc: 65,
                ferpa: 60,
                sox: 55
            },
            strengths: [
                "Good Windows integration", 
                "Lower initial license cost",
                "Familiar interface for Windows admins", 
                "Built into Windows Server"
            ],
            weaknesses: [
                "Limited feature set", 
                "Requires Windows Server infrastructure",
                "Poor non-Windows device support", 
                "Minimal automation",
                "High management overhead"
            ]
        },
        "arista": {
            name: "Arista Agni",
            description: "Network control",
            logo: "img/vendors/arista-logo.png",
            architecture: "On-Premises",
            initialCosts: {
                hardware: 75000,
                software: 55000,
                implementation: 50000
            },
            annualCosts: {
                licensing: 45000,
                maintenance: 25000,
                support: 20000,
                personnel: 60000
            },
            implementationDays: 60,
            paybackMonths: 15,
            roi: 110,
            productivityGains: 60000,
            features: {
                cloudNative: 30,
                zeroTrust: 55,
                deploymentSpeed: 45,
                costEfficiency: 45,
                scalability: 65,
                operationalEfficiency: 50,
                integration: 70,
                userExperience: 50,
                authentication: 75,
                endpointVisibility: 65,
                cloudIntegration: 40,
                multiVendor: 60,
                automation: 60,
                remoteAccess: 45,
                iotSupport: 60,
                apiExtensibility: 60,
                accessControl: 70,
                riskAssessment: 50,
                networkSegmentation: 75,
                postureAssessment: 55,
                threatDetection: 60,
                riskReduction: 35
            },
            complianceRatings: {
                pci: 70,
                hipaa: 65,
                nist: 75,
                gdpr: 60,
                iso: 70,
                cmmc: 75,
                ferpa: 60,
                sox: 65
            },
            strengths: [
                "Strong network integration", 
                "Good policy enforcement",
                "Solid performance at scale", 
                "High-performance networking"
            ],
            weaknesses: [
                "Complex deployment", 
                "Significant hardware requirements",
                "Limited cloud capabilities", 
                "Substantial management overhead"
            ]
        },
        "foxpass": {
            name: "Foxpass",
            description: "Cloud RADIUS/LDAP",
            logo: "img/vendors/foxpass-logo.png",
            architecture: "Cloud",
            initialCosts: {
                hardware: 0,
                software: 15000,
                implementation: 15000
            },
            annualCosts: {
                licensing: 30000,
                maintenance: 0,
                support: 10000,
                personnel: 30000
            },
            implementationDays: 21,
            paybackMonths: 8,
            roi: 175,
            productivityGains: 75000,
            features: {
                cloudNative: 90,
                zeroTrust: 65,
                deploymentSpeed: 80,
                costEfficiency: 75,
                scalability: 75,
                operationalEfficiency: 70,
                integration: 60,
                userExperience: 70,
                authentication: 80,
                endpointVisibility: 55,
                cloudIntegration: 75,
                multiVendor: 60,
                automation: 65,
                remoteAccess: 75,
                iotSupport: 50,
                apiExtensibility: 65,
                accessControl: 70,
                riskAssessment: 55,
                networkSegmentation: 60,
                postureAssessment: 50,
                threatDetection: 45,
                riskReduction: 35
            },
            complianceRatings: {
                pci: 65,
                hipaa: 60,
                nist: 65,
                gdpr: 70,
                iso: 60,
                cmmc: 60,
                ferpa: 70,
                sox: 60
            },
            strengths: [
                "Cloud-native architecture", 
                "Simple deployment",
                "Good user management", 
                "Easy administration"
            ],
            weaknesses: [
                "Limited security features", 
                "Minimal device visibility",
                "Basic policy options", 
                "Not a comprehensive NAC solution"
            ]
        },
        "no-nac": {
            name: "No NAC",
            description: "High risk baseline",
            badge: "High Risk",
            logo: "img/vendors/no-nac-icon.png",
            architecture: "None",
            initialCosts: {
                hardware: 0,
                software: 0,
                implementation: 0
            },
            annualCosts: {
                licensing: 0,
                maintenance: 0,
                support: 0,
                personnel: 30000
            },
            implementationDays: 0,
            paybackMonths: 0,
            roi: 0,
            productivityGains: 0,
            features: {
                cloudNative: 0,
                zeroTrust: 0,
                deploymentSpeed: 100,
                costEfficiency: 100,
                scalability: 0,
                operationalEfficiency: 0,
                integration: 0,
                userExperience: 70,
                authentication: 10,
                endpointVisibility: 10,
                cloudIntegration: 0,
                multiVendor: 0,
                automation: 0,
                remoteAccess: 0,
                iotSupport: 0,
                apiExtensibility: 0,
                accessControl: 15,
                riskAssessment: 0,
                networkSegmentation: 10,
                postureAssessment: 0,
                threatDetection: 0,
                riskReduction: 0
            },
            complianceRatings: {
                pci: 0,
                hipaa: 0,
                nist: 0,
                gdpr: 0,
                iso: 0,
                cmmc: 0,
                ferpa: 0,
                sox: 0
            },
            strengths: [
                "No implementation cost", 
                "No licensing fees",
                "No deployment time"
            ],
            weaknesses: [
                "No device visibility", 
                "No access control",
                "No security enforcement", 
                "No compliance capabilities",
                "High security risk",
                "No breach prevention capabilities"
            ],
            riskFactors: {
                dataBreachProbability: "High",
                averageBreachCost: 4200000,
                complianceFailureProbability: "Very High",
                compliancePenalties: 1500000,
                insiderThreatRisk: "High",
                lateralMovementRisk: "Very High"
            }
        }
    };

    // Industry compliance mapping
    window.industryComplianceData = {
        "healthcare": {
            name: "Healthcare",
            primaryCompliance: ["hipaa"],
            secondaryCompliance: ["nist", "iso"],
            riskProfile: "high",
            requirements: [
                { name: "PHI Protection", portnoxRating: 90, averageRating: 65 },
                { name: "Access Control", portnoxRating: 95, averageRating: 70 },
                { name: "Authentication", portnoxRating: 90, averageRating: 75 },
                { name: "Audit Controls", portnoxRating: 95, averageRating: 60 },
                { name: "Device Inventory", portnoxRating: 95, averageRating: 65 },
                { name: "IoT Security", portnoxRating: 85, averageRating: 55 }
            ],
            breachCost: 9230000,
            dataPoints: [
                "Healthcare has the highest cost per record of any industry at $429 per record",
                "Medical devices are increasingly targeted by cyber attacks",
                "83% of medical imaging devices run on unsupported operating systems",
                "Average breach resolution time is 287 days in healthcare"
            ]
        },
        "financial": {
            name: "Financial Services",
            primaryCompliance: ["pci", "sox"],
            secondaryCompliance: ["nist", "iso", "gdpr"],
            riskProfile: "very high",
            requirements: [
                { name: "Cardholder Data Protection", portnoxRating: 95, averageRating: 75 },
                { name: "Network Segmentation", portnoxRating: 90, averageRating: 70 },
                { name: "Access Controls", portnoxRating: 95, averageRating: 80 },
                { name: "Continuous Monitoring", portnoxRating: 90, averageRating: 65 },
                { name: "Authentication", portnoxRating: 95, averageRating: 80 },
                { name: "Audit Trails", portnoxRating: 90, averageRating: 70 }
            ],
            breachCost: 5850000,
            dataPoints: [
                "Financial services face 300 times more cyber attacks than other industries",
                "Average cost of cybercrime for financial sector increased 40% over past 3 years",
                "Financial firms take 233 days on average to identify and contain a breach",
                "Customer personally identifiable information (PII) is involved in 45% of breaches"
            ]
        },
        "education": {
            name: "Education",
            primaryCompliance: ["ferpa"],
            secondaryCompliance: ["nist", "gdpr"],
            riskProfile: "elevated",
            requirements: [
                { name: "Student Data Protection", portnoxRating: 85, averageRating: 60 },
                { name: "BYOD Security", portnoxRating: 90, averageRating: 55 },
                { name: "Network Segmentation", portnoxRating: 85, averageRating: 60 },
                { name: "Access Controls", portnoxRating: 90, averageRating: 65 },
                { name: "IoT Device Security", portnoxRating: 80, averageRating: 50 },
                { name: "Guest Access", portnoxRating: 95, averageRating: 70 }
            ],
            breachCost: 3790000,
            dataPoints: [
                "Education ranks as one of the least secure industries for cybersecurity",
                "56% of educational institutions report at least one significant security incident",
                "Ransomware attacks in education increased 57% in 2021",
                "Average cost per record in education breaches is $111"
            ]
        },
        "government": {
            name: "Government",
            primaryCompliance: ["nist", "cmmc"],
            secondaryCompliance: ["iso", "gdpr"],
            riskProfile: "high",
            requirements: [
                { name: "Classified Data Protection", portnoxRating: 90, averageRating: 70 },
                { name: "Access Controls", portnoxRating: 95, averageRating: 75 },
                { name: "Authentication", portnoxRating: 90, averageRating: 80 },
                { name: "Continuous Monitoring", portnoxRating: 95, averageRating: 70 },
                { name: "Network Segmentation", portnoxRating: 90, averageRating: 65 },
                { name: "Device Compliance", portnoxRating: 95, averageRating: 70 }
            ],
            breachCost: 8240000,
            dataPoints: [
                "Government entities face nearly 500 million attacks each year",
                "State and local governments are increasingly targeted by ransomware",
                "74% of government IT leaders say security risks increased due to remote work",
                "Government sector takes 21% longer to identify breaches than average"
            ]
        },
        "manufacturing": {
            name: "Manufacturing",
            primaryCompliance: ["nist", "iso"],
            secondaryCompliance: ["cmmc"],
            riskProfile: "elevated",
            requirements: [
                { name: "OT/IT Convergence", portnoxRating: 85, averageRating: 60 },
                { name: "ICS Protection", portnoxRating: 80, averageRating: 55 },
                { name: "Supply Chain Security", portnoxRating: 85, averageRating: 60 },
                { name: "IoT Device Security", portnoxRating: 90, averageRating: 65 },
                { name: "Network Segmentation", portnoxRating: 90, averageRating: 70 },
                { name: "Authentication", portnoxRating: 90, averageRating: 65 }
            ],
            breachCost: 4240000,
            dataPoints: [
                "Manufacturing is the most targeted industry for industrial espionage",
                "OT environments often use legacy systems with limited security",
                "Manufacturing has seen a 300% increase in detected attacks",
                "47% of manufacturers experienced cyberattacks resulting in damages"
            ]
        },
        "retail": {
            name: "Retail",
            primaryCompliance: ["pci"],
            secondaryCompliance: ["gdpr", "iso"],
            riskProfile: "high",
            requirements: [
                { name: "Cardholder Data Protection", portnoxRating: 95, averageRating: 70 },
                { name: "POS Security", portnoxRating: 90, averageRating: 65 },
                { name: "IoT Device Security", portnoxRating: 85, averageRating: 60 },
                { name: "Network Segmentation", portnoxRating: 90, averageRating: 65 },
                { name: "Access Controls", portnoxRating: 90, averageRating: 70 },
                { name: "Guest Network Security", portnoxRating: 95, averageRating: 60 }
            ],
            breachCost: 3760000,
            dataPoints: [
                "Retail has the second-highest number of security breaches of any industry",
                "Retail breaches typically begin with malware or credential exploitation",
                "POS systems remain major attack vectors despite increased security",
                "88% of retail organizations have inadequate security budgets"
            ]
        },
        "technology": {
            name: "Technology",
            primaryCompliance: ["iso", "nist"],
            secondaryCompliance: ["gdpr", "sox"],
            riskProfile: "elevated",
            requirements: [
                { name: "IP Protection", portnoxRating: 90, averageRating: 75 },
                { name: "DevSecOps", portnoxRating: 85, averageRating: 70 },
                { name: "Cloud Security", portnoxRating: 95, averageRating: 70 },
                { name: "Access Controls", portnoxRating: 90, averageRating: 75 },
                { name: "Device Security", portnoxRating: 95, averageRating: 70 },
                { name: "Zero Trust Implementation", portnoxRating: 90, averageRating: 65 }
            ],
            breachCost: 4260000,
            dataPoints: [
                "Technology companies are prime targets for state-sponsored attacks",
                "Software supply chain attacks increased 650% in 2021",
                "Tech companies see 12x more attacks than other industries",
                "Insider threats are particularly damaging in technology sector"
            ]
        },
        "energy": {
            name: "Energy & Utilities",
            primaryCompliance: ["nist", "iso"],
            secondaryCompliance: ["cmmc"],
            riskProfile: "very high",
            requirements: [
                { name: "Critical Infrastructure", portnoxRating: 90, averageRating: 65 },
                { name: "OT/IT Convergence", portnoxRating: 85, averageRating: 60 },
                { name: "SCADA Security", portnoxRating: 80, averageRating: 55 },
                { name: "Network Segmentation", portnoxRating: 90, averageRating: 65 },
                { name: "Remote Access Security", portnoxRating: 95, averageRating: 60 },
                { name: "Authentication", portnoxRating: 90, averageRating: 70 }
            ],
            breachCost: 5250000,
            dataPoints: [
                "Energy sector is a primary target for nation-state attacks",
                "75% of energy companies have experienced a significant security incident",
                "Average time to detect a breach in this sector is 24% longer than average",
                "Legacy industrial control systems create significant security vulnerabilities"
            ]
        }
    };

    // Compliance framework data
    window.complianceFrameworks = {
        "pci": {
            name: "PCI DSS",
            fullName: "Payment Card Industry Data Security Standard",
            description: "Standards for organizations that handle credit card data",
            requirements: [
                { id: "1.2", name: "Network Segmentation", portnoxRating: 90, averageRating: 65 },
                { id: "2.2", name: "System Hardening", portnoxRating: 85, averageRating: 60 },
                { id: "7.1", name: "Access Control", portnoxRating: 95, averageRating: 70 },
                { id: "8.2", name: "Authentication", portnoxRating: 90, averageRating: 75 },
                { id: "9.1", name: "Physical Access", portnoxRating: 80, averageRating: 70 },
                { id: "10.2", name: "Monitoring & Logging", portnoxRating: 90, averageRating: 65 },
                { id: "11.4", name: "Intrusion Detection", portnoxRating: 85, averageRating: 60 }
            ]
        },
        "hipaa": {
            name: "HIPAA",
            fullName: "Health Insurance Portability and Accountability Act",
            description: "Protects sensitive patient health information",
            requirements: [
                { id: "164.308", name: "Access Management", portnoxRating: 95, averageRating: 70 },
                { id: "164.310", name: "Physical Safeguards", portnoxRating: 80, averageRating: 65 },
                { id: "164.312(a)", name: "Access Control", portnoxRating: 95, averageRating: 70 },
                { id: "164.312(b)", name: "Audit Controls", portnoxRating: 90, averageRating: 65 },
                { id: "164.312(c)", name: "Integrity Controls", portnoxRating: 85, averageRating: 60 },
                { id: "164.312(d)", name: "Authentication", portnoxRating: 90, averageRating: 75 },
                { id: "164.312(e)", name: "Transmission Security", portnoxRating: 90, averageRating: 65 }
            ]
        },
        "nist": {
            name: "NIST 800-53",
            fullName: "National Institute of Standards and Technology Special Publication 800-53",
            description: "Security controls for federal information systems",
            requirements: [
                { id: "AC-2", name: "Account Management", portnoxRating: 95, averageRating: 70 },
                { id: "AC-3", name: "Access Enforcement", portnoxRating: 90, averageRating: 75 },
                { id: "AC-17", name: "Remote Access", portnoxRating: 95, averageRating: 65 },
                { id: "CM-8", name: "System Component Inventory", portnoxRating: 95, averageRating: 60 },
                { id: "IA-2", name: "User Identification", portnoxRating: 90, averageRating: 75 },
                { id: "IA-5", name: "Authenticator Management", portnoxRating: 90, averageRating: 70 },
                { id: "SC-7", name: "Boundary Protection", portnoxRating: 85, averageRating: 65 }
            ]
        },
        "gdpr": {
            name: "GDPR",
            fullName: "General Data Protection Regulation",
            description: "EU data protection and privacy regulation",
            requirements: [
                { id: "Art. 25", name: "Data Protection by Design", portnoxRating: 90, averageRating: 65 },
                { id: "Art. 32(1)(a)", name: "Data Pseudonymization", portnoxRating: 85, averageRating: 60 },
                { id: "Art. 32(1)(b)", name: "Confidentiality & Integrity", portnoxRating: 90, averageRating: 70 },
                { id: "Art. 32(1)(c)", name: "Restore Data Availability", portnoxRating: 80, averageRating: 65 },
                { id: "Art. 32(1)(d)", name: "Testing & Assessment", portnoxRating: 85, averageRating: 60 },
                { id: "Art. 33", name: "Breach Notification", portnoxRating: 90, averageRating: 65 },
                { id: "Art. 35", name: "Data Protection Assessment", portnoxRating: 85, averageRating: 60 }
            ]
        },
        "iso": {
            name: "ISO 27001",
            fullName: "International Organization for Standardization 27001",
            description: "Standard for information security management",
            requirements: [
                { id: "A.8", name: "Asset Management", portnoxRating: 95, averageRating: 65 },
                { id: "A.9", name: "Access Control", portnoxRating: 95, averageRating: 70 },
                { id: "A.10", name: "Cryptography", portnoxRating: 85, averageRating: 65 },
                { id: "A.12", name: "Operational Security", portnoxRating: 90, averageRating: 70 },
                { id: "A.13", name: "Communications Security", portnoxRating: 90, averageRating: 65 },
                { id: "A.14", name: "System Acquisition", portnoxRating: 85, averageRating: 60 },
                { id: "A.18", name: "Compliance", portnoxRating: 90, averageRating: 65 }
            ]
        },
        "cmmc": {
            name: "CMMC",
            fullName: "Cybersecurity Maturity Model Certification",
            description: "Certification program for defense contractors",
            requirements: [
                { id: "AC.1.001", name: "Access Control", portnoxRating: 90, averageRating: 70 },
                { id: "AC.1.002", name: "Account Types", portnoxRating: 85, averageRating: 65 },
                { id: "AC.2.007", name: "Privileged Accounts", portnoxRating: 90, averageRating: 65 },
                { id: "IA.1.076", name: "Identification", portnoxRating: 90, averageRating: 70 },
                { id: "IA.1.077", name: "Authentication", portnoxRating: 90, averageRating: 75 },
                { id: "RM.2.142", name: "Risk Management", portnoxRating: 85, averageRating: 65 },
                { id: "SC.1.175", name: "Network Segmentation", portnoxRating: 85, averageRating: 60 }
            ]
        },
        "ferpa": {
            name: "FERPA",
            fullName: "Family Educational Rights and Privacy Act",
            description: "Federal law protecting student education records",
            requirements: [
                { id: "SE.1", name: "Data Access Controls", portnoxRating: 90, averageRating: 65 },
                { id: "SE.2", name: "Authentication", portnoxRating: 90, averageRating: 70 },
                { id: "SE.3", name: "Directory Information", portnoxRating: 85, averageRating: 60 },
                { id: "SE.4", name: "Access Limitations", portnoxRating: 90, averageRating: 65 },
                { id: "SE.5", name: "Audit Trails", portnoxRating: 85, averageRating: 60 },
                { id: "SE.6", name: "Data Security", portnoxRating: 90, averageRating: 65 },
                { id: "SE.7", name: "Records Disclosure", portnoxRating: 85, averageRating: 60 }
            ]
        },
        "sox": {
            name: "SOX",
            fullName: "Sarbanes-Oxley Act",
            description: "Corporate governance and financial disclosure law",
            requirements: [
                { id: "302", name: "Financial Reporting", portnoxRating: 85, averageRating: 65 },
                { id: "404", name: "Internal Controls", portnoxRating: 90, averageRating: 70 },
                { id: "409", name: "Real-Time Disclosure", portnoxRating: 85, averageRating: 60 },
                { id: "802", name: "Record Retention", portnoxRating: 90, averageRating: 65 },
                { id: "AC.1", name: "System Access Controls", portnoxRating: 95, averageRating: 70 },
                { id: "AC.2", name: "Authentication", portnoxRating: 90, averageRating: 75 },
                { id: "AC.3", name: "Audit Trail & Monitoring", portnoxRating: 90, averageRating: 65 }
            ]
        }
    };

    // Create complete chart management system
    console.log("Creating chart management system...");
    
    // Initialize chart storage
    window.chartInstances = {};
    
    // Method to destroy all charts
    window.destroyAllCharts = function() {
        console.log("Destroying all charts...");
        
        // Get all canvases
        const canvases = document.querySelectorAll('canvas');
        
        // Destroy chart for each canvas
        canvases.forEach(canvas => {
            if (canvas.id) {
                destroyChart(canvas.id);
            }
        });
        
        // Clear chart instances storage
        window.chartInstances = {};
        
        console.log("All charts destroyed successfully");
    };
    
    // Method to destroy a specific chart
    window.destroyChart = function(chartId) {
        if (!chartId) return;
        
        try {
            // Try different methods to destroy the chart
            
            // Method 1: Using our stored instances
            if (window.chartInstances[chartId]) {
                window.chartInstances[chartId].destroy();
                delete window.chartInstances[chartId];
                console.log(`Chart destroyed (stored instance): ${chartId}`);
                return;
            }
            
            // Method 2: Using Chart.js getChart method (if available)
            if (typeof Chart !== 'undefined' && Chart.getChart) {
                const chartInstance = Chart.getChart(chartId);
                if (chartInstance) {
                    chartInstance.destroy();
                    console.log(`Chart destroyed (Chart.getChart): ${chartId}`);
                    return;
                }
            }
            
            // Method 3: Using legacy chartJs method
            if (window[chartId + "Chart"]) {
                window[chartId + "Chart"].destroy();
                window[chartId + "Chart"] = null;
                console.log(`Chart destroyed (window variable): ${chartId}`);
                return;
            }
        } catch (error) {
            console.warn(`Error destroying chart ${chartId}:`, error);
        }
    };
    
    // Method to create a chart
    window.createChart = function(chartId, config) {
        console.log(`Creating chart: ${chartId}`);
        
        // First, ensure any existing chart is destroyed
        destroyChart(chartId);
        
        // Get the canvas element
        const canvas = document.getElementById(chartId);
        if (!canvas) {
            console.error(`Canvas element not found: ${chartId}`);
            return null;
        }
        
        try {
            // Create new chart
            const ctx = canvas.getContext('2d');
            const chart = new Chart(ctx, config);
            
            // Store chart instance
            window.chartInstances[chartId] = chart;
            
            console.log(`Chart created successfully: ${chartId}`);
            return chart;
        } catch (error) {
            console.error(`Error creating chart ${chartId}:`, error);
            return null;
        }
    };
    
    console.log("Vendor data and chart management system initialized successfully");
})();

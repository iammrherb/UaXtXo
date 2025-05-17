/**
 * Enhanced vendor data with comprehensive market research information
 * Based on the 2025 NAC market analysis and vendor comparison
 */

const VENDOR_DATA = {
    portnox: {
        name: "Portnox Cloud",
        type: "Cloud-native disruptor",
        logo: "img/vendors/portnox-logo.png",
        description: "Cloud-native zero trust NAC",
        shortDesc: "Cloud-native NAC",
        badge: {
            text: "Best Value",
            class: "badge-primary"
        },
        deploymentModel: "Cloud-only",
        implementationTime: "Hours to days",
        implementationComplexity: "Low",
        expertiseNeeded: "Minimal",
        fteRequirements: "0.1-0.25 FTE",
        costModel: {
            type: "Subscription-only",
            basePrice: 3.00, // Default price per device per month
            implementation: 3500, // White-glove onboarding
            hardware: 0,
            maintenance: 0, // Included in subscription
            averageDiscount: 15 // Default volume discount percentage
        },
        features: {
            cloudNative: 100,
            zeroTrust: 98,
            deploymentSpeed: 95,
            remoteAccess: 95,
            iotSupport: 90,
            multiVendor: 85,
            scalability: 90,
            automation: 85,
            compliance: 93,
            userExperience: 90,
            hardwareFootprint: 0, // No hardware required
            endpointVisibility: 88,
            threatResponse: 85
        },
        certifications: {
            pciDss: true,
            hipaa: true,
            nist: true,
            gdpr: true,
            iso27001: true,
            cmmc: true,
            fedramp: true,
            sox: true,
            ferpa: true
        },
        authCapabilities: {
            tacacs: "Cloud-native TACACS+",
            deviceAdmin: "Granular access control",
            certificateManagement: "Cloud-based CA",
            passwordless: "Strong",
            identityIntegration: "Excellent (Azure AD, Google, Okta)"
        },
        riskReduction: 58, // Percentage of risk reduction
        complianceCoverage: 93, // Percentage of compliance frameworks covered
        insuranceImpact: 10, // Percentage of potential insurance premium reduction
        roi: {
            paybackPeriod: 7, // months
            threeYearRoi: 287, // percentage
            costSavings: 247000 // 3-year savings vs traditional solutions
        }
    },
    cisco: {
        name: "Cisco ISE",
        type: "Enterprise leader",
        logo: "img/vendors/cisco-logo.png",
        description: "Comprehensive identity-based NAC",
        shortDesc: "Enterprise NAC",
        badge: {
            text: "Complex",
            class: "badge-warning"
        },
        deploymentModel: "On-prem, cloud, hybrid",
        implementationTime: "Weeks to months",
        implementationComplexity: "High",
        expertiseNeeded: "Expert",
        fteRequirements: "1-2 dedicated FTEs",
        costModel: {
            type: "Primarily subscription",
            basePrice: 8.00, // Per device per month equivalent
            implementation: 50000, // Lower range of implementation cost
            hardware: 50000, // Lower range of hardware cost
            maintenance: 18, // Annual maintenance as percentage of license cost
            averageDiscount: 20 // Enterprise discount percentage
        },
        features: {
            cloudNative: 30,
            zeroTrust: 85,
            deploymentSpeed: 35,
            remoteAccess: 80,
            iotSupport: 90,
            multiVendor: 95,
            scalability: 95,
            automation: 85,
            compliance: 95,
            userExperience: 70,
            hardwareFootprint: 90, // Large hardware requirement
            endpointVisibility: 90,
            threatResponse: 85
        },
        certifications: {
            pciDss: true,
            hipaa: true,
            nist: true,
            gdpr: true,
            iso27001: true,
            cmmc: true,
            fedramp: true,
            sox: true,
            ferpa: true
        },
        authCapabilities: {
            tacacs: "Native, comprehensive",
            deviceAdmin: "Command sets with regex",
            certificateManagement: "Built-in CA with SCEP",
            passwordless: "Strong",
            identityIntegration: "Excellent (AD, LDAP, SAML, OAuth)"
        },
        riskReduction: 52, // Percentage of risk reduction
        complianceCoverage: 95, // Percentage of compliance frameworks covered
        insuranceImpact: 8, // Percentage of potential insurance premium reduction
        roi: {
            paybackPeriod: 18, // months
            threeYearRoi: 150, // percentage
            costSavings: 0 // Baseline for comparison
        }
    },
    aruba: {
        name: "Aruba ClearPass",
        type: "Multi-vendor leader",
        logo: "img/vendors/aruba-logo.png",
        description: "Role-based NAC, context-based policy engine",
        shortDesc: "Policy manager",
        deploymentModel: "On-prem, cloud, hybrid",
        implementationTime: "Weeks",
        implementationComplexity: "Moderate to high",
        expertiseNeeded: "Advanced",
        fteRequirements: "0.5-1 dedicated FTE",
        costModel: {
            type: "Perpetual and subscription",
            basePrice: 6.50, // Per device per month equivalent
            implementation: 25000, // Mid-range implementation services
            hardware: 25000, // Mid-range hardware/VM
            maintenance: 20, // Annual maintenance as percentage of license cost
            averageDiscount: 18 // Enterprise discount percentage
        },
        features: {
            cloudNative: 35,
            zeroTrust: 75,
            deploymentSpeed: 50,
            remoteAccess: 70,
            iotSupport: 85,
            multiVendor: 95,
            scalability: 90,
            automation: 80,
            compliance: 90,
            userExperience: 75,
            hardwareFootprint: 70, // Medium hardware requirement
            endpointVisibility: 85,
            threatResponse: 80
        },
        certifications: {
            pciDss: true,
            hipaa: true,
            nist: true,
            gdpr: true,
            iso27001: true,
            cmmc: true,
            fedramp: true,
            sox: true,
            ferpa: true
        },
        authCapabilities: {
            tacacs: "Built-in",
            deviceAdmin: "Shell command authorization",
            certificateManagement: "Onboard module",
            passwordless: "Strong",
            identityIntegration: "Excellent (AD, LDAP, SAML, OAuth)"
        },
        riskReduction: 50, // Percentage of risk reduction
        complianceCoverage: 90, // Percentage of compliance frameworks covered
        insuranceImpact: 8, // Percentage of potential insurance premium reduction
        roi: {
            paybackPeriod: 15, // months
            threeYearRoi: 170, // percentage
            costSavings: 85000 // 3-year savings vs Cisco ISE
        }
    },
    forescout: {
        name: "Forescout",
        type: "Agentless specialist",
        logo: "img/vendors/forescout-logo.png",
        description: "Agentless NAC, continuous visibility, automated enforcement",
        shortDesc: "Device visibility",
        deploymentModel: "On-prem, cloud, hybrid",
        implementationTime: "Days to weeks",
        implementationComplexity: "Moderate",
        expertiseNeeded: "Intermediate",
        fteRequirements: "0.5-1 dedicated FTE",
        costModel: {
            type: "Perpetual, term-based, subscription",
            basePrice: 7.00, // Per device per month equivalent
            implementation: 25000, // Mid-range professional services
            hardware: 20000, // Physical appliances starting at lower range
            maintenance: 22, // Annual maintenance as percentage of license cost
            averageDiscount: 15 // Enterprise discount percentage
        },
        features: {
            cloudNative: 40,
            zeroTrust: 80,
            deploymentSpeed: 60,
            remoteAccess: 65,
            iotSupport: 95,
            multiVendor: 90,
            scalability: 85,
            automation: 85,
            compliance: 85,
            userExperience: 75,
            hardwareFootprint: 70, // Medium hardware requirement
            endpointVisibility: 95,
            threatResponse: 85
        },
        certifications: {
            pciDss: true,
            hipaa: true,
            nist: true,
            gdpr: true,
            iso27001: true,
            cmmc: true,
            fedramp: true,
            sox: true,
            ferpa: true
        },
        authCapabilities: {
            tacacs: "Limited native",
            deviceAdmin: "Limited features",
            certificateManagement: "Basic",
            passwordless: "Moderate",
            identityIntegration: "Good (AD, LDAP)"
        },
        riskReduction: 48, // Percentage of risk reduction
        complianceCoverage: 85, // Percentage of compliance frameworks covered
        insuranceImpact: 7, // Percentage of potential insurance premium reduction
        roi: {
            paybackPeriod: 13, // months
            threeYearRoi: 165, // percentage
            costSavings: 95000 // 3-year savings vs Cisco ISE
        }
    },
    fortinac: {
        name: "FortiNAC",
        type: "Security fabric component",
        logo: "img/vendors/fortinac-logo.png",
        description: "Visibility and control, security fabric integration",
        shortDesc: "Fortinet NAC",
        deploymentModel: "On-prem, cloud, hybrid",
        implementationTime: "Weeks",
        implementationComplexity: "Moderate to high",
        expertiseNeeded: "Advanced",
        fteRequirements: "0.25-1 FTE",
        costModel: {
            type: "Perpetual and subscription",
            basePrice: 5.50, // Per device per month equivalent
            implementation: 20000, // Professional services
            hardware: 25000, // Hardware costs
            maintenance: 20, // Annual maintenance as percentage of license cost
            averageDiscount: 20 // Fortinet ecosystem discount
        },
        features: {
            cloudNative: 40,
            zeroTrust: 75,
            deploymentSpeed: 55,
            remoteAccess: 70,
            iotSupport: 80,
            multiVendor: 70,
            scalability: 80,
            automation: 85,
            compliance: 80,
            userExperience: 70,
            hardwareFootprint: 65, // Medium hardware requirement
            endpointVisibility: 85,
            threatResponse: 90 // Strength due to security fabric
        },
        certifications: {
            pciDss: true,
            hipaa: true,
            nist: true,
            gdpr: true,
            iso27001: true,
            cmmc: true,
            fedramp: true,
            sox: true,
            ferpa: false
        },
        authCapabilities: {
            tacacs: "Via FortiAuthenticator",
            deviceAdmin: "Policy-based",
            certificateManagement: "Via FortiAuthenticator",
            passwordless: "Moderate",
            identityIntegration: "Good (AD, LDAP, RADIUS, SAML)"
        },
        riskReduction: 45, // Percentage of risk reduction
        complianceCoverage: 80, // Percentage of compliance frameworks covered
        insuranceImpact: 8, // Percentage of potential insurance premium reduction
        roi: {
            paybackPeriod: 12, // months
            threeYearRoi: 180, // percentage
            costSavings: 110000 // 3-year savings vs Cisco ISE
        }
    },
    juniper: {
        name: "Juniper Mist",
        type: "Cloud-native innovator",
        logo: "img/vendors/juniper-logo.png",
        description: "AI-driven cloud-native NAC, zero trust model",
        shortDesc: "AI-driven NAC",
        deploymentModel: "Cloud-only",
        implementationTime: "Days",
        implementationComplexity: "Low to moderate",
        expertiseNeeded: "Intermediate",
        fteRequirements: "0.1-0.5 FTE",
        costModel: {
            type: "Subscription-only",
            basePrice: 4.00, // Per device per month
            implementation: 10000, // Implementation services
            hardware: 0, // No hardware required
            maintenance: 0, // Included in subscription
            averageDiscount: 15 // Enterprise discount percentage
        },
        features: {
            cloudNative: 95,
            zeroTrust: 90,
            deploymentSpeed: 85,
            remoteAccess: 85,
            iotSupport: 75,
            multiVendor: 80,
            scalability: 90,
            automation: 90,
            compliance: 85,
            userExperience: 85,
            hardwareFootprint: 0, // No hardware required
            endpointVisibility: 80,
            threatResponse: 85
        },
        certifications: {
            pciDss: true,
            hipaa: true,
            nist: true,
            gdpr: true,
            iso27001: true,
            cmmc: true,
            fedramp: true,
            sox: true,
            ferpa: true
        },
        authCapabilities: {
            tacacs: "Recently added",
            deviceAdmin: "Cloud-based",
            certificateManagement: "X.509 with cloud PKI",
            passwordless: "Strong",
            identityIntegration: "Excellent (Cloud IdPs)"
        },
        riskReduction: 50, // Percentage of risk reduction
        complianceCoverage: 85, // Percentage of compliance frameworks covered
        insuranceImpact: 9, // Percentage of potential insurance premium reduction
        roi: {
            paybackPeriod: 9, // months
            threeYearRoi: 200, // percentage
            costSavings: 175000 // 3-year savings vs Cisco ISE
        }
    },
    securew2: {
        name: "SecureW2",
        type: "PKI specialist",
        logo: "img/vendors/securew2-logo.png",
        description: "Cloud-native RADIUS and PKI, certificate-based auth",
        shortDesc: "Cloud RADIUS",
        deploymentModel: "Cloud-only",
        implementationTime: "Hours to days",
        implementationComplexity: "Low",
        expertiseNeeded: "Basic",
        fteRequirements: "Minimal",
        costModel: {
            type: "Subscription-only",
            basePrice: 4.50, // Per device per month equivalent
            implementation: 5000, // Implementation costs
            hardware: 0, // No hardware required
            maintenance: 0, // Included in subscription
            averageDiscount: 10 // Standard discount percentage
        },
        features: {
            cloudNative: 95,
            zeroTrust: 85,
            deploymentSpeed: 90,
            remoteAccess: 80,
            iotSupport: 70,
            multiVendor: 75,
            scalability: 80,
            automation: 75,
            compliance: 85,
            userExperience: 85,
            hardwareFootprint: 0, // No hardware required
            endpointVisibility: 70,
            threatResponse: 70
        },
        certifications: {
            pciDss: true,
            hipaa: true,
            nist: true,
            gdpr: true,
            iso27001: true,
            cmmc: false,
            fedramp: false,
            sox: true,
            ferpa: true
        },
        authCapabilities: {
            tacacs: "Limited",
            deviceAdmin: "Certificate-based",
            certificateManagement: "Industry-leading",
            passwordless: "Excellent",
            identityIntegration: "Excellent (Cloud IdPs)"
        },
        riskReduction: 45, // Percentage of risk reduction
        complianceCoverage: 85, // Percentage of compliance frameworks covered
        insuranceImpact: 7, // Percentage of potential insurance premium reduction
        roi: {
            paybackPeriod: 10, // months
            threeYearRoi: 175, // percentage
            costSavings: 150000 // 3-year savings vs Cisco ISE
        }
    },
    microsoft: {
        name: "Microsoft NPS",
        type: "Windows-integrated option",
        logo: "img/vendors/microsoft-logo.png",
        description: "Windows Server RADIUS implementation, AD integration",
        shortDesc: "Windows Server NAC",
        deploymentModel: "On-prem only",
        implementationTime: "Days to weeks",
        implementationComplexity: "Moderate to high",
        expertiseNeeded: "Windows Server expertise",
        fteRequirements: "Part of Windows admin duties",
        costModel: {
            type: "Included with Windows Server",
            basePrice: 2.00, // Effective cost per device per month
            implementation: 15000, // Implementation services
            hardware: 20000, // Server hardware
            maintenance: 15, // Annual maintenance as percentage of infrastructure cost
            averageDiscount: 10 // Microsoft volume licensing discount
        },
        features: {
            cloudNative: 10,
            zeroTrust: 40,
            deploymentSpeed: 40,
            remoteAccess: 60,
            iotSupport: 40,
            multiVendor: 30,
            scalability: 60,
            automation: 40,
            compliance: 60,
            userExperience: 50,
            hardwareFootprint: 60, // Server hardware required
            endpointVisibility: 50,
            threatResponse: 30
        },
        certifications: {
            pciDss: true,
            hipaa: true,
            nist: true,
            gdpr: true,
            iso27001: true,
            cmmc: true,
            fedramp: true,
            sox: true,
            ferpa: true
        },
        authCapabilities: {
            tacacs: "None",
            deviceAdmin: "None",
            certificateManagement: "Via Microsoft CA",
            passwordless: "Moderate (Windows)",
            identityIntegration: "Limited (Strong AD only)"
        },
        riskReduction: 30, // Percentage of risk reduction
        complianceCoverage: 60, // Percentage of compliance frameworks covered
        insuranceImpact: 3, // Percentage of potential insurance premium reduction
        roi: {
            paybackPeriod: 24, // months
            threeYearRoi: 80, // percentage
            costSavings: 50000 // 3-year savings vs Cisco ISE
        }
    },
    arista: {
        name: "Arista Agni",
        type: "Enterprise cloud solution",
        logo: "img/vendors/arista-logo.png",
        description: "Cloud-native AI-driven network identity",
        shortDesc: "Network control",
        deploymentModel: "Cloud",
        implementationTime: "Days to weeks",
        implementationComplexity: "Moderate",
        expertiseNeeded: "Network admin knowledge",
        fteRequirements: "Reduced compared to on-prem solutions",
        costModel: {
            type: "Subscription-based",
            basePrice: 4.75, // Per device per month
            implementation: 15000, // Implementation costs for complex environments
            hardware: 0, // No hardware required
            maintenance: 0, // Included in subscription
            averageDiscount: 12 // Standard discount percentage
        },
        features: {
            cloudNative: 90,
            zeroTrust: 85,
            deploymentSpeed: 75,
            remoteAccess: 80,
            iotSupport: 70,
            multiVendor: 75,
            scalability: 85,
            automation: 85,
            compliance: 80,
            userExperience: 75,
            hardwareFootprint: 0, // No hardware required
            endpointVisibility: 75,
            threatResponse: 80
        },
        certifications: {
            pciDss: true,
            hipaa: true,
            nist: true,
            gdpr: true,
            iso27001: true,
            cmmc: false,
            fedramp: false,
            sox: true,
            ferpa: false
        },
        authCapabilities: {
            tacacs: "Native",
            deviceAdmin: "Via CloudVision",
            certificateManagement: "Integrated",
            passwordless: "Moderate",
            identityIntegration: "Good (Cloud IdPs)"
        },
        riskReduction: 45, // Percentage of risk reduction
        complianceCoverage: 80, // Percentage of compliance frameworks covered
        insuranceImpact: 7, // Percentage of potential insurance premium reduction
        roi: {
            paybackPeriod: 12, // months
            threeYearRoi: 170, // percentage
            costSavings: 140000 // 3-year savings vs Cisco ISE
        }
    },
    foxpass: {
        name: "Foxpass",
        type: "Cloud LDAP/RADIUS solution",
        logo: "img/vendors/foxpass-logo.png",
        description: "Cloud-hosted LDAP and RADIUS, SSH key management",
        shortDesc: "Cloud RADIUS/LDAP",
        deploymentModel: "Cloud-only",
        implementationTime: "Hours",
        implementationComplexity: "Low",
        expertiseNeeded: "Basic",
        fteRequirements: "Minimal",
        costModel: {
            type: "Subscription-only",
            basePrice: 3.50, // Equivalent monthly cost per device
            implementation: 2500, // Implementation costs
            hardware: 0, // No hardware required
            maintenance: 0, // Included in subscription
            averageDiscount: 5 // Limited discount structure
        },
        features: {
            cloudNative: 95,
            zeroTrust: 70,
            deploymentSpeed: 90,
            remoteAccess: 75,
            iotSupport: 50,
            multiVendor: 60,
            scalability: 70,
            automation: 65,
            compliance: 70,
            userExperience: 80,
            hardwareFootprint: 0, // No hardware required
            endpointVisibility: 60,
            threatResponse: 60
        },
        certifications: {
            pciDss: true,
            hipaa: true,
            nist: true,
            gdpr: true,
            iso27001: true,
            cmmc: false,
            fedramp: false,
            sox: true,
            ferpa: false
        },
        authCapabilities: {
            tacacs: "None",
            deviceAdmin: "Limited",
            certificateManagement: "Basic",
            passwordless: "Moderate",
            identityIntegration: "Good (Google, Microsoft 365)"
        },
        riskReduction: 40, // Percentage of risk reduction
        complianceCoverage: 70, // Percentage of compliance frameworks covered
        insuranceImpact: 5, // Percentage of potential insurance premium reduction
        roi: {
            paybackPeriod: 8, // months
            threeYearRoi: 165, // percentage
            costSavings: 135000 // 3-year savings vs Cisco ISE
        }
    },
    "no-nac": {
        name: "No NAC",
        type: "High risk baseline",
        logo: "img/vendors/no-nac-icon.png",
        description: "No Network Access Control solution",
        shortDesc: "High risk baseline",
        badge: {
            text: "High Risk",
            class: "badge-danger"
        },
        deploymentModel: "N/A",
        implementationTime: "N/A",
        implementationComplexity: "N/A",
        expertiseNeeded: "N/A",
        fteRequirements: "N/A",
        costModel: {
            type: "No direct costs",
            basePrice: 0, // No license costs
            implementation: 0, // No implementation costs
            hardware: 0, // No hardware costs
            maintenance: 0, // No maintenance costs
            averageDiscount: 0 // No discounts
        },
        features: {
            cloudNative: 0,
            zeroTrust: 0,
            deploymentSpeed: 100, // Instant as nothing to implement
            remoteAccess: 0,
            iotSupport: 0,
            multiVendor: 0,
            scalability: 0,
            automation: 0,
            compliance: 0,
            userExperience: 70, // No extra authentication steps
            hardwareFootprint: 0,
            endpointVisibility: 0,
            threatResponse: 0
        },
        certifications: {
            pciDss: false,
            hipaa: false,
            nist: false,
            gdpr: false,
            iso27001: false,
            cmmc: false,
            fedramp: false,
            sox: false,
            ferpa: false
        },
        authCapabilities: {
            tacacs: "None",
            deviceAdmin: "None",
            certificateManagement: "None",
            passwordless: "None",
            identityIntegration: "None"
        },
        riskReduction: 0, // No risk reduction
        complianceCoverage: 0, // No compliance coverage
        insuranceImpact: -20, // Increased insurance premiums due to higher risk
        roi: {
            paybackPeriod: 0, // No payback as no investment
            threeYearRoi: 0, // No ROI as no investment
            costSavings: -350000 // Estimated breach and compliance cost over 3 years
        }
    }
};

// Industry-specific compliance requirements mapping
const INDUSTRY_COMPLIANCE = {
    healthcare: {
        name: "Healthcare",
        description: "Organizations that handle, store, or process patient health information",
        primaryFrameworks: ["HIPAA", "HITECH"],
        additionalFrameworks: ["ISO 27001", "NIST CSF"],
        specificRequirements: [
            "Authentication procedures to verify people seeking access to ePHI [45 CFR 164.312(d)]",
            "Unique user identification [45 CFR 164.312(a)(2)(i)]",
            "Technical policies for authorized access [45 CFR 164.312(a)(1)]",
            "Audit controls for information systems [45 CFR 164.312(b)]"
        ],
        nonCompliance: {
            financial: "Up to $50,000 per violation (max $1.9M annually)",
            operational: "Potential criminal penalties including imprisonment",
            reputational: "Mandatory breach notifications impacting trust"
        },
        bestFitVendors: ["portnox", "aruba", "cisco"],
        criticalFeatures: ["deploymentSpeed", "endpointVisibility", "compliance"]
    },
    financial: {
        name: "Financial Services",
        description: "Banks, credit unions, investment firms, and payment processors",
        primaryFrameworks: ["PCI DSS", "SOX", "GLBA"],
        additionalFrameworks: ["ISO 27001", "NIST CSF"],
        specificRequirements: [
            "Restrict access to cardholder data by business need (PCI Req 7)",
            "Strong access control with MFA for administrative access (PCI Req 8)",
            "Prohibition of group/shared credentials (PCI DSS)",
            "Adequate internal controls for financial systems (SOX)",
            "Access controls and authentication for customer information (GLBA)"
        ],
        nonCompliance: {
            financial: "PCI DSS: Up to $500,000, SOX: Up to $5M",
            operational: "Increased transaction fees, processing restrictions",
            reputational: "Loss of customer trust, regulatory scrutiny"
        },
        bestFitVendors: ["portnox", "cisco", "aruba", "forescout"],
        criticalFeatures: ["zeroTrust", "compliance", "threatResponse"]
    },
    education: {
        name: "Education",
        description: "K-12 schools, colleges, universities, and educational institutions",
        primaryFrameworks: ["FERPA", "COPPA"],
        additionalFrameworks: ["NIST CSF"],
        specificRequirements: [
            "Protection of student education records from unauthorized disclosure",
            "Access controls limiting who can view records",
            "Authentication processes to verify identity",
            "Protective measures for children's data under 13 (COPPA)"
        ],
        nonCompliance: {
            financial: "Loss of federal funding, up to $46,517 per COPPA violation",
            operational: "Administrative sanctions, implementation of corrective plans",
            reputational: "Loss of trust from parents and students"
        },
        bestFitVendors: ["portnox", "securew2", "juniper", "aruba"],
        criticalFeatures: ["deploymentSpeed", "multiVendor", "userExperience"]
    },
    government: {
        name: "Government",
        description: "Federal, state, and local government agencies and departments",
        primaryFrameworks: ["FISMA", "FedRAMP", "CMMC"],
        additionalFrameworks: ["NIST SP 800-53", "NIST SP 800-171"],
        specificRequirements: [
            "Access Control (AC) family of controls (NIST)",
            "Identification and Authentication (IA) controls (NIST)",
            "System and Communications Protection (SC) controls (NIST)",
            "Continuous monitoring and risk management",
            "Strict access enforcement and boundary protection"
        ],
        nonCompliance: {
            financial: "Loss of funding, contract eligibility",
            operational: "Loss of FedRAMP authorization",
            reputational: "Public scrutiny, potential False Claims Act liability"
        },
        bestFitVendors: ["cisco", "aruba", "portnox", "forescout"],
        criticalFeatures: ["compliance", "threatResponse", "endpointVisibility"]
    },
    manufacturing: {
        name: "Manufacturing",
        description: "Industrial production, factory automation, and production facilities",
        primaryFrameworks: ["NIST CSF", "IEC 62443"],
        additionalFrameworks: ["ISO 27001"],
        specificRequirements: [
            "Identification and authentication for all users (human, software, devices)",
            "Account management and authentication (IEC 62443)",
            "Zone boundary protection and secure communications",
            "OT/IT network segmentation and protection"
        ],
        nonCompliance: {
            financial: "Potential production disruption costs",
            operational: "Safety risks, production downtime",
            reputational: "Reduced customer confidence"
        },
        bestFitVendors: ["forescout", "fortinac", "cisco", "portnox"],
        criticalFeatures: ["iotSupport", "endpointVisibility", "threatResponse"]
    },
    retail: {
        name: "Retail",
        description: "Merchants, e-commerce, and consumer goods companies",
        primaryFrameworks: ["PCI DSS", "CCPA/CPRA"],
        additionalFrameworks: ["NIST CSF"],
        specificRequirements: [
            "All PCI DSS requirements for cardholder data protection",
            "CCPA/CPRA requirements for reasonable security procedures",
            "Verification of consumer identities when exercising rights",
            "Protection of point-of-sale systems and payment infrastructure"
        ],
        nonCompliance: {
            financial: "Up to $7,500 per intentional violation, $100-$750 per consumer per incident",
            operational: "Mandatory breach notifications, potential class action",
            reputational: "Consumer trust erosion, public disclosure of failures"
        },
        bestFitVendors: ["portnox", "fortinac", "juniper"],
        criticalFeatures: ["deploymentSpeed", "iotSupport", "userExperience"]
    },
    technology: {
        name: "Technology",
        description: "Software companies, IT services, and technology providers",
        primaryFrameworks: ["ISO 27001", "SOC 2"],
        additionalFrameworks: ["NIST CSF", "GDPR"],
        specificRequirements: [
            "Access control and user authentication (ISO 27001 A.9)",
            "Secure development practices and environments",
            "Cryptographic controls and key management",
            "Supplier relationships and secure service delivery"
        ],
        nonCompliance: {
            financial: "Contract loss, liability from customer breaches",
            operational: "Loss of certification, increased audit scrutiny",
            reputational: "Market share loss, reduced competitiveness"
        },
        bestFitVendors: ["portnox", "juniper", "arista", "cisco"],
        criticalFeatures: ["cloudNative", "zeroTrust", "automation"]
    },
    energy: {
        name: "Energy & Utilities",
        description: "Power generation, water, gas, and critical infrastructure providers",
        primaryFrameworks: ["NERC CIP", "NIST CSF"],
        additionalFrameworks: ["IEC 62443"],
        specificRequirements: [
            "Documented personnel risk assessments before granting access",
            "Access privilege verification at least every 15 months",
            "Access revocation within 24 hours of termination",
            "Electronic Security Perimeter identification and documentation",
            "Multi-factor authentication for all interactive remote access"
        ],
        nonCompliance: {
            financial: "Up to $1 million per violation per day",
            operational: "Increased regulatory scrutiny, potential operational restrictions",
            reputational: "Public safety concerns, executive liability"
        },
        bestFitVendors: ["cisco", "forescout", "portnox", "fortinac"],
        criticalFeatures: ["endpointVisibility", "threatResponse", "multiVendor"]
    }
};

// Risk profiles with detailed impact assessment
const RISK_PROFILES = {
    standard: {
        name: "Standard Risk",
        description: "Organizations with typical security requirements and moderate attack surface",
        breachProbability: "Medium",
        averageBreachCost: 4200000, // Average cost in USD
        securityControls: {
            requirementLevel: "Basic NAC deployment",
            keyMeasures: [
                "Basic device authentication",
                "Standard network segmentation",
                "Regular compliance checks"
            ]
        },
        insuranceImpact: {
            premiumEffect: "Baseline",
            deductibleEffect: "Standard",
            coverageLimits: "Standard policy limits"
        },
        recommendedVendors: ["portnox", "juniper", "aruba"]
    },
    elevated: {
        name: "Elevated Risk",
        description: "Organizations with sensitive data, larger attack surface, or higher-value targets",
        breachProbability: "Medium-High",
        averageBreachCost: 5800000, // Average cost in USD
        securityControls: {
            requirementLevel: "Enhanced NAC implementation",
            keyMeasures: [
                "Multi-factor authentication",
                "Advanced device posture assessment",
                "Enhanced visibility and monitoring",
                "Automated remediation capabilities"
            ]
        },
        insuranceImpact: {
            premiumEffect: "10-15% higher than baseline",
            deductibleEffect: "Moderately increased",
            coverageLimits: "Standard with potential sublimits"
        },
        recommendedVendors: ["portnox", "cisco", "aruba", "forescout"]
    },
    high: {
        name: "High Risk",
        description: "High-value targets with extensive attack surface and significant data sensitivity",
        breachProbability: "High",
        averageBreachCost: 7500000, // Average cost in USD
        securityControls: {
            requirementLevel: "Comprehensive NAC deployment",
            keyMeasures: [
                "Certificate-based authentication",
                "Continuous monitoring and assessment",
                "Advanced threat detection integration",
                "Comprehensive access policies",
                "Real-time enforcement and remediation"
            ]
        },
        insuranceImpact: {
            premiumEffect: "25-40% higher than baseline",
            deductibleEffect: "Significantly increased",
            coverageLimits: "Potentially reduced with specific exclusions"
        },
        recommendedVendors: ["cisco", "forescout", "portnox", "aruba"]
    },
    regulated: {
        name: "Highly Regulated",
        description: "Organizations in heavily regulated industries with strict compliance requirements",
        breachProbability: "Variable",
        averageBreachCost: 9200000, // Average cost in USD including regulatory penalties
        securityControls: {
            requirementLevel: "Rigorous NAC implementation with full compliance",
            keyMeasures: [
                "Comprehensive authentication and authorization",
                "Detailed audit logging and reporting",
                "Advanced segmentation and isolation",
                "Strict policy enforcement",
                "Regularly tested incident response"
            ]
        },
        insuranceImpact: {
            premiumEffect: "30-50% higher than baseline",
            deductibleEffect: "Substantially increased",
            coverageLimits: "Carefully negotiated with specific endorsements"
        },
        recommendedVendors: ["cisco", "aruba", "portnox", "forescout"]
    }
};

// Insurance coverage options and their impact on security posture
const INSURANCE_OPTIONS = {
    none: {
        name: "No Cybersecurity Insurance",
        description: "No dedicated cyber insurance coverage",
        estimatedAnnualCost: 0,
        coverage: {
            breachResponse: "None",
            liabilityCoverage: "None",
            businessInterruption: "None",
            dataRecovery: "None",
            regulatoryFines: "None"
        },
        nacRequirements: "None specified",
        riskImpact: "Full exposure to all costs and liabilities from cyber incidents"
    },
    basic: {
        name: "Basic Coverage",
        description: "Fundamental cyber insurance with limited protection",
        estimatedAnnualCost: 25000, // Typical cost for medium organization
        coverage: {
            breachResponse: "Limited (often sublimited)",
            liabilityCoverage: "Basic third-party coverage",
            businessInterruption: "Limited coverage with waiting period",
            dataRecovery: "Basic coverage with caps",
            regulatoryFines: "Limited to specific regulations"
        },
        nacRequirements: "Basic network controls and access management",
        riskImpact: "Partial protection with significant gaps in coverage"
    },
    standard: {
        name: "Standard Coverage",
        description: "Comprehensive cyber insurance suitable for most organizations",
        estimatedAnnualCost: 45000, // Typical cost for medium organization
        coverage: {
            breachResponse: "Comprehensive coverage",
            liabilityCoverage: "Full third-party liability coverage",
            businessInterruption: "Standard coverage with moderate waiting period",
            dataRecovery: "Standard coverage",
            regulatoryFines: "Coverage for most applicable regulations"
        },
        nacRequirements: "Comprehensive NAC solution with documented policies",
        riskImpact: "Solid protection for most common scenarios with reasonable limits"
    },
    comprehensive: {
        name: "Comprehensive Coverage",
        description: "Premium cyber insurance with extensive protection",
        estimatedAnnualCost: 85000, // Typical cost for medium organization
        coverage: {
            breachResponse: "Full coverage with minimal sublimits",
            liabilityCoverage: "Extensive third-party coverage",
            businessInterruption: "Comprehensive with minimal waiting period",
            dataRecovery: "Full coverage",
            regulatoryFines: "Broad regulatory coverage"
        },
        nacRequirements: "Advanced NAC implementation with continuous monitoring, MFA, and regular assessments",
        riskImpact: "Extensive protection with higher limits and fewer exclusions"
    }
};

// Export all data structures
window.VENDOR_DATA = VENDOR_DATA;
window.INDUSTRY_COMPLIANCE = INDUSTRY_COMPLIANCE;
window.RISK_PROFILES = RISK_PROFILES;
window.INSURANCE_OPTIONS = INSURANCE_OPTIONS;

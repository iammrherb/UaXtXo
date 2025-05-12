/**
 * Vendor Comparison Data
 * Contains feature ratings and comparison metrics for different NAC vendors
 */
const VendorComparisonData = {
    // Feature ratings (1-10 scale)
    featureRatings: {
        cisco: {
            deviceVisibility: 8,
            policyManagement: 9,
            guestAccess: 8,
            byodSupport: 8,
            cloudIntegration: 6,
            automatedRemediation: 8,
            thirdPartyIntegration: 9,
            scalability: 9,
            easeOfUse: 5,
            reporting: 8
        },
        aruba: {
            deviceVisibility: 8,
            policyManagement: 8,
            guestAccess: 9,
            byodSupport: 9,
            cloudIntegration: 7,
            automatedRemediation: 8,
            thirdPartyIntegration: 8,
            scalability: 8,
            easeOfUse: 6,
            reporting: 8
        },
        forescout: {
            deviceVisibility: 10,
            policyManagement: 8,
            guestAccess: 7,
            byodSupport: 7,
            cloudIntegration: 6,
            automatedRemediation: 9,
            thirdPartyIntegration: 9,
            scalability: 8,
            easeOfUse: 6,
            reporting: 9
        },
        fortinac: {
            deviceVisibility: 8,
            policyManagement: 7,
            guestAccess: 7,
            byodSupport: 7,
            cloudIntegration: 6,
            automatedRemediation: 7,
            thirdPartyIntegration: 7,
            scalability: 7,
            easeOfUse: 6,
            reporting: 7
        },
        nps: {
            deviceVisibility: 4,
            policyManagement: 5,
            guestAccess: 3,
            byodSupport: 3,
            cloudIntegration: 2,
            automatedRemediation: 2,
            thirdPartyIntegration: 3,
            scalability: 5,
            easeOfUse: 4,
            reporting: 3
        },
        securew2: {
            deviceVisibility: 6,
            policyManagement: 7,
            guestAccess: 7,
            byodSupport: 9,
            cloudIntegration: 9,
            automatedRemediation: 6,
            thirdPartyIntegration: 6,
            scalability: 8,
            easeOfUse: 8,
            reporting: 7
        },
        portnox: {
            deviceVisibility: 8,
            policyManagement: 9,
            guestAccess: 8,
            byodSupport: 9,
            cloudIntegration: 10,
            automatedRemediation: 9,
            thirdPartyIntegration: 9,
            scalability: 9,
            easeOfUse: 9,
            reporting: 8
        }
    },
    
    // Vendor benefits and key differentiators
    benefits: {
        portnox: [
            {
                title: "Cloud-Native Architecture",
                description: "Purpose-built for cloud with no hardware requirements",
                icon: "fas fa-cloud",
                metric: "Zero Hardware Costs"
            },
            {
                title: "Rapid Deployment",
                description: "Deploy in hours instead of weeks or months",
                icon: "fas fa-bolt",
                metric: "60-90% Faster"
            },
            {
                title: "Lower Operational Costs",
                description: "Minimal IT overhead with automatic updates",
                icon: "fas fa-coins",
                metric: "40-60% Lower TCO"
            },
            {
                title: "Easy Administration",
                description: "Intuitive UI with simplified policy management",
                icon: "fas fa-user-cog",
                metric: "70% Less Admin Time"
            }
        ],
        
        cisco: [
            {
                title: "Enterprise Integration",
                description: "Deep integration with Cisco ecosystem",
                icon: "fas fa-network-wired",
                metric: "Unified Security"
            },
            {
                title: "Advanced Policy Controls",
                description: "Granular access policies and profiling",
                icon: "fas fa-shield-alt",
                metric: "In-depth Control"
            },
            {
                title: "Comprehensive Feature Set",
                description: "Full suite of enterprise NAC capabilities",
                icon: "fas fa-toolbox",
                metric: "Extensive Features"
            }
        ],
        
        aruba: [
            {
                title: "Guest Management",
                description: "Superior guest access and management",
                icon: "fas fa-user-friends",
                metric: "Streamlined Access"
            },
            {
                title: "Multi-vendor Support",
                description: "Works well in mixed-vendor environments",
                icon: "fas fa-handshake",
                metric: "Flexible Deployment"
            },
            {
                title: "Wireless Integration",
                description: "Seamless integration with wireless networks",
                icon: "fas fa-wifi",
                metric: "Unified Access"
            }
        ],
        
        forescout: [
            {
                title: "Device Discovery",
                description: "Superior device discovery and classification",
                icon: "fas fa-search",
                metric: "99% Visibility"
            },
            {
                title: "Agentless Operation",
                description: "No endpoint agents required",
                icon: "fas fa-laptop",
                metric: "Simplified Deployment"
            },
            {
                title: "IoT/OT Security",
                description: "Specialized capabilities for IoT/OT environments",
                icon: "fas fa-industry",
                metric: "Extended Coverage"
            }
        ],
        
        fortinac: [
            {
                title: "Security Fabric",
                description: "Integration with Fortinet Security Fabric",
                icon: "fas fa-shield-alt",
                metric: "Unified Security"
            },
            {
                title: "Competitive Pricing",
                description: "Lower cost than some enterprise alternatives",
                icon: "fas fa-tags",
                metric: "Cost Effective"
            },
            {
                title: "Endpoint Protection",
                description: "Enhanced endpoint security capabilities",
                icon: "fas fa-laptop-code",
                metric: "Layered Defense"
            }
        ],
        
        nps: [
            {
                title: "Windows Integration",
                description: "Tight integration with Windows environment",
                icon: "fab fa-windows",
                metric: "Native Support"
            },
            {
                title: "Minimal Cost",
                description: "Included with Windows Server licensing",
                icon: "fas fa-dollar-sign",
                metric: "Lowest Initial Cost"
            },
            {
                title: "Simplicity",
                description: "Basic NAC functionality without complexity",
                icon: "fas fa-tasks",
                metric: "Easy Setup"
            }
        ],
        
        securew2: [
            {
                title: "Certificate Expertise",
                description: "Specializes in certificate-based authentication",
                icon: "fas fa-certificate",
                metric: "Enhanced Security"
            },
            {
                title: "Cloud Identity Integration",
                description: "Strong integration with cloud identity providers",
                icon: "fas fa-id-card",
                metric: "Seamless Identity"
            },
            {
                title: "Passwordless Authentication",
                description: "Modern authentication without passwords",
                icon: "fas fa-unlock-alt",
                metric: "Improved User Experience"
            }
        ],
        
        noNac: [
            {
                title: "Security Risk",
                description: "Increased risk of unauthorized access",
                icon: "fas fa-exclamation-triangle",
                metric: "Higher Breach Risk"
            },
            {
                title: "Compliance Issues",
                description: "Difficulty meeting regulatory requirements",
                icon: "fas fa-clipboard-list",
                metric: "Non-Compliance"
            },
            {
                title: "Limited Visibility",
                description: "Poor visibility into connected devices",
                icon: "fas fa-eye-slash",
                metric: "Security Blind Spots"
            }
        ]
    },
    
    // Vendor descriptions for the wizard
    descriptions: {
        cisco: "Comprehensive on-premises NAC solution with extensive features, strong Cisco ecosystem integration, and advanced enterprise controls.",
        aruba: "Full-featured NAC with excellent guest management, strong wireless capabilities, and good multi-vendor support.",
        forescout: "Specialized agentless NAC with superior device discovery and classification, particularly strong in IoT/OT environments.",
        fortinac: "Part of the Fortinet Security Fabric with good integration and protection for Fortinet environments.",
        nps: "Basic NAC functionality included with Windows Server, providing simple authentication with minimal features.",
        securew2: "Cloud-focused solution specializing in certificate-based authentication and passwordless access.",
        portnox: "True cloud-native NAC with rapid deployment, zero hardware requirements, and comprehensive security features.",
        noNac: "No dedicated network access control solution in place, relying on basic security controls."
    }
};

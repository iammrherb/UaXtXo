#!/bin/bash

# NAC TCO Calculator Enhancement Script
# This script installs all enhancements to the Zero Trust NAC Architecture Designer UI

echo "Starting NAC TCO Calculator Enhancement Installation..."

# Ensure we're in the right directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Create required directories if they don't exist
echo "Creating necessary directories..."
mkdir -p js/wizards
mkdir -p js/charts/enhanced
mkdir -p js/components/breakdown
mkdir -p js/features/breach-analysis
mkdir -p js/features/compliance
mkdir -p js/features/sensitivity-analysis
mkdir -p css/components/wizard
mkdir -p css/components/enhanced-charts
mkdir -p css/themes/professional
mkdir -p img/icons
mkdir -p data/vendors
mkdir -p data/industry
mkdir -p data/compliance

# Copy new JS files
echo "Installing JavaScript files..."
cp js/wizards/wizard-controller.js js/wizards/
cp js/charts/enhanced-chart-builder.js js/charts/
cp js/features/breach-analysis/no-nac-calculator.js js/features/breach-analysis/
cp js/components/enhanced-calculator.js js/components/
cp js/features/sensitivity-analysis/sensitivity-calculator.js js/features/sensitivity-analysis/
cp js/features/sensitivity-analysis/sensitivity-ui.js js/features/sensitivity-analysis/

# Copy new CSS files
echo "Installing CSS files..."
cp css/components/wizard.css css/components/
cp css/sensitivity.css css/

# Copy vendor comparison data
echo "Installing vendor data..."
cat > data/vendors/vendor-comparison.js << 'VENDORDATA'
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
VENDORDATA

# Copy industry data
echo "Installing industry data..."
cat > data/industry/industry-data.js << 'INDUSTRYDATA'
/**
 * Industry Data
 * Contains industry-specific metrics, compliance frameworks, and implementation details
 */
const IndustryData = {
    // Industry descriptions and metrics
    industries: {
        healthcare: {
            title: "Healthcare",
            icon: "fas fa-hospital",
            description: "Healthcare organizations face unique challenges in securing medical devices, patient data, and maintaining compliance with strict regulations like HIPAA while ensuring easy access for clinical staff.",
            implementationTime: "16-24 weeks",
            cloudSavings: "35-45%",
            cloudAdoption: "62%"
        },
        financial: {
            title: "Financial Services",
            icon: "fas fa-university",
            description: "Financial institutions require robust security for protecting sensitive financial data, ensuring regulatory compliance, and maintaining service availability under strict audit requirements.",
            implementationTime: "12-20 weeks",
            cloudSavings: "25-35%",
            cloudAdoption: "58%"
        },
        retail: {
            title: "Retail",
            icon: "fas fa-shopping-cart",
            description: "Retail environments need to secure payment systems, customer data, and diverse store networks while providing convenient guest access and supporting seasonal fluctuations.",
            implementationTime: "8-16 weeks",
            cloudSavings: "35-45%",
            cloudAdoption: "70%"
        },
        education: {
            title: "Education",
            icon: "fas fa-graduation-cap",
            description: "Educational institutions must balance open access for students and faculty with protecting sensitive data and research while managing seasonal network usage patterns.",
            implementationTime: "10-18 weeks",
            cloudSavings: "45-55%",
            cloudAdoption: "75%"
        },
        government: {
            title: "Government",
            icon: "fas fa-landmark",
            description: "Government agencies require advanced security controls to protect sensitive information, meet strict compliance requirements, and defend against sophisticated threats.",
            implementationTime: "18-30 weeks",
            cloudSavings: "20-30%",
            cloudAdoption: "48%"
        },
        manufacturing: {
            title: "Manufacturing",
            icon: "fas fa-industry",
            description: "Manufacturing environments face challenges with securing both IT and OT networks, managing legacy equipment, and maintaining production continuity while implementing security controls.",
            implementationTime: "12-24 weeks",
            cloudSavings: "40-50%",
            cloudAdoption: "65%"
        },
        technology: {
            title: "Technology",
            icon: "fas fa-microchip",
            description: "Technology companies need flexible security that supports innovation, protects intellectual property, and adapts to fast-changing environments and frequent network changes.",
            implementationTime: "8-14 weeks",
            cloudSavings: "40-50%",
            cloudAdoption: "82%"
        },
        hospitality: {
            title: "Hospitality",
            icon: "fas fa-hotel",
            description: "Hospitality businesses require secure guest access, PCI compliance for payment systems, and effective segmentation between guest, staff, and payment networks.",
            implementationTime: "8-16 weeks",
            cloudSavings: "35-45%",
            cloudAdoption: "72%"
        },
        other: {
            title: "Other Industries",
            icon: "fas fa-building",
            description: "Organizations across various industries benefit from NAC for network security, access control, and meeting compliance requirements specific to their business needs.",
            implementationTime: "10-20 weeks",
            cloudSavings: "30-40%",
            cloudAdoption: "65%"
        }
    },
    
    // Industry-specific breach costs and probabilities
    breachMetrics: {
        healthcare: {
            averageBreachCost: 9800000,
            annualProbability: 0.328,
            recordCost: 511
        },
        financial: {
            averageBreachCost: 6080000,
            annualProbability: 0.297,
            recordCost: 402
        },
        retail: {
            averageBreachCost: 4240000,
            annualProbability: 0.236,
            recordCost: 218
        },
        education: {
            averageBreachCost: 3850000,
            annualProbability: 0.246,
            recordCost: 187
        },
        government: {
            averageBreachCost: 5100000,
            annualProbability: 0.267,
            recordCost: 272
        },
        manufacturing: {
            averageBreachCost: 5560000,
            annualProbability: 0.257,
            recordCost: 241
        },
        technology: {
            averageBreachCost: 4700000,
            annualProbability: 0.277,
            recordCost: 227
        },
        hospitality: {
            averageBreachCost: 3200000,
            annualProbability: 0.225,
            recordCost: 162
        },
        other: {
            averageBreachCost: 4350000,
            annualProbability: 0.250,
            recordCost: 205
        }
    },
    
    // FTE requirements by industry
    fteRequirements: {
        healthcare: {
            cloudNac: 0.2, // per 1000 endpoints
            onPremiseNac: 0.5 // per 1000 endpoints
        },
        financial: {
            cloudNac: 0.15,
            onPremiseNac: 0.4
        },
        manufacturing: {
            cloudNac: 0.1,
            onPremiseNac: 0.3
        },
        education: {
            cloudNac: 0.08,
            onPremiseNac: 0.25
        },
        government: {
            cloudNac: 0.2,
            onPremiseNac: 0.5
        },
        retail: {
            cloudNac: 0.05,
            onPremiseNac: 0.2
        },
        technology: {
            cloudNac: 0.1,
            onPremiseNac: 0.3
        },
        hospitality: {
            cloudNac: 0.05,
            onPremiseNac: 0.2
        },
        other: {
            cloudNac: 0.15,
            onPremiseNac: 0.35
        }
    }
};
INDUSTRYDATA

# Copy compliance data
echo "Installing compliance data..."
cat > data/compliance/compliance-frameworks.js << 'COMPLIANCEDATA'
/**
 * Compliance Frameworks Data
 * Contains details about compliance frameworks and NAC requirements
 */
const ComplianceFrameworks = {
    // Framework definitions with NAC requirements
    frameworks: {
        hipaa: {
            name: "HIPAA",
            description: "Health Insurance Portability and Accountability Act requires safeguards for protected health information (PHI).",
            nacRequirements: "Network segmentation to separate systems with ePHI, multi-factor authentication for access to systems with ePHI, detailed audit trails, and automated compliance monitoring.",
            applicableIndustries: ["healthcare", "other"]
        },
        pci: {
            name: "PCI DSS",
            description: "Payment Card Industry Data Security Standard protects cardholder data with specific security requirements.",
            nacRequirements: "Network segmentation for cardholder data environments, secure authentication including MFA, tracking and monitoring all access to network resources, and regular testing of security systems.",
            applicableIndustries: ["retail", "hospitality", "financial", "healthcare", "education", "other"]
        },
        gdpr: {
            name: "GDPR",
            description: "General Data Protection Regulation governs data protection and privacy in the EU with global implications.",
            nacRequirements: "Appropriate technical measures to secure personal data, strong authentication mechanisms, detailed logs of access activities, and data access controls.",
            applicableIndustries: ["all"]
        },
        cmmc: {
            name: "CMMC 2.0",
            description: "Cybersecurity Maturity Model Certification is required for Defense Industrial Base contractors.",
            nacRequirements: "Limit system access to authorized users and devices, multi-factor authentication for all network access, monitor and control remote access sessions.",
            applicableIndustries: ["government", "manufacturing", "technology", "other"]
        },
        glba: {
            name: "GLBA",
            description: "Gramm-Leach-Bliley Act requires financial institutions to protect customer data.",
            nacRequirements: "Multi-factor authentication for remote access and privileged accounts, review of access privileges for users with sensitive data access, continuous monitoring of network access.",
            applicableIndustries: ["financial", "other"]
        },
        fedramp: {
            name: "FedRAMP",
            description: "Federal Risk and Authorization Management Program standardizes cloud security for government.",
            nacRequirements: "Secure network access controls aligned with NIST guidelines, zero-trust architecture implementation, continuous monitoring of network access.",
            applicableIndustries: ["government", "technology", "other"]
        },
        ferpa: {
            name: "FERPA",
            description: "Family Educational Rights and Privacy Act protects student education records.",
            nacRequirements: "Protection of student data, separation of administrative and student networks, controlled access to education records.",
            applicableIndustries: ["education", "other"]
        },
        nist: {
            name: "NIST CSF",
            description: "National Institute of Standards and Technology Cybersecurity Framework provides security guidelines.",
            nacRequirements: "Implement identification and authentication controls, access control policies, continuous monitoring, and network segmentation.",
            applicableIndustries: ["all"]
        },
        nist800171: {
            name: "NIST 800-171",
            description: "Protecting Controlled Unclassified Information in non-federal systems.",
            nacRequirements: "Limit system access to authorized users, control the flow of CUI, employ principle of least privilege, limit unsuccessful logon attempts.",
            applicableIndustries: ["government", "manufacturing", "technology", "other"]
        },
        iso27001: {
            name: "ISO 27001",
            description: "International standard for information security management systems.",
            nacRequirements: "Access control policy, user registration and deregistration, secure log-on procedures, network controls and segregation.",
            applicableIndustries: ["all"]
        }
    },
    
    // Get framework by ID
    getFramework: function(id) {
        return this.frameworks[id] || null;
    },
    
    // Get frameworks applicable to an industry
    getFrameworksForIndustry: function(industry) {
        const result = [];
        
        for (const [id, framework] of Object.entries(this.frameworks)) {
            if (framework.applicableIndustries.includes(industry) || framework.applicableIndustries.includes("all")) {
                result.push({
                    id,
                    ...framework
                });
            }
        }
        
        return result;
    }
};
COMPLIANCEDATA

# Create img/no-nac-icon.png (placeholder for actual icon)
echo "Creating placeholder for No-NAC icon..."
cat > img/no-nac-icon.png << 'NONACICONPLACEHOLDER'
PNG PLACEHOLDER - Replace with actual icon
NONACICONPLACEHOLDER

# Replace the main HTML file
echo "Updating HTML files..."
mv index.html index.html.bak
mv index.html.new index.html
mv sensitivity.html sensitivity.html.bak
mv sensitivity.html.new sensitivity.html

# Set permissions
chmod +x install-tco-enhancements.sh

echo "Installation complete! Restart the application to see the enhancements."

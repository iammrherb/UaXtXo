#!/bin/bash

# Data Update Script for Portnox Total Cost Analyzer
# This script updates all data files for compliance, industry, and risk analysis

set -e  # Exit on any error

# Color definitions
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================${NC}"
echo -e "${BLUE}   Updating Data for TCO Multi-Vendor Analyzer   ${NC}"
echo -e "${BLUE}=================================================${NC}"

# Create necessary directories
mkdir -p js/data/compliance
mkdir -p js/data/industry
mkdir -p js/data/risk
mkdir -p js/data/tco

# Create industry data
echo -e "${YELLOW}Creating industry data file...${NC}"
cat > "js/data/industry/industry-data.js" << 'EOL'
/**
 * Industry Data for TCO Multi-Vendor Analyzer
 * Contains information about various industries, their specific challenges, and NAC requirements
 */

// Initialize industry data object
window.industryInsights = {
    'healthcare': [
        {
            title: 'Healthcare Security Trends',
            content: '68% of healthcare organizations experienced a significant security incident in the past 12 months. NAC solutions are critical for ensuring medical devices are secure and compliant with HIPAA/HITECH.',
            icon: 'fa-heartbeat'
        },
        {
            title: 'Medical Device Security',
            content: 'The average hospital has 10-15 connected devices per bed, many with outdated operating systems. NAC provides visibility and segmentation capabilities to protect these vulnerable devices.',
            icon: 'fa-stethoscope'
        },
        {
            title: 'Compliance Challenges',
            content: 'Healthcare organizations face the strictest compliance requirements, with HIPAA violations costing up to $1.5 million per year. Cloud-based NAC solutions provide continuous compliance monitoring and streamlined auditing.',
            icon: 'fa-clipboard-check'
        }
    ],
    'financial': [
        {
            title: 'Financial Services Threats',
            content: 'Financial institutions face 300% more cyberattacks than other industries. Zero Trust NAC solutions help prevent unauthorized access and lateral movement within networks.',
            icon: 'fa-chart-line'
        },
        {
            title: 'Regulatory Compliance',
            content: 'PCI DSS, SOX, and GLBA all require strong access controls and network segmentation. Cloud-based NAC solutions streamline compliance reporting and auditing.',
            icon: 'fa-balance-scale'
        },
        {
            title: 'Digital Transformation',
            content: '82% of financial services executives report accelerating digital transformation initiatives. NAC solutions enable secure BYOD, guest access, and remote work capabilities.',
            icon: 'fa-digital-tachograph'
        }
    ],
    'education': [
        {
            title: 'Education Sector Challenges',
            content: 'Educational institutions manage diverse device populations with limited security resources. Cloud NAC enables easy management of BYOD policies and security for student/faculty devices.',
            icon: 'fa-graduation-cap'
        },
        {
            title: 'Student Data Protection',
            content: 'FERPA compliance requires protecting student data from unauthorized access. NAC helps ensure only authorized devices can access sensitive student information systems.',
            icon: 'fa-user-shield'
        },
        {
            title: 'Budget Constraints',
            content: 'Educational institutions face significant budget pressure, with 62% reporting insufficient cybersecurity funding. Cloud-based NAC solutions offer predictable costs without hardware investment.',
            icon: 'fa-hand-holding-usd'
        }
    ],
    'government': [
        {
            title: 'Government Security Mandates',
            content: 'Federal, state, and local government agencies must comply with stringent security requirements like FISMA, FedRAMP, and NIST guidelines. NAC solutions help enforce these mandates.',
            icon: 'fa-landmark'
        },
        {
            title: 'Hybrid Workforce',
            content: 'Government agencies increasingly support hybrid work environments. Zero Trust NAC solutions enable secure access regardless of location while maintaining compliance.',
            icon: 'fa-users'
        },
        {
            title: 'Legacy System Integration',
            content: 'Government organizations often maintain legacy systems that require special security considerations. NAC solutions with strong IoT and legacy device support help secure these environments.',
            icon: 'fa-history'
        }
    ],
    'manufacturing': [
        {
            title: 'OT/IT Convergence',
            content: 'Manufacturing environments increasingly connect operational technology (OT) to IT networks, creating new security challenges. NAC solutions help segment and secure these converged networks.',
            icon: 'fa-industry'
        },
        {
            title: 'Supply Chain Security',
            content: 'Manufacturing supply chains face increasing cyber threats, with 71% reporting increased attacks. NAC solutions help secure vendor access and third-party connections.',
            icon: 'fa-truck'
        },
        {
            title: 'IoT Device Proliferation',
            content: 'Smart manufacturing relies on IoT devices that can create security vulnerabilities. NAC solutions provide visibility and control over these connected devices.',
            icon: 'fa-microchip'
        }
    ],
    'retail': [
        {
            title: 'PCI Compliance',
            content: 'Retail organizations must maintain PCI DSS compliance to protect payment card data. NAC solutions help enforce segmentation between cardholder data environments and other networks.',
            icon: 'fa-credit-card'
        },
        {
            title: 'Connected Store Technology',
            content: 'Modern retail environments include IoT devices, digital signage, and customer WiFi. NAC solutions help secure these diverse technologies while enhancing customer experience.',
            icon: 'fa-shopping-cart'
        },
        {
            title: 'Remote Location Management',
            content: 'Retail chains must secure and manage connectivity across multiple locations. Cloud-based NAC solutions provide centralized control with distributed enforcement.',
            icon: 'fa-store'
        }
    ],
    'technology': [
        {
            title: 'Rapid Environment Changes',
            content: 'Technology companies face constant change with new devices, applications, and services. Agile NAC solutions adapt to these dynamic environments while maintaining security.',
            icon: 'fa-laptop-code'
        },
        {
            title: 'Development Environment Security',
            content: 'Securing development, testing, and production environments requires flexible access controls. NAC solutions help enforce least privilege access across all environments.',
            icon: 'fa-code'
        },
        {
            title: 'Intellectual Property Protection',
            content: 'Technology firms must protect valuable intellectual property from theft. NAC solutions help prevent unauthorized access to sensitive development and research resources.',
            icon: 'fa-lightbulb'
        }
    ],
    'energy': [
        {
            title: 'Critical Infrastructure Protection',
            content: 'Energy and utility companies are designated as critical infrastructure with specific security requirements. NAC solutions help meet compliance mandates like NERC CIP.',
            icon: 'fa-plug'
        },
        {
            title: 'OT Security Challenges',
            content: 'Operational Technology networks in energy facilities require specialized security approaches. NAC solutions designed for OT/IT convergence help secure these environments.',
            icon: 'fa-bolt'
        },
        {
            title: 'Remote Site Security',
            content: 'Energy companies manage distributed infrastructure across large geographic areas. Cloud-based NAC provides consistent security policy enforcement across all locations.',
            icon: 'fa-map-marker-alt'
        }
    ]
};

// Industry statistics for reports and charts
window.industryStats = {
    'healthcare': {
        breachCost: 9.23,  // Average cost per record in millions
        compliancePenalties: 1.5, // Average annual penalties in millions
        unsecuredDevices: 76,  // Percentage of organizations with unsecured devices
        nacAdoption: 68,    // Percentage of organizations with NAC deployed
        topThreats: ['Medical Device Vulnerabilities', 'Ransomware', 'Insider Threats'],
        dataType: 'PHI/PII', // Type of data protected
        avgBreachSize: 28500 // Average records per breach
    },
    'financial': {
        breachCost: 5.85,  // Average cost per record in millions
        compliancePenalties: 2.4, // Average annual penalties in millions
        unsecuredDevices: 62,  // Percentage of organizations with unsecured devices
        nacAdoption: 78,    // Percentage of organizations with NAC deployed
        topThreats: ['Targeted Attacks', 'Fraudulent Transactions', 'Credential Theft'],
        dataType: 'Financial Records', // Type of data protected
        avgBreachSize: 22000 // Average records per breach
    },
    'education': {
        breachCost: 3.9,  // Average cost per record in millions
        compliancePenalties: 0.6, // Average annual penalties in millions
        unsecuredDevices: 85,  // Percentage of organizations with unsecured devices
        nacAdoption: 42,    // Percentage of organizations with NAC deployed
        topThreats: ['Student Data Theft', 'Unsecured Devices', 'Phishing Attacks'],
        dataType: 'Student Records', // Type of data protected
        avgBreachSize: 31000 // Average records per breach
    },
    'government': {
        breachCost: 7.38,  // Average cost per record in millions
        compliancePenalties: 1.2, // Average annual penalties in millions
        unsecuredDevices: 72,  // Percentage of organizations with unsecured devices
        nacAdoption: 65,    // Percentage of organizations with NAC deployed
        topThreats: ['Nation State Attacks', 'Legacy Systems', 'Insider Threats'],
        dataType: 'Citizen Data', // Type of data protected
        avgBreachSize: 45000 // Average records per breach
    },
    'manufacturing': {
        breachCost: 4.24,  // Average cost per record in millions
        compliancePenalties: 0.8, // Average annual penalties in millions
        unsecuredDevices: 82,  // Percentage of organizations with unsecured devices
        nacAdoption: 58,    // Percentage of organizations with NAC deployed
        topThreats: ['IP Theft', 'Supply Chain Attacks', 'OT/IT Convergence'],
        dataType: 'Intellectual Property', // Type of data protected
        avgBreachSize: 12000 // Average records per breach
    },
    'retail': {
        breachCost: 3.28,  // Average cost per record in millions
        compliancePenalties: 1.0, // Average annual penalties in millions
        unsecuredDevices: 79,  // Percentage of organizations with unsecured devices
        nacAdoption: 62,    // Percentage of organizations with NAC deployed
        topThreats: ['POS Malware', 'Payment Card Theft', 'Web Application Attacks'],
        dataType: 'Customer PII/Payment Info', // Type of data protected
        avgBreachSize: 38000 // Average records per breach
    },
    'technology': {
        breachCost: 5.04,  // Average cost per record in millions
        compliancePenalties: 0.9, // Average annual penalties in millions
        unsecuredDevices: 68,  // Percentage of organizations with unsecured devices
        nacAdoption: 74,    // Percentage of organizations with NAC deployed
        topThreats: ['IP Theft', 'Targeted Attacks', 'Developer Account Compromise'],
        dataType: 'Source Code/IP', // Type of data protected
        avgBreachSize: 17000 // Average records per breach
    },
    'energy': {
        breachCost: 6.39,  // Average cost per record in millions
        compliancePenalties: 1.6, // Average annual penalties in millions
        unsecuredDevices: 76,  // Percentage of organizations with unsecured devices
        nacAdoption: 70,    // Percentage of organizations with NAC deployed
        topThreats: ['Critical Infrastructure Attacks', 'Operational Disruption', 'Ransomware'],
        dataType: 'Operational Data', // Type of data protected
        avgBreachSize: 8000 // Average records per breach
    }
};

// Utility function to get industry name from industry code
window.getIndustryName = function(industryCode) {
    const industryNames = {
        'healthcare': 'Healthcare',
        'financial': 'Financial Services',
        'education': 'Education',
        'government': 'Government',
        'manufacturing': 'Manufacturing',
        'retail': 'Retail',
        'technology': 'Technology',
        'energy': 'Energy & Utilities'
    };
    
    return industryNames[industryCode] || industryCode;
};
EOL

# Create compliance data
echo -e "${YELLOW}Creating compliance data file...${NC}"
cat > "js/data/compliance/compliance-data.js" << 'EOL'
/**
 * Compliance Data for TCO Multi-Vendor Analyzer
 * Contains information about compliance frameworks for different industries
 */

// Initialize compliance data object
window.complianceData = {
    'healthcare': [
        {
            id: 'hipaa',
            name: 'HIPAA',
            description: 'Health Insurance Portability and Accountability Act',
            required: true,
            icon: 'fa-hospital',
            controlAreas: ['Access Control', 'Audit Controls', 'Integrity', 'Authentication', 'Transmission Security'],
            relevantControls: [
                'Implement technical safeguards for electronic PHI',
                'Ensure unique user identification',
                'Implement audit controls and activity logging',
                'Prevent unauthorized access to PHI during transmission'
            ]
        },
        {
            id: 'hitech',
            name: 'HITECH',
            description: 'Health Information Technology for Economic and Clinical Health Act',
            required: true,
            icon: 'fa-notes-medical',
            controlAreas: ['Breach Notification', 'Access Control', 'Audit Logging', 'Device Security'],
            relevantControls: [
                'Implement stronger breach notification requirements',
                'Enforce technical safeguards for all ePHI',
                'Maintain access logs and audit trails',
                'Secure all devices with access to ePHI'
            ]
        },
        {
            id: 'gdpr',
            name: 'GDPR',
            description: 'General Data Protection Regulation (for EU patients)',
            required: false,
            icon: 'fa-shield-alt',
            controlAreas: ['Data Protection', 'Access Control', 'Breach Notification', 'Privacy by Design'],
            relevantControls: [
                'Ensure appropriate security of personal data',
                'Maintain records of processing activities',
                'Implement data protection by design and default',
                'Secure all devices with access to personal data'
            ]
        }
    ],
    'financial': [
        {
            id: 'pci',
            name: 'PCI DSS',
            description: 'Payment Card Industry Data Security Standard',
            required: true,
            icon: 'fa-credit-card',
            controlAreas: ['Network Security', 'Access Control', 'Monitoring', 'Policy'],
            relevantControls: [
                'Install and maintain network security controls',
                'Restrict access to cardholder data',
                'Track and monitor all access to network resources',
                'Maintain an information security policy'
            ]
        },
        {
            id: 'sox',
            name: 'SOX',
            description: 'Sarbanes-Oxley Act',
            required: true,
            icon: 'fa-file-contract',
            controlAreas: ['IT General Controls', 'Access Management', 'Change Management', 'Security'],
            relevantControls: [
                'Maintain effective internal control over financial reporting',
                'Implement access controls for financial systems',
                'Protect the confidentiality and integrity of financial data',
                'Maintain audit trails for all financial transactions'
            ]
        },
        {
            id: 'glba',
            name: 'GLBA',
            description: 'Gramm-Leach-Bliley Act',
            required: true,
            icon: 'fa-university',
            controlAreas: ['Safeguards', 'Access Controls', 'Risk Assessment', 'Oversight'],
            relevantControls: [
                'Protect against unauthorized access to customer information',
                'Ensure the security and confidentiality of customer information',
                'Implement access controls to customer information systems',
                'Develop a comprehensive information security program'
            ]
        }
    ],
    'education': [
        {
            id: 'ferpa',
            name: 'FERPA',
            description: 'Family Educational Rights and Privacy Act',
            required: true,
            icon: 'fa-graduation-cap',
            controlAreas: ['Privacy Protection', 'Access Control', 'Disclosure Limitations', 'Security'],
            relevantControls: [
                'Protect the privacy of student education records',
                'Implement access controls to educational records',
                'Limit disclosure of personally identifiable information',
                'Maintain secure systems for student data'
            ]
        },
        {
            id: 'coppa',
            name: 'COPPA',
            description: 'Children\'s Online Privacy Protection Act',
            required: false,
            icon: 'fa-child',
            controlAreas: ['Parental Consent', 'Data Minimization', 'Security', 'Retention'],
            relevantControls: [
                'Implement reasonable procedures to protect children\'s data',
                'Limit collection of personal information from children',
                'Maintain the confidentiality and security of children\'s data',
                'Implement access controls to children\'s data'
            ]
        }
    ],
    'government': [
        {
            id: 'fisma',
            name: 'FISMA',
            description: 'Federal Information Security Modernization Act',
            required: true,
            icon: 'fa-landmark',
            controlAreas: ['Risk Management', 'Security Controls', 'Continuous Monitoring', 'Incident Response'],
            relevantControls: [
                'Implement information security programs',
                'Categorize information systems by impact level',
                'Implement security controls based on risk assessment',
                'Continuously monitor security controls'
            ]
        },
        {
            id: 'fedramp',
            name: 'FedRAMP',
            description: 'Federal Risk and Authorization Management Program',
            required: true,
            icon: 'fa-cloud',
            controlAreas: ['Access Control', 'Audit', 'Risk Assessment', 'System Protection'],
            relevantControls: [
                'Implement access controls for cloud systems',
                'Conduct continuous monitoring of cloud environments',
                'Perform regular assessments of security controls',
                'Protect cloud system boundaries'
            ]
        }
    ],
    'manufacturing': [
        {
            id: 'iso27001',
            name: 'ISO 27001',
            description: 'Information Security Management',
            required: false,
            icon: 'fa-shield-alt',
            controlAreas: ['Risk Assessment', 'Security Policy', 'Asset Management', 'Access Control'],
            relevantControls: [
                'Establish an information security management system',
                'Implement appropriate access controls',
                'Protect against unauthorized network access',
                'Maintain asset inventory and classification'
            ]
        },
        {
            id: 'nist',
            name: 'NIST CSF',
            description: 'National Institute of Standards and Technology Cybersecurity Framework',
            required: false,
            icon: 'fa-tasks',
            controlAreas: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'],
            relevantControls: [
                'Develop an organizational understanding of risks',
                'Implement appropriate safeguards to ensure delivery of services',
                'Implement activities to identify cybersecurity events',
                'Implement activities to take action regarding detected events'
            ]
        }
    ],
    'retail': [
        {
            id: 'pci',
            name: 'PCI DSS',
            description: 'Payment Card Industry Data Security Standard',
            required: true,
            icon: 'fa-credit-card',
            controlAreas: ['Network Security', 'Access Control', 'Monitoring', 'Policy'],
            relevantControls: [
                'Install and maintain network security controls',
                'Restrict access to cardholder data',
                'Track and monitor all access to network resources',
                'Maintain an information security policy'
            ]
        },
        {
            id: 'ccpa',
            name: 'CCPA',
            description: 'California Consumer Privacy Act',
            required: false,
            icon: 'fa-user-shield',
            controlAreas: ['Privacy Rights', 'Data Security', 'Disclosure', 'Access Control'],
            relevantControls: [
                'Implement reasonable security procedures',
                'Protect consumer personal information',
                'Provide consumers with access to their data',
                'Secure systems containing consumer data'
            ]
        }
    ],
    'technology': [
        {
            id: 'gdpr',
            name: 'GDPR',
            description: 'General Data Protection Regulation',
            required: false,
            icon: 'fa-shield-alt',
            controlAreas: ['Data Protection', 'Access Control', 'Breach Notification', 'Privacy by Design'],
            relevantControls: [
                'Ensure appropriate security of personal data',
                'Maintain records of processing activities',
                'Implement data protection by design and default',
                'Secure all devices with access to personal data'
            ]
        },
        {
            id: 'iso27001',
            name: 'ISO 27001',
            description: 'Information Security Management',
            required: false,
            icon: 'fa-lock',
            controlAreas: ['Risk Assessment', 'Security Policy', 'Asset Management', 'Access Control'],
            relevantControls: [
                'Establish an information security management system',
                'Implement appropriate access controls',
                'Protect against unauthorized network access',
                'Maintain asset inventory and classification'
            ]
        },
        {
            id: 'soc2',
            name: 'SOC 2',
            description: 'Service Organization Control 2',
            required: false,
            icon: 'fa-check-circle',
            controlAreas: ['Security', 'Availability', 'Processing Integrity', 'Confidentiality', 'Privacy'],
            relevantControls: [
                'Protect systems and data from unauthorized access',
                'Ensure systems are available for operation as committed',
                'Maintain system processing integrity',
                'Protect confidential information as committed'
            ]
        }
    ],
    'energy': [
        {
            id: 'nerc',
            name: 'NERC CIP',
            description: 'North American Electric Reliability Corporation Critical Infrastructure Protection',
            required: true,
            icon: 'fa-bolt',
            controlAreas: ['Electronic Security Perimeters', 'Systems Security', 'Access Control', 'Incident Response'],
            relevantControls: [
                'Identify and protect critical cyber assets',
                'Implement electronic security perimeters',
                'Control access to critical cyber assets',
                'Maintain incident response capabilities'
            ]
        },
        {
            id: 'nist',
            name: 'NIST CSF',
            description: 'National Institute of Standards and Technology Cybersecurity Framework',
            required: false,
            icon: 'fa-tasks',
            controlAreas: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'],
            relevantControls: [
                'Develop an organizational understanding of risks',
                'Implement appropriate safeguards to ensure delivery of services',
                'Implement activities to identify cybersecurity events',
                'Implement activities to take action regarding detected events'
            ]
        }
    ]
};

// Compliance heat map data - shows how well each vendor complies with frameworks
window.complianceHeatMap = {
    'hipaa': {
        'cisco': 85,
        'aruba': 80,
        'forescout': 85,
        'fortinac': 75,
        'nps': 65,
        'securew2': 75,
        'juniper': 75,
        'foxpass': 65,
        'arista': 80,
        'portnox': 90,
        'noNac': 0
    },
    'hitech': {
        'cisco': 80,
        'aruba': 75,
        'forescout': 80,
        'fortinac': 70,
        'nps': 60,
        'securew2': 70,
        'juniper': 70,
        'foxpass': 60,
        'arista': 75,
        'portnox': 90,
        'noNac': 0
    },
    'pci': {
        'cisco': 90,
        'aruba': 85,
        'forescout': 85,
        'fortinac': 80,
        'nps': 70,
        'securew2': 75,
        'juniper': 80,
        'foxpass': 70,
        'arista': 85,
        'portnox': 90,
        'noNac': 0
    },
    'ferpa': {
        'cisco': 80,
        'aruba': 75,
        'forescout': 75,
        'fortinac': 75,
        'nps': 70,
        'securew2': 75,
        'juniper': 75,
        'foxpass': 65,
        'arista': 75,
        'portnox': 90,
        'noNac': 0
    },
    'gdpr': {
        'cisco': 80,
        'aruba': 80,
        'forescout': 80,
        'fortinac': 75,
        'nps': 65,
        'securew2': 70,
        'juniper': 75,
        'foxpass': 65,
        'arista': 80,
        'portnox': 90,
        'noNac': 0
    }
};

// Utility function to get compliance data for specific frameworks
window.getComplianceDataForFrameworks = function(frameworks) {
    if (!frameworks || frameworks.length === 0) return [];
    
    const result = [];
    
    for (const industry in window.complianceData) {
        const industryFrameworks = window.complianceData[industry];
        
        for (const framework of industryFrameworks) {
            if (frameworks.includes(framework.id)) {
                result.push(framework);
            }
        }
    }
    
    return result;
};
EOL

# Create risk analysis data
echo -e "${YELLOW}Creating risk analysis data file...${NC}"
cat > "js/data/risk/risk-data.js" << 'EOL'
/**
 * Risk Analysis Data for TCO Multi-Vendor Analyzer
 * Contains information about security risks, breach costs, and related metrics
 */

// Initialize risk data object
window.riskData = {
    // Average cost per record breached by industry (in USD)
    breachCosts: {
        'healthcare': 429,
        'financial': 388,
        'education': 312,
        'government': 354,
        'manufacturing': 273,
        'retail': 298,
        'technology': 317,
        'energy': 351,
        'average': 340
    },
    
    // Percentage risk reduction with a NAC solution by vendor
    riskReduction: {
        'cisco': 78,
        'aruba': 76,
        'forescout': 80,
        'fortinac': 75,
        'nps': 62,
        'securew2': 68,
        'juniper': 73,
        'foxpass': 65,
        'arista': 75,
        'portnox': 82,
        'noNac': 0
    },
    
    // Security gap analysis (scale 0-100 where higher means more gaps)
    securityGaps: {
        'cisco': 22,
        'aruba': 24,
        'forescout': 20,
        'fortinac': 25,
        'nps': 38,
        'securew2': 32,
        'juniper': 27,
        'foxpass': 35,
        'arista': 25,
        'portnox': 18,
        'noNac': 100
    },
    
    // Common security incidents that NAC can prevent
    securityIncidents: [
        {
            name: 'Unauthorized Device Access',
            likelihood: 'High',
            impact: 'High',
            preventionScore: {
                'cisco': 85,
                'aruba': 80,
                'forescout': 90,
                'fortinac': 80,
                'nps': 65,
                'securew2': 75,
                'juniper': 80,
                'foxpass': 70,
                'arista': 85,
                'portnox': 90,
                'noNac': 0
            }
        },
        {
            name: 'Credential Theft',
            likelihood: 'High',
            impact: 'High',
            preventionScore: {
                'cisco': 75,
                'aruba': 75,
                'forescout': 70,
                'fortinac': 70,
                'nps': 60,
                'securew2': 80,
                'juniper': 75,
                'foxpass': 75,
                'arista': 70,
                'portnox': 85,
                'noNac': 0
            }
        },
        {
            name: 'Malware Propagation',
            likelihood: 'High',
            impact: 'High',
            preventionScore: {
                'cisco': 80,
                'aruba': 75,
                'forescout': 85,
                'fortinac': 75,
                'nps': 60,
                'securew2': 65,
                'juniper': 70,
                'foxpass': 60,
                'arista': 80,
                'portnox': 85,
                'noNac': 0
            }
        },
        {
            name: 'Data Exfiltration',
            likelihood: 'Medium',
            impact: 'High',
            preventionScore: {
                'cisco': 70,
                'aruba': 65,
                'forescout': 75,
                'fortinac': 70,
                'nps': 55,
                'securew2': 60,
                'juniper': 65,
                'foxpass': 55,
                'arista': 70,
                'portnox': 80,
                'noNac': 0
            }
        },
        {
            name: 'Insider Threats',
            likelihood: 'Medium',
            impact: 'High',
            preventionScore: {
                'cisco': 75,
                'aruba': 70,
                'forescout': 75,
                'fortinac': 70,
                'nps': 60,
                'securew2': 65,
                'juniper': 70,
                'foxpass': 60,
                'arista': 75,
                'portnox': 85,
                'noNac': 0
            }
        },
        {
            name: 'IoT Device Compromise',
            likelihood: 'High',
            impact: 'Medium',
            preventionScore: {
                'cisco': 80,
                'aruba': 75,
                'forescout': 90,
                'fortinac': 80,
                'nps': 55,
                'securew2': 60,
                'juniper': 65,
                'foxpass': 55,
                'arista': 80,
                'portnox': 85,
                'noNac': 0
            }
        }
    ],
    
    // Risk matrix - likelihood vs impact
    riskMatrix: {
        // Each security threat has a base likelihood and impact,
        // modified by having a NAC solution
        'unauthorized_access': {
            name: 'Unauthorized Network Access',
            baseLikelihood: 0.8, // 80% chance without NAC
            baseImpact: 0.9,     // 90% impact severity
            reductionFactors: {
                'cisco': 0.85,
                'aruba': 0.80,
                'forescout': 0.90,
                'fortinac': 0.80,
                'nps': 0.65,
                'securew2': 0.75,
                'juniper': 0.80,
                'foxpass': 0.70,
                'arista': 0.85,
                'portnox': 0.90,
                'noNac': 0
            }
        },
        'data_breach': {
            name: 'Data Breach',
            baseLikelihood: 0.7,
            baseImpact: 0.95,
            reductionFactors: {
                'cisco': 0.80,
                'aruba': 0.75,
                'forescout': 0.80,
                'fortinac': 0.75,
                'nps': 0.60,
                'securew2': 0.70,
                'juniper': 0.75,
                'foxpass': 0.65,
                'arista': 0.80,
                'portnox': 0.85,
                'noNac': 0
            }
        },
        'malware': {
            name: 'Malware Infection',
            baseLikelihood: 0.75,
            baseImpact: 0.85,
            reductionFactors: {
                'cisco': 0.80,
                'aruba': 0.75,
                'forescout': 0.85,
                'fortinac': 0.75,
                'nps': 0.60,
                'securew2': 0.65,
                'juniper': 0.70,
                'foxpass': 0.60,
                'arista': 0.80,
                'portnox': 0.85,
                'noNac': 0
            }
        },
        'compliance_violation': {
            name: 'Compliance Violation',
            baseLikelihood: 0.65,
            baseImpact: 0.9,
            reductionFactors: {
                'cisco': 0.85,
                'aruba': 0.80,
                'forescout': 0.85,
                'fortinac': 0.75,
                'nps': 0.65,
                'securew2': 0.75,
                'juniper': 0.75,
                'foxpass': 0.65,
                'arista': 0.80,
                'portnox': 0.90,
                'noNac': 0
            }
        },
        'insider_threat': {
            name: 'Insider Threat',
            baseLikelihood: 0.5,
            baseImpact: 0.8,
            reductionFactors: {
                'cisco': 0.75,
                'aruba': 0.70,
                'forescout': 0.75,
                'fortinac': 0.70,
                'nps': 0.60,
                'securew2': 0.65,
                'juniper': 0.70,
                'foxpass': 0.60,
                'arista': 0.75,
                'portnox': 0.85,
                'noNac': 0
            }
        }
    }
};

// Calculate risk cost based on industry, devices, and NAC solution
window.calculateRiskCost = function(industry, deviceCount, currentVendor, complianceRequirements) {
    const breachCostPerRecord = window.riskData.breachCosts[industry] || window.riskData.breachCosts.average;
    
    // Base assumption: 5% of devices would be affected in a breach without NAC
    const affectedDevicesPercentage = 0.05;
    
    // Calculate base risk cost (without NAC)
    const baseRiskCost = breachCostPerRecord * deviceCount * affectedDevicesPercentage;
    
    // Get risk reduction factor for the current vendor
    const riskReductionFactor = (window.riskData.riskReduction[currentVendor] || 0) / 100;
    
    // Calculate risk cost with the current NAC solution
    const riskCostWithNAC = baseRiskCost * (1 - riskReductionFactor);
    
    // Calculate compliance penalty risk
    let compliancePenaltyRisk = 0;
    if (complianceRequirements && complianceRequirements.length > 0) {
        // Get base compliance cost from industry data
        const industryStats = window.industryStats[industry];
        if (industryStats) {
            compliancePenaltyRisk = industryStats.compliancePenalties * 1000000; // Convert to dollars
            
            // Adjust based on NAC solution's compliance coverage
            const complianceCoverage = getComplianceCoverage(currentVendor, complianceRequirements);
            compliancePenaltyRisk *= (1 - complianceCoverage);
        }
    }
    
    return {
        baseRiskCost: baseRiskCost,
        riskCostWithNAC: riskCostWithNAC,
        riskReduction: baseRiskCost - riskCostWithNAC,
        compliancePenaltyRisk: compliancePenaltyRisk,
        totalRiskCost: riskCostWithNAC + compliancePenaltyRisk
    };
};

// Helper function to calculate compliance coverage for a vendor
function getComplianceCoverage(vendor, complianceRequirements) {
    if (!complianceRequirements || complianceRequirements.length === 0) {
        return 0;
    }
    
    let totalScore = 0;
    let frameworkCount = 0;
    
    for (const framework of complianceRequirements) {
        if (window.complianceHeatMap[framework] && window.complianceHeatMap[framework][vendor] !== undefined) {
            totalScore += window.complianceHeatMap[framework][vendor];
            frameworkCount++;
        }
    }
    
    return frameworkCount > 0 ? totalScore / (frameworkCount * 100) : 0;
}
EOL

# Create TCO calculator utility
echo -e "${YELLOW}Creating TCO calculator utility...${NC}"
cat > "js/data/tco/tco-calculator.js" << 'EOL'
/**
 * TCO Calculator for Multi-Vendor Analyzer
 * Provides comprehensive total cost of ownership analysis
 */

// Initialize TCO Calculator
window.tcoCalculator = (function() {
    // Private helper functions
    function getOrganizationSizeCategory(deviceCount) {
        if (deviceCount < 1000) return 'small';
        if (deviceCount < 5000) return 'medium';
        if (deviceCount < 10000) return 'large';
        return 'enterprise';
    }
    
    function calculateHardwareCosts(vendor, sizeCategory, years) {
        if (!window.vendorData[vendor]) return 0;
        
        const vendorData = window.vendorData[vendor];
        const hardwareKey = 'hardware' + sizeCategory.charAt(0).toUpperCase() + sizeCategory.slice(1);
        const hardwareCost = vendorData.costs[hardwareKey] || 0;
        
        // Hardware typically has a 5-year lifespan
        const depreciationYears = 5;
        let hardwareCostForPeriod = hardwareCost;
        
        // If analysis period is less than depreciation period, prorate the cost
        if (years < depreciationYears) {
            hardwareCostForPeriod = hardwareCost * (years / depreciationYears);
        }
        
        // If analysis period is longer than depreciation period, account for refresh
        if (years > depreciationYears) {
            const fullCycles = Math.floor(years / depreciationYears);
            const remainingYears = years % depreciationYears;
            
            hardwareCostForPeriod = hardwareCost * fullCycles;
            hardwareCostForPeriod += hardwareCost * (remainingYears / depreciationYears);
        }
        
        return hardwareCostForPeriod;
    }
    
    function calculateLicenseCosts(vendor, sizeCategory, deviceCount, years) {
        if (!window.vendorData[vendor]) return 0;
        
        const vendorData = window.vendorData[vendor];
        const licenseKey = 'license' + sizeCategory.charAt(0).toUpperCase() + sizeCategory.slice(1);
        const licensePerDevice = vendorData.costs[licenseKey] || 0;
        
        return licensePerDevice * deviceCount * years;
    }
    
    function calculateImplementationCosts(vendor, sizeCategory, consultingRate, urgency) {
        if (!window.vendorData[vendor]) return 0;
        
        const vendorData = window.vendorData[vendor];
        let implementationDays = vendorData.costs.implementationDays[sizeCategory] || 0;
        
        // Adjust implementation time based on urgency
        if (urgency === 'urgent') {
            // Urgent implementation increases consultant costs by 25% (rush fees)
            return implementationDays * consultingRate * 1.25;
        } else if (urgency === 'critical') {
            // Critical implementation increases consultant costs by 50% (rush fees)
            return implementationDays * consultingRate * 1.5;
        }
        
        return implementationDays * consultingRate;
    }
    
    function calculateMaintenanceCosts(vendor, licenseCost, hardwareCost, years) {
        if (!window.vendorData[vendor]) return 0;
        
        const vendorData = window.vendorData[vendor];
        const maintenancePercentage = vendorData.costs.maintenancePercentage / 100;
        
        // Maintenance is typically a percentage of license and hardware costs
        return (licenseCost + hardwareCost) * maintenancePercentage * years;
    }
    
    function calculatePersonnelCosts(vendor, sizeCategory, fteCost, fteAllocation, years) {
        if (!window.vendorData[vendor]) return 0;
        
        const vendorData = window.vendorData[vendor];
        const ftePercentage = vendorData.costs.personnelFTE[sizeCategory] / 100;
        
        // Adjust based on custom FTE allocation percentage
        const adjustedFtePercentage = ftePercentage * (fteAllocation / 50); // 50% is the baseline
        
        return adjustedFtePercentage * fteCost * years;
    }
    
    function calculateTrainingCosts(vendor, costPerUser, userCount) {
        // Most NAC solutions require similar training, with slight adjustments
        // based on complexity
        let complexityFactor = 1.0;
        
        switch (vendor) {
            case 'cisco':
            case 'aruba':
            case 'forescout':
            case 'arista':
                complexityFactor = 1.2; // More complex solutions require more training
                break;
            case 'fortinac':
            case 'nps':
                complexityFactor = 1.0; // Average complexity
                break;
            case 'securew2':
            case 'juniper':
            case 'foxpass':
            case 'portnox':
                complexityFactor = 0.8; // Cloud solutions typically require less training
                break;
            case 'noNac':
                complexityFactor = 0.0; // No solution means no training
                break;
        }
        
        return costPerUser * userCount * complexityFactor;
    }
    
    function calculateCloudTransitionSavings(currentVendor, sizeCategory, fteCost, years) {
        // Only calculate if moving from on-premises to cloud
        const isCurrentOnPrem = ['cisco', 'aruba', 'forescout', 'fortinac', 'nps', 'arista'].includes(currentVendor);
        const isPortnoxCloud = true; // Portnox is a cloud solution
        
        if (isCurrentOnPrem && isPortnoxCloud) {
            // Estimate savings from cloud transition
            const infrastructureSavings = {
                'small': 15000 * years,
                'medium': 35000 * years,
                'large': 75000 * years,
                'enterprise': 150000 * years
            };
            
            // Personnel efficiency savings (not already captured in personnel costs)
            const fteEfficiency = {
                'small': 0.1,  // 10% of an FTE
                'medium': 0.15,
                'large': 0.25,
                'enterprise': 0.4
            };
            
            const personnelSavings = fteEfficiency[sizeCategory] * fteCost * years;
            
            return {
                infrastructure: infrastructureSavings[sizeCategory] || 0,
                personnel: personnelSavings,
                total: (infrastructureSavings[sizeCategory] || 0) + personnelSavings
            };
        }
        
        return {
            infrastructure: 0,
            personnel: 0,
            total: 0
        };
    }
    
    function calculateDowntimeCosts(vendor, downtimeCostPerHour, deviceCount, years) {
        // Estimated annual downtime hours based on vendor and device count
        const annualDowntimeEstimates = {
            'cisco': {
                'small': 8,
                'medium': 12,
                'large': 16,
                'enterprise': 24
            },
            'aruba': {
                'small': 6,
                'medium': 10,
                'large': 14,
                'enterprise': 20
            },
            'forescout': {
                'small': 8,
                'medium': 12,
                'large': 16,
                'enterprise': 24
            },
            'fortinac': {
                'small': 6,
                'medium': 10,
                'large': 14,
                'enterprise': 20
            },
            'nps': {
                'small': 10,
                'medium': 16,
                'large': 24,
                'enterprise': 36
            },
            'securew2': {
                'small': 2,
                'medium': 3,
                'large': 4,
                'enterprise': 6
            },
            'juniper': {
                'small': 4,
                'medium': 6,
                'large': 8,
                'enterprise': 12
            },
            'foxpass': {
                'small': 2,
                'medium': 3,
                'large': 4,
                'enterprise': 6
            },
            'arista': {
                'small': 6,
                'medium': 10,
                'large': 14,
                'enterprise': 20
            },
            'portnox': {
                'small': 1,
                'medium': 2,
                'large': 3,
                'enterprise': 4
            },
            'noNac': {
                'small': 0,
                'medium': 0,
                'large': 0,
                'enterprise': 0
            }
        };
        
        const sizeCategory = getOrganizationSizeCategory(deviceCount);
        const annualDowntime = annualDowntimeEstimates[vendor]?.[sizeCategory] || 0;
        
        return annualDowntime * downtimeCostPerHour * years;
    }
    
    function calculatePortnoxCost(deviceCount, basePrice, discount, years) {
        const effectivePrice = basePrice * (1 - discount / 100);
        const annualCost = effectivePrice * 12 * deviceCount;
        return annualCost * years;
    }
    
    // Public API
    return {
        /**
         * Calculate TCO for a specific vendor
         * @param {Object} config Configuration object with all parameters
         * @returns {Object} TCO breakdown and total
         */
        calculateTCO: function(config) {
            const {
                vendor,
                deviceCount,
                years,
                urgency,
                consultingRate,
                fteCost,
                fteAllocation,
                trainingCostPerUser,
                trainingUserCount,
                maintenancePercentage,
                downtimeCostPerHour,
                portnoxBasePrice,
                portnoxDiscount
            } = config;
            
            // Get organization size category
            const sizeCategory = getOrganizationSizeCategory(deviceCount);
            
            // Calculate individual cost components
            let hardwareCost = calculateHardwareCosts(vendor, sizeCategory, years);
            let licenseCost = calculateLicenseCosts(vendor, sizeCategory, deviceCount, years);
            const implementationCost = calculateImplementationCosts(vendor, sizeCategory, consultingRate, urgency);
            let maintenanceCost = calculateMaintenanceCosts(vendor, licenseCost, hardwareCost, years);
            const personnelCost = calculatePersonnelCosts(vendor, sizeCategory, fteCost, fteAllocation, years);
            const trainingCost = calculateTrainingCosts(vendor, trainingCostPerUser, trainingUserCount);
            const downtimeCost = calculateDowntimeCosts(vendor, downtimeCostPerHour, deviceCount, years);
            
            // Special case for Portnox (cloud subscription)
            if (vendor === 'portnox') {
                licenseCost = calculatePortnoxCost(deviceCount, portnoxBasePrice, portnoxDiscount, years);
                hardwareCost = 0; // No hardware required
                maintenanceCost = 0; // Maintenance included in subscription
            }
            
            // Calculate total TCO
            const totalCost = hardwareCost + licenseCost + implementationCost + 
                             maintenanceCost + personnelCost + trainingCost + downtimeCost;
            
            return {
                hardwareCost,
                licenseCost,
                implementationCost,
                maintenanceCost,
                personnelCost,
                trainingCost,
                downtimeCost,
                totalCost,
                annualCost: totalCost / years
            };
        },
        
        /**
         * Compare TCO between current solution and Portnox
         * @param {Object} currentConfig Configuration for current solution
         * @param {Object} portnoxConfig Configuration for Portnox
         * @returns {Object} Comparison results
         */
        compareTCO: function(currentConfig, portnoxConfig) {
            const currentTCO = this.calculateTCO(currentConfig);
            const portnoxTCO = this.calculateTCO(portnoxConfig);
            
            // Calculate savings
            const absoluteSavings = currentTCO.totalCost - portnoxTCO.totalCost;
            const percentageSavings = (absoluteSavings / currentTCO.totalCost) * 100;
            
            // Calculate cloud transition savings
            const cloudSavings = calculateCloudTransitionSavings(
                currentConfig.vendor,
                getOrganizationSizeCategory(currentConfig.deviceCount),
                currentConfig.fteCost,
                currentConfig.years
            );
            
            // Calculate implementation time difference
            const currentVendorData = window.vendorData[currentConfig.vendor];
            const portnoxVendorData = window.vendorData['portnox'];
            
            const sizeCategory = getOrganizationSizeCategory(currentConfig.deviceCount);
            
            const currentImplementationDays = currentVendorData?.costs.implementationDays[sizeCategory] || 0;
            const portnoxImplementationDays = portnoxVendorData?.costs.implementationDays[sizeCategory] || 0;
            
            const implementationDaysSaved = currentImplementationDays - portnoxImplementationDays;
            const implementationPercentageSaved = (implementationDaysSaved / currentImplementationDays) * 100;
            
            // Calculate break-even point (in months)
            let breakEvenMonths = 0;
            
            if (portnoxTCO.annualCost < currentTCO.annualCost) {
                // Only calculate if Portnox is cheaper annually
                const monthlySavings = (currentTCO.annualCost - portnoxTCO.annualCost) / 12;
                
                // Initial investment = implementation cost + training cost
                const initialInvestment = portnoxTCO.implementationCost + portnoxTCO.trainingCost;
                
                if (monthlySavings > 0) {
                    breakEvenMonths = initialInvestment / monthlySavings;
                }
            }
            
            return {
                current: currentTCO,
                portnox: portnoxTCO,
                savings: {
                    absolute: absoluteSavings,
                    percentage: percentageSavings,
                    cloud: cloudSavings,
                    implementation: {
                        days: implementationDaysSaved,
                        percentage: implementationPercentageSaved
                    }
                },
                breakEvenMonths: breakEvenMonths
            };
        },
        
        /**
         * Generate TCO comparison for all vendors
         * @param {Object} baseConfig Base configuration
         * @returns {Object} Comparison results
         */
        compareAllVendors: function(baseConfig) {
            const results = {};
            const vendors = Object.keys(window.vendorData);
            
            for (const vendor of vendors) {
                const vendorConfig = {
                    ...baseConfig,
                    vendor: vendor
                };
                
                results[vendor] = this.calculateTCO(vendorConfig);
            }
            
            return results;
        },
        
        /**
         * Perform sensitivity analysis
         * @param {Object} baseConfig Base configuration
         * @param {String} variable Variable to analyze
         * @param {Number} min Minimum value
         * @param {Number} max Maximum value
         * @param {Number} steps Number of steps
         * @returns {Object} Sensitivity analysis results
         */
        performSensitivityAnalysis: function(baseConfig, variable, min, max, steps = 10) {
            const results = {
                variable: variable,
                xValues: [],
                series: {}
            };
            
            const vendors = baseConfig.vendors || ['cisco', 'aruba', 'forescout', 'portnox'];
            
            // Initialize series for each vendor
            for (const vendor of vendors) {
                results.series[vendor] = [];
            }
            
            // Calculate step size
            const stepSize = (max - min) / (steps - 1);
            
            // Generate data points
            for (let i = 0; i < steps; i++) {
                const value = min + (stepSize * i);
                results.xValues.push(value);
                
                for (const vendor of vendors) {
                    const config = {
                        ...baseConfig,
                        vendor: vendor
                    };
                    
                    // Update the variable being analyzed
                    switch (variable) {
                        case 'deviceCount':
                            config.deviceCount = value;
                            break;
                        case 'years':
                            config.years = value;
                            break;
                        case 'fteCost':
                            config.fteCost = value;
                            break;
                        case 'fteAllocation':
                            config.fteAllocation = value;
                            break;
                        case 'portnoxBasePrice':
                            config.portnoxBasePrice = value;
                            break;
                        case 'portnoxDiscount':
                            config.portnoxDiscount = value;
                            break;
                    }
                    
                    const tco = this.calculateTCO(config);
                    results.series[vendor].push(tco.totalCost);
                }
            }
            
            return results;
        }
    };
})();
EOL

# Create feature comparison data
echo -e "${YELLOW}Creating feature comparison data...${NC}"
cat > "js/data/vendors/feature-comparison.js" << 'EOL'
/**
 * Feature Comparison Data for TCO Multi-Vendor Analyzer
 * Provides detailed feature comparison between different NAC vendors
 */

// Initialize feature comparison data
window.featureComparisonData = {
    // Feature categories and their importance weights
    categories: [
        {
            name: 'Core Capabilities',
            weight: 0.25,
            features: [
                'Authentication',
                'Authorization',
                'Device Profiling',
                'Guest Management',
                'BYOD Onboarding',
                'IoT Security'
            ]
        },
        {
            name: 'Architecture',
            weight: 0.20,
            features: [
                'Cloud Native',
                'Agentless',
                'Zero Trust',
                'Scalability',
                'High Availability',
                'Remote Access Support'
            ]
        },
        {
            name: 'Administration',
            weight: 0.15,
            features: [
                'Ease of Deployment',
                'Ease of Management',
                'Reporting & Analytics',
                'API Support',
                'Centralized Management',
                'Automation Capabilities'
            ]
        },
        {
            name: 'Security',
            weight: 0.25,
            features: [
                'Posture Assessment',
                'Threat Protection',
                'Segmentation',
                'Multi-factor Authentication',
                'Continuous Monitoring',
                'Remediation Actions'
            ]
        },
        {
            name: 'Ecosystem',
            weight: 0.15,
            features: [
                'Third-party Integrations',
                'Industry Standards Support',
                'Vendor Support Quality',
                'Community Resources',
                'Deployment Partners',
                'Future Roadmap'
            ]
        }
    ],
    
    // Feature ratings for each vendor (0-100 scale)
    ratings: {
        'cisco': {
            'Authentication': 95,
            'Authorization': 95,
            'Device Profiling': 90,
            'Guest Management': 95,
            'BYOD Onboarding': 90,
            'IoT Security': 85,
            'Cloud Native': 40,
            'Agentless': 60,
            'Zero Trust': 70,
            'Scalability': 85,
            'High Availability': 90,
            'Remote Access Support': 70,
            'Ease of Deployment': 60,
            'Ease of Management': 65,
            'Reporting & Analytics': 85,
            'API Support': 80,
            'Centralized Management': 85,
            'Automation Capabilities': 80,
            'Posture Assessment': 95,
            'Threat Protection': 90,
            'Segmentation': 95,
            'Multi-factor Authentication': 90,
            'Continuous Monitoring': 90,
            'Remediation Actions': 85,
            'Third-party Integrations': 90,
            'Industry Standards Support': 95,
            'Vendor Support Quality': 90,
            'Community Resources': 95,
            'Deployment Partners': 95,
            'Future Roadmap': 85
        },
        'aruba': {
            'Authentication': 90,
            'Authorization': 90,
            'Device Profiling': 90,
            'Guest Management': 90,
            'BYOD Onboarding': 85,
            'IoT Security': 80,
            'Cloud Native': 50,
            'Agentless': 60,
            'Zero Trust': 75,
            'Scalability': 80,
            'High Availability': 85,
            'Remote Access Support': 75,
            'Ease of Deployment': 65,
            'Ease of Management': 70,
            'Reporting & Analytics': 80,
            'API Support': 75,
            'Centralized Management': 85,
            'Automation Capabilities': 75,
            'Posture Assessment': 85,
            'Threat Protection': 80,
            'Segmentation': 85,
            'Multi-factor Authentication': 85,
            'Continuous Monitoring': 85,
            'Remediation Actions': 80,
            'Third-party Integrations': 80,
            'Industry Standards Support': 90,
            'Vendor Support Quality': 85,
            'Community Resources': 85,
            'Deployment Partners': 90,
            'Future Roadmap': 80
        },
        'forescout': {
            'Authentication': 85,
            'Authorization': 85,
            'Device Profiling': 95,
            'Guest Management': 75,
            'BYOD Onboarding': 80,
            'IoT Security': 95,
            'Cloud Native': 50,
            'Agentless': 95,
            'Zero Trust': 75,
            'Scalability': 75,
            'High Availability': 80,
            'Remote Access Support': 70,
            'Ease of Deployment': 65,
            'Ease of Management': 70,
            'Reporting & Analytics': 85,
            'API Support': 80,
            'Centralized Management': 80,
            'Automation Capabilities': 85,
            'Posture Assessment': 85,
            'Threat Protection': 90,
            'Segmentation': 90,
            'Multi-factor Authentication': 70,
            'Continuous Monitoring': 95,
            'Remediation Actions': 90,
            'Third-party Integrations': 85,
            'Industry Standards Support': 90,
            'Vendor Support Quality': 85,
            'Community Resources': 80,
            'Deployment Partners': 85,
            'Future Roadmap': 80
        },
        'fortinac': {
            'Authentication': 80,
            'Authorization': 80,
            'Device Profiling': 85,
            'Guest Management': 75,
            'BYOD Onboarding': 75,
            'IoT Security': 85,
            'Cloud Native': 40,
            'Agentless': 70,
            'Zero Trust': 70,
            'Scalability': 80,
            'High Availability': 85,
            'Remote Access Support': 70,
            'Ease of Deployment': 70,
            'Ease of Management': 75,
            'Reporting & Analytics': 80,
            'API Support': 75,
            'Centralized Management': 85,
            'Automation Capabilities': 75,
            'Posture Assessment': 80,
            'Threat Protection': 85,
            'Segmentation': 85,
            'Multi-factor Authentication': 75,
            'Continuous Monitoring': 80,
            'Remediation Actions': 80,
            'Third-party Integrations': 70,
            'Industry Standards Support': 85,
            'Vendor Support Quality': 80,
            'Community Resources': 75,
            'Deployment Partners': 80,
            'Future Roadmap': 75
        },
        'nps': {
            'Authentication': 75,
            'Authorization': 75,
            'Device Profiling': 50,
            'Guest Management': 60,
            'BYOD Onboarding': 60,
            'IoT Security': 40,
            'Cloud Native': 30,
            'Agentless': 50,
            'Zero Trust': 50,
            'Scalability': 65,
            'High Availability': 70,
            'Remote Access Support': 50,
            'Ease of Deployment': 70,
            'Ease of Management': 65,
            'Reporting & Analytics': 55,
            'API Support': 50,
            'Centralized Management': 60,
            'Automation Capabilities': 50,
            'Posture Assessment': 60,
            'Threat Protection': 60,
            'Segmentation': 65,
            'Multi-factor Authentication': 70,
            'Continuous Monitoring': 60,
            'Remediation Actions': 55,
            'Third-party Integrations': 60,
            'Industry Standards Support': 70,
            'Vendor Support Quality': 70,
            'Community Resources': 80,
            'Deployment Partners': 75,
            'Future Roadmap': 50
        },
        'securew2': {
            'Authentication': 85,
            'Authorization': 80,
            'Device Profiling': 70,
            'Guest Management': 70,
            'BYOD Onboarding': 85,
            'IoT Security': 60,
            'Cloud Native': 95,
            'Agentless': 85,
            'Zero Trust': 65,
            'Scalability': 85,
            'High Availability': 90,
            'Remote Access Support': 80,
            'Ease of Deployment': 85,
            'Ease of Management': 80,
            'Reporting & Analytics': 70,
            'API Support': 75,
            'Centralized Management': 85,
            'Automation Capabilities': 70,
            'Posture Assessment': 60,
            'Threat Protection': 60,
            'Segmentation': 65,
            'Multi-factor Authentication': 80,
            'Continuous Monitoring': 70,
            'Remediation Actions': 65,
            'Third-party Integrations': 70,
            'Industry Standards Support': 80,
            'Vendor Support Quality': 75,
            'Community Resources': 70,
            'Deployment Partners': 75,
            'Future Roadmap': 75
        },
        'juniper': {
            'Authentication': 85,
            'Authorization': 85,
            'Device Profiling': 80,
            'Guest Management': 85,
            'BYOD Onboarding': 85,
            'IoT Security': 70,
            'Cloud Native': 90,
            'Agentless': 85,
            'Zero Trust': 75,
            'Scalability': 85,
            'High Availability': 90,
            'Remote Access Support': 80,
            'Ease of Deployment': 80,
            'Ease of Management': 85,
            'Reporting & Analytics': 80,
            'API Support': 80,
            'Centralized Management': 85,
            'Automation Capabilities': 85,
            'Posture Assessment': 70,
            'Threat Protection': 75,
            'Segmentation': 80,
            'Multi-factor Authentication': 80,
            'Continuous Monitoring': 85,
            'Remediation Actions': 75,
            'Third-party Integrations': 70,
            'Industry Standards Support': 85,
            'Vendor Support Quality': 80,
            'Community Resources': 75,
            'Deployment Partners': 80,
            'Future Roadmap': 80
        },
        'foxpass': {
            'Authentication': 80,
            'Authorization': 75,
            'Device Profiling': 60,
            'Guest Management': 70,
            'BYOD Onboarding': 75,
            'IoT Security': 50,
            'Cloud Native': 95,
            'Agentless': 90,
            'Zero Trust': 60,
            'Scalability': 75,
            'High Availability': 80,
            'Remote Access Support': 70,
            'Ease of Deployment': 90,
            'Ease of Management': 85,
            'Reporting & Analytics': 65,
            'API Support': 70,
            'Centralized Management': 80,
            'Automation Capabilities': 65,
            'Posture Assessment': 50,
            'Threat Protection': 55,
            'Segmentation': 60,
            'Multi-factor Authentication': 75,
            'Continuous Monitoring': 60,
            'Remediation Actions': 55,
            'Third-party Integrations': 65,
            'Industry Standards Support': 75,
            'Vendor Support Quality': 70,
            'Community Resources': 65,
            'Deployment Partners': 70,
            'Future Roadmap': 70
        },
        'arista': {
            'Authentication': 85,
            'Authorization': 85,
            'Device Profiling': 90,
            'Guest Management': 70,
            'BYOD Onboarding': 75,
            'IoT Security': 85,
            'Cloud Native': 50,
            'Agentless': 75,
            'Zero Trust': 75,
            'Scalability': 85,
            'High Availability': 90,
            'Remote Access Support': 70,
            'Ease of Deployment': 65,
            'Ease of Management': 70,
            'Reporting & Analytics': 85,
            'API Support': 80,
            'Centralized Management': 85,
            'Automation Capabilities': 80,
            'Posture Assessment': 85,
            'Threat Protection': 90,
            'Segmentation': 90,
            'Multi-factor Authentication': 80,
            'Continuous Monitoring': 90,
            'Remediation Actions': 85,
            'Third-party Integrations': 75,
            'Industry Standards Support': 85,
            'Vendor Support Quality': 80,
            'Community Resources': 75,
            'Deployment Partners': 80,
            'Future Roadmap': 80
        },
        'portnox': {
            'Authentication': 95,
            'Authorization': 95,
            'Device Profiling': 90,
            'Guest Management': 90,
            'BYOD Onboarding': 95,
            'IoT Security': 85,
            'Cloud Native': 100,
            'Agentless': 100,
            'Zero Trust': 95,
            'Scalability': 95,
            'High Availability': 95,
            'Remote Access Support': 95,
            'Ease of Deployment': 95,
            'Ease of Management': 95,
            'Reporting & Analytics': 90,
            'API Support': 90,
            'Centralized Management': 95,
            'Automation Capabilities': 90,
            'Posture Assessment': 90,
            'Threat Protection': 85,
            'Segmentation': 90,
            'Multi-factor Authentication': 95,
            'Continuous Monitoring': 95,
            'Remediation Actions': 90,
            'Third-party Integrations': 85,
            'Industry Standards Support': 95,
            'Vendor Support Quality': 90,
            'Community Resources': 85,
            'Deployment Partners': 85,
            'Future Roadmap': 95
        },
        'noNac': {
            'Authentication': 10,
            'Authorization': 10,
            'Device Profiling': 0,
            'Guest Management': 0,
            'BYOD Onboarding': 0,
            'IoT Security': 0,
            'Cloud Native': 0,
            'Agentless': 0,
            'Zero Trust': 0,
            'Scalability': 0,
            'High Availability': 0,
            'Remote Access Support': 0,
            'Ease of Deployment': 100,
            'Ease of Management': 0,
            'Reporting & Analytics': 0,
            'API Support': 0,
            'Centralized Management': 0,
            'Automation Capabilities': 0,
            'Posture Assessment': 0,
            'Threat Protection': 0,
            'Segmentation': 0,
            'Multi-factor Authentication': 0,
            'Continuous Monitoring': 0,
            'Remediation Actions': 0,
            'Third-party Integrations': 0,
            'Industry Standards Support': 0,
            'Vendor Support Quality': 0,
            'Community Resources': 0,
            'Deployment Partners': 0,
            'Future Roadmap': 0
        }
    },
    
    // Feature details for tooltips and explanations
    featureDetails: {
        'Authentication': 'Verifies user and device identity before allowing network access',
        'Authorization': 'Determines what resources an authenticated user or device can access',
        'Device Profiling': 'Identifies and categorizes devices connecting to the network',
        'Guest Management': 'Handles temporary access for visitors and non-corporate devices',
        'BYOD Onboarding': 'Process for securely adding employee-owned devices to the network',
        'IoT Security': 'Protects and manages Internet of Things devices on the network',
        'Cloud Native': 'Built specifically for cloud deployment without on-premises components',
        'Agentless': 'Functions without requiring software installation on endpoint devices',
        'Zero Trust': 'Security model that requires verification for every access request',
        'Scalability': 'Ability to handle growing numbers of devices and network traffic',
        'High Availability': 'Ensures continuous operation with minimal downtime',
        'Remote Access Support': 'Secures connections from off-network or remote locations',
        'Ease of Deployment': 'Simplicity and speed of initial implementation',
        'Ease of Management': 'Day-to-day administration effort and complexity',
        'Reporting & Analytics': 'Visibility, insights, and compliance reporting capabilities',
        'API Support': 'Programmable interfaces for integration with other systems',
        'Centralized Management': 'Single-pane-of-glass administration across all components',
        'Automation Capabilities': 'Ability to automate routine tasks and responses',
        'Posture Assessment': 'Evaluates endpoint security status and compliance',
        'Threat Protection': 'Detects and mitigates security threats on the network',
        'Segmentation': 'Divides network into isolated segments to contain threats',
        'Multi-factor Authentication': 'Requires multiple verification methods for access',
        'Continuous Monitoring': 'Ongoing surveillance of network activity and device behavior',
        'Remediation Actions': 'Automated responses to security issues or policy violations',
        'Third-party Integrations': 'Connections to other security and IT management tools',
        'Industry Standards Support': 'Compliance with recognized security and networking standards',
        'Vendor Support Quality': 'Responsiveness and effectiveness of technical assistance',
        'Community Resources': 'Available documentation, forums, and knowledge bases',
        'Deployment Partners': 'Ecosystem of qualified implementation specialists',
        'Future Roadmap': 'Planned enhancements and product direction'
    },
    
    // Calculate overall scores for each vendor
    calculateScores: function() {
        const scores = {};
        const categoryScores = {};
        
        // Initialize scores
        for (const vendor in this.ratings) {
            scores[vendor] = 0;
            categoryScores[vendor] = {};
        }
        
        // Calculate category scores and overall scores
        for (const category of this.categories) {
            const categoryName = category.name;
            const categoryWeight = category.weight;
            const features = category.features;
            
            for (const vendor in this.ratings) {
                let categoryScore = 0;
                
                for (const feature of features) {
                    categoryScore += this.ratings[vendor][feature] || 0;
                }
                
                // Average score for this category
                categoryScore = categoryScore / features.length;
                
                // Store category score
                categoryScores[vendor][categoryName] = categoryScore;
                
                // Add weighted category score to overall score
                scores[vendor] += categoryScore * categoryWeight;
            }
        }
        
        return {
            overall: scores,
            categories: categoryScores
        };
    },
    
    // Compare specific vendors
    compareVendors: function(vendors) {
        if (!vendors || vendors.length === 0) {
            return null;
        }
        
        const comparison = {
            features: {},
            categories: {},
            overall: {}
        };
        
        // Compare individual features
        for (const feature in this.featureDetails) {
            comparison.features[feature] = {};
            
            for (const vendor of vendors) {
                comparison.features[feature][vendor] = this.ratings[vendor][feature] || 0;
            }
        }
        
        // Compare category scores
        const categoryScores = this.calculateScores().categories;
        for (const category of this.categories) {
            const categoryName = category.name;
            comparison.categories[categoryName] = {};
            
            for (const vendor of vendors) {
                comparison.categories[categoryName][vendor] = categoryScores[vendor][categoryName] || 0;
            }
        }
        
        // Compare overall scores
        const overallScores = this.calculateScores().overall;
        for (const vendor of vendors) {
            comparison.overall[vendor] = overallScores[vendor] || 0;
        }
        
        return comparison;
    }
};
EOL

# Update index.html with new data files
echo -e "${YELLOW}Updating index.html with new data files...${NC}"

# Add new data script references
sed -i.bak '/<script src="js\/data\/industry.js"><\/script>/a \
    <script src="js/data/industry/industry-data.js"></script>' index.html

sed -i.bak '/<script src="js\/data\/compliance.js"><\/script>/a \
    <script src="js/data/compliance/compliance-data.js"></script>\
    <script src="js/data/risk/risk-data.js"></script>\
    <script src="js/data/tco/tco-calculator.js"></script>\
    <script src="js/data/vendors/vendors-data.js"></script>\
    <script src="js/data/vendors/feature-comparison.js"></script>' index.html

echo -e "${GREEN}Data update completed successfully!${NC}"

/**
 * Industry Data Module
 * Contains industry-specific information, benchmarks, and requirements
 */

const IndustryData = {
    // Industry definitions
    industries: {
        healthcare: {
            id: 'healthcare',
            name: 'Healthcare',
            description: 'Healthcare organizations face unique security challenges with diverse medical devices, strict regulatory requirements, and the need to protect sensitive patient data.',
            icon: 'hospital',
            deviceDensity: 'High',
            regulatoryPressure: 'Very High',
            securityMaturity: 'Medium',
            keyRequirements: [
                'Medical device identification and security',
                'PHI protection and HIPAA compliance',
                'Legacy device support for medical equipment',
                'Segmentation between clinical and guest networks',
                'Real-time access for emergency scenarios'
            ],
            benchmarks: {
                breachCost: '$9.2 million per incident',
                implementationTime: '4-6 months (traditional) / 5-10 days (Portnox)',
                fteCost: '1.5 FTE (traditional) / 0.2 FTE (Portnox)',
                downtimeImpact: '$1.4 million per hour'
            },
            recommendations: 'Healthcare organizations should implement zero-trust NAC with strong medical device fingerprinting, automated compliance reporting, and segmentation capabilities. Cloud-native approaches minimize disruption to critical healthcare operations while ensuring security standards are met.',
            complianceFrameworks: ['hipaa', 'hitrust', 'gdpr', 'nist', 'pci', 'sox']
        },
        
        financial: {
            id: 'financial',
            name: 'Financial Services',
            description: 'Financial institutions require the highest levels of security for protecting monetary transactions, customer financial data, and maintaining strict regulatory compliance.',
            icon: 'university',
            deviceDensity: 'Medium',
            regulatoryPressure: 'Very High',
            securityMaturity: 'High',
            keyRequirements: [
                'Transaction processing system isolation',
                'Detailed audit trails for compliance',
                'Multi-factor authentication for all access',
                'Branch office integration and management',
                'Third-party access controls'
            ],
            benchmarks: {
                breachCost: '$5.7 million per incident',
                implementationTime: '4-8 months (traditional) / 7-14 days (Portnox)',
                fteCost: '1.75 FTE (traditional) / 0.25 FTE (Portnox)',
                downtimeImpact: '$2.1 million per hour'
            },
            recommendations: 'Financial services organizations require comprehensive NAC with strong policy controls, detailed audit logging, and seamless multi-factor authentication integration. Cloud-native solutions offer faster deployment and lower maintenance overhead while meeting stringent compliance requirements.',
            complianceFrameworks: ['pci', 'glba', 'gdpr', 'nist', 'sox', 'iso27001']
        },
        
        government: {
            id: 'government',
            name: 'Government',
            description: 'Government agencies need to secure sensitive data while balancing public accessibility, complex compliance requirements, and often limited budgets.',
            icon: 'landmark',
            deviceDensity: 'Medium',
            regulatoryPressure: 'Very High',
            securityMaturity: 'Medium',
            keyRequirements: [
                'Classification-based network segmentation',
                'FIPS-validated cryptographic modules',
                'Continuous monitoring and audit trails',
                'Public access management',
                'Integration with government identity systems'
            ],
            benchmarks: {
                breachCost: '$3.5 million per incident',
                implementationTime: '6-12 months (traditional) / 10-21 days (Portnox)',
                fteCost: '2 FTE (traditional) / 0.3 FTE (Portnox)',
                downtimeImpact: '$800,000 per hour'
            },
            recommendations: 'Government agencies should implement NAC solutions that meet federal standards (FIPS, NIST) while providing comprehensive access controls and visibility. Cloud solutions with FedRAMP authorization offer significant deployment and management advantages.',
            complianceFrameworks: ['fisma', 'nist800171', 'cmmc', 'fedramp', 'nist', 'fips140']
        },
        
        education: {
            id: 'education',
            name: 'Education',
            description: 'Educational institutions balance open academic environments with the need to protect student data, research networks, and administrative systems.',
            icon: 'graduation-cap',
            deviceDensity: 'Very High',
            regulatoryPressure: 'Medium',
            securityMaturity: 'Low-Medium',
            keyRequirements: [
                'BYOD management for student devices',
                'Guest access for campus visitors',
                'Research network protection',
                'Student data privacy (FERPA compliance)',
                'Cost-effective scalability'
            ],
            benchmarks: {
                breachCost: '$2.8 million per incident',
                implementationTime: '3-6 months (traditional) / 3-7 days (Portnox)',
                fteCost: '1 FTE (traditional) / 0.2 FTE (Portnox)',
                downtimeImpact: '$300,000 per hour'
            },
            recommendations: 'Educational institutions benefit from flexible NAC solutions that accommodate diverse device types while maintaining security. Cloud-native approaches offer budget-friendly options with minimal infrastructure requirements, ideal for resource-constrained IT departments.',
            complianceFrameworks: ['ferpa', 'gdpr', 'nist', 'hipaa', 'pci']
        },
        
        retail: {
            id: 'retail',
            name: 'Retail',
            description: 'Retail organizations need to secure point-of-sale systems, protect customer data, and enable secure guest access across distributed store locations.',
            icon: 'shopping-cart',
            deviceDensity: 'High',
            regulatoryPressure: 'Medium-High',
            securityMaturity: 'Medium',
            keyRequirements: [
                'POS system isolation and protection',
                'PCI DSS compliance for payment processing',
                'Guest WiFi segmentation',
                'IoT device management (cameras, sensors)',
                'Multi-location management'
            ],
            benchmarks: {
                breachCost: '$3.9 million per incident',
                implementationTime: '3-5 months (traditional) / 5-10 days (Portnox)',
                fteCost: '1 FTE (traditional) / 0.2 FTE (Portnox)',
                downtimeImpact: '$1.2 million per hour'
            },
            recommendations: 'Retail environments require NAC solutions that can be centrally managed across distributed locations while maintaining strong POS security and customer data protection. Cloud-native approaches significantly reduce per-location infrastructure costs and simplify multi-site deployments.',
            complianceFrameworks: ['pci', 'gdpr', 'ccpa', 'nist', 'iso27001']
        },
        
        manufacturing: {
            id: 'manufacturing',
            name: 'Manufacturing',
            description: 'Manufacturing organizations face challenges securing both IT and OT networks while maintaining production continuity and protecting intellectual property.',
            icon: 'industry',
            deviceDensity: 'High',
            regulatoryPressure: 'Medium',
            securityMaturity: 'Medium-Low',
            keyRequirements: [
                'OT/IT network convergence security',
                'Industrial device support',
                'Production continuity assurance',
                'Supply chain access controls',
                'Intellectual property protection'
            ],
            benchmarks: {
                breachCost: '$4.2 million per incident',
                implementationTime: '4-7 months (traditional) / 7-14 days (Portnox)',
                fteCost: '1.25 FTE (traditional) / 0.25 FTE (Portnox)',
                downtimeImpact: '$1.5 million per hour'
            },
            recommendations: 'Manufacturing organizations need NAC solutions that can secure diverse industrial devices without impacting production. Look for strong OT device fingerprinting and zero-impact authentication methods that don\'t disrupt operational processes.',
            complianceFrameworks: ['nist', 'iso27001', 'cmmc', 'nist800171', 'gdpr']
        },
        
        technology: {
            id: 'technology',
            name: 'Technology',
            description: 'Technology companies require flexible security that supports innovation while protecting intellectual property and maintaining compliance with diverse requirements.',
            icon: 'microchip',
            deviceDensity: 'High',
            regulatoryPressure: 'Medium',
            securityMaturity: 'High',
            keyRequirements: [
                'Developer environment protection',
                'API and system-to-system security',
                'BYOD and remote work support',
                'Cloud resource access control',
                'Intellectual property protection'
            ],
            benchmarks: {
                breachCost: '$4.8 million per incident',
                implementationTime: '2-5 months (traditional) / 3-7 days (Portnox)',
                fteCost: '1 FTE (traditional) / 0.15 FTE (Portnox)',
                downtimeImpact: '$1.8 million per hour'
            },
            recommendations: 'Technology organizations benefit from agile, API-driven NAC solutions that integrate with modern DevOps workflows. Cloud-native approaches align with technology company infrastructure practices and minimize implementation and maintenance challenges.',
            complianceFrameworks: ['soc2', 'iso27001', 'gdpr', 'nist', 'ccpa', 'hipaa']
        },
        
        energy: {
            id: 'energy',
            name: 'Energy & Utilities',
            description: 'Energy and utility providers must secure critical infrastructure while meeting strict regulatory requirements and managing operational technology networks.',
            icon: 'bolt',
            deviceDensity: 'Medium',
            regulatoryPressure: 'Very High',
            securityMaturity: 'Medium-High',
            keyRequirements: [
                'Critical infrastructure protection',
                'SCADA network security',
                'Regulatory compliance (NERC CIP)',
                'Legacy system support',
                'Physical-cyber security integration'
            ],
            benchmarks: {
                breachCost: '$5.6 million per incident',
                implementationTime: '6-10 months (traditional) / 14-30 days (Portnox)',
                fteCost: '1.5 FTE (traditional) / 0.3 FTE (Portnox)',
                downtimeImpact: '$2.5 million per hour'
            },
            recommendations: 'Energy and utilities organizations require NAC solutions that can secure both IT and OT environments with strong compliance capabilities. Look for solutions with NERC CIP support and the ability to handle industrial protocols and legacy systems.',
            complianceFrameworks: ['nerccip', 'nist', 'nist800171', 'iec62443', 'iso27001']
        }
    },
    
    // Risk scoring for industries
    riskScoring: {
        healthcare: {
            dataBreachLikelihood: 8,
            dataBreachImpact: 9,
            compliancePenaltyRisk: 9,
            operationalDisruptionRisk: 10,
            reputationalDamageRisk: 8,
            overall: 8.8
        },
        financial: {
            dataBreachLikelihood: 8,
            dataBreachImpact: 10,
            compliancePenaltyRisk: 10,
            operationalDisruptionRisk: 9,
            reputationalDamageRisk: 10,
            overall: 9.4
        },
        government: {
            dataBreachLikelihood: 7,
            dataBreachImpact: 10,
            compliancePenaltyRisk: 8,
            operationalDisruptionRisk: 7,
            reputationalDamageRisk: 9,
            overall: 8.2
        },
        education: {
            dataBreachLikelihood: 7,
            dataBreachImpact: 6,
            compliancePenaltyRisk: 6,
            operationalDisruptionRisk: 5,
            reputationalDamageRisk: 7,
            overall: 6.2
        },
        retail: {
            dataBreachLikelihood: 9,
            dataBreachImpact: 8,
            compliancePenaltyRisk: 7,
            operationalDisruptionRisk: 8,
            reputationalDamageRisk: 8,
            overall: 8.0
        },
        manufacturing: {
            dataBreachLikelihood: 6,
            dataBreachImpact: 7,
            compliancePenaltyRisk: 5,
            operationalDisruptionRisk: 9,
            reputationalDamageRisk: 6,
            overall: 6.6
        },
        technology: {
            dataBreachLikelihood: 8,
            dataBreachImpact: 8,
            compliancePenaltyRisk: 6,
            operationalDisruptionRisk: 7,
            reputationalDamageRisk: 9,
            overall: 7.6
        },
        energy: {
            dataBreachLikelihood: 7,
            dataBreachImpact: 10,
            compliancePenaltyRisk: 9,
            operationalDisruptionRisk: 10,
            reputationalDamageRisk: 8,
            overall: 8.8
        }
    },
    
    // Industry-specific security incidents
    securityIncidents: {
        healthcare: [
            {
                title: 'Hospital Ransomware Attack',
                description: 'Unauthorized access to unprotected medical devices led to ransomware infection across hospital network',
                impact: '3 days of operational disruption, $5.4M in recovery costs, patient data compromised',
                mitigation: 'NAC would have prevented unauthorized device access and limited lateral movement capabilities'
            },
            {
                title: 'Medical Device Compromise',
                description: 'Unpatched vulnerabilities in connected medical devices exploited to gain network access',
                impact: 'Patient data breach affecting 320,000 records, $4.2M in HIPAA penalties',
                mitigation: 'NAC would have enforced device security posture checking and isolated vulnerable devices'
            }
        ],
        financial: [
            {
                title: 'Branch Office Network Breach',
                description: 'Attacker gained access through unsecured router at branch location',
                impact: 'Customer data breach, $18.5M in penalties and legal settlements',
                mitigation: 'NAC would have enforced secure configuration and prevented unauthorized device access'
            },
            {
                title: 'Third-Party Vendor Access Exploitation',
                description: 'Contractor credentials used to access core banking systems without proper limitations',
                impact: 'Financial fraud losses of $7.2M, regulatory penalties',
                mitigation: 'NAC would have restricted vendor access to only necessary systems and enforced MFA'
            }
        ],
        retail: [
            {
                title: 'POS System Compromise',
                description: 'Malware installed on point-of-sale systems through unsecured network access',
                impact: 'Credit card data breach affecting 1.2M customers, $8.3M in penalties and remediation',
                mitigation: 'NAC would have isolated POS systems from general network traffic and prevented unauthorized access'
            },
            {
                title: 'Unsecured Guest WiFi Exploitation',
                description: 'Attack conducted through customer WiFi network to access internal systems',
                impact: 'Inventory and pricing system compromise, competitive data exposure',
                mitigation: 'NAC would have maintained strict segmentation between guest and corporate networks'
            }
        ]
    },
    
    // Get information about specific industry
    getIndustry: function(industryId) {
        return this.industries[industryId] || null;
    },
    
    // Get risk score for specific industry
    getRiskScore: function(industryId) {
        return this.riskScoring[industryId] || null;
    },
    
    // Get security incidents for specific industry
    getSecurityIncidents: function(industryId) {
        return this.securityIncidents[industryId] || [];
    },
    
    // Get all industries
    getAllIndustries: function() {
        return Object.values(this.industries);
    }
};

// Export to window
window.IndustryData = IndustryData;

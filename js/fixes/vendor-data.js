// Vendor Data Module for Portnox TCO Analyzer
(function() {
    console.log('📋 Initializing vendor data module...');
    
    // Vendor data configuration
    const vendorData = {
        portnox: {
            name: 'Portnox Cloud',
            type: 'Cloud-native NAC',
            deploymentModel: 'SaaS',
            description: 'Cloud-native NAC solution with zero infrastructure requirements and continuous compliance monitoring.',
            threeYearTCO: 202500,
            implementationTime: 21, // days
            riskReduction: 58, // percentage
            zeroTrustScore: 92, // percentage
            cloudArchitecture: 'Native',
            fteRequirement: 0.25, // FTE count
            advantages: [
                'Cloud-native architecture eliminates hardware costs and complexity',
                'Fully managed service reduces IT staff burden',
                'Built for Zero Trust security from the ground up',
                'Continuous compliance monitoring and automated remediation',
                'Seamless remote access support for distributed workforce',
                'Automatic updates and maintenance',
                'Global scalability with no infrastructure limits',
                'Rapid deployment with minimal expertise required',
                'Subscription model provides predictable costs',
                'Comprehensive API integration capabilities'
            ],
            features: {
                easeOfDeployment: 95,
                cloudIntegration: 98,
                scalability: 92,
                costEffectiveness: 88,
                compliance: 94,
                security: 96,
                ztna: 90,
                mfa: 85,
                devicePosture: 92,
                automatedRemediation: 88,
                remoteAccess: 95,
                iotSupport: 90
            },
            costBreakdown: {
                hardware: 0,
                software: 135000,
                implementation: 17500,
                maintenance: 0,
                personnel: 40000,
                training: 10000
            },
            compliance: {
                pci: 94,
                hipaa: 92,
                nist: 96,
                gdpr: 90,
                iso: 93,
                cmmc: 91,
                ferpa: 88,
                sox: 89
            }
        },
        cisco: {
            name: 'Cisco ISE',
            type: 'Enterprise NAC',
            deploymentModel: 'On-premises',
            description: 'Enterprise network access control solution with extensive hardware requirements and complex deployment.',
            threeYearTCO: 450000,
            implementationTime: 120, // days
            riskReduction: 52, // percentage
            zeroTrustScore: 45, // percentage
            cloudArchitecture: 'Partial',
            fteRequirement: 1.5, // FTE count
            advantages: [
                'Extensive integration with Cisco infrastructure',
                'Robust on-premises deployment',
                'Strong enterprise capabilities',
                'Advanced network segmentation'
            ],
            features: {
                easeOfDeployment: 35,
                cloudIntegration: 50,
                scalability: 80,
                costEffectiveness: 40
		compliance: 85,
                security: 88,
                ztna: 65,
                mfa: 80,
                devicePosture: 85,
                automatedRemediation: 75,
                remoteAccess: 60,
                iotSupport: 82
            },
            costBreakdown: {
                hardware: 90000,
                software: 112500,
                implementation: 67500,
                maintenance: 81000,
                personnel: 67500,
                training: 31500
            },
            compliance: {
                pci: 85,
                hipaa: 82,
                nist: 88,
                gdpr: 78,
                iso: 86,
                cmmc: 84,
                ferpa: 75,
                sox: 80
            }
        },
        aruba: {
            name: 'Aruba ClearPass',
            type: 'Policy Manager',
            deploymentModel: 'On-premises',
            description: 'Network policy manager with strong wired and wireless capabilities but complex implementation requirements.',
            threeYearTCO: 380000,
            implementationTime: 90, // days
            riskReduction: 50, // percentage
            zeroTrustScore: 42, // percentage
            cloudArchitecture: 'Partial',
            fteRequirement: 1.25, // FTE count
            advantages: [
                'Strong integration with Aruba infrastructure',
                'Comprehensive wireless capabilities',
                'Good guest management features',
                'Granular policy controls'
            ],
            features: {
                easeOfDeployment: 45,
                cloudIntegration: 55,
                scalability: 78,
                costEffectiveness: 45,
                compliance: 80,
                security: 85,
                ztna: 60,
                mfa: 75,
                devicePosture: 80,
                automatedRemediation: 70,
                remoteAccess: 65,
                iotSupport: 75
            },
            costBreakdown: {
                hardware: 76000,
                software: 95000,
                implementation: 57000,
                maintenance: 68400,
                personnel: 57000,
                training: 26600
            },
            compliance: {
                pci: 82,
                hipaa: 80,
                nist: 85,
                gdpr: 75,
                iso: 82,
                cmmc: 80,
                ferpa: 72,
                sox: 76
            }
        },
        forescout: {
            name: 'Forescout',
            type: 'Device Visibility',
            deploymentModel: 'On-premises',
            description: 'Device visibility and control platform with strong IoT capabilities but significant hardware requirements.',
            threeYearTCO: 405000,
            implementationTime: 100, // days
            riskReduction: 48, // percentage
            zeroTrustScore: 40, // percentage
            cloudArchitecture: 'Limited',
            fteRequirement: 1.25, // FTE count
            advantages: [
                'Excellent device discovery capabilities',
                'Strong IoT security features',
                'Good network visibility',
                'Detailed device profiling'
            ],
            features: {
                easeOfDeployment: 40,
                cloudIntegration: 40,
                scalability: 75,
                costEffectiveness: 35,
                compliance: 82,
                security: 86,
                ztna: 55,
                mfa: 70,
                devicePosture: 90,
                automatedRemediation: 80,
                remoteAccess: 60,
                iotSupport: 95
            },
            costBreakdown: {
                hardware: 81000,
                software: 101250,
                implementation: 60750,
                maintenance: 72900,
                personnel: 60750,
                training: 28350
            },
            compliance: {
                pci: 85,
                hipaa: 80,
                nist: 82,
                gdpr: 75,
                iso: 80,
                cmmc: 78,
                ferpa: 70,
                sox: 75
            }
        },
        fortinac: {
            name: 'FortiNAC',
            type: 'Fortinet NAC',
            deploymentModel: 'On-premises',
            description: 'Network access control solution integrated with Fortinet security ecosystem.',
            threeYearTCO: 325000,
            implementationTime: 80, // days
            riskReduction: 45, // percentage
            zeroTrustScore: 38, // percentage
            cloudArchitecture: 'Limited',
            fteRequirement: 1.0, // FTE count
            advantages: [
                'Integration with Fortinet security ecosystem',
                'Good network segmentation capabilities',
                'Moderate deployment complexity',
                'Solid baseline security features'
            ],
            features: {
                easeOfDeployment: 50,
                cloudIntegration: 45,
                scalability: 70,
                costEffectiveness: 55,
                compliance: 75,
                security: 80,
                ztna: 50,
                mfa: 65,
                devicePosture: 75,
                automatedRemediation: 70,
                remoteAccess: 55,
                iotSupport: 70
            },
            costBreakdown: {
                hardware: 65000,
                software: 81250,
                implementation: 48750,
                maintenance: 58500,
                personnel: 48750,
                training: 22750
            },
            compliance: {
                pci: 78,
                hipaa: 75,
                nist: 76,
                gdpr: 70,
                iso: 75,
                cmmc: 72,
                ferpa: 65,
                sox: 70
            }
        },
        juniper: {
            name: 'Juniper Mist',
            type: 'AI-driven NAC',
            deploymentModel: 'Hybrid',
            description: 'AI-driven wireless networking platform with NAC capabilities and cloud management.',
            threeYearTCO: 340000,
            implementationTime: 70, // days
            riskReduction: 46, // percentage
            zeroTrustScore: 40, // percentage
            cloudArchitecture: 'Partial',
            fteRequirement: 1.0, // FTE count
            advantages: [
                'Strong AI capabilities for network optimization',
                'Good cloud management features',
                'Excellent wireless capabilities',
                'Increasingly strong zero trust features'
            ],
            features: {
                easeOfDeployment: 60,
                cloudIntegration: 65,
                scalability: 75,
                costEffectiveness: 50,
                compliance: 72,
                security: 78,
                ztna: 65,
                mfa: 70,
                devicePosture: 75,
                automatedRemediation: 70,
                remoteAccess: 60,
                iotSupport: 65
            },
            costBreakdown: {
                hardware: 68000,
                software: 85000,
                implementation: 51000,
                maintenance: 61200,
                personnel: 51000,
                training: 23800
            },
            compliance: {
                pci: 75,
                hipaa: 72,
                nist: 76,
                gdpr: 70,
                iso: 75,
                cmmc: 70,
                ferpa: 65,
                sox: 70
            }
        },
        securew2: {
            name: 'SecureW2',
            type: 'Cloud RADIUS',
            deploymentModel: 'Cloud',
            description: 'Cloud-based RADIUS service with certificate-based authentication for wireless networks.',
            threeYearTCO: 280000,
            implementationTime: 45, // days
            riskReduction: 40, // percentage
            zeroTrustScore: 35, // percentage
            cloudArchitecture: 'Native',
            fteRequirement: 0.75, // FTE count
            advantages: [
                'Strong certificate-based authentication',
                'Cloud-native architecture',
                'Good integration with identity providers',
                'Simplified wireless security'
            ],
            features: {
                easeOfDeployment: 65,
                cloudIntegration: 75,
                scalability: 65,
                costEffectiveness: 70,
                compliance: 65,
                security: 70,
                ztna: 60,
                mfa: 75,
                devicePosture: 60,
                automatedRemediation: 60,
                remoteAccess: 75,
                iotSupport: 45
            },
            costBreakdown: {
                hardware: 0,
                software: 154000,
                implementation: 33600,
                maintenance: 0,
                personnel: 70000,
                training: 22400
            },
            compliance: {
                pci: 70,
                hipaa: 68,
                nist: 72,
                gdpr: 65,
                iso: 70,
                cmmc: 65,
                ferpa: 60,
                sox: 68
            }
        },
        microsoft: {
            name: 'Microsoft NPS',
            type: 'Windows Server NAC',
            deploymentModel: 'On-premises',
            description: 'Network Policy Server for Windows Server with basic NAC capabilities for Windows environments.',
            threeYearTCO: 290000,
            implementationTime: 60, // days
            riskReduction: 35, // percentage
            zeroTrustScore: 25, // percentage
            cloudArchitecture: 'None',
            fteRequirement: 1.0, // FTE count
            advantages: [
                'Included with Windows Server licensing',
                'Good integration with Active Directory',
                'Familiar administration for Windows administrators',
                'Basic network access control features'
            ],
            features: {
                easeOfDeployment: 40,
                cloudIntegration: 60,
                scalability: 55,
                costEffectiveness: 65,
                compliance: 60,
                security: 65,
                ztna: 30,
                mfa: 70,
                devicePosture: 65,
                automatedRemediation: 45,
                remoteAccess: 60,
                iotSupport: 40
            },
            costBreakdown: {
                hardware: 58000,
                software: 72500,
                implementation: 43500,
                maintenance: 52200,
                personnel: 43500,
                training: 20300
            },
            compliance: {
                pci: 65,
                hipaa: 62,
                nist: 70,
                gdpr: 60,
                iso: 68,
                cmmc: 65,
                ferpa: 60,
                sox: 65
            }
        },
        arista: {
            name: 'Arista Agni',
            type: 'Network Control',
            deploymentModel: 'On-premises',
            description: 'Network control solution integrated with Arista networking infrastructure.',
            threeYearTCO: 300000,
            implementationTime: 75, // days
            riskReduction: 42, // percentage
            zeroTrustScore: 30, // percentage
            cloudArchitecture: 'Limited',
            fteRequirement: 1.0, // FTE count
            advantages: [
                'Strong integration with Arista networks',
                'Good network visibility features',
                'Solid performance in Arista environments',
                'Enterprise-grade scalability'
            ],
            features: {
                easeOfDeployment: 45,
                cloudIntegration: 50,
                scalability: 80,
                costEffectiveness: 60,
                compliance: 70,
                security: 75,
                ztna: 45,
                mfa: 65,
                devicePosture: 70,
                automatedRemediation: 65,
                remoteAccess: 55,
                iotSupport: 60
            },
            costBreakdown: {
                hardware: 60000,
                software: 75000,
                implementation: 45000,
                maintenance: 54000,
                personnel: 45000,
                training: 21000
            },
            compliance: {
                pci: 72,
                hipaa: 70,
                nist: 75,
                gdpr: 65,
                iso: 72,
                cmmc: 70,
                ferpa: 62,
                sox: 68
            }
        },
        foxpass: {
            name: 'Foxpass',
            type: 'Cloud RADIUS/LDAP',
            deploymentModel: 'Cloud',
            description: 'Cloud-based RADIUS and LDAP service for network authentication and access control.',
            threeYearTCO: 240000,
            implementationTime: 40, // days
            riskReduction: 38, // percentage
            zeroTrustScore: 32, // percentage
            cloudArchitecture: 'Native',
            fteRequirement: 0.5, // FTE count
            advantages: [
                'Cloud-native RADIUS and LDAP',
                'Simple deployment for small to medium businesses',
                'Good developer-friendly features',
                'Straightforward user management'
            ],
            features: {
                easeOfDeployment: 70,
                cloudIntegration: 80,
                scalability: 60,
                costEffectiveness: 75,
                compliance: 60,
                security: 65,
                ztna: 45,
                mfa: 70,
                devicePosture: 55,
                automatedRemediation: 50,
                remoteAccess: 70,
                iotSupport: 45
            },
            costBreakdown: {
                hardware: 0,
                software: 132000,
                implementation: 28800,
                maintenance: 0,
                personnel: 60000,
                training: 19200
            },
            compliance: {
                pci: 65,
                hipaa: 62,
                nist: 68,
                gdpr: 60,
                iso: 65,
                cmmc: 60,
                ferpa: 55,
                sox: 60
            }
        },
        extreme: {
            name: 'Extreme NAC',
            type: 'Enterprise NAC',
            deploymentModel: 'On-premises',
            description: 'Network access control solution integrated with Extreme Networks infrastructure.',
            threeYearTCO: 365000,
            implementationTime: 85, // days
            riskReduction: 44, // percentage
            zeroTrustScore: 35, // percentage
            cloudArchitecture: 'Limited',
            fteRequirement: 1.25, // FTE count
            advantages: [
                'Strong integration with Extreme Networks infrastructure',
                'Good network visibility and control',
                'Solid policy enforcement capabilities',
                'Enterprise-grade scalability'
            ],
            features: {
                easeOfDeployment: 42,
                cloudIntegration: 48,
                scalability: 75,
                costEffectiveness: 48,
                compliance: 75,
                security: 78,
                ztna: 50,
                mfa: 70,
                devicePosture: 75,
                automatedRemediation: 70,
                remoteAccess: 55,
                iotSupport: 70
            },
            costBreakdown: {
                hardware: 73000,
                software: 91250,
                implementation: 54750,
                maintenance: 65700,
                personnel: 54750,
                training: 25550
            },
            compliance: {
                pci: 78,
                hipaa: 75,
                nist: 80,
                gdpr: 70,
                iso: 76,
                cmmc: 72,
                ferpa: 65,
                sox: 70
            }
        }
    };
    
    // Industry data configuration
    const industryData = {
        healthcare: {
            name: 'Healthcare',
            complianceFrameworks: ['hipaa', 'pci', 'nist'],
            challenges: [
                'Protecting sensitive patient data',
                'Meeting strict regulatory requirements',
                'Managing diverse medical devices',
                'Balancing security with clinical workflows',
                'Maintaining availability of critical systems'
            ],
            solutions: {
                portnox: [
                    'Built-in HIPAA compliance controls',
                    'Medical device visibility and classification',
                    'Automated compliance reporting',
                    'Zero disruption to clinical services',
                    'Simplified remote access for practitioners'
                ]
            },
            averageBreachCost: 9230000, // $9.23M per IBM Cost of a Data Breach Report
            riskProfile: 'high'
        },
        financial: {
            name: 'Financial Services',
            complianceFrameworks: ['pci', 'sox', 'gdpr', 'nist'],
            challenges: [
                'Protecting customer financial data',
                'Meeting strict regulatory requirements',
                'Preventing fraud and unauthorized access',
                'Managing complex vendor ecosystems',
                'Maintaining continuous availability'
            ],
            solutions: {
                portnox: [
                    'PCI DSS and SOX compliance controls',
                    'Advanced authentication for financial systems',
                    'Continuous monitoring and automated response',
                    'Comprehensive audit trails for compliance',
                    'Secure remote access for employees and vendors'
                ]
            },
            averageBreachCost: 5850000, // $5.85M per IBM Cost of a Data Breach Report
            riskProfile: 'high'
        },
        education: {
            name: 'Education',
            complianceFrameworks: ['ferpa', 'gdpr'],
            challenges: [
                'Managing diverse BYOD environments',
                'Protecting student and research data',
                'Limited security budgets and resources',
                'Supporting open campus networks',
                'Balancing security with academic freedom'
            ],
            solutions: {
                portnox: [
                    'Cost-effective cloud deployment model',
                    'Simple BYOD and guest management',
                    'Minimal IT staff requirements',
                    'FERPA compliance controls',
                    'Flexible security policies for different network zones'
                ]
            },
            averageBreachCost: 3790000, // $3.79M estimated for education sector
            riskProfile: 'medium'
        },
        government: {
            name: 'Government',
            complianceFrameworks: ['nist', 'cmmc', 'fisma'],
            challenges: [
                'Protecting sensitive government data',
                'Meeting stringent security requirements',
                'Managing legacy systems and infrastructure',
                'Limited IT modernization budgets',
                'Compliance with specific government mandates'
            ],
            solutions: {
                portnox: [
                    'NIST 800-53 and CMMC compliance controls',
                    'FedRAMP-ready cloud infrastructure',
                    'Legacy system compatibility',
                    'Cost-effective deployment model',
                    'Zero trust architecture for sensitive systems'
                ]
            },
            averageBreachCost: 8350000, // $8.35M estimated for government sector
            riskProfile: 'high'
        },
        manufacturing: {
            name: 'Manufacturing',
            complianceFrameworks: ['nist', 'iso'],
            challenges: [
                'Protecting operational technology (OT) networks',
                'Securing industrial IoT devices',
                'Maintaining production continuity',
                'Managing global supply chain access',
                'Bridging IT/OT security gaps'
            ],
            solutions: {
                portnox: [
                    'OT/IIoT device visibility and control',
                    'Segmentation of IT and OT networks',
                    'Zero downtime implementation',
                    'Supply chain access management',
                    'Simple deployment across multiple sites'
                ]
            },
            averageBreachCost: 4240000, // $4.24M estimated for manufacturing sector
            riskProfile: 'medium'
        },
        retail: {
            name: 'Retail',
            complianceFrameworks: ['pci', 'gdpr'],
            challenges: [
                'Protecting customer payment data',
                'Securing diverse retail locations',
                'Managing POS and retail IoT devices',
                'Supporting seasonal workforce',
                'Maintaining PCI DSS compliance'
            ],
            solutions: {
                portnox: [
                    'PCI DSS compliance controls',
                    'Simple multi-location deployment',
                    'POS device visibility and control',
                    'Simplified guest and seasonal worker access',
                    'Cost-effective subscription model'
                ]
            },
            averageBreachCost: 3270000, // $3.27M estimated for retail sector
            riskProfile: 'medium'
        },
        technology: {
            name: 'Technology',
            complianceFrameworks: ['iso', 'sox', 'gdpr'],
            challenges: [
                'Protecting intellectual property',
                'Managing remote and distributed workforce',
                'Securing development environments',
                'Rapid growth and changing infrastructure',
                'Advanced persistent threats (APTs)'
            ],
            solutions: {
                portnox: [
                    'Seamless remote workforce security',
                    'Advanced threat prevention capabilities',
                    'DevOps-friendly deployment model',
                    'Scales with rapid business growth',
                    'Cloud-native architecture for modern tech stacks'
                ]
            },
            averageBreachCost: 5050000, // $5.05M estimated for technology sector
            riskProfile: 'medium-high'
        },
        energy: {
            name: 'Energy & Utilities',
            complianceFrameworks: ['nerc', 'nist', 'iso'],
            challenges: [
                'Protecting critical infrastructure',
                'Securing operational technology networks',
                'Meeting regulatory requirements',
                'Managing geographically dispersed assets',
                'Defending against nation-state threats'
            ],
            solutions: {
                portnox: [
                    'Critical infrastructure protection',
                    'OT/ICS device visibility and control',
                    'NERC-CIP compliance controls',
                    'Multi-site deployment management',
                    'Advanced threat prevention capabilities'
                ]
            },
            averageBreachCost: 4650000, // $4.65M estimated for energy sector
            riskProfile: 'high'
        }
    };
    
    // Compliance framework data
    const complianceData = {
        pci: {
            name: 'PCI DSS',
            fullName: 'Payment Card Industry Data Security Standard',
            description: 'Security standard for organizations that handle credit card data',
            requirements: [
                'Network security controls',
                'Cardholder data protection',
                'Vulnerability management',
                'Access control measures',
                'Network monitoring and testing',
                'Information security policy'
            ],
            portnoxCoverage: 94,
            industryAvgCoverage: 72,
            applicableIndustries: ['retail', 'financial', 'healthcare', 'technology']
        },
        hipaa: {
            name: 'HIPAA',
            fullName: 'Health Insurance Portability and Accountability Act',
            description: 'Regulations for protecting sensitive patient health information',
            requirements: [
                'Access controls',
                'Audit controls',
                'Integrity controls',
                'Authentication',
                'Transmission security',
                'Device and media controls'
            ],
            portnoxCoverage: 92,
            industryAvgCoverage: 68,
            applicableIndustries: ['healthcare']
        },
        nist: {
            name: 'NIST 800-53',
            fullName: 'National Institute of Standards and Technology Special Publication 800-53',
            description: 'Security controls for federal information systems and organizations',
            requirements: [
                'Access control',
                'Identification and authentication',
                'System and communications protection',
                'System and information integrity',
                'Incident response',
                'Audit and accountability'
            ],
            portnoxCoverage: 96,
            industryAvgCoverage: 70,
            applicableIndustries: ['government', 'healthcare', 'financial', 'energy']
        },
        gdpr: {
            name: 'GDPR',
            fullName: 'General Data Protection Regulation',
            description: 'Data protection and privacy regulations for individuals in the EU',
            requirements: [
                'Data protection by design',
                'Data subject rights',
                'Consent management',
                'Data breach notification',
                'Security of processing',
                'Accountability and governance'
            ],
            portnoxCoverage: 90,
            industryAvgCoverage: 65,
            applicableIndustries: ['all']
        },
        iso: {
            name: 'ISO 27001',
            fullName: 'ISO/IEC 27001 - Information Security Management',
            description: 'International standard for information security management',
            requirements: [
                'Information security policies',
                'Asset management',
                'Access control',
                'Cryptography',
                'Physical and environmental security',
                'Operations security'
            ],
            portnoxCoverage: 93,
            industryAvgCoverage: 75,
            applicableIndustries: ['all']
        },
        cmmc: {
            name: 'CMMC',
            fullName: 'Cybersecurity Maturity Model Certification',
            description: 'Unified security standard for Department of Defense contractors',
            requirements: [
                'Access control',
                'Identification and authentication',
                'System and comms protection',
                'System and information integrity',
                'Audit and accountability',
                'Incident response'
            ],
            portnoxCoverage: 91,
            industryAvgCoverage: 68,
            applicableIndustries: ['government', 'manufacturing', 'technology']
        },
        ferpa: {
            name: 'FERPA',
            fullName: 'Family Educational Rights and Privacy Act',
            description: 'Federal law protecting the privacy of student education records',
            requirements: [
                'Access controls',
                'Audit controls',
                'Authentication',
                'Data integrity',
                'Disclosure limitations',
                'Policy management'
            ],
            portnoxCoverage: 88,
            industryAvgCoverage: 62,
            applicableIndustries: ['education']
        },
        sox: {
            name: 'SOX',
            fullName: 'Sarbanes-Oxley Act',
            description: 'Regulations for financial reporting and corporate governance',
            requirements: [
                'Access controls',
                'Change management',
                'Security management',
                'Data backup and recovery',
                'Monitoring and auditing',
                'IT governance'
            ],
            portnoxCoverage: 89,
            industryAvgCoverage: 66,
            applicableIndustries: ['financial', 'technology']
        },
        nerc: {
            name: 'NERC CIP',
            fullName: 'North American Electric Reliability Corporation Critical Infrastructure Protection',
            description: 'Standards for securing critical electric infrastructure',
            requirements: [
                'Electronic security perimeters',
                'Systems security management',
                'Incident reporting and planning',
                'Recovery plans',
                'Physical security',
                'Personnel and training'
            ],
            portnoxCoverage: 92,
            industryAvgCoverage: 70,
            applicableIndustries: ['energy']
        }
    };
    
    // Make data available to the application
    window.PortnoxData = {
        vendors: vendorData,
        industries: industryData,
        compliance: complianceData,
        
        // Helper methods
        getVendor: function(vendorId) {
            return vendorData[vendorId] || null;
        },
        
        getIndustry: function(industryId) {
            return industryData[industryId] || null;
        },
        
        getComplianceFramework: function(complianceId) {
            return complianceData[complianceId] || null;
        },
        
        getRecommendedVendors: function(industryId, size) {
            // Logic to recommend vendors based on industry and organization size
            const recommendations = [];
            
            // Portnox is always recommended
            recommendations.push({
                vendorId: 'portnox',
                reason: 'Best overall value and security coverage'
            });
            
            // Add industry-specific recommendations
            switch (industryId) {
                case 'healthcare':
                    recommendations.push({
                        vendorId: 'forescout',
                        reason: 'Strong medical device visibility'
                    });
                    break;
                    
                case 'financial':
                    recommendations.push({
                        vendorId: 'cisco',
                        reason: 'Robust security features for financial institutions'
                    });
                    break;
                    
                case 'education':
                    recommendations.push({
                        vendorId: 'securew2',
                        reason: 'Cost-effective for educational institutions'
                    });
                    break;
                    
                case 'government':
                    recommendations.push({
                        vendorId: 'cisco',
                        reason: 'Strong compliance with government requirements'
                    });
                    break;
                    
                case 'manufacturing':
                    recommendations.push({
                        vendorId: 'forescout',
                        reason: 'Strong OT/IoT security capabilities'
                    });
                    break;
                    
                case 'retail':
                    recommendations.push({
                        vendorId: 'aruba',
                        reason: 'Good multi-location deployment features'
                    });
                    break;
                    
                case 'technology':
                    recommendations.push({
                        vendorId: 'juniper',
                        reason: 'Strong cloud integration capabilities'
                    });
                    break;
                    
                case 'energy':
                    recommendations.push({
                        vendorId: 'forescout',
                        reason: 'Strong OT/ICS security capabilities'
                    });
                    break;
                
                default:
                    // Default secondary recommendation based on size
                    if (size === 'small' || size === 'very-small') {
                        recommendations.push({
                            vendorId: 'securew2',
                            reason: 'Cost-effective for smaller organizations'
                        });
                    } else if (size === 'enterprise' || size === 'large') {
                        recommendations.push({
                            vendorId: 'cisco',
                            reason: 'Robust features for large enterprises'
                        });
                    } else {
                        recommendations.push({
                            vendorId: 'aruba',
                            reason: 'Good balance of features for mid-sized organizations'
                        });
                    }
            }
            
            return recommendations;
        },
        
        getRequiredComplianceFrameworks: function(industryId) {
            // Return compliance frameworks required for specific industry
            const industry = industryData[industryId];
            
            if (industry && industry.complianceFrameworks) {
                return industry.complianceFrameworks.map(id => {
                    return complianceData[id] || null;
                }).filter(framework => framework !== null);
            }
            
            return [];
        }
    };
    
    console.log('Vendor data module initialized');
})();

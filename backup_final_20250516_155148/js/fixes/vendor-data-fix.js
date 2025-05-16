// Fixed Vendor Data Module for Portnox TCO Analyzer
(function() {
    console.log('📋 Initializing vendor data module (fixed)...');
    
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
            complianceScores: {
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
                costEffectiveness: 40,
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
            complianceScores: {
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
            complianceScores: {
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
            complianceScores: {
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
            complianceScores: {
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
            complianceScores: {
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
            complianceScores: {
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
            complianceScores: {
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
            complianceScores: {
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
            complianceScores: {
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
        'no-nac': {
            name: 'No NAC',
            type: 'High risk baseline',
            deploymentModel: 'None',
            description: 'No network access control solution, used as a baseline for comparison.',
            threeYearTCO: 0,
            implementationTime: 0, // days
            riskReduction: 0, // percentage
            zeroTrustScore: 0, // percentage
            cloudArchitecture: 'None',
            fteRequirement: 0, // FTE count
            advantages: [],
            features: {
                easeOfDeployment: 100,
                cloudIntegration: 0,
                scalability: 0,
                costEffectiveness: 100,
                compliance: 0,
                security: 0,
                ztna: 0,
                mfa: 0,
                devicePosture: 0,
                automatedRemediation: 0,
                remoteAccess: 0,
                iotSupport: 0
            },
            costBreakdown: {
                hardware: 0,
                software: 0,
                implementation: 0,
                maintenance: 0,
                personnel: 0,
                training: 0
            },
            complianceScores: {
                pci: 0,
                hipaa: 0,
                nist: 0,
                gdpr: 0,
                iso: 0,
                cmmc: 0,
                ferpa: 0,
                sox: 0
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
        
        // Get all vendor IDs
        getAllVendorIds: function() {
            return Object.keys(vendorData);
        },
        
        // Get selected vendors (for initialization)
        getSelectedVendors: function() {
            // Always include Portnox
            const selected = ['portnox'];
            
            // Include some default competitors for initial view
            return selected.concat(['cisco', 'aruba']);
        }
    };
    
    console.log('Vendor data module initialized successfully');
})();

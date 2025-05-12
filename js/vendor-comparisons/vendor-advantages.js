/**
 * Vendor Advantages Module
 * Contains detailed advantages of Portnox over other vendors
 */

const VendorAdvantages = {
    // Advantages of Portnox over Cisco ISE
    cisco: [
        {
            category: 'Deployment Speed',
            advantages: [
                'Days vs. months deployment timeline',
                'Zero hardware setup or configuration',
                'No complex infrastructure prerequisites',
                'Simple user interface for faster configuration',
                'No specialized Cisco expertise required'
            ]
        },
        {
            category: 'Cost Structure',
            advantages: [
                'No hardware appliance costs ($50K-$100K savings)',
                'No maintenance or upgrade costs',
                'Reduced IT staffing requirements (0.2 FTE vs. 1.5 FTE)',
                'No specialized training costs ($5K-$15K per admin)',
                'Predictable subscription pricing'
            ]
        },
        {
            category: 'Operational Overhead',
            advantages: [
                'Zero infrastructure maintenance',
                'Automatic updates without downtime',
                'No patch management required',
                'No database maintenance needed',
                'No version upgrade projects'
            ]
        },
        {
            category: 'Scalability',
            advantages: [
                'Seamless elastic scaling',
                'No additional hardware for growth',
                'No performance tuning required',
                'Simple multi-site management',
                'Remote office support without local hardware'
            ]
        }
    ],
    
    // Advantages of Portnox over Aruba ClearPass
    aruba: [
        {
            category: 'Deployment Simplicity',
            advantages: [
                '75-90% faster implementation',
                'No appliance procurement or setup',
                'Simpler policy configuration interface',
                'Native cloud identity integration',
                'Simple remote site management without appliances'
            ]
        },
        {
            category: 'Operational Costs',
            advantages: [
                'No hardware costs ($25K-$50K savings)',
                'Lower maintenance overhead',
                'Reduced IT staffing (0.2 FTE vs. 1.0 FTE)',
                'No upgrade costs or downtime',
                'Lower training requirements'
            ]
        },
        {
            category: 'Management Experience',
            advantages: [
                'Modern cloud interface vs. complex console',
                'Simplified policy configuration',
                'Centralized management for all sites',
                'Automatic updates without planning',
                'No software lifecycle management'
            ]
        },
        {
            category: 'Architecture',
            advantages: [
                'True cloud-native design vs. virtualized appliance',
                'Zero on-premises components',
                'Continuous feature updates',
                'Built-in high availability',
                'Global redundancy'
            ]
        }
    ],
    
    // Advantages of Portnox over Forescout
    forescout: [
        {
            category: 'Cost Structure',
            advantages: [
                'No appliance costs ($30K-$60K savings)',
                'Significantly lower implementation costs',
                'Lower annual maintenance costs',
                'Reduced IT staffing (0.2 FTE vs. 1.25 FTE)',
                'Predictable subscription pricing'
            ]
        },
        {
            category: 'Deployment Experience',
            advantages: [
                '90-95% faster implementation',
                'Simpler network integration',
                'No complex sizing exercises',
                'No appliance clustering configuration',
                'Faster time to value'
            ]
        },
        {
            category: 'Device Visibility',
            advantages: [
                'Comparable device identification capabilities',
                'AI-powered device fingerprinting',
                '260,000+ device fingerprints',
                'Cloud-enhanced threat intelligence',
                'Cross-customer anonymized data insights'
            ]
        },
        {
            category: 'Operational Overhead',
            advantages: [
                'No infrastructure management',
                'No appliance updates or patches',
                'No performance tuning',
                'Automatic feature additions',
                'No version upgrade projects'
            ]
        }
    ],
    
    // Advantages of Portnox over FortiNAC
    fortinac: [
        {
            category: 'Vendor Independence',
            advantages: [
                'Neutral multi-vendor support vs. Fortinet focus',
                'Works with any network infrastructure',
                'No preferential treatment for specific vendors',
                'Equal support across all device types',
                'Vendor-agnostic roadmap'
            ]
        },
        {
            category: 'Implementation',
            advantages: [
                '80-90% faster deployment',
                'No hardware requirements',
                'Simpler network integration',
                'Less networking expertise required',
                'Faster time to protection'
            ]
        },
        {
            category: 'Operational Model',
            advantages: [
                'True cloud-native SaaS vs. virtualized application',
                'Automatic updates without planning',
                'No upgrade cycles or projects',
                'No infrastructure management',
                'Reduced IT overhead'
            ]
        },
        {
            category: 'Architecture',
            advantages: [
                'Modern microservices architecture',
                'Continuous innovation delivery',
                'Elastic scalability',
                'Built-in redundancy',
                'Global data centers'
            ]
        }
    ],
    
    // Advantages of Portnox over Microsoft NPS
    nps: [
        {
            category: 'Feature Completeness',
            advantages: [
                'Comprehensive NAC vs. basic RADIUS server',
                'Advanced device profiling (NPS has none)',
                'IoT device fingerprinting and control',
                'Guest access management',
                'Extensive policy options'
            ]
        },
        {
            category: 'Management Interface',
            advantages: [
                'Purpose-built intuitive interface',
                'Modern web-based management',
                'Real-time monitoring dashboard',
                'Detailed analytics and reporting',
                'No Windows Server administration required'
            ]
        },
        {
            category: 'Compliance Capabilities',
            advantages: [
                'Built-in compliance reporting',
                'Regulatory framework templates',
                'Automatic evidence collection',
                'Continuous compliance monitoring',
                'Audit-ready documentation'
            ]
        },
        {
            category: 'Device Control',
            advantages: [
                'Sophisticated access policies',
                'Dynamic VLAN assignment',
                'Risk-based authentication',
                'Device health verification',
                'Automated remediation'
            ]
        }
    ],
    
    // Advantages of Portnox over SecureW2
    securew2: [
        {
            category: 'Scope of Functionality',
            advantages: [
                'Complete NAC solution vs. certificate focus',
                'Comprehensive device visibility and control',
                'Broader authentication methods support',
                'More extensive compliance features',
                'Complete guest management'
            ]
        },
        {
            category: 'Device Management',
            advantages: [
                'Better IoT device support',
                'More sophisticated device profiling',
                'AI-powered device fingerprinting',
                '260,000+ device fingerprints across 27,000 manufacturers',
                'Broader visibility beyond authentication'
            ]
        },
        {
            category: 'Integration Breadth',
            advantages: [
                'More comprehensive third-party integrations',
                'Broader security ecosystem support',
                'Stronger multi-vendor network support',
                'More extensive MDM/EMM integrations',
                'Better SIEM integration'
            ]
        },
        {
            category: 'Policy Controls',
            advantages: [
                'More sophisticated policy engine',
                'Advanced compliance enforcement',
                'Dynamic network segmentation',
                'Broader remediation options',
                'Device risk scoring capabilities'
            ]
        }
    ],
    
    // Advantages of Portnox over Juniper Mist
    juniper: [
        {
            category: 'Network Vendor Neutrality',
            advantages: [
                'Vendor-agnostic vs. Juniper-optimized',
                'Equal support for all switching vendors',
                'No preference for particular infrastructure',
                'No vendor lock-in',
                'Neutral product roadmap'
            ]
        },
        {
            category: 'Wired Network Support',
            advantages: [
                'Equal focus on wired and wireless',
                'More comprehensive switch support',
                'Better wired authentication policies',
                'Stronger wired visibility features',
                'Better wired client monitoring'
            ]
        },
        {
            category: 'NAC Focus',
            advantages: [
                'Pure-play NAC focus vs. broader networking',
                'More specialized in access control',
                'Deeper NAC feature development',
                'NAC-centered roadmap',
                'NAC-specific expertise'
            ]
        },
        {
            category: 'Implementation Speed',
            advantages: [
                '80-85% faster deployment',
                'Simpler setup process',
                'Less configuration complexity',
                'Faster time to protection',
                'Quicker value realization'
            ]
        }
    ],
    
    // Advantages of Portnox over Arista Agni
    arista: [
        {
            category: 'Solution Maturity',
            advantages: [
                'More mature NAC solution',
                'Longer market presence',
                'More developed feature set',
                'Larger customer base',
                'More field-tested deployment experience'
            ]
        },
        {
            category: 'Architecture',
            advantages: [
                'True cloud-native vs. datacenter-oriented',
                'No physical or virtual appliances',
                'Simpler deployment architecture',
                'Faster implementation (75-80% faster)',
                'Lower infrastructure requirements'
            ]
        },
        {
            category: 'Vendor Independence',
            advantages: [
                'Vendor-neutral vs. network-vendor focus',
                'No preference for specific infrastructure',
                'Equal support across vendors',
                'No network vendor lock-in',
                'Neutral value proposition'
            ]
        },
        {
            category: 'Operational Model',
            advantages: [
                'SaaS subscription vs. complex licensing',
                'Simplified operational management',
                'No infrastructure maintenance',
                'Automatic updates without planning',
                'Reduced IT overhead'
            ]
        }
    ],
    
    // Advantages of Portnox over Foxpass
    foxpass: [
        {
            category: 'NAC Functionality Scope',
            advantages: [
                'Full NAC solution vs. identity focus',
                'More comprehensive device control',
                'Advanced network profiling capabilities',
                'More sophisticated policy engine',
                'Broader use case support'
            ]
        },
        {
            category: 'Device Visibility',
            advantages: [
                'Superior device fingerprinting',
                'More extensive device database',
                'AI-powered device classification',
                '260,000+ device fingerprints',
                'More detailed device attributes'
            ]
        },
        {
            category: 'Enterprise Capabilities',
            advantages: [
                'More enterprise-grade features',
                'Better large-scale deployment support',
                'More comprehensive analytics',
                'More sophisticated monitoring',
                'Better multi-site management'
            ]
        },
        {
            category: 'Compliance Support',
            advantages: [
                'More comprehensive compliance framework support',
                'Advanced compliance reporting',
                'Stronger regulatory framework templates',
                'Better compliance automation',
                'More detailed audit evidence'
            ]
        }
    ],
    
    // Advantages of Portnox over No NAC
    noNac: [
        {
            category: 'Security Posture',
            advantages: [
                'Prevents unauthorized network access',
                'Provides complete device visibility',
                'Enforces security policies',
                'Enables network segmentation',
                'Automates threat response'
            ]
        },
        {
            category: 'Operational Efficiency',
            advantages: [
                'Automates device onboarding',
                'Simplifies guest access management',
                'Reduces manual security administration',
                'Prevents shadow IT proliferation',
                'Streamlines security operations'
            ]
        },
        {
            category: 'Risk Reduction',
            advantages: [
                'Reduces ransomware attack surface',
                'Prevents lateral movement during breaches',
                'Limits scope of security incidents',
                'Reduces data breach likelihood',
                'Mitigates insider threats'
            ]
        },
        {
            category: 'Compliance',
            advantages: [
                'Satisfies regulatory requirements',
                'Provides audit-ready reporting',
                'Demonstrates security due diligence',
                'Automates compliance enforcement',
                'Provides evidence of security controls'
            ]
        }
    ],
    
    // Get advantages for specific competitor
    getAdvantages: function(competitorId) {
        return this[competitorId] || [];
    }
};

// Export for use in other modules
window.VendorAdvantages = VendorAdvantages;

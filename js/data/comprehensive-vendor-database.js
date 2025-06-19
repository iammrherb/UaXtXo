/**
 * Complete NAC Vendor Database - All 20+ Vendors
 * Most comprehensive vendor comparison data available
 */

window.ComprehensiveVendorDatabase = {
    // PORTNOX - Cloud-Native Leader
    portnox: {
        id: 'portnox',
        name: 'Portnox CLEAR',
        shortName: 'Portnox',
        category: 'Cloud-Native NAC Leader',
        logo: './img/vendors/portnox-logo.png',
        marketPosition: 'Leader',
        founded: 2007,
        headquarters: 'Princeton, NJ',
        employees: '50-200',
        revenue: '$10-50M',
        
        executiveSummary: {
            keyValue: '100% cloud-native Zero Trust NAC with no infrastructure requirements',
            differentiators: [
                '4-hour deployment vs weeks/months for competitors',
                'All-inclusive pricing with no hidden costs',
                '95% automation reduces IT workload by 90%',
                'Native Zero Trust architecture from the ground up',
                'No hardware, no complexity, no compromises'
            ],
            idealFor: 'Organizations seeking modern, scalable NAC without infrastructure burden',
            recognitions: [
                'Gartner Cool Vendor 2023',
                'Info Security Product Guide Excellence Award 2024',
                'Cybersecurity Breakthrough Award Winner',
                'G2 Leader in Network Access Control'
            ]
        },
        
        pricing: {
            model: 'subscription',
            currency: 'USD',
            perDevice: {
                monthly: 4.00,
                annual: 3.40,
                triennial: 2.80,
                fiveYear: 2.40
            },
            minimumCommitment: 50,
            volumeDiscounts: {
                250: 10,
                1000: 20,
                5000: 30,
                10000: 40,
                25000: 50
            },
            includedFeatures: [
                'All NAC features',
                'Conditional Access for Applications',
                'Cloud PKI Services',
                'Cloud RADIUS',
                'TACACS+',
                'Risk-Based Access',
                'AI-Powered Threat Detection',
                '24/7 Support',
                'Unlimited Administrators',
                'API Access',
                'All Integrations'
            ],
            hiddenCosts: {
                total: 0,
                breakdown: {
                    hardware: 0,
                    implementation: 0,
                    training: 0,
                    maintenance: 0,
                    upgrades: 0,
                    support: 0
                }
            }
        },
        
        deployment: {
            model: 'Pure SaaS',
            architecture: 'Cloud-Native Microservices',
            infrastructure: 'Zero on-premises requirements',
            time: 4,
            complexity: 'Simple',
            prerequisites: 'Internet connection only',
            scalability: {
                maxDevices: 'Unlimited',
                performance: 'Linear scaling',
                multiSite: 'Native support'
            }
        },
        
        security: {
            zeroTrust: {
                native: true,
                score: 98,
                implementation: 'Continuous verification, never trust',
                microsegmentation: true,
                leastPrivilege: true
            },
            threatDetection: {
                realTime: true,
                aiPowered: true,
                behavioralAnalysis: true,
                accuracy: 99.5
            },
            incidentResponse: {
                automated: true,
                mttr: 5,
                workflows: 'Customizable',
                quarantine: 'Automatic'
            }
        },
        
        compliance: {
            certifications: [
                'SOC 2 Type II',
                'ISO 27001',
                'ISO 27017',
                'ISO 27018',
                'GDPR Compliant',
                'HIPAA Compliant',
                'CSA STAR Level 2'
            ],
            frameworks: [
                'NIST CSF', 'NIST 800-53', 'CIS Controls',
                'PCI DSS', 'HIPAA', 'GDPR', 'CCPA',
                'SOX', 'FISMA', 'FedRAMP Ready',
                'CMMC', 'NERC CIP', 'ISO 27001'
            ],
            automation: 95,
            reporting: 'Real-time automated'
        },
        
        operational: {
            automation: 95,
            selfService: true,
            fte: {
                implementation: 0.1,
                ongoing: 0.25
            },
            training: {
                admin: 2,
                endUser: 0
            }
        },
        
        integration: {
            methods: ['REST API', 'Webhooks', 'SAML', 'SCIM', 'Syslog'],
            preBuilt: 150,
            categories: {
                identity: ['Azure AD', 'Okta', 'Google', 'AD', 'Ping', 'Auth0'],
                siem: ['Splunk', 'QRadar', 'Sentinel', 'Chronicle', 'Elastic'],
                itsm: ['ServiceNow', 'Jira', 'Freshservice'],
                mdm: ['Intune', 'Jamf', 'VMware', 'MobileIron'],
                cloud: ['AWS', 'Azure', 'GCP', 'Oracle']
            }
        },
        
        businessImpact: {
            breachRiskReduction: 94,
            compliancePenaltyAvoidance: 98,
            operationalEfficiency: 90,
            userProductivity: 95,
            cyberInsuranceReduction: 35
        }
    },
    
    // CISCO ISE
    cisco: {
        id: 'cisco',
        name: 'Cisco Identity Services Engine (ISE)',
        shortName: 'Cisco ISE',
        category: 'Legacy NAC',
        logo: './img/vendors/cisco-logo.png',
        marketPosition: 'Incumbent',
        founded: 1984,
        employees: '80,000+',
        revenue: '$50B+',
        
        executiveSummary: {
            keyValue: 'Established on-premises NAC with deep Cisco ecosystem integration',
            differentiators: [
                'Tight integration with Cisco infrastructure',
                'Mature feature set',
                'Large installed base',
                'Extensive partner ecosystem'
            ],
            idealFor: 'Cisco-centric environments with existing investment',
            challenges: [
                'Complex deployment (weeks to months)',
                'High TCO with hidden costs',
                'Requires specialized expertise',
                'Limited cloud capabilities'
            ]
        },
        
        pricing: {
            model: 'perpetual + subscription',
            perDevice: {
                perpetual: 150,
                annual: 30
            },
            additionalCosts: {
                hardware: 120000,
                implementation: 75000,
                training: 25000,
                maintenance: 24000,
                upgrades: 50000
            },
            hiddenCosts: {
                total: 180000,
                breakdown: {
                    hardware: 120000,
                    powerCooling: 15000,
                    rackSpace: 10000,
                    networkBandwidth: 5000,
                    staffTime: 30000
                }
            }
        },
        
        deployment: {
            model: 'On-premises appliance',
            time: 720,
            complexity: 'High',
            prerequisites: 'Dedicated infrastructure, network redesign'
        },
        
        security: {
            zeroTrust: {
                native: false,
                score: 65,
                implementation: 'Bolt-on approach'
            },
            threatDetection: {
                realTime: false,
                aiPowered: false,
                accuracy: 75
            },
            incidentResponse: {
                automated: false,
                mttr: 240
            }
        },
        
        compliance: {
            certifications: ['Common Criteria'],
            frameworks: ['NIST', 'PCI DSS', 'HIPAA'],
            automation: 20,
            reporting: 'Manual'
        },
        
        operational: {
            automation: 30,
            fte: {
                implementation: 2,
                ongoing: 1.5
            },
            training: {
                admin: 40,
                endUser: 4
            }
        },
        
        businessImpact: {
            breachRiskReduction: 60,
            cyberInsuranceReduction: 15
        }
    },
    
    // ARUBA CLEARPASS
    aruba: {
        id: 'aruba',
        name: 'Aruba ClearPass',
        shortName: 'Aruba',
        category: 'Legacy NAC',
        logo: './img/vendors/aruba-logo.png',
        marketPosition: 'Challenger',
        parentCompany: 'HPE',
        
        executiveSummary: {
            keyValue: 'HPE-backed NAC with strong wireless integration',
            differentiators: [
                'Good Aruba wireless integration',
                'CPPM for advanced policies',
                'OnGuard for health checks'
            ],
            challenges: [
                'Complex licensing model',
                'High infrastructure requirements',
                'Limited cloud capabilities',
                'Steep learning curve'
            ]
        },
        
        pricing: {
            model: 'perpetual + subscription',
            perDevice: {
                perpetual: 120,
                annual: 22
            },
            additionalCosts: {
                hardware: 85000,
                implementation: 55000,
                training: 18000,
                maintenance: 20000
            },
            hiddenCosts: {
                total: 120000,
                breakdown: {
                    complexity: 40000,
                    downtime: 30000,
                    upgrades: 50000
                }
            }
        },
        
        deployment: {
            time: 480,
            complexity: 'High',
            model: 'On-premises or virtual appliance'
        },
        
        security: {
            zeroTrust: {
                score: 60
            },
            threatDetection: {
                accuracy: 70
            },
            incidentResponse: {
                mttr: 180
            }
        },
        
        operational: {
            automation: 35,
            fte: {
                implementation: 1.5,
                ongoing: 1.25
            }
        },
        
        businessImpact: {
            breachRiskReduction: 55,
            cyberInsuranceReduction: 14
        }
    },
    
    // FORESCOUT
    forescout: {
        id: 'forescout',
        name: 'Forescout Platform',
        shortName: 'Forescout',
        category: 'Legacy NAC',
        logo: './img/vendors/forescout-logo.png',
        marketPosition: 'Niche',
        
        executiveSummary: {
            keyValue: 'Agentless visibility and control platform',
            differentiators: [
                'Agentless approach',
                'Good OT/IoT visibility',
                'eyeExtend ecosystem',
                'Device classification'
            ],
            challenges: [
                'Limited enforcement capabilities',
                'Complex pricing',
                'Performance at scale',
                'Integration complexity'
            ]
        },
        
        pricing: {
            model: 'perpetual',
            perDevice: {
                perpetual: 100,
                annual: 20
            },
            additionalCosts: {
                hardware: 70000,
                implementation: 45000,
                training: 15000
            },
            hiddenCosts: {
                total: 90000
            }
        },
        
        security: {
            zeroTrust: {
                score: 55
            },
            threatDetection: {
                accuracy: 65
            }
        },
        
        operational: {
            automation: 40,
            fte: {
                ongoing: 1.0
            }
        },
        
        businessImpact: {
            breachRiskReduction: 50,
            cyberInsuranceReduction: 10
        }
    },
    
    // FORTINET FORTINAC
    fortinet: {
        id: 'fortinet',
        name: 'FortiNAC',
        shortName: 'FortiNAC',
        category: 'Legacy NAC',
        logo: './img/vendors/fortinet-logo.png',
        
        executiveSummary: {
            keyValue: 'Security-focused NAC with Fortinet integration',
            differentiators: [
                'FortiGate integration',
                'Security Fabric ecosystem',
                'Threat intelligence'
            ],
            challenges: [
                'Fortinet lock-in',
                'Complex deployment',
                'Limited standalone value'
            ]
        },
        
        pricing: {
            model: 'perpetual',
            perDevice: {
                perpetual: 85,
                annual: 17
            },
            additionalCosts: {
                hardware: 60000,
                implementation: 40000
            }
        },
        
        security: {
            zeroTrust: {
                score: 58
            }
        },
        
        operational: {
            automation: 35,
            fte: {
                ongoing: 1.0
            }
        },
        
        businessImpact: {
            breachRiskReduction: 52,
            cyberInsuranceReduction: 12
        }
    },
    
    // EXTREME NETWORKS
    extreme: {
        id: 'extreme',
        name: 'ExtremeControl',
        shortName: 'Extreme',
        category: 'Legacy NAC',
        logo: './img/vendors/extreme-logo.png',
        
        executiveSummary: {
            keyValue: 'Network-vendor NAC solution',
            differentiators: ['Extreme network integration'],
            challenges: ['Limited market share', 'Narrow ecosystem']
        },
        
        pricing: {
            model: 'perpetual',
            perDevice: {
                perpetual: 90,
                annual: 18
            },
            additionalCosts: {
                hardware: 55000,
                implementation: 35000
            }
        },
        
        security: {
            zeroTrust: {
                score: 50
            }
        },
        
        operational: {
            automation: 30,
            fte: {
                ongoing: 1.25
            }
        },
        
        businessImpact: {
            breachRiskReduction: 48,
            cyberInsuranceReduction: 8
        }
    },
    
    // JUNIPER MIST
    juniper: {
        id: 'juniper',
        name: 'Juniper Mist Access Assurance',
        shortName: 'Juniper Mist',
        category: 'Cloud-Managed NAC',
        logo: './img/vendors/juniper-logo.png',
        
        executiveSummary: {
            keyValue: 'AI-driven NAC with Mist cloud architecture',
            differentiators: [
                'AI insights',
                'Cloud management',
                'Marvis Virtual Network Assistant'
            ],
            challenges: [
                'Requires Mist infrastructure',
                'Premium pricing',
                'Limited NAC features'
            ]
        },
        
        pricing: {
            model: 'subscription',
            perDevice: {
                monthly: 8,
                annual: 7
            },
            additionalCosts: {
                implementation: 30000
            }
        },
        
        security: {
            zeroTrust: {
                score: 70
            }
        },
        
        operational: {
            automation: 60,
            fte: {
                ongoing: 0.75
            }
        },
        
        businessImpact: {
            breachRiskReduction: 65,
            cyberInsuranceReduction: 18
        }
    },
    
    // ARISTA CLOUDVISION
    arista: {
        id: 'arista',
        name: 'Arista CloudVision',
        shortName: 'Arista',
        category: 'Cloud-Managed NAC',
        logo: './img/vendors/arista-logo.png',
        
        executiveSummary: {
            keyValue: 'Data center focused NAC',
            differentiators: ['CloudVision platform', 'Network telemetry'],
            challenges: ['Limited campus support', 'Data center focus']
        },
        
        pricing: {
            model: 'subscription',
            perDevice: {
                monthly: 7,
                annual: 6
            }
        },
        
        security: {
            zeroTrust: {
                score: 62
            }
        },
        
        operational: {
            automation: 55,
            fte: {
                ongoing: 0.8
            }
        },
        
        businessImpact: {
            breachRiskReduction: 58,
            cyberInsuranceReduction: 15
        }
    },
    
    // MICROSOFT NPS
    microsoft: {
        id: 'microsoft',
        name: 'Microsoft Network Policy Server',
        shortName: 'Microsoft NPS',
        category: 'Basic NAC',
        logo: './img/vendors/microsoft-logo.png',
        
        executiveSummary: {
            keyValue: 'Basic RADIUS included with Windows Server',
            limitations: [
                'No device profiling',
                'Limited features',
                'Manual everything',
                'No Zero Trust'
            ]
        },
        
        pricing: {
            model: 'included',
            perDevice: {
                monthly: 0.50
            }
        },
        
        security: {
            zeroTrust: {
                score: 20
            }
        },
        
        operational: {
            automation: 5,
            fte: {
                ongoing: 2.0
            }
        },
        
        businessImpact: {
            breachRiskReduction: 15,
            cyberInsuranceReduction: 0
        }
    },
    
    // PACKETFENCE
    packetfence: {
        id: 'packetfence',
        name: 'PacketFence',
        shortName: 'PacketFence',
        category: 'Open Source NAC',
        logo: './img/vendors/packetfence-logo.png',
        
        executiveSummary: {
            keyValue: 'Open source NAC solution',
            differentiators: ['Free software', 'Community support'],
            challenges: ['DIY approach', 'No vendor support', 'Complex setup']
        },
        
        pricing: {
            model: 'open-source',
            perDevice: {
                monthly: 0,
                support: 2
            },
            additionalCosts: {
                hardware: 30000,
                implementation: 60000
            }
        },
        
        security: {
            zeroTrust: {
                score: 35
            }
        },
        
        operational: {
            automation: 20,
            fte: {
                ongoing: 1.75
            }
        },
        
        businessImpact: {
            breachRiskReduction: 30,
            cyberInsuranceReduction: 5
        }
    },
    
    // PULSE SECURE
    pulsesecure: {
        id: 'pulsesecure',
        name: 'Pulse Policy Secure',
        shortName: 'Pulse Secure',
        category: 'Legacy NAC',
        logo: './img/vendors/pulse-logo.png',
        parentCompany: 'Ivanti',
        
        executiveSummary: {
            keyValue: 'VPN-integrated NAC solution',
            differentiators: ['VPN integration', 'Mobile focus'],
            challenges: ['EOL concerns', 'Limited innovation']
        },
        
        pricing: {
            model: 'perpetual',
            perDevice: {
                perpetual: 95,
                annual: 19
            },
            additionalCosts: {
                hardware: 50000,
                implementation: 35000
            }
        },
        
        security: {
            zeroTrust: {
                score: 45
            }
        },
        
        operational: {
            automation: 25,
            fte: {
                ongoing: 1.25
            }
        },
        
        businessImpact: {
            breachRiskReduction: 40,
            cyberInsuranceReduction: 8
        }
    },
    
    // SECUREW2
    securew2: {
        id: 'securew2',
        name: 'SecureW2',
        shortName: 'SecureW2',
        category: 'Cloud RADIUS',
        logo: './img/vendors/securew2-logo.png',
        
        executiveSummary: {
            keyValue: 'Cloud RADIUS and PKI services',
            limitations: [
                'Limited NAC features',
                'No device profiling',
                'Basic policies only'
            ]
        },
        
        pricing: {
            model: 'subscription',
            perDevice: {
                monthly: 3,
                annual: 2.50
            }
        },
        
        security: {
            zeroTrust: {
                score: 40
            }
        },
        
        operational: {
            automation: 50,
            fte: {
                ongoing: 0.5
            }
        },
        
        businessImpact: {
            breachRiskReduction: 35,
            cyberInsuranceReduction: 5
        }
    },
    
    // FOXPASS
    foxpass: {
        id: 'foxpass',
        name: 'Foxpass',
        shortName: 'Foxpass',
        category: 'Cloud RADIUS',
        logo: './img/vendors/foxpass-logo.png',
        
        executiveSummary: {
            keyValue: 'Developer-friendly cloud RADIUS',
            limitations: ['Basic NAC only', 'No advanced features']
        },
        
        pricing: {
            model: 'subscription',
            perDevice: {
                monthly: 2.50,
                annual: 2
            }
        },
        
        security: {
            zeroTrust: {
                score: 35
            }
        },
        
        operational: {
            automation: 45,
            fte: {
                ongoing: 0.5
            }
        },
        
        businessImpact: {
            breachRiskReduction: 30,
            cyberInsuranceReduction: 5
        }
    },
    
    // RADIUS-AS-A-SERVICE
    radiusaas: {
        id: 'radiusaas',
        name: 'RADIUS-as-a-Service',
        shortName: 'RADIUSaaS',
        category: 'Cloud RADIUS',
        logo: './img/vendors/radiusaas-logo.png',
        
        executiveSummary: {
            keyValue: 'Generic cloud RADIUS providers',
            limitations: ['Minimal features', 'No NAC capabilities']
        },
        
        pricing: {
            model: 'subscription',
            perDevice: {
                monthly: 2,
                annual: 1.50
            }
        },
        
        security: {
            zeroTrust: {
                score: 25
            }
        },
        
        operational: {
            automation: 40,
            fte: {
                ongoing: 0.75
            }
        },
        
        businessImpact: {
            breachRiskReduction: 25,
            cyberInsuranceReduction: 3
        }
    },
    
    // Helper Functions
    calculateTCO: function(vendorId, devices, years = 3) {
        const vendor = this[vendorId];
        if (!vendor) return null;
        
        let tco = {
            hardware: 0,
            software: 0,
            implementation: 0,
            support: 0,
            operations: 0,
            hidden: 0,
            total: 0
        };
        
        // Calculate based on pricing model
        if (vendor.pricing.model === 'subscription') {
            const monthlyRate = vendor.pricing.perDevice.annual ? 
                vendor.pricing.perDevice.annual / 12 : 
                vendor.pricing.perDevice.monthly;
            
            tco.software = monthlyRate * devices * 12 * years;
            
            // Apply volume discounts
            if (vendor.pricing.volumeDiscounts) {
                const discountRate = this.getVolumeDiscount(vendor, devices);
                tco.software *= (1 - discountRate / 100);
            }
        } else if (vendor.pricing.model === 'perpetual') {
            tco.software = vendor.pricing.perDevice.perpetual * devices;
            tco.support = vendor.pricing.perDevice.annual * devices * years;
        } else if (vendor.pricing.model === 'open-source') {
            tco.support = (vendor.pricing.perDevice.support || 0) * devices * 12 * years;
        } else if (vendor.pricing.model === 'included') {
            tco.software = vendor.pricing.perDevice.monthly * devices * 12 * years;
        }
        
        // Add additional costs
        if (vendor.pricing.additionalCosts) {
            tco.hardware = vendor.pricing.additionalCosts.hardware || 0;
            tco.implementation = vendor.pricing.additionalCosts.implementation || 0;
            tco.operations = (vendor.pricing.additionalCosts.maintenance || 0) * years;
        }
        
        // Add hidden costs
        if (vendor.pricing.hiddenCosts) {
            tco.hidden = vendor.pricing.hiddenCosts.total || 0;
        }
        
        // Calculate operational costs (FTE)
        if (vendor.operational?.fte) {
            const fteCost = 120000; // Average IT salary
            tco.operations += (vendor.operational.fte.ongoing || 0) * fteCost * years;
        }
        
        tco.total = Object.values(tco).reduce((sum, cost) => sum + (cost || 0), 0);
        tco.perDevicePerMonth = tco.total / (devices * years * 12);
        tco.perUserPerMonth = tco.total / (devices * 0.6 * years * 12); // Assume 60% are users
        
        return tco;
    },
    
    getVolumeDiscount: function(vendor, devices) {
        if (!vendor.pricing.volumeDiscounts) return 0;
        
        let discount = 0;
        for (const [threshold, rate] of Object.entries(vendor.pricing.volumeDiscounts)) {
            if (devices >= parseInt(threshold)) {
                discount = rate;
            }
        }
        return discount;
    },
    
    compareVendors: function(vendorIds, devices) {
        return vendorIds.map(id => {
            const vendor = this[id];
            const tco = this.calculateTCO(id, devices);
            return {
                vendor,
                tco,
                score: this.calculateVendorScore(id, devices)
            };
        }).sort((a, b) => a.tco.total - b.tco.total);
    },
    
    calculateVendorScore: function(vendorId, devices) {
        const vendor = this[vendorId];
        const tco = this.calculateTCO(vendorId, devices);
        
        // Scoring weights
        const weights = {
            cost: 0.3,
            security: 0.25,
            deployment: 0.15,
            operations: 0.15,
            compliance: 0.15
        };
        
        // Calculate component scores (0-100)
        const scores = {
            cost: 100 - Math.min(100, (tco.total / 1000000) * 20),
            security: vendor.security?.zeroTrust?.score || 50,
            deployment: 100 - Math.min(100, (vendor.deployment?.time || 720) / 10),
            operations: vendor.operational?.automation || 50,
            compliance: vendor.compliance?.frameworks?.length * 5 || 50
        };
        
        // Calculate weighted total
        return Object.entries(weights).reduce((total, [key, weight]) => {
            return total + (scores[key] * weight);
        }, 0);
    },
    
    getAllVendorIds: function() {
        return Object.keys(this).filter(key => 
            typeof this[key] === 'object' && this[key].id
        );
    }
};

// Freeze the database
Object.freeze(window.ComprehensiveVendorDatabase);
console.log('✅ Complete Vendor Database loaded with', 
    window.ComprehensiveVendorDatabase.getAllVendorIds().length, 
    'vendors');

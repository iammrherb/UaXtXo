#!/bin/bash
# stage-4-vendor-database.sh
# Purpose: Create the actual vendor database with detailed information

echo "=================================================="
echo "STAGE 4: COMPREHENSIVE VENDOR DATABASE"
echo "=================================================="

echo "→ Creating vendor database..."
cat > js/data/vendor-database.js << 'EOF'
/**
 * Comprehensive Vendor Database
 * Real market data and detailed vendor information
 */
export const vendors = {
    // ==================== PORTNOX ====================
    portnox: {
        name: "Portnox CLEAR",
        company: "Portnox",
        category: "cloud-native",
        architecture: "cloud-native",
        logo: "/img/vendors/portnox-logo.svg",
        description: "Cloud-native Zero Trust Network Access Control platform",
        marketPosition: "Leader in cloud-native NAC",
        
        deployment: {
            model: "Pure SaaS",
            time: 4, // hours
            complexity: "simple",
            requiresHardware: false,
            requiresAgents: false
        },
        
        pricing: {
            model: "per-device",
            transparent: true,
            allInclusive: true,
            
            perDevice: {
                monthly: 4.00,
                annual: 3.40,    // 15% discount
                triennial: 2.80, // 30% discount
                fiveYear: 2.40   // 40% discount
            },
            
            volumeDiscounts: {
                1000: 0.00,
                5000: 0.05,
                10000: 0.10,
                25000: 0.15,
                50000: 0.20,
                100000: 0.25
            },
            
            modules: {}, // All features included
            hidden: false
        },
        
        features: {
            core: {
                "802.1X": true,
                "MAC Authentication": true,
                "Guest Access": true,
                "BYOD Support": true,
                "Device Profiling": true,
                "Risk Assessment": true,
                "Policy Engine": true,
                "Quarantine": true
            },
            
            advanced: {
                "Zero Trust": "native",
                "AI/ML Threat Detection": true,
                "Behavioral Analytics": true,
                "Automated Response": true,
                "Cloud Security Posture": true,
                "Microsegmentation": true,
                "Continuous Verification": true
            },
            
            integration: {
                "SIEM": ["Splunk", "QRadar", "Sentinel", "Chronicle"],
                "Identity": ["AD", "Azure AD", "Okta", "Ping", "Auth0"],
                "MDM": ["Intune", "Jamf", "VMware", "MobileIron"],
                "Cloud": ["AWS", "Azure", "GCP", "Multi-cloud"],
                "API": "RESTful API with webhooks"
            }
        },
        
        security: {
            zeroTrust: {
                native: true,
                score: 98,
                implementation: "Built from ground up with Zero Trust"
            },
            
            threatDetection: {
                ai: true,
                accuracy: 99.5,
                falsePositives: 0.1,
                realTime: true
            },
            
            certifications: [
                "SOC 2 Type II",
                "ISO 27001",
                "ISO 27017",
                "ISO 27018",
                "GDPR Compliant",
                "HIPAA Compliant",
                "FedRAMP Ready"
            ],
            
            breachReduction: 0.85 // 85% reduction in breach risk
        },
        
        compliance: {
            frameworks: [
                "SOC 2", "ISO 27001", "ISO 27017", "ISO 27018",
                "HIPAA", "GDPR", "PCI DSS", "NIST 800-53",
                "NIST CSF", "FedRAMP", "CMMC", "CCPA",
                "FERPA", "GLBA", "NERC CIP", "TISAX",
                "CIS Controls", "SWIFT CSP", "UK Cyber Essentials",
                "Australia ASD", "Singapore PDPA", "Japan PIPA"
            ],
            
            automation: 95, // 95% automated compliance
            
            reporting: {
                realTime: true,
                scheduled: true,
                customizable: true,
                auditReady: true
            },
            
            industrySpecific: {
                healthcare: true,
                finance: true,
                government: true,
                education: true,
                retail: true,
                manufacturing: true
            }
        },
        
        operational: {
            fte: {
                deployment: 0.1,  // 0.1 FTE for deployment
                ongoing: 0.25,    // 0.25 FTE ongoing
                scaling: 0        // No additional FTE for scaling
            },
            
            automation: 95, // 95% automated operations
            
            maintenance: {
                automated: true,
                windows: { required: false },
                updates: "Continuous, zero-downtime",
                patching: { automated: true }
            },
            
            training: {
                admin: { hours: 2, cost: 0 }, // Self-paced online
                endUser: { required: false }
            },
            
            uptime: 99.99 // SLA
        },
        
        support: {
            included: true,
            tiers: {
                standard: { included: true, sla: "24x7" },
                premium: { included: true, sla: "15-min response" }
            },
            
            channels: ["Portal", "Email", "Phone", "Chat"],
            languages: ["English", "Spanish", "French", "German", "Japanese"]
        },
        
        technicalSpecs: {
            maxDevices: "unlimited",
            performance: { linear: true },
            
            requirements: {
                bandwidth: "Minimal",
                latency: "Not sensitive",
                infrastructure: "None"
            },
            
            integration: {
                methods: ["API", "Webhook", "SAML", "SCIM", "Syslog"],
                preBuilt: 50 // Number of pre-built integrations
            }
        },
        
        hiddenCosts: {} // No hidden costs
    },
    
    // ==================== CISCO ISE ====================
    cisco: {
        name: "Cisco ISE",
        company: "Cisco Systems",
        category: "legacy-enterprise",
        architecture: "on-premise",
        logo: "/img/vendors/cisco-logo.svg",
        description: "Enterprise-grade Network Access Control",
        marketPosition: "Legacy market leader",
        
        deployment: {
            model: "On-premise appliances",
            time: 2160, // 90 days
            complexity: "very complex",
            requiresHardware: true,
            requiresAgents: true
        },
        
        pricing: {
            model: "perpetual",
            transparent: false,
            allInclusive: false,
            
            perpetual: {
                base: 295,    // Per device base license
                plus: 495,    // Per device plus license
                apex: 695,    // Per device apex license (required for full features)
                deviceAdmin: 125 // Additional per device
            },
            
            modules: {
                pxGrid: { cost: 50000, required: true },
                stealthwatch: { cost: 75000, required: false },
                trustSec: { cost: 35000, required: false },
                anyConnect: { cost: 45, required: true } // Per user
            },
            
            hidden: true
        },
        
        hardware: {
            appliances: {
                "SNS-3515": { 
                    cost: 28000, 
                    capacity: 2000,
                    support: 4200 // Annual
                },
                "SNS-3595": { 
                    cost: 55000, 
                    capacity: 5000,
                    support: 8250
                },
                "SNS-3615": { 
                    cost: 95000, 
                    capacity: 10000,
                    support: 14250
                },
                "SNS-3655": { 
                    cost: 145000, 
                    capacity: 20000,
                    support: 21750
                }
            },
            
            redundancy: { required: true, factor: 2 },
            
            infrastructure: {
                loadBalancer: { cost: 45000, required: true },
                certificateAuthority: { cost: 25000, required: true }
            }
        },
        
        implementation: {
            professionalServices: {
                required: true,
                tiers: {
                    small: { maxDevices: 1000, cost: 50000 },
                    medium: { maxDevices: 5000, cost: 120000 },
                    large: { maxDevices: 20000, cost: 250000 },
                    xlarge: { maxDevices: 100000, cost: 500000 }
                }
            },
            
            phases: {
                assessment: { weeks: 2, cost: 25000 },
                design: { weeks: 3, cost: 35000 },
                deployment: { weeks: 8, cost: "included" },
                testing: { weeks: 2, cost: 15000 },
                migration: { weeks: 4, cost: 40000 }
            }
        },
        
        features: {
            core: {
                "802.1X": true,
                "MAC Authentication": true,
                "Guest Access": true,
                "BYOD Support": true,
                "Device Profiling": true,
                "Risk Assessment": "basic",
                "Policy Engine": true,
                "Quarantine": true
            },
            
            advanced: {
                "Zero Trust": "retrofitted",
                "AI/ML Threat Detection": false,
                "Behavioral Analytics": "basic",
                "Automated Response": "limited",
                "Cloud Security Posture": false,
                "Microsegmentation": true,
                "Continuous Verification": "limited"
            }
        },
        
        security: {
            zeroTrust: {
                native: false,
                score: 65,
                implementation: "Retrofitted through TrustSec"
            },
            
            threatDetection: {
                ai: false,
                accuracy: 85,
                falsePositives: 5,
                realTime: "near real-time"
            },
            
            certifications: [
                "Common Criteria",
                "FIPS 140-2",
                "IPv6 Ready"
            ],
            
            breachReduction: 0.60
        },
        
        compliance: {
            frameworks: [
                "PCI DSS", "HIPAA", "SOC 2",
                "NIST 800-53", "ISO 27001"
            ],
            
            automation: 30,
            
            reporting: {
                realTime: false,
                scheduled: true,
                customizable: "limited",
                auditReady: false
            }
        },
        
        operational: {
            fte: {
                deployment: 2.0,
                ongoing: 2.5,
                scaling: 0.5
            },
            
            automation: 25,
            
            maintenance: {
                automated: false,
                windows: {
                    required: true,
                    frequency: 12, // per year
                    duration: 4    // hours each
                },
                updates: "Quarterly with downtime",
                patching: {
                    automated: false,
                    effort: 8 // hours per patch
                }
            },
            
            training: {
                admin: { 
                    hours: 80, 
                    cost: 4995,
                    courses: ["SISE", "SISAS"]
                },
                certification: {
                    required: true,
                    cost: 15000,
                    duration: "6 months"
                }
            },
            
            uptime: 99.5
        },
        
        support: {
            included: false,
            annual: {
                smartNet: { percentage: 0.18 },
                solutionSupport: { percentage: 0.28, required: true }
            }
        },
        
        technicalSpecs: {
            maxDevices: 500000, // With proper architecture
            performance: { linear: false, degradation: "significant at scale" },
            
            requirements: {
                bandwidth: "High",
                latency: "Sensitive (<5ms)",
                infrastructure: "Extensive"
            }
        },
        
        hiddenCosts: {
            networkUpgrades: 75000,
            certificateInfrastructure: 25000,
            consulting: { 
                required: true,
                dailyRate: 2500,
                estimatedDays: 40
            },
            downtime: {
                annualHours: 48,
                impactPerHour: 10000
            },
            integrationIssues: 15000, // Per integration
            performanceTuning: 40000,
            troubleshooting: 75000
        }
    },
    
    // ==================== ARUBA CLEARPASS ====================
    aruba: {
        name: "Aruba ClearPass",
        company: "HPE Aruba",
        category: "legacy-enterprise",
        architecture: "on-premise",
        logo: "/img/vendors/aruba-logo.svg",
        description: "Enterprise Network Access Control and Policy Management",
        marketPosition: "Strong in wireless environments",
        
        deployment: {
            model: "On-premise/Virtual appliances",
            time: 1440, // 60 days
            complexity: "complex",
            requiresHardware: true,
            requiresAgents: false
        },
        
        pricing: {
            model: "perpetual",
            transparent: "medium",
            allInclusive: false,
            
            modules: {
                base: { perDevice: 225, name: "Platform" },
                onboard: { perDevice: 125, name: "Onboard", required: true },
                guest: { perDevice: 95, name: "Guest" },
                onguard: { perDevice: 175, name: "OnGuard", required: true },
                insight: { perDevice: 195, name: "Insight" }
            },
            
            totalPerDevice: 620 // For typical deployment
        },
        
        hardware: {
            appliances: {
                "C1000": { cost: 8000, capacity: 1000, virtual: true },
                "CP-HW-5K": { cost: 35000, capacity: 5000 },
                "CP-HW-10K": { cost: 55000, capacity: 10000 },
                "CP-HW-25K": { cost: 85000, capacity: 25000 }
            },
            
            redundancy: { required: true, factor: 2 }
        },
        
        implementation: {
            professionalServices: {
                required: true,
                tiers: {
                    quickStart: { maxDevices: 1000, cost: 15000, weeks: 2 },
                    standard: { maxDevices: 5000, cost: 45000, weeks: 6 },
                    advanced: { maxDevices: 25000, cost: 95000, weeks: 10 },
                    enterprise: { maxDevices: 100000, cost: 150000, weeks: 16 }
                }
            }
        },

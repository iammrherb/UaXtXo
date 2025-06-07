// Comprehensive Risk and Security Database
window.RiskSecurityDatabase = {
    // Threat Landscape
    threats: {
        ransomware: {
            name: 'Ransomware',
            probability: 0.35,
            impact: 'Severe',
            avgCost: 4620000,
            recoveryTime: 23, // days
            trends: 'Increasing 150% YoY',
            
            attackVectors: [
                'Phishing emails',
                'RDP compromise',
                'Software vulnerabilities',
                'Supply chain',
                'Insider threats'
            ],
            
            nacMitigation: {
                portnox: {
                    effectiveness: 0.92,
                    controls: [
                        'Zero Trust prevents lateral movement',
                        'Continuous device monitoring',
                        'Automated isolation',
                        'Behavioral anomaly detection',
                        'Real-time threat response'
                    ]
                },
                traditional: {
                    effectiveness: 0.45,
                    controls: [
                        'Basic network segmentation',
                        'Static access controls',
                        'Manual response required',
                        'Limited visibility'
                    ]
                }
            }
        },
        
        dataBreaches: {
            name: 'Data Breaches',
            probability: 0.28,
            impact: 'Severe',
            avgCost: 4350000,
            recordCost: 164,
            trends: 'Stable but costly',
            
            types: {
                malicious: 0.52,
                humanError: 0.23,
                systemGlitch: 0.25
            },
            
            nacMitigation: {
                portnox: {
                    effectiveness: 0.88,
                    controls: [
                        'Microsegmentation',
                        'Privileged access management',
                        'Data classification enforcement',
                        'Encryption enforcement',
                        'Access logging and monitoring'
                    ]
                }
            }
        },
        
        insiderThreats: {
            name: 'Insider Threats',
            probability: 0.34,
            impact: 'High',
            avgCost: 2790000,
            detectionTime: 77, // days
            
            types: {
                malicious: 0.23,
                negligent: 0.62,
                compromised: 0.15
            },
            
            nacMitigation: {
                portnox: {
                    effectiveness: 0.85,
                    controls: [
                        'User behavior analytics',
                        'Anomaly detection',
                        'Privileged access monitoring',
                        'Session recording',
                        'Risk-based access'
                    ]
                }
            }
        },
        
        supplyChain: {
            name: 'Supply Chain Attacks',
            probability: 0.17,
            impact: 'Critical',
            avgCost: 7350000,
            affectedOrgs: 0.42, // percentage
            
            nacMitigation: {
                portnox: {
                    effectiveness: 0.78,
                    controls: [
                        'Vendor device isolation',
                        'Third-party access control',
                        'Continuous trust verification',
                        'Limited privilege enforcement',
                        'Audit trail maintenance'
                    ]
                }
            }
        },
        
        zeroDay: {
            name: 'Zero-Day Exploits',
            probability: 0.12,
            impact: 'Critical',
            avgCost: 3860000,
            detectionTime: 280, // days average
            
            nacMitigation: {
                portnox: {
                    effectiveness: 0.70,
                    controls: [
                        'Behavioral analysis',
                        'Anomaly detection',
                        'Rapid isolation',
                        'Compensating controls',
                        'Defense in depth'
                    ]
                }
            }
        }
    },
    
    // Security Metrics
    metrics: {
        MTTD: { // Mean Time to Detect
            portnox: 5, // minutes
            cisco: 240,
            aruba: 180,
            industry: 280
        },
        
        MTTR: { // Mean Time to Respond
            portnox: 15, // minutes
            cisco: 480,
            aruba: 360,
            industry: 540
        },
        
        MTTC: { // Mean Time to Contain
            portnox: 30, // minutes
            cisco: 720,
            aruba: 600,
            industry: 960
        },
        
        falsePositiveRate: {
            portnox: 0.001, // 0.1%
            cisco: 0.15,
            aruba: 0.18,
            industry: 0.22
        },
        
        detectionAccuracy: {
            portnox: 0.995,
            cisco: 0.85,
            aruba: 0.82,
            industry: 0.78
        }
    },
    
    // Zero Trust Maturity Model
    zeroTrustMaturity: {
        levels: {
            0: { name: 'Traditional', description: 'Perimeter-based security' },
            1: { name: 'Initial', description: 'Some Zero Trust concepts' },
            2: { name: 'Developing', description: 'Implementing Zero Trust' },
            3: { name: 'Defined', description: 'Zero Trust processes defined' },
            4: { name: 'Managed', description: 'Zero Trust measured and controlled' },
            5: { name: 'Optimized', description: 'Continuous Zero Trust improvement' }
        },
        
        pillars: {
            identity: {
                name: 'Identity',
                weight: 0.20,
                controls: [
                    'Strong authentication',
                    'Identity governance',
                    'Privileged access management',
                    'Identity analytics'
                ]
            },
            device: {
                name: 'Device',
                weight: 0.20,
                controls: [
                    'Device inventory',
                    'Device compliance',
                    'Device trust scoring',
                    'Real-time health monitoring'
                ]
            },
            network: {
                name: 'Network',
                weight: 0.20,
                controls: [
                    'Microsegmentation',
                    'Software-defined perimeter',
                    'Encrypted communications',
                    'Network analytics'
                ]
            },
            application: {
                name: 'Application',
                weight: 0.15,
                controls: [
                    'Application discovery',
                    'App-aware policies',
                    'Secure app access',
                    'Application behavior'
                ]
            },
            data: {
                name: 'Data',
                weight: 0.15,
                controls: [
                    'Data classification',
                    'Data loss prevention',
                    'Rights management',
                    'Data analytics'
                ]
            },
            visibility: {
                name: 'Visibility & Analytics',
                weight: 0.10,
                controls: [
                    'Centralized logging',
                    'Real-time analytics',
                    'Threat intelligence',
                    'Automated response'
                ]
            }
        },
        
        vendorScores: {
            portnox: {
                overall: 4.8,
                identity: 4.9,
                device: 5.0,
                network: 4.8,
                application: 4.6,
                data: 4.7,
                visibility: 4.9
            },
            cisco: {
                overall: 3.2,
                identity: 3.5,
                device: 3.8,
                network: 3.9,
                application: 2.8,
                data: 2.5,
                visibility: 2.7
            },
            aruba: {
                overall: 3.0,
                identity: 3.2,
                device: 3.5,
                network: 3.6,
                application: 2.5,
                data: 2.3,
                visibility: 2.8
            }
        }
    },
    
    // Cyber Insurance Impact
    cyberInsurance: {
        # Continuing Script 3...

        baselinePremium: 100000, // Annual for $10M coverage
        
        factors: {
            zeroTrust: {
                impact: -0.35, // 35% reduction
                requirements: [
                    'Continuous verification',
                    'Microsegmentation',
                    'MFA everywhere',
                    'Privileged access management',
                    'Encryption'
                ]
            },
            
            nacImplementation: {
                portnox: {
                    premiumReduction: 0.35,
                    coverageIncrease: 0.50,
                    deductibleReduction: 0.40,
                    benefits: [
                        'Native Zero Trust architecture',
                        'Continuous compliance monitoring',
                        'Automated incident response',
                        'Comprehensive audit trails',
                        'Real-time threat detection'
                    ]
                },
                traditional: {
                    premiumReduction: 0.10,
                    coverageIncrease: 0.15,
                    deductibleReduction: 0.05,
                    limitations: [
                        'Limited visibility',
                        'Manual processes',
                        'Delayed detection',
                        'Compliance gaps'
                    ]
                }
            },
            
            riskFactors: {
                industry: {
                    healthcare: 1.5,
                    finance: 1.4,
                    retail: 1.2,
                    manufacturing: 1.1,
                    technology: 1.0
                },
                
                size: {
                    small: 0.8,
                    medium: 1.0,
                    large: 1.3,
                    enterprise: 1.5
                },
                
                maturity: {
                    basic: 1.5,
                    developing: 1.2,
                    mature: 0.8,
                    advanced: 0.6
                }
            }
        },
        
        claimScenarios: {
            ransomware: {
                probability: 0.35,
                avgClaim: 1850000,
                nacImpact: {
                    portnox: -0.85, // 85% reduction
                    traditional: -0.30
                }
            },
            dataBrech: {
                probability: 0.28,
                avgClaim: 1450000,
                nacImpact: {
                    portnox: -0.80,
                    traditional: -0.25
                }
            },
            businessInterruption: {
                probability: 0.42,
                avgClaim: 980000,
                nacImpact: {
                    portnox: -0.75,
                    traditional: -0.20
                }
            }
        }
    },
    
    // Incident Response
    incidentResponse: {
        phases: {
            preparation: {
                portnox: {
                    automated: true,
                    capabilities: [
                        'Predefined playbooks',
                        'Automated workflows',
                        'Role assignments',
                        'Communication templates',
                        'Integration ready'
                    ]
                },
                traditional: {
                    automated: false,
                    requirements: [
                        'Manual documentation',
                        'Training required',
                        'Complex procedures',
                        'Limited integration'
                    ]
                }
            },
            
            detection: {
                portnox: {
                    time: '< 5 minutes',
                    methods: [
                        'AI/ML behavioral analysis',
                        'Real-time monitoring',
                        'Threat intelligence feeds',
                        'User behavior analytics',
                        'Automated correlation'
                    ]
                },
                traditional: {
                    time: '4+ hours',
                    methods: [
                        'Log review',
                        'Manual analysis',
                        'Alert fatigue',
                        'Limited visibility'
                    ]
                }
            },
            
            containment: {
                portnox: {
                    time: '< 15 minutes',
                    actions: [
                        'Automatic quarantine',
                        'Network isolation',
                        'Access revocation',
                        'Lateral movement prevention',
                        'Evidence preservation'
                    ]
                },
                traditional: {
                    time: '8+ hours',
                    actions: [
                        'Manual intervention',
                        'Physical access required',
                        'Complex procedures',
                        'Risk of spread'
                    ]
                }
            },
            
            eradication: {
                portnox: {
                    features: [
                        'Root cause analysis',
                        'Automated remediation',
                        'Patch verification',
                        'Configuration restore',
                        'Continuous monitoring'
                    ]
                }
            },
            
            recovery: {
                portnox: {
                    features: [
                        'Gradual restoration',
                        'Verification testing',
                        'Performance monitoring',
                        'User communication',
                        'Lessons learned'
                    ]
                }
            }
        },
        
        metrics: {
            portnox: {
                mttd: 5, // minutes
                mttr: 15,
                mttc: 30,
                mttrec: 120,
                falsePositives: 0.1 // %
            },
            industry: {
                mttd: 280,
                mttr: 540,
                mttc: 960,
                mttrec: 4320,
                falsePositives: 22
            }
        }
    }
};

// Risk calculation methods
window.RiskSecurityDatabase.calculateRisk = function(vendorId, config) {
    const industry = config.industry || 'technology';
    const devices = config.devices || 2500;
    const vendor = window.VendorDatabase[vendorId];
    
    let riskScore = 100; // Start at maximum risk
    
    // Apply vendor security controls
    if (vendor.security) {
        riskScore *= (1 - (vendor.security.zeroTrust.score / 100 * 0.4));
        riskScore *= (1 - (vendor.security.accuracy / 100 * 0.3));
        riskScore *= (1 - (vendor.features.automation / 100 * 0.2));
        riskScore *= (1 - (vendor.operational.uptime / 100 * 0.1));
    }
    
    // Industry risk factors
    const industryRisk = {
        healthcare: 1.5,
        finance: 1.4,
        government: 1.3,
        retail: 1.2,
        technology: 1.0
    };
    
    riskScore *= industryRisk[industry] || 1.0;
    
    // Size risk factors
    if (devices > 10000) riskScore *= 1.3;
    else if (devices > 5000) riskScore *= 1.2;
    else if (devices > 1000) riskScore *= 1.1;
    
    return {
        score: Math.round(riskScore),
        level: riskScore < 20 ? 'Low' : 
               riskScore < 40 ? 'Medium' : 
               riskScore < 60 ? 'High' : 'Critical',
        factors: this.getRiskFactors(vendor, industry)
    };
};

window.RiskSecurityDatabase.getRiskFactors = function(vendor, industry) {
    const factors = [];
    
    // Positive factors (risk reduction)
    if (vendor.security?.zeroTrust?.native) {
        factors.push({
            factor: 'Native Zero Trust',
            impact: -40,
            description: 'Significantly reduces attack surface'
        });
    }
    
    if (vendor.security?.aiThreatDetection) {
        factors.push({
            factor: 'AI Threat Detection',
            impact: -25,
            description: 'Proactive threat identification'
        });
    }
    
    if (vendor.features?.automation > 80) {
        factors.push({
            factor: 'High Automation',
            impact: -20,
            description: 'Reduces human error'
        });
    }
    
    // Negative factors (risk increase)
    if (!vendor.features?.cloudNative) {
        factors.push({
            factor: 'On-Premise Infrastructure',
            impact: +30,
            description: 'Single points of failure'
        });
    }
    
    if (vendor.operational?.fteRequired > 2) {
        factors.push({
            factor: 'High Operational Complexity',
            impact: +25,
            description: 'Increased human error risk'
        });
    }
    
    return factors;
};

window.RiskSecurityDatabase.calculateInsuranceImpact = function(vendorId, config) {
    const vendor = window.VendorDatabase[vendorId];
    const baseline = this.cyberInsurance.baselinePremium;
    const industry = config.industry || 'technology';
    const devices = config.devices || 2500;
    
    let premiumMultiplier = 1.0;
    
    // Vendor-specific impact
    if (vendorId === 'portnox') {
        premiumMultiplier *= (1 - this.cyberInsurance.factors.nacImplementation.portnox.premiumReduction);
    } else {
        premiumMultiplier *= (1 - this.cyberInsurance.factors.nacImplementation.traditional.premiumReduction);
    }
    
    // Industry factors
    premiumMultiplier *= this.cyberInsurance.factors.riskFactors.industry[industry] || 1.0;
    
    // Size factors
    let sizeFactor = 'medium';
    if (devices < 500) sizeFactor = 'small';
    else if (devices > 5000) sizeFactor = 'large';
    else if (devices > 10000) sizeFactor = 'enterprise';
    
    premiumMultiplier *= this.cyberInsurance.factors.riskFactors.size[sizeFactor];
    
    const premium = baseline * premiumMultiplier;
    const savings = baseline - premium;
    
    return {
        basePremium: baseline,
        adjustedPremium: Math.round(premium),
        annualSavings: Math.round(savings),
        premiumReduction: Math.round((1 - premiumMultiplier) * 100),
        coverageIncrease: vendorId === 'portnox' ? 50 : 15,
        deductibleReduction: vendorId === 'portnox' ? 40 : 5,
        benefits: vendorId === 'portnox' ? 
            this.cyberInsurance.factors.nacImplementation.portnox.benefits :
            ['Basic security controls', 'Standard monitoring']
    };
};

console.log('[RiskSecurityDatabase] Loaded comprehensive risk and security data');

#!/bin/bash

# ================================================================================
# PORTNOX TCO PLATFORM - SCRIPT 3: RISK/SECURITY & UI COMPONENTS
# ================================================================================

set -e

echo "╔══════════════════════════════════════════════════════════════════════════════╗"
echo "║         Script 3: Risk/Security Analysis & Vendor Selection UI               ║"
echo "╚══════════════════════════════════════════════════════════════════════════════╝"

# Create Risk and Security Database
cat > js/data/risk-security-database.js << 'EOF'
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
EOF

# Create enhanced UI components
cat > js/components/vendor-selection-ui.js << 'EOF'
// Enhanced Vendor Selection UI with Pills
window.VendorSelectionUI = {
    selectedVendors: ['portnox'], // Portnox always selected
    maxVendors: 5,
    
    render() {
        const vendors = Object.values(window.VendorDatabase)
            .filter(v => v.id && typeof v === 'object');
        
        return `
            <div class="vendor-selection-container">
                <div class="vendor-selection-header">
                    <h2>Select NAC Vendors to Compare</h2>
                    <p class="selection-subtitle">Choose up to ${this.maxVendors} vendors for comprehensive analysis</p>
                    <div class="selection-info">
                        <span class="selected-count">${this.selectedVendors.length} selected</span>
                        <button class="btn btn-secondary btn-sm" onclick="VendorSelectionUI.clearSelection()">
                            <i class="fas fa-times"></i> Clear All
                        </button>
                    </div>
                </div>
                
                <div class="vendor-categories">
                    ${this.renderVendorCategories(vendors)}
                </div>
                
                <div class="selected-vendors-pills">
                    <h3>Selected Vendors</h3>
                    <div class="vendor-pills">
                        ${this.renderSelectedPills()}
                    </div>
                </div>
            </div>
        `;
    },
    
    renderVendorCategories(vendors) {
        const categories = {
            'Cloud-Native Zero Trust': vendors.filter(v => v.category.includes('Cloud-Native')),
            'Legacy Enterprise': vendors.filter(v => v.category.includes('Legacy')),
            'Cloud Services': vendors.filter(v => v.category.includes('Cloud') && !v.category.includes('Cloud-Native')),
            'Specialized': vendors.filter(v => 
                !v.category.includes('Cloud-Native') && 
                !v.category.includes('Legacy') && 
                !v.category.includes('Cloud')
            )
        };
        
        return Object.entries(categories).map(([category, vendorList]) => {
            if (vendorList.length === 0) return '';
            
            return `
                <div class="vendor-category">
                    <h3 class="category-title">${category}</h3>
                    <div class="vendor-grid">
                        ${vendorList.map(vendor => this.renderVendorCard(vendor)).join('')}
                    </div>
                </div>
            `;
        }).join('');
    },
    
    renderVendorCard(vendor) {
        const isSelected = this.selectedVendors.includes(vendor.id);
        const isPortnox = vendor.id === 'portnox';
        const isDisabled = !isSelected && this.selectedVendors.length >= this.maxVendors;
        
        return `
            <div class="vendor-selection-card ${isSelected ? 'selected' : ''} ${isPortnox ? 'featured' : ''} ${isDisabled ? 'disabled' : ''}"
                 data-vendor="${vendor.id}"
                 onclick="VendorSelectionUI.toggleVendor('${vendor.id}')">
                
                ${isPortnox ? '<div class="recommended-badge">Recommended</div>' : ''}
                
                <div class="vendor-card-content">
                    <div class="vendor-logo">
                        <img src="${window.getVendorLogo(vendor.id)}" 
                             alt="${vendor.name}"
                             onerror="this.src='./img/vendors/default-logo.png'">
                    </div>
                    
                    <div class="vendor-info">
                        <h4 class="vendor-name">${vendor.name}</h4>
                        <p class="vendor-category">${vendor.category}</p>
                        
                        <div class="vendor-highlights">
                            ${this.getVendorHighlights(vendor).map(h => 
                                `<span class="highlight-badge ${h.type}">${h.text}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="vendor-metrics">
                        <div class="metric">
                            <span class="metric-value">${vendor.features?.zeroTrust?.score || 'N/A'}</span>
                            <span class="metric-label">ZT Score</span>
                        </div>
                        <div class="metric">
                            <span class="metric-value">${vendor.deployment?.time < 24 ? 
                                vendor.deployment.time + 'h' : 
                                Math.round(vendor.deployment.time/24) + 'd'}</span>
                            <span class="metric-label">Deploy</span>
                        </div>
                        <div class="metric">
                            <span class="metric-value">${vendor.operational?.fteRequired || 'N/A'}</span>
                            <span class="metric-label">FTE</span>
                        </div>
                    </div>
                </div>
                
                <div class="selection-indicator">
                    ${isSelected ? '<i class="fas fa-check-circle"></i>' : '<i class="far fa-circle"></i>'}
                </div>
            </div>
        `;
    },
    
    renderSelectedPills() {
        if (this.selectedVendors.length === 0) {
            return '<p class="no-selection">No vendors selected</p>';
        }
        
        return this.selectedVendors.map(vendorId => {
            const vendor = window.VendorDatabase[vendorId];
            if (!vendor) return '';
            
            const isPortnox = vendorId === 'portnox';
            
            return `
                <div class="vendor-pill ${isPortnox ? 'portnox-pill' : ''}">
                    <img src="${window.getVendorLogo(vendor.id)}" 
                         alt="${vendor.name}" class="pill-logo">
                    <span class="pill-name">${vendor.name}</span>
                    ${!isPortnox ? `
                        <button class="pill-remove" onclick="VendorSelectionUI.removeVendor('${vendorId}')">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : '<span class="pill-locked"><i class="fas fa-lock"></i></span>'}
                </div>
            `;
        }).join('');
    },
    
    getVendorHighlights(vendor) {
        const highlights = [];
        
        if (vendor.features?.cloudNative) {
            highlights.push({ text: 'Cloud Native', type: 'success' });
        }
        if (vendor.features?.zeroTrust?.native) {
            highlights.push({ text: 'Zero Trust', type: 'primary' });
        }
        if (vendor.deployment?.time <= 24) {
            highlights.push({ text: 'Quick Deploy', type: 'info' });
        }
        if (vendor.operational?.fteRequired <= 0.5) {
            highlights.push({ text: 'Low Maintenance', type: 'success' });
        }
        if (vendor.costs?.hidden === 0) {
            highlights.push({ text: 'No Hidden Costs', type: 'success' });
        }
        
        return highlights.slice(0, 3); // Max 3 highlights
    },
    
    toggleVendor(vendorId) {
        if (vendorId === 'portnox') return; // Can't deselect Portnox
        
        const index = this.selectedVendors.indexOf(vendorId);
        
        if (index > -1) {
            this.selectedVendors.splice(index, 1);
        } else if (this.selectedVendors.length < this.maxVendors) {
            this.selectedVendors.push(vendorId);
        } else {
            this.showMaxVendorsAlert();
            return;
        }
        
        this.updateUI();
        this.notifyChange();
    },
    
    removeVendor(vendorId) {
        if (vendorId === 'portnox') return;
        
        const index = this.selectedVendors.indexOf(vendorId);
        if (index > -1) {
            this.selectedVendors.splice(index, 1);
            this.updateUI();
            this.notifyChange();
        }
    },
    
    clearSelection() {
        this.selectedVendors = ['portnox']; // Keep Portnox
        this.updateUI();
        this.notifyChange();
    },
    
    updateUI() {
        // Re-render the vendor selection
        const container = document.querySelector('.vendor-selection-container');
        if (container) {
            container.outerHTML = this.render();
        }
    },
    
    notifyChange() {
        // Notify the main application of vendor selection change
        if (window.app && window.app.onVendorSelectionChange) {
            window.app.onVendorSelectionChange(this.selectedVendors);
        }
    },
    
    showMaxVendorsAlert() {
        // Show alert that max vendors reached
        const alert = document.createElement('div');
        alert.className = 'alert alert-warning alert-dismissible';
        alert.innerHTML = `
            <strong>Maximum vendors selected!</strong> 
            You can compare up to ${this.maxVendors} vendors at a time. 
            Remove a vendor to add another.
            <button class="alert-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.querySelector('.vendor-selection-header').appendChild(alert);
        
        setTimeout(() => alert.remove(), 5000);
    },
    
    getSelectedVendors() {
        return this.selectedVendors;
    },
    
    setSelectedVendors(vendors) {
        // Always include Portnox
        if (!vendors.includes('portnox')) {
            vendors.unshift('portnox');
        }
        
        this.selectedVendors = vendors.slice(0, this.maxVendors);
        this.updateUI();
    }
};

// Initialize when ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('[VendorSelectionUI] Initialized with enhanced pill interface');
});
EOF

# Create vendor selection styles
cat > css/components/vendor-selection.css << 'EOF'
/* Enhanced Vendor Selection Styles */

.vendor-selection-container {
    padding: 2rem;
    background: var(--bg-main);
}

.vendor-selection-header {
    text-align: center;
    margin-bottom: 2rem;
}

.vendor-selection-header h2 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.selection-subtitle {
    color: var(--text-secondary);
    font-size: 1.125rem;
    margin-bottom: 1rem;
}

.selection-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.selected-count {
    background: var(--portnox-primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
}

/* Vendor Categories */
.vendor-categories {
    margin-bottom: 3rem;
}

.vendor-category {
    margin-bottom: 2.5rem;
}

.category-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--border-color);
}

/* Vendor Grid */
.vendor-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

/* Vendor Selection Card */
.vendor-selection-card {
    background: var(--bg-card);
    border: 2px solid var(--border-color);
    border-radius: 12px;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.vendor-selection-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--portnox-primary);
}

.vendor-selection-card.selected {
    border-color: var(--portnox-primary);
    background: var(--bg-accent);
}

.vendor-selection-card.featured {
    border-color: var(--portnox-primary);
    box-shadow: 0 0 0 3px rgba(0, 212, 170, 0.1);
}

.vendor-selection-card.disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.vendor-selection-card.disabled:hover {
    transform: none;
    box-shadow: none;
}

/* Recommended Badge */
.recommended-badge {
    position: absolute;
    top: 0;
    right: 0;
    background: var(--portnox-primary);
    color: white;
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    border-bottom-left-radius: 12px;
}

/* Vendor Card Content */
.vendor-card-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.vendor-logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.vendor-logo img {
    max-height: 100%;
    max-width: 180px;
    object-fit: contain;
}

.vendor-info {
    flex: 1;
}

.vendor-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
}

.vendor-category {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 0.75rem;
}

/* Vendor Highlights */
.vendor-highlights {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.highlight-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-weight: 600;
}

.highlight-badge.primary {
    background: rgba(0, 212, 170, 0.1);
    color: var(--portnox-primary);
}

.highlight-badge.success {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success);
}

.highlight-badge.info {
    background: rgba(59, 130, 246, 0.1);
    color: var(--info);
}

/* Vendor Metrics */
.vendor-metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
}

.vendor-metrics .metric {
    text-align: center;
}

.metric-value {
    display: block;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
}

.metric-label {
    display: block;
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

/* Selection Indicator */
.selection-indicator {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 1.5rem;
}

.selection-indicator .fa-check-circle {
    color: var(--portnox-primary);
}

.selection-indicator .fa-circle {
    color: var(--border-color);
}

/* Selected Vendors Pills */
.selected-vendors-pills {
    background: var(--bg-card);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: var(--shadow-sm);
}

.selected-vendors-pills h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1rem;
}

.vendor-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

/* Vendor Pill */
.vendor-pill {
    display: inline-flex;
    align-items: center;
    background: var(--bg-hover);
    border: 2px solid var(--border-color);
    border-radius: 24px;
    padding: 0.5rem 1rem;
    gap: 0.75rem;
    transition: all 0.2s;
}

.vendor-pill:hover {
    border-color: var(--portnox-primary);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
}

.vendor-pill.portnox-pill {
    background: var(--bg-accent);
    border-color: var(--portnox-primary);
}

.pill-logo {
    height: 24px;
    width: auto;
}

.pill-name {
    font-weight: 600;
    color: var(--text-primary);
}

.pill-remove {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.25rem;
    margin-left: 0.5rem;
    transition: color 0.2s;
}

.pill-remove:hover {
    color: var(--danger);
}

.pill-locked {
    color: var(--portnox-primary);
    margin-left: 0.5rem;
}

.no-selection {
    color: var(--text-muted);
    font-style: italic;
}

/* Alert Styles */
.alert {
    padding: 1rem 1.5rem;
    border-radius: 8px;
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.alert-warning {
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid var(--warning);
    color: var(--warning);
}

.alert-close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
    .vendor-grid {
        grid-template-columns: 1fr;
    }
    
    .vendor-metrics {
        grid-template-columns: repeat(3, 1fr);
        font-size: 0.875rem;
    }
    
    .vendor-pills {
        flex-direction: column;
    }
    
    .vendor-pill {
        width: 100%;
        justify-content: space-between;
    }
}
EOF

echo "✅ Script 3 Complete: Risk/Security database and vendor selection UI created"

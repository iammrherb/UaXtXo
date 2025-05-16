#!/bin/bash
set -e

echo "==== Portnox TCO Analyzer Integration Script v2 ===="
echo "This script will create the remaining CSS and JS files for a complete fix"

# Create directory structure with better error checking
echo "Creating directory structure..."
for dir in img/vendors js/fixes css/fixes js/modules css/modules; do
    mkdir -p "$dir"
    if [ ! -d "$dir" ]; then
        echo "Error: Failed to create directory $dir"
        exit 1
    else
        echo "✓ Created directory: $dir"
    fi
done

# Create industry compliance module JS file
echo "Creating industry compliance module..."
cat > js/modules/industry-compliance.js << 'EOF'
/**
 * Industry and Compliance Framework Module
 */
const IndustryComplianceModule = (function() {
    // Industry data with compliance mappings
    const industryData = {
        healthcare: {
            name: "Healthcare",
            icon: "fas fa-hospital",
            description: "Healthcare organizations face unique challenges in securing medical devices, patient data, and maintaining compliance with strict regulations like HIPAA while ensuring easy access for clinical staff.",
            complianceFrameworks: ["hipaa", "hitech", "gdpr", "pci-dss"],
            securityFocus: ["patient data protection", "medical device security", "access control", "audit logging"],
            benchmarks: {
                breachCost: 9800000,
                avgImplementationTime: 16, // weeks
                cloudSavings: 35, // percent
                deviceProfiles: 380
            }
        },
        financial: {
            name: "Financial Services",
            icon: "fas fa-university",
            description: "Financial institutions must balance robust security with operational efficiency while managing complex regulatory requirements and protecting high-value targets from sophisticated threats.",
            complianceFrameworks: ["pci-dss", "glba", "sox", "gdpr", "nist"],
            securityFocus: ["transaction security", "fraud prevention", "data protection", "authentication"],
            benchmarks: {
                breachCost: 6080000,
                avgImplementationTime: 18, // weeks
                cloudSavings: 28, // percent
                deviceProfiles: 420
            }
        },
        education: {
            name: "Education",
            icon: "fas fa-graduation-cap",
            description: "Educational institutions manage diverse user populations and device types with seasonal enrollment fluctuations, limited budgets, and growing security requirements while maintaining an open learning environment.",
            complianceFrameworks: ["ferpa", "gdpr", "pci-dss", "cipa"],
            securityFocus: ["student data protection", "BYOD management", "research network security", "access control"],
            benchmarks: {
                breachCost: 3850000,
                avgImplementationTime: 12, // weeks
                cloudSavings: 45, // percent
                deviceProfiles: 180
            }
        },
        manufacturing: {
            name: "Manufacturing",
            icon: "fas fa-industry",
            description: "Manufacturing environments blend IT and OT systems with critical production equipment, industrial IoT devices, and strict uptime requirements requiring specialized security approaches.",
            complianceFrameworks: ["iec62443", "nist", "iso27001", "cmmc"],
            securityFocus: ["OT/IT segmentation", "production continuity", "supply chain security", "ICS protection"],
            benchmarks: {
                breachCost: 5560000,
                avgImplementationTime: 15, // weeks
                cloudSavings: 32, // percent
                deviceProfiles: 250
            }
        },
        retail: {
            name: "Retail",
            icon: "fas fa-shopping-cart",
            description: "Retail organizations balance customer experience with data protection across distributed locations, managing POS systems, guest WiFi, and seasonal staffing fluctuations with limited IT resources.",
            complianceFrameworks: ["pci-dss", "gdpr", "ccpa", "iso27001"],
            securityFocus: ["payment security", "customer data protection", "store connectivity", "IoT security"],
            benchmarks: {
                breachCost: 4240000,
                avgImplementationTime: 10, // weeks
                cloudSavings: 40, // percent
                deviceProfiles: 150
            }
        },
        government: {
            name: "Government",
            icon: "fas fa-landmark",
            description: "Government agencies manage sensitive information with strict compliance requirements, legacy systems, and complex authentication needs across multiple security domains.",
            complianceFrameworks: ["fisma", "nist800-53", "fedramp", "cmmc", "cjis"],
            securityFocus: ["classified systems protection", "citizen data security", "legacy system security", "advanced threat protection"],
            benchmarks: {
                breachCost: 5100000,
                avgImplementationTime: 24, // weeks
                cloudSavings: 22, // percent
                deviceProfiles: 420
            }
        },
        energy: {
            name: "Energy & Utilities",
            icon: "fas fa-bolt",
            description: "Energy and utility companies must protect critical infrastructure while complying with stringent regulations and securing legacy industrial control systems from nation-state threats.",
            complianceFrameworks: ["nerc-cip", "nist", "iec62443", "iso27001"],
            securityFocus: ["critical infrastructure protection", "industrial control systems", "threat intelligence", "incident response"],
            benchmarks: {
                breachCost: 5750000,
                avgImplementationTime: 20, // weeks
                cloudSavings: 28, // percent
                deviceProfiles: 320
            }
        }
    };

    // Compliance frameworks details
    const complianceFrameworks = {
        "hipaa": {
            name: "HIPAA",
            fullName: "Health Insurance Portability and Accountability Act",
            description: "Sets standards for protecting sensitive patient health information and requires appropriate safeguards to protect the privacy of personal health information.",
            nacRequirements: [
                "Technical safeguards for ePHI (45 CFR § 164.312)",
                "Unique user identification (§ 164.312(a)(2)(i))",
                "Emergency access procedures (§ 164.312(a)(2)(ii))",
                "Automatic logoff implementation (§ 164.312(a)(2)(iii))",
                "Audit controls for ePHI activity (§ 164.312(b))",
                "Person or entity authentication (§ 164.312(d))"
            ],
            penalties: {
                min: "$100 per violation",
                max: "$50,000 per violation up to $1.5 million per year",
                average: "$1.2 million per settlement"
            }
        },
        "pci-dss": {
            name: "PCI DSS",
            fullName: "Payment Card Industry Data Security Standard",
            description: "Security standards designed to ensure that all companies that accept, process, store or transmit credit card information maintain a secure environment.",
            nacRequirements: [
                "Network segmentation for cardholder data environments (Req. 1)",
                "Secure authentication including MFA (Req. 8)",
                "Access control implementation (Req. 7)",
                "Tracking and monitoring of network access (Req. 10)",
                "Regular testing of security systems (Req. 11)"
            ],
            penalties: {
                min: "$5,000 per month",
                max: "$100,000 per month",
                perRecord: "$18.50 per compromised card"
            }
        },
        "gdpr": {
            name: "GDPR",
            fullName: "General Data Protection Regulation",
            description: "Regulation on data protection and privacy for all individuals within the European Union and the European Economic Area.",
            nacRequirements: [
                "Appropriate technical measures to secure personal data (Art. 32)",
                "Strong authentication mechanisms",
                "Detailed logs of access activities",
                "Data access controls",
                "Breach notification capability"
            ],
            penalties: {
                min: "€10 million or 2% of global revenue",
                max: "€20 million or 4% of global revenue",
                average: "€1.4 million"
            }
        },
        "ferpa": {
            name: "FERPA",
            fullName: "Family Educational Rights and Privacy Act",
            description: "Federal law that protects the privacy of student education records.",
            nacRequirements: [
                "Protection of student data",
                "Separation of administrative and student networks",
                "Controlled access to education records",
                "Authentication for records access"
            ],
            penalties: {
                description: "Loss of federal funding for educational institutions"
            }
        },
        "nist": {
            name: "NIST CSF",
            fullName: "National Institute of Standards and Technology Cybersecurity Framework",
            description: "Voluntary guidance based on existing standards, guidelines, and practices for organizations to better manage and reduce cybersecurity risk.",
            nacRequirements: [
                "Identification and authentication controls (ID.AM, PR.AC)",
                "Access control policies (PR.AC)",
                "Continuous monitoring (DE.CM)",
                "Network segmentation (PR.AC-5, PR.PT-4)",
                "Least privilege implementation (PR.AC-4)"
            ],
            penalties: {
                description: "No direct penalties, but used as a baseline for other regulations"
            }
        },
        "nerc-cip": {
            name: "NERC CIP",
            fullName: "North American Electric Reliability Corporation Critical Infrastructure Protection",
            description: "Standards to ensure the security of the North American power system's cyber assets.",
            nacRequirements: [
                "Electronic Security Perimeter establishment (CIP-005)",
                "Systems Security Management (CIP-007)",
                "Access Management (CIP-004)",
                "Protection of critical cyber assets",
                "Change management (CIP-010)"
            ],
            penalties: {
                min: "$1,000 per day per violation",
                max: "$1,000,000 per day per violation",
                description: "Varies based on violation severity, risk factor, and violation time"
            }
        }
    };

    // Function to get all industry data
    function getAllIndustryData() {
        return {...industryData};
    }

    // Function to get industry data by industry
    function getIndustryData(industry) {
        return industryData[industry] || null;
    }

    // Function to get compliance framework details
    function getComplianceFramework(framework) {
        return complianceFrameworks[framework] || null;
    }

    // Function to get compliance frameworks for an industry
    function getComplianceFrameworksForIndustry(industry) {
        if (!industryData[industry]) return [];
        
        return industryData[industry].complianceFrameworks.map(framework => {
            return {
                id: framework,
                ...complianceFrameworks[framework]
            };
        }).filter(f => f.name); // Only return frameworks with details
    }

    // Function to get security focus areas for an industry
    function getSecurityFocusForIndustry(industry) {
        if (!industryData[industry]) return [];
        
        return industryData[industry].securityFocus;
    }

    // Generate industry-specific TCO benchmarks
    function generateIndustryBenchmarks(industry, deviceCount, yearsToProject) {
        if (!industryData[industry]) return null;
        
        const industryBenchmark = industryData[industry].benchmarks;
        const scaleFactor = Math.pow(deviceCount / 1000, 0.8); // Scale with diminishing returns
        
        return {
            onPremiseTco: {
                hardware: Math.round(125000 * scaleFactor),
                software: Math.round(100000 * scaleFactor),
                maintenance: Math.round(45000 * scaleFactor * yearsToProject),
                implementation: Math.round(90000 * scaleFactor),
                operational: Math.round(50000 * scaleFactor * yearsToProject),
                total: function() {
                    return this.hardware + this.software + this.maintenance + 
                           this.implementation + this.operational;
                }
            },
            cloudTco: {
                hardware: 0,
                software: Math.round(85000 * scaleFactor * (1 - industryBenchmark.cloudSavings/100)),
                maintenance: Math.round(10000 * scaleFactor * yearsToProject),
                implementation: Math.round(25000 * scaleFactor),
                operational: Math.round(30000 * scaleFactor * yearsToProject),
                total: function() {
                    return this.hardware + this.software + this.maintenance + 
                           this.implementation + this.operational;
                }
            },
            breachRisk: {
                annualRisk: Math.round(industryBenchmark.breachCost * 0.2 * scaleFactor / yearsToProject),
                reductionWithNac: 65, // percent
                compliancePenaltyReduction: 75 // percent
            },
            implementationTime: {
                onPremiseWeeks: industryBenchmark.avgImplementationTime,
                cloudWeeks: Math.round(industryBenchmark.avgImplementationTime * 0.3)
            }
        };
    }

    // Return public API
    return {
        getAllIndustryData,
        getIndustryData,
        getComplianceFramework,
        getComplianceFrameworksForIndustry,
        getSecurityFocusForIndustry,
        generateIndustryBenchmarks
    };
})();

// Export for browser or Node.js
if (typeof window !== 'undefined') {
    window.IndustryComplianceModule = IndustryComplianceModule;
} else if (typeof module !== 'undefined') {
    module.exports = IndustryComplianceModule;
}
EOF
echo "✓ Created industry-compliance.js module"

# Create security risk module JS file
echo "Creating security risk module..."
cat > js/modules/security-risk.js << 'EOF'
/**
 * Security Risk and Breach Impact Module
 */
const SecurityRiskModule = (function() {
    // Risk levels and definitions
    const riskLevels = {
        high: {
            label: "High",
            description: "Significant risk requiring immediate attention",
            color: "#f44336",
            score: 75
        },
        medium: {
            label: "Medium",
            description: "Moderate risk requiring attention",
            color: "#ff9800",
            score: 50
        },
        low: {
            label: "Low",
            description: "Manageable risk with proper controls",
            color: "#4caf50",
            score: 25
        }
    };

    // Risk categories and impact by security control implementation
    const riskCategories = {
        dataBreachRisk: {
            name: "Data Breach Risk",
            description: "Risk of unauthorized access to sensitive information",
            noNac: "high",
            basicNac: "medium",
            portnoxCloud: "low",
            impact: {
                financial: 0.7,
                reputation: 0.9,
                operational: 0.5,
                compliance: 0.8
            }
        },
        unauthorizedAccess: {
            name: "Unauthorized Access",
            description: "Risk of unauthorized users accessing network resources",
            noNac: "high",
            basicNac: "medium",
            portnoxCloud: "low",
            impact: {
                financial: 0.5,
                reputation: 0.4,
                operational: 0.7,
                compliance: 0.6
            }
        },
        complianceViolation: {
            name: "Compliance Violation",
            description: "Risk of failing to meet regulatory requirements",
            noNac: "high",
            basicNac: "medium",
            portnoxCloud: "low",
            impact: {
                financial: 0.8,
                reputation: 0.7,
                operational: 0.3,
                compliance: 1.0
            }
        },
        maliciousInsider: {
            name: "Malicious Insider",
            description: "Risk from insider threats and privileged user abuse",
            noNac: "medium",
            basicNac: "medium",
            portnoxCloud: "low",
            impact: {
                financial: 0.6,
                reputation: 0.7,
                operational: 0.7,
                compliance: 0.5
            }
        },
        ransomwareAttack: {
            name: "Ransomware Attack",
            description: "Risk of ransomware spreading across the network",
            noNac: "high",
            basicNac: "medium",
            portnoxCloud: "low",
            impact: {
                financial: 0.8,
                reputation: 0.6,
                operational: 0.9,
                compliance: 0.4
            }
        },
        shadowIT: {
            name: "Shadow IT",
            description: "Risk from unauthorized devices and applications",
            noNac: "high",
            basicNac: "high",
            portnoxCloud: "low",
            impact: {
                financial: 0.5,
                reputation: 0.3,
                operational: 0.7,
                compliance: 0.6
            }
        },
        outdatedDevices: {
            name: "Outdated Devices",
            description: "Risk from unpatched and vulnerable devices",
            noNac: "high",
            basicNac: "medium",
            portnoxCloud: "low",
            impact: {
                financial: 0.6,
                reputation: 0.4,
                operational: 0.8,
                compliance: 0.5
            }
        }
    };

    // Breach cost data by industry
    const breachCostData = {
        healthcare: {
            averageCost: 9800000,
            perRecord: 511,
            probability: 0.328
        },
        financial: {
            averageCost: 6080000,
            perRecord: 402,
            probability: 0.297
        },
        education: {
            averageCost: 3850000,
            perRecord: 187,
            probability: 0.246
        },
        manufacturing: {
            averageCost: 5560000,
            perRecord: 241,
            probability: 0.257
        },
        retail: {
            averageCost: 4240000,
            perRecord: 218,
            probability: 0.236
        },
        government: {
            averageCost: 5100000,
            perRecord: 272,
            probability: 0.267
        },
        energy: {
            averageCost: 5750000,
            perRecord: 280,
            probability: 0.260
        },
        default: {
            averageCost: 4350000,
            perRecord: 225,
            probability: 0.25
        }
    };

    // NAC mitigation factors
    const nacMitigationFactors = {
        portnoxCloud: {
            breachProbability: 0.75, // Reduces probability by 75%
            breachImpact: 0.65,      // Reduces impact by 65%
            detectionTime: 0.85,     // Reduces detection time by 85%
            responseTime: 0.80,      // Reduces response time by 80%
            dwell time: 0.70         // Reduces dwell time by 70%
        },
        traditional: {
            breachProbability: 0.55, // Reduces probability by 55%
            breachImpact: 0.45,      // Reduces impact by 45%
            detectionTime: 0.60,     // Reduces detection time by 60%
            responseTime: 0.55,      // Reduces response time by 55%
            dwell time: 0.50         // Reduces dwell time by 50%
        }
    };

    // Insurance premium impact data
    const insurancePremiumData = {
        baseRate: function(industry, devices) {
            const baseCosts = {
                healthcare: 35,
                financial: 40,
                retail: 25,
                education: 20,
                government: 30,
                manufacturing: 28,
                energy: 32,
                default: 30
            };
            
            // Per device rate with volume discount
            const rate = baseCosts[industry] || baseCosts.default;
            const scaleFactor = Math.pow(devices / 1000, -0.2); // Slight discount for volume
            
            return rate * scaleFactor;
        },
        
        discountFactors: {
            noNac: 1.0, // No discount
            basicNac: 0.85, // 15% discount
            portnoxCloud: 0.60 // 40% discount
        },
        
        calculatePremium: function(industry, devices, nacType) {
            const baseRate = this.baseRate(industry, devices);
            const discount = this.discountFactors[nacType] || 1.0;
            
            return Math.round(baseRate * devices * discount);
        }
    };

    // Get risk assessment data for heatmap
    function getRiskAssessmentData() {
        const result = [];
        
        Object.keys(riskCategories).forEach(key => {
            result.push({
                category: riskCategories[key].name,
                noNac: riskLevels[riskCategories[key].noNac].label,
                basicNac: riskLevels[riskCategories[key].basicNac].label,
                portnox: riskLevels[riskCategories[key].portnoxCloud].label
            });
        });
        
        return result;
    }

    // Calculate security improvement percentage
    function calculateSecurityImprovement(nacType) {
        let noNacScore = 0;
        let nacScore = 0;
        let maxPossibleScore = 0;
        
        Object.keys(riskCategories).forEach(key => {
            noNacScore += riskLevels[riskCategories[key].noNac].score;
            nacScore += riskLevels[riskCategories[key][nacType]].score;
            maxPossibleScore += riskLevels.high.score;
        });
        
        // Invert the scale since lower risk scores are better
        const noNacSecurity = maxPossibleScore - noNacScore;
        const nacSecurity = maxPossibleScore - nacScore;
        
        // Calculate percentage improvement
        return Math.round(((nacSecurity - noNacSecurity) / noNacSecurity) * 100);
    }

    // Calculate breach risk and costs
    function calculateBreachRisk(params) {
        const industry = params.industry || 'default';
        const deviceCount = params.deviceCount || 1000;
        const nacType = params.nacType || 'noNac';
        
        // Get industry breach data
        const breachData = breachCostData[industry] || breachCostData.default;
        
        // Calculate base annual risk
        const baseAnnualRisk = breachData.averageCost * breachData.probability;
        
        // Apply mitigation factor based on NAC type
        let mitigatedRisk = baseAnnualRisk;
        if (nacType === 'portnoxCloud') {
            mitigatedRisk = baseAnnualRisk * (1 - nacMitigationFactors.portnoxCloud.breachProbability);
        } else if (nacType === 'basicNac') {
            mitigatedRisk = baseAnnualRisk * (1 - nacMitigationFactors.traditional.breachProbability);
        }
        
        // Scale based on device count
        const deviceScaleFactor = Math.pow(deviceCount / 1000, 0.7);
        mitigatedRisk = mitigatedRisk * deviceScaleFactor;
        
        return {
            baseRisk: Math.round(baseAnnualRisk * deviceScaleFactor),
            mitigatedRisk: Math.round(mitigatedRisk),
            reductionAmount: Math.round((baseAnnualRisk * deviceScaleFactor) - mitigatedRisk),
            reductionPercentage: nacType === 'noNac' ? 0 : 
                Math.round(nacType === 'portnoxCloud' ? 
                    nacMitigationFactors.portnoxCloud.breachProbability * 100 : 
                    nacMitigationFactors.traditional.breachProbability * 100)
        };
    }

    // Calculate insurance premium impact
    function calculateInsurancePremium(params) {
        const industry = params.industry || 'default';
        const deviceCount = params.deviceCount || 1000;
        
        // Calculate premiums for different NAC types
        const noNacPremium = insurancePremiumData.calculatePremium(industry, deviceCount, 'noNac');
        const basicNacPremium = insurancePremiumData.calculatePremium(industry, deviceCount, 'basicNac');
        const portnoxPremium = insurancePremiumData.calculatePremium(industry, deviceCount, 'portnoxCloud');
        
        return {
            noNacPremium,
            basicNacPremium,
            portnoxPremium,
            portnoxSavings: noNacPremium - portnoxPremium,
            portnoxSavingsPercentage: Math.round((noNacPremium - portnoxPremium) / noNacPremium * 100),
            basicNacSavings: noNacPremium - basicNacPremium,
            basicNacSavingsPercentage: Math.round((noNacPremium - basicNacPremium) / noNacPremium * 100)
        };
    }

    // Return public API
    return {
        getRiskLevels: function() { return {...riskLevels}; },
        getRiskCategories: function() { return {...riskCategories}; },
        getBreachCostData: function() { return {...breachCostData}; },
        getNacMitigationFactors: function() { return {...nacMitigationFactors}; },
        getRiskAssessmentData,
        calculateSecurityImprovement,
        calculateBreachRisk,
        calculateInsurancePremium
    };
})();

// Export for browser or Node.js
if (typeof window !== 'undefined') {
    window.SecurityRiskModule = SecurityRiskModule;
} else if (typeof module !== 'undefined') {
    module.exports = SecurityRiskModule;
}
EOF
echo "✓ Created security-risk.js module"

# Create tab manager JS file
echo "Creating tab manager module..."
cat > js/fixes/tab-manager.js << 'EOF'
/**
 * Tab Manager - Handles tab switching and view management
 */
const TabManager = (function() {
    // Track current active view and panel
    let currentView = 'executive';
    let currentPanels = {};
    
    // Initialize the tab manager
    function init() {
        console.log('Initializing Tab Manager');
        
        // Set up stakeholder tab event listeners
        const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
        stakeholderTabs.forEach(tab => {
            tab.addEventListener('click', handleStakeholderTabClick);
        });
        
        // Set up results tab event listeners
        const resultsTabs = document.querySelectorAll('.results-tab');
        resultsTabs.forEach(tab => {
            tab.addEventListener('click', handleResultsTabClick);
        });
        
        // Initialize with the active view
        const activeStakeholderTab = document.querySelector('.stakeholder-tab.active');
        if (activeStakeholderTab) {
            currentView = activeStakeholderTab.getAttribute('data-view');
            activateFirstResultsTab(currentView);
        } else {
            // If no active tab, set first tab as active
            const firstTab = document.querySelector('.stakeholder-tab');
            if (firstTab) {
                firstTab.click();
            }
        }
    }
    
    // Handle stakeholder tab clicks
    function handleStakeholderTabClick(event) {
        const viewToActivate = this.getAttribute('data-view');
        console.log(`Switching to ${viewToActivate} view`);
        
        // Update current view
        currentView = viewToActivate;
        
        // Update active stakeholder tab
        document.querySelectorAll('.stakeholder-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        this.classList.add('active');
        
        // Update active view panel
        document.querySelectorAll('.view-panel').forEach(panel => {
            if (panel.getAttribute('data-view') === viewToActivate) {
                panel.classList.add('active');
                
                // Activate the first results tab if none is active
                activateFirstResultsTab(viewToActivate);
            } else {
                panel.classList.remove('active');
            }
        });
    }
    
    // Handle results tab clicks
    function handleResultsTabClick(event) {
        const panelToActivate = this.getAttribute('data-panel');
        const viewPanel = this.closest('.view-panel');
        
        if (!viewPanel) return;
        
        const view = viewPanel.getAttribute('data-view');
        console.log(`Switching to ${view} > ${panelToActivate} panel`);
        
        // Store the active panel for this view
        currentPanels[view] = panelToActivate;
        
        // Update active results tab in this view
        viewPanel.querySelectorAll('.results-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        this.classList.add('active');
        
        // Update active results panel in this view
        viewPanel.querySelectorAll('.results-panel').forEach(panel => {
            if (panel.id === panelToActivate) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }
    
    // Activate the first results tab in a view
    function activateFirstResultsTab(view) {
        const viewPanel = document.querySelector(`.view-panel[data-view="${view}"]`);
        if (!viewPanel) return;
        
        // If we have a stored panel for this view, activate it
        if (currentPanels[view]) {
            const storedPanelTab = viewPanel.querySelector(`.results-tab[data-panel="${currentPanels[view]}"]`);
            if (storedPanelTab) {
                storedPanelTab.click();
                return;
            }
        }
        
        // Otherwise, activate the first tab
        const firstTab = viewPanel.querySelector('.results-tab');
        if (firstTab) {
            firstTab.click();
        }
    }
    
    // Switch to a specific stakeholder view and panel
    function switchToView(view, panel) {
        // Activate the stakeholder tab
        const stakeholderTab = document.querySelector(`.stakeholder-tab[data-view="${view}"]`);
        if (stakeholderTab) {
            stakeholderTab.click();
            
            // If a specific panel is requested, activate it
            if (panel) {
                const viewPanel = document.querySelector(`.view-panel[data-view="${view}"]`);
                if (viewPanel) {
                    const resultsTab = viewPanel.querySelector(`.results-tab[data-panel="${panel}"]`);
                    if (resultsTab) {
                        resultsTab.click();
                    }
                }
            }
        }
    }
    
    // Get current view and panel
    function getCurrentView() {
        return {
            view: currentView,
            panel: currentPanels[currentView]
        };
    }
    
    // Return public API
    return {
        init,
        switchToView,
        getCurrentView
    };
})();

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    TabManager.init();
});

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.TabManager = TabManager;
}
EOF
echo "✓ Created tab-manager.js module"

# Create heat map fix JS
echo "Creating heatmap fix module..."
cat > js/fixes/heatmap-fix.js << 'EOF'
/**
 * Heat Map Fix Script
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Heatmap fix loaded');
    
    // Initialize risk heatmap
    const riskHeatmap = document.getElementById('risk-heatmap');
    if (riskHeatmap) {
        createRiskHeatmap(riskHeatmap);
    }
    
    // Initialize security heatmap
    const securityHeatmap = document.getElementById('security-heatmap');
    if (securityHeatmap) {
        createSecurityHeatmap(securityHeatmap);
    }
});

// Create risk heatmap
function createRiskHeatmap(container) {
    // Sample data for risk heatmap
    const riskData = [
        { category: 'Data Breach', noNac: 'High', basicNac: 'Medium', portnox: 'Low' },
        { category: 'Unauthorized Access', noNac: 'High', basicNac: 'Medium', portnox: 'Low' },
        { category: 'Compliance Violation', noNac: 'High', basicNac: 'Medium', portnox: 'Low' },
        { category: 'Internal Threat', noNac: 'Medium', basicNac: 'Medium', portnox: 'Low' },
        { category: 'External Threat', noNac: 'High', basicNac: 'Medium', portnox: 'Low' },
        { category: 'Shadow IT', noNac: 'High', basicNac: 'High', portnox: 'Low' },
        { category: 'Outdated Devices', noNac: 'High', basicNac: 'Medium', portnox: 'Low' }
    ];
    
    // Create HTML table for heatmap
    const html = `
        <div class="heatmap-table-container">
            <table class="heatmap-table">
                <thead>
                    <tr>
                        <th>Risk Category</th>
                        <th>No NAC</th>
                        <th>Basic NAC</th>
                        <th>Portnox Cloud</th>
                    </tr>
                </thead>
                <tbody>
                    ${riskData.map(item => `
                        <tr>
                            <td>${item.category}</td>
                            <td class="risk-cell risk-${item.noNac.toLowerCase()}">${item.noNac}</td>
                            <td class="risk-cell risk-${item.basicNac.toLowerCase()}">${item.basicNac}</td>
                            <td class="risk-cell risk-${item.portnox.toLowerCase()}">${item.portnox}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <div class="heatmap-legend">
            <div class="legend-item">
                <div class="legend-color risk-low"></div>
                <div class="legend-label">Low Risk</div>
            </div>
            <div class="legend-item">
                <div class="legend-color risk-medium"></div>
                <div class="legend-label">Medium Risk</div>
            </div>
            <div class="legend-item">
                <div class="legend-color risk-high"></div>
                <div class="legend-label">High Risk</div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Create security heatmap
function createSecurityHeatmap(container) {
    // Sample data for security heatmap
    const securityData = [
        { capability: 'Device Visibility', portnox: 'High', cisco: 'High', aruba: 'High', forescout: 'High' },
        { capability: 'Zero Trust Support', portnox: 'High', cisco: 'Medium', aruba: 'Medium', forescout: 'Medium' },
        { capability: 'Cloud Native Security', portnox: 'High', cisco: 'Low', aruba: 'Medium', forescout: 'Low' },
        { capability: 'Threat Detection', portnox: 'High', cisco: 'High', aruba: 'Medium', forescout: 'High' },
        { capability: 'Automatic Remediation', portnox: 'High', cisco: 'Medium', aruba: 'Medium', forescout: 'Medium' },
        { capability: 'Compliance Enforcement', portnox: 'High', cisco: 'High', aruba: 'Medium', forescout: 'Medium' },
        { capability: 'Remote Worker Security', portnox: 'High', cisco: 'Medium', aruba: 'Low', forescout: 'Low' }
    ];
    
    // Create HTML table for heatmap
    const html = `
        <div class="heatmap-table-container">
            <table class="heatmap-table">
                <thead>
                    <tr>
                        <th>Security Capability</th>
                        <th>Portnox Cloud</th>
                        <th>Cisco ISE</th>
                        <th>Aruba ClearPass</th>
                        <th>Forescout</th>
                    </tr>
                </thead>
                <tbody>
                    ${securityData.map(item => `
                        <tr>
                            <td>${item.capability}</td>
                            <td class="security-cell security-${item.portnox.toLowerCase()}">${item.portnox}</td>
                            <td class="security-cell security-${item.cisco.toLowerCase()}">${item.cisco}</td>
                            <td class="security-cell security-${item.aruba.toLowerCase()}">${item.aruba}</td>
                            <td class="security-cell security-${item.forescout.toLowerCase()}">${item.forescout}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <div class="heatmap-legend">
            <div class="legend-item">
                <div class="legend-color security-high"></div>
                <div class="legend-label">High Capability</div>
            </div>
            <div class="legend-item">
                <div class="legend-color security-medium"></div>
                <div class="legend-label">Medium Capability</div>
            </div>
            <div class="legend-item">
                <div class="legend-color security-low"></div>
                <div class="legend-label">Low Capability</div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}
EOF
echo "✓ Created heatmap-fix.js module"

# Create dashboard cards CSS
echo "Creating dashboard cards CSS..."
cat > css/modules/dashboard-cards.css << 'EOF'
/* Dashboard Cards and Visualization Components */

/* Dashboard grid layouts */
.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 30px;
}

.dashboard-grid.grid-3 {
    grid-template-columns: repeat(3, 1fr);
}

.dashboard-grid.grid-2 {
    grid-template-columns: repeat(2, 1fr);
}

/* Dashboard card styling */
.dashboard-card {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
}

.dashboard-card:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

.dashboard-card h3 {
    font-size: 16px;
    color: #555;
    margin-top: 0;
    margin-bottom: 10px;
}

.dashboard-card.highlight-card {
    border-left: 4px solid #3498db;
}

.metric-value {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 5px;
    color: #333;
}

.highlight-value {
    color: #3498db;
}

.metric-label {
    font-size: 14px;
    color: #777;
    margin-bottom: 10px;
}

.metric-trend {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    margin-top: auto;
}

.metric-trend.up {
    color: #2ecc71;
}

.metric-trend.down {
    color: #e74c3c;
}

.metric-trend i {
    margin-right: 5px;
}

/* Chart containers */
.chart-container {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
}

.chart-container h3 {
    font-size: 18px;
    color: #333;
    margin-top: 0;
    margin-bottom: 20px;
}

.chart-wrapper {
    position: relative;
    height: 300px;
    width: 100%;
}

.chart-wrapper.half-height {
    height: 200px;
}

/* Benefits grid */
.benefits-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-top: 20px;
}

.benefit-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    transition: all 0.3s ease;
}

.benefit-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.benefit-icon {
    width: 50px;
    height: 50px;
    background-color: #3498db;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px;
}

.benefit-icon i {
    font-size: 24px;
}

.benefit-card h4 {
    font-size: 16px;
    color: #333;
    margin-top: 0;
    margin-bottom: 10px;
}

.benefit-card p {
    font-size: 14px;
    color: #666;
    margin: 0;
}

/* Advantages grid */
.advantages-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;
}

.advantage-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    transition: all 0.3s ease;
}

.advantage-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.advantage-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.advantage-icon {
    width: 40px;
    height: 40px;
    background-color: #3498db;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
}

.advantage-icon i {
    font-size: 20px;
}

.advantage-card h4 {
    font-size: 18px;
    color: #333;
    margin: 0;
}

.advantage-card p {
    font-size: 14px;
    color: #666;
    margin: 0 0 20px;
}

.comparison-bar {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.bar-label {
    width: 100px;
    font-size: 14px;
    color: #555;
}

.bar-track {
    flex-grow: 1;
    height: 8px;
    background-color: #e0e0e0;
    border-radius: 4px;
    margin: 0 10px;
}

.bar-fill {
    height: 100%;
    background-color: #3498db;
    border-radius: 4px;
}

.bar-value {
    width: 40px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    text-align: right;
}

/* Data tables */
.table-responsive {
    overflow-x: auto;
    margin-top: 20px;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.data-table th,
.data-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
}

.data-table th {
    background-color: #f5f7fa;
    font-weight: 600;
    color: #333;
}

.data-table tr:nth-child(even) {
    background-color: #f8f9fa;
}

.data-table tbody tr:hover {
    background-color: #edf2f7;
}

.data-table .total-row {
    font-weight: 700;
    background-color: #f5f7fa;
}

.data-table .highlight-cell,
.data-table .highlight-value {
    color: #3498db;
    font-weight: 600;
}

/* Insight box */
.insight-box {
    background-color: #edf2f7;
    border-left: 4px solid #3498db;
    border-radius: 4px;
    padding: 15px;
    margin-top: 20px;
}

.insight-box h4 {
    font-size: 16px;
    color: #333;
    margin-top: 0;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}

.insight-box h4 i {
    color: #3498db;
    margin-right: 8px;
}

.insight-box p {
    font-size: 14px;
    color: #555;
    margin: 0;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
    .dashboard-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .benefits-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .dashboard-grid.grid-3,
    .dashboard-grid.grid-2,
    .advantages-grid {
        grid-template-columns: 1fr;
    }
    
    .benefits-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .chart-wrapper {
        height: 250px;
    }
}

@media (max-width: 576px) {
    .benefits-grid {
        grid-template-columns: 1fr;
    }
}
EOF
echo "✓ Created dashboard-cards.css module"

# Create vendor card CSS
echo "Creating vendor card CSS..."
cat > css/modules/vendor-cards.css << 'EOF'
/* Vendor Cards Styling */

.vendor-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-top: 10px;
}

.vendor-card {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
}

.vendor-card:hover {
    border-color: #3498db;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.vendor-card.selected {
    border-color: #3498db;
    background-color: rgba(52, 152, 219, 0.05);
    box-shadow: 0 2px 6px rgba(52, 152, 219, 0.2);
}

.vendor-logo {
    width: 60px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}

.vendor-logo img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.vendor-logo-fallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    color: #333;
    font-weight: bold;
    font-size: 12px;
    border-radius: 4px;
}

.vendor-info {
    flex: 1;
}

.vendor-info h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
}

.vendor-info p {
    margin: 0;
    font-size: 12px;
    color: #666;
}

.vendor-badge {
    position: absolute;
    top: 5px;
    right: 5px;
}

.vendor-badge .badge {
    font-size: 9px;
    padding: 3px 5px;
    border-radius: 3px;
}

.badge-primary {
    background-color: #3498db;
    color: white;
}

.badge-warning {
    background-color: #f39c12;
    color: white;
}

.badge-danger {
    background-color: #e74c3c;
    color: white;
}

/* Responsive adjustments */
@media (max-width: 992px) {
    .vendor-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 576px) {
    .vendor-grid {
        grid-template-columns: 1fr;
    }
}
EOF
echo "✓ Created vendor-cards.css module"

# Create tab styles CSS
echo "Creating tab styles CSS..."
cat > css/modules/tab-styles.css << 'EOF'
/* Tab styles and view panel management */

/* Stakeholder tabs */
.stakeholder-tabs {
    display: flex;
    background-color: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 25px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stakeholder-tab {
    padding: 12px 20px;
    font-size: 14px;
    font-weight: 600;
    color: #555;
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
}

.stakeholder-tab i {
    font-size: 16px;
    transition: all 0.2s ease;
}

.stakeholder-tab:hover {
    background-color: #e9ecef;
    color: #3498db;
}

.stakeholder-tab.active {
    color: #fff;
    background-color: #3498db;
}

.stakeholder-tab.active i {
    color: #fff;
}

/* Results tabs */
.results-tabs {
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 25px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
}

.results-tab {
    padding: 12px 18px;
    font-size: 14px;
    font-weight: 600;
    color: #555;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
}

.results-tab:hover {
    color: #3498db;
}

.results-tab.active {
    color: #3498db;
    border-bottom-color: #3498db;
}

/* View panels */
.view-panel {
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.view-panel.active {
    display: block;
    opacity: 1;
    animation: fadeIn 0.3s ease-in-out;
}

/* Results panels */
.results-panel {
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.results-panel.active {
    display: block;
    opacity: 1;
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Mobile responsiveness for tabs */
@media (max-width: 768px) {
    .stakeholder-tabs {
        flex-wrap: wrap;
    }
    
    .stakeholder-tab {
        flex: 1 0 auto;
        padding: 10px 12px;
        font-size: 13px;
    }
    
    .results-tabs {
        overflow-x: auto;
    }
    
    .results-tab {
        padding: 8px 12px;
        font-size: 13px;
    }
}
EOF
echo "✓ Created tab-styles.css module"

# Create heatmap CSS
echo "Creating heatmap CSS..."
cat > css/modules/heatmap.css << 'EOF'
/* Heatmap Styles */

.heatmap-container {
    width: 100%;
    margin-bottom: 20px;
}

.heatmap-table-container {
    width: 100%;
    overflow-x: auto;
    margin-bottom: 15px;
}

.heatmap-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.heatmap-table th,
.heatmap-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
}

.heatmap-table th {
    background-color: #f5f7fa;
    font-weight: 600;
    color: #333;
}

.heatmap-table tbody tr:hover {
    background-color: #f8f9fa;
}

/* Risk cells */
.risk-cell {
    text-align: center;
    font-weight: 600;
    border-radius: 4px;
}

.risk-low {
    background-color: #d4edda;
    color: #155724;
}

.risk-medium {
    background-color: #fff3cd;
    color: #856404;
}

.risk-high {
    background-color: #f8d7da;
    color: #721c24;
}

/* Security cells */
.security-cell {
    text-align: center;
    font-weight: 600;
    border-radius: 4px;
}

.security-high {
    background-color: #d4edda;
    color: #155724;
}

.security-medium {
    background-color: #fff3cd;
    color: #856404;
}

.security-low {
    background-color: #f8d7da;
    color: #721c24;
}

/* Legend */
.heatmap-legend {
    display: flex;
    gap: 20px;
    margin-top: 15px;
    justify-content: center;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.legend-color {
    width: 20px;
    height: 20px;
    border-radius: 4px;
}

.legend-label {
    font-size: 13px;
    color: #555;
}
EOF
echo "✓ Created heatmap.css module"

# Create logo fixes CSS
echo "Creating logo fixes CSS..."
cat > css/fixes/logo-fixes.css << 'EOF'
/* Logo fixes */
.logo-section {
    display: flex;
    align-items: center;
}

.company-logo {
    height: 40px;
    width: auto;
    object-fit: contain;
    margin-right: 15px;
}

.app-title {
    display: flex;
    flex-direction: column;
}

.app-title h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c3e50;
}

.subtitle {
    font-size: 0.9rem;
    color: #7f8c8d;
    margin: 0;
}

/* Fix missing vendor logos */
.vendor-card .vendor-logo img {
    max-height: 30px;
    max-width: 100%;
    object-fit: contain;
}

/* Fallback for missing logos */
.vendor-logo-fallback {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    border-radius: 4px;
}
EOF
echo "✓ Created logo-fixes.css module"

# Create sidebar fixes CSS
echo "Creating sidebar fixes CSS..."
cat > css/fixes/sidebar-fixes.css << 'EOF'
/* Sidebar fixes */
.sidebar {
    transition: all 0.3s ease;
    overflow-y: auto;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.sidebar.collapsed {
    width: 0;
    min-width: 0;
    padding: 0;
    overflow: hidden;
}

.sidebar-toggle {
    position: fixed;
    left: 290px;
    top: 120px;
    width: 28px;
    height: 60px;
    background-color: #fff;
    border-radius: 0 4px 4px 0;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 100;
}

.sidebar-toggle:hover {
    background-color: #f0f2f5;
}

.sidebar-toggle.collapsed {
    left: 0;
}

.sidebar-toggle i {
    color: #333;
    font-size: 14px;
}

.sidebar-content {
    padding-bottom: 80px;
}

/* Config card fixes */
.config-card {
    margin-bottom: 20px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

.config-card-header {
    padding: 12px 15px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e0e0e0;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.config-card-header h3 {
    margin: 0;
    font-size: 16px;
    color: #333;
    display: flex;
    align-items: center;
}

.config-card-header h3 i {
    margin-right: 8px;
    color: #3498db;
}

.config-card-header i.fas {
    font-size: 14px;
    color: #777;
    transition: transform 0.3s ease;
}

.config-card-content {
    padding: 15px;
    transition: all 0.3s ease;
}

.config-card-content.collapsed {
    height: 0;
    padding: 0 15px;
    overflow: hidden;
}

/* Form element fixes */
.form-group {
    margin-bottom: 15px;
}

.form-label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 14px;
    color: #333;
}

.form-select,
.form-control {
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    transition: border-color 0.2s ease;
}

.form-select:focus,
.form-control:focus {
    border-color: #3498db;
    outline: none;
}

.helper-text {
    font-size: 12px;
    color: #6c757d;
    margin-top: 5px;
}

/* Feature and compliance grids */
.feature-grid,
.compliance-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 10px;
}

.feature-item,
.compliance-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.form-check-input {
    width: 16px;
    height: 16px;
    margin-top: 2px;
}
EOF
echo "✓ Created sidebar-fixes.css module"

# Create master integration file
echo "Creating master integration JS file..."
cat > js/master-integration.js << 'EOF'
/**
 * Master Integration Script
 * Connects all modules and initializes the application
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing TCO Analyzer Master Integration...');
    
    // Check if DOM is ready
    initDOM();
    
    // Fix all logos
    fixLogos();
    
    // Initialize tab manager
    initTabs();
    
    console.log('TCO Analyzer initialization complete!');
});

// Initialize DOM elements
function initDOM() {
    console.log('Checking and initializing DOM elements...');
    
    // Fix main Portnox logo
    fixMainLogo();
    
    // Add Font Awesome if not present
    ensureFontAwesome();
    
    // Create global app object
    window.portnoxApp = window.portnoxApp || {};
    
    // Check if required elements exist
    checkRequiredElements();
}

// Fix main logo
function fixMainLogo() {
    const logoImg = document.querySelector('.company-logo');
    if (logoImg) {
        logoImg.src = 'img/portnox-logo.png';
        logoImg.onerror = function() {
            console.log('Main logo failed to load, creating fallback');
            this.src = 'img/vendors/portnox-logo.png';
            
            // If still fails, create SVG fallback
            this.onerror = function() {
                const parent = this.parentElement;
                this.remove();
                
                const fallback = document.createElement('div');
                fallback.className = 'company-logo';
                fallback.innerHTML = `
                    <svg width="120" height="40" viewBox="0 0 120 40">
                        <rect width="120" height="40" fill="#2c3e50" rx="4" ry="4"/>
                        <text x="60" y="25" font-family="Arial" font-size="16" fill="white" text-anchor="middle">PORTNOX</text>
                    </svg>
                `;
                parent.prepend(fallback);
            };
        };
    }
}

// Ensure Font Awesome is loaded
function ensureFontAwesome() {
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(link);
        console.log('Added Font Awesome CSS');
    }
}

// Check if required elements exist
function checkRequiredElements() {
    // Check for stakeholder tabs
    const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
    if (stakeholderTabs.length === 0) {
        console.warn('No stakeholder tabs found!');
    } else {
        console.log(`Found ${stakeholderTabs.length} stakeholder tabs`);
    }
    
    // Check for results panels
    const resultsPanels = document.querySelectorAll('.results-panel');
    if (resultsPanels.length === 0) {
        console.warn('No results panels found!');
    } else {
        console.log(`Found ${resultsPanels.length} results panels`);
    }
    
    // Check for vendor cards
    const vendorCards = document.querySelectorAll('.vendor-card');
    if (vendorCards.length === 0) {
        console.warn('No vendor cards found!');
    } else {
        console.log(`Found ${vendorCards.length} vendor cards`);
    }
    
    // Check for charts
    const chartContainers = document.querySelectorAll('.chart-container');
    if (chartContainers.length === 0) {
        console.warn('No chart containers found!');
    } else {
        console.log(`Found ${chartContainers.length} chart containers`);
    }
}

// Fix all vendor logos
function fixLogos() {
    // Fix vendor card logos
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(card => {
        const vendor = card.getAttribute('data-vendor');
        const logoContainer = card.querySelector('.vendor-logo');
        
        if (!logoContainer) {
            console.warn(`No logo container found for ${vendor}`);
            return;
        }
        
        let logoImg = logoContainer.querySelector('img');
        
        // If no image exists, create one
        if (!logoImg) {
            logoImg = document.createElement('img');
            logoImg.alt = `${vendor} logo`;
            logoContainer.appendChild(logoImg);
        }
        
        // Set correct image path
        logoImg.src = `img/vendors/${vendor}-logo.png`;
        
        // Add error handler
        logoImg.onerror = function() {
            console.log(`Failed to load ${vendor} logo, creating fallback`);
            
            this.style.display = 'none';
            
            // Create text fallback
            const fallback = document.createElement('div');
            fallback.className = 'vendor-logo-fallback';
            fallback.textContent = vendor.charAt(0).toUpperCase() + vendor.slice(1);
            logoContainer.appendChild(fallback);
        };
    });
    
    console.log('Fixed vendor logos');
}

// Initialize tabs
function initTabs() {
    // Initialize TabManager if available
    if (window.TabManager) {
        window.TabManager.init();
        console.log('Tab Manager initialized');
    } else {
        console.warn('Tab Manager not found, using fallback');
        initFallbackTabManager();
    }
}

// Fallback tab manager
function initFallbackTabManager() {
    // Set up stakeholder tab event listeners
    const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
    stakeholderTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update active stakeholder tab
            stakeholderTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active view panel
            document.querySelectorAll('.view-panel').forEach(panel => {
                if (panel.getAttribute('data-view') === view) {
                    panel.classList.add('active');
                    
                    // Activate first results tab in this view
                    const firstTab = panel.querySelector('.results-tab');
                    if (firstTab) {
                        firstTab.click();
                    }
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });
    
    // Set up results tab event listeners
    const resultsTabs = document.querySelectorAll('.results-tab');
    resultsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const panelId = this.getAttribute('data-panel');
            const tabsContainer = this.parentElement;
            
            // Update active tab
            tabsContainer.querySelectorAll('.results-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active panel
            const viewPanel = this.closest('.view-panel');
            if (viewPanel) {
                viewPanel.querySelectorAll('.results-panel').forEach(panel => {
                    if (panel.id === panelId) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Initialize with the first stakeholder tab
    const firstTab = document.querySelector('.stakeholder-tab');
    if (firstTab) {
        firstTab.click();
    }
    
    console.log('Fallback Tab Manager initialized');
}
EOF
echo "✓ Created master-integration.js file"

# Create HTML loader script
echo "Creating HTML loader script..."
cat > index-loader.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portnox TCO Analyzer - Loader</title>
    <style>
        body {
            font-family: 'Nunito', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #f5f7fa;
            color: #333;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        
        .loader-container {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            padding: 30px;
            max-width: 600px;
            width: 100%;
            text-align: center;
        }
        
        h1 {
            color: #2c3e50;
            margin-top: 0;
        }
        
        p {
            margin: 10px 0 20px;
            line-height: 1.5;
            color: #555;
        }
        
        .progress-container {
            background-color: #f0f0f0;
            border-radius: 4px;
            margin: 20px 0;
            height: 20px;
            overflow: hidden;
        }
        
        .progress-bar {
            background-color: #3498db;
            height: 100%;
            width: 0;
            transition: width 0.3s ease;
        }
        
        .status {
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
        }
        
        .btn {
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        
        .btn:hover {
            background-color: #2980b9;
        }
        
        .btn:disabled {
            background-color: #bdc3c7;
            cursor: not-allowed;
        }
        
        .logo {
            max-width: 200px;
            margin-bottom: 20px;
        }
        
        .file-list {
            text-align: left;
            margin: 20px 0;
            max-height: 200px;
            overflow-y: auto;
            padding: 10px;
            background-color: #f5f7fa;
            border-radius: 4px;
            font-size: 12px;
            color: #666;
        }
        
        .file-item {
            margin-bottom: 5px;
        }
        
        .file-item.success {
            color: #27ae60;
        }
        
        .file-item.error {
            color: #e74c3c;
        }
    </style>
</head>
<body>
    <div class="loader-container">
        <div id="logo-container">
            <!-- Logo will be dynamically added here -->
        </div>
        <h1>TCO Analyzer Fixer</h1>
        <p>This tool will load all the necessary modules and fix the issues with the TCO Analyzer application.</p>
        
        <div class="progress-container">
            <div class="progress-bar" id="progress-bar"></div>
        </div>
        
        <div class="status" id="status">Initializing...</div>
        
        <div class="file-list" id="file-list">
            <!-- File list will be populated here -->
        </div>
        
        <button id="start-btn" class="btn">Start Fix</button>
    </div>
    
    <script>
        // Create and add logo
        const logoContainer = document.getElementById('logo-container');
        const img = document.createElement('img');
        img.src = 'img/portnox-logo.png';
        img.alt = 'Portnox Logo';
        img.className = 'logo';
        
        // Add error handler for logo
        img.onerror = function() {
            // Try vendor path
            this.src = 'img/vendors/portnox-logo.png';
            
            // If still fails, create SVG fallback
            this.onerror = function() {
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('width', '200');
                svg.setAttribute('height', '60');
                svg.setAttribute('viewBox', '0 0 200 60');
                svg.innerHTML = `
                    <rect width="200" height="60" rx="4" ry="4" fill="#2c3e50"/>
                    <text x="100" y="38" font-family="Arial" font-size="24" fill="white" text-anchor="middle">PORTNOX</text>
                `;
                svg.className = 'logo';
                
                logoContainer.appendChild(svg);
            };
        };
        
        logoContainer.appendChild(img);

        // File paths to be loaded
        const filesToLoad = [
            // CSS modules
            { type: 'css', path: 'css/modules/dashboard-cards.css' },
            { type: 'css', path: 'css/modules/vendor-cards.css' },
            { type: 'css', path: 'css/modules/tab-styles.css' },
            { type: 'css', path: 'css/modules/heatmap.css' },
            { type: 'css', path: 'css/fixes/logo-fixes.css' },
            { type: 'css', path: 'css/fixes/sidebar-fixes.css' },
            
            // JS modules
            { type: 'js', path: 'js/modules/industry-compliance.js' },
            { type: 'js', path: 'js/modules/security-risk.js' },
            { type: 'js', path: 'js/fixes/tab-manager.js' },
            { type: 'js', path: 'js/fixes/heatmap-fix.js' },
            
            // Main integration
            { type: 'js', path: 'js/master-integration.js' }
        ];
        
        // DOM elements
        const startBtn = document.getElementById('start-btn');
        const progressBar = document.getElementById('progress-bar');
        const status = document.getElementById('status');
        const fileList = document.getElementById('file-list');
        
        // Event listener for start button
        startBtn.addEventListener('click', startFix);
        
        // Initialize file list
        initFileList();
        
        // Initialize file list
        function initFileList() {
            fileList.innerHTML = '';
            filesToLoad.forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.id = `file-${file.path.replace(/[/.]/g, '-')}`;
                fileItem.textContent = file.path;
                fileList.appendChild(fileItem);
            });
        }
        
        // Start the fix process
        function startFix() {
            startBtn.disabled = true;
            status.textContent = 'Loading files...';
            
            // Reset progress
            let loaded = 0;
            const total = filesToLoad.length;
            progressBar.style.width = '0%';
            
            // Load files sequentially
            loadNextFile(0, total);
        }
        
        // Load files one by one
        function loadNextFile(index, total) {
            if (index >= filesToLoad.length) {
                // All files loaded
                finishLoading();
                return;
            }
            
            const file = filesToLoad[index];
            status.textContent = `Loading ${file.path}...`;
            
            // Create element based on file type
            let element;
            if (file.type === 'css') {
                element = document.createElement('link');
                element.rel = 'stylesheet';
                element.href = file.path;
            } else if (file.type === 'js') {
                element = document.createElement('script');
                element.src = file.path;
            }
            
            // Set callbacks
            element.onload = function() {
                // Mark file as loaded
                const fileItem = document.getElementById(`file-${file.path.replace(/[/.]/g, '-')}`);
                if (fileItem) {
                    fileItem.className = 'file-item success';
                    fileItem.textContent = `✓ ${file.path}`;
                }
                
                // Update progress
                const progress = ((index + 1) / total) * 100;
                progressBar.style.width = `${progress}%`;
                
                // Load next file
                setTimeout(() => loadNextFile(index + 1, total), 100);
            };
            
            element.onerror = function() {
                // Mark file as error
                const fileItem = document.getElementById(`file-${file.path.replace(/[/.]/g, '-')}`);
                if (fileItem) {
                    fileItem.className = 'file-item error';
                    fileItem.textContent = `✗ ${file.path} (Failed to load)`;
                }
                
                // Update progress and continue
                const progress = ((index + 1) / total) * 100;
                progressBar.style.width = `${progress}%`;
                
                // Load next file
                setTimeout(() => loadNextFile(index + 1, total), 100);
            };
            
            // Add to document
            document.head.appendChild(element);
        }
        
        // Finish loading process
        function finishLoading() {
            status.textContent = 'All files loaded successfully!';
            
            // Change button to close or refresh
            startBtn.textContent = 'Apply & Refresh';
            startBtn.disabled = false;
            startBtn.onclick = function() {
                // Store a flag in localStorage to indicate fixes are applied
                localStorage.setItem('tcoAnalyzerFixed', 'true');
                
                // Refresh parent window if in an iframe, or current window
                if (window.parent && window.parent !== window) {
                    window.parent.location.reload();
                } else {
                    window.location.reload();
                }
            };
        }
    </script>
</body>
</html>
EOF
echo "✓ Created HTML loader script"

# Create integration index.html
echo "Creating integration index.html..."
cat > integration.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portnox TCO Analyzer - Integration</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100vh;
            overflow: hidden;
            font-family: 'Nunito', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #f5f7fa;
        }
        
        .container {
            display: flex;
            flex-direction: column;
            height: 100vh;
        }
        
        .header {
            background-color: #2c3e50;
            color: white;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .header h1 {
            margin: 0;
            font-size: 20px;
        }
        
        .loader-frame {
            flex-grow: 1;
            border: none;
            width: 100%;
        }

        .btn {
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 15px;
            font-size: 14px;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        
        .btn:hover {
            background-color: #2980b9;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Portnox TCO Analyzer - Integration</h1>
            <div>
                <button id="refresh-btn" class="btn">Refresh App</button>
            </div>
        </div>
        
        <iframe id="loader-frame" class="loader-frame" src="index-loader.html"></iframe>
    </div>
    
    <script>
        document.getElementById('refresh-btn').addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    </script>
</body>
</html>
EOF
echo "✓ Created integration index.html"

# Create a script to inject the fixes
echo "Creating script to inject the fixes..."
cat > inject-fixes.js << 'EOF'
/**
 * Inject Fixes Script
 * This script can be pasted in the browser console to fix issues without requiring server-side changes
 */
(function() {
    console.log('Injecting TCO Analyzer fixes...');
    
    // Fix Portnox logo
    fixPortnoxLogo();
    
    // Fix vendor logos
    fixVendorLogos();
    
    // Fix tab switching
    fixTabSwitching();
    
    // Add missing CSS
    addCSS();

    // Initialize heatmaps if present
    initHeatmaps();
    
    console.log('Fixes successfully injected!');
    
    // Fix Portnox logo
    function fixPortnoxLogo() {
        const portnoxLogos = document.querySelectorAll('.company-logo');
        portnoxLogos.forEach(logo => {
            if (!logo.complete || logo.naturalHeight === 0) {
                console.log('Fixing Portnox logo');
                logo.onerror = null; // Prevent error loop
                
                // Create SVG logo
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('width', '120');
                svg.setAttribute('height', '40');
                svg.setAttribute('viewBox', '0 0 120 40');
                svg.innerHTML = `
                    <rect width="120" height="40" fill="#2c3e50" rx="4" ry="4"/>
                    <text x="60" y="25" font-family="Arial" font-size="16" fill="white" text-anchor="middle">PORTNOX</text>
                `;
                svg.className = 'company-logo';
                
                // Replace the img with SVG
                logo.parentNode.replaceChild(svg, logo);
            }
        });
    }
    
    // Fix vendor logos
    function fixVendorLogos() {
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach(card => {
            const vendor = card.getAttribute('data-vendor');
            const logoContainer = card.querySelector('.vendor-logo');
            
            if (logoContainer) {
                const logoImg = logoContainer.querySelector('img');
                
                if (logoImg && (!logoImg.complete || logoImg.naturalHeight === 0)) {
                    console.log(`Fixing ${vendor} logo`);
                    logoImg.style.display = 'none';
                    
                    // Create fallback text
                    const fallback = document.createElement('div');
                    fallback.style.width = '100%';
                    fallback.style.height = '100%';
                    fallback.style.display = 'flex';
                    fallback.style.alignItems = 'center';
                    fallback.style.justifyContent = 'center';
                    fallback.style.backgroundColor = '#f0f0f0';
                    fallback.style.color = '#333';
                    fallback.style.fontWeight = 'bold';
                    fallback.style.fontSize = '12px';
                    fallback.style.borderRadius = '4px';
                    fallback.textContent = vendor.charAt(0).toUpperCase() + vendor.slice(1);
                    
                    logoContainer.appendChild(fallback);
                }
            }
        });
    }
    
    // Fix tab switching
    function fixTabSwitching() {
        // Fix stakeholder tabs
        const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
        stakeholderTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const view = this.getAttribute('data-view');
                console.log(`Switching to view: ${view}`);
                
                // Update active tab
                stakeholderTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Update active panel
                document.querySelectorAll('.view-panel').forEach(panel => {
                    if (panel.getAttribute('data-view') === view) {
                        panel.classList.add('active');
                        
                        // Activate first results tab
                        const firstTab = panel.querySelector('.results-tab');
                        if (firstTab) {
                            firstTab.click();
                        }
                    } else {
                        panel.classList.remove('active');
                    }
                });
            });
        });
        
        // Fix results tabs
        const resultsTabs = document.querySelectorAll('.results-tab');
        resultsTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const panelId = this.getAttribute('data-panel');
                const tabsContainer = this.parentElement;
                
                // Update active tab
                tabsContainer.querySelectorAll('.results-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Find parent view panel
                const viewPanel = this.closest('.view-panel');
                if (viewPanel) {
                    // Update active panel
                    viewPanel.querySelectorAll('.results-panel').forEach(panel => {
                        if (panel.id === panelId) {
                            panel.classList.add('active');
                        } else {
                            panel.classList.remove('active');
                        }
                    });
                }
            });
        });
    }
    
    // Add missing CSS
    function addCSS() {
        const style = document.createElement('style');
        style.textContent = `
            /* Fix tab switching */
            .view-panel {
                display: none;
            }
            .view-panel.active {
                display: block;
            }
            .results-panel {
                display: none;
            }
            .results-panel.active {
                display: block;
            }
            
            /* Heatmap styles */
            .risk-cell {
                text-align: center;
                font-weight: 600;
                border-radius: 4px;
            }
            .risk-low {
                background-color: #d4edda;
                color: #155724;
            }
            .risk-medium {
                background-color: #fff3cd;
                color: #856404;
            }
            .risk-high {
                background-color: #f8d7da;
                color: #721c24;
            }
            .security-cell {
                text-align: center;
                font-weight: 600;
                border-radius: 4px;
            }
            .security-high {
                background-color: #d4edda;
                color: #155724;
            }
            .security-medium {
                background-color: #fff3cd;
                color: #856404;
            }
            .security-low {
                background-color: #f8d7da;
                color: #721c24;
            }
            .heatmap-legend {
                display: flex;
                gap: 20px;
                margin-top: 15px;
                justify-content: center;
            }
            .legend-item {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .legend-color {
                width: 20px;
                height: 20px;
                border-radius: 4px;
            }
            .legend-label {
                font-size: 13px;
                color: #555;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize heatmaps if present
    function initHeatmaps() {
        const riskHeatmap = document.getElementById('risk-heatmap');
        const securityHeatmap = document.getElementById('security-heatmap');
        
        if (riskHeatmap) {
            console.log('Initializing risk heatmap');
            createRiskHeatmap(riskHeatmap);
        }
        
        if (securityHeatmap) {
            console.log('Initializing security heatmap');
            createSecurityHeatmap(securityHeatmap);
        }
    }
    
    // Create risk heatmap
    function createRiskHeatmap(container) {
        // Sample data for risk heatmap
        const riskData = [
            { category: 'Data Breach', noNac: 'High', basicNac: 'Medium', portnox: 'Low' },
            { category: 'Unauthorized Access', noNac: 'High', basicNac: 'Medium', portnox: 'Low' },
            { category: 'Compliance Violation', noNac: 'High', basicNac: 'Medium', portnox: 'Low' },
            { category: 'Internal Threat', noNac: 'Medium', basicNac: 'Medium', portnox: 'Low' },
            { category: 'External Threat', noNac: 'High', basicNac: 'Medium', portnox: 'Low' },
            { category: 'Shadow IT', noNac: 'High', basicNac: 'High', portnox: 'Low' },
            { category: 'Outdated Devices', noNac: 'High', basicNac: 'Medium', portnox: 'Low' }
        ];
        
        // Create HTML table for heatmap
        let html = `
            <div class="heatmap-table-container">
                <table class="heatmap-table" style="width:100%;border-collapse:collapse;font-size:14px;">
                    <thead>
                        <tr>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">Risk Category</th>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">No NAC</th>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">Basic NAC</th>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">Portnox Cloud</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        riskData.forEach(item => {
            html += `
                <tr>
                    <td style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.category}</td>
                    <td class="risk-cell risk-${item.noNac.toLowerCase()}" style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.noNac}</td>
                    <td class="risk-cell risk-${item.basicNac.toLowerCase()}" style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.basicNac}</td>
                    <td class="risk-cell risk-${item.portnox.toLowerCase()}" style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.portnox}</td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
            <div class="heatmap-legend">
                <div class="legend-item">
                    <div class="legend-color risk-low"></div>
                    <div class="legend-label">Low Risk</div>
                </div>
                <div class="legend-item">
                    <div class="legend-color risk-medium"></div>
                    <div class="legend-label">Medium Risk</div>
                </div>
                <div class="legend-item">
                    <div class="legend-color risk-high"></div>
                    <div class="legend-label">High Risk</div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }
    
    // Create security heatmap
    function createSecurityHeatmap(container) {
        // Sample data for security heatmap
        const securityData = [
            { capability: 'Device Visibility', portnox: 'High', cisco: 'High', aruba: 'High', forescout: 'High' },
            { capability: 'Zero Trust Support', portnox: 'High', cisco: 'Medium', aruba: 'Medium', forescout: 'Medium' },
            { capability: 'Cloud Native Security', portnox: 'High', cisco: 'Low', aruba: 'Medium', forescout: 'Low' },
            { capability: 'Threat Detection', portnox: 'High', cisco: 'High', aruba: 'Medium', forescout: 'High' },
            { capability: 'Automatic Remediation', portnox: 'High', cisco: 'Medium', aruba: 'Medium', forescout: 'Medium' },
            { capability: 'Compliance Enforcement', portnox: 'High', cisco: 'High', aruba: 'Medium', forescout: 'Medium' },
            { capability: 'Remote Worker Security', portnox: 'High', cisco: 'Medium', aruba: 'Low', forescout: 'Low' }
        ];
        
        // Create HTML table for heatmap
        let html = `
            <div class="heatmap-table-container">
                <table class="heatmap-table" style="width:100%;border-collapse:collapse;font-size:14px;">
                    <thead>
                        <tr>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">Security Capability</th>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">Portnox Cloud</th>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">Cisco ISE</th>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">Aruba ClearPass</th>
                            <th style="padding:12px 15px;text-align:left;background-color:#f5f7fa;font-weight:600;color:#333;border-bottom:1px solid #e0e0e0;">Forescout</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        securityData.forEach(item => {
            html += `
                <tr>
                    <td style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.capability}</td>
                    <td class="security-cell security-${item.portnox.toLowerCase()}" style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.portnox}</td>
                    <td class="security-cell security-${item.cisco.toLowerCase()}" style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.cisco}</td>
                    <td class="security-cell security-${item.aruba.toLowerCase()}" style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.aruba}</td>
                    <td class="security-cell security-${item.forescout.toLowerCase()}" style="padding:12px 15px;border-bottom:1px solid #e0e0e0;">${item.forescout}</td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
            <div class="heatmap-legend">
                <div class="legend-item">
                    <div class="legend-color security-high"></div>
                    <div class="legend-label">High Capability</div>
                </div>
                <div class="legend-item">
                    <div class="legend-color security-medium"></div>
                    <div class="legend-label">Medium Capability</div>
                </div>
                <div class="legend-item">
                    <div class="legend-color security-low"></div>
                    <div class="legend-label">Low Capability</div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }
})();
EOF
echo "✓ Created inject-fixes.js script"

# Set permissions
chmod +x js/fixes/*.js 2>/dev/null || true
chmod +x js/modules/*.js 2>/dev/null || true
chmod +x js/*.js 2>/dev/null || true

echo "==== Portnox TCO Analyzer Integration Script Complete! ===="
echo "The following files have been created:"
echo ""
echo "1. JavaScript Modules:"
echo "   - industry-compliance.js: Industry-specific compliance frameworks"
echo "   - security-risk.js: Security risk assessments and calculations"
echo "   - tab-manager.js: Tab switching functionality"
echo "   - heatmap-fix.js: Heat map display functionality"
echo "   - master-integration.js: Master integration script"
echo ""
echo "2. CSS Modules:"
echo "   - dashboard-cards.css: Dashboard card styling"
echo "   - vendor-cards.css: Vendor card styling"
echo "   - tab-styles.css: Tab and view panel styling"
echo "   - heatmap.css: Heat map styling"
echo "   - logo-fixes.css: Logo fixes"
echo "   - sidebar-fixes.css: Sidebar fixes"
echo ""
echo "3. HTML Files:"
echo "   - index-loader.html: Module loader"
echo "   - integration.html: Integration page"
echo ""
echo "4. In-browser Script:"
echo "   - inject-fixes.js: Can be pasted in browser console for immediate fixes"
echo ""
echo "To apply these fixes, either:"
echo "1. Open integration.html in your browser, or"
echo "2. Copy the content of inject-fixes.js and paste it in your browser console"
echo ""
echo "These changes will restore the vendor logos, fix tab switching functionality,"
echo "and add heat maps for security and risk visualization."

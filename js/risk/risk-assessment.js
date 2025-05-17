/**
 * Risk Assessment Module
 * Comprehensive risk analysis, threat modeling, and cyber insurance assessment
 */

class RiskAssessment {
    constructor() {
        this.vendorData = window.VENDOR_DATA || {};
        this.industryData = window.INDUSTRY_COMPLIANCE || {};
        this.riskProfiles = window.RISK_PROFILES || {};
        this.insuranceOptions = window.INSURANCE_OPTIONS || {};
        
        // Risk assessment categories
        this.riskCategories = [
            {
                id: "accessControl",
                name: "Access Control Risks",
                description: "Risks related to unauthorized network access",
                impactAreas: ["Data Theft", "Malware Propagation", "Sabotage"],
                metrics: ["Authentication Strength", "Access Verification", "Privilege Management"]
            },
            {
                id: "endpointRisks",
                name: "Endpoint Security Risks",
                description: "Risks from compromised or vulnerable endpoints",
                impactAreas: ["Data Loss", "Lateral Movement", "Malware Execution"],
                metrics: ["Device Authentication", "Posture Assessment", "Continuous Monitoring"]
            },
            {
                id: "network",
                name: "Network Security Risks",
                description: "Risks affecting network infrastructure and communications",
                impactAreas: ["Eavesdropping", "MitM Attacks", "Traffic Manipulation"],
                metrics: ["Traffic Segmentation", "Encryption", "Monitoring"]
            },
            {
                id: "compliance",
                name: "Compliance Risks",
                description: "Risks related to regulatory non-compliance",
                impactAreas: ["Regulatory Penalties", "Legal Liability", "Reputation Damage"],
                metrics: ["Policy Enforcement", "Audit Trail", "Reporting Capabilities"]
            },
            {
                id: "emergingThreats",
                name: "Emerging Threat Risks",
                description: "Risks from new attack vectors and techniques",
                impactAreas: ["Zero-Day Exploits", "Advanced Persistent Threats", "Ransomware"],
                metrics: ["Threat Detection", "Adaptability", "Response Automation"]
            }
        ];
        
        // Threat model scenarios
        this.threatScenarios = [
            {
                id: "dataTheft",
                name: "Sensitive Data Theft",
                description: "Unauthorized access and exfiltration of sensitive information",
                likelihood: "Medium",
                impact: "High",
                mitigations: ["Access control", "Encryption", "Data loss prevention"],
                relevantFeatures: ["zeroTrust", "endpointVisibility", "threatResponse"]
            },
            {
                id: "ransomware",
                name: "Ransomware Attack",
                description: "Malicious encryption of organizational data with demand for payment",
                likelihood: "High",
                impact: "Critical",
                mitigations: ["Device posture checking", "Network segmentation", "Behavioral analysis"],
                relevantFeatures: ["endpointVisibility", "threatResponse", "multiVendor"]
            },
            {
                id: "insiderThreat",
                name: "Insider Threat",
                description: "Malicious actions by trusted users with legitimate access",
                likelihood: "Medium",
                impact: "High",
                mitigations: ["Least privilege", "Behavioral monitoring", "Segregation of duties"],
                relevantFeatures: ["zeroTrust", "endpointVisibility", "automation"]
            },
            {
                id: "byodCompromise",
                name: "BYOD Device Compromise",
                description: "Security breach via unmanaged personal devices",
                likelihood: "High",
                impact: "Medium",
                mitigations: ["Device authentication", "Network isolation", "Continuous verification"],
                relevantFeatures: ["zeroTrust", "endpointVisibility", "userExperience"]
            },
            {
                id: "iotBreach",
                name: "IoT Device Breach",
                description: "Compromise of Internet of Things devices for network access",
                likelihood: "Medium",
                impact: "Medium",
                mitigations: ["Device visibility", "Network segmentation", "Anomaly detection"],
                relevantFeatures: ["iotSupport", "endpointVisibility", "threatResponse"]
            },
            {
                id: "phishing",
                name: "Credential Phishing",
                description: "Theft of authentication credentials via social engineering",
                likelihood: "High",
                impact: "High",
                mitigations: ["Multi-factor authentication", "Device trust", "Behavioral analysis"],
                relevantFeatures: ["zeroTrust", "automation", "threatResponse"]
            },
            {
                id: "remoteAccess",
                name: "Unsecured Remote Access",
                description: "Security vulnerabilities from remote work arrangements",
                likelihood: "High",
                impact: "Medium",
                mitigations: ["Zero trust access", "Continuous verification", "Endpoint security"],
                relevantFeatures: ["remoteAccess", "zeroTrust", "endpointVisibility"]
            }
        ];
        
        // Cyber insurance impact factors
        this.insuranceFactors = [
            {
                id: "accessControls",
                name: "Access Controls",
                description: "Strength of authentication and authorization",
                impact: "High",
                vendorFeatures: ["zeroTrust", "multiVendor"],
                baseReduction: 10
            },
            {
                id: "networkSegmentation",
                name: "Network Segmentation",
                description: "Ability to isolate and contain breaches",
                impact: "Medium",
                vendorFeatures: ["zeroTrust", "multiVendor"],
                baseReduction: 8
            },
            {
                id: "deviceAuthentication",
                name: "Device Authentication",
                description: "Verification of device identity and security posture",
                impact: "High",
                vendorFeatures: ["endpointVisibility", "zeroTrust"],
                baseReduction: 12
            },
            {
                id: "continuousMonitoring",
                name: "Continuous Monitoring",
                description: "Ongoing surveillance of network activity",
                impact: "Medium",
                vendorFeatures: ["endpointVisibility", "automation"],
                baseReduction: 7
            },
            {
                id: "incidentResponse",
                name: "Incident Response",
                description: "Automated detection and remediation of threats",
                impact: "High",
                vendorFeatures: ["threatResponse", "automation"],
                baseReduction: 10
            },
            {
                id: "auditCapabilities",
                name: "Audit Capabilities",
                description: "Logging and reporting for security events",
                impact: "Medium",
                vendorFeatures: ["compliance", "automation"],
                baseReduction: 6
            }
        ];
        
        // Initialize after DOM is fully loaded
        document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
    
    initialize() {
        // Create risk assessment panel
        this.createRiskPanel();
        
        // Add event listeners for risk controls
        this.attachEventListeners();
        
        console.log('Risk Assessment Module initialized');
    }
    
    createRiskPanel() {
        // Find the security view panel
        const securityView = document.querySelector('.view-panel[data-view="security"]');
        if (!securityView) {
            console.error('Could not find security view panel');
            return;
        }
        
        // Get reference to risk assessment panel
        const riskPanel = document.getElementById('security-risk');
        if (!riskPanel) {
            console.error('Could not find risk assessment panel');
            return;
        }
        
        // Enhance panel with comprehensive risk assessment
        riskPanel.innerHTML = `
            <div class="panel-header">
                <h2>Risk Assessment</h2>
                <p class="subtitle">Comprehensive security risk analysis and cyber insurance impact</p>
            </div>
            
            <div class="risk-controls">
                <div class="form-group">
                    <label for="risk-vendor-select" class="form-label">Vendor</label>
                    <select id="risk-vendor-select" class="form-select">
                        <!-- Will be populated with selected vendors -->
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="risk-profile-select" class="form-label">Risk Profile</label>
                    <select id="risk-profile-select" class="form-select">
                        ${Object.keys(this.riskProfiles).map(key => `
                            <option value="${key}">
                                ${this.riskProfiles[key].name}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="insurance-tier-select" class="form-label">Insurance Tier</label>
                    <select id="insurance-tier-select" class="form-select">
                        ${Object.keys(this.insuranceOptions).map(key => `
                            <option value="${key}">
                                ${this.insuranceOptions[key].name}
                            </option>
                        `).join('')}
                    </select>
                </div>
            </div>
            
            <div class="dashboard-grid grid-4">
                <div class="dashboard-card highlight-card">
                    <h3>Overall Risk Reduction</h3>
                    <div class="metric-value highlight-value" id="overall-risk-reduction">58%</div>
                    <div class="metric-label">Compared to no NAC solution</div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Risk Level</h3>
                    <div class="metric-value" id="risk-level">Medium-Low</div>
                    <div class="metric-label">With implemented controls</div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Insurance Impact</h3>
                    <div class="metric-value" id="insurance-impact">-15%</div>
                    <div class="metric-label">Potential premium reduction</div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Annual Risk Value</h3>
                    <div class="metric-value" id="annual-risk-value">$125,000</div>
                    <div class="metric-label">Estimated risk reduction</div>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Risk Category Assessment</h3>
                <div class="chart-wrapper">
                    <canvas id="risk-category-chart"></canvas>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Threat Scenario Analysis</h3>
                <div class="threat-scenario-container" id="threat-scenario-container">
                    <!-- Will be populated dynamically -->
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Risk-Adjusted ROI</h3>
                <div class="chart-wrapper">
                    <canvas id="risk-adjusted-roi-chart"></canvas>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Cyber Insurance Impact</h3>
                <div class="insurance-impact-container">
                    <div class="chart-wrapper half-height">
                        <canvas id="insurance-impact-chart"></canvas>
                    </div>
                    <div class="insurance-factors" id="insurance-factors-container">
                        <!-- Will be populated dynamically -->
                    </div>
                </div>
            </div>
        `;
        
        // Initialize risk visualizations
        setTimeout(() => this.initializeVisualizations(), 500);
    }
    
    attachEventListeners() {
        // Wait for DOM to be ready
        setTimeout(() => {
            // Vendor selection
            const vendorSelect = document.getElementById('risk-vendor-select');
            if (vendorSelect) {
                // Populate with selected vendors
                this.updateVendorSelect(vendorSelect);
                
                // Add event listener for changes
                vendorSelect.addEventListener('change', () => {
                    this.updateRiskMetrics();
                    this.updateRiskCategoryChart();
                    this.updateThreatScenarios();
                    this.updateRiskAdjustedRoiChart();
                    this.updateInsuranceImpactChart();
                    this.updateInsuranceFactors();
                });
            }
            
            // Risk profile selection
            const profileSelect = document.getElementById('risk-profile-select');
            if (profileSelect) {
                // Set initial value from calculator state
                const currentProfile = window.calculatorState?.riskProfile || 'standard';
                profileSelect.value = currentProfile;
                
                // Add event listener for changes
                profileSelect.addEventListener('change', () => {
                    // Update calculator state
                    if (window.calculatorState) {
                        window.calculatorState.riskProfile = profileSelect.value;
                    }
                    
                    // Update visualizations
                    this.updateRiskMetrics();
                    this.updateRiskCategoryChart();
                    this.updateThreatScenarios();
                    this.updateRiskAdjustedRoiChart();
                });
            }
            
            // Insurance tier selection
            const insuranceSelect = document.getElementById('insurance-tier-select');
            if (insuranceSelect) {
                // Set initial value from calculator state
                const currentTier = window.calculatorState?.insuranceTier || 'standard';
                insuranceSelect.value = currentTier;
                
                // Add event listener for changes
                insuranceSelect.addEventListener('change', () => {
                    // Update calculator state
                    if (window.calculatorState) {
                        window.calculatorState.insuranceTier = insuranceSelect.value;
                    }
                    
                    // Update visualizations
                    this.updateRiskMetrics();
                    this.updateInsuranceImpactChart();
                    this.updateInsuranceFactors();
                });
            }
            
            // Listen for tab changes to ensure visualizations render correctly
            document.addEventListener('click', (e) => {
                if (e.target.matches('.results-tab[data-panel="security-risk"]')) {
                    // Tab was clicked, ensure visualizations render
                    setTimeout(() => {
                        this.updateRiskMetrics();
                        this.updateRiskCategoryChart();
                        this.updateThreatScenarios();
                        this.updateRiskAdjustedRoiChart();
                        this.updateInsuranceImpactChart();
                        this.updateInsuranceFactors();
                    }, 100);
                }
            });
            
            // Listen for vendor selection changes in the sidebar
            document.addEventListener('click', (e) => {
                if (e.target.matches('.vendor-card')) {
                    // Vendor selection changed, update vendor select
                    setTimeout(() => {
                        this.updateVendorSelect(document.getElementById('risk-vendor-select'));
                    }, 500);
                }
            });
        }, 1000);
    }
    
    updateVendorSelect(vendorSelect) {
        if (!vendorSelect) return;
        
        // Get selected vendors from calculator state
        const selectedVendors = window.calculatorState?.selectedVendors || ['portnox'];
        
        // Clear current options
        vendorSelect.innerHTML = '';
        
        // Add options for each selected vendor
        selectedVendors.forEach(vendorId => {
            const vendor = this.vendorData[vendorId];
            if (vendor) {
                const option = document.createElement('option');
                option.value = vendorId;
                option.textContent = vendor.name;
                vendorSelect.appendChild(option);
            }
        });
        
        // Default to Portnox if available
        if (selectedVendors.includes('portnox')) {
            vendorSelect.value = 'portnox';
        }
    }
    
    initializeVisualizations() {
        this.updateRiskMetrics();
        this.updateRiskCategoryChart();
        this.updateThreatScenarios();
        this.updateRiskAdjustedRoiChart();
        this.updateInsuranceImpactChart();
        this.updateInsuranceFactors();
    }
    
    updateRiskMetrics() {
        // Get selected vendor, risk profile, and insurance tier
        const vendorSelect = document.getElementById('risk-vendor-select');
        const profileSelect = document.getElementById('risk-profile-select');
        const insuranceSelect = document.getElementById('insurance-tier-select');
        
        if (!vendorSelect || !profileSelect || !insuranceSelect) return;
        
        const vendorId = vendorSelect.value;
        const vendor = this.vendorData[vendorId];
        
        const profileId = profileSelect.value;
        const profile = this.riskProfiles[profileId];
        
        const insuranceId = insuranceSelect.value;
        const insurance = this.insuranceOptions[insuranceId];
        
        if (!vendor || !profile || !insurance) return;
        
        // Update Overall Risk Reduction
        const riskReduction = document.getElementById('overall-risk-reduction');
        if (riskReduction) {
            riskReduction.textContent = `${vendor.security.riskReduction}%`;
        }
        
        // Update Risk Level
        const riskLevel = document.getElementById('risk-level');
        if (riskLevel) {
            // Calculate residual risk level based on vendor's risk reduction and profile's baseline
            const residualRisk = this.calculateResidualRiskLevel(vendor, profile);
            riskLevel.textContent = residualRisk;
        }
        
        // Update Insurance Impact
        const insuranceImpact = document.getElementById('insurance-impact');
        if (insuranceImpact) {
            // Calculate insurance premium reduction
            const reduction = this.calculateInsurancePremiumReduction(vendor, insurance);
            insuranceImpact.textContent = reduction > 0 ? `-${reduction}%` : '0%';
        }
        
        // Update Annual Risk Value
        const riskValue = document.getElementById('annual-risk-value');
        if (riskValue) {
            // Calculate annual value of risk reduction
            const value = this.calculateAnnualRiskValue(vendor, profile);
            riskValue.textContent = `$${this.formatNumber(value)}`;
        }
    }
    
    updateRiskCategoryChart() {
        const chartCanvas = document.getElementById('risk-category-chart');
        if (!chartCanvas) return;
        
        // Get selected vendor and risk profile
        const vendorSelect = document.getElementById('risk-vendor-select');
        const profileSelect = document.getElementById('risk-profile-select');
        
        if (!vendorSelect || !profileSelect) return;
        
        const vendorId = vendorSelect.value;
        const vendor = this.vendorData[vendorId];
        
        const profileId = profileSelect.value;
        const profile = this.riskProfiles[profileId];
        
        if (!vendor || !profile) return;
        
        // Prepare data for the chart
        const categories = this.riskCategories.map(category => category.name);
        
        // Calculate risk scores for each category
        const baselineScores = this.riskCategories.map(category => {
            return this.calculateBaseCategoryRisk(category, profile);
        });
        
        const vendorScores = this.riskCategories.map(category => {
            return this.calculateVendorCategoryRisk(category, vendor, profile);
        });
        
        // Create datasets
        const datasets = [
            {
                label: 'Without NAC',
                data: baselineScores,
                backgroundColor: 'rgba(255, 99, 132, 0.7)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: vendor.name,
                data: vendorScores,
                backgroundColor: 'rgba(0, 123, 255, 0.7)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }
        ];
        
        // Create or update chart
        if (window.riskCategoryChart) {
            window.riskCategoryChart.data.labels = categories;
            window.riskCategoryChart.data.datasets = datasets;
            window.riskCategoryChart.update();
        } else {
            window.riskCategoryChart = new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels: categories,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: 'Risk Level'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value;
                                }
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.raw} Risk Score`;
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    
    updateThreatScenarios() {
        const scenarioContainer = document.getElementById('threat-scenario-container');
        if (!scenarioContainer) return;
        
        // Get selected vendor and risk profile
        const vendorSelect = document.getElementById('risk-vendor-select');
        const profileSelect = document.getElementById('risk-profile-select');
        
        if (!vendorSelect || !profileSelect) return;
        
        const vendorId = vendorSelect.value;
        const vendor = this.vendorData[vendorId];
        
        const profileId = profileSelect.value;
        const profile = this.riskProfiles[profileId];
        
        if (!vendor || !profile) return;
        
        // Build HTML for threat scenarios
        let scenariosHTML = `<div class="threat-scenarios">`;
        
        // Add each threat scenario
        this.threatScenarios.forEach(scenario => {
            // Calculate threat risk and mitigation effectiveness
            const baseRisk = this.calculateBaseScenarioRisk(scenario, profile);
            const mitigatedRisk = this.calculateMitigatedScenarioRisk(scenario, vendor, profile);
            const effectiveness = Math.round(((baseRisk - mitigatedRisk) / baseRisk) * 100);
            
            // Determine risk levels
            const baseRiskLevel = this.getRiskLevelLabel(baseRisk);
            const mitigatedRiskLevel = this.getRiskLevelLabel(mitigatedRisk);
            
            // Determine color classes
            let baseRiskClass = this.getRiskColorClass(baseRisk);
            let mitigatedRiskClass = this.getRiskColorClass(mitigatedRisk);
            
            scenariosHTML += `
                <div class="threat-scenario">
                    <div class="scenario-header">
                        <div class="scenario-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <div class="scenario-title">
                            <h4>${scenario.name}</h4>
                            <p>${scenario.description}</p>
                        </div>
                    </div>
                    <div class="scenario-details">
                        <div class="risk-gauge-container">
                            <div class="risk-gauge original">
                                <div class="gauge-label">Without NAC</div>
                                <div class="gauge-wrapper">
                                    <div class="gauge-arc ${baseRiskClass}" style="transform: rotate(${Math.min(180, baseRisk * 1.8)}deg);"></div>
                                    <div class="gauge-pointer" style="transform: rotate(${Math.min(180, baseRisk * 1.8)}deg);"></div>
                                </div>
                                <div class="gauge-value">${baseRiskLevel}</div>
                            </div>
                            <div class="risk-gauge mitigated">
                                <div class="gauge-label">With ${vendor.name}</div>
                                <div class="gauge-wrapper">
                                    <div class="gauge-arc ${mitigatedRiskClass}" style="transform: rotate(${Math.min(180, mitigatedRisk * 1.8)}deg);"></div>
                                    <div class="gauge-pointer" style="transform: rotate(${Math.min(180, mitigatedRisk * 1.8)}deg);"></div>
                                </div>
                                <div class="gauge-value">${mitigatedRiskLevel}</div>
                            </div>
                            <div class="effectiveness-badge">
                                ${effectiveness}% Reduction
                            </div>
                        </div>
                        <div class="scenario-mitigations">
                            <h5>Key Mitigations:</h5>
                            <ul>
                                ${scenario.mitigations.map(mitigation => {
                                    // Rate the vendor's capability for this mitigation
                                    const capability = this.rateVendorMitigationCapability(vendor, mitigation);
                                    return `
                                        <li class="${capability.colorClass}">
                                            ${mitigation} <span class="capability-rating">${capability.label}</span>
                                        </li>
                                    `;
                                }).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        });
		scenariosHTML += `</div>`;
        
        // Update container
        scenarioContainer.innerHTML = scenariosHTML;
    }
    
    updateRiskAdjustedRoiChart() {
        const chartCanvas = document.getElementById('risk-adjusted-roi-chart');
        if (!chartCanvas) return;
        
        // Get selected vendor and risk profile
        const vendorSelect = document.getElementById('risk-vendor-select');
        const profileSelect = document.getElementById('risk-profile-select');
        
        if (!vendorSelect || !profileSelect) return;
        
        const vendorId = vendorSelect.value;
        const vendor = this.vendorData[vendorId];
        
        const profileId = profileSelect.value;
        const profile = this.riskProfiles[profileId];
        
        if (!vendor || !profile) return;
        
        // Calculate annual costs and savings for 5 years
        const years = Array.from({length: 5}, (_, i) => i + 1);
        
        // Get organization size and device count from calculator state
        const deviceCount = window.calculatorState?.deviceCount || 500;
        const locations = window.calculatorState?.locations || 2;
        
        // Calculate implementation costs
        const implementationCost = this.calculateImplementationCost(vendor, deviceCount, locations);
        
        // Calculate annual costs
        const annualCosts = years.map(year => {
            return year === 1 ? 
                implementationCost + this.calculateAnnualOperationalCost(vendor, deviceCount) : 
                this.calculateAnnualOperationalCost(vendor, deviceCount);
        });
        
        // Calculate cumulative costs
        const cumulativeCosts = [];
        let runningCost = 0;
        
        annualCosts.forEach(cost => {
            runningCost += cost;
            cumulativeCosts.push(runningCost);
        });
        
        // Calculate annual risk savings
        const annualRiskSavings = years.map(() => {
            return this.calculateAnnualRiskValue(vendor, profile);
        });
        
        // Calculate cumulative savings
        const cumulativeSavings = [];
        let runningSavings = 0;
        
        annualRiskSavings.forEach(saving => {
            runningSavings += saving;
            cumulativeSavings.push(runningSavings);
        });
        
        // Calculate payback point (when cumulative savings exceed cumulative costs)
        let paybackYear = years.length + 1;
        let paybackMonth = 0;
        
        for (let i = 0; i < years.length; i++) {
            if (cumulativeSavings[i] >= cumulativeCosts[i]) {
                paybackYear = years[i];
                
                // Calculate partial year if it's the first year
                if (i > 0) {
                    const savingsGap = cumulativeSavings[i] - cumulativeSavings[i-1];
                    const costGap = cumulativeCosts[i] - cumulativeCosts[i-1];
                    const remainingSavings = cumulativeCosts[i-1] - cumulativeSavings[i-1];
                    
                    paybackMonth = Math.round((remainingSavings / savingsGap) * 12);
                } else {
                    const savingsPerMonth = annualRiskSavings[0] / 12;
                    paybackMonth = Math.ceil(implementationCost / savingsPerMonth);
                }
                
                break;
            }
        }
        
        // Create datasets
        const datasets = [
            {
                label: 'Cumulative Cost',
                data: cumulativeCosts,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'Cumulative Risk Savings',
                data: cumulativeSavings,
                borderColor: 'rgba(0, 123, 255, 1)',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                fill: true,
                tension: 0.4
            }
        ];
        
        // Create annotation for payback point
        let annotations = {};
        
        if (paybackYear <= years.length) {
            annotations.payback = {
                type: 'line',
                xMin: paybackYear - 1 + (paybackMonth / 12),
                xMax: paybackYear - 1 + (paybackMonth / 12),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                label: {
                    content: `Payback: Year ${paybackYear}, Month ${paybackMonth}`,
                    enabled: true,
                    position: 'top'
                }
            };
        }
        
        // Create or update chart
        if (window.riskAdjustedRoiChart) {
            window.riskAdjustedRoiChart.data.labels = years;
            window.riskAdjustedRoiChart.data.datasets = datasets;
            window.riskAdjustedRoiChart.options.plugins.annotation.annotations = annotations;
            window.riskAdjustedRoiChart.update();
        } else {
            window.riskAdjustedRoiChart = new Chart(chartCanvas, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Cumulative Amount ($)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + (value >= 1000 ? (value / 1000) + 'K' : value);
                                }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Year'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                                }
                            }
                        },
                        annotation: {
                            annotations: annotations
                        }
                    }
                }
            });
        }
    }
    
    updateInsuranceImpactChart() {
        const chartCanvas = document.getElementById('insurance-impact-chart');
        if (!chartCanvas) return;
        
        // Get selected vendor and insurance tier
        const vendorSelect = document.getElementById('risk-vendor-select');
        const insuranceSelect = document.getElementById('insurance-tier-select');
        
        if (!vendorSelect || !insuranceSelect) return;
        
        const vendorId = vendorSelect.value;
        const vendor = this.vendorData[vendorId];
        
        const insuranceId = insuranceSelect.value;
        const insurance = this.insuranceOptions[insuranceId];
        
        if (!vendor || !insurance || insuranceId === 'none') {
            // No insurance selected or available
            if (chartCanvas.parentNode) {
                chartCanvas.parentNode.innerHTML = `
                    <div class="no-insurance-message">
                        Select an insurance tier to view potential premium reductions
                    </div>
                `;
            }
            return;
        }
        
        // Calculate base annual premium
        const annualPremium = insurance.estimatedAnnualCost;
        
        // Calculate reduced premium with the vendor's solution
        const reduction = this.calculateInsurancePremiumReduction(vendor, insurance);
        const reducedPremium = annualPremium * (1 - (reduction / 100));
        
        // Create datasets
        const barColors = [
            'rgba(255, 99, 132, 0.7)',
            'rgba(0, 123, 255, 0.7)'
        ];
        
        const datasets = [
            {
                label: 'Premium Amount',
                data: [annualPremium, reducedPremium],
                backgroundColor: barColors,
                borderColor: barColors.map(color => color.replace('0.7', '1')),
                borderWidth: 1
            }
        ];
        
        // Create or update chart
        if (window.insuranceImpactChart) {
            window.insuranceImpactChart.data.labels = ['Standard Premium', `With ${vendor.name}`];
            window.insuranceImpactChart.data.datasets = datasets;
            window.insuranceImpactChart.update();
        } else {
            window.insuranceImpactChart = new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels: ['Standard Premium', `With ${vendor.name}`],
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Annual Premium ($)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + (value >= 1000 ? (value / 1000) + 'K' : value);
                                }
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                                }
                            }
                        },
                        datalabels: {
                            color: 'white',
                            font: {
                                weight: 'bold'
                            },
                            formatter: function(value) {
                                return `$${(value / 1000).toFixed(1)}K`;
                            }
                        }
                    }
                }
            });
        }
    }
    
    updateInsuranceFactors() {
        const factorsContainer = document.getElementById('insurance-factors-container');
        if (!factorsContainer) return;
        
        // Get selected vendor and insurance tier
        const vendorSelect = document.getElementById('risk-vendor-select');
        const insuranceSelect = document.getElementById('insurance-tier-select');
        
        if (!vendorSelect || !insuranceSelect) return;
        
        const vendorId = vendorSelect.value;
        const vendor = this.vendorData[vendorId];
        
        const insuranceId = insuranceSelect.value;
        const insurance = this.insuranceOptions[insuranceId];
        
        if (!vendor || !insurance || insuranceId === 'none') {
            factorsContainer.innerHTML = `
                <div class="no-insurance-message">
                    Select an insurance tier to view impact factors
                </div>
            `;
            return;
        }
        
        // Build HTML for insurance factors
        let factorsHTML = `
            <h4>Premium Reduction Factors</h4>
            <div class="insurance-factors-grid">
        `;
        
        // Add each factor
        this.insuranceFactors.forEach(factor => {
            // Calculate effectiveness for this factor
            const effectiveness = this.calculateFactorEffectiveness(vendor, factor);
            const reductionValue = Math.round(factor.baseReduction * (effectiveness / 100));
            
            // Determine color class
            let colorClass = '';
            if (effectiveness >= 90) colorClass = 'excellent';
            else if (effectiveness >= 75) colorClass = 'good';
            else if (effectiveness >= 60) colorClass = 'adequate';
            else if (effectiveness >= 40) colorClass = 'fair';
            else colorClass = 'poor';
            
            factorsHTML += `
                <div class="insurance-factor">
                    <div class="factor-header">
                        <h5>${factor.name}</h5>
                        <div class="factor-impact ${factor.impact.toLowerCase()}">${factor.impact} Impact</div>
                    </div>
                    <div class="factor-description">${factor.description}</div>
                    <div class="factor-effectiveness-bar">
                        <div class="effectiveness-track">
                            <div class="effectiveness-fill ${colorClass}" style="width: ${effectiveness}%"></div>
                        </div>
                        <div class="effectiveness-labels">
                            <span class="effectiveness-value">${effectiveness}% Effective</span>
                            <span class="reduction-value">-${reductionValue}%</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        factorsHTML += `</div>`;
        
        // Update container
        factorsContainer.innerHTML = factorsHTML;
    }
    
    calculateResidualRiskLevel(vendor, profile) {
        // Base risk level from profile
        const baseRiskLevel = profile.breachProbability || 'Medium';
        
        // Convert to numeric scale
        const riskScale = {
            'Low': 25,
            'Medium-Low': 40,
            'Medium': 60,
            'Medium-High': 75,
            'High': 90
        };
        
        const baseRiskScore = riskScale[baseRiskLevel] || 60;
        
        // Apply vendor's risk reduction
        const riskReduction = vendor.security?.riskReduction || 0;
        const residualRiskScore = baseRiskScore * (1 - (riskReduction / 100));
        
        // Convert back to label
        if (residualRiskScore <= 25) return 'Low';
        if (residualRiskScore <= 40) return 'Medium-Low';
        if (residualRiskScore <= 60) return 'Medium';
        if (residualRiskScore <= 75) return 'Medium-High';
        return 'High';
    }
    
    calculateInsurancePremiumReduction(vendor, insurance) {
        if (!vendor || !insurance) return 0;
        
        // Base reduction from vendor
        const baseReduction = vendor.security?.insuranceImpact || 0;
        
        // Adjust based on insurance tier
        let adjustedReduction = baseReduction;
        
        switch (insurance.name) {
            case 'No Cybersecurity Insurance':
                adjustedReduction = 0;
                break;
            case 'Basic Coverage':
                adjustedReduction = Math.round(baseReduction * 0.7);
                break;
            case 'Standard Coverage':
                // Use base value
                break;
            case 'Comprehensive Coverage':
                adjustedReduction = Math.round(baseReduction * 1.3);
                break;
        }
        
        return adjustedReduction;
    }
    
    calculateAnnualRiskValue(vendor, profile) {
        if (!vendor || !profile) return 0;
        
        // Get breach cost from risk profile
        const breachCost = profile.averageBreachCost || 4200000;
        
        // Assume annual breach probability from profile
        let breachProbability = 0.1; // Default 10% annual probability
        
        switch (profile.breachProbability) {
            case 'Low':
                breachProbability = 0.05; // 5% annual probability
                break;
            case 'Medium-Low':
                breachProbability = 0.08; // 8% annual probability
                break;
            case 'Medium':
                breachProbability = 0.12; // 12% annual probability
                break;
            case 'Medium-High':
                breachProbability = 0.18; // 18% annual probability
                break;
            case 'High':
                breachProbability = 0.25; // 25% annual probability
                break;
        }
        
        // Calculate expected annual loss without NAC
        const expectedAnnualLoss = breachCost * breachProbability;
        
        // Apply vendor's risk reduction
        const riskReduction = vendor.security?.riskReduction || 0;
        const reducedAnnualLoss = expectedAnnualLoss * (1 - (riskReduction / 100));
        
        // Value is the difference
        return Math.round(expectedAnnualLoss - reducedAnnualLoss);
    }
    
    calculateBaseCategoryRisk(category, profile) {
        // Base risk value for category without NAC
        const baseRiskMap = {
            accessControl: 85,
            endpointRisks: 80,
            network: 75,
            compliance: 70,
            emergingThreats: 90
        };
        
        // Get base risk value
        const baseRisk = baseRiskMap[category.id] || 70;
        
        // Adjust based on risk profile
        const profileAdjustment = {
            standard: 1.0,
            elevated: 1.2,
            high: 1.4,
            regulated: 1.5
        };
        
        // Apply adjustment (capped at 100)
        return Math.min(100, Math.round(baseRisk * (profileAdjustment[profile.id] || 1.0)));
    }
    
    calculateVendorCategoryRisk(category, vendor, profile) {
        // Get base risk for this category
        const baseRisk = this.calculateBaseCategoryRisk(category, profile);
        
        // Map category to relevant vendor features
        const relevantFeatures = this.getCategoryRelevantFeatures(category.id);
        
        // Calculate average feature score
        let totalScore = 0;
        let count = 0;
        
        relevantFeatures.forEach(feature => {
            if (vendor.features && vendor.features[feature]) {
                totalScore += vendor.features[feature];
                count++;
            }
        });
        
        // Calculate effectiveness
        const effectiveness = count > 0 ? totalScore / count : 0;
        
        // Apply effectiveness to reduce base risk
        return Math.round(baseRisk * (1 - (effectiveness / 100)));
    }
    
    getCategoryRelevantFeatures(categoryId) {
        // Map categories to relevant vendor features
        const featureMap = {
            accessControl: ['zeroTrust', 'multiVendor', 'remoteAccess'],
            endpointRisks: ['endpointVisibility', 'zeroTrust', 'userExperience'],
            network: ['multiVendor', 'automation', 'zeroTrust'],
            compliance: ['compliance', 'automation', 'endpointVisibility'],
            emergingThreats: ['threatResponse', 'automation', 'endpointVisibility']
        };
        
        return featureMap[categoryId] || ['zeroTrust', 'endpointVisibility', 'threatResponse'];
    }
    
    calculateBaseScenarioRisk(scenario, profile) {
        // Base risk value for different threat scenarios
        const baseRiskMap = {
            dataTheft: 75,
            ransomware: 85,
            insiderThreat: 70,
            byodCompromise: 65,
            iotBreach: 60,
            phishing: 80,
            remoteAccess: 70
        };
        
        // Get base risk value
        const baseRisk = baseRiskMap[scenario.id] || 70;
        
        // Adjust based on risk profile
        const profileAdjustment = {
            standard: 1.0,
            elevated: 1.2,
            high: 1.4,
            regulated: 1.5
        };
        
        // Apply adjustment (capped at 100)
        return Math.min(100, Math.round(baseRisk * (profileAdjustment[profile.id] || 1.0)));
    }
    
    calculateMitigatedScenarioRisk(scenario, vendor, profile) {
        // Get base risk for this scenario
        const baseRisk = this.calculateBaseScenarioRisk(scenario, profile);
        
        // Calculate vendor effectiveness for this scenario
        const relevantFeatures = scenario.relevantFeatures || ['zeroTrust', 'endpointVisibility', 'threatResponse'];
        
        // Calculate average feature score
        let totalScore = 0;
        let count = 0;
        
        relevantFeatures.forEach(feature => {
            if (vendor.features && vendor.features[feature]) {
                totalScore += vendor.features[feature];
                count++;
            }
        });
        
        // Calculate effectiveness
        const effectiveness = count > 0 ? totalScore / count : 0;
        
        // Apply effectiveness to reduce base risk
        return Math.round(baseRisk * (1 - (effectiveness / 100)));
    }
    
    rateVendorMitigationCapability(vendor, mitigation) {
        // Convert mitigation to lowercase for comparison
        const mitigationLower = mitigation.toLowerCase();
        
        // Map mitigations to relevant vendor features
        const featureMap = {
            'access control': ['zeroTrust', 'multiVendor'],
            'network segmentation': ['zeroTrust', 'multiVendor'],
            'encryption': ['zeroTrust'],
            'data loss prevention': ['endpointVisibility', 'threatResponse'],
            'device posture': ['endpointVisibility'],
            'device authentication': ['zeroTrust', 'endpointVisibility'],
            'continuous verification': ['zeroTrust'],
            'behavioral analysis': ['threatResponse', 'automation'],
            'multi-factor authentication': ['zeroTrust'],
            'least privilege': ['zeroTrust'],
            'behavioral monitoring': ['endpointVisibility', 'threatResponse'],
            'segregation of duties': ['zeroTrust'],
            'network isolation': ['zeroTrust', 'multiVendor'],
            'conditional access': ['zeroTrust'],
            'device trust': ['endpointVisibility', 'zeroTrust'],
            'device visibility': ['endpointVisibility'],
            'anomaly detection': ['threatResponse', 'automation'],
            'continuous monitoring': ['endpointVisibility', 'automation'],
            'audit logging': ['compliance', 'automation'],
            'compliance checks': ['compliance'],
            'automated remediation': ['threatResponse', 'automation']
        };
        
        // Find matching features
        let relevantFeatures = [];
        
        // Check for exact matches
        if (featureMap[mitigationLower]) {
            relevantFeatures = featureMap[mitigationLower];
        } else {
            // Check for partial matches
            Object.keys(featureMap).forEach(key => {
                if (mitigationLower.includes(key) || key.includes(mitigationLower)) {
                    relevantFeatures = [...relevantFeatures, ...featureMap[key]];
                }
            });
            
            // Default features if no match found
            if (relevantFeatures.length === 0) {
                relevantFeatures = ['zeroTrust', 'endpointVisibility', 'threatResponse'];
            }
        }
        
        // Calculate average feature score
        let totalScore = 0;
        let count = 0;
        
        relevantFeatures.forEach(feature => {
            if (vendor.features && vendor.features[feature]) {
                totalScore += vendor.features[feature];
                count++;
            }
        });
        
        // Calculate capability rating
        const capabilityScore = count > 0 ? Math.round(totalScore / count) : 0;
        
        // Determine rating label and color class
        let label = '';
        let colorClass = '';
        
        if (capabilityScore >= 90) {
            label = 'Excellent';
            colorClass = 'excellent';
        } else if (capabilityScore >= 75) {
            label = 'Strong';
            colorClass = 'good';
        } else if (capabilityScore >= 60) {
            label = 'Adequate';
            colorClass = 'adequate';
        } else if (capabilityScore >= 40) {
            label = 'Limited';
            colorClass = 'fair';
        } else {
            label = 'Weak';
            colorClass = 'poor';
        }
        
        return { label, colorClass };
    }
    
    calculateFactorEffectiveness(vendor, factor) {
        if (!vendor || !vendor.features) return 0;
        
        // Calculate effectiveness based on relevant features
        const relevantFeatures = factor.vendorFeatures || ['zeroTrust', 'endpointVisibility'];
        
        // Calculate average feature score
        let totalScore = 0;
        let count = 0;
        
        relevantFeatures.forEach(feature => {
            if (vendor.features[feature]) {
                totalScore += vendor.features[feature];
                count++;
            }
        });
        
        return count > 0 ? Math.round(totalScore / count) : 0;
    }
    
    calculateImplementationCost(vendor, deviceCount, locations) {
        // Base implementation cost
        const baseCost = vendor.costModel?.implementation || 5000;
        
        // Adjust for size
        let sizeMultiplier = 1.0;
        
        if (deviceCount < 300) {
            sizeMultiplier = 0.6;
        } else if (deviceCount < 1000) {
            sizeMultiplier = 1.0;
        } else if (deviceCount < 5000) {
            sizeMultiplier = 2.0;
        } else if (deviceCount < 10000) {
            sizeMultiplier = 3.5;
        } else {
            sizeMultiplier = 5.0;
        }
        
        // Adjust for locations
        const locationMultiplier = Math.max(1.0, Math.sqrt(locations) * 0.5);
        
        return Math.round(baseCost * sizeMultiplier * locationMultiplier);
    }
    
    calculateAnnualOperationalCost(vendor, deviceCount) {
        // Calculate subscription cost
        let subscriptionCost = 0;
        
        if (vendor.costModel?.type && vendor.costModel.type.includes('Subscription')) {
            const basePrice = vendor.costModel.basePrice || 3.00;
            const discount = vendor.costModel.averageDiscount || 0;
            
            // Apply volume discount
            const effectivePrice = basePrice * (1 - (discount / 100));
            
            // Calculate annual subscription cost
            subscriptionCost = effectivePrice * deviceCount * 12;
        }
        
        // Calculate FTE cost
        let fteCost = 0;
        
        if (vendor.fteRequirements) {
            // Parse FTE from string like "0.1-0.25 FTE" to get average
            const fteParts = vendor.fteRequirements.match(/[\d\.]+/g);
            let fteAllocation = 0;
            
            if (fteParts && fteParts.length > 0) {
                if (fteParts.length === 1) {
                    fteAllocation = parseFloat(fteParts[0]);
                } else {
                    // Average if range is given
                    fteAllocation = (parseFloat(fteParts[0]) + parseFloat(fteParts[1])) / 2;
                }
            } else {
                // Default based on deployment type
                if (vendor.deploymentModel && vendor.deploymentModel.includes('Cloud')) {
                    fteAllocation = 0.25;
                } else {
                    fteAllocation = 1.0;
                }
            }
            
            // Calculate FTE cost (assume average FTE cost of $120,000)
            fteCost = 120000 * fteAllocation;
        }
        
        // Calculate maintenance cost for hardware-based solutions
        let maintenanceCost = 0;
        
        if (vendor.costModel?.hardware && vendor.costModel.hardware > 0) {
            const hardwareCost = vendor.costModel.hardware;
            const maintenanceRate = vendor.costModel.maintenance || 18;
            
            maintenanceCost = hardwareCost * (maintenanceRate / 100);
        }
        
        return Math.round(subscriptionCost + fteCost + maintenanceCost);
    }
    
    getRiskLevelLabel(riskScore) {
        if (riskScore <= 25) return 'Low';
        if (riskScore <= 40) return 'Medium-Low';
        if (riskScore <= 60) return 'Medium';
        if (riskScore <= 75) return 'Medium-High';
        return 'High';
    }
    
    getRiskColorClass(riskScore) {
        if (riskScore <= 25) return 'excellent'; // Low risk = excellent rating
        if (riskScore <= 40) return 'good';
        if (riskScore <= 60) return 'adequate';
        if (riskScore <= 75) return 'fair';
        return 'poor'; // High risk = poor rating
    }
    
    formatNumber(number) {
        return new Intl.NumberFormat('en-US').format(Math.round(number));
    }
}

// Initialize the component
window.riskAssessment = new RiskAssessment();

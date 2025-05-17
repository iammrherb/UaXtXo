/**
 * Security Posture Analyzer Module
 * Advanced visualization and analysis of security capabilities
 */

class SecurityPostureAnalyzer {
    constructor() {
        this.vendorData = window.VENDOR_DATA || {};
        this.industryData = window.INDUSTRY_COMPLIANCE || {};
        this.riskProfiles = window.RISK_PROFILES || {};
        
        // Security capability categories
        this.securityCapabilities = {
            zeroTrust: {
                name: "Zero Trust Architecture",
                description: "Implementation of zero trust security principles",
                subcategories: [
                    { id: "continuousVerification", name: "Continuous Verification" },
                    { id: "leastPrivilege", name: "Least Privilege Access" },
                    { id: "microsegmentation", name: "Microsegmentation" },
                    { id: "deviceAuthentication", name: "Device Authentication" },
                    { id: "userAuthentication", name: "User Authentication" }
                ]
            },
            endpointVisibility: {
                name: "Endpoint Visibility",
                description: "Discovery and monitoring of endpoints and devices",
                subcategories: [
                    { id: "deviceDiscovery", name: "Device Discovery" },
                    { id: "profileCollection", name: "Profile Collection" },
                    { id: "continuousMonitoring", name: "Continuous Monitoring" },
                    { id: "assetInventory", name: "Asset Inventory" },
                    { id: "iotVisibility", name: "IoT Visibility" }
                ]
            },
            accessControl: {
                name: "Access Control",
                description: "Enforcement of access policies across the network",
                subcategories: [
                    { id: "policyEnforcement", name: "Policy Enforcement" },
                    { id: "dynamicAccess", name: "Dynamic Access Control" },
                    { id: "contextualAccess", name: "Contextual Access Rules" },
                    { id: "userGrouping", name: "User/Device Grouping" },
                    { id: "guestAccess", name: "Guest Access Management" }
                ]
            },
            threatProtection: {
                name: "Threat Protection",
                description: "Detection and response to security threats",
                subcategories: [
                    { id: "anomalyDetection", name: "Anomaly Detection" },
                    { id: "threatIntelligence", name: "Threat Intelligence" },
                    { id: "behavioralAnalysis", name: "Behavioral Analysis" },
                    { id: "automatedResponse", name: "Automated Response" },
                    { id: "remediationActions", name: "Remediation Actions" }
                ]
            },
            compliance: {
                name: "Compliance Management",
                description: "Support for regulatory compliance requirements",
                subcategories: [
                    { id: "auditReporting", name: "Audit & Reporting" },
                    { id: "complianceChecks", name: "Compliance Checks" },
                    { id: "policyTemplates", name: "Policy Templates" },
                    { id: "evidenceCollection", name: "Evidence Collection" },
                    { id: "regulatoryUpdates", name: "Regulatory Updates" }
                ]
            }
        };
        
        // Threat categories for modeling
        this.threatCategories = [
            {
                id: "unauthorized",
                name: "Unauthorized Access",
                description: "Unauthorized users or devices gaining network access",
                impact: "High",
                mitigations: ["Network segmentation", "Strong authentication", "Continuous verification"]
            },
            {
                id: "malware",
                name: "Malware Propagation",
                description: "Malware spreading across network devices",
                impact: "Critical",
                mitigations: ["Device posture checks", "Endpoint protection", "Network segregation"]
            },
            {
                id: "lateral",
                name: "Lateral Movement",
                description: "Attackers moving laterally within the network",
                impact: "Critical",
                mitigations: ["Microsegmentation", "Least privilege", "Continuous monitoring"]
            },
            {
                id: "dataExfil",
                name: "Data Exfiltration",
                description: "Sensitive data being extracted from the network",
                impact: "Critical",
                mitigations: ["Data loss prevention", "Traffic analysis", "Encryption"]
            },
            {
                id: "insider",
                name: "Insider Threats",
                description: "Malicious actions by authorized users",
                impact: "High",
                mitigations: ["Behavioral analysis", "Privileged access management", "Audit logging"]
            },
            {
                id: "byod",
                name: "BYOD Risks",
                description: "Risks from unmanaged personal devices",
                impact: "Medium",
                mitigations: ["Device posture assessment", "Network isolation", "Conditional access"]
            },
            {
                id: "phishing",
                name: "Phishing Attacks",
                description: "Credential theft via phishing campaigns",
                impact: "High",
                mitigations: ["Multi-factor authentication", "Device trust", "Access policies"]
            },
            {
                id: "iot",
                name: "IoT Vulnerabilities",
                description: "Exploiting vulnerable IoT devices",
                impact: "Medium",
                mitigations: ["IoT segmentation", "Device visibility", "Anomaly detection"]
            }
        ];
        
        // Initialize after DOM is fully loaded
        document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
    
    initialize() {
        // Create or enhance security posture panel
        this.createSecurityPosturePanel();
        
        // Add event listeners for security controls
        this.attachEventListeners();
        
        console.log('Security Posture Analyzer initialized');
    }
    
    createSecurityPosturePanel() {
        // Find the security view panel
        const securityView = document.querySelector('.view-panel[data-view="security"]');
        if (!securityView) {
            console.error('Could not find security view panel');
            return;
        }
        
        // Get reference to security posture panel
        const securityPosturePanel = document.getElementById('security-posture');
        if (!securityPosturePanel) {
            console.error('Could not find security posture panel');
            return;
        }
        
        // Enhance panel with advanced visualization
        securityPosturePanel.innerHTML = `
            <div class="panel-header">
                <h2>Security Posture Analysis</h2>
                <p class="subtitle">Comprehensive security capability evaluation</p>
            </div>
            
            <div class="dashboard-grid grid-4">
                <div class="dashboard-card highlight-card">
                    <h3>Zero Trust Readiness</h3>
                    <div class="metric-value highlight-value" id="zero-trust-readiness">92%</div>
                    <div class="metric-label">vs. Industry Average (45%)</div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Threat Protection</h3>
                    <div class="metric-value" id="threat-protection-score">85%</div>
                    <div class="metric-label">Detection & response capability</div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Security Coverage</h3>
                    <div class="metric-value" id="security-coverage">94%</div>
                    <div class="metric-label">Attack surface protection</div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Security Maturity</h3>
                    <div class="metric-value" id="security-maturity">Advanced</div>
                    <div class="metric-label">Security implementation level</div>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Security Capability Assessment</h3>
                <div class="capability-controls">
                    <div class="form-group">
                        <label for="capability-vendor-select" class="form-label">Vendor</label>
                        <select id="capability-vendor-select" class="form-select">
                            <!-- Will be populated with selected vendors -->
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="industry-benchmark" class="form-label">Industry Benchmark</label>
                        <select id="industry-benchmark" class="form-select">
                            <option value="none">None</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="financial">Financial Services</option>
                            <option value="retail">Retail</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="government">Government</option>
                        </select>
                    </div>
                </div>
                
                <div class="chart-wrapper">
                    <canvas id="security-capability-radar"></canvas>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Zero Trust Implementation</h3>
                <div class="zero-trust-pillars">
                    <div class="zt-pillar-row">
                        <!-- Zero Trust pillars will be dynamically generated -->
                    </div>
                </div>
                <div class="chart-wrapper half-height">
                    <canvas id="zero-trust-implementation-chart"></canvas>
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Security Controls Heatmap</h3>
                <div class="heatmap-container" id="security-controls-heatmap">
                    <!-- Security controls heatmap will be rendered here -->
                </div>
            </div>
            
            <div class="chart-container">
                <h3>Threat Protection Effectiveness</h3>
                <div class="chart-wrapper">
                    <canvas id="threat-protection-chart"></canvas>
                </div>
            </div>
        `;
        
        // Initialize security visualizations
        setTimeout(() => this.initializeVisualizations(), 500);
    }
    
    attachEventListeners() {
        // Wait for DOM to be ready
        setTimeout(() => {
            // Vendor selection for security capabilities
            const vendorSelect = document.getElementById('capability-vendor-select');
            if (vendorSelect) {
                // Populate with selected vendors
                this.updateVendorSelect(vendorSelect);
                
                // Add event listener for changes
                vendorSelect.addEventListener('change', () => {
                    this.updateSecurityCapabilityRadar();
                    this.updateZeroTrustImplementation();
                    this.updateSecurityControlsHeatmap();
                    this.updateThreatProtectionChart();
                });
            }
            
            // Industry benchmark selection
            const benchmarkSelect = document.getElementById('industry-benchmark');
            if (benchmarkSelect) {
                benchmarkSelect.addEventListener('change', () => {
                    this.updateSecurityCapabilityRadar();
                });
            }
            
            // Listen for tab changes to ensure charts render correctly
            document.addEventListener('click', (e) => {
                if (e.target.matches('.results-tab[data-panel="security-posture"]')) {
                    // Tab was clicked, ensure charts render
                    setTimeout(() => {
                        this.updateSecurityCapabilityRadar();
                        this.updateZeroTrustImplementation();
                        this.updateSecurityControlsHeatmap();
                        this.updateThreatProtectionChart();
                    }, 100);
                }
            });
            
            // Listen for vendor selection changes
            document.addEventListener('click', (e) => {
                if (e.target.matches('.vendor-card')) {
                    // Vendor selection changed, update vendor select
                    setTimeout(() => {
                        this.updateVendorSelect(document.getElementById('capability-vendor-select'));
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
        // Initialize all security visualizations
        this.updateSecurityCapabilityRadar();
        this.updateZeroTrustImplementation();
        this.updateSecurityControlsHeatmap();
        this.updateThreatProtectionChart();
        this.updateSecurityMetrics();
    }
    
    updateSecurityCapabilityRadar() {
        const chartCanvas = document.getElementById('security-capability-radar');
        if (!chartCanvas) return;
        
        // Get selected vendor
        const vendorSelect = document.getElementById('capability-vendor-select');
        if (!vendorSelect) return;
        
        const vendorId = vendorSelect.value;
        const vendor = this.vendorData[vendorId];
        if (!vendor) return;
        
        // Get benchmark selection
        const benchmarkSelect = document.getElementById('industry-benchmark');
        const benchmarkId = benchmarkSelect ? benchmarkSelect.value : 'none';
        
        // Prepare radar categories
        const categories = Object.keys(this.securityCapabilities).map(key => 
            this.securityCapabilities[key].name
        );
        
        // Prepare vendor data
        const vendorScores = this.calculateVendorSecurityScores(vendor);
        
        // Prepare datasets
        const datasets = [
            {
                label: vendor.name,
                data: Object.keys(this.securityCapabilities).map(key => vendorScores[key] || 0),
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 123, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(0, 123, 255, 1)',
                pointRadius: 4
            }
        ];
        
        // Add industry benchmark if selected
        if (benchmarkId !== 'none') {
            const industryData = this.industryData[benchmarkId];
            if (industryData) {
                const benchmarkScores = this.calculateIndustryBenchmarkScores(benchmarkId);
                
                datasets.push({
                    label: `${industryData.name} Benchmark`,
                    data: Object.keys(this.securityCapabilities).map(key => benchmarkScores[key] || 0),
                    backgroundColor: 'rgba(255, 193, 7, 0.2)',
                    borderColor: 'rgba(255, 193, 7, 1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointBackgroundColor: 'rgba(255, 193, 7, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 193, 7, 1)',
                    pointRadius: 4
                });
            }
        }
        
        // Create or update chart
        if (window.securityCapabilityRadar) {
            window.securityCapabilityRadar.data.labels = categories;
            window.securityCapabilityRadar.data.datasets = datasets;
            window.securityCapabilityRadar.update();
        } else {
            window.securityCapabilityRadar = new Chart(chartCanvas, {
                type: 'radar',
                data: {
                    labels: categories,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: {
                                display: true
                            },
                            suggestedMin: 0,
                            suggestedMax: 100,
                            ticks: {
                                stepSize: 20,
                                showLabelBackdrop: false
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.raw}%`;
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    
    updateZeroTrustImplementation() {
        // Create zero trust pillars
        this.renderZeroTrustPillars();
        
        // Update zero trust implementation chart
        const chartCanvas = document.getElementById('zero-trust-implementation-chart');
        if (!chartCanvas) return;
        
        // Get selected vendor
        const vendorSelect = document.getElementById('capability-vendor-select');
        if (!vendorSelect) return;
        
        const vendorId = vendorSelect.value;
        const vendor = this.vendorData[vendorId];
        if (!vendor) return;
        
        // Zero Trust principles
        const principles = [
            "Verify Explicitly",
            "Least Privilege Access",
            "Assume Breach",
            "Never Trust, Always Verify",
            "Device Trust",
            "Continuous Monitoring"
        ];
        
        // Calculate ZT implementation scores
        const ztScores = this.calculateZeroTrustScores(vendor);
        
        // Prepare dataset
        const dataset = {
            label: vendor.name,
            data: ztScores,
            backgroundColor: 'rgba(0, 123, 255, 0.7)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
        };
        
        // Create or update chart
        if (window.zeroTrustImplementationChart) {
            window.zeroTrustImplementationChart.data.labels = principles;
            window.zeroTrustImplementationChart.data.datasets = [dataset];
            window.zeroTrustImplementationChart.update();
        } else {
            window.zeroTrustImplementationChart = new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels: principles,
                    datasets: [dataset]
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
                                text: 'Implementation Score (%)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.raw}%`;
                                }
                            }
                        },
                        datalabels: {
                            color: 'white',
                            font: {
                                weight: 'bold'
                            },
                            formatter: function(value) {
                                return `${value}%`;
                            }
                        }
                    }
                }
            });
        }
    }
    
    renderZeroTrustPillars() {
        const pillarsContainer = document.querySelector('.zt-pillar-row');
        if (!pillarsContainer) return;
        
        // Get selected vendor
        const vendorSelect = document.getElementById('capability-vendor-select');
        if (!vendorSelect) return;
        
        const vendorId = vendorSelect.value;
        const vendor = this.vendorData[vendorId];
        if (!vendor) return;
        
        // Zero Trust pillars
        const pillars = [
            { id: "identities", name: "Identities", icon: "user-shield" },
            { id: "devices", name: "Devices", icon: "laptop" },
            { id: "networks", name: "Networks", icon: "network-wired" },
            { id: "applications", name: "Applications", icon: "window-restore" },
            { id: "data", name: "Data", icon: "database" },
            { id: "infrastructure", name: "Infrastructure", icon: "server" }
        ];
        
        // Calculate pillar scores
        const pillarScores = this.calculateZeroTrustPillarScores(vendor);
        
        // Generate HTML
        const pillarsHTML = pillars.map(pillar => {
            // Get score
            const score = pillarScores[pillar.id] || 0;
            
            // Determine color class based on score
            let colorClass = '';
            if (score >= 90) colorClass = 'excellent';
            else if (score >= 75) colorClass = 'good';
            else if (score >= 60) colorClass = 'adequate';
            else if (score >= 40) colorClass = 'fair';
            else colorClass = 'poor';
            
            return `
                <div class="zt-pillar">
                    <div class="zt-pillar-icon ${colorClass}">
                        <i class="fas fa-${pillar.icon}"></i>
                    </div>
                    <div class="zt-pillar-content">
                        <h4>${pillar.name}</h4>
                        <div class="zt-pillar-bar">
                            <div class="zt-pillar-fill ${colorClass}" style="width: ${score}%"></div>
                            <span class="zt-pillar-score">${score}%</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        pillarsContainer.innerHTML = pillarsHTML;
    }
    
    updateSecurityControlsHeatmap() {
        const heatmapContainer = document.getElementById('security-controls-heatmap');
        if (!heatmapContainer) return;
        
        // Get selected vendor
        const vendorSelect = document.getElementById('capability-vendor-select');
        if (!vendorSelect) return;
        
        const vendorId = vendorSelect.value;
        const vendor = this.vendorData[vendorId];
        if (!vendor) return;
        
        // Build heatmap data
        const heatmapHTML = `
            <div class="security-heatmap-grid">
                <div class="heatmap-header">
                    <div class="heatmap-corner">Security Controls</div>
                    ${Object.keys(this.securityCapabilities).map(capabilityKey => {
                        const capability = this.securityCapabilities[capabilityKey];
                        return `
                            <div class="heatmap-capability-header">
                                <span>${capability.name}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                ${this.threatCategories.map(threat => {
                    // Calculate effectiveness for each capability against this threat
                    const effectivenessScores = {};
                    
                    Object.keys(this.securityCapabilities).forEach(capabilityKey => {
                        effectivenessScores[capabilityKey] = this.calculateThreatEffectiveness(
                            vendor, capabilityKey, threat.id
                        );
                    });
                    
                    return `
                        <div class="heatmap-row">
                            <div class="heatmap-threat-name">
                                <div class="threat-icon">
                                    <i class="fas fa-shield-alt"></i>
                                </div>
                                <span>${threat.name}</span>
                            </div>
                            ${Object.keys(this.securityCapabilities).map(capabilityKey => {
                                const score = effectivenessScores[capabilityKey];
                                
                                // Determine color class based on score
                                let colorClass = '';
                                if (score >= 90) colorClass = 'excellent';
                                else if (score >= 75) colorClass = 'good';
                                else if (score >= 60) colorClass = 'adequate';
                                else if (score >= 40) colorClass = 'fair';
                                else colorClass = 'poor';
                                
                                return `
                                    <div class="heatmap-cell ${colorClass}">
                                        <span class="heatmap-value">${score}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div class="heatmap-legend">
                <div class="legend-item">
                    <div class="legend-color excellent"></div>
                    <span>Excellent (90-100)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color good"></div>
                    <span>Good (75-89)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color adequate"></div>
                    <span>Adequate (60-74)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color fair"></div>
                    <span>Fair (40-59)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color poor"></div>
                    <span>Poor (0-39)</span>
                </div>
            </div>
        `;
        
        // Update container
        heatmapContainer.innerHTML = heatmapHTML;
    }
    
    updateThreatProtectionChart() {
        const chartCanvas = document.getElementById('threat-protection-chart');
        if (!chartCanvas) return;
        
        // Get selected vendor
        const vendorSelect = document.getElementById('capability-vendor-select');
        if (!vendorSelect) return;
        
        const vendorId = vendorSelect.value;
        const vendor = this.vendorData[vendorId];
        if (!vendor) return;
        
        // Prepare data for radar chart
        const threatLabels = this.threatCategories.map(threat => threat.name);
        const threatScores = this.threatCategories.map(threat => {
            // Average effectiveness across all capabilities
            let totalScore = 0;
            let count = 0;
            
            Object.keys(this.securityCapabilities).forEach(capabilityKey => {
                const score = this.calculateThreatEffectiveness(vendor, capabilityKey, threat.id);
                totalScore += score;
                count++;
            });
            
            return count > 0 ? Math.round(totalScore / count) : 0;
        });
        
        // Prepare dataset
        const dataset = {
            label: vendor.name,
            data: threatScores,
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(0, 123, 255, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0, 123, 255, 1)',
            pointRadius: 4
        };
        
        // Create or update chart
        if (window.threatProtectionChart) {
            window.threatProtectionChart.data.labels = threatLabels;
            window.threatProtectionChart.data.datasets = [dataset];
            window.threatProtectionChart.update();
        } else {
            window.threatProtectionChart = new Chart(chartCanvas, {
                type: 'radar',
                data: {
                    labels: threatLabels,
                    datasets: [dataset]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: {
                                display: true
                            },
                            suggestedMin: 0,
                            suggestedMax: 100,
                            ticks: {
                                stepSize: 20,
                                showLabelBackdrop: false
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.raw}%`;
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    
    updateSecurityMetrics() {
        // Get selected vendor
        const vendorSelect = document.getElementById('capability-vendor-select');
        if (!vendorSelect) return;
        
        const vendorId = vendorSelect.value;
        const vendor = this.vendorData[vendorId];
        if (!vendor) return;
        
        // Update Zero Trust Readiness
        const zeroTrustReadiness = document.getElementById('zero-trust-readiness');
        if (zeroTrustReadiness && vendor.features && vendor.features.zeroTrust) {
            zeroTrustReadiness.textContent = `${vendor.features.zeroTrust}%`;
        }
        
        // Update Threat Protection
        const threatProtection = document.getElementById('threat-protection-score');
        if (threatProtection && vendor.features && vendor.features.threatResponse) {
            threatProtection.textContent = `${vendor.features.threatResponse}%`;
        }
        
        // Update Security Coverage
        const securityCoverage = document.getElementById('security-coverage');
        if (securityCoverage) {
            // Calculate average of key security features
            const features = ['zeroTrust', 'endpointVisibility', 'threatResponse', 'multiVendor'];
            let totalScore = 0;
            let count = 0;
            
            features.forEach(feature => {
                if (vendor.features && vendor.features[feature]) {
                    totalScore += vendor.features[feature];
                    count++;
                }
            });
            
            const coverageScore = count > 0 ? Math.round(totalScore / count) : 0;
            securityCoverage.textContent = `${coverageScore}%`;
        }
        
        // Update Security Maturity
        const securityMaturity = document.getElementById('security-maturity');
        if (securityMaturity) {
            // Calculate based on zero trust and other advanced features
            const maturityScore = vendor.features ? 
                (vendor.features.zeroTrust * 0.4 + 
                vendor.features.threatResponse * 0.3 + 
                vendor.features.automation * 0.3) : 0;
            
            let maturityLevel = 'Basic';
            if (maturityScore >= 90) maturityLevel = 'Leading';
            else if (maturityScore >= 75) maturityLevel = 'Advanced';
            else if (maturityScore >= 60) maturityLevel = 'Intermediate';
            
            securityMaturity.textContent = maturityLevel;
        }
    }
    
    calculateVendorSecurityScores(vendor) {
        const scores = {};
        
        // Map vendor features to security capabilities
        if (vendor.features) {
            // Zero Trust
            scores.zeroTrust = vendor.features.zeroTrust || 0;
            
            // Endpoint Visibility
            scores.endpointVisibility = vendor.features.endpointVisibility || 0;
            
            // Access Control
            // Average of relevant features
            const accessFeatures = ['zeroTrust', 'multiVendor', 'remoteAccess'];
            let accessTotal = 0;
            let accessCount = 0;
            
            accessFeatures.forEach(feature => {
                if (vendor.features[feature]) {
                    accessTotal += vendor.features[feature];
                    accessCount++;
                }
            });
            
            scores.accessControl = accessCount > 0 ? Math.round(accessTotal / accessCount) : 0;
            
            // Threat Protection
            scores.threatProtection = vendor.features.threatResponse || 0;
            
            // Compliance Management
            scores.compliance = vendor.features.compliance || vendor.security?.complianceCoverage || 0;
        }
        
        return scores;
    }
    
    calculateIndustryBenchmarkScores(industryId) {
        const industryData = this.industryData[industryId];
        if (!industryData) return {};
        
        const scores = {
            zeroTrust: 0,
            endpointVisibility: 0,
            accessControl: 0,
            threatProtection: 0,
            compliance: 0
        };
        
        // Calculate benchmark based on best fit vendors for this industry
        if (industryData.bestFitVendors && industryData.bestFitVendors.length > 0) {
            let vendorCount = 0;
            
            industryData.bestFitVendors.forEach(vendorId => {
                const vendor = this.vendorData[vendorId];
                if (vendor) {
                    const vendorScores = this.calculateVendorSecurityScores(vendor);
                    
                    // Add to totals
                    Object.keys(scores).forEach(key => {
                        scores[key] += vendorScores[key] || 0;
                    });
                    
                    vendorCount++;
                }
            });
            
            // Calculate averages
            if (vendorCount > 0) {
                Object.keys(scores).forEach(key => {
                    scores[key] = Math.round(scores[key] / vendorCount);
                });
            }
            
            // Adjust based on industry-specific needs
            if (industryId === 'healthcare') {
                scores.compliance += 5; // Higher compliance needs
            } else if (industryId === 'financial') {
                scores.threatProtection += 5; // Higher threat protection needs
                scores.compliance += 10;
            } else if (industryId === 'retail') {
                scores.endpointVisibility += 5; // Higher endpoint visibility needs
            }
        }
        
        return scores;
    }
    
    calculateZeroTrustScores(vendor) {
        // Zero Trust principles and their mapping to vendor features
        const ztPrinciples = [
            { id: "verifyExplicitly", features: ["zeroTrust", "endpointVisibility"] },
            { id: "leastPrivilege", features: ["zeroTrust", "automation"] },
            { id: "assumeBreach", features: ["threatResponse", "endpointVisibility"] },
            { id: "neverTrust", features: ["zeroTrust", "compliance"] },
            { id: "deviceTrust", features: ["endpointVisibility", "remoteAccess"] },
            { id: "continuousMonitoring", features: ["endpointVisibility", "threatResponse"] }
        ];
        
        return ztPrinciples.map(principle => {
            let total = 0;
            let count = 0;
            
            principle.features.forEach(feature => {
                if (vendor.features && vendor.features[feature]) {
                    total += vendor.features[feature];
                    count++;
                }
            });
            
            return count > 0 ? Math.round(total / count) : 0;
        });
    }
    
    calculateZeroTrustPillarScores(vendor) {
        const pillarScores = {
            identities: 0,
            devices: 0,
            networks: 0,
            applications: 0,
            data: 0,
            infrastructure: 0
        };
        
        if (vendor.features) {
            // Identities pillar - based on authentication capabilities
            pillarScores.identities = vendor.authCapabilities && vendor.authCapabilities.certificateManagement ? 
                (vendor.authCapabilities.certificateManagement === 'Industry-leading' ? 95 :
                 vendor.authCapabilities.certificateManagement === 'Cloud-based CA' ? 90 :
                 vendor.authCapabilities.certificateManagement === 'Built-in CA with SCEP' ? 85 : 70) : 50;
            
            // Devices pillar - based on endpoint visibility
            pillarScores.devices = vendor.features.endpointVisibility || 50;
            
            // Networks pillar - based on multi-vendor and segmentation capabilities
            pillarScores.networks = Math.round((
                (vendor.features.multiVendor || 50) + 
                (vendor.features.zeroTrust || 50)
            ) / 2);
            
            // Applications pillar - based on automation and contextual access
            pillarScores.applications = Math.round((
                (vendor.features.automation || 50) + 
                (vendor.features.userExperience || 50)
            ) / 2);
            
            // Data pillar - based on data protection capabilities (estimated)
            pillarScores.data = Math.round((
                (vendor.features.compliance || 50) + 
                (vendor.features.threatResponse || 50)
            ) / 2);
            
            // Infrastructure pillar - based on management capabilities
            pillarScores.infrastructure = Math.round((
                (vendor.features.cloudNative || 50) + 
                (vendor.features.scalability || 50)
            ) / 2);
        }
        
        return pillarScores;
    }
    
    calculateThreatEffectiveness(vendor, capabilityKey, threatId) {
        if (!vendor.features) return 0;
        
        // Matrix of capability effectiveness against threats
        const effectivenessMatrix = {
            zeroTrust: {
                unauthorized: 0.9,
                malware: 0.6,
                lateral: 0.9,
                dataExfil: 0.7,
                insider: 0.7,
                byod: 0.8,
                phishing: 0.7,
                iot: 0.6
            },
            endpointVisibility: {
                unauthorized: 0.8,
                malware: 0.7,
                lateral: 0.6,
                dataExfil: 0.5,
                insider: 0.7,
                byod: 0.9,
                phishing: 0.4,
                iot: 0.9
            },
            accessControl: {
                unauthorized: 0.9,
                malware: 0.5,
                lateral: 0.8,
                dataExfil: 0.6,
                insider: 0.6,
                byod: 0.8,
                phishing: 0.7,
                iot: 0.7
            },
            threatProtection: {
                unauthorized: 0.5,
                malware: 0.9,
                lateral: 0.8,
                dataExfil: 0.8,
                insider: 0.7,
                byod: 0.6,
                phishing: 0.8,
                iot: 0.7
            },
            compliance: {
                unauthorized: 0.6,
                malware: 0.5,
                lateral: 0.5,
                dataExfil: 0.7,
                insider: 0.8,
                byod: 0.5,
                phishing: 0.4,
                iot: 0.5
            }
        };
        
        // Get capability score for this vendor
        const capabilityScores = this.calculateVendorSecurityScores(vendor);
        const capabilityScore = capabilityScores[capabilityKey] || 0;
        
        // Get effectiveness modifier for this capability against this threat
        const effectivenessModifier = effectivenessMatrix[capabilityKey]?.[threatId] || 0.5;
        
        // Calculate final effectiveness score
        return Math.round(capabilityScore * effectivenessModifier);
    }
}

// Initialize the component
window.securityPostureAnalyzer = new SecurityPostureAnalyzer();

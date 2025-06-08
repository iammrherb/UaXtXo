// Enhanced Platform Application with Complete Integration
class EnhancedPlatformApplication {

    getFeatureValue(vendor, featurePath, type = 'text') {
        const pathParts = featurePath.split('.');
        let value = vendor;
        for (const part of pathParts) {
            if (value && typeof value === 'object' && value.hasOwnProperty(part)) {
                value = value[part];
            } else {
                // If a part of the path is not found, return default for type
                return type === 'boolean' ? false : type === 'score' ? 0 : 'N/A';
            }
        }

        if (type === 'boolean') {
            // Handle various affirmative string values as true
            const lowerValue = String(value).toLowerCase();
            return value === true || lowerValue === 'yes' || lowerValue === 'full' || value === 100 || lowerValue === 'included';
        }
        if (type === 'score' || type === 'score_normalized') {
            const numValue = parseInt(value);
            return isNaN(numValue) ? 0 : numValue;
        }
        // Ensure string conversion for display, even for numbers if not a score/boolean
        return value !== undefined && value !== null ? String(value) : 'N/A';
    }

    getFeatureScoreClass(score) {
        if (typeof score !== 'number' || isNaN(score)) return 'na';
        if (score >= 90) return 'excellent';
        if (score >= 75) return 'good';
        if (score >= 50) return 'average';
        if (score > 0) return 'poor';
        return 'na';
    }

    getFeatureIcon(value) {
        const lowerValue = String(value).toLowerCase();
        if (value === true || lowerValue === 'yes' || lowerValue === 'full' || lowerValue === 'included' || lowerValue === 'cloud-native' || (typeof value === 'number' && value >= 75) ) {
            return '<i class="fas fa-check-circle text-success"></i>';
        }
        if (value === false || lowerValue === 'no' || lowerValue === 'on-premise' || (typeof value === 'number' && value < 50 && value !== 0) ) {
             return '<i class="fas fa-times-circle text-danger"></i>';
        }
        if (lowerValue === 'partial' || lowerValue === 'hybrid' || (typeof value === 'number' && value >= 50 && value < 75) ) {
            return '<i class="fas fa-adjust text-warning"></i>';
        }
        if (value === 0 || lowerValue === 'none' || lowerValue === 'n/a') {
            return '<i class="fas fa-minus-circle text-muted"></i>';
        }
        return '';
    }

    renderComparison(content) {
        if (!this.selectedVendors || this.selectedVendors.length === 0) {
            content.innerHTML = '<p class="text-center mt-5">Please select at least one vendor to compare.</p>';
            return;
        }

        const featureCategories = [
            {
                name: 'Core NAC Features',
                features: [
                    { label: '802.1X Authentication', path: 'features.core.802.1X Authentication', type: 'boolean' },
                    { label: 'Policy Engine', path: 'features.core.Policy Engine', type: 'boolean' },
                    { label: 'Device Profiling', path: 'features.core.Device Profiling', type: 'boolean' },
                    { label: 'Guest Access', path: 'features.core.Guest Access', type: 'boolean' },
                    { label: 'Risk Assessment Score', path: 'features.core.Risk Assessment', type: 'score' },
                ]
            },
            {
                name: 'Zero Trust Capabilities',
                features: [
                    { label: 'Native Zero Trust', path: 'features.zeroTrust.native', type: 'boolean' },
                    { label: 'Microsegmentation', path: 'features.zeroTrust.microsegmentation', type: 'boolean' },
                    { label: 'ZT Maturity Score', path: 'features.zeroTrust.score', type: 'score' },
                    { label: 'Continuous Authentication', path: 'features.zeroTrust.continuousAuth', type: 'boolean' },
                ]
            },
            {
                name: 'Deployment & Management',
                features: [
                    { label: 'Deployment Model', path: 'deployment.model', type: 'text' },
                    { label: 'Deployment Time (hours)', path: 'deployment.time', type: 'text' },
                    { label: 'Cloud Managed', path: 'deployment.cloudManaged', type: 'boolean' },
                    { label: 'Scalability (devices)', path: 'deployment.scalability', type: 'text' },
                ]
            },
            {
                name: 'Automation & Orchestration',
                features: [
                    { label: 'Automation Level (%)', path: 'features.automation', type: 'score' },
                    { label: 'SOAR Integration', path: 'features.integrations.SOAR', type: 'boolean' },
                    { label: 'SIEM Integration', path: 'features.integrations.SIEM', type: 'boolean' },
                ]
            },
            {
                name: 'Security Operations',
                features: [
                    { label: 'MTTR (minutes)', path: 'features.security.mttr', type: 'text' },
                    { label: 'AI Threat Detection', path: 'features.security.aiThreatDetection', type: 'boolean' },
                    { label: 'Detection Accuracy (%)', path: 'features.security.accuracy', type: 'score' },
                ]
            },
             {
                name: 'Compliance Features',
                features: [
                    { label: 'Audit Reporting', path: 'compliance.auditReporting', type: 'boolean' },
                    { label: 'Compliance Automation (%)', path: 'features.compliance.automation', type: 'score' },
                ]
            }
        ];

        let tableHTML = `
            <div class="comparison-view fade-in">
                <div class="view-header">
                    <h1>Feature Comparison Matrix</h1>
                    <p class="view-subtitle">Side-by-side feature comparison of selected NAC vendors.</p>
                </div>
                <div class="table-responsive mt-4">
                    <table class="data-table comparison-table">
                        <thead>
                            <tr>
                                <th class="feature-category-header">Feature Category</th>
                                <th class="feature-name-header">Feature</th>
                                ${this.selectedVendors.map(vendorId => {
                                    const vendor = window.VendorDatabase[vendorId];
                                    return `<th>
                                                <img src="${window.getVendorLogo(vendorId)}" alt="${vendor?.name || vendorId}" class="vendor-logo-small-table">
                                                ${vendor?.name || vendorId}
                                            </th>`;
                                }).join('')}
                            </tr>
                        </thead>
                        <tbody>
        `;

        featureCategories.forEach(category => {
            tableHTML += `<tr><td colspan="${2 + this.selectedVendors.length}" class="category-row">${category.name}</td></tr>`;
            category.features.forEach(feature => {
                tableHTML += `
                    <tr>
                        <td></td>
                        <td>${feature.label}</td>
                        ${this.selectedVendors.map(vendorId => {
                            const vendorData = window.VendorDatabase[vendorId];
                            if (!vendorData) return '<td>N/A</td>';
                            const value = this.getFeatureValue(vendorData, feature.path, feature.type);
                            const scoreClass = (feature.type === 'score' || feature.type === 'score_normalized') ? this.getFeatureScoreClass(value) : '';
                            const icon = this.getFeatureIcon(value);
                            return `<td class="${scoreClass}">${icon} ${value}</td>`;
                        }).join('')}
                    </tr>
                `;
            });
        });

        tableHTML += `
                        </tbody>
                    </table>
                </div>
                <div class="chart-container radar-chart-container mt-5">
                     <div class="chart-header">
                        <h3>Overall Feature Radar Chart</h3>
                    </div>
                    <canvas id="comparison-radar-chart" height="400"></canvas>
                </div>
            </div>
        `;
        content.innerHTML = tableHTML;
    }

    initializeComparisonCharts() {
        const ctx = document.getElementById('comparison-radar-chart')?.getContext('2d');
        if (!ctx || !this.selectedVendors || this.selectedVendors.length === 0) {
            return;
        }

        const featurePathsForRadar = [
            { label: '802.1X', path: 'features.core.802.1X Authentication', type: 'boolean'},
            { label: 'Policy Engine', path: 'features.core.Policy Engine', type: 'boolean'},
            { label: 'Device Profiling', path: 'features.core.Device Profiling', type: 'boolean'},
            { label: 'Risk Score', path: 'features.core.Risk Assessment', type: 'score_normalized'},
            { label: 'ZT Maturity', path: 'features.zeroTrust.score', type: 'score_normalized'},
            { label: 'Automation', path: 'features.automation', type: 'score_normalized'},
            { label: 'Cloud Managed', path: 'deployment.cloudManaged', type: 'boolean'},
            { label: 'AI Detection', path: 'features.security.aiThreatDetection', type: 'boolean'}
        ];

        const labels = featurePathsForRadar.map(f => f.label);
        const datasets = this.selectedVendors.map((vendorId, index) => {
            const vendorData = window.VendorDatabase[vendorId];
            if (!vendorData) return { label: vendorId, data: labels.map(() => 0), hidden: true };

            const data = featurePathsForRadar.map(feature => {
                let value = this.getFeatureValue(vendorData, feature.path, feature.type);
                if (feature.type === 'boolean') return value ? 1 : 0;
                if (feature.type === 'score_normalized') return (value || 0) / 100.0;
                return 0;
            });

            const colorSet = [
                'rgba(0, 212, 170, 0.4)',
                'rgba(255, 107, 53, 0.4)',
                'rgba(59, 130, 246, 0.4)',
                'rgba(139, 92, 246, 0.4)',
                'rgba(245, 158, 11, 0.4)'
            ];
            const borderColorSet = [
                'rgba(0, 212, 170, 1)',
                'rgba(255, 107, 53, 1)',
                'rgba(59, 130, 246, 1)',
                'rgba(139, 92, 246, 1)',
                'rgba(245, 158, 11, 1)'
            ];

            return {
                label: vendorData.name,
                data: data,
                backgroundColor: colorSet[index % colorSet.length],
                borderColor: borderColorSet[index % borderColorSet.length],
                borderWidth: 2,
                pointBackgroundColor: borderColorSet[index % borderColorSet.length]
            };
        }).filter(ds => ds && !ds.hidden);

        if (window.comparisonRadarChart instanceof Chart) {
            window.comparisonRadarChart.destroy();
        }
         if (datasets.length === 0) {
            console.warn("No data available for comparison radar chart after filtering.");
            return;
        }

        window.comparisonRadarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                scales: {
                    r: {
                        angleLines: { display: true },
                        suggestedMin: 0,
                        suggestedMax: 1,
                        pointLabels: {
                            font: {
                                size: 13
                            }
                        },
                        ticks: {
                           display: false,
                           stepSize: 0.25
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                         labels: {
                            font: {
                                size: 14
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += Math.round(context.raw * 100) + '%';
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    constructor() {
        this.config = {
            devices: 2500,
            users: 1500,
            years: 3,
            industry: 'technology',
            complianceFrameworks: ['SOC 2', 'ISO 27001', 'HIPAA'],
            portnoxPricePerDevice: 4.00
        };
        
        this.selectedVendors = ['portnox', 'cisco', 'aruba'];
        this.currentView = 'dashboard';
        this.results = {};
        
        console.log('Enhanced Platform initialized');
    }
    
    init() {
        this.render();
        this.attachEventHandlers();
        this.calculate();
        this.showView('dashboard');
    }
    
    render() {
        document.getElementById('app').innerHTML = `
            <div class="platform-container">
                <!-- Header with Portnox branding -->
                <header class="platform-header">
                    <div class="header-content">
                        <div class="logo-section">
                            <img src="${window.getVendorLogo('portnox')}" alt="Portnox" class="company-logo">
                            <div>
                                <h1 class="platform-title">Total Cost Analyzer</h1>
                                <p class="platform-subtitle">Executive Decision Platform for Zero Trust NAC</p>
                            </div>
                        </div>
                        <div class="header-actions">
                            <button class="btn btn-primary" onclick="app.exportDetailedReport()">
                                <i class="fas fa-download"></i> Export Executive Report
                            </button>
                        </div>
                    </div>
                </header>
                
                <!-- Enhanced Configuration with all controls -->
                <section class="config-section">
                    <div class="config-container">
                        <div class="config-grid">
                            <div class="config-group">
                                <label>Organization Size</label>
                                <select id="org-size" class="form-select">
                                    <option value="100">Small (100 devices)</option>
                                    <option value="500">SMB (500 devices)</option>
                                    <option value="2500" selected>Medium (2,500 devices)</option>
                                    <option value="10000">Enterprise (10,000 devices)</option>
                                    <option value="50000">Large Enterprise (50,000 devices)</option>
                                </select>
                            </div>
                            
                            <div class="config-group">
                                <label>Industry</label>
                                <select id="industry" class="form-select">
                                    <option value="healthcare">Healthcare</option>
                                    <option value="finance">Finance</option>
                                    <option value="government">Government</option>
                                    <option value="education">Education</option>
                                    <option value="retail">Retail</option>
                                    <option value="technology" selected>Technology</option>
                                    <option value="manufacturing">Manufacturing</option>
                                    <option value="energy">Energy</option>
                                </select>
                            </div>
                            
                            <div class="config-group">
                                <label>Analysis Period</label>
                                <select id="years" class="form-select">
                                    <option value="1">1 Year</option>
                                    <option value="3" selected>3 Years</option>
                                    <option value="5">5 Years</option>
                                </select>
                            </div>
                            
                            <div class="config-group">
                                <label>Portnox Price/Device/Month</label>
                                <input type="number" id="portnox-price" class="form-input" 
                                       value="4.00" min="1" max="10" step="0.25">
                            </div>
                        </div>
                        
                        <!-- Enhanced Compliance Framework Selection -->
                        <div class="mt-2">
                            <label>Required Compliance Frameworks</label>
                            <div class="compliance-selector mt-1">
                                ${this.renderAllComplianceFrameworks()}
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Complete Vendor Selection Grid -->
                <section class="vendor-selection">
                    <div class="config-container">
                        <h3 class="mb-2">Select Vendors to Compare (All Available)</h3>
                        <div class="vendor-grid">
                            ${this.renderAllVendorCards()}
                        </div>
                    </div>
                </section>
                
                <!-- Enhanced Navigation -->
                <nav class="nav-section">
                    <div class="nav-tabs">
                        <button class="nav-tab active" data-view="dashboard">
                            <i class="fas fa-tachometer-alt"></i> Executive Dashboard
                        </button>
                        <button class="nav-tab" data-view="financial">
                            <i class="fas fa-dollar-sign"></i> Financial Analysis
                        </button>
                        <button class="nav-tab" data-view="risk-security">
                            <i class="fas fa-shield-alt"></i> Risk & Security
                        </button>
                        <button class="nav-tab" data-view="compliance">
                            <i class="fas fa-certificate"></i> Compliance Matrix
                        </button>
                        <button class="nav-tab" data-view="operational">
                            <i class="fas fa-cogs"></i> Operational Analysis
                        </button>
                        <button class="nav-tab" data-view="comparison">
                            <i class="fas fa-balance-scale"></i> Feature Comparison
                        </button>
                        <button class="nav-tab" data-view="insights">
                            <i class="fas fa-lightbulb"></i> Strategic Insights
                        </button>
                    </div>
                </nav>
                
                <!-- Main Content Area -->
                <main class="main-content" id="content">
                    <div class="loading">
                        <div class="loading-spinner"></div>
                    </div>
                </main>
            </div>
        `;
    }
    
    renderAllComplianceFrameworks() {
        // Get all frameworks from the compliance mapping
        const allFrameworks = Object.keys(window.ComplianceNACMapping.frameworks);
        
        return allFrameworks.map(fw => `
            <label class="checkbox-label">
                <input type="checkbox" value="${fw}" 
                       ${this.config.complianceFrameworks.includes(fw) ? 'checked' : ''}>
                ${fw} - ${window.ComplianceNACMapping.frameworks[fw].name}
            </label>
        `).join('');
    }
    
    renderAllVendorCards() {
        // Ensure all vendors are displayed
        const allVendors = Object.values(window.VendorDatabase).filter(v => v.id);
        
        return allVendors.map(vendor => `
            <div class="vendor-card ${this.selectedVendors.includes(vendor.id) ? 'selected' : ''} 
                         ${vendor.featured ? 'featured' : ''}"
                 data-vendor="${vendor.id}">
                ${vendor.featured ? '<span class="recommended-badge">Recommended</span>' : ''}
                <div class="vendor-logo">
                    <img src="${window.getVendorLogo(vendor.id)}" 
                         alt="${vendor.name}"
                         onerror="this.src='./img/vendors/default-logo.png'">
                </div>
                <div class="vendor-name">${vendor.name}</div>
                <div class="vendor-category">${vendor.category}</div>
                <div class="vendor-metrics">
                    <span class="metric">ZT: ${vendor.features.zeroTrust.score}/100</span>
                    <span class="metric">Auto: ${vendor.features.automation}%</span>
                </div>
            </div>
        `).join('');
    }
    
    calculate() {
        this.results = {};
        
        // Calculate for ALL selected vendors
        this.selectedVendors.forEach(vendorId => {
            const vendor = window.VendorDatabase[vendorId];
            if (!vendor) return;
            
            // Enhanced TCO calculation with all factors
            const tco = this.calculateEnhancedTCO(vendor);
            
            // Enhanced ROI with industry-specific factors
            const roi = this.calculateEnhancedROI(vendor, tco);
            
            // Compliance scoring with framework mapping
            const complianceScore = this.calculateDetailedCompliance(vendor);
            
            // Risk scoring with security factors
            const riskScore = this.calculateDetailedRisk(vendor);
            
            // Industry fit scoring
            const industryFit = window.ComplianceNACMapping.getIndustryRecommendations(
                this.config.industry, 
                vendor
            );
            
            this.results[vendorId] = {
                vendor,
                tco,
                roi,
                complianceScore,
                riskScore,
                industryFit
            };
        });
        
        // Update current view
        if (this.currentView) {
            this.showView(this.currentView);
        }
    }
    
    calculateEnhancedTCO(vendor) {
        const devices = this.config.devices;
        const years = this.config.years;
        
        // Use the comprehensive TCO calculation from VendorDatabase
        const baseTCO = window.VendorDatabase.calculateTCO(vendor.id, devices, years);
        
        // Add industry-specific costs
        const industryMultiplier = {
            healthcare: 1.2,  // Higher compliance costs
            finance: 1.3,     // Highest compliance and security costs
            government: 1.25, // High security requirements
            education: 0.9,   // Cost-sensitive
            retail: 1.0,      // Average
            technology: 1.0,  // Average
            manufacturing: 1.1, // OT/IT integration costs
            energy: 1.15      // Critical infrastructure costs
        };
        
        const multiplier = industryMultiplier[this.config.industry] || 1.0;
        
        // Apply industry multiplier to relevant costs
        baseTCO.compliance = (baseTCO.compliance || 0) * multiplier;
        baseTCO.hidden = (baseTCO.hidden || 0) * multiplier;
        
        // Recalculate total
        baseTCO.total = Object.values(baseTCO)
            .filter(v => typeof v === 'number' && !isNaN(v))
            .reduce((sum, cost) => sum + cost, 0);
        
        baseTCO.perDevicePerMonth = baseTCO.total / (devices * years * 12);
        
        return baseTCO;
    }
    
    calculateEnhancedROI(vendor, tco) {
        const baseROI = window.VendorDatabase.calculateROI(vendor.id, tco, this.config.devices);
        
        // Add industry-specific ROI factors
        const industryData = window.ComplianceNACMapping.industryRequirements[this.config.industry];
        
        if (industryData) {
            // Compliance automation savings
            const complianceHours = industryData.primary.length * 200; // Hours per framework
            const complianceSavings = complianceHours * 150 * (vendor.features.compliance.automation / 100);
            
            // Industry-specific breach costs
            const industryBreachCost = {
                healthcare: 10860000,  // Highest due to HIPAA
                finance: 5970000,
                government: 4620000,
                education: 3860000,
                retail: 3860000,
                technology: 4880000,
                manufacturing: 4470000,
                energy: 4650000
            };
            
            const breachCost = industryBreachCost[this.config.industry] || 4350000;
            const breachReduction = vendor.features?.zeroTrust?.score / 100 * 0.85;
            const securityValue = breachCost * 0.15 * breachReduction; // 15% annual breach probability
            
            baseROI.complianceValue = complianceSavings;
            baseROI.securityValue = securityValue;
            baseROI.totalAnnualValue = baseROI.totalAnnualValue + complianceSavings;
            
            // Recalculate ROI percentage
            const annualCost = tco.total / this.config.years;
            baseROI.percentage = Math.round(((baseROI.totalAnnualValue - annualCost) / annualCost) * 100);
        }
        
        return baseROI;
    }
    
    calculateDetailedCompliance(vendor) {
        const selectedFrameworks = this.config.complianceFrameworks;
        const scores = {};
        let totalScore = 0;
        
        selectedFrameworks.forEach(framework => {
            scores[framework] = window.ComplianceNACMapping.calculateVendorCompliance(vendor, framework);
            totalScore += scores[framework];
        });
        
        return {
            overall: selectedFrameworks.length > 0 ? Math.round(totalScore / selectedFrameworks.length) : 0,
            frameworks: scores,
            gaps: this.identifyComplianceGaps(vendor, selectedFrameworks)
        };
    }
    
    calculateDetailedRisk(vendor) {
        // Multi-factor risk calculation
        const factors = {
            zeroTrust: (100 - vendor.features?.zeroTrust?.score) * 0.3,
            mttr: Math.min(100, vendor.features?.security?.mttr / 2.4) * 0.2,
            automation: (100 - vendor.features?.automation) * 0.2,
            deployment: vendor.deployment.model === 'Cloud' ? 0 : 20,
            updates: vendor.operational.updates === 'Continuous' ? 0 : 10
        };
        
        const totalRisk = Object.values(factors).reduce((sum, risk) => sum + risk, 0);
        
        return {
            score: Math.round(totalRisk),
            factors: factors,
            level: totalRisk < 30 ? 'Low' : totalRisk < 60 ? 'Medium' : 'High'
        };
    }
    
    identifyComplianceGaps(vendor, frameworks) {
        const gaps = [];
        
        frameworks.forEach(fw => {
            if (!vendor.compliance?.frameworks?.includes(fw)) {
                const frameworkData = window.ComplianceNACMapping.frameworks[fw];
                if (frameworkData) {
                    gaps.push({
                        framework: fw,
                        name: frameworkData.name,
                        missingControls: Object.keys(frameworkData.nacControls).slice(0, 3)
                    });
                }
            }
        });
        
        return gaps;
    }
    
    renderStrategicInsights(container) {
        const portnox = this.results.portnox;
        const competitors = Object.values(this.results).filter(r => r.vendor.id !== 'portnox');
        
        container.innerHTML = `
            <div class="strategic-insights-view fade-in">
                <h2 class="mb-3">Strategic Insights & Recommendations</h2>
                
                <!-- Executive Summary -->
                <div class="insight-section">
                    <h3>Executive Summary</h3>
                    <div class="summary-card">
                        <p class="lead">
                            Based on comprehensive analysis of ${Object.keys(this.results).length} vendors 
                            across financial, security, compliance, and operational dimensions:
                        </p>
                        <div class="key-findings">
                            <div class="finding">
                                <i class="fas fa-check-circle text-success"></i>
                                <strong>Portnox CLEAR</strong> delivers ${this.getPortnoxAdvantagePercent()}% 
                                better overall value through cloud-native Zero Trust architecture
                            </div>
                            <div class="finding">
                                <i class="fas fa-dollar-sign text-success"></i>
                                Total savings of <strong>${this.formatCurrency(this.getTotalSavings())}</strong> 
                                over ${this.config.years} years versus legacy solutions
                            </div>
                            <div class="finding">
                                <i class="fas fa-clock text-success"></i>
                                Deployment in <strong>4 hours</strong> versus 
                                ${this.getAvgCompetitorDeploymentDays()} days industry average
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Industry-Specific Insights -->
                <div class="insight-section">
                    <h3>${this.config.industry.charAt(0).toUpperCase() + this.config.industry.slice(1)} 
                        Industry Recommendations</h3>
                    ${this.renderIndustryInsights()}
                </div>
                
                <!-- Compliance Readiness -->
                <div class="insight-section">
                    <h3>Compliance & Audit Readiness</h3>
                    ${this.renderComplianceInsights()}
                </div>
                
                <!-- Risk Mitigation Strategy -->
                <div class="insight-section">
                    <h3>Risk Mitigation & Security Strategy</h3>
                    ${this.renderRiskInsights()}
                </div>
                
                <!-- Action Plan -->
                <div class="insight-section">
                    <h3>Recommended Action Plan</h3>
                    ${this.renderActionPlan()}
                </div>
            </div>
        `;
    }
    
    renderIndustryInsights() {
        const industryData = window.ComplianceNACMapping.industryRequirements[this.config.industry];
        const portnoxFit = this.results.portnox?.industryFit;
        
        return `
            <div class="industry-insights">
                <div class="priority-requirements">
                    <h4>Critical Requirements for ${this.config.industry}</h4>
                    <ul>
                        ${industryData.nacPriorities.map(priority => `
                            <li>
                                <i class="fas fa-check text-success"></i>
                                ${priority}
                                ${this.checkPortnoxSupport(priority)}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="compliance-requirements">
                    <h4>Mandatory Compliance Frameworks</h4>
                    <div class="framework-grid">
                        ${industryData.primary.map(fw => `
                            <div class="framework-item">
                                <strong>${fw}</strong>
                                <span class="support-badge ${this.getFrameworkSupport('portnox', fw)}">
                                    ${this.getFrameworkSupportText('portnox', fw)}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="recommendation-box">
                    <h4>Industry-Specific Recommendation</h4>
                    <p>${this.getIndustryRecommendation()}</p>
                </div>
            </div>
        `;
    }
    
    renderComplianceInsights() {
        const portnoxCompliance = this.results.portnox?.complianceScore;
        const gaps = portnoxCompliance?.gaps || [];
        
        return `
            <div class="compliance-insights">
                <div class="compliance-summary">
                    <div class="metric-highlight">
                        <span class="metric-value">${portnoxCompliance?.overall || 95}%</span>
                        <span class="metric-label">Compliance Coverage</span>
                    </div>
                    <div class="metric-highlight">
                        <span class="metric-value">${this.config.complianceFrameworks.length}</span>
                        <span class="metric-label">Frameworks Supported</span>
                    </div>
                    <div class="metric-highlight">
                        <span class="metric-value">95%</span>
                        <span class="metric-label">Automation Level</span>
                    </div>
                </div>
                
                <div class="audit-benefits">
                    <h4>Audit & Compliance Benefits with Portnox</h4>
                    <ul>
                        <li><i class="fas fa-check"></i> Automated evidence collection reduces audit prep by 80%</li>
                        <li><i class="fas fa-check"></i> Real-time compliance dashboards for continuous monitoring</li>
                        <li><i class="fas fa-check"></i> Pre-built reports for all major frameworks</li>
                        <li><i class="fas fa-check"></i> Automatic control validation and gap analysis</li>
                    </ul>
                </div>
                
                ${gaps.length > 0 ? `
                    <div class="compliance-gaps">
                        <h4>Areas for Enhancement</h4>
                        ${gaps.map(gap => `
                            <div class="gap-item">
                                <strong>${gap.framework}</strong>: ${gap.name}
                                <p>Portnox provides coverage through automated policy engine and reporting</p>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    renderRiskInsights() {
        const portnoxRisk = this.results.portnox?.riskScore;
        const avgCompetitorRisk = this.getAvgCompetitorRisk();
        
        return `
            <div class="risk-insights">
                <div class="risk-comparison">
                    <div class="risk-metric">
                        <h4>Portnox Risk Score</h4>
                        <div class="risk-score low">
                            ${portnoxRisk?.score || 15}/100
                            <span class="risk-label">Low Risk</span>
                        </div>
                    </div>
                    <div class="risk-metric">
                        <h4>Industry Average</h4>
                        <div class="risk-score high">
                            ${avgCompetitorRisk}/100
                            <span class="risk-label">High Risk</span>
                        </div>
                    </div>
                </div>
                
                <div class="security-advantages">
                    <h4>Security Advantages with Portnox</h4>
                    <div class="advantage-grid">
                        <div class="advantage">
                            <i class="fas fa-shield-alt"></i>
                            <strong>Native Zero Trust</strong>
                            <p>98/100 Zero Trust maturity score with continuous verification</p>
                        </div>
                        <div class="advantage">
                            <i class="fas fa-brain"></i>
                            <strong>AI Threat Detection</strong>
                            <p>99.5% accuracy in identifying and preventing threats</p>
                        </div>
                        <div class="advantage">
                            <i class="fas fa-bolt"></i>
                            <strong>5-Minute MTTR</strong>
                            <p>Industry-leading response time vs 4-hour average</p>
                        </div>
                        <div class="advantage">
                            <i class="fas fa-robot"></i>
                            <strong>95% Automation</strong>
                            <p>Automated threat response and remediation</p>
                        </div>
                    </div>
                </div>
                
                <div class="breach-impact">
                    <h4>Breach Prevention Value</h4>
                    <p>With Portnox's 85% breach risk reduction, your organization could prevent:</p>
                    <ul>
                        <li>Potential breach costs: ${this.formatCurrency(this.getBreachCost())}</li>
                        <li>Annual risk mitigation value: ${this.formatCurrency(this.getAnnualRiskMitigation())}</li>
                        <li>Reputation and customer trust impact</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    renderActionPlan() {
        return `
            <div class="action-plan">
                <div class="timeline">
                    <div class="phase immediate">
                        <h4><i class="fas fa-fire"></i> Immediate (Week 1)</h4>
                        <ul>
                            <li>Schedule Portnox CLEAR demonstration</li>
                            <li>Identify pilot group (100-500 devices)</li>
                            <li>Review current NAC contract terms</li>
                            <li>Assess integration requirements</li>
                        </ul>
                    </div>
                    
                    <div class="phase short-term">
                        <h4><i class="fas fa-calendar-week"></i> Short-term (Weeks 2-4)</h4>
                        <ul>
                            <li>Deploy Portnox CLEAR pilot (4 hours)</li>
                            <li>Configure Zero Trust policies</li>
                            <li>Test compliance reporting</li>
                            <li>Validate ROI projections</li>
                        </ul>
                    </div>
                    
                    <div class="phase mid-term">
                        <h4><i class="fas fa-calendar-alt"></i> Mid-term (Months 2-3)</h4>
                        <ul>
                            <li>Expand to full production</li>
                            <li>Migrate from legacy NAC</li>
                            <li>Train IT team (2 hours online)</li>
                            <li>Optimize policies and automation</li>
                        </ul>
                    </div>
                    
                    <div class="phase long-term">
                        <h4><i class="fas fa-chart-line"></i> Long-term (Months 4+)</h4>
                        <ul>
                            <li>Achieve full Zero Trust maturity</li>
                            <li>Realize complete cost savings</li>
                            <li>Leverage advanced analytics</li>
                            <li>Continuous improvement</li>
                        </ul>
                    </div>
                </div>
                
                <div class="success-metrics">
                    <h4>Success Metrics</h4>
                    <ul>
                        <li>✓ ${this.getPortnoxSavingsPercent()}% reduction in TCO achieved</li>
                        <li>✓ 4-hour deployment completed</li>
                        <li>✓ 95% automation level reached</li>
                        <li>✓ Zero Trust architecture implemented</li>
                        <li>✓ Compliance automation active</li>
                        <li>✓ Cyber insurance premiums reduced</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    showView(view) {
        // Update navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.view === view);
        });
        
        this.currentView = view;
        const content = document.getElementById('content');
        
        switch(view) {
            case 'dashboard':
                if (window.DashboardView && typeof window.DashboardView.renderComplete === 'function') {
                    content.innerHTML = window.DashboardView.renderComplete(this.results, this.config);
                } else if (window.DashboardView && typeof window.DashboardView.render === 'function') {
                    content.innerHTML = window.DashboardView.render(this.results, this.config); // Also pass data to render if it's the fallback
                } else {
                    console.error('DashboardView module not loaded or render/renderComplete method missing.');
                    content.innerHTML = '<p style="color: red; text-align: center; margin-top: 20px;">Error: Dashboard view module not loaded correctly. Please check console.</p>';
                }
                break;
            case 'executive':
                if (window.ExecutiveSummaryView && typeof window.ExecutiveSummaryView.renderComplete === 'function') {
                    content.innerHTML = window.ExecutiveSummaryView.renderComplete(this.results, this.config);
                } else if (window.ExecutiveSummaryView && typeof window.ExecutiveSummaryView.render === 'function') {
                    content.innerHTML = window.ExecutiveSummaryView.render(this.results, this.config);
                } else {
                    console.error('ExecutiveSummaryView module not loaded or render methods missing.');
                    content.innerHTML = '<p style="color: red; text-align: center; margin-top: 20px;">Error: Executive Summary view module not loaded correctly.</p>';
                }
                break;
            case 'financial':
                if (window.FinancialAnalysisView && typeof window.FinancialAnalysisView.renderComplete === 'function') {
                    content.innerHTML = window.FinancialAnalysisView.renderComplete(this.results, this.config);
                } else if (window.FinancialAnalysisView && typeof window.FinancialAnalysisView.render === 'function') {
                    content.innerHTML = window.FinancialAnalysisView.render(this.results, this.config);
                } else {
                    console.error('FinancialAnalysisView module not loaded or render methods missing.');
                    content.innerHTML = '<p style="color: red; text-align: center; margin-top: 20px;">Error: Financial Analysis view module not loaded correctly.</p>';
                }
                break;
            case 'risk-security':
                if (window.riskSecurityView && typeof window.riskSecurityView.render === 'function') {
                    // Pass data directly to render, which should then call updateViewData internally.
                    window.riskSecurityView.render(content, this.results, this.config);
                } else {
                    content.innerHTML = '<p>Error: Risk & Security view module not loaded.</p>';
                    console.error('RiskSecurityView or its render method not found.');
                }
                break;
            case 'compliance':
                if (window.NAC && window.NAC.compliance && typeof window.NAC.compliance.render === 'function') {
                    window.NAC.compliance.render(content, this.results, this.config);
                } else {
                    console.error('ComplianceViewEnhanced module not loaded or NAC.compliance.render method missing.');
                    content.innerHTML = '<p style="color: red; text-align: center; margin-top: 20px;">Error: Compliance view module not loaded correctly. Please check console.</p>';
                }
                break;
            case 'operational':
                if (window.OperationalImpact && typeof window.OperationalImpact === 'function') {
                    const operationalView = new window.OperationalImpact(this);
                    if (typeof operationalView.render === 'function') {
                        operationalView.render(content);
                    } else {
                        console.error('OperationalImpact module does not have a render method.');
                        content.innerHTML = '<p style="color: red; text-align: center; margin-top: 20px;">Error: OperationalImpact module does not have a render method.</p>';
                    }
                } else {
                    console.error('OperationalImpact module not loaded or not a constructor.');
                    content.innerHTML = '<p style="color: red; text-align: center; margin-top: 20px;">Error: OperationalImpact module not loaded correctly.</p>';
                }
                break;
            case 'comparison':
                if (typeof this.renderComparison === 'function') {
                    this.renderComparison(content);
                    if (typeof this.initializeComparisonCharts === 'function') {
                        this.initializeComparisonCharts();
                    } else {
                        console.error('initializeComparisonCharts method not found after porting.');
                    }
                } else {
                    content.innerHTML = '<p>Error: Comparison view render method not found.</p>';
                    console.error('renderComparison method not found after porting.');
                }
                break;
            case 'insights':
                if (window.StrategicInsights && typeof window.StrategicInsights === 'function') {
                    const insightsView = new window.StrategicInsights(this);
                    if (typeof insightsView.render === 'function') {
                        insightsView.render(content);
                    } else {
                        console.error('StrategicInsights module does not have a render method.');
                        content.innerHTML = '<p style="color: red; text-align: center; margin-top: 20px;">Error: StrategicInsights module does not have a render method.</p>';
                    }
                } else {
                    console.error('StrategicInsights module not loaded or not a constructor.');
                    content.innerHTML = '<p style="color: red; text-align: center; margin-top: 20px;">Error: StrategicInsights module not loaded correctly. Please check console.</p>';
                }
                break;
            default:
                content.innerHTML = `<p>View '${view}' not implemented yet.</p>`;
                console.warn(`Attempted to switch to unimplemented view: ${view}`);
        }
    }
    
    // Enhanced compliance matrix with all frameworks
    renderComplianceMatrix(container) {
        const allFrameworks = Object.keys(window.ComplianceNACMapping.frameworks);
        
        container.innerHTML = `
            <div class="compliance-matrix-view fade-in">
                <h2 class="mb-3">Comprehensive Compliance Matrix</h2>
                
                <!-- Framework Coverage Overview -->
                <div class="compliance-overview mb-4">
                    <h3>Framework Coverage by Vendor</h3>
                    <div class="coverage-summary">
                        ${this.renderComplianceSummaryCards()}
                    </div>
                </div>
                
                <!-- Detailed Compliance Matrix -->
                <div class="compliance-matrix-section">
                    <h3>Detailed Framework Support</h3>
                    <div class="matrix-table-wrapper">
                        <table class="compliance-matrix-table">
                            <thead>
                                <tr>
                                    <th>Framework</th>
                                    <th>Category</th>
                                    ${this.selectedVendors.map(v => 
                                        `<th>${this.results[v]?.vendor.name || v}</th>`
                                    ).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${allFrameworks.map(fw => {
                                    const fwData = window.ComplianceNACMapping.frameworks[fw];
                                    return `
                                        <tr>
                                            <td>
                                                <strong>${fw}</strong>
                                                <div class="fw-name">${fwData.name}</div>
                                            </td>
                                            <td>${fwData.category}</td>
                                            ${this.selectedVendors.map(vendorId => {
                                                const vendor = this.results[vendorId]?.vendor;
                                                const score = window.ComplianceNACMapping.calculateVendorCompliance(vendor, fw);
                                                return `
                                                    <td>
                                                        <div class="compliance-score-cell score-${this.getScoreClass(score)}">
                                                            ${score}%
                                                            ${this.getComplianceIcon(score)}
                                                        </div>
                                                    </td>
                                                `;
                                            }).join('')}
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- NAC Control Categories -->
                <div class="control-categories-section mt-4">
                    <h3>NAC Control Category Coverage</h3>
                    ${this.renderControlCategories()}
                </div>
            </div>
        `;
    }
    
    renderComplianceSummaryCards() {
        return this.selectedVendors.map(vendorId => {
            const result = this.results[vendorId];
            if (!result) return '';
            
            const vendor = result.vendor;
            const totalFrameworks = vendor.features.compliance.frameworks.length;
            const automationLevel = vendor.features.compliance.automation;
            
            return `
                <div class="compliance-summary-card ${vendor.id === 'portnox' ? 'highlighted' : ''}">
                    <h4>${vendor.name}</h4>
                    <div class="compliance-metrics">
                        <div class="metric">
                            <span class="value">${totalFrameworks}</span>
                            <span class="label">Frameworks</span>
                        </div>
                        <div class="metric">
                            <span class="value">${automationLevel}%</span>
                            <span class="label">Automation</span>
                        </div>
                        <div class="metric">
                            <span class="value">${result.complianceScore.overall}%</span>
                            <span class="label">Coverage</span>
                        </div>
                    </div>
                    ${vendor.id === 'portnox' ? `
                        <div class="compliance-advantages">
                            <p class="advantage">✓ Automated compliance reporting</p>
                            <p class="advantage">✓ Continuous control validation</p>
                            <p class="advantage">✓ Pre-built audit templates</p>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    }
    
    renderControlCategories() {
        const categories = window.ComplianceNACMapping.nacControlCategories;
        
        return `
            <div class="control-categories-grid">
                ${Object.entries(categories).map(([category, data]) => `
                    <div class="control-category-card">
                        <h4>${category}</h4>
                        <p class="description">${data.description}</p>
                        <div class="vendor-support">
                            ${this.selectedVendors.map(vendorId => {
                                const vendor = this.results[vendorId]?.vendor;
                                const support = this.assessControlSupport(vendor, category);
                                return `
                                    <div class="vendor-support-item">
                                        <span class="vendor-name">${vendor?.name}</span>
                                        <span class="support-level ${support.level}">
                                            ${support.text}
                                        </span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Helper methods for enhanced functionality
    checkPortnoxSupport(priority) {
        const supportMap = {
            "Zero Trust": "✓ Native Zero Trust with 98/100 score",
            "Multi-factor": "✓ Full MFA support with modern protocols",
            "BYOD": "✓ Comprehensive BYOD management",
            "Cloud": "✓ 100% cloud-native architecture",
            "Automation": "✓ 95% automation level"
        };
        
        for (const [key, value] of Object.entries(supportMap)) {
            if (priority.includes(key)) {
                return `<span class="support-note">${value}</span>`;
            }
        }
        return '';
    }
    
    getFrameworkSupport(vendorId, framework) {
        const vendor = this.results[vendorId]?.vendor;
        if (!vendor) return 'unsupported';
        
        const score = window.ComplianceNACMapping.calculateVendorCompliance(vendor, framework);
        if (score >= 90) return 'full-support';
        if (score >= 70) return 'partial-support';
        return 'limited-support';
    }
    
    getFrameworkSupportText(vendorId, framework) {
        const support = this.getFrameworkSupport(vendorId, framework);
        const map = {
            'full-support': 'Full Support',
            'partial-support': 'Partial Support',
            'limited-support': 'Limited Support',
            'unsupported': 'Not Supported'
        };
        return map[support] || 'Unknown';
    }
    
    getIndustryRecommendation() {
        const recommendations = {
            healthcare: "Portnox CLEAR's native HIPAA compliance and automated audit reporting reduces compliance effort by 80% while ensuring patient data protection through Zero Trust architecture.",
            finance: "With PCI DSS and SOX compliance built-in, Portnox CLEAR provides the microsegmentation and continuous monitoring required for financial services, reducing audit costs by 70%.",
            government: "Portnox CLEAR's FedRAMP-ready architecture and support for CAC/PIV authentication meets all federal requirements while eliminating the complexity of traditional NAC solutions.",
            education: "Portnox CLEAR's simple BYOD management and user-friendly portal reduces IT burden by 90% while ensuring FERPA compliance and student data protection.",
            retail: "Achieve PCI DSS compliance instantly with Portnox CLEAR's automated network segmentation and real-time monitoring, protecting payment systems without complexity.",
            technology: "Portnox CLEAR's API-first approach and cloud-native architecture aligns perfectly with DevOps practices while maintaining enterprise security standards.",
            manufacturing: "Seamlessly secure OT/IT convergence with Portnox CLEAR's agentless approach, protecting industrial systems without disrupting operations.",
            energy: "Meet NERC CIP requirements effortlessly with Portnox CLEAR's electronic security perimeter and continuous compliance monitoring."
        };
        
        return recommendations[this.config.industry] || recommendations.technology;
    }
    
    assessControlSupport(vendor, category) {
        if (!vendor) return { level: 'none', text: 'N/A' };
        
        const categoryMap = {
            "Identity and Authentication": {
                check: vendor.features?.core?.["802.1X Authentication"],
                level: vendor.features?.core?.["802.1X Authentication"] ? 'full' : 'partial'
            },
            "Access Control": {
                check: vendor.features?.core?.["Policy Engine"],
                level: vendor.features?.automation > 80 ? 'full' : 'partial'
            },
            "Network Segmentation": {
                check: vendor.features?.zeroTrust?.native,
                level: vendor.features?.zeroTrust?.native ? 'full' : 'limited'
            },
            "Device Compliance": {
                check: vendor.features?.core?.["Device Profiling"],
                level: vendor.features?.core?.["Risk Assessment"] ? 'full' : 'partial'
            },
            "Monitoring and Logging": {
                check: vendor.compliance?.auditReporting,
                level: vendor.compliance?.automation > 70 ? 'full' : 'partial'
            },
            "Incident Response": {
                check: vendor.features?.security?.mttr < 30,
                level: vendor.features?.security?.mttr < 30 ? 'full' : 'limited'
            }
        };
        
        const mapping = categoryMap[category] || { level: 'unknown', check: false };
        const levelText = {
            'full': 'Full Support',
            'partial': 'Partial',
            'limited': 'Limited',
            'none': 'None',
            'unknown': 'Unknown'
        };
        
        return {
            level: mapping.level,
            text: levelText[mapping.level] || 'Unknown'
        };
    }
    
    getComplianceIcon(score) {
        if (score >= 90) return '<i class="fas fa-check-circle text-success"></i>';
        if (score >= 70) return '<i class="fas fa-exclamation-circle text-warning"></i>';
        return '<i class="fas fa-times-circle text-danger"></i>';
    }
    
    getScoreClass(score) {
        if (score >= 90) return 'excellent';
        if (score >= 70) return 'good';
        if (score >= 50) return 'average';
        return 'poor';
    }
    
    // Calculation helper methods
    getPortnoxAdvantagePercent() {
        const portnox = this.results.portnox;
        const competitors = Object.values(this.results).filter(r => r.vendor.id !== 'portnox');
        if (!competitors.length) return 0;
        
        const avgCompetitorScore = competitors.reduce((sum, r) => {
            const score = (100 - r.riskScore.score) + r.complianceScore.overall + 
                         r.vendor.features.automation + r.vendor.features.zeroTrust.score;
            return sum + score;
        }, 0) / competitors.length;
        
        const portnoxScore = (100 - portnox.riskScore.score) + portnox.complianceScore.overall + 
                            portnox.vendor.features.automation + portnox.vendor.features.zeroTrust.score;
        
        return Math.round((portnoxScore / avgCompetitorScore - 1) * 100);
    }
    
    getTotalSavings() {
        const portnox = this.results.portnox;
        const competitors = Object.values(this.results).filter(r => r.vendor.id !== 'portnox');
        if (!competitors.length) return 0;
        
        const avgCompetitorTCO = competitors.reduce((sum, r) => sum + r.tco.total, 0) / competitors.length;
        return avgCompetitorTCO - portnox.tco.total;
    }
    
    getAvgCompetitorDeploymentDays() {
        const competitors = Object.values(this.results).filter(r => r.vendor.id !== 'portnox');
        if (!competitors.length) return 0;
        
        const avgHours = competitors.reduce((sum, r) => sum + r.vendor.deployment.time, 0) / competitors.length;
        return Math.round(avgHours / 24);
    }
    
    getAvgCompetitorRisk() {
        const competitors = Object.values(this.results).filter(r => r.vendor.id !== 'portnox');
        if (!competitors.length) return 0;
        
        return Math.round(competitors.reduce((sum, r) => sum + r.riskScore.score, 0) / competitors.length);
    }
    
    getBreachCost() {
        const industryBreachCost = {
            healthcare: 10860000,
            finance: 5970000,
            government: 4620000,
            education: 3860000,
            retail: 3860000,
            technology: 4880000,
            manufacturing: 4470000,
            energy: 4650000
        };
        
        return industryBreachCost[this.config.industry] || 4350000;
    }
    
    getAnnualRiskMitigation() {
        const breachCost = this.getBreachCost();
        const portnox = this.results.portnox;
        const breachProbability = 0.15; // 15% annual probability
        const riskReduction = portnox?.vendor.features?.zeroTrust?.score / 100 * 0.85 || 0.85;
        
        return breachCost * breachProbability * riskReduction;
    }
    
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    exportDetailedReport() {
        const report = this.generateComprehensiveReport();
        
        // Create download
        const blob = new Blob([report], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Portnox-TCO-Analysis-${this.config.industry}-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        window.URL.revokeObjectURL(url);
    }
    
    generateComprehensiveReport() {
        return `
PORTNOX TOTAL COST ANALYZER - EXECUTIVE REPORT
==============================================
Generated: ${new Date().toLocaleString()}
Industry: ${this.config.industry.toUpperCase()}
Organization Size: ${this.config.devices.toLocaleString()} devices, ${this.config.users.toLocaleString()} users
Analysis Period: ${this.config.years} years
Selected Compliance Frameworks: ${this.config.complianceFrameworks.join(', ')}

EXECUTIVE SUMMARY
-----------------
${this.generateExecutiveSummary()}

VENDOR COMPARISON (${this.selectedVendors.length} vendors analyzed)
-----------------
${this.generateVendorComparison()}

FINANCIAL ANALYSIS
-----------------
${this.generateFinancialSummary()}

COMPLIANCE & REGULATORY ANALYSIS
--------------------------------
${this.generateComplianceSummary()}

RISK & SECURITY ASSESSMENT
--------------------------
${this.generateRiskSummary()}

OPERATIONAL EFFICIENCY
----------------------
${this.generateOperationalSummary()}

RECOMMENDATIONS
---------------
${this.generateRecommendations()}

IMPLEMENTATION ROADMAP
----------------------
${this.generateRoadmap()}

For interactive analysis and detailed breakdowns, please refer to the web platform.
        `;
    }
    
    generateExecutiveSummary() {
        const portnox = this.results.portnox;
        const savings = this.getTotalSavings();
        const savingsPercent = this.getPortnoxSavingsPercent();
        
        return `
Portnox CLEAR delivers ${savingsPercent}% lower total cost of ownership compared to traditional NAC solutions, 
with savings of ${this.formatCurrency(savings)} over ${this.config.years} years.

KEY FINDINGS:
• Best overall value: Portnox CLEAR (${this.formatCurrency(portnox.tco.total)} TCO)
• Fastest deployment: 4 hours vs. ${this.getAvgCompetitorDeploymentDays()} days average
• Highest security score: 98/100 Zero Trust maturity
• Maximum automation: 95% vs. 35% industry average
• Compliance coverage: ${portnox.complianceScore.overall}% for selected frameworks
• Lowest risk score: ${portnox.riskScore.score}/100 vs. ${this.getAvgCompetitorRisk()}/100 average

STRATEGIC ADVANTAGES:
• Cloud-native architecture eliminates hardware costs and complexity
• Native Zero Trust implementation reduces breach risk by 85%
• Automated compliance reporting saves 500+ hours annually
• No hidden costs or surprise fees
        `;
    }
    
    generateVendorComparison() {
        return this.selectedVendors.map(vendorId => {
            const result = this.results[vendorId];
            const vendor = result.vendor;
            
            return `
${vendor.name} (${vendor.vendor})
- Category: ${vendor.category}
- Deployment: ${vendor.deployment}
- TCO: ${this.formatCurrency(result.tco.total)} (${this.formatCurrency(result.tco.perDevicePerMonth)}/device/month)
- Hidden Costs: ${this.formatCurrency(result.tco.hidden)}
- Zero Trust Score: ${vendor.features.zeroTrust.score}/100
- Automation: ${vendor.features.automation}%
- Compliance Score: ${result.complianceScore.overall}%
- Risk Score: ${result.riskScore.score}/100
- FTE Required: ${vendor.operational.fteRequired}
- Deployment Time: ${vendor.deployment.time < 24 ? vendor.deployment.time + ' hours' : Math.round(vendor.deployment.time/24) + ' days'}
            `;
        }).join('\n');
    }
    
    generateFinancialSummary() {
        const portnox = this.results.portnox;
        const competitors = Object.values(this.results).filter(r => r.vendor.id !== 'portnox');
        
        return `
COST BREAKDOWN BY VENDOR:
${this.selectedVendors.map(vendorId => {
    const result = this.results[vendorId];
    const tco = result.tco;
    return `
${result.vendor.name}:
- Hardware: ${this.formatCurrency(tco.hardware)}
- Software: ${this.formatCurrency(tco.software)}
- Implementation: ${this.formatCurrency(tco.implementation)}
- Training: ${this.formatCurrency(tco.training)}
- Support: ${this.formatCurrency(tco.support)}
- Operations (FTE): ${this.formatCurrency(tco.operations)}
- Hidden Costs: ${this.formatCurrency(tco.hidden)}
- TOTAL: ${this.formatCurrency(tco.total)}
    `;
}).join('')}

ROI ANALYSIS:
${this.selectedVendors.map(vendorId => {
    const result = this.results[vendorId];
    return `
${result.vendor.name}:
- ROI: ${result.roi.percentage}%
- Payback Period: ${result.roi.paybackMonths} months
- Annual Value: ${this.formatCurrency(result.roi.annualValue)}
    `;
}).join('')}

SAVINGS WITH PORTNOX:
- vs. Average Competitor: ${this.formatCurrency(this.getTotalSavings())} (${this.getPortnoxSavingsPercent()}%)
- Annual Operating Savings: ${this.formatCurrency(this.getTotalSavings() / this.config.years)}
- Per Device Savings: ${this.formatCurrency(this.getTotalSavings() / this.config.devices)}
        `;
    }
    
    generateComplianceSummary() {
        const industryReqs = window.ComplianceNACMapping.industryRequirements[this.config.industry];
        
        return `
INDUSTRY REQUIREMENTS (${this.config.industry}):
Primary Frameworks: ${industryReqs.primary.join(', ')}
Secondary Frameworks: ${industryReqs.secondary.join(', ')}

COMPLIANCE COVERAGE BY VENDOR:
${this.selectedVendors.map(vendorId => {
    const result = this.results[vendorId];
    const vendor = result.vendor;
    return `
${vendor.name}:
- Overall Compliance Score: ${result.complianceScore.overall}%
- Frameworks Supported: ${vendor.features.compliance.frameworks.length}
- Automation Level: ${vendor.features.compliance.automation}%
- Industry Fit: ${result.industryFit.score}%
    `;
}).join('')}

PORTNOX COMPLIANCE ADVANTAGES:
• Automated evidence collection for all major frameworks
• Pre-built audit report templates
• Continuous compliance monitoring
• Real-time policy validation
• Automatic remediation workflows
        `;
    }
    
    generateRiskSummary() {
        const portnox = this.results.portnox;
        const breachCost = this.getBreachCost();
        const riskMitigation = this.getAnnualRiskMitigation();
        
        return `
SECURITY RISK ASSESSMENT:
Industry Average Breach Cost: ${this.formatCurrency(breachCost)}
Annual Risk Mitigation with Portnox: ${this.formatCurrency(riskMitigation)}

RISK SCORES BY VENDOR:
${this.selectedVendors.map(vendorId => {
    const result = this.results[vendorId];
    return `
${result.vendor.name}:
- Risk Score: ${result.riskScore.score}/100 (${result.riskScore.level})
- MTTR: ${result.vendor.features.security.mttr} minutes
- Threat Detection: ${result.vendor.features.security.aiThreatDetection ? 'AI-Powered' : 'Basic'}
- Detection Accuracy: ${result.vendor.features.security.accuracy}%
    `;
}).join('')}

PORTNOX SECURITY ADVANTAGES:
• Native Zero Trust architecture (98/100 score)
• AI-powered threat detection with 99.5% accuracy
• 5-minute MTTR vs. 4-hour industry average
• Continuous device trust verification
• Automated threat containment and remediation
        `;
    }
    
    generateOperationalSummary() {
        return `
OPERATIONAL EFFICIENCY COMPARISON:
${this.selectedVendors.map(vendorId => {
    const result = this.results[vendorId];
    const vendor = result.vendor;
    return `
${vendor.name}:
- Deployment Time: ${vendor.deployment.time < 24 ? vendor.deployment.time + ' hours' : Math.round(vendor.deployment.time/24) + ' days'}
- FTE Required: ${vendor.operational.fteRequired}
- Automation Level: ${vendor.features.automation}%
- Maintenance Windows/Year: ${vendor.operational.maintenanceWindows}
- Update Process: ${vendor.operational.updates}
    `;
}).join('')}

PORTNOX OPERATIONAL ADVANTAGES:
• 4-hour deployment with zero hardware requirements
• 0.25 FTE vs. 2.5 FTE industry average
• 95% automation reduces manual tasks
• Zero maintenance windows with continuous updates
• Self-service deployment and configuration
        `;
    }
    
    generateRecommendations() {
        const savings = this.getTotalSavings();
        const portnox = this.results.portnox;
        
        return `
Based on comprehensive analysis across ${this.selectedVendors.length} vendors:

1. RECOMMENDED SOLUTION: Portnox CLEAR
   - Lowest TCO: ${this.formatCurrency(portnox.tco.total)}
   - Highest ROI: ${portnox.roi.percentage}%
   - Best security posture: 98/100 Zero Trust score
   - Fastest deployment: 4 hours
   - Maximum automation: 95%

2. EXPECTED BENEFITS:
   - Cost savings: ${this.formatCurrency(savings)} over ${this.config.years} years
   - Risk reduction: 85% lower breach probability
   - Compliance: Automated reporting for all required frameworks
   - Efficiency: 90% reduction in operational overhead
   - Scalability: Unlimited growth without infrastructure changes

3. MIGRATION STRATEGY:
   - Start with pilot deployment (4 hours)
   - Validate in production environment
   - Gradual migration from legacy NAC
   - Full deployment within 30 days

4. SUCCESS METRICS:
   - TCO reduction achieved within first year
   - Zero Trust maturity level 5 within 6 months
   - Compliance automation operational immediately
   - Cyber insurance premium reduction within renewal cycle
        `;
    }
    
    generateRoadmap() {
        return `
WEEK 1: EVALUATION & PLANNING
• Schedule Portnox CLEAR demonstration
• Identify pilot group (100-500 devices)
• Review current NAC contracts
• Define success criteria

WEEK 2-4: PILOT DEPLOYMENT
• Deploy Portnox CLEAR (4 hours)
• Configure Zero Trust policies
• Test integrations (AD, SIEM, etc.)
• Validate compliance reporting

MONTH 2-3: PRODUCTION ROLLOUT
• Expand to all devices
• Migrate from legacy NAC
• Optimize policies
• Train IT team (2 hours online)

MONTH 4+: OPTIMIZATION
• Achieve full automation
• Leverage advanced analytics
• Continuous improvement
• Measure ROI realization

CRITICAL SUCCESS FACTORS:
• Executive sponsorship secured
• IT team training completed
• Integration requirements validated
• Success metrics defined and tracked
        `;
    }

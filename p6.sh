#!/bin/bash
# NAC Platform Enhancement - Part 6: Main Platform Core
# enhance-platform-part6.sh

echo "🎯 NAC Platform Enhancement - Part 6: Platform Core Integration"
echo "============================================================="

# Create the main platform core
cat > js/nac-platform-core.js << 'EOF'
/**
 * NAC Platform Core
 * Main application controller and integration point
 */

class NACPlatform {
    constructor() {
        // Platform version
        this.version = '2.0.0';
        
        // Configuration
        this.config = this.loadConfiguration();
        
        // Data sources
        this.vendors = window.VendorDatabase || {};
        this.compliance = window.ComplianceFrameworks || {};
        this.riskModels = window.RiskThreatModels || {};
        this.benchmarks = window.IndustryBenchmarks || {};
        
        // View controllers
        this.views = {};
        
        // Export managers
        this.exportManager = {
            pdf: null,
            excel: null,
            powerpoint: null
        };
        
        // State management
        this.state = {
            currentView: 'executive',
            selectedVendors: ['portnox', 'cisco_ise', 'aruba_clearpass'],
            comparisonMode: false,
            filters: {},
            calculations: {},
            lastUpdate: null
        };
        
        // Results cache
        this.results = {};
        
        // Event listeners
        this.listeners = {};
        
        // Help system
        this.helpSystem = null;
        
        // Analytics
        this.analytics = {
            startTime: Date.now(),
            interactions: [],
            exports: []
        };
    }
    
    init() {
        console.log(`🚀 Initializing NAC Platform v${this.version}`);
        
        // Initialize components
        this.initializeExportManagers();
        this.initializeViews();
        this.initializeHelp();
        this.bindGlobalEvents();
        
        // Perform initial calculations
        this.performComprehensiveAnalysis();
        
        // Hide loading screen
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.getElementById('app-wrapper').style.display = 'block';
                }, 500);
            }
        }, 2000);
        
        // Show initial view
        this.showTab('executive');
        
        console.log('✅ NAC Platform initialized successfully');
    }
    
    loadConfiguration() {
        // Load from localStorage or use defaults
        const saved = localStorage.getItem('nacPlatformConfig');
        const defaults = {
            organization: {
                name: 'Your Organization',
                industry: 'technology',
                size: 'medium',
                maturity: 'developing',
                locations: 5,
                employees: 2500,
                revenue: 500000000
            },
            devices: {
                total: 2500,
                managed: 2000,
                byod: 300,
                iot: 150,
                guest: 50,
                growth: 0.15
            },
            costs: {
                fteSalary: 110000,
                contractorHourly: 150,
                downtimeHourly: 25000,
                breachAverage: 4880000,
                compliancePenalty: 250000
            },
            compliance: {
                frameworks: ['sox', 'gdpr', 'iso27001', 'pci-dss'],
                auditFrequency: 2,
                currentScore: 72,
                targetScore: 95
            },
            priorities: {
                costReduction: 8,
                riskReduction: 9,
                compliance: 10,
                userExperience: 7,
                automation: 8
            }
        };
        
        return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    }
    
    saveConfiguration() {
        localStorage.setItem('nacPlatformConfig', JSON.stringify(this.config));
        this.emit('configurationChanged', this.config);
    }
    
    initializeExportManagers() {
        if (window.PDFGenerator) {
            this.exportManager.pdf = new window.PDFGenerator(this);
        }
        if (window.ExcelGenerator) {
            this.exportManager.excel = new window.ExcelGenerator(this);
        }
        if (window.PowerPointGenerator) {
            this.exportManager.powerpoint = new window.PowerPointGenerator(this);
        }
    }
    
    initializeViews() {
        // Views will self-register when loaded
        this.views = {
            executive: null,
            financial: null,
            compliance: null,
            risk: null,
            operational: null,
            roadmap: null,
            comparison: null
        };
    }
    
    initializeHelp() {
        this.helpSystem = {
            topics: {
                'compliance-matrix': {
                    title: 'Compliance Matrix',
                    content: `
                        <h4>Understanding the Compliance Matrix</h4>
                        <p>The compliance matrix shows how well each vendor meets requirements across different frameworks.</p>
                        <ul>
                            <li><strong>Green (90%+):</strong> Excellent compliance with automated controls</li>
                            <li><strong>Yellow (70-89%):</strong> Good compliance with some manual processes</li>
                            <li><strong>Red (<70%):</strong> Poor compliance requiring significant effort</li>
                        </ul>
                        <p><strong>Tip:</strong> Click on any cell to see detailed control mappings and implementation guidance.</p>
                    `
                },
                'tco-calculation': {
                    title: 'TCO Calculation',
                    content: `
                        <h4>Total Cost of Ownership Components</h4>
                        <ul>
                            <li><strong>Software Licensing:</strong> Annual or monthly subscription costs</li>
                            <li><strong>Implementation:</strong> Initial setup, configuration, and training</li>
                            <li><strong>Infrastructure:</strong> Servers, appliances, and network equipment</li>
                            <li><strong>Operations:</strong> FTE costs for management and maintenance</li>
                            <li><strong>Hidden Costs:</strong> Downtime, integration, upgrades, and scaling</li>
                        </ul>
                        <p><strong>Formula:</strong> TCO = License + Implementation + Infrastructure + Operations + Hidden Costs</p>
                    `
                },
                'roi-metrics': {
                    title: 'ROI Metrics',
                    content: `
                        <h4>Return on Investment Calculations</h4>
                        <p><strong>ROI Formula:</strong> (Total Benefits - Total Costs) / Total Costs × 100</p>
                        <p><strong>Benefits Include:</strong></p>
                        <ul>
                            <li>Risk reduction (breach avoidance)</li>
                            <li>Compliance cost savings</li>
                            <li>Operational efficiency gains</li>
                            <li>Insurance premium reductions</li>
                            <li>Productivity improvements</li>
                        </ul>
                        <p><strong>Payback Period:</strong> Time until cumulative benefits exceed initial investment</p>
                    `
                }
            },
            showTopic: (topicId) => {
                const topic = this.helpSystem.topics[topicId];
                if (topic) {
                    this.showHelpModal(topic.title, topic.content);
                }
            }
        };
    }
    
    performComprehensiveAnalysis() {
        console.log('📊 Performing comprehensive analysis...');
        
        // Clear previous results
        this.results = {
            timestamp: new Date().toISOString(),
            config: { ...this.config },
            vendors: {},
            comparison: {},
            recommendations: []
        };
        
        // Analyze each vendor
        this.state.selectedVendors.forEach(vendorId => {
            const vendor = this.vendors[vendorId];
            if (vendor) {
                this.results.vendors[vendorId] = this.analyzeVendor(vendor);
            }
        });
        
        // Perform comparisons
        this.results.comparison = this.compareVendors();
        
        // Generate recommendations
        this.results.recommendations = this.generateRecommendations();
        
        // Calculate summary metrics
        this.calculateSummaryMetrics();
        
        // Update UI elements
        this.updateDashboardMetrics();
        
        // Save state
        this.state.lastUpdate = Date.now();
        
        console.log('✅ Analysis complete', this.results);
    }
    
    analyzeVendor(vendor) {
        const analysis = {
            vendor: vendor,
            tco: {},
            roi: {},
            risk: {},
            compliance: {},
            operational: {}
        };
        
        // TCO Analysis
        const tcoResults = this.calculateTCO(vendor);
        analysis.tco = tcoResults;
        
        // ROI Analysis
        const roiResults = this.calculateROI(vendor, tcoResults);
        analysis.roi = roiResults;
        
        // Risk Analysis
        const riskResults = this.calculateRiskMetrics(vendor);
        analysis.risk = riskResults;
        
        // Compliance Analysis
        const complianceResults = this.calculateComplianceMetrics(vendor);
        analysis.compliance = complianceResults;
        
        // Operational Analysis
        const operationalResults = this.calculateOperationalMetrics(vendor);
        analysis.operational = operationalResults;
        
        // Overall scoring
        analysis.scores = this.calculateVendorScores(analysis);
        
        return analysis;
    }
    
    calculateTCO(vendor) {
        const devices = this.config.devices.total;
        const years = 3;
        
        // License costs
        const monthlyPerDevice = vendor.pricing?.perDevice?.monthly || 
                                vendor.pricing?.perDevice?.annual / 12 || 
                                10;
        const annualLicense = monthlyPerDevice * 12 * devices;
        const totalLicense = annualLicense * years;
        
        // Implementation costs
        const implBase = vendor.pricing?.implementation?.base || 0;
        const implPerDevice = vendor.pricing?.implementation?.perDevice || 0;
        const training = vendor.pricing?.implementation?.training || 0;
        const implementation = implBase + (implPerDevice * devices) + training;
        
        // Infrastructure costs
        const infrastructure = vendor.pricing?.infrastructure?.servers || 0 +
                             vendor.pricing?.infrastructure?.appliances || 0 +
                             vendor.pricing?.infrastructure?.network || 0;
        
        // Operational costs
        const fteRequired = vendor.operations?.fte || 1.0;
        const fteCost = fteRequired * this.config.costs.fteSalary * years;
        
        // Support costs
        const supportPercent = vendor.pricing?.support?.annual || 0.20;
        const supportCost = vendor.pricing?.support?.included ? 0 : 
                           totalLicense * supportPercent;
        
        // Hidden costs
        const downtime = this.calculateDowntimeCost(vendor, years);
        const integration = implementation * 0.25;
        const customization = totalLicense * 0.15;
        const scaling = devices * this.config.devices.growth * 100 * years;
        
        const hiddenCosts = downtime + integration + customization + scaling;
        
        return {
            license: Math.round(totalLicense),
            implementation: Math.round(implementation),
            infrastructure: Math.round(infrastructure),
            operations: Math.round(fteCost),
            support: Math.round(supportCost),
            hidden: Math.round(hiddenCosts),
            total: Math.round(totalLicense + implementation + infrastructure + 
                            fteCost + supportCost + hiddenCosts),
            perDevice: Math.round((totalLicense + implementation + infrastructure + 
                                 fteCost + supportCost + hiddenCosts) / devices),
            perDeviceMonthly: Math.round((totalLicense + implementation + infrastructure + 
                                         fteCost + supportCost + hiddenCosts) / devices / (years * 12))
        };
    }
    
    calculateROI(vendor, tco) {
        const years = 3;
        
        // Calculate benefits
        const riskReduction = this.calculateRiskReductionBenefit(vendor, years);
        const complianceSavings = this.calculateComplianceSavings(vendor, years);
        const operationalSavings = this.calculateOperationalSavings(vendor, years);
        const productivityGains = this.calculateProductivityGains(vendor, years);
        const insuranceSavings = this.calculateInsuranceSavings(vendor, years);
        
        const totalBenefits = riskReduction + complianceSavings + 
                            operationalSavings + productivityGains + insuranceSavings;
        
        // Calculate ROI metrics
        const netBenefit = totalBenefits - tco.total;
        const roi = tco.total > 0 ? (netBenefit / tco.total) * 100 : 0;
        const monthlyBenefit = totalBenefits / (years * 12);
        const paybackMonths = tco.implementation > 0 && monthlyBenefit > 0 ?
                            Math.ceil(tco.implementation / monthlyBenefit) : 999;
        
        // NPV calculation (10% discount rate)
        const discountRate = 0.10;
        let npv = -tco.implementation;
        for (let year = 1; year <= years; year++) {
            const annualCashFlow = (totalBenefits / years) - (tco.total - tco.implementation) / years;
            npv += annualCashFlow / Math.pow(1 + discountRate, year);
        }
        
        // IRR calculation (simplified)
        const irr = netBenefit > 0 ? Math.round((Math.pow(totalBenefits / tco.total, 1/years) - 1) * 100) : 0;
        
        return {
            benefits: {
                riskReduction: Math.round(riskReduction),
                compliance: Math.round(complianceSavings),
                operational: Math.round(operationalSavings),
                productivity: Math.round(productivityGains),
                insurance: Math.round(insuranceSavings),
                total: Math.round(totalBenefits)
            },
            roi: Math.round(roi),
            netBenefit: Math.round(netBenefit),
            paybackMonths: paybackMonths,
            npv: Math.round(npv),
            irr: irr,
            breakEven: paybackMonths < (years * 12) ? paybackMonths : null
        };
    }
    
    calculateRiskReductionBenefit(vendor, years) {
        const breachCost = this.config.costs.breachAverage;
        const currentProbability = 0.23; // Industry average
        const vendorReduction = vendor.riskMetrics?.breachReduction || 50;
        const newProbability = currentProbability * (1 - vendorReduction / 100);
        const avoidedRisk = (currentProbability - newProbability) * breachCost * years;
        return avoidedRisk;
    }
    
    calculateComplianceSavings(vendor, years) {
        let totalSavings = 0;
        
        this.config.compliance.frameworks.forEach(framework => {
            const baseCost = this.getFrameworkComplianceCost(framework);
            const vendorEfficiency = this.getVendorComplianceEfficiency(vendor, framework);
            const savings = baseCost * (vendorEfficiency / 100) * years;
            totalSavings += savings;
        });
        
        return totalSavings;
    }
    
    calculateOperationalSavings(vendor, years) {
        const currentFTE = 2.0; // Industry average
        const vendorFTE = vendor.operations?.fte || 1.0;
        const fteSavings = (currentFTE - vendorFTE) * this.config.costs.fteSalary * years;
        
        const automationLevel = vendor.operations?.automation || 50;
        const timeSavings = (automationLevel / 100) * 2080 * (this.config.costs.fteSalary / 2080) * years;
        
        return fteSavings + timeSavings;
    }
    
    calculateProductivityGains(vendor, years) {
        const devices = this.config.devices.total;
        const downtimeReduction = vendor.operations?.downtimeReduction || 50;
        const avgDowntimeHours = 4; // per device per year
        const productivityValue = 50; // $ per hour per device
        
        const gains = devices * avgDowntimeHours * (downtimeReduction / 100) * productivityValue * years;
        return gains;
    }
    
    calculateInsuranceSavings(vendor, years) {
        const currentPremium = this.config.costs.cyberInsurancePremium || 100000;
        const vendorReduction = vendor.riskMetrics?.insurancePremiumReduction || 15;
        const savings = currentPremium * (vendorReduction / 100) * years;
        return savings;
    }
    
    calculateDowntimeCost(vendor, years) {
        const uptimeGuarantee = vendor.operations?.uptimeGuarantee || 99.0;
        const downtimePercent = (100 - uptimeGuarantee) / 100;
        const hoursPerYear = 365 * 24;
        const downtimeHours = hoursPerYear * downtimePercent * years;
        const cost = downtimeHours * this.config.costs.downtimeHourly;
        return cost;
    }
    
    getFrameworkComplianceCost(framework) {
        const costs = {
            'sox': 150000,
            'hipaa': 100000,
            'pci-dss': 75000,
            'gdpr': 125000,
            'iso27001': 100000,
            'nist-csf': 80000
        };
        return costs[framework] || 50000;
    }
    
    getVendorComplianceEfficiency(vendor, framework) {
        const compliance = vendor.compliance?.frameworks?.[framework];
        if (compliance) {
            const automationLevel = compliance.businessImpact?.automationLevel || 
                                  compliance.automationLevel || 50;
            return automationLevel * 0.8; // 80% of automation translates to cost savings
        }
        return 25; // Default efficiency
    }
    
    calculateRiskMetrics(vendor) {
        const industry = this.config.organization.industry;
        const devices = this.config.devices.total;
        
        // Get industry threat profile
        const threatProfile = this.riskModels?.industryThreats?.[industry] || {
            avgBreachCost: 4000000,
            avgIncidentsPerYear: 100
        };
        
        // Calculate risk scores
        const breachReduction = vendor.riskMetrics?.breachReduction || 50;
        const incidentReduction = vendor.riskMetrics?.incidentReduction || 50;
        
        const annualRiskExposure = threatProfile.avgBreachCost * 0.23; // 23% breach probability
        const mitigatedExposure = annualRiskExposure * (1 - breachReduction / 100);
        
        return {
            currentExposure: Math.round(annualRiskExposure),
            mitigatedExposure: Math.round(mitigatedExposure),
            reduction: Math.round(annualRiskExposure - mitigatedExposure),
            reductionPercent: breachReduction,
            incidentReduction: incidentReduction,
            mttrDays: vendor.riskMetrics?.mttrDays || 30,
            insuranceImpact: vendor.riskMetrics?.insurancePremiumReduction || 15
        };
    }
    
    calculateComplianceMetrics(vendor) {
        const frameworks = this.config.compliance.frameworks;
        const scores = {};
        let totalScore = 0;
        let count = 0;
        
        frameworks.forEach(framework => {
            const score = vendor.compliance?.frameworks?.[framework]?.score || 70;
            scores[framework] = score;
            totalScore += score;
            count++;
        });
        
        const averageScore = count > 0 ? Math.round(totalScore / count) : 70;
        const automationLevel = vendor.compliance?.automationScore || 
                              vendor.operations?.automation || 50;
        
        return {
            frameworkScores: scores,
            averageScore: averageScore,
            automationLevel: automationLevel,
            auditReadiness: vendor.compliance?.auditReadinessDays || 30,
            penaltyRisk: this.calculatePenaltyRisk(vendor, frameworks)
        };
    }
    
    calculatePenaltyRisk(vendor, frameworks) {
        let totalRisk = 0;
        
        frameworks.forEach(framework => {
            const compliance = this.compliance[framework];
            if (compliance?.penalties) {
                const maxPenalty = this.getMaxPenalty(compliance.penalties);
                const vendorScore = vendor.compliance?.frameworks?.[framework]?.score || 70;
                const riskFactor = (100 - vendorScore) / 100;
                totalRisk += maxPenalty * riskFactor * 0.1; // 10% probability
            }
        });
        
        return Math.round(totalRisk);
    }
    
    getMaxPenalty(penalties) {
        if (penalties.maxPerViolation) {
            return penalties.maxPerViolation;
        } else if (penalties.tiers) {
            return Math.max(...penalties.tiers.map(t => t.maxPerViolation || 0));
        } else if (penalties.upper) {
            return penalties.upper.maxFine || 1000000;
        }
        return 100000; // Default penalty
    }
    
    calculateOperationalMetrics(vendor) {
        return {
            deploymentDays: vendor.deployment?.time / 24 || 30,
            fteRequired: vendor.operations?.fte || 1.0,
            automationLevel: vendor.operations?.automation || 50,
            maintenanceHours: vendor.operations?.maintenanceHours || 20,
            scalability: vendor.metrics?.scalabilityScore || 70,
            userExperience: vendor.metrics?.userExperienceScore || 70,
            supportQuality: vendor.metrics?.supportScore || 70
        };
    }
    
    calculateVendorScores(analysis) {
        // Financial score (lower TCO = higher score)
        const maxTCO = 3000000;
        const financialScore = Math.max(0, 100 - (analysis.tco.total / maxTCO * 100));
        
        // Risk score
        const riskScore = analysis.risk.reductionPercent || 50;
        
        // Compliance score
        const complianceScore = analysis.compliance.averageScore || 70;
        
        // Operational score
        const opsScore = (
            (100 - analysis.operational.deploymentDays) * 0.3 +
            (100 - analysis.operational.fteRequired * 20) * 0.3 +
            analysis.operational.automationLevel * 0.4
        );
        
        // Overall weighted score
        const overall = (
            financialScore * 0.30 +
            riskScore * 0.30 +
            complianceScore * 0.20 +
            opsScore * 0.20
        );
        
        return {
            financial: Math.round(financialScore),
            risk: Math.round(riskScore),
            compliance: Math.round(complianceScore),
            operational: Math.round(opsScore),
            overall: Math.round(overall)
        };
    }
    
    compareVendors() {
        const rankings = Object.entries(this.results.vendors)
            .map(([vendorId, analysis]) => ({
                vendorId: vendorId,
                vendor: analysis.vendor,
                scores: analysis.scores,
                tco: analysis.tco.total,
                roi: analysis.roi.roi,
                deployment: analysis.operational.deploymentDays
            }))
            .sort((a, b) => b.scores.overall - a.scores.overall);
        
        return {
            rankings: rankings,
            winner: rankings[0],
            insights: this.generateComparativeInsights(rankings)
        };
    }
    
    generateComparativeInsights(rankings) {
        const insights = [];
        const winner = rankings[0];
        
        if (winner.vendorId === 'portnox') {
            insights.push({
                type: 'recommendation',
                priority: 'high',
                message: 'Portnox CLEAR delivers the best overall value with ' +
                        `${winner.scores.overall}% effectiveness score`
            });
        }
        
        // Cost insights
        const avgTCO = rankings.reduce((sum, r) => sum + r.tco, 0) / rankings.length;
        const portnox = rankings.find(r => r.vendorId === 'portnox');
        if (portnox && portnox.tco < avgTCO) {
            const savings = Math.round(avgTCO - portnox.tco);
            insights.push({
                type: 'financial',
                priority: 'high',
                message: `Portnox saves $${this.formatNumber(savings)} vs. average competitor TCO`
            });
        }
        
        // Deployment insights
        if (portnox && portnox.deployment < 7) {
            insights.push({
                type: 'operational',
                priority: 'medium',
                message: `Deploy in ${portnox.deployment} days vs. ${Math.round(avgTCO)} day average`
            });
        }
        
        return insights;
    }
    
    generateRecommendations() {
        const recommendations = [];
        const portnox = this.results.vendors.portnox;
        
        if (portnox) {
            recommendations.push({
                priority: 1,
                category: 'immediate',
                action: 'Deploy Portnox CLEAR proof of concept',
                benefit: `Validate ${portnox.operational.deploymentDays}-day deployment`,
                timeline: 'This week'
            });
            
            recommendations.push({
                priority: 2,
                category: 'short-term',
                action: 'Migrate from legacy NAC infrastructure',
                benefit: `Save $${this.formatNumber(portnox.roi.benefits.total / 3)} annually`,
                timeline: 'Q1 2025'
            });
            
            recommendations.push({
                priority: 3,
                category: 'strategic',
                action: 'Implement Zero Trust architecture',
                benefit: `Reduce breach risk by ${portnox.risk.reductionPercent}%`,
                timeline: 'Q2 2025'
            });
        }
        
        return recommendations;
    }
    
    calculateSummaryMetrics() {
        const portnox = this.results.vendors.portnox;
        if (!portnox) return;
        
        this.results.totalSavings = portnox.roi.netBenefit;
        this.results.roi = portnox.roi.roi;
        this.results.paybackMonths = portnox.roi.paybackMonths;
        this.results.riskReduction = portnox.risk.reductionPercent;
        this.results.complianceScore = portnox.compliance.averageScore;
        this.results.deploymentDays = portnox.operational.deploymentDays;
        
        // Industry comparisons
        const industry = this.benchmarks?.metrics?.[this.config.organization.industry];
        if (industry) {
            this.results.vsIndustryTCO = Math.round(
                (1 - portnox.tco.perDevice / (industry.avgDevices * 200)) * 100
            );
        }
    }
    
    updateDashboardMetrics() {
        // Update hero metrics
        const savingsEl = document.getElementById('total-savings');
        if (savingsEl) savingsEl.textContent = (this.results.totalSavings / 1000000).toFixed(1);
        
        const riskEl = document.getElementById('risk-reduction');
        if (riskEl) riskEl.textContent = this.results.riskReduction;
        
        // Update decision metrics
        const metricsContainer = document.getElementById('decision-metrics');
        if (metricsContainer && this.results.totalSavings) {
            metricsContainer.innerHTML = this.renderDecisionMetrics();
        }
    }
    
    renderDecisionMetrics() {
        const metrics = [
            {
                icon: 'fa-dollar-sign',
                label: '3-Year TCO',
                value: `$${this.formatNumber(this.results.vendors.portnox.tco.total)}`,
                change: `${Math.abs(this.results.vsIndustryTCO)}% below industry`,
                trend: 'positive'
            },
            {
                icon: 'fa-shield-check',
                label: 'Security Score',
                value: `${this.results.vendors.portnox.scores.risk}%`,
                change: `${this.results.riskReduction}% risk reduction`,
                trend: 'positive'
            },
            {
                icon: 'fa-rocket',
                label: 'Time to Deploy',
                value: `${this.results.deploymentDays} days`,
                change: 'vs. 90 day average',
                trend: 'positive'
            },
            {
                icon: 'fa-chart-line',
                label: 'ROI',
                value: `${this.results.roi}%`,
                change: `${this.results.paybackMonths} month payback`,
                trend: 'positive'
            }
        ];
        
        return metrics.map(metric => `
            <div class="decision-metric ${metric.trend}">
                <div class="metric-icon-enhanced">
                    <i class="fas ${metric.icon}"></i>
                </div>
                <div class="metric-content">
                    <div class="metric-value-enhanced">${metric.value}</div>
                    <div class="metric-label-enhanced">${metric.label}</div>
                    <div class="metric-change ${metric.trend}">
                        ${metric.trend !== 'none' ? '<i class="fas fa-arrow-up"></i>' : ''}
                        ${metric.change}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // View Management
    showTab(tabName) {
        console.log(`Switching to ${tabName} view`);
        
        // Update tab states
        document.querySelectorAll('.tab-item').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        // Update content
        const content = document.getElementById('platform-content');
        if (!content) return;
        
        // Show loading
        content.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
        
        // Load view
        setTimeout(() => {
            switch (tabName) {
                case 'executive':
                    this.renderExecutiveView(content);
                    break;
                case 'financial':
                    this.renderFinancialView(content);
                    break;
                case 'compliance':
                    if (this.views.compliance) {
                        this.views.compliance.render(content);
                    } else {
                        this.renderComplianceView(content);
                    }
                    break;
                case 'risk':
                    this.renderRiskView(content);
                    break;
                case 'operational':
                    this.renderOperationalView(content);
                    break;
                case 'roadmap':
                    this.renderRoadmapView(content);
                    break;
                case 'comparison':
                    this.renderComparisonView(content);
                    break;
            }
            
            this.state.currentView = tabName;
            this.emit('viewChanged', tabName);
        }, 300);
    }
    
    renderExecutiveView(container) {
        container.innerHTML = `
            <div class="executive-view">
                <h2>Executive Decision Summary</h2>
                <p>Comprehensive analysis and recommendations</p>
                <!-- Executive view content will be rendered by executive-view-enhanced.js -->
            </div>
        `;
        
        if (this.views.executive) {
            this.views.executive.render(container);
        }
    }
    
    // Export Functions
    async exportExecutiveReport() {
        console.log('Exporting executive report...');
        
        if (this.exportManager.pdf) {
            const filename = await this.exportManager.pdf.generateExecutiveReport();
            this.trackExport('pdf', filename);
            this.showNotification('Report exported successfully', 'success');
        }
    }
    
    async exportComplianceReport(options) {
        if (this.exportManager.excel) {
            const filename = this.exportManager.excel.generateComprehensiveReport();
            this.trackExport('excel', filename);
            this.showNotification('Compliance report exported', 'success');
        }
    }
    
    // Helper Functions
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return Math.round(num / 1000) + 'K';
        }
        return num.toString();
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type} animate-slideInRight`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    showHelpModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'help-modal-overlay';
        modal.innerHTML = `
            <div class="help-modal">
                <div class="help-modal-header">
                    <h3>${title}</h3>
                    <button class="close-btn" onclick="this.closest('.help-modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="help-modal-content">
                    ${content}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    toggleHelp() {
        const helpSystem = document.getElementById('help-system');
        if (helpSystem) {
            helpSystem.style.display = helpSystem.style.display === 'none' ? 'block' : 'none';
        }
    }
    
    showHelp(topic) {
        this.helpSystem.showTopic(topic);
    }
    
    scheduleDemo() {
        window.open('https://portnox.com/demo', '_blank');
    }
    
    // Event System
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }
    
    // Analytics
    trackInteraction(action, details) {
        this.analytics.interactions.push({
            timestamp: Date.now(),
            action: action,
            details: details
        });
    }
    
    trackExport(type, filename) {
        this.analytics.exports.push({
            timestamp: Date.now(),
            type: type,
            filename: filename
        });
    }
}

// Initialize global instance
window.NAC = null;

// Wait for DOM ready
document.addEventListener('DOMContentLoaded', () => {
    if (!window.NAC) {
        window.NAC = new NACPlatform();
        window.NAC.init();
    }
});

console.log('✅ NAC Platform Core loaded');
EOF

echo "✅ Part 6 complete - Platform core integrated"
echo ""
echo "🎉 NAC Platform Enhancement Complete!"
echo ""
echo "All components have been created:"
echo "- Enhanced directory structure"
echo "- Comprehensive CSS styles with animations"
echo "- Complete compliance frameworks database"
echo "- Enhanced compliance view with detailed mappings"
echo "- Full export functionality (PDF, Excel, PowerPoint)"
echo "- Integrated platform core with all features"
echo ""
echo "To run the platform:"
echo "1. Start a local server: python3 -m http.server 8000"
echo "2. Open: http://localhost:8000"
echo ""
echo "Key Features Implemented:"
echo "✅ Exhaustive compliance framework mappings"
echo "✅ Detailed penalty calculations"
echo "✅ Business impact analysis"
echo "✅ Industry-specific use cases"
echo "✅ Advanced tooltips and help system"
echo "✅ Comprehensive export capabilities"
echo "✅ Interactive visualizations"
echo "✅ Real-time calculations"
echo ""

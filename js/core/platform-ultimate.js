/**
 * Ultimate Platform - TCO Analyzer Core
 * New architecture for enhanced performance and modularity
 */
class UltimatePlatform {
    constructor(configManager, eventSystem, uiManager) {
        this.configManager = configManager;
        this.eventSystem = eventSystem;
        this.uiManager = uiManager;

        this.currentView = null;
        this.results = {};
        this.configManager = configManager;
        this.eventSystem = eventSystem;
        this.uiManager = uiManager;

        this.currentView = null;
        this.results = {};
        this.allVendors = []; // Initialize allVendors
        this.config = this.configManager.get('defaults') || {
            devices: 2500,
            users: 1500,
            years: 3,
            industry: 'technology',
            complianceFrameworks: ['SOC 2', 'ISO 27001', 'HIPAA'],
            selectedVendors: ['portnox', 'cisco', 'aruba']
        };
        this.vendorDatabase = window.MasterVendorDatabase; // Using the new master database

        this.views = {}; // To store view instances

        console.log('UltimatePlatform initialized with new architecture.');
        this.eventSystem.on('config:updated', (newConfig) => this.handleConfigUpdate(newConfig));
    }

    init() {
        this.uiManager.renderBaseLayout(this);
        this.uiManager.updateNav(this.currentView);
        this.loadInitialData(); // Load data necessary for the platform (e.g., vendor data)
        this.registerViews(); // Register all view modules
        this.showView(this.configManager.get('defaultView') || 'dashboard');
        this.attachGlobalEventHandlers();
        console.log('UltimatePlatform UI rendered and initialized.');
    }

    attachGlobalEventHandlers() {
        // Example: Handle clicks on nav items
        document.addEventListener('click', (event) => {
            const navTab = event.target.closest('.nav-tab-ultimate');
            if (navTab && navTab.dataset.view) {
                event.preventDefault();
                this.showView(navTab.dataset.view);
            }
        });
         // Listen for vendor selection changes from VendorSelectionView
        this.eventSystem.on('vendors:selected', (selectedVendorIds) => {
            this.config.selectedVendors = selectedVendorIds;
            this.configManager.set('selectedVendors', selectedVendorIds); // Save to config
            this.recalculateAndRefresh();
        });

        // Listen for config changes from UI controls (managed by UIManager)
        // UIManager will emit 'config:control:changed' which is handled by ConfigManager,
        // which then emits 'config:updated' if there's a change, which this platform handles.
    }

    handleConfigUpdate(newConfig) {
        this.config = { ...this.config, ...newConfig }; // Merge new config changes
        console.log('Platform config updated:', this.config);
        this.recalculateAndRefresh();
    }

    recalculateAndRefresh() {
        this.calculateAll();
        if (this.currentView && this.views[this.currentView] && this.views[this.currentView].update) {
            this.views[this.currentView].update(this.results, this.config);
        } else if (this.currentView) {
            this.showView(this.currentView); // Fallback to full re-render if update is not available
        }
    }

    registerViews() {
        // Dynamically register views available in the window scope
        const viewConstructors = {
            DashboardView,
            FinancialAnalysisView,
            RiskSecurityView,
            ComplianceViewEnhanced, // Keep existing name if class is the same
            OperationalImpact,
            ComparisonView, // This might be a method within UltimatePlatform or a separate class
            StrategicInsights,
            ExecutiveSummaryView,
            VendorSelectionView // New view for vendor selection
        };

        for (const viewName in viewConstructors) {
            if (typeof viewConstructors[viewName] === 'function') {
                // Map view name to a key used in showView (e.g., DashboardView -> 'dashboard')
                const viewKey = viewName.replace('View', '').toLowerCase();
                if (viewKey === 'complianceenhanced') { // specific handling for compliance view key
                     this.views['compliance'] = new viewConstructors[viewName](this);
                } else {
                    this.views[viewKey] = new viewConstructors[viewName](this);
                }
                console.log(`View registered: ${viewKey}`);
            }
        }
        // Special case for Comparison view if it's part of the platform class
        if (typeof this.renderComparison === 'function') {
             this.views['comparison'] = { render: this.renderComparison.bind(this), initCharts: this.initializeComparisonCharts.bind(this) };
        }
    }

    loadInitialData() {
        // In a real app, this might fetch data. Here, it's pre-loaded.
        if (!this.vendorDatabase) {
            console.error("MasterVendorDatabase is not loaded!");
            this.uiManager.showError("Critical Error: Vendor database not found.");
            return;
        }
        console.log(`Loaded data for ${Object.keys(this.vendorDatabase).length} vendors.`);

        if (this.vendorDatabase) {
            this.allVendors = Object.keys(this.vendorDatabase).filter(key => typeof this.vendorDatabase[key] === 'object' && this.vendorDatabase[key].id);
            console.log(`Platform: Initialized allVendors with ${this.allVendors.length} vendors from MasterVendorDatabase.`);

            const configuredSelectedVendors = this.configManager.get('selectedVendors', ['portnox', 'cisco', 'aruba']);
            this.config.selectedVendors = configuredSelectedVendors.filter(v => this.allVendors.includes(v));

            if (this.config.selectedVendors.length === 0 && this.allVendors.includes('portnox')) {
                this.config.selectedVendors = ['portnox'];
            }
            this.configManager.set('selectedVendors', this.config.selectedVendors);
        }
    }

    calculateAll() {
        this.results = {};
        if (!this.vendorDatabase) {
            console.error("Cannot calculate: MasterVendorDatabase is not loaded.");
            return;
        }
        this.config.selectedVendors.forEach(vendorId => {
            const vendor = this.vendorDatabase[vendorId];
            if (!vendor) {
                console.warn(`Vendor data for ${vendorId} not found. Skipping calculations.`);
                return;
            }
            // Simplified calculations for brevity, referencing more complex logic as needed
            this.results[vendorId] = {
                vendor: vendor,
                tco: this.calculateTCO(vendor),
                roi: this.calculateROI(vendor, this.results[vendorId]?.tco),
                riskScore: this.calculateRiskScore(vendor),
                complianceScore: this.calculateComplianceScore(vendor),
                operationalImpact: this.calculateOperationalImpact(vendor),
                overallScore: 0 // Placeholder for now
            };
            // Calculate overall score based on other metrics
            this.results[vendorId].overallScore = this.calculateOverallVendorScore(this.results[vendorId]);
        });
        console.log('Calculations complete for selected vendors:', this.results);
        this.eventSystem.emit('calculation:complete', this.results);
    }

    calculateOverallVendorScore(vendorResult) {
        // Example weighted scoring
        const weights = { tco: 0.2, roi: 0.2, risk: 0.25, compliance: 0.2, operational: 0.15 };
        let score = 0;

        // Normalize TCO (lower is better) - very simplified
        const maxTco = 2000000; // Assume a max TCO for normalization
        score += ((maxTco - (vendorResult.tco?.total || maxTco)) / maxTco) * 100 * weights.tco;

        score += (vendorResult.roi?.percentage || 0) * weights.roi; // ROI percentage directly
        score += (100 - (vendorResult.riskScore?.score || 100)) * weights.risk; // Lower risk is better
        score += (vendorResult.complianceScore?.overall || 0) * weights.compliance;
        score += (vendorResult.operationalImpact?.efficiencyGain || 0) * weights.operational; // Assuming efficiency 0-100

        return Math.max(0, Math.min(100, Math.round(score)));
    }


    showView(viewKey) {
        console.log(`Attempting to show view: ${viewKey}`);
        if (this.currentView === viewKey && this.uiManager.isContentLoaded()) {
            console.log(`View ${viewKey} is already active and content loaded.`);
            return;
        }

        const viewInstance = this.views[viewKey];

        // Handle 'financial' view with internal render method
        if (viewKey === 'financial' && typeof this.renderFinancialAnalysis === 'function') {
            this.uiManager.setLoading(true);
            this.uiManager.updateViewTitle("Financial Analysis"); // Update title
            this.renderFinancialAnalysis(this.uiManager.getContentArea());
            // renderFinancialAnalysis calls renderFinancialCharts, so no separate call needed here.
            this.currentView = viewKey;
            this.uiManager.updateNav(viewKey);
            this.configManager.set('lastView', viewKey);
            this.eventSystem.emit('view:changed', viewKey);
            this.uiManager.setLoading(false);
            console.log(`View ${viewKey} shown successfully using internal renderFinancialAnalysis method.`);
        } else if (viewInstance && typeof viewInstance.render === 'function') {
            this.uiManager.setLoading(true);

            // Update view title - this should ideally get the title from the view instance or a map
            const viewTitle = viewKey.charAt(0).toUpperCase() + viewKey.slice(1).replace(/([A-Z])/g, ' $1').trim(); // Basic title
            this.uiManager.updateViewTitle(viewTitle);

            // Pass results and config to the view's render method
            viewInstance.render(this.uiManager.getContentArea(), this.results, this.config);

            // Standard chart initialization calls for other views
            if (typeof viewInstance.initCharts === 'function') {
                 setTimeout(() => viewInstance.initCharts(this.results, this.config), 100);
            } else if (typeof viewInstance.initializeCharts === 'function') {
                 setTimeout(() => viewInstance.initializeCharts(this.results, this.config), 100);
            } else if (typeof viewInstance.initializeExecutiveCharts === 'function') {
                 setTimeout(() => viewInstance.initializeExecutiveCharts(this.results, this.config), 100);
            }
            // For comparison view, which is registered differently
            else if (viewKey === 'comparison' && typeof viewInstance.initCharts === 'function') { // initCharts is what's on the comparison view object
                 setTimeout(() => viewInstance.initCharts(), 100); // Comparison view's initCharts doesn't take args
            }


            this.currentView = viewKey;
            this.uiManager.updateNav(viewKey);
            this.configManager.set('lastView', viewKey);
            this.eventSystem.emit('view:changed', viewKey);
            this.uiManager.setLoading(false);
            console.log(`View ${viewKey} shown successfully.`);
        } else {
            console.error(`View ${viewKey} not found or has no render method.`);
            this.uiManager.showError(`View "${viewKey}" is not available.`);
            this.uiManager.setLoading(false);
        }
    }

    // Detailed Calculation Methods (Ported and Adapted)
    calculateTCO(vendor) {
        if (!vendor || !this.config) {
            console.error("CalculateTCO: Missing vendor data or platform config.");
            return { total: 0, perDevicePerMonth: 0, software: 0, hardware: 0, implementation: 0, support: 0, training: 0, operations: 0, hidden: 0, compliance: 0 };
        }

        const { devices, years, industry, users } = this.config;
        let tco = {
            software: 0, hardware: 0, implementation: 0, support: 0,
            training: 0, operations: 0, hidden: 0, compliance: 0,
            total: 0, perDevicePerMonth: 0
        };

        // Base costs from vendor data (assuming structure similar to original ComprehensiveVendorDatabase items)
        const pricing = vendor.pricing || {};
        const deploymentInfo = vendor.deployment || {};
        const operationsInfo = vendor.operations || {};
        const hiddenCostsInfo = vendor.hiddenCosts || {};

        // Software/Subscription
        if (pricing.perDevice?.negotiated) { // Portnox model
            tco.software = pricing.perDevice.negotiated * devices * 12 * years;
        } else if (pricing.perDevice?.annual) {
            tco.software = pricing.perDevice.annual * devices * years;
        } else if (pricing.perUser?.annual) {
            tco.software = pricing.perUser.annual * users * years;
        } else if (pricing.perDevice?.total) { // One-time software cost (less common for NAC)
            tco.software = pricing.perDevice.total * devices;
        } else if(pricing.baselineCost?.upfront) {
            tco.software = pricing.baselineCost.upfront;
        }


        // Hardware
        tco.hardware = (pricing.hardwarePerDevice || 0) * devices + (pricing.hardwareBase || 0);
        if(vendor.infrastructure?.servers?.totalCost) { // From older structure
            tco.hardware += vendor.infrastructure.servers.totalCost;
        }


        // Implementation
        tco.implementation = deploymentInfo.professionalServices?.cost || deploymentInfo.time * (deploymentInfo.consultants || 1) * 200 * 8 || 0; // consultant @ $200/hr
        if (deploymentInfo.time && deploymentInfo.time > 40) { // Add internal effort for long deployments
            tco.implementation += (deploymentInfo.time / 40) * (this.configManager.get('avgITSalary') || 90000) / 52; // Weeks of internal IT effort
        }


        // Support & Maintenance (annual, then multiply by years)
        let annualSupport = 0;
        if (pricing.support?.annualPercent) {
            annualSupport = (tco.software + tco.hardware) * (pricing.support.annualPercent / 100);
        } else if (pricing.support?.annualFixed) {
            annualSupport = pricing.support.annualFixed;
        } else if (vendor.id !== 'portnox') { // Default for non-Portnox if not specified
            annualSupport = (tco.software + tco.hardware) * 0.18; // Default 18%
        }
        tco.support = annualSupport * years;

        // Training
        tco.training = operationsInfo.training?.admin?.cost || 0;
        if (operationsInfo.training?.users && users > 0) {
            tco.training += operationsInfo.training.users.costPerUser * users;
        }

        // Operations (FTE)
        const fteCost = (this.configManager.get('avgITSalary') || 90000);
        tco.operations = (operationsInfo.fte || 0) * fteCost * years;

        // Hidden Costs
        tco.hidden = (hiddenCostsInfo.total || 0) * years; // Assuming total is annual or needs adjustment

        // Compliance Costs (simplified - could be more dynamic)
        const baseComplianceCostPerYear = 5000 + (devices * 5); // Base + per device
        let complianceMultiplier = 1.0;
        if (vendor.features?.compliance?.automation < 50) complianceMultiplier = 1.5;
        if (vendor.features?.compliance?.automation < 25) complianceMultiplier = 2.0;
        tco.compliance = baseComplianceCostPerYear * complianceMultiplier * years;


        // Summing up
        tco.total = tco.software + tco.hardware + tco.implementation + tco.support + tco.training + tco.operations + tco.hidden + tco.compliance;
        if (devices > 0 && years > 0) {
            tco.perDevicePerMonth = tco.total / (devices * years * 12);
        } else {
            tco.perDevicePerMonth = 0;
        }

        // Add savings for Portnox (conceptual, should be based on comparison)
        if (vendor.id === 'portnox' && this.results && Object.keys(this.results).length > 1) {
            let avgCompetitorTco = 0;
            let count = 0;
            for (const key in this.results) {
                if (key !== 'portnox' && this.results[key].tco) {
                    avgCompetitorTco += this.results[key].tco.total;
                    count++;
                }
            }
            if (count > 0) {
                tco.savingsVsNextBest = (avgCompetitorTco / count) - tco.total;
            }
        }


        return tco;
    }

    calculateROI(vendor, tco) {
        if (!vendor || !tco || !this.config) {
            console.error("CalculateROI: Missing vendor, TCO data, or platform config.");
            return { percentage: 0, paybackMonths: 0, totalBenefits: 0, netValue: 0 };
        }

        const years = this.config.years;
        const devices = this.config.devices;
        const users = this.config.users;
        const avgITSalary = this.configManager.get('avgITSalary') || 90000;

        let annualBenefits = 0;

        // Operational Savings (FTE reduction, automation)
        const fteSavings = (vendor.operations?.fteBaseline || 2.0) - (vendor.operations?.fte || 0.5);
        annualBenefits += fteSavings * avgITSalary;
        annualBenefits += (vendor.features?.automation || 0) / 100 * (avgITSalary * 0.2); // Automation of tasks

        // Security Savings (breach cost reduction, tool consolidation)
        const avgBreachCost = this.configManager.get('avgBreachCost') || 1000000; // Example default
        const breachProbabilityReduction = (vendor.features?.security?.breachReduction || (vendor.features?.zeroTrust?.score || 0) / 100 * 0.7) || 0; // 70% of ZT score as reduction factor
        annualBenefits += avgBreachCost * (this.configManager.get('breachProbabilityBase') || 0.10) * breachProbabilityReduction; // 10% base probability
        annualBenefits += vendor.savings?.toolConsolidation || 0; // Annual saving from tool consolidation

        // Compliance Savings (audit time reduction, penalty avoidance)
        annualBenefits += (vendor.features?.compliance?.auditTimeReductionPercent || (vendor.features?.compliance?.automation || 0) / 2) / 100 * (this.configManager.get('annualAuditCost') || 50000);
        annualBenefits += (vendor.features?.compliance?.penaltyAvoidanceFactor || (vendor.features?.compliance?.automation || 0) / 100 * 0.5) * (this.configManager.get('annualPenaltyRisk') || 200000);

        // Productivity Gains (simplified)
        annualBenefits += users * (vendor.savings?.userProductivityHoursPerYear || 5) * (this.configManager.get('avgEmployeeCostPerHour') || 50);

        const totalBenefits = annualBenefits * years;
        const investment = tco.total;
        const netValue = totalBenefits - investment;
        const percentage = investment > 0 ? (netValue / investment) * 100 : (totalBenefits > 0 ? Infinity : 0);

        let paybackMonths = 0;
        if (annualBenefits > 0) {
            paybackMonths = (investment / annualBenefits) * 12;
            if (paybackMonths < 0 || percentage < 0 ) paybackMonths = 0; // if benefits don't outweigh costs even annually
        }

        return {
            percentage: Math.round(percentage),
            paybackMonths: Math.round(paybackMonths),
            totalBenefits: Math.round(totalBenefits),
            netValue: Math.round(netValue),
            annualBenefits: Math.round(annualBenefits)
        };
    }

    calculateRiskScore(vendor) {
        if (!vendor || !vendor.features) return { score: 100, level: 'High', factors: {} };

        const features = vendor.features;
        const weights = {
            zeroTrust: 0.4,
            threatDetection: 0.3,
            mttr: 0.2,
            visibility: 0.1
        };

        let risk = 0;

        // Zero Trust Score (0-100, higher is better, so invert for risk)
        risk += (100 - (features.zeroTrust?.score || 20)) * weights.zeroTrust;

        // Threat Detection (AI based is low risk, boolean based is medium, none is high)
        if (features.security?.aiThreatDetection) risk += 10 * weights.threatDetection; // Low risk contribution
        else if (features.security?.basicThreatDetection) risk += 50 * weights.threatDetection; // Medium
        else risk += 90 * weights.threatDetection; // High

        // MTTR (Mean Time To Remediate - lower is better)
        const mttr = features.security?.mttr || 240; // Default 4 hours (240 mins)
        if (mttr <= 15) risk += 10 * weights.mttr;       // Excellent
        else if (mttr <= 60) risk += 30 * weights.mttr;  // Good
        else if (mttr <= 240) risk += 60 * weights.mttr; // Average
        else risk += 90 * weights.mttr;                  // Poor

        // Visibility (higher is better, so invert)
        risk += (100 - (features.visibility?.deviceVisibilityScore || 30)) * weights.visibility;

        const score = Math.max(0, Math.min(100, Math.round(risk)));
        let level = 'Low';
        if (score > 66) level = 'High';
        else if (score > 33) level = 'Medium';

        return { score, level, factors: {} }; // factors can be detailed later
    }

    calculateComplianceScore(vendor) {
        if (!vendor || !this.config || !window.ComplianceNACMapping) {
             return { overall: 0, frameworks: {} };
        }
        // Use the ComplianceNACMapping helper if available
        if (typeof window.ComplianceNACMapping.calculateVendorComplianceForAll === 'function') {
            return window.ComplianceNACMapping.calculateVendorComplianceForAll(vendor, this.config.complianceFrameworks);
        } else {
            // Fallback simple calculation
            let totalScore = 0;
            let frameworkCount = this.config.complianceFrameworks.length;
            if (frameworkCount === 0) return { overall: 0, frameworks: {} };

            this.config.complianceFrameworks.forEach(fw => {
                // Simplified: check if vendor lists framework, give score
                if (vendor.compliance?.frameworks?.includes(fw)) {
                    totalScore += (vendor.features?.compliance?.automation || 50) > 75 ? 90 : 70; // Base score on automation
                } else {
                    totalScore += 30; // Low score if not listed
                }
            });
            return { overall: Math.round(totalScore / frameworkCount), frameworks: {} };
        }
    }

    calculateOperationalImpact(vendor) {
        if (!vendor || !vendor.operations || !vendor.deployment || !vendor.features) {
            return { fteSavings: 0, deploymentTimeReduction: 0, automationLevel: 0, efficiencyGain: 0 };
        }
        // Baseline FTE for managing NAC without advanced features or with complex solutions
        const baselineFTE = 2.0;
        const fteSavings = baselineFTE - (vendor.operations.fte || baselineFTE);

        // Baseline deployment time (e.g., in hours)
        const baselineDeploymentTime = 720; // 30 days * 24 hours (very rough)
        const deploymentTimeReduction = baselineDeploymentTime - (vendor.deployment.time || baselineDeploymentTime);

        const automationLevel = vendor.features.automation || 0;

        // Overall efficiency gain (composite score, 0-100)
        // Higher automation, lower FTE, faster deployment = higher efficiency
        let efficiencyScore = 0;
        efficiencyScore += (automationLevel / 100) * 40; // 40% weight for automation
        efficiencyScore += ((baselineFTE - (vendor.operations.fte || baselineFTE)) / baselineFTE) * 30; // 30% weight for FTE reduction (max if FTE is 0)
        efficiencyScore += ((baselineDeploymentTime - (vendor.deployment.time || baselineDeploymentTime)) / baselineDeploymentTime) * 30; // 30% for time reduction

        return {
            fteSavings: parseFloat(fteSavings.toFixed(2)),
            deploymentTimeReduction: deploymentTimeReduction > 0 ? parseFloat(deploymentTimeReduction.toFixed(0)) : 0, // in hours
            automationLevel: automationLevel,
            efficiencyGain: Math.max(0, Math.min(100, Math.round(efficiencyScore)))
        };
    }

    // Methods for comparison view (if kept as part of platform)
    renderComparison(container) {
        // Simplified version of existing comparison logic
        if (!this.results || Object.keys(this.results).length === 0 || !this.config.selectedVendors || this.config.selectedVendors.length === 0) {
            container.innerHTML = '<p>Select vendors and calculate to see comparison.</p>';
            return;
        }
        let html = '<h3>Feature Comparison</h3><table class="data-table"><thead><tr><th>Feature</th>';
        this.config.selectedVendors.forEach(id => {
            html += `<th>${this.results[id]?.vendor?.name || id}</th>`;
        });
        html += '</tr></thead><tbody>';
        // Example features
        const features = ['802.1X Authentication', 'Cloud Managed', 'AI Threat Detection'];
        features.forEach(f => {
            html += `<tr><td>${f}</td>`;
            this.config.selectedVendors.forEach(id => {
                const vendor = this.results[id]?.vendor;
                const hasFeature = vendor?.features?.core?.[f] || vendor?.features?.security?.[f] || vendor?.deployment?.[f.replace(' ', '').toLowerCase()];
                html += `<td>${hasFeature ? 'Yes' : 'No'}</td>`;
            });
            html += '</tr>';
        });
        html += '</tbody></table><canvas id="ultimate-comparison-radar-chart" height="300"></canvas>';
        container.innerHTML = html;
    }

    initializeComparisonCharts() {
        const ctx = document.getElementById('ultimate-comparison-radar-chart')?.getContext('2d');
        if (!ctx || !this.results || Object.keys(this.results).length === 0) return;

        const labels = ['Security', 'Automation', 'Deployment', 'Compliance']; // Simplified
        const datasets = this.config.selectedVendors.map((vendorId, index) => {
            const vendorResult = this.results[vendorId];
            const vendorData = vendorResult?.vendor;
            if (!vendorData) return { label: vendorId, data: [0,0,0,0] };

            const data = [
                (100 - (vendorResult.riskScore?.score || 100)) / 20, // Max 5
                (vendorResult.operationalImpact?.automationLevel || 0) / 20, // Max 5
                vendorData.deployment?.model === 'Cloud' ? 5 : 2.5,
                (vendorResult.complianceScore?.overall || 0) / 20 // Max 5
            ];
            const colors = [ 'rgba(0, 212, 170, 0.4)', 'rgba(255, 107, 53, 0.4)', 'rgba(59, 130, 246, 0.4)' ];
            return {
                label: vendorData.name,
                data: data,
                backgroundColor: colors[index % colors.length],
                borderColor: colors[index % colors.length].replace('0.4', '1'),
                borderWidth: 1
            };
        });

        if (window.ultimateComparisonRadar) window.ultimateComparisonRadar.destroy();
        window.ultimateComparisonRadar = new Chart(ctx, {
            type: 'radar',
            data: { labels, datasets },
            options: { scales: { r: { angleLines: { display: false }, suggestedMin: 0, suggestedMax: 5 } } }
        });
    }

    // Charting Methods to be implemented or verified within UltimatePlatform

    // Executive Summary View Rendering & Charts
    renderExecutiveSummary(container) {
        const summaryHtml = `
            <div class="executive-summary-view ultimate-view-content">
                <div class="view-header">
                    <h3>Executive Summary & Key Metrics</h3>
                </div>
                <section class="charts-grid">
                    <div class="chart-container">
                        <h4>Vendor Comparison Highlights</h4>
                        <div id="executive-comparison-chart-ultimate" style="height: 400px;"></div>
                    </div>
                    <!-- Other executive summary elements can go here -->
                </section>
            </div>
        `;
        container.innerHTML = summaryHtml;
        console.log("UltimatePlatform: ExecutiveSummary HTML structure rendered.");
        this.renderExecutiveComparisonChart('executive-comparison-chart-ultimate');
    }

    // Feature Matrix View Rendering & Charts
    renderFeatureMatrix(container) {
        const matrixHtml = `
            <div class="feature-matrix-view ultimate-view-content">
                <div class="view-header">
                    <h3>Feature Matrix & Coverage Analysis</h3>
                </div>
                <section>
                    <h4>Feature Filters (Placeholder)</h4>
                    <!-- Add filter controls here if needed -->
                </section>
                <section class="charts-grid">
                    <div class="chart-container">
                        <h4>Overall Feature Coverage</h4>
                        <div id="feature-coverage-chart-ultimate" style="height: 400px;"></div>
                    </div>
                </section>
                <section>
                    <h4>Detailed Feature Table (Placeholder)</h4>
                    <!-- Detailed table comparing features can be rendered here -->
                    <p>A detailed feature comparison table would go here, similar to the 'comparison' view but potentially with different focus or interactivity.</p>
                </section>
            </div>
        `;
        container.innerHTML = matrixHtml;
        console.log("UltimatePlatform: FeatureMatrix HTML structure rendered.");
        this.renderFeatureCoverageChart('feature-coverage-chart-ultimate');
        // Attach event listeners for filters if implemented
    }

    // Compliance Analysis View Rendering & Charts
    renderComplianceAnalysis(container) {
        const complianceHtml = `
            <div class="compliance-analysis-view ultimate-view-content">
                <div class="view-header">
                    <h3>Compliance Analysis & Audit Readiness</h3>
                </div>
                <section>
                    <h4>Compliance Overview (Placeholder)</h4>
                    <!-- Gauges/summary cards for overall compliance, frameworks covered etc. -->
                    <div id="compliance-gauges-placeholder">Call animateGauges() for this section.</div>
                </section>
                <section class="charts-grid">
                    <div class="chart-container">
                        <h4>Industry Compliance Radar</h4>
                        <div id="industry-compliance-radar-ultimate" style="height: 400px;"></div>
                    </div>
                    <!-- Potentially another compliance chart here -->
                </section>
                <section>
                    <h4>Detailed Framework Matrix (Placeholder)</h4>
                    <!-- Table showing vendor scores per control per framework -->
                </section>
            </div>
        `;
        container.innerHTML = complianceHtml;
        console.log("UltimatePlatform: ComplianceAnalysis HTML structure rendered.");
        this.renderComplianceVisualizations('industry-compliance-radar-ultimate');
        // Note: animateGauges is called within renderComplianceVisualizations
    }

    // Sensitivity Analysis View Rendering & Charts
    renderSensitivityAnalysis(container) {
        const sensitivityHtml = `
            <div class="sensitivity-analysis-view ultimate-view-content">
                <div class="view-header">
                    <h3>TCO Sensitivity Analysis</h3>
                </div>
                <section>
                    <h4>Sensitivity Controls (Placeholder)</h4>
                    <!-- Input controls for variables like device count, user growth, license cost changes -->
                </section>
                <section class="charts-grid">
                    <div class="chart-container">
                        <h4>TCO Sensitivity to Key Variables</h4>
                        <div id="tco-sensitivity-chart-ultimate" style="height: 400px;"></div>
                    </div>
                </section>
            </div>
        `;
        container.innerHTML = sensitivityHtml;
        console.log("UltimatePlatform: SensitivityAnalysis HTML structure rendered.");
        this.renderSensitivityCharts('tco-sensitivity-chart-ultimate');
        // Attach event listeners for sensitivity controls if implemented
    }

    // Financial Analysis View Rendering & Charts
    renderFinancialAnalysis(container) {
        // This method is called by showView('financial') if FinancialAnalysisView is not used.
        // It defines the HTML structure and then calls the chart rendering methods.
        // Note: The current setup with separate View classes (e.g., FinancialAnalysisView)
        // means those classes would typically define their own HTML and call their own chart methods.
        // Adding this here to align with the subtask's goal of implementing charts *within* UltimatePlatform.

        const financialHtml = `
            <div class="financial-analysis-view ultimate-view-content">
                <div class="view-header">
                    <h3>Financial Deep Dive</h3>
                </div>
                <section class="charts-grid">
                    <div class="chart-container">
                        <h4>TCO Trend Over Years</h4>
                        <div id="tco-trend-chart-ultimate" style="height: 350px;"></div>
                    </div>
                    <div class="chart-container">
                        <h4>Cost Breakdown (Primary Vendor)</h4>
                        <div id="cost-breakdown-chart-ultimate" style="height: 350px;"></div>
                    </div>
                </section>
                <section class="charts-grid">
                    <div class="chart-container">
                        <h4>Hidden Cost Factors (Primary Vendor)</h4>
                        <div id="hidden-costs-waterfall-ultimate" style="height: 350px;"></div>
                    </div>
                    <div class="chart-container">
                        <h4>ROI Timeline</h4>
                        <div id="roi-timeline-chart-ultimate" style="height: 350px;"></div>
                    </div>
                </section>
                <!-- More financial details can be added here -->
            </div>
        `;
        container.innerHTML = financialHtml;
        console.log("UltimatePlatform: FinancialAnalysis HTML structure rendered.");

        // Call the main financial charts rendering method
        this.renderFinancialCharts(
            'tco-trend-chart-ultimate',
            'cost-breakdown-chart-ultimate',
            'hidden-costs-waterfall-ultimate',
            'roi-timeline-chart-ultimate'
        );
    }


    renderExecutiveComparisonChart(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || typeof Highcharts === 'undefined') {
            console.warn(`Executive Comparison Chart: Canvas ID "${canvasId}" not found or Highcharts not loaded.`);
            if(canvas) canvas.innerHTML = '<p style="text-align:center; color:grey;">Executive Comparison Chart (Highcharts Error)</p>';
            return;
        }
        console.log(`UltimatePlatform: Rendering ExecutiveComparisonChart on ${canvasId} using this.results`, this.results);
        if (!this.results || Object.keys(this.results).length === 0) {
            if(canvas) canvas.innerHTML = '<p style="text-align:center; color:grey;">No data for Executive Comparison Chart.</p>';
            return;
        }

        const categories = ['Overall Score', 'TCO ($K)', 'ROI (%)', 'Risk Score (Lower is Better)', 'Compliance (%)'];
        const seriesData = this.config.selectedVendors.map(vendorId => {
            const result = this.results[vendorId];
            if (!result) return { name: vendorId, data: [0,0,0,0,0] };
            return {
                name: result.vendor?.name || vendorId,
                data: [
                    result.overallScore || 0,
                    Math.round((result.tco?.total || 0) / 1000), // TCO in $K
                    result.roi?.percentage || 0,
                    result.riskScore?.score || 0,
                    result.complianceScore?.overall || 0
                ]
            };
        });

        Highcharts.chart(canvasId, {
            chart: { type: 'column' },
            title: { text: 'Executive Comparison Summary' },
            xAxis: { categories: categories },
            yAxis: { title: { text: 'Values / Scores' } },
            tooltip: {
                shared: true,
                crosshairs: true,
                formatter: function () {
                    let s = `<b>${this.x}</b><table>`;
                    this.points.forEach(point => {
                        s += `<tr><td style="color:${point.series.color}">${point.series.name}: </td>
                        <td style="text-align: right"><b>${point.y}</b></td></tr>`;
                    });
                    s += '</table>';
                    return s;
                },
                useHTML: true
            },
            series: seriesData,
            credits: { enabled: false }
        });
    }

    renderFinancialCharts(canvasTCOTrendId, canvasCostBreakdownId, canvasHiddenCostsId, canvasROITimelineId) {
        console.log(`UltimatePlatform: Rendering Financial Charts using this.results`, this.results);
        if (!this.results || Object.keys(this.results).length === 0) {
            console.warn("RenderFinancialCharts: No results available to render charts.");
            // Optionally display messages in canvas elements
            [canvasTCOTrendId, canvasCostBreakdownId, canvasHiddenCostsId, canvasROITimelineId].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = '<p style="text-align:center;padding:20px;color:grey;">No data for financial charts.</p>';
            });
            return;
        }
        this.renderTCOTrendChart(canvasTCOTrendId);
        this.renderCostBreakdownChart(canvasCostBreakdownId);
        this.renderHiddenCostsWaterfall(canvasHiddenCostsId);
        this.renderROITimelineChart(canvasROITimelineId);
    }

    renderTCOTrendChart(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || typeof Highcharts === 'undefined') {
            console.warn(`TCO Trend Chart: Canvas ID "${canvasId}" not found or Highcharts not loaded.`);
            if(canvas) canvas.innerHTML = '<p style="text-align:center; color:grey;">TCO Trend Chart (Error)</p>';
            return;
        }

        const seriesData = [];
        const years = this.config.years || 3;
        const yearLabels = Array.from({ length: years }, (_, i) => `Year ${i + 1}`);

        this.config.selectedVendors.forEach(vendorId => {
            const result = this.results[vendorId];
            if (result && result.tco) {
                // Assuming tco.total is the cumulative TCO for 'years'. We need annual breakdown.
                // For simplicity, let's assume an even spread or a simple projection if not detailed.
                // The current tco object is: { software, hardware, implementation, support, training, operations, hidden, compliance, total, perDevicePerMonth }
                // This doesn't have per-year projection. We'll make a simplified one.
                const annualTCO = result.tco.total / years;
                const trend = Array.from({ length: years }, (_, i) => Math.round(annualTCO * (i + 1)));
                seriesData.push({
                    name: result.vendor?.name || vendorId,
                    data: trend
                });
            }
        });

        if (seriesData.length === 0) {
            canvas.innerHTML = '<p style="text-align:center; color:grey;">No TCO trend data available.</p>';
            return;
        }

        Highcharts.chart(canvasId, {
            chart: { type: 'line' },
            title: { text: 'TCO Trend Over Years (Cumulative)' },
            xAxis: { categories: yearLabels },
            yAxis: { title: { text: 'Cumulative TCO ($)' } },
            series: seriesData,
            credits: { enabled: false }
        });
    }

    renderCostBreakdownChart(canvasId) {
        const canvas = document.getElementById(canvasId);
         if (!canvas || typeof Highcharts === 'undefined') {
            console.warn(`Cost Breakdown Chart: Canvas ID "${canvasId}" not found or Highcharts not loaded.`);
            if(canvas) canvas.innerHTML = '<p style="text-align:center; color:grey;">Cost Breakdown Chart (Error)</p>';
            return;
        }

        const primaryVendorId = this.config.selectedVendors[0] || 'portnox';
        const vendorResult = this.results[primaryVendorId];

        if (!vendorResult || !vendorResult.tco) {
            canvas.innerHTML = '<p style="text-align:center; color:grey;">No TCO data for primary vendor.</p>';
            return;
        }

        const tcoData = vendorResult.tco;
        const breakdownData = [
            { name: 'Software/Subscription', y: tcoData.software || 0 },
            { name: 'Hardware', y: tcoData.hardware || 0 },
            { name: 'Implementation', y: tcoData.implementation || 0 },
            { name: 'Support/Maintenance', y: tcoData.support || 0 },
            { name: 'Training', y: tcoData.training || 0 },
            { name: 'Operations (FTE)', y: tcoData.operations || 0 },
            { name: 'Hidden Costs', y: tcoData.hidden || 0 },
            { name: 'Compliance', y: tcoData.compliance || 0 }
        ].filter(item => item.y > 0); // Filter out zero-cost items

        if (breakdownData.length === 0) {
             canvas.innerHTML = '<p style="text-align:center; color:grey;">No cost breakdown data available.</p>';
            return;
        }

        Highcharts.chart(canvasId, {
            chart: { type: 'pie' },
            title: { text: `Cost Breakdown: ${vendorResult.vendor?.name || primaryVendorId}` },
            tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> (${point.y:,.0f})' },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Cost',
                colorByPoint: true,
                data: breakdownData
            }],
            credits: { enabled: false }
        });
    }

    renderHiddenCostsWaterfall(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || typeof Highcharts === 'undefined') {
            console.warn(`Hidden Costs Waterfall: Canvas ID "${canvasId}" not found or Highcharts not loaded.`);
            if(canvas) canvas.innerHTML = '<p style="text-align:center; color:grey;">Hidden Costs Waterfall (Error)</p>';
            return;
        }

        const primaryVendorId = this.config.selectedVendors[0] || 'portnox';
        const vendorResult = this.results[primaryVendorId];

        if (!vendorResult || !vendorResult.tco || typeof vendorResult.tco.hidden === 'undefined') {
            canvas.innerHTML = '<p style="text-align:center; color:grey;">No Hidden Cost data for primary vendor.</p>';
            return;
        }

        // Assuming tco.hidden is the total. We need a breakdown if available.
        // The current TCO calculation doesn't store a detailed breakdown of hidden costs.
        // Let's simulate a breakdown for the chart.
        const hiddenTotal = vendorResult.tco.hidden;
        const simulatedBreakdown = [
            { name: 'Integration Complexity', y: hiddenTotal * 0.3 },
            { name: 'Extended Downtime', y: hiddenTotal * 0.4 },
            { name: 'Productivity Loss (IT)', y: hiddenTotal * 0.2 },
            { name: 'Other Unforeseen', y: hiddenTotal * 0.1 }
        ].filter(d => d.y > 0);

        if (hiddenTotal === 0 || simulatedBreakdown.length === 0) {
             canvas.innerHTML = '<p style="text-align:center; color:grey;">No hidden costs to display.</p>';
            return;
        }

        const data = simulatedBreakdown.map(item => ({ name: item.name, y: item.y }));
        data.push({ name: 'Total Hidden Costs', isSum: true });


        Highcharts.chart(canvasId, {
            chart: { type: 'waterfall' },
            title: { text: `Hidden Cost Factors: ${vendorResult.vendor?.name || primaryVendorId}` },
            xAxis: { type: 'category' },
            yAxis: { title: { text: 'Cost ($)' } },
            legend: { enabled: false },
            tooltip: { pointFormat: '<b>${point.y:,.0f}</b>' },
            series: [{
                upColor: Highcharts.getOptions().colors[2], // Negative impact color
                color: Highcharts.getOptions().colors[3], // Positive impact (less used in cost context)
                data: data,
                dataLabels: {
                    enabled: true,
                    formatter: function () { return Highcharts.numberFormat(this.y / 1000, 0, ',') + 'K'; },
                    style: { fontWeight: 'bold' }
                },
                pointPadding: 0
            }],
            credits: { enabled: false }
        });
    }

    renderROITimelineChart(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || typeof Highcharts === 'undefined') {
            console.warn(`ROI Timeline Chart: Canvas ID "${canvasId}" not found or Highcharts not loaded.`);
            if(canvas) canvas.innerHTML = '<p style="text-align:center; color:grey;">ROI Timeline Chart (Error)</p>';
            return;
        }

        const seriesData = [];
        const years = this.config.years || 3;
        const quarters = years * 4;
        const quarterLabels = Array.from({ length: quarters }, (_, i) => `Q${(i % 4) + 1} Y${Math.floor(i / 4) + 1}`);

        this.config.selectedVendors.forEach(vendorId => {
            const result = this.results[vendorId];
            if (result && result.roi && result.tco) {
                const initialInvestment = result.tco.software + result.tco.hardware + result.tco.implementation + result.tco.training; // Simplified initial outlay
                const annualNetBenefit = result.roi.annualBenefits - (result.tco.total / years); // Avg annual net

                let cumulativeNetBenefit = -initialInvestment;
                const trend = [cumulativeNetBenefit]; // Start with initial investment as negative

                for (let q = 1; q < quarters; q++) {
                    cumulativeNetBenefit += annualNetBenefit / 4; // Add quarterly benefit
                    trend.push(Math.round(cumulativeNetBenefit));
                }
                seriesData.push({
                    name: result.vendor?.name || vendorId,
                    data: trend
                });
            }
        });

        if (seriesData.length === 0) {
            canvas.innerHTML = '<p style="text-align:center; color:grey;">No ROI timeline data available.</p>';
            return;
        }

        Highcharts.chart(canvasId, {
            chart: { type: 'line' },
            title: { text: 'Cumulative ROI Timeline (Net Benefit)' },
            xAxis: { categories: quarterLabels, tickInterval: 4 },
            yAxis: { title: { text: 'Cumulative Net Benefit ($)' }, plotLines: [{value: 0, color: 'grey', width:1, zIndex: 4, label:{text:'Breakeven', align:'center', style:{color:'gray'}}}] },
            tooltip: { pointFormat: '{series.name}: <b>${point.y:,.0f}</b>' },
            series: seriesData,
            credits: { enabled: false }
        });
    }

    renderFeatureCoverageChart(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || typeof Highcharts === 'undefined') {
            console.warn(`Feature Coverage Chart: Canvas ID "${canvasId}" not found or Highcharts not loaded.`);
            if(canvas) canvas.innerHTML = '<p style="text-align:center; color:grey;">Feature Coverage Chart (Highcharts Error)</p>';
            return;
        }
        // Placeholder
        const featureCategories = ['Security', 'Automation', 'Compliance', 'Deployment', 'Support', 'Zero Trust'];
        const series = this.config.selectedVendors.map(vendorId => {
            const result = this.results[vendorId];
            const vendor = result?.vendor;
            if (!vendor) return { name: vendorId, data: featureCategories.map(() => Math.random() * 40 + 50) }; // Random if no data

            return {
                name: vendor.name,
                data: [
                    (100 - (result.riskScore?.score || 100)) * (vendor.features?.security?.weight || 1), // Invert risk, apply weight
                    (vendor.features?.automation || 0) * (vendor.features?.automation?.weight || 1),
                    (result.complianceScore?.overall || 0) * (vendor.features?.compliance?.weight || 1),
                    (100 - ((vendor.deployment?.time || 2000)/200)) * (vendor.deployment?.weight || 1), // Lower deployment time is better
                    (vendor.operations?.supportScore || Math.random()*30+60), // Placeholder for support score
                    (vendor.features?.zeroTrust?.score || 0) * (vendor.features?.zeroTrust?.weight || 1)
                ].map(score => Math.max(0, Math.min(100, Math.round(score)))) // Normalize to 0-100
            };
        });


        Highcharts.chart(canvasId, {
            chart: { polar: true, type: 'area' },
            title: { text: 'Feature Coverage Radar' },
            xAxis: { categories: featureCategories, tickmarkPlacement: 'on', lineWidth: 0 },
            yAxis: { gridLineInterpolation: 'polygon', lineWidth: 0, min: 0, max: 100,
                labels: { formatter: function() { return this.value + '%'; }}
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:.0f}%</b><br/>'
            },
            series: series,
            credits: { enabled: false }
        });
    }

    renderComplianceVisualizations(canvasRadarId /*, other params */) {
        console.log(`UltimatePlatform: Rendering Compliance Visualizations using this.results`, this.results);
        this.renderIndustryComplianceRadar(canvasRadarId);
        this.animateGauges(); // Assuming this will find its targets or be adapted
    }

    renderIndustryComplianceRadar(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas || typeof Highcharts === 'undefined') {
            console.warn(`Industry Compliance Radar: Canvas ID "${canvasId}" not found or Highcharts not loaded.`);
            if(canvas) canvas.innerHTML = '<p style="text-align:center; color:grey;">Industry Compliance Radar (Highcharts Error)</p>';
            return;
        }

        const seriesData = this.config.selectedVendors.map(vendorId => {
            const result = this.results[vendorId];
            const vendorName = result?.vendor?.name || vendorId;
            const frameworkScores = result?.complianceScore?.frameworks || {};
            const data = this.config.complianceFrameworks.map(fw => frameworkScores[fw] || 0);
            return { name: vendorName, data: data };
        });

        if (this.config.complianceFrameworks.length === 0) {
            canvas.innerHTML = '<p style="text-align:center; color:grey;">No compliance frameworks selected.</p>';
            return;
        }
        if (seriesData.length === 0) {
            canvas.innerHTML = '<p style="text-align:center; color:grey;">No vendor data for compliance radar.</p>';
            return;
        }

        Highcharts.chart(canvasId, {
            chart: { polar: true, type: 'line' },
            title: { text: 'Industry Compliance Radar' },
            xAxis: { categories: this.config.complianceFrameworks, tickmarkPlacement: 'on', lineWidth: 0 },
            yAxis: { gridLineInterpolation: 'polygon', lineWidth: 0, min: 0, max: 100,
                labels: { formatter: function() { return this.value + '%'; }}
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:.0f}%</b><br/>'
            },
            series: seriesData,
            credits: { enabled: false }
        });
    }

    animateGauges() {
        // Placeholder for SVG animation. This is complex and highly dependent on specific SVG structure.
        console.log("UltimatePlatform: AnimateGauges called. SVG animation logic needs specific implementation based on HTML structure.");
        // Example: If gauges are simple divs to update text:
        const gaugeElements = document.querySelectorAll('.svg-gauge-value-text'); // Hypothetical class
        gaugeElements.forEach(el => {
            el.textContent = Math.floor(Math.random() * 100) + '%';
        });
    }

    renderSensitivityCharts(canvasTCOSensitivityId) {
        console.log(`UltimatePlatform: Rendering Sensitivity Charts using this.results`, this.results);
        this.renderTCOSensitivityChart(canvasTCOSensitivityId);
    }

    renderTCOSensitivityChart(canvasId) {
         const canvas = document.getElementById(canvasId);
        if (!canvas || typeof Highcharts === 'undefined') {
            console.warn(`TCO Sensitivity Chart: Canvas ID "${canvasId}" not found or Highcharts not loaded.`);
            if(canvas) canvas.innerHTML = '<p style="text-align:center; color:grey;">TCO Sensitivity Chart (Highcharts Error)</p>';
            return;
        }

        // For this example, let's assume a few sensitivity scenarios for the primary vendor's TCO
        const primaryVendorId = this.config.selectedVendors[0] || 'portnox';
        const vendorResult = this.results[primaryVendorId];

        if (!vendorResult || !vendorResult.tco) {
            canvas.innerHTML = '<p style="text-align:center; color:grey;">No TCO data for sensitivity analysis.</p>';
            return;
        }

        const baseTCO = vendorResult.tco.total;
        const series = [{
            name: `${vendorResult.vendor?.name || primaryVendorId} TCO`,
            data: [
                { name: '-20% Devices', y: baseTCO * 0.85 }, // Simplified sensitivity
                { name: 'Baseline', y: baseTCO },
                { name: '+20% Devices', y: baseTCO * 1.15 },
                { name: '+1 Year Analysis', y: baseTCO * (this.config.years + 1) / this.config.years },
            ]
        }];

        Highcharts.chart(canvasId, {
            chart: { type: 'column'},
            title: { text: `TCO Sensitivity Analysis: ${vendorResult.vendor?.name || primaryVendorId}` },
            xAxis: { type: 'category' },
            yAxis: { title: { text: 'Total Cost of Ownership ($)'}},
            tooltip: { pointFormat: '{series.name}: <b>${point.y:,.0f}</b>' },
            series: series,
            credits: { enabled: false },
            legend: { enabled: false }
        });
    }
}

// DOMContentLoaded listener to initialize the platform
document.addEventListener('DOMContentLoaded', function() {
    console.log("🌟 DOM Ready - Initializing Ultimate Platform with services...");

    if (typeof Chart === 'undefined' && typeof Highcharts === 'undefined') {
        console.error("❌ Charting library (Chart.js or Highcharts) not loaded!");
        const appContainer = document.getElementById('app-ultimate') || document.body;
        appContainer.innerHTML = "<p style='color:red;text-align:center;padding:20px;'>Charting library missing. Application cannot start.</p>";
        return;
    }

    if (typeof ModuleLoader === 'undefined') {
        console.error("❌ ModuleLoader is not loaded! Essential services cannot be initialized.");
        const appContainer = document.getElementById('app-ultimate') || document.body;
        appContainer.innerHTML = "<p style='color:red;text-align:center;padding:20px;'>ModuleLoader missing. Application cannot start.</p>";
        return;
    }

    try {
        // Get instances of EventSystem and ConfigManager using ModuleLoader
        // These modules should have been loaded and registered themselves via their script tags in index.html
        const eventSystem = ModuleLoader.get('EventSystem');
        const configManager = ModuleLoader.get('ConfigManager');

        if (!eventSystem || !configManager) {
            console.error("❌ Core services (EventSystem or ConfigManager) could not be retrieved from ModuleLoader.");
            const appContainer = document.getElementById('app-ultimate') || document.body;
            appContainer.innerHTML = "<p style='color:red;text-align:center;padding:20px;'>Core services missing. Application cannot start.</p>";
            return;
        }

        const uiManager = new UltimateUIManager(eventSystem); // UltimateUIManager is defined in this file

        window.platform = new UltimatePlatform(configManager, eventSystem, uiManager);
        window.platform.init();
        console.log('✅ Ultimate Platform initialized successfully with all services.');

    } catch (error) {
        console.error('Error initializing platform:', error);
        const appContainer = document.getElementById('app-ultimate') || document.body;
        if (appContainer) {
             appContainer.innerHTML = `<div class="ultimate-error-message" style="padding:20px; text-align:center;">
                                          <i class="fas fa-exclamation-triangle" style="font-size:2em; color:red;"></i>
                                          <h2>Platform initialization failed.</h2>
                                          <p>${error.message}</p>
                                          <button onclick="location.reload()" style="padding:10px 20px; background-color:#0072CE; color:white; border:none; border-radius:5px; cursor:pointer;">
                                            <i class="fas fa-redo"></i> Reload Page
                                          </button>
                                        </div>`;
        }
    }
});

// Helper for UIManager (could be in a separate file)
class UltimateUIManager {
    constructor(eventSystem) {
        this.appContainer = document.getElementById('app-ultimate');
        this.navContainer = null;
        this.contentArea = null;
        this.eventSystem = eventSystem;
    }

    renderBaseLayout(platformInstance) {
        if (!this.appContainer) {
            console.error("UltimateUIManager: App container #app-ultimate not found!");
            document.body.innerHTML = '<p style="color:red;text-align:center;padding-top:50px;">Critical Error: Application container missing. Ensure an element with ID "app-ultimate" exists.</p>';
            return;
        }
        this.appContainer.innerHTML = `
            <div class="ultimate-platform-layout">
                <header class="ultimate-header">
                    <img src="${platformInstance.vendorDatabase?.portnox?.logo || './img/vendors/portnox-logo.svg'}" alt="Portnox Logo" class="ultimate-logo">
                    <h1>Ultimate TCO Analyzer</h1>
                    <div class="ultimate-header-actions">
                        <button id="ultimate-export-btn" class="btn-ultimate primary"><i class="fas fa-download"></i> Export Report</button>
                    </div>
                </header>
                <aside class="ultimate-sidebar">
                    <nav class="ultimate-nav" id="ultimate-main-nav">
                        <!-- Nav items will be populated by updateNav -->
                    </nav>
                    <div class="ultimate-config-summary">
                        <h4>Configuration</h4>
                        <p id="config-summary-devices">Devices: ${platformInstance.config.devices}</p>
                        <p id="config-summary-industry">Industry: ${platformInstance.config.industry}</p>
                        <button id="edit-config-btn" class="btn-ultimate secondary full-width">Edit Configuration</button>
                    </div>
                </aside>
                <main class="ultimate-main-content">
                    <div class="ultimate-view-header">
                        <h2 id="ultimate-view-title">Dashboard</h2>
                        <div id="ultimate-view-actions"></div>
                    </div>
                    <div class="ultimate-content-area" id="ultimate-content-area">
                        <!-- View content will be rendered here -->
                    </div>
                </main>
                <footer class="ultimate-footer">
                    <p>&copy; ${new Date().getFullYear()} Portnox. Ultimate TCO Platform.</p>
                </footer>
            </div>
            ${this.renderConfigModal(platformInstance.config)}
        `;
        this.navContainer = this.appContainer.querySelector('#ultimate-main-nav');
        this.contentArea = this.appContainer.querySelector('#ultimate-content-area');

        this.attachModalEventHandlers(platformInstance);
        document.getElementById('ultimate-export-btn').addEventListener('click', () => {
            // platformInstance.exportReport(); // Assuming platform will have this method
            alert('Export functionality to be implemented in UltimatePlatform!');
        });
    }

    attachModalEventHandlers(platformInstance) {
        const modal = document.getElementById('ultimate-config-modal');
        const openBtn = document.getElementById('edit-config-btn');
        const closeBtn = modal.querySelector('.ultimate-modal-close');
        const saveBtn = modal.querySelector('#ultimate-save-config-btn');

        openBtn.addEventListener('click', () => modal.style.display = 'block');
        closeBtn.addEventListener('click', () => modal.style.display = 'none');
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });

        saveBtn.addEventListener('click', () => {
            const newConfig = {
                devices: parseInt(document.getElementById('ultimate-config-devices').value),
                users: parseInt(document.getElementById('ultimate-config-users').value), // Assuming an input exists
                years: parseInt(document.getElementById('ultimate-config-years').value),
                industry: document.getElementById('ultimate-config-industry').value,
                selectedVendors: Array.from(document.querySelectorAll('#ultimate-config-vendors input:checked')).map(cb => cb.value)
                // Add compliance frameworks if needed
            };
            // Emit an event that ConfigManager can listen to, or call ConfigManager directly
            this.eventSystem.emit('config:control:changed', newConfig);
            modal.style.display = 'none';

            // Update summary display
            document.getElementById('config-summary-devices').textContent = `Devices: ${newConfig.devices}`;
            document.getElementById('config-summary-industry').textContent = `Industry: ${newConfig.industry}`;
        });
    }

    renderConfigModal(currentConfig) {
        // Use this.allVendors from the platform instance for the modal
        const platformInstance = this; // 'this' here is the UltimateUIManager instance. Need platformInstance.
                                    // This method is part of UltimateUIManager, it needs access to platformInstance.allVendors.
                                    // Let's assume platformInstance is passed or accessible.
                                    // For now, this change won't work directly as platformInstance is not in scope.
                                    // This indicates a structural issue: renderConfigModal needs platformInstance.

        // TEMPORARY: To make progress, I'll use window.platform which is set in DOMContentLoaded.
        // This is not ideal but matches the scope of the current subtask to use allVendors.
        // A better solution would be for renderBaseLayout to pass platformInstance to renderConfigModal,
        // or for UIManager to have a reference to platform.allVendors.
        const allVendorIds = window.platform ? window.platform.allVendors : ['portnox', 'cisco', 'aruba', 'fortinet', 'forescout', 'hpe'];

        return `
            <div id="ultimate-config-modal" class="ultimate-modal">
                <div class="ultimate-modal-content">
                    <span class="ultimate-modal-close">&times;</span>
                    <h2>Platform Configuration</h2>
                    <div class="ultimate-form-grid">
                        <div class="form-group">
                            <label for="ultimate-config-devices">Number of Devices:</label>
                            <input type="number" id="ultimate-config-devices" value="${currentConfig.devices}" class="form-input-ultimate">
                        </div>
                         <div class="form-group">
                            <label for="ultimate-config-users">Number of Users:</label>
                            <input type="number" id="ultimate-config-users" value="${currentConfig.users}" class="form-input-ultimate">
                        </div>
                        <div class="form-group">
                            <label for="ultimate-config-years">Analysis Period (Years):</label>
                            <input type="number" id="ultimate-config-years" value="${currentConfig.years}" class="form-input-ultimate">
                        </div>
                        <div class="form-group">
                            <label for="ultimate-config-industry">Industry:</label>
                            <select id="ultimate-config-industry" class="form-select-ultimate">
                                ${['technology', 'healthcare', 'finance', 'retail', 'manufacturing', 'education', 'government'].map(ind => `<option value="${ind}" ${currentConfig.industry === ind ? 'selected' : ''}>${ind.charAt(0).toUpperCase() + ind.slice(1)}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Select Vendors:</label>
                        <div id="ultimate-config-vendors" class="ultimate-checkbox-group">
                            ${allVendorIds.map(v_id => { // Changed 'id' to 'v_id' for clarity
                                const vendor = window.MasterVendorDatabase[v_id]; // Use v_id to lookup
                                if (!vendor) return ''; // Skip if vendor data not found
                                const isSelected = currentConfig.selectedVendors.includes(v_id);
                                const isPortnox = v_id === 'portnox'; // Corrected typo from isPorbnox
                                return `
                                <label>
                                    <input type="checkbox" value="${v_id}" ${isSelected ? 'checked' : ''}>
                                    ${isPortnox ? '<i class="fas fa-star"></i>' : ''}
                                    ${vendor.name || v_id}
                                </label>
                            `;
                            }).join('')}
                        </div>
                    </div>
                    <button id="ultimate-save-config-btn" class="btn-ultimate primary">Save Configuration</button>
                </div>
            </div>
        `;
    }

    updateNav(currentViewKey) {
        if (!this.navContainer) return;
        // These should match the keys used in platform.views
        const navItems = [
            { key: 'dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard' },
            { key: 'vendorselection', icon: 'fa-check-square', label: 'Select Vendors'},
            { key: 'financial', icon: 'fa-dollar-sign', label: 'Financial Analysis' },
            { key: 'risksecurity', icon: 'fa-shield-alt', label: 'Risk & Security' }, // Note: key might differ from class name
            { key: 'compliance', icon: 'fa-certificate', label: 'Compliance' },
            { key: 'operationalimpact', icon: 'fa-cogs', label: 'Operational Impact' },
            { key: 'comparison', icon: 'fa-balance-scale', label: 'Feature Comparison' },
            { key: 'strategicinsights', icon: 'fa-lightbulb', label: 'Strategic Insights' },
            { key: 'executivesummary', icon: 'fa-user-tie', label: 'Executive Summary' }
        ];
        this.navContainer.innerHTML = navItems.map(item => `
            <a href="#" class="nav-tab-ultimate ${item.key === currentViewKey ? 'active' : ''}" data-view="${item.key}">
                <i class="fas ${item.icon}"></i> ${item.label}
            </a>
        `).join('');
    }

    getContentArea() {
        return this.contentArea || document.getElementById('ultimate-content-area');
    }

    setLoading(isLoading) {
        const loader = this.appContainer.querySelector('.ultimate-loading-overlay'); // Assuming a global loader
        if (isLoading) {
            if (!loader) {
                const newLoader = document.createElement('div');
                newLoader.className = 'ultimate-loading-overlay';
                newLoader.innerHTML = '<div class="ultimate-spinner"></div>';
                this.appContainer.appendChild(newLoader);
            } else {
                loader.style.display = 'flex';
            }
        } else if (loader) {
            loader.style.display = 'none';
        }
        // For content area specific loading:
        if (this.contentArea) {
             this.contentArea.classList.toggle('loading-state', isLoading);
        }
    }

    isContentLoaded() {
        return this.contentArea && this.contentArea.innerHTML.trim() !== '';
    }

    showError(message, onContentArea = false) {
        const targetElement = onContentArea && this.contentArea ? this.contentArea : this.appContainer;
        targetElement.innerHTML = `<div class="ultimate-error-message">${message}</div>`;
    }

    updateViewTitle(title) {
        const titleEl = document.getElementById('ultimate-view-title');
        if (titleEl) titleEl.textContent = title;
    }
}

/**
 * Enhanced Platform Integration
 * Ensures all components work seamlessly with complete vendor data
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Initializing enhanced platform integration...');
    
    // Wait for all components
    let checkInterval = setInterval(() => {
        if (window.ultimateExecutiveView && 
            window.completeVendorData && 
            window.ultimateChartSystem &&
            window.comprehensiveIndustries &&
            window.comprehensiveCompliance) {
            
            clearInterval(checkInterval);
            initializeEnhancedPlatform();
        }
    }, 100);
});

function initializeEnhancedPlatform() {
    console.log('🚀 Starting enhanced platform initialization...');
    
    // Update vendor data in Ultimate Executive View
    if (window.ultimateExecutiveView && window.completeVendorData) {
        window.ultimateExecutiveView.vendorData = window.completeVendorData;
        console.log(`✅ Updated Ultimate Executive View with ${Object.keys(window.completeVendorData).length} vendors`);
    }
    
    // Enhance chart rendering
    enhanceChartRendering();
    
    // Add advanced analytics
    addAdvancedAnalytics();
    
    // Enhance export capabilities
    enhanceExportCapabilities();
    
    console.log('✅ Enhanced platform initialization complete');
}

function enhanceChartRendering() {
    const originalCreateCharts = window.ultimateExecutiveView.createFinancialCharts;
    
    window.ultimateExecutiveView.createFinancialCharts = function() {
        console.log('📊 Creating enhanced financial charts...');
        
        const container = document.getElementById('financial-content');
        if (!container) return;
        
        // Add executive dashboard
        const dashboardDiv = document.createElement('div');
        dashboardDiv.id = 'executive-dashboard';
        dashboardDiv.className = 'chart-container full-width';
        container.insertBefore(dashboardDiv, container.firstChild);
        
        // Calculate metrics
        const vendorData = this.vendorData;
        const portnox = vendorData.portnox;
        const competitors = Object.values(vendorData).filter(v => v.id !== 'portnox');
        const avgCompetitorTCO = competitors.reduce((sum, v) => sum + v.costs.tco3Year, 0) / competitors.length;
        
        const dashboardData = {
            totalSavings: avgCompetitorTCO - portnox.costs.tco3Year,
            savingsPercent: Math.round(((avgCompetitorTCO - portnox.costs.tco3Year) / avgCompetitorTCO) * 100),
            portnoxDeploymentDays: portnox.metrics.deploymentDays,
            avgCompetitorDays: Math.round(competitors.reduce((sum, v) => sum + v.metrics.deploymentDays, 0) / competitors.length),
            deploymentAdvantage: 76,
            portnoxSecurityScore: portnox.metrics.securityScore,
            securityAdvantage: 20,
            roi: portnox.metrics.roi3Year,
            paybackMonths: portnox.metrics.paybackMonths
        };
        
        // Create executive dashboard
        window.ultimateChartSystem.createExecutiveDashboard(dashboardDiv, dashboardData);
        
        // Add enhanced charts
        const chartContainers = [
            { id: 'tco-waterfall', title: 'TCO Savings Analysis', type: 'waterfall' },
            { id: 'positioning-matrix', title: 'Market Positioning', type: 'matrix' },
            { id: 'roi-timeline', title: 'ROI Comparison', type: 'timeline' },
            { id: 'decision-matrix', title: 'Executive Decision Matrix', type: 'decision' }
        ];
        
        chartContainers.forEach(({ id, title, type }) => {
            const chartDiv = document.createElement('div');
            chartDiv.className = 'chart-container';
            chartDiv.innerHTML = `
                <h3>${title}</h3>
                <div id="${id}" style="height: 400px;"></div>
            `;
            container.appendChild(chartDiv);
        });
        
        // Render charts
        setTimeout(() => {
            window.ultimateChartSystem.createTCOWaterfallChart('tco-waterfall', vendorData);
            window.ultimateChartSystem.createPositioningMatrix('positioning-matrix', vendorData);
            window.ultimateChartSystem.createROITimeline('roi-timeline', vendorData);
            
            // Create decision matrix
            const analysis = {
                totalSavings: dashboardData.totalSavings,
                savingsPercent: dashboardData.savingsPercent,
                monthlyOpexReduction: Math.round(dashboardData.totalSavings / 36),
                paybackMonths: portnox.metrics.paybackMonths,
                riskReduction: 30,
                complianceAutomation: 92,
                securityImprovement: dashboardData.securityAdvantage,
                fteReduction: 1.75,
                automationLevel: 96,
                annualHoursSaved: 3500,
                cloudReadiness: 100,
                futureProofScore: 9.5,
                innovationIndex: 'Industry Leading',
                deploymentAdvantage: dashboardData.deploymentAdvantage,
                recommendedDeploymentMonths: 3
            };
            
            window.ultimateChartSystem.createDecisionMatrix('decision-matrix', analysis);
        }, 100);
    };
    
    // Enhance security charts
    const originalSecurityCharts = window.ultimateExecutiveView.createSecurityCharts;
    
    window.ultimateExecutiveView.createSecurityCharts = function() {
        console.log('🔒 Creating enhanced security charts...');
        
        const container = document.getElementById('security-content');
        if (!container) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        // Add security charts
        const chartContainers = [
            { id: 'security-radar', title: 'Security Capabilities Analysis' },
            { id: 'compliance-heatmap', title: 'Compliance Coverage Matrix' }
        ];
        
        chartContainers.forEach(({ id, title }) => {
            const chartDiv = document.createElement('div');
            chartDiv.className = 'chart-container';
            chartDiv.innerHTML = `
                <h3>${title}</h3>
                <div id="${id}"></div>
            `;
            container.appendChild(chartDiv);
        });
        
        // Render charts
        setTimeout(() => {
            window.ultimateChartSystem.createSecurityRadar('security-radar', this.vendorData);
            window.ultimateChartSystem.createComplianceHeatmap('compliance-heatmap', this.vendorData);
        }, 100);
    };
}

function addAdvancedAnalytics() {
    console.log('📈 Adding advanced analytics capabilities...');
    
    // Add analytics methods to Ultimate Executive View
    window.ultimateExecutiveView.generateAdvancedAnalytics = function() {
        const vendorData = this.vendorData;
        const config = this.config;
        
        // Industry-specific analysis
        const industryData = window.comprehensiveIndustries[config.industry];
        const industryMultiplier = industryData?.riskMultiplier || 1.0;
        
        // Calculate industry-adjusted metrics
        const adjustedMetrics = {
            breachRisk: config.breachCost * industryMultiplier,
            complianceRequirements: industryData?.regulatoryRequirements || [],
            avgDeviceCost: industryData?.averageDeviceCost || 65
        };
        
        return adjustedMetrics;
    };
}

function enhanceExportCapabilities() {
    console.log('📤 Enhancing export capabilities...');
    
    if (window.advancedExportSystem) {
        // Add method to export complete analysis
        window.advancedExportSystem.exportCompleteAnalysis = function() {
            const data = {
                vendorData: window.completeVendorData,
                configuration: window.ultimateExecutiveView.config,
                selectedVendors: window.ultimateExecutiveView.selectedVendors,
                industryData: window.comprehensiveIndustries,
                complianceData: window.comprehensiveCompliance
            };
            
            // Generate comprehensive report
            this.generateExecutivePresentation(data);
        };
    }
}

console.log('✅ Enhanced platform integration loaded');

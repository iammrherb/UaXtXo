/**
 * Reports Generator
 * Generates and exports analysis reports
 */

const ReportsController = (function() {
    
    function generateReport(data) {
        const report = {
            metadata: {
                generatedAt: new Date().toISOString(),
                version: '1.0',
                type: 'TCO Analysis Report'
            },
            executiveSummary: generateExecutiveSummary(data),
            financialAnalysis: generateFinancialAnalysis(data),
            technicalAssessment: generateTechnicalAssessment(data),
            riskAnalysis: generateRiskAnalysis(data),
            recommendations: generateRecommendations(data),
            appendices: generateAppendices(data)
        };
        
        return report;
    }
    
    function generateExecutiveSummary(data) {
        const summary = {
            overview: 'Total Cost of Ownership Analysis for Network Access Control Solutions',
            keyFindings: [],
            recommendations: [],
            conclusion: ''
        };
        
        // Calculate key metrics
        const primaryVendor = data.wizardState.selectedVendors[0];
        if (primaryVendor && primaryVendor !== 'portnox') {
            const savings = data.tcoResults.savings[primaryVendor];
            const roi = data.roiResults[primaryVendor];
            
            summary.keyFindings.push({
                metric: 'Total Cost Savings',
                value: `${(savings.totalSavings / 1000000).toFixed(2)}M`,
                description: `${savings.savingsPercentage.toFixed(0)}% reduction over ${data.wizardState.costConfig.yearsToProject} years`
            });
            
            summary.keyFindings.push({
                metric: 'Return on Investment',
                value: `${roi.roi.toFixed(0)}%`,
                description: `Payback period of ${roi.paybackPeriod.toFixed(0)} months`
            });
        }
        
        // Add recommendations
        summary.recommendations.push('Implement Portnox Cloud for significant cost savings and operational efficiency');
        summary.recommendations.push('Leverage cloud-native architecture for improved scalability and reduced maintenance');
        
        return summary;
    }
    
    function generateFinancialAnalysis(data) {
        return {
            tcoComparison: data.tcoResults,
            roiAnalysis: data.roiResults,
            sensitivityAnalysis: data.sensitivityResults,
            costBreakdown: generateCostBreakdown(data)
        };
    }
    
    function generateTechnicalAssessment(data) {
        const assessment = {
            vendorCapabilities: {},
            deploymentComparison: {},
            scalabilityAnalysis: {},
            integrationAssessment: {}
        };
        
        // Compare vendor capabilities
        Object.values(data.tcoResults.vendors).forEach(vendor => {
            assessment.vendorCapabilities[vendor.vendorId] = {
                name: vendor.vendorName,
                metrics: vendor.metrics,
                strengths: [],
                weaknesses: []
            };
        });
        
        return assessment;
    }
    
    function generateRiskAnalysis(data) {
        return {
            riskComparison: data.riskResults,
            complianceAssessment: generateComplianceAssessment(data),
            securityPosture: generateSecurityPosture(data)
        };
    }
    
    function generateRecommendations(data) {
        const recommendations = [];
        
        // Strategic recommendations
        recommendations.push({
            category: 'Strategic',
            priority: 'High',
            recommendation: 'Migrate to cloud-native NAC solution',
            justification: 'Significant cost savings and improved operational efficiency',
            impact: 'High'
        });
        
        // Tactical recommendations
        recommendations.push({
            category: 'Tactical',
            priority: 'Medium',
            recommendation: 'Implement phased migration approach',
            justification: 'Minimize disruption while ensuring successful deployment',
            impact: 'Medium'
        });
        
        return recommendations;
    }
    
    function generateAppendices(data) {
        return {
            methodology: 'TCO calculation methodology and assumptions',
            dataSheets: 'Vendor technical specifications',
            references: 'Industry benchmarks and research sources'
        };
    }
    
    function generateCostBreakdown(data) {
        const breakdown = {};
        
        Object.values(data.tcoResults.vendors).forEach(vendor => {
            breakdown[vendor.vendorId] = {
                name: vendor.vendorName,
                initialCosts: vendor.initialCosts,
                annualCosts: vendor.annualCosts,
                totalTCO: vendor.totalTCO
            };
        });
        
        return breakdown;
    }
    
    function generateComplianceAssessment(data) {
        const frameworks = [...data.wizardState.complianceFrameworks, ...data.wizardState.customCompliance];
        return {
            requiredFrameworks: frameworks,
            vendorCompliance: {},
            gaps: []
        };
    }
    
    function generateSecurityPosture(data) {
        return {
            currentState: 'Based on selected vendors',
            proposedState: 'With Portnox Cloud implementation',
            improvements: []
        };
    }
    
    function exportToPDF(report) {
        // Implementation would use jsPDF or similar library
        console.log('PDF export functionality to be implemented');
    }
    
    function exportToExcel(report) {
        // Implementation would use SheetJS or similar library
        console.log('Excel export functionality to be implemented');
    }
    
    function exportToJSON(report) {
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'tco-analysis-report.json';
        link.href = url;
        link.click();
    }
    
    // Public API
    return {
        generateReport,
        exportToPDF,
        exportToExcel,
        exportToJSON
    };
})();

// Export for use in other modules
window.ReportsController = ReportsController;

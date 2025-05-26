/**
 * Data Export Module
 * Handles all export functionality with multiple formats
 */

class DataExportModule {
    constructor(platform) {
        this.platform = platform;
    }
    
    // Export to Excel format
    exportToExcel() {
        console.log('📊 Exporting to Excel...');
        
        // Create workbook data structure
        const workbook = {
            'Executive Summary': this.getExecutiveSummaryData(),
            'Vendor Comparison': this.getVendorComparisonData(),
            'Financial Analysis': this.getFinancialAnalysisData(),
            'Security Assessment': this.getSecurityAssessmentData(),
            'Compliance Coverage': this.getComplianceCoverageData(),
            'Feature Matrix': this.getFeatureMatrixData(),
            'Implementation Plan': this.getImplementationPlanData()
        };
        
        // Convert to CSV for now (would use SheetJS in production)
        this.downloadAsCSV(workbook);
    }
    
    // Export to PDF format
    exportToPDF() {
        console.log('📄 Exporting to PDF...');
        
        // Generate PDF content
        const pdfContent = {
            title: 'Zero Trust NAC Executive Analysis Report',
            date: new Date().toLocaleDateString(),
            organization: {
                industry: this.platform.industryData[this.platform.config.industry].name,
                size: this.platform.config.deviceCount + ' devices',
                analysisPeriod: this.platform.config.analysisPeriod + ' years'
            },
            executiveSummary: this.generateExecutiveSummary(),
            vendorAnalysis: this.generateVendorAnalysis(),
            recommendations: this.generateRecommendations()
        };
        
        // For demo, create HTML and open in new window
        this.openPDFPreview(pdfContent);
    }
    
    // Export to PowerPoint format
    exportToPowerPoint() {
        console.log('📊 Exporting to PowerPoint...');
        
        const slides = [
            this.createTitleSlide(),
            this.createExecutiveSummarySlide(),
            this.createVendorComparisonSlide(),
            this.createFinancialAnalysisSlide(),
            this.createSecurityAssessmentSlide(),
            this.createRecommendationsSlide(),
            this.createNextStepsSlide()
        ];
        
        // For demo, create HTML presentation
        this.openPresentationPreview(slides);
    }
    
    // Get executive summary data
    getExecutiveSummaryData() {
        const portnoxTCO = this.platform.calculateRealTimeTCO('portnox');
        const avgCompetitor = this.platform.calculateAverageCompetitorTCO();
        const portnoxROI = this.platform.calculateROI('portnox');
        
        return [
            ['Metric', 'Portnox', 'Industry Average', 'Savings/Benefit'],
            ['3-Year TCO', portnoxTCO.year3, avgCompetitor, avgCompetitor - portnoxTCO.year3],
            ['Monthly Cost/Device', portnoxTCO.perDevice * 12, 'Varies', 'Lowest'],
            ['ROI %', portnoxROI.roiPercentage + '%', 'N/A', 'Highest'],
            ['Deployment Time (Days)', this.platform.vendorData.portnox.metrics.deploymentTime, 60, 59],
            ['FTE Required', this.platform.vendorData.portnox.metrics.fteRequired, 1.5, 1.25],
            ['Security Score', this.platform.vendorData.portnox.security.zeroTrustScore, 70, 28]
        ];
    }
    
    // Get vendor comparison data
    getVendorComparisonData() {
        const headers = ['Vendor', 'Architecture', '3-Year TCO', 'Security Score', 'Deploy Time', 'FTE Required'];
        const data = [headers];
        
        this.platform.selectedVendors.forEach(vendorId => {
            const vendor = this.platform.vendorData[vendorId];
            const tco = this.platform.calculateRealTimeTCO(vendorId);
            
            data.push([
                vendor.name,
                vendor.architecture,
                '$' + (tco.year3 / 1000).toFixed(0) + 'K',
                vendor.security.zeroTrustScore + '%',
                vendor.metrics.deploymentTime + ' days',
                vendor.metrics.fteRequired
            ]);
        });
        
        return data;
    }
    
    // Helper methods for data formatting
    downloadAsCSV(workbook) {
        // For simplicity, export first sheet as CSV
        const firstSheet = Object.keys(workbook)[0];
        const data = workbook[firstSheet];
        
        let csv = data.map(row => row.join(',')).join('\n');
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `zero-trust-nac-analysis-${Date.now()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }
    
    openPDFPreview(content) {
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${content.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    h1 { color: #1a5a96; }
                    h2 { color: #2980b9; margin-top: 30px; }
                    .header { border-bottom: 2px solid #1a5a96; padding-bottom: 20px; }
                    .section { margin: 30px 0; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background: #f5f5f5; }
                    .highlight { background: #e8f4f8; padding: 15px; border-left: 4px solid #1a5a96; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>${content.title}</h1>
                    <p>Date: ${content.date}</p>
                    <p>Organization: ${content.organization.industry}, ${content.organization.size}</p>
                </div>
                ${content.executiveSummary}
                ${content.vendorAnalysis}
                ${content.recommendations}
            </body>
            </html>
        `;
        
        const win = window.open('', '_blank');
        win.document.write(html);
        win.document.close();
    }
}

// Create global instance
window.dataExport = null;

// Initialize when platform is ready
document.addEventListener('DOMContentLoaded', () => {
    const checkPlatform = setInterval(() => {
        if (window.zeroTrustExecutivePlatform && window.zeroTrustExecutivePlatform.initialized) {
            window.dataExport = new DataExportModule(window.zeroTrustExecutivePlatform);
            clearInterval(checkPlatform);
        }
    }, 100);
});

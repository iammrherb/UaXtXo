/**
 * Report Generator Module
 * Generates PDF and Excel reports with detailed TCO analysis
 */

class ReportGenerator {
    constructor() {
        this.calculator = window.advancedTcoCalculator || null;
        this.reportData = null;
        
        // Initialize after DOM is fully loaded
        document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
    
    initialize() {
        // Set up export handlers
        this.setupExportHandlers();
        
        console.log('Report Generator Module initialized');
    }
    
    setupExportHandlers() {
        // PDF export button
        const exportPdfBtn = document.getElementById('export-pdf');
        if (exportPdfBtn) {
            exportPdfBtn.addEventListener('click', () => {
                this.generateReport();
            });
        }
    }
    
    /**
     * Generate comprehensive report
     */
    generateReport() {
        // Show loading overlay
        this.showLoading();
        
        // Get current data
        const inputs = this.getCurrentInputs();
        const selectedVendors = inputs.vendors;
        
        // Create report data
        setTimeout(() => {
            if (this.calculator) {
                this.reportData = this.calculator.createComparativeAnalysis(selectedVendors, inputs);
                this.exportToPdf();
            } else {
                console.error('Advanced TCO calculator not found');
                this.hideLoading();
                
                // Fallback to simpler report
                this.generateSimpleReport();
            }
        }, 100);
    }
    
    /**
     * Generate simple report if advanced calculator is not available
     */
    generateSimpleReport() {
        // Get calculation results
        const results = window.calculationResults || calculateResults();
        
        // Generate PDF
        this.generateSimplePdf(results);
    }
    
    getCurrentInputs() {
        // Get current inputs from calculator state
        return {
            vendors: window.calculatorState.selectedVendors,
            industry: window.calculatorState.selectedIndustry,
            compliance: window.calculatorState.selectedCompliance,
            riskProfile: window.calculatorState.riskProfile,
            insuranceTier: window.calculatorState.insuranceTier,
            deviceCount: window.calculatorState.deviceCount,
            locations: window.calculatorState.locations,
            networkRequirements: window.calculatorState.networkRequirements,
            yearsToProject: window.calculatorState.yearsToProject,
            costParameters: Object.assign({}, window.calculatorState.costParameters)
        };
    }
    
    /**
     * Export report to PDF
     */
    exportToPdf() {
        if (!window.jspdf || !window.jspdf.jsPDF) {
            console.error('jsPDF library not found');
            this.loadJsPdf(() => this.exportToPdf());
            return;
        }
        
        // Create new PDF document
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Get report data
        const reportData = this.reportData;
        if (!reportData) {
            console.error('Report data not available');
            this.hideLoading();
            return;
        }
        
        // Document constants
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 15;
        const contentWidth = pageWidth - 2 * margin;
        
        // Set fonts
        doc.setFont('helvetica', 'normal');
        
        // Add cover page
        this.addCoverPage(doc, pageWidth, pageHeight, margin);
        
        // Add executive summary
        doc.addPage();
        this.addExecutiveSummary(doc, reportData, margin, contentWidth);
        
        // Add vendor comparison
        doc.addPage();
        this.addVendorComparison(doc, reportData, margin, contentWidth);
        
        // Add financial analysis
        doc.addPage();
        this.addFinancialAnalysis(doc, reportData, margin, contentWidth);
        
        // Add charts
        this.addCharts(doc, reportData, margin, contentWidth).then(() => {
            // Save the PDF
            doc.save('portnox-tco-analysis.pdf');
            
            // Hide loading overlay
            this.hideLoading();
        });
    }
    
    /**
     * Add cover page to PDF
     */
    addCoverPage(doc, pageWidth, pageHeight, margin) {
        // Add title
        doc.setFontSize(24);
        doc.setTextColor(0, 123, 255);
        doc.text('Zero Trust NAC', pageWidth / 2, 50, { align: 'center' });
        doc.text('Total Cost of Ownership Analysis', pageWidth / 2, 60, { align: 'center' });
        
        // Add subtitle
        doc.setFontSize(14);
        doc.setTextColor(100, 100, 100);
        const today = new Date();
        const dateString = today.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        doc.text(`Generated on ${dateString}`, pageWidth / 2, 70, { align: 'center' });
        
        // Add Portnox logo
        const img = new Image();
        img.src = 'img/vendors/portnox-logo.png';
        
        const logoWidth = 50;
        const logoHeight = logoWidth * (img.height / img.width);
        const logoX = (pageWidth - logoWidth) / 2;
        const logoY = 100;
        
        doc.addImage(img, 'PNG', logoX, logoY, logoWidth, logoHeight);
        
        // Add report parameters
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        const inputs = this.getCurrentInputs();
        const paramY = 160;
        const lineHeight = 7;
        
        doc.text('Report Parameters:', margin, paramY);
        doc.text(`Device Count: ${inputs.deviceCount.toLocaleString()}`, margin, paramY + lineHeight);
        doc.text(`Number of Locations: ${inputs.locations}`, margin, paramY + 2 * lineHeight);
        
        // Industry
        let industryName = 'Not specified';
        if (inputs.industry && window.INDUSTRY_COMPLIANCE && window.INDUSTRY_COMPLIANCE[inputs.industry]) {
            industryName = window.INDUSTRY_COMPLIANCE[inputs.industry].name;
        }
        doc.text(`Industry: ${industryName}`, margin, paramY + 3 * lineHeight);
        
        // Risk profile
        let riskName = 'Standard';
        if (inputs.riskProfile && window.RISK_PROFILES && window.RISK_PROFILES[inputs.riskProfile]) {
            riskName = window.RISK_PROFILES[inputs.riskProfile].name;
        }
        doc.text(`Risk Profile: ${riskName}`, margin, paramY + 4 * lineHeight);
        
        // Analysis period
        doc.text(`Analysis Period: ${inputs.yearsToProject} years`, margin, paramY + 5 * lineHeight);
        
        // Add footer
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Confidential & Proprietary', pageWidth / 2, pageHeight - 20, { align: 'center' });
        doc.text('© Portnox', pageWidth / 2, pageHeight - 15, { align: 'center' });
    }
    
    /**
     * Add executive summary to PDF
     */
    addExecutiveSummary(doc, reportData, margin, contentWidth) {
        // Add title
        doc.setFontSize(18);
        doc.setTextColor(0, 123, 255);
        doc.text('Executive Summary', margin, margin + 5);
        
        // Add horizontal rule
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, margin + 8, margin + contentWidth, margin + 8);
        
        // Set text style
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        // Calculate TCO findings
        const portnoxData = reportData.vendors.portnox;
        if (!portnoxData) {
            doc.text('No data available for Portnox', margin, margin + 20);
            return;
        }
        
        // Find comparison vendor (ideally Cisco, otherwise most expensive)
        let comparisonVendor = reportData.vendors.cisco;
        let comparisonVendorName = 'Cisco ISE';
        
        if (!comparisonVendor) {
            // Find most expensive alternative
            let highestTco = 0;
            
            Object.keys(reportData.vendors).forEach(vendorId => {
                if (vendorId !== 'portnox' && reportData.vendors[vendorId].costs.total > highestTco) {
                    highestTco = reportData.vendors[vendorId].costs.total;
                    comparisonVendor = reportData.vendors[vendorId];
                    comparisonVendorName = comparisonVendor.vendor.name;
                }
            });
        }
        
        // Calculate savings
        let savingsValue = 0;
        let savingsPercent = 0;
        
        if (comparisonVendor) {
            savingsValue = comparisonVendor.costs.total - portnoxData.costs.total;
            savingsPercent = (savingsValue / comparisonVendor.costs.total) * 100;
        }
        
        // Add summary text
        let y = margin + 20;
        const lineHeight = 6;
        
        doc.setFontSize(12);
        doc.text('Key Findings:', margin, y);
        y += lineHeight * 1.5;
        
        // TCO Savings
        doc.setFont('helvetica', 'bold');
        doc.text(`• Portnox Cloud offers a ${Math.round(savingsPercent)}% reduction in TCO compared to ${comparisonVendorName}`, 
            margin, y);
        doc.setFont('helvetica', 'normal');
        y += lineHeight * 1.5;
        
        doc.text(`• Total 3-year savings of $${this.formatNumber(savingsValue)}`, margin, y);
        y += lineHeight * 1.5;
        
        // Implementation benefits
        doc.setFont('helvetica', 'bold');
        doc.text('• 75% faster implementation time than on-premises alternatives', margin, y);
        doc.setFont('helvetica', 'normal');
        y += lineHeight * 1.5;
        
        doc.text('• No hardware requirements, reducing both capital expenses and ongoing maintenance', margin, y);
        y += lineHeight * 1.5;
        
        // Operational benefits
        doc.setFont('helvetica', 'bold');
        doc.text(`• FTE resource requirement reduced by ${Math.round(100 - (0.25/1.5*100))}% compared to legacy solutions`, 
            margin, y);
        doc.setFont('helvetica', 'normal');
        y += lineHeight * 1.5;
        
        doc.text(`• Return on Investment (ROI) of ${Math.round(portnoxData.roi.percentage)}% over 3 years`, margin, y);
        y += lineHeight * 1.5;
        
        doc.text(`• Payback period of ${portnoxData.roi.paybackPeriod} months`, margin, y);
        y += lineHeight * 1.5;
        
        // Security benefits
        doc.setFont('helvetica', 'bold');
        doc.text(`• Security risk reduction of ${portnoxData.vendor.security.riskReduction}% with comprehensive zero trust architecture`, 
            margin, y);
        doc.setFont('helvetica', 'normal');
        y += lineHeight * 1.5;
        
        doc.text(`• Potential cyber insurance premium reduction of ${portnoxData.vendor.security.insuranceImpact}%`, margin, y);
        y += lineHeight * 1.5;
        
        // Add conclusion
        y += lineHeight;
        doc.text('Conclusion:', margin, y);
        y += lineHeight * 1.5;
        
        doc.text('Portnox Cloud provides the most cost-effective NAC solution with significant advantages in', margin, y);
        y += lineHeight;
        doc.text('implementation speed, operational efficiency, and total cost of ownership, while delivering', margin, y);
        y += lineHeight;
        doc.text('comprehensive zero trust security capabilities for your organization.', margin, y);
    }
    
    /**
     * Add vendor comparison to PDF
     */
    addVendorComparison(doc, reportData, margin, contentWidth) {
        // Add title
        doc.setFontSize(18);
        doc.setTextColor(0, 123, 255);
        doc.text('Vendor Comparison', margin, margin + 5);
        
        // Add horizontal rule
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, margin + 8, margin + contentWidth, margin + 8);
        
        // Set text style
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        
        // Table layout constants
        const startY = margin + 15;
        const rowHeight = 7;
        const colWidths = [45, 30, 30, 30, 30];
        
        // Column headers
        doc.setFont('helvetica', 'bold');
        doc.text('Vendor', margin, startY);
        doc.text('Total TCO', margin + colWidths[0], startY);
        doc.text('Imp. Time', margin + colWidths[0] + colWidths[1], startY);
        doc.text('ROI', margin + colWidths[0] + colWidths[1] + colWidths[2], startY);
        doc.text('Risk Reduction', margin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], startY);
        
        // Add horizontal rule below headers
        doc.line(margin, startY + 2, margin + contentWidth, startY + 2);
        
        // Get vendors
        const vendorIds = Object.keys(reportData.vendors);
        
        // Data rows
        doc.setFont('helvetica', 'normal');
        let y = startY + rowHeight;
        
        vendorIds.forEach(vendorId => {
            const vendorData = reportData.vendors[vendorId];
            
            // Skip if no data
            if (!vendorData) return;
            
            // Add row
            doc.text(vendorData.vendor.name, margin, y);
            doc.text(`$${this.formatNumber(vendorData.costs.total)}`, margin + colWidths[0], y);
            
            // Implementation time
            let implTime = 'N/A';
            if (vendorData.vendor.implementation && vendorData.vendor.implementation.time) {
                implTime = vendorData.vendor.implementation.time;
            }
            doc.text(implTime, margin + colWidths[0] + colWidths[1], y);
            
            // ROI
            doc.text(`${Math.round(vendorData.roi.percentage)}%`, 
                     margin + colWidths[0] + colWidths[1] + colWidths[2], y);
            
            // Risk reduction
            doc.text(`${vendorData.vendor.security.riskReduction}%`, 
                     margin + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3], y);
            
            y += rowHeight;
        });
        
        // Add feature comparison table
        y += rowHeight * 2;
        
        // Table title
        doc.setFontSize(14);
        doc.setTextColor(0, 123, 255);
        doc.text('Key Capability Comparison', margin, y);
        y += rowHeight;
        
        // Reset text style
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        
        // Define feature list to display
        const features = [
            { id: 'zeroTrust', name: 'Zero Trust Implementation' },
            { id: 'cloudNative', name: 'Cloud Native Architecture' },
            { id: 'deploymentSpeed', name: 'Deployment Speed' },
            { id: 'remoteAccess', name: 'Remote Access Support' },
            { id: 'iotSupport', name: 'IoT Device Support' },
            { id: 'multiVendor', name: 'Multi-Vendor Support' },
            { id: 'automation', name: 'Automation Capabilities' }
        ];
        
        // Column headers
        doc.setFont('helvetica', 'bold');
        doc.text('Capability', margin, y);
        
        // Only include up to 4 vendors to fit on page
        const displayVendorIds = vendorIds.slice(0, 4);
        
        // Adjust column widths
        const featureColWidth = 60;
        const vendorColWidth = (contentWidth - featureColWidth) / displayVendorIds.length;
        
        displayVendorIds.forEach((vendorId, index) => {
            const vendorData = reportData.vendors[vendorId];
            
            if (vendorData) {
                doc.text(vendorData.vendor.name, 
                         margin + featureColWidth + (index * vendorColWidth), y);
            }
        });
        
        // Add horizontal rule below headers
        doc.line(margin, y + 2, margin + contentWidth, y + 2);
        
        // Feature rows
        doc.setFont('helvetica', 'normal');
        y += rowHeight;
        
        features.forEach(feature => {
            doc.text(feature.name, margin, y);
            
            displayVendorIds.forEach((vendorId, index) => {
                const vendorData = reportData.vendors[vendorId];
                
                if (vendorData && vendorData.vendor.features) {
                    const score = vendorData.vendor.features[feature.id] || 0;
                    const ratingText = this.getRatingText(score);
                    
                    doc.text(ratingText, 
                             margin + featureColWidth + (index * vendorColWidth), y);
                }
            });
            
            y += rowHeight;
        });
    }
    
    /**
     * Add financial analysis to PDF
     */
    addFinancialAnalysis(doc, reportData, margin, contentWidth) {
        // Add title
        doc.setFontSize(18);
        doc.setTextColor(0, 123, 255);
        doc.text('Financial Analysis', margin, margin + 5);
        
        // Add horizontal rule
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, margin + 8, margin + contentWidth, margin + 8);
        
        // Set text style
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        
        // Add TCO breakdown table
        let y = margin + 15;
        
        // Section title
        doc.setFontSize(14);
        doc.text('TCO Breakdown', margin, y);
        y += 7;
        
        // Reset text style
        doc.setFontSize(10);
        
        // Table layout
        const rowHeight = 6;
        const colWidths = [45, 30, 30, 30, 30];
        
        // Column headers
        doc.setFont('helvetica', 'bold');
        doc.text('Cost Category', margin, y);
        
        // Only show up to 4 vendors
        const displayVendorIds = Object.keys(reportData.vendors).slice(0, 4);
        
        displayVendorIds.forEach((vendorId, index) => {
            const vendorData = reportData.vendors[vendorId];
            
            if (vendorData) {
                doc.text(vendorData.vendor.name, 
                         margin + colWidths[0] + (index * colWidths[1]), y);
            }
        });
        
        // Add horizontal rule below headers
        doc.line(margin, y + 2, margin + contentWidth, y + 2);
        
        // Cost categories
        const costCategories = [
            { id: 'subscription', name: 'Subscription' },
            { id: 'implementation', name: 'Implementation' },
            { id: 'hardware', name: 'Hardware' },
            { id: 'maintenance', name: 'Maintenance' },
            { id: 'operational', name: 'Operational' },
            { id: 'total', name: 'Total TCO' }
        ];
        
        // Data rows
        doc.setFont('helvetica', 'normal');
        y += rowHeight;
        
        costCategories.forEach(category => {
            // Bold the total row
            if (category.id === 'total') {
                doc.setFont('helvetica', 'bold');
            }
            
            doc.text(category.name, margin, y);
            
            displayVendorIds.forEach((vendorId, index) => {
                const vendorData = reportData.vendors[vendorId];
                
                if (vendorData) {
                    const value = vendorData.costs[category.id];
                    doc.text(`$${this.formatNumber(value)}`, 
                             margin + colWidths[0] + (index * colWidths[1]), y);
                }
            });
            
            y += rowHeight;
            
            // Reset to normal font
            doc.setFont('helvetica', 'normal');
        });
        
        // Add ROI breakdown
        y += rowHeight * 2;
        
        // Section title
        doc.setFontSize(14);
        doc.text('ROI Analysis - Portnox Cloud', margin, y);
        y += 7;
        
        // Reset text style
        doc.setFontSize(10);
        
        // Get Portnox data
        const portnoxData = reportData.vendors.portnox;
        if (!portnoxData) {
            doc.text('No data available for Portnox', margin, y);
            return;
        }
        
        // ROI metrics
        const roiMetrics = [
            { name: 'ROI Percentage', value: `${Math.round(portnoxData.roi.percentage)}%` },
            { name: 'Payback Period', value: `${portnoxData.roi.paybackPeriod} months` },
            { name: 'Annual Cost Savings', 
              value: `$${this.formatNumber(portnoxData.businessValue.total / portnoxData.vendor.costModel.yearsToProject || 3)}` },
            { name: 'Total Business Value', value: `$${this.formatNumber(portnoxData.businessValue.total)}` }
        ];
        
        // Add ROI metrics
        doc.setFont('helvetica', 'bold');
        doc.text('Metric', margin, y);
        doc.text('Value', margin + 60, y);
        
        // Add horizontal rule below headers
        doc.line(margin, y + 2, margin + 60 + 30, y + 2);
        
        // Data rows
        doc.setFont('helvetica', 'normal');
        y += rowHeight;
        
        roiMetrics.forEach(metric => {
            doc.text(metric.name, margin, y);
            doc.text(metric.value, margin + 60, y);
            y += rowHeight;
        });
        
        // Add business value breakdown
        y += rowHeight;
        
        // Section title
        doc.text('Business Value Breakdown', margin, y);
        y += rowHeight;
        
        // Value categories
        const valueCategories = [
            { id: 'riskMitigation', name: 'Risk Mitigation Value' },
            { id: 'complianceAutomation', name: 'Compliance Automation' },
            { id: 'insurancePremium', name: 'Insurance Premium Reduction' },
            { id: 'productivityGain', name: 'Productivity Gain' },
            { id: 'total', name: 'Total Business Value' }
        ];
        
        // Column headers
        doc.setFont('helvetica', 'bold');
        doc.text('Value Category', margin, y);
        doc.text('Amount', margin + 60, y);
        
        // Add horizontal rule below headers
        doc.line(margin, y + 2, margin + 60 + 30, y + 2);
        
        // Data rows
        doc.setFont('helvetica', 'normal');
        y += rowHeight;
        
        valueCategories.forEach(category => {
            // Bold the total row
            if (category.id === 'total') {
                doc.setFont('helvetica', 'bold');
                doc.text(category.name, margin, y);
                doc.text(`$${this.formatNumber(portnoxData.businessValue.total)}`, margin + 60, y);
            } else {
                doc.text(category.name, margin, y);
                doc.text(`$${this.formatNumber(portnoxData.businessValue[category.id] || 0)}`, margin + 60, y);
            }
            
            y += rowHeight;
            
            // Reset to normal font
            doc.setFont('helvetica', 'normal');
        });
    }
    
    /**
     * Add charts to PDF
     */
    async addCharts(doc, reportData, margin, contentWidth) {
        return new Promise(async (resolve) => {
            try {
                // Add title
                doc.addPage();
                doc.setFontSize(18);
                doc.setTextColor(0, 123, 255);
                doc.text('Key Charts & Visualizations', margin, margin + 5);
                
                // Add horizontal rule
                doc.setDrawColor(200, 200, 200);
                doc.line(margin, margin + 8, margin + contentWidth, margin + 8);
                
                // Set text style
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0);
                
                // Add TCO comparison chart
                let y = margin + 15;
                doc.text('3-Year TCO Comparison', margin, y);
                y += 5;
                
                // Get TCO chart canvas
                const tcoChart = document.getElementById('tco-comparison-chart');
                if (tcoChart) {
                    const tcoChartImg = await this.canvasToDataUrl(tcoChart);
                    doc.addImage(tcoChartImg, 'PNG', margin, y, contentWidth, 70);
                    y += 80;
                }
                
                // Add cumulative cost chart
                doc.text('Cumulative Cost Comparison', margin, y);
                y += 5;
                
                // Get cumulative cost chart canvas
                const cumulativeChart = document.getElementById('cumulative-cost-chart');
                if (cumulativeChart) {
                    const cumulativeChartImg = await this.canvasToDataUrl(cumulativeChart);
                    doc.addImage(cumulativeChartImg, 'PNG', margin, y, contentWidth, 70);
                    y += 80;
                }
                
                // Add vendor radar chart
                doc.text('Solution Capabilities Comparison', margin, y);
                y += 5;
                
                // Get vendor radar chart canvas
                const radarChart = document.getElementById('vendor-radar-chart');
                if (radarChart) {
                    const radarChartImg = await this.canvasToDataUrl(radarChart);
                    doc.addImage(radarChartImg, 'PNG', margin, y, contentWidth, 70);
                }
                
                // Add risk comparison chart on new page
                doc.addPage();
                y = margin + 15;
                
                doc.text('Security & Risk Comparison', margin, y);
                y += 5;
                
                // Get risk comparison chart canvas
                const riskChart = document.getElementById('risk-comparison-chart');
                if (riskChart) {
                    const riskChartImg = await this.canvasToDataUrl(riskChart);
                    doc.addImage(riskChartImg, 'PNG', margin, y, contentWidth, 70);
                    y += 80;
                }
                
                // Add breach impact chart
                doc.text('Breach Impact Analysis', margin, y);
                y += 5;
                
                // Get breach impact chart canvas
                const breachChart = document.getElementById('breach-impact-chart');
                if (breachChart) {
                    const breachChartImg = await this.canvasToDataUrl(breachChart);
                    doc.addImage(breachChartImg, 'PNG', margin, y, contentWidth, 70);
                }
                
                resolve();
            } catch (error) {
                console.error('Error adding charts:', error);
                resolve();
            }
        });
    }
    
    /**
     * Convert canvas to data URL
     */
    canvasToDataUrl(canvas) {
        return new Promise((resolve) => {
            try {
                // If HTML2Canvas is available, use it to get a better rendering
                if (window.html2canvas) {
                    window.html2canvas(canvas.parentNode).then(capturedCanvas => {
                        resolve(capturedCanvas.toDataURL('image/png'));
                    }).catch(() => {
                        // Fallback to basic canvas
                        resolve(canvas.toDataURL('image/png'));
                    });
                } else {
                    // Use basic canvas
                    resolve(canvas.toDataURL('image/png'));
                }
            } catch (error) {
                console.error('Error converting canvas to data URL:', error);
                resolve(null);
            }
        });
    }
    
    /**
     * Load jsPDF library if not already loaded
     */
    loadJsPdf(callback) {
        if (window.jspdf) {
            callback();
            return;
        }
        
        // Load jsPDF from CDN
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = callback;
        document.head.appendChild(script);
        
        // Load html2canvas for better chart capture
        const html2canvasScript = document.createElement('script');
        html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        document.head.appendChild(html2canvasScript);
    }
    
    /**
     * Generate simple PDF report
     */
    generateSimplePdf(results) {
        this.loadJsPdf(() => {
            // Create new PDF document
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            // Document constants
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 15;
            const contentWidth = pageWidth - 2 * margin;
            
            // Set fonts
            doc.setFont('helvetica', 'normal');
            
            // Add title
            doc.setFontSize(24);
            doc.setTextColor(0, 123, 255);
            doc.text('NAC TCO Analysis Report', pageWidth / 2, 30, { align: 'center' });
            
            // Add subtitle
            doc.setFontSize(14);
            doc.setTextColor(100, 100, 100);
            const today = new Date();
            const dateString = today.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            doc.text(`Generated on ${dateString}`, pageWidth / 2, 40, { align: 'center' });
            
            // Add summary data
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text('Executive Summary', margin, 60);
            
            doc.setFontSize(12);
            doc.text(`Total 3-Year Savings: $${results.summary.totalSavings.toLocaleString()}`, margin, 70);
            doc.text(`Savings: ${results.summary.savingsPercentage}% vs. ${results.summary.baselineVendor}`, margin, 77);
            doc.text(`Payback Period: ${results.summary.paybackPeriod} months`, margin, 84);
            doc.text(`Risk Reduction: ${results.summary.riskReduction}%`, margin, 91);
            
            // Add vendor comparison
            doc.text('Vendor Comparison', margin, 110);
            
            // Create table
            let y = 120;
            const rowHeight = 7;
            
            // Headers
            doc.setFont('helvetica', 'bold');
            doc.text('Vendor', margin, y);
            doc.text('3-Year TCO', margin + 50, y);
            doc.text('ROI', margin + 100, y);
            
            // Draw header line
            doc.line(margin, y + 2, margin + contentWidth, y + 2);
            y += rowHeight;
            
            // Data rows
            doc.setFont('helvetica', 'normal');
            
            Object.keys(results.vendors).forEach(vendorId => {
                const vendor = results.vendors[vendorId];
                
                doc.text(vendor.name, margin, y);
                doc.text(`$${vendor.costs.total.toLocaleString()}`, margin + 50, y);
                doc.text(`${vendor.roi.threeYearRoi}%`, margin + 100, y);
                
                y += rowHeight;
            });
            
            // Add chart images if available
            this.addSimpleCharts(doc, margin, contentWidth).then(() => {
                // Save the PDF
                doc.save('portnox-tco-analysis.pdf');
                
                // Hide loading overlay
                this.hideLoading();
            });
        });
    }
    
    /**
     * Add charts to simple PDF
     */
    async addSimpleCharts(doc, margin, contentWidth) {
        return new Promise(async (resolve) => {
            try {
                // Add charts section
                doc.addPage();
                doc.setFontSize(14);
                doc.text('Key Visualizations', margin, margin + 10);
                
                // Add TCO comparison chart
                let y = margin + 20;
                doc.setFontSize(12);
                doc.text('3-Year TCO Comparison', margin, y);
                y += 5;
                
                // Get TCO chart canvas
                const tcoChart = document.getElementById('tco-comparison-chart');
                if (tcoChart) {
                    const tcoChartImg = await this.canvasToDataUrl(tcoChart);
                    doc.addImage(tcoChartImg, 'PNG', margin, y, contentWidth, 70);
                    y += 80;
                }
                
                // Add cumulative cost chart
                doc.text('Cumulative Cost Comparison', margin, y);
                y += 5;
                
                // Get cumulative cost chart canvas
                const cumulativeChart = document.getElementById('cumulative-cost-chart');
                if (cumulativeChart) {
                    const cumulativeChartImg = await this.canvasToDataUrl(cumulativeChart);
                    doc.addImage(cumulativeChartImg, 'PNG', margin, y, contentWidth, 70);
                }
                
                resolve();
            } catch (error) {
                console.error('Error adding charts to simple PDF:', error);
                resolve();
            }
        });
    }
    
    /**
     * Get rating text based on score
     */
    getRatingText(score) {
        if (score >= 90) return 'Excellent';
        if (score >= 80) return 'Very Good';
        if (score >= 70) return 'Good';
        if (score >= 60) return 'Adequate';
        if (score >= 40) return 'Fair';
        return 'Poor';
    }
    
    /**
     * Format number with commas
     */
    formatNumber(number) {
        return new Intl.NumberFormat('en-US').format(Math.round(number));
    }
    
    /**
     * Show loading overlay
     */
    showLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.add('active');
        }
    }
    
    /**
     * Hide loading overlay
     */
    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
}

// Initialize the component
window.reportGenerator = new ReportGenerator();

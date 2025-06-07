#!/bin/bash
# NAC Platform Enhancement - Part 5: Export Functionality
# enhance-platform-part5.sh

echo "📄 NAC Platform Enhancement - Part 5: Export Functionality"
echo "========================================================"

# Create PDF export module
cat > js/exports/pdf-generator.js << 'EOF'
/**
 * PDF Export Generator
 * Creates comprehensive executive reports
 */

class PDFGenerator {
    constructor(platform) {
        this.platform = platform;
        this.jsPDF = window.jspdf.jsPDF;
    }
    
    async generateExecutiveReport(options = {}) {
        const doc = new this.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Set document properties
        doc.setProperties({
            title: 'NAC Executive Decision Report',
            subject: 'Comprehensive TCO/ROI Analysis',
            author: 'NAC Decision Platform',
            keywords: 'NAC, Zero Trust, Compliance, ROI',
            creator: 'Portnox CLEAR'
        });
        
        // Add pages
        await this.addCoverPage(doc);
        await this.addExecutiveSummary(doc);
        await this.addFinancialAnalysis(doc);
        await this.addRiskAssessment(doc);
        await this.addComplianceAnalysis(doc);
        await this.addRecommendations(doc);
        await this.addAppendix(doc);
        
        // Save the PDF
        const filename = `NAC-Executive-Report-${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(filename);
        
        return filename;
    }
    
    async addCoverPage(doc) {
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        
        // Background gradient effect
        doc.setFillColor(10, 11, 14);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        
        // Add Portnox logo
        try {
            const logoImg = await this.loadImage('/img/vendors/portnox-logo.png');
            doc.addImage(logoImg, 'PNG', 20, 20, 50, 15);
        } catch (e) {
            // Fallback to text logo
            doc.setTextColor(0, 212, 170);
            doc.setFontSize(24);
            doc.text('PORTNOX', 20, 30);
        }
        
        // Title
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(32);
        doc.setFont('helvetica', 'bold');
        doc.text('Executive Decision Report', pageWidth / 2, 80, { align: 'center' });
        
        // Subtitle
        doc.setFontSize(18);
        doc.setFont('helvetica', 'normal');
        doc.text('Zero Trust NAC Investment Analysis', pageWidth / 2, 95, { align: 'center' });
        
        // Key metrics box
        doc.setDrawColor(0, 212, 170);
        doc.setLineWidth(1);
        doc.rect(30, 120, pageWidth - 60, 60, 'S');
        
        // Key findings
        doc.setFontSize(14);
        doc.setTextColor(0, 212, 170);
        doc.text('Key Findings:', 40, 135);
        
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        const findings = [
            `• Total Savings: $${this.formatNumber(this.platform.results.totalSavings)}`,
            `• ROI: ${this.platform.results.roi}%`,
            `• Risk Reduction: ${this.platform.results.riskReduction}%`,
            `• Payback Period: ${this.platform.results.paybackMonths} months`
        ];
        
        findings.forEach((finding, index) => {
            doc.text(finding, 40, 148 + (index * 8));
        });
        
        // Date and confidentiality
        doc.setFontSize(10);
        doc.setTextColor(166, 172, 187);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, pageHeight - 20);
        doc.text('CONFIDENTIAL', pageWidth - 40, pageHeight - 20);
        
        // Add new page
        doc.addPage();
    }
    
    async addExecutiveSummary(doc) {
        this.addHeader(doc, 'Executive Summary');
        
        let yPosition = 40;
        
        // Summary text
        doc.setFontSize(12);
        doc.setTextColor(60, 60, 60);
        const summaryText = this.wrapText(
            `Based on our comprehensive analysis of ${this.platform.config.organization.name}'s ` +
            `requirements across ${this.platform.config.devices.total} devices and ` +
            `${this.platform.config.organization.locations} locations, we recommend Portnox CLEAR ` +
            `as the optimal Zero Trust NAC solution. This recommendation will deliver ` +
            `$${this.formatNumber(this.platform.results.totalSavings)} in savings over 3 years ` +
            `with a ${this.platform.results.roi}% return on investment.`,
            160
        );
        
        summaryText.forEach(line => {
            doc.text(line, 20, yPosition);
            yPosition += 7;
        });
        
        yPosition += 10;
        
        // Key benefits table
        this.addSectionTitle(doc, 'Strategic Benefits', yPosition);
        yPosition += 15;
        
        const benefits = [
            ['Benefit', 'Impact', 'Timeline'],
            ['Cost Reduction', `$${this.formatNumber(this.platform.results.costSavings)}`, 'Immediate'],
            ['Risk Mitigation', `${this.platform.results.riskReduction}% lower breach risk`, '30 days'],
            ['Compliance', `${this.platform.results.complianceScore}% automated`, '14 days'],
            ['Operational Efficiency', `${this.platform.results.fteReduction} FTE reduction`, '60 days']
        ];
        
        this.addTable(doc, benefits, yPosition, {
            headerColor: [0, 212, 170],
            alternateRows: true
        });
        
        yPosition += benefits.length * 10 + 20;
        
        // Decision criteria
        this.addSectionTitle(doc, 'Decision Criteria', yPosition);
        yPosition += 15;
        
        const criteria = [
            'Cloud-native architecture eliminating infrastructure costs',
            'Deployment in hours versus months for legacy solutions',
            '95% automation reducing operational overhead by 75%',
            'Comprehensive compliance coverage across all frameworks',
            'Proven ROI with payback in under 12 months'
        ];
        
        criteria.forEach(criterion => {
            doc.setFontSize(11);
            doc.text(`• ${criterion}`, 25, yPosition);
            yPosition += 8;
        });
        
        doc.addPage();
    }
    
    async addFinancialAnalysis(doc) {
        this.addHeader(doc, 'Financial Analysis');
        
        let yPosition = 40;
        
        // TCO Comparison
        this.addSectionTitle(doc, '3-Year Total Cost of Ownership', yPosition);
        yPosition += 15;
        
        // Create TCO comparison chart
        const tcoData = this.platform.getVendorComparison();
        const chartCanvas = await this.createBarChart(tcoData, 'TCO Comparison');
        
        if (chartCanvas) {
            const chartImg = chartCanvas.toDataURL('image/png');
            doc.addImage(chartImg, 'PNG', 20, yPosition, 170, 80);
            yPosition += 90;
        }
        
        // Cost breakdown table
        this.addSectionTitle(doc, 'Detailed Cost Breakdown', yPosition);
        yPosition += 15;
        
        const costBreakdown = [
            ['Cost Category', 'Portnox', 'Cisco ISE', 'Aruba ClearPass'],
            ['Software License', '$126K', '$885K', '$585K'],
            ['Implementation', '$0', '$150K', '$105K'],
            ['Infrastructure', '$0', '$250K', '$160K'],
            ['Operations (FTE)', '$75K', '$750K', '$450K'],
            ['Hidden Costs', '$0', '$485K', '$365K'],
            ['Total 3-Year TCO', '$201K', '$2,520K', '$1,665K']
        ];
        
        this.addTable(doc, costBreakdown, yPosition, {
            headerColor: [0, 212, 170],
            highlightColumn: 1,
            columnWidths: [50, 40, 40, 40]
        });
        
        yPosition += costBreakdown.length * 10 + 20;
        
        // ROI Analysis
        this.addSectionTitle(doc, 'Return on Investment', yPosition);
        yPosition += 15;
        
        doc.setFontSize(11);
        doc.text(`Initial Investment: $${this.formatNumber(this.platform.results.initialInvestment)}`, 25, yPosition);
        yPosition += 8;
        doc.text(`Annual Savings: $${this.formatNumber(this.platform.results.annualSavings)}`, 25, yPosition);
        yPosition += 8;
        doc.text(`Payback Period: ${this.platform.results.paybackMonths} months`, 25, yPosition);
        yPosition += 8;
        doc.text(`3-Year Net Benefit: $${this.formatNumber(this.platform.results.netBenefit)}`, 25, yPosition);
        yPosition += 8;
        doc.text(`Internal Rate of Return: ${this.platform.results.irr}%`, 25, yPosition);
        
        doc.addPage();
    }
    
    async addRiskAssessment(doc) {
        this.addHeader(doc, 'Risk & Security Assessment');
        
        let yPosition = 40;
        
        // Risk reduction overview
        this.addSectionTitle(doc, 'Risk Mitigation Summary', yPosition);
        yPosition += 15;
        
        const riskSummary = [
            ['Risk Category', 'Current Exposure', 'With Portnox', 'Reduction'],
            ['Breach Probability', '23%', '3.5%', '85%'],
            ['Incident Frequency', '142/year', '14/year', '90%'],
            ['Mean Time to Detect', '207 days', '12 hours', '99.8%'],
            ['Compliance Violations', '12/year', '0.6/year', '95%'],
            ['Insurance Premium', '$250K', '$162K', '35%']
        ];
        
        this.addTable(doc, riskSummary, yPosition, {
            headerColor: [239, 68, 68],
            highlightColumn: 3
        });
        
        yPosition += riskSummary.length * 10 + 20;
        
        // Threat landscape
        this.addSectionTitle(doc, 'Industry Threat Landscape', yPosition);
        yPosition += 15;
        
        doc.setFontSize(11);
        doc.text(`Industry: ${this.platform.config.organization.industry}`, 25, yPosition);
        yPosition += 8;
        doc.text(`Average Breach Cost: $${this.formatNumber(this.platform.industryData.avgBreachCost)}`, 25, yPosition);
        yPosition += 8;
        doc.text(`Annual Incidents: ${this.platform.industryData.avgIncidents}`, 25, yPosition);
        yPosition += 15;
        
        // Top threats
        doc.setFont('helvetica', 'bold');
        doc.text('Top 5 Threat Vectors:', 25, yPosition);
        doc.setFont('helvetica', 'normal');
        yPosition += 10;
        
        const threats = this.platform.industryData.topThreats;
        threats.slice(0, 5).forEach((threat, index) => {
            doc.text(`${index + 1}. ${threat.name} - ${threat.probability}% probability`, 30, yPosition);
            yPosition += 8;
        });
        
        doc.addPage();
    }
    
    async addComplianceAnalysis(doc) {
        this.addHeader(doc, 'Compliance Analysis');
        
        let yPosition = 40;
        
        // Compliance overview
        this.addSectionTitle(doc, 'Regulatory Compliance Coverage', yPosition);
        yPosition += 15;
        
        // Compliance matrix
        const complianceMatrix = [
            ['Framework', 'Current', 'Portnox', 'Automation'],
            ['SOX', '72%', '98%', '95%'],
            ['HIPAA', '68%', '98%', '94%'],
            ['PCI-DSS', '75%', '97%', '93%'],
            ['GDPR', '70%', '99%', '96%'],
            ['ISO 27001', '65%', '98%', '92%']
        ];
        
        this.addTable(doc, complianceMatrix, yPosition, {
            headerColor: [59, 130, 246],
            alternateRows: true
        });
        
        yPosition += complianceMatrix.length * 10 + 20;
        
        // Penalty risk
        this.addSectionTitle(doc, 'Compliance Penalty Risk Analysis', yPosition);
        yPosition += 15;
        
        doc.setFontSize(11);
        doc.text('Annual Penalty Exposure:', 25, yPosition);
        yPosition += 10;
        
        const penaltyData = [
            ['Without NAC', '$2.5M exposure'],
            ['With Portnox', '$125K exposure'],
            ['Risk Reduction', '95%'],
            ['Annual Savings', '$2.375M']
        ];
        
        penaltyData.forEach(([label, value]) => {
            doc.text(`${label}: `, 30, yPosition);
            doc.setFont('helvetica', 'bold');
            doc.text(value, 80, yPosition);
            doc.setFont('helvetica', 'normal');
            yPosition += 8;
        });
        
        doc.addPage();
    }
    
    async addRecommendations(doc) {
        this.addHeader(doc, 'Strategic Recommendations');
        
        let yPosition = 40;
        
        // Executive recommendations
        this.addSectionTitle(doc, 'Recommended Action Plan', yPosition);
        yPosition += 15;
        
        const recommendations = [
            {
                priority: 'Immediate (Week 1)',
                action: 'Deploy Portnox CLEAR Proof of Concept',
                benefit: 'Validate 4-hour deployment and immediate value'
            },
            {
                priority: 'Short-term (Month 1)',
                action: 'Full production deployment across all locations',
                benefit: 'Capture $50K monthly savings immediately'
            },
            {
                priority: 'Medium-term (Quarter 1)',
                action: 'Integrate with existing security stack',
                benefit: 'Achieve 95% automation and reduce FTE requirement'
            },
            {
                priority: 'Long-term (Year 1)',
                action: 'Expand Zero Trust architecture',
                benefit: 'Position for cloud transformation and M&A'
            }
        ];
        
        recommendations.forEach(rec => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.text(rec.priority, 25, yPosition);
            yPosition += 8;
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.text(`Action: ${rec.action}`, 30, yPosition);
            yPosition += 7;
            doc.text(`Benefit: ${rec.benefit}`, 30, yPosition);
            yPosition += 12;
        });
        
        // Success metrics
        yPosition += 10;
        this.addSectionTitle(doc, 'Success Metrics', yPosition);
        yPosition += 15;
        
        const metrics = [
            'Time to deployment: < 1 week',
            'Device visibility: 100% within 24 hours',
            'Policy compliance: > 95% automated',
            'Security incidents: 90% reduction',
            'Operational overhead: 75% reduction'
        ];
        
        metrics.forEach(metric => {
            doc.text(`• ${metric}`, 25, yPosition);
            yPosition += 8;
        });
        
        // Next steps
        yPosition += 15;
        this.addSectionTitle(doc, 'Next Steps', yPosition);
        yPosition += 15;
        
        doc.setFontSize(11);
        doc.text('1. Schedule executive briefing with Portnox team', 25, yPosition);
        yPosition += 8;
        doc.text('2. Conduct technical proof of concept (1 week)', 25, yPosition);
        yPosition += 8;
        doc.text('3. Review and approve implementation plan', 25, yPosition);
        yPosition += 8;
        doc.text('4. Begin phased rollout across organization', 25, yPosition);
    }
    
    // Helper methods
    addHeader(doc, title) {
        doc.setFillColor(10, 11, 14);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 25, 'F');
        
        doc.setTextColor(0, 212, 170);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text(title, 20, 17);
        
        // Page number
        doc.setTextColor(166, 172, 187);
        doc.setFontSize(10);
        doc.text(
            `Page ${doc.internal.getNumberOfPages()}`,
            doc.internal.pageSize.getWidth() - 30,
            17
        );
        
        // Reset text color
        doc.setTextColor(60, 60, 60);
        doc.setFont('helvetica', 'normal');
    }
    
    addSectionTitle(doc, title, y) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(30, 30, 30);
        doc.text(title, 20, y);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
    }
    
    addTable(doc, data, startY, options = {}) {
        const cellHeight = 10;
        const pageWidth = doc.internal.pageSize.getWidth();
        const margins = 20;
        const tableWidth = pageWidth - (margins * 2);
        
        const columnWidths = options.columnWidths || 
            new Array(data[0].length).fill(tableWidth / data[0].length);
        
        let y = startY;
        
        data.forEach((row, rowIndex) => {
            let x = margins;
            
            // Header row
            if (rowIndex === 0 && options.headerColor) {
                doc.setFillColor(...options.headerColor);
                doc.rect(x, y - cellHeight + 2, tableWidth, cellHeight, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFont('helvetica', 'bold');
            }
            // Alternate row colors
            else if (rowIndex > 0 && options.alternateRows && rowIndex % 2 === 0) {
                doc.setFillColor(245, 245, 245);
                doc.rect(x, y - cellHeight + 2, tableWidth, cellHeight, 'F');
                doc.setTextColor(60, 60, 60);
            }
            // Highlight column
            else if (options.highlightColumn !== undefined) {
                doc.setTextColor(60, 60, 60);
            }
            
            row.forEach((cell, colIndex) => {
                const cellWidth = columnWidths[colIndex];
                
                // Highlight specific column
                if (colIndex === options.highlightColumn && rowIndex > 0) {
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(0, 212, 170);
                }
                
                doc.text(cell.toString(), x + 2, y);
                x += cellWidth;
                
                // Reset font
                if (colIndex === options.highlightColumn && rowIndex > 0) {
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(60, 60, 60);
                }
            });
            
            y += cellHeight;
            
            // Reset text color
            if (rowIndex === 0) {
                doc.setTextColor(60, 60, 60);
                doc.setFont('helvetica', 'normal');
            }
        });
        
        // Draw table borders
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.1);
        
        // Horizontal lines
        for (let i = 0; i <= data.length; i++) {
            doc.line(margins, startY - cellHeight + 2 + (i * cellHeight), 
                    margins + tableWidth, startY - cellHeight + 2 + (i * cellHeight));
        }
        
        // Vertical lines
        let x = margins;
        for (let i = 0; i <= columnWidths.length; i++) {
            doc.line(x, startY - cellHeight + 2, x, startY - cellHeight + 2 + (data.length * cellHeight));
            if (i < columnWidths.length) {
                x += columnWidths[i];
            }
        }
    }
    
    wrapText(text, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';
        
        words.forEach(word => {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            if (testLine.length > maxWidth) {
                if (currentLine) {
                    lines.push(currentLine);
                    currentLine = word;
                } else {
                    lines.push(word);
                }
            } else {
                currentLine = testLine;
            }
        });
        
        if (currentLine) {
            lines.push(currentLine);
        }
        
        return lines;
    }
    
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }
    
    async loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }
    
    async createBarChart(data, title) {
        // Create a temporary canvas for the chart
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 400;
        document.body.appendChild(canvas);
        
        try {
            // Use Highcharts to render to canvas
            const chart = Highcharts.chart(canvas, {
                chart: {
                    type: 'column',
                    backgroundColor: '#FFFFFF'
                },
                title: {
                    text: title
                },
                xAxis: {
                    categories: data.categories
                },
                yAxis: {
                    title: {
                        text: 'Cost ($)'
                    }
                },
                series: data.series,
                credits: {
                    enabled: false
                }
            });
            
            // Wait for chart to render
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Get the canvas
            const chartCanvas = await html2canvas(canvas);
            
            // Clean up
            document.body.removeChild(canvas);
            chart.destroy();
            
            return chartCanvas;
        } catch (error) {
            console.error('Error creating chart:', error);
            document.body.removeChild(canvas);
            return null;
        }
    }
}

// Register with platform
window.PDFGenerator = PDFGenerator;
console.log('✅ PDF Generator loaded');
EOF

# Create Excel export module
cat > js/exports/excel-generator.js << 'EOF'
/**
 * Excel Export Generator
 * Creates detailed analysis spreadsheets
 */

class ExcelGenerator {
    constructor(platform) {
        this.platform = platform;
        this.XLSX = window.XLSX;
    }
    
    generateComprehensiveReport() {
        const wb = this.XLSX.utils.book_new();
        
        // Add worksheets
        this.addExecutiveSummary(wb);
        this.addFinancialAnalysis(wb);
        this.addVendorComparison(wb);
        this.addComplianceMatrix(wb);
        this.addRiskAssessment(wb);
        this.addImplementationPlan(wb);
        this.addROICalculations(wb);
        
        // Set workbook properties
        wb.Props = {
            Title: "NAC Platform Analysis",
            Subject: "Comprehensive TCO/ROI Analysis",
            Author: "NAC Decision Platform",
            CreatedDate: new Date()
        };
        
        // Save the workbook
        const filename = `NAC-Analysis-${new Date().toISOString().split('T')[0]}.xlsx`;
        this.XLSX.writeFile(wb, filename);
        
        return filename;
    }
    
    addExecutiveSummary(wb) {
        const data = [
            ['NAC Platform Executive Summary'],
            [],
            ['Generated:', new Date().toLocaleString()],
            ['Organization:', this.platform.config.organization.name],
            ['Industry:', this.platform.config.organization.industry],
            ['Devices:', this.platform.config.devices.total],
            [],
            ['Key Findings'],
            ['Recommended Solution:', 'Portnox CLEAR'],
            ['Total 3-Year Savings:', this.platform.results.totalSavings],
            ['ROI:', this.platform.results.roi + '%'],
            ['Payback Period:', this.platform.results.paybackMonths + ' months'],
            ['Risk Reduction:', this.platform.results.riskReduction + '%'],
            [],
            ['Vendor Comparison Summary'],
            ['Vendor', '3-Year TCO', 'Deployment Time', 'Automation Level', 'Compliance Score', 'Overall Score']
        ];
        
        // Add vendor data
        Object.values(this.platform.results.vendors).forEach(vendor => {
            data.push([
                vendor.name,
                vendor.tco3Year,
                vendor.deploymentDays + ' days',
                vendor.automationLevel + '%',
                vendor.complianceScore + '%',
                vendor.overallScore + '%'
            ]);
        });
        
        const ws = this.XLSX.utils.aoa_to_sheet(data);
        
        // Styling
        ws['!cols'] = [
            { wpx: 150 },
            { wpx: 100 },
            { wpx: 100 },
            { wpx: 100 },
            { wpx: 100 },
            { wpx: 100 }
        ];
        
        // Merge cells for title
        ws['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }
        ];
        
        this.XLSX.utils.book_append_sheet(wb, ws, 'Executive Summary');
    }
    
    addFinancialAnalysis(wb) {
        const data = [
            ['Financial Analysis - 3 Year TCO'],
            [],
            ['Cost Category', 'Portnox', 'Cisco ISE', 'Aruba ClearPass', 'Forescout', 'Microsoft'],
            ['Software Licensing', 
                this.platform.results.vendors.portnox.costs.licensing,
                this.platform.results.vendors.cisco.costs.licensing,
                this.platform.results.vendors.aruba.costs.licensing,
                this.platform.results.vendors.forescout.costs.licensing,
                this.platform.results.vendors.microsoft.costs.licensing
            ],
            ['Implementation', 
                this.platform.results.vendors.portnox.costs.implementation,
                this.platform.results.vendors.cisco.costs.implementation,
                this.platform.results.vendors.aruba.costs.implementation,
                this.platform.results.vendors.forescout.costs.implementation,
                this.platform.results.vendors.microsoft.costs.implementation
            ],
            ['Infrastructure', 
                this.platform.results.vendors.portnox.costs.infrastructure,
                this.platform.results.vendors.cisco.costs.infrastructure,
                this.platform.results.vendors.aruba.costs.infrastructure,
                this.platform.results.vendors.forescout.costs.infrastructure,
                this.platform.results.vendors.microsoft.costs.infrastructure
            ],
            ['Operations (FTE)', 
                this.platform.results.vendors.portnox.costs.operations,
                this.platform.results.vendors.cisco.costs.operations,
                this.platform.results.vendors.aruba.costs.operations,
                this.platform.results.vendors.forescout.costs.operations,
                this.platform.results.vendors.microsoft.costs.operations
            ],
            ['Support & Maintenance', 
                this.platform.results.vendors.portnox.costs.support,
                this.platform.results.vendors.cisco.costs.support,
                this.platform.results.vendors.aruba.costs.support,
                this.platform.results.vendors.forescout.costs.support,
                this.platform.results.vendors.microsoft.costs.support
            ],
            ['Hidden Costs', 
                this.platform.results.vendors.portnox.costs.hidden,
                this.platform.results.vendors.cisco.costs.hidden,
                this.platform.results.vendors.aruba.costs.hidden,
                this.platform.results.vendors.forescout.costs.hidden,
                this.platform.results.vendors.microsoft.costs.hidden
            ],
            [],
            ['Total 3-Year TCO', 
                this.platform.results.vendors.portnox.tco3Year,
                this.platform.results.vendors.cisco.tco3Year,
                this.platform.results.vendors.aruba.tco3Year,
                this.platform.results.vendors.forescout.tco3Year,
                this.platform.results.vendors.microsoft.tco3Year
            ],
            [],
            ['Per Device Per Month', 
                this.platform.results.vendors.portnox.perDeviceMonthly,
                this.platform.results.vendors.cisco.perDeviceMonthly,
                this.platform.results.vendors.aruba.perDeviceMonthly,
                this.platform.results.vendors.forescout.perDeviceMonthly,
                this.platform.results.vendors.microsoft.perDeviceMonthly
            ],
            [],
            ['Savings vs Industry Average'],
            ['Amount', 
                this.platform.results.vendors.portnox.savingsVsAverage,
                this.platform.results.vendors.cisco.savingsVsAverage,
                this.platform.results.vendors.aruba.savingsVsAverage,
                this.platform.results.vendors.forescout.savingsVsAverage,
                this.platform.results.vendors.microsoft.savingsVsAverage
            ],
            ['Percentage', 
                this.platform.results.vendors.portnox.savingsPercentage + '%',
                this.platform.results.vendors.cisco.savingsPercentage + '%',
                this.platform.results.vendors.aruba.savingsPercentage + '%',
                this.platform.results.vendors.forescout.savingsPercentage + '%',
                this.platform.results.vendors.microsoft.savingsPercentage + '%'
            ]
        ];
        
        const ws = this.XLSX.utils.aoa_to_sheet(data);
        
        // Apply number formatting
        const range = this.XLSX.utils.decode_range(ws['!ref']);
        for (let R = 3; R <= range.e.r; R++) {
            for (let C = 1; C <= range.e.c; C++) {
                const cell_address = { c: C, r: R };
                const cell_ref = this.XLSX.utils.encode_cell(cell_address);
                if (ws[cell_ref] && typeof ws[cell_ref].v === 'number') {
                    ws[cell_ref].t = 'n';
                    ws[cell_ref].z = '$#,##0';
                }
            }
        }
        
        this.XLSX.utils.book_append_sheet(wb, ws, 'Financial Analysis');
    }
    
    addComplianceMatrix(wb) {
        const frameworks = Object.keys(this.platform.compliance.frameworks);
        const vendors = Object.keys(this.platform.vendors);
        
        // Create header row
        const data = [
            ['Compliance Framework Coverage Matrix'],
            [],
            ['Framework', ...vendors.map(v => this.platform.vendors[v].name)]
        ];
        
        // Add framework scores
        frameworks.forEach(framework => {
            const row = [this.platform.compliance.frameworks[framework].name];
            vendors.forEach(vendor => {
                const score = this.platform.getComplianceScore(vendor, framework);
                row.push(score + '%');
            });
            data.push(row);
        });
        
        // Add summary rows
        data.push([]);
        data.push(['Average Compliance Score', ...vendors.map(vendor => {
            const scores = frameworks.map(f => this.platform.getComplianceScore(vendor, f));
            const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
            return Math.round(avg) + '%';
        })]);
        
        data.push([]);
        data.push(['Automation Level', ...vendors.map(vendor => {
            return this.platform.vendors[vendor].compliance?.automationLevel || '0%';
        })]);
        
        const ws = this.XLSX.utils.aoa_to_sheet(data);
        this.XLSX.utils.book_append_sheet(wb, ws, 'Compliance Matrix');
    }
    
    addROICalculations(wb) {
        const data = [
            ['Return on Investment Calculations'],
            [],
            ['Portnox CLEAR ROI Analysis'],
            [],
            ['Investment & Costs'],
            ['Initial Investment:', this.platform.results.vendors.portnox.initialInvestment],
            ['Year 1 Operating Costs:', this.platform.results.vendors.portnox.year1Operating],
            ['Year 2 Operating Costs:', this.platform.results.vendors.portnox.year2Operating],
            ['Year 3 Operating Costs:', this.platform.results.vendors.portnox.year3Operating],
            ['Total 3-Year Investment:', this.platform.results.vendors.portnox.tco3Year],
            [],
            ['Benefits & Savings'],
            ['Risk Reduction Savings:', this.platform.results.riskReductionSavings],
            ['Compliance Cost Savings:', this.platform.results.complianceSavings],
            ['Operational Efficiency:', this.platform.results.operationalSavings],
            ['Insurance Premium Reduction:', this.platform.results.insuranceSavings],
            ['Productivity Gains:', this.platform.results.productivityGains],
            ['Total 3-Year Benefits:', this.platform.results.totalBenefits],
            [],
            ['ROI Metrics'],
            ['Net Present Value (NPV):', this.platform.results.npv],
            ['Internal Rate of Return (IRR):', this.platform.results.irr + '%'],
            ['Payback Period:', this.platform.results.paybackMonths + ' months'],
            ['3-Year ROI:', this.platform.results.roi + '%'],
            [],
            ['Monthly Cash Flow Analysis'],
            ['Month', 'Investment', 'Operating Cost', 'Benefits', 'Net Cash Flow', 'Cumulative']
        ];
        
        // Add monthly cash flow
        for (let month = 1; month <= 36; month++) {
            const cashFlow = this.platform.calculateMonthlyCashFlow(month);
            data.push([
                month,
                cashFlow.investment,
                cashFlow.operatingCost,
                cashFlow.benefits,
                cashFlow.netCashFlow,
                cashFlow.cumulative
            ]);
        }
        
        const ws = this.XLSX.utils.aoa_to_sheet(data);
        this.XLSX.utils.book_append_sheet(wb, ws, 'ROI Calculations');
    }
}

// Register with platform
window.ExcelGenerator = ExcelGenerator;
console.log('✅ Excel Generator loaded');
EOF

# Create PowerPoint export module
cat > js/exports/powerpoint-generator.js << 'EOF'
/**
 * PowerPoint Export Generator
 * Creates executive presentation decks
 */

class PowerPointGenerator {
    constructor(platform) {
        this.platform = platform;
        this.pptx = new PptxGenJS();
    }
    
    async generateExecutivePresentation() {
        // Set presentation properties
        this.pptx.author = 'NAC Decision Platform';
        this.pptx.company = this.platform.config.organization.name;
        this.pptx.revision = '1.0';
        this.pptx.subject = 'Zero Trust NAC Investment Analysis';
        this.pptx.title = 'Executive Decision Presentation';
        
        // Define master slide
        this.pptx.defineSlideMaster({
            title: 'MASTER_SLIDE',
            background: { color: '0A0B0E' },
            objects: [
                {
                    image: {
                        x: 0.5,
                        y: 0.3,
                        w: 1.5,
                        h: 0.5,
                        path: '/img/vendors/portnox-logo.png'
                    }
                },
                {
                    text: {
                        text: 'CONFIDENTIAL',
                        options: {
                            x: 8,
                            y: 0.3,
                            w: 1.5,
                            h: 0.5,
                            fontSize: 10,
                            color: 'A6ACBB',
                            align: 'right'
                        }
                    }
                }
            ],
            slideNumber: {
                x: 9,
                y: 5.5,
                color: 'A6ACBB',
                fontSize: 10
            }
        });
        
        // Add slides
        await this.addTitleSlide();
        await this.addExecutiveSummarySlide();
        await this.addProblemStatementSlide();
        await this.addSolutionOverviewSlide();
        await this.addFinancialAnalysisSlide();
        await this.addRiskMitigationSlide();
        await this.addComplianceSlide();
        await this.addROISlide();
        await this.addImplementationTimelineSlide();
        await this.addRecommendationsSlide();
        await this.addNextStepsSlide();
        
        // Save presentation
        const filename = `NAC-Executive-Presentation-${new Date().toISOString().split('T')[0]}.pptx`;
        await this.pptx.writeFile({ fileName: filename });
        
        return filename;
    }
    
    async addTitleSlide() {
        const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
        
        // Title
        slide.addText('Zero Trust NAC', {
            x: 1,
            y: 1.5,
            w: 8,
            h: 1,
            fontSize: 48,
            bold: true,
            color: '00D4AA',
            align: 'center'
        });
        
        // Subtitle
        slide.addText('Investment Decision Analysis', {
            x: 1,
            y: 2.5,
            w: 8,
            h: 0.5,
            fontSize: 24,
            color: 'FFFFFF',
            align: 'center'
        });
        
        // Key metrics box
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 2,
            y: 3.5,
            w: 6,
            h: 1.5,
          fill: { color: '1E2129' },
            line: { color: '00D4AA', width: 2 }
        });
        
        // Key metrics
        const metrics = [
            `$${this.formatNumber(this.platform.results.totalSavings)} Total Savings`,
            `${this.platform.results.roi}% ROI`,
            `${this.platform.results.paybackMonths} Month Payback`
        ];
        
        slide.addText(metrics.join('  •  '), {
            x: 2.2,
            y: 4,
            w: 5.6,
            h: 0.5,
            fontSize: 16,
            bold: true,
            color: '00D4AA',
            align: 'center'
        });
        
        // Date
        slide.addText(new Date().toLocaleDateString(), {
            x: 1,
            y: 5,
            w: 8,
            h: 0.5,
            fontSize: 14,
            color: 'A6ACBB',
            align: 'center'
        });
    }
    
    async addExecutiveSummarySlide() {
        const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
        
        slide.addText('Executive Summary', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.5,
            fontSize: 32,
            bold: true,
            color: '00D4AA'
        });
        
        // Summary points
        const summaryPoints = [
            {
                title: 'Recommendation',
                content: 'Deploy Portnox CLEAR as enterprise NAC solution'
            },
            {
                title: 'Financial Impact',
                content: `$${this.formatNumber(this.platform.results.totalSavings)} savings over 3 years with ${this.platform.results.roi}% ROI`
            },
            {
                title: 'Risk Reduction',
                content: `${this.platform.results.riskReduction}% reduction in security breach probability`
            },
            {
                title: 'Implementation',
                content: 'Deploy in 4 hours vs. 90 days for legacy solutions'
            },
            {
                title: 'Compliance',
                content: '98% automated compliance across all frameworks'
            }
        ];
        
        let yPos = 1.5;
        summaryPoints.forEach(point => {
            // Bullet point
            slide.addText('•', {
                x: 0.5,
                y: yPos,
                w: 0.3,
                h: 0.4,
                fontSize: 16,
                color: '00D4AA'
            });
            
            // Title
            slide.addText(point.title + ':', {
                x: 0.8,
                y: yPos,
                w: 2,
                h: 0.4,
                fontSize: 16,
                bold: true,
                color: 'FFFFFF'
            });
            
            // Content
            slide.addText(point.content, {
                x: 2.8,
                y: yPos,
                w: 6,
                h: 0.4,
                fontSize: 16,
                color: 'A6ACBB'
            });
            
            yPos += 0.6;
        });
    }
    
    async addFinancialAnalysisSlide() {
        const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
        
        slide.addText('3-Year TCO Comparison', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.5,
            fontSize: 32,
            bold: true,
            color: '00D4AA'
        });
        
        // Create TCO comparison chart
        const chartData = [
            {
                name: 'License Costs',
                labels: ['Portnox', 'Cisco ISE', 'Aruba', 'Forescout'],
                values: [126000, 885000, 585000, 390000]
            },
            {
                name: 'Infrastructure',
                labels: ['Portnox', 'Cisco ISE', 'Aruba', 'Forescout'],
                values: [0, 250000, 160000, 50000]
            },
            {
                name: 'Operations',
                labels: ['Portnox', 'Cisco ISE', 'Aruba', 'Forescout'],
                values: [75000, 750000, 450000, 375000]
            }
        ];
        
        slide.addChart(this.pptx.ChartType.bar, chartData, {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 3,
            showLegend: true,
            showTitle: false,
            barGrouping: 'stacked',
            chartColors: ['00D4AA', 'EF4444', 'F59E0B'],
            catAxisLabelColor: 'A6ACBB',
            valAxisLabelColor: 'A6ACBB'
        });
        
        // Key takeaway
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.5,
            y: 4.8,
            w: 9,
            h: 0.7,
            fill: { color: '00D4AA', transparency: 90 },
            line: { color: '00D4AA', width: 1 }
        });
        
        slide.addText('Portnox delivers 92% lower TCO than traditional solutions', {
            x: 0.7,
            y: 4.95,
            w: 8.6,
            h: 0.4,
            fontSize: 16,
            bold: true,
            color: '00D4AA',
            align: 'center'
        });
    }
    
    async addROISlide() {
        const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
        
        slide.addText('Return on Investment', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.5,
            fontSize: 32,
            bold: true,
            color: '00D4AA'
        });
        
        // ROI metrics grid
        const roiMetrics = [
            { label: 'Initial Investment', value: `$${this.formatNumber(this.platform.results.initialInvestment)}` },
            { label: 'Annual Savings', value: `$${this.formatNumber(this.platform.results.annualSavings)}` },
            { label: 'Payback Period', value: `${this.platform.results.paybackMonths} months` },
            { label: '3-Year ROI', value: `${this.platform.results.roi}%` },
            { label: 'NPV', value: `$${this.formatNumber(this.platform.results.npv)}` },
            { label: 'IRR', value: `${this.platform.results.irr}%` }
        ];
        
        // Create 2x3 grid
        let xPos = 1;
        let yPos = 1.5;
        roiMetrics.forEach((metric, index) => {
            // Metric box
            slide.addShape(this.pptx.ShapeType.rect, {
                x: xPos,
                y: yPos,
                w: 4,
                h: 1.2,
                fill: { color: '1E2129' },
                line: { color: '00D4AA', width: 1 }
            });
            
            // Label
            slide.addText(metric.label, {
                x: xPos + 0.2,
                y: yPos + 0.2,
                w: 3.6,
                h: 0.4,
                fontSize: 14,
                color: 'A6ACBB'
            });
            
            // Value
            slide.addText(metric.value, {
                x: xPos + 0.2,
                y: yPos + 0.6,
                w: 3.6,
                h: 0.4,
                fontSize: 20,
                bold: true,
                color: '00D4AA'
            });
            
            // Move to next position
            if (index % 2 === 0) {
                xPos = 5;
            } else {
                xPos = 1;
                yPos += 1.5;
            }
        });
    }
    
    async addImplementationTimelineSlide() {
        const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
        
        slide.addText('Implementation Timeline', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.5,
            fontSize: 32,
            bold: true,
            color: '00D4AA'
        });
        
        // Timeline phases
        const phases = [
            { week: 'Week 1', title: 'Deployment', tasks: ['4-hour cloud setup', 'Device discovery', 'Initial policies'] },
            { week: 'Week 2-3', title: 'Configuration', tasks: ['Policy refinement', 'Integration setup', 'User training'] },
            { week: 'Week 4', title: 'Testing', tasks: ['Policy validation', 'Performance testing', 'User acceptance'] },
            { week: 'Month 2', title: 'Expansion', tasks: ['Multi-site rollout', 'Advanced features', 'Optimization'] },
            { week: 'Month 3+', title: 'Excellence', tasks: ['Continuous improvement', 'Advanced automation', 'Full Zero Trust'] }
        ];
        
        let xPos = 0.5;
        phases.forEach((phase, index) => {
            // Phase box
            slide.addShape(this.pptx.ShapeType.rect, {
                x: xPos,
                y: 1.5,
                w: 1.8,
                h: 3,
                fill: { color: '1E2129' },
                line: { color: '00D4AA', width: 1 }
            });
            
            // Week
            slide.addText(phase.week, {
                x: xPos + 0.1,
                y: 1.6,
                w: 1.6,
                h: 0.3,
                fontSize: 12,
                bold: true,
                color: '00D4AA',
                align: 'center'
            });
            
            // Title
            slide.addText(phase.title, {
                x: xPos + 0.1,
                y: 2,
                w: 1.6,
                h: 0.4,
                fontSize: 14,
                bold: true,
                color: 'FFFFFF',
                align: 'center'
            });
            
            // Tasks
            let taskY = 2.5;
            phase.tasks.forEach(task => {
                slide.addText('• ' + task, {
                    x: xPos + 0.1,
                    y: taskY,
                    w: 1.6,
                    h: 0.3,
                    fontSize: 10,
                    color: 'A6ACBB'
                });
                taskY += 0.3;
            });
            
            // Arrow between phases
            if (index < phases.length - 1) {
                slide.addShape(this.pptx.ShapeType.line, {
                    x: xPos + 1.8,
                    y: 3,
                    w: 0.1,
                    h: 0,
                    line: { color: '00D4AA', width: 2, dashType: 'solid', endArrowType: 'arrow' }
                });
            }
            
            xPos += 1.9;
        });
    }
    
    async addRecommendationsSlide() {
        const slide = this.pptx.addSlide({ masterName: 'MASTER_SLIDE' });
        
        slide.addText('Strategic Recommendations', {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.5,
            fontSize: 32,
            bold: true,
            color: '00D4AA'
        });
        
        const recommendations = [
            {
                priority: '1',
                action: 'Approve Portnox CLEAR deployment',
                benefit: 'Begin capturing savings immediately',
                timeline: 'This week'
            },
            {
                priority: '2',
                action: 'Conduct 1-week proof of concept',
                benefit: 'Validate 4-hour deployment claim',
                timeline: 'Next week'
            },
            {
                priority: '3',
                action: 'Phase out legacy NAC infrastructure',
                benefit: 'Eliminate $250K annual costs',
                timeline: 'Q1 2025'
            },
            {
                priority: '4',
                action: 'Expand Zero Trust architecture',
                benefit: 'Position for cloud transformation',
                timeline: 'Q2 2025'
            }
        ];
        
        // Table header
        slide.addTable(
            [
                [
                    { text: 'Priority', options: { bold: true, color: '00D4AA', fill: '1E2129' } },
                    { text: 'Action', options: { bold: true, color: '00D4AA', fill: '1E2129' } },
                    { text: 'Benefit', options: { bold: true, color: '00D4AA', fill: '1E2129' } },
                    { text: 'Timeline', options: { bold: true, color: '00D4AA', fill: '1E2129' } }
                ],
                ...recommendations.map(rec => [
                    { text: rec.priority, options: { align: 'center' } },
                    { text: rec.action },
                    { text: rec.benefit },
                    { text: rec.timeline, options: { align: 'center' } }
                ])
            ],
            {
                x: 0.5,
                y: 1.5,
                w: 9,
                colW: [1, 3.5, 3.5, 1],
                border: { type: 'solid', color: '00D4AA', pt: 1 },
                color: 'A6ACBB',
                fontSize: 14
            }
        );
    }
    
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }
}

// Register with platform
window.PowerPointGenerator = PowerPointGenerator;
console.log('✅ PowerPoint Generator loaded');
EOF

echo "✅ Part 5 complete - Export functionality implemented"

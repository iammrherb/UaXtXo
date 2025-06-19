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

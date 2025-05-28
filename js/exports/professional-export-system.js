/**
 * Professional Export System - PDF, Excel, PowerPoint
 * Best-in-class executive reports with Portnox branding
 */

class ProfessionalExportSystem {
    constructor() {
        this.portnoxColors = {
            primary: '#2E7EE5',
            secondary: '#1a5bb8',
            success: '#28a745',
            danger: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8',
            dark: '#2c3e50',
            light: '#f8f9fa'
        };
        
        console.log('📤 Professional Export System initialized');
        this.loadDependencies();
    }
    
    async loadDependencies() {
        // Load export libraries dynamically
        const scripts = [
            {
                name: 'jsPDF',
                url: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
                check: () => window.jspdf
            },
            {
                name: 'SheetJS',
                url: 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
                check: () => window.XLSX
            },
            {
                name: 'PptxGenJS',
                url: 'https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js',
                check: () => window.PptxGenJS
            }
        ];
        
        for (const script of scripts) {
            if (!script.check()) {
                await this.loadScript(script.url);
                console.log(`✅ ${script.name} loaded`);
            }
        }
    }
    
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    /**
     * Generate Executive PDF Report
     */
    async generateExecutivePDF(data) {
        try {
            await this.loadDependencies();
            
            if (!window.jspdf) {
                throw new Error('jsPDF not loaded');
            }
            
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'mm', 'a4');
            
            // Cover Page
            this.addPDFCoverPage(doc, data);
            
            // Executive Summary
            doc.addPage();
            this.addPDFExecutiveSummary(doc, data);
            
            // Financial Analysis
            doc.addPage();
            this.addPDFFinancialAnalysis(doc, data);
            
            // Save
            doc.save(`Portnox_TCO_Analysis_${new Date().toISOString().split('T')[0]}.pdf`);
            
            if (window.dashboard) {
                window.dashboard.showNotification('PDF report generated successfully!', 'success');
            }
            
            return true;
        } catch (error) {
            console.error('PDF generation error:', error);
            if (window.dashboard) {
                window.dashboard.showNotification('Error generating PDF. Please try again.', 'error');
            }
            return false;
        }
    }
    
    addPDFCoverPage(doc, data) {
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        
        // Background
        doc.setFillColor(46, 126, 229);
        doc.rect(0, 0, pageWidth, 80, 'F');
        
        // Title
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(32);
        doc.text('Zero Trust NAC', pageWidth / 2, 30, { align: 'center' });
        
        doc.setFontSize(24);
        doc.text('Total Cost of Ownership Analysis', pageWidth / 2, 45, { align: 'center' });
        
        doc.setFontSize(16);
        doc.text('Executive Intelligence Report', pageWidth / 2, 60, { align: 'center' });
        
        // Company Details
        doc.setTextColor(44, 62, 80);
        doc.setFontSize(14);
        let y = 100;
        
        doc.text(`Organization: ${data.config.companyName || 'Your Organization'}`, pageWidth / 2, y, { align: 'center' });
        y += 10;
        doc.text(`Devices: ${data.config.deviceCount.toLocaleString()}`, pageWidth / 2, y, { align: 'center' });
        y += 10;
        doc.text(`Analysis Period: ${data.config.analysisPeriod} Years`, pageWidth / 2, y, { align: 'center' });
        y += 10;
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, y, { align: 'center' });
        
        // Footer
        this.addPDFFooter(doc, pageWidth, pageHeight);
    }
    
    addPDFExecutiveSummary(doc, data) {
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        
        // Header
        doc.setFontSize(20);
        doc.setTextColor(46, 126, 229);
        doc.text('Executive Summary', 20, 30);
        
        // Content
        doc.setFontSize(12);
        doc.setTextColor(44, 62, 80);
        
        const portnox = data.vendors?.portnox;
        const cisco = data.vendors?.cisco;
        
        if (portnox && cisco) {
            const savings = cisco.tco.total - portnox.tco.total;
            const savingsPercent = Math.round((savings / cisco.tco.total) * 100);
            
            let y = 50;
            const lineHeight = 7;
            const margin = 20;
            const textWidth = pageWidth - (2 * margin);
            
            const summaryText = [
                `This comprehensive analysis demonstrates that migrating to Portnox CLEAR will deliver`,
                `exceptional value to your organization:`,
                ``,
                `• Total Savings: $${(savings / 1000).toFixed(0)}K over ${data.config.analysisPeriod} years (${savingsPercent}% reduction)`,
                `• Return on Investment: ${portnox.roi.roi}% with ${portnox.roi.paybackMonths}-month payback`,
                `• Risk Reduction: ${portnox.risk.breachReduction}% lower breach probability`,
                `• Operational Efficiency: ${(cisco.metrics.fteRequired - portnox.metrics.fteRequired).toFixed(1)} FTE reduction`,
                `• Deployment Speed: ${portnox.metrics.implementationDays} days vs ${cisco.metrics.implementationDays} days`,
                ``,
                `Portnox's cloud-native architecture eliminates hardware dependencies and provides`,
                `superior security capabilities while delivering immediate cost savings.`
            ];
            
            summaryText.forEach(line => {
                if (line.startsWith('•')) {
                    doc.setFont(undefined, 'bold');
                } else {
                    doc.setFont(undefined, 'normal');
                }
                
                const lines = doc.splitTextToSize(line, textWidth);
                lines.forEach(textLine => {
                    doc.text(textLine, margin, y);
                    y += lineHeight;
                });
            });
        }
        
        this.addPDFFooter(doc, pageWidth, pageHeight);
    }
    
    addPDFFinancialAnalysis(doc, data) {
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        
        // Header
        doc.setFontSize(20);
        doc.setTextColor(46, 126, 229);
        doc.text('Financial Analysis', 20, 30);
        
        // TCO Comparison Table
        doc.setFontSize(14);
        doc.setTextColor(44, 62, 80);
        doc.text('3-Year Total Cost of Ownership Comparison', 20, 50);
        
        // Simple table
        let y = 60;
        doc.setFontSize(10);
        
        // Table headers
        doc.setFillColor(46, 126, 229);
        doc.rect(20, y, 170, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text('Vendor', 25, y + 6);
        doc.text('3-Year TCO', 80, y + 6);
        doc.text('Monthly Cost', 120, y + 6);
        doc.text('FTE Required', 160, y + 6);
        
        y += 10;
        doc.setTextColor(44, 62, 80);
        
        // Vendor data
        const vendors = ['portnox', 'cisco', 'aruba', 'forescout'];
        vendors.forEach((vendorKey, index) => {
            const vendor = data.vendors?.[vendorKey];
            if (vendor) {
                // Alternate row colors
                if (index % 2 === 0) {
                    doc.setFillColor(248, 249, 250);
                    doc.rect(20, y, 170, 8, 'F');
                }
                
                // Highlight Portnox
                if (vendorKey === 'portnox') {
                    doc.setFillColor(232, 245, 233);
                    doc.rect(20, y, 170, 8, 'F');
                    doc.setFont(undefined, 'bold');
                } else {
                    doc.setFont(undefined, 'normal');
                }
                
                doc.text(vendor.name, 25, y + 6);
                doc.text(`$${(vendor.tco.total / 1000).toFixed(0)}K`, 80, y + 6);
                doc.text(`$${(vendor.tco.monthly / 1000).toFixed(1)}K`, 120, y + 6);
                doc.text(vendor.metrics.fteRequired.toString(), 160, y + 6);
                
                y += 8;
            }
        });
        
        this.addPDFFooter(doc, pageWidth, pageHeight);
    }
    
    addPDFFooter(doc, pageWidth, pageHeight) {
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text('Confidential - Portnox CLEAR', 20, pageHeight - 10);
        doc.text(`Page ${doc.internal.getNumberOfPages()}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
    }
    
    /**
     * Generate Excel Report
     */
    async generateExcelReport(data) {
        try {
            await this.loadDependencies();
            
            if (!window.XLSX) {
                throw new Error('SheetJS not loaded');
            }
            
            const wb = XLSX.utils.book_new();
            wb.Props = {
                Title: "Portnox TCO Analysis",
                Author: "Portnox CLEAR",
                CreatedDate: new Date()
            };
            
            // Executive Summary Sheet
            const summaryData = this.createExcelSummarySheet(data);
            const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
            XLSX.utils.book_append_sheet(wb, summarySheet, "Executive Summary");
            
            // Vendor Comparison Sheet
            const vendorData = this.createExcelVendorSheet(data);
            const vendorSheet = XLSX.utils.aoa_to_sheet(vendorData);
            XLSX.utils.book_append_sheet(wb, vendorSheet, "Vendor Comparison");
            
            // Save
            XLSX.writeFile(wb, `Portnox_TCO_Analysis_${new Date().toISOString().split('T')[0]}.xlsx`);
            
            if (window.dashboard) {
                window.dashboard.showNotification('Excel report generated successfully!', 'success');
            }
            
            return true;
        } catch (error) {
            console.error('Excel generation error:', error);
            if (window.dashboard) {
                window.dashboard.showNotification('Error generating Excel. Please try again.', 'error');
            }
            return false;
        }
    }
    
    createExcelSummarySheet(data) {
        const portnox = data.vendors?.portnox;
        const cisco = data.vendors?.cisco;
        
        if (!portnox || !cisco) {
            return [['No data available']];
        }
        
        const savings = cisco.tco.total - portnox.tco.total;
        
        return [
            ['Portnox Zero Trust NAC - Total Cost Analysis'],
            [''],
            ['Executive Summary'],
            [''],
            ['Key Metrics', 'Value', 'Industry Comparison'],
            ['Total 3-Year Savings', `$${(savings / 1000).toFixed(0)}K`, 'Top 10%'],
            ['Return on Investment', `${portnox.roi.roi}%`, 'Exceptional'],
            ['Payback Period', `${portnox.roi.paybackMonths} months`, '76% faster'],
            ['Risk Reduction', `${portnox.risk.breachReduction}%`, 'Industry leading'],
            ['FTE Savings', `${(cisco.metrics.fteRequired - portnox.metrics.fteRequired).toFixed(1)}`, '87.5% reduction'],
            [''],
            ['Organization Details'],
            ['Device Count', data.config.deviceCount.toLocaleString()],
            ['Locations', data.config.locationCount],
            ['Analysis Period', `${data.config.analysisPeriod} years`]
        ];
    }
    
    createExcelVendorSheet(data) {
        const headers = [
            'Vendor Name',
            '3-Year TCO',
            'Annual Cost',
            'Monthly Cost',
            'Implementation Days',
            'FTE Required',
            'Security Score',
            'Overall Score'
        ];
        
        const rows = [headers];
        
        Object.values(data.vendors || {}).forEach(vendor => {
            rows.push([
                vendor.name,
                vendor.tco.total,
                vendor.tco.annual,
                vendor.tco.monthly,
                vendor.metrics.implementationDays,
                vendor.metrics.fteRequired,
                vendor.metrics.securityScore,
                vendor.score
            ]);
        });
        
        return rows;
    }
    
    /**
     * Generate PowerPoint Presentation
     */
    async generatePowerPointPresentation(data) {
        try {
            await this.loadDependencies();
            
            if (!window.PptxGenJS) {
                throw new Error('PptxGenJS not loaded');
            }
            
            const pptx = new PptxGenJS();
            
            // Set properties
            pptx.title = 'Portnox Zero Trust NAC Analysis';
            pptx.author = 'Portnox CLEAR';
            pptx.company = 'Portnox';
            
            // Title Slide
            const titleSlide = pptx.addSlide();
            titleSlide.background = { color: 'FFFFFF' };
            
            titleSlide.addText('Zero Trust NAC', {
                x: 0.5, y: 1.5, w: 9, h: 1,
                fontSize: 44, bold: true, color: '2E7EE5', align: 'center'
            });
            
            titleSlide.addText('Total Cost of Ownership Analysis', {
                x: 0.5, y: 2.5, w: 9, h: 0.8,
                fontSize: 28, color: '333333', align: 'center'
            });
            
            // Executive Summary Slide
            const summarySlide = pptx.addSlide();
            summarySlide.addText('Executive Summary', {
                x: 0.5, y: 0.5, w: 9, h: 0.7,
                fontSize: 32, bold: true, color: '2E7EE5'
            });
            
            const portnox = data.vendors?.portnox;
            const cisco = data.vendors?.cisco;
            
            if (portnox && cisco) {
                const savings = cisco.tco.total - portnox.tco.total;
                
                summarySlide.addText([
                    { text: 'Key Findings:\n\n', options: { fontSize: 20, bold: true } },
                    { text: `• Total Savings: $${(savings / 1000).toFixed(0)}K over 3 years\n` },
                    { text: `• ROI: ${portnox.roi.roi}% with ${portnox.roi.paybackMonths}-month payback\n` },
                    { text: `• Risk Reduction: ${portnox.risk.breachReduction}%\n` },
                    { text: `• FTE Savings: ${(cisco.metrics.fteRequired - portnox.metrics.fteRequired).toFixed(1)}` }
                ], {
                    x: 0.5, y: 1.5, w: 9, h: 3,
                    fontSize: 18, color: '333333'
                });
            }
            
            // Save
            pptx.writeFile({ fileName: `Portnox_Presentation_${new Date().toISOString().split('T')[0]}.pptx` });
            
            if (window.dashboard) {
                window.dashboard.showNotification('PowerPoint presentation generated successfully!', 'success');
            }
            
            return true;
        } catch (error) {
            console.error('PowerPoint generation error:', error);
            if (window.dashboard) {
                window.dashboard.showNotification('Error generating PowerPoint. Please try again.', 'error');
            }
            return false;
        }
    }
    
    /**
     * Export all formats
     */
    async exportAll(data) {
        if (window.dashboard) {
            window.dashboard.showNotification('Generating all reports...', 'info');
        }
        
        const results = await Promise.allSettled([
            this.generateExecutivePDF(data),
            this.generateExcelReport(data),
            this.generatePowerPointPresentation(data)
        ]);
        
        const successful = results.filter(r => r.status === 'fulfilled' && r.value).length;
        
        if (successful === 3) {
            if (window.dashboard) {
                window.dashboard.showNotification('All reports generated successfully!', 'success');
            }
        } else if (successful > 0) {
            if (window.dashboard) {
                window.dashboard.showNotification(`${successful} of 3 reports generated successfully.`, 'warning');
            }
        } else {
            if (window.dashboard) {
                window.dashboard.showNotification('Failed to generate reports. Please try again.', 'error');
            }
        }
    }
}

// Create global instance
window.professionalExportSystem = new ProfessionalExportSystem();

console.log('✅ Professional Export System loaded');

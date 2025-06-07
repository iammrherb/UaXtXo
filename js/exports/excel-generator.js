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

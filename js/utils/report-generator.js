/**
 * Report Generator for Portnox Total Cost Analyzer
 * Creates PDF reports with charts and analysis
 */

class ReportGenerator {
  constructor(config = {}) {
    this.config = {
      fileName: 'Portnox_TCO_Analysis_Report.pdf',
      pageSize: 'a4',
      pageOrientation: 'portrait',
      pageMargins: [40, 60, 40, 60],
      ...config
    };
  }
  
  /**
   * Generate a PDF report from the TCO analysis results
   */
  generateReport(resultsData, userConfig, selectedVendors) {
    console.log('Generating PDF report...');
    
    const docDefinition = this.createDocDefinition(resultsData, userConfig, selectedVendors);
    
    // Generate PDF using pdfmake
    return new Promise((resolve, reject) => {
      try {
        pdfMake.createPdf(docDefinition).download(this.config.fileName);
        resolve(true);
      } catch (error) {
        console.error('Error generating PDF report:', error);
        reject(error);
      }
    });
  }
  
  /**
   * Create document definition for pdfmake
   */
  createDocDefinition(resultsData, userConfig, selectedVendors) {
    const vendors = selectedVendors.map(id => VENDORS[id]);
    const currentDate = new Date().toLocaleDateString();
    
    // Create document content
    return {
      info: {
        title: 'Portnox TCO Analysis Report',
        author: 'Portnox',
        subject: 'Network Access Control Total Cost of Ownership Analysis',
        keywords: 'NAC, TCO, ROI, Portnox'
      },
      pageSize: this.config.pageSize,
      pageOrientation: this.config.pageOrientation,
      pageMargins: this.config.pageMargins,
      footer: function(currentPage, pageCount) {
        return {
          text: `Page ${currentPage} of ${pageCount}`,
          alignment: 'center',
          margin: [0, 10, 0, 0]
        };
      },
      header: function(currentPage) {
        return {
          columns: [
            {
              image: 'data:image/png;base64,...', // Base64 Portnox logo
              width: 100,
              margin: [40, 20, 0, 0]
            },
            {
              text: 'Total Cost Analyzer Report',
              alignment: 'right',
              margin: [0, 20, 40, 0],
              fontSize: 10,
              color: '#666666'
            }
          ]
        };
      },
      content: [
        // Cover page
        {
          stack: [
            {
              text: 'Zero Trust Total Cost Analyzer',
              style: 'title',
              margin: [0, 100, 0, 20]
            },
            {
              text: 'Multi-Vendor NAC Solution Comparison Report',
              style: 'subtitle',
              margin: [0, 0, 0, 40]
            },
            {
              image: 'data:image/png;base64,...', // Base64 Portnox logo
              width: 200,
              alignment: 'center',
              margin: [0, 0, 0, 40]
            },
            {
              text: `Generated on: ${currentDate}`,
              alignment: 'center',
              margin: [0, 60, 0, 0]
            }
          ],
          pageBreak: 'after'
        },
        
        // Table of Contents
        {
          toc: {
            title: { text: 'Table of Contents', style: 'header1' }
          },
          pageBreak: 'after'
        },
        
        // Executive Summary
        {
          stack: [
            { text: 'Executive Summary', style: 'header1', tocItem: true },
            this.createExecutiveSummary(resultsData, userConfig, vendors)
          ],
          pageBreak: 'after'
        },
        
        // Financial Analysis
        {
          stack: [
            { text: 'Financial Analysis', style: 'header1', tocItem: true },
            this.createFinancialAnalysis(resultsData, userConfig, vendors)
          ],
          pageBreak: 'after'
        },
        
        // Security & Compliance
        {
          stack: [
            { text: 'Security & Compliance Analysis', style: 'header1', tocItem: true },
            this.createSecurityAnalysis(resultsData, userConfig, vendors)
          ],
          pageBreak: 'after'
        },
        
        // Technical Comparison
        {
          stack: [
            { text: 'Technical Comparison', style: 'header1', tocItem: true },
            this.createTechnicalAnalysis(resultsData, userConfig, vendors)
          ],
          pageBreak: 'after'
        },
        
        // Appendix: Configuration Details
        {
          stack: [
            { text: 'Appendix: Configuration Details', style: 'header1', tocItem: true },
            this.createConfigurationDetails(userConfig)
          ]
        }
      ],
      
      // Document styles
      styles: {
        title: {
          fontSize: 28,
          bold: true,
          color: '#1a5a96',
          alignment: 'center'
        },
        subtitle: {
          fontSize: 16,
          color: '#666666',
          alignment: 'center'
        },
        header1: {
          fontSize: 18,
          bold: true,
          color: '#1a5a96',
          margin: [0, 20, 0, 10]
        },
        header2: {
          fontSize: 14,
          bold: true,
          color: '#333333',
          margin: [0, 15, 0, 5]
        },
        header3: {
          fontSize: 12,
          bold: true,
          color: '#333333',
          margin: [0, 10, 0, 5]
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: '#ffffff',
          fillColor: '#1a5a96',
          alignment: 'center'
        },
        default: {
          fontSize: 10,
          color: '#333333'
        },
        tableCell: {
          fontSize: 10
        },
        highlightCell: {
          fontSize: 10,
          color: '#1a5a96',
          bold: true
        }
      },
      defaultStyle: {
        fontSize: 10,
        color: '#333333'
      }
    };
  }
  
  /**
   * Create executive summary content
   */
  createExecutiveSummary(resultsData, userConfig, vendors) {
    const portnoxVendor = VENDORS['portnox'];
    const portnoxResults = resultsData.vendors['portnox'];
    const portnoxRoi = resultsData.roi['portnox'];
    const portnoxSecurity = resultsData.security['portnox'];
    
    // Find the competitor with highest TCO for comparison
    const competitors = vendors.filter(v => v.id !== 'portnox' && v.id !== 'no-nac');
    let highestTcoVendor = null;
    
    if (competitors.length > 0) {
      highestTcoVendor = competitors.reduce((prev, current) => {
        return resultsData.vendors[prev.id].totalTco > resultsData.vendors[current.id].totalTco ? prev : current;
      });
    }
    
    const savingsAmount = highestTcoVendor ? 
      resultsData.vendors[highestTcoVendor.id].totalTco - portnoxResults.totalTco : 0;
    
    const savingsPercentage = highestTcoVendor ? 
      Math.round((savingsAmount / resultsData.vendors[highestTcoVendor.id].totalTco) * 100) : 0;
    
    return [
      {
        text: 'Strategic Overview',
        style: 'header2'
      },
      {
        text: [
          'This report presents a comprehensive analysis of the Total Cost of Ownership (TCO) and Return on Investment (ROI) for ',
          { text: portnoxVendor.name, bold: true },
          ' compared to other Network Access Control (NAC) solutions. The analysis was performed for an organization with ',
          { text: `${userConfig.deviceCount.toLocaleString()} devices`, bold: true },
          ' over a period of ',
          { text: `${userConfig.years} years`, bold: true },
          '.'
        ],
        margin: [0, 0, 0, 10]
      },
      {
        text: 'Key Findings',
        style: 'header3',
        margin: [0, 10, 0, 5]
      },
      {
        // Create a 2x2 grid of key metrics
        columns: [
          {
            width: '50%',
            stack: [
              { text: 'Total 3-Year Savings', bold: true, fontSize: 12 },
              { text: `$${savingsAmount.toLocaleString()}`, fontSize: 16, color: '#1a5a96', bold: true },
              { text: `${savingsPercentage}% reduction vs. ${highestTcoVendor ? highestTcoVendor.name : 'competitors'}`, fontSize: 10 },
              { text: ' ', margin: [0, 5, 0, 5] }
            ]
          },
          {
            width: '50%',
            stack: [
              { text: 'Return on Investment', bold: true, fontSize: 12 },
              { text: `${Math.round(portnoxRoi.roiPercentage)}%`, fontSize: 16, color: '#2ecc71', bold: true },
              { text: `3-year ROI`, fontSize: 10 },
              { text: ' ', margin: [0, 5, 0, 5] }
            ]
          },
          {
            width: '50%',
            stack: [
              { text: 'Payback Period', bold: true, fontSize: 12 },
              { text: `${Math.round(portnoxRoi.paybackPeriod)} months`, fontSize: 16, color: '#f39c12', bold: true },
              { text: 'Time to positive ROI', fontSize: 10 },
              { text: ' ', margin: [0, 5, 0, 5] }
            ]
          },
          {
            width: '50%',
            stack: [
              { text: 'Security Improvement', bold: true, fontSize: 12 },
              { text: `${Math.round(portnoxSecurity.improvements.overall)}%`, fontSize: 16, color: '#e74c3c', bold: true },
              { text: 'Overall security posture enhancement', fontSize: 10 },
              { text: ' ', margin: [0, 5, 0, 5] }
            ]
          }
        ],
        margin: [0, 0, 0, 20]
      },
      {
        text: 'TCO Comparison',
        style: 'header3'
      },
      {
        // TCO comparison table
        table: {
          headerRows: 1,
          widths: ['*', '*', '*'],
          body: [
            [
              { text: 'Vendor', style: 'tableHeader' },
              { text: `${userConfig.years}-Year TCO`, style: 'tableHeader' },
              { text: 'Savings vs. Portnox', style: 'tableHeader' }
            ],
            ...vendors.map(vendor => {
              const vendorTco = resultsData.vendors[vendor.id].totalTco;
              const savings = vendorTco - portnoxResults.totalTco;
              const savingsPct = Math.round((savings / vendorTco) * 100);
              
              return [
                { text: vendor.name, style: vendor.id === 'portnox' ? 'highlightCell' : 'tableCell' },
                { text: `$${vendorTco.toLocaleString()}`, style: vendor.id === 'portnox' ? 'highlightCell' : 'tableCell' },
                { 
                  text: vendor.id === 'portnox' ? 'Baseline' : 
                        (savings > 0 ? `$${savings.toLocaleString()} (${savingsPct}%)` : 'No savings'),
                  style: vendor.id === 'portnox' ? 'highlightCell' : 'tableCell'
                }
              ];
            })
          ]
        },
        margin: [0, 5, 0, 20]
      },
      {
        text: 'Key Strategic Benefits',
        style: 'header3'
      },
      {
        ul: [
          { 
            text: [
              { text: 'Cloud-Native Solution: ', bold: true },
              'Zero infrastructure costs, automatic updates, and global scalability'
            ]
          },
          { 
            text: [
              { text: 'Rapid Deployment: ', bold: true },
              `${Math.round((1 - (portnoxResults.implementation.time / 90)) * 100)}% faster implementation than traditional on-premises alternatives`
            ]
          },
          { 
            text: [
              { text: 'Zero Trust Security: ', bold: true },
              'Comprehensive, continuous device authentication and verification'
            ]
          },
          { 
            text: [
              { text: 'Future-Proof Solution: ', bold: true },
              'Automatic updates, continuous innovation, and AI-powered security'
            ]
          },
          { 
            text: [
              { text: 'Operational Efficiency: ', bold: true },
              `Reduced IT staff time allocation by up to ${Math.round((1 - (portnoxVendor.fte.required / 1.5)) * 100)}% compared to traditional solutions`
            ]
          }
        ],
        margin: [0, 5, 0, 20]
      }
    ];
  }
  
  /**
   * Create financial analysis content
   */
  createFinancialAnalysis(resultsData, userConfig, vendors) {
    // Implementation for financial analysis section
    return [
      {
        text: 'Cost Analysis Overview',
        style: 'header2'
      },
      // Rest of financial analysis content
    ];
  }
  
  /**
   * Create security analysis content
   */
  createSecurityAnalysis(resultsData, userConfig, vendors) {
    // Implementation for security analysis section
    return [
      {
        text: 'Security Posture Analysis',
        style: 'header2'
      },
      // Rest of security analysis content
    ];
  }
  
  /**
   * Create technical analysis content
   */
  createTechnicalAnalysis(resultsData, userConfig, vendors) {
    // Implementation for technical analysis section
    return [
      {
        text: 'Architecture & Technical Capabilities',
        style: 'header2'
      },
      // Rest of technical analysis content
    ];
  }
  
  /**
   * Create configuration details
   */
  createConfigurationDetails(userConfig) {
    // Implementation for configuration details
    return [
      {
        text: 'Analysis Configuration',
        style: 'header2'
      },
      // Rest of configuration details
    ];
  }
}

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ReportGenerator };
}

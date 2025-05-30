/**
 * Enhanced Report Generator for Portnox Total Cost Analyzer
 * Creates beautiful, comprehensive PDF reports with charts and analysis
 */

class EnhancedReportGenerator {
  constructor(config = {}) {
    this.config = {
      fileName: 'Portnox_TCO_Analysis_Report.pdf',
      pageSize: 'a4',
      pageOrientation: 'portrait',
      pageMargins: [40, 60, 40, 60],
      enableCharts: true,
      addWatermark: false,
      companyLogo: null,
      ...config
    };
    
    // Set up chart capturing functionality
    this.setupChartCapturing();
  }
  
  /**
   * Set up chart capturing for adding to PDF
   */
  setupChartCapturing() {
    // Setup chart to image conversion if html2canvas is available
    this.canCaptureCharts = typeof html2canvas !== 'undefined';
    
    if (!this.canCaptureCharts) {
      console.warn('html2canvas not available, charts will not be included in PDF report');
    }
  }
  
  /**
   * Generate a PDF report from the TCO analysis results
   */
  generateReport(resultsData, userConfig, selectedVendors) {
    console.log('Generating enhanced PDF report...');
    
    // Capture charts first if enabled
    if (this.config.enableCharts && this.canCaptureCharts) {
      return this.captureCharts()
        .then(chartImages => {
          // Create document with chart images
          const docDefinition = this.createDocDefinition(resultsData, userConfig, selectedVendors, chartImages);
          return this.generatePDF(docDefinition);
        });
    } else {
      // Create document without charts
      const docDefinition = this.createDocDefinition(resultsData, userConfig, selectedVendors);
      return this.generatePDF(docDefinition);
    }
  }
  
  /**
   * Capture charts from the page
   */
  captureCharts() {
    // Find all chart containers
    const chartContainers = document.querySelectorAll('.chart-wrapper');
    const chartPromises = [];
    
    // Capture each chart as an image
    chartContainers.forEach(container => {
      if (container.id) {
        const chartPromise = html2canvas(container, {
          scale: 2, // Higher resolution
          backgroundColor: null, // Transparent background
          logging: false,
          useCORS: true // For external images
        }).then(canvas => {
          return {
            id: container.id,
            data: canvas.toDataURL('image/png')
          };
        }).catch(error => {
          console.error(`Error capturing chart ${container.id}:`, error);
          return null;
        });
        
        chartPromises.push(chartPromise);
      }
    });
    
    return Promise.all(chartPromises).then(results => {
      // Filter out any failed captures
      return results.filter(result => result !== null);
    });
  }
  
  /**
   * Create document definition for pdfmake
   */
  createDocDefinition(resultsData, userConfig, selectedVendors, chartImages = []) {
    const vendors = selectedVendors.map(id => VENDORS[id]);
    const currentDate = new Date().toLocaleDateString();
    
    // Build document content
    const content = [
      // Cover page
      this.createCoverPage(resultsData, currentDate),
      
      // Table of Contents
      this.createTableOfContents(),
      
      // Executive Summary
      this.createExecutiveSummary(resultsData, userConfig, vendors, chartImages),
      
      // Financial Analysis
      this.createFinancialAnalysis(resultsData, userConfig, vendors, chartImages),
      
      // Security & Compliance
      this.createSecurityAnalysis(resultsData, userConfig, vendors, chartImages),
      
      // Technical Comparison
      this.createTechnicalAnalysis(resultsData, userConfig, vendors, chartImages),
      
      // Appendix: Configuration Details
      this.createConfigurationDetails(userConfig)
    ];
    
    // Create document definition
    return {
      info: {
        title: 'Portnox TCO Analysis Report',
        author: 'Portnox',
        subject: 'Network Access Control Total Cost of Ownership Analysis',
        keywords: 'NAC, TCO, ROI, Portnox, Zero Trust'
      },
      pageSize: this.config.pageSize,
      pageOrientation: this.config.pageOrientation,
      pageMargins: this.config.pageMargins,
      footer: function(currentPage, pageCount) {
        return {
          text: `Page ${currentPage} of ${pageCount}`,
          alignment: 'center',
          margin: [0, 10, 0, 0],
          fontSize: 9,
          color: '#666666'
        };
      },
      header: function(currentPage) {
        if (currentPage === 1) return null; // No header on cover page
        
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
              fontSize: 9,
              color: '#666666'
            }
          ]
        };
      },
      content: content,
      styles: this.getDocumentStyles(),
      defaultStyle: {
        fontSize: 10,
        color: '#333333'
      }
    };
  }
  
  /**
   * Generate the PDF from the document definition
   */
  generatePDF(docDefinition) {
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
   * Create cover page content
   */
  createCoverPage(resultsData, currentDate) {
    return {
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
    };
  }
  
  /**
   * Create table of contents
   */
  createTableOfContents() {
    return {
      toc: {
        title: { text: 'Table of Contents', style: 'header1' }
      },
      pageBreak: 'after'
    };
  }
  
  /**
   * Create executive summary content
   */
  createExecutiveSummary(resultsData, userConfig, vendors, chartImages) {
    // Add implementation for executive summary section
    // ...
    
    return {
      stack: [
        { text: 'Executive Summary', style: 'header1', tocItem: true },
        // Executive summary content
      ],
      pageBreak: 'after'
    };
  }
  
  /**
   * Create financial analysis content
   */
  createFinancialAnalysis(resultsData, userConfig, vendors, chartImages) {
    // Add implementation for financial analysis section
    // ...
    
    return {
      stack: [
        { text: 'Financial Analysis', style: 'header1', tocItem: true },
        // Financial analysis content
      ],
      pageBreak: 'after'
    };
  }
  
  /**
   * Create security analysis content
   */
  createSecurityAnalysis(resultsData, userConfig, vendors, chartImages) {
    // Add implementation for security analysis section
    // ...
    
    return {
      stack: [
        { text: 'Security & Compliance Analysis', style: 'header1', tocItem: true },
        // Security analysis content
      ],
      pageBreak: 'after'
    };
  }
  
  /**
   * Create technical analysis content
   */
  createTechnicalAnalysis(resultsData, userConfig, vendors, chartImages) {
    // Add implementation for technical analysis section
    // ...
    
    return {
      stack: [
        { text: 'Technical Comparison', style: 'header1', tocItem: true },
        // Technical analysis content
      ],
      pageBreak: 'after'
    };
  }
  
  /**
   * Create configuration details
   */
  createConfigurationDetails(userConfig) {
    // Add implementation for configuration details section
    // ...
    
    return {
      stack: [
        { text: 'Appendix: Configuration Details', style: 'header1', tocItem: true },
        // Configuration details content
      ]
    };
  }
  
  /**
   * Get document styles
   */
  getDocumentStyles() {
    return {
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
    };
  }
}

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EnhancedReportGenerator };
} else {
  // Global access
  window.EnhancedReportGenerator = EnhancedReportGenerator;
}

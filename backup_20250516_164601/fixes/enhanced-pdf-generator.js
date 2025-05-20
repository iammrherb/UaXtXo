/**
 * Enhanced PDF Generator
 * Creates professional PDF reports with headers, footers, and comprehensive content
 */
(function() {
  console.log('Applying PDF generator enhancements...');
  
  // Fix original PDF generator if it exists
  function fixPDFGenerator() {
    if (window.PDFReportGenerator && window.PDFReportGenerator.prototype.generateCompleteReport) {
      // Store original method
      const originalGenerateCompleteReport = window.PDFReportGenerator.prototype.generateCompleteReport;
      
      // Override to fix orgSize undefined issue
      window.PDFReportGenerator.prototype.generateCompleteReport = function(data) {
        console.log('Running enhanced PDF report generation...');
        
        // Make sure data exists
        data = data || {};
        
        // Make sure orgSize is defined
        if (!data.orgSize) {
          data.orgSize = this.organizationData?.size || 'medium';
        }
        
        // Make sure it's applied to the PDF generator itself
        this.orgSize = data.orgSize || 'medium';
        
        // Make sure other potentially undefined properties exist
        data.vendorData = data.vendorData || window.vendorData || {};
        data.calculationResults = data.calculationResults || window.calculationResults || {};
        data.comparisonResults = data.comparisonResults || window.comparisonResults || {};
        
        // Call original method with fixed data
        return originalGenerateCompleteReport.call(this, data);
      };
      
      console.log('Fixed original PDF generator');
    }
  }
  
  // Create enhanced PDF generator
  function createEnhancedPDFGenerator() {
    // Only create if jsPDF is available
    if (!window.jsPDF) {
      console.warn('jsPDF not available, skipping enhanced PDF generator');
      return;
    }
    
    // Create EnhancedPDFGenerator class
    window.EnhancedPDFGenerator = function() {
      this.margins = {
        top: 30,
        bottom: 30,
        left: 20,
        right: 20
      };
      
      this.colors = {
        primary: [27, 103, 178],   // #1B67B2
        accent: [43, 210, 91],     // #2BD25B
        text: [80, 80, 80],        // #505050
        light: [240, 240, 240]     // #F0F0F0
      };
      
      this.fonts = {
        header: {
          size: 22,
          style: 'bold'
        },
        subheader: {
          size: 16,
          style: 'bold'
        },
        normal: {
          size: 10,
          style: 'normal'
        },
        small: {
          size: 8,
          style: 'normal'
        }
      };
      
      this.currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
    
    // Method to generate professional PDF report
    window.EnhancedPDFGenerator.prototype.generateReport = function(reportType, data) {
      console.log('Generating enhanced PDF report...');
      
      // Create new document
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Set default font
      doc.setFont('helvetica');
      
      // Initialize variables
      this.doc = doc;
      this.pageWidth = doc.internal.pageSize.width;
      this.pageHeight = doc.internal.pageSize.height;
      this.contentWidth = this.pageWidth - this.margins.left - this.margins.right;
      this.currentY = this.margins.top;
      this.pageNumber = 1;
      
      // Data fallbacks
      data = data || {};
      data.organization = data.organization || {
        name: 'Your Organization',
        industry: 'General'
      };
      
      // Add report header on first page
      this.addReportHeader(reportType, data.organization);
      
      // Generate report content based on type
      switch (reportType) {
        case 'executive':
          this.generateExecutiveSummary(data);
          break;
        case 'financial':
          this.generateFinancialAnalysis(data);
          break;
        case 'technical':
          this.generateTechnicalComparison(data);
          break;
        case 'industry':
          this.generateIndustryCompliance(data);
          break;
        case 'complete':
          this.generateCompleteReport(data);
          break;
        default:
          this.generateCompleteReport(data);
      }
      
      // Add footer to all pages
      const totalPages = this.pageNumber;
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        this.addPageFooter(i, totalPages);
      }
      
      return doc;
    };
    
    // Method to add report header
    window.EnhancedPDFGenerator.prototype.addReportHeader = function(reportType, organization) {
      const doc = this.doc;
      
      // Add logo (placeholder rectangle)
      doc.setFillColor(27, 103, 178);
      doc.rect(this.margins.left, this.margins.top - 15, 40, 10, 'F');
      
      // Add report title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(this.fonts.header.size);
      doc.setTextColor(27, 103, 178);
      
      let title = 'NAC Total Cost Analysis';
      switch (reportType) {
        case 'executive':
          title = 'Executive Summary';
          break;
        case 'financial':
          title = 'Financial Analysis Report';
          break;
        case 'technical':
          title = 'Technical Comparison Report';
          break;
        case 'industry':
          title = 'Industry & Compliance Report';
          break;
        case 'complete':
          title = 'Complete NAC Analysis Report';
          break;
      }
      
      doc.text(title, this.pageWidth / 2, this.margins.top, { align: 'center' });
      
      // Add organization info and date
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(this.fonts.normal.size);
      doc.setTextColor(80, 80, 80);
      
      const orgName = organization.name || 'Your Organization';
      const orgIndustry = organization.industry || 'General';
      
      doc.text(`Organization: ${orgName}`, this.margins.left, this.margins.top + 10);
      doc.text(`Industry: ${orgIndustry}`, this.margins.left, this.margins.top + 15);
      doc.text(`Date: ${this.currentDate}`, this.pageWidth - this.margins.right, this.margins.top + 10, { align: 'right' });
      
      // Add horizontal line
      doc.setDrawColor(27, 103, 178);
      doc.setLineWidth(0.5);
      doc.line(this.margins.left, this.margins.top + 20, this.pageWidth - this.margins.right, this.margins.top + 20);
      
      // Update current Y position
      this.currentY = this.margins.top + 30;
    };
    
    // Method to add page footer
    window.EnhancedPDFGenerator.prototype.addPageFooter = function(currentPage, totalPages) {
      const doc = this.doc;
      
      // Add horizontal line
      doc.setDrawColor(27, 103, 178);
      doc.setLineWidth(0.5);
      doc.line(this.margins.left, this.pageHeight - this.margins.bottom - 10, this.pageWidth - this.margins.right, this.pageHeight - this.margins.bottom - 10);
      
      // Add page number
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(this.fonts.small.size);
      doc.setTextColor(80, 80, 80);
      doc.text(`Page ${currentPage} of ${totalPages}`, this.pageWidth - this.margins.right, this.pageHeight - this.margins.bottom, { align: 'right' });
      
      // Add copyright
      doc.text('© 2025 Portnox. All rights reserved.', this.margins.left, this.pageHeight - this.margins.bottom);
    };
    
    // Method to check if we need a new page
    window.EnhancedPDFGenerator.prototype.checkAndAddNewPage = function(minSpace) {
      minSpace = minSpace || 30;
      
      if (this.currentY + minSpace > this.pageHeight - this.margins.bottom - 10) {
        this.doc.addPage();
        this.pageNumber++;
        this.currentY = this.margins.top;
        return true;
      }
      
      return false;
    };
    
    // Method to add section title
    window.EnhancedPDFGenerator.prototype.addSectionTitle = function(title) {
      this.checkAndAddNewPage(20);
      
      const doc = this.doc;
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(this.fonts.subheader.size);
      doc.setTextColor(27, 103, 178);
      doc.text(title, this.margins.left, this.currentY);
      
      // Add underline
      doc.setDrawColor(43, 210, 91);
      doc.setLineWidth(0.5);
      const titleWidth = doc.getTextWidth(title);
      doc.line(this.margins.left, this.currentY + 1, this.margins.left + titleWidth, this.currentY + 1);
      
      this.currentY += 10;
    };
    
    // Method to add paragraph
    window.EnhancedPDFGenerator.prototype.addParagraph = function(text, options) {
      options = options || {};
      
      const doc = this.doc;
      
      // Set up text style
      doc.setFont('helvetica', options.bold ? 'bold' : 'normal');
      doc.setFontSize(options.fontSize || this.fonts.normal.size);
      doc.setTextColor(...(options.color || this.colors.text));
      
      // Split text into multiple lines
      const textLines = doc.splitTextToSize(text, this.contentWidth);
      
      // Check if we need a new page
      this.checkAndAddNewPage(textLines.length * 5 + 5);
      
      // Add text
      doc.text(textLines, this.margins.left, this.currentY);
      
      // Update current Y position
      this.currentY += textLines.length * 5 + 5;
    };
    
    // Method to add list
    window.EnhancedPDFGenerator.prototype.addList = function(items, options) {
      options = options || {};
      
      const doc = this.doc;
      
      // Set up text style
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(options.fontSize || this.fonts.normal.size);
      doc.setTextColor(...(options.color || this.colors.text));
      
      // Track bullet point and item spacing
      const bulletSpace = 4;
      const itemSpacing = 5;
      
      // Add each list item
      items.forEach((item, index) => {
        // Split item text into multiple lines with bullet indent
        const maxWidth = this.contentWidth - bulletSpace - 2;
        const itemLines = doc.splitTextToSize(item, maxWidth);
        
        // Check if we need a new page
        this.checkAndAddNewPage(itemLines.length * 5 + (index < items.length - 1 ? itemSpacing : 0));
        
        // Add bullet point
        doc.setFont('helvetica', 'bold');
        doc.text('•', this.margins.left, this.currentY);
        
        // Add item text
        doc.setFont('helvetica', 'normal');
        doc.text(itemLines, this.margins.left + bulletSpace, this.currentY);
        
        // Update current Y position
        this.currentY += itemLines.length * 5 + (index < items.length - 1 ? itemSpacing : 0);
      });
      
      // Add extra space after list
      this.currentY += 5;
    };
    
    // Method to add comparison table
    window.EnhancedPDFGenerator.prototype.addComparisonTable = function(headers, rows) {
      const doc = this.doc;
      
      // Check if we have headers and rows
      if (!headers || !headers.length || !rows || !rows.length) {
        return;
      }
      
      // Calculate column widths
      const tableWidth = this.contentWidth;
      const colWidth = tableWidth / headers.length;
      
      // Table styling
      const startY = this.currentY;
      const rowHeight = 10;
      const cellPadding = 2;
      
      // Add header row
      doc.setFillColor(...this.colors.primary);
      doc.rect(
        this.margins.left,
        startY,
        tableWidth,
        rowHeight,
        'F'
      );
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(this.fonts.normal.size);
      doc.setTextColor(255, 255, 255);
      
      headers.forEach((header, index) => {
        const x = this.margins.left + index * colWidth + cellPadding;
        const y = startY + rowHeight - cellPadding;
        
        doc.text(header, x, y);
      });
      
      // Add data rows
      let currentRowY = startY + rowHeight;
      
      rows.forEach((row, rowIndex) => {
        // Check if we need a new page
        if (currentRowY + rowHeight > this.pageHeight - this.margins.bottom - 10) {
          doc.addPage();
          this.pageNumber++;
          currentRowY = this.margins.top;
          
          // Redraw header on new page
          doc.setFillColor(...this.colors.primary);
          doc.rect(
            this.margins.left,
            currentRowY,
            tableWidth,
            rowHeight,
            'F'
          );
          
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(this.fonts.normal.size);
          doc.setTextColor(255, 255, 255);
          
          headers.forEach((header, index) => {
            const x = this.margins.left + index * colWidth + cellPadding;
            const y = currentRowY + rowHeight - cellPadding;
            
            doc.text(header, x, y);
          });
          
          currentRowY += rowHeight;
        }
        
        // Draw row background
        doc.setFillColor(rowIndex % 2 === 0 ? 255 : 245, rowIndex % 2 === 0 ? 255 : 245, rowIndex % 2 === 0 ? 255 : 245);
        doc.rect(
          this.margins.left,
          currentRowY,
          tableWidth,
          rowHeight,
          'F'
        );
        
        // Draw row data
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(this.fonts.normal.size);
        doc.setTextColor(...this.colors.text);
        
        row.forEach((cell, cellIndex) => {
          const x = this.margins.left + cellIndex * colWidth + cellPadding;
          const y = currentRowY + rowHeight - cellPadding;
          
          doc.text(String(cell), x, y);
        });
        
        currentRowY += rowHeight;
      });
      
      // Update current Y position
      this.currentY = currentRowY + 5;
    };
    
    // Method to add simple chart (placeholder)
    window.EnhancedPDFGenerator.prototype.addChart = function(title, description) {
      const doc = this.doc;
      
      // Check if we need a new page
      this.checkAndAddNewPage(50);
      
      // Add chart title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(this.fonts.normal.size);
      doc.setTextColor(...this.colors.primary);
      doc.text(title, this.margins.left, this.currentY);
      
      this.currentY += 5;
      
      // Add chart description if provided
      if (description) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(this.fonts.small.size);
        doc.setTextColor(...this.colors.text);
        
        const descLines = doc.splitTextToSize(description, this.contentWidth);
        doc.text(descLines, this.margins.left, this.currentY);
        
        this.currentY += descLines.length * 4 + 2;
      }
      
      // Add chart placeholder
      doc.setFillColor(240, 240, 240);
      doc.roundedRect(this.margins.left, this.currentY, this.contentWidth, 40, 2, 2, 'F');
      
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(this.fonts.normal.size);
      doc.setTextColor(150, 150, 150);
      doc.text('Chart: ' + title, this.pageWidth / 2, this.currentY + 20, { align: 'center' });
      
      this.currentY += 45;
    };
    
    // Method to generate executive summary
    window.EnhancedPDFGenerator.prototype.generateExecutiveSummary = function(data) {
      // Add executive overview
      this.addSectionTitle('Executive Overview');
      
      this.addParagraph(
        'This analysis compares Portnox Cloud, a cloud-native Network Access Control (NAC) solution, with traditional on-premises NAC alternatives. The results demonstrate significant cost savings, implementation advantages, and operational benefits with Portnox Cloud.',
        { fontSize: 11 }
      );
      
      // Add key metrics
      this.addSectionTitle('Key Metrics Comparison');
      
      const keyMetrics = [
        'TCO Reduction: 25% lower 3-year total cost of ownership',
        'Implementation: 80% faster deployment time',
        'IT Resources: 60% reduced administrative overhead',
        'ROI Timeline: Average time to positive ROI of 9 months'
      ];
      
      this.addList(keyMetrics);
      
      // Add chart
      this.addChart('Cost Comparison Chart', 'Comparison of 3-year TCO between Portnox Cloud and on-premises NAC solutions.');
      
      // Add vendor comparison
      this.addSectionTitle('Cloud vs. On-Premises Comparison');
      
      const comparisonTable = {
        headers: ['Feature', 'On-Premises NAC', 'Portnox Cloud', 'Advantage'],
        rows: [
          ['Hardware Requirements', 'Dedicated appliances', 'No hardware required', 'Portnox'],
          ['Implementation Time', 'Weeks to months', 'Hours to days', 'Portnox'],
          ['IT Staff Requirements', '1.5-2 FTE', '0.5 FTE', 'Portnox'],
          ['Updates & Maintenance', 'Manual, scheduled', 'Automatic, continuous', 'Portnox'],
          ['Multi-Site Deployment', 'Hardware per location', 'Single cloud instance', 'Portnox'],
          ['Scalability', 'Hardware-dependent', 'Unlimited', 'Portnox']
        ]
      };
      
      this.addComparisonTable(comparisonTable.headers, comparisonTable.rows);
      
      // Add recommendation
      this.addSectionTitle('Executive Recommendation');
      
      this.addParagraph(
        'Based on comprehensive analysis of total cost of ownership, implementation requirements, and operational benefits, Portnox Cloud represents the optimal NAC solution for most organizations today.',
        { bold: true }
      );
      
      this.addParagraph(
        'With 25% lower TCO over 3 years, 80% faster implementation, and 60% reduced administrative overhead, Portnox Cloud delivers compelling financial and operational advantages over traditional on-premises alternatives.',
        { fontSize: 11 }
      );
      
      this.addParagraph(
        'The cloud-native architecture eliminates hardware requirements, simplifies multi-site deployment, and provides automatic updates and unlimited scalability, positioning organizations for greater security and agility in today\'s rapidly evolving network environments.',
        { fontSize: 11 }
      );
    };
    
    // Method to generate financial analysis
    window.EnhancedPDFGenerator.prototype.generateFinancialAnalysis = function(data) {
      // Add TCO overview
      this.addSectionTitle('Total Cost of Ownership Analysis');
      
      this.addParagraph(
        'This section provides a comprehensive analysis of all direct and indirect costs associated with NAC solutions over a 3-year period.',
        { fontSize: 11 }
      );
      
      // Add TCO chart
      this.addChart('TCO Comparison', '3-year TCO comparison between Portnox Cloud and leading on-premises NAC solutions.');
      
      // Add TCO breakdown
      this.addSectionTitle('Detailed Cost Breakdown');
      
      const costFactorsTable = {
        headers: ['Cost Category', 'Portnox Cloud', 'On-Premises NAC', 'Savings'],
        rows: [
          ['Hardware', '$0', '$50,000', '$50,000'],
          ['Software/Subscription', '$65,000', '$50,000', '-$15,000'],
          ['Implementation', '$15,000', '$30,000', '$15,000'],
          ['Maintenance', '$5,000', '$15,000', '$10,000'],
          ['Personnel', '$50,000', '$100,000', '$50,000'],
          ['Total (3 Years)', '$135,000', '$245,000', '$110,000']
        ]
      };
      
      this.addComparisonTable(costFactorsTable.headers, costFactorsTable.rows);
      
      // Add ROI analysis
      this.addSectionTitle('Return on Investment Analysis');
      
      this.addParagraph(
        'Portnox Cloud provides a significantly faster return on investment compared to traditional on-premises NAC solutions. The average organization achieves positive ROI within 9 months of deploying Portnox Cloud, compared to 24+ months for on-premises alternatives.',
        { fontSize: 11 }
      );
      
      // Add ROI chart
      this.addChart('ROI Timeline', 'Comparison of ROI timelines between Portnox Cloud and on-premises NAC solutions.');
      
      // Add savings breakdown
      this.addSectionTitle('Savings Analysis');
      
      const savingsFactors = [
        'Hardware Elimination: Complete elimination of hardware costs, including initial purchase, refresh cycles, and ongoing maintenance.',
        'Implementation Efficiency: 80% reduction in implementation time and resources, with deployment completed in days instead of months.',
        'Maintenance Reduction: Automatic updates and zero maintenance requirements eliminate ongoing maintenance costs and IT overhead.',
        'Personnel Optimization: 60% reduction in administrative overhead, freeing IT resources for strategic initiatives.',
        'Operational Improvements: Simplified management, automatic updates, and cloud-based architecture reduce operational complexity and costs.'
      ];
      
      this.addList(savingsFactors);
      
      // Add savings chart
      this.addChart('Savings Projection', '5-year cumulative savings projection.');
    };
    
    // Method to generate technical comparison
    window.EnhancedPDFGenerator.prototype.generateTechnicalComparison = function(data) {
      // Add technical overview
      this.addSectionTitle('Technical Capabilities Comparison');
      
      this.addParagraph(
        'This section provides a detailed comparison of technical features and capabilities between Portnox Cloud and leading on-premises NAC solutions.',
        { fontSize: 11 }
      );
      
      // Add feature comparison table
      const featureTable = {
        headers: ['Feature', 'Portnox Cloud', 'Cisco ISE', 'Aruba ClearPass', 'Forescout'],
        rows: [
          ['Deployment Model', 'Cloud-Native', 'On-Premises', 'On-Premises', 'On-Premises'],
          ['802.1X Authentication', 'Yes', 'Yes', 'Yes', 'Yes'],
          ['Zero Hardware Footprint', 'Yes', 'No', 'No', 'No'],
          ['Multi-Cloud Identity', 'Yes', 'Limited', 'Limited', 'Limited'],
          ['Zero-Trust Architecture', 'Yes', 'Partial', 'Partial', 'Partial'],
          ['Automatic Updates', 'Yes', 'No', 'No', 'No'],
          ['Agentless', 'Yes', 'Partial', 'Partial', 'Yes'],
          ['Global Access', 'Yes', 'Complex', 'Complex', 'Complex'],
          ['API-First Architecture', 'Yes', 'Partial', 'Partial', 'Partial'],
          ['High Availability', 'Built-in', 'Complex', 'Complex', 'Complex']
        ]
      };
      
      this.addComparisonTable(featureTable.headers, featureTable.rows);
      
      // Add architecture comparison
      this.addSectionTitle('Architecture Comparison');
      
      this.addParagraph(
        'Portnox Cloud Architecture: Cloud-native architecture with zero hardware footprint, built on containerized microservices for maximum resilience, scalability, and performance. Includes multi-tier security, global availability, and automatic scaling to handle peak loads without manual intervention.',
        { fontSize: 11 }
      );
      
      this.addParagraph(
        'On-Premises Architecture: Hardware-based architecture relying on dedicated appliances deployed at each location, with complex multi-component design requiring multiple servers for different functions. Requires manual redundancy configuration and has limited scalability based on hardware capacity.',
        { fontSize: 11 }
      );
      
      // Add implementation comparison
      this.addSectionTitle('Implementation Comparison');
      
      // Add implementation chart
      this.addChart('Implementation Timeline Comparison', 'Comparison of implementation timelines between Portnox Cloud and on-premises NAC solutions.');
      
      const implementationTable = {
        headers: ['Implementation Phase', 'Portnox Cloud', 'On-Premises NAC'],
        rows: [
          ['Hardware Deployment', '0 days', '14 days'],
          ['Software Installation', '1 day', '7 days'],
          ['Initial Configuration', '2 days', '14 days'],
          ['Policy Development', '3 days', '21 days'],
          ['Testing', '2 days', '14 days'],
          ['Production Rollout', '2 days', '20 days'],
          ['Total Implementation', '10 days', '90 days']
        ]
      };
      
      this.addComparisonTable(implementationTable.headers, implementationTable.rows);
      
      // Add maintenance comparison
      this.addSectionTitle('Ongoing Maintenance & Operations');
      
      const maintenanceFactors = [
        'Updates & Patches: Portnox Cloud provides automatic updates without downtime or IT involvement, while on-premises solutions require scheduled maintenance windows and dedicated resources.',
        'Hardware Maintenance: Portnox Cloud eliminates hardware monitoring, maintenance, and troubleshooting, while on-premises solutions require continuous hardware oversight and periodic hardware refresh.',
        'Policy Management: Portnox Cloud offers simplified policy management through an intuitive web interface, while on-premises solutions typically require specialized expertise for policy configuration.',
        'High Availability: Portnox Cloud includes built-in redundancy and automatic failover, while on-premises solutions require complex clustering and potential manual intervention during failures.',
        'Scaling: Portnox Cloud scales automatically without capacity planning, while on-premises solutions require hardware forecasting and additional appliance deployment for scaling.'
      ];
      
      this.addList(maintenanceFactors);
    };
    
    // Method to generate industry compliance report
    window.EnhancedPDFGenerator.prototype.generateIndustryCompliance = function(data) {
      // Get industry data
      let industryId = data.organization?.industry?.toLowerCase() || 'general';
      industryId = industryId === 'healthcare' ? 'healthcare' :
                 industryId === 'financial' || industryId === 'finance' || industryId === 'banking' ? 'financial' :
                 industryId === 'education' || industryId === 'edu' ? 'education' :
                 industryId === 'government' || industryId === 'gov' ? 'government' :
                 industryId === 'manufacturing' || industryId === 'mfg' ? 'manufacturing' : 'healthcare';
      
      // Define industry data (abbreviated version)
      const industryData = {
        healthcare: {
          name: "Healthcare",
          description: "Healthcare organizations face unique challenges in securing sensitive patient data while providing flexible access for clinical workflows across diverse device types.",
          compliance: [
            "HIPAA Security Rule: Requires implementation of technical safeguards to protect electronic protected health information (ePHI).",
            "HITECH Act: Strengthens HIPAA enforcement and adds additional security requirements.",
            "42 CFR Part 2: Governs confidentiality of substance use disorder patient records."
          ],
          challenges: [
            "Medical Device Security: Healthcare environments include numerous specialized medical devices with outdated operating systems, proprietary software, and limited security capabilities.",
            "Distributed Facilities: Healthcare organizations typically operate multiple facilities across different locations, from major hospitals to small clinics.",
            "Clinical Workflow Disruption: Healthcare operations are 24/7 with zero tolerance for disruption to clinical workflows or patient care systems.",
            "Compliance Documentation: Healthcare organizations face frequent audits requiring detailed documentation of security controls and compliance with regulations."
          ],
          solutions: [
            "Purpose-Built Medical Device Profiling: Portnox Cloud provides specialized profiling for medical devices, allowing secure integration of legacy medical equipment without disruption to clinical workflows.",
            "Zero-Hardware Multi-Site Management: Cloud-native architecture enables consistent policy enforcement across all healthcare facilities without hardware deployment at each location.",
            "Non-Disruptive Implementation: Phased, non-disruptive deployment model specifically designed for 24/7 healthcare environments with zero tolerance for clinical workflow interruption.",
            "Comprehensive Compliance Reporting: Built-in HIPAA and HITECH compliance reporting with detailed audit logs for all access control events."
          ]
        },
        financial: {
          name: "Financial Services",
          description: "Financial institutions must balance robust security with frictionless customer and employee experiences while meeting stringent regulatory requirements.",
          compliance: [
            "PCI DSS: Payment Card Industry Data Security Standard governs the security of payment card processing environments.",
            "GLBA: Gramm-Leach-Bliley Act requires financial institutions to protect customer information.",
            "SOX: Sarbanes-Oxley Act includes requirements for IT controls related to financial reporting.",
            "FFIEC Guidelines: Federal Financial Institutions Examination Council provides guidance on security and risk management."
          ],
          challenges: [
            "Branch Location Security: Financial institutions operate numerous branch locations that must maintain consistent security posture and policy enforcement.",
            "Third-Party Access Management: Financial services rely on numerous third-party vendors, consultants, and service providers requiring network access.",
            "Regulatory Compliance Complexity: Financial institutions must comply with multiple overlapping regulations with detailed requirements for access control and monitoring.",
            "Sophisticated Threat Landscape: Financial services face targeted attacks from sophisticated threat actors seeking financial gain or account access."
          ],
          solutions: [
            "Centralized Branch Security: Portnox Cloud provides unified security policy enforcement across all branch locations without requiring hardware deployment at each site.",
            "Advanced Third-Party Access Controls: Granular, time-limited access for contractors, auditors, and vendors with comprehensive activity monitoring and automatic revocation.",
            "Built-in Compliance Frameworks: Pre-built compliance templates for PCI-DSS, GLBA, SOX, and FFIEC with continuous monitoring and comprehensive reporting.",
            "Real-Time Risk Assessment: Continuous device assessment and authentication based on real-time risk scoring and anomaly detection."
          ]
        },
        education: {
          name: "Education",
          description: "Educational institutions face unique security challenges with diverse user populations, high device turnover, and open campus networks.",
          compliance: [
            "FERPA: Family Educational Rights and Privacy Act protects the privacy of student education records.",
            "COPPA: Children's Online Privacy Protection Act applies to K-12 environments with students under 13.",
            "CIPA: Children's Internet Protection Act applies to schools receiving E-Rate funding.",
            "State Privacy Laws: Various state laws provide additional protections for student data."
          ],
          challenges: [
            "High Device Turnover: Educational institutions experience significant device turnover at the beginning and end of academic terms.",
            "Diverse Device Types: Campus environments include a wide range of device types, operating systems, and security postures.",
            "Resource Constraints: Educational institutions typically operate with limited IT resources and security budgets.",
            "Open Network Philosophy: Academic environments value openness and accessibility, creating tension with security requirements."
          ],
          solutions: [
            "Streamlined Device Management: Self-service device registration and streamlined onboarding process designed for high-volume educational environments.",
            "Universal Device Support: Comprehensive support for all device types common in educational environments, including BYOD, lab computers, and IoT devices.",
            "Budget-Friendly Cloud Model: Subscription-based pricing with no hardware requirements to align with educational budget constraints.",
            "Flexible Security Framework: Adaptable security policies that support academic freedom while maintaining appropriate protections for sensitive data."
          ]
        },
        government: {
          name: "Government",
          description: "Government agencies require robust security controls with strict compliance requirements while supporting both modern and legacy systems.",
          compliance: [
            "FISMA: Federal Information Security Modernization Act establishes information security requirements for federal agencies.",
            "NIST 800-53: Provides security and privacy controls for federal information systems and organizations.",
            "CMMC: Cybersecurity Maturity Model Certification establishes cybersecurity standards for defense contractors.",
            "FedRAMP: Federal Risk and Authorization Management Program provides standardized security assessment for cloud services."
          ],
          challenges: [
            "Legacy System Support: Government environments often include legacy systems that must remain in service due to mission requirements.",
            "Complex Security Requirements: Government agencies face stringent security requirements with detailed documentation and compliance verification.",
            "Multi-Agency Collaboration: Government operations increasingly require secure collaboration across multiple agencies and departments.",
            "Budget and Procurement Cycles: Government agencies operate within structured procurement processes and budget cycles."
          ],
          solutions: [
            "Comprehensive Legacy Support: Specialized support for legacy systems common in government environments without requiring endpoint modifications.",
            "Built-in Compliance Framework: Pre-built compliance templates for FISMA, NIST, CMMC, and other government standards with comprehensive reporting.",
            "Cross-Agency Authentication: Secure authentication mechanisms for personnel requiring access across different agencies or departments.",
            "OpEx-Based Subscription Model: Subscription-based pricing aligned with government operational budgets rather than complex capital procurement."
          ]
        },
        manufacturing: {
          name: "Manufacturing",
          description: "Manufacturing environments must secure both IT and OT (Operational Technology) networks with zero tolerance for production disruption.",
          compliance: [
            "IEC 62443: Standard for security of industrial automation and control systems.",
            "NIST CSF: Cybersecurity Framework provides guidance for critical infrastructure security.",
            "ISO 27001: Information security management system standard applicable to manufacturing environments.",
            "Industry-Specific Regulations: Regulatory requirements specific to manufacturing sectors (automotive, pharmaceuticals, etc.)."
          ],
          challenges: [
            "OT/IT Convergence: Modern manufacturing environments include both operational technology and information technology networks with different security requirements.",
            "Legacy Industrial Equipment: Manufacturing environments include specialized industrial equipment with proprietary protocols and limited security capabilities.",
            "Production Availability Requirements: Manufacturing operations require continuous availability with zero tolerance for production disruptions.",
            "Supply Chain Integration: Manufacturing operations increasingly require network integration with suppliers and partners."
          ],
          solutions: [
            "Specialized OT Security: Dedicated OT device profiling with separate security policies for industrial systems to maintain production integrity.",
            "Legacy Protocol Support: Protocol-agnostic identification and profiling of legacy industrial devices without requiring agents or modifications.",
            "Non-Disruptive Implementation: Zero-impact deployment model designed specifically for production-critical manufacturing environments.",
            "Secure Supply Chain Access: Granular, time-limited access for suppliers and partners with comprehensive activity monitoring."
          ]
        }
      };
      
      const industry = industryData[industryId] || industryData.healthcare;
      
      // Add industry overview
      this.addSectionTitle(`${industry.name} Industry Overview`);
      
      this.addParagraph(industry.description, { fontSize: 11 });
      
      // Add compliance requirements
      this.addSectionTitle('Compliance Requirements');
      
      this.addList(industry.compliance);
      
      // Add industry challenges
      this.addSectionTitle('Industry Challenges');
      
      this.addList(industry.challenges);
      
      // Add Portnox solutions
      this.addSectionTitle('Portnox Solutions');
      
      this.addList(industry.solutions);
      
      // Add industry metrics
      this.addSectionTitle('Industry Metrics & Benchmarks');
      
      // Add metrics chart
      this.addChart('Industry TCO Comparison', `Average TCO comparison for ${industry.name} organizations adopting cloud vs. on-premises NAC solutions.`);
      
      // Add implementation metrics
      this.addParagraph(
        `${industry.name} organizations implementing Portnox Cloud have experienced an average of 30-40% reduction in TCO over 3 years, 75-85% faster implementation timelines, and 50-65% reduction in IT administrative overhead compared to traditional on-premises NAC solutions.`,
        { fontSize: 11 }
      );
      
      // Add success story
      this.addSectionTitle(`${industry.name} Success Story`);
      
      this.addParagraph(
        `A ${industry.name.toLowerCase()} organization with multiple locations and diverse device types implemented Portnox Cloud to address their unique security and compliance requirements. The organization achieved full deployment across all locations in under two weeks, reduced their total cost of ownership by 38% compared to their previous solution, and significantly improved their security posture and compliance reporting capabilities.`,
        { fontSize: 11 }
      );
      
      const successMetrics = [
        '38% reduction in TCO over 3 years',
        'Implementation completed in 12 days vs. estimated 90+ days for on-premises alternative',
        'Reduction from 1.8 FTE to 0.6 FTE for NAC administration',
        '100% compliance with industry regulations',
        'Zero disruption to critical systems during implementation'
      ];
      
      this.addList(successMetrics);
    };
    
    // Method to generate complete report
    window.EnhancedPDFGenerator.prototype.generateCompleteReport = function(data) {
      // Add executive summary section
      this.generateExecutiveSummary(data);
      
      // Add page break
      this.doc.addPage();
      this.pageNumber++;
      this.currentY = this.margins.top;
      
      // Add financial analysis section
      this.generateFinancialAnalysis(data);
      
      // Add page break
      this.doc.addPage();
      this.pageNumber++;
      this.currentY = this.margins.top;
      
      // Add technical comparison section
      this.generateTechnicalComparison(data);
      
      // Add page break
      this.doc.addPage();
      this.pageNumber++;
      this.currentY = this.margins.top;
      
      // Add industry compliance section
      this.generateIndustryCompliance(data);
    };
    
    console.log('Enhanced PDF Generator created successfully');
  }
  
  // Fix original PDF generator
  fixPDFGenerator();
  
  // Create enhanced PDF generator
  createEnhancedPDFGenerator();
  
  // Add UI controls for enhanced PDF generation
  function addPDFControls() {
    // Find export buttons container
    const exportContainer = document.querySelector('.export-options');
    if (!exportContainer) return;
    
    // Create enhanced export button
    const enhancedButton = document.createElement('button');
    enhancedButton.id = 'export-enhanced-pdf-btn';
    enhancedButton.className = 'btn btn-outline';
    enhancedButton.innerHTML = '<i class="fas fa-file-pdf"></i> Enhanced PDF Report';
    
    // Add to container
    exportContainer.appendChild(enhancedButton);
    
    // Add click handler
    enhancedButton.addEventListener('click', function() {
      // Create export options dropdown
      const dropdown = document.createElement('div');
      dropdown.className = 'export-dropdown';
      dropdown.style.position = 'absolute';
      dropdown.style.backgroundColor = 'white';
      dropdown.style.border = '1px solid #ddd';
      dropdown.style.borderRadius = '4px';
      dropdown.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      dropdown.style.padding = '10px';
      dropdown.style.zIndex = '1000';
      dropdown.style.right = '20px';
      dropdown.style.top = enhancedButton.offsetTop + enhancedButton.offsetHeight + 'px';
      
      // Add report type options
      dropdown.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 8px;">Select Report Type</div>
        <div class="export-option" data-type="executive" style="padding: 8px; cursor: pointer; border-radius: 4px;">
          <i class="fas fa-chart-pie" style="margin-right: 8px; color: #1B67B2;"></i> Executive Summary
        </div>
        <div class="export-option" data-type="financial" style="padding: 8px; cursor: pointer; border-radius: 4px;">
          <i class="fas fa-dollar-sign" style="margin-right: 8px; color: #1B67B2;"></i> Financial Analysis
        </div>
        <div class="export-option" data-type="technical" style="padding: 8px; cursor: pointer; border-radius: 4px;">
          <i class="fas fa-tools" style="margin-right: 8px; color: #1B67B2;"></i> Technical Comparison
        </div>
        <div class="export-option" data-type="industry" style="padding: 8px; cursor: pointer; border-radius: 4px;">
          <i class="fas fa-building" style="margin-right: 8px; color: #1B67B2;"></i> Industry & Compliance
        </div>
        <div class="export-option" data-type="complete" style="padding: 8px; cursor: pointer; border-radius: 4px;">
          <i class="fas fa-file-pdf" style="margin-right: 8px; color: #1B67B2;"></i> Complete Report
        </div>
      `;
      
      // Add to DOM
      document.body.appendChild(dropdown);
      
      // Add hover effect
      const options = dropdown.querySelectorAll('.export-option');
      options.forEach(option => {
        option.addEventListener('mouseenter', function() {
          this.style.backgroundColor = 'rgba(27, 103, 178, 0.1)';
        });
        
        option.addEventListener('mouseleave', function() {
          this.style.backgroundColor = 'transparent';
        });
        
        // Add click handler
        option.addEventListener('click', function() {
          const reportType = this.getAttribute('data-type');
          generateEnhancedPDF(reportType);
          dropdown.remove();
        });
      });
      
      // Close dropdown when clicking outside
      const closeDropdown = function(event) {
        if (!dropdown.contains(event.target) && event.target !== enhancedButton) {
          dropdown.remove();
          document.removeEventListener('click', closeDropdown);
        }
      };
      
      // Add click listener with a delay to prevent immediate triggering
      setTimeout(() => {
        document.addEventListener('click', closeDropdown);
      }, 100);
    });
  }
  
  // Function to generate enhanced PDF
  function generateEnhancedPDF(reportType) {
    console.log(`Generating enhanced PDF report: ${reportType}`);
    
    // Check if EnhancedPDFGenerator exists
    if (!window.EnhancedPDFGenerator) {
      console.warn('EnhancedPDFGenerator not available');
      
      // Use original PDF generator if available
      if (window.UIController && typeof window.UIController.exportToPDF === 'function') {
        window.UIController.exportToPDF();
      }
      
      return;
    }
    
    // Create generator instance
    const generator = new window.EnhancedPDFGenerator();
    
    // Gather data for report
    const data = {
      organization: {
        name: document.getElementById('organization-name')?.value || 'Your Organization',
        industry: document.getElementById('industry-selector')?.value || 'General'
      },
      calculationResults: window.calculationResults || {},
      comparisonResults: window.comparisonResults || {}
    };
    
    // Generate PDF
    const pdf = generator.generateReport(reportType, data);
    
    // Save PDF
    const filename = `${reportType}-nac-analysis-report.pdf`;
    pdf.save(filename);
  }
  
  // Add UI controls with a delay to ensure DOM is ready
  setTimeout(addPDFControls, 2000);
  
  console.log('PDF Generator enhancements applied successfully');
})();

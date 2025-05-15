/**
 * Report Generator for Portnox Total Cost Analyzer
 * Handles PDF export functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize export button
  const exportBtn = document.getElementById('export-pdf');
  if (exportBtn) {
    exportBtn.addEventListener('click', generateReport);
  }
});

/**
 * Generate PDF report based on current view
 */
function generateReport() {
  // Check if jsPDF is available
  if (typeof jspdf === 'undefined' || typeof jspdf.jsPDF === 'undefined') {
    showToast('PDF generation library not loaded. Please try again later.', 'error');
    return;
  }
  
  // Show loading indicator
  showLoading('Generating your report...');
  
  // Get current view
  const currentView = window.AppState?.currentView || 'executive';
  
  // Get view title
  const viewTitle = getViewTitle(currentView);
  
  // Create PDF document
  const { jsPDF } = jspdf;
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });
  
  // Set up document properties
  doc.setProperties({
    title: `Portnox TCO Analysis - ${viewTitle} Report`,
    subject: 'Total Cost Analysis',
    author: 'Portnox',
    keywords: 'TCO, ROI, NAC, Zero Trust',
    creator: 'Portnox Total Cost Analyzer'
  });
  
  // Add header
  addReportHeader(doc, viewTitle);
  
  // Add report content based on view type
  switch (currentView) {
    case 'executive':
      addExecutiveReport(doc);
      break;
    case 'financial':
      addFinancialReport(doc);
      break;
    case 'security':
      addSecurityReport(doc);
      break;
    case 'technical':
      addTechnicalReport(doc);
      break;
    default:
      addExecutiveReport(doc);
  }
  
  // Add footer with pagination
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    addReportFooter(doc, i, pageCount);
  }
  
  // Generate timestamp for filename
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
  
  // Save the PDF
  setTimeout(() => {
    try {
      doc.save(`portnox-tco-analysis-${currentView}-${timestamp}.pdf`);
      hideLoading();
      showToast('Report generated successfully!', 'success');
    } catch (error) {
      console.error('Error generating PDF:', error);
      hideLoading();
      showToast('Error generating report. Please try again.', 'error');
    }
  }, 1000);
}

/**
 * Get view title based on view ID
 */
function getViewTitle(viewId) {
  switch (viewId) {
    case 'executive': return 'Executive';
    case 'financial': return 'Financial';
    case 'security': return 'Security & Compliance';
    case 'technical': return 'Technical';
    default: return 'Executive';
  }
}

/**
 * Add report header
 */
function addReportHeader(doc, viewTitle) {
  // Add logo
  try {
    // Try to get logo from the page
    const logoImg = document.querySelector('.company-logo');
    if (logoImg && logoImg.complete && logoImg.naturalHeight !== 0) {
      const canvas = document.createElement('canvas');
      canvas.width = logoImg.naturalWidth;
      canvas.height = logoImg.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(logoImg, 0, 0);
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 15, 10, 30, 15);
    }
  } catch (error) {
    console.warn('Could not add logo:', error);
  }
  
  // Title
  doc.setFontSize(24);
  doc.setTextColor(21, 101, 192); // Primary blue
  doc.text('Zero Trust Total Cost Analyzer', 50, 20);
  
  // Subtitle
  doc.setFontSize(16);
  doc.setTextColor(51, 51, 51);
  doc.text(`${viewTitle} Report`, 50, 30);
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor(102, 102, 102);
  doc.text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 210, 20, { align: 'right' });
  
  // Configuration summary
  doc.setFontSize(10);
  doc.setTextColor(102, 102, 102);
  
  // Get configuration values
  const deviceCount = window.AppState?.params?.deviceCount || '500';
  const years = window.AppState?.params?.yearsToProject || '3';
  const industry = window.AppState?.params?.industry || 'Not specified';
  
  doc.text(`Configuration: ${deviceCount} devices, ${years} years analysis period, Industry: ${industry}`, 210, 30, { align: 'right' });
  
  // Divider line
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(10, 35, 287, 35);
}

/**
 * Add report footer
 */
function addReportFooter(doc, currentPage, pageCount) {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  // Footer line
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(10, pageHeight - 10, pageWidth - 10, pageHeight - 10);
  
  // Copyright and page number
  doc.setFontSize(9);
  doc.setTextColor(102, 102, 102);
  doc.text('© 2025 Portnox. All rights reserved.', 10, pageHeight - 5);
  doc.text(`Page ${currentPage} of ${pageCount}`, pageWidth - 20, pageHeight - 5);
}

/**
 * Add executive report content
 */
function addExecutiveReport(doc) {
  // Get calculated results
  const results = window.AppState?.calculatedResults;
  
  // Title
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Executive Summary', 10, 45);
  
  // Summary text
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51);
  doc.text('This analysis compares the total cost of ownership (TCO) and return on investment (ROI) for different Network Access Control (NAC) solutions.', 10, 55);
  doc.text('Portnox Cloud offers a cloud-native approach that eliminates hardware costs and reduces operational overhead.', 10, 61);
  
  // Key metrics section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Key Metrics', 10, 70);
  
  // Get metric values
  const totalSavings = document.getElementById('total-savings')?.textContent || '$247,000';
  const savingsPercentage = document.getElementById('savings-percentage')?.textContent || '48% reduction vs. Cisco ISE';
  const paybackPeriod = document.getElementById('payback-period')?.textContent || '7 months';
  const implementationTime = document.getElementById('implementation-time')?.textContent || '21 days';
  const roi = document.getElementById('three-year-roi')?.textContent || '287%';
  
  // Draw metrics table
  const metricsData = [
    ['Metric', 'Value', 'Benefit'],
    ['Total Cost Savings', totalSavings, 'Direct financial benefit over analysis period'],
    ['Savings Percentage', savingsPercentage, 'Percentage reduction compared to leading alternative'],
    ['Implementation Time', implementationTime, 'Time to full deployment'],
    ['Payback Period', paybackPeriod, 'Time to positive return on investment'],
    ['Return on Investment', roi, '3-year ROI percentage']
  ];
  
  doc.autoTable({
    startY: 75,
    head: [metricsData[0]],
    body: metricsData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 50, halign: 'center' },
      2: { cellWidth: 'auto' }
    }
  });
  
  // TCO chart
  try {
    const tcoChart = document.getElementById('tco-comparison-chart');
    if (tcoChart) {
      const imgData = tcoChart.toDataURL('image/png');
      const currentY = doc.lastAutoTable.finalY + 15;
      
      doc.setFontSize(14);
      doc.setTextColor(21, 101, 192);
      doc.text('TCO Comparison', 10, currentY);
      
      doc.addImage(imgData, 'PNG', 10, currentY + 5, 130, 75);
      
      // Add chart explanation
      doc.setFontSize(10);
      doc.setTextColor(51, 51, 51);
      doc.text('The chart above compares the total cost of ownership across years for selected vendors.', 150, currentY + 20);
      doc.text('Portnox Cloud shows significantly lower costs due to elimination of hardware,', 150, currentY + 28);
      doc.text('reduced implementation complexity, and lower operational overhead.', 150, currentY + 36);
    }
  } catch (error) {
    console.warn('Could not add TCO chart:', error);
  }
  
  // Add a new page
  doc.addPage();
  
  // Strategic Benefits
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Strategic Benefits', 10, 45);
  
  const benefitsData = [
    ['Benefit', 'Description', 'Business Impact'],
    ['Cloud-Native Architecture', 'Zero infrastructure costs and automatic updates', 'Eliminates capital expenditures and reduces IT burden'],
    ['Rapid Deployment', '75% faster implementation than on-premises', 'Accelerates time-to-security and reduces project costs'],
    ['Zero Trust Security', 'Continuous device authentication and verification', 'Reduces breach risk and improves compliance posture'],
    ['Operational Efficiency', 'Minimal IT staff time required for management', 'Frees up resources for strategic initiatives'],
    ['Automatic Updates', 'Always running the latest version', 'Eliminates upgrade projects and security patch concerns'],
    ['Global Scalability', 'Easily scales to support organization growth', 'Future-proofs your investment and grows with your needs']
  ];
  
  doc.autoTable({
    startY: 50,
    head: [benefitsData[0]],
    body: benefitsData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [0, 200, 83], // Secondary green
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 80 },
      2: { cellWidth: 'auto' }
    }
  });
  
  // Recommendations
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Recommendations', 10, doc.lastAutoTable.finalY + 20);
  
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51);
  doc.text([
    '1. Move forward with Portnox Cloud for best TCO and fastest time-to-value',
    '2. Implement in phases, starting with critical segments of your network',
    '3. Take advantage of cloud-native capabilities for remote and distributed workforce',
    '4. Leverage automatic updates to maintain security posture',
    '5. Utilize compliance reporting to support audit requirements'
  ], 10, doc.lastAutoTable.finalY + 30);
  
  // Next steps
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Next Steps', 10, doc.lastAutoTable.finalY + 70);
  
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51);
  doc.text([
    '• Request a live demonstration to see Portnox in action',
    '• Schedule a technical deep dive with our solution architects',
    '• Begin a proof of concept with a limited device set',
    '• Develop a phased implementation plan',
    '• Engage with our customer success team for deployment best practices'
  ], 10, doc.lastAutoTable.finalY + 80);
}

/**
 * Add financial report content
 */
function addFinancialReport(doc) {
  // Get calculated results
  const results = window.AppState?.calculatedResults;
  
  // Financial analysis title
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Financial Analysis', 10, 45);
  
  // Summary text
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51);
  doc.text('This report provides a detailed financial analysis of NAC solutions, focusing on cost components, ROI, and long-term financial impact.', 10, 55);
  
  // TCO Breakdown section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('TCO Breakdown', 10, 65);
  
  // Get TCO values
  const portnoxTco = document.getElementById('portnox-tco')?.textContent || '$202,500';
  const competitorTco = document.getElementById('tco-comparison')?.textContent?.replace('vs. ', '') || '$450,000 (Cisco ISE)';
  
  // Create TCO breakdown table
  const tcoData = [
    ['Cost Component', 'Portnox Cloud', 'On-Premises NAC', 'Savings'],
    ['Hardware', '$0', '$175,000', '$175,000'],
    ['Software/Subscription', '$180,000', '$120,000', '-$60,000'],
    ['Implementation', '$15,500', '$75,000', '$59,500'],
    ['Maintenance & Support', '$0', '$70,000', '$70,000'],
    ['IT Staff Time', '$22,500', '$120,000', '$97,500'],
    ['Total 3-Year TCO', portnoxTco, competitorTco.split(' ')[0], formatCurrency(parseFloat(competitorTco.split(' ')[0].replace(/[$,]/g, '')) - parseFloat(portnoxTco.replace(/[$,]/g, '')))]
  ];
  
  doc.autoTable({
    startY: 70,
    head: [tcoData[0]],
    body: tcoData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 40, halign: 'right' },
      2: { cellWidth: 40, halign: 'right' },
      3: { cellWidth: 40, halign: 'right' }
    },
    bodyStyles: {
      lineColor: [220, 220, 220]
    },
    didParseCell: function(data) {
      // Highlight the total row
      if (data.row.index === tcoData.length - 2) {
        data.cell.styles.fontStyle = 'bold';
        if (data.column.index === 0) {
          data.cell.styles.fillColor = [240, 240, 240];
        }
      }
      
      // Highlight savings (either positive or negative)
      if (data.column.index === 3 && data.row.index > 0) {
        if (data.cell.raw.startsWith('-')) {
          data.cell.styles.textColor = [221, 53, 11]; // Red for negative savings
        } else {
          data.cell.styles.textColor = [0, 200, 83]; // Green for positive savings
        }
      }
    }
  });
  
  // ROI Analysis
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('ROI Analysis', 10, doc.lastAutoTable.finalY + 20);
  
  // Get metric values
  const roi = document.getElementById('three-year-roi')?.textContent || '287%';
  const paybackPeriod = document.getElementById('payback-period')?.textContent || '7 months';
  
  // Create ROI table
  const roiData = [
    ['Metric', 'Value', 'Description'],
    ['Initial Investment', '$45,000', 'First 3 months of subscription plus implementation'],
    ['Annual Benefits', '$114,000', 'Annual cost savings vs. on-premises alternatives'],
    ['3-Year ROI', roi, 'Return on investment over analysis period'],
    ['Payback Period', paybackPeriod, 'Time to recoup initial investment'],
    ['Net Present Value (NPV)', '$275,000', 'Present value of future benefits minus costs (5% discount rate)'],
    ['Internal Rate of Return (IRR)', '250%', 'Annualized effective return rate']
  ];
  
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 25,
    head: [roiData[0]],
    body: roiData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [0, 200, 83], // Secondary green for ROI section
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 40, halign: 'center' },
      2: { cellWidth: 'auto' }
    }
  });
  
  // Cash Flow Analysis
  doc.addPage();
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Cash Flow Analysis', 10, 45);
  
  // Cash flow table
  const cashFlowData = [
    ['Period', 'Investment', 'Benefits', 'Net Cash Flow', 'Cumulative'],
    ['Initial', '$45,000', '$0', '-$45,000', '-$45,000'],
    ['Year 1', '$45,000', '$114,000', '$69,000', '$24,000'],
    ['Year 2', '$45,000', '$114,000', '$69,000', '$93,000'],
    ['Year 3', '$45,000', '$114,000', '$69,000', '$162,000']
  ];
  
  doc.autoTable({
    startY: 50,
    head: [cashFlowData[0]],
    body: cashFlowData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 30, halign: 'right' },
      2: { cellWidth: 30, halign: 'right' },
      3: { cellWidth: 30, halign: 'right' },
      4: { cellWidth: 30, halign: 'right' }
    },
    didParseCell: function(data) {
      // Highlight negative values
      if ((data.column.index === 3 || data.column.index === 4) && 
          data.cell.raw && data.cell.raw.startsWith('-')) {
        data.cell.styles.textColor = [221, 53, 11]; // Red
      }
      
      // Highlight positive values
      if ((data.column.index === 3 || data.column.index === 4) && 
          data.cell.raw && !data.cell.raw.startsWith('-') && data.row.index > 0) {
        data.cell.styles.textColor = [0, 200, 83]; // Green
      }
    }
  });
  
  // Try to add cash flow chart if available
  try {
    const cumChartCanvas = document.getElementById('cumulative-cost-chart');
    if (cumChartCanvas) {
      const imgData = cumChartCanvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, doc.lastAutoTable.finalY + 15, 130, 75);
      
      // Add explanation
      doc.setFontSize(11);
      doc.setTextColor(51, 51, 51);
      doc.text('The chart shows cumulative costs over time. The difference between', 150, doc.lastAutoTable.finalY + 30);
      doc.text('the lines represents your total savings over the analysis period.', 150, doc.lastAutoTable.finalY + 38);
    }
  } catch (error) {
    console.warn('Could not add cumulative chart:', error);
  }
  
  // Sensitivity Analysis
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Sensitivity Analysis', 10, doc.lastAutoTable.finalY + 100);
  
  // Sensitivity table showing how ROI changes with different parameters
  const sensitivityData = [
    ['Parameter', 'Low Value', 'Base Value', 'High Value', 'Impact on ROI'],
    ['Device Count', '300', '500', '1,000', 'Medium Positive'],
    ['Subscription Cost', '$4.50/device', '$3.00/device', '$1.50/device', 'High Positive'],
    ['Implementation Days', '30 days', '21 days', '14 days', 'Low Positive'],
    ['FTE Allocation', '40%', '25%', '10%', 'Medium Positive'],
    ['Analysis Period', '1 year', '3 years', '5 years', 'High Positive']
  ];
  
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 105,
    head: [sensitivityData[0]],
    body: sensitivityData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    }
  });
}

/**
 * Add security report content
 */
function addSecurityReport(doc) {
  // Security analysis title
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Security & Compliance Analysis', 10, 45);
  
  // Summary text
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51);
  doc.text([
    'This report evaluates the security and compliance capabilities of Portnox Cloud compared to alternative NAC solutions.',
    'It highlights key security improvements, compliance coverage, and risk reduction metrics.'
  ], 10, 55);
  
  // Risk Reduction section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Security Risk Reduction', 10, 70);
  
  // Risk reduction metrics
  const riskReductionData = [
    ['Risk Category', 'Without NAC', 'With Portnox Cloud', 'Risk Reduction'],
    ['Unauthorized Access', 'High', 'Very Low', '85%'],
    ['Device Compliance', 'High', 'Low', '75%'],
    ['Lateral Movement', 'Very High', 'Low', '80%'],
    ['Malware Propagation', 'High', 'Low', '70%'],
    ['Data Exfiltration', 'Medium', 'Very Low', '65%'],
    ['Credential Theft', 'High', 'Low', '70%'],
    ['Overall Security Risk', 'High', 'Low', '75%']
  ];
  
  doc.autoTable({
    startY: 75,
    head: [riskReductionData[0]],
    body: riskReductionData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 40, halign: 'center' },
      2: { cellWidth: 40, halign: 'center' },
      3: { cellWidth: 40, halign: 'center' }
    },
    didParseCell: function(data) {
      // Format the risk levels with colors
      if (data.column.index === 1 && data.row.index >= 0) {
        if (data.cell.raw === 'Very High' || data.cell.raw === 'High') {
          data.cell.styles.textColor = [221, 53, 11]; // Red
        } else if (data.cell.raw === 'Medium') {
          data.cell.styles.textColor = [255, 171, 0]; // Orange
        } else if (data.cell.raw === 'Low') {
          data.cell.styles.textColor = [255, 171, 0]; // Yellow
        } else if (data.cell.raw === 'Very Low') {
          data.cell.styles.textColor = [0, 200, 83]; // Green
        }
      }
      
      if (data.column.index === 2 && data.row.index >= 0) {
        if (data.cell.raw === 'Very High' || data.cell.raw === 'High') {
          data.cell.styles.textColor = [221, 53, 11]; // Red
        } else if (data.cell.raw === 'Medium') {
          data.cell.styles.textColor = [255, 171, 0]; // Orange
        } else if (data.cell.raw === 'Low') {
          data.cell.styles.textColor = [255, 171, 0]; // Yellow
        } else if (data.cell.raw === 'Very Low') {
          data.cell.styles.textColor = [0, 200, 83]; // Green
        }
      }
      
      // Highlight total row
      if (data.row.index === riskReductionData.length - 2) {
        data.cell.styles.fontStyle = 'bold';
      }
    }
  });
  
  // Compliance Coverage section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Compliance Framework Coverage', 10, doc.lastAutoTable.finalY + 20);
  
  // Compliance coverage table
  const complianceData = [
    ['Compliance Framework', 'Portnox Cloud', 'Traditional NAC', 'No NAC'],
    ['PCI DSS', '95%', '75%', '30%'],
    ['HIPAA', '90%', '65%', '25%'],
    ['NIST 800-53', '95%', '80%', '35%'],
    ['ISO 27001', '90%', '70%', '30%'],
    ['GDPR', '85%', '60%', '20%'],
    ['SOX', '85%', '65%', '25%'],
    ['CMMC', '90%', '75%', '30%']
  ];
  
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 25,
    head: [complianceData[0]],
    body: complianceData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [0, 200, 83], // Green for compliance
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    bodyStyles: {
      halign: 'center'
    }
  });
  
  // Add a new page for security capabilities
  doc.addPage();
  
  // Security capabilities section
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Zero Trust Security Capabilities', 10, 45);
  
  // Security capabilities table
  const capabilitiesData = [
    ['Capability', 'Description', 'Security Impact'],
    ['Continuous Authentication', 'Validates device identity and posture on an ongoing basis', 'Prevents unauthorized access even after initial connection'],
    ['Device Posture Assessment', 'Checks device security status before and during access', 'Ensures only compliant devices can access resources'],
    ['Access Policy Enforcement', 'Applies granular controls based on user, device, and context', 'Limits access to only what is necessary (least privilege)'],
    ['Network Visibility', 'Complete inventory of all connected devices', 'Eliminates blind spots and rogue devices'],
    ['Automated Remediation', 'Automatic quarantine and remediation of non-compliant devices', 'Reduces mean time to respond to security issues'],
    ['Integration with Security Stack', 'Works with SIEM, EDR, and other security tools', 'Creates unified security posture and response'],
    ['Cloud Delivery Model', 'No on-premises infrastructure to maintain', 'Eliminates update/patch management security risks']
  ];
  
  doc.autoTable({
    startY: 50,
    head: [capabilitiesData[0]],
    body: capabilitiesData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 80 },
      2: { cellWidth: 'auto' }
    }
  });
  
  // Try to add security radar chart
  try {
    const riskChart = document.getElementById('risk-comparison-chart');
    if (riskChart) {
      const imgData = riskChart.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, doc.lastAutoTable.finalY + 15, 130, 75);
      
      // Add explanation
      doc.setFontSize(11);
      doc.setTextColor(51, 51, 51);
      doc.text('The radar chart illustrates security risk levels across different threat', 150, doc.lastAutoTable.finalY + 30);
      doc.text('categories. Lower values indicate lower risk exposure.', 150, doc.lastAutoTable.finalY + 38);
    }
  } catch (error) {
    console.warn('Could not add risk chart:', error);
  }
  
  // Business impact section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Business Impact of Improved Security', 10, doc.lastAutoTable.finalY + 100);
  
  // Business impact table
  const impactData = [
    ['Impact Area', 'Without NAC', 'With Portnox Cloud', 'Business Value'],
    ['Breach Probability', 'High (30%)', 'Low (7%)', 'Reduced risk exposure and potential losses'],
    ['Avg. Cost per Breach', '$150,000', '$45,000', 'Lower impact through faster containment'],
    ['Annual Loss Expectancy', '$45,000', '$3,150', 'Significant reduction in expected losses'],
    ['Insurance Premiums', 'Baseline', '10-15% reduction', 'Direct cost savings on premiums'],
    ['Compliance Penalties', 'High risk', 'Low risk', 'Avoid costly fines and remediation'],
    ['Productivity Impact', 'Significant', 'Minimal', 'Less business disruption from security events']
  ];
  
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 105,
    head: [impactData[0]],
    body: impactData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    }
  });
}

/**
 * Add technical report content
 */
function addTechnicalReport(doc) {
  // Technical analysis title
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Technical Analysis', 10, 45);
  
  // Summary text
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51);
  doc.text([
    'This report provides a detailed technical analysis of Portnox Cloud compared to traditional NAC solutions.',
    'It covers architecture, features, implementation, and integration capabilities.'
  ], 10, 55);
  
  // Architecture comparison section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Architecture Comparison', 10, 70);
  
  // Architecture comparison table
  const architectureData = [
    ['Component', 'Portnox Cloud', 'Traditional NAC'],
    ['Deployment Model', 'SaaS / Cloud-native', 'On-premises hardware/VMs'],
    ['Infrastructure', 'None required', 'Multiple servers and appliances'],
    ['High Availability', 'Built-in redundancy', 'Complex clustering setup required'],
    ['Scalability', 'Automatic and elastic', 'Hardware-dependent, complex'],
    ['Updates', 'Automatic and continuous', 'Manual upgrade projects'],
    ['Maintenance', 'Fully managed service', 'IT staff responsibility'],
    ['Geographic Distribution', 'Global cloud presence', 'Requires hardware at each site'],
    ['Disaster Recovery', 'Built-in, multiple regions', 'Requires separate DR solution'],
    ['Remote Access Support', 'Native capability', 'Additional components needed']
  ];
  
  doc.autoTable({
    startY: 75,
    head: [architectureData[0]],
    body: architectureData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 'auto' }
    }
  });
  
  // Feature comparison section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Feature Comparison', 10, doc.lastAutoTable.finalY + 20);
  
  // Feature comparison table
  const featureData = [
    ['Feature', 'Portnox Cloud', 'Traditional NAC'],
    ['802.1X Authentication', '✓ Full Support', '✓ Full Support'],
    ['MAC Authentication', '✓ Full Support', '✓ Full Support'],
    ['Agentless Operation', '✓ Full Support', '○ Limited Support'],
    ['BYOD Onboarding', '✓ Full Support', '✓ Full Support'],
    ['Guest Management', '✓ Full Support', '✓ Full Support'],
    ['IoT Authentication', '✓ Full Support', '○ Limited Support'],
    ['Device Posture Assessment', '✓ Full Support', '○ Limited Support'],
    ['Remote Access Support', '✓ Full Support', '○ Limited Support'],
    ['Multi-factor Authentication', '✓ Full Support', '○ Limited Support'],
    ['Cloud Identity Integration', '✓ Full Support', '○ Limited Support'],
    ['Zero Trust Architecture', '✓ Full Support', '✗ Not Supported'],
    ['API-First Architecture', '✓ Full Support', '○ Limited Support'],
    ['Cross-Platform Support', '✓ Full Support', '○ Limited Support']
  ];
  
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 25,
    head: [featureData[0]],
    body: featureData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 'auto' }
    }
  });
  
  // Add a new page
  doc.addPage();
  
  // Implementation comparison section
  doc.setFontSize(16);
  doc.setTextColor(21, 101, 192);
  doc.text('Implementation Analysis', 10, 45);
  
  // Implementation phases table
  const implementationData = [
    ['Phase', 'Portnox Cloud', 'Traditional NAC', 'Time Savings'],
    ['Planning', '1-2 days', '2-4 weeks', '85-90%'],
    ['Initial Setup', '1 day', '2-3 weeks', '90-95%'],
    ['Network Integration', '2-3 days', '3-4 weeks', '80-90%'],
    ['Policy Configuration', '1-2 days', '2-3 weeks', '85-90%'],
    ['Testing', '2-3 days', '2-3 weeks', '80-85%'],
    ['Training', '1 day', '1-2 weeks', '90-95%'],
    ['Pilot Deployment', '3-5 days', '2-4 weeks', '75-85%'],
    ['Full Deployment', '1-2 weeks', '4-8 weeks', '75-80%'],
    ['Total Implementation', '3-4 weeks', '4-6 months', '80-85%']
  ];
  
  doc.autoTable({
    startY: 50,
    head: [implementationData[0]],
    body: implementationData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    bodyStyles: {
      textColor: [51, 51, 51]
    },
    didParseCell: function(data) {
      // Highlight time savings column
      if (data.column.index === 3 && data.row.index > 0) {
        data.cell.styles.textColor = [0, 200, 83]; // Green
      }
      
      // Highlight total row
      if (data.row.index === implementationData.length - 2) {
        data.cell.styles.fontStyle = 'bold';
      }
    }
  });
  
  // Integration capabilities section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Integration Capabilities', 10, doc.lastAutoTable.finalY + 20);
  
  // Integration capabilities text
  doc.setFontSize(11);
  doc.setTextColor(51, 51, 51);
  doc.text([
    'Portnox Cloud offers comprehensive integration capabilities with your existing security and IT infrastructure:',
    '',
    '• Identity Providers: Active Directory, Azure AD, Okta, Google Workspace, and others',
    '• Network Infrastructure: All major switch, wireless, and VPN vendors',
    '• Security Tools: SIEM, EDR, SOAR platforms for automated incident response',
    '• Endpoint Management: Integration with MDM/EMM solutions',
    '• ServiceNow: Ticket creation and asset management integration',
    '• Custom Integrations: RESTful API for custom workflow development'
  ], 10, doc.lastAutoTable.finalY + 30);
  
  // Technical requirements section
  doc.setFontSize(14);
  doc.setTextColor(21, 101, 192);
  doc.text('Technical Requirements', 10, doc.lastAutoTable.finalY + 80);
  
  // Technical requirements table
  const requirementsData = [
    ['Requirement', 'Portnox Cloud', 'Traditional NAC'],
    ['Hardware', 'None', 'Multiple servers/appliances'],
    ['IT Expertise', 'Basic networking knowledge', 'Deep NAC expertise required'],
    ['Deployment Time', '3-4 weeks', '4-6 months'],
    ['Network Changes', 'Minimal', 'Significant'],
    ['Maintenance Effort', 'None (fully managed)', 'Regular updates/patches'],
    ['Training Requirements', 'Minimal (1 day)', 'Extensive (1-2 weeks)'],
    ['Scaling Effort', 'Automatic', 'Hardware procurement/setup']
  ];
  
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 85,
    head: [requirementsData[0]],
    body: requirementsData.slice(1),
    theme: 'grid',
    headStyles: {
      fillColor: [21, 101, 192],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    }
  });
}

/**
 * Helper function to format currency
 */
function formatCurrency(value) {
  if (typeof value === 'string') {
    // Try to parse the string as a number
    value = parseFloat(value.replace(/[$,]/g, ''));
    if (isNaN(value)) return '$0';
  }
  
  return 'classList.remove('fa-chevron-left');
        icon.classList.add('fa-chevron-right');
      }
    }
    
    // Toggle sidebar visibility
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
      
      // Adjust content area margin for desktop
      if (window.innerWidth >= 768) {
        if (sidebar.classList.contains('collapsed')) {
          contentArea.style.marginLeft = '0';
        } else {
          contentArea.style.marginLeft = '320px';
        }
      }
      
      // Update toggle icon
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        icon. + Math.round(value).toLocaleString();
}

/**
 * Show loading overlay
 */
function showLoading(message) {
  if (window.showLoading) {
    window.showLoading(message);
  } else {
    console.log(`LOADING: ${message}`);
  }
}

/**
 * Hide loading overlay
 */
function hideLoading() {
  if (window.hideLoading) {
    window.hideLoading();
  }
}

/**
 * Show toast notification
 */
function showToast(message, type) {
  if (window.showToast) {
    window.showToast(message, type);
  } else {
    console.log(`${type.toUpperCase()}: ${message}`);
  }
}

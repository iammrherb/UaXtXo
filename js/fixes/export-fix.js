/**
 * Export Functionality Fix
 * Implements PDF export for TCO reports
 */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const exportPdfButton = document.getElementById('export-pdf');
    
    if (exportPdfButton) {
      exportPdfButton.addEventListener('click', function() {
        generateTcoReport();
      });
    }
    
    // Generate TCO report in PDF format
    function generateTcoReport() {
      console.log("Generating TCO report...");
      
      // Show loading overlay
      const loadingOverlay = document.getElementById('loading-overlay');
      if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
      }
      
      // Get selected vendors
      const selectedVendors = Array.from(document.querySelectorAll('.vendor-card.selected'))
        .map(card => card.getAttribute('data-vendor'))
        .filter(Boolean);
      
      // Get calculation data
      const calculationData = window.getCalculatedData ? window.getCalculatedData() : {};
      
      // Get device count and years to project
      const deviceCount = document.getElementById('device-count').value || 500;
      const yearsToProject = document.getElementById('years-to-project').value || 3;
      
      // Create PDF using jsPDF
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // PDF dimensions
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      
      // Add header
      doc.setFontSize(22);
      doc.setTextColor(65, 184, 131);
      doc.text('Zero Trust Total Cost Analysis', margin, margin + 5);
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`Comparison of ${selectedVendors.length} NAC Solutions`, margin, margin + 12);
      
      // Add date and device count
      doc.setFontSize(10);
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, margin, margin + 18);
      doc.text(`Organization size: ${deviceCount} devices`, margin, margin + 23);
      doc.text(`Analysis period: ${yearsToProject} year${yearsToProject > 1 ? 's' : ''}`, margin, margin + 28);
      
      // Add Portnox logo
      // (This would be better with an actual image, but we'll create a text representation)
      doc.setFontSize(14);
      doc.setTextColor(65, 184, 131);
      doc.text('PORTNOX', pageWidth - margin - 30, margin + 10);
      
      // Draw a separator line
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.5);
      doc.line(margin, margin + 33, pageWidth - margin, margin + 33);
      
      // Section: TCO Summary
      let yPos = margin + 40;
      doc.setFontSize(16);
      doc.setTextColor(65, 184, 131);
      doc.text('Total Cost of Ownership Summary', margin, yPos);
      
      yPos += 10;
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      
      // Create TCO comparison table
      const tcoData = [];
      const headerRow = ['Vendor', 'Initial Cost', '3-Year TCO', 'Monthly Cost/Device', 'Implementation'];
      tcoData.push(headerRow);
      
      // Add data rows for each vendor
      selectedVendors.forEach(vendor => {
        const vendorCalc = calculationData[vendor];
        if (vendorCalc) {
          const vendorName = vendorCalc.name || vendor;
          const initialCost = formatCurrency(vendorCalc.initialCost);
          const totalTco = formatCurrency(vendorCalc.totalTco);
          const monthlyPerDevice = formatCurrency(vendorCalc.totalTco / (deviceCount * yearsToProject * 12));
          const implementationTime = vendor === 'portnox' ? '21 days' : 
                                    vendor === 'no-nac' ? 'N/A' : 
                                    '90-120 days';
          
          tcoData.push([vendorName, initialCost, totalTco, monthlyPerDevice, implementationTime]);
        }
      });
      
      // Draw the TCO table
      doc.autoTable({
        startY: yPos,
        head: [tcoData[0]],
        body: tcoData.slice(1),
        theme: 'grid',
        headStyles: {
          fillColor: [65, 184, 131],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        styles: {
          cellPadding: 3,
          fontSize: 10
        },
        columnStyles: {
          0: { fontStyle: 'bold' }
        }
      });
      
      yPos = doc.previousAutoTable.finalY + 15;
      
      // Section: ROI Analysis
      if (calculationData.roi) {
        doc.setFontSize(16);
        doc.setTextColor(65, 184, 131);
        doc.text('Return on Investment Analysis', margin, yPos);
        
        yPos += 10;
        
        // ROI metrics
        const roi = calculationData.roi;
        
        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
        doc.text(`3-Year ROI: ${Math.round(roi.roi)}%`, margin, yPos);
        doc.text(`Payback Period: ${roi.paybackPeriod} months`, margin, yPos + 5);
        doc.text(`Total Savings: ${formatCurrency(roi.savings)}`, margin, yPos + 10);
        doc.text(`Savings Percentage: ${Math.round(roi.savingsPercentage)}%`, margin, yPos + 15);
        
        // Value drivers table
        yPos += 25;
        doc.setFontSize(13);
        doc.setTextColor(65, 184, 131);
        doc.text('Value Drivers', margin, yPos);
        
        const valueDriversData = [
          ['Benefit Category', 'Description', 'Value'],
          ['Direct Cost Reduction', 'Hardware, licenses, and maintenance savings', formatCurrency(roi.valueDrivers.directCostReduction)],
          ['IT Staff Efficiency', 'Reduced admin time and management overhead', formatCurrency(roi.valueDrivers.itStaffEfficiency)],
          ['Breach Risk Reduction', 'Lower probability and impact of security incidents', formatCurrency(roi.valueDrivers.breachRiskReduction)],
          ['Compliance Automation', 'Streamlined audits and reporting', formatCurrency(roi.valueDrivers.complianceAutomation)],
          ['Insurance Premium Reduction', 'Lower cybersecurity insurance costs', formatCurrency(roi.valueDrivers.insurancePremiumReduction)]
        ];
        
        // Calculate total
        const totalValue = Object.values(roi.valueDrivers).reduce((sum, val) => sum + val, 0);
        valueDriversData.push(['Total Business Value', '', formatCurrency(totalValue)]);
        
        doc.autoTable({
          startY: yPos + 5,
          head: [valueDriversData[0]],
          body: valueDriversData.slice(1),
          theme: 'grid',
          headStyles: {
            fillColor: [65, 184, 131],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          styles: {
            cellPadding: 3,
            fontSize: 10
          },
          columnStyles: {
            0: { fontStyle: 'bold' }
          }
        });
        
        yPos = doc.previousAutoTable.finalY + 15;
      }
      
      // Add a new page if needed
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = margin;
      }
      
      // Section: Risk Assessment
      doc.setFontSize(16);
      doc.setTextColor(65, 184, 131);
      doc.text('Risk Assessment', margin, yPos);
      
      yPos += 10;
      
      // Risk metrics table
      const riskData = [['Metric', 'Portnox Cloud', 'Traditional NAC', 'No NAC']];
      
      // Get risk metrics for Portnox
      const portnoxRisk = calculationData.portnox?.riskAssessment || {
        securityPostureImprovement: 85,
        breachProbability: 'Low',
        complianceCoverage: 95,
        meanTimeToRespond: 45
      };
      
      // Default risk metrics for comparison
      const traditionalNacRisk = {
        securityPostureImprovement: 70,
        breachProbability: 'Medium',
        complianceCoverage: 80,
        meanTimeToRespond: 120
      };
      
      const noNacRisk = {
        securityPostureImprovement: 0,
        breachProbability: 'High',
        complianceCoverage: 20,
        meanTimeToRespond: 480
      };
      
      // Add risk metrics to table
      riskData.push(['Security Posture Improvement', 
        `${portnoxRisk.securityPostureImprovement}%`, 
        `${traditionalNacRisk.securityPostureImprovement}%`, 
        `${noNacRisk.securityPostureImprovement}%`]);
      
      riskData.push(['Breach Probability', 
        portnoxRisk.breachProbability, 
        traditionalNacRisk.breachProbability, 
        noNacRisk.breachProbability]);
      
      riskData.push(['Compliance Coverage', 
        `${portnoxRisk.complianceCoverage}%`, 
        `${traditionalNacRisk.complianceCoverage}%`, 
        `${noNacRisk.complianceCoverage}%`]);
      
      riskData.push(['Mean Time to Respond', 
        `${portnoxRisk.meanTimeToRespond} min`, 
        `${traditionalNacRisk.meanTimeToRespond} min`, 
        `${noNacRisk.meanTimeToRespond} min`]);
      
      doc.autoTable({
        startY: yPos,
        head: [riskData[0]],
        body: riskData.slice(1),
        theme: 'grid',
        headStyles: {
          fillColor: [65, 184, 131],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        styles: {
          cellPadding: 3,
          fontSize: 10
        },
        columnStyles: {
          0: { fontStyle: 'bold' }
        }
      });
      
      yPos = doc.previousAutoTable.finalY + 15;
      
      // Section: Key Advantages
      if (yPos > pageHeight - 70) {
        doc.addPage();
        yPos = margin;
      }
      
      doc.setFontSize(16);
      doc.setTextColor(65, 184, 131);
      doc.text('Key Advantages of Portnox Cloud', margin, yPos);
      
      yPos += 10;
      
      // Advantages list
      const advantages = [
        'Cloud-Native Architecture - No hardware investment or complex upgrades required',
        'Rapid Deployment - Implementation measured in days rather than months',
        'Zero Trust Security - Built from the ground up for modern security needs',
        'Lower TCO - Predictable subscription model eliminates hidden costs',
        'Remote Access Support - Cloud-native design enables secure access from anywhere',
        'Minimal FTE Requirements - Reduced management overhead and operational costs',
        'Automatic Updates - Always running the latest version with no manual upgrades',
        'Scalability - Easily scales with your organization\'s needs'
      ];
      
      doc.setFontSize(11);
      doc.setTextColor(60, 60, 60);
      
      advantages.forEach((advantage, index) => {
        doc.text(`• ${advantage}`, margin, yPos + (index * 6));
      });
      
      // Add footer
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.5);
      doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
      
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text('Generated by Portnox Total Cost Analyzer | www.portnox.com', margin, pageHeight - 10);
      doc.text('Page 1 of 1', pageWidth - margin - 15, pageHeight - 10);
      
      // Save the PDF
      doc.save('Portnox-TCO-Analysis.pdf');
      
      // Hide loading overlay
      if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
      }
      
      console.log("TCO report generated successfully");
    }
    
    // Format currency values for display
    function formatCurrency(value) {
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
      }).format(value);
    }
  });
})();

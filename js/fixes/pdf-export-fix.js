/**
 * PDF Export Fix
 * - Fixes issues with PDF generation
 * - Prevents ReferenceError: orgSize is not defined
 * - Improves export formatting
 */
(function() {
  // Execute on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing PDF export fixes...');
    
    // Check for PDFReportGenerator, wait if needed
    const checkPDFGenerator = setInterval(function() {
      if (typeof window.PDFReportGenerator !== 'undefined') {
        clearInterval(checkPDFGenerator);
        fixPDFGenerator();
      }
    }, 100);
    
    function fixPDFGenerator() {
      // Store the original generateTechnicalReport function
      const originalGenerateTechnicalReport = window.PDFReportGenerator.prototype.generateTechnicalReport;
      
      // Override with a fixed version
      window.PDFReportGenerator.prototype.generateTechnicalReport = function(doc, results, currentVendor) {
        try {
          const currentResults = results[currentVendor];
          const portnoxResults = results['portnox'];
          const yearsToProject = results.yearsToProject;
          const orgSize = results.orgSize || 'medium'; // Fix for orgSize undefined
          
          // Add title and header
          doc.setFontSize(20);
          doc.setTextColor(5, 84, 124); // Updated to Portnox blue
          doc.text('NAC Solution Technical Report', 105, 20, { align: 'center' });
          
          doc.setFontSize(12);
          doc.setTextColor(100, 100, 100); // Gray
          doc.text(`Comparing ${results[currentVendor].vendorName} vs. Portnox Cloud`, 105, 30, { align: 'center' });
          doc.text(`Generated ${new Date().toLocaleDateString()}`, 105, 38, { align: 'center' });
          
          // Add environment details
          doc.setFontSize(14);
          doc.setTextColor(5, 84, 124);
          doc.text('Environment Details', 20, 50);
          
          // Create environment table
          const envHeaders = ['Parameter', 'Value'];
          const envData = [
            ['Device Count', results.deviceCount],
            ['Organization Size', orgSize.charAt(0).toUpperCase() + orgSize.slice(1)],
            ['Multiple Locations', results.multipleLocations ? 'Yes' : 'No'],
            ['Location Count', results.locationCount],
            ['Complex Authentication', results.complexAuthentication ? 'Yes' : 'No'],
            ['Legacy Devices', results.legacyDevices ? 'Yes' : 'No'],
            ['Legacy Percentage', results.legacyPercentage + '%'],
            ['Cloud Integration', results.cloudIntegration ? 'Yes' : 'No'],
            ['Custom Policies', results.customPolicies ? 'Yes' : 'No'],
            ['Policy Complexity', results.policyComplexity ? 
              results.policyComplexity.charAt(0).toUpperCase() + results.policyComplexity.slice(1) : 'Medium']
          ];
          
          doc.autoTable({
            head: [envHeaders],
            body: envData,
            startY: 55,
            theme: 'plain',
            styles: {
              fontSize: 9
            },
            columnStyles: {
              0: { cellWidth: 60 },
              1: { cellWidth: 40 }
            }
          });
          
          // Continue with the rest of the report generation
          // Add implementation comparison
          doc.setFontSize(14);
          doc.setTextColor(5, 84, 124);
          doc.text('Implementation Comparison', 20, doc.autoTable.previous.finalY + 15);
          
          // Get implementation timeline data
          const vendorData = window.vendorData || {};
          const currentVendorData = vendorData[currentVendor] || {};
          const portnoxData = vendorData['portnox'] || {};
          
          let currentTimeline = {};
          let portnoxTimeline = {};
          
          if (currentVendorData && currentVendorData[orgSize] && currentVendorData[orgSize].implementationTimeline) {
            currentTimeline = currentVendorData[orgSize].implementationTimeline;
          }
          
          if (portnoxData && portnoxData[orgSize] && portnoxData[orgSize].implementationTimeline) {
            portnoxTimeline = portnoxData[orgSize].implementationTimeline;
          }
          
          // Prepare implementation table
          const implHeaders = ['Implementation Phase', currentResults.vendorName, 'Portnox Cloud', 'Time Savings'];
          const implData = [];
          
          // Combine all phase names
          const phases = new Set([
            ...Object.keys(currentTimeline),
            ...Object.keys(portnoxTimeline)
          ]);
          
          // Add data for each phase
          phases.forEach(phase => {
            const currentDays = currentTimeline[phase] || 0;
            const portnoxDays = portnoxTimeline[phase] || 0;
            const savings = currentDays - portnoxDays;
            
            implData.push([
              phase.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
              currentDays + ' days',
              portnoxDays + ' days',
              savings > 0 ? savings + ' days' : '-'
            ]);
          });
          
          // Add total row
          const currentTotal = Object.values(currentTimeline).reduce((a, b) => a + b, 0);
          const portnoxTotal = Object.values(portnoxTimeline).reduce((a, b) => a + b, 0);
          const totalSavings = currentTotal - portnoxTotal;
          
          implData.push([
            'Total Implementation Time',
            currentTotal + ' days',
            portnoxTotal + ' days',
            totalSavings > 0 ? totalSavings + ' days' : '-'
          ]);
          
          doc.autoTable({
            head: [implHeaders],
            body: implData,
            startY: doc.autoTable.previous.finalY + 20,
            theme: 'grid',
            headStyles: {
              fillColor: [5, 84, 124],
              textColor: [255, 255, 255],
              fontStyle: 'bold'
            },
            alternateRowStyles: {
              fillColor: [245, 245, 245]
            },
            styles: {
              cellPadding: 5
            },
            didParseCell: function(data) {
              // Highlight total row
              if (data.row.index === implData.length - 1) {
                data.cell.styles.fontStyle = 'bold';
                data.cell.styles.fillColor = [230, 230, 230];
              }
            }
          });
          
          // Add architecture comparison
          doc.addPage();
          
          doc.setFontSize(14);
          doc.setTextColor(5, 84, 124);
          doc.text('Architecture Comparison', 20, 20);
          
          // Create Cloud vs On-Premises comparison table
          const archHeaders = ['Feature', 'On-Premises NAC', 'Portnox Cloud'];
          
          const archData = [
            ['Deployment Model', 'Hardware appliances', 'SaaS solution, no hardware'],
            ['Initial Setup', '2-4 weeks typical setup time', 'Same-day deployment'],
            ['Redundancy', 'Requires additional hardware', 'Built-in cloud redundancy'],
            ['Updates & Patching', 'Manual update process', 'Automatic updates'],
            ['Scalability', 'Requires hardware sizing', 'Unlimited elastic scaling'],
            ['Multi-Location Support', 'Requires hardware at each site', 'Single cloud instance for all sites'],
            ['Remote Access', 'VPN or additional appliances', 'Native anywhere access'],
            ['Disaster Recovery', 'Requires separate DR site', 'Built-in geo-redundancy']
          ];
          
          doc.autoTable({
            head: [archHeaders],
            body: archData,
            startY: 25,
            theme: 'grid',
            headStyles: {
              fillColor: [5, 84, 124],
              textColor: [255, 255, 255],
              fontStyle: 'bold'
            },
            alternateRowStyles: {
              fillColor: [245, 245, 245]
            },
            columnStyles: {
              0: { cellWidth: 50 },
              1: { cellWidth: 70 },
              2: { cellWidth: 70 }
            },
            styles: {
              cellPadding: 5
            }
          });
          
          // Add IT resource utilization
          doc.setFontSize(14);
          doc.setTextColor(5, 84, 124);
          doc.text('IT Resource Utilization', 20, doc.autoTable.previous.finalY + 15);
          
          // Get FTE allocation with safety checks
          let currentFTE = {};
          let portnoxFTE = {};
          
          if (currentVendorData && currentVendorData[orgSize] && currentVendorData[orgSize].fteAllocation) {
            currentFTE = currentVendorData[orgSize].fteAllocation;
          }
          
          if (portnoxData && portnoxData[orgSize] && portnoxData[orgSize].fteAllocation) {
            portnoxFTE = portnoxData[orgSize].fteAllocation;
          }
          
          // Create FTE comparison table
          const fteHeaders = ['IT Role', currentResults.vendorName, 'Portnox Cloud', 'FTE Reduction'];
          
          const fteData = [
            ['Network Administrator',
              (currentFTE.networkAdmin || 0.5).toFixed(2) + ' FTE',
              (portnoxFTE.networkAdmin || 0.2).toFixed(2) + ' FTE',
              ((currentFTE.networkAdmin || 0.5) - (portnoxFTE.networkAdmin || 0.2)).toFixed(2) + ' FTE'
            ],
            ['Security Administrator',
              (currentFTE.securityAdmin || 0.4).toFixed(2) + ' FTE',
              (portnoxFTE.securityAdmin || 0.15).toFixed(2) + ' FTE',
              ((currentFTE.securityAdmin || 0.4) - (portnoxFTE.securityAdmin || 0.15)).toFixed(2) + ' FTE'
            ],
            ['System Administrator',
              (currentFTE.systemAdmin || 0.3).toFixed(2) + ' FTE',
              (portnoxFTE.systemAdmin || 0.05).toFixed(2) + ' FTE',
              ((currentFTE.systemAdmin || 0.3) - (portnoxFTE.systemAdmin || 0.05)).toFixed(2) + ' FTE'
            ],
            ['Help Desk',
              (currentFTE.helpDesk || 0.1).toFixed(2) + ' FTE',
              (portnoxFTE.helpDesk || 0.05).toFixed(2) + ' FTE',
              ((currentFTE.helpDesk || 0.1) - (portnoxFTE.helpDesk || 0.05)).toFixed(2) + ' FTE'
            ],
            ['Total IT Staff',
              ((currentFTE.networkAdmin || 0.5) + (currentFTE.securityAdmin || 0.4) +
               (currentFTE.systemAdmin || 0.3) + (currentFTE.helpDesk || 0.1)).toFixed(2) + ' FTE',
              ((portnoxFTE.networkAdmin || 0.2) + (portnoxFTE.securityAdmin || 0.15) +
               (portnoxFTE.systemAdmin || 0.05) + (portnoxFTE.helpDesk || 0.05)).toFixed(2) + ' FTE',
              (((currentFTE.networkAdmin || 0.5) + (currentFTE.securityAdmin || 0.4) +
                (currentFTE.systemAdmin || 0.3) + (currentFTE.helpDesk || 0.1)) -
               ((portnoxFTE.networkAdmin || 0.2) + (portnoxFTE.securityAdmin || 0.15) +
                (portnoxFTE.systemAdmin || 0.05) + (portnoxFTE.helpDesk || 0.05))).toFixed(2) + ' FTE'
            ]
          ];
          
          doc.autoTable({
            head: [fteHeaders],
            body: fteData,
            startY: doc.autoTable.previous.finalY + 20,
            theme: 'grid',
            headStyles: {
              fillColor: [5, 84, 124],
              textColor: [255, 255, 255],
              fontStyle: 'bold'
            },
            alternateRowStyles: {
              fillColor: [245, 245, 245]
            },
            styles: {
              cellPadding: 5
            },
            didParseCell: function(data) {
              // Highlight total row
              if (data.row.index === fteData.length - 1) {
                data.cell.styles.fontStyle = 'bold';
                data.cell.styles.fillColor = [230, 230, 230];
              }
            }
          });
          
          // Add footer with page numbers
          const pageCount = doc.internal.getNumberOfPages();
          for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('Portnox Total Cost Analysis - Technical Report', 20, 285);
            doc.text(`Page ${i} of ${pageCount}`, 180, 285);
          }
          
          return doc;
        } catch (error) {
          console.error('Error in generating technical report:', error);
          // Fallback to a simpler report on error
          doc.setFontSize(16);
          doc.setTextColor(5, 84, 124);
          doc.text('Technical Report - Error Recovery Mode', 105, 20, { align: 'center' });
          doc.setFontSize(12);
          doc.setTextColor(100, 100, 100);
          doc.text('An error occurred while generating the detailed report.', 105, 40, { align: 'center' });
          doc.text('Basic summary information is provided below.', 105, 48, { align: 'center' });
          
          // Add basic info
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text(`Device Count: ${results.deviceCount || 'N/A'}`, 20, 70);
          doc.text(`Years Projected: ${results.yearsToProject || 'N/A'}`, 20, 80);
          
          // Add page number
          doc.setFontSize(10);
          doc.setTextColor(100, 100, 100);
          doc.text('Portnox Total Cost Analysis - Technical Report', 20, 285);
          doc.text('Page 1 of 1', 180, 285);
          
          return doc;
        }
      };
      
      // Similarly fix the other report generators
      // Fix executive summary
      const originalGenerateExecutiveSummary = window.PDFReportGenerator.prototype.generateExecutiveSummary;
      window.PDFReportGenerator.prototype.generateExecutiveSummary = function(doc, results, currentVendor) {
        try {
          // Call the original with try-catch
          return originalGenerateExecutiveSummary.call(this, doc, results, currentVendor);
        } catch (error) {
          console.error('Error in generating executive summary:', error);
          // Fallback to a simpler report
          doc.setFontSize(20);
          doc.setTextColor(5, 84, 124);
          doc.text('Executive Summary - Error Recovery Mode', 105, 20, { align: 'center' });
          doc.setFontSize(12);
          doc.text('An error occurred. Basic information is provided below.', 105, 40, { align: 'center' });
          
          // Add basic info
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text(`Device Count: ${results.deviceCount || 'N/A'}`, 20, 70);
          doc.text(`Years Projected: ${results.yearsToProject || 'N/A'}`, 20, 80);
          
          return doc;
        }
      };
      
      // Similarly fix financial analysis
      const originalGenerateFinancialAnalysis = window.PDFReportGenerator.prototype.generateFinancialAnalysis;
      window.PDFReportGenerator.prototype.generateFinancialAnalysis = function(doc, results, currentVendor) {
        try {
          // Call the original with try-catch
          return originalGenerateFinancialAnalysis.call(this, doc, results, currentVendor);
        } catch (error) {
          console.error('Error in generating financial analysis:', error);
          // Fallback to a simpler report
          doc.setFontSize(20);
          doc.setTextColor(5, 84, 124);
          doc.text('Financial Analysis - Error Recovery Mode', 105, 20, { align: 'center' });
          doc.setFontSize(12);
          doc.text('An error occurred. Basic information is provided below.', 105, 40, { align: 'center' });
          
          // Add basic info
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text(`Device Count: ${results.deviceCount || 'N/A'}`, 20, 70);
          doc.text(`Years Projected: ${results.yearsToProject || 'N/A'}`, 20, 80);
          
          return doc;
        }
      };
      
      // Also fix UIController's exportToPDF method to handle errors better
      if (window.UIController && window.UIController.prototype.exportToPDF) {
        const originalExportToPDF = window.UIController.prototype.exportToPDF;
        window.UIController.prototype.exportToPDF = function() {
          try {
            // Call the original method
            originalExportToPDF.call(this);
          } catch (error) {
            console.error('Error in PDF export:', error);
            // Show error notification
            if (window.notificationManager) {
              window.notificationManager.error('Error exporting PDF: ' + error.message + '. Try a different report type.');
            } else {
              alert('Error exporting PDF: ' + error.message + '. Try a different report type.');
            }
          }
        };
      }
      
      console.log('PDF export fixes applied successfully');
    }
  });
})();

/**
 * TCO Analyzer Master Fix Script
 * This script consolidates all fixes and enhancements for the TCO Analyzer
 */

(function() {
  'use strict';
  
  // Fix logo loading issues
  function fixPortnoxLogo() {
    const logoImg = document.querySelector('.logo img');
    if (logoImg) {
      // Create backup SVG logo in case external logo fails
      const svgLogo = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50"><style>.logo-text{fill:#05547C;font-family:Arial,sans-serif;font-weight:bold}.accent{fill:#65BD44}</style><rect x="5" y="10" width="30" height="30" rx="5" fill="#05547C"/><circle cx="20" cy="25" r="8" fill="#65BD44"/><text x="45" y="32" class="logo-text" font-size="20">Portnox</text><path class="accent" d="M45 35 h75" stroke="#65BD44" stroke-width="2"/></svg>';
      const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(svgLogo);
      
      // Set up error handler to use SVG if image fails to load
      logoImg.onerror = function() {
        console.log('Logo image failed to load, applying SVG replacement');
        this.onerror = null;
        this.src = svgDataUrl;
      };
      
      // If already broken, fix it now
      if (!logoImg.complete || logoImg.naturalHeight === 0) {
        logoImg.src = svgDataUrl;
      }
    }
  }
  
  // Fix chart rendering issues
  function fixChartRendering() {
    // Ensure Chart.js defaults are properly set
    if (window.Chart) {
      Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
      Chart.defaults.color = '#505050';
      Chart.defaults.responsive = true;
      Chart.defaults.maintainAspectRatio = false;
      
      // Better colors for charts
      const colors = [
        '#05547C', // Primary (current vendor)
        '#65BD44', // Accent (Portnox)
        '#F7941D', // Warning
        '#1B8DC0', // Primary light
        '#8ED070', // Accent light
        '#B54369', // Danger
        '#4D9132'  // Accent dark
      ];
      
      // Apply colors to defaults
      Chart.defaults.plugins.colors = {
        forceOverride: true
      };
      
      Chart.defaults.backgroundColor = colors;
      Chart.defaults.borderColor = colors;
      
      console.log('Chart.js defaults have been configured');
    } else {
      console.warn('Chart.js not loaded yet, will try again later');
      setTimeout(fixChartRendering, 500);
    }
  }
  
  // Fix tab navigation
  function fixTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button, [role="tab"]');
    const tabPanes = document.querySelectorAll('.tab-pane, [role="tabpanel"]');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Deactivate all tabs
        tabButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
          btn.tabIndex = -1;
        });
        
        // Hide all panes
        tabPanes.forEach(pane => {
          pane.classList.remove('active');
          pane.classList.remove('show');
          pane.setAttribute('aria-hidden', 'true');
        });
        
        // Activate clicked tab
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        this.tabIndex = 0;
        
        // Show corresponding pane
        const tabId = this.getAttribute('data-tab');
        if (tabId) {
          const targetPane = document.getElementById(tabId);
          if (targetPane) {
            targetPane.classList.add('active');
            targetPane.classList.add('show');
            targetPane.setAttribute('aria-hidden', 'false');
          }
        }
      });
    });
    
    console.log('Tab navigation fixed');
  }
  
  // Fix vendor card selection
  function fixVendorCardSelection() {
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(card => {
      card.addEventListener('click', function() {
        // Deactivate all cards
        vendorCards.forEach(c => c.classList.remove('active'));
        
        // Activate clicked card
        this.classList.add('active');
        
        // If calculator is defined, trigger recalculation
        if (typeof window.TcoCalculator !== 'undefined' && window.TcoCalculator.calculate) {
          window.TcoCalculator.calculate();
        }
      });
      
      // Make keyboard accessible
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
    
    console.log('Vendor card selection fixed');
  }
  
  // Fix PDF generation
  function fixPdfGeneration() {
    if (typeof jspdf === 'undefined' || typeof jspdf.jsPDF === 'undefined') {
      // jsPDF not loaded yet, wait and try again
      console.warn('jsPDF not loaded yet, will try again later');
      setTimeout(fixPdfGeneration, 500);
      return;
    }
    
    // Override the PDF generation function if it exists
    if (window.PdfGenerator && window.PdfGenerator.generatePdf) {
      const originalGeneratePdf = window.PdfGenerator.generatePdf;
      
      window.PdfGenerator.generatePdf = function(reportType) {
        try {
          // Call original function
          return originalGeneratePdf(reportType);
        } catch (error) {
          console.error('Error in PDF generation:', error);
          
          // Fallback implementation
          alert('An error occurred during PDF generation. Creating a simplified report.');
          
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF();
          
          // Add title
          doc.setFontSize(20);
          doc.setTextColor(5, 84, 124); // Primary color
          doc.text('Portnox TCO Analysis Report', 20, 20);
          
          // Add subtitle
          doc.setFontSize(14);
          doc.setTextColor(77, 145, 50); // Accent dark
          doc.text('Cost Comparison Summary', 20, 30);
          
          // Add some content
          doc.setFontSize(12);
          doc.setTextColor(32, 32, 32);
          doc.text('Generated on ' + new Date().toLocaleDateString(), 20, 40);
          
          // Save PDF
          doc.save('portnox-tco-analysis.pdf');
          
          return true;
        }
      };
      
      console.log('PDF generation fixed');
    } else {
      console.warn('PdfGenerator not defined yet, will try again later');
      setTimeout(fixPdfGeneration, 500);
    }
  }
  
  // Fix sensitivity analysis
  function fixSensitivityAnalysis() {
    // Hook into existing button if available
    const sensitivityBtn = document.getElementById('sensitivity-analysis-btn');
    if (sensitivityBtn) {
      sensitivityBtn.addEventListener('click', function() {
        window.location.href = 'sensitivity.html';
      });
    }
    
    // If we're on the sensitivity page, ensure it works
    if (window.location.pathname.includes('sensitivity.html')) {
      // Make sure the return button works
      const returnBtn = document.getElementById('return-to-calculator');
      if (returnBtn) {
        returnBtn.addEventListener('click', function() {
          window.location.href = 'index.html';
        });
      }
    }
  }
  
  // Apply all fixes when DOM is loaded
  function applyAllFixes() {
    console.log('Applying all TCO Analyzer fixes...');
    
    fixPortnoxLogo();
    fixTabNavigation();
    fixVendorCardSelection();
    fixChartRendering();
    fixPdfGeneration();
    fixSensitivityAnalysis();
    
    console.log('All fixes applied successfully');
  }
  
  // Run immediately if document is already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    applyAllFixes();
  } else {
    // Otherwise wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', applyAllFixes);
  }
  
  // Also run on window load for charts that might initialize late
  window.addEventListener('load', function() {
    // Fix charts again after everything is loaded
    fixChartRendering();
  });
})();

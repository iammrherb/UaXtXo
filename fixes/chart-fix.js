/**
 * Chart Rendering Fix
 * This script fixes the issue with charts not rendering due to missing calculator data
 */
(function() {
  console.log('Applying chart rendering fix...');
  
  // Make sure ChartManager exists
  if (!window.ChartManager) {
    console.warn('ChartManager not found, cannot apply fix');
    return;
  }
  
  // Fix the initializeCharts method to handle missing data
  const originalInitializeCharts = window.ChartManager.initializeCharts;
  
  window.ChartManager.initializeCharts = function(data) {
    if (!data || Object.keys(data).length === 0) {
      console.log('Using default data for charts');
      
      // Create default data structure for charts
      data = {
        currentVendor: 'Cisco ISE', // Default vendor
        deviceCount: 300,           // 300 devices
        yearsToProject: 1,          // 1 year
        orgSize: 'small',           // Small organization
        
        // Cost components for competitor (on-premises)
        competitorHardwareCost: 40000,
        competitorSoftwareCost: 35000,
        competitorImplementationCost: 40000,
        competitorMaintenanceCost: 25000,
        competitorSupportCost: 15000,
        competitorPersonnelCost: 100000,
        
        // Cost components for Portnox Cloud
        portnoxSoftwareCost: 25000,
        portnoxImplementationCost: 15000,
        portnoxMaintenanceCost: 10000,
        portnoxSupportCost: 5000,
        portnoxPersonnelCost: 50000,
        
        // Summary metrics
        portnoxTotalCost: 105000,
        competitorTotalCost: 255000,
        totalSavings: 150000,
        savingsPercentage: 58,
        
        // Initial/Annual costs for ROI calculation
        portnoxInitialCost: 15000,
        portnoxAnnualCost: 90000,
        competitorInitialCost: 80000,
        competitorAnnualCost: 175000,
        
        // Implementation time
        implementationTime: {
          portnox: 10,
          competitor: 60,
          reduction: 83
        },
        
        // ROI data
        roi: {
          months: 6,
          percentage: 250
        }
      };
      
      // Store this data in calculator
      if (window.calculator && !window.calculator.data) {
        window.calculator.data = data;
      }
    }
    
    // Fix canvas sizing before creating charts
    document.querySelectorAll('.chart-container').forEach(container => {
      container.style.height = '300px';
      container.style.display = 'block';
      container.style.position = 'relative';
      container.style.width = '100%';
      
      const canvas = container.querySelector('canvas');
      if (canvas) {
        canvas.style.display = 'block';
      }
    });
    
    // Call original method with valid data
    return originalInitializeCharts.call(this, data);
  };
  
  // Fix PDF generation to use chart data
  if (window.PDFReportGenerator) {
    const originalCreatePDF = window.PDFReportGenerator.prototype.generateReport;
    
    window.PDFReportGenerator.prototype.generateReport = function(type) {
      // Ensure the data object exists and has required fields
      if (!this.data) {
        this.data = window.calculator ? window.calculator.data : {};
      }
      
      if (!this.data.orgSize) {
        this.data.orgSize = 'small';
      }
      
      // Call original method
      return originalCreatePDF.apply(this, arguments);
    };
    
    console.log('PDF generation patched');
  }
  
  // Apply the fix by initializing charts with default data
  if (window.calculator) {
    if (!window.calculator.data) {
      console.log('Creating initial calculator data');
      
      // Create initial data if missing
      window.calculator.data = {
        currentVendor: 'Cisco ISE',
        deviceCount: 300,
        yearsToProject: 1,
        orgSize: 'small',
        
        // Cost components for competitor (on-premises)
        competitorHardwareCost: 40000,
        competitorSoftwareCost: 35000,
        competitorImplementationCost: 40000,
        competitorMaintenanceCost: 25000,
        competitorSupportCost: 15000,
        competitorPersonnelCost: 100000,
        
        // Cost components for Portnox Cloud
        portnoxSoftwareCost: 25000,
        portnoxImplementationCost: 15000,
        portnoxMaintenanceCost: 10000,
        portnoxSupportCost: 5000,
        portnoxPersonnelCost: 50000,
        
        // Summary metrics
        portnoxTotalCost: 105000,
        competitorTotalCost: 255000,
        totalSavings: 150000,
        savingsPercentage: 58
      };
    }
    
    // Initialize charts with current data
    if (window.ChartManager.initializeCharts) {
      window.ChartManager.initializeCharts(window.calculator.data);
      console.log('Charts initialized with data');
    }
    
    // Re-run calculation to ensure everything is updated
    if (typeof window.calculator.calculate === 'function') {
      window.calculator.calculate();
      console.log('Calculation triggered to update charts');
    }
  }
  
  console.log('Chart rendering fix applied successfully');
})();

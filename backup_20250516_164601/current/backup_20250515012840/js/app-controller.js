/**
 * Main Application Controller for Total Cost Analyzer
 * Coordinates components and manages application flow
 */
const AppController = (function() {
    // Initialize application
    function init() {
        console.log('Initializing application...');
        
        // Register event listeners for global events
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', handleResize);
        
        // Initialize URL parameters handling
        handleUrlParameters();
        
        console.log('Application initialized');
    }
    
    // Handle keyboard shortcuts
    function handleKeyDown(e) {
        // ESC key to close modals and overlays
        if (e.key === 'Escape') {
            // Close any active modal
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
            
            // Close sensitivity sidebar if open
            const sensitivitySidebar = document.getElementById('sensitivity-sidebar');
            if (sensitivitySidebar && sensitivitySidebar.classList.contains('active')) {
                sensitivitySidebar.classList.remove('active');
            }
        }
    }
    
    // Handle window resize events
    function handleResize() {
        // Update charts if they exist
        if (typeof ChartsManager !== 'undefined' && ChartsManager.charts) {
            for (const chartId in ChartsManager.charts) {
                if (ChartsManager.charts[chartId]) {
                    ChartsManager.charts[chartId].resize();
                }
            }
        }
    }
    
    // Handle URL parameters for deep linking and sharing
    function handleUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Check for source parameter (e.g., from wizard to calculator)
        const source = urlParams.get('source');
        if (source === 'wizard') {
            // Load wizard data from localStorage
            const wizardData = localStorage.getItem('wizardData');
            if (wizardData) {
                try {
                    const data = JSON.parse(wizardData);
                    console.log('Loaded wizard data:', data);
                    
                    // Apply data to calculator
                    // This will be handled by the calculator component
                }
                catch (e) {
                    console.error('Error parsing wizard data:', e);
                }
            }
        }
        
        // Check for comparison parameter
        const compareVendor = urlParams.get('compare');
        if (compareVendor) {
            // Load comparison data
            const comparisonData = localStorage.getItem('comparisonData');
            if (comparisonData) {
                try {
                    const data = JSON.parse(comparisonData);
                    console.log('Loaded comparison data:', data);
                    
                    // Apply data to calculator
                    // This will be handled by the calculator component
                }
                catch (e) {
                    console.error('Error parsing comparison data:', e);
                }
            }
        }
    }
    
    // Start calculation based on current inputs
    function startCalculation() {
        // Show loading overlay
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('active');
        }
        
        // Get calculation parameters from UI
        const calculationParams = getCalculationParams();
        
        // Perform calculation
        setTimeout(() => {
            if (typeof Calculator !== 'undefined' && Calculator.calculateTCO) {
                const results = Calculator.calculateTCO(calculationParams);
                console.log('Calculation results:', results);
            }
            
            // Hide loading overlay
            if (loadingOverlay) {
                loadingOverlay.classList.remove('active');
            }
            
            // Show results container
            const resultsContainer = document.getElementById('results-container');
            if (resultsContainer) {
                resultsContainer.classList.remove('hidden');
            }
            
            // Hide wizard container
            const wizardContainer = document.getElementById('wizard-container');
            if (wizardContainer) {
                wizardContainer.classList.add('hidden');
            }
            
            // Hide wizard navigation
            const wizardNavigation = document.querySelector('.wizard-navigation');
            if (wizardNavigation) {
                wizardNavigation.classList.add('hidden');
            }
        }, 1500);
    }
    
    // Get calculation parameters from UI
    function getCalculationParams() {
        // Get selected vendor
        const selectedVendor = document.querySelector('.vendor-card.active');
        const vendorId = selectedVendor ? selectedVendor.dataset.vendor : 'cisco';
        
        // Get industry
        const industrySelect = document.getElementById('industry-select');
        const industry = industrySelect ? industrySelect.value : 'financial';
        
        // Get organization details
        const orgSizeSelect = document.getElementById('organization-size');
        const orgSize = orgSizeSelect ? orgSizeSelect.value : 'medium';
        
        const deviceCountInput = document.getElementById('device-count');
        const deviceCount = deviceCountInput ? parseInt(deviceCountInput.value) : 2500;
        
        // Get years to project
        const yearsToProjectSelect = document.getElementById('years-to-project');
        const yearsToProject = yearsToProjectSelect ? parseInt(yearsToProjectSelect.value) : 3;
        
        return {
            vendor: vendorId,
            industry,
            organization: {
                size: orgSize,
                deviceCount
            },
            yearsToProject
        };
    }
    
    // Export results to PDF
    function exportToPdf() {
        // Check if jsPDF is available
        if (typeof jspdf === 'undefined' || typeof jspdf.jsPDF === 'undefined') {
            console.error('jsPDF not available');
            return;
        }
        
        // Create PDF document
        const doc = new jspdf.jsPDF();
        
        // Add title
        doc.setFontSize(20);
        doc.text('Total Cost Analysis Report', 105, 20, { align: 'center' });
        
        // Add date
        doc.setFontSize(10);
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });
        
        // Add summary
        doc.setFontSize(16);
        doc.text('Executive Summary', 20, 40);
        
        doc.setFontSize(11);
        const totalSavings = document.getElementById('total-savings')?.innerText || '$0';
        const savingsPercentage = document.getElementById('savings-percentage')?.innerText || '0%';
        doc.text(`Total Savings: ${totalSavings} (${savingsPercentage})`, 20, 50);
        
        const breakEven = document.getElementById('breakeven-point')?.innerText || '0 months';
        doc.text(`Break-even Point: ${breakEven}`, 20, 60);
        
        // Try to add charts if possible
        try {
            if (typeof ChartsManager !== 'undefined' && ChartsManager.charts) {
                // Add TCO comparison chart
                if (ChartsManager.charts.tcoComparison) {
                    const tcoCanvas = ChartsManager.charts.tcoComparison.canvas;
                    const tcoImg = tcoCanvas.toDataURL('image/png');
                    doc.addPage();
                    doc.setFontSize(16);
                    doc.text('TCO Comparison', 105, 20, { align: 'center' });
                    doc.addImage(tcoImg, 'PNG', 20, 30, 170, 100);
                }
                
                // Add cost breakdown charts
                if (ChartsManager.charts.currentBreakdown && ChartsManager.charts.portnoxBreakdown) {
                    const currentCanvas = ChartsManager.charts.currentBreakdown.canvas;
                    const portnoxCanvas = ChartsManager.charts.portnoxBreakdown.canvas;
                    const currentImg = currentCanvas.toDataURL('image/png');
                    const portnoxImg = portnoxCanvas.toDataURL('image/png');
                    
                    doc.addPage();
                    doc.setFontSize(16);
                    doc.text('Cost Breakdown', 105, 20, { align: 'center' });
                    doc.addImage(currentImg, 'PNG', 20, 30, 80, 80);
                    doc.addImage(portnoxImg, 'PNG', 110, 30, 80, 80);
                }
            }
        } catch (e) {
            console.error('Error adding charts to PDF:', e);
        }
        
        // Save PDF
        doc.save('tco-analysis-report.pdf');
    }
    
    // Share results
    function shareResults() {
        // Create share URL with parameters
        const params = getCalculationParams();
        const shareUrl = new URL(window.location.href);
        
        // Clear existing parameters
        for (const key of [...shareUrl.searchParams.keys()]) {
            shareUrl.searchParams.delete(key);
        }
        
        // Add parameters
        shareUrl.searchParams.set('vendor', params.vendor);
        shareUrl.searchParams.set('industry', params.industry);
        shareUrl.searchParams.set('size', params.organization.size);
        shareUrl.searchParams.set('devices', params.organization.deviceCount);
        shareUrl.searchParams.set('years', params.yearsToProject);
        shareUrl.searchParams.set('share', 'true');
        
        // Copy to clipboard
        navigator.clipboard.writeText(shareUrl.toString())
            .then(() => {
                // Show notification
                if (typeof NotificationManager !== 'undefined') {
                    NotificationManager.success('Share link copied to clipboard!');
                } else {
                    alert('Share link copied to clipboard!');
                }
            })
            .catch(err => {
                console.error('Error copying to clipboard:', err);
                // Show notification
                if (typeof NotificationManager !== 'undefined') {
                    NotificationManager.error('Failed to copy share link!');
                } else {
                    alert('Failed to copy share link!');
                }
            });
    }
    
    // Public API
    return {
        init,
        startCalculation,
        exportToPdf,
        shareResults
    };
})();

// Initialize the application when document is ready
document.addEventListener('DOMContentLoaded', function() {
    AppController.init();
    
    // Bind export button
    const exportPdfBtn = document.getElementById('export-pdf');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', AppController.exportToPdf);
    }
    
    // Bind share button
    const shareResultsBtn = document.getElementById('share-results');
    if (shareResultsBtn) {
        shareResultsBtn.addEventListener('click', AppController.shareResults);
    }
    
    // Bind calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', AppController.startCalculation);
    }
});

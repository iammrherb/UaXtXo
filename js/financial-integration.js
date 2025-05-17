/**
 * Financial Analysis & Reporting Integration Script
 * Integrates advanced financial analysis and reporting capabilities
 */

// Define loading states
let advancedTcoCalcLoaded = false;
let sensitivityAnalysisLoaded = false;
let reportGeneratorLoaded = false;

// Check if all dependencies are loaded
function checkDependencies() {
    if (advancedTcoCalcLoaded && sensitivityAnalysisLoaded && reportGeneratorLoaded) {
        console.log('All Financial Analysis & Reporting modules loaded successfully');
    }
}

// Load advanced TCO calculator
function loadAdvancedTcoCalculator() {
    // Check if already loaded
    if (window.advancedTcoCalculator) {
        advancedTcoCalcLoaded = true;
        checkDependencies();
        return;
    }
    
    // Create script element
    const script = document.createElement('script');
    script.src = 'js/financial/advanced-tco-calculator.js';
    script.async = true;
    
    // Set up callbacks
    script.onload = function() {
        console.log('Advanced TCO Calculator loaded successfully');
        advancedTcoCalcLoaded = true;
        checkDependencies();
    };
    
    script.onerror = function() {
        console.error('Failed to load Advanced TCO Calculator');
    };
    
    // Add to document
    document.head.appendChild(script);
}

// Load sensitivity analysis
function loadSensitivityAnalysis() {
    // Check if already loaded
    if (window.sensitivityAnalysis) {
        sensitivityAnalysisLoaded = true;
        checkDependencies();
        return;
    }
    
    // Create script element
    const script = document.createElement('script');
    script.src = 'js/financial/sensitivity-analysis.js';
    script.async = true;
    
    // Set up callbacks
    script.onload = function() {
        console.log('Sensitivity Analysis loaded successfully');
        sensitivityAnalysisLoaded = true;
        checkDependencies();
    };
    
    script.onerror = function() {
        console.error('Failed to load Sensitivity Analysis');
    };
    
    // Add to document
    document.head.appendChild(script);
}

// Load report generator
function loadReportGenerator() {
    // Check if already loaded
    if (window.reportGenerator) {
        reportGeneratorLoaded = true;
        checkDependencies();
        return;
    }
    
    // Create script element
    const script = document.createElement('script');
    script.src = 'js/reports/report-generator.js';
    script.async = true;
    
    // Set up callbacks
    script.onload = function() {
        console.log('Report Generator loaded successfully');
        reportGeneratorLoaded = true;
        checkDependencies();
    };
    
    script.onerror = function() {
        console.error('Failed to load Report Generator');
    };
    
    // Add to document
    document.head.appendChild(script);
}

// Load CSS files
function loadCssFiles() {
    const cssFiles = [
        'css/financial/financial-analysis.css',
        'css/reports/report-styles.css'
    ];
    
    cssFiles.forEach(file => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = file;
        document.head.appendChild(link);
    });
}

// Main initialization function
function initFinancialEnhancements() {
    console.log('Initializing Financial Analysis & Reporting enhancements...');
    
    // Load CSS files
    loadCssFiles();
    
    // Load components in parallel
    loadAdvancedTcoCalculator();
    loadSensitivityAnalysis();
    loadReportGenerator();
}

// Initialize when document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFinancialEnhancements);
} else {
    initFinancialEnhancements();
}

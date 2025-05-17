/**
 * Security, Compliance & Risk Assessment Integration Script
 * Integrates enhanced security visualization and assessment capabilities
 */

// Define loading states
let securityPostureLoaded = false;
let complianceMapperLoaded = false;
let riskAssessmentLoaded = false;

// Check if all dependencies are loaded
function checkDependencies() {
    if (securityPostureLoaded && complianceMapperLoaded && riskAssessmentLoaded) {
        console.log('All Security, Compliance & Risk Assessment modules loaded successfully');
    }
}

// Load security posture analyzer
function loadSecurityPostureAnalyzer() {
    // Check if already loaded
    if (window.securityPostureAnalyzer) {
        securityPostureLoaded = true;
        checkDependencies();
        return;
    }
    
    // Create script element
    const script = document.createElement('script');
    script.src = 'js/security/security-posture-analyzer.js';
    script.async = true;
    
    // Set up callbacks
    script.onload = function() {
        console.log('Security Posture Analyzer loaded successfully');
        securityPostureLoaded = true;
        checkDependencies();
    };
    
    script.onerror = function() {
        console.error('Failed to load Security Posture Analyzer');
    };
    
    // Add to document
    document.head.appendChild(script);
}

// Load compliance mapper
function loadComplianceMapper() {
    // Check if already loaded
    if (window.complianceMapper) {
        complianceMapperLoaded = true;
        checkDependencies();
        return;
    }
    
    // Create script element
    const script = document.createElement('script');
    script.src = 'js/compliance/compliance-mapper.js';
    script.async = true;
    
    // Set up callbacks
    script.onload = function() {
        console.log('Compliance Mapper loaded successfully');
        complianceMapperLoaded = true;
        checkDependencies();
    };
    
    script.onerror = function() {
        console.error('Failed to load Compliance Mapper');
    };
    
    // Add to document
    document.head.appendChild(script);
}

// Load risk assessment
function loadRiskAssessment() {
    // Check if already loaded
    if (window.riskAssessment) {
        riskAssessmentLoaded = true;
        checkDependencies();
        return;
    }
    
    // Create script element
    const script = document.createElement('script');
    script.src = 'js/risk/risk-assessment.js';
    script.async = true;
    
    // Set up callbacks
    script.onload = function() {
        console.log('Risk Assessment loaded successfully');
        riskAssessmentLoaded = true;
        checkDependencies();
    };
    
    script.onerror = function() {
        console.error('Failed to load Risk Assessment');
    };
    
    // Add to document
    document.head.appendChild(script);
}

// Load CSS files
function loadCssFiles() {
    const cssFiles = [
        'css/security/security-posture.css',
        'css/compliance/compliance-mapping.css',
        'css/security/risk-assessment.css'
    ];
    
    cssFiles.forEach(file => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = file;
        document.head.appendChild(link);
    });
}

// Main initialization function
function initSecurityEnhancements() {
    console.log('Initializing Security, Compliance & Risk Assessment enhancements...');
    
    // Load CSS files
    loadCssFiles();
    
    // Load components in parallel
    loadSecurityPostureAnalyzer();
    loadComplianceMapper();
    loadRiskAssessment();
}

// Initialize when document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSecurityEnhancements);
} else {
    initSecurityEnhancements();
}

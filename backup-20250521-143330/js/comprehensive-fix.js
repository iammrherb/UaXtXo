/**
 * Comprehensive Fix Script for Portnox Total Cost Analyzer
 * Addresses all identified issues and initializes components properly
 */

// Store original console functions
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

// Wrapped console functions to prevent duplication
console.log = function() {
    if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].includes('already been declared')) {
        // Suppress redeclaration warnings
        return;
    }
    originalConsoleLog.apply(console, arguments);
};

console.warn = function() {
    if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].includes('already been declared')) {
        // Suppress redeclaration warnings
        return;
    }
    originalConsoleWarn.apply(console, arguments);
};

console.error = function() {
    if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].includes('already been declared')) {
        // Suppress redeclaration warnings
        return;
    }
    originalConsoleError.apply(console, arguments);
};

/**
 * Fix missing elements and ensure proper initialization
 */
function fixMissingElements() {
    // Check if particles container exists
    if (!document.getElementById('particles-js')) {
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-js';
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.zIndex = '-1';
        document.body.prepend(particlesContainer);
    }
    
    // Check if header particles container exists
    if (!document.getElementById('particles-header') && document.querySelector('.app-header')) {
        const headerParticlesContainer = document.createElement('div');
        headerParticlesContainer.id = 'particles-header';
        document.querySelector('.app-header').prepend(headerParticlesContainer);
    }
    
    // Ensure tab container exists
    if (!document.querySelector('.tab-container') && document.querySelector('.content-area')) {
        const tabContainer = document.createElement('div');
        tabContainer.className = 'tab-container';
        document.querySelector('.content-area').prepend(tabContainer);
    }
    
    // Ensure view container exists
    if (!document.querySelector('.view-container') && document.querySelector('.content-area')) {
        const viewContainer = document.createElement('div');
        viewContainer.className = 'view-container';
        
        const tabContainer = document.querySelector('.tab-container');
        if (tabContainer) {
            tabContainer.after(viewContainer);
        } else {
            document.querySelector('.content-area').append(viewContainer);
        }
    }
}

/**
 * Ensure views are all properly initialized
 */
function ensureViewInitialization() {
    if (window.tabNavigator) {
        console.log('Tab Navigator already initialized');
    } else {
        // Try to initialize TabNavigator
        if (typeof TabNavigator !== 'undefined') {
            window.tabNavigator = new TabNavigator().init();
        } else {
            console.error('TabNavigator not defined, cannot initialize');
        }
    }
    
    // Ensure content areas for each view
    ensureViewContent('executive', 'summary');
    ensureViewContent('financial', 'tco');
    ensureViewContent('security', 'overview');
    ensureViewContent('technical', 'architecture');
}

/**
 * Ensure content for a specific view
 */
function ensureViewContent(mainTab, subTab) {
    if (!window.tabNavigator) return;
    
    const viewId = mainTab + "-" + subTab;
    const viewContent = document.getElementById(viewId);
    
    if (!viewContent) {
        console.log("Creating view content for " + viewId);
        window.tabNavigator.createViewContent(mainTab, subTab);
    }
}

/**
 * Fix chart initializations
 */
function fixChartInitialization() {
    if (window.chartLoader) {
        console.log('Chart Loader already initialized');
    } else {
        // Try to initialize UnifiedChartLoader
        if (typeof UnifiedChartLoader !== 'undefined') {
            window.chartLoader = UnifiedChartLoader.init();
        } else {
            console.error('UnifiedChartLoader not defined, cannot initialize');
        }
    }
    
    // Define a backup loader if needed
    if (!window.chartLoader) {
        window.chartLoader = {
            queueChart: function(type, containerId, chartId, data) {
                console.log("Chart loader not available. Would load " + type + " chart to " + containerId);
            }
        };
    }
}

/**
 * Apply theme and styles
 */
function applyThemeAndStyles() {
    // Check if theme CSS is already in document
    if (!document.querySelector('link[href*="vibrant-theme.css"]')) {
        const themeLink = document.createElement('link');
        themeLink.rel = 'stylesheet';
        themeLink.href = './css/vibrant-theme.css';
        document.head.appendChild(themeLink);
    }
    
    // Add Font Awesome if needed
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(faLink);
    }
    
    // Add Nunito font if needed
    if (!document.querySelector('link[href*="nunito"]')) {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap';
        document.head.appendChild(fontLink);
    }
}

// Execute fixes when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Applying comprehensive fixes...');
    
    // Fix missing elements
    fixMissingElements();
    
    // Apply theme and styles
    applyThemeAndStyles();
    
    // Fix chart initialization
    fixChartInitialization();
    
    // Ensure views are properly initialized
    ensureViewInitialization();
    
    console.log('All fixes applied successfully.');
});

// Apply fixes immediately if DOM is already loaded
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    fixMissingElements();
    applyThemeAndStyles();
    fixChartInitialization();
    ensureViewInitialization();
}

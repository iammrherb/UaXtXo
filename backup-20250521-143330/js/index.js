/**
 * Main Loader for Portnox Total Cost Analyzer
 * Ensures proper initialization order
 */

// Load dependencies in the correct order
const dependencies = [
    './js/charts/chart-config.js',
    './js/charts/chart-placeholders.js',
    './js/charts/apex/apex-charts.js',
    './js/charts/d3/d3-manager.js',
    './js/charts/highcharts/highcharts-manager.js',
    './js/charts/security-charts.js',
    './js/charts/unified-chart-loader.js',
    './js/components/sidebar-manager.js',
    './js/components/particle-background.js',
    './js/components/tab-navigator.js',
    './js/components/banner-section.js',
    './js/comprehensive-fix.js'
];

// Load scripts in order
function loadScripts(scripts, index = 0) {
    if (index >= scripts.length) {
        console.log('All scripts loaded successfully');
        return;
    }
    
    const script = document.createElement('script');
    script.src = scripts[index];
    script.onload = function() {
        console.log("Loaded: " + scripts[index]);
        loadScripts(scripts, index + 1);
    };
    script.onerror = function() {
        console.error("Failed to load: " + scripts[index]);
        loadScripts(scripts, index + 1);
    };
    document.head.appendChild(script);
}

// Start loading scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Portnox Total Cost Analyzer...');
    loadScripts(dependencies);
});

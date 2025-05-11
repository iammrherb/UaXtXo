// Improved chart initialization with proper canvas existence checks
(function() {
    console.log("🔄 Installing chart initialization fix...");
    
    // Store original chart initialization if it exists
    let originalCreateChart = null;
    if (window.chartBuilder && typeof window.chartBuilder.createChart === 'function') {
        originalCreateChart = window.chartBuilder.createChart;
    }
    
    // Function to safely initialize charts
    function safeCreateChart(chartId, config) {
        const canvas = document.getElementById(chartId);
        if (!canvas) {
            console.log(`⏳ Canvas for chart "${chartId}" not found, will initialize later when available`);
            // Store config for later initialization
            if (!window.pendingCharts) window.pendingCharts = {};
            window.pendingCharts[chartId] = config;
            return null;
        }
        
        console.log(`🎨 Creating chart: ${chartId}`);
        if (originalCreateChart) {
            return originalCreateChart.call(window.chartBuilder, chartId, config);
        } else {
            const ctx = canvas.getContext('2d');
            return new Chart(ctx, config);
        }
    }
    
    // Override chart creation function if it exists
    if (window.chartBuilder) {
        window.chartBuilder.createChart = safeCreateChart;
    } else {
        // Create chart builder if it doesn't exist
        window.chartBuilder = {
            createChart: safeCreateChart
        };
    }
    
    // Function to initialize pending charts
    window.initializePendingCharts = function() {
        if (!window.pendingCharts) return;
        
        console.log("🔍 Checking for pending charts to initialize...");
        Object.keys(window.pendingCharts).forEach(chartId => {
            const canvas = document.getElementById(chartId);
            if (canvas) {
                console.log(`🎨 Initializing previously pending chart: ${chartId}`);
                safeCreateChart(chartId, window.pendingCharts[chartId]);
                delete window.pendingCharts[chartId];
            }
        });
    };
    
    // Setup observers and event listeners for tab changes
    function setupTabChangeHandlers() {
        // Add observer to detect when new tabs/sections become visible
        const observer = new MutationObserver(mutations => {
            let shouldCheck = false;
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
                    shouldCheck = true;
                }
            });
            
            if (shouldCheck) {
                setTimeout(window.initializePendingCharts, 100);
            }
        });
        
        // Observe tab content containers for visibility changes
        document.querySelectorAll('.tab-content, .tab-pane, [role="tabpanel"]').forEach(el => {
            observer.observe(el, { attributes: true, childList: false, subtree: false });
        });
        
        // Also try to initialize charts when tabs are clicked
        document.querySelectorAll('[data-bs-toggle="tab"], [role="tab"]').forEach(tab => {
            tab.addEventListener('click', () => {
                setTimeout(window.initializePendingCharts, 200);
            });
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setupTabChangeHandlers();
    } else {
        document.addEventListener('DOMContentLoaded', setupTabChangeHandlers);
    }
    
    // Also try once on window load
    window.addEventListener('load', () => {
        window.initializePendingCharts();
    });
    
    console.log("✅ Chart initialization fix installed successfully");
})();

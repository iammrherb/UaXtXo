/**
 * NAC Architecture Designer - Force Initialization
 * This ensures all components are properly initialized
 */
(function() {
    console.log("Forcing initialization of all components");
    
    // Fix Chart.js issues
    console.log("Fixing Chart.js issues");
    const canvases = document.querySelectorAll('canvas');
    console.log("Found " + canvases.length + " canvases");
    
    canvases.forEach(function(canvas) {
        const id = canvas.id;
        console.log("Reset canvas " + id);
        
        // Reset dimensions
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        }
        
        // Destroy any existing chart
        if (window.Chart && window.Chart.getChart) {
            const chart = window.Chart.getChart(canvas);
            if (chart) {
                chart.destroy();
                console.log("Destroyed Chart.js v3.x+ chart on canvas " + id);
            }
        }
    });
    
    // Add forEach if missing
    if (window.Chart && window.Chart.instances && !window.Chart.instances.forEach) {
        window.Chart.instances.forEach = function(callback) {
            Array.from(Object.values(window.Chart.instances)).forEach(callback);
        };
        console.log("Added forEach method to Chart.instances");
    }
    
    console.log("Chart.js issues fixed");
    
    // Initialize charts
    console.log("Initializing charts");
    if (window.ChartBuilder && window.ChartBuilder.initCharts) {
        try {
            window.ChartBuilder.initCharts();
        } catch (error) {
            console.error("Error initializing charts", error);
        }
    }
    console.log("Chart initialization complete");
    
    // Set up event handlers
    console.log("Setting up event handlers");
    document.querySelectorAll('.vendor-card').forEach(function(card) {
        card.addEventListener('click', function() {
            const vendor = this.dataset.vendor;
            if (window.NACDesignerApp && window.NACDesignerApp.selectVendor) {
                window.NACDesignerApp.selectVendor(vendor);
            }
        });
    });
    console.log("Event handlers set up");
    
    // Initialize UI
    console.log("Initializing UI");
    if (window.enhancedWizard && window.enhancedWizard.init) {
        try {
            window.enhancedWizard.init();
        } catch (error) {
            console.error("Error initializing enhanced wizard", error);
        }
    }
    console.log("UI initialization complete");
    
    console.log("Forced initialization complete");
})();

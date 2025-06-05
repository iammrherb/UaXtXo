/**
 * Integration Script
 * Connects all enhancements to existing app
 */

(function() {
    console.log('🚀 Integrating TCO Analyzer Enhancements...');
    
    // Load all enhancement modules
    const modules = [
        '/tco-enhancements/data/comprehensive-vendor-database.js',
        '/tco-enhancements/ui/vendor-pills-ui.js',
        '/tco-enhancements/visualizations/explosive-charts.js'
    ];
    
    // Load modules sequentially
    async function loadModules() {
        for (const module of modules) {
            await loadScript(module);
        }
        
        // Initialize enhancements
        initializeEnhancements();
    }
    
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    function initializeEnhancements() {
        console.log('✅ All enhancement modules loaded');
        
        // Update existing vendor calculator with new data
        if (window.vendorCalculator) {
            window.vendorCalculator.vendors = window.ComprehensiveVendorDatabase;
            console.log('✅ Vendor database updated');
        }
        
        // Add explosive analysis button
        addExplosiveAnalysisButton();
        
        // Update dashboard
        if (window.dashboard && window.dashboard.refresh) {
            window.dashboard.refresh();
        }
    }
    
    function addExplosiveAnalysisButton() {
        const header = document.querySelector('.header-actions') || 
                      document.querySelector('.dashboard-header');
        
        if (header) {
            const button = document.createElement('button');
            button.className = 'btn btn-primary';
            button.innerHTML = '<i class="fas fa-explosion"></i> Explosive Analysis';
            button.onclick = showExplosiveAnalysis;
            header.appendChild(button);
        }
    }
    
    window.showExplosiveAnalysis = function() {
        // Create modal with explosive visualizations
        const modal = document.createElement('div');
        modal.className = 'explosive-modal';
        modal.innerHTML = `
            <div class="explosive-content">
                <h2>Explosive Cost Analysis</h2>
                <div id="explosive-charts"></div>
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Render visualizations
        if (window.ExplosiveVisualizations) {
            // Add mind maps, Gantt charts, etc.
        }
    };
    
    // Start loading
    loadModules();
})();

console.log('✅ Integration script loaded');

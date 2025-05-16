// Fixes Integrator
// Loads all fixes and ensures proper execution order

(function() {
    console.log("🔧 Initializing fixes integrator...");
    
    // List of fix scripts to load in order
    const fixScripts = [
        'js/fixes/chart-fix.js',
        'js/fixes/calculations-fix.js',
        'js/fixes/vendor-data-fix.js',
        'js/fixes/sensitivity-analysis.js',
        'js/fixes/selection-fix.js'
    ];
    
    // Counter to track loaded scripts
    let loadedScripts = 0;
    
    // Load scripts in sequence
    function loadFixScripts() {
        if (loadedScripts >= fixScripts.length) {
            console.log("🔧 All fix scripts loaded successfully");
            initializeApplication();
            return;
        }
        
        const scriptPath = fixScripts[loadedScripts];
        const script = document.createElement('script');
        script.src = scriptPath;
        
        script.onload = function() {
            console.log(`🔧 Loaded: ${scriptPath}`);
            loadedScripts++;
            loadFixScripts(); // Load next script
        };
        
        script.onerror = function() {
            console.error(`❌ Failed to load: ${scriptPath}`);
            loadedScripts++;
            loadFixScripts(); // Try next script anyway
        };
        
        document.head.appendChild(script);
    }
    
    // Initialize application after fixes are loaded
    function initializeApplication() {
        console.log("🚀 Initializing application with fixes applied");
        
        // Ensure DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', onDOMReady);
        } else {
            onDOMReady();
        }
    }
    
    // Function to run when DOM is ready
    function onDOMReady() {
        console.log("🚀 DOM ready, applying remaining fixes");
        
        // Fix vendor selection
        if (typeof window.fixVendorSelection === 'function') {
            window.fixVendorSelection();
        }
        
        // Select default vendors
        selectDefaultVendors();
        
        // Initialize charts
        initializeCharts();
        
        // Run initial calculations
        runInitialCalculations();
        
        console.log("🚀 Application initialization complete");
    }
    
    // Function to select default vendors
    function selectDefaultVendors() {
        console.log("Selecting default vendors");
        
        // Portnox should already be selected
        // Also select Cisco ISE by default for comparison
        const ciscoCard = document.querySelector('.vendor-card[data-vendor="cisco"]');
        if (ciscoCard && !ciscoCard.classList.contains('selected')) {
            ciscoCard.classList.add('selected');
        }
    }
    
    // Function to initialize charts
    function initializeCharts() {
        console.log("Initializing charts");
        
        // Get selected vendors
        const selectedVendorCards = document.querySelectorAll('.vendor-card.selected');
        const selectedVendors = Array.from(selectedVendorCards).map(card => {
            const vendorId = card.getAttribute('data-vendor');
            return window.vendorData.find(v => v.id === vendorId);
        }).filter(Boolean);
        
        // Update all charts
        if (typeof window.updateAllCharts === 'function') {
            window.updateAllCharts(selectedVendors);
        }
    }
    
    // Function to run initial calculations
    function runInitialCalculations() {
        console.log("Running initial calculations");
        
        // Get selected vendors
        const selectedVendorCards = document.querySelectorAll('.vendor-card.selected');
        const selectedVendors = Array.from(selectedVendorCards).map(card => {
            const vendorId = card.getAttribute('data-vendor');
            return window.vendorData.find(v => v.id === vendorId);
        }).filter(Boolean);
        
        // Run calculations
        if (typeof window.updateCalculations === 'function') {
            window.updateCalculations(selectedVendors);
        }
    }
    
    // Start loading scripts
    loadFixScripts();
    
    console.log("🔧 Fixes integrator initialized");
})();

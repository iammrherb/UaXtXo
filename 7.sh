#!/bin/bash
# stage-7-main-application.sh
# Purpose: Create the main application entry point

echo "=================================================="
echo "STAGE 7: MAIN APPLICATION ENTRY POINT"
echo "=================================================="

# Create index.html
echo "→ Creating index.html..."
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Portnox Total Cost Analyzer - Compare NAC solutions with comprehensive TCO and ROI analysis">
    <meta name="author" content="Portnox">
    
    <title>Portnox Total Cost Analyzer | Executive Decision Platform</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/img/favicon.png">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Main Styles -->
    <link rel="stylesheet" href="/css/main.css">
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js"></script>
</head>
<body>
    <div id="app">
        <!-- Application will be rendered here -->
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading Portnox Total Cost Analyzer...</p>
        </div>
    </div>
    
    <!-- Module Loader -->
    <script src="/js/core/module-loader.js"></script>
    
    <!-- Main Application -->
    <script src="/js/main.js"></script>
</body>
</html>
EOF

# Create main.js
echo "→ Creating main application script..."
cat > js/main.js << 'EOF'
/**
 * Main Application Entry Point
 */
(async function() {
    console.log('🚀 Starting Portnox Total Cost Analyzer...');
    
    try {
        // Load core modules
        console.log('Loading core modules...');
        await ModuleLoader.loadAll([
            'ConfigManager',
            'EventSystem',
            'ErrorHandler',
            'VendorDataManager',
            'UIManager'
        ]);
        
        // Initialize vendor data
        console.log('Initializing vendor data...');
        const VendorDataManager = ModuleLoader.get('VendorDataManager');
        await VendorDataManager.initialize();
        
        // Initialize UI
        console.log('Initializing UI...');
        const UIManager = ModuleLoader.get('UIManager');
        await UIManager.initialize();
        
        // Setup router
        setupRouter();
        
        // Render initial view
        UIManager.render();
        
        // Handle initial route
        handleRoute();
        
        console.log('✅ Application initialized successfully');
        
    } catch (error) {
        console.error('Failed to initialize application:', error);
        showErrorPage(error);
    }
    
    // Setup client-side routing
    function setupRouter() {
        window.addEventListener('popstate', handleRoute);
        
        // Handle initial load
        if (!window.location.hash) {
            window.location.hash = '#dashboard';
        }
    }
    
    function handleRoute() {
        const hash = window.location.hash.slice(1) || 'dashboard';
        const UIManager = ModuleLoader.get('UIManager');
        
        if (UIManager) {
            UIManager.switchView(hash);
        }
    }
    
    function showErrorPage(error) {
        document.getElementById('app').innerHTML = `
            <div class="error-page">
                <div class="error-content">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h1>Failed to Load Application</h1>
                    <p>${error.message}</p>
                    <button onclick="location.reload()" class="btn btn-primary">
                        Reload Page
                    </button>
                </div>
            </div>
        `;
    }
    
    // Global helper functions
    window.TCOAnalyzer = {
        // Export functionality
        exportToPDF: async function() {
            const UIManager = ModuleLoader.get('UIManager');
            UIManager.showNotification('PDF export coming soon', 'info');
        },
        
        exportToExcel: async function() {
            const UIManager = ModuleLoader.get('UIManager');
            UIManager.showNotification('Excel export coming soon', 'info');
        },
        
        // Navigation helpers
        navigateTo: function(view) {
            window.location.hash = '#' + view;
        },
        
        // Demo/Sales actions
        scheduleDemo: function() {
            window.open('https://www.portnox.com/demo/', '_blank');
        },
        
        startTrial: function() {
            window.open('https://www.portnox.com/free-trial/', '_blank');
        },
        
        contactSales: function() {
            window.open('https://www.portnox.com/contact/', '_blank');
        }
    };
    
    // Make some functions globally accessible for UI
    window.UI = {
        scheduleDemo: () => TCOAnalyzer.scheduleDemo(),
        startTrial: () => TCOAnalyzer.startTrial(),
        contactSales: () => TCOAnalyzer.contactSales(),
        exportReport: () => TCOAnalyzer.exportToPDF()
    };
    
})();
EOF

# Create sample configuration
echo "→ Creating sample configuration..."
cat > config/default.json << 'EOF'
{
    "app": {
        "name": "Portnox Total Cost Analyzer",
        "version": "4.0.0",
        "environment": "production"
    },
    "defaults": {
        "devices": 2500,
        "users": 1500,
        "locations": 5,
        "years": 3,
        "industry": "technology",
        "currency": "USD"
    },
    "selectedVendors": ["portnox", "cisco", "aruba"],
    "features": {
        "advancedAnalytics": true,
        "exportPDF": true,
        "exportExcel": true,
        "aiInsights": true
    }
}
EOF

# Create vendor logos
echo "→ Creating vendor logo placeholders..."
mkdir -p img/vendors
for vendor in portnox cisco aruba forescout fortinet extreme juniper microsoft packetfence arista foxpass securew2 radiusaas; do
    cat > img/vendors/${vendor}-logo.svg << EOF
<svg width="200" height="80" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="80" fill="#f0f0f0" stroke="#ddd" rx="8"/>
    <text x="100" y="45" text-anchor="middle" font-family="Arial" font-size="16" fill="#666">${vendor}</text>
</svg>
EOF
done

# Create service worker for offline support
echo "→ Creating service worker..."
cat > sw.js << 'EOF'
const CACHE_NAME = 'portnox-tco-v1';
const urlsToCache = [
    '/',
    '/css/main.css',
    '/js/main.js',
    '/js/core/module-loader.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
EOF

echo "✅ Stage 7 Complete: Main application entry point created"

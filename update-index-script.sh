#!/bin/bash

# Script to update index.html with new files

echo "📝 Updating index.html..."

# Backup original
cp index.html index.html.backup

# Create a temporary file with the updates
cat > temp_index_update.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zero Trust Total Cost Analyzer | Portnox Executive Intelligence Platform</title>
    <meta name="description" content="Executive Intelligence Platform - Comprehensive Zero Trust NAC analysis with advanced TCO/ROI calculations.">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="./img/vendors/portnox-icon.png">

    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Chart Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/apexcharts@3.44.0/dist/apexcharts.min.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/sankey.js"></script>
    <script src="https://code.highcharts.com/modules/waterfall.js"></script>
    <script src="https://code.highcharts.com/modules/heatmap.js"></script>
    <script src="https://code.highcharts.com/modules/treemap.js"></script>

    <!-- CSS -->
    <link rel="stylesheet" href="./css/ultimate-executive-center.css">
    <link rel="stylesheet" href="./css/ui-enhancements.css">
</head>
<body>
    <!-- Header -->
    <header class="ultimate-header">
        <div class="header-content">
            <div class="header-branding">
                <div class="portnox-logo">
                    <img src="./img/vendors/portnox-logo.png" alt="Portnox" onerror="this.style.display='none'">
                </div>
                <div class="header-titles">
                    <h1 class="main-title">Executive Intelligence Platform</h1>
                    <p class="sub-title">Zero Trust NAC Total Cost Analysis & Strategic Intelligence</p>
                </div>
            </div>
            <div class="header-actions">
                <button id="main-calculate-btn" class="header-btn primary">
                    <i class="fas fa-calculator"></i>
                    <span>Calculate TCO</span>
                </button>
                <button id="export-btn" class="header-btn secondary">
                    <i class="fas fa-file-export"></i>
                    <span>Export Report</span>
                </button>
                <button id="ai-insights-btn" class="header-btn secondary">
                    <i class="fas fa-brain"></i>
                    <span>AI Insights</span>
                </button>
                <button id="live-demo" class="header-btn highlight">
                    <i class="fas fa-video"></i>
                    <span>Live Demo</span>
                </button>
            </div>
        </div>
    </header>

    <!-- Main Container -->
    <div class="ultimate-container">
        <!-- Simplified Sidebar -->
        <aside class="ultimate-sidebar" id="sidebar">
            <div class="sidebar-content">
                <!-- Basic Configuration Only -->
                <div class="config-section">
                    <h4><i class="fas fa-network-wired"></i> Device Configuration</h4>
                    <div class="config-grid">
                        <div class="config-item">
                            <label for="device-count">Device Count</label>
                            <input type="number" id="device-count" class="enhanced-input" value="1000" min="100" max="50000">
                        </div>
                        <div class="config-item">
                            <label for="location-count">Locations</label>
                            <input type="number" id="location-count" class="enhanced-input" value="3" min="1" max="100">
                        </div>
                    </div>
                </div>
                
                <div class="config-section">
                    <h4><i class="fas fa-building"></i> Organization</h4>
                    <div class="config-grid">
                        <div class="config-item full-width">
                            <label for="company-size">Company Size</label>
                            <select id="company-size" class="enhanced-select">
                                <option value="startup">Startup (1-50)</option>
                                <option value="small">Small (51-250)</option>
                                <option value="medium" selected>Medium (251-1000)</option>
                                <option value="large">Large (1001-5000)</option>
                                <option value="enterprise">Enterprise (5000+)</option>
                            </select>
                        </div>
                        <div class="config-item full-width">
                            <label for="analysis-period">Analysis Period</label>
                            <select id="analysis-period" class="enhanced-select">
                                <option value="1">1 Year</option>
                                <option value="3" selected>3 Years</option>
                                <option value="5">5 Years</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="config-section">
                    <h4><i class="fas fa-dollar-sign"></i> Financial</h4>
                    <div class="config-grid">
                        <div class="config-item">
                            <label for="fte-cost">FTE Cost ($/year)</label>
                            <input type="number" id="fte-cost" class="enhanced-input" value="100000" min="50000" max="200000">
                        </div>
                        <div class="config-item">
                            <label for="breach-cost">Breach Cost ($)</label>
                            <input type="number" id="breach-cost" class="enhanced-input" value="4350000" min="1000000" max="10000000">
                        </div>
                    </div>
                </div>
            </div>
        </aside>
        
        <!-- Main Content Area -->
        <main class="ultimate-content" id="main-content">
            <!-- Content will be dynamically loaded -->
        </main>
    </div>

    <!-- Scripts in correct order -->
    <!-- Core Data -->
    <script src="./js/enhancements/comprehensive-data-enhancement.js"></script>
    <script src="./js/data/comprehensive-vendor-data.js"></script>
    
    <!-- Views -->
    <script src="./js/views/modern-executive-dashboard.js"></script>
    
    <!-- Features -->
    <script src="./js/features/industries-compliance-tab.js"></script>
    <script src="./js/features/ai-insights-engine.js"></script>
    <script src="./js/exports/professional-export-system.js"></script>
    
    <!-- Updates and Fixes -->
    <script src="./js/updates/fix-vendor-display.js"></script>
    <script src="./js/updates/implement-all-charts.js"></script>
    <script src="./js/update-index.js"></script>
    
    <!-- Core App -->
    <script src="./js/core/app-initializer.js"></script>
</body>
</html>
EOF

# Replace the original index.html
mv temp_index_update.html index.html

echo "✅ index.html updated successfully!"
echo "📋 Backup saved as index.html.backup"

# Run the main fix script
chmod +x fix-tco-bash-script.sh
./fix-tco-bash-script.sh

# Summary
echo "
🎉 ALL UPDATES COMPLETE!

The TCO Analyzer now includes:
✅ Removed vendors: Genian, Sophos, Palo Alto
✅ Added vendors: Cisco, Juniper, Microsoft, Aruba, Arista, Extreme, 
   Foxpass, SecureW2, PacketFence, Fortinet, Forescout, RadiusSaas, Pulse
✅ Real TCO calculations with accurate market pricing
✅ All charts implemented (ROI, Cash Flow, Sensitivity, etc.)
✅ Enhanced UI with comprehensive vendor comparison
✅ Debugging tools (run debugVendorCalculations() in console)

To complete setup:
1. git add -A
2. git commit -m 'Complete TCO fix: remove vendors, add real calculations, implement all charts'
3. git push

Test the application:
1. Open index.html in browser
2. Open Developer Console (F12)
3. Check for any errors
4. Run: debugVendorCalculations()
5. Verify all vendors appear in the UI
6. Test all tabs and charts
"

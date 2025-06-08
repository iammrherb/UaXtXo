#!/bin/bash

# Portnox TCO Analyzer - Diagnostic and Fix Script

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 Running Platform Diagnostics...${NC}"

# Check current vendor database
echo -e "${YELLOW}Checking vendor database...${NC}"
if grep -q "portnox.*cisco-ise.*aruba-clearpass.*forescout.*fortinet.*pulsesecure.*extreme.*arista.*juniper.*microsoft.*packetfence.*foxpass.*securew2" js/vendor-database.js 2>/dev/null; then
    echo -e "${GREEN}✓ All vendors found in database${NC}"
else
    echo -e "${RED}✗ Vendor database incomplete${NC}"
    NEEDS_FIX=true
fi

# Check if modules are loading
echo -e "${YELLOW}Checking module loader...${NC}"
if [ -f "js/module-loader.js" ]; then
    echo -e "${GREEN}✓ Module loader exists${NC}"
else
    echo -e "${RED}✗ Module loader missing${NC}"
    NEEDS_FIX=true
fi

# Fix logo path issue
echo -e "${YELLOW}Fixing logo paths...${NC}"
if [ -f "index.html" ]; then
    # Update logo path in header
    sed -i 's|img/vendors/portnox-logo.png|portnox-logo.svg|g' index.html 2>/dev/null || \
    sed -i '' 's|img/vendors/portnox-logo.png|portnox-logo.svg|g' index.html 2>/dev/null || true
    echo -e "${GREEN}✓ Logo path updated${NC}"
fi

# Create quick fix for vendor initialization
echo -e "${BLUE}Creating initialization fix...${NC}"

cat > js/vendor-init-fix.js << 'EOF'
// Vendor Initialization Fix
(function() {
    console.log('🔧 Applying vendor initialization fix...');
    
    // Wait for vendor UI to be ready
    function checkAndInitialize() {
        if (window.VendorSelectionUI && window.VendorSelectionUI.selectVendor) {
            // Force select Portnox and Cisco ISE
            setTimeout(() => {
                console.log('📌 Pre-selecting vendors...');
                window.VendorSelectionUI.selectVendor('portnox');
                window.VendorSelectionUI.selectVendor('cisco-ise');
                
                // Force a recalculation
                const recalcBtn = document.getElementById('recalculateBtn');
                if (recalcBtn) {
                    recalcBtn.click();
                }
            }, 1000);
        } else {
            setTimeout(checkAndInitialize, 100);
        }
    }
    
    // Start checking after DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAndInitialize);
    } else {
        checkAndInitialize();
    }
})();
EOF

# Add the fix to index.html
if ! grep -q "vendor-init-fix.js" index.html 2>/dev/null; then
    sed -i 's|</body>|<script src="js/vendor-init-fix.js"></script>\n</body>|' index.html 2>/dev/null || \
    sed -i '' 's|</body>|<script src="js/vendor-init-fix.js"></script>\n</body>|' index.html 2>/dev/null || {
        echo -e "${YELLOW}⚠ Could not automatically add fix to index.html${NC}"
        echo -e "${YELLOW}  Please add this before </body>:${NC}"
        echo '  <script src="js/vendor-init-fix.js"></script>'
    }
fi

# Create a complete vendor database check
echo -e "${BLUE}Verifying vendor database content...${NC}"

cat > check-vendors.js << 'EOF'
// Check vendor database
const fs = require('fs');
const vendorDbContent = fs.readFileSync('js/vendor-database.js', 'utf8');
const vendorCount = (vendorDbContent.match(/id: '[^']+'/g) || []).length;
console.log(`Found ${vendorCount} vendors in database`);

// Expected vendors
const expectedVendors = [
    'portnox', 'cisco-ise', 'aruba-clearpass', 'forescout', 
    'fortinet', 'pulsesecure', 'extreme', 'arista', 
    'juniper', 'microsoft', 'packetfence', 'foxpass', 'securew2'
];

expectedVendors.forEach(vendor => {
    if (vendorDbContent.includes(`id: '${vendor}'`)) {
        console.log(`✓ ${vendor}`);
    } else {
        console.log(`✗ ${vendor} MISSING`);
    }
});
EOF

# Run vendor check if node is available
if command -v node >/dev/null 2>&1; then
    node check-vendors.js
    rm check-vendors.js
else
    echo -e "${YELLOW}Node.js not available for vendor check${NC}"
fi

# Create enhanced init with better logging
echo -e "${BLUE}Creating enhanced initialization...${NC}"

cat > js/init-enhanced.js << 'EOF'
// Enhanced Platform Initialization with Debugging
(function() {
    'use strict';

    console.log('🚀 Enhanced Platform Initialization Starting...');

    window.addEventListener('DOMContentLoaded', function() {
        console.log('📄 DOM Content Loaded');
        
        // Check for required modules
        const requiredModules = [
            'VendorDatabase', 'ChartManager', 'VendorSelectionUI', 
            'ComplianceDatabase', 'RiskSecurityDatabase', 'IndustryDatabase'
        ];
        
        console.log('🔍 Checking for required modules...');
        requiredModules.forEach(module => {
            const isLoaded = window.ModuleLoader && window.ModuleLoader.isLoaded(module);
            console.log(`  ${module}: ${isLoaded ? '✓ Loaded' : '✗ Not loaded'}`);
        });
        
        // Enhanced module ready handler
        ModuleLoader.whenReady(requiredModules, function(VendorDB, ChartManager, VendorUI, ComplianceDB, RiskDB, IndustryDB) {
            console.log('✅ All modules ready!');
            
            // Log module capabilities
            console.log(`📊 Vendors available: ${VendorDB.getVendorCount ? VendorDB.getVendorCount() : 'Unknown'}`);
            console.log(`✅ Compliance frameworks: ${ComplianceDB.getFrameworks ? ComplianceDB.getFrameworks().length : 'Unknown'}`);
            console.log(`🛡️ Risk factors: ${RiskDB.getRiskFactors ? RiskDB.getRiskFactors().length : 'Unknown'}`);
            
            // Hide loading overlay
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                console.log('🎭 Hiding loading overlay');
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 300);
            }
            
            // Initialize vendor selection with debugging
            console.log('🏷️ Initializing vendor selection UI...');
            if (VendorUI && VendorUI.initialize) {
                VendorUI.initialize();
                
                // Force vendor selection after UI is ready
                setTimeout(() => {
                    console.log('📌 Pre-selecting default vendors...');
                    if (VendorUI.selectVendor) {
                        VendorUI.selectVendor('portnox');
                        console.log('  ✓ Selected Portnox');
                        
                        VendorUI.selectVendor('cisco-ise');
                        console.log('  ✓ Selected Cisco ISE');
                        
                        // Log selected vendors
                        const selected = VendorUI.getSelectedVendors();
                        console.log(`  📋 Currently selected: ${selected.join(', ')}`);
                        
                        // Force initial chart render
                        if (ChartManager && ChartManager.initializeCharts && selected.length >= 2) {
                            console.log('📈 Initializing charts...');
                            ChartManager.initializeCharts(selected);
                        }
                    }
                }, 1000);
            }
            
            // Set up tab navigation
            setupTabNavigation();
            
            // Set up action buttons
            setupActionButtons();
            
            // Set up configuration controls
            setupConfigControls();
            
            console.log('✅ Platform initialization complete!');
        });
    });

    function setupTabNavigation() {
        console.log('🗂️ Setting up tab navigation...');
        const tabs = document.querySelectorAll('.nav-tab');
        const panels = document.querySelectorAll('.tab-panel');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.tab;
                console.log(`📑 Switching to tab: ${targetTab}`);
                
                // Update active states
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                tab.classList.add('active');
                const panel = document.getElementById(`${targetTab}-tab`);
                if (panel) {
                    panel.classList.add('active');
                }
                
                // Trigger chart refresh
                if (window.ChartManager && window.ChartManager.refreshTab) {
                    window.ChartManager.refreshTab(targetTab);
                }
            });
        });
    }

    function setupActionButtons() {
        console.log('🔘 Setting up action buttons...');
        
        // Recalculate button
        const recalcBtn = document.getElementById('recalculateBtn');
        if (recalcBtn) {
            recalcBtn.addEventListener('click', () => {
                console.log('🔄 Recalculate clicked');
                const selected = window.VendorSelectionUI ? 
                    window.VendorSelectionUI.getSelectedVendors() : [];
                console.log(`  Selected vendors: ${selected.join(', ')}`);
                
                if (selected.length >= 2) {
                    if (window.ChartManager && window.ChartManager.refreshCharts) {
                        window.ChartManager.refreshCharts();
                    }
                } else {
                    alert('Please select at least 2 vendors for comparison');
                }
            });
        }

        // Export button
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                console.log('📥 Export clicked');
                if (window.ReportGenerator && window.ReportGenerator.exportPDF) {
                    window.ReportGenerator.exportPDF();
                }
            });
        }

        // Schedule demo button
        const demoBtn = document.getElementById('scheduleDemoBtn');
        if (demoBtn) {
            demoBtn.addEventListener('click', () => {
                console.log('📅 Schedule demo clicked');
                window.open('https://portnox.com/schedule-demo', '_blank');
            });
        }
    }

    function setupConfigControls() {
        console.log('⚙️ Setting up configuration controls...');
        
        // Device count slider
        const deviceSlider = document.getElementById('deviceCount');
        const deviceDisplay = document.getElementById('deviceCountDisplay');
        
        if (deviceSlider && deviceDisplay) {
            deviceSlider.addEventListener('input', (e) => {
                const count = parseInt(e.target.value);
                deviceDisplay.textContent = count.toLocaleString();
                console.log(`📱 Device count changed to: ${count}`);
                
                // Update charts
                if (window.ChartManager && window.ChartManager.updateDeviceCount) {
                    window.ChartManager.updateDeviceCount(count);
                }
            });
        }
        
        // Industry selector
        const industrySelect = document.getElementById('industrySelect');
        if (industrySelect) {
            industrySelect.addEventListener('change', (e) => {
                const industry = e.target.value;
                console.log(`🏭 Industry changed to: ${industry}`);
                
                if (window.ChartManager && window.ChartManager.updateIndustry) {
                    window.ChartManager.updateIndustry(industry);
                }
            });
        }
    }

})();
EOF

# Replace init.js with enhanced version
echo -e "${BLUE}Replacing initialization script...${NC}"
cp js/init-enhanced.js js/init.js

# Create a manual fix HTML file for testing
echo -e "${BLUE}Creating test page...${NC}"

cat > test-fix.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>TCO Analyzer - Diagnostic Test</title>
    <script src="js/module-loader.js"></script>
    <script src="js/vendor-database.js"></script>
</head>
<body>
    <h1>Platform Diagnostic Test</h1>
    <div id="results"></div>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const results = document.getElementById('results');
            
            // Wait for modules
            setTimeout(() => {
                const VendorDB = ModuleLoader.get('VendorDatabase');
                
                if (VendorDB) {
                    const vendors = VendorDB.getAllVendors();
                    results.innerHTML = `
                        <h2>✅ VendorDatabase loaded</h2>
                        <p>Found ${vendors.length} vendors:</p>
                        <ul>
                            ${vendors.map(v => `<li>${v.id}: ${v.name}</li>`).join('')}
                        </ul>
                    `;
                } else {
                    results.innerHTML = '<h2>❌ VendorDatabase NOT loaded</h2>';
                }
            }, 1000);
        });
    </script>
</body>
</html>
EOF

# Create CSS fix for logo visibility
echo -e "${BLUE}Adding CSS fixes...${NC}"

cat >> styles/main.css << 'EOF'

/* Logo fallback styles */
.logo {
    height: 40px;
    max-width: 200px;
    object-fit: contain;
}

.logo[src*="portnox"] {
    /* Fallback for missing logo */
    position: relative;
}

.logo[src*="portnox"]:after {
    content: "PORTNOX";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    font-weight: bold;
    color: #00a4e4;
    font-size: 1.5rem;
}

/* Hide broken image icon */
.logo:not([src]), .logo[src=""] {
    opacity: 0;
}
EOF

echo -e "${GREEN}✅ Diagnostic and fixes applied!${NC}"
echo
echo -e "${YELLOW}Troubleshooting Steps:${NC}"
echo "1. Open test-fix.html in your browser to verify vendor database"
echo "2. Check browser console for detailed initialization logs"
echo "3. Verify that vendor pills appear in the UI"
echo "4. Click on Cisco ISE to select it (Portnox should be pre-selected)"
echo "5. Click Recalculate button"
echo
echo -e "${BLUE}Common Issues:${NC}"
echo "- If vendors don't appear: Check js/vendor-database.js exists and is valid"
echo "- If charts don't load: Ensure Highcharts CDN is accessible"
echo "- If no pre-selection: Wait 2-3 seconds after page load"
echo
echo -e "${GREEN}Quick Manual Fix:${NC}"
echo "In browser console, run:"
echo "  VendorSelectionUI.selectVendor('portnox');"
echo "  VendorSelectionUI.selectVendor('cisco-ise');"
echo "  ChartManager.refreshCharts();"

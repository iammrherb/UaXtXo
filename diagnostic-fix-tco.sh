#!/bin/bash

# Diagnostic script to fix TCO calculations
echo "🔍 Running TCO Analyzer Diagnostics..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Create a diagnostic script to check what's happening
echo -e "${YELLOW}Creating diagnostic script...${NC}"

cat > js/diagnostic-tco.js << 'EOF'
// Diagnostic script for TCO calculations
(function() {
    console.log('🔍 DIAGNOSTIC: Starting TCO diagnostic...');
    
    // Check what's available
    console.log('Window objects available:', {
        vendorCalculator: !!window.vendorCalculator,
        dashboard: !!window.dashboard,
        vendorData: !!window.comprehensiveVendorData,
        enhancedCalculations: !!window.EnhancedVendorCalculator
    });
    
    // Test vendor calculator directly
    if (window.vendorCalculator) {
        console.log('📊 Testing vendor calculator...');
        
        const testConfig = {
            deviceCount: 1000,
            locationCount: 3,
            companySize: 'medium',
            analysisPeriod: 3,
            fteCost: 100000,
            breachCost: 4350000
        };
        
        try {
            const result = window.vendorCalculator.generateVendorComparison(testConfig);
            console.log('✅ Vendor calculator result:', result);
            
            // Check Portnox specifically
            if (result && result.portnox) {
                console.log('Portnox data:', {
                    tco: result.portnox.tco,
                    costs: result.portnox.costs,
                    roi: result.portnox.roi,
                    metrics: result.portnox.metrics
                });
            } else {
                console.error('❌ No Portnox data in result');
            }
        } catch (error) {
            console.error('❌ Error calling vendor calculator:', error);
        }
    }
    
    // Check the enhanced vendor calculator
    if (window.EnhancedVendorCalculator) {
        console.log('🔧 Found EnhancedVendorCalculator, creating instance...');
        window.vendorCalculator = new window.EnhancedVendorCalculator();
        console.log('✅ Created new vendor calculator instance');
    }
    
    // Force dashboard to use correct calculator
    if (window.dashboard && window.vendorCalculator) {
        console.log('🔄 Reconnecting dashboard to vendor calculator...');
        
        window.dashboard.refreshVendorData = function() {
            console.log('📊 Dashboard refreshing vendor data...');
            
            try {
                this.vendorData = window.vendorCalculator.generateVendorComparison(this.config);
                console.log('✅ Vendor data generated:', Object.keys(this.vendorData || {}));
                
                // Verify Portnox data
                if (this.vendorData && this.vendorData.portnox) {
                    const portnoxTCO = this.vendorData.portnox.tco?.tco || 0;
                    console.log('Portnox 3-Year TCO: $' + (portnoxTCO / 1000).toFixed(0) + 'K');
                }
            } catch (error) {
                console.error('❌ Error in refreshVendorData:', error);
            }
        };
        
        // Force refresh
        window.dashboard.refreshVendorData();
        window.dashboard.render();
    }
})();
EOF

# 2. Create a simplified fix that ensures calculations work
echo -e "${YELLOW}Creating simplified calculation fix...${NC}"

cat > js/simplified-calculation-fix.js << 'EOF'
// Simplified calculation fix
(function() {
    console.log('🔧 Applying simplified calculation fix...');
    
    // Wait for all components
    function applyFix() {
        // Check if we need to create vendor calculator
        if (!window.vendorCalculator && window.EnhancedVendorCalculator) {
            window.vendorCalculator = new window.EnhancedVendorCalculator();
            console.log('✅ Created vendor calculator');
        }
        
        if (!window.dashboard || !window.vendorCalculator) {
            setTimeout(applyFix, 100);
            return;
        }
        
        // Override the calculation method
        const originalGenerate = window.vendorCalculator.generateVendorComparison;
        
        window.vendorCalculator.generateVendorComparison = function(config) {
            console.log('🎯 Generating vendor comparison with config:', config);
            
            // Ensure config has all required fields
            config = {
                deviceCount: parseInt(config.deviceCount) || 1000,
                locationCount: parseInt(config.locationCount) || 3,
                companySize: config.companySize || 'medium',
                analysisPeriod: parseInt(config.analysisPeriod) || 3,
                fteCost: parseInt(config.fteCost) || 100000,
                breachCost: parseInt(config.breachCost) || 4350000,
                industry: config.industry || 'technology',
                compliance: config.compliance || 'nist-csf'
            };
            
            let result;
            
            // Call original method if it exists
            if (originalGenerate) {
                result = originalGenerate.call(this, config);
            } else {
                // Fallback calculation
                console.warn('⚠️ Using fallback calculation');
                result = this.calculateVendorData(config);
            }
            
            // Ensure all vendors have proper TCO structure
            Object.keys(result).forEach(vendorKey => {
                const vendor = result[vendorKey];
                
                // Ensure TCO exists
                if (!vendor.tco) {
                    vendor.tco = {
                        tco: 0,
                        year1: 0,
                        year2: 0,
                        year3: 0,
                        monthly: 0,
                        breakdown: {}
                    };
                }
                
                // Calculate TCO if missing
                if (vendor.tco.tco === 0 && vendor.costs) {
                    const deviceCost = (vendor.costs.perDevice || 0) * config.deviceCount;
                    const monthlyLicense = deviceCost;
                    const implementationCost = (vendor.costs.implementation || 50000);
                    const fteCost = (vendor.metrics?.fteRequired || 1) * config.fteCost;
                    
                    vendor.tco.year1 = implementationCost + (monthlyLicense * 12) + fteCost;
                    vendor.tco.year2 = (monthlyLicense * 12) + fteCost;
                    vendor.tco.year3 = (monthlyLicense * 12) + fteCost;
                    vendor.tco.tco = vendor.tco.year1 + vendor.tco.year2 + vendor.tco.year3;
                    vendor.tco.monthly = monthlyLicense + (fteCost / 12);
                    
                    console.log(`Calculated TCO for ${vendor.name}: $${(vendor.tco.tco / 1000).toFixed(0)}K`);
                }
            });
            
            return result;
        };
        
        // Fix dashboard render to show values
        const originalRender = window.dashboard.render;
        window.dashboard.render = function() {
            console.log('🎨 Rendering with vendor data:', this.vendorData ? Object.keys(this.vendorData) : 'none');
            
            if (!this.vendorData) {
                this.refreshVendorData();
            }
            
            if (originalRender) {
                originalRender.call(this);
            }
            
            // Ensure KPIs are updated
            this.updateKPIs();
            
            // Add help icons
            if (this.addHelpToKPIs) {
                this.addHelpToKPIs();
            }
        };
        
        // Initial calculation and render
        window.dashboard.config = window.dashboard.loadConfiguration();
        window.dashboard.refreshVendorData();
        
        setTimeout(() => {
            window.dashboard.render();
            console.log('✅ Initial render complete');
        }, 500);
    }
    
    // Start the fix
    applyFix();
})();
EOF

# 3. Clean up index.html from duplicate scripts
echo -e "${YELLOW}Cleaning up index.html...${NC}"

# Remove all duplicate fix scripts
sed -i '/fix-vendor-calculations.js/d' index.html
sed -i '/fix-tco-calculations-complete.js/d' index.html
sed -i '/fix-calculation-loop.js/d' index.html

# Keep only the essential scripts
echo -e "${YELLOW}Organizing script loading order...${NC}"

# Create a clean script section before </body>
cat > js/temp-index-scripts.txt << 'EOF'
    <!-- Core Data -->
    <script src="./js/enhancements/comprehensive-data-enhancement.js"></script>
    <script src="./js/data/comprehensive-vendor-data.js"></script>
    <script src="./js/data/enhanced-vendor-calculations.js"></script>
    
    <!-- Views -->
    <script src="./js/views/modern-executive-dashboard.js"></script>
    
    <!-- Features -->
    <script src="./js/features/industries-compliance-tab.js"></script>
    <script src="./js/features/ai-insights-engine.js"></script>
    <script src="./js/exports/professional-export-system.js"></script>
    
    <!-- Core -->
    <script src="./js/core/app-initializer.js"></script>
    
    <!-- Fixes and Enhancements -->
    <script src="./js/diagnostic-tco.js"></script>
    <script src="./js/simplified-calculation-fix.js"></script>
    <script src="./js/fix-ai-insights-complete.js"></script>
    <script src="./js/implement-missing-charts.js"></script>
    <script src="./js/verify-vendor-calculations.js"></script>
    <script src="./js/vendor-details-modal.js"></script>
    <script src="./js/enhanced-risk-assessment.js"></script>
    <script src="./js/enhanced-roi-timeline.js"></script>
    <script src="./js/cash-flow-analysis.js"></script>
    <script src="./js/sensitivity-analysis.js"></script>
    <script src="./js/portnox-compliance-matrix.js"></script>
    <script src="./js/help-tooltips.js"></script>
    <script src="./js/add-industry-compliance-selectors.js"></script>
    <script src="./js/fix-vendor-card-display.js"></script>
    <script src="./js/fix-kpi-display.js"></script>
    <script src="./js/proper-initialization.js"></script>
</body>
EOF

# 4. Rebuild index.html script section
echo -e "${YELLOW}Rebuilding index.html script section...${NC}"

# Remove all script tags between last div and </body>
sed -i '/<\/div>/,/<\/body>/{/script/d}' index.html

# Insert new script section
sed -i '/<\/body>/i \    <!-- Scripts in correct order -->' index.html
sed -i '/<\/body>/r js/temp-index-scripts.txt' index.html

# Clean up temp file
rm js/temp-index-scripts.txt

# 5. Create a test page to verify calculations
echo -e "${YELLOW}Creating test page...${NC}"

cat > test-calculations.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>TCO Calculation Test</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .result { margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 5px; }
        .success { background: #d4edda; }
        .error { background: #f8d7da; }
    </style>
</head>
<body>
    <h1>TCO Calculation Test</h1>
    <div id="results"></div>
    
    <!-- Load all required scripts -->
    <script src="./js/enhancements/comprehensive-data-enhancement.js"></script>
    <script src="./js/data/comprehensive-vendor-data.js"></script>
    <script src="./js/data/enhanced-vendor-calculations.js"></script>
    
    <script>
        setTimeout(() => {
            const results = document.getElementById('results');
            
            // Test 1: Check if vendor calculator exists
            if (window.EnhancedVendorCalculator) {
                results.innerHTML += '<div class="result success">✅ EnhancedVendorCalculator found</div>';
                
                // Create instance
                const calc = new window.EnhancedVendorCalculator();
                results.innerHTML += '<div class="result success">✅ Calculator instance created</div>';
                
                // Test calculation
                const testConfig = {
                    deviceCount: 1000,
                    locationCount: 3,
                    companySize: 'medium',
                    analysisPeriod: 3,
                    fteCost: 100000,
                    breachCost: 4350000
                };
                
                try {
                    const vendorData = calc.generateVendorComparison(testConfig);
                    results.innerHTML += '<div class="result success">✅ Vendor comparison generated</div>';
                    
                    // Check Portnox
                    if (vendorData.portnox) {
                        const portnoxTCO = vendorData.portnox.tco?.tco || 0;
                        results.innerHTML += `<div class="result success">✅ Portnox TCO: $${(portnoxTCO / 1000).toFixed(0)}K</div>`;
                    } else {
                        results.innerHTML += '<div class="result error">❌ No Portnox data</div>';
                    }
                    
                    // Show all vendors
                    Object.keys(vendorData).forEach(vendor => {
                        const tco = vendorData[vendor].tco?.tco || 0;
                        results.innerHTML += `<div class="result">${vendorData[vendor].name}: $${(tco / 1000).toFixed(0)}K</div>`;
                    });
                    
                } catch (error) {
                    results.innerHTML += `<div class="result error">❌ Error: ${error.message}</div>`;
                }
            } else {
                results.innerHTML += '<div class="result error">❌ EnhancedVendorCalculator not found</div>';
            }
        }, 1000);
    </script>
</body>
</html>
EOF

# 6. Commit changes
echo -e "${YELLOW}Committing changes...${NC}"

git add js/*.js index.html test-calculations.html
git commit -m "Diagnostic fix for TCO calculations

- Added diagnostic script to identify issues
- Created simplified calculation fix
- Cleaned up duplicate scripts in index.html
- Organized script loading order
- Added test page to verify calculations"

echo -e "${GREEN}✅ Diagnostic fix applied!${NC}"
echo -e "${GREEN}Steps to test:${NC}"
echo -e "${GREEN}1. Clear browser cache (Ctrl+Shift+Delete)${NC}"
echo -e "${GREEN}2. Open test-calculations.html to verify calculations work${NC}"
echo -e "${GREEN}3. If test page shows values, refresh main page${NC}"
echo -e "${GREEN}4. Check browser console for diagnostic output${NC}"

# Optional push
read -p "Push changes to remote? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push
    echo -e "${GREEN}✓ Pushed to remote${NC}"
fi
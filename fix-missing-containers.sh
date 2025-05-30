#!/bin/bash

# Fix for Missing Containers and Highcharts Loading Issues
# This script ensures Highcharts loads and containers are created

echo "🔧 Fixing missing containers and Highcharts loading..."

# Fix 1: Ensure Highcharts is loaded properly in index.html
echo "📊 Checking Highcharts script tags..."
# Check if Highcharts scripts are in the correct order
if ! grep -q "highcharts.js" index.html; then
    echo "❌ Highcharts not found in index.html"
    exit 1
fi

# Fix 2: Create a bootstrap loader
cat > js/views/bootstrap-loader.js << 'EOF'
/**
 * Bootstrap Loader - Ensures all dependencies are loaded
 */

window.BootstrapLoader = {
    required: {
        Highcharts: false,
        platform: false,
        vendorDatabase: false
    },
    
    checkDependencies() {
        // Check Highcharts
        if (typeof Highcharts !== 'undefined') {
            this.required.Highcharts = true;
            console.log('✅ Highcharts loaded');
        } else {
            console.error('❌ Highcharts NOT loaded - checking script tags');
            this.loadHighchartsManually();
        }
        
        // Check platform
        if (window.platform) {
            this.required.platform = true;
            console.log('✅ Platform loaded');
        }
        
        // Check vendor database
        if (window.ComprehensiveVendorDatabase) {
            this.required.vendorDatabase = true;
            console.log('✅ Vendor database loaded');
        }
        
        return Object.values(this.required).every(v => v);
    },
    
    loadHighchartsManually() {
        console.log('🔄 Attempting manual Highcharts load...');
        
        // Create script tags if missing
        const scripts = [
            'https://code.highcharts.com/highcharts.js',
            'https://code.highcharts.com/highcharts-more.js',
            'https://code.highcharts.com/modules/heatmap.js',
            'https://code.highcharts.com/modules/solid-gauge.js'
        ];
        
        scripts.forEach(src => {
            if (!document.querySelector(`script[src="${src}"]`)) {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => console.log(`✅ Loaded: ${src}`);
                script.onerror = () => console.error(`❌ Failed to load: ${src}`);
                document.head.appendChild(script);
            }
        });
    },
    
    waitForDependencies(callback) {
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds
        
        const check = () => {
            attempts++;
            
            if (this.checkDependencies()) {
                console.log('🚀 All dependencies ready!');
                callback();
            } else if (attempts < maxAttempts) {
                console.log(`⏳ Waiting for dependencies... (${attempts}/${maxAttempts})`);
                setTimeout(check, 100);
            } else {
                console.error('❌ Dependencies failed to load after 5 seconds');
                // Try to continue anyway
                callback();
            }
        };
        
        check();
    }
};

// Start checking immediately
document.addEventListener('DOMContentLoaded', () => {
    window.BootstrapLoader.waitForDependencies(() => {
        console.log('🎉 Bootstrap complete, application can start');
        
        // Trigger platform initialization if needed
        if (window.platform && !window.platform.calculationResults) {
            console.log('🔄 Triggering initial calculation...');
            setTimeout(() => {
                if (window.platform.calculate) {
                    window.platform.calculate();
                }
            }, 500);
        }
    });
});
EOF

# Fix 3: Update financial overview to ensure containers exist
cat > js/views/financial-overview-fix.js << 'EOF'
/**
 * Financial Overview Fix - Ensures containers are created
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('💰 Applying financial overview fixes...');
    
    const applyFix = () => {
        if (!window.platform) {
            setTimeout(applyFix, 100);
            return;
        }
        
        // Store original render method
        const originalRenderFinancial = window.platform.renderFinancialOverview;
        
        // Override with container-ensuring version
        window.platform.renderFinancialOverview = function(container) {
            if (!container) {
                console.error('No container provided to renderFinancialOverview');
                return;
            }
            
            console.log('📊 Rendering financial overview with container checks...');
            
            // Ensure we have calculation results
            if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                container.innerHTML = `
                    <div class="financial-overview">
                        <div class="no-data" style="padding: 40px; text-align: center; color: #94A3B8;">
                            <h3>Calculating financial analysis...</h3>
                            <p>Please wait while we process the data.</p>
                        </div>
                    </div>
                `;
                
                // Try to calculate if not already doing so
                if (!this.isCalculating) {
                    console.log('🔄 Triggering calculation from financial view...');
                    this.calculate();
                }
                return;
            }
            
            // Create the full financial overview HTML
            const portnoxResult = this.calculationResults.portnox;
            if (!portnoxResult) {
                console.error('No Portnox result found');
                return;
            }
            
            container.innerHTML = `
                <div class="financial-overview">
                    <!-- Executive Summary -->
                    <div class="executive-summary-card">
                        <h2>Executive Financial Summary</h2>
                        <div class="summary-grid">
                            <div class="summary-item highlight">
                                <h3>Total Savings</h3>
                                <div class="value">$${Math.round((portnoxResult.year3?.roi?.dollarValue || 0) / 1000)}K</div>
                                <p>3-year advantage</p>
                            </div>
                            <div class="summary-item">
                                <h3>Payback Period</h3>
                                <div class="value">${portnoxResult.year3?.roi?.paybackMonths || 12} months</div>
                                <p>Time to ROI</p>
                            </div>
                            <div class="summary-item">
                                <h3>3-Year ROI</h3>
                                <div class="value">${portnoxResult.year3?.roi?.percentage || 0}%</div>
                                <p>Return on investment</p>
                            </div>
                            <div class="summary-item">
                                <h3>Per Device Cost</h3>
                                <div class="value">$${Math.round((portnoxResult.year3?.tco?.perDevice || 0) / 36)}/mo</div>
                                <p>All-inclusive</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- TCO Comparison Chart -->
                    <div class="chart-section">
                        <h3>Total Cost of Ownership Comparison</h3>
                        <div class="chart-grid">
                            <div class="chart-container">
                                <h4>3-Year TCO by Vendor</h4>
                                <div id="tco-comparison-chart" class="chart-placeholder" style="height: 400px; background: #334155; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                    <span style="color: #94A3B8;">Loading chart...</span>
                                </div>
                            </div>
                            <div class="chart-container">
                                <h4>ROI Timeline</h4>
                                <div id="roi-timeline-chart" class="chart-placeholder" style="height: 400px; background: #334155; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                    <span style="color: #94A3B8;">Loading chart...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Cost Breakdown -->
                    <div class="cost-breakdown-section">
                        <h3>Detailed Cost Breakdown</h3>
                        <div class="cost-breakdown-grid">
                            ${this.renderCostBreakdown ? this.renderCostBreakdown() : ''}
                        </div>
                    </div>
                    
                    <!-- Recommendations -->
                    <div class="recommendations-section">
                        <h3>Financial Recommendations</h3>
                        <div class="recommendation-cards">
                            ${this.renderFinancialRecommendations ? this.renderFinancialRecommendations() : ''}
                        </div>
                    </div>
                </div>
            `;
            
            // Now render charts after ensuring containers exist
            setTimeout(() => {
                console.log('🎯 Containers should now exist, rendering charts...');
                
                // Check if Highcharts is available
                if (typeof Highcharts === 'undefined') {
                    console.error('❌ Highcharts still not available!');
                    document.querySelectorAll('.chart-placeholder').forEach(el => {
                        el.innerHTML = '<span style="color: #EF4444;">Error: Highcharts not loaded</span>';
                    });
                    return;
                }
                
                // Check containers exist
                const tcoContainer = document.getElementById('tco-comparison-chart');
                const roiContainer = document.getElementById('roi-timeline-chart');
                
                if (tcoContainer) {
                    console.log('✅ TCO container found');
                    if (this.renderTCOComparison) {
                        this.renderTCOComparison();
                    }
                } else {
                    console.error('❌ TCO container still missing!');
                }
                
                if (roiContainer) {
                    console.log('✅ ROI container found');
                    if (this.renderROITimeline) {
                        this.renderROITimeline();
                    }
                } else {
                    console.error('❌ ROI container still missing!');
                }
            }, 300);
        };
        
        console.log('✅ Financial overview fix applied');
        
        // If we're already on financial overview, re-render
        if (window.platform.activeTab === 'financial-overview') {
            const content = document.getElementById('analysis-content');
            if (content) {
                console.log('🔄 Re-rendering financial overview...');
                window.platform.renderFinancialOverview(content);
            }
        }
    };
    
    applyFix();
});
EOF

# Fix 4: Create initialization sequence controller
cat > js/views/init-sequence.js << 'EOF'
/**
 * Initialization Sequence Controller
 * Ensures proper order of operations
 */

window.InitSequence = {
    steps: [
        { name: 'DOM Ready', complete: false },
        { name: 'Highcharts Loaded', complete: false },
        { name: 'Vendor Database Loaded', complete: false },
        { name: 'Platform Created', complete: false },
        { name: 'Initial Calculation', complete: false },
        { name: 'First Render', complete: false }
    ],
    
    markComplete(stepName) {
        const step = this.steps.find(s => s.name === stepName);
        if (step && !step.complete) {
            step.complete = true;
            console.log(`✅ Step complete: ${stepName}`);
            this.checkProgress();
        }
    },
    
    checkProgress() {
        const complete = this.steps.filter(s => s.complete).length;
        const total = this.steps.length;
        console.log(`📊 Initialization progress: ${complete}/${total}`);
        
        if (complete === total) {
            console.log('🎉 Initialization complete!');
        }
    },
    
    getStatus() {
        return this.steps.map(s => `${s.complete ? '✅' : '❌'} ${s.name}`).join('\n');
    }
};

// Monitor initialization
document.addEventListener('DOMContentLoaded', () => {
    window.InitSequence.markComplete('DOM Ready');
    
    // Check Highcharts
    const checkHighcharts = setInterval(() => {
        if (typeof Highcharts !== 'undefined') {
            clearInterval(checkHighcharts);
            window.InitSequence.markComplete('Highcharts Loaded');
        }
    }, 100);
    
    // Check vendor database
    const checkVendors = setInterval(() => {
        if (window.ComprehensiveVendorDatabase) {
            clearInterval(checkVendors);
            window.InitSequence.markComplete('Vendor Database Loaded');
        }
    }, 100);
    
    // Check platform
    const checkPlatform = setInterval(() => {
        if (window.platform) {
            clearInterval(checkPlatform);
            window.InitSequence.markComplete('Platform Created');
            
            // Monitor calculations
            const checkCalc = setInterval(() => {
                if (window.platform.calculationResults && 
                    Object.keys(window.platform.calculationResults).length > 0) {
                    clearInterval(checkCalc);
                    window.InitSequence.markComplete('Initial Calculation');
                }
            }, 100);
        }
    }, 100);
});

// Add debug command
window.checkInit = () => {
    console.log(window.InitSequence.getStatus());
};
EOF

# Fix 5: Update index.html to load scripts in correct order
# First, backup index.html
cp index.html index.html.backup

# Create a new index.html with proper script loading order
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Executive Decision Platform | Portnox Zero Trust NAC</title>
    <meta name="description" content="Premium Executive Platform for Zero Trust NAC Investment Analysis">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="./img/vendors/portnox-icon.png">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- CRITICAL: Load Highcharts FIRST -->
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/heatmap.js"></script>
    <script src="https://code.highcharts.com/modules/solid-gauge.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    
    <!-- Verify Highcharts loaded -->
    <script>
        if (typeof Highcharts !== 'undefined') {
            console.log('✅ Highcharts loaded successfully');
        } else {
            console.error('❌ Highcharts failed to load!');
        }
    </script>
    
    <!-- Styles -->
    <link rel="stylesheet" href="./css/premium-executive-platform.css">
    <link rel="stylesheet" href="./css/ultimate-financial-dashboard.css">
    <link rel="stylesheet" href="./css/risk-security-module.css">
    <link rel="stylesheet" href="./css/chart-stability.css">
    <link rel="stylesheet" href="./css/chart-constraints.css">
    <link rel="stylesheet" href="./css/emergency-chart-reset.css">
</head>
<body>
    <div id="app-container">
        <!-- Platform will be rendered here -->
    </div>
    
    <!-- Core Dependencies First -->
    <script src="./js/data/comprehensive-vendor-database.js"></script>
    
    <!-- Bootstrap and Initialization -->
    <script src="./js/views/bootstrap-loader.js"></script>
    <script src="./js/views/init-sequence.js"></script>
    
    <!-- Platform Core -->
    <script src="./js/views/premium-executive-platform.js"></script>
    
    <!-- Fixes and Controllers -->
    <script src="./js/views/financial-overview-fix.js"></script>
    <script src="./js/views/unified-chart-controller.js"></script>
    <script src="./js/views/chart-overrides.js"></script>
    <script src="./js/views/calculation-debounce.js"></script>
    <script src="./js/views/platform-init-fixed.js"></script>
    
    <!-- Feature Modules -->
    <script src="./js/views/dashboard-init.js"></script>
    <script src="./js/views/risk-security-init.js"></script>
    <script src="./js/views/risk-analytics-enhanced.js"></script>
    <script src="./js/views/risk-scenarios.js"></script>
    <script src="./js/views/compliance-init.js"></script>
    <script src="./js/views/operational-init.js"></script>
    <script src="./js/views/strategic-init.js"></script>
    
    <!-- Final verification -->
    <script>
        window.addEventListener('load', () => {
            setTimeout(() => {
                console.log('=== FINAL STATUS CHECK ===');
                console.log('Highcharts:', typeof Highcharts !== 'undefined' ? '✅' : '❌');
                console.log('Platform:', window.platform ? '✅' : '❌');
                console.log('Vendor DB:', window.ComprehensiveVendorDatabase ? '✅' : '❌');
                
                // Check for containers
                const containers = ['tco-comparison-chart', 'roi-timeline-chart'];
                containers.forEach(id => {
                    const el = document.getElementById(id);
                    console.log(`Container ${id}:`, el ? '✅' : '❌');
                });
                
                // Show init status
                if (window.checkInit) {
                    window.checkInit();
                }
            }, 2000);
        });
    </script>
</body>
</html>
EOF

# Commit the fixes
git add -A
git commit -m "Fix missing containers and Highcharts loading

- Created bootstrap loader to ensure dependencies
- Added initialization sequence monitor
- Fixed financial overview to create containers
- Reorganized script loading order in index.html
- Added Highcharts verification
- Containers now created before chart rendering"

echo "✅ Container and loading fixes applied!"
echo ""
echo "Changes made:"
echo "1. Bootstrap loader ensures all dependencies load"
echo "2. Financial overview creates containers properly"
echo "3. Script loading order optimized"
echo "4. Highcharts loads before platform code"
echo "5. Initialization sequence tracking"
echo ""
echo "To verify:"
echo "1. Clear browser cache"
echo "2. Open index.html"
echo "3. Check console for '✅ Highcharts loaded successfully'"
echo "4. Type 'checkInit()' in console to see initialization status"
echo ""
echo "The financial charts should now render properly!"

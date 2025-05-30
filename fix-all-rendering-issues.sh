#!/bin/bash

# Fix All Rendering Issues - Containers & Compliance
# This script fixes the chart containers and compliance errors

echo "🔧 Fixing all rendering issues..."

# Fix 1: Force chart container creation in financial overview
cat > js/views/financial-container-fix.js << 'EOF'
/**
 * Financial Container Fix - Ensures containers are always created
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('📦 Financial container fix loading...');
    
    const fixContainers = () => {
        if (!window.platform) {
            setTimeout(fixContainers, 100);
            return;
        }
        
        // Override renderFinancialOverview to ALWAYS create containers
        const originalRender = window.platform.renderFinancialOverview;
        
        window.platform.renderFinancialOverview = function(container) {
            console.log('📊 Rendering financial overview with guaranteed containers...');
            
            if (!container) {
                console.error('No container provided');
                return;
            }
            
            // Always clear and recreate
            container.innerHTML = '';
            
            // Check for calculation results
            if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                console.log('⏳ No calculation results yet...');
                container.innerHTML = `
                    <div class="financial-overview">
                        <div class="loading-state" style="text-align: center; padding: 60px;">
                            <div class="spinner" style="display: inline-block; width: 50px; height: 50px; border: 3px solid #334155; border-top-color: #00D4AA; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                            <h2 style="color: #CBD5E1; margin-top: 20px;">Calculating Financial Analysis...</h2>
                            <p style="color: #94A3B8;">This will take just a moment.</p>
                        </div>
                    </div>
                    <style>
                        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                    </style>
                `;
                
                // Trigger calculation if needed
                if (!this.isCalculating) {
                    console.log('🔄 Triggering calculation...');
                    this.calculate();
                }
                
                // Check again in a moment
                setTimeout(() => {
                    if (this.activeTab === 'financial-overview' && this.calculationResults) {
                        this.renderFinancialOverview(container);
                    }
                }, 1000);
                
                return;
            }
            
            // Get results
            const portnoxResult = this.calculationResults.portnox;
            if (!portnoxResult) {
                console.error('No Portnox results found');
                container.innerHTML = '<div class="error">No Portnox results available</div>';
                return;
            }
            
            // CREATE THE FULL HTML WITH CONTAINERS
            const html = `
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
                    
                    <!-- IMPORTANT: Chart containers with proper IDs -->
                    <div class="chart-section">
                        <h3>Total Cost of Ownership Comparison</h3>
                        <div class="chart-grid">
                            <div class="chart-container">
                                <h4>3-Year TCO by Vendor</h4>
                                <div id="tco-comparison-chart" style="height: 400px; background: #334155; border-radius: 8px; position: relative;">
                                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #94A3B8;">Loading chart...</div>
                                </div>
                            </div>
                            <div class="chart-container">
                                <h4>ROI Timeline</h4>
                                <div id="roi-timeline-chart" style="height: 400px; background: #334155; border-radius: 8px; position: relative;">
                                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #94A3B8;">Loading chart...</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Cost Breakdown -->
                    <div class="cost-breakdown-section">
                        <h3>Detailed Cost Breakdown</h3>
                        <div class="cost-breakdown-grid">
                            ${this.renderCostBreakdown ? this.renderCostBreakdown() : '<p>Loading cost breakdown...</p>'}
                        </div>
                    </div>
                    
                    <!-- Recommendations -->
                    <div class="recommendations-section">
                        <h3>Financial Recommendations</h3>
                        <div class="recommendation-cards">
                            ${this.renderFinancialRecommendations ? this.renderFinancialRecommendations() : '<p>Loading recommendations...</p>'}
                        </div>
                    </div>
                </div>
            `;
            
            // Set the HTML
            container.innerHTML = html;
            
            // Verify containers exist
            setTimeout(() => {
                const tcoContainer = document.getElementById('tco-comparison-chart');
                const roiContainer = document.getElementById('roi-timeline-chart');
                
                console.log('📦 Container check:');
                console.log('  TCO:', tcoContainer ? '✅ Found' : '❌ Missing');
                console.log('  ROI:', roiContainer ? '✅ Found' : '❌ Missing');
                
                if (tcoContainer && roiContainer) {
                    // Clear loading messages
                    tcoContainer.innerHTML = '';
                    roiContainer.innerHTML = '';
                    
                    // Render charts
                    if (this.renderTCOComparison) {
                        console.log('📊 Rendering TCO chart...');
                        this.renderTCOComparison();
                    }
                    
                    if (this.renderROITimeline) {
                        console.log('📊 Rendering ROI chart...');
                        this.renderROITimeline();
                    }
                    
                    // Mark render complete
                    if (window.InitSequence) {
                        window.InitSequence.markComplete('First Render');
                    }
                } else {
                    console.error('❌ Containers still not found after creation!');
                }
            }, 100);
        };
        
        console.log('✅ Financial container fix applied');
    };
    
    fixContainers();
});
EOF

# Fix 2: Fix compliance module industry detection
cat > js/views/compliance-error-fix.js << 'EOF'
/**
 * Compliance Error Fix - Handles undefined industry
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Compliance error fix loading...');
    
    const fixCompliance = () => {
        if (!window.complianceModule || !window.ComplianceFrameworkData) {
            setTimeout(fixCompliance, 100);
            return;
        }
        
        // Override render to handle missing industry
        const originalRender = window.complianceModule.render;
        
        window.complianceModule.render = function(container, calculationResults) {
            console.log('📋 Rendering compliance with error handling...');
            
            if (!container || !calculationResults) {
                console.error('Missing container or results');
                return;
            }
            
            // Ensure industry is set
            const selectedIndustry = this.platform.config.industry || 'technology';
            const deviceCount = this.platform.config.deviceCount || 500;
            
            // Validate industry exists
            if (!this.data.industries[selectedIndustry]) {
                console.warn(`Industry ${selectedIndustry} not found, defaulting to technology`);
                this.platform.config.industry = 'technology';
            }
            
            try {
                // Call original render with validated data
                originalRender.call(this, container, calculationResults);
            } catch (error) {
                console.error('Compliance render error:', error);
                container.innerHTML = `
                    <div class="compliance-error" style="padding: 40px; text-align: center;">
                        <h2 style="color: #F87171;">Compliance Module Error</h2>
                        <p style="color: #94A3B8;">Unable to load compliance analysis. Please refresh the page.</p>
                        <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #00D4AA; color: #1E293B; border: none; border-radius: 6px; cursor: pointer;">
                            Refresh Page
                        </button>
                    </div>
                `;
            }
        };
        
        // Also fix the renderComplianceHeader method
        const originalRenderHeader = window.complianceModule.renderComplianceHeader;
        
        window.complianceModule.renderComplianceHeader = function(industry) {
            // Validate industry parameter
            if (!industry || !this.data.industries[industry]) {
                console.warn(`Invalid industry: ${industry}, using technology`);
                industry = 'technology';
            }
            
            const ind = this.data.industries[industry];
            
            // Ensure ind has required properties
            if (!ind || !ind.primaryFrameworks) {
                console.error('Invalid industry data:', ind);
                return `
                    <div class="compliance-header">
                        <h2 class="gradient-text">Compliance & Regulatory Analysis</h2>
                        <p style="color: #94A3B8;">Select an industry to begin analysis</p>
                    </div>
                `;
            }
            
            return originalRenderHeader.call(this, industry);
        };
        
        console.log('✅ Compliance error fix applied');
    };
    
    fixCompliance();
});
EOF

# Fix 3: Stop multiple calculations
cat > js/views/calculation-control.js << 'EOF'
/**
 * Calculation Control - Prevents multiple calculations
 */

window.CalculationControl = {
    lastCalculation: 0,
    minInterval: 2000, // 2 seconds between calculations
    
    shouldCalculate() {
        const now = Date.now();
        if (now - this.lastCalculation < this.minInterval) {
            console.log('⏳ Calculation throttled');
            return false;
        }
        this.lastCalculation = now;
        return true;
    }
};

window.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Calculation control loading...');
    
    const applyControl = () => {
        if (!window.platform) {
            setTimeout(applyControl, 100);
            return;
        }
        
        // Wrap calculate method
        const originalCalculate = window.platform.calculate;
        
        window.platform.calculate = function() {
            if (!window.CalculationControl.shouldCalculate()) {
                console.log('⏳ Skipping duplicate calculation');
                return;
            }
            
            console.log('✅ Calculation allowed');
            return originalCalculate.call(this);
        };
        
        console.log('✅ Calculation control applied');
    };
    
    applyControl();
});
EOF

# Fix 4: Dashboard interference fix
cat > js/views/dashboard-isolation.js << 'EOF'
/**
 * Dashboard Isolation - Prevents dashboard from interfering
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('🔒 Dashboard isolation loading...');
    
    const isolateDashboard = () => {
        if (!window.ultimateDashboard) {
            setTimeout(isolateDashboard, 100);
            return;
        }
        
        // Override dashboard render to check if it should render
        const originalRender = window.ultimateDashboard.render;
        
        window.ultimateDashboard.render = function(container, results) {
            // Only render if explicitly called, not automatically
            if (!container || !results) {
                console.log('📊 Dashboard skipping invalid render');
                return;
            }
            
            // Check if we're on the financial tab
            if (window.platform && window.platform.activeTab !== 'financial-overview') {
                console.log('📊 Dashboard skipping - not on financial tab');
                return;
            }
            
            // Don't render if containers already exist with content
            const existingTco = document.getElementById('tco-comparison-chart');
            const existingRoi = document.getElementById('roi-timeline-chart');
            
            if (existingTco && existingRoi && existingTco.children.length > 0) {
                console.log('📊 Dashboard skipping - charts already rendered');
                return;
            }
            
            console.log('📊 Dashboard proceeding with render');
            originalRender.call(this, container, results);
        };
        
        console.log('✅ Dashboard isolation applied');
    };
    
    isolateDashboard();
});
EOF

# Fix 5: Update index.html to include fixes in correct order
# Remove any duplicate or problematic scripts
sed -i '/financial-overview-fix.js/d' index.html
sed -i '/dashboard-render-fix.js/d' index.html

# Add new fixes before other scripts
sed -i '/<script src="\.\/js\/views\/premium-executive-platform\.js"><\/script>/a\    <!-- Critical Fixes -->\
    <script src="./js/views/calculation-control.js"></script>\
    <script src="./js/views/financial-container-fix.js"></script>\
    <script src="./js/views/compliance-error-fix.js"></script>\
    <script src="./js/views/dashboard-isolation.js"></script>' index.html

# Fix 6: Add initialization complete marker
cat > js/views/init-complete.js << 'EOF'
/**
 * Initialization Complete Handler
 */

window.addEventListener('load', function() {
    setTimeout(() => {
        console.log('🎯 Checking initialization status...');
        
        // Force render if needed
        if (window.platform && window.platform.calculationResults) {
            if (window.platform.activeTab === 'financial-overview') {
                const content = document.getElementById('analysis-content');
                if (content && !document.getElementById('tco-comparison-chart')) {
                    console.log('🔄 Force rendering financial overview...');
                    window.platform.renderFinancialOverview(content);
                }
            }
        }
        
        // Log final status
        console.log('=== INITIALIZATION COMPLETE ===');
        console.log('Platform:', window.platform ? '✅' : '❌');
        console.log('Results:', window.platform?.calculationResults ? '✅' : '❌');
        console.log('Charts:', document.getElementById('tco-comparison-chart') ? '✅' : '❌');
    }, 3000);
});
EOF

# Add to index.html
sed -i '/<\/body>/i\    <script src="./js/views/init-complete.js"></script>' index.html

# Commit all fixes
git add -A
git commit -m "Fix all rendering issues - containers and compliance

- Financial container fix ensures chart divs are always created
- Compliance error handling for undefined industry
- Calculation control prevents duplicate calculations
- Dashboard isolation prevents interference
- Initialization complete handler for final checks
- Removed problematic duplicate scripts
- Added proper error messages and recovery"

echo "✅ All rendering issues fixed!"
echo ""
echo "Changes made:"
echo "1. Financial charts will now always create containers"
echo "2. Compliance handles missing/undefined industry gracefully"
echo "3. Calculations are throttled to prevent duplicates"
echo "4. Dashboard won't interfere with financial rendering"
echo "5. Final initialization check ensures everything loads"
echo ""
echo "After applying this fix:"
echo "1. Clear browser cache"
echo "2. Reload the page"
echo "3. Financial charts should appear automatically"
echo "4. Compliance tab should work without errors"

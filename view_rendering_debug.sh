#!/bin/bash

# Debug why views aren't rendering content

echo "🔍 Debugging view rendering issues..."

# Check if views are being called
echo "📋 Adding debug logging to view rendering..."

# Add debug logging to renderCurrentView method
sed -i '/renderCurrentView() {/a\
    console.log("🔍 renderCurrentView called for:", this.currentView);\
    console.log("🔍 calculationResults:", this.calculationResults);' js/enhanced-ui.js

# Add debug logging to each render method
sed -i '/renderExecutiveView() {/a\
    console.log("📊 Rendering executive view");' js/enhanced-ui.js

sed -i '/renderFinancialView() {/a\
    console.log("💰 Rendering financial view");' js/enhanced-ui.js

# Fix the main issue: ensure performCalculation actually calls renderCurrentView
echo "🔧 Fixing calculation to view rendering connection..."

# Check if renderCurrentView is being called after calculation
sed -i '/this\.calculationResults = this\.calculateTCO();/a\
        console.log("✅ Calculation completed, rendering view...");\
        this.renderCurrentView();' js/enhanced-ui.js

# Ensure the view container exists and is properly selected
echo "🎯 Adding view container validation..."

# Add view container check
sed -i '/renderCurrentView() {/a\
    const viewContent = document.querySelector(`#${this.currentView}-view .view-content`);\
    console.log("🎯 View container found:", viewContent);' js/enhanced-ui.js

# Simple one-liner to force initial view rendering
cat > js/force-view-render.js << 'EOF'
// Force initial view rendering
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.log('🔍 Forcing initial view render...');
        
        // Check if zeroTrustUI exists
        if (window.zeroTrustUI) {
            console.log('📊 ZeroTrustUI found, current view:', window.zeroTrustUI.currentView);
            
            // Force render the current view with dummy data if needed
            const viewContent = document.querySelector('#executive-view .view-content');
            if (viewContent && (!viewContent.innerHTML || viewContent.innerHTML.trim() === '')) {
                console.log('📄 View content empty, adding placeholder...');
                viewContent.innerHTML = `
                    <div class="loading-placeholder">
                        <h2>Zero Trust Total Cost Analyzer</h2>
                        <p>Loading dashboard...</p>
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <div class="metric-title">Total Savings</div>
                                <div class="metric-value">Calculating...</div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Try to trigger calculation again
                setTimeout(() => {
                    if (window.zeroTrustUI.performCalculation) {
                        window.zeroTrustUI.performCalculation();
                    }
                }, 1000);
            }
        } else {
            console.warn('❌ ZeroTrustUI not found');
        }
    }, 1000);
});
EOF

# Add force render script to HTML
if ! grep -q "force-view-render.js" index.html; then
    sed -i '/<script src="\.\/js\/test-dashboard\.js"><\/script>/a \    <script src="./js/force-view-render.js"></script>' index.html
fi

# Quick fix: add basic CSS for loading placeholder
cat >> css/zero-trust-enhanced.css << 'EOF'

/* Loading placeholder styles */
.loading-placeholder {
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
}

.loading-placeholder h2 {
  color: #1a5a96;
  margin-bottom: 10px;
}

.loading-placeholder .metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.loading-placeholder .metric-card {
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  border: 2px dashed #cbd5e1;
}

.loading-placeholder .metric-title {
  font-weight: 600;
  color: #475569;
  margin-bottom: 10px;
}

.loading-placeholder .metric-value {
  font-size: 24px;
  font-weight: bold;
  color: #1a5a96;
}
EOF

# Create a simple diagnostic script
cat > js/view-diagnostic.js << 'EOF'
// View rendering diagnostic
function diagnoseViews() {
    console.log('🔍 VIEW DIAGNOSTIC REPORT');
    console.log('========================');
    
    // Check view containers
    const views = ['executive', 'financial', 'security', 'technical'];
    views.forEach(view => {
        const container = document.querySelector(`#${view}-view`);
        const content = document.querySelector(`#${view}-view .view-content`);
        console.log(`📋 ${view} view:`, {
            container: !!container,
            content: !!content,
            hasContent: content ? content.innerHTML.length > 0 : false,
            isActive: container ? container.classList.contains('active') : false
        });
    });
    
    // Check if zeroTrustUI exists and has methods
    if (window.zeroTrustUI) {
        console.log('🎯 ZeroTrustUI status:', {
            currentView: window.zeroTrustUI.currentView,
            hasCalculationResults: !!window.zeroTrustUI.calculationResults,
            selectedVendors: Array.from(window.zeroTrustUI.selectedVendors || []),
            hasRenderMethod: typeof window.zeroTrustUI.renderCurrentView === 'function'
        });
        
        // Try to manually trigger view rendering
        if (window.zeroTrustUI.calculationResults) {
            console.log('🔧 Attempting manual view render...');
            try {
                window.zeroTrustUI.renderCurrentView();
                console.log('✅ Manual render completed');
            } catch (error) {
                console.error('❌ Manual render failed:', error);
            }
        }
    } else {
        console.warn('❌ ZeroTrustUI not found');
    }
}

// Run diagnostic after everything loads
window.addEventListener('load', () => {
    setTimeout(diagnoseViews, 4000);
});

// Add manual diagnostic trigger
window.diagnoseViews = diagnoseViews;
EOF

# Add diagnostic script
if ! grep -q "view-diagnostic.js" index.html; then
    sed -i '/<script src="\.\/js\/force-view-render\.js"><\/script>/a \    <script src="./js/view-diagnostic.js"></script>' index.html
fi

echo "✅ View rendering debug tools added!"
echo ""
echo "🔍 Debug tools added:"
echo "   ✅ Detailed logging in renderCurrentView"
echo "   ✅ Force view rendering script"
echo "   ✅ Loading placeholder for empty views"
echo "   ✅ Comprehensive view diagnostic"
echo ""
echo "🚀 To debug:"
echo "   1. Refresh browser and open console"
echo "   2. Look for view rendering logs"
echo "   3. Run 'diagnoseViews()' in console"
echo "   4. Check if views have content"
echo ""
echo "💡 If views still don't load:"
echo "   - Check console for detailed logs"
echo "   - Look for 'renderCurrentView called for:' messages"
echo "   - Verify calculation results exist"
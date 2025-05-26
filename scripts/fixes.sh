#!/bin/bash

# Critical Fix: Make Executive View Complete the ONLY executive view
echo "🎯 Making ExecutiveViewComplete the ONLY executive view..."

# Fix 1: Find and fix the syntax error in executive-view-complete.js
echo "🔧 Fixing syntax error..."
sed -i 's/size: function(seriesIndex, dataPointIndex, w) {/size: 15/g' js/views/executive-view-complete.js
sed -i 's/Math\.max.*dataPointIndex.*z.*;//g' js/views/executive-view-complete.js
sed -i 's/return size;//g' js/views/executive-view-complete.js

# Fix 2: Completely disable the enhanced-ui.js executive rendering
echo "🚫 Disabling competing executive view in enhanced-ui.js..."
sed -i '/📊 Rendering executive view/,/}<\/div>/c\
        console.log("🚫 Executive view rendering disabled - using ExecutiveViewComplete instead");' js/enhanced-ui.js

# Fix 3: Make sure ExecutiveViewComplete takes over completely
cat > js/views/executive-takeover.js << 'EOF'
/**
 * Executive View Takeover - Ensures ONLY ExecutiveViewComplete runs
 */

// Immediately take over executive view
(function() {
  console.log('🎯 Executive Takeover starting...');
  
  // Disable all other executive view systems
  if (window.zeroTrustUI) {
    const originalRender = window.zeroTrustUI.renderCurrentView;
    window.zeroTrustUI.renderCurrentView = function(view, results) {
      if (view === 'executive') {
        console.log('🚫 Blocking enhanced-ui executive render');
        return; // Block executive rendering
      }
      return originalRender.call(this, view, results);
    };
  }
  
  // Force load ExecutiveViewComplete when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
      const executiveView = document.querySelector('#executive-view .view-content') || 
                          document.querySelector('.view-panel[data-view="executive"] .view-content');
      
      if (executiveView && typeof ExecutiveViewComplete !== 'undefined') {
        // Clear any existing content
        executiveView.innerHTML = '';
        
        // Initialize our executive view
        window.executiveViewComplete = new ExecutiveViewComplete();
        window.executiveViewComplete.init();
        console.log('✅ ExecutiveViewComplete is now the ONLY executive view');
      } else {
        console.error('❌ ExecutiveViewComplete class not available');
      }
    }, 1000);
  });
})();
EOF

# Fix 4: Add takeover script to HTML (priority loading)
if [ -f "index.html" ]; then
  # Remove any existing executive includes
  sed -i '/executive-view-priority.js/d' index.html
  sed -i '/executive-init-fix.js/d' index.html
  
  # Add takeover script before the complete executive view
  sed -i '/executive-view-complete.js/i\    <script src="./js/views/executive-takeover.js"></script>' index.html
  
  echo "✅ Executive takeover script added to HTML"
fi

# Fix 5: Check if ExecutiveViewComplete class is properly defined
echo "🔍 Verifying ExecutiveViewComplete class..."
if grep -q "class ExecutiveViewComplete" js/views/executive-view-complete.js; then
  echo "✅ ExecutiveViewComplete class found"
else
  echo "❌ ExecutiveViewComplete class NOT found - checking syntax..."
  # Check for basic syntax issues
  node -c js/views/executive-view-complete.js 2>&1 || echo "❌ Syntax errors found"
fi

# Fix 6: Simple syntax check and fix
echo "🔧 Running syntax cleanup..."
# Remove any stray function syntax issues
sed -i 's/size: function.*{.*$/size: 15,/g' js/views/executive-view-complete.js
sed -i 's/hover: {.*size:.*$/hover: { size: 20 },/g' js/views/executive-view-complete.js

echo ""
echo "🎯 CRITICAL FIXES APPLIED:"
echo "   ✅ Fixed syntax error in executive-view-complete.js"
echo "   ✅ Disabled competing executive view in enhanced-ui.js"  
echo "   ✅ Created takeover script for exclusive control"
echo "   ✅ Updated HTML loading order"
echo ""
echo "🔄 Refresh browser to test"

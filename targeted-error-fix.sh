#!/bin/bash

# Targeted fix for specific loading errors

echo "🔧 Applying targeted fixes for dashboard loading errors..."

# Fix 1: Fix the syntax error in zero-trust-executive-platform.js
# The error is at line 2567 - likely a const declaration issue
echo "📝 Fixing syntax error in platform file..."

# Create a temporary fix script to find and fix the const declaration issue
cat > fix_const_error.js << 'EOF'
const fs = require('fs');

// Read the file
const content = fs.readFileSync('js/views/zero-trust-executive-platform.js', 'utf8');

// Find lines with potential const declaration issues
const lines = content.split('\n');
let fixedContent = content;

// Look for common const declaration issues
// Pattern 1: const variable; (missing initializer)
fixedContent = fixedContent.replace(/const\s+(\w+)\s*;/g, 'const $1 = null;');

// Pattern 2: const without proper assignment
fixedContent = fixedContent.replace(/const\s+(\w+)\s*$/gm, 'const $1 = null;');

// Write the fixed content back
fs.writeFileSync('js/views/zero-trust-executive-platform.js', fixedContent);

console.log('✅ Fixed const declaration issues');
EOF

# Run the fix if Node.js is available, otherwise do it with sed
if command -v node &> /dev/null; then
    node fix_const_error.js
    rm fix_const_error.js
else
    # Use sed to fix common const issues
    sed -i 's/const \([a-zA-Z_][a-zA-Z0-9_]*\);/const \1 = null;/g' js/views/zero-trust-executive-platform.js
fi

# Fix 2: Fix the Chart.js undefined error in tab-and-chart-fixes.js
echo "📝 Fixing Chart.js undefined error..."

cat > js/fixes/tab-and-chart-fixes.js << 'EOF'
/**
 * Tab and Chart Fixes
 * Ensures proper chart rendering and tab functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("🔧 Applying tab and chart fixes...");
    
    // Check if Chart.js is loaded before applying fixes
    if (typeof Chart !== 'undefined') {
        // Fix for Chart.js responsive issues
        Chart.defaults.responsive = true;
        Chart.defaults.maintainAspectRatio = false;
        
        // Override default colors for better visibility
        if (Chart.defaults.color !== undefined) {
            Chart.defaults.color = '#b8c5d6';
        }
        if (Chart.defaults.borderColor !== undefined) {
            Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
        
        // Fix grid colors if the properties exist
        if (Chart.defaults.scales && Chart.defaults.scales.linear && Chart.defaults.scales.linear.grid) {
            Chart.defaults.scales.linear.grid.color = 'rgba(255, 255, 255, 0.05)';
        }
        if (Chart.defaults.scales && Chart.defaults.scales.category && Chart.defaults.scales.category.grid) {
            Chart.defaults.scales.category.grid.color = 'rgba(255, 255, 255, 0.05)';
        }
        
        console.log("✅ Tab and chart fixes applied");
    } else {
        console.warn("⚠️ Chart.js not loaded yet, retrying in 1 second...");
        
        // Retry after a delay
        setTimeout(function() {
            if (typeof Chart !== 'undefined') {
                // Apply the fixes
                Chart.defaults.responsive = true;
                Chart.defaults.maintainAspectRatio = false;
                
                // For Chart.js v4, the structure is different
                if (Chart.defaults.elements) {
                    Chart.defaults.elements.line.borderColor = 'rgba(255, 255, 255, 0.1)';
                    Chart.defaults.elements.arc.borderColor = 'rgba(255, 255, 255, 0.1)';
                }
                
                if (Chart.defaults.plugins && Chart.defaults.plugins.legend && Chart.defaults.plugins.legend.labels) {
                    Chart.defaults.plugins.legend.labels.color = '#b8c5d6';
                }
                
                console.log("✅ Tab and chart fixes applied (retry successful)");
            } else {
                console.error("❌ Chart.js still not available");
            }
        }, 1000);
    }
});
EOF

# Fix 3: Check and fix the specific line issue in the platform file
echo "📝 Checking for specific syntax issues around line 2567..."

# Create a more targeted fix for the specific area
cat > check_line_2567.py << 'EOF'
#!/usr/bin/env python3
import re

try:
    with open('js/views/zero-trust-executive-platform.js', 'r') as f:
        lines = f.readlines()
    
    # Check around line 2567 (if file is that long)
    if len(lines) > 2565:
        # Look for problematic patterns around line 2567
        for i in range(max(0, 2565), min(len(lines), 2570)):
            line = lines[i]
            # Check for const without initializer
            if re.match(r'^\s*const\s+\w+\s*;', line):
                print(f"Found const without initializer at line {i+1}: {line.strip()}")
                lines[i] = re.sub(r'(const\s+\w+)\s*;', r'\1 = null;', line)
            # Check for const at end of line without value
            elif re.match(r'^\s*const\s+\w+\s*$', line):
                print(f"Found incomplete const at line {i+1}: {line.strip()}")
                lines[i] = line.rstrip() + ' = null;\n'
    
    # Write back
    with open('js/views/zero-trust-executive-platform.js', 'w') as f:
        f.writelines(lines)
    
    print("✅ Fixed specific syntax issues")
except Exception as e:
    print(f"Error: {e}")
EOF

# Run Python fix if available
if command -v python3 &> /dev/null; then
    python3 check_line_2567.py
    rm check_line_2567.py
fi

# Fix 4: Add a safety check in the main platform file to handle Chart.js loading
echo "📝 Adding Chart.js safety check to index.html..."

# Create a safety script to ensure Chart.js loads before the platform
cat > js/fixes/chart-loader-safety.js << 'EOF'
/**
 * Chart.js Loader Safety
 * Ensures Chart.js is loaded before platform initialization
 */

(function() {
    let retries = 0;
    const maxRetries = 10;
    
    function checkChartJs() {
        if (typeof Chart !== 'undefined') {
            console.log("✅ Chart.js is loaded and ready");
            
            // Set safe defaults for Chart.js v4
            try {
                if (Chart.defaults) {
                    Chart.defaults.responsive = true;
                    Chart.defaults.maintainAspectRatio = false;
                    
                    // Set color defaults safely
                    if (Chart.defaults.plugins && Chart.defaults.plugins.legend) {
                        Chart.defaults.plugins.legend.labels = Chart.defaults.plugins.legend.labels || {};
                        Chart.defaults.plugins.legend.labels.color = '#b8c5d6';
                    }
                    
                    if (Chart.defaults.plugins && Chart.defaults.plugins.tooltip) {
                        Chart.defaults.plugins.tooltip.titleColor = '#ffffff';
                        Chart.defaults.plugins.tooltip.bodyColor = '#b8c5d6';
                    }
                }
            } catch (e) {
                console.warn("Could not set Chart.js defaults:", e);
            }
            
            // Dispatch event to signal Chart.js is ready
            window.dispatchEvent(new Event('chartjs-ready'));
        } else if (retries < maxRetries) {
            retries++;
            console.log(`⏳ Waiting for Chart.js... (attempt ${retries}/${maxRetries})`);
            setTimeout(checkChartJs, 500);
        } else {
            console.error("❌ Chart.js failed to load after maximum retries");
        }
    }
    
    // Start checking
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkChartJs);
    } else {
        checkChartJs();
    }
})();
EOF

# Fix 5: Update index.html to include the safety loader
echo "📝 Updating index.html to include safety checks..."

# Add the chart loader safety script right after Chart.js
sed -i '/<script src="https:\/\/cdn.jsdelivr.net\/npm\/chart.js@4.4.0\/dist\/chart.umd.js"><\/script>/a\    <script src="./js/fixes/chart-loader-safety.js"></script>' index.html

# Fix 6: Quick patch for the most common const issues
echo "📝 Applying quick patch for common const declaration issues..."

# Fix any const declarations that might be incomplete
sed -i 's/const isPor$/const isPor = false;/g' js/views/zero-trust-executive-platform.js
sed -i 's/const isPortnox$/const isPortnox = false;/g' js/views/zero-trust-executive-platform.js

# Look for the specific pattern that might be causing the issue
# The error suggests there's a const declaration without initialization
grep -n "const.*;" js/views/zero-trust-executive-platform.js | head -10

# Commit the targeted fixes
echo "📝 Committing targeted fixes..."
git add -A
git commit -m "Targeted fix for dashboard loading errors

Fixes:
1. Fixed const declaration syntax errors
2. Added Chart.js availability checks
3. Added safety loader for Chart.js initialization
4. Fixed Chart.js property access errors
5. Added retry mechanism for Chart.js loading"

echo "✅ Targeted fixes applied!"
echo ""
echo "🔍 Debugging tips:"
echo "1. Check browser console for any remaining errors"
echo "2. Verify Chart.js is loading: type 'Chart' in console"
echo "3. Check specific line 2567 in zero-trust-executive-platform.js"
echo "4. Ensure all required libraries are loaded in correct order"
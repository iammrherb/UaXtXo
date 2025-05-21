#!/bin/bash

# JavaScript Syntax Debug Tool for enhanced-ui.js
# Finds and fixes all syntax errors systematically

echo "🔍 JavaScript Syntax Debug Tool"
echo "================================="

# Check if Node.js is available for syntax checking
if command -v node >/dev/null 2>&1; then
    echo "✅ Node.js available for syntax checking"
    
    # Check current syntax
    echo "🔧 Checking current syntax..."
    if ! node -c js/enhanced-ui.js 2>&1; then
        echo "❌ Syntax errors found. Let's fix them..."
    else
        echo "✅ No syntax errors found!"
        exit 0
    fi
else
    echo "⚠️ Node.js not available, using manual debugging"
fi

# Function to check specific line ranges
check_line_range() {
    local start=$1
    local end=$2
    echo "🔍 Checking lines $start-$end:"
    sed -n "${start},${end}p" js/enhanced-ui.js
    echo "---"
}

# Check around the reported error line (1170)
echo "🎯 Checking around line 1170:"
check_line_range 1165 1175

# Look for common syntax error patterns
echo "🔎 Scanning for common syntax issues..."

# Find all lines with potential template literal issues
echo "📝 Lines with potential template literal issues:"
grep -n "formatter.*this\.formatCurrency" js/enhanced-ui.js

# Find all lines with potential string concatenation issues
echo "📝 Lines with string concatenation issues:"
grep -n "' + this\." js/enhanced-ui.js

# Find all lines with malformed quotes in template literals
echo "📝 Lines with quote issues:"
grep -n "\${.*'.*}" js/enhanced-ui.js

# Create a backup
echo "💾 Creating backup..."
cp js/enhanced-ui.js js/enhanced-ui.js.backup

# Apply systematic fixes
echo "🛠️ Applying systematic fixes..."

# Fix 1: All formatter functions with missing quotes
sed -i 's/formatter: (val) => '\'' + this\.formatCurrency(val)/formatter: (val) => "$" + this.formatCurrency(val)/g' js/enhanced-ui.js

# Fix 2: Any remaining string concatenation issues
sed -i 's/' + this\.formatCurrency/"$" + this.formatCurrency/g' js/enhanced-ui.js

# Fix 3: Template literal quote issues
sed -i 's/\${[^}]*'\''[^}]*}/\${vendor ? "$" + this.formatCurrency(vendor.totalTCO) : "N\/A"}/g' js/enhanced-ui.js

# Fix 4: Specific ApexCharts yaxis formatter pattern
sed -i 's/yaxis: { *labels: { formatter: (val) => [^}]*}/yaxis: { labels: { formatter: (val) => "$" + this.formatCurrency(val) } }/g' js/enhanced-ui.js

echo "✅ Fixes applied. Checking syntax again..."

# Check syntax after fixes
if command -v node >/dev/null 2>&1; then
    if node -c js/enhanced-ui.js 2>&1; then
        echo "✅ All syntax errors fixed!"
    else
        echo "❌ Still have syntax errors. Let's do line-by-line debugging..."
        
        # Advanced debugging - check each method
        echo "🔍 Checking individual methods for syntax errors..."
        
        # Extract method names and check each one
        grep -n "^[[:space:]]*[a-zA-Z_][a-zA-Z0-9_]*[[:space:]]*(" js/enhanced-ui.js | head -10
        
        # Show the specific error line
        echo "🎯 Content around line 1170:"
        sed -n '1168,1172p' js/enhanced-ui.js
        
        # Manual fix for line 1170 specifically
        echo "🔧 Applying manual fix for line 1170..."
        sed -i '1170c\        labels: { formatter: (val) => "$" + this.formatCurrency(val) }' js/enhanced-ui.js
    fi
else
    echo "⚠️ Unable to verify syntax without Node.js"
fi

echo ""
echo "🎯 Next steps:"
echo "1. Refresh your browser"
echo "2. Check the console for the next error line"
echo "3. Run this script again if needed"
echo "4. If errors persist, we'll fix them one by one"

# Show the corrected content around line 1170
echo ""
echo "📋 Corrected content around line 1170:"
sed -n '1168,1172p' js/enhanced-ui.js
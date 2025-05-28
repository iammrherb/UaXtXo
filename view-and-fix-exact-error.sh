#!/bin/bash

# Let's see what's actually at line 560 and fix it
echo "🔍 Looking at the exact error location..."

# First, restore from backup if it exists
if [ -f "js/views/modern-executive-dashboard.js.backup_syntax" ]; then
    echo "🔄 Restoring from backup..."
    cp js/views/modern-executive-dashboard.js.backup_syntax js/views/modern-executive-dashboard.js
fi

# Show lines around line 560 to see the actual problem
echo ""
echo "📋 Lines 550-570 of modern-executive-dashboard.js:"
echo "================================================"
sed -n '550,570p' js/views/modern-executive-dashboard.js | nl -v 550

# The error "Unexpected token '}'" at line 560 means there's an extra }
# Let's check what's there
echo ""
echo "🔍 Checking for the specific issue..."

# Look for duplicate closing braces or misplaced braces around line 560
if sed -n '560p' js/views/modern-executive-dashboard.js | grep -q '^[[:space:]]*}[[:space:]]*$'; then
    echo "Found standalone } at line 560"
    
    # Check if it's an extra brace
    LINES_BEFORE=$(sed -n '550,559p' js/views/modern-executive-dashboard.js)
    if echo "$LINES_BEFORE" | tail -1 | grep -q '}'; then
        echo "✅ Found duplicate closing brace - removing line 560"
        sed -i '560d' js/views/modern-executive-dashboard.js
    fi
fi

# Alternative: Check the structure around exportReport
echo ""
echo "🔍 Checking structure around exportReport method..."

# Find where exportReport is and show context
grep -n -B 5 -A 2 "async exportReport" js/views/modern-executive-dashboard.js || echo "exportReport method not found"

# Let's also check the end of renderAIInsights method
echo ""
echo "🔍 Checking renderAIInsights method ending..."
grep -n -A 10 "renderAIInsights.*{" js/views/modern-executive-dashboard.js | head -20

# Final diagnostic - let's see the actual structure
echo ""
echo "📊 Dashboard class structure check:"
echo "================================="

# Count methods in the class
echo "Methods found:"
grep -n "^\s*[a-zA-Z]*\s*[a-zA-Z]*(.*).*{" js/views/modern-executive-dashboard.js | grep -v "=>" | head -20

echo ""
echo "🛠️ To manually fix:"
echo "1. Open js/views/modern-executive-dashboard.js"
echo "2. Go to line 560"
echo "3. If you see a standalone }, remove it"
echo "4. Make sure each method ends with only one }"
echo "5. Save and refresh browser"
EOF
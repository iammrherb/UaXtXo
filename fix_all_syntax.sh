#!/bin/bash

echo "🔧 Fixing all syntax errors..."

# Fix 1: String concatenation at line 3561
echo "Fixing line 3561..."
sed -i "3561s/':  + /': ' + /g" js/views/zero-trust-executive-platform.js

# Check for similar issues
echo ""
echo "Checking for similar string concatenation issues..."
grep -n "' \+ (" js/views/zero-trust-executive-platform.js | head -5

# Look for more potential issues with unterminated strings
echo ""
echo "Checking for unterminated strings..."
grep -n "' \+$" js/views/zero-trust-executive-platform.js | head -5

# Run syntax check
echo ""
echo "🔍 Running syntax check..."
node -c js/views/zero-trust-executive-platform.js 2>&1 | head -20

# If there are still errors, show them
if ! node -c js/views/zero-trust-executive-platform.js 2>/dev/null; then
    echo ""
    echo "❌ Still has errors. Checking specific lines..."
    
    # Get the error line
    ERROR_LINE=$(node -c js/views/zero-trust-executive-platform.js 2>&1 | grep -o '[0-9]\+' | head -1)
    if [ ! -z "$ERROR_LINE" ]; then
        echo "Error at line $ERROR_LINE:"
        sed -n "$((ERROR_LINE-2)),$((ERROR_LINE+2))p" js/views/zero-trust-executive-platform.js | nl -v $((ERROR_LINE-2))
    fi
else
    echo "✅ All syntax errors fixed!"
fi

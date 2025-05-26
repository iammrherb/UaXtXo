#!/bin/bash

echo "🔧 Fixing class structure..."

# Find the line before generateKeyInsights
LINE_BEFORE=$(grep -n "generateKeyInsights()" js/views/zero-trust-executive-platform.js | head -1 | cut -d: -f1)
LINE_BEFORE=$((LINE_BEFORE - 1))

echo "generateKeyInsights is at line: $((LINE_BEFORE + 1))"

# Check what's on the line before
echo "Content before generateKeyInsights:"
sed -n "$((LINE_BEFORE - 5)),$((LINE_BEFORE))p" js/views/zero-trust-executive-platform.js

# Count braces from start to this point
echo ""
echo "Checking brace balance up to generateKeyInsights..."
OPEN=$(sed -n "1,${LINE_BEFORE}p" js/views/zero-trust-executive-platform.js | grep -o '{' | wc -l)
CLOSE=$(sed -n "1,${LINE_BEFORE}p" js/views/zero-trust-executive-platform.js | grep -o '}' | wc -l)

echo "Open braces: $OPEN"
echo "Close braces: $CLOSE"

if [ $CLOSE -ge $OPEN ]; then
    echo "❌ Too many closing braces before generateKeyInsights!"
    echo "The class has been closed before this method."
    
    # Find the extra closing braces
    DIFF=$((CLOSE - OPEN + 1))
    echo "Need to remove $DIFF closing brace(s)"
    
    # Remove extra closing braces before generateKeyInsights
    for i in $(seq 1 $DIFF); do
        # Find the last closing brace before generateKeyInsights
        LAST_CLOSE=$(sed -n "1,${LINE_BEFORE}p" js/views/zero-trust-executive-platform.js | grep -n "^[[:space:]]*}[[:space:]]*$" | tail -1 | cut -d: -f1)
        if [ ! -z "$LAST_CLOSE" ]; then
            echo "Removing closing brace at line $LAST_CLOSE"
            sed -i "${LAST_CLOSE}d" js/views/zero-trust-executive-platform.js
            LINE_BEFORE=$((LINE_BEFORE - 1))
        fi
    done
fi

echo ""
echo "🔍 Verifying syntax..."
node -c js/views/zero-trust-executive-platform.js && echo "✅ Fixed!" || echo "❌ Still has errors"

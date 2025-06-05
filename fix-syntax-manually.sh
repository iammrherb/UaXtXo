#!/bin/bash

echo "🔧 Manual syntax fix for line 1411..."

# Find the file
FILE=""
if [ -f "premium-executive-platform.js" ]; then
    FILE="premium-executive-platform.js"
elif [ -f "js/premium-executive-platform.js" ]; then
    FILE="js/premium-executive-platform.js"
else
    echo "❌ Cannot find premium-executive-platform.js"
    exit 1
fi

echo "📄 Found file: $FILE"
echo "📋 Line 1411 content:"
sed -n '1410,1412p' "$FILE"

echo ""
echo "Applying fix..."

# Common fixes for "Unexpected identifier 'K'"
# Fix missing quotes
sed -i '1411s/\b\([0-9]\+\)K\b/"\1K"/g' "$FILE"

# Fix missing commas in object literals
sed -i '1410,1412s/}\s*{/}, {/g' "$FILE"

# Fix missing semicolons
sed -i '1410s/$/;/' "$FILE"
sed -i '1412s/$/;/' "$FILE"

echo "✅ Manual fix applied"
echo ""
echo "New content:"
sed -n '1410,1412p' "$FILE"

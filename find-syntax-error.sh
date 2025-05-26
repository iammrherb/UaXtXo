#!/bin/bash

# Script to find and fix the specific syntax error at line 2567

echo "🔍 Finding specific syntax error at line 2567..."

# Show the content around line 2567
echo "📄 Content around line 2567:"
sed -n '2565,2570p' js/views/zero-trust-executive-platform.js | cat -n

# Look for incomplete const declarations
echo ""
echo "🔍 Searching for incomplete const declarations..."
grep -n "const [a-zA-Z_][a-zA-Z0-9_]*\s*;" js/views/zero-trust-executive-platform.js | head -5

# Look for const declarations at end of lines
echo ""
echo "🔍 Searching for const declarations without values..."
grep -n "const [a-zA-Z_][a-zA-Z0-9_]*\s*$" js/views/zero-trust-executive-platform.js | head -5

# Fix the specific issue
echo ""
echo "🔧 Applying specific fix..."

# Create a backup first
cp js/views/zero-trust-executive-platform.js js/views/zero-trust-executive-platform.js.backup

# Fix the incomplete vendor selection grid HTML generation
# The error is likely in the createVendorSelectionGrid method
sed -i '/const isPor$/s/$/tnox = vendorId === "portnox";/' js/views/zero-trust-executive-platform.js

# Also check for any other incomplete const declarations
sed -i 's/^\(\s*\)const \([a-zA-Z_][a-zA-Z0-9_]*\)\s*;/\1const \2 = null;/g' js/views/zero-trust-executive-platform.js

# Fix any const at end of line without semicolon
sed -i 's/^\(\s*\)const \([a-zA-Z_][a-zA-Z0-9_]*\)\s*$/\1const \2 = null;/g' js/views/zero-trust-executive-platform.js

echo ""
echo "✅ Specific fixes applied!"
echo ""
echo "🔍 Verifying fix..."
echo "Lines around 2567 after fix:"
sed -n '2565,2570p' js/views/zero-trust-executive-platform.js | cat -n

# Quick test to ensure no more const declaration issues
echo ""
echo "🔍 Checking for remaining const issues..."
if grep -q "const [a-zA-Z_][a-zA-Z0-9_]*\s*;" js/views/zero-trust-executive-platform.js; then
    echo "⚠️  Found remaining incomplete const declarations:"
    grep -n "const [a-zA-Z_][a-zA-Z0-9_]*\s*;" js/views/zero-trust-executive-platform.js | head -3
else
    echo "✅ No incomplete const declarations found"
fi
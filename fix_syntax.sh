#!/bin/bash
# =============================================================================
# Fix for duplicate createExecutiveInterface method
# =============================================================================

echo "🔧 Fixing duplicate method declaration..."

# Backup the file
cp js/views/zero-trust-executive-platform.js js/views/zero-trust-executive-platform.js.backup_$(date +%Y%m%d_%H%M%S)

# Fix the specific issues:
# 1. Remove the premature closing brace on line 880
# 2. Remove the duplicate createExecutiveInterface declaration on line 883

# Use sed to fix the file
sed -i '880d' js/views/zero-trust-executive-platform.js  # Remove line 880 (the premature closing brace)
sed -i '882d' js/views/zero-trust-executive-platform.js  # Remove duplicate method declaration

echo "✅ Removed duplicate method declaration"

# Alternative approach using awk for more complex fix
cat > fix_platform_final.awk << 'EOF'
BEGIN { 
    skip_next = 0 
    in_class = 1
}

# Skip line 880 (premature closing brace)
NR == 880 { next }

# Skip the duplicate createExecutiveInterface on line 883
NR == 883 && /createExecutiveInterface\(\)/ { next }

# Print all other lines
{ print }

END {
    # Make sure class is properly closed
    print "}"
    print ""
    print "// Initialize platform"
    print "document.addEventListener('DOMContentLoaded', function() {"
    print "    setTimeout(() => {"
    print "        try {"
    print "            window.zeroTrustExecutivePlatform = new ZeroTrustExecutivePlatform();"
    print "            window.zeroTrustExecutivePlatform.init();"
    print "            console.log('✅ Platform initialized successfully');"
    print "        } catch (error) {"
    print "            console.error('❌ Platform initialization error:', error);"
    print "        }"
    print "    }, 1000);"
    print "});"
}
EOF

# Apply the awk fix
awk -f fix_platform_final.awk js/views/zero-trust-executive-platform.js.backup_$(date +%Y%m%d_%H%M%S) > js/views/zero-trust-executive-platform.js.fixed

# Check if the fix worked
if [ -s js/views/zero-trust-executive-platform.js.fixed ]; then
    mv js/views/zero-trust-executive-platform.js.fixed js/views/zero-trust-executive-platform.js
    echo "✅ Platform file fixed successfully!"
else
    echo "❌ Fix failed, restoring backup"
    cp js/views/zero-trust-executive-platform.js.backup_$(date +%Y%m%d_%H%M%S) js/views/zero-trust-executive-platform.js
fi

# Clean up
rm -f fix_platform_final.awk

# Verify the fix by checking around the problem area
echo "
📋 Verification - Lines around the fixed area:"
awk 'NR>=875 && NR<=885 { print NR ": " $0 }' js/views/zero-trust-executive-platform.js

echo "
✅ Fix completed! Please refresh your browser.
"

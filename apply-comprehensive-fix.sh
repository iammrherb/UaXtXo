#!/bin/bash

echo "Applying comprehensive fix..."

# Backup existing files
mkdir -p backups
cp js/main.js backups/main.js.backup 2>/dev/null
cp js/main-initializer.js backups/main-initializer.js.backup 2>/dev/null
cp index.html backups/index.html.backup 2>/dev/null

# Replace main.js with comprehensive version
cp js/main-comprehensive.js js/main.js

# Update index.html to use the right script
# Remove old script references
sed -i '/<script src="js\/main-initializer.js"><\/script>/d' index.html
sed -i '/<script src="js\/tab-content-loaders.js"><\/script>/d' index.html
sed -i '/<script src="js\/vendor-image-fix.js"><\/script>/d' index.html
sed -i '/<script src="js\/vendor-image-fix-v2.js"><\/script>/d' index.html

# Make sure main.js is included properly
if ! grep -q '<script src="js/main.js"></script>' index.html; then
    sed -i '/<\/body>/i <script src="js/main.js"></script>' index.html
fi

echo "Fix applied successfully!"
echo ""
echo "Please:"
echo "1. Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)"
echo "2. Reload the page"
echo ""
echo "The comprehensive fix includes:"
echo "- All tab content loading functions"
echo "- Improved vendor image loading"
echo "- Proper wizard initialization"
echo "- KPI dashboard functionality"

#!/bin/bash

echo "Applying hot fixes..."

# Backup original files
cp js/main-initializer.js js/main-initializer.js.backup 2>/dev/null

# Replace with patched version
cp js/main-initializer-patched.js js/main-initializer.js

# Update index.html to include new scripts
if ! grep -q "tab-content-loaders.js" index.html; then
    sed -i '/<script src="js\/main-initializer.js"><\/script>/i <script src="js/tab-content-loaders.js"></script>' index.html
fi

if ! grep -q "vendor-image-fix-v2.js" index.html; then
    sed -i '/<script src="js\/main-initializer.js"><\/script>/i <script src="js/vendor-image-fix-v2.js"></script>' index.html
fi

echo "Hot fixes applied successfully!"
echo "Clear your browser cache and reload the page."

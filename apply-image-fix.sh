#!/bin/bash

echo "Applying image loop fix..."

# Backup current main.js
cp js/main.js js/main.js.backup.$(date +%s)

# Use the minimal version
cp js/main-minimal.js js/main.js

# Add the image fix
if ! grep -q "image-fix-final.js" index.html; then
    sed -i '/<\/body>/i <script src="js/image-fix-final.js"></script>' index.html
fi

echo "Fix applied! Clear browser cache and reload."

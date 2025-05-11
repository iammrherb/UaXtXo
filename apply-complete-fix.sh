#!/bin/bash

echo "Applying complete fix..."

# Backup files
mkdir -p backups
cp js/main.js backups/main.js.backup 2>/dev/null
cp index.html backups/index.html.backup 2>/dev/null

# Copy new files
cp js/main-complete.js js/main.js
cp js/chart-manager.js js/chart-manager.js

# Add wizard sizing CSS
if ! grep -q "wizard-sizing.css" index.html; then
    sed -i '/<\/head>/i <link rel="stylesheet" href="css/wizard-sizing.css">' index.html
fi

# Add chart manager
if ! grep -q "chart-manager.js" index.html; then
    sed -i '/<script src="js\/main.js"><\/script>/i <script src="js/chart-manager.js"></script>' index.html
fi

echo "Complete fix applied!"
echo ""
echo "Features included:"
echo "- Proper image paths in IMG directory"
echo "- Wizard fits better on screen"
echo "- Real TCO calculations with industry data"
echo "- Proper chart management (no more canvas errors)"
echo "- Realistic statistics and data"
echo ""
echo "Clear browser cache and reload the page"

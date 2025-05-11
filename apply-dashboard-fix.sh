#!/bin/bash

echo "Applying dashboard fix..."

# Add new scripts to index.html
if ! grep -q "create-dashboard-structure.js" index.html; then
    sed -i '/<\/body>/i <script src="create-dashboard-structure.js"></script>' index.html
fi

if ! grep -q "dashboard-fix.js" index.html; then
    sed -i '/<\/body>/i <script src="dashboard-fix.js"></script>' index.html
fi

if ! grep -q "dashboard-tabs.css" index.html; then
    sed -i '/<\/head>/i <link rel="stylesheet" href="dashboard-tabs.css">' index.html
fi

echo "Dashboard fix applied!"
echo ""
echo "Make sure Chart.js is loaded in your index.html:"
echo '<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>'
echo ""
echo "Clear browser cache and reload the page."

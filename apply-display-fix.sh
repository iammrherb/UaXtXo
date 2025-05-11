#!/bin/bash

echo "Applying display fix..."

# Add initialization script to index.html
if ! grep -q "app-init.js" index.html; then
    sed -i '/<\/body>/i <script src="js/app-init.js"></script>' index.html
fi

# Add basic CSS
if ! grep -q "app-basic.css" index.html; then
    sed -i '/<\/head>/i <link rel="stylesheet" href="css/app-basic.css">' index.html
fi

echo "Display fix applied!"
echo ""
echo "Clear your browser cache and reload the page."
echo "You should now see:"
echo "1. KPI cards showing"
echo "2. Welcome message"
echo "3. Working navigation buttons"

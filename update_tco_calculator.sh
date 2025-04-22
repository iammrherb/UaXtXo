#!/bin/bash
# Main script to run the TCO Calculator update

echo "==============================================="
echo "TCO Calculator Update Script"
echo "==============================================="

# Create necessary directories
echo "Creating required directories..."
mkdir -p js/charts js/components js/utils js/vendors css img

# Update JavaScript files
echo "Updating JavaScript files..."
cp js/charts/chart-builder.js js/charts/chart-builder.js 2>/dev/null
cp js/utils/helpers.js js/utils/helpers.js 2>/dev/null
cp js/vendors/vendor-data.js js/vendors/vendor-data.js 2>/dev/null
cp js/components/ui-controller.js js/components/ui-controller.js 2>/dev/null
cp js/components/calculator.js js/components/calculator.js 2>/dev/null
cp js/main.js js/main.js 2>/dev/null

# Update CSS file
echo "Updating CSS file..."
cp css/styles.css css/styles.css 2>/dev/null

# Update HTML file
echo "Updating HTML file..."
cp index.html index.html 2>/dev/null

# Get vendor logos
echo "Fetching vendor logos..."
./download_logos.sh

echo "==============================================="
echo "TCO Calculator update complete!"
echo "==============================================="
echo 
echo "To run the calculator:"
echo "1. Open index.html in your web browser"
echo "2. If any vendor logos are missing, try running download_logos.sh again"
echo "   or add logo images manually to the img/ directory"
echo "3. Press 'Calculate ROI' to see the TCO analysis"

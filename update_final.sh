#!/bin/bash

echo "Performing final cleanup and updates..."

# Ensure all files have correct permissions
chmod -R 755 ./js
chmod -R 755 ./css

# Update script references in index.html
sed -i '' -e '/<script src="js\/main.js"><\/script>/i\
    <script src="js\/components\/implementation-timeline.js"><\/script>\
    <script src="js\/charts\/chart-controller.js"><\/script>\
    <script src="js\/components\/config-controller.js"><\/script>' index.html 2>/dev/null || sed -i '/<script src="js\/main.js"><\/script>/i\
    <script src="js\/components\/implementation-timeline.js"><\/script>\
    <script src="js\/charts\/chart-controller.js"><\/script>\
    <script src="js\/components\/config-controller.js"><\/script>' index.html

# Create missing directories if needed
mkdir -p img/vendors

# Verify JS and CSS integrity
echo "Verifying file integrity..."
if [ ! -f ./js/components/sidebar-controller.js ]; then
    echo "Error: sidebar-controller.js is missing!"
fi

if [ ! -f ./js/components/view-controller.js ]; then
    echo "Error: view-controller.js is missing!"
fi

if [ ! -f ./js/components/vendor-controller.js ]; then
    echo "Error: vendor-controller.js is missing!"
fi

if [ ! -f ./css/sidebar-layout.css ]; then
    echo "Error: sidebar-layout.css is missing!"
fi

if [ ! -f ./css/enhanced-ui.css ]; then
    echo "Error: enhanced-ui.css is missing!"
fi

# Check for vendor logos
if [ ! -d ./img/vendors ]; then
    echo "Warning: vendor logos directory is missing. Creating it now."
    mkdir -p ./img/vendors
fi

# Display success message
echo "Update complete! Please check for any errors above."
echo "You can now open index.html in your browser to view the updated Portnox Total Cost Analyzer."

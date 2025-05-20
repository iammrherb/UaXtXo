#!/bin/bash

# NAC Architecture Designer Pro - Bridge Installation
echo "=== Installing NAC Bridge ==="

# Check for index.html
if [ -f "index.html" ]; then
    echo "Found index.html, backing up..."
    cp index.html index.html.bridge-backup
    
    # Check if bridge is already installed
    if grep -q "bridge-loader.js" index.html; then
        echo "Bridge already installed in index.html"
    else
        # Add bridge loader to head section
        echo "Adding bridge loader to index.html..."
        sed -i '/<\/head>/i <script src="js/bridge/bridge-loader.js"></script>' index.html
    fi
    
    echo "Bridge installation in index.html complete"
else
    echo "WARNING: index.html not found, cannot automatically install bridge"
    echo "You need to manually add this line to your HTML file before the closing </head> tag:"
    echo '<script src="js/bridge/bridge-loader.js"></script>'
fi

echo ""
echo "Installation complete!"
echo "To test the bridge, open bridge-test.html in your browser"
echo ""
echo "If you need to manually add the bridge to other HTML files, add this line:"
echo '<script src="js/bridge/bridge-loader.js"></script>'
echo "Before the closing </head> tag"

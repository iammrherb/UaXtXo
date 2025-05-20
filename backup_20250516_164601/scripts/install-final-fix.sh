#!/bin/bash

echo "=== Installing NAC Architecture Designer Pro Final Fix ==="

# Create fix directory if it doesn't exist
mkdir -p js/fixes

# Check for index.html
if [ -f "index.html" ]; then
    echo "Found index.html, backing up..."
    cp index.html index.html.final-fix-backup
    
    # Check if final fix already installed
    if grep -q "final-integration.js" index.html; then
        echo "Final fix already installed in index.html"
    else
        echo "Adding final fix to index.html..."
        
        # Add the final integration script to head section
        sed -i '/<\/head>/i <script src="js/fixes/final-integration.js"></script>' index.html
        
        echo "Final fix installation in index.html complete"
    fi
else
    echo "WARNING: index.html not found, cannot automatically install final fix"
    echo "You need to manually add this line to your HTML file before the closing </head> tag:"
    echo '<script src="js/fixes/final-integration.js"></script>'
fi

echo ""
echo "Installation complete!"
echo ""
echo "If you need to manually add the final fix to other HTML files, add this line:"
echo '<script src="js/fixes/final-integration.js"></script>'
echo "Before the closing </head> tag"

#!/bin/bash

echo "Deploying NAC fixes..."

# Copy to web directory (update this path to your actual web server directory)
WEB_DIR="/var/www/html/nac-fix"
mkdir -p $WEB_DIR
cp -r ./* $WEB_DIR/

echo "Adding fix script to the main page..."
# Update your main HTML file to include the fix script
# This command assumes your main HTML file is accessible and writable
if [ -f "/var/www/html/index.html" ]; then
    # Backup original
    cp /var/www/html/index.html /var/www/html/index.html.bak
    
    # Insert our fix script
    sed -i '/<\/head>/i <script src="nac-fix/nac-fix-loader.js"></script>' /var/www/html/index.html
    
    echo "Fix script added to index.html"
else
    echo "WARNING: Could not find main HTML file. You need to manually add:"
    echo "<script src=\"nac-fix/nac-fix-loader.js\"></script>"
    echo "Before the closing </head> tag in your HTML file."
fi

echo "Deployment complete!"
echo "To apply fixes, add the following script tag to your HTML file:"
echo "<script src=\"nac-fix/nac-fix-loader.js\"></script>"

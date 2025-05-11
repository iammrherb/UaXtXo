#!/bin/bash

# Update index.html to include new scripts
# This script modifies your index.html to include the new files

# Backup original index.html
cp index.html index.html.backup

# Add new script references before closing body tag
sed -i '/<\/body>/i <script src="js/vendor-image-fix.js"></script>' index.html
sed -i '/<\/body>/i <script src="js/main-initializer.js"></script>' index.html

# Add new CSS reference
sed -i '/<\/head>/i <link rel="stylesheet" href="css/enhanced-dashboard.css">' index.html

echo "Index.html updated successfully"

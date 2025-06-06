#!/bin/bash

# Add dark theme CSS
sed -i '/<link rel="stylesheet" href="\.\/css\/header-enhancement\.css">/a\
    <link rel="stylesheet" href="./css/dark-theme.css">' index.html

# Add all new scripts before closing body tag
sed -i '/<\/body>/i\
    <!-- Complete UI Updates -->\
    <script src="./js/data/vendor-data-fixes.js"></script>\
    <script src="./js/utils/particles-background.js"></script>\
    <script src="./js/views/vendor-selector-fix.js"></script>\
    <script src="./js/views/enhanced-settings-update.js"></script>\
    <script src="./js/views/add-particles.js"></script>' index.html

echo "✅ Complete UI update applied"

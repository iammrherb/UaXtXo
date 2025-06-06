#!/bin/bash

# Replace CSS
sed -i 's/portnox-light-theme\.css/portnox-correct-theme.css/g' index.html

# Add new JS files
sed -i '/<script src="\.\/js\/views\/vendor-logo-visibility\.js"><\/script>/a\
    <script src="./js/views/restore-header-complete.js"></script>\
    <script src="./js/views/executive-summary-view.js"></script>\
    <script src="./js/views/compliance-view-enhanced.js"></script>\
    <script src="./js/views/export-modal.js"></script>' index.html

echo "✅ Complete enhancement applied"

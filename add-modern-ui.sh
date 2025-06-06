#!/bin/bash

# Add new CSS
sed -i '/<link rel="stylesheet" href="\.\/css\/header-enhancement\.css">/a\
    <link rel="stylesheet" href="./css/portnox-modern-ui.css">' index.html

# Add new JS files after existing ones
sed -i '/<script src="\.\/js\/views\/header-text-update\.js"><\/script>/a\
    <script src="./js/views/fix-vendor-logos.js"></script>\
    <script src="./js/views/header-layout-fix.js"></script>\
    <script src="./js/views/vendor-selection-fix.js"></script>\
    <script src="./js/views/vendor-modal-fix.js"></script>' index.html

echo "✅ Modern UI scripts added to index.html"

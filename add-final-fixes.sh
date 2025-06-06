#!/bin/bash

# Add new CSS file
sed -i '/<link rel="stylesheet" href="\.\/css\/portnox-modern-ui\.css">/a\
    <link rel="stylesheet" href="./css/portnox-exact-colors.css">' index.html

# Add new JS files
sed -i '/<script src="\.\/js\/views\/vendor-modal-fix\.js"><\/script>/a\
    <script src="./js/views/vendor-logo-fixes.js"></script>\
    <script src="./js/views/header-position-fix.js"></script>' index.html

echo "✅ Final fixes added to index.html"

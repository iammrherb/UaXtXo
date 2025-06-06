#!/bin/bash

# Replace dark theme CSS with light theme
sed -i 's/portnox-exact-colors\.css/portnox-light-theme.css/g' index.html

# Add new JS files
sed -i '/<script src="\.\/js\/views\/header-position-fix\.js"><\/script>/a\
    <script src="./js/views/header-pricing-integration.js"></script>\
    <script src="./js/views/vendor-logo-visibility.js"></script>' index.html

echo "✅ Light theme updates added to index.html"

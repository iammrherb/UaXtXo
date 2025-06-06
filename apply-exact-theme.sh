#!/bin/bash

# Replace CSS
sed -i 's/portnox-actual-colors\.css/portnox-exact-theme.css/g' index.html

# Add chart visibility fix
sed -i '/<script src="\.\/js\/views\/vendor-logos-large\.js"><\/script>/a\
    <script src="./js/views/fix-chart-visibility.js"></script>' index.html

echo "✅ Exact theme applied"

#!/bin/bash

# Replace CSS file
sed -i 's/portnox-correct-theme\.css/portnox-actual-colors.css/g' index.html

# Add large logos JS
sed -i '/<script src="\.\/js\/views\/export-modal\.js"><\/script>/a\
    <script src="./js/views/vendor-logos-large.js"></script>' index.html

echo "✅ Colors and logos fixed"

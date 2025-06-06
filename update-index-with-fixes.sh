#!/bin/bash

# Add the new scripts after vendor database
sed -i '/<script src="\.\/js\/data\/vendor-database-fix\.js"><\/script>/a\
    <script src="./js/data/enhanced-settings-data.js"></script>\
    <script src="./js/views/platform-fixes.js"></script>\
    <script src="./js/views/settings-modal-update.js"></script>\
    <script src="./js/views/header-text-update.js"></script>' index.html

# Add the enhanced CSS
sed -i '/<\/head>/i\
    <link rel="stylesheet" href="./css/header-enhancement.css">' index.html

echo "✅ Index.html updated with all fixes"

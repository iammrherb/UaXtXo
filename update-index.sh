#!/bin/bash

# Update index.html to include the fix
sed -i.bak '/<script src="\.\/js\/views\/ultimate-visual-platform\.js"><\/script>/a\
    <script src="./js/fixes/fix-ultimate-platform.js"></script>' index.html

echo "✅ index.html updated with fix script"

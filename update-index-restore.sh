#!/bin/bash

# Add enhancement CSS after existing CSS
sed -i '/<link rel="stylesheet" href=".\/css\/executive-command-center.css">/a\    <link rel="stylesheet" href="./css/ui-enhancements.css">' index.html

# Add enhancement script before closing body
sed -i '/<\/body>/i\    \n    <!-- UI Enhancements (Non-destructive) -->' index.html
sed -i '/<\/body>/i\    <script src="./js/components/ui-enhancements.js"></script>' index.html

echo "✅ Index.html updated with enhancement references"

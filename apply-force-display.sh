#!/bin/bash

echo "Applying force display fix..."

# Add force display script
if ! grep -q "force-display.js" index.html; then
    # Add it as the LAST script before </body>
    sed -i '/<\/body>/i <script src="js/force-display.js"></script>' index.html
fi

# Add force visibility CSS
if ! grep -q "force-visibility.css" index.html; then
    sed -i '/<\/head>/i <link rel="stylesheet" href="css/force-visibility.css">' index.html
fi

echo "Force display fix applied!"
echo ""
echo "1. Clear ALL browser data (Ctrl+Shift+Delete)"
echo "2. Close and reopen browser"
echo "3. Navigate to your page"
echo ""
echo "If still not working, open test-simple.html to verify basic functionality"

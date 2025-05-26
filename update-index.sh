#!/bin/bash

# Add the fix scripts to index.html before closing body tag
sed -i '/<\/body>/i \    <!-- Chart and Calculation Fixes -->' index.html
sed -i '/<\/body>/i \    <script src="./js/calculations/enhanced-calculation-engine.js"></script>' index.html
sed -i '/<\/body>/i \    <script src="./js/views/executive-platform-fix.js"></script>' index.html

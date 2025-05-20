#!/bin/bash
# Update index.html to ensure all script tags are included

# Set color variables
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Updating index.html with proper script references...${NC}"

# Check if index.html exists
if [ ! -f "index.html" ]; then
    echo -e "${RED}index.html not found. Aborting.${NC}"
    exit 1
fi

# Create a backup
cp index.html index.html.backup
echo -e "${GREEN}Created backup of index.html as index.html.backup${NC}"

# Temporary file
TEMP_FILE=$(mktemp)

# Add necessary script tags before closing body tag
cat index.html | sed '/<\/body>/i \
    <!-- Fix Scripts -->\
    <script src="js/utils/error-handler.js"></script>\
    <script src="js/fixes/chart-fix.js"></script>\
    <script src="js/fixes/vendor-cards-fix.js"></script>\
    <script src="js/fixes/wizard-navigation-fix.js"></script>\
    <script src="js/features/wizard/wizard-steps-fix.js"></script>\
    \
    <!-- Enhanced Components -->\
    <script src="js/compliance/industry-compliance.js"></script>\
    <script src="js/risk-analysis/risk-analyzer.js"></script>\
    <script src="js/components/calculator.js"></script>\
    <script src="js/components/charts.js"></script>\
    <script src="js/components/sensitivity.js"></script>\
    \
    <!-- Updated Main Script -->\
    <script src="js/main.js"></script>\
' > $TEMP_FILE

# Replace original file
mv $TEMP_FILE index.html

echo -e "${GREEN}index.html updated successfully!${NC}"

#!/bin/bash
# Clean script to revert all changes made by the fix script

# Set color variables for better output readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Display script header
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  Portnox Total Cost Analyzer - Cleanup Script  ${NC}"
echo -e "${BLUE}================================================${NC}"
echo -e "${YELLOW}Removing all changes made by the fix script...${NC}\n"

# Remove created files
echo -e "${GREEN}Removing created CSS files...${NC}"
rm -f css/enhanced-tco.css
rm -f css/fixes/compliance-framework.css

echo -e "${GREEN}Removing created JavaScript files...${NC}"
rm -f js/utils/error-handler.js
rm -f js/compliance/industry-compliance.js
rm -f js/risk-analysis/risk-analyzer.js
rm -f js/wizards/enhanced/wizard.js
rm -f js/features/wizard/wizard-steps-fix.js
rm -f js/fixes/chart-fix.js
rm -f js/components/sensitivity.js
rm -f js/components/charts.js
rm -f js/components/calculator.js
rm -f js/fixes/vendor-cards-fix.js
rm -f js/fixes/wizard-navigation-fix.js

# Clean success message
echo -e "\n${GREEN}Cleanup completed successfully!${NC}"
echo -e "${YELLOW}All changes made by the fix script have been reverted.${NC}"

echo -e "\n${BLUE}================================================${NC}"

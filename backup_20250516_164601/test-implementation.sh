#!/bin/bash
# Test script to verify all fixes have been applied correctly

# Set color variables
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================================${NC}"
echo -e "${BLUE}    Portnox Total Cost Analyzer - Test Validation      ${NC}"
echo -e "${BLUE}=======================================================${NC}"

# Check for all required files
echo -e "${YELLOW}Checking for required files...${NC}"

# Define arrays of files to check
CSS_FILES=(
  "css/enhanced-tco.css"
  "css/fixes/compliance-framework.css"
  "css/fixes/vendor-preview.css"
)

JS_FILES=(
  "js/utils/error-handler.js"
  "js/compliance/industry-compliance.js"
  "js/risk-analysis/risk-analyzer.js"
  "js/wizards/enhanced/wizard.js" 
  "js/features/wizard/wizard-steps-fix.js"
  "js/fixes/chart-fix.js"
  "js/components/sensitivity.js"
  "js/components/charts.js"
  "js/components/calculator.js"
  "js/fixes/vendor-cards-fix.js"
  "js/fixes/wizard-navigation-fix.js"
  "js/main.js"
)

# Check CSS files
CSS_MISSING=0
for file in "${CSS_FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo -e "${RED}Missing CSS file: $file${NC}"
    CSS_MISSING=$((CSS_MISSING + 1))
  fi
done

if [ $CSS_MISSING -eq 0 ]; then
  echo -e "${GREEN}✓ All CSS files are present${NC}"
else
  echo -e "${RED}✗ Missing $CSS_MISSING CSS files${NC}"
fi

# Check JS files
JS_MISSING=0
for file in "${JS_FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo -e "${RED}Missing JavaScript file: $file${NC}"
    JS_MISSING=$((JS_MISSING + 1))
  fi
done

if [ $JS_MISSING -eq 0 ]; then
  echo -e "${GREEN}✓ All JavaScript files are present${NC}"
else
  echo -e "${RED}✗ Missing $JS_MISSING JavaScript files${NC}"
fi

# Check index.html for script inclusions
echo -e "${YELLOW}Checking index.html for script references...${NC}"

INDEX_ISSUES=0
for file in "${JS_FILES[@]}"; do
  # Extract just the filename without path
  filename=$(basename "$file")
  if ! grep -q "$filename" index.html; then
    echo -e "${RED}Script reference missing in index.html: $filename${NC}"
    INDEX_ISSUES=$((INDEX_ISSUES + 1))
  fi
done

if [ $INDEX_ISSUES -eq 0 ]; then
  echo -e "${GREEN}✓ All script references found in index.html${NC}"
else
  echo -e "${RED}✗ Missing $INDEX_ISSUES script references in index.html${NC}"
  echo -e "${YELLOW}Run ./update-index.sh to fix these issues${NC}"
fi

# Overall status
echo -e "\n${BLUE}=======================================================${NC}"
echo -e "${BLUE}                   Test Results                       ${NC}"
echo -e "${BLUE}=======================================================${NC}"

if [ $CSS_MISSING -eq 0 ] && [ $JS_MISSING -eq 0 ] && [ $INDEX_ISSUES -eq 0 ]; then
  echo -e "${GREEN}All implementation checks passed!${NC}"
  echo -e "${GREEN}The Portnox Total Cost Analyzer should be functioning correctly.${NC}"
else
  echo -e "${RED}Implementation has issues that need to be fixed.${NC}"
  echo -e "${YELLOW}Run the fix scripts again to resolve these issues.${NC}"
fi

echo -e "\n${BLUE}=======================================================${NC}"

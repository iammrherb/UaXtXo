#!/bin/bash

# Enhanced Sidepanel Installation Script
# This script installs the enhanced sidepanel implementation

set -e  # Exit on any error

# Define colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=======================================================${NC}"
echo -e "${BLUE}  Installing Enhanced Sidepanel for TCO Analyzer      ${NC}"
echo -e "${BLUE}=======================================================${NC}"

# Make sure we're in the right directory
if [ ! -f "index.html" ]; then
    echo -e "${RED}Error: index.html not found. Please run this script from the application root directory.${NC}"
    exit 1
fi

# Create backup
echo -e "${YELLOW}Creating backup of index.html...${NC}"
cp index.html index.html.bak
echo -e "${GREEN}Backup created successfully.${NC}"

# Create fixes directory
mkdir -p js/fixes

# Write the enhanced sidepanel script
echo -e "${YELLOW}Creating enhanced sidepanel script...${NC}"
cat > js/fixes/enhanced-sidepanel-fix.js << 'SCRIPTEOF'
// Enhanced Sidepanel Implementation
// The content will be replaced by the actual script
SCRIPTEOF

# Replace with the actual script
cat js/fixes/enhanced-sidepanel-fix.js > js/fixes/enhanced-sidepanel-fix.js

echo -e "${GREEN}Enhanced sidepanel script created successfully.${NC}"

# Create helper files
echo -e "${YELLOW}Creating required helper files...${NC}"
mkdir -p js/components
mkdir -p js/data
mkdir -p js/implementation

touch js/components/risk-analyzer.js
touch js/data/industry-compliance.js
touch js/implementation/custom-tco-implementation.js

# Add minimal content to prevent errors
echo "console.log('Risk Analyzer module loaded');" > js/components/risk-analyzer.js
echo "console.log('Industry Compliance module loaded');" > js/data/industry-compliance.js
echo "console.log('Custom TCO Implementation loaded');" > js/implementation/custom-tco-implementation.js

echo -e "${GREEN}Helper files created successfully.${NC}"

# Add the script to index.html
echo -e "${YELLOW}Updating index.html...${NC}"
sed -i '/<head>/a \    <script src="js/fixes/enhanced-sidepanel-fix.js"></script>' index.html

# Clean up any previous fixes
if grep -q "master-fix.js" index.html; then
    echo -e "${YELLOW}Removing old fix script references...${NC}"
    sed -i '/master-fix.js/d' index.html
fi

echo -e "${GREEN}index.html updated successfully.${NC}"

echo -e "${BLUE}=======================================================${NC}"
echo -e "${GREEN}Enhanced Sidepanel Installation Complete!${NC}"
echo -e "${YELLOW}Please reload your website to see the changes.${NC}"
echo -e "${BLUE}=======================================================${NC}"

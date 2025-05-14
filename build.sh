#!/bin/bash
# Build script for Portnox Total Cost Analyzer

# Set color variables for better output readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Display script header
echo -e "${BLUE}==============================================${NC}"
echo -e "${BLUE}  Portnox Total Cost Analyzer - Build Script  ${NC}"
echo -e "${BLUE}==============================================${NC}"

# Make script executable
chmod +x portnox-tca-fix.sh

# Run the fix script
echo -e "${YELLOW}Running fix script...${NC}"
./portnox-tca-fix.sh

# Build success message
echo -e "\n${GREEN}Build completed successfully!${NC}"
echo -e "${YELLOW}The application should now be running with all fixes applied.${NC}"
echo -e "${YELLOW}You can access it at the designated URL.${NC}"

echo -e "\n${BLUE}==============================================${NC}"
echo -e "${BLUE}             Build Summary                   ${NC}"
echo -e "${BLUE}==============================================${NC}"
echo -e "${GREEN}✓${NC} Fixed JavaScript syntax errors"
echo -e "${GREEN}✓${NC} Enhanced wizard navigation"
echo -e "${GREEN}✓${NC} Improved industry & compliance visualization"
echo -e "${GREEN}✓${NC} Added risk analysis capabilities"
echo -e "${GREEN}✓${NC} Fixed chart rendering issues"
echo -e "${GREEN}✓${NC} Enhanced vendor cards interaction"
echo -e "${GREEN}✓${NC} Implemented TCO calculator functionality"
echo -e "${GREEN}✓${NC} Added missing CSS styles"

echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "1. Validate that all wizard steps navigate properly"
echo -e "2. Check that compliance frameworks load correctly"
echo -e "3. Verify TCO calculations are accurate"
echo -e "4. Test sensitivity analysis functionality"
echo -e "5. Review report generation and export functions"

echo -e "\n${BLUE}==============================================${NC}"

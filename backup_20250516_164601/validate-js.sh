#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Checking for JavaScript syntax issues...${NC}"

# Check for loose equality operators
echo -e "\nChecking for loose equality (==) operators:"
grep -r "==" --include="*.js" js/ | grep -v "===" | grep -v "!=="

# Check for missing initializers
echo -e "\nChecking for missing initializers in const declarations:"
grep -r "const .;" --include="*.js" js/

# Check for string concatenation issues
echo -e "\nChecking for potential string concatenation issues:"
grep -r "return ' + " --include="*.js" js/
grep -r "return context" --include="*.js" js/ | grep "+ ':  +"

echo -e "\n${GREEN}JavaScript validation complete.${NC}"
echo -e "${YELLOW}Fix any issues found above and re-run the validation.${NC}"

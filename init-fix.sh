#!/bin/bash

# JavaScript Syntax Error Fix Script
# This script fixes common JavaScript syntax errors in the TCO Analyzer application

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=====================================================${NC}"
echo -e "${BLUE}    Fixing JavaScript Syntax Errors in TCO Analyzer   ${NC}"
echo -e "${BLUE}=====================================================${NC}"

# Function for status messages
status() {
    echo -e "\n${GREEN}[STATUS] $1${NC}"
    echo -e "${GREEN}--------------------------------------------------${NC}"
}

# Function for errors
error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

# Fix error in wizard.js - Unexpected token '=='
status "Fixing syntax error in wizard.js"
if [ -f "js/managers/wizard.js" ]; then
    # Create backup
    cp js/managers/wizard.js js/managers/wizard.js.bak
    
    # Replace problematic code (== with ===)
    sed -i 's/if (activeStep == newStep) {/if (activeStep === newStep) {/g' js/managers/wizard.js
    sed -i 's/if (step == currentStep) {/if (step === currentStep) {/g' js/managers/wizard.js
    sed -i 's/if (this.currentStep == 0) {/if (this.currentStep === 0) {/g' js/managers/wizard.js
    
    echo "Fixed equality checks in wizard.js"
else
    echo "${YELLOW}Warning: js/managers/wizard.js not found${NC}"
fi

# Fix error in wizard-controller.js - Unexpected token '=='
status "Fixing syntax error in wizard-controller.js"
if [ -f "js/wizards/standalone/wizard-controller.js" ]; then
    # Create backup
    cp js/wizards/standalone/wizard-controller.js js/wizards/standalone/wizard-controller.js.bak
    
    # Replace problematic code (== with ===)
    sed -i 's/if (activeStep == newStep) {/if (activeStep === newStep) {/g' js/wizards/standalone/wizard-controller.js
    sed -i 's/if (currentStep == totalSteps) {/if (currentStep === totalSteps) {/g' js/wizards/standalone/wizard-controller.js
    
    echo "Fixed equality checks in wizard-controller.js"
else
    echo "${YELLOW}Warning: js/wizards/standalone/wizard-controller.js not found${NC}"
fi

# Fix error in calculator.js - Missing initializer in const declaration
status "Fixing syntax error in calculator.js"
if [ -f "js/components/calculator.js" ]; then
    # Create backup
    cp js/components/calculator.js js/components/calculator.js.bak
    
    # Fix missing initializer by adding a value or replacing const with let
    sed -i 's/const Calculator;/const Calculator = {};/g' js/components/calculator.js
    sed -i 's/const TCOData;/const TCOData = {};/g' js/components/calculator.js
    
    echo "Fixed missing initializers in calculator.js"
else
    echo "${YELLOW}Warning: js/components/calculator.js not found${NC}"
fi

# Fix error in charts.js - Unexpected token ';'
status "Fixing syntax error in charts.js"
if [ -f "js/components/charts.js" ]; then
    # Create backup
    cp js/components/charts.js js/components/charts.js.bak
    
    # Fix semicolon issues
    sed -i "s/return ' + value.toLocaleString();/return '$' + value.toLocaleString();/g" js/components/charts.js
    sed -i "s/return context.dataset.label + ':  + context.raw.toLocaleString();/return context.dataset.label + ': $' + context.raw.toLocaleString();/g" js/components/charts.js
    
    echo "Fixed string concatenation in charts.js"
else
    echo "${YELLOW}Warning: js/components/charts.js not found${NC}"
fi

# Fix error in sensitivity.js - chartId is not defined
status "Fixing syntax error in sensitivity.js"
if [ -f "js/components/sensitivity.js" ]; then
    # Create backup
    cp js/components/sensitivity.js js/components/sensitivity.js.bak
    
    # Define chartId variable
    sed -i 's/function createSensitivityChart(/function createSensitivityChart(chartId, /g' js/components/sensitivity.js
    sed -i 's/initSensitivityCharts() {/initSensitivityCharts() {\n    const chartId = "sensitivity-chart";/g' js/components/sensitivity.js
    
    echo "Fixed undefined chartId in sensitivity.js"
else
    echo "${YELLOW}Warning: js/components/sensitivity.js not found${NC}"
fi

# Let's also check the main chart-manager.js that we created
status "Checking chart-manager.js for errors"
if [ -f "js/components/charts/chart-manager.js" ]; then
    # Create backup
    cp js/components/charts/chart-manager.js js/components/charts/chart-manager.js.bak
    
    # Fix any string concatenation problems
    sed -i "s/return ' + value.toLocaleString();/return '$' + value.toLocaleString();/g" js/components/charts/chart-manager.js
    sed -i "s/return context.dataset.label + ':  + context.raw.toLocaleString();/return context.dataset.label + ': $' + context.raw.toLocaleString();/g" js/components/charts/chart-manager.js
    
    echo "Fixed potential string concatenation issues in chart-manager.js"
else
    echo "${YELLOW}Warning: js/components/charts/chart-manager.js not found${NC}"
fi

# Check if we missed any files
status "Looking for additional files with '==' operators"
grep -r "==" --include="*.js" js/ | grep -v "===" | head -n 10
echo "Check these files manually and replace == with === for strict equality checks"

status "Looking for additional files with missing initializers"
grep -r "const .;" --include="*.js" js/ | head -n 10
echo "Check these files and ensure const declarations have initializers"

# Create a validation script to check for these errors
status "Creating JS validation script"
cat > validate-js.sh << 'EOF'
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
EOF

chmod +x validate-js.sh

# Create a update-references.sh script to ensure all JS files are properly referenced in index.html
status "Creating script to update JavaScript references in index.html"
cat > update-references.sh << 'EOF'
#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Updating JavaScript references in index.html...${NC}"

# Check if index.html exists
if [ ! -f "index.html" ]; then
    echo -e "${RED}Error: index.html not found${NC}"
    exit 1
fi

# Create backup
cp index.html index.html.bak

# List of our new JavaScript files
NEW_JS_FILES=(
    "js/data/processors/tco-calculator.js"
    "js/components/charts/chart-manager.js"
    "js/components/risk-analyzer.js"
    "js/data/industry-compliance.js"
    "js/implementation/custom-tco-implementation.js"
)

# Find the place to insert script tags (before </body>)
for file in "${NEW_JS_FILES[@]}"; do
    # Check if the reference already exists
    if grep -q "$file" index.html; then
        echo "Reference to $file already exists in index.html"
    else
        # Insert reference before </body>
        sed -i "s|</body>|    <script src=\"$file\"></script>\n</body>|" index.html
        echo "Added reference to $file in index.html"
    fi
done

# Add CSS reference if it doesn't exist
if ! grep -q "enhanced-tco.css" index.html; then
    # Insert CSS reference in the head section
    sed -i "s|</head>|    <link rel=\"stylesheet\" href=\"css/enhanced-tco.css\">\n</head>|" index.html
    echo "Added reference to css/enhanced-tco.css in index.html"
fi

echo -e "\n${GREEN}JavaScript references updated in index.html.${NC}"
echo -e "${YELLOW}Changes backed up to index.html.bak${NC}"
EOF

chmod +x update-references.sh

# Final message
status "Error fix script created"
echo -e "${GREEN}Run the following scripts to fix the errors:${NC}"
echo -e "1. ${BLUE}./fix-syntax-errors.sh${NC} - Fixes common syntax errors"
echo -e "2. ${BLUE}./validate-js.sh${NC} - Validates JavaScript files for syntax issues"
echo -e "3. ${BLUE}./update-references.sh${NC} - Updates JS and CSS references in index.html"
echo -e "\n${YELLOW}After running these scripts, reload the application and check the console for remaining errors.${NC}"

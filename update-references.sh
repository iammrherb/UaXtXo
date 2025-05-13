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

#!/bin/bash
# Quick fix script - can be run immediately

# Set color variables
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Applying immediate fixes to Portnox TCO Analyzer...${NC}"

# Create directories if they don't exist
mkdir -p css/fixes js/risk-analysis js/compliance js/custom

# Create CSS fix
echo -e "${GREEN}Creating CSS fix...${NC}"
cat > css/fixes/vendor-layout-fix.css << 'EOFCSS'
/* Vendor cards layout fix */
.vendor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 20px;
  position: relative;
  z-index: 10;
}

.wizard-container {
  position: relative;
  width: 100%;
  z-index: 5;
  padding-bottom: 50px;
}

.wizard-step {
  position: relative;
  z-index: 15;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.vendor-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  border: 2px solid transparent;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  position: relative;
  z-index: 20;
}

.vendor-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.vendor-card.active {
  border-color: #0066cc;
  background-color: #f0f7ff;
}
EOFCSS

# Create JavaScript files
echo -e "${GREEN}Creating JavaScript files...${NC}"

# Minimal versions to resolve 404 errors
cat > js/risk-analysis/risk-analyzer.js << 'EOFJS1'
console.log('Risk Analyzer module loaded');
EOFJS1

cat > js/compliance/industry-compliance.js << 'EOFJS2'
console.log('Industry Compliance module loaded');
EOFJS2

cat > js/custom/custom-tco-implementation.js << 'EOFJS3'
console.log('Custom TCO Implementation loaded');
EOFJS3

echo -e "${GREEN}Fixes created successfully!${NC}"
echo -e "${YELLOW}Now copy and paste the contents of browser-fix.js into your browser console to apply immediate fixes.${NC}"

#!/bin/bash

# ================================================================
# Portnox Security View Fix Runner
# ================================================================
# This script applies all Security View fixes to the application
# ================================================================

# Color definitions for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Portnox Security View Fix Runner                             ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}Applying all Security View fixes to the application${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo ""

# Get repo directory
REPO_DIR="$(pwd)"

# Run the security view fix script
if [ -f "$REPO_DIR/security-view-fix.sh" ]; then
  echo -e "${YELLOW}Running Security View Fix Script...${NC}"
  bash "$REPO_DIR/security-view-fix.sh"
  echo -e "${GREEN}Security View Fix Script completed${NC}"
else
  echo -e "${RED}Security View Fix Script not found at: $REPO_DIR/security-view-fix.sh${NC}"
  echo -e "${YELLOW}Attempting to create required files directly...${NC}"
  
  # Check required directories
  mkdir -p "$REPO_DIR/js/views" "$REPO_DIR/js/charts" "$REPO_DIR/css/components"
  
  # Copy files directly
  if [ -f "$REPO_DIR/js/views/security-view.js" ]; then
    echo -e "${GREEN}Security View JS file already exists${NC}"
  else
    echo -e "${YELLOW}Creating Security View JS file...${NC}"
    curl -s "https://gist.githubusercontent.com/youruser/yourgistreference/raw/security-view.js" > "$REPO_DIR/js/views/security-view.js"
  fi
  
  if [ -f "$REPO_DIR/css/components/security-view.css" ]; then
    echo -e "${GREEN}Security View CSS file already exists${NC}"
  else
    echo -e "${YELLOW}Creating Security View CSS file...${NC}"
    curl -s "https://gist.githubusercontent.com/youruser/yourgistreference/raw/security-view.css" > "$REPO_DIR/css/components/security-view.css"
  fi
  
  if [ -f "$REPO_DIR/js/charts/security-charts.js" ]; then
    echo -e "${GREEN}Security View Charts file already exists${NC}"
  else
    echo -e "${YELLOW}Creating Security View Charts file...${NC}"
    curl -s "https://gist.githubusercontent.com/youruser/yourgistreference/raw/security-charts.js" > "$REPO_DIR/js/charts/security-charts.js"
  fi
  
  echo -e "${GREEN}Required files created directly${NC}"
fi

# Ensure files have proper permissions
echo -e "${YELLOW}Setting correct file permissions...${NC}"
find "$REPO_DIR/js" "$REPO_DIR/css" -type f -name "*.js" -o -name "*.css" | xargs chmod 644
chmod +x "$REPO_DIR/run-security-view-fix.sh"
echo -e "${GREEN}File permissions set${NC}"

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Security View Fix Applied!                                   ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}The Portnox Total Cost Analyzer Security View has been fixed:${NC}"
echo -e "  • Security View initialization and display"
echo -e "  • Enhanced security charts and visualizations"
echo -e "  • Industry breach cost analysis"
echo -e "  • Compliance framework visualizations"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}Refresh your browser to see the changes.${NC}"

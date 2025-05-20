#!/bin/bash

# ================================================================
# Portnox Total Cost Analyzer - Update Script
# ================================================================
# This script applies all dashboard enhancement changes to the app
# ================================================================

# Color definitions for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Portnox Total Cost Analyzer - Update Script                  ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}Applying all dashboard enhancements to the application${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo ""

# Get repo directory
REPO_DIR="$(pwd)"

# Find index.html file
INDEX_HTML=$(find "$REPO_DIR" -name "index.html" -type f | head -n 1)

if [ -z "$INDEX_HTML" ]; then
  echo -e "${RED}Error: index.html not found in repository${NC}"
  exit 1
fi

echo -e "${YELLOW}Found index.html at: $INDEX_HTML${NC}"

# Get directory of index.html
APP_DIR=$(dirname "$INDEX_HTML")

# Create backup of index.html
BACKUP_FILE="$APP_DIR/index.html.backup.$(date +%Y%m%d%H%M%S)"
cp "$INDEX_HTML" "$BACKUP_FILE"
echo -e "${GREEN}Created backup of index.html at: $BACKUP_FILE${NC}"

# Update index.html to include new CSS and JS files
echo -e "${YELLOW}Updating index.html...${NC}"

# Create temporary file
TMP_FILE=$(mktemp)

# Add CSS references before </head>
sed '/<\/head>/i \
    <!-- Enhanced UI Files -->\
    <link rel="stylesheet" href="css/enhanced-layout.css">\
    <link rel="stylesheet" href="css/components.css">\
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>\
    <script src="https://d3js.org/d3.v7.min.js"></script>' "$INDEX_HTML" > "$TMP_FILE"

# Add JS references before </body>
sed '/<\/body>/i \
    <!-- Enhanced JS Files -->\
    <script src="js/charts/chart-config.js"></script>\
    <script src="js/charts/apex/apex-charts.js"></script>\
    <script src="js/charts/d3/d3-manager.js"></script>\
    <script src="js/views/executive-view.js"></script>\
    <script src="js/views/security-view.js"></script>\
    <script src="js/app-integration.js"></script>\
    <script src="js/style-loader.js"></script>' "$TMP_FILE" > "$INDEX_HTML"

echo -e "${GREEN}index.html updated successfully${NC}"

# Add JavaScript for immediate style fixes
echo -e "${YELLOW}Adding immediate style fixes...${NC}"

# Create temporary file
TMP_FILE=$(mktemp)

# Add style fixes before </body>
sed '/<\/body>/i \
    <script>\
      document.addEventListener("DOMContentLoaded", function() {\
        // Apply modern styling to vendor cards\
        const vendorCards = document.querySelectorAll(".vendor-select-card");\
        vendorCards.forEach(card => {\
          card.style.transition = "all 0.3s ease";\
          card.style.borderRadius = "6px";\
          card.addEventListener("mouseenter", function() {\
            this.style.transform = "translateY(-3px)";\
            this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";\
          });\
          card.addEventListener("mouseleave", function() {\
            this.style.transform = "";\
            this.style.boxShadow = "";\
          });\
        });\
        \
        // Apply modern styling to buttons\
        const buttons = document.querySelectorAll(".btn, .btn-calculate");\
        buttons.forEach(button => {\
          button.style.transition = "all 0.3s ease";\
          button.addEventListener("mouseenter", function() {\
            this.style.transform = "translateY(-2px)";\
          });\
          button.addEventListener("mouseleave", function() {\
            this.style.transform = "";\
          });\
        });\
      });\
    </script>' "$INDEX_HTML" > "$TMP_FILE"

mv "$TMP_FILE" "$INDEX_HTML"

echo -e "${GREEN}Immediate style fixes added${NC}"

# Ensure necessary directories exist
echo -e "${YELLOW}Ensuring necessary directories exist...${NC}"

mkdir -p "$APP_DIR/css" "$APP_DIR/js/charts/apex" "$APP_DIR/js/charts/d3" "$APP_DIR/js/views" "$APP_DIR/js/components" "$APP_DIR/js/utils"

echo -e "${GREEN}Directory structure verified${NC}"

# Copy all files from repository to application
echo -e "${YELLOW}Copying files to application...${NC}"

# Copy CSS files
cp -r "$REPO_DIR/css/"* "$APP_DIR/css/"

# Copy JS files
cp -r "$REPO_DIR/js/"* "$APP_DIR/js/"

echo -e "${GREEN}Files copied successfully${NC}"

# Fix permissions
echo -e "${YELLOW}Fixing file permissions...${NC}"

find "$APP_DIR/css" "$APP_DIR/js" -type f -exec chmod 644 {} \;

echo -e "${GREEN}File permissions fixed${NC}"

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Dashboard Enhancement Update Complete!                       ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}The Portnox Total Cost Analyzer has been enhanced with:${NC}"
echo -e "  • Modern UI with responsive design"
echo -e "  • Advanced interactive charts with ApexCharts and D3"
echo -e "  • Comprehensive Executive View with strategic metrics"
echo -e "  • Detailed Security & Compliance View with framework mapping"
echo -e "  • Industry-specific analysis with threat modeling"
echo -e "  • Improved vendor comparison capabilities"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}Refresh your browser to see the changes.${NC}"

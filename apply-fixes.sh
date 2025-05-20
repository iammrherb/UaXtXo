#!/bin/bash

# ================================================================
# Portnox Total Cost Analyzer - Fix Application Script
# ================================================================
# This script applies all fixes to the application
# ================================================================

# Color definitions for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Portnox Total Cost Analyzer - Apply Fixes Script           ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}Applying all fixes to the application${NC}"
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

# Update index.html to include auto-include script
echo -e "${YELLOW}Updating index.html...${NC}"

# Create temporary file
TMP_FILE=$(mktemp)

# Add script reference before </body>
sed '/<\/body>/i \
    <!-- Auto-include fixes -->\
    <script src="js/auto-include-fixes.js"></script>' "$INDEX_HTML" > "$TMP_FILE"

mv "$TMP_FILE" "$INDEX_HTML"

echo -e "${GREEN}index.html updated successfully${NC}"

# Ensure necessary directories exist
echo -e "${YELLOW}Ensuring necessary directories exist...${NC}"

mkdir -p "$APP_DIR/css" "$APP_DIR/js/components" "$APP_DIR/js/views" "$APP_DIR/js/models"

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
chmod +x "$APP_DIR/apply-fixes.sh"

echo -e "${GREEN}File permissions fixed${NC}"

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Fix Application Complete!                                   ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}The Portnox Total Cost Analyzer has been fixed with:${NC}"
echo -e "  • Fixed layout and sidebar functionality"
echo -e "  • Security View initialization and content"
echo -e "  • Enhanced Executive View with testimonials and case studies"
echo -e "  • FTE analysis and multi-year projections"
echo -e "  • Comprehensive vendor comparison matrix"
echo -e "  • Fixed calculator error handling"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}Refresh your browser to see the changes.${NC}"

#!/bin/bash

# ================================================================
# Portnox Total Cost Analyzer - Installation Script
# ================================================================
# This script installs all the fixes to the application
# ================================================================

# Color definitions for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Portnox Total Cost Analyzer - Fix Installation Script      ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}Installing all fixes to the application${NC}"
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
BACKUP_DIR="$APP_DIR/backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp "$INDEX_HTML" "$BACKUP_DIR/index.html.backup"
echo -e "${GREEN}Created backup of index.html at: $BACKUP_DIR/index.html.backup${NC}"

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

mkdir -p "$APP_DIR/css" "$APP_DIR/js/components" "$APP_DIR/js/views"

echo -e "${GREEN}Directory structure verified${NC}"

# Copy all fix files to application
echo -e "${YELLOW}Copying fix files to application...${NC}"

# CSS fixes
cp "$REPO_DIR/css/layout-advanced-fixes.css" "$APP_DIR/css/"

# JS fixes
cp "$REPO_DIR/js/auto-include-fixes.js" "$APP_DIR/js/"
cp "$REPO_DIR/js/components/collapsible-fix.js" "$APP_DIR/js/components/"
cp "$REPO_DIR/js/components/vendor-display-fix.js" "$APP_DIR/js/components/"
cp "$REPO_DIR/js/views/views-fix.js" "$APP_DIR/js/views/"

echo -e "${GREEN}Fix files copied successfully${NC}"

# Fix permissions
echo -e "${YELLOW}Fixing file permissions...${NC}"

find "$APP_DIR/css" "$APP_DIR/js" -type f -exec chmod 644 {} \;
chmod +x "$APP_DIR/install-fixes.sh"

echo -e "${GREEN}File permissions fixed${NC}"

echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}   Fix Installation Complete!                                  ${NC}"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${YELLOW}The Portnox Total Cost Analyzer has been fixed with:${NC}"
echo -e "  • Fixed layout spacing between sidebar and main dashboard"
echo -e "  • Fixed vendor logo display"
echo -e "  • Removed unwanted tags/labels on vendor logos"
echo -e "  • Fixed collapsible sections that can't be expanded once collapsed"
echo -e "  • Enhanced Security View"
echo -e "  • Enhanced Executive View with improved comparison matrix"
echo -e "${BLUE}=================================================================${NC}"
echo -e "${GREEN}Refresh your browser to see the changes.${NC}"

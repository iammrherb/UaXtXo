#!/bin/bash
# Portnox TCO Analyzer - GitHub Pages Deployment Script
# This script helps update and deploy the Portnox TCO Analyzer to GitHub Pages

# Set text colors for better readability
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================================${NC}"
echo -e "${BLUE}     Portnox TCO Analyzer - Deployment Script           ${NC}"
echo -e "${BLUE}=========================================================${NC}"

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Verify required tools are installed
echo -e "\n${YELLOW}Checking required tools...${NC}"
TOOLS_MISSING=0

if ! command_exists git; then
  echo -e "${RED}Error: git is not installed${NC}"
  TOOLS_MISSING=1
fi

if ! command_exists node; then
  echo -e "${RED}Error: node is not installed${NC}"
  TOOLS_MISSING=1
else
  NODE_VERSION=$(node -v)
  echo -e "${GREEN}Node.js version: $NODE_VERSION${NC}"
fi

if ! command_exists npm; then
  echo -e "${RED}Error: npm is not installed${NC}"
  TOOLS_MISSING=1
else
  NPM_VERSION=$(npm -v)
  echo -e "${GREEN}npm version: $NPM_VERSION${NC}"
fi

if [ $TOOLS_MISSING -eq 1 ]; then
  echo -e "${RED}Please install the missing tools and try again.${NC}"
  exit 1
fi

# Check if we're in a git repository
if [ ! -d .git ]; then
  echo -e "${RED}Error: This does not appear to be a git repository.${NC}"
  echo -e "${YELLOW}Please run this script from the root of your Portnox TCO Analyzer project.${NC}"
  exit 1
fi

# Verify package.json exists
if [ ! -f package.json ]; then
  echo -e "${RED}Error: package.json not found.${NC}"
  echo -e "${YELLOW}Please run this script from the root of your Portnox TCO Analyzer project.${NC}"
  exit 1
fi

# Check the current branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "\n${YELLOW}Current branch: ${GREEN}$CURRENT_BRANCH${NC}"

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}You have uncommitted changes:${NC}"
  git status --short
  
  read -p "Do you want to commit these changes before deploying? (y/n): " COMMIT_CHANGES
  if [[ $COMMIT_CHANGES =~ ^[Yy]$ ]]; then
    read -p "Enter commit message: " COMMIT_MESSAGE
    git add .
    git commit -m "$COMMIT_MESSAGE"
    echo -e "${GREEN}Changes committed successfully.${NC}"
  else
    echo -e "${YELLOW}Continuing with uncommitted changes.${NC}"
  fi
fi

# Ensure homepage is set correctly in package.json
echo -e "\n${YELLOW}Checking package.json configuration...${NC}"
REPO_NAME=$(basename -s .git `git config --get remote.origin.url`)
USERNAME=$(git config --get remote.origin.url | sed -n 's/.*github.com[:/]\([^/]*\).*/\1/p')

# Extract current homepage from package.json
CURRENT_HOMEPAGE=$(grep '"homepage"' package.json | sed 's/.*"homepage": "\(.*\)",/\1/')

# The expected homepage format for GitHub Pages
EXPECTED_HOMEPAGE="https://$USERNAME.github.io/$REPO_NAME"

if [ -z "$CURRENT_HOMEPAGE" ]; then
  echo -e "${YELLOW}No homepage found in package.json. Adding it...${NC}"
  # Use sed to insert the homepage field after the name field
  sed -i.bak '/\"name\": /a\  \"homepage\": \"'"$EXPECTED_HOMEPAGE"'\",' package.json
  rm package.json.bak  # Remove backup file
  echo -e "${GREEN}Added homepage: $EXPECTED_HOMEPAGE${NC}"
elif [ "$CURRENT_HOMEPAGE" != "$EXPECTED_HOMEPAGE" ]; then
  echo -e "${YELLOW}Updating homepage in package.json...${NC}"
  echo -e "${YELLOW}From: $CURRENT_HOMEPAGE${NC}"
  echo -e "${YELLOW}To:   $EXPECTED_HOMEPAGE${NC}"
  
  # Replace the current homepage with the expected one
  sed -i.bak 's|"homepage": ".*"|"homepage": "'"$EXPECTED_HOMEPAGE"'"|' package.json
  rm package.json.bak  # Remove backup file
  
  echo -e "${GREEN}Homepage updated in package.json${NC}"
else
  echo -e "${GREEN}Homepage is correctly set to: $CURRENT_HOMEPAGE${NC}"
fi

# Ensure gh-pages is installed
echo -e "\n${YELLOW}Checking for gh-pages package...${NC}"
if ! grep -q '"gh-pages"' package.json; then
  echo -e "${YELLOW}Installing gh-pages package...${NC}"
  npm install --save-dev gh-pages
  
  # Add deploy scripts to package.json if they don't exist
  if ! grep -q '"predeploy"' package.json; then
    echo -e "${YELLOW}Adding deploy scripts to package.json...${NC}"
    # Use node to update package.json
    node -e '
    const fs = require("fs");
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts.predeploy = "npm run build";
    packageJson.scripts.deploy = "gh-pages -d build";
    fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
    '
    echo -e "${GREEN}Deploy scripts added to package.json${NC}"
  fi
else
  echo -e "${GREEN}gh-pages package is already installed.${NC}"
fi

# Verify or fix RouterConfig.tsx
echo -e "\n${YELLOW}Checking RouterConfig.tsx...${NC}"
ROUTER_CONFIG_PATH="src/utils/RouterConfig.tsx"

if [ -f "$ROUTER_CONFIG_PATH" ]; then
  # Check if RouterConfig is correctly configured for GitHub Pages
  if grep -q "isProduction" "$ROUTER_CONFIG_PATH" && grep -q "HashRouter" "$ROUTER_CONFIG_PATH"; then
    echo -e "${GREEN}RouterConfig.tsx is correctly set up for GitHub Pages.${NC}"
  else
    echo -e "${YELLOW}Updating RouterConfig.tsx for GitHub Pages compatibility...${NC}"
    cat > "$ROUTER_CONFIG_PATH" << 'EOF'
import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

interface RouterConfigProps {
    children: React.ReactNode;
}

const RouterConfig: React.FC<RouterConfigProps> = ({ children }) => {
    // Check if we're in production (GitHub Pages)
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Get the base URL from package.json's homepage field
    const homepage = process.env.PUBLIC_URL || '';
    
    // Use HashRouter in production (GitHub Pages) and BrowserRouter in development
    if (isProduction) {
        return <HashRouter>{children}</HashRouter>;
    } else {
        return <BrowserRouter basename={homepage}>{children}</BrowserRouter>;
    }
};

export default RouterConfig;
EOF
    echo -e "${GREEN}RouterConfig.tsx has been updated.${NC}"
  fi
else
  echo -e "${RED}Warning: RouterConfig.tsx not found at $ROUTER_CONFIG_PATH${NC}"
  echo -e "${YELLOW}Creating RouterConfig.tsx...${NC}"
  
  mkdir -p $(dirname "$ROUTER_CONFIG_PATH")
  cat > "$ROUTER_CONFIG_PATH" << 'EOF'
import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

interface RouterConfigProps {
    children: React.ReactNode;
}

const RouterConfig: React.FC<RouterConfigProps> = ({ children }) => {
    // Check if we're in production (GitHub Pages)
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Get the base URL from package.json's homepage field
    const homepage = process.env.PUBLIC_URL || '';
    
    // Use HashRouter in production (GitHub Pages) and BrowserRouter in development
    if (isProduction) {
        return <HashRouter>{children}</HashRouter>;
    } else {
        return <BrowserRouter basename={homepage}>{children}</BrowserRouter>;
    }
};

export default RouterConfig;
EOF
  echo -e "${GREEN}RouterConfig.tsx has been created.${NC}"
fi

# Verify dependencies in package.json
echo -e "\n${YELLOW}Checking React Router dependencies...${NC}"
if ! grep -q '"react-router-dom"' package.json; then
  echo -e "${YELLOW}Installing react-router-dom...${NC}"
  npm install --save react-router-dom
  echo -e "${GREEN}react-router-dom installed.${NC}"
else
  echo -e "${GREEN}react-router-dom is already installed.${NC}"
fi

# Check for any build issues first
echo -e "\n${YELLOW}Checking for build issues...${NC}"
npm run build --if-present

if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed. Please fix the errors before deploying.${NC}"
  exit 1
else
  echo -e "${GREEN}Build successful.${NC}"
fi

# Final deployment steps
echo -e "\n${YELLOW}Ready to deploy to GitHub Pages.${NC}"
read -p "Do you want to proceed with deployment? (y/n): " DEPLOY_CONFIRM

if [[ $DEPLOY_CONFIRM =~ ^[Yy]$ ]]; then
  echo -e "${YELLOW}Deploying to GitHub Pages...${NC}"
  
  # Deploy using gh-pages
  npm run deploy
  
  if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✨ Deployment successful! ✨${NC}"
    echo -e "${GREEN}Your Portnox TCO Analyzer is now available at:${NC}"
    echo -e "${BLUE}$EXPECTED_HOMEPAGE${NC}"
    echo -e "\n${YELLOW}Note: It may take a few minutes for the changes to propagate.${NC}"
    
    # Check GitHub Pages settings
    echo -e "\n${YELLOW}Make sure GitHub Pages is enabled:${NC}"
    echo -e "1. Go to the repository settings"
    echo -e "2. Navigate to Pages"
    echo -e "3. Ensure the source is set to 'gh-pages'"
    echo -e "4. Check that HTTPS is enforced"
  else
    echo -e "${RED}Deployment failed. See errors above.${NC}"
  fi
else
  echo -e "${YELLOW}Deployment cancelled.${NC}"
fi

# Additional tips
echo -e "\n${BLUE}=========================================================${NC}"
echo -e "${BLUE}     Portnox TCO Analyzer - Additional Tips              ${NC}"
echo -e "${BLUE}=========================================================${NC}"

echo -e "\n${YELLOW}Common Issues & Troubleshooting:${NC}"
echo -e "1. ${GREEN}Blank page after deployment:${NC}"
echo -e "   - Check browser console for errors"
echo -e "   - Verify the correct use of HashRouter in production"
echo -e "   - Ensure all paths to assets use relative paths"

echo -e "\n2. ${GREEN}Assets not loading:${NC}"
echo -e "   - Make sure all asset URLs use %PUBLIC_URL% or process.env.PUBLIC_URL"
echo -e "   - Example: <img src=\"\${process.env.PUBLIC_URL}/logo.png\" />"

echo -e "\n3. ${GREEN}API calls failing:${NC}"
echo -e "   - Use relative API paths or configure them properly for production"
echo -e "   - Consider environment-specific config files"

echo -e "\n${YELLOW}Enhancing Portnox TCO Analyzer Contents:${NC}"
echo -e "1. Incorporate more detailed vendor comparisons focusing on Portnox's competitive edge"
echo -e "2. Create comprehensive dashboard with financial impact visuals"
echo -e "3. Add executive summary reports tailored for each stakeholder group:"
echo -e "   - Executive Team: ROI, strategic advantages, competitive positioning"
echo -e "   - Finance: TCO, cost avoidance, budget considerations"
echo -e "   - Technical: Implementation timeline, resource requirements"
echo -e "   - Security: Risk reduction metrics, compliance benchmarks"

echo -e "\n${GREEN}Good luck with your Portnox TCO Analyzer!${NC}"

#!/bin/bash

# React GitHub Pages Deployment Fix Script
set -e
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

REPO_NAME="UaXtXo"
GIT_USERNAME=$(git config --get remote.origin.url | sed -n 's/.*github.com[:\/]\([^\/]*\).*/\1/p')

if [ -z "$GIT_USERNAME" ]; then
  echo -e "${YELLOW}Could not determine GitHub username. Using default value.${NC}"
  GIT_USERNAME="iamrad"
fi

CORRECT_HOMEPAGE="https://${GIT_USERNAME}.github.io/${REPO_NAME}"

echo -e "${BLUE}=== Fixing GitHub Pages Deployment Configuration ===${NC}"

# 1. Fix package.json homepage
echo -e "\n${YELLOW}Adding homepage to package.json...${NC}"
node -e "
  const fs = require('fs');
  const package = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  package.homepage = '$CORRECT_HOMEPAGE';
  fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));
"
echo -e "${GREEN}Set homepage to ${CORRECT_HOMEPAGE}${NC}"

# 2. Fix PUBLIC_URL in .env.production
echo -e "\n${YELLOW}Setting PUBLIC_URL in .env.production...${NC}"
echo "PUBLIC_URL=/${REPO_NAME}" > .env.production
echo -e "${GREEN}Set PUBLIC_URL to /${REPO_NAME}${NC}"

# 3. Clean build and redeploy
echo -e "\n${YELLOW}Cleaning up previous build...${NC}"
rm -rf build
echo -e "${GREEN}Build directory cleaned${NC}"

echo -e "\n${YELLOW}Building app for production...${NC}"
npm run build
echo -e "${GREEN}Build completed${NC}"

# 4. Deploy to GitHub Pages
echo -e "\n${YELLOW}Deploying to GitHub Pages...${NC}"
if ! npm list gh-pages | grep -q "gh-pages"; then
  echo -e "${YELLOW}Installing gh-pages package...${NC}"
  npm install --save-dev gh-pages
fi

# Create deploy script if it doesn't exist in package.json
node -e "
  const fs = require('fs');
  const package = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  if (!package.scripts || !package.scripts.deploy) {
    package.scripts = package.scripts || {};
    package.scripts.deploy = 'gh-pages -d build';
    fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));
    console.log('Added deploy script to package.json');
  }
"

# Deploy using npm script
npm run deploy

echo -e "\n${GREEN}Deployment process completed!${NC}"
echo -e "${YELLOW}Please wait a few minutes for GitHub Pages to update${NC}"
echo -e "${YELLOW}Your site should be available at: ${CORRECT_HOMEPAGE}${NC}"

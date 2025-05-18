#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}==============================================="
echo -e "Portnox TCO Analyzer GitHub Pages Deployment"
echo -e "===============================================${NC}"

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}You have uncommitted changes.${NC}"
  read -p "Do you want to commit these changes? (y/n): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter commit message: " commit_msg
    git add .
    git commit -m "$commit_msg"
    echo -e "${GREEN}Changes committed.${NC}"
  else
    echo -e "${YELLOW}Continuing without committing changes...${NC}"
  fi
fi

# Build the project
echo -e "${GREEN}Building project...${NC}"
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed.${NC}"
  exit 1
fi

# Deploy to GitHub Pages
echo -e "${GREEN}Deploying to GitHub Pages...${NC}"
npm run deploy
if [ $? -ne 0 ]; then
  echo -e "${RED}Deployment failed.${NC}"
  exit 1
fi

echo -e "${GREEN}Deployment successful!${NC}"
echo "The Portnox TCO Analyzer is now live at:"
node -e "const pkg = require('./package.json'); console.log(pkg.homepage);"

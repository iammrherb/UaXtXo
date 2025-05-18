#!/bin/bash
# deploy.sh - Script for deploying Portnox TCO Analyzer to GitHub Pages

# Color definitions
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}Portnox TCO Analyzer - Deployment Script${NC}"
echo -e "${BLUE}============================================${NC}"

# Install dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
npm install

# Run tests
echo -e "${GREEN}Running tests...${NC}"
npm test -- --watchAll=false --passWithNoTests

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Warning: Tests failed. Do you want to continue with deployment? (y/n)${NC}"
    read -r continue_deploy
    if [ "$continue_deploy" != "y" ]; then
        echo -e "${RED}Deployment cancelled.${NC}"
        exit 1
    fi
fi

# Build the app
echo -e "${GREEN}Building application...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed. Please fix the errors and try again.${NC}"
    exit 1
fi

# Install gh-pages if not already installed
if ! npm list -g gh-pages > /dev/null 2>&1; then
    echo -e "${GREEN}Installing gh-pages package...${NC}"
    npm install --save-dev gh-pages
fi

# Deploy to GitHub Pages
echo -e "${GREEN}Deploying to GitHub Pages...${NC}"
npm run deploy

if [ $? -ne 0 ]; then
    echo -e "${RED}Deployment failed.${NC}"
    exit 1
fi

echo -e "${GREEN}Deployment successful!${NC}"
echo -e "${YELLOW}The app will be available at: https://iammrherb.github.io/UaXtXo/${NC}"
echo -e "${YELLOW}Note: It may take a few minutes for the changes to propagate.${NC}"

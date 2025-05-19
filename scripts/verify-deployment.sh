#!/bin/bash
# verify-deployment.sh - Script to verify the Portnox TCO Analyzer deployment

# Color definitions
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}Portnox TCO Analyzer - Deployment Verification${NC}"
echo -e "${BLUE}============================================${NC}"

# URL to check
DEPLOY_URL="https://iammrherb.github.io/UaXtXo/"

# Check if curl is installed
if ! command -v curl &> /dev/null; then
    echo -e "${RED}Error: curl is not installed. Please install curl and try again.${NC}"
    exit 1
fi

# Check if the deployment is accessible
echo -e "${GREEN}Checking if the deployment is accessible...${NC}"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOY_URL")

if [ "$RESPONSE" = "200" ]; then
    echo -e "${GREEN}Success! The deployment is accessible.${NC}"
else
    echo -e "${RED}Error: The deployment is not accessible. HTTP response code: $RESPONSE${NC}"
    echo -e "${YELLOW}Possible reasons:${NC}"
    echo -e "  - The deployment is still in progress"
    echo -e "  - There was an error during the deployment"
    echo -e "  - The URL is incorrect"
    echo -e "  - GitHub Pages is not enabled for this repository"
    exit 1
fi

# Check for critical resources
echo -e "${GREEN}Checking for critical resources...${NC}"

# Get the main HTML content
HTML=$(curl -s "$DEPLOY_URL")

# Check for JavaScript bundle
if [[ $HTML == *".js"* ]]; then
    echo -e "${GREEN}JavaScript bundle found.${NC}"
else
    echo -e "${RED}Error: JavaScript bundle not found.${NC}"
    exit 1
fi

# Check for CSS bundle
if [[ $HTML == *".css"* ]]; then
    echo -e "${GREEN}CSS bundle found.${NC}"
else
    echo -e "${RED}Error: CSS bundle not found.${NC}"
    exit 1
fi

echo -e "${GREEN}All checks passed. The deployment appears to be working correctly.${NC}"
echo -e "${BLUE}============================================${NC}"
echo -e "${GREEN}Deployment URL: $DEPLOY_URL${NC}"
echo -e "${BLUE}============================================${NC}"

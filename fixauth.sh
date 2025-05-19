#!/bin/bash

# Deployment script with special handling for fine-grained tokens
# Fixed for the specific URL errors

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}Portnox TCO Analyzer - Token-Fixed Deployment Script${NC}"
echo -e "${BLUE}======================================================${NC}"

# Function to set up GitHub authentication with Fine-Grained Token
setup_github_auth() {
  echo -e "${BLUE}\nSetting up GitHub Authentication with Fine-Grained Token${NC}"
  
  # First, we'll reset any problematic repository URLs
  echo -e "${YELLOW}Checking and fixing repository URL...${NC}"
  
  # Get the current remote URL
  CURRENT_URL=$(git config --get remote.origin.url)
  echo -e "Current URL: ${CURRENT_URL}"
  
  # Reset to the base URL without any tokens
  git remote set-url origin "https://github.com/iammrherb/UaXtXo.git"
  echo -e "${GREEN}Repository URL reset to base URL.${NC}"
  
  # Now set up the new token
  echo -e "\n${YELLOW}Enter your NEW GitHub Fine-Grained Token:${NC}"
  read -p "Token: " TOKEN
  
  if [ -z "$TOKEN" ]; then
    echo -e "${RED}No token provided. Deployment will fail without authentication.${NC}"
    return 1
  fi
  
  # Export the token to environment variables
  export GITHUB_TOKEN="$TOKEN"
  
  # Update .env file with the token
  echo "GITHUB_TOKEN=$TOKEN" > .env
  echo "SKIP_PREFLIGHT_CHECK=true" >> .env
  echo "NODE_OPTIONS=--openssl-legacy-provider" >> .env
  echo -e "${GREEN}Token saved to .env file.${NC}"
  
  # Ensure .env is in .gitignore
  if [ -f .gitignore ]; then
    if ! grep -q "^\.env$" .gitignore; then
      echo ".env" >> .gitignore
      echo -e "${GREEN}Added .env to .gitignore.${NC}"
    fi
  else
    echo ".env" > .gitignore
    echo -e "${GREEN}Created .gitignore with .env entry.${NC}"
  fi
  
  # Configure git to use the token directly in the URL
  # The correct format for fine-grained tokens
  git remote set-url origin "https://$TOKEN@github.com/iammrherb/UaXtXo.git"
  
  # Verify the URL update was successful
  NEW_URL=$(git config --get remote.origin.url | sed 's/\/\/[^@]*@/\/\/****@/')
  echo -e "New URL (token hidden): ${NEW_URL}"
  
  echo -e "${GREEN}GitHub authentication set up successfully!${NC}"
  return 0
}

# Function to build the app
build_app() {
  echo -e "${YELLOW}Building the React app...${NC}"
  # Use environment variables to skip preflight check
  SKIP_PREFLIGHT_CHECK=true NODE_OPTIONS=--openssl-legacy-provider CI=false npm run build
  
  if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed.${NC}"
    return 1
  fi
  
  echo -e "${GREEN}Build completed successfully!${NC}"
  return 0
}

# Function to deploy to gh-pages branch
deploy_gh_pages() {
  echo -e "${YELLOW}Deploying to gh-pages branch...${NC}"
  
  # Save current branch
  CURRENT_BRANCH=$(git branch --show-current)
  
  # Stash any uncommitted changes
  git stash
  
  # Check if gh-pages branch exists
  if git show-ref --verify --quiet refs/heads/gh-pages; then
    git checkout gh-pages
  else
    git checkout -b gh-pages
  fi
  
  # Clean out existing files (except .git)
  find . -maxdepth 1 -not -path "./.git" -not -path "." -exec rm -rf {} \;
  
  # Copy build files
  cp -r build/* .
  
  # Create a .nojekyll file to bypass Jekyll processing
  touch .nojekyll
  
  # Add and commit changes
  git add .
  git commit -m "Update Portnox TCO Analyzer with enhanced charts and UI"
  
  # Push changes
  echo -e "${YELLOW}Pushing to gh-pages branch...${NC}"
  if ! git push origin gh-pages; then
    echo -e "${RED}Push to gh-pages failed. Trying with force...${NC}"
    git push -f origin gh-pages
    
    if [ $? -ne 0 ]; then
      echo -e "${RED}Failed to push to gh-pages branch, even with force.${NC}"
      git checkout $CURRENT_BRANCH
      git stash pop
      return 1
    fi
  fi
  
  echo -e "${GREEN}Successfully deployed to gh-pages branch!${NC}"
  
  # Return to original branch
  git checkout $CURRENT_BRANCH
  git stash pop
  
  return 0
}

# Function to push changes to main-react branch
push_main_branch() {
  echo -e "${YELLOW}Pushing changes to main-react branch...${NC}"
  
  # Ensure we're on main-react branch
  CURRENT_BRANCH=$(git branch --show-current)
  if [ "$CURRENT_BRANCH" != "main-react" ]; then
    git checkout main-react
  fi
  
  # Commit any changes
  git add .
  
  if git diff --cached --quiet; then
    echo -e "${YELLOW}No changes to commit.${NC}"
  else
    git commit -m "Update Portnox TCO Analyzer with enhanced charts and UI"
    
    # Push changes
    if ! git push origin main-react; then
      echo -e "${RED}Push to main-react failed. Trying with force...${NC}"
      git push -f origin main-react
      
      if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to push to main-react branch, even with force.${NC}"
        return 1
      fi
    fi
  fi
  
  echo -e "${GREEN}Successfully pushed to main-react branch!${NC}"
  return 0
}

# Function to test authentication
test_auth() {
  echo -e "${YELLOW}Testing authentication...${NC}"
  
  # Attempt to list remote branches
  if git ls-remote --heads origin > /dev/null; then
    echo -e "${GREEN}Authentication successful!${NC}"
    return 0
  else
    echo -e "${RED}Authentication failed. Please check your token.${NC}"
    return 1
  fi
}

# Main execution function
main() {
  # 1. Set up authentication with your new token
  setup_github_auth
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to set up GitHub authentication.${NC}"
    exit 1
  fi
  
  # 2. Test authentication before proceeding
  test_auth
  if [ $? -ne 0 ]; then
    echo -e "${RED}Authentication test failed. Please check your token and try again.${NC}"
    exit 1
  fi
  
  # 3. Build the app
  build_app
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to build the app.${NC}"
    exit 1
  fi
  
  # 4. Push changes to main-react branch
  push_main_branch
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to push to main-react branch.${NC}"
    exit 1
  fi
  
  # 5. Deploy to gh-pages branch
  deploy_gh_pages
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to deploy to gh-pages branch.${NC}"
    exit 1
  fi
  
  echo -e "${GREEN}\nDeployment completed successfully!${NC}"
  echo -e "${BLUE}====================================================${NC}"
  echo -e "${BLUE}Your application is now deployed to:${NC}"
  echo -e "${GREEN}https://iammrherb.github.io/UaXtXo/${NC}"
  echo -e "${BLUE}====================================================${NC}"
}

# Execute the main function
main

#!/bin/bash

# GitHub Push Protection Resolution Script
# This script specifically addresses the token security issue

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}GitHub Token Security Fix & Deployment Script${NC}"
echo -e "${BLUE}======================================================${NC}"

# Function to set up GitHub authentication without committing token
setup_secure_auth() {
  echo -e "${BLUE}\nSetting up secure GitHub authentication${NC}"
  
  # Reset repository URL to base URL
  git remote set-url origin "https://github.com/iammrherb/UaXtXo.git"
  echo -e "${GREEN}Repository URL reset to base URL.${NC}"
  
  # Get token for this session only
  echo -e "\n${YELLOW}Enter your GitHub Token:${NC}"
  echo -e "${RED}IMPORTANT: This token will only be used temporarily and will NOT be committed to the repo.${NC}"
  read -p "Token: " TOKEN
  
  if [ -z "$TOKEN" ]; then
    echo -e "${RED}No token provided. Deployment will fail without authentication.${NC}"
    return 1
  fi
  
  # Export token to environment variable only
  export GITHUB_TOKEN="$TOKEN"
  
  # Create a temp .env file for the build process, but ensure it's not committed
  echo "SKIP_PREFLIGHT_CHECK=true" > .env
  echo "NODE_OPTIONS=--openssl-legacy-provider" >> .env
  
  # Add .env to .gitignore if not already there
  if [ -f .gitignore ]; then
    if ! grep -q "^\.env$" .gitignore; then
      echo ".env" >> .gitignore
      echo -e "${GREEN}Added .env to .gitignore.${NC}"
    fi
  else
    echo ".env" > .gitignore
    echo -e "${GREEN}Created .gitignore with .env entry.${NC}"
  fi
  
  # Make sure .gitignore change is committed before anything else
  git add .gitignore
  git commit -m "Add .env to gitignore for security"
  
  # Configure git to use the token directly in URL for commands
  git remote set-url origin "https://$TOKEN@github.com/iammrherb/UaXtXo.git"
  
  echo -e "${GREEN}Secure authentication setup complete.${NC}"
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

# Function to safely push changes without committing token
safe_push_changes() {
  echo -e "${YELLOW}Preparing to push changes...${NC}"
  
  # Ensure .env is not being tracked
  git rm --cached .env 2>/dev/null || true
  
  # Make sure .env is definitely in .gitignore
  if ! grep -q "^\.env$" .gitignore; then
    echo ".env" >> .gitignore
    git add .gitignore
    git commit -m "Ensure .env is ignored"
  fi
  
  # Commit other changes without the token
  echo -e "${YELLOW}Committing other changes...${NC}"
  
  # Check if there are changes to commit
  if git status --porcelain | grep -v "^\?" | grep -v ".env"; then
    git add -A -- ':!.env'
    git commit -m "Update Portnox TCO Analyzer with enhanced charts and UI"
  else
    echo -e "${YELLOW}No changes to commit.${NC}"
  fi
  
  # Push to main-react branch
  echo -e "${YELLOW}Pushing to main-react branch...${NC}"
  git push origin main-react
  
  if [ $? -ne 0 ]; then
    echo -e "${RED}Push failed. Please visit:${NC}"
    echo -e "${YELLOW}https://github.com/iammrherb/UaXtXo/security/secret-scanning${NC}"
    echo -e "${RED}to unblock the secret or fix the issue manually.${NC}"
    return 1
  fi
  
  echo -e "${GREEN}Successfully pushed to main-react branch!${NC}"
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
  git push origin gh-pages
  
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to push to gh-pages branch.${NC}"
    git checkout $CURRENT_BRANCH
    git stash pop
    return 1
  fi
  
  echo -e "${GREEN}Successfully deployed to gh-pages branch!${NC}"
  
  # Return to original branch
  git checkout $CURRENT_BRANCH
  git stash pop
  
  return 0
}

# Function to fix any tokens that might have been committed
fix_committed_tokens() {
  echo -e "${YELLOW}Checking for committed tokens...${NC}"
  
  # Check for .env file in git history
  if git ls-files | grep -q "\.env$"; then
    echo -e "${RED}WARNING: .env file is tracked in git history.${NC}"
    echo -e "${YELLOW}Removing .env from git tracking...${NC}"
    
    # Remove .env from git tracking but keep the file
    git rm --cached .env
    
    # Commit this change
    git commit -m "Remove .env file from git tracking"
    
    echo -e "${GREEN}Removed .env from git tracking.${NC}"
    echo -e "${YELLOW}You should now unblock the token:${NC}"
    echo -e "${BLUE}https://github.com/iammrherb/UaXtXo/security/secret-scanning${NC}"
    
    echo -e "${RED}IMPORTANT: Consider this token compromised and rotate it soon.${NC}"
  else
    echo -e "${GREEN}No .env file found in git tracking.${NC}"
  fi
  
  return 0
}

# Function to cleanup after deployment
cleanup() {
  echo -e "${YELLOW}Cleaning up...${NC}"
  
  # Remove GitHub token from URL to prevent accidental disclosure
  git remote set-url origin "https://github.com/iammrherb/UaXtXo.git"
  
  echo -e "${GREEN}Cleanup complete.${NC}"
  return 0
}

# Main execution function
main() {
  # First fix any committed tokens
  fix_committed_tokens
  
  # Set up secure authentication
  setup_secure_auth
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to set up secure authentication.${NC}"
    exit 1
  fi
  
  # Build the app
  build_app
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to build the app.${NC}"
    cleanup
    exit 1
  fi
  
  # Safely push changes
  safe_push_changes
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to push changes safely.${NC}"
    cleanup
    exit 1
  fi
  
  # Deploy to gh-pages
  deploy_gh_pages
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to deploy to gh-pages.${NC}"
    cleanup
    exit 1
  fi
  
  # Clean up
  cleanup
  
  echo -e "${GREEN}\nDeployment completed successfully!${NC}"
  echo -e "${BLUE}====================================================${NC}"
  echo -e "${BLUE}Your application is now deployed to:${NC}"
  echo -e "${GREEN}https://iammrherb.github.io/UaXtXo/${NC}"
  echo -e "${BLUE}====================================================${NC}"
  
  echo -e "${YELLOW}SECURITY NOTE:${NC}"
  echo -e "Always rotate tokens that may have been exposed in git history."
  echo -e "Check GitHub's secret scanning alerts for any issues."
}

# Execute the main function
main

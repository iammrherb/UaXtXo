#!/bin/bash

# Comprehensive fix and deployment script for Portnox TCO Analyzer
# Addresses specific errors from the error log

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}Portnox TCO Analyzer - Deployment & Fixes Script${NC}"
echo -e "${BLUE}======================================================${NC}"

# Fix 1: Fix the VendorRadarChart import using a more portable approach
echo -e "${YELLOW}Fixing missing VendorRadarChart import...${NC}"
# Check if the import already exists
if ! grep -q "import VendorRadarChart" src/components/views/Dashboard.tsx; then
  # Create a temporary file with the import added
  awk '
  /^import React/ { 
    print $0
    print "import VendorRadarChart from \"../charts/VendorRadarChart\";"
    next
  }
  { print }
  ' src/components/views/Dashboard.tsx > temp_dashboard.tsx
  
  # Replace the original file
  mv temp_dashboard.tsx src/components/views/Dashboard.tsx
  
  echo -e "${GREEN}VendorRadarChart import added successfully.${NC}"
else
  echo -e "${GREEN}VendorRadarChart import already exists.${NC}"
fi

# Fix 2: Set up required env files to bypass preflight check
echo -e "${YELLOW}Setting up environment configuration...${NC}"

# Create .env file with SKIP_PREFLIGHT_CHECK to bypass babel-jest issues
cat > .env << 'EOF'
SKIP_PREFLIGHT_CHECK=true
NODE_OPTIONS=--openssl-legacy-provider
EOF

# Create .npmrc for legacy peer deps
cat > .npmrc << 'EOF'
legacy-peer-deps=true
EOF

echo -e "${GREEN}Environment configuration files created.${NC}"

# Function to set up GitHub authentication with Personal Access Token
setup_github_auth() {
  echo -e "${BLUE}\nSetting up GitHub Authentication${NC}"
  echo -e "${YELLOW}Note: This script uses ONLY Personal Access Token authentication${NC}"
  
  # Check if token is already set in .env file
  if [ -f .env ] && grep -q "GITHUB_TOKEN" .env; then
    echo -e "${GREEN}GITHUB_TOKEN found in .env file.${NC}"
    USE_EXISTING="n"
    read -p "Do you want to use the existing token? (y/n): " USE_EXISTING
    
    if [[ "$USE_EXISTING" == "y" || "$USE_EXISTING" == "Y" ]]; then
      GITHUB_TOKEN=$(grep "GITHUB_TOKEN" .env | cut -d '=' -f2)
      export GITHUB_TOKEN
      return 0
    fi
  fi
  
  # Token not set or user wants to change it
  echo -e "\n${YELLOW}You need to create a Personal Access Token:${NC}"
  echo "1. Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token"
  echo "2. Select the 'repo' scope (you need full repo access)"
  echo "3. Generate and copy the token"
  echo ""
  
  read -p "Enter your GitHub Personal Access Token: " TOKEN
  if [ -z "$TOKEN" ]; then
    echo -e "${RED}No token provided. Deployment will fail without proper authentication.${NC}"
    return 1
  fi
  
  # Export token to environment
  export GITHUB_TOKEN="$TOKEN"
  
  # Update .env file with the token
  if grep -q "GITHUB_TOKEN" .env; then
    # Replace existing token
    sed -i.bak "s/GITHUB_TOKEN=.*/GITHUB_TOKEN=$TOKEN/" .env
    rm -f .env.bak
  else
    # Add new token
    echo "GITHUB_TOKEN=$TOKEN" >> .env
  fi
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
  
  # Configure git credentials helper
  echo -e "${YELLOW}Configuring git credentials...${NC}"
  git config credential.helper store
  
  # Set up the remote URL with the token
  REPO_URL=$(git config --get remote.origin.url)
  if [[ $REPO_URL == https://* ]]; then
    # For HTTPS URLs
    # Extract the repository path (after github.com/)
    REPO_PATH=$(echo $REPO_URL | sed 's#https://github.com/##')
    # Update the URL with the token
    NEW_URL="https://$TOKEN@github.com/$REPO_PATH"
    git remote set-url origin "$NEW_URL"
  else
    # For other URL formats, convert to HTTPS with token
    # Get username/repo part
    REPO_PART=$(echo $REPO_URL | sed -E 's#.+[:/]([^/]+/[^/]+)(\.git)?$#\1#')
    # Create new URL
    NEW_URL="https://$TOKEN@github.com/$REPO_PART.git"
    git remote set-url origin "$NEW_URL"
  fi
  
  echo -e "${GREEN}GitHub authentication set up successfully!${NC}"
  return 0
}

# Function to clean up build artifacts
clean_build() {
  echo -e "${YELLOW}Cleaning up build artifacts...${NC}"
  
  # Remove node_modules and package-lock.json to resolve dependency conflicts
  rm -rf node_modules package-lock.json
  
  echo -e "${GREEN}Build artifacts cleaned up.${NC}"
  return 0
}

# Function to install dependencies safely
install_dependencies() {
  echo -e "${YELLOW}Installing dependencies with --legacy-peer-deps flag...${NC}"
  npm install --legacy-peer-deps
  
  if [ $? -ne 0 ]; then
    echo -e "${RED}Dependency installation failed. Trying with --force...${NC}"
    npm install --legacy-peer-deps --force
    
    if [ $? -ne 0 ]; then
      echo -e "${RED}Failed to install dependencies even with --force flag.${NC}"
      return 1
    fi
  fi
  
  echo -e "${GREEN}Dependencies installed successfully!${NC}"
  return 0
}

# Function to build the app
build_app() {
  echo -e "${YELLOW}Building the React app...${NC}"
  # Use environment variables to skip preflight check
  SKIP_PREFLIGHT_CHECK=true NODE_OPTIONS=--openssl-legacy-provider npm run build
  
  if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed. Trying alternative approach...${NC}"
    
    # Create a new local .env file in case it wasn't loaded
    echo "SKIP_PREFLIGHT_CHECK=true" > .env.local
    echo "NODE_OPTIONS=--openssl-legacy-provider" >> .env.local
    
    # Try building with explicit environment variables
    SKIP_PREFLIGHT_CHECK=true NODE_OPTIONS=--openssl-legacy-provider npm run build
    
    if [ $? -ne 0 ]; then
      echo -e "${RED}Build failed again. Last attempt with CI=false...${NC}"
      CI=false SKIP_PREFLIGHT_CHECK=true NODE_OPTIONS=--openssl-legacy-provider npm run build
      
      if [ $? -ne 0 ]; then
        echo -e "${RED}Build failed after multiple attempts.${NC}"
        return 1
      fi
    fi
  fi
  
  echo -e "${GREEN}Build completed successfully!${NC}"
  return 0
}

# Function to deploy to gh-pages branch
deploy_gh_pages() {
  echo -e "${YELLOW}Deploying to gh-pages branch...${NC}"
  
  # Save current branch to return to it later
  CURRENT_BRANCH=$(git branch --show-current)
  
  # Stash any changes
  git stash save "Pre-deployment stash"
  
  # Check if gh-pages branch exists
  if git show-ref --verify --quiet refs/heads/gh-pages; then
    git checkout gh-pages
  else
    git checkout -b gh-pages
  fi
  
  # Clean up existing files but preserve .git directory
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
  git push -u origin gh-pages
  
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to push to gh-pages branch. Check authentication.${NC}"
    git checkout $CURRENT_BRANCH
    git stash pop
    return 1
  fi
  
  # Return to original branch
  git checkout $CURRENT_BRANCH
  
  # Apply stashed changes if any
  if git stash list | grep -q "Pre-deployment stash"; then
    git stash pop
  fi
  
  echo -e "${GREEN}Successfully deployed to gh-pages branch!${NC}"
  return 0
}

# Function to push changes to main-react branch
push_main_branch() {
  echo -e "${YELLOW}Pushing changes to main-react branch...${NC}"
  
  # Ensure we're on the main-react branch
  CURRENT_BRANCH=$(git branch --show-current)
  if [ "$CURRENT_BRANCH" != "main-react" ]; then
    git checkout main-react
  fi
  
  # Add all changes
  git add .
  
  # Check if there are any changes to commit
  if git diff --cached --quiet; then
    echo -e "${YELLOW}No changes to commit on main-react branch.${NC}"
  else
    git commit -m "Update Portnox TCO Analyzer with enhanced charts and UI components"
    
    # Push changes
    git push origin main-react
    
    if [ $? -ne 0 ]; then
      echo -e "${RED}Failed to push to main-react branch. Check authentication.${NC}"
      return 1
    fi
    
    echo -e "${GREEN}Successfully pushed to main-react branch!${NC}"
  fi
  
  return 0
}

# Main execution flow
main() {
  # 1. Set up authentication
  setup_github_auth
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to set up GitHub authentication.${NC}"
    exit 1
  fi
  
  # 2. Clean build artifacts
  clean_build
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to clean build artifacts.${NC}"
    exit 1
  fi
  
  # 3. Install dependencies
  install_dependencies
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install dependencies.${NC}"
    exit 1
  fi
  
  # 4. Build the app
  build_app
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to build the app.${NC}"
    exit 1
  fi
  
  # 5. Push changes to main-react branch
  push_main_branch
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to push to main-react branch.${NC}"
    exit 1
  fi
  
  # 6. Deploy to gh-pages branch
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

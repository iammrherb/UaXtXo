#!/bin/bash
# =============================================================================
# React GitHub Pages Maintenance Toolkit
# =============================================================================
# A toolkit for React applications deployed to GitHub Pages
# With fixed authentication handling
# =============================================================================

set -e
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration - EDIT THESE VALUES
GITHUB_USERNAME="iammrherb"
REPO_NAME="UaXtXo"
SOURCE_BRANCH="main-react"
DEPLOYMENT_BRANCH="gh-pages"

# Print header
print_header() {
  echo -e "${BLUE}==============================================${NC}"
  echo -e "${BLUE}   React GitHub Pages Deployment Toolkit     ${NC}"
  echo -e "${BLUE}==============================================${NC}"
  echo ""
}

# Print section header
print_section() {
  echo -e "\n${YELLOW}>>> $1${NC}"
}

# Set up GitHub token authentication - THE FIXED VERSION
setup_github_auth() {
  print_section "Setting up GitHub authentication"
  
  # Check if we have a token in .env.github
  if [ -f ".env.github" ]; then
    source .env.github
  fi
  
  # If no token or forced refresh, prompt for token
  if [ -z "$GITHUB_TOKEN" ] || [ "$1" == "refresh" ]; then
    echo -e "${YELLOW}Enter your GitHub token:${NC}"
    read -s GITHUB_TOKEN
    echo ""
    
    if [ -z "$GITHUB_TOKEN" ]; then
      echo -e "${RED}No token provided. Cannot continue.${NC}"
      exit 1
    fi
    
    # Save token to .env.github
    echo "GITHUB_TOKEN=$GITHUB_TOKEN" > .env.github
    echo "GITHUB_USERNAME=$GITHUB_USERNAME" >> .env.github
    
    # Make sure .env.github is in .gitignore
    if ! grep -q ".env.github" .gitignore 2>/dev/null; then
      echo ".env.github" >> .gitignore
    fi
  fi
  
  # Configure git with token - THIS IS THE KEY FIX
  REPO_URL="https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
  git remote set-url origin "$REPO_URL"
  
  # Test connection
  echo -e "Testing GitHub connection..."
  if git ls-remote origin HEAD > /dev/null 2>&1; then
    echo -e "${GREEN}GitHub authentication successful!${NC}"
    return 0
  else
    echo -e "${RED}GitHub authentication failed. Please check your token.${NC}"
    # Ask to try again
    read -p "Would you like to enter a new token? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      setup_github_auth "refresh"
    else
      return 1
    fi
  fi
}

# Setup project
setup_project() {
  print_header
  print_section "Setting up project for GitHub Pages"
  
  # Set up GitHub authentication
  setup_github_auth || exit 1
  
  # Update package.json with correct homepage
  echo -e "Setting correct homepage in package.json..."
  HOMEPAGE_URL="https://${GITHUB_USERNAME}.github.io/${REPO_NAME}"
  node -e "
    const fs = require('fs');
    const package = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    package.homepage = '${HOMEPAGE_URL}';
    if (!package.scripts) package.scripts = {};
    if (!package.scripts.predeploy) package.scripts.predeploy = 'npm run build';
    if (!package.scripts.deploy) package.scripts.deploy = 'gh-pages -d build';
    fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));
  "
  echo -e "${GREEN}Updated package.json${NC}"
  
  # Set correct PUBLIC_URL in environment files
  echo -e "Setting environment variables..."
  echo "PUBLIC_URL=/${REPO_NAME}" > .env.production
  echo -e "${GREEN}Updated .env.production${NC}"
  
  # Install gh-pages if needed
  if ! npm list gh-pages --depth=0 2>/dev/null | grep -q "gh-pages"; then
    echo -e "Installing gh-pages package..."
    npm install --save-dev gh-pages
    echo -e "${GREEN}Installed gh-pages package${NC}"
  else
    echo -e "${GREEN}gh-pages package already installed${NC}"
  fi
  
  # Ensure .nojekyll exists
  touch .nojekyll
  
  # Create or switch to source branch
  echo -e "Setting up source branch: ${SOURCE_BRANCH}..."
  if git show-ref --verify --quiet refs/heads/$SOURCE_BRANCH; then
    git checkout $SOURCE_BRANCH
  else
    git checkout -b $SOURCE_BRANCH
    git push -u origin $SOURCE_BRANCH
  fi
  
  echo -e "\n${GREEN}Setup complete!${NC}"
  echo -e "Your project is now configured for GitHub Pages deployment."
  echo -e "Source code branch: ${YELLOW}${SOURCE_BRANCH}${NC}"
  echo -e "Deployment branch: ${YELLOW}${DEPLOYMENT_BRANCH}${NC}"
  echo -e "Deployment URL: ${YELLOW}${HOMEPAGE_URL}${NC}"
}

# Deploy to GitHub Pages
deploy_project() {
  print_header
  print_section "Deploying to GitHub Pages"
  
  # Set up GitHub authentication
  setup_github_auth || exit 1
  
  # Make sure we're on the source branch
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  if [ "$CURRENT_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo -e "${YELLOW}Switching to source branch ${SOURCE_BRANCH}...${NC}"
    git checkout $SOURCE_BRANCH
  fi
  
  # Pull latest changes
  echo -e "Pulling latest changes from remote..."
  git pull origin $SOURCE_BRANCH || true
  
  # Commit any uncommitted changes
  if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}Uncommitted changes detected. Creating a commit...${NC}"
    git add .
    git commit -m "Auto changes before deployment $(date +%Y-%m-%d_%H-%M-%S)"
    git push origin $SOURCE_BRANCH
    echo -e "${GREEN}Changes committed and pushed${NC}"
  else
    echo -e "${GREEN}No uncommitted changes${NC}"
  fi
  
  # Build the app
  echo -e "Building the app..."
  npm run build
  echo -e "${GREEN}Build completed${NC}"
  
  # Ensure .nojekyll in build directory
  touch build/.nojekyll
  
  # Deploy to GitHub Pages - THE FIXED VERSION
  echo -e "Deploying to GitHub Pages..."
  REPO_URL="https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
  
  # Use the explicit repo URL with the token
  GITHUB_TOKEN=$(grep GITHUB_TOKEN .env.github | cut -d= -f2)
  npx gh-pages -d build -r "https://iammrherb:${GITHUB_TOKEN}@github.com/iammrherb/UaXtXo.git" -r "$REPO_URL" -m "Deployment $(date +%Y-%m-%d_%H-%M-%S)"
  
  echo -e "\n${GREEN}Deployment complete!${NC}"
  echo -e "Your site should be available at: ${YELLOW}https://${GITHUB_USERNAME}.github.io/${REPO_NAME}${NC}"
  echo -e "Note: It may take a few minutes for GitHub Pages to update."
}

# Commit to multiple branches
commit_to_branches() {
  print_header
  print_section "Committing to multiple branches"
  
  # Set up GitHub authentication
  setup_github_auth || exit 1
  
  # Save current branch
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  
  # Handle source branch
  echo -e "\n${YELLOW}Handling source branch: $SOURCE_BRANCH${NC}"
  git checkout $SOURCE_BRANCH
  
  # Check for changes
  if [[ -z $(git status -s) ]]; then
    echo -e "${YELLOW}No changes to commit in $SOURCE_BRANCH.${NC}"
  else
    # Commit changes
    echo -e "${YELLOW}Changes detected in $SOURCE_BRANCH:${NC}"
    git status -s
    
    read -p "Commit message: " commit_message
    if [ -z "$commit_message" ]; then
      commit_message="Update $(date +%Y-%m-%d_%H-%M-%S)"
    fi
    
    git add .
    git commit -m "$commit_message"
    
    # Push changes
    echo -e "${YELLOW}Pushing changes to $SOURCE_BRANCH...${NC}"
    git push origin $SOURCE_BRANCH
    echo -e "${GREEN}Changes pushed to $SOURCE_BRANCH${NC}"
  fi
  
  # Ask about deployment branch
  read -p "Also update deployment branch ($DEPLOYMENT_BRANCH)? (y/n) " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "\n${YELLOW}Building and updating deployment branch...${NC}"
    
    # Build the app
    npm run build
    touch build/.nojekyll
    
    # Deploy to GitHub Pages - USE EXPLICIT REPO URL
    REPO_URL="https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
    GITHUB_TOKEN=$(grep GITHUB_TOKEN .env.github | cut -d= -f2)
  npx gh-pages -d build -r "https://iammrherb:${GITHUB_TOKEN}@github.com/iammrherb/UaXtXo.git" -r "$REPO_URL" -m "$commit_message"
    
    echo -e "${GREEN}Changes pushed to $DEPLOYMENT_BRANCH${NC}"
  fi
  
  # Return to original branch
  git checkout $CURRENT_BRANCH
  
  echo -e "\n${GREEN}Multi-branch commit process complete!${NC}"
}

# Show help menu
show_help() {
  print_header
  echo -e "Usage: $0 [command]"
  echo ""
  echo -e "Commands:"
  echo -e "  ${BLUE}setup${NC}     - Set up project for GitHub Pages"
  echo -e "  ${BLUE}deploy${NC}    - Build and deploy to GitHub Pages"
  echo -e "  ${BLUE}commit${NC}    - Commit to both source and deployment branches"
  echo -e "  ${BLUE}auth${NC}      - Configure GitHub authentication"
  echo -e "  ${BLUE}help${NC}      - Show this help message"
  echo ""
  echo -e "Examples:"
  echo -e "  $0 setup      # Set up project for GitHub Pages"
  echo -e "  $0 deploy     # Build and deploy to GitHub Pages"
  echo -e "  $0 commit     # Commit to both branches"
  echo ""
}

# Main function
main() {
  case "$1" in
    setup)
      setup_project
      ;;
    deploy)
      deploy_project
      ;;
    commit)
      commit_to_branches
      ;;
    auth)
      setup_github_auth
      ;;
    help|--help|-h)
      show_help
      ;;
    *)
      show_help
      ;;
  esac
}

# Execute main with all arguments
main "$@"

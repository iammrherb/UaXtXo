#!/bin/bash
# =============================================================================
# GitHub Pages Deployment Script for React
# =============================================================================
# Simple script for managing React GitHub Pages deployments
# with separate commands for source and deployment branches
# =============================================================================

set -e # Exit on error

# Colors for output
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration - Edit these values
USERNAME="iammrherb"
REPO_NAME="UaXtXo"
SOURCE_BRANCH="main-react"
DEPLOYMENT_BRANCH="gh-pages"

# Print header
print_header() {
  echo -e "${BLUE}===============================================${NC}"
  echo -e "${BLUE}   GitHub Pages Deployment for React Apps     ${NC}"
  echo -e "${BLUE}===============================================${NC}"
  echo ""
}

# Print section header
print_section() {
  echo -e "\n${YELLOW}>>> $1${NC}"
}

# Setup GitHub authentication
setup_auth() {
  print_section "Setting up GitHub authentication"
  
  # Check for existing token
  if [ -f ".env.github" ]; then
    source .env.github
    if [ ! -z "$GITHUB_TOKEN" ]; then
      echo -e "Found existing token in .env.github"
      TOKEN="$GITHUB_TOKEN"
    fi
  fi
  
  # If no token found or 'refresh' parameter is passed
  if [ -z "$TOKEN" ] || [ "$1" == "refresh" ]; then
    echo -e "Enter your GitHub personal access token:"
    read -s TOKEN
    echo ""
    
    if [ -z "$TOKEN" ]; then
      echo -e "${RED}No token provided. Cannot continue.${NC}"
      exit 1
    fi
    
    # Save token for future use
    echo "GITHUB_TOKEN=$TOKEN" > .env.github
    echo -e "Token saved to .env.github"
    
    # Make sure .env.github is in .gitignore
    if [ -f ".gitignore" ]; then
      if ! grep -q ".env.github" .gitignore; then
        echo ".env.github" >> .gitignore
        echo -e "Added .env.github to .gitignore"
      fi
    else
      echo ".env.github" > .gitignore
      echo -e "Created .gitignore with .env.github"
    fi
  fi
  
  # Set the remote URL with token
  git remote set-url origin "https://${USERNAME}:${TOKEN}@github.com/${USERNAME}/${REPO_NAME}.git"
  
  # Test connection
  echo -e "Testing GitHub connection..."
  if git ls-remote origin &>/dev/null; then
    echo -e "${GREEN}Authentication successful!${NC}"
    return 0
  else
    echo -e "${RED}Authentication failed. Please check your token.${NC}"
    setup_auth "refresh"
  fi
}

# Setup project for GitHub Pages
setup_project() {
  print_header
  print_section "Setting up project for GitHub Pages"
  
  # Setup authentication
  setup_auth
  
  # Update package.json homepage
  echo -e "Setting homepage in package.json..."
  if [ -f "package.json" ]; then
    node -e "
      const fs = require('fs');
      const package = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
      package.homepage = 'https://${USERNAME}.github.io/${REPO_NAME}';
      if (!package.scripts) package.scripts = {};
      if (!package.scripts.predeploy) package.scripts.predeploy = 'npm run build';
      if (!package.scripts.deploy) package.scripts.deploy = 'gh-pages -d build';
      fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));
    "
    echo -e "${GREEN}Updated package.json${NC}"
  else
    echo -e "${RED}package.json not found in current directory${NC}"
    exit 1
  fi
  
  # Set environment variables
  echo -e "Setting PUBLIC_URL in .env.production..."
  echo "PUBLIC_URL=/${REPO_NAME}" > .env.production
  echo -e "${GREEN}Created .env.production${NC}"
  
  # Install gh-pages if needed
  if ! npm list gh-pages --depth=0 2>/dev/null | grep -q "gh-pages"; then
    echo -e "Installing gh-pages package..."
    npm install --save-dev gh-pages
    echo -e "${GREEN}Installed gh-pages package${NC}"
  else
    echo -e "${GREEN}gh-pages package already installed${NC}"
  fi
  
  # Create .nojekyll
  touch .nojekyll
  echo -e "${GREEN}Created .nojekyll file${NC}"
  
  # Check if source branch exists
  if ! git show-ref --verify --quiet refs/heads/$SOURCE_BRANCH; then
    echo -e "Creating source branch ${SOURCE_BRANCH}..."
    git checkout -b $SOURCE_BRANCH
    git push -u origin $SOURCE_BRANCH
    echo -e "${GREEN}Created and pushed ${SOURCE_BRANCH}${NC}"
  else
    echo -e "${GREEN}Source branch ${SOURCE_BRANCH} already exists${NC}"
  fi
  
  echo -e "\n${GREEN}Setup complete!${NC}"
  echo -e "Your project is now configured for GitHub Pages."
  echo -e "Source branch: ${YELLOW}${SOURCE_BRANCH}${NC}"
  echo -e "Deployment branch: ${YELLOW}${DEPLOYMENT_BRANCH}${NC}"
  echo -e "Deployment URL: ${YELLOW}https://${USERNAME}.github.io/${REPO_NAME}${NC}"
}

# Commit and push to source branch
commit_source() {
  print_header
  print_section "Committing to source branch"
  
  # Setup authentication
  setup_auth
  
  # Make sure we're on the source branch
  if [ "$(git rev-parse --abbrev-ref HEAD)" != "$SOURCE_BRANCH" ]; then
    echo -e "Switching to ${SOURCE_BRANCH} branch..."
    git checkout $SOURCE_BRANCH
  fi
  
  # Check for changes
  if [ -z "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}No changes to commit.${NC}"
    return 0
  fi
  
  # Show changes
  echo -e "Changes to commit:"
  git status -s
  
  # Get commit message
  echo -e "Enter commit message (or press Enter for default):"
  read commit_message
  
  if [ -z "$commit_message" ]; then
    commit_message="Update $(date +%Y-%m-%d_%H-%M-%S)"
  fi
  
  # Commit changes
  git add .
  git commit -m "$commit_message"
  
  # Push to remote
  echo -e "Pushing to ${SOURCE_BRANCH}..."
  git push origin $SOURCE_BRANCH
  
  echo -e "${GREEN}Changes committed and pushed to ${SOURCE_BRANCH}${NC}"
}

# Build the React app
build_app() {
  print_header
  print_section "Building React application"
  
  echo -e "Running build..."
  npm run build
  
  # Ensure .nojekyll in build directory
  touch build/.nojekyll
  
  echo -e "${GREEN}Build completed.${NC}"
  echo -e "Build files are in the build/ directory."
}

# Deploy to GitHub Pages (gh-pages branch)
deploy_pages() {
  print_header
  print_section "Deploying to GitHub Pages"
  
  # Setup authentication
  setup_auth
  
  # Check if build directory exists
  if [ ! -d "build" ]; then
    echo -e "${YELLOW}Build directory not found. Building app first...${NC}"
    build_app
  fi
  
  # Deploy to GitHub Pages
  echo -e "Deploying to GitHub Pages..."
  
  # Get token
  source .env.github
  TOKEN="$GITHUB_TOKEN"
  
  # Use token for deployment
  REPO_URL="https://${USERNAME}:${TOKEN}@github.com/${USERNAME}/${REPO_NAME}.git"
  npx gh-pages -d build -r "$REPO_URL" -m "Deploy: $(date +%Y-%m-%d_%H-%M-%S)"
  
  echo -e "${GREEN}Deployment complete!${NC}"
  echo -e "Your site is now deployed to: ${YELLOW}https://${USERNAME}.github.io/${REPO_NAME}${NC}"
  echo -e "Note: It may take a few minutes for GitHub Pages to update."
}

# Complete deployment process
deploy_all() {
  print_header
  print_section "Complete deployment process"
  
  # Ask to commit source changes
  if [ ! -z "$(git status --porcelain)" ]; then
    echo -e "Uncommitted changes detected."
    read -p "Commit changes to source branch first? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      commit_source
    fi
  fi
  
  # Build the app
  build_app
  
  # Deploy to GitHub Pages
  deploy_pages
  
  echo -e "\n${GREEN}Complete deployment process finished.${NC}"
}

# Show help
show_help() {
  print_header
  echo -e "Usage: $0 [command]"
  echo ""
  echo -e "Commands:"
  echo -e "  ${BLUE}setup${NC}        - Setup project for GitHub Pages"
  echo -e "  ${BLUE}auth${NC}         - Configure GitHub authentication"
  echo -e "  ${BLUE}commit${NC}       - Commit and push to source branch"
  echo -e "  ${BLUE}build${NC}        - Build the React application"
  echo -e "  ${BLUE}deploy${NC}       - Deploy to GitHub Pages"
  echo -e "  ${BLUE}all${NC}          - Complete process (commit, build, deploy)"
  echo -e "  ${BLUE}help${NC}         - Show this help message"
  echo ""
  echo -e "Examples:"
  echo -e "  $0 setup     # Setup project for GitHub Pages"
  echo -e "  $0 commit    # Commit and push to source branch"
  echo -e "  $0 deploy    # Deploy to GitHub Pages"
  echo -e "  $0 all       # Complete deployment process"
  echo ""
}

# Main function
main() {
  case "$1" in
    setup)
      setup_project
      ;;
    auth)
      setup_auth
      ;;
    commit)
      commit_source
      ;;
    build)
      build_app
      ;;
    deploy)
      deploy_pages
      ;;
    all)
      deploy_all
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

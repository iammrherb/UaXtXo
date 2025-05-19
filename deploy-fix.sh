#!/bin/bash
# Git Status and Push Verification Script for Portnox TCO Analyzer
# This script focuses on diagnosing git commit/push issues

# Set text colors for better readability
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=====================================================${NC}"
echo -e "${BLUE}     Portnox TCO Analyzer - Git Status Checker       ${NC}"
echo -e "${BLUE}=====================================================${NC}"

# Check if we're in a git repository
if [ ! -d .git ]; then
  echo -e "${RED}Error: This is not a git repository.${NC}"
  echo -e "${YELLOW}Please run this script from the root of your project.${NC}"
  exit 1
fi

# Get repository information
GIT_REMOTE=$(git config --get remote.origin.url)
if [ -z "$GIT_REMOTE" ]; then
  echo -e "${RED}Error: No git remote found.${NC}"
  exit 1
fi

echo -e "${YELLOW}Repository:${NC} $GIT_REMOTE"

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${YELLOW}Current branch:${NC} $CURRENT_BRANCH"

# Check last commit
LAST_COMMIT=$(git log -1 --pretty=format:"%h - %an, %ar : %s")
LAST_COMMIT_DATE=$(git log -1 --pretty=format:"%ad" --date=relative)
echo -e "${YELLOW}Last commit:${NC} $LAST_COMMIT"
echo -e "${YELLOW}Committed:${NC} $LAST_COMMIT_DATE"

# Check for uncommitted changes
echo -e "\n${YELLOW}Checking for uncommitted changes...${NC}"
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${RED}You have uncommitted changes:${NC}"
  git status --short
  
  # Ask to commit changes
  read -p "Do you want to commit these changes now? (y/n): " COMMIT_CHANGES
  if [[ $COMMIT_CHANGES =~ ^[Yy]$ ]]; then
    read -p "Enter commit message: " COMMIT_MESSAGE
    git add .
    git commit -m "$COMMIT_MESSAGE"
    echo -e "${GREEN}Changes committed.${NC}"
    
    # Show the new commit
    NEW_COMMIT=$(git log -1 --pretty=format:"%h - %an, %ar : %s")
    echo -e "${YELLOW}New commit:${NC} $NEW_COMMIT"
  else
    echo -e "${YELLOW}Changes left uncommitted.${NC}"
  fi
else
  echo -e "${GREEN}No uncommitted changes found.${NC}"
fi

# Check if local branch is behind/ahead of remote
echo -e "\n${YELLOW}Checking remote repository status...${NC}"
git fetch origin "$CURRENT_BRANCH" &> /dev/null

BEHIND=$(git rev-list --count HEAD..origin/$CURRENT_BRANCH 2>/dev/null)
AHEAD=$(git rev-list --count origin/$CURRENT_BRANCH..HEAD 2>/dev/null)

if [ -z "$BEHIND" ] || [ -z "$AHEAD" ]; then
  echo -e "${YELLOW}The current branch is not tracking any remote branch.${NC}"
  
  # Ask to set up tracking
  read -p "Do you want to push and set up tracking for this branch? (y/n): " SETUP_TRACKING
  if [[ $SETUP_TRACKING =~ ^[Yy]$ ]]; then
    git push -u origin "$CURRENT_BRANCH"
    echo -e "${GREEN}Branch pushed and tracking set up.${NC}"
  fi
else
  if [ "$BEHIND" -gt 0 ]; then
    echo -e "${RED}Your branch is behind the remote by $BEHIND commit(s).${NC}"
    echo -e "${YELLOW}Consider pulling the latest changes:${NC} git pull origin $CURRENT_BRANCH"
  fi
  
  if [ "$AHEAD" -gt 0 ]; then
    echo -e "${YELLOW}Your branch is ahead of the remote by $AHEAD commit(s).${NC}"
    echo -e "${YELLOW}These commits have not been pushed yet.${NC}"
    
    # Show unpushed commits
    echo -e "\n${YELLOW}Unpushed commits:${NC}"
    git log origin/$CURRENT_BRANCH..HEAD --pretty=format:"%h - %an, %ar : %s"
    
    # Ask to push changes
    echo -e ""
    read -p "Do you want to push these commits now? (y/n): " PUSH_CHANGES
    if [[ $PUSH_CHANGES =~ ^[Yy]$ ]]; then
      git push origin "$CURRENT_BRANCH"
      echo -e "${GREEN}Changes pushed to remote.${NC}"
    else
      echo -e "${YELLOW}Changes not pushed.${NC}"
    fi
  fi
  
  if [ "$BEHIND" -eq 0 ] && [ "$AHEAD" -eq 0 ]; then
    echo -e "${GREEN}Your branch is up to date with the remote.${NC}"
  fi
fi

# Check GitHub Pages configuration
echo -e "\n${YELLOW}Checking GitHub Pages configuration...${NC}"

# Get the repository name and owner from the remote URL
REPO_URL=$(git config --get remote.origin.url)
REPO_NAME=$(basename -s .git "$REPO_URL")
REPO_OWNER=$(echo "$REPO_URL" | sed -n 's/.*github.com[:\/]\([^\/]*\).*/\1/p')

echo -e "${YELLOW}Repository owner:${NC} $REPO_OWNER"
echo -e "${YELLOW}Repository name:${NC} $REPO_NAME"

# Check package.json for homepage setting
if [ -f "package.json" ]; then
  HOMEPAGE=$(grep -o '"homepage":[^,}]*' package.json | cut -d'"' -f4)
  
  if [ -z "$HOMEPAGE" ]; then
    echo -e "${RED}Warning: No homepage set in package.json${NC}"
    echo -e "${YELLOW}This is required for GitHub Pages deployment.${NC}"
    
    # Recommend adding homepage
    SUGGESTED_HOMEPAGE="https://$REPO_OWNER.github.io/$REPO_NAME"
    echo -e "${YELLOW}Suggested homepage:${NC} $SUGGESTED_HOMEPAGE"
    
    read -p "Add this homepage to package.json? (y/n): " ADD_HOMEPAGE
    if [[ $ADD_HOMEPAGE =~ ^[Yy]$ ]]; then
      # Use node to correctly add the homepage to package.json
      node -e "
        const fs = require('fs');
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        pkg.homepage = '$SUGGESTED_HOMEPAGE';
        fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
      "
      echo -e "${GREEN}Homepage added to package.json${NC}"
    fi
  else
    echo -e "${GREEN}Homepage found in package.json:${NC} $HOMEPAGE"
  fi
else
  echo -e "${RED}Error: package.json not found.${NC}"
fi

# Check for build directory
echo -e "\n${YELLOW}Checking build artifacts...${NC}"

if [ -d "build" ]; then
  echo -e "${GREEN}Build directory exists.${NC}"
  
  # Count files in build directory
  BUILD_FILE_COUNT=$(find build -type f | wc -l)
  echo -e "${YELLOW}Build directory contains ${BUILD_FILE_COUNT} files.${NC}"
  
  # Check if build directory is recent
  BUILD_LAST_MODIFIED=$(stat -c %y build | cut -d' ' -f1)
  echo -e "${YELLOW}Build directory was last modified on:${NC} $BUILD_LAST_MODIFIED"
  
else
  echo -e "${RED}No build directory found.${NC}"
  echo -e "${YELLOW}Run 'npm run build' to create a production build.${NC}"
  
  read -p "Do you want to run 'npm run build' now? (y/n): " RUN_BUILD
  if [[ $RUN_BUILD =~ ^[Yy]$ ]]; then
    npm run build
    
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}Build successful.${NC}"
    else
      echo -e "${RED}Build failed. See errors above.${NC}"
    fi
  fi
fi

# Check for gh-pages branch
echo -e "\n${YELLOW}Checking gh-pages branch...${NC}"
if git show-ref --quiet refs/heads/gh-pages; then
  echo -e "${GREEN}Local gh-pages branch exists.${NC}"
  
  # Check when gh-pages was last updated
  GH_PAGES_LAST_COMMIT=$(git log -1 --pretty=format:"%ad" --date=relative gh-pages)
  echo -e "${YELLOW}Last updated:${NC} $GH_PAGES_LAST_COMMIT"
else
  echo -e "${YELLOW}No local gh-pages branch found.${NC}"
fi

if git ls-remote --heads origin gh-pages >/dev/null; then
  echo -e "${GREEN}Remote gh-pages branch exists.${NC}"
else
  echo -e "${YELLOW}No remote gh-pages branch found.${NC}"
  echo -e "${YELLOW}GitHub Pages may not be set up correctly.${NC}"
fi

# Check if gh-pages package is installed
echo -e "\n${YELLOW}Checking for gh-pages package...${NC}"
if grep -q '"gh-pages"' package.json 2>/dev/null; then
  echo -e "${GREEN}gh-pages package is installed.${NC}"
  
  # Check for deploy scripts
  if grep -q '"deploy"' package.json 2>/dev/null; then
    echo -e "${GREEN}Deploy script found in package.json.${NC}"
    DEPLOY_SCRIPT=$(grep -A 1 '"deploy"' package.json | grep -o '"gh-pages.*"' | cut -d'"' -f2)
    echo -e "${YELLOW}Deploy command:${NC} $DEPLOY_SCRIPT"
  else
    echo -e "${RED}No deploy script found in package.json.${NC}"
    echo -e "${YELLOW}Add these to your package.json scripts section:${NC}"
    echo -e '  "predeploy": "npm run build",'
    echo -e '  "deploy": "gh-pages -d build"'
    
    read -p "Add these scripts to package.json? (y/n): " ADD_SCRIPTS
    if [[ $ADD_SCRIPTS =~ ^[Yy]$ ]]; then
      # Use node to correctly add the scripts to package.json
      node -e "
        const fs = require('fs');
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        pkg.scripts = pkg.scripts || {};
        pkg.scripts.predeploy = 'npm run build';
        pkg.scripts.deploy = 'gh-pages -d build';
        fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
      "
      echo -e "${GREEN}Scripts added to package.json${NC}"
    fi
  fi
else
  echo -e "${RED}gh-pages package not found in package.json.${NC}"
  echo -e "${YELLOW}You should install it for easy GitHub Pages deployment:${NC}"
  echo -e "npm install --save-dev gh-pages"
  
  read -p "Install gh-pages now? (y/n): " INSTALL_GH_PAGES
  if [[ $INSTALL_GH_PAGES =~ ^[Yy]$ ]]; then
    npm install --save-dev gh-pages
    echo -e "${GREEN}gh-pages package installed.${NC}"
    
    # Also add scripts
    node -e "
      const fs = require('fs');
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      pkg.scripts = pkg.scripts || {};
      pkg.scripts.predeploy = 'npm run build';
      pkg.scripts.deploy = 'gh-pages -d build';
      fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
    "
    echo -e "${GREEN}Deploy scripts added to package.json${NC}"
  fi
fi

# Check deploy and offer to deploy
echo -e "\n${YELLOW}Deploy check complete.${NC}"
read -p "Do you want to deploy to GitHub Pages now? (y/n): " DEPLOY_NOW
if [[ $DEPLOY_NOW =~ ^[Yy]$ ]]; then
  echo -e "${YELLOW}Deploying to GitHub Pages...${NC}"
  
  if grep -q '"deploy"' package.json 2>/dev/null; then
    npm run deploy
    
    if [ $? -eq 0 ]; then
      echo -e "\n${GREEN}✨ Deployment successful! ✨${NC}"
      echo -e "${YELLOW}Your site should be available at:${NC}"
      echo -e "${BLUE}https://$REPO_OWNER.github.io/$REPO_NAME${NC}"
      echo -e "\n${YELLOW}Note: It may take a few minutes for the changes to propagate.${NC}"
    else
      echo -e "${RED}Deployment failed. See errors above.${NC}"
    fi
  else
    echo -e "${RED}No deploy script found in package.json.${NC}"
    echo -e "${YELLOW}Please add deploy scripts first.${NC}"
  fi
else
  echo -e "${YELLOW}Deployment skipped.${NC}"
fi

echo -e "\n${BLUE}=====================================================${NC}"
echo -e "${GREEN}Git status check complete.${NC}"
echo -e "${BLUE}=====================================================${NC}"

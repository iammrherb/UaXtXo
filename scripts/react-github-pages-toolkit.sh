#!/bin/bash
# =============================================================================
# React GitHub Pages Maintenance Toolkit
# =============================================================================
# A comprehensive toolkit for managing React applications deployed to GitHub Pages
# This script handles repository structure, configuration, deployment, and maintenance
# Author: Claude
# Version: 2.0
# =============================================================================

set -e
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Configuration - Edit these variables to match your project
REPO_NAME="UaXtXo"
GIT_USERNAME="iammrherb"
SOURCE_BRANCH="main-react"
DEPLOYMENT_BRANCH="gh-pages"
PROJECT_TITLE="Portnox TCO Analyzer"

# CI/CD Configuration
GITHUB_TOKEN="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" # For automated deployments - set this or use .env.github file
CI_MODE=false   # Set to true for CI/CD environments

# Commit message templates - used for automated commits
COMMIT_TEMPLATES=(
  "feat: update {component} functionality"
  "fix: resolve issue with {component}"
  "chore: maintain and organize project structure"
  "docs: update documentation for {component}"
  "style: improve formatting and styling"
  "refactor: improve code structure without changing behavior"
  "perf: improve performance of {component}"
  "test: add tests for {component}"
  "build: update build configuration"
  "ci: update CI/CD configuration"
)

# Print header
print_header() {
  echo -e "${BLUE}==============================================${NC}"
  echo -e "${BLUE}   React GitHub Pages Maintenance Toolkit    ${NC}"
  echo -e "${BLUE}==============================================${NC}"
  echo ""
}

# Print section header
print_section() {
  echo -e "\n${YELLOW}>>> $1${NC}"
}

# Generate a commit message based on changes or use a template
generate_commit_message() {
  local component="$1"
  local type="$2"
  
  if [ -z "$component" ]; then
    component="project"
  fi
  
  if [ -z "$type" ]; then
    # Select random template from COMMIT_TEMPLATES
    local template_index=$((RANDOM % ${#COMMIT_TEMPLATES[@]}))
    local template="${COMMIT_TEMPLATES[$template_index]}"
    
    # Replace {component} with actual component name
    echo "${template/\{component\}/$component}"
  else
    case "$type" in
      feat)
        echo "feat: add or update $component functionality"
        ;;
      fix)
        echo "fix: resolve issue with $component"
        ;;
      chore)
        echo "chore: maintain and organize $component"
        ;;
      docs)
        echo "docs: update documentation for $component"
        ;;
      style)
        echo "style: improve formatting and styling in $component"
        ;;
      refactor)
        echo "refactor: improve code structure in $component"
        ;;
      *)
        echo "update: changes to $component"
        ;;
    esac
  fi
}

# Load GitHub token if exists in .env.github file
load_github_token() {
  if [ -f ".env.github" ]; then
    source .env.github
    if [ ! -z "$GITHUB_TOKEN" ]; then
      echo -e "${GREEN}GitHub token loaded from .env.github${NC}"
      return 0
    fi
  fi
  
  if [ ! -z "$GITHUB_TOKEN" ]; then
    echo -e "${GREEN}Using GitHub token from environment${NC}"
    return 0
  fi
  
  echo -e "${YELLOW}No GitHub token found. Some operations may require manual authentication.${NC}"
  return 1
}

# Configure git with token if available
configure_git_with_token() {
  if [ ! -z "$GITHUB_TOKEN" ]; then
    local repo_url="https://${GITHUB_TOKEN}@github.com/${GIT_USERNAME}/${REPO_NAME}.git"
    git remote set-url origin "$repo_url"
    echo -e "${GREEN}Git configured with token for authentication${NC}"
    return 0
  fi
  return 1
}

# Show help menu
show_help() {
  print_header
  echo -e "Usage: $0 [command]"
  echo ""
  echo -e "Main Commands:"
  echo -e "  ${CYAN}setup${NC}           - Initial setup (create branches, configure project)"
  echo -e "  ${CYAN}deploy${NC}          - Build and deploy to GitHub Pages"
  echo -e "  ${CYAN}dev${NC}             - Start development server"
  
  echo -e "\nMaintenance Commands:"
  echo -e "  ${CYAN}clean${NC}           - Clean up project directory (remove unnecessary files)"
  echo -e "  ${CYAN}organize${NC}        - Organize project structure (move files to proper locations)"
  echo -e "  ${CYAN}check${NC}           - Check configuration and repository structure"
  echo -e "  ${CYAN}verify${NC}          - Verify deployment on GitHub Pages"
  
  echo -e "\nAdvanced Commands:"
  echo -e "  ${CYAN}reset${NC}           - Reset branch to a previous state"
  echo -e "  ${CYAN}revert${NC}          - Revert the last deployment"
  echo -e "  ${CYAN}sync${NC}            - Sync branches (update deployment from source)"
  echo -e "  ${CYAN}commit${NC}          - Generate commit message and commit changes"
  echo -e "  ${CYAN}token${NC}           - Configure GitHub token for CI/CD"
  echo -e "  ${CYAN}gitignore${NC}       - Update or reset .gitignore file"
  echo -e "  ${CYAN}help${NC}            - Show this help message"
  
  echo -e "\nExamples:"
  echo -e "  $0 setup              # Run initial setup"
  echo -e "  $0 deploy             # Build and deploy to GitHub Pages"
  echo -e "  $0 commit \"update UI\" # Commit changes with generated message"
  echo -e "  $0 reset --hard       # Reset to HEAD discarding all changes"
  echo -e "  $0 gitignore --reset  # Reset to default .gitignore"
  echo ""
}

# Check if repository is in good state
check_repository_state() {
  print_section "Checking repository state"
  
  # Check for uncommitted changes
  if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}You have uncommitted changes. Consider committing or stashing them before proceeding.${NC}"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      echo -e "${RED}Operation cancelled.${NC}"
      exit 1
    fi
  else
    echo -e "${GREEN}No uncommitted changes.${NC}"
  fi
  
  # Check remote connection
  if ! git ls-remote origin > /dev/null 2>&1; then
    echo -e "${RED}Cannot connect to remote repository. Check your internet connection and repository access.${NC}"
    exit 1
  else
    echo -e "${GREEN}Remote repository connection confirmed.${NC}"
  fi
}

# Setup project
setup_project() {
  print_header
  print_section "Setting up project repository structure"
  
  check_repository_state
  
  # Load GitHub token if available
  load_github_token
  configure_git_with_token
  
  # 1. Save current work
  echo -e "Saving current state..."
  git add .
  git commit -m "$(generate_commit_message 'project' 'chore')" || echo "No changes to commit"
  
  # 2. Determine current branch
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  echo -e "Current branch: ${YELLOW}${CURRENT_BRANCH}${NC}"
  
  # 3. Create source branch if it doesn't exist
  if git show-ref --verify --quiet refs/heads/$SOURCE_BRANCH; then
    echo -e "${GREEN}Source branch '$SOURCE_BRANCH' already exists.${NC}"
    git checkout $SOURCE_BRANCH
  else
    echo -e "Creating source branch '${YELLOW}${SOURCE_BRANCH}${NC}'..."
    git checkout -b $SOURCE_BRANCH
    git push -u origin $SOURCE_BRANCH
    echo -e "${GREEN}Created and pushed source branch.${NC}"
  fi
  
  # 4. Update package.json with correct homepage
  echo -e "Setting correct homepage in package.json..."
  HOMEPAGE_URL="https://${GIT_USERNAME}.github.io/${REPO_NAME}"
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
  
  # 5. Set correct PUBLIC_URL in environment files
  echo -e "Setting environment variables..."
  echo "PUBLIC_URL=/${REPO_NAME}" > .env.production
  echo -e "${GREEN}Updated .env.production${NC}"
  
  # 6. Install gh-pages if it's not already installed
  if ! npm list gh-pages --depth=0 2>/dev/null | grep -q "gh-pages"; then
    echo -e "Installing gh-pages package..."
    npm install --save-dev gh-pages
    echo -e "${GREEN}Installed gh-pages package${NC}"
  else
    echo -e "${GREEN}gh-pages package already installed${NC}"
  fi
  
  # 7. Set up comprehensive .gitignore
  echo -e "Setting up .gitignore..."
  setup_gitignore
  
  # 8. Ensure .nojekyll exists
  touch .nojekyll
  
  # 9. Create a public folder if it doesn't exist
  mkdir -p public
  
  # 10. Create a README.md if it doesn't exist
  if [ ! -f README.md ]; then
    echo -e "Creating README.md..."
    cat > README.md << EOF
# ${PROJECT_TITLE}

This is a React application deployed to GitHub Pages.

## Development

1. Clone the repository
2. \`npm install\`
3. \`npm start\`

## Deployment

To deploy to GitHub Pages, run:

\`\`\`
./react-github-toolkit.sh deploy
\`\`\`

## Branch Structure

- \`${SOURCE_BRANCH}\`: Source code and development files
- \`${DEPLOYMENT_BRANCH}\`: Deployment branch (build output only)
EOF
    echo -e "${GREEN}Created README.md${NC}"
  fi
  
  # 11. Set up GitHub token file template if not exists
  if [ ! -f ".env.github" ]; then
    echo -e "Creating GitHub token file template..."
    cat > .env.github << EOF
# GitHub token for automated deployments
# Replace YOUR_TOKEN_HERE with a personal access token with repo permissions
GITHUB_TOKEN=YOUR_TOKEN_HERE
EOF
    echo -e "${GREEN}Created .env.github template${NC}"
    echo -e "${YELLOW}Note: Remember to update .env.github with your actual GitHub token${NC}"
    echo -e "${YELLOW}      This file is automatically added to .gitignore for security${NC}"
    echo "**/.env.github" >> .gitignore
  fi
  
  # 12. Save changes
  git add .
  git commit -m "$(generate_commit_message 'project setup' 'chore')"
  git push origin $SOURCE_BRANCH
  
  echo -e "\n${GREEN}Setup complete!${NC}"
  echo -e "Your project is now configured for GitHub Pages deployment."
  echo -e "Source code branch: ${YELLOW}${SOURCE_BRANCH}${NC}"
  echo -e "Deployment branch: ${YELLOW}${DEPLOYMENT_BRANCH}${NC}"
  echo -e "Deployment URL: ${YELLOW}${HOMEPAGE_URL}${NC}"
  echo -e "\nNext steps:"
  echo -e "1. ${YELLOW}Review and update the .env.github file with your GitHub token${NC}"
  echo -e "2. ${YELLOW}Run: $0 organize${NC} to organize your project structure"
  echo -e "3. ${YELLOW}Run: $0 deploy${NC} to deploy your site to GitHub Pages"
}

# Set up a comprehensive .gitignore file
setup_gitignore() {
  cat > .gitignore << EOF
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage
/cypress/videos
/cypress/screenshots

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
.env.github

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.project
.classpath
.settings/

# Debug
.nyc_output
*.tsbuildinfo

# Temporary files
.temp
.tmp
.cache
tmp/

# Package manager lockfiles (uncomment if you want to ignore them)
# package-lock.json
# yarn.lock

# Build artifacts
dist/
public/dist/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
EOF

  echo -e "${GREEN}Created comprehensive .gitignore${NC}"
}

# Clean up project
clean_project() {
  print_header
  print_section "Cleaning up project directory"
  
  # Check branch
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  if [ "$CURRENT_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo -e "${YELLOW}You are not on the source branch ($SOURCE_BRANCH).${NC}"
    read -p "Switch to $SOURCE_BRANCH? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      git checkout $SOURCE_BRANCH
    else
      echo -e "${RED}Operation cancelled.${NC}"
      exit 1
    fi
  fi
  
  # 1. Remove build directory
  echo -e "Removing build directory..."
  rm -rf build
  echo -e "${GREEN}Removed build directory${NC}"
  
  # 2. Remove any temporary files
  echo -e "Removing temporary files..."
  find . -name "*.tmp" -type f -delete
  find . -name "*.bak" -type f -delete
  find . -name ".DS_Store" -type f -delete
  echo -e "${GREEN}Removed temporary files${NC}"
  
  # 3. Sort package.json
  echo -e "Sorting package.json..."
  node -e "
    const fs = require('fs');
    const package = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    const sortObjectKeys = (obj) => {
      return Object.keys(obj).sort().reduce((result, key) => {
        result[key] = obj[key];
        return result;
      }, {});
    };
    if (package.dependencies) package.dependencies = sortObjectKeys(package.dependencies);
    if (package.devDependencies) package.devDependencies = sortObjectKeys(package.devDependencies);
    if (package.scripts) package.scripts = sortObjectKeys(package.scripts);
    fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));
  "
  echo -e "${GREEN}Sorted package.json${NC}"
  
  # 4. Clean npm cache
  echo -e "Cleaning npm cache..."
  npm cache clean --force
  echo -e "${GREEN}Cleaned npm cache${NC}"
  
  echo -e "\n${GREEN}Cleanup complete!${NC}"
}

# Organize project structure
organize_project() {
  print_header
  print_section "Organizing project structure"
  
  # Check branch
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  if [ "$CURRENT_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo -e "${YELLOW}You are not on the source branch ($SOURCE_BRANCH).${NC}"
    read -p "Switch to $SOURCE_BRANCH? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      git checkout $SOURCE_BRANCH
    else
      echo -e "${RED}Operation cancelled.${NC}"
      exit 1
    fi
  fi
  
  # 1. Create standard directory structure if not exists
  echo -e "Creating standard directory structure..."
  mkdir -p src/components
  mkdir -p src/assets/images
  mkdir -p src/assets/css
  mkdir -p src/utils
  mkdir -p src/hooks
  mkdir -p public
  mkdir -p scripts
  echo -e "${GREEN}Created standard directory structure${NC}"
  
  # 2. Move scripts to scripts directory
  echo -e "Moving script files to scripts directory..."
  for file in *.sh; do
    if [ "$file" != "react-github-toolkit.sh" ]; then
      if [ -f "$file" ]; then
        mv "$file" scripts/ 2>/dev/null || echo "Could not move $file"
      fi
    fi
  done
  echo -e "${GREEN}Moved script files${NC}"
  
  # 3. Ensure source files are in src directory
  echo -e "Checking source files..."
  if [ -f "index.js" ] || [ -f "index.tsx" ]; then
    if [ ! -f "src/index.js" ] && [ ! -f "src/index.tsx" ]; then
      # Move root index file to src if it exists in root but not in src
      if [ -f "index.js" ]; then
        mv index.js src/
        echo -e "${GREEN}Moved index.js to src directory${NC}"
      elif [ -f "index.tsx" ]; then
        mv index.tsx src/
        echo -e "${GREEN}Moved index.tsx to src directory${NC}"
      fi
    fi
  fi
  
  # 4. Move any CSS/SCSS files to proper location
  echo -e "Organizing CSS/SCSS files..."
  for file in *.css *.scss; do
    if [ -f "$file" ] && [ "$file" != "*.css" ] && [ "$file" != "*.scss" ]; then
      mv "$file" src/assets/css/ 2>/dev/null || echo "Could not move $file"
      echo -e "${GREEN}Moved $file to src/assets/css/${NC}"
    fi
  done
  
  # 5. Move image files to assets directory
  echo -e "Organizing image files..."
  for file in *.png *.jpg *.jpeg *.gif *.svg; do
    if [ -f "$file" ] && [ "$file" != "*.png" ] && [ "$file" != "*.jpg" ] && [ "$file" != "*.jpeg" ] && [ "$file" != "*.gif" ] && [ "$file" != "*.svg" ]; then
      mv "$file" src/assets/images/ 2>/dev/null || echo "Could not move $file"
      echo -e "${GREEN}Moved $file to src/assets/images/${NC}"
    fi
  done
  
  # 6. Update imports if needed
  echo -e "NOTE: You may need to update imports in your source files to reflect the new directory structure."
  
  # 7. Save changes
  git add .
  git commit -m "Organize project directory structure" || echo "No changes to commit"
  git push origin $SOURCE_BRANCH || echo "No changes to push"
  
  echo -e "\n${GREEN}Project organization complete!${NC}"
}

# Deploy to GitHub Pages
deploy_project() {
  print_header
  print_section "Deploying to GitHub Pages"
  
  check_repository_state
  
  # Load GitHub token if available
  load_github_token
  configure_git_with_token
  
  # Check branch
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  if [ "$CURRENT_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo -e "${YELLOW}You are not on the source branch ($SOURCE_BRANCH).${NC}"
    read -p "Switch to $SOURCE_BRANCH? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      git checkout $SOURCE_BRANCH
    else
      echo -e "${RED}Operation cancelled.${NC}"
      exit 1
    fi
  fi
  
  # 1. Verify configuration
  echo -e "Verifying configuration..."
  HOMEPAGE=$(node -e "console.log(require('./package.json').homepage || 'Not set')")
  if [[ "$HOMEPAGE" == "Not set" ]]; then
    echo -e "${RED}Homepage not set in package.json. Run setup first.${NC}"
    exit 1
  fi
  echo -e "${GREEN}Homepage is set to: $HOMEPAGE${NC}"
  
  if [ ! -f ".env.production" ] || ! grep -q "PUBLIC_URL" .env.production; then
    echo -e "${RED}PUBLIC_URL not set in .env.production. Run setup first.${NC}"
    exit 1
  fi
  echo -e "${GREEN}PUBLIC_URL is set to: $(cat .env.production)${NC}"
  
  # 2. Install dependencies if needed
  if [ ! -d "node_modules" ]; then
    echo -e "Installing dependencies..."
    npm install
    echo -e "${GREEN}Dependencies installed${NC}"
  fi
  
  # 3. Save current work before build
  echo -e "Saving current changes..."
  CHANGES_EXIST=$(git status --porcelain | wc -l)
  if [ "$CHANGES_EXIST" -gt 0 ]; then
    echo -e "${YELLOW}Uncommitted changes detected. Creating a commit...${NC}"
    read -p "Enter component name or leave blank for default: " component_name
    read -p "Enter commit type (feat/fix/chore/docs/etc) or leave blank for default: " commit_type
    
    git add .
    git commit -m "$(generate_commit_message "$component_name" "$commit_type")"
    git push origin $SOURCE_BRANCH
    echo -e "${GREEN}Changes committed and pushed${NC}"
  else
    echo -e "${GREEN}No changes to commit${NC}"
  fi
  
  # 4. Pull latest changes
  echo -e "Pulling latest changes from remote..."
  git pull origin $SOURCE_BRANCH
  
  # 5. Build the app
  echo -e "Building the app..."
  npm run build
  echo -e "${GREEN}Build completed${NC}"
  
  # 6. Create .nojekyll in build directory
  touch build/.nojekyll
  
  # 7. Save deployment information
  DEPLOYMENT_INFO="Last deployed: $(date)"
  DEPLOYMENT_INFO="$DEPLOYMENT_INFO\nCommit: $(git rev-parse HEAD)"
  DEPLOYMENT_INFO="$DEPLOYMENT_INFO\nBranch: $SOURCE_BRANCH"
  DEPLOYMENT_INFO="$DEPLOYMENT_INFO\nUser: $(git config user.name)"
  echo -e "$DEPLOYMENT_INFO" > build/deployment-info.txt
  
  # 8. Deploy to GitHub Pages
  echo -e "Deploying to GitHub Pages..."
  
  # Check if gh-pages package is installed
  if ! npm list gh-pages --depth=0 2>/dev/null | grep -q "gh-pages"; then
    echo -e "${YELLOW}gh-pages package not installed. Installing now...${NC}"
    npm install --save-dev gh-pages
  fi
  
  # Deploy using gh-pages
  if [ -z "$GITHUB_TOKEN" ]; then
    # Standard deployment
    npx gh-pages -d build -m "Deploy: $(date +%Y-%m-%d_%H-%M-%S)"
  else
    # Deploy with token for CI/CD
    npx gh-pages -d build -m "Deploy: $(date +%Y-%m-%d_%H-%M-%S)" -r "https://${GITHUB_TOKEN}@github.com/${GIT_USERNAME}/${REPO_NAME}.git"
  fi
  
  echo -e "\n${GREEN}Deployment complete!${NC}"
  echo -e "Your site should be available at: ${YELLOW}${HOMEPAGE}${NC}"
  echo -e "Note: It may take a few minutes for GitHub Pages to update."
  
  # 9. Create deployment tag
  TAG_NAME="deploy-$(date +%Y%m%d-%H%M%S)"
  echo -e "\n${YELLOW}Creating deployment tag: $TAG_NAME${NC}"
  git tag -a "$TAG_NAME" -m "Deployment on $(date)"
  git push origin "$TAG_NAME"
  echo -e "${GREEN}Deployment tagged for future reference${NC}"
  
  # 10. Suggest verification
  echo -e "\n${YELLOW}To verify your deployment, run:${NC}"
  echo -e "  $0 verify"
}

# Reset branch to a previous state
reset_branch() {
  print_header
  print_section "Resetting branch to a previous state"
  
  # Get arguments
  local mode="soft"
  local target="HEAD"
  
  # Parse arguments
  for arg in "$@"; do
    case $arg in
      --hard)
        mode="hard"
        ;;
      --soft)
        mode="soft"
        ;;
      --mixed)
        mode="mixed"
        ;;
      --to=*)
        target="${arg#*=}"
        ;;
      *)
        if [[ $arg != "--"* && $target == "HEAD" ]]; then
          # If not a flag and target is still default, assume it's a target
          target="$arg"
        fi
        ;;
    esac
  done
  
  # Confirm with user
  echo -e "${YELLOW}You are about to reset the current branch to: $target using mode: $mode${NC}"
  if [ "$mode" == "hard" ]; then
    echo -e "${RED}WARNING: This will discard all uncommitted changes!${NC}"
  fi
  
  read -p "Continue? (y/n) " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Reset cancelled.${NC}"
    exit 1
  fi
  
  # Perform the reset
  git reset --$mode $target
  
  echo -e "${GREEN}Branch reset to $target with mode: $mode${NC}"
  echo -e "${YELLOW}Current status:${NC}"
  git status
}

# Revert the last deployment
revert_deployment() {
  print_header
  print_section "Reverting last deployment"
  
  # Load GitHub token if available
  load_github_token
  configure_git_with_token
  
  # Get list of deployment tags
  local tags=$(git tag -l "deploy-*" --sort=-committerdate)
  
  if [ -z "$tags" ]; then
    echo -e "${RED}No deployment tags found. Cannot revert.${NC}"
    exit 1
  fi
  
  # Get the last two deployment tags
  local last_tag=$(echo "$tags" | head -n 1)
  local previous_tag=$(echo "$tags" | head -n 2 | tail -n 1)
  
  if [ -z "$previous_tag" ]; then
    echo -e "${RED}Only one deployment tag found. Cannot revert to a previous deployment.${NC}"
    exit 1
  fi
  
  echo -e "Last deployment: ${YELLOW}$last_tag${NC}"
  echo -e "Previous deployment: ${YELLOW}$previous_tag${NC}"
  
  read -p "Revert to previous deployment? (y/n) " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Revert cancelled.${NC}"
    exit 1
  fi
  
  # Get the commit hash of the previous deployment
  local previous_commit=$(git rev-list -n 1 $previous_tag)
  
  # Create a temporary branch from the previous deployment
  echo -e "Creating temporary branch from previous deployment..."
  git checkout -b revert-temp $previous_tag
  
  # Build the app from the previous deployment
  echo -e "Building app from previous deployment..."
  npm install
  npm run build
  
  # Deploy the previous version
  echo -e "Deploying previous version..."
  if [ -z "$GITHUB_TOKEN" ]; then
    # Standard deployment
    npx gh-pages -d build -m "Revert to deployment: $previous_tag"
  else
    # Deploy with token for CI/CD
    npx gh-pages -d build -m "Revert to deployment: $previous_tag" -r "https://${GITHUB_TOKEN}@github.com/${GIT_USERNAME}/${REPO_NAME}.git"
  fi
  
  # Tag the reversion
  local revert_tag="revert-to-$previous_tag"
  git tag -a "$revert_tag" -m "Reverted to $previous_tag"
  git push origin "$revert_tag"
  
  # Switch back to source branch
  git checkout $SOURCE_BRANCH
  git branch -D revert-temp
  
  echo -e "\n${GREEN}Successfully reverted to previous deployment: $previous_tag${NC}"
  echo -e "Your site should be updated shortly at: ${YELLOW}$(node -e "console.log(require('./package.json').homepage || 'Not set')")${NC}"
}

# Sync branches (update deployment from source)
sync_branches() {
  print_header
  print_section "Syncing branches"
  
  # Load GitHub token if available
  load_github_token
  configure_git_with_token
  
  # Make sure we're on the source branch
  git checkout $SOURCE_BRANCH
  
  # Pull latest changes
  echo -e "Pulling latest changes from remote..."
  git pull origin $SOURCE_BRANCH
  
  # Commit any pending changes
  if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}Uncommitted changes detected.${NC}"
    read -p "Commit changes before sync? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      git add .
      git commit -m "$(generate_commit_message 'sync-preparation' 'chore')"
      git push origin $SOURCE_BRANCH
      echo -e "${GREEN}Changes committed and pushed${NC}"
    else
      echo -e "${RED}Cannot sync with uncommitted changes. Operation cancelled.${NC}"
      exit 1
    fi
  fi
  
  # Build the app
  echo -e "Building the app for deployment..."
  npm run build
  touch build/.nojekyll
  
  # Deploy to GitHub Pages
  echo -e "Deploying to GitHub Pages..."
  if [ -z "$GITHUB_TOKEN" ]; then
    # Standard deployment
    npx gh-pages -d build -m "Sync: $(date +%Y-%m-%d_%H-%M-%S)"
  else
    # Deploy with token for CI/CD
    npx gh-pages -d build -m "Sync: $(date +%Y-%m-%d_%H-%M-%S)" -r "https://${GITHUB_TOKEN}@github.com/${GIT_USERNAME}/${REPO_NAME}.git"
  fi
  
  echo -e "\n${GREEN}Branches synced successfully!${NC}"
  echo -e "Source branch (${SOURCE_BRANCH}) and deployment branch (${DEPLOYMENT_BRANCH}) are now in sync."
}

# Configure GitHub token for CI/CD
configure_token() {
  print_header
  print_section "Configuring GitHub token for CI/CD"
  
  # Check if token is already set
  if [ -f ".env.github" ] && grep -q "GITHUB_TOKEN=.*" .env.github && ! grep -q "GITHUB_TOKEN=YOUR_TOKEN_HERE" .env.github; then
    echo -e "${GREEN}GitHub token already configured in .env.github${NC}"
    read -p "Do you want to update it? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      echo -e "${YELLOW}Token configuration unchanged.${NC}"
      return 0
    fi
  fi
  
  # Prompt for token
  echo -e "${YELLOW}Please enter your GitHub Personal Access Token (will not be displayed):${NC}"
  echo -e "${YELLOW}This token should have 'repo' permissions.${NC}"
  read -s github_token
  echo ""
  
  if [ -z "$github_token" ]; then
    echo -e "${RED}No token provided. Operation cancelled.${NC}"
    exit 1
  fi
  
  # Save token to .env.github
  echo "GITHUB_TOKEN=$github_token" > .env.github
  
  # Ensure .env.github is in .gitignore
  if ! grep -q "\.env\.github" .gitignore; then
    echo "# GitHub token file" >> .gitignore
    echo ".env.github" >> .gitignore
    echo -e "${GREEN}Added .env.github to .gitignore${NC}"
  fi
  
  echo -e "${GREEN}GitHub token configured successfully!${NC}"
  echo -e "${YELLOW}The token is stored in .env.github and will not be committed to the repository.${NC}"
  
  # Test the token
  echo -e "Testing token..."
  export GITHUB_TOKEN="$github_token"
  if ! git ls-remote https://${GITHUB_TOKEN}@github.com/${GIT_USERNAME}/${REPO_NAME}.git > /dev/null 2>&1; then
    echo -e "${RED}Token test failed. Please check if the token is valid and has the required permissions.${NC}"
  else
    echo -e "${GREEN}Token test successful!${NC}"
  fi
}

# Generate commit message and commit changes
commit_changes() {
  print_header
  print_section "Committing changes"
  
  # Check if there are changes to commit
  if [[ -z $(git status -s) ]]; then
    echo -e "${YELLOW}No changes to commit.${NC}"
    return 0
  fi
  
  # List changes
  echo -e "${YELLOW}Changes to commit:${NC}"
  git status -s
  
  # Get component name
  read -p "Enter component/module name (leave blank for default): " component_name
  
  # Get commit type
  echo -e "Select commit type:"
  echo -e "  1) feat    - New feature"
  echo -e "  2) fix     - Bug fix"
  echo -e "  3) docs    - Documentation"
  echo -e "  4) style   - Formatting"
  echo -e "  5) refactor - Refactoring"
  echo -e "  6) perf    - Performance improvement"
  echo -e "  7) test    - Tests"
  echo -e "  8) chore   - Maintenance"
  echo -e "  9) build   - Build system"
  echo -e "  0) custom  - Enter custom message"
  read -p "Select type (0-9, default=8): " commit_type_num
  
  # Map number to type
  case "$commit_type_num" in
    1) commit_type="feat" ;;
    2) commit_type="fix" ;;
    3) commit_type="docs" ;;
    4) commit_type="style" ;;
    5) commit_type="refactor" ;;
    6) commit_type="perf" ;;
    7) commit_type="test" ;;
    9) commit_type="build" ;;
    0) commit_type="custom" ;;
    *) commit_type="chore" ;;
  esac
  
  # Generate or get custom message
  if [ "$commit_type" == "custom" ]; then
    read -p "Enter custom commit message: " commit_message
  else
    commit_message=$(generate_commit_message "$component_name" "$commit_type")
  fi
  
  # Confirm commit
  echo -e "About to commit with message: ${YELLOW}$commit_message${NC}"
  read -p "Proceed with commit? (y/n) " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Commit cancelled.${NC}"
    return 0
  fi
  
  # Perform commit
  git add .
  git commit -m "$commit_message"
  
  # Ask about pushing
  read -p "Push changes to remote repository? (y/n) " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push origin $(git rev-parse --abbrev-ref HEAD)
    echo -e "${GREEN}Changes committed and pushed!${NC}"
  else
    echo -e "${GREEN}Changes committed locally. Don't forget to push later.${NC}"
  fi
}

# Update or reset .gitignore file
update_gitignore() {
  print_header
  print_section "Updating .gitignore file"
  
  # Check for reset flag
  if [[ "$1" == "--reset" ]]; then
    echo -e "${YELLOW}Resetting .gitignore to default...${NC}"
    setup_gitignore
    return 0
  fi
  
  # Check if .gitignore exists
  if [ ! -f ".gitignore" ]; then
    echo -e "${YELLOW}.gitignore not found. Creating default...${NC}"
    setup_gitignore
    return 0
  fi
  
  # Show options
  echo -e "Select an action:"
  echo -e "  1) Add entries to .gitignore"
  echo -e "  2) Reset to default .gitignore"
  echo -e "  3) View current .gitignore"
  read -p "Select option (1-3): " gitignore_option
  
  case "$gitignore_option" in
    1)
      echo -e "${YELLOW}Enter patterns to add to .gitignore (one per line, empty line to finish):${NC}"
      while true; do
        read -p "> " pattern
        if [ -z "$pattern" ]; then
          break
        fi
        echo "$pattern" >> .gitignore
      done
      echo -e "${GREEN}Patterns added to .gitignore${NC}"
      ;;
    2)
      setup_gitignore
      ;;
    3)
      echo -e "${YELLOW}Current .gitignore:${NC}"
      cat .gitignore
      ;;
    *)
      echo -e "${RED}Invalid option.${NC}"
      ;;
  esac
}

# Check configuration and repository structure
check_configuration() {
  print_header
  print_section "Checking configuration and repository structure"
  
  # 1. Check package.json
  echo -e "Checking package.json..."
  if [ -f "package.json" ]; then
    HOMEPAGE=$(node -e "console.log(require('./package.json').homepage || 'Not set')")
    PREDEPLOY=$(node -e "console.log(require('./package.json').scripts?.predeploy || 'Not set')")
    DEPLOY=$(node -e "console.log(require('./package.json').scripts?.deploy || 'Not set')")
    
    echo -e "  Homepage: ${YELLOW}${HOMEPAGE}${NC}"
    echo -e "  Predeploy script: ${YELLOW}${PREDEPLOY}${NC}"
    echo -e "  Deploy script: ${YELLOW}${DEPLOY}${NC}"
    
    if [[ "$HOMEPAGE" == "Not set" ]]; then
      echo -e "  ${RED}✘ Homepage not set${NC}"
    else
      echo -e "  ${GREEN}✓ Homepage is set${NC}"
    fi
    
    if [[ "$PREDEPLOY" == "Not set" ]] || [[ "$DEPLOY" == "Not set" ]]; then
      echo -e "  ${RED}✘ Deployment scripts not set${NC}"
    else
      echo -e "  ${GREEN}✓ Deployment scripts are set${NC}"
    fi
  else
    echo -e "${RED}package.json not found!${NC}"
  fi
  
  # 2. Check environment files
  echo -e "\nChecking environment files..."
  if [ -f ".env.production" ]; then
    PUBLIC_URL=$(grep -o 'PUBLIC_URL=.*' .env.production || echo "Not set")
    echo -e "  .env.production: ${YELLOW}${PUBLIC_URL}${NC}"
    
    if [[ "$PUBLIC_URL" == "Not set" ]]; then
      echo -e "  ${RED}✘ PUBLIC_URL not set in .env.production${NC}"
    else
      echo -e "  ${GREEN}✓ PUBLIC_URL is set in .env.production${NC}"
    fi
  else
    echo -e "  ${RED}✘ .env.production not found${NC}"
  fi
  
  # 3. Check .nojekyll
  echo -e "\nChecking .nojekyll..."
  if [ -f ".nojekyll" ]; then
    echo -e "  ${GREEN}✓ .nojekyll exists${NC}"
  else
    echo -e "  ${RED}✘ .nojekyll not found${NC}"
  fi
  
  # 4. Check git branches
  echo -e "\nChecking git branches..."
  SOURCE_EXISTS=$(git show-ref --verify --quiet refs/heads/$SOURCE_BRANCH && echo "Yes" || echo "No")
  DEPLOYMENT_EXISTS=$(git show-ref --verify --quiet refs/heads/$DEPLOYMENT_BRANCH && echo "Yes" || echo "No")
  
  echo -e "  Source branch (${SOURCE_BRANCH}): ${SOURCE_EXISTS == 'Yes' ? GREEN + '✓ Exists' : RED + '✘ Does not exist'}${NC}"
  echo -e "  Deployment branch (${DEPLOYMENT_BRANCH}): ${DEPLOYMENT_EXISTS == 'Yes' ? GREEN + '✓ Exists' : RED + '✘ Does not exist'}${NC}"
  
  # 5. Check required directories
  echo -e "\nChecking required directories..."
  [ -d "src" ] && echo -e "  ${GREEN}✓ src directory exists${NC}" || echo -e "  ${RED}✘ src directory not found${NC}"
  [ -d "public" ] && echo -e "  ${GREEN}✓ public directory exists${NC}" || echo -e "  ${RED}✘ public directory not found${NC}"
  [ -d "node_modules" ] && echo -e "  ${GREEN}✓ node_modules directory exists${NC}" || echo -e "  ${YELLOW}⚠ node_modules directory not found (run npm install)${NC}"
  
  # 6. Check dependencies
  echo -e "\nChecking required dependencies..."
  GH_PAGES_INSTALLED=$(npm list gh-pages --depth=0 2>/dev/null | grep -q "gh-pages" && echo "Yes" || echo "No")
  echo -e "  gh-pages package: ${GH_PAGES_INSTALLED == 'Yes' ? GREEN + '✓ Installed' : RED + '✘ Not installed'}${NC}"
  
  echo -e "\n${GREEN}Configuration check complete!${NC}"
  if [[ "$HOMEPAGE" == "Not set" ]] || [[ "$PREDEPLOY" == "Not set" ]] || [[ "$DEPLOY" == "Not set" ]] || [[ "$PUBLIC_URL" == "Not set" ]] || [ ! -f ".nojekyll" ] || [ "$SOURCE_EXISTS" == "No" ] || [ "$GH_PAGES_INSTALLED" == "No" ]; then
    echo -e "${YELLOW}Some items need to be fixed. Run the setup command to fix them:${NC}"
    echo -e "  $0 setup"
  fi
}

# Verify deployment
verify_deployment() {
  print_header
  print_section "Verifying deployment on GitHub Pages"
  
  # 1. Get homepage URL
  HOMEPAGE=$(node -e "console.log(require('./package.json').homepage || 'Not set')")
  if [[ "$HOMEPAGE" == "Not set" ]]; then
    echo -e "${RED}Homepage not set in package.json. Cannot verify deployment.${NC}"
    exit 1
  fi
  
  # 2. Check if curl is installed
  if ! command -v curl &> /dev/null; then
    echo -e "${RED}curl command not found. Cannot verify deployment.${NC}"
    echo -e "${YELLOW}Please check manually by visiting:${NC} ${HOMEPAGE}"
    exit 1
  fi
  
  # 3. Try to fetch the homepage
  echo -e "Attempting to fetch ${YELLOW}${HOMEPAGE}${NC}..."
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $HOMEPAGE)
  
  if [ "$HTTP_STATUS" -eq 200 ]; then
    echo -e "${GREEN}✓ Site is accessible (HTTP 200 OK)${NC}"
  else
    echo -e "${RED}✘ Site returned HTTP status ${HTTP_STATUS}${NC}"
    echo -e "${YELLOW}This could be due to:${NC}"
    echo -e "  - Deployment is still in progress (wait a few minutes)"
    echo -e "  - GitHub Pages is not enabled for this repository"
    echo -e "  - The repository name or homepage URL is incorrect"
    echo -e "  - The gh-pages branch does not exist or is empty"
  fi
  
  # 4. Check if index.html exists in deployment branch
  echo -e "\nChecking deployment branch (${DEPLOYMENT_BRANCH})..."
  git fetch origin $DEPLOYMENT_BRANCH:$DEPLOYMENT_BRANCH 2>/dev/null || (echo -e "${RED}Cannot fetch ${DEPLOYMENT_BRANCH} branch${NC}" && exit 1)
  
  # Save current branch
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  
  # Temporarily switch to deployment branch
  git checkout $DEPLOYMENT_BRANCH
  
  if [ -f "index.html" ]; then
    echo -e "${GREEN}✓ index.html exists in ${DEPLOYMENT_BRANCH} branch${NC}"
    INDEX_SIZE=$(wc -c < index.html)
    echo -e "  Size: ${INDEX_SIZE} bytes"
    
    if [ $INDEX_SIZE -lt 100 ]; then
      echo -e "  ${RED}⚠ index.html seems too small, might be incomplete${NC}"
    fi
  else
    echo -e "${RED}✘ index.html not found in ${DEPLOYMENT_BRANCH} branch${NC}"
  fi
  
  # Check for static directory
  if [ -d "static" ]; then
    echo -e "${GREEN}✓ static directory exists${NC}"
  else
    echo -e "${RED}✘ static directory not found${NC}"
  fi
  
  # Check for .nojekyll
  if [ -f ".nojekyll" ]; then
    echo -e "${GREEN}✓ .nojekyll exists${NC}"
  else
    echo -e "${RED}✘ .nojekyll not found${NC}"
  fi
  
  # Return to original branch
  git checkout $CURRENT_BRANCH
  
  echo -e "\n${GREEN}Verification complete!${NC}"
  echo -e "Your site should be available at: ${YELLOW}${HOMEPAGE}${NC}"
  echo -e "If you're experiencing issues, check the GitHub Pages settings in your repository settings."
}

# Start development server
start_dev_server() {
  print_header
  print_section "Starting development server"
  
  # Check branch
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  if [ "$CURRENT_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo -e "${YELLOW}You are not on the source branch ($SOURCE_BRANCH).${NC}"
    read -p "Switch to $SOURCE_BRANCH? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      git checkout $SOURCE_BRANCH
    else
      echo -e "${RED}Operation cancelled.${NC}"
      exit 1
    fi
  fi
  
  # Check if node_modules exists
  if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}node_modules not found. Installing dependencies...${NC}"
    npm install
  fi
  
  # Start development server
  echo -e "Starting development server..."
  npm start
}

# Main function to handle commands
main() {
  # Check for direct arguments (one-liners)
  if [[ "$1" == "1liner" ]]; then
    shift
    case "$1" in
      deploy)
        # One-liner for deployment
        load_github_token
        configure_git_with_token
        git checkout $SOURCE_BRANCH && git pull origin $SOURCE_BRANCH
        HOMEPAGE_URL="https://${GIT_USERNAME}.github.io/${REPO_NAME}"
        node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('./package.json'));p.homepage='${HOMEPAGE_URL}';fs.writeFileSync('./package.json',JSON.stringify(p,null,2));"
        echo "PUBLIC_URL=/${REPO_NAME}" > .env.production
        npm ci && npm run build
        touch build/.nojekyll
        npx gh-pages -d build -m "Automatic deployment $(date +%Y-%m-%d_%H-%M-%S)"
        echo "Deployment complete! Site available at ${HOMEPAGE_URL}"
        exit 0
        ;;
      check)
        # One-liner for quick check
        echo "Homepage: $(node -e "console.log(require('./package.json').homepage || 'Not set')")"
        echo "PUBLIC_URL: $(grep -o 'PUBLIC_URL=.*' .env.production 2>/dev/null || echo 'Not set')"
        echo "Current branch: $(git rev-parse --abbrev-ref HEAD)"
        echo "gh-pages installed: $(npm list gh-pages --depth=0 2>/dev/null | grep -q "gh-pages" && echo "Yes" || echo "No")"
        exit 0
        ;;
      clean)
        # One-liner for cleaning
        rm -rf build node_modules/.cache
        git checkout $SOURCE_BRANCH
        echo "Cleaned build and cache directories"
        exit 0
        ;;
    esac
  fi

  # Regular command handling
  case "$1" in
    setup|init)
      setup_project
      ;;
    clean)
      clean_project
      ;;
    organize)
      organize_project
      ;;
    deploy)
      deploy_project
      ;;
    check)
      check_configuration
      ;;
    verify)
      verify_deployment
      ;;
    reset)
      shift
      reset_branch "$@"
      ;;
    revert)
      revert_deployment
      ;;
    sync)
      sync_branches
      ;;
    token)
      configure_token
      ;;
    commit)
      shift
      commit_changes "$@"
      ;;
    gitignore)
      shift
      update_gitignore "$@"
      ;;
    dev|start)
      start_dev_server
      ;;
    help|--help|-h)
      show_help
      ;;
    *)
      show_help
      ;;
  esac
}

# Execute main function with all arguments
main "$@"

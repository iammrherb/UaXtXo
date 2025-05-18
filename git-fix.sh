#!/bin/bash

# =============================================
# Portnox TCO Analyzer - Fixed Git Initialization Script
# =============================================
# 
# This script properly handles new Git repositories and fixes the "no initial commit" error

# Set color variables for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration variables - Customize as needed
REPO_PATH="$(pwd)"
MAIN_BRANCH="main"
DEV_BRANCH="development"
BACKUP_DIR="${REPO_PATH}/backups/$(date +%Y%m%d_%H%M%S)"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Print header
echo -e "${BLUE}============================================"
echo -e "Portnox TCO Analyzer - Fixed Git Initialization"
echo -e "============================================${NC}"

# Function to handle errors
handle_error() {
    echo -e "${RED}ERROR: $1${NC}"
    echo -e "${YELLOW}Please check the error message and try again.${NC}"
    exit 1
}

# Function to backup critical files
backup_critical_files() {
    echo -e "${GREEN}Creating backups of critical files...${NC}"
    if [ -f package.json ]; then
        cp package.json "${BACKUP_DIR}/package.json" || handle_error "Failed to backup package.json"
    fi
    
    if [ -f package-lock.json ]; then
        cp package-lock.json "${BACKUP_DIR}/package-lock.json" || handle_error "Failed to backup package-lock.json"
    fi
    
    # Backup src directory if it exists
    if [ -d "src" ]; then
        echo "Backing up src directory..."
        cp -r src "${BACKUP_DIR}/src" || handle_error "Failed to backup src directory"
    fi
    
    echo -e "${GREEN}Backups created successfully at ${BACKUP_DIR}${NC}"
}

# Function to verify/initialize Git repository
initialize_git_repo() {
    echo -e "${GREEN}Checking for Git repository...${NC}"
    if [ ! -d .git ]; then
        echo -e "${YELLOW}Not a Git repository. Initializing new repository...${NC}"
        git init || handle_error "Failed to initialize Git repository"
        
        # Create a .gitignore file
        echo -e "${GREEN}Creating standard React .gitignore file...${NC}"
        cat > .gitignore << 'EOF'
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
.env

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE specific files
.idea/
.vscode/
*.swp
*.swo

# Backup files
/backups/
EOF
        
        # Create initial commit
        echo -e "${GREEN}Creating initial commit...${NC}"
        git add .gitignore
        git commit -m "Initial commit: Add .gitignore" || handle_error "Failed to create initial commit"
        
        # Ask for remote repository
        read -p "Do you want to connect to a remote repository? (y/n): " connect_remote
        if [ "$connect_remote" = "y" ]; then
            read -p "Enter remote URL (e.g., https://github.com/username/repo.git): " remote_url
            git remote add origin "$remote_url" || handle_error "Failed to add remote"
            echo -e "${GREEN}Remote repository added successfully.${NC}"
        fi
    else
        echo -e "${GREEN}Git repository already initialized.${NC}"
        
        # Check if there are any commits
        if ! git rev-parse --verify HEAD &>/dev/null; then
            echo -e "${YELLOW}No commits found. Creating initial commit...${NC}"
            
            # Ensure .gitignore exists
            if [ ! -f ".gitignore" ]; then
                echo -e "${GREEN}Creating standard React .gitignore file...${NC}"
                cat > .gitignore << 'EOF'
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
.env

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE specific files
.idea/
.vscode/
*.swp
*.swo

# Backup files
/backups/
EOF
            fi
            
            git add .gitignore
            git commit -m "Initial commit: Add .gitignore" || handle_error "Failed to create initial commit"
        fi
    fi
}

# Function to setup remote if needed
setup_remote() {
    # Check if remote is already configured
    if ! git remote -v | grep -q origin; then
        echo -e "${YELLOW}No remote repository configured.${NC}"
        read -p "Do you want to add a remote repository? (y/n): " add_remote
        if [ "$add_remote" = "y" ]; then
            read -p "Enter remote URL (e.g., https://github.com/username/repo.git): " remote_url
            git remote add origin "$remote_url" || handle_error "Failed to add remote"
            echo -e "${GREEN}Remote repository added successfully.${NC}"
        fi
    else
        echo -e "${GREEN}Remote repository already configured.${NC}"
        git fetch --all || echo -e "${YELLOW}Warning: Failed to fetch from remote. Continuing...${NC}"
    fi
}

# Function to setup branch
setup_branch() {
    # Get current branch
    local current_branch=$(git rev-parse --abbrev-ref HEAD)
    echo -e "Current branch: ${YELLOW}${current_branch}${NC}"
    
    # Ask if user wants to switch branches
    read -p "Do you want to switch to a different branch? (y/n): " switch_branch
    if [ "$switch_branch" = "y" ]; then
        read -p "Enter branch name ($MAIN_BRANCH/$DEV_BRANCH/other): " branch_name
        
        # Check if branch exists locally
        if git show-ref --quiet refs/heads/"$branch_name"; then
            git checkout "$branch_name" || handle_error "Failed to checkout $branch_name"
        else
            # Check if branch exists on remote
            if git remote -v | grep -q origin && git ls-remote --exit-code origin "$branch_name" &>/dev/null; then
                echo -e "${GREEN}Creating local branch $branch_name tracking remote...${NC}"
                git checkout -b "$branch_name" --track origin/"$branch_name" || {
                    echo -e "${YELLOW}Failed to track remote. Creating local branch only...${NC}"
                    git checkout -b "$branch_name" || handle_error "Failed to create $branch_name"
                }
            else
                # Create new branch
                echo -e "${YELLOW}Branch $branch_name doesn't exist. Creating it...${NC}"
                git checkout -b "$branch_name" || handle_error "Failed to create $branch_name"
            fi
        fi
        
        echo -e "${GREEN}Successfully switched to branch: $branch_name${NC}"
    fi
}

# Function to add project files to Git
add_project_files() {
    echo -e "${GREEN}Adding project files to Git...${NC}"
    
    # Check if we have any files to commit
    if [ -n "$(git status --porcelain | grep -v '\.gitignore')" ]; then
        echo -e "${GREEN}Committing project files...${NC}"
        git add .
        git commit -m "Add Portnox TCO Analyzer project files" || handle_error "Failed to commit project files"
        echo -e "${GREEN}Project files committed successfully.${NC}"
        
        # Check if we should push to remote
        if git remote -v | grep -q origin; then
            read -p "Do you want to push to remote repository? (y/n): " push_remote
            if [ "$push_remote" = "y" ]; then
                local current_branch=$(git rev-parse --abbrev-ref HEAD)
                git push -u origin "$current_branch" || handle_error "Failed to push to remote"
                echo -e "${GREEN}Successfully pushed to remote repository.${NC}"
            fi
        fi
    else
        echo -e "${YELLOW}No project files to commit.${NC}"
    fi
}

# Function to update dependencies if needed
update_dependencies() {
    read -p "Do you want to update project dependencies? (y/n): " update_deps
    if [ "$update_deps" = "y" ]; then
        echo -e "${GREEN}Updating dependencies...${NC}"
        
        # Install TypeScript first to avoid MODULE_NOT_FOUND errors
        echo "Ensuring TypeScript is installed..."
        npm install --save-dev typescript@4.9.5 || handle_error "Failed to install TypeScript"
        
        # Install core React dependencies
        echo "Installing core React dependencies..."
        npm install --save react@17.0.2 react-dom@17.0.2 react-scripts@5.0.1 --legacy-peer-deps || handle_error "Failed to install core React dependencies"
        
        # Install testing libraries
        echo "Installing TypeScript types and testing libraries..."
        npm install --save-dev @types/jest @types/node @types/react @types/react-dom \
                            @testing-library/react @testing-library/jest-dom @testing-library/user-event \
                            --legacy-peer-deps || handle_error "Failed to install TypeScript types and testing libraries"
        
        echo -e "${GREEN}Dependencies updated successfully${NC}"
    fi
}

# Main execution flow
backup_critical_files
initialize_git_repo
setup_remote
setup_branch
add_project_files
update_dependencies

echo -e "${GREEN}============================================"
echo -e "Portnox TCO Analyzer Git setup completed successfully!"
echo -e "============================================${NC}"
echo -e "Next steps:"
echo -e "1. Customize your project files"
echo -e "2. Run 'npm start' to start the development server"
echo -e "3. Continue development on your current branch"
echo -e "${GREEN}============================================${NC}"

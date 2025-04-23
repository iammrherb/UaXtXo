#!/bin/bash

# Enhanced TCO Calculator Deployment Script
# This script handles the complete deployment of the TCO Calculator application

# Set strict error handling
set -e
set -o pipefail

# Colors for output
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
BLUE="\033[0;34m"
NC="\033[0m" # No Color

# Log function
log() {
  echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

# Success function
success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Warning function
warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Error function
error() {
  echo -e "${RED}[ERROR]${NC} $1"
  exit 1
}

# Configuration variables
DEPLOY_DIR="dist"
REPO_URL="https://github.com/iammrherb/UaXtXo.git"
BRANCH="main"
TEMP_DIR="/tmp/tco-calculator-deploy"

# Ensure clean working environment
cleanup() {
  log "Cleaning up temporary files..."
  rm -rf "$TEMP_DIR"
  success "Cleanup completed."
}

# Make sure cleanup happens even if script fails
trap cleanup EXIT

# Display banner
display_banner() {
  echo -e "\n${GREEN}=================================${NC}"
  echo -e "${GREEN}  TCO Calculator Deployment Tool  ${NC}"
  echo -e "${GREEN}=================================${NC}\n"
}

# Validate dependencies
check_dependencies() {
  log "Checking required dependencies..."
  
  for cmd in git npm node uglifyjs sass; do
    if ! command -v "$cmd" &> /dev/null; then
      if [ "$cmd" = "uglifyjs" ]; then
        warning "UglifyJS not found. Installing UglifyJS..."
        npm install -g uglify-js
      elif [ "$cmd" = "sass" ]; then
        warning "Sass not found. Installing Sass..."
        npm install -g sass
      else
        error "$cmd is required but not installed. Please install it and try again."
      fi
    fi
  done
  
  # Check Node.js version
  NODE_VERSION=$(node -v | cut -d 'v' -f 2)
  REQUIRED_VERSION="14.0.0"
  
  if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    warning "Node.js version $NODE_VERSION may be too old. Version $REQUIRED_VERSION or newer recommended."
  fi
  
  success "All dependencies verified."
}

# Clone or update repo
prepare_source() {
  log "Preparing source code..."
  
  mkdir -p "$TEMP_DIR"
  
  if [ -d "$TEMP_DIR/.git" ]; then
    log "Repository exists, updating..."
    cd "$TEMP_DIR"
    git fetch --all
    git reset --hard "origin/$BRANCH"
  else
    log "Cloning repository..."
    git clone --branch "$BRANCH" "$REPO_URL" "$TEMP_DIR"
    cd "$TEMP_DIR"
  fi
  
  # Create empty dist directory or clean it if it exists
  mkdir -p "$DEPLOY_DIR"
  rm -rf "$DEPLOY_DIR"/*
  
  success "Source code prepared."
}

# Fix any known issues in the codebase
fix_known_issues() {
  log "Applying fixes for known issues..."
  
  # Fix missing image placeholders
  log "Setting up image placeholders..."
  mkdir -p img
  if [ ! -f "img/portnox-logo.png" ]; then
    # Create a placeholder for missing logo
    echo "Creating placeholder for Portnox logo"
    
    # Use base64 encoded minimal transparent PNG if available
    if command -v base64 &> /dev/null; then
      echo "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QQQEwkR9qreen6lrQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAADDUlEQVR4nO3UMQEAIAzAMMC/5+GiHCQKenXPzAKOTmA+S0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQIyS0BmCcgsAZklILMEZJaAzBKQWQL+bAELEgPhJ3CYQAAAAABJRU5ErkJggg==" | base64 -d > img/portnox-logo.png
    fi
    
    # Same for other missing logos
    for logo in "cisco-logo.png" "aruba-logo.png" "forescout-logo.png" "microsoft-logo.png"; do
      if [ ! -f "img/$logo" ]; then
        cp img/portnox-logo.png "img/$logo" 2>/dev/null || echo "Creating placeholder for $logo"
      fi
    done
  fi

  # Fix JavaScript reference issues
  log "Checking JavaScript references..."
  
  # Ensure vendorData is correctly referenced
  grep -l "vendorData\[" js/components/calculator.js &>/dev/null || \
    sed -i 's/window.vendorData\[/vendorData\[/g' js/components/calculator.js
  
  # Fix issue with Chart.js initialization in chart-builder.js
  if grep -q "getContext('2d')" js/charts/chart-builder.js; then
    log "Fixing Chart.js initialization issues..."
    # Use a more robust approach with a temporary file
    cat js/charts/chart-builder.js | sed 's/getElementById([^)]*)\\.getContext([^)]*)/getElementById(&)/g' > js/charts/chart-builder.js.tmp
    mv js/charts/chart-builder.js.tmp js/charts/chart-builder.js
    
    # Add proper context checking
    sed -i 's/if (!ctx) return;/if (!ctx || !ctx.getContext) return; const ctxCanvas = ctx.getContext("2d"); if (!ctxCanvas) return;/g' js/charts/chart-builder.js
    
    # Fix error handling for chart context
    sed -i 's/const ctx = document.getElementById.*getContext(.2d.);/const ctx = document.getElementById(.*); if (!ctx) return;/g' js/charts/chart-builder.js
  fi
  
  # Fix missing emoji issues in vendor-data.js
  if grep -q "icon: \"??\"" js/vendors/vendor-data.js; then
    log "Fixing missing emoji icons..."
    sed -i 's/icon: "??"/icon: "??"/g' js/vendors/vendor-data.js
    sed -i 's/icon: "??"/icon: "??"/2' js/vendors/vendor-data.js
    sed -i 's/icon: "??"/icon: "??"/3' js/vendors/vendor-data.js
    sed -i 's/icon: "??"/icon: "??"/4' js/vendors/vendor-data.js
    sed -i 's/icon: "??"/icon: "??"/5' js/vendors/vendor-data.js
    sed -i 's/icon: "??"/icon: "??"/6' js/vendors/vendor-data.js
  fi
  
  success "Fixed known issues."
}

# Process and optimize CSS
optimize_css() {
  log "Optimizing CSS..."
  
  mkdir -p "$DEPLOY_DIR/css"
  
  if command -v sass &> /dev/null; then
    # If SASS is available, process the CSS
    sass --style compressed css/styles.css "$DEPLOY_DIR/css/styles.min.css"
  else
    # Otherwise, just minify the existing CSS
    cat css/styles.css | sed 's/\/\*.*\*\///g' | sed 's/[[:space:]]\+/ /g' > "$DEPLOY_DIR/css/styles.min.css"
  fi
  
  # Copy the original CSS for reference
  cp css/styles.css "$DEPLOY_DIR/css/styles.css"
  
  success "CSS files processed."
}

# Process and optimize JavaScript files
optimize_js() {
  log "Optimizing JavaScript files..."
  
  # Create necessary directories
  mkdir -p "$DEPLOY_DIR/js/components"
  mkdir -p "$DEPLOY_DIR/js/vendors"
  mkdir -p "$DEPLOY_DIR/js/charts"
  mkdir -p "$DEPLOY_DIR/js/utils"
  
  # First, copy all JS files to the dist directory
  cp js/utils/helpers.js "$DEPLOY_DIR/js/utils/"
  cp js/vendors/vendor-data.js "$DEPLOY_DIR/js/vendors/"
  cp js/components/ui-controller.js "$DEPLOY_DIR/js/components/"
  cp js/components/calculator.js "$DEPLOY_DIR/js/components/"
  cp js/charts/chart-builder.js "$DEPLOY_DIR/js/charts/"
  cp js/main.js "$DEPLOY_DIR/js/"
  
  # Bundle and minify javascript files if UglifyJS is available
  if command -v uglifyjs &> /dev/null; then
    log "Creating minified bundle..."
    
    # Create bundle file by concatenating all JS files in correct order
    cat js/utils/helpers.js \
        js/vendors/vendor-data.js \
        js/components/ui-controller.js \
        js/charts/chart-builder.js \
        js/components/calculator.js \
        js/main.js > "$DEPLOY_DIR/js/bundle.js"
    
    # Minify the bundle
    uglifyjs "$DEPLOY_DIR/js/bundle.js" -c -m -o "$DEPLOY_DIR/js/bundle.min.js"
  fi
  
  success "JavaScript files processed."
}

# Copy HTML and other assets
copy_assets() {
  log "Copying HTML and other assets..."
  
  # Copy HTML files
  cp index.html "$DEPLOY_DIR/"
  
  # Create an optimized index-min.html that uses the bundled JS if available
  if [ -f "$DEPLOY_DIR/js/bundle.min.js" ]; then
    cat index.html | sed 's|<script src="js/utils/helpers.js"></script>||g' \
                   | sed 's|<script src="js/vendors/vendor-data.js"></script>||g' \
                   | sed 's|<script src="js/components/ui-controller.js"></script>||g' \
                   | sed 's|<script src="js/charts/chart-builder.js"></script>||g' \
                   | sed 's|<script src="js/components/calculator.js"></script>||g' \
                   | sed 's|<script src="js/main.js"></script>|<script src="js/bundle.min.js"></script>|g' \
                   | sed 's|css/styles.css|css/styles.min.css|g' \
                   > "$DEPLOY_DIR/index-min.html"
    
    # Make the minified version the default
    mv "$DEPLOY_DIR/index-min.html" "$DEPLOY_DIR/index.html"
    cp index.html "$DEPLOY_DIR/index-full.html"
  fi
  
  # Copy images
  mkdir -p "$DEPLOY_DIR/img"
  cp -r img/* "$DEPLOY_DIR/img/" 2>/dev/null || log "No images to copy"
  
  # Copy any other necessary files
  if [ -f "favicon.ico" ]; then
    cp favicon.ico "$DEPLOY_DIR/"
  fi
  
  # Copy README and other documentation
  cp README.md "$DEPLOY_DIR/" 2>/dev/null || echo "No README file found"
  
  success "Assets copied."
}

# Validate the build
validate_build() {
  log "Validating build..."
  
  # Check if critical files exist
  for file in "index.html" "css/styles.min.css" "js/bundle.min.js" "img/portnox-logo.png"; do
    if [ ! -f "$DEPLOY_DIR/$file" ]; then
      warning "Missing critical file: $file"
    fi
  done
  
  # Check for JavaScript errors (simplified check)
  if [ -f "$DEPLOY_DIR/js/bundle.js" ]; then
    if grep -q "Error" "$DEPLOY_DIR/js/bundle.js"; then
      warning "Potential JavaScript errors found in bundle"
    fi
  fi
  
  success "Build validation completed."
}

# Deploy to GitHub Pages
deploy_to_github() {
  log "Preparing to deploy to GitHub Pages..."
  
  # Check if we're in a git repository
  if [ ! -d .git ] && [ -z "$GITHUB_TOKEN" ]; then
    warning "Not in a git repository or missing GitHub token. Skipping GitHub Pages deployment."
    return
  fi
  
  # Save current branch name
  CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || echo "detached")
  log "Current branch: $CURRENT_BRANCH"
  
  # Create or clear the gh-pages branch
  if [ -n "$GITHUB_TOKEN" ]; then
    # GitHub Actions deployment
    log "Setting up GitHub Actions deployment..."
    
    # Configure git
    git config --global user.name "GitHub Actions Bot"
    git config --global user.email "actions@github.com"
    
    # Create a new branch for the deployment
    cd "$DEPLOY_DIR"
    git init
    git add .
    git commit -m "Deploy to GitHub Pages"
    
    # Push to GitHub Pages using the token
    git push --force "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" main:gh-pages
  else
    # Local deployment
    log "Setting up local deployment..."
    
    # Ensure gh-pages branch exists
    if ! git rev-parse --verify gh-pages >/dev/null 2>&1; then
      git checkout --orphan gh-pages
      git rm -rf .
      touch README.md
      git add README.md
      git commit -m "Initial gh-pages branch"
      git push origin gh-pages
      
      # Go back to original branch
      if [ "$CURRENT_BRANCH" != "detached" ]; then
        git checkout "$CURRENT_BRANCH" || {
          warning "Could not return to $CURRENT_BRANCH branch, trying to find default branch"
          # Try to detect default branch and check it out
          if git show-ref --verify --quiet refs/heads/main; then
            git checkout main
          elif git show-ref --verify --quiet refs/heads/master; then
            git checkout master
          else
            warning "Could not determine default branch. You may need to checkout your working branch manually."
          fi
        }
      fi
    fi
    
    # Copy build files to gh-pages branch
    git checkout gh-pages
    git pull origin gh-pages
    
    # Remove all files except .git
    find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} \;
    
    # Copy all files from dist directory
    cp -R "$DEPLOY_DIR"/* .
    
    # Add, commit and push
    git add .
    git commit -m "Deploy TCO Calculator to GitHub Pages"
    git push origin gh-pages
    
    # Return to previous branch
    if [ "$CURRENT_BRANCH" != "detached" ]; then
      if ! git checkout "$CURRENT_BRANCH"; then
        warning "Could not return to $CURRENT_BRANCH branch, trying to find default branch"
        # Try to detect default branch and check it out
        if git show-ref --verify --quiet refs/heads/main; then
          git checkout main
        elif git show-ref --verify --quiet refs/heads/master; then
          git checkout master
        else
          warning "Could not determine default branch. You may need to checkout your working branch manually."
        fi
      fi
    else
      warning "Was in detached HEAD state, cannot return to previous state automatically."
    fi
  fi
  
  success "Deployed to GitHub Pages successfully."
}

# Create a simple development server for testing
create_dev_server() {
  log "Creating development server script..."
  
  cat > "$DEPLOY_DIR/server.js" << 'EOL'
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Normalize URL
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }
  
  // Get file extension
  const extname = path.extname(filePath);
  let contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page not found
        fs.readFile('./index.html', (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Error loading index.html');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Press Ctrl+C to stop`);
});
EOL
  
  # Create a convenience script to start the server
  cat > "$DEPLOY_DIR/start-server.sh" << 'EOL'
#!/bin/bash
node server.js
EOL
  
  chmod +x "$DEPLOY_DIR/start-server.sh"
  
  success "Development server created."
}

# Main function
main() {
  display_banner
  check_dependencies
  prepare_source
  fix_known_issues
  optimize_css
  optimize_js
  copy_assets
  validate_build
  
  # Create development server
  create_dev_server
  
  # Ask if user wants to deploy to GitHub Pages
  read -p "Do you want to deploy to GitHub Pages? (y/n): " deploy_choice
  if [ "$deploy_choice" = "y" ] || [ "$deploy_choice" = "Y" ]; then
    deploy_to_github
  fi
  
  success "TCO Calculator has been successfully built to the 'dist' directory."
  echo -e "\n${GREEN}To test locally:${NC}"
  echo -e "  cd $DEPLOY_DIR"
  echo -e "  ./start-server.sh"
  echo -e "  Then open ${BLUE}http://localhost:8080${NC} in your browser\n"
}

# Execute main function
main
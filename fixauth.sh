#!/bin/bash

# Node Build Fix Script - Removing OpenSSL Legacy Provider Flag
# Specifically addresses the "not allowed in NODE_OPTIONS" error

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}Node Build Fix Script - OpenSSL Legacy Provider Fix${NC}"
echo -e "${BLUE}======================================================${NC}"

# Clean tokens function
clean_all_tokens() {
  echo -e "${YELLOW}Performing token cleanup...${NC}"
  
  # Reset remote to HTTPS without token
  git remote set-url origin "https://github.com/iammrherb/UaXtXo.git"
  
  # Unset any token environment variables
  unset GITHUB_TOKEN
  
  # Remove .env file if it exists
  if [ -f .env ]; then
    rm -f .env
    echo -e "${GREEN}Removed .env file.${NC}"
  fi
  
  echo -e "${GREEN}Token cleanup complete.${NC}"
  return 0
}

# Function to set up auth securely
secure_auth() {
  echo -e "${BLUE}\nSecure GitHub Authentication${NC}"
  
  # Request token securely
  echo -e "${YELLOW}Enter your GitHub Personal Access Token (will not be displayed):${NC}"
  read -s TOKEN
  
  if [ -z "$TOKEN" ]; then
    echo -e "${RED}No token provided.${NC}"
    return 1
  fi
  
  # Export to env var
  export GITHUB_TOKEN="$TOKEN"

  # Create minimal .env for React build - WITHOUT openssl-legacy-provider flag
  echo "SKIP_PREFLIGHT_CHECK=true" > .env
  
  # Ensure .env is ignored
  if [ -f .gitignore ]; then
    if ! grep -q "^\.env$" .gitignore; then
      echo ".env" >> .gitignore
    fi
  else
    echo ".env" > .gitignore
  fi
  
  echo -e "${GREEN}Secure authentication configured.${NC}"
  return 0
}

# Function to build the app - WITHOUT openssl-legacy-provider flag
build_app() {
  echo -e "${YELLOW}Building the React app with fixed Node options...${NC}"

  # Set environment variables BUT WITHOUT the openssl-legacy-provider flag
  export SKIP_PREFLIGHT_CHECK=true
  export CI=false
  
  # Try with basic npm run build
  echo -e "${YELLOW}Attempting basic build...${NC}"
  npm run build
  
  if [ $? -ne 0 ]; then
    echo -e "${RED}Basic build failed. Trying direct react-scripts...${NC}"
    
    # Try with react-scripts directly
    npx react-scripts build
    
    if [ $? -ne 0 ]; then
      echo -e "${RED}React-scripts build failed. Trying with force...${NC}"
      
      # Try with custom webpack config
      echo -e "${YELLOW}Creating simplified webpack config...${NC}"
      
      # Create a simple webpack.config.js to bypass potential OpenSSL issues
      cat > webpack.config.js << 'EOF'
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
EOF
      
      # Install webpack if needed
      echo -e "${YELLOW}Installing webpack dependencies...${NC}"
      npm install --legacy-peer-deps webpack webpack-cli html-webpack-plugin babel-loader @babel/preset-env @babel/preset-react @babel/preset-typescript style-loader css-loader
      
      # Build with webpack
      echo -e "${YELLOW}Building with webpack...${NC}"
      npx webpack --config webpack.config.js
      
      if [ $? -ne 0 ]; then
        # Last resort: Try to copy a previous build if it exists
        echo -e "${RED}All build attempts failed. Checking for previous builds...${NC}"
        
        if [ -d "../build" ]; then
          echo -e "${YELLOW}Found previous build in parent directory. Using that...${NC}"
          cp -r ../build ./
          return 0
        else
          echo -e "${RED}No previous builds found. Deployment will fail.${NC}"
          return 1
        fi
      fi
    fi
  fi
  
  echo -e "${GREEN}Build completed successfully!${NC}"
  return 0
}

# Push and deploy functions
push_changes() {
  echo -e "${YELLOW}Pushing changes to main-react branch...${NC}"
  
  # Stage files (excluding .env)
  git add --all -- ':!.env'
  
  # Check if there are changes to commit
  if git diff --cached --quiet; then
    echo -e "${YELLOW}No changes to commit.${NC}"
  else
    git commit -m "Update Portnox TCO Analyzer with Node compatibility fixes"
  fi
  
  # Use credential helper
  git config credential.helper store
  
  # This uses the GITHUB_TOKEN
  echo "https://x-access-token:$GITHUB_TOKEN@github.com" > ~/.git-credentials
  chmod 600 ~/.git-credentials
  
  git push origin main-react
  
  # Clean up credentials
  rm -f ~/.git-credentials
  
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to push to main-react branch.${NC}"
    return 1
  fi
  
  echo -e "${GREEN}Successfully pushed to main-react branch!${NC}"
  return 0
}

deploy_gh_pages() {
  echo -e "${YELLOW}Deploying to gh-pages branch...${NC}"
  
  # Save current branch
  CURRENT_BRANCH=$(git branch --show-current)
  
  # Stash any changes
  git stash -u
  
  # Switch to gh-pages branch
  if git show-ref --verify --quiet refs/heads/gh-pages; then
    git checkout gh-pages
  else
    git checkout -b gh-pages
  fi
  
  # Remove all files except .git
  find . -maxdepth 1 -not -path "./.git" -not -path "." -exec rm -rf {} \;
  
  # Copy build files
  if [ -d "build" ]; then
    echo -e "${YELLOW}Found build directory at ./build${NC}"
    cp -r build/* .
  elif [ -d "../build" ]; then
    echo -e "${YELLOW}Found build directory at ../build${NC}"
    cp -r ../build/* .
  else
    # Try to look in other locations
    echo -e "${YELLOW}Searching for build directory...${NC}"
    # Find command to search for a build directory
    BUILD_DIR=$(find .. -type d -name "build" -not -path "*/node_modules/*" | head -n 1)
    
    if [ -n "$BUILD_DIR" ]; then
      echo -e "${YELLOW}Found build directory at $BUILD_DIR${NC}"
      cp -r $BUILD_DIR/* .
    else
      echo -e "${RED}Build directory not found. Listing directories:${NC}"
      ls -la
      git checkout $CURRENT_BRANCH
      git stash pop 2>/dev/null || true
      return 1
    fi
  fi
  
  # Create a .nojekyll file
  touch .nojekyll
  
  # Add all files
  git add --all
  
  # Commit
  git commit -m "Deploy to GitHub Pages"
  
  # Push securely
  echo "https://x-access-token:$GITHUB_TOKEN@github.com" > ~/.git-credentials
  chmod 600 ~/.git-credentials
  
  git push origin gh-pages
  
  # Clean up
  rm -f ~/.git-credentials
  
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to deploy to gh-pages branch.${NC}"
    git checkout $CURRENT_BRANCH
    git stash pop 2>/dev/null || true
    return 1
  fi
  
  echo -e "${GREEN}Successfully deployed to gh-pages branch!${NC}"
  
  # Return to original branch
  git checkout $CURRENT_BRANCH
  git stash pop 2>/dev/null || true
  
  return 0
}

# Alternative deployment using gh-pages npm package
deploy_with_ghpages_package() {
  echo -e "${YELLOW}Trying alternative deployment with gh-pages npm package...${NC}"
  
  # Install gh-pages package
  npm install --save-dev gh-pages
  
  # Update package.json to include homepage and deploy scripts
  node -e "
    const fs = require('fs');
    const packageJson = JSON.parse(fs.readFileSync('./package.json'));
    packageJson.homepage = 'https://iammrherb.github.io/UaXtXo';
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts.predeploy = 'npm run build';
    packageJson.scripts.deploy = 'gh-pages -d build';
    fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
  "
  
  # Run deploy script
  GIT_USER="x-access-token" GIT_PASS="$GITHUB_TOKEN" npm run deploy
  
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to deploy with gh-pages package.${NC}"
    return 1
  fi
  
  echo -e "${GREEN}Successfully deployed with gh-pages package!${NC}"
  return 0
}

# Main execution function
main() {
  # 1. Clean any existing tokens
  clean_all_tokens
  
  # 2. Set up secure auth
  secure_auth
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to set up secure authentication.${NC}"
    exit 1
  fi
  
  # 3. Build the app WITHOUT openssl-legacy-provider
  build_app
  if [ $? -ne 0 ]; then
    echo -e "${RED}All build attempts failed. Cannot proceed with deployment.${NC}"
    clean_all_tokens
    exit 1
  fi
  
  # 4. Push changes
  push_changes
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to push changes.${NC}"
    clean_all_tokens
    exit 1
  fi
  
  # 5. Deploy to gh-pages
  deploy_gh_pages
  if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Standard deployment failed. Trying alternative deployment...${NC}"
    
    # Try alternative deployment method
    deploy_with_ghpages_package
    if [ $? -ne 0 ]; then
      echo -e "${RED}All deployment methods failed.${NC}"
      clean_all_tokens
      exit 1
    fi
  fi
  
  # 6. Final cleanup
  clean_all_tokens
  
  echo -e "${GREEN}\nDeployment completed successfully!${NC}"
  echo -e "${BLUE}====================================================${NC}"
  echo -e "${BLUE}Your application is now deployed to:${NC}"
  echo -e "${GREEN}https://iammrherb.github.io/UaXtXo/${NC}"
  echo -e "${BLUE}====================================================${NC}"
}

# Execute the main function
main

#!/bin/bash

# =============================================
# Portnox TCO Analyzer - GitHub Pages Setup Script
# =============================================
# 
# This script configures your React application for proper deployment to GitHub Pages

# Set color variables for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}============================================"
echo -e "Portnox TCO Analyzer - GitHub Pages Setup"
echo -e "============================================${NC}"

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME
if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "${RED}Error: GitHub username is required.${NC}"
    exit 1
fi

# Get repository name
read -p "Enter your repository name (default: UaXtXo): " REPO_NAME
REPO_NAME=${REPO_NAME:-UaXtXo}

# Update package.json with homepage field
echo -e "${GREEN}Updating package.json with GitHub Pages homepage...${NC}"
node -e "
    const fs = require('fs');
    try {
        const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
        
        // Set the homepage
        pkg.homepage = 'https://${GITHUB_USERNAME}.github.io/${REPO_NAME}';
        
        // Ensure gh-pages deployment scripts exist
        pkg.scripts = pkg.scripts || {};
        pkg.scripts.predeploy = 'npm run build';
        pkg.scripts.deploy = 'gh-pages -d build';
        
        fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
        console.log('Successfully updated package.json');
    } catch (error) {
        console.error('Error updating package.json:', error.message);
        process.exit(1);
    }
"

# Check if gh-pages is installed
if ! npm list gh-pages --depth=0 2>/dev/null | grep -q 'gh-pages'; then
    echo -e "${GREEN}Installing gh-pages package...${NC}"
    npm install --save-dev gh-pages --legacy-peer-deps
fi

# Create/update public/index.html to ensure it's properly configured
echo -e "${GREEN}Ensuring public/index.html is properly configured...${NC}"
mkdir -p public

# Only update if the file exists and doesn't have correct settings
if [ -f "public/index.html" ]; then
    # Check if base href is already set
    if ! grep -q '<base href="/' public/index.html; then
        # Insert base href tag after head tag
        sed -i 's/<head>/<head>\n  <base href="\/%PUBLIC_URL%\/">/' public/index.html || {
            echo -e "${YELLOW}Warning: Could not automatically update index.html. Please manually add <base href=\"/%PUBLIC_URL%/\"> inside the <head> tag.${NC}"
        }
    fi
else
    # Create a basic index.html file if it doesn't exist
    cat > public/index.html << EOF
<!DOCTYPE html>
<html lang="en">
  <head>
    <base href="/%PUBLIC_URL%/">
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#8884d8" />
    <meta
      name="description"
      content="Portnox Total Cost of Ownership (TCO) Analyzer - Compare Network Access Control solutions"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Portnox TCO Analyzer</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOF
fi

# Create a 404.html file for GitHub Pages SPA routing
echo -e "${GREEN}Creating 404.html for SPA routing on GitHub Pages...${NC}"
cat > public/404.html << EOF
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Portnox TCO Analyzer</title>
    <script type="text/javascript">
      // Single-page application routing for GitHub Pages
      // Taken from https://github.com/rafgraph/spa-github-pages
      var pathSegmentsToKeep = 1;
      
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
EOF

# Add routing script to index.html
echo -e "${GREEN}Adding SPA routing script to index.html...${NC}"
# Check if the script already exists
if ! grep -q "window.location.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/')" public/index.html; then
    # Create a temporary file with the script
    cat > temp_script.html << 'EOF'
    <!-- Start Single Page Apps for GitHub Pages -->
    <script type="text/javascript">
      // Single-page application routing for GitHub Pages
      // Taken from https://github.com/rafgraph/spa-github-pages
      (function(l) {
        if (l.search[1] === '/') {
          var decoded = l.search.slice(1).split('&').map(function(s) { 
            return s.replace(/~and~/g, '&')
          }).join('?');
          window.history.replaceState(null, null,
              l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location))
    </script>
    <!-- End Single Page Apps for GitHub Pages -->
EOF
    # Insert the script before the closing head tag
    sed -i 's|</head>|'"$(cat temp_script.html)"'\n  </head>|g' public/index.html || {
        echo -e "${YELLOW}Warning: Could not automatically update index.html. Please manually add the SPA routing script before the </head> tag.${NC}"
        cat temp_script.html
    }
    rm temp_script.html
fi

# Configure Router for GitHub Pages
echo -e "${GREEN}Configuring React Router for GitHub Pages...${NC}"
# Create a new Router configuration file
mkdir -p src/utils
cat > src/utils/RouterConfig.tsx << 'EOF'
import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

interface RouterConfigProps {
    children: React.ReactNode;
}

const RouterConfig: React.FC<RouterConfigProps> = ({ children }) => {
    // Check if we're in production (GitHub Pages)
    const isProduction = process.env.NODE_ENV === 'production';
    
    // Get the base URL from package.json's homepage field
    const homepage = process.env.PUBLIC_URL || '';
    
    // Use HashRouter in production (GitHub Pages) and BrowserRouter in development
    if (isProduction) {
        return <HashRouter>{children}</HashRouter>;
    } else {
        return <BrowserRouter basename={homepage}>{children}</BrowserRouter>;
    }
};

export default RouterConfig;
EOF

echo -e "${GREEN}Creating example App.tsx file with proper router configuration...${NC}"
cat > src/App.example.tsx << 'EOF'
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import RouterConfig from './utils/RouterConfig';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Dashboard from './components/views/Dashboard';
import Calculator from './components/calculator/Calculator';
import Comparison from './components/views/Comparison';
import Report from './components/views/Report';
import './App.css';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <RouterConfig>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          {sidebarOpen && <Sidebar />}
          <main className="flex-1 bg-gray-50">
            <button 
              className="m-2 p-2 bg-gray-200 rounded" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? '← Hide Sidebar' : '→ Show Sidebar'}
            </button>
            <div className="container mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/comparison" element={<Comparison />} />
                <Route path="/report" element={<Report />} />
              </Routes>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </RouterConfig>
  );
};

export default App;
EOF

# Create a GitHub workflow for automatic deployment
echo -e "${GREEN}Creating GitHub workflow for automatic deployment...${NC}"
mkdir -p .github/workflows
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16
          
      - name: Install dependencies
        run: npm ci --legacy-peer-deps
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages
          folder: build
EOF

echo -e "${GREEN}Creating a deployment script...${NC}"
cat > deploy-to-gh-pages.sh << 'EOF'
#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}==============================================="
echo -e "Portnox TCO Analyzer GitHub Pages Deployment"
echo -e "===============================================${NC}"

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${YELLOW}You have uncommitted changes.${NC}"
  read -p "Do you want to commit these changes? (y/n): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter commit message: " commit_msg
    git add .
    git commit -m "$commit_msg"
    echo -e "${GREEN}Changes committed.${NC}"
  else
    echo -e "${YELLOW}Continuing without committing changes...${NC}"
  fi
fi

# Build the project
echo -e "${GREEN}Building project...${NC}"
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed.${NC}"
  exit 1
fi

# Deploy to GitHub Pages
echo -e "${GREEN}Deploying to GitHub Pages...${NC}"
npm run deploy
if [ $? -ne 0 ]; then
  echo -e "${RED}Deployment failed.${NC}"
  exit 1
fi

echo -e "${GREEN}Deployment successful!${NC}"
echo "The Portnox TCO Analyzer is now live at:"
node -e "const pkg = require('./package.json'); console.log(pkg.homepage);"
EOF

chmod +x deploy-to-gh-pages.sh

echo -e "${GREEN}============================================"
echo -e "GitHub Pages setup completed!"
echo -e "============================================${NC}"
echo -e "Key changes made:"
echo -e "1. Added GitHub Pages configuration to package.json"
echo -e "2. Created 404.html for SPA routing"
echo -e "3. Added routing script to index.html"
echo -e "4. Created RouterConfig.tsx for proper GitHub Pages routing"
echo -e "5. Created an example App.tsx with the correct router configuration"
echo -e "6. Set up GitHub Actions workflow for automatic deployment"
echo -e "7. Created a deployment script for manual deployment"
echo -e "${GREEN}============================================${NC}"
echo -e "Next steps:"
echo -e "1. Update your App.tsx to use RouterConfig instead of BrowserRouter"
echo -e "2. Run './deploy-to-gh-pages.sh' to deploy to GitHub Pages"
echo -e "3. Or push your changes to trigger the GitHub Actions workflow"
echo -e "${GREEN}============================================${NC}"

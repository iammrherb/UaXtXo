#!/bin/bash
# complete-fix-deploy.sh - Comprehensive fixed script for deploying Portnox TCO Analyzer to GitHub Pages

# Color definitions
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}Portnox TCO Analyzer - Complete Fixed Deployment Script${NC}"
echo -e "${BLUE}============================================${NC}"

# Create a package-lock backup if it exists
if [ -f "package-lock.json" ]; then
    echo -e "${YELLOW}Creating backup of package-lock.json...${NC}"
    cp package-lock.json package-lock.json.backup
fi

# Remove node_modules to ensure a clean install
echo -e "${YELLOW}Removing node_modules for clean installation...${NC}"
rm -rf node_modules

# Update package.json to fix React version
echo -e "${GREEN}Updating package.json to fix React version and dependencies...${NC}"
node -e "
try {
    const fs = require('fs');
    let pkg;
    
    try {
        pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    } catch (error) {
        // Create a new package.json if it doesn't exist
        pkg = {
            name: 'portnox-tco-analyzer',
            version: '0.1.0',
            private: true,
            homepage: 'https://iammrherb.github.io/UaXtXo'
        };
    }
    
    // Ensure dependencies object exists
    pkg.dependencies = pkg.dependencies || {};
    
    // Set React versions to compatible ones
    pkg.dependencies['react'] = '18.2.0';
    pkg.dependencies['react-dom'] = '18.2.0';
    
    // Make sure we have react-scripts
    pkg.dependencies['react-scripts'] = '^5.0.1';
    
    // Add testing libraries
    pkg.dependencies['@testing-library/jest-dom'] = '^5.16.5';
    pkg.dependencies['@testing-library/react'] = '^13.4.0';
    pkg.dependencies['@testing-library/user-event'] = '^14.4.3';
    
    // Ensure gh-pages is in devDependencies
    pkg.devDependencies = pkg.devDependencies || {};
    pkg.devDependencies['gh-pages'] = '^6.0.0';
    
    // Make sure we have proper scripts
    pkg.scripts = pkg.scripts || {};
    pkg.scripts.start = 'react-scripts start';
    pkg.scripts.build = 'react-scripts build';
    pkg.scripts.test = 'react-scripts test';
    pkg.scripts.eject = 'react-scripts eject';
    pkg.scripts.predeploy = 'npm run build';
    pkg.scripts.deploy = 'gh-pages -d build';
    
    // Add browserslist configuration
    pkg.browserslist = {
        'production': [
            '>0.2%',
            'not dead',
            'not op_mini all'
        ],
        'development': [
            'last 1 chrome version',
            'last 1 firefox version',
            'last 1 safari version'
        ]
    };
    
    // Set homepage for GitHub Pages
    pkg.homepage = 'https://iammrherb.github.io/UaXtXo';
    
    // Save changes
    fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
    console.log('Successfully updated package.json');
} catch (error) {
    console.error('Error updating package.json:', error);
    process.exit(1);
}
"

# Install dependencies with legacy peer deps flag to handle compatibility issues
echo -e "${GREEN}Installing dependencies with legacy peer deps flag...${NC}"
npm install --legacy-peer-deps

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to install dependencies. Trying with --force...${NC}"
    npm install --force
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install dependencies even with --force.${NC}"
        echo -e "${RED}Please check your package.json for compatibility issues.${NC}"
        exit 1
    fi
fi

# Create basic React app structure if it doesn't exist
echo -e "${GREEN}Ensuring basic React app structure exists...${NC}"

# Create src directory if it doesn't exist
mkdir -p src/tests

# Create public directory and files if they don't exist
mkdir -p public
if [ ! -f "public/index.html" ]; then
    echo -e "${YELLOW}Creating basic public/index.html...${NC}"
    cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Portnox Total Cost Analyzer - Compare NAC solutions"
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

if [ ! -f "public/manifest.json" ]; then
    echo -e "${YELLOW}Creating basic public/manifest.json...${NC}"
    cat > public/manifest.json << 'EOF'
{
  "short_name": "Portnox TCO",
  "name": "Portnox Total Cost Analyzer",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
EOF
fi

# Create basic App.tsx if it doesn't exist
if [ ! -f "src/App.tsx" ] && [ ! -f "src/App.js" ]; then
    echo -e "${YELLOW}Creating basic src/App.tsx...${NC}"
    cat > src/App.tsx << 'EOF'
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Portnox Total Cost Analyzer</h1>
        <p>
          Compare TCO and ROI for Network Access Control solutions
        </p>
      </header>
    </div>
  );
}

export default App;
EOF
fi

# Create basic App.css if it doesn't exist
if [ ! -f "src/App.css" ]; then
    echo -e "${YELLOW}Creating basic src/App.css...${NC}"
    cat > src/App.css << 'EOF'
.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}
EOF
fi

# Create basic index.tsx if it doesn't exist
if [ ! -f "src/index.tsx" ] && [ ! -f "src/index.js" ]; then
    echo -e "${YELLOW}Creating basic src/index.tsx...${NC}"
    cat > src/index.tsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint.
reportWebVitals();
EOF
fi

# Create basic index.css if it doesn't exist
if [ ! -f "src/index.css" ]; then
    echo -e "${YELLOW}Creating basic src/index.css...${NC}"
    cat > src/index.css << 'EOF'
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
EOF
fi

# Create basic reportWebVitals.ts if it doesn't exist
if [ ! -f "src/reportWebVitals.ts" ] && [ ! -f "src/reportWebVitals.js" ]; then
    echo -e "${YELLOW}Creating basic src/reportWebVitals.ts...${NC}"
    cat > src/reportWebVitals.ts << 'EOF'
import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
EOF
fi

# Create a basic test file
echo -e "${YELLOW}Creating basic test file...${NC}"
cat > src/App.test.tsx << 'EOF'
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Portnox heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Portnox Total Cost Analyzer/i);
  expect(headingElement).toBeInTheDocument();
});
EOF

# Create setupTests.js
echo -e "${YELLOW}Creating setupTests.js...${NC}"
cat > src/setupTests.js << 'EOF'
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
EOF

# Create basic tsconfig.json if it doesn't exist
if [ ! -f "tsconfig.json" ]; then
    echo -e "${YELLOW}Creating basic tsconfig.json...${NC}"
    cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
EOF
fi

# Run tests
echo -e "${GREEN}Running tests...${NC}"
CI=true npx react-scripts test --passWithNoTests

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Warning: Tests failed. Do you want to continue with deployment? (y/n)${NC}"
    read -r continue_deploy
    if [ "$continue_deploy" != "y" ]; then
        echo -e "${RED}Deployment cancelled.${NC}"
        exit 1
    fi
fi

# Build the app
echo -e "${GREEN}Building application...${NC}"
SKIP_PREFLIGHT_CHECK=true npx react-scripts build

if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed. Trying again with SKIP_PREFLIGHT_CHECK=true...${NC}"
    # Create .env file to skip preflight check
    echo "SKIP_PREFLIGHT_CHECK=true" > .env
    npx react-scripts build
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}Build failed again. Please fix the errors and try again.${NC}"
        exit 1
    fi
fi

# Deploy to GitHub Pages
echo -e "${GREEN}Deploying to GitHub Pages...${NC}"
npx gh-pages -d build -r https://github.com/iammrherb/UaXtXo.git

if [ $? -ne 0 ]; then
    echo -e "${RED}Deployment failed. Checking git configuration...${NC}"
    
    # Configure git user if not set
    if [ -z "$(git config --get user.email)" ]; then
        echo -e "${YELLOW}Git user email not set. Please enter your git email:${NC}"
        read -r git_email
        git config user.email "$git_email"
    fi
    
    if [ -z "$(git config --get user.name)" ]; then
        echo -e "${YELLOW}Git user name not set. Please enter your git username:${NC}"
        read -r git_name
        git config user.name "$git_name"
    fi
    
    # Try deployment again
    echo -e "${GREEN}Trying deployment again with git configuration...${NC}"
    npx gh-pages -d build -r https://github.com/iammrherb/UaXtXo.git
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}Deployment failed again. Trying with alternatives...${NC}"
        
        # Try alternative deployment method (git commands)
        echo -e "${YELLOW}Trying alternative deployment method...${NC}"
        
        # Clone the repository to a temporary directory
        tmp_dir=$(mktemp -d)
        git clone https://github.com/iammrherb/UaXtXo.git "$tmp_dir"
        
        # Check if gh-pages branch exists
        if git -C "$tmp_dir" branch -a | grep -q "remotes/origin/gh-pages"; then
            git -C "$tmp_dir" checkout gh-pages
        else
            git -C "$tmp_dir" checkout --orphan gh-pages
            git -C "$tmp_dir" rm -rf .
        fi
        
        # Copy build files
        cp -r build/* "$tmp_dir"
        
        # Commit and push
        git -C "$tmp_dir" add .
        git -C "$tmp_dir" commit -m "Deploy to GitHub Pages"
        git -C "$tmp_dir" push origin gh-pages
        
        # Clean up
        rm -rf "$tmp_dir"
        
        if [ $? -ne 0 ]; then
            echo -e "${RED}All deployment methods failed.${NC}"
            echo -e "${YELLOW}You may need to manually deploy the build folder to the gh-pages branch.${NC}"
            exit 1
        fi
    fi
fi

echo -e "${GREEN}Deployment successful!${NC}"
echo -e "${YELLOW}The app will be available at: https://iammrherb.github.io/UaXtXo/${NC}"
echo -e "${YELLOW}Note: It may take a few minutes for the changes to propagate.${NC}"

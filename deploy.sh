#!/bin/bash

# Portnox TCO Calculator Deployment Script
# This script deploys the project to GitHub Pages

# Set your GitHub repository URL here
REPO_URL="https://github.com/iammrherb/UaXtXo.git"

# Print ASCII art 
echo "
 _____           _                    _______ _____  _____ 
|  __ \         | |                  |__   __|  __ \|  __ \
| |__) |__  _ __| |_ _ __   _____  __   | |  | |__) | |  | |
|  ___/ _ \| '__| __| '_ \ / _ \ \/ /   | |  |  ___/| |  | |
| |  | (_) | |  | |_| | | | (_) >  <    | |  | |    | |__| |
|_|   \___/|_|   \__|_| |_|\___/_/\_\   |_|  |_|    |_____/
                                                           
 _____       _            _       _             
|  __ \     | |          | |     | |            
| |  | | ___| |_ __   ___| | ___ | |_ _ __ ___  
| |  | |/ _ \ | '_ \ / _ \ |/ _ \| __| '__/ _ \ 
| |__| |  __/ | |_) |  __/ | (_) | |_| | | (_) |
|_____/ \___|_| .__/ \___|_|\___/ \__|_|  \___/ 
              | |                                
              |_|                                
"

echo "🚀 Starting Portnox TCO Calculator deployment..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git and try again."
    exit 1
fi

# Create a dist directory for the production build
echo "📦 Creating production build..."
mkdir -p dist
cp -r css dist/
cp -r js dist/
cp -r img dist/
cp index.html dist/

# Optimize CSS (optional - would require a tool like cssnano)
# echo "🎨 Optimizing CSS..."
# cssnano css/styles.css dist/css/styles.min.css

# Optimize JavaScript (optional - would require a tool like terser)
# echo "📝 Optimizing JavaScript..."
# terser js/main.js -o dist/js/main.min.js

# Initialize or update the Git repository
if [ ! -d .git ]; then
    echo "🔄 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# Check if the remote origin exists
if ! git remote | grep -q "^origin$"; then
    echo "🔗 Adding remote origin..."
    git remote add origin $REPO_URL
fi

# Create gh-pages branch if it doesn't exist
if ! git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "🌿 Creating gh-pages branch..."
    git checkout -b gh-pages
else
    echo "🌿 Checking out gh-pages branch..."
    git checkout gh-pages
fi

# Reset gh-pages branch to be identical to main
echo "🔄 Syncing gh-pages with main branch..."
git fetch origin main
git reset --hard origin/main

# Move dist content to the root of gh-pages
echo "📂 Moving dist content to root of gh-pages..."
cp -r dist/* .
rm -rf dist

# Add and commit changes
echo "💾 Committing changes..."
git add .
git commit -m "Deploy: $(date)"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -f origin gh-pages

# Return to main branch
echo "🔙 Returning to main branch..."
git checkout main

echo "✅ Deployment complete! Your Portnox TCO Calculator is now live at:"
echo "https://iammrherb.github.io/UaXtXo"

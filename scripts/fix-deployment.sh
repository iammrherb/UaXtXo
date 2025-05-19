#!/bin/bash
echo "Starting deployment fix process..."

# First, ensure package.json has correct homepage
node -e "
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
packageJson.homepage = 'https://iammrherb.github.io/UaXtXo';
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
console.log('Updated homepage in package.json');
"

# Clean the build folder
rm -rf build

# Build the project
echo "Rebuilding the project..."
npm run build

# Create a temp directory for deployment
mkdir -p temp-deploy
cd temp-deploy

# Initialize git repo
git init
git checkout -b gh-pages

# Copy build files
cp -r ../build/* .

# Create a .nojekyll file to disable Jekyll processing
touch .nojekyll

# Configure git
git config user.name "GitHub Actions"
git config user.email "actions@github.com"

# Add all files
git add .

# Commit
git commit -m "Manual deployment to GitHub Pages"

# Set the remote
git remote add origin https://github.com/iammrherb/UaXtXo.git

# Force push to gh-pages branch
git push -f origin gh-pages

# Clean up
cd ..
rm -rf temp-deploy

echo "Manual deployment completed!"

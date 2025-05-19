#!/bin/bash
set -e # Exit on error

echo "Starting GitHub Pages deployment..."

# Build the project
npm run build

# Create a temporary directory for deployment
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
git commit -m "Deploy to GitHub Pages"

# Set the remote
git remote add origin https://github.com/iammrherb/UaXtXo.git

# Force push to gh-pages branch
git push -f origin gh-pages

# Clean up
cd ..
rm -rf temp-deploy

echo "Deployment completed!"

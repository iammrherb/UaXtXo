#!/bin/bash

# Build and deploy script for Portnox TCO Analyzer
# This script builds the React app and deploys it to the gh-pages branch

echo "Starting build and deploy process for Portnox TCO Analyzer..."

# Step 1: Install dependencies
echo "Installing dependencies..."
npm install

# Step 2: Build the React app
echo "Building the React app..."
npm run build

# Step 3: Deploy to gh-pages branch
echo "Deploying to gh-pages branch..."
git checkout gh-pages
rm -rf static/
cp -r build/* .
git add .
git commit -m "Update Portnox TCO Analyzer with enhanced charts and UI"
git push origin gh-pages

# Step 4: Return to main branch
echo "Returning to main branch..."
git checkout main-react

echo "Deployment completed successfully!"

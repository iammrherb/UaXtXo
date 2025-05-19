#!/bin/bash
echo "Starting custom deployment script..."

# Create a temp directory
mkdir -p gh-pages-temp
cd gh-pages-temp

# Clone only the gh-pages branch (shallow clone)
git clone -b gh-pages --single-branch --depth 1 https://github.com/iammrherb/UaXtXo.git .
if [ $? -ne 0 ]; then
  # If the branch doesn't exist yet, create an empty repo
  git init
  git checkout -b gh-pages
  git remote add origin https://github.com/iammrherb/UaXtXo.git
fi

# Remove all files except .git
find . -mindepth 1 -maxdepth 1 -not -name '.git' -exec rm -rf {} \;

# Copy the build files
cp -r ../build/* .

# Configure git
git config user.name "GitHub Actions"
git config user.email "actions@github.com"

# Add all files
git add .

# Commit
git commit -m "Deploy to GitHub Pages"
if [ $? -ne 0 ]; then
  echo "No changes to commit"
  exit 0
fi

# Push
git push -f origin gh-pages

# Clean up
cd ..
rm -rf gh-pages-temp

echo "Deployment complete!"

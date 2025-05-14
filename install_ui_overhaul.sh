#!/bin/bash
# Update script for Portnox TCO Analyzer UI

# Function to check if command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check for required tools
if ! command_exists git; then
  echo "Error: git is required but not installed. Please install git and try again."
  exit 1
fi

# Create backup
echo "Creating backup..."
timestamp=$(date +"%Y%m%d%H%M%S")
backup_dir="backup_${timestamp}"
mkdir -p "$backup_dir"
cp -r css js index.html "$backup_dir/"
echo "Backup created in $backup_dir"

# Update files
echo "Updating CSS files..."
cp css/modern-layout.css css/
cp css/dark-mode.css css/

echo "Updating JS files..."
cp js/modern-ui.js js/
cp js/fixes/layout-fix.js js/fixes/

echo "Updating index.html..."
cp index.html index.html

# Commit changes if in a git repository
if [ -d .git ]; then
  echo "Git repository detected. Creating commit..."
  git add css/modern-layout.css css/dark-mode.css js/modern-ui.js js/fixes/layout-fix.js index.html
  git commit -m "Implement modern UI layout and remove wizard approach"
  echo "Changes committed to git"
fi

echo "Installation complete!"
echo "Please note: You may need to clear your browser cache to see the changes."

#!/bin/bash
# Commit and push fixes to git repository

# Stage all files
git add .

# Commit changes
git commit -m "Fix Portnox Total Cost Analyzer UI and functionality issues

- Fixed missing JavaScript files (chart-config.js, security-charts.js, apex-charts.js, d3-manager.js)
- Added enhanced color scheme for better visibility
- Fixed executive view container initialization
- Ensured vendor data is properly defined
- Fixed chart rendering issues
- Improved overall UI with better contrast and visibility"

# Push to remote repository (uncomment if needed)
# git push origin main

echo "Changes committed successfully!"

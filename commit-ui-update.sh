#!/bin/bash
# Commit modern UI update to git repository

# Stage all files
git add css/fixes/modern-ui.css
git add js/fixes/enhanced-header.js
git add index.html
git add apply-modern-ui.sh

# Commit changes
git commit -m "Update Portnox Total Cost Analyzer with modern UI

- Added modern, high-visibility color scheme
- Created more prominent header banner with enhanced styling
- Added section banners throughout the application
- Improved overall UI aesthetics and responsiveness
- Enhanced cards, buttons, and interactive elements"

# Push to remote repository (uncomment if needed)
# git push origin main

echo "UI update committed successfully!"

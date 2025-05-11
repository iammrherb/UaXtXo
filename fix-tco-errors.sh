#!/bin/bash

# Fix NAC Total Cost Analyzer Errors
echo "🔧 Fixing NAC Total Cost Analyzer errors..."

# Add all files
git add .

# Commit changes
git commit -m "Fix wizard.js steps undefined error and font loading issues

- Moved steps array definition to the top of WizardController
- Fixed steps not defined error in renderProgress
- Added proper null checks for DOM elements
- Switched to Font Awesome CDN to fix font loading errors
- Improved error handling throughout wizard
- Added public API methods for custom compliance
- Fixed function scoping issues"

# Push to repository
git push origin main

echo "✅ Fixes applied successfully!"
echo "🌐 The wizard should now work without errors."

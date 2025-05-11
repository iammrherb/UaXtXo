#!/bin/bash

# Direct fix for NAC Total Cost Analyzer
echo "🔧 Applying direct fix for NAC Total Cost Analyzer..."

# Add all files
git add .

# Commit changes
git commit -m "Direct fix for wizard.js steps error and initialization issues

- Completely restructured wizard.js with steps defined at the beginning
- Added proper error handling and null checks throughout
- Improved module initialization in main.js
- Added fallback for dashboard controller
- Fixed function scoping and visibility issues
- Added console logging for debugging"

# Push to repository
git push origin main

echo "✅ Direct fix applied successfully!"
echo "🌐 The wizard should now work without the steps undefined error."

#!/bin/bash

echo "📦 Committing chart and calculation fixes..."

# Stage all changes
git add -A

# Commit with descriptive message
git commit -m "Fix: Resolve chart expansion and calculation reflection issues

- Added ExecutivePlatformFix class to ensure all charts render properly
- Implemented missing chart creation methods (security, compliance, insurance)
- Enhanced calculation engine with proper event binding
- Fixed tab switching to properly refresh charts
- Added comprehensive test suite for validation
- Improved calculation-to-UI update pipeline

This commit addresses:
- Charts not expanding in all tabs
- Calculations not reflecting in UI
- Missing chart implementations
- Event binding issues"

# Show status
git status

echo "✅ Fixes committed successfully!"
echo "🚀 Run 'git push' to upload changes"

#!/bin/bash

# Add all new files
git add css/*.css
git add js/modules/*.js
git add js/core/module-loader-init.js
git add index_updated.html

# Commit recovery changes
git commit -m "fix: Restore missing platform components and integrate with module system

- Created all missing CSS files (6 files)
- Added premium-executive-platform as a module
- Created UI integration module to bridge systems
- Added module loader initialization
- Fixed Highcharts loading
- Integrated all analysis tabs with module system
- Created updated index.html with proper loading sequence

Platform now properly integrates with existing module loader system"

echo "✅ Recovery changes committed!"

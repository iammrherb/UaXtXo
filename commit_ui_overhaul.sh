#!/bin/bash

echo "📦 Committing UI overhaul changes..."

# Add all changes
git add css/main.css
git add js/modules/executive-platform.js
git add js/modules/platform-init.js
git add index.html
git add img/vendors/
git add deploy.sh

# Commit with comprehensive message
git commit -m "feat: Complete UI overhaul with modern executive dashboard

MAJOR CHANGES:
- Completely redesigned UI with modern dark theme
- New color scheme: dark blue/purple with teal accents
- Vendor selection moved to primary tab
- Professional executive dashboard as landing page
- Sticky navigation with improved tab system
- Fixed all CSS 404 errors
- Integrated with existing module loader system

UI IMPROVEMENTS:
- Modern gradient backgrounds
- Glassmorphism effects
- Smooth animations and transitions
- Responsive grid layouts
- Professional KPI cards
- Enhanced chart styling
- Export dropdown menu
- Loading screen

FEATURES:
- Executive Dashboard with key metrics
- Vendor Selection as primary tab
- Financial Overview with TCO/ROI
- Risk & Security analysis
- Compliance assessment
- Operational impact
- Strategic insights
- Dynamic pricing slider
- Multi-format export options

TECHNICAL:
- Modular architecture
- Highcharts integration
- Event-driven updates
- Responsive design
- Cross-browser compatible"

echo "✅ Changes committed successfully!"

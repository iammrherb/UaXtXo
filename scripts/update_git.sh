#!/bin/bash

# Git update script for Portnox TCO Analyzer
echo "🔄 Updating Portnox TCO Analyzer repository..."

# Stage all changes
git add -A

# Commit with descriptive message
git commit -m "Fix: Comprehensive vendor data integration and enhanced Executive Dashboard

- Added real market data for all 10 vendors (Portnox, Cisco, Aruba, Forescout, Fortinet, Extreme, SecureW2, Foxpass, Arista)
- Completely rebuilt Executive Dashboard with modern glass panel design
- Fixed all chart rendering issues with proper vendor data integration
- Enhanced UI with animations and polished styling
- Added interactive vendor selection (up to 4 vendors)
- Implemented 5 comprehensive dashboard tabs:
  - Overview: TCO comparison, timeline, ROI projection
  - Financial Analysis: Cost breakdown, distribution, detailed tables
  - Security & Compliance: Radar charts, compliance coverage, feature matrix
  - Technical Comparison: Architecture, integrations, specifications
  - Market Position: Market share, growth trends, analyst ratings
- Added real-time metric animations and notifications
- Responsive design for all screen sizes
- Dark mode support
- Performance optimizations"

# Push to repository
git push origin main

echo "✅ Repository updated successfully!"

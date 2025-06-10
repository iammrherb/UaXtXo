#!/bin/bash
# Quick update script for Portnox TCO Analyzer fixes

echo "🚀 Applying Portnox TCO Analyzer module fixes..."

# Add all fix files
git add platform-ultimate-fix.js
git add module-loader-patch.js
git add test-module-loading.html
git add update-and-commit.sh

# Commit with comprehensive message
git commit -m "Fix: Module retrieval issue in Portnox TCO Analyzer

Problem: Modules were registering but not retrievable from ModuleLoader
Solution: 
- Enhanced module retrieval with fallback mechanisms
- Added direct instantiation support
- Improved error handling and debugging
- Added comprehensive vendor comparison data

Fixed Components:
- EventSystem and ConfigManager retrieval
- Platform initialization sequence
- Module auto-registration
- Fallback service creation

Vendor Comparison Features:
- 14 vendors (10 Legacy NAC + 3 Cloud + Portnox)
- TCO calculations with 67% reduction for Portnox
- Deployment time comparisons (1-2 days vs 3-6 months)
- Maintenance cost analysis (automated vs 15-20% annual)
- Compliance framework mappings (13 frameworks)

Executive Metrics:
- ROI: 287% over 3 years
- Breach risk reduction: 73%
- Compliance fine reduction: 89%
- Insurance premium reduction: 15-25%
- Admin time saved: 32 hours/week

This ensures all stakeholders (Buyers, Executive Teams, Finance, 
Technical, Security, Compliance) have comprehensive TCO analysis data."

echo "✅ Changes committed!"
echo "📤 Push with: git push origin main"

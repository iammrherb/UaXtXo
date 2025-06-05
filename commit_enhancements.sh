#!/bin/bash

# Add all changes
git add js/views/risk-security-init.js
git add js/data/compliance-framework-mappings.js
git add js/views/compliance-analysis.js
git add js/views/operational-impact.js
git add js/views/strategic-insights.js
git add js/platform-tab-integration.js

# Commit with detailed message
git commit -m "feat: Complete platform enhancement with all analysis modules

- Fixed syntax error in risk-security-init.js
- Added comprehensive compliance framework mappings for all industries
- Implemented Risk & Security Analysis tab with threat assessment
- Implemented Compliance Analysis tab with framework readiness matrix
- Implemented Operational Impact tab with automation & efficiency metrics
- Implemented Strategic Insights tab with executive recommendations
- Added detailed vendor scoring and decision matrices
- Enhanced charts with proper data visualization
- Integrated all modules with main platform navigation

All tabs now fully functional with:
- Executive summaries and KPIs
- Interactive charts and visualizations
- Industry-specific analysis
- Quantified business impact metrics
- Strategic recommendations for all stakeholders"

echo "✅ Changes committed successfully!"

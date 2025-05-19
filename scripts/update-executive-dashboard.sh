#!/bin/bash

# Script to update the executive dashboard with enhanced charts
EXEC_VIEW_PATH="src/components/views/executive/ExecutiveView.tsx"

# Check if the file exists
if [ ! -f "$EXEC_VIEW_PATH" ]; then
  echo "Error: Executive view file not found at $EXEC_VIEW_PATH"
  exit 1
fi

# Create backup
cp "$EXEC_VIEW_PATH" "${EXEC_VIEW_PATH}.bak"
echo "Created backup at ${EXEC_VIEW_PATH}.bak"

# Add imports for new charts
sed -i '/import TcoComparisonChart/a import ExecutiveSummaryChart from '\''../../charts/ExecutiveSummaryChart'\'';' "$EXEC_VIEW_PATH"
sed -i '/import TcoComparisonChart/a import CompetitiveAdvantageChart from '\''../../charts/CompetitiveAdvantageChart'\'';' "$EXEC_VIEW_PATH"
sed -i '/import TcoComparisonChart/a import SavingsProjectionChart from '\''../../charts/SavingsProjectionChart'\'';' "$EXEC_VIEW_PATH"
sed -i '/import TcoComparisonChart/a import TcoBreakdownChart from '\''../../charts/TcoBreakdownChart'\'';' "$EXEC_VIEW_PATH"

# Update dashboard content
# Find the section after CumulativeCostChart
sed -i '/<CumulativeCostChart/,/<\/div>/c\
            <div className="mb-6">\
              <ExecutiveSummaryChart height={400} />\
            </div>\
            \
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">\
              <div>\
                <TcoComparisonChart height={320} />\
              </div>\
              <div>\
                <TcoBreakdownChart height={320} />\
              </div>\
            </div>\
            \
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">\
              <div>\
                <SavingsProjectionChart height={320} />\
              </div>\
              <div>\
                <CompetitiveAdvantageChart height={320} />\
              </div>\
            </div>' "$EXEC_VIEW_PATH"

echo "Successfully updated executive dashboard"

# Update financial view
FIN_VIEW_PATH="src/components/views/financial/FinancialView.tsx"

if [ -f "$FIN_VIEW_PATH" ]; then
  # Create backup
  cp "$FIN_VIEW_PATH" "${FIN_VIEW_PATH}.bak"
  echo "Created backup at ${FIN_VIEW_PATH}.bak"
  
  # Add imports for new charts
  sed -i '/import TcoComparisonChart/a import SavingsProjectionChart from '\''../../charts/SavingsProjectionChart'\'';' "$FIN_VIEW_PATH"
  sed -i '/import TcoComparisonChart/a import TcoBreakdownChart from '\''../../charts/TcoBreakdownChart'\'';' "$FIN_VIEW_PATH"
  
  # Update financial view content
  sed -i '/<TcoComparisonChart/,/<\/div>/c\
            <div className="mb-6">\
              <TcoComparisonChart height={350} />\
            </div>\
            \
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">\
              <div>\
                <TcoBreakdownChart height={350} vendorId="portnox" />\
              </div>\
              <div>\
                <SavingsProjectionChart height={350} />\
              </div>\
            </div>' "$FIN_VIEW_PATH"
            
  echo "Successfully updated financial view"
fi

# Update security view
SEC_VIEW_PATH="src/components/views/security/SecurityView.tsx"

if [ -f "$SEC_VIEW_PATH" ]; then
  # Create backup
  cp "$SEC_VIEW_PATH" "${SEC_VIEW_PATH}.bak"
  echo "Created backup at ${SEC_VIEW_PATH}.bak"
  
  # Add imports for new charts
  sed -i '/import RiskReductionChart/a import SecurityImpactChart from '\''../../charts/SecurityImpactChart'\'';' "$SEC_VIEW_PATH"
  
  # Update security view content - more complex, would require more detailed editing
  echo "Note: Security view may need manual updates to integrate SecurityImpactChart"
fi

# Offer to commit changes
echo "Would you like to commit these changes? (y/n)"
read COMMIT_CHANGES

if [ "$COMMIT_CHANGES" = "y" ]; then
  git add "src/components/charts/*"
  git add "src/components/views/executive/ExecutiveView.tsx"
  git add "src/components/views/financial/FinancialView.tsx"
  git add "src/components/views/security/SecurityView.tsx"
  git commit -m "Enhance charts: Add comprehensive visualization components for executive, financial and security dashboards"
  echo "Changes committed successfully"
fi

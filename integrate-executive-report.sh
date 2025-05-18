#!/bin/bash

# Script to integrate the executive summary report into the Portnox TCO Analyzer

# Define paths
EXEC_VIEW_PATH="src/components/views/executive/ExecutiveView.tsx"
DASHBOARD_PATH="src/components/views/Dashboard.tsx"

# Check if files exist
if [ ! -f "$EXEC_VIEW_PATH" ]; then
  echo "Error: Executive view file not found at $EXEC_VIEW_PATH"
  exit 1
fi

if [ ! -f "$DASHBOARD_PATH" ]; then
  echo "Error: Dashboard file not found at $DASHBOARD_PATH"
  exit 1
fi

# Create backups
cp "$EXEC_VIEW_PATH" "${EXEC_VIEW_PATH}.bak"
echo "Created backup at ${EXEC_VIEW_PATH}.bak"

cp "$DASHBOARD_PATH" "${DASHBOARD_PATH}.bak"
echo "Created backup at ${DASHBOARD_PATH}.bak"

# Add import to ExecutiveView
sed -i '/import VendorRadarChart/a import ExecutiveSummaryReport from '\''../../reports/ExecutiveSummaryReport'\'';' "$EXEC_VIEW_PATH"

# Add Report tab to ExecutiveView
sed -i '/{ id: '\''comparison'\'', label: '\''Vendor Comparison'\'' }/a \ \ \ \ { id: '\''report'\'', label: '\''Executive Report'\'' },' "$EXEC_VIEW_PATH"

# Add report content section to ExecutiveView
if ! grep -q "activeTab === 'report'" "$EXEC_VIEW_PATH"; then
  # Find the last tab and add the report tab after it
  sed -i '/activeTab === '\''comparison'\'' && (/,/^        )}$/a \
        {activeTab === '\''report'\'' && (\
          <div className="executive-report">\
            <ExecutiveSummaryReport className="mt-4" />\
          </div>\
        )}' "$EXEC_VIEW_PATH"
  
  echo "Added report tab to ExecutiveView"
fi

# Add report button to Dashboard
sed -i '/Export PDF/a \              <button className="btn btn-outline flex items-center text-sm ml-2" onClick={() => handleViewChange('\''executive'\'') || setTimeout(() => setActiveTab('\''report'\''), 100)}>\
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">\
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />\
                </svg>\
                Executive Report\
              </button>' "$DASHBOARD_PATH"

echo "Added report button to Dashboard"

# Add CSS print styles for report
if [ ! -f "src/reportStyles.css" ]; then
  echo "Creating print styles for report..."
  cat > "src/reportStyles.css" << 'EOCSS'
/* Print styles for executive report */
@media print {
  /* Hide non-report elements */
  header, footer, nav, .sidebar, .stakeholder-tabs, .action-buttons, button {
    display: none !important;
  }
  
  /* Adjust main content */
  .content-area {
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
  }
  
  /* Adjust report container */
  .executive-report {
    padding: 0 !important;
    margin: 0 !important;
  }
  
  /* Ensure proper colors */
  body {
    background-color: white !important;
    color: black !important;
  }
  
  /* Fix tables */
  table {
    break-inside: auto !important;
  }
  
  tr {
    break-inside: avoid !important;
    break-after: auto !important;
  }
  
  td, th {
    break-inside: avoid !important;
  }
  
  /* Page breaks */
  h2 {
    break-before: auto !important;
    break-after: avoid !important;
  }
  
  /* Remove shadows and effects that don't print well */
  .shadow-sm, .shadow, .shadow-md, .shadow-lg, .shadow-xl {
    box-shadow: none !important;
  }
}
EOCSS

  # Import print styles in index.tsx
  sed -i '/import '\''\.\/index\.css'\'';/a import '\''\.\/reportStyles\.css'\'';' "src/index.tsx"
  echo "Created print styles for report"
fi

# Offer to commit changes
echo "Would you like to commit these changes? (y/n)"
read COMMIT_CHANGES

if [ "$COMMIT_CHANGES" = "y" ]; then
  git add "src/components/reports/ExecutiveSummaryReport.tsx"
  git add "src/reportStyles.css"
  git add "src/index.tsx"
  git add "$EXEC_VIEW_PATH"
  git add "$DASHBOARD_PATH"
  git commit -m "Add comprehensive executive summary report for TCO analysis"
  echo "Changes committed successfully"
fi

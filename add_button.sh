#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "Adding sensitivity analysis button..."

# Add button to header
if [ -f "index.html" ]; then
  # Add button to header actions
  grep -q "sensitivity-analysis-btn" index.html
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Sensitivity button already exists in index.html${NC}"
  else
    sed -i '/<button id="guided-tour-btn" class="btn btn-outline btn-sm">/i \        <button id="sensitivity-analysis-btn" class="btn btn-outline btn-sm">\n          <i class="fas fa-chart-line"><\/i> Sensitivity Analysis\n        <\/button>' index.html
    echo -e "${GREEN}✓ Added sensitivity analysis button to index.html${NC}"
  fi
  
  # Add event handler
  if [ -f "js/main.js" ]; then
    # Check if handler already exists
    grep -q "sensitivity-analysis-btn" js/main.js
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}✓ Button handler already exists in main.js${NC}"
    else
      # Add to main.js
      cat >> js/main.js << 'EOL'
// Sensitivity analysis button
document.addEventListener("DOMContentLoaded", function() {
  var btn = document.getElementById("sensitivity-analysis-btn");
  if (btn) { 
    btn.addEventListener("click", function() { 
      window.location.href = "sensitivity.html"; 
    }); 
  }
});
EOL
      echo -e "${GREEN}✓ Added button handler to main.js${NC}"
    fi
  else
    # Check if handler already exists in index.html
    grep -q "sensitivity-analysis-btn.*addEventListener" index.html
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}✓ Button handler already exists in index.html${NC}"
    else
      # Add directly to index.html before closing body tag
      cat > temp_script.html << 'EOL'
  <script>
    // Sensitivity analysis button
    document.addEventListener("DOMContentLoaded", function() {
      var btn = document.getElementById("sensitivity-analysis-btn");
      if (btn) {
        btn.addEventListener("click", function() {
          window.location.href = "sensitivity.html";
        });
      }
    });
  </script>
EOL
      # Insert before </body> tag
      sed -i '/<\/body>/e cat temp_script.html' index.html
      rm temp_script.html
      echo -e "${GREEN}✓ Added button handler directly to index.html${NC}"
    fi
  fi
else
  echo -e "${RED}✗ index.html not found - cannot add sensitivity button${NC}"
fi

echo "Sensitivity button processing complete."

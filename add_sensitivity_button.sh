#!/bin/bash

# Add sensitivity analysis button to index.html
if [ -f "index.html" ]; then
  # Add button to header
  sed -i '/<button id="guided-tour-btn" class="btn btn-outline btn-sm">/i \        <button id="sensitivity-analysis-btn" class="btn btn-outline btn-sm">\n          <i class="fas fa-chart-line"><\/i> Sensitivity Analysis\n        <\/button>' index.html
  echo "Added sensitivity analysis button to index.html"
  
  # Add handler
  if [ -f "js/main.js" ]; then
    # Add to main.js
    echo '
// Sensitivity analysis button
document.addEventListener("DOMContentLoaded", function() {
  var sensitivityBtn = document.getElementById("sensitivity-analysis-btn");
  if (sensitivityBtn) {
    sensitivityBtn.addEventListener("click", function() {
      window.location.href = "sensitivity.html";
    });
  }
});' >> js/main.js
    echo "Added button handler to main.js"
  else
    # Add directly to index.html
    cat > button_script.html << 'EOFHTML'
  <script>
    // Sensitivity analysis button
    document.addEventListener("DOMContentLoaded", function() {
      var sensitivityBtn = document.getElementById("sensitivity-analysis-btn");
      if (sensitivityBtn) {
        sensitivityBtn.addEventListener("click", function() {
          window.location.href = "sensitivity.html";
        });
      }
    });
  </script>
EOFHTML
    
    # Insert the script using a safer method
    awk '/<\/body>/{print "<script>\n    // Sensitivity analysis button\n    document.addEventListener(\"DOMContentLoaded\", function() {\n      var sensitivityBtn = document.getElementById(\"sensitivity-analysis-btn\");\n      if (sensitivityBtn) {\n        sensitivityBtn.addEventListener(\"click\", function() {\n          window.location.href = \"sensitivity.html\";\n        });\n      }\n    });\n  </script>";print;next}1' index.html > index.html.new
    mv index.html.new index.html
    rm button_script.html
    echo "Added button handler directly to index.html"
  fi
else
  echo "index.html not found - cannot add sensitivity button"
fi

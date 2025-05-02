#!/bin/bash

# Find the problematic part of the script and remove it
sed -i '5186,5195d' totaltco.sh

# Add a simplified version that works reliably
cat >> totaltco.sh << 'ENDSCRIPT'
  if [ -f "js/main.js" ]; then
    # Simple approach - write directly to the file
    cat >> js/main.js << EOF
// Sensitivity analysis button
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('sensitivity-analysis-btn');
  if (btn) { 
    btn.addEventListener('click', function() { 
      window.location.href = 'sensitivity.html'; 
    }); 
  }
});
EOF
    echo "✓ Added sensitivity analysis button handler in main.js"
  else
    # Simple approach for index.html too
    cat > temp.html << EOF
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
EOF
    # Insert after main.js script tag
    awk '/<script src="js\/main.js"><\/script>/{print;system("cat temp.html");next}1' index.html > index.new.html
    mv index.new.html index.html
    rm temp.html
    echo "✓ Added sensitivity analysis button handler directly to index.html"
  fi
  
  echo "✓ Added sensitivity analysis button to index.html"
else
  echo "✗ index.html not found - cannot add sensitivity analysis button"
fi
ENDSCRIPT

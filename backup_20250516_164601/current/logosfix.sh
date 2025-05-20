#!/bin/bash

echo "Portnox Logo Fix - Finding and Fixing Logo Issues"
echo "================================================"

# First, let's find where the vendor logos actually are in your system
echo "Searching for existing vendor logos in the project..."
LOGO_LOCATIONS=$(find . -name "*logo*" -type f | grep -v "node_modules" | sort)

if [ -z "$LOGO_LOCATIONS" ]; then
  echo "No logo files found in the project. We need to locate them."
else
  echo "Found these logo files:"
  echo "$LOGO_LOCATIONS"
fi

# Create the necessary directories if they don't exist
mkdir -p img/vendors

# Check if the main Portnox logo exists and copy it to the right location
PORTNOX_LOGO=$(find . -name "portnox*logo*" -type f | grep -v "node_modules" | head -1)
if [ -n "$PORTNOX_LOGO" ]; then
  echo "Found Portnox logo at: $PORTNOX_LOGO"
  cp "$PORTNOX_LOGO" img/portnox-logo.png
  cp "$PORTNOX_LOGO" img/vendors/portnox-logo.png
  echo "✓ Copied Portnox logo to required locations"
else
  echo "× Could not find Portnox logo"
fi

# List of vendors we need logos for
VENDORS=("cisco" "aruba" "forescout" "fortinac" "juniper" "securew2" "microsoft" "arista" "foxpass" "no-nac")

# Try to find and copy each vendor logo
for VENDOR in "${VENDORS[@]}"; do
  # Look for this vendor's logo in any subdirectory
  VENDOR_LOGO=$(find . -name "${VENDOR}*logo*" -type f | grep -v "node_modules" | head -1)
  
  if [ -n "$VENDOR_LOGO" ]; then
    echo "Found $VENDOR logo at: $VENDOR_LOGO"
    cp "$VENDOR_LOGO" "img/vendors/${VENDOR}-logo.png"
    echo "✓ Copied $VENDOR logo to img/vendors/${VENDOR}-logo.png"
  else
    echo "× Could not find $VENDOR logo"
  fi
done

# Now let's directly check and fix the img/vendors directory
echo "Checking vendor logos in img/vendors directory..."

# List files in img/vendors
if [ -d "img/vendors" ]; then
  ls -la img/vendors/
fi

# Add a section to index.html to show what logo paths are being used
echo "Adding a logo debugging section to index.html..."

# Create a small debugging function to check what's happening with the logos
cat > js/logo-debug.js << 'EOF'
document.addEventListener('DOMContentLoaded', function() {
  // Add a small debugging info at the bottom
  const footer = document.querySelector('.app-footer');
  if (footer) {
    const debugInfo = document.createElement('div');
    debugInfo.style.fontSize = '10px';
    debugInfo.style.color = '#666';
    debugInfo.style.marginTop = '10px';
    debugInfo.style.borderTop = '1px solid #ddd';
    debugInfo.style.paddingTop = '10px';
    
    // Get all image elements
    const images = document.querySelectorAll('img');
    let logoHtml = '<strong>Logo Debug:</strong><br>';
    
    images.forEach(img => {
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt') || 'No alt';
      const loaded = img.complete && img.naturalHeight !== 0;
      
      logoHtml += `${src} (${alt}): ${loaded ? '✓' : '×'}<br>`;
      
      // If image failed to load, add a red border
      if (!loaded) {
        img.style.border = '2px solid red';
        img.style.padding = '2px';
      }
    });
    
    debugInfo.innerHTML = logoHtml;
    footer.appendChild(debugInfo);
  }
  
  // Try to fix the sidebar toggle
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
      console.log('Sidebar toggle clicked, sidebar classes:', sidebar.className);
    });
  }
});
EOF

# Add the debug script to index.html
sed -i '/<\/body>/i \    <script src="js/logo-debug.js"></script>' index.html

# Create a direct fix for the most critical logos
echo "Creating direct fix for critical logos..."

# Update index.html to use absolute paths for the main logo
sed -i 's/<img src="img\/vendors\/portnox-logo.png"/<img src="\/img\/vendors\/portnox-logo.png"/g' index.html
sed -i 's/<img src="img\/portnox-logo.png"/<img src="\/img\/portnox-logo.png"/g' index.html

# Create a CSS fix that tries multiple paths for logos
cat > css/logo-fix.css << 'EOF'
/* Logo fixes */
.company-logo {
  content: url("/img/portnox-logo.png");
}

.company-logo:not([src]) {
  content: url("/img/vendors/portnox-logo.png");
}

.company-logo:not([src]) {
  content: url("../img/portnox-logo.png");
}

.company-logo:not([src]) {
  content: url("../img/vendors/portnox-logo.png");
}

/* Vendor logo fallbacks */
.vendor-card[data-vendor="portnox"] .vendor-logo img {
  content: url("/img/vendors/portnox-logo.png");
}

.vendor-card[data-vendor="cisco"] .vendor-logo img {
  content: url("/img/vendors/cisco-logo.png");
}

.vendor-card[data-vendor="aruba"] .vendor-logo img {
  content: url("/img/vendors/aruba-logo.png");
}

.vendor-card[data-vendor="forescout"] .vendor-logo img {
  content: url("/img/vendors/forescout-logo.png");
}

.vendor-card[data-vendor="fortinac"] .vendor-logo img {
  content: url("/img/vendors/fortinac-logo.png");
}

.vendor-card[data-vendor="juniper"] .vendor-logo img {
  content: url("/img/vendors/juniper-logo.png");
}
EOF

# Add logo fix CSS to index.html
sed -i '/<\/head>/i \    <link rel="stylesheet" href="css/logo-fix.css">' index.html

echo "Logo fix applied. Please refresh your browser to see if it worked."
echo "If it still doesn't work, check the 'Logo Debug' section at the bottom of the page for more info."
echo ""
echo "If logos still don't show up, they may not exist in your project structure."
echo "In that case, please check if there are any logos in the backup directory or elsewhere in the project."

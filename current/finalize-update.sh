#!/bin/bash

echo "Portnox Total Cost Analyzer - UI Enhancement and Fix Script"
echo "=========================================================="
echo "Starting comprehensive UI fixes..."

# Create required directories if they don't exist
mkdir -p img/vendors css/fixes js/fixes

# 1. Fix logo display issues
echo -e "\n[1/4] Fixing logo display issues..."

# Create a CSS file that handles multiple logo path scenarios and adds better error handling
cat > css/fixes/logo-fixes.css << 'EOF'
/* Logo path fixes */
.company-logo {
  max-height: 40px;
  width: auto;
}

/* Vendor card improvements */
.vendor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)) !important;
  gap: 10px !important;
}

.vendor-card {
  height: auto !important;
  padding: 8px !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.vendor-card .vendor-logo {
  height: 30px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.vendor-card .vendor-logo img {
  max-height: 30px;
  max-width: 90%;
  object-fit: contain;
}

.vendor-card .vendor-info h3 {
  font-size: 0.85rem !important;
  margin: 0 0 4px 0 !important;
}

.vendor-card .vendor-info p {
  font-size: 0.75rem !important;
  margin: 0 !important;
}

.vendor-card .vendor-badge {
  margin-top: 5px !important;
}

.vendor-card .vendor-badge .badge {
  font-size: 0.7rem !important;
  padding: 2px 5px !important;
}

/* Logo error handling and fallbacks */
img.company-logo:not([src]), 
.vendor-logo img:not([src]) {
  min-height: 30px;
  min-width: 60px;
  background-color: rgba(0,0,0,0.1);
  border-radius: 4px;
  position: relative;
}

img.company-logo:not([src])::after, 
.vendor-logo img:not([src])::after {
  content: "Logo";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  color: #666;
}

/* Ensure logos load with absolute paths */
[data-vendor="portnox"] .vendor-logo img {
  content: url("/img/vendors/portnox-logo.png");
}

[data-vendor="portnox"] .vendor-logo img:not([src]) {
  content: url("../img/vendors/portnox-logo.png");
}

[data-vendor="cisco"] .vendor-logo img {
  content: url("/img/vendors/cisco-logo.png");
}

[data-vendor="cisco"] .vendor-logo img:not([src]) {
  content: url("../img/vendors/cisco-logo.png");
}

[data-vendor="aruba"] .vendor-logo img {
  content: url("/img/vendors/aruba-logo.png");
}

[data-vendor="forescout"] .vendor-logo img {
  content: url("/img/vendors/forescout-logo.png");
}

[data-vendor="fortinac"] .vendor-logo img {
  content: url("/img/vendors/fortinac-logo.png");
}

[data-vendor="juniper"] .vendor-logo img {
  content: url("/img/vendors/juniper-logo.png");
}

[data-vendor="securew2"] .vendor-logo img {
  content: url("/img/vendors/securew2-logo.png");
}

[data-vendor="microsoft"] .vendor-logo img, 
[data-vendor="nps"] .vendor-logo img {
  content: url("/img/vendors/microsoft-logo.png");
}

[data-vendor="arista"] .vendor-logo img {
  content: url("/img/vendors/arista-logo.png");
}

[data-vendor="foxpass"] .vendor-logo img {
  content: url("/img/vendors/foxpass-logo.png");
}

[data-vendor="no-nac"] .vendor-logo img {
  content: url("/img/vendors/no-nac-icon.png");
}
EOF

echo "✓ Created logo fixes CSS"

# 2. Fix sidebar collapse functionality
echo -e "\n[2/4] Fixing sidebar collapse functionality..."

# Create a JavaScript file to handle the sidebar toggle correctly
cat > js/fixes/sidebar-fixes.js << 'EOF'
document.addEventListener('DOMContentLoaded', function() {
  // Fix sidebar toggle functionality
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const contentArea = document.getElementById('content-area');
  
  if (sidebarToggle && sidebar && contentArea) {
    // Initial state - ensure correct classes
    sidebar.classList.add('sidebar-active');
    
    sidebarToggle.addEventListener('click', function() {
      // Toggle sidebar visibility
      sidebar.classList.toggle('sidebar-collapsed');
      contentArea.classList.toggle('content-expanded');
      
      // Toggle icon direction
      const icon = sidebarToggle.querySelector('i');
      if (icon) {
        if (sidebar.classList.contains('sidebar-collapsed')) {
          icon.classList.remove('fa-chevron-left');
          icon.classList.add('fa-chevron-right');
          sidebarToggle.setAttribute('title', 'Expand sidebar');
        } else {
          icon.classList.remove('fa-chevron-right');
          icon.classList.add('fa-chevron-left');
          sidebarToggle.setAttribute('title', 'Collapse sidebar');
        }
      }
    });
    
    // Add responsive behavior for smaller screens
    function handleResize() {
      if (window.innerWidth < 768) {
        sidebar.classList.add('sidebar-collapsed');
        contentArea.classList.add('content-expanded');
        
        // Update icon
        const icon = sidebarToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-chevron-left');
          icon.classList.add('fa-chevron-right');
        }
      }
    }
    
    // Initial check
    handleResize();
    
    // Add event listener for resize
    window.addEventListener('resize', handleResize);
  }
  
  // Add debug info for image loading
  const imagesToCheck = document.querySelectorAll('img');
  const imageStatus = {};
  
  imagesToCheck.forEach(img => {
    const src = img.getAttribute('src') || 'no-src';
    imageStatus[src] = 'pending';
    
    // Add event listeners to track loading status
    img.addEventListener('load', function() {
      imageStatus[src] = 'loaded';
      console.log(`Image loaded: ${src}`);
      img.classList.add('loaded-image');
    });
    
    img.addEventListener('error', function() {
      imageStatus[src] = 'failed';
      console.error(`Image failed to load: ${src}`);
      img.classList.add('failed-image');
      
      // Try to apply fallback if this is a vendor logo
      const vendorCard = img.closest('.vendor-card');
      if (vendorCard) {
        const vendor = vendorCard.getAttribute('data-vendor');
        console.log(`Attempting fallback for ${vendor} logo`);
      }
    });
  });
  
  // After a delay, check and report image loading status
  setTimeout(() => {
    console.table(imageStatus);
  }, 2000);
});
EOF

echo "✓ Created sidebar fix JavaScript"

# 3. Add CSS for sidebar collapse and general UI improvements
echo -e "\n[3/4] Adding CSS for sidebar collapse and UI improvements..."

# Create CSS file for sidebar behavior
cat > css/fixes/sidebar-fixes.css << 'EOF'
/* Sidebar toggle behavior */
.sidebar {
  transition: width 0.3s ease, transform 0.3s ease;
  position: relative;
  width: 350px;
  flex-shrink: 0;
  overflow: hidden;
}

.sidebar-collapsed {
  width: 0;
  transform: translateX(-100%);
}

.content-area {
  transition: padding-left 0.3s ease, width 0.3s ease;
  flex: 1;
}

.content-expanded {
  padding-left: 0;
}

.sidebar-toggle {
  position: absolute;
  top: 50%;
  right: -15px;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
}

.sidebar-toggle:hover {
  background-color: #f8f9fa;
  box-shadow: 0 3px 8px rgba(0,0,0,0.15);
}

/* Fix for vendor cards to ensure they're not cut off */
.vendor-grid {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 5px;
}

/* Better scrollbars */
.vendor-grid::-webkit-scrollbar {
  width: 8px;
}

.vendor-grid::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.vendor-grid::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.vendor-grid::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Image loading visual indicators */
img.loaded-image {
  /* Optional: add a subtle effect for successfully loaded images */
  transition: opacity 0.3s ease;
}

img.failed-image {
  border: 2px solid rgba(255, 0, 0, 0.3);
  background-color: rgba(255, 0, 0, 0.05);
  position: relative;
}

/* Responsive fixes */
@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    z-index: 100;
    background: white;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
    height: 100%;
  }
  
  .sidebar-collapsed {
    transform: translateX(-100%);
  }
  
  .content-area {
    width: 100%;
  }
  
  .vendor-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)) !important;
  }
}
EOF

echo "✓ Created sidebar behavior CSS"

# 4. Create a debug utility to help identify issues
echo -e "\n[4/4] Creating debug utilities..."

# Create debug JavaScript
cat > js/fixes/debug-utilities.js << 'EOF'
// Debug Utilities
console.log('Debug utilities loaded');

// Function to inspect all vendor cards and display their data
function inspectVendorCards() {
  const cards = document.querySelectorAll('.vendor-card');
  const results = [];
  
  cards.forEach(card => {
    const vendor = card.getAttribute('data-vendor');
    const logoImg = card.querySelector('.vendor-logo img');
    const logoSrc = logoImg ? logoImg.getAttribute('src') : 'no image';
    const logoComplete = logoImg ? logoImg.complete : false;
    const logoLoaded = logoImg && logoImg.complete && logoImg.naturalHeight !== 0;
    
    results.push({
      vendor,
      logoSrc,
      logoLoaded,
      cardWidth: card.offsetWidth,
      cardHeight: card.offsetHeight
    });
  });
  
  console.table(results);
  return results;
}

// Function to check paths of all images
function checkImagePaths() {
  const images = document.querySelectorAll('img');
  const results = [];
  
  images.forEach(img => {
    results.push({
      src: img.getAttribute('src') || 'no-src',
      alt: img.getAttribute('alt') || 'no-alt',
      loaded: img.complete && img.naturalHeight !== 0,
      width: img.offsetWidth,
      height: img.offsetHeight,
      parent: img.parentElement.tagName + (img.parentElement.className ? '.' + img.parentElement.className : '')
    });
  });
  
  console.table(results);
  return results;
}

// Function to test and report sidebar behavior
function testSidebar() {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebar-toggle');
  const contentArea = document.getElementById('content-area');
  
  return {
    sidebarExists: !!sidebar,
    toggleExists: !!toggle,
    contentExists: !!contentArea,
    sidebarClasses: sidebar ? sidebar.className : 'N/A',
    sidebarWidth: sidebar ? sidebar.offsetWidth : 'N/A',
    sidebarDisplay: sidebar ? getComputedStyle(sidebar).display : 'N/A',
    toggleWorks: toggle ? 'Click to test' : 'N/A'
  };
}

// Create global debug object
window.debugTCA = {
  inspectVendorCards,
  checkImagePaths,
  testSidebar,
  fixSidebar: function() {
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.getElementById('content-area');
    
    if (sidebar && contentArea) {
      sidebar.style.display = 'block';
      sidebar.style.width = '350px';
      sidebar.style.transform = 'none';
      sidebar.classList.remove('sidebar-collapsed');
      contentArea.classList.remove('content-expanded');
      return 'Sidebar reset';
    }
    return 'Sidebar not found';
  }
};

// Add a small debug panel to the UI
function addDebugPanel() {
  const debugPanel = document.createElement('div');
  debugPanel.style.position = 'fixed';
  debugPanel.style.bottom = '10px';
  debugPanel.style.right = '10px';
  debugPanel.style.backgroundColor = 'rgba(0,0,0,0.7)';
  debugPanel.style.color = 'white';
  debugPanel.style.padding = '10px';
  debugPanel.style.borderRadius = '5px';
  debugPanel.style.fontSize = '12px';
  debugPanel.style.zIndex = '9999';
  debugPanel.style.display = 'none'; // Hidden by default
  
  debugPanel.innerHTML = `
    <div style="margin-bottom:5px;font-weight:bold;">Debug Panel</div>
    <button id="debug-toggle-panel" style="padding:2px 5px;margin-right:5px;cursor:pointer;">Toggle</button>
    <button id="debug-check-images" style="padding:2px 5px;margin-right:5px;cursor:pointer;">Check Images</button>
    <button id="debug-check-vendors" style="padding:2px 5px;margin-right:5px;cursor:pointer;">Check Vendors</button>
    <button id="debug-test-sidebar" style="padding:2px 5px;cursor:pointer;">Test Sidebar</button>
    <div id="debug-output" style="margin-top:5px;max-height:150px;overflow-y:auto;"></div>
  `;
  
  document.body.appendChild(debugPanel);
  
  // Add key combination to show debug panel
  document.addEventListener('keydown', function(e) {
    // Ctrl+Shift+D
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      debugPanel.style.display = debugPanel.style.display === 'none' ? 'block' : 'none';
    }
  });
  
  // Add event listeners to buttons
  document.getElementById('debug-toggle-panel').addEventListener('click', function() {
    debugPanel.style.display = debugPanel.style.display === 'none' ? 'block' : 'none';
  });
  
  document.getElementById('debug-check-images').addEventListener('click', function() {
    const results = checkImagePaths();
    const output = document.getElementById('debug-output');
    output.innerHTML = '<div style="font-weight:bold;">Image Check Results:</div>';
    
    const failedImages = results.filter(img => !img.loaded);
    if (failedImages.length) {
      output.innerHTML += `<div style="color:#ff6b6b;">${failedImages.length} failed images</div>`;
      failedImages.forEach(img => {
        output.innerHTML += `<div>${img.src} - ${img.parent}</div>`;
      });
    } else {
      output.innerHTML += '<div style="color:#69db7c;">All images loaded successfully!</div>';
    }
  });
  
  document.getElementById('debug-check-vendors').addEventListener('click', function() {
    const results = inspectVendorCards();
    const output = document.getElementById('debug-output');
    output.innerHTML = '<div style="font-weight:bold;">Vendor Card Results:</div>';
    
    const failedCards = results.filter(card => !card.logoLoaded);
    if (failedCards.length) {
      output.innerHTML += `<div style="color:#ff6b6b;">${failedCards.length} vendor cards with failed logos</div>`;
      failedCards.forEach(card => {
        output.innerHTML += `<div>${card.vendor} - ${card.logoSrc}</div>`;
      });
    } else {
      output.innerHTML += '<div style="color:#69db7c;">All vendor logos loaded successfully!</div>';
    }
  });
  
  document.getElementById('debug-test-sidebar').addEventListener('click', function() {
    const results = testSidebar();
    const output = document.getElementById('debug-output');
    output.innerHTML = '<div style="font-weight:bold;">Sidebar Test Results:</div>';
    
    for (const [key, value] of Object.entries(results)) {
      output.innerHTML += `<div>${key}: ${value}</div>`;
    }
    
    output.innerHTML += `<div><button id="debug-fix-sidebar" style="padding:2px 5px;margin-top:5px;cursor:pointer;">Fix Sidebar</button></div>`;
    
    document.getElementById('debug-fix-sidebar').addEventListener('click', function() {
      const fixResult = window.debugTCA.fixSidebar();
      this.insertAdjacentHTML('afterend', `<div style="color:#69db7c;">${fixResult}</div>`);
    });
  });
}

// Initialize debug panel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  addDebugPanel();
  
  // Run initial checks after a short delay to ensure all resources have loaded
  setTimeout(() => {
    console.group('Initial Debug Checks');
    console.log('Image path check:');
    checkImagePaths();
    console.log('Vendor cards check:');
    inspectVendorCards();
    console.log('Sidebar status:');
    console.table(testSidebar());
    console.groupEnd();
  }, 2000);
});
EOF

echo "✓ Created debug utilities JavaScript"

# 5. Create installation function
echo -e "\n[5/4] Installing fixes..."

# Function to backup and modify files
installFixes() {
  # Create backup directory
  mkdir -p backups/$(date +%Y%m%d%H%M%S)
  
  # Backup index.html
  cp index.html backups/$(date +%Y%m%d%H%M%S)/index.html
  
  # Modify index.html to include our fixes
  if grep -q "</head>" index.html; then
    # Add CSS files before closing head tag
    sed -i '/<\/head>/i \    <link rel="stylesheet" href="css\/fixes\/logo-fixes.css">\n    <link rel="stylesheet" href="css\/fixes\/sidebar-fixes.css">' index.html
    echo "✓ Added fix CSS to index.html"
    
    # Add JavaScript files before closing body tag
    sed -i '/<\/body>/i \    <script src="js\/fixes\/sidebar-fixes.js"><\/script>\n    <script src="js\/fixes\/debug-utilities.js"><\/script>' index.html
    echo "✓ Added fix JavaScript to index.html"
  else
    echo "× Could not find </head> or </body> tags in index.html"
  fi
  
  # Copy sample logos if actual logos don't exist
  mkdir -p img/vendors
  
  # Check for vendor logos and create placeholders if needed
  VENDORS=("portnox" "cisco" "aruba" "forescout" "fortinac" "juniper" "securew2" "microsoft" "arista" "foxpass" "no-nac")
  
  for VENDOR in "${VENDORS[@]}"; do
    if [ ! -f "img/vendors/${VENDOR}-logo.png" ]; then
      # Create a placeholder logo
      echo "Creating placeholder for ${VENDOR} logo..."
      
      # Simple script to generate a colored rectangle with text
      cat > "img/vendors/${VENDOR}-logo.png.placeholder" << EOF
Placeholder for ${VENDOR} logo
This file indicates that the actual logo is missing
EOF
      
      echo "× Created placeholder for missing ${VENDOR} logo"
    else
      echo "✓ Found logo for ${VENDOR}"
    fi
  done
  
  echo "✓ Checked vendor logos"
  
  # Create a .gitignore for the placeholders
  echo "*.placeholder" > .gitignore
  
  echo "✓ Installation complete!"
}

# Run the installation function
installFixes

# Create a simple test script
cat > test-ui.sh << 'EOF'
#!/bin/bash

echo "Running UI Tests..."

# Check if index.html exists
if [ ! -f "index.html" ]; then
  echo "× index.html not found!"
  exit 1
fi

# Check if our CSS and JS files are included
if grep -q "logo-fixes.css" index.html && \
   grep -q "sidebar-fixes.css" index.html && \
   grep -q "sidebar-fixes.js" index.html && \
   grep -q "debug-utilities.js" index.html; then
  echo "✓ All fix files are included in index.html"
else
  echo "× Some fix files are not included in index.html"
  grep -n "fixes" index.html || echo "No fixes found in index.html"
fi

# Check for vendor logo files
VENDORS=("portnox" "cisco" "aruba" "forescout" "fortinac" "juniper" "securew2" "microsoft" "arista" "foxpass" "no-nac")
MISSING_LOGOS=0

for VENDOR in "${VENDORS[@]}"; do
  if [ -f "img/vendors/${VENDOR}-logo.png" ]; then
    echo "✓ ${VENDOR} logo exists"
  else
    echo "× ${VENDOR} logo is missing"
    MISSING_LOGOS=$((MISSING_LOGOS+1))
  fi
done

if [ $MISSING_LOGOS -gt 0 ]; then
  echo "There are ${MISSING_LOGOS} missing logos. To fix this:"
  echo "1. Add the missing logos to the img/vendors directory"
  echo "2. Make sure they follow the naming pattern: vendor-logo.png"
  echo "3. Run the fix script again if needed"
else
  echo "✓ All vendor logos are present"
fi

echo "Tests completed!"
EOF

chmod +x test-ui.sh

echo -e "\n=========================================================="
echo "All fixes have been applied!"
echo "To test the fixes, open the application in your browser."
echo "If issues persist, press Ctrl+Shift+D to access the debug panel."
echo "You can also run ./test-ui.sh to check for common issues."
echo "=========================================================="

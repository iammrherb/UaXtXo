#!/bin/bash

# Direct fixes for the specific errors encountered
# No rewrites, no sample data, no fancy stuff - just fixes the damn errors

# Color definitions
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Log function
log() {
    echo -e "${GREEN}[LOG]${NC} $1"
}

# Error function
error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

log "Starting error fixes..."

# Project directory
PROJECT_DIR="$(pwd)"

# PART 1: FIX THE MISSING LOGO FILES
log "Fixing logo path issues..."

# Create a correct symlink from img/vendors to where the logo files actually exist
if [ -d "${PROJECT_DIR}/img" ] && [ ! -d "${PROJECT_DIR}/img/vendors" ]; then
    log "Creating vendors directory if it doesn't exist"
    mkdir -p "${PROJECT_DIR}/img/vendors"
fi

# Check for the actual location of logo files
if [ -f "${PROJECT_DIR}/img/cisco-logo.png" ]; then
    log "Found logo files in img/ - creating symlinks to img/vendors/"
    
    # Copy logos from the main img directory to vendors
    for logo in cisco aruba forescout fortinac microsoft securew2; do
        if [ -f "${PROJECT_DIR}/img/${logo}-logo.png" ] && [ ! -f "${PROJECT_DIR}/img/vendors/${logo}-logo.png" ]; then
            log "Copying ${logo}-logo.png to vendors directory"
            cp "${PROJECT_DIR}/img/${logo}-logo.png" "${PROJECT_DIR}/img/vendors/"
        else
            log "${logo}-logo.png not found in img/ or already exists in vendors/"
        fi
    done
else
    log "Creating simple PNG logos in img/vendors/ as fallback"
    
    # Create simple PNG files for each vendor logo
    for vendor in cisco aruba forescout fortinac microsoft securew2; do
        log "Creating ${vendor}-logo.png"
        
        # Create a simple colored rectangle as a logo
        convert -size 200x80 xc:white -fill blue -draw "rectangle 10,10 190,70" -fill black -pointsize 20 -gravity center -annotate 0 "${vendor}" "${PROJECT_DIR}/img/vendors/${vendor}-logo.png" 2>/dev/null || \
        log "Failed to create image with ImageMagick, creating empty file instead" && touch "${PROJECT_DIR}/img/vendors/${vendor}-logo.png"
    done
fi

# PART 2: REMOVE REFERENCES TO MISSING CSS
log "Removing references to missing CSS files..."

# Check if index.html exists
if [ -f "${PROJECT_DIR}/index.html" ]; then
    # Backup the file
    cp "${PROJECT_DIR}/index.html" "${PROJECT_DIR}/index.html.bak"
    
    # Remove reference to wizard-fix.css if it doesn't exist
    if ! [ -f "${PROJECT_DIR}/css/wizards/standalone/wizard-fix.css" ]; then
        log "Removing reference to non-existent wizard-fix.css"
        sed -i '/wizard-fix.css/d' "${PROJECT_DIR}/index.html"
    fi
else
    log "index.html not found"
fi

# PART 3: FIX JAVASCRIPT SYNTAX ERRORS
log "Fixing JavaScript syntax errors..."

# Fix "Unexpected token '=='" in wizard.js
if [ -f "${PROJECT_DIR}/js/wizard.js" ]; then
    log "Fixing == token issue in wizard.js"
    cp "${PROJECT_DIR}/js/wizard.js" "${PROJECT_DIR}/js/wizard.js.bak"
    
    # Replace == with === in conditional statements
    sed -i 's/if ([^=]*) ==/if (\1) ===/' "${PROJECT_DIR}/js/wizard.js"
    sed -i 's/if (\([^=]*\)) ==/if (\1) ===/' "${PROJECT_DIR}/js/wizard.js"
    sed -i 's/if (\([^=]*\) ==/if (\1 ===/' "${PROJECT_DIR}/js/wizard.js"
fi

# Fix "Unexpected token '=='" in wizard-controller.js
if [ -f "${PROJECT_DIR}/js/wizards/wizard-controller.js" ]; then
    log "Fixing == token issue in wizard-controller.js"
    cp "${PROJECT_DIR}/js/wizards/wizard-controller.js" "${PROJECT_DIR}/js/wizards/wizard-controller.js.bak"
    
    # Replace == with === in conditional statements
    sed -i 's/if ([^=]*) ==/if (\1) ===/' "${PROJECT_DIR}/js/wizards/wizard-controller.js"
    sed -i 's/if (\([^=]*\)) ==/if (\1) ===/' "${PROJECT_DIR}/js/wizards/wizard-controller.js"
    sed -i 's/if (\([^=]*\) ==/if (\1 ===/' "${PROJECT_DIR}/js/wizards/wizard-controller.js"
fi

# Fix "Invalid left-hand side in assignment" in calculator.js line 315
if [ -f "${PROJECT_DIR}/js/components/calculator.js" ]; then
    log "Fixing invalid left-hand side assignment in calculator.js line 315"
    cp "${PROJECT_DIR}/js/components/calculator.js" "${PROJECT_DIR}/js/components/calculator.js.bak"
    
    # Directly fix line 315
    line_content=$(sed -n '315p' "${PROJECT_DIR}/js/components/calculator.js")
    log "Line 315 content: ${line_content}"
    
    if [[ $line_content == *"="* ]]; then
        # Fix assignment in if condition
        sed -i '315s/if ([^=]*)=/if (\1===/' "${PROJECT_DIR}/js/components/calculator.js"
        sed -i '315s/if (\([^=]*\))=/if (\1)===/' "${PROJECT_DIR}/js/components/calculator.js"
        sed -i '315s/if (\([^=]*\)=/if (\1===/' "${PROJECT_DIR}/js/components/calculator.js"
    fi
fi

# PART 4: CREATE A MINIMAL FIX FOR VENDOR IMAGE LOADING
log "Creating image loader fix..."

# Create an image loader fix script
mkdir -p "${PROJECT_DIR}/js/fixes"
cat > "${PROJECT_DIR}/js/fixes/image-fix.js" << 'EOL'
/**
 * Minimal image loading fix
 */
document.addEventListener('DOMContentLoaded', function() {
    // Fix vendor card images
    var vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(function(card) {
        var img = card.querySelector('img');
        if (img) {
            // Get vendor from card data attribute or class
            var vendor = card.dataset.vendor || card.className.match(/vendor-(\w+)/)?.[1] || '';
            
            // Add error handler
            img.onerror = function() {
                console.warn('Failed to load image:', this.src);
                
                // Try different paths
                if (this.src.includes('/vendors/')) {
                    // Try direct in img folder
                    this.src = this.src.replace('/vendors/', '/');
                } else if (!this.src.includes('vendors/')) {
                    // Try in vendors folder
                    var parts = this.src.split('/');
                    var filename = parts[parts.length - 1];
                    this.src = 'img/vendors/' + filename;
                }
                
                // As a last resort, set a colored background with text
                this.onerror = function() {
                    var container = this.parentNode;
                    if (container) {
                        // Style the parent as a colored box with text
                        container.style.background = getVendorColor(vendor);
                        container.style.display = 'flex';
                        container.style.alignItems = 'center';
                        container.style.justifyContent = 'center';
                        container.style.color = 'white';
                        container.style.fontWeight = 'bold';
                        container.style.textTransform = 'uppercase';
                        container.style.padding = '10px';
                        container.style.height = '80px';
                        container.style.width = '100%';
                        
                        // Add text inside
                        container.textContent = vendor || 'Vendor';
                        
                        // Remove the img element
                        this.style.display = 'none';
                    }
                };
            };
            
            // Force reload to trigger error handler if needed
            var currentSrc = img.src;
            if (currentSrc) {
                img.src = '';
                setTimeout(function() {
                    img.src = currentSrc;
                }, 0);
            }
        }
    });
    
    // Get a color for a vendor
    function getVendorColor(vendor) {
        var colors = {
            cisco: '#049fd9',
            aruba: '#f78e1e',
            forescout: '#d64000',
            fortinac: '#ee3124',
            nps: '#7fba00',
            microsoft: '#7fba00',
            securew2: '#00b2e3',
            noNac: '#b22222'
        };
        
        return colors[vendor] || '#1b67b2';
    }
});
EOL

# Add the image fix to index.html
if [ -f "${PROJECT_DIR}/index.html" ]; then
    log "Adding image fix to index.html"
    if ! grep -q "image-fix.js" "${PROJECT_DIR}/index.html"; then
        cp "${PROJECT_DIR}/index.html" "${PROJECT_DIR}/index.html.bak2"
        sed -i '/<\/head>/i\    <script src="js\/fixes\/image-fix.js"><\/script>' "${PROJECT_DIR}/index.html"
    fi
fi

log "All fixes applied. Please refresh the application to see the changes."
log "If the errors persist, please provide the exact file paths where the errors are occurring."

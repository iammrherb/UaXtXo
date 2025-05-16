#!/bin/bash

echo "Checking and fixing vendor logos for Portnox Total Cost Analyzer"
echo "==============================================================="

# Create necessary directories
mkdir -p img/vendors

# Function to check if a logo exists or create a placeholder
check_or_create_logo() {
    local vendor=$1
    local file_type=${2:-png}
    local logo_path="img/vendors/${vendor}-logo.${file_type}"
    
    if [ ! -f "$logo_path" ]; then
        echo "Logo not found for $vendor in $logo_path. Creating symbolic link or placeholder."
        
        # Check for alternative file types
        if [ -f "img/vendors/${vendor}-logo.svg" ]; then
            echo "  Found SVG version. Using that instead."
        elif [ -f "img/vendors/${vendor}-logo.png" ] && [ "$file_type" = "svg" ]; then
            echo "  Found PNG version. Using that instead."
        elif [ -f "img/vendors/${vendor}.png" ]; then
            echo "  Found alternate naming format. Creating symlink."
            ln -sf "img/vendors/${vendor}.png" "$logo_path"
        elif [ -f "img/vendors/${vendor}.svg" ]; then
            echo "  Found alternate naming format. Creating symlink."
            ln -sf "img/vendors/${vendor}.svg" "$logo_path"
        else
            # Create a placeholder using a text-based SVG
            echo "  Creating placeholder logo."
            create_placeholder_logo "$vendor" "$logo_path"
        fi
    else
        echo "✓ Found logo for $vendor"
    fi
}

# Create a placeholder logo with vendor name
create_placeholder_logo() {
    local vendor=$1
    local output_path=$2
    local display_name=$(echo "$vendor" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')
    
    # Create a basic SVG with the vendor name
    cat > "$output_path" << SVGEOF
<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="100" fill="#f8f9fa" stroke="#e0e0e0" stroke-width="2" rx="10" ry="10"/>
  <text x="100" y="55" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#1565c0">$display_name</text>
</svg>
SVGEOF
    
    echo "  Created placeholder logo for $display_name"
}

# Check special case for no-nac icon
if [ ! -f "img/vendors/no-nac-icon.png" ]; then
    echo "Creating no-nac icon..."
    
    # Check for alternative names
    if [ -f "img/vendors/no_nac-icon.png" ]; then
        ln -sf "img/vendors/no_nac-icon.png" "img/vendors/no-nac-icon.png"
    elif [ -f "img/vendors/no-nac.png" ]; then
        ln -sf "img/vendors/no-nac.png" "img/vendors/no-nac-icon.png"
    else
        # Create a placeholder
        cat > "img/vendors/no-nac-icon.png" << SVGEOF
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45" fill="#f8f9fa" stroke="#e0e0e0" stroke-width="2"/>
  <text x="50" y="60" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#f44336">No NAC</text>
  <line x1="25" y1="25" x2="75" y2="75" stroke="#f44336" stroke-width="5"/>
  <line x1="75" y1="25" x2="25" y2="75" stroke="#f44336" stroke-width="5"/>
</svg>
SVGEOF
    fi
fi

# Check each vendor logo in both PNG and SVG formats
vendors=("portnox" "cisco" "aruba" "forescout" "fortinac" "juniper" "securew2" "microsoft" "arista" "foxpass" "no-nac")

for vendor in "${vendors[@]}"; do
    check_or_create_logo "$vendor" "png"
    check_or_create_logo "$vendor" "svg"
done

# Check if generic portnox logo exists in root img directory
if [ ! -f "img/portnox-logo.png" ]; then
    echo "Adding Portnox logo to main img directory..."
    if [ -f "img/vendors/portnox-logo.png" ]; then
        cp "img/vendors/portnox-logo.png" "img/portnox-logo.png"
    else
        # Create a placeholder
        create_placeholder_logo "portnox" "img/portnox-logo.png"
    fi
fi

# Create a generic favicon if it doesn't exist
if [ ! -f "img/favicon.png" ]; then
    echo "Creating favicon..."
    cat > "img/favicon.png" << SVGEOF
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="6" fill="#1565c0"/>
  <path d="M8 16C8 11.6 11.6 8 16 8C20.4 8 24 11.6 24 16C24 20.4 20.4 24 16 24" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
  <path d="M16 24C11.6 24 8 20.4 8 16" stroke="#00c853" stroke-width="2.5" fill="none"/>
  <circle cx="16" cy="16" r="3" fill="#FFFFFF"/>
</svg>
SVGEOF
fi

echo "Logo check and fix completed!"

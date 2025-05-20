#!/bin/bash

# NAC Architecture Designer Pro - Migration Script
# This script migrates the codebase to a new directory structure,
# removing duplicates, consolidating CSS files, and organizing assets.

set -e  # Exit on any error

# Configuration
SOURCE_DIR="./current"         # Source directory containing the current code
TARGET_DIR="./nac-designer"    # Target directory for the migrated code
TEMP_DIR="./temp_migration"    # Temporary directory for processing
LOG_FILE="migration_log.txt"   # Log file

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Initialize log file
echo "NAC Architecture Designer Pro Migration Log - $(date)" > "$LOG_FILE"
echo "==================================================" >> "$LOG_FILE"

# Function to log messages
log() {
    local level="$1"
    local message="$2"
    local color="$NC"
    
    case "$level" in
        "INFO")     color="$BLUE" ;;
        "SUCCESS")  color="$GREEN" ;;
        "WARNING")  color="$YELLOW" ;;
        "ERROR")    color="$RED" ;;
    esac
    
    echo -e "${color}[$level] $message${NC}"
    echo "[$level] $message" >> "$LOG_FILE"
}

# Create directory structure
create_directory_structure() {
    log "INFO" "Creating directory structure..."
    
    # Main directories
    mkdir -p "$TARGET_DIR"/{css,js,img,libs,data,assets,docs}
    
    # CSS subdirectories
    mkdir -p "$TARGET_DIR"/css/{themes,components,layouts,animations,visualizations,utilities}
    mkdir -p "$TARGET_DIR"/css/themes/{light,dark}
    mkdir -p "$TARGET_DIR"/css/components/{forms,tables,charts,wizard,modals,navigation}
    
    # JavaScript subdirectories
    mkdir -p "$TARGET_DIR"/js/{utils,managers,components,features,charts,wizards,reports,vendors}
    mkdir -p "$TARGET_DIR"/js/components/{ui,forms}
    mkdir -p "$TARGET_DIR"/js/features/{sensitivity-analysis,breach-analysis,compliance}
    
    # Asset subdirectories
    mkdir -p "$TARGET_DIR"/assets/{fonts,icons}
    
    # Data directories
    mkdir -p "$TARGET_DIR"/data/{vendors,industry,compliance}
    
    # Libraries directory
    mkdir -p "$TARGET_DIR"/libs/{css,js}
    
    log "SUCCESS" "Directory structure created successfully"
}

# Collect all CSS files and deduplicate
process_css_files() {
    log "INFO" "Processing CSS files..."
    
    # Create temporary directory for CSS processing
    mkdir -p "$TEMP_DIR"/css
    
    # Find all CSS files in the source directory
    find "$SOURCE_DIR" -name "*.css" -type f | while read -r file; do
        # Get the filename without path
        filename=$(basename "$file")
        
        # Determine the appropriate target directory based on filename or content analysis
        target_subdir="utilities"  # Default
        
        if [[ "$filename" == *"theme"* ]]; then
            target_subdir="themes"
        elif [[ "$filename" == *"form"* ]]; then
            target_subdir="components/forms"
        elif [[ "$filename" == *"table"* ]]; then
            target_subdir="components/tables"
        elif [[ "$filename" == *"chart"* ]] || [[ "$filename" == *"visualization"* ]]; then
            target_subdir="components/charts"
        elif [[ "$filename" == *"wizard"* ]]; then
            target_subdir="components/wizard"
        elif [[ "$filename" == *"modal"* ]]; then
            target_subdir="components/modals"
        elif [[ "$filename" == *"nav"* ]]; then
            target_subdir="components/navigation"
        elif [[ "$filename" == *"layout"* ]]; then
            target_subdir="layouts"
        elif [[ "$filename" == *"animation"* ]]; then
            target_subdir="animations"
        fi
        
        # Copy to temporary directory for deduplication
        cp "$file" "$TEMP_DIR/css/$filename"
        
        # Log the file
        log "INFO" "Found CSS file: $filename -> css/$target_subdir"
    done
    
    # Remove duplicate files based on content
    log "INFO" "Removing duplicate CSS files..."
    cd "$TEMP_DIR/css"
    
    # Create a list of duplicate files based on content hash
    find . -type f -name "*.css" -exec md5sum {} \; | sort | awk '{print $1, $2}' > checksums.txt
    
    # Extract duplicates
    cat checksums.txt | awk '{print $1}' | uniq -d > duplicate_hashes.txt
    
    # Count duplicates
    duplicate_count=$(wc -l < duplicate_hashes.txt)
    log "INFO" "Found $duplicate_count duplicate CSS files"
    
    # Process each duplicate hash
    while read -r hash; do
        # Get all files with this hash
        files=$(grep "$hash" checksums.txt | awk '{print $2}')
        
        # Keep first file, remove others
        first_file=""
        for file in $files; do
            if [ -z "$first_file" ]; then
                first_file="$file"
                log "INFO" "Keeping: $first_file"
            else
                log "WARNING" "Removing duplicate: $file (same as $first_file)"
                rm "$file"
            fi
        done
    done < duplicate_hashes.txt
    
    cd - > /dev/null
    
    # Now analyze the content of CSS files for potential merging
    log "INFO" "Analyzing CSS content for merging opportunities..."
    
    # Move processed CSS files to target directory with appropriate structure
    find "$TEMP_DIR/css" -name "*.css" -type f | while read -r file; do
        filename=$(basename "$file")
        
        # Determine target directory
        target_subdir="utilities"  # Default
        
        if [[ "$filename" == *"theme"* ]]; then
            target_subdir="themes"
        elif [[ "$filename" == *"form"* ]]; then
            target_subdir="components/forms"
        elif [[ "$filename" == *"table"* ]]; then
            target_subdir="components/tables"
        elif [[ "$filename" == *"chart"* ]] || [[ "$filename" == *"visualization"* ]]; then
            target_subdir="components/charts"
        elif [[ "$filename" == *"wizard"* ]]; then
            target_subdir="components/wizard"
        elif [[ "$filename" == *"modal"* ]]; then
            target_subdir="components/modals"
        elif [[ "$filename" == *"nav"* ]]; then
            target_subdir="components/navigation"
        elif [[ "$filename" == *"layout"* ]]; then
            target_subdir="layouts"
        elif [[ "$filename" == *"animation"* ]]; then
            target_subdir="animations"
        fi
        
        # Copy to final destination
        mkdir -p "$TARGET_DIR/css/$target_subdir"
        cp "$file" "$TARGET_DIR/css/$target_subdir/$filename"
        
        log "SUCCESS" "Processed CSS file: $filename -> css/$target_subdir"
    done
    
    # Merge CSS fix files
    log "INFO" "Merging CSS fix files..."
    cat "$TEMP_DIR"/css/*fix*.css > "$TARGET_DIR/css/utilities/fixes.css"
    log "SUCCESS" "Created consolidated fixes.css"
    
    # Create bundled CSS files
    log "INFO" "Creating bundled CSS files..."
    
    # Core CSS bundle
    cat "$TARGET_DIR"/css/themes/*.css > "$TARGET_DIR/css/core.bundle.css"
    log "SUCCESS" "Created core.bundle.css"
    
    # Components CSS bundle
    find "$TARGET_DIR"/css/components -name "*.css" -type f -exec cat {} \; > "$TARGET_DIR/css/components.bundle.css"
    log "SUCCESS" "Created components.bundle.css"
}

# Process JS files
process_js_files() {
    log "INFO" "Processing JavaScript files..."
    
    # Create temporary directory for JS processing
    mkdir -p "$TEMP_DIR"/js
    
    # Find all JS files in the source directory
    find "$SOURCE_DIR" -name "*.js" -type f | while read -r file; do
        # Get the filename without path
        filename=$(basename "$file")
        
        # Determine the appropriate target directory based on filename or content analysis
        target_subdir="utils"  # Default
        
        if [[ "$filename" == *"manager"* ]]; then
            target_subdir="managers"
        elif [[ "$filename" == *"component"* ]] || [[ "$filename" == *"ui"* ]]; then
            target_subdir="components"
        elif [[ "$filename" == *"feature"* ]]; then
            target_subdir="features"
        elif [[ "$filename" == *"chart"* ]]; then
            target_subdir="charts"
        elif [[ "$filename" == *"wizard"* ]]; then
            target_subdir="wizards"
        elif [[ "$filename" == *"report"* ]]; then
            target_subdir="reports"
        elif [[ "$filename" == *"vendor"* ]]; then
            target_subdir="vendors"
        fi
        
        # Copy to temporary directory for deduplication
        cp "$file" "$TEMP_DIR/js/$filename"
        
        # Log the file
        log "INFO" "Found JS file: $filename -> js/$target_subdir"
    done
    
    # Remove duplicate files based on content
    log "INFO" "Removing duplicate JS files..."
    cd "$TEMP_DIR/js"
    
    # Create a list of duplicate files based on content hash
    find . -type f -name "*.js" -exec md5sum {} \; | sort | awk '{print $1, $2}' > checksums.txt
    
    # Extract duplicates
    cat checksums.txt | awk '{print $1}' | uniq -d > duplicate_hashes.txt
    
    # Count duplicates
    duplicate_count=$(wc -l < duplicate_hashes.txt)
    log "INFO" "Found $duplicate_count duplicate JS files"
    
    # Process each duplicate hash
    while read -r hash; do
        # Get all files with this hash
        files=$(grep "$hash" checksums.txt | awk '{print $2}')
        
        # Keep first file, remove others
        first_file=""
        for file in $files; do
            if [ -z "$first_file" ]; then
                first_file="$file"
                log "INFO" "Keeping: $first_file"
            else
                log "WARNING" "Removing duplicate: $file (same as $first_file)"
                rm "$file"
            fi
        done
    done < duplicate_hashes.txt
    
    cd - > /dev/null
    
    # Move processed JS files to target directory with appropriate structure
    find "$TEMP_DIR/js" -name "*.js" -type f | while read -r file; do
        filename=$(basename "$file")
        
        # Determine target directory
        target_subdir="utils"  # Default
        
        if [[ "$filename" == *"manager"* ]]; then
            target_subdir="managers"
        elif [[ "$filename" == *"component"* ]] || [[ "$filename" == *"ui"* ]]; then
            target_subdir="components"
        elif [[ "$filename" == *"sensitivity"* ]] || [[ "$filename" == *"breach"* ]] || [[ "$filename" == *"compliance"* ]]; then
            if [[ "$filename" == *"sensitivity"* ]]; then
                target_subdir="features/sensitivity-analysis"
            elif [[ "$filename" == *"breach"* ]]; then
                target_subdir="features/breach-analysis"
            elif [[ "$filename" == *"compliance"* ]]; then
                target_subdir="features/compliance"
            fi
        elif [[ "$filename" == *"chart"* ]]; then
            target_subdir="charts"
        elif [[ "$filename" == *"wizard"* ]]; then
            target_subdir="wizards"
        elif [[ "$filename" == *"report"* ]]; then
            target_subdir="reports"
        elif [[ "$filename" == *"vendor"* ]]; then
            target_subdir="vendors"
        fi
        
        # Copy to final destination
        mkdir -p "$TARGET_DIR/js/$target_subdir"
        cp "$file" "$TARGET_DIR/js/$target_subdir/$filename"
        
        log "SUCCESS" "Processed JS file: $filename -> js/$target_subdir"
    done
    
    # Create bundled JS files for key functionality
    log "INFO" "Creating bundled JS files..."
    
    # Core JS bundle
    cat "$TARGET_DIR"/js/utils/*.js "$TARGET_DIR"/js/managers/*.js > "$TARGET_DIR/js/core.bundle.js"
    log "SUCCESS" "Created core.bundle.js"
    
    # Features JS bundle
    find "$TARGET_DIR"/js/features -name "*.js" -type f -exec cat {} \; > "$TARGET_DIR/js/features.bundle.js"
    log "SUCCESS" "Created features.bundle.js"
    
    # UI components bundle
    find "$TARGET_DIR"/js/components -name "*.js" -type f -exec cat {} \; > "$TARGET_DIR/js/components.bundle.js"
    log "SUCCESS" "Created components.bundle.js"
}

# Process HTML files
process_html_files() {
    log "INFO" "Processing HTML files..."
    
    # Find all HTML files
    find "$SOURCE_DIR" -name "*.html" -type f | while read -r file; do
        filename=$(basename "$file")
        
        # Create a cleaned version of the HTML file
        log "INFO" "Cleaning HTML file: $filename"
        
        # Copy the HTML file to the target directory
        cp "$file" "$TARGET_DIR/$filename"
        
        # Update CSS references to use the bundled files
        sed -i 's/<link rel="stylesheet" href="css\/[^"]*\.css"[^>]*>/<link rel="stylesheet" href="css\/core.bundle.css">/' "$TARGET_DIR/$filename"
        sed -i 's/<link rel="stylesheet" href="css\/components\/[^"]*\.css"[^>]*>//g' "$TARGET_DIR/$filename"
        
        # Add the bundled CSS references at the top of the head
        sed -i '/<head>/a \
    <link rel="stylesheet" href="css/core.bundle.css">\
    <link rel="stylesheet" href="css/components.bundle.css">\
    <link rel="stylesheet" href="css/utilities/fixes.css">' "$TARGET_DIR/$filename"
        
        # Update JS references to use the bundled files
        sed -i 's/<script src="js\/utils\/[^"]*\.js"[^>]*><\/script>//g' "$TARGET_DIR/$filename"
        sed -i 's/<script src="js\/managers\/[^"]*\.js"[^>]*><\/script>//g' "$TARGET_DIR/$filename"
        sed -i 's/<script src="js\/components\/[^"]*\.js"[^>]*><\/script>//g' "$TARGET_DIR/$filename"
        
        # Add the bundled JS references at the bottom before </body>
        sed -i '/<\/body>/i \
    <script src="js/core.bundle.js"></script>\
    <script src="js/components.bundle.js"></script>\
    <script src="js/features.bundle.js"></script>' "$TARGET_DIR/$filename"
        
        log "SUCCESS" "Processed HTML file: $filename"
    done
}

# Process image files
process_images() {
    log "INFO" "Processing image files..."
    
    # Create image directories
    mkdir -p "$TARGET_DIR"/img/{vendors,icons}
    
    # Find and copy all image files
    find "$SOURCE_DIR" -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.svg" | while read -r file; do
        filename=$(basename "$file")
        
        # Determine the appropriate target directory
        target_subdir="."  # Default
        
        if [[ "$file" == *"/vendors/"* ]] || [[ "$filename" == *"logo"* ]]; then
            target_subdir="vendors"
        elif [[ "$file" == *"/icons/"* ]] || [[ "$filename" == *"icon"* ]]; then
            target_subdir="icons"
        fi
        
        # Copy to target directory
        cp "$file" "$TARGET_DIR/img/$target_subdir/$filename"
        
        log "SUCCESS" "Processed image: $filename -> img/$target_subdir"
    done
}

# Copy data files
process_data_files() {
    log "INFO" "Processing data files..."
    
    # Find and copy data files (JSON, etc.)
    find "$SOURCE_DIR" -name "*.json" -o -name "*.csv" -o -name "*.xml" | while read -r file; do
        filename=$(basename "$file")
        
        # Determine the appropriate target directory
        target_subdir="."  # Default
        
        if [[ "$file" == *"/vendors/"* ]]; then
            target_subdir="vendors"
        elif [[ "$file" == *"/industry/"* ]]; then
            target_subdir="industry"
        elif [[ "$file" == *"/compliance/"* ]]; then
            target_subdir="compliance"
        fi
        
        # Copy to target directory
        mkdir -p "$TARGET_DIR/data/$target_subdir"
        cp "$file" "$TARGET_DIR/data/$target_subdir/$filename"
        
        log "SUCCESS" "Processed data file: $filename -> data/$target_subdir"
    done
}

# Process library files
process_library_files() {
    log "INFO" "Processing library files..."
    
    # Find and copy library files
    find "$SOURCE_DIR/libs" -type f 2>/dev/null | while read -r file; do
        filename=$(basename "$file")
        extension="${filename##*.}"
        
        # Determine the appropriate target directory
        target_subdir="js"  # Default
        
        if [[ "$extension" == "css" ]]; then
            target_subdir="css"
        fi
        
        # Copy to target directory
        mkdir -p "$TARGET_DIR/libs/$target_subdir"
        cp "$file" "$TARGET_DIR/libs/$target_subdir/$filename"
        
        log "SUCCESS" "Processed library file: $filename -> libs/$target_subdir"
    done
}

# Create documentation files
create_documentation() {
    log "INFO" "Creating documentation..."
    
    # Create README file
    cat > "$TARGET_DIR/README.md" << EOF
# NAC Architecture Designer Pro

## Overview
Zero Trust NAC Architecture Designer Pro is a tool for calculating and comparing the Total Cost of Ownership (TCO) of different Network Access Control (NAC) solutions.

## Directory Structure
- \`/css\`: Stylesheets
  - \`/themes\`: Theme-related styles
  - \`/components\`: Component-specific styles
  - \`/layouts\`: Layout styles
  - \`/animations\`: Animation styles
  - \`/visualizations\`: Chart and visualization styles
  - \`/utilities\`: Utility styles
- \`/js\`: JavaScript files
  - \`/utils\`: Utility functions
  - \`/managers\`: Manager classes
  - \`/components\`: UI components
  - \`/features\`: Feature implementations
  - \`/charts\`: Chart implementations
  - \`/wizards\`: Wizard implementations
  - \`/reports\`: Report generators
  - \`/vendors\`: Vendor-specific code
- \`/img\`: Images
  - \`/vendors\`: Vendor logos
  - \`/icons\`: Icon images
- \`/data\`: Data files
  - \`/vendors\`: Vendor-specific data
  - \`/industry\`: Industry-specific data
  - \`/compliance\`: Compliance frameworks data
- \`/libs\`: Third-party libraries
- \`/assets\`: Additional assets
- \`/docs\`: Documentation

## Getting Started
1. Open \`index.html\` in your web browser
2. Follow the wizard to select your current NAC vendor
3. Configure your organization details
4. View the results and comparison

## Build
This application uses bundled CSS and JavaScript files for production.
- \`css/core.bundle.css\`: Core styles
- \`css/components.bundle.css\`: Component styles
- \`js/core.bundle.js\`: Core functionality
- \`js/components.bundle.js\`: UI components
- \`js/features.bundle.js\`: Feature implementations

## Development
For development, you can modify individual files in their respective directories.

## Migrated Structure
This codebase has been migrated and reorganized for better maintainability and performance.
EOF
    
    log "SUCCESS" "Created README.md"
    
    # Create Documentation Files
    mkdir -p "$TARGET_DIR/docs"
    
    # Create architecture documentation
    cat > "$TARGET_DIR/docs/ARCHITECTURE.md" << EOF
# NAC Architecture Designer Pro - Architecture Documentation

## Overall Architecture
The NAC Architecture Designer Pro is a web application built with HTML, CSS, and JavaScript. It follows a component-based architecture with separation of concerns.

## Key Components
1. **Wizard Interface**: Guides users through the process of selecting their current NAC vendor, configuring organization details, and viewing results.
2. **Calculation Engine**: Performs TCO calculations based on user inputs.
3. **Visualization Components**: Charts and graphs for displaying comparison data.
4. **Reporting System**: Generates reports in various formats.

## Directory Structure Rationale
- **CSS Organization**: CSS files are organized by their purpose (themes, components, layouts) to make styling more maintainable.
- **JavaScript Organization**: JS files are organized by their functionality to support separation of concerns.
- **Bundling Strategy**: Files are bundled by their purpose to reduce HTTP requests in production.

## Integration Points
- Chart.js for data visualization
- jsPDF for report generation
- Various data files for vendor and industry information

## Data Flow
1. User inputs are collected through the wizard interface
2. Calculation engines process the inputs
3. Results are displayed through visualization components
4. Reports can be generated based on the results
EOF
    
    log "SUCCESS" "Created ARCHITECTURE.md"
    
    # Create maintenance documentation
    cat > "$TARGET_DIR/docs/MAINTENANCE.md" << EOF
# NAC Architecture Designer Pro - Maintenance Guide

## Adding New Features
1. Create new feature files in the appropriate subdirectory under \`js/features/\`
2. Add any necessary CSS in the appropriate subdirectory under \`css/components/\`
3. Update the HTML to include the new feature

## Adding New Vendors
1. Add vendor data to \`data/vendors/\`
2. Add vendor logo to \`img/vendors/\`
3. Update the vendor selection UI in the HTML

## Updating Calculation Models
1. Modify the relevant calculation files in \`js/features/\`
2. Update any affected visualization components

## Building for Production
1. Ensure all individual files are properly organized
2. Run bundling scripts to create the bundled CSS and JS files
3. Test the application with the bundled files

## Common Issues and Solutions
- **Chart rendering issues**: Check browser console for errors, ensure Chart.js is properly initialized
- **Calculation discrepancies**: Verify the calculation logic in the relevant feature files
- **UI inconsistencies**: Check CSS specificity and ensure the correct CSS files are being loaded
EOF
    
    log "SUCCESS" "Created MAINTENANCE.md"
}

# Main function to run the migration
run_migration() {
    log "INFO" "Starting migration process..."
    
    # Check if source directory exists
    if [ ! -d "$SOURCE_DIR" ]; then
        log "ERROR" "Source directory does not exist: $SOURCE_DIR"
        return 1
    fi
    
    # Create the target directory if it doesn't exist
    if [ ! -d "$TARGET_DIR" ]; then
        mkdir -p "$TARGET_DIR"
    fi
    
    # Create the temporary directory
    if [ -d "$TEMP_DIR" ]; then
        rm -rf "$TEMP_DIR"
    fi
    mkdir -p "$TEMP_DIR"
    
    # Create the directory structure
    create_directory_structure
    
    # Process CSS files
    process_css_files
    
    # Process JS files
    process_js_files
    
    # Process HTML files
    process_html_files
    
    # Process image files
    process_images
    
    # Process data files
    process_data_files
    
    # Process library files
    process_library_files
    
    # Create documentation
    create_documentation
    
    # Clean up temporary directory
    log "INFO" "Cleaning up temporary files..."
    rm -rf "$TEMP_DIR"
    
    log "SUCCESS" "Migration completed successfully!"
    log "INFO" "New codebase is available at: $TARGET_DIR"
    log "INFO" "See $LOG_FILE for detailed migration log"
}

# Execute the migration
run_migration

exit 0

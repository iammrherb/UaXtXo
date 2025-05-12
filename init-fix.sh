#!/bin/bash

# Targeted Fixes Only - No Rewrites
# Fixes specific syntax errors and image paths without rewriting anything

# Set exit on error
set -e

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Define project directory 
PROJECT_DIR="$(pwd)"

# Log function
log() {
    echo -e "${GREEN}[$(date +%T)]${NC} $1"
}

# Warning function
warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Error function
error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Fix duplicate NotificationManager declaration
fix_notification_manager() {
    log "Finding and fixing NotificationManager issues"
    
    NOTIFICATION_FILES=$(find "${PROJECT_DIR}" -name "*.js" -type f -exec grep -l "NotificationManager" {} \; 2>/dev/null || true)
    
    if [[ -n "$NOTIFICATION_FILES" ]]; then
        log "Found potential NotificationManager declarations in: "
        echo "$NOTIFICATION_FILES"
        
        # Handle each file that might redefine NotificationManager
        for file in $NOTIFICATION_FILES; do
            if [[ "$(basename "$file")" == "notification.js" ]]; then
                log "Fixing $file"
                # Modify to only define if not already defined
                sed -i.bak "s/const NotificationManager = /window.NotificationManager = window.NotificationManager || /" "$file"
            fi
        done
    else
        log "No NotificationManager declarations found"
    fi
}

# Fix syntax error in wizard.js
fix_wizard_syntax() {
    log "Finding and fixing wizard syntax errors"
    
    # Find all wizard files with "nextStep" function
    WIZARD_FILES=$(find "${PROJECT_DIR}" -name "*.js" -type f -exec grep -l "nextStep" {} \; 2>/dev/null || true)
    
    if [[ -n "$WIZARD_FILES" ]]; then
        log "Found potential wizard files:"
        echo "$WIZARD_FILES"
        
        # Look for assignment in if condition in each file
        for file in $WIZARD_FILES; do
            log "Checking $file for syntax errors"
            
            # Find lines with potential assignment in if condition
            ASSIGNMENT_LINES=$(grep -n "if.*=.*)" "$file" 2>/dev/null || true)
            
            if [[ -n "$ASSIGNMENT_LINES" ]]; then
                log "Found potential assignment issues in $file:"
                echo "$ASSIGNMENT_LINES"
                
                # Fix each line with an assignment issue
                while IFS= read -r line; do
                    # Extract line number
                    LINE_NUM=$(echo "$line" | cut -d: -f1)
                    LINE_CONTENT=$(echo "$line" | cut -d: -f2-)
                    
                    log "Fixing line $LINE_NUM: $LINE_CONTENT"
                    
                    # Replace = with === in if conditions
                    sed -i.bak "${LINE_NUM}s/if (\([^=]*\)= \([^=)]*\))/if (\1=== \2)/" "$file"
                done <<< "$ASSIGNMENT_LINES"
            fi
            
            # Find conditional statements without braces
            BRACE_LINES=$(grep -n "if.*) [^{].*;" "$file" 2>/dev/null || true)
            
            if [[ -n "$BRACE_LINES" ]]; then
                log "Found potential missing braces in $file:"
                echo "$BRACE_LINES"
                
                # Fix each line with missing braces
                while IFS= read -r line; do
                    # Extract line number
                    LINE_NUM=$(echo "$line" | cut -d: -f1)
                    LINE_CONTENT=$(echo "$line" | cut -d: -f2-)
                    
                    log "Adding braces to line $LINE_NUM: $LINE_CONTENT"
                    
                    # Add braces around single-line conditionals
                    sed -i.bak "${LINE_NUM}s/if \([^{]*\)) \(.*\);/if \1) { \2; }/" "$file"
                done <<< "$BRACE_LINES"
            fi
        done
    else
        log "No wizard files found"
    fi
}

# Fix syntax error in calculator.js
fix_calculator_syntax() {
    log "Finding and fixing calculator syntax errors"
    
    # Find calculator files
    CALCULATOR_FILES=$(find "${PROJECT_DIR}" -name "calculator*.js" -type f 2>/dev/null || true)
    
    if [[ -n "$CALCULATOR_FILES" ]]; then
        log "Found calculator files:"
        echo "$CALCULATOR_FILES"
        
        # Look for assignment in if condition in each file
        for file in $CALCULATOR_FILES; do
            log "Checking $file for syntax errors"
            
            # Find lines with potential assignment in if condition
            ASSIGNMENT_LINES=$(grep -n "if.*=.*)" "$file" 2>/dev/null || true)
            
            if [[ -n "$ASSIGNMENT_LINES" ]]; then
                log "Found potential assignment issues in $file:"
                echo "$ASSIGNMENT_LINES"
                
                # Fix each line with an assignment issue
                while IFS= read -r line; do
                    # Extract line number
                    LINE_NUM=$(echo "$line" | cut -d: -f1)
                    LINE_CONTENT=$(echo "$line" | cut -d: -f2-)
                    
                    log "Fixing line $LINE_NUM: $LINE_CONTENT"
                    
                    # Replace = with === in if conditions
                    sed -i.bak "${LINE_NUM}s/if (\([^=]*\)= \([^=)]*\))/if (\1=== \2)/" "$file"
                done <<< "$ASSIGNMENT_LINES"
            fi
        done
    else
        log "No calculator files found"
    fi
}

# Fix undefined 'phases' property in charts.js
fix_charts_phases() {
    log "Finding and fixing chart phases undefined issues"
    
    # Find charts files
    CHARTS_FILES=$(find "${PROJECT_DIR}" -name "chart*.js" -type f 2>/dev/null || true)
    
    if [[ -n "$CHARTS_FILES" ]]; then
        log "Found chart files:"
        echo "$CHARTS_FILES"
        
        # Look for phases property access in each file
        for file in $CHARTS_FILES; do
            log "Checking $file for phases property access"
            
            # Find lines that access .phases property
            PHASES_LINES=$(grep -n "\.phases" "$file" 2>/dev/null || true)
            
            if [[ -n "$PHASES_LINES" ]]; then
                log "Found potential phases access issues in $file:"
                echo "$PHASES_LINES"
                
                # Fix each line with .phases access
                while IFS= read -r line; do
                    # Extract line number
                    LINE_NUM=$(echo "$line" | cut -d: -f1)
                    LINE_CONTENT=$(echo "$line" | cut -d: -f2-)
                    
                    log "Adding safety check to line $LINE_NUM: $LINE_CONTENT"
                    
                    # Add safety check for phases property
                    # This is a simple pattern replacement, might need adjustment for specific files
                    sed -i.bak "${LINE_NUM}s/\(\w*\)\.phases/(\1 \&\& \1.phases ? \1.phases : [])/" "$file"
                done <<< "$PHASES_LINES"
            fi
        done
    else
        log "No chart files found"
    fi
}

# Fix vendor logo paths in index.html
fix_vendor_logos() {
    log "Fixing vendor logo paths in index.html"
    
    if [ -f "${PROJECT_DIR}/index.html" ]; then
        # Back up the file
        cp "${PROJECT_DIR}/index.html" "${PROJECT_DIR}/index.html.bak"
        
        log "Checking for logo path issues in index.html"
        
        # Check if we're using .svg instead of .png
        SVG_REFERENCES=$(grep -n "img/vendors/.*\.svg" "${PROJECT_DIR}/index.html" 2>/dev/null || true)
        
        if [[ -n "$SVG_REFERENCES" ]]; then
            log "Found SVG references that should be PNG:"
            echo "$SVG_REFERENCES"
            
            # Replace .svg with .png for vendor logos
            sed -i.bak 's/vendors\/\([^\.]*\)\.svg/vendors\/\1.png/g' "${PROJECT_DIR}/index.html"
            
            log "Converted SVG references to PNG"
        else
            log "No SVG references found in index.html"
        fi
        
        # Check if the paths are correct
        VENDOR_REFERENCES=$(grep -n "img/vendors" "${PROJECT_DIR}/index.html" 2>/dev/null || true)
        
        if [[ -n "$VENDOR_REFERENCES" ]]; then
            log "Found vendor image references:"
            echo "$VENDOR_REFERENCES"
            
            # Make sure the path starts with / if needed
            # Note: This assumes the images are in the root directory, adjust if needed
            if grep -q "src=\"img/vendors" "${PROJECT_DIR}/index.html"; then
                log "Ensuring vendor image paths are correct"
                sed -i.bak 's/src="img\/vendors/src="\/img\/vendors/g' "${PROJECT_DIR}/index.html"
            fi
        else
            warn "No vendor image references found in index.html"
        fi
    else
        warn "Could not locate index.html file"
    fi
}

# Main function
main() {
    log "Running targeted fixes without rewrites"
    
    # Fix NotificationManager issues
    fix_notification_manager
    
    # Fix wizard syntax
    fix_wizard_syntax
    
    # Fix calculator syntax
    fix_calculator_syntax
    
    # Fix charts phases issue
    fix_charts_phases
    
    # Fix vendor logos
    fix_vendor_logos
    
    log "All targeted fixes applied. Please refresh the application."
}

# Run main function
main

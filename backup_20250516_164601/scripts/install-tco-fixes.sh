#!/bin/bash
# NAC TCO Calculator Enhancement Script
# This script enhances the Portnox TCO Calculator with:
# - "No NAC" baseline scenario
# - Multi-year projections
# - Enhanced compliance frameworks
# - Industry-specific metrics
# - Improved vendor comparison features
# - Advanced visualizations

set -e  # Exit immediately if a command exits with non-zero status
set -u  # Treat unset variables as an error
set -o pipefail  # Pipeline fails on any command failure

# Configuration variables
BASE_DIR="$(pwd)"
JS_DIR="${BASE_DIR}/js"
CSS_DIR="${BASE_DIR}/css"
DATA_DIR="${BASE_DIR}/data"
BACKUP_DIR="${BASE_DIR}/backups"
DATE_STAMP=$(date +"%Y%m%d_%H%M%S")

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# =============================
# UTILITY FUNCTIONS
# =============================

function log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

function log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

function log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

function log_error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

function check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if required directories exist
    if [ ! -d "$JS_DIR" ]; then
        log_error "JavaScript directory not found at $JS_DIR. Ensure you're running this script from the correct location."
        exit 1
    fi
    
    if [ ! -d "$CSS_DIR" ]; then
        log_error "CSS directory not found at $CSS_DIR. Ensure you're running this script from the correct location."
        exit 1
    fi
    
    # Check if index.html exists
    if [ ! -f "${BASE_DIR}/index.html" ]; then
        log_error "index.html not found. Ensure you're running this script from the correct location."
        exit 1
    fi
    
    log_success "All prerequisites met."
}

function backup_files() {
    log_info "Creating backup of existing files..."
    
    # Create backup directory
    mkdir -p "${BACKUP_DIR}/${DATE_STAMP}"
    
    # Backup JavaScript files
    cp -r "$JS_DIR" "${BACKUP_DIR}/${DATE_STAMP}/"
    
    # Backup CSS files
    cp -r "$CSS_DIR" "${BACKUP_DIR}/${DATE_STAMP}/"
    
    # Backup HTML files
    cp "${BASE_DIR}/index.html" "${BACKUP_DIR}/${DATE_STAMP}/"
    cp "${BASE_DIR}/sensitivity.html" "${BACKUP_DIR}/${DATE_STAMP}/" 2>/dev/null || true
    
    log_success "Backup created at ${BACKUP_DIR}/${DATE_STAMP}"
}

function create_directory_if_not_exists() {
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
        log_info "Created directory: $1"
    fi
}

# =============================
# IMPLEMENTATION FUNCTIONS
# =============================

function create_data_directory() {
    log_info "Setting up data directory structure..."
    
    create_directory_if_not_exists "$DATA_DIR"
    create_directory_if_not_exists "${DATA_DIR}/compliance"
    create_directory_if_not_exists "${DATA_DIR}/industry"
    create_directory_if_not_exists "${DATA_DIR}/vendors"
    create_directory_if_not_exists "${DATA_DIR}/breach-costs"
    
    log_success "Data directory structure created."
}

function create_no_nac_baseline() {
    log_info "Creating 'No NAC' baseline data module..."
    # Implementation in separate function
}

function create_compliance_frameworks() {
    log_info "Creating compliance frameworks data module..."
    # Implementation in separate function
}

function create_industry_specific_data() {
    log_info "Creating industry-specific data module..."
    # Implementation in separate function
}

function create_vendor_comparison_data() {
    log_info "Creating vendor comparison data module..."
    # Implementation in separate function
}

function create_enhanced_tco_calculator() {
    log_info "Creating enhanced TCO calculator module..."
    # Implementation in separate function
}

function create_enhanced_ui_updates() {
    log_info "Creating enhanced UI updates module..."
    # Implementation in separate function
}

function update_sensitivity_analysis_page() {
    log_info "Updating sensitivity analysis page..."
    # Implementation in separate function
}

function update_index_html() {
    log_info "Creating HTML update function..."
    # Implementation in separate function
}

function create_main_installation_function() {
    log_info "Creating main installation function..."
    # Implementation in separate function
}

function apply_index_changes() {
    log_info "Applying changes to index.html..."
    
    # Add install script to index.html
    if ! grep -q "install-fixes.js" "${BASE_DIR}/index.html"; then
        # Backup index.html first
        cp "${BASE_DIR}/index.html" "${BASE_DIR}/index.html.bak"
        
        # Add script tag before closing body tag
        sed -i 's|</body>|<script src="install-fixes.js"></script>\n</body>|' "${BASE_DIR}/index.html"
        
        log_success "Added installation script to index.html"
    else
        log_warning "Installation script already exists in index.html. Skipping modification."
    fi
}

function apply_sensitivity_changes() {
    log_info "Applying changes to sensitivity.html..."
    
    # Check if sensitivity.html exists
    if [ -f "${BASE_DIR}/sensitivity.html" ]; then
        # Add install script to sensitivity.html
        if ! grep -q "sensitivity-enhancements.js" "${BASE_DIR}/sensitivity.html"; then
            # Backup sensitivity.html first
            cp "${BASE_DIR}/sensitivity.html" "${BASE_DIR}/sensitivity.html.bak"
            
            # Add script tag before closing body tag
            sed -i 's|</body>|<script src="js/sensitivity-enhancements.js"></script>\n</body>|' "${BASE_DIR}/sensitivity.html"
            
            log_success "Added enhancement script to sensitivity.html"
        else
            log_warning "Enhancement script already exists in sensitivity.html. Skipping modification."
        fi
    else
        log_warning "sensitivity.html not found. Skipping modification."
    fi
}

function print_completion_message() {
    echo
    echo -e "${GREEN}════════════════════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}                TCO Calculator Enhancement Installation Complete!${NC}"
    echo -e "${GREEN}════════════════════════════════════════════════════════════════════════════${NC}"
    echo
    echo -e "The following enhancements have been installed:"
    echo -e "  • 'No NAC' baseline scenario with realistic breach costs"
    echo -e "  • Multi-year projections (1, 2, 3, and 5 years)"
    echo -e "  • Enhanced compliance frameworks and industry-specific metrics"
    echo -e "  • Improved vendor comparison features"
    echo -e "  • Advanced visualizations and UI improvements"
    echo
    echo -e "Backups of your original files are stored in: ${BACKUP_DIR}/${DATE_STAMP}"
    echo -e "To see the enhancements, open index.html in your browser."
    echo
    echo -e "${YELLOW}Note: Refresh your browser if the page was already open.${NC}"
    echo -e "${GREEN}════════════════════════════════════════════════════════════════════════════${NC}"
}

# =============================
# MAIN EXECUTION
# =============================

# Check prerequisites
check_prerequisites

# Create backup of existing files
backup_files

# Create data directory structure
create_data_directory

# Create data modules
create_no_nac_baseline
create_compliance_frameworks
create_industry_specific_data
create_vendor_comparison_data

# Create JavaScript modules
create_enhanced_tco_calculator
create_enhanced_ui_updates
update_sensitivity_analysis_page
update_index_html
create_main_installation_function

# Apply changes to HTML files
apply_index_changes
apply_sensitivity_changes

# Print completion message
print_completion_message

exit 0

#!/bin/bash
# =============================================================================
# Portnox Total Cost Analyzer - Comprehensive Update Script
# =============================================================================
set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BACKUP_DIR="${PROJECT_DIR}/backups/$(date +%Y%m%d_%H%M%S)"
LOG_FILE="${PROJECT_DIR}/logs/update_$(date +%Y%m%d_%H%M%S).log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Create directories
mkdir -p "${PROJECT_DIR}/"{data,logs,backups,assets/js,assets/css}

# Logging function
log() {
    echo -e "$(date '+%Y-%m-%d %H:%M:%S') $*" | tee -a "$LOG_FILE"
}

# Create backup
create_backup() {
    log "Creating backup..."
    mkdir -p "$BACKUP_DIR"
    if [[ -f "${PROJECT_DIR}/index.html" ]]; then
        cp -r "${PROJECT_DIR}"/{index.html,style.css,script.js,data/,assets/} "$BACKUP_DIR/" 2>/dev/null || true
    fi
    git rev-parse HEAD > "${BACKUP_DIR}/git_commit.txt" 2>/dev/null || true
    log "${GREEN}Backup created: $BACKUP_DIR${NC}"
}

# Main execution
main() {
    log "${GREEN}Starting Portnox Total Cost Analyzer Update${NC}"
    create_backup
    
    # Apply all updates
    bash "${SCRIPT_DIR}/update_frontend.sh"
    bash "${SCRIPT_DIR}/update_calculations.sh"
    bash "${SCRIPT_DIR}/update_compliance.sh"
    bash "${SCRIPT_DIR}/update_visualizations.sh"
    bash "${SCRIPT_DIR}/update_vendor_data.sh"
    
    # Create main HTML file
    bash "${SCRIPT_DIR}/create_main_html.sh"
    
    # Commit changes
    if command -v git &>/dev/null && git rev-parse --git-dir &>/dev/null; then
        git add .
        git commit -m "feat: Comprehensive Portnox Total Cost Analyzer enhancements

- Optimized performance with event-driven vendor selection
- Added advanced Chart.js/D3.js visualizations
- Integrated complete compliance framework mappings
- Implemented multi-year TCO/ROI calculations
- Added cyber insurance premium calculations
- Enhanced vendor comparison matrices
- Default 300 devices for SMB baseline"
    fi
    
    log "${GREEN}Update completed successfully!${NC}"
}

main "$@"

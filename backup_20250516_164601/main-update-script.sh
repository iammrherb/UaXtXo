#!/bin/bash

# Main Update Script for Portnox Total Cost Analyzer
# This script coordinates the update process for implementing the new TCO Multi-Vendor Analyzer

set -e  # Exit on any error

# Color definitions for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Display header
echo -e "${BLUE}=================================================${NC}"
echo -e "${BLUE}   Portnox Total Cost Analyzer Update Process    ${NC}"
echo -e "${BLUE}=================================================${NC}"
echo -e "${YELLOW}This script will update the existing TCO Analyzer to the new Multi-Vendor Analyzer${NC}"
echo -e "${YELLOW}Make sure you have a backup of your current application before proceeding.${NC}"
echo

# Verify that we're in the correct directory (should contain index.html)
if [ ! -f "index.html" ]; then
    echo -e "${RED}Error: index.html not found. Please run this script from the application root directory.${NC}"
    exit 1
fi

# Create backup
timestamp=$(date +"%Y%m%d_%H%M%S")
backup_dir="../portnox_tco_backup_${timestamp}"

echo -e "${YELLOW}Creating backup in ${backup_dir}...${NC}"
mkdir -p "$backup_dir"
cp -r * "$backup_dir/"
echo -e "${GREEN}Backup created successfully.${NC}"
echo

# Function to run a script and prompt for continuation
run_script() {
    script_path="$1"
    script_name="$2"
    
    echo -e "${BLUE}Running ${script_name}...${NC}"
    
    # Make the script executable
    chmod +x "$script_path"
    
    # Execute the script
    "$script_path"
    
    # Check if the script executed successfully
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}${script_name} completed successfully.${NC}"
    else
        echo -e "${RED}${script_name} failed. Check the logs for details.${NC}"
        echo -e "${YELLOW}Do you want to continue with the next script? (y/n)${NC}"
        read -r response
        if [[ "$response" != "y" && "$response" != "Y" ]]; then
            echo -e "${RED}Update process aborted by user.${NC}"
            exit 1
        fi
    fi
    
    echo -e "${YELLOW}Press Enter to continue to the next step...${NC}"
    read -r
    echo
}

# Create temporary directory for scripts
mkdir -p "./update_scripts"

# Download/create update scripts
echo -e "${YELLOW}Creating update scripts...${NC}"

# 1. Library Update Script
cat > "./update_scripts/update_libraries.sh" << 'EOL'
#!/bin/bash
# Script content will be replaced by the actual update_libraries.sh artifact
EOL

# 2. UI Update Script
cat > "./update_scripts/update_ui.sh" << 'EOL'
#!/bin/bash
# Script content will be replaced by the actual update_ui.sh artifact
EOL

# 3. Wizard Update Script
cat > "./update_scripts/update_wizard.sh" << 'EOL'
#!/bin/bash
# Script content will be replaced by the actual update_wizard.sh artifact
EOL

# 4. Chart Update Script
cat > "./update_scripts/update_charts.sh" << 'EOL'
#!/bin/bash
# Script content will be replaced by the actual update_charts.sh artifact
EOL

# 5. Data Update Script
cat > "./update_scripts/update_data.sh" << 'EOL'
#!/bin/bash
# Script content will be replaced by the actual update_data.sh artifact
EOL

# 6. Integration Script
cat > "./update_scripts/integrate_components.sh" << 'EOL'
#!/bin/bash
# Script content will be replaced by the actual integrate_components.sh artifact
EOL

# Execute each script in sequence
run_script "./update_scripts/update_libraries.sh" "Library Update Script"
run_script "./update_scripts/update_ui.sh" "UI Update Script"
run_script "./update_scripts/update_wizard.sh" "Wizard Update Script"
run_script "./update_scripts/update_data.sh" "Data Update Script"
run_script "./update_scripts/update_charts.sh" "Chart Update Script"
run_script "./update_scripts/integrate_components.sh" "Integration Script"

# Clean up
echo -e "${YELLOW}Cleaning up temporary files...${NC}"
rm -rf "./update_scripts"

# Final verification
echo -e "${BLUE}=================================================${NC}"
echo -e "${GREEN}Update process completed successfully!${NC}"
echo -e "${YELLOW}Please verify the application by opening index.html in your browser.${NC}"
echo -e "${YELLOW}If you encounter any issues, restore from the backup at:${NC}"
echo -e "${YELLOW}${backup_dir}${NC}"
echo -e "${BLUE}=================================================${NC}"

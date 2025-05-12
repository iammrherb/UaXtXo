#!/bin/bash

# Initial Wizard Display Fix
# This script adds a tiny snippet that ensures only the initial wizard loads properly

# Set colors for better readability
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Initial Wizard Display Fix ===${NC}"
echo -e "${BLUE}This script ensures the initial wizard loads properly${NC}"

# Make a backup of index.html first
cp index.html index.html.backup
echo -e "${GREEN}✓ Created backup of index.html${NC}"

# Create a tiny script that just fixes the initial state
cat > js/fixes/initial-state-fix.js << 'EOL'
/**
 * Initial State Fix - Just ensures the wizard loads in the correct initial state
 */
(function() {
    // Wait for document to be ready
    function fixInitialState() {
        console.log("Initial State Fix: Ensuring proper initial wizard state");
        
        // 1. Hide the results container
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
            resultsContainer.classList.add('hidden');
        }
        
        // 2. Show the wizard container
        const wizardContainer = document.getElementById('wizard-container');
        if (wizardContainer) {
            wizardContainer.style.display = 'block';
        }
        
        // 3. Make sure wizard navigation is visible
        const wizardNavigation = document.querySelector('.wizard-navigation');
        if (wizardNavigation) {
            wizardNavigation.style.display = 'flex';
        }
        
        console.log("Initial State Fix: Wizard initial state corrected");
    }
    
    // Run immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixInitialState);
    } else {
        fixInitialState();
    }
    
    // Also run after a short delay (for any late initialization)
    setTimeout(fixInitialState, 500);
})();
EOL

echo -e "${GREEN}✓ Created initial state fix script${NC}"

# Add the script to the head of index.html for earliest possible execution
sed -i 's|<head>|<head>\n    <script src="js/fixes/initial-state-fix.js"></script>|' index.html

echo -e "${GREEN}✓ Added script to index.html${NC}"

echo -e "${BLUE}====================================${NC}"
echo -e "${GREEN}Initial wizard display fix applied!${NC}"
echo -e "${BLUE}This fix:${NC}"
echo -e "${BLUE}- Ensures only the wizard is visible on initial load${NC}"
echo -e "${BLUE}- Doesn't change any functionality${NC}"
echo -e "${BLUE}- Works with all existing scripts${NC}"
echo -e "${BLUE}====================================${NC}"
echo -e "${BLUE}If you need to restore the original file:${NC}"
echo -e "${BLUE}cp index.html.backup index.html${NC}"
echo -e "${BLUE}====================================${NC}"

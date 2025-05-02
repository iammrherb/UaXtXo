#!/bin/bash

# Comprehensive NAC Solution TCO Calculator Update Script
# This script fixes all issues and implements missing features

# Set variables
PROJECT_DIR="$(pwd)"
BACKUP_DIR="${PROJECT_DIR}/backups/$(date +%Y%m%d_%H%M%S)"
TEMP_DIR="${PROJECT_DIR}/temp_update"
LOG_FILE="${PROJECT_DIR}/update_log_$(date +%Y%m%d_%H%M%S).log"

# Enable logging
exec > >(tee -a "$LOG_FILE") 2>&1

# Print banner
echo "========================================================"
echo "  NAC Solution TCO Calculator Comprehensive Update"
echo "========================================================"
echo "Date: $(date)"
echo "Project directory: $PROJECT_DIR"

# Function to create directory if it doesn't exist
ensure_dir() {
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
    fi
}

# Create backup directory
ensure_dir "$BACKUP_DIR"
echo "Backup directory: $BACKUP_DIR"

# Function to backup a file
backup_file() {
    local file="$1"
    local backup="${BACKUP_DIR}/$(dirname "$file" | sed "s|^${PROJECT_DIR}/||")"
    
    if [ -f "$file" ]; then
        ensure_dir "$backup"
        cp "$file" "$backup/" 2>/dev/null
        echo "Backed up: $file"
        return 0
    else
        echo "Warning: File does not exist: $file"
        return 1
    fi
}

# Create temporary directory
echo "Creating temporary directory for updates..."
rm -rf "$TEMP_DIR" 2>/dev/null || true
ensure_dir "$TEMP_DIR"

# Backup critical files
echo "Backing up critical files..."
backup_file "${PROJECT_DIR}/index.html"
backup_file "${PROJECT_DIR}/js/main.js"
backup_file "${PROJECT_DIR}/js/components/calculator.js"
backup_file "${PROJECT_DIR}/js/components/ui-controller.js"
backup_file "${PROJECT_DIR}/js/charts/chart-builder.js"
backup_file "${PROJECT_DIR}/css/styles.css"

#==============================================================================
# Step 1: Fix duplicate DOM Cache script tag in index.html
#==============================================================================
echo "Fixing duplicate DOM Cache script tag..."

if [ -f "${PROJECT_DIR}/index.html" ]; then
    # Create a working copy
    cp "${PROJECT_DIR}/index.html" "${TEMP_DIR}/index.html"
    
    # Look for duplicate dom-cache.js script tags
    script_lines=$(grep -n "dom-cache.js" "${TEMP_DIR}/index.html" | cut -d: -f1)
    script_count=$(echo "$script_lines" | wc -l)
    
    if [ "$script_count" -gt 1 ]; then
        # Keep only the first occurrence
        first_line=$(echo "$script_lines" | head -n 1)
        
        # Create a file without duplicates
        awk -v first_line="$first_line" '{
            if ($0 ~ /dom-cache\.js/ && NR != first_line) {
                # Skip this line
            } else {
                print $0
            }
        }' "${TEMP_DIR}/index.html" > "${TEMP_DIR}/index.html.fixed"
        
        # Replace the original
        cp "${TEMP_DIR}/index.html.fixed" "${PROJECT_DIR}/index.html"
        echo "Fixed: Removed duplicate DOM Cache script tag"
    else
        echo "No duplicate DOM Cache script tags found"
    fi
else
    echo "Error: index.html not found"
fi

#==============================================================================
# Step 2: Add missing chart canvases to index.html
#==============================================================================
echo "Adding missing chart canvases..."

if [ -f "${PROJECT_DIR}/index.html" ]; then
    # Create working copy
    cp "${PROJECT_DIR}/index.html" "${TEMP_DIR}/index.html.canvas"
    
    # Direct method to find specific insertion points
    
    # First check: Find TCO Comparison section
    TCO_COMPARISON=$(grep -n "<div class=\"result-card\">" "${TEMP_DIR}/index.html.canvas" | head -n 1 | cut -d: -f1)
    
    if [ -n "$TCO_COMPARISON" ]; then
        # Prepare chart canvas HTML
        cat > "${TEMP_DIR}/chart_canvases.html" << 'EOF'

                        <!-- Feature Comparison Chart -->
                        <div class="result-card">
                            <h3>Feature Comparison</h3>
                            <div class="chart-container" aria-label="Feature Comparison Chart">
                                <canvas id="feature-comparison-chart"></canvas>
                            </div>
                            <div class="feature-legend">
                                <div class="feature-note">Rating scale: 1 (Poor) to 5 (Excellent)</div>
                            </div>
                        </div>
                        
                        <!-- ROI Analysis Chart -->
                        <div class="result-card">
                            <h3>Return on Investment Analysis</h3>
                            <div class="chart-container" aria-label="ROI Analysis Chart">
                                <canvas id="roi-chart"></canvas>
                            </div>
                        </div>
EOF
        
        # Add charts before the first result card
        awk -v line="$TCO_COMPARISON" -v charts="$(cat ${TEMP_DIR}/chart_canvases.html)" 'NR==line{print charts; print $0; next}1' "${TEMP_DIR}/index.html.canvas" > "${TEMP_DIR}/index.html.canvas1"
        
        # Now find implementation tab for implementation chart
        IMPLEMENTATION_TAB=$(grep -n "<div id=\"implementation-tab\"" "${TEMP_DIR}/index.html.canvas1" | head -n 1 | cut -d: -f1)
        
        if [ -n "$IMPLEMENTATION_TAB" ]; then
            # Create implementation chart HTML
            cat > "${TEMP_DIR}/implementation_chart.html" << 'EOF'

                        <!-- Implementation Comparison Chart -->
                        <div class="result-card">
                            <h3>Implementation Timeline Comparison</h3>
                            <div class="chart-container" aria-label="Implementation Comparison Chart">
                                <canvas id="implementation-comparison-chart"></canvas>
                            </div>
                        </div>
EOF
            
            # Find a position to insert the implementation chart - search for the first result-card or div after the implementation tab
            IMPL_CONTENT_START=$((IMPLEMENTATION_TAB + 1))
            IMPL_INSERT_LINE=$(tail -n +$IMPL_CONTENT_START "${TEMP_DIR}/index.html.canvas1" | grep -n "<div" | head -n 1 | cut -d: -f1)
            IMPL_INSERT_LINE=$((IMPL_CONTENT_START + IMPL_INSERT_LINE - 1))
            
            # Insert implementation chart
            awk -v line="$IMPL_INSERT_LINE" -v chart="$(cat ${TEMP_DIR}/implementation_chart.html)" 'NR==line{print chart; print $0; next}1' "${TEMP_DIR}/index.html.canvas1" > "${TEMP_DIR}/index.html.canvas2"
            
            # Replace the original
            cp "${TEMP_DIR}/index.html.canvas2" "${PROJECT_DIR}/index.html"
            echo "Added all missing chart canvases to index.html"
        else
            # No implementation tab found, just add the feature and ROI charts
            cp "${TEMP_DIR}/index.html.canvas1" "${PROJECT_DIR}/index.html"
            echo "Added feature comparison and ROI chart canvases (implementation tab not found)"
        fi
    else
        echo "Warning: Could not find insertion point for chart canvases"
    fi
else
    echo "Error: index.html not found"
fi

#==============================================================================
# Step 3: Add options-grid CSS for custom cost configuration
#==============================================================================
echo "Adding options-grid CSS..."

if [ -f "${PROJECT_DIR}/css/styles.css" ]; then
    # Check if the styles already exist
    if ! grep -q "\.options-grid" "${PROJECT_DIR}/css/styles.css"; then
        # Add the styles to the CSS file
        cat >> "${PROJECT_DIR}/css/styles.css" << 'EOF'

/* Options grid for custom cost configuration */
.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

/* Custom cost section styling */
#custom-costs-section h5 {
  margin-top: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
  font-size: 1rem;
  color: var(--text-primary);
}
EOF
        echo "Added options-grid CSS to styles.css"
    else
        echo "options-grid CSS already exists in styles.css"
    fi
else
    echo "Warning: styles.css not found"
    ensure_dir "${PROJECT_DIR}/css"
    
    # Create a minimal CSS file for options-grid
    cat > "${PROJECT_DIR}/css/custom-styles.css" << 'EOF'
/* Options grid for custom cost configuration */
.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

/* Custom cost section styling */
#custom-costs-section h5 {
  margin-top: 16px;
  margin-bottom: 8px;
  font-size: 1rem;
  color: #202020;
}
EOF
    echo "Created custom-styles.css for options-grid"
    
    # Add link to the custom CSS in index.html
    if [ -f "${PROJECT_DIR}/index.html" ]; then
        # Find the last CSS link
        LAST_CSS=$(grep -n "\.css" "${PROJECT_DIR}/index.html" | tail -n 1 | cut -d: -f1)
        
        if [ -n "$LAST_CSS" ]; then
            # Insert our custom CSS link after the last CSS link
            sed -i "${LAST_CSS}a\\    <link rel=\"stylesheet\" href=\"css/custom-styles.css\">" "${PROJECT_DIR}/index.html"
            echo "Added link to custom-styles.css in index.html"
        fi
    fi
fi

#==============================================================================
# Step 4: Add jsPDF libraries for PDF export functionality
#==============================================================================
echo "Adding jsPDF libraries..."

# Create directory for jsPDF if it doesn't exist
ensure_dir "${PROJECT_DIR}/libs/jspdf"

# Download jsPDF libraries if they don't exist
if [ ! -f "${PROJECT_DIR}/libs/jspdf/jspdf.umd.min.js" ]; then
    echo "Downloading jspdf.umd.min.js..."
    curl -s -L -o "${PROJECT_DIR}/libs/jspdf/jspdf.umd.min.js" "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
    
    if [ $? -eq 0 ] && [ -f "${PROJECT_DIR}/libs/jspdf/jspdf.umd.min.js" ]; then
        echo "Successfully downloaded jspdf.umd.min.js"
    else
        echo "Warning: Failed to download jspdf.umd.min.js"
    fi
fi

if [ ! -f "${PROJECT_DIR}/libs/jspdf/jspdf.plugin.autotable.min.js" ]; then
    echo "Downloading jspdf.plugin.autotable.min.js..."
    curl -s -L -o "${PROJECT_DIR}/libs/jspdf/jspdf.plugin.autotable.min.js" "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"
    
    if [ $? -eq 0 ] && [ -f "${PROJECT_DIR}/libs/jspdf/jspdf.plugin.autotable.min.js" ]; then
        echo "Successfully downloaded jspdf.plugin.autotable.min.js"
    else
        echo "Warning: Failed to download jspdf.plugin.autotable.min.js"
    fi
fi

# Add jsPDF script tags to index.html
if [ -f "${PROJECT_DIR}/index.html" ]; then
    # Check if jsPDF script tags already exist
    if ! grep -q "jspdf.umd.min.js" "${PROJECT_DIR}/index.html"; then
        # Find Chart.js script tag
        CHARTJS_SCRIPT=$(grep -n "chart.min.js" "${PROJECT_DIR}/index.html" | head -n 1 | cut -d: -f1)
        
        if [ -n "$CHARTJS_SCRIPT" ]; then
            # Add jsPDF scripts after Chart.js
            sed -i "${CHARTJS_SCRIPT}a\\    <!-- jsPDF for PDF export -->\\n    <script src=\"libs/jspdf/jspdf.umd.min.js\"></script>\\n    <script src=\"libs/jspdf/jspdf.plugin.autotable.min.js\"></script>" "${PROJECT_DIR}/index.html"
            echo "Added jsPDF script tags to index.html"
        else
            # Find a different script tag as a marker
            ANY_SCRIPT=$(grep -n "<script" "${PROJECT_DIR}/index.html" | head -n 1 | cut -d: -f1)
            
            if [ -n "$ANY_SCRIPT" ]; then
                # Add jsPDF scripts before the first script tag
                sed -i "${ANY_SCRIPT}i\\    <!-- jsPDF for PDF export -->\\n    <script src=\"libs/jspdf/jspdf.umd.min.js\"></script>\\n    <script src=\"libs/jspdf/jspdf.plugin.autotable.min.js\"></script>\\n" "${PROJECT_DIR}/index.html"
                echo "Added jsPDF script tags to index.html before first script"
            else
                echo "Warning: Could not find suitable position for jsPDF script tags in index.html"
            fi
        fi
    else
        echo "jsPDF script tags already exist in index.html"
    fi
else
    echo "Error: index.html not found for adding jsPDF scripts"
fi

#==============================================================================
# Step 5: Add custom cost configuration to index.html
#==============================================================================
echo "Adding custom cost configuration section..."

if [ -f "${PROJECT_DIR}/index.html" ]; then
    # Check if custom costs section already exists
    if ! grep -q "custom-costs-section" "${PROJECT_DIR}/index.html"; then
        # Create a working copy
        cp "${PROJECT_DIR}/index.html" "${TEMP_DIR}/index.html.customcosts"
        
        # Find a suitable position after advanced options or at the end of the form
        ADVANCED_OPTIONS=$(grep -n "advanced-options-panel" "${TEMP_DIR}/index.html.customcosts" | head -n 1 | cut -d: -f1)
        CALCULATE_BUTTON=$(grep -n "calculate-btn" "${TEMP_DIR}/index.html.customcosts" | head -n 1 | cut -d: -f1)
        
        # Custom costs HTML
        cat > "${TEMP_DIR}/custom_costs.html" << 'EOF'

                        <div class="advanced-options-toggle">
                            <button type="button" class="btn btn-text" aria-expanded="false" aria-controls="custom-costs-section">
                                Custom Cost Configuration <i class="fas fa-angle-down"></i>
                            </button>
                        </div>
                        
                        <div id="custom-costs-section" class="advanced-options-panel hidden" aria-labelledby="custom-costs-heading">
                            <h4 id="custom-costs-heading">Custom Cost Configuration</h4>
                            
                            <div class="options-grid">
                                <div class="input-group">
                                    <label for="custom-hardware-cost">Hardware Cost Multiplier</label>
                                    <input type="number" id="custom-hardware-cost" value="1.0" min="0.1" max="5.0" step="0.1">
                                </div>
                                
                                <div class="input-group">
                                    <label for="custom-licensing-cost">Licensing Cost Multiplier</label>
                                    <input type="number" id="custom-licensing-cost" value="1.0" min="0.1" max="5.0" step="0.1">
                                </div>
                                
                                <div class="input-group">
                                    <label for="custom-maintenance-cost">Maintenance Cost Multiplier</label>
                                    <input type="number" id="custom-maintenance-cost" value="1.0" min="0.1" max="5.0" step="0.1">
                                </div>
                                
                                <div class="input-group">
                                    <label for="custom-implementation-cost">Implementation Cost Multiplier</label>
                                    <input type="number" id="custom-implementation-cost" value="1.0" min="0.1" max="5.0" step="0.1">
                                </div>
                            </div>
                            
                            <h5>FTE Cost Configuration</h5>
                            <div class="options-grid">
                                <div class="input-group">
                                    <label for="network-admin-salary">Network Admin Salary ($)</label>
                                    <input type="number" id="network-admin-salary" value="120000" min="50000" step="5000">
                                </div>
                                
                                <div class="input-group">
                                    <label for="security-admin-salary">Security Admin Salary ($)</label>
                                    <input type="number" id="security-admin-salary" value="135000" min="50000" step="5000">
                                </div>
                                
                                <div class="input-group">
                                    <label for="system-admin-salary">System Admin Salary ($)</label>
                                    <input type="number" id="system-admin-salary" value="110000" min="50000" step="5000">
                                </div>
                                
                                <div class="input-group">
                                    <label for="helpdesk-salary">Help Desk Salary ($)</label>
                                    <input type="number" id="helpdesk-salary" value="75000" min="40000" step="5000">
                                </div>
                            </div>
                            
                            <h5>Other Cost Parameters</h5>
                            <div class="options-grid">
                                <div class="input-group">
                                    <label for="downtime-cost">Cost per Hour of Downtime ($)</label>
                                    <input type="number" id="downtime-cost" value="5000" min="1000" step="500">
                                </div>
                                
                                <div class="input-group">
                                    <label for="training-cost-multiplier">Training Cost Multiplier</label>
                                    <input type="number" id="training-cost-multiplier" value="1.0" min="0.1" max="5.0" step="0.1">
                                </div>
                            </div>
                        </div>
EOF

        INSERT_LINE=0
        
        if [ -n "$ADVANCED_OPTIONS" ]; then
            # Find the closing div of advanced options panel
            ADV_OPTIONS_END=$((ADVANCED_OPTIONS + 1))
            ADV_DIV_END=$(tail -n +$ADV_OPTIONS_END "${TEMP_DIR}/index.html.customcosts" | grep -n "</div>" | head -n 1 | cut -d: -f1)
            
            if [ -n "$ADV_DIV_END" ]; then
                INSERT_LINE=$((ADV_OPTIONS_END + ADV_DIV_END - 1))
            fi
        elif [ -n "$CALCULATE_BUTTON" ]; then
            # Insert before calculate button
            INSERT_LINE=$((CALCULATE_BUTTON - 1))
        fi
        
        if [ "$INSERT_LINE" -gt 0 ]; then
            # Insert custom costs section
            awk -v line="$INSERT_LINE" -v custom_costs="$(cat ${TEMP_DIR}/custom_costs.html)" 'NR==line{print $0; print custom_costs; next}1' "${TEMP_DIR}/index.html.customcosts" > "${TEMP_DIR}/index.html.customcosts.fixed"
            
            # Replace the original
            cp "${TEMP_DIR}/index.html.customcosts.fixed" "${PROJECT_DIR}/index.html"
            echo "Added custom cost configuration section to index.html"
        else
            echo "Warning: Could not find suitable position for custom cost configuration"
            
            # Try a last resort method: find the end of the form
            FORM_END=$(grep -n "</form>" "${TEMP_DIR}/index.html.customcosts" | head -n 1 | cut -d: -f1)
            
            if [ -n "$FORM_END" ]; then
                # Insert before form end
                sed -i "${FORM_END}i\\$(cat ${TEMP_DIR}/custom_costs.html)" "${TEMP_DIR}/index.html.customcosts"
                cp "${TEMP_DIR}/index.html.customcosts" "${PROJECT_DIR}/index.html"
                echo "Added custom cost configuration before </form> tag"
            else
                echo "Error: Could not add custom cost configuration section"
            fi
        fi
    else
        echo "Custom cost configuration section already exists in index.html"
    fi
else
    echo "Error: index.html not found for adding custom cost configuration"
fi

#==============================================================================
# Step 6: Update main.js to handle new options toggles
#==============================================================================
echo "Updating main.js with toggle handlers..."

if [ -f "${PROJECT_DIR}/js/main.js" ]; then
    # Check if setupAdvancedOptionsToggles already exists
    if ! grep -q "setupAdvancedOptionsToggles" "${PROJECT_DIR}/js/main.js"; then
        # Create a working copy
        cp "${PROJECT_DIR}/js/main.js" "${TEMP_DIR}/main.js"
        
        # Create the toggles function
        cat > "${TEMP_DIR}/setup_toggles.js" << 'EOF'

// Function to set up advanced options toggles
function setupAdvancedOptionsToggles() {
  const advancedOptionsToggle = document.querySelector('.advanced-options-toggle button');
  if (advancedOptionsToggle) {
    advancedOptionsToggle.addEventListener('click', function() {
      const panel = document.getElementById('advanced-options-panel');
      if (panel) {
        const isHidden = panel.classList.toggle('hidden');
        this.setAttribute('aria-expanded', !isHidden);
        
        // Toggle icon
        const icon = this.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-angle-down', isHidden);
          icon.classList.toggle('fa-angle-up', !isHidden);
        }
      }
    });
  }
  
  const customCostsToggle = document.querySelector('.advanced-options-toggle button[aria-controls="custom-costs-section"]');
  if (customCostsToggle) {
    customCostsToggle.addEventListener('click', function() {
      const panel = document.getElementById('custom-costs-section');
      if (panel) {
        const isHidden = panel.classList.toggle('hidden');
        this.setAttribute('aria-expanded', !isHidden);
        
        // Toggle icon
        const icon = this.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-angle-down', isHidden);
          icon.classList.toggle('fa-angle-up', !isHidden);
        }
      }
    });
  }
}
EOF

        # Find the DOMContentLoaded event handler
        DOM_LOADED=$(grep -n "DOMContentLoaded" "${TEMP_DIR}/main.js" | head -n 1 | cut -d: -f1)
        
        if [ -n "$DOM_LOADED" ]; then
            # Look for a good insertion point in the DOMContentLoaded handler
            INIT_END=$(tail -n +$DOM_LOADED "${TEMP_DIR}/main.js" | grep -n "calculator.calculate" | head -n 1 | cut -d: -f1)
            
            if [ -n "$INIT_END" ]; then
                # Insert the toggles setup before calculator.calculate
                INIT_END=$((DOM_LOADED + INIT_END - 1))
                
                # First add the function to the file
                cat "${TEMP_DIR}/setup_toggles.js" >> "${TEMP_DIR}/main.js"
                
                # Then add the call to the function
                sed -i "${INIT_END}i\\    // Set up advanced options toggles\\n    setupAdvancedOptionsToggles();" "${TEMP_DIR}/main.js"
                
                # Replace the original
                cp "${TEMP_DIR}/main.js" "${PROJECT_DIR}/js/main.js"
                echo "Updated main.js with toggle handlers"
            else
                echo "Warning: Could not find a suitable insertion point in main.js"
                
                # Try end of try block
                TRY_END=$(tail -n +$DOM_LOADED "${TEMP_DIR}/main.js" | grep -n "} catch" | head -n 1 | cut -d: -f1)
                
                if [ -n "$TRY_END" ]; then
                    TRY_END=$((DOM_LOADED + TRY_END - 2))
                    
                    # Add function to file
                    cat "${TEMP_DIR}/setup_toggles.js" >> "${TEMP_DIR}/main.js"
                    
                    # Add call before catch
                    sed -i "${TRY_END}i\\    // Set up advanced options toggles\\n    setupAdvancedOptionsToggles();" "${TEMP_DIR}/main.js"
                    
                    # Replace the original
                    cp "${TEMP_DIR}/main.js" "${PROJECT_DIR}/js/main.js"
                    echo "Updated main.js with toggle handlers (before catch block)"
                else
                    echo "Error: Could not update main.js"
                fi
            fi
        else
            echo "Warning: DOMContentLoaded event handler not found in main.js"
            
            # Create a backup of the original
            cp "${PROJECT_DIR}/js/main.js" "${BACKUP_DIR}/main.js.orig"
            
            # Append the code to the end of the file
            cat >> "${PROJECT_DIR}/js/main.js" << 'EOF'

// Function to set up advanced options toggles
function setupAdvancedOptionsToggles() {
  const advancedOptionsToggle = document.querySelector('.advanced-options-toggle button');
  if (advancedOptionsToggle) {
    advancedOptionsToggle.addEventListener('click', function() {
      const panel = document.getElementById('advanced-options-panel');
      if (panel) {
        const isHidden = panel.classList.toggle('hidden');
        this.setAttribute('aria-expanded', !isHidden);
        
        // Toggle icon
        const icon = this.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-angle-down', isHidden);
          icon.classList.toggle('fa-angle-up', !isHidden);
        }
      }
    });
  }
  
  const customCostsToggle = document.querySelector('.advanced-options-toggle button[aria-controls="custom-costs-section"]');
  if (customCostsToggle) {
    customCostsToggle.addEventListener('click', function() {
      const panel = document.getElementById('custom-costs-section');
      if (panel) {
        const isHidden = panel.classList.toggle('hidden');
        this.setAttribute('aria-expanded', !isHidden);
        
        // Toggle icon
        const icon = this.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-angle-down', isHidden);
          icon.classList.toggle('fa-angle-up', !isHidden);
        }
      }
    });
  }
}

// Execute when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set up toggles after DOM is loaded
  setupAdvancedOptionsToggles();
});
EOF
            echo "Added setupAdvancedOptionsToggles function and event listener to main.js"
        fi
    else
        echo "setupAdvancedOptionsToggles function already exists in main.js"
    fi
else
    echo "Warning: main.js not found"
    
    # Create a basic main.js if it doesn't exist
    ensure_dir "${PROJECT_DIR}/js"
    
    cat > "${PROJECT_DIR}/js/main.js" << 'EOF'
/**
 * Main JavaScript file for the TCO Calculator
 */

// Function to set up advanced options toggles
function setupAdvancedOptionsToggles() {
  const advancedOptionsToggle = document.querySelector('.advanced-options-toggle button');
  if (advancedOptionsToggle) {
    advancedOptionsToggle.addEventListener('click', function() {
      const panel = document.getElementById('advanced-options-panel');
      if (panel) {
        const isHidden = panel.classList.toggle('hidden');
        this.setAttribute('aria-expanded', !isHidden);
        
        // Toggle icon
        const icon = this.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-angle-down', isHidden);
          icon.classList.toggle('fa-angle-up', !isHidden);
        }
      }
    });
  }
  
  const customCostsToggle = document.querySelector('.advanced-options-toggle button[aria-controls="custom-costs-section"]');
  if (customCostsToggle) {
    customCostsToggle.addEventListener('click', function() {
      const panel = document.getElementById('custom-costs-section');
      if (panel) {
        const isHidden = panel.classList.toggle('hidden');
        this.setAttribute('aria-expanded', !isHidden);
        
        // Toggle icon
        const icon = this.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-angle-down', isHidden);
          icon.classList.toggle('fa-angle-up', !isHidden);
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing TCO Calculator...');
  
  try {
    // Initialize DOM Cache
    if (window.DOMCache) {
      window.domCache = new DOMCache();
      window.domCache.init();
      console.log('DOM Cache initialized');
    }
    
    // Initialize UI Controller
    if (window.UIController) {
      window.uiController = new UIController();
      console.log('UI Controller initialized');
    }
    
    // Initialize Chart Builder
    if (window.ChartBuilder) {
      window.chartBuilder = new ChartBuilder();
      window.chartBuilder.initCharts();
      console.log('Chart Builder initialized');
    }
    
    // Initialize Calculator
    if (window.Calculator) {
      window.calculator = new Calculator();
      console.log('Calculator initialized');
    }
    
    // Set default active vendor
    if (window.uiController) {
      window.uiController.setActiveVendor('cisco');
      console.log('Active vendor set to Cisco');
    }
    
    // Set up advanced options toggles
    setupAdvancedOptionsToggles();
    
    // Add calculate button event listener
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', function() {
        console.log('Calculate button clicked');
        if (window.calculator) {
          window.calculator.calculate();
        }
      });
    }
    
    // Pre-calculate for initial state
    setTimeout(() => {
      try {
        console.log('Running initial calculation...');
        if (window.calculator) {
          window.calculator.calculate();
        }
        console.log('Initial calculation completed');
      } catch (err) {
        console.error('Error during initial calculation:', err);
      }
    }, 1000);
    
    console.log('TCO Calculator initialized and ready');
  } catch (error) {
    console.error('Error initializing TCO Calculator:', error);
  }
});
EOF
    echo "Created new main.js file with toggles functionality"
fi

#==============================================================================
# Step 7: Update calculator.js to support custom cost multipliers
#==============================================================================
echo "Updating calculator.js with custom cost multipliers support..."

# Check if calculator.js exists
if [ -f "${PROJECT_DIR}/js/components/calculator.js" ]; then
    # Check if calculateVendorTCO already supports custom multipliers
    if ! grep -q "customHardwareMultiplier" "${PROJECT_DIR}/js/components/calculator.js"; then
        # Create a working copy
        cp "${PROJECT_DIR}/js/components/calculator.js" "${TEMP_DIR}/calculator.js"
        
        # Create updated calculateVendorTCO function
        cat > "${TEMP_DIR}/calculate_vendor_tco.js" << 'EOF'
  calculateVendorTCO(vendor, currentVendor, orgSize, deviceCount, yearsToProject) {
    try {
      if (!window.vendorData[vendor] || !window.vendorData[vendor][orgSize]) {
        console.error(`Invalid vendor or organization size: ${vendor}, ${orgSize}`);
        return {
          totalTCO: 0,
          totalInitialCosts: 0,
          annualCosts: 0,
          migrationCost: 0,
          totalSavings: 0,
          savingsPercentage: 0,
          annualSavings: 0,
          costBreakdown: {
            hardware: 0,
            networkRedesign: 0,
            implementation: 0,
            training: 0,
            maintenance: 0,
            licensing: 0,
            personnel: 0,
            downtime: 0
          }
        };
      }
      
      const vendorInfo = window.vendorData[vendor][orgSize];
      const complexityMultiplier = calculateComplexityMultiplier(vendor, window.vendorData[vendor].cloudBased);
      
      // Get cost multipliers from custom settings if available
      const customHardwareMultiplier = parseFloat(document.getElementById('custom-hardware-cost')?.value) || 1.0;
      const customLicensingMultiplier = parseFloat(document.getElementById('custom-licensing-cost')?.value) || 1.0;
      const customMaintenanceMultiplier = parseFloat(document.getElementById('custom-maintenance-cost')?.value) || 1.0;
      const customImplementationMultiplier = parseFloat(document.getElementById('custom-implementation-cost')?.value) || 1.0;
      const customTrainingMultiplier = parseFloat(document.getElementById('training-cost-multiplier')?.value) || 1.0;
      
      // Get custom FTE costs if available
      const customNetworkAdminSalary = parseFloat(document.getElementById('network-admin-salary')?.value) || 120000;
      const customSecurityAdminSalary = parseFloat(document.getElementById('security-admin-salary')?.value) || 135000;
      const customSystemAdminSalary = parseFloat(document.getElementById('system-admin-salary')?.value) || 110000;
      const customHelpdeskSalary = parseFloat(document.getElementById('helpdesk-salary')?.value) || 75000;
      
      // Get custom downtime cost if available
      const customDowntimeCost = parseFloat(document.getElementById('downtime-cost')?.value) || 5000;
      
      // Calculate initial costs with custom multipliers
      const initialHardware = vendorInfo.initialHardware * customHardwareMultiplier;
      const networkRedesign = vendorInfo.networkRedesign;
      const implementation = vendorInfo.implementation * customImplementationMultiplier;
      const training = vendorInfo.training * customTrainingMultiplier;
      
      const totalInitialCosts = (initialHardware + networkRedesign + implementation + training) * complexityMultiplier;
      
      // Calculate annual costs with custom multipliers
      const annualMaintenance = vendorInfo.annualMaintenance * customMaintenanceMultiplier;
      const annualLicensing = vendorInfo.annualLicensing * customLicensingMultiplier;
      
      // Use custom FTE costs for calculation
      const fteCosts = {
        networkAdmin: customNetworkAdminSalary,
        securityAdmin: customSecurityAdminSalary,
        systemAdmin: customSystemAdminSalary,
        helpDesk: customHelpdeskSalary
      };
      
      let fteCost = 0;
      for (const [role, amount] of Object.entries(vendorInfo.fteAllocation)) {
        fteCost += fteCosts[role] * amount;
      }
      
      const downtimeCost = vendorInfo.annualDowntime * customDowntimeCost;
      
      const annualCosts = (annualMaintenance + annualLicensing + fteCost + downtimeCost) * complexityMultiplier;
      
      // Calculate TCO
      const totalTCO = totalInitialCosts + (annualCosts * yearsToProject);
      
      // Calculate migration cost (if different from current vendor)
      let migrationCost = 0;
      if (vendor !== currentVendor) {
        const migrationFactor = this.getMigrationFactor(currentVendor, vendor);
        migrationCost = implementation * complexityMultiplier * migrationFactor;
      }
      
      // Calculate savings vs current solution
      let totalSavings = 0;
      let savingsPercentage = 0;
      let annualSavings = 0;
      
      if (vendor !== currentVendor) {
        const currentVendorInfo = window.vendorData[currentVendor][orgSize];
        const currentComplexity = calculateComplexityMultiplier(currentVendor, window.vendorData[currentVendor].cloudBased);
        
        // Apply the same custom multipliers to current vendor for fair comparison
        const currentInitialHardware = currentVendorInfo.initialHardware * customHardwareMultiplier;
        const currentNetworkRedesign = currentVendorInfo.networkRedesign;
        const currentImplementation = currentVendorInfo.implementation * customImplementationMultiplier;
        const currentTraining = currentVendorInfo.training * customTrainingMultiplier;
        
        const currentInitial = (currentInitialHardware + currentNetworkRedesign + 
                              currentImplementation + currentTraining) * currentComplexity;
        
        const currentAnnualMaintenance = currentVendorInfo.annualMaintenance * customMaintenanceMultiplier;
        const currentAnnualLicensing = currentVendorInfo.annualLicensing * customLicensingMultiplier;
        
        // Calculate current FTE cost with custom salaries
        let currentFteCost = 0;
        for (const [role, amount] of Object.entries(currentVendorInfo.fteAllocation)) {
          currentFteCost += fteCosts[role] * amount;
        }
        
        const currentDowntimeCost = currentVendorInfo.annualDowntime * customDowntimeCost;
        
        const currentAnnual = (currentAnnualMaintenance + currentAnnualLicensing + 
                              currentFteCost + currentDowntimeCost) * currentComplexity;
        
        const currentTCO = currentInitial + (currentAnnual * yearsToProject);
        
        totalSavings = currentTCO - totalTCO - migrationCost;
        savingsPercentage = currentTCO > 0 ? (totalSavings / currentTCO) * 100 : 0;
        annualSavings = currentAnnual - annualCosts;
      }
      
      // Create cost breakdown
      const costBreakdown = {
        hardware: initialHardware * complexityMultiplier,
        networkRedesign: networkRedesign * complexityMultiplier,
        implementation: implementation * complexityMultiplier,
        training: training * complexityMultiplier,
        maintenance: annualMaintenance * yearsToProject * complexityMultiplier,
        licensing: annualLicensing * yearsToProject * complexityMultiplier,
        personnel: fteCost * yearsToProject * complexityMultiplier,
        downtime: downtimeCost * yearsToProject * complexityMultiplier
      };
      
      return {
        totalTCO,
        totalInitialCosts,
        annualCosts,
        migrationCost,
        totalSavings,
        savingsPercentage,
        annualSavings,
        costBreakdown
      };
    } catch (error) {
      console.error(`Error calculating TCO for vendor ${vendor}:`, error);
      return {
        totalTCO: 0,
        totalInitialCosts: 0,
        annualCosts: 0,
        migrationCost: 0,
        totalSavings: 0,
        savingsPercentage: 0,
        annualSavings: 0,
        costBreakdown: {
          hardware: 0,
          networkRedesign: 0,
          implementation: 0,
          training: 0,
          maintenance: 0,
          licensing: 0,
          personnel: 0,
          downtime: 0
        }
      };
    }
  }
EOF

        # Look for calculateVendorTCO method
        CALC_VENDOR_TCO=$(grep -n "calculateVendorTCO" "${TEMP_DIR}/calculator.js" | head -n 1 | cut -d: -f1)
        
        if [ -n "$CALC_VENDOR_TCO" ]; then
            # Find the end of the function
            # This is a bit complex as we need to track braces
            awk -v start="$CALC_VENDOR_TCO" '
            BEGIN { in_function = 0; brace_count = 0; start_line = 0; }
            
            NR == start {
                in_function = 1;
                start_line = NR;
                print NR > "/tmp/func_start.txt";
            }
            
            in_function {
                for (i = 1; i <= length($0); i++) {
                    c = substr($0, i, 1);
                    if (c == "{") brace_count++;
                    if (c == "}") brace_count--;
                    
                    # If braces are balanced and we found at least one closing brace
                    if (brace_count == 0 && c == "}" && NR > start_line) {
                        print NR > "/tmp/func_end.txt";
                        exit;
                    }
                }
            }
            ' "${TEMP_DIR}/calculator.js"
            
            if [ -f "/tmp/func_start.txt" ] && [ -f "/tmp/func_end.txt" ]; then
                FUNC_START=$(cat /tmp/func_start.txt)
                FUNC_END=$(cat /tmp/func_end.txt)
                
                # Replace the function with our updated version
                {
                    head -n $((FUNC_START - 1)) "${TEMP_DIR}/calculator.js"
                    cat "${TEMP_DIR}/calculate_vendor_tco.js"
                    tail -n +$((FUNC_END + 1)) "${TEMP_DIR}/calculator.js"
                } > "${TEMP_DIR}/calculator.js.fixed"
                
                # Replace the original
                cp "${TEMP_DIR}/calculator.js.fixed" "${PROJECT_DIR}/js/components/calculator.js"
                echo "Updated calculator.js with custom cost multipliers support"
                
                # Clean up temp files
                rm -f /tmp/func_start.txt /tmp/func_end.txt
            else
                echo "Warning: Could not locate calculateVendorTCO function boundaries"
                
                # Try a different approach - create a new function implementation
                # and append it to the end of the file, relying on JavaScript function hoisting
                
                # Backup original
                cp "${PROJECT_DIR}/js/components/calculator.js" "${BACKUP_DIR}/calculator.js.orig"
                
                # Add new implementation to end of file
                cat "${TEMP_DIR}/calculate_vendor_tco.js" >> "${PROJECT_DIR}/js/components/calculator.js"
                echo "Added new calculateVendorTCO implementation to calculator.js"
            fi
        else
            echo "Warning: calculateVendorTCO function not found in calculator.js"
            
            # Add custom function to end of file
            cp "${PROJECT_DIR}/js/components/calculator.js" "${BACKUP_DIR}/calculator.js.orig"
            cat "${TEMP_DIR}/calculate_vendor_tco.js" >> "${PROJECT_DIR}/js/components/calculator.js"
            echo "Added calculateVendorTCO function to calculator.js"
        fi
    else
        echo "calculator.js already supports custom cost multipliers"
    fi
else
    echo "Warning: calculator.js not found"
    
    # Create basic calculator.js with the custom multipliers support
    ensure_dir "${PROJECT_DIR}/js/components"
    
    cat > "${PROJECT_DIR}/js/components/calculator.js" << 'EOF'
/**
 * TCO Calculator for computing cost comparisons
 */

class Calculator {
  constructor() {
    this.results = null;
    this.resultsAvailable = false;
    this.isCalculating = false;
  }

  calculate() {
    // Prevent multiple calculations at once
    if (this.isCalculating) {
      console.log('Calculation already in progress');
      return null;
    }
    
    this.isCalculating = true;
    this.showLoading();
    
    try {
      if (!window.vendorData) {
        console.error("Vendor data not available");
        this.hideLoading();
        this.isCalculating = false;
        return null;
      }
      
      const currentVendor = window.uiController ? window.uiController.activeVendor : 'cisco';
      const deviceCount = parseInt(document.getElementById('device-count')?.value) || 1000;
      const orgSize = document.getElementById('organization-size')?.value || 'medium';
      const yearsToProject = parseInt(document.getElementById('years-to-project')?.value) || 3;
      
      console.log(`Calculating TCO for ${currentVendor}, ${deviceCount} devices, ${orgSize} org, ${yearsToProject} years`);
      
      // Calculate TCO for all vendors
      const tcoResults = {};
      
      Object.keys(window.vendorData || {}).forEach(vendor => {
        const result = this.calculateVendorTCO(vendor, currentVendor, orgSize, deviceCount, yearsToProject);
        tcoResults[vendor] = result;
      });
      
      // Add metadata to results
      tcoResults.yearsToProject = yearsToProject;
      tcoResults.deviceCount = deviceCount;
      tcoResults.orgSize = orgSize;
      
      // Store results
      this.results = tcoResults;
      this.resultsAvailable = true;
      
      // Update UI
      this.updateUI();
      
      // Hide loading indicator
      this.hideLoading();
      this.isCalculating = false;
      
      return tcoResults;
    } catch (error) {
      console.error("Error in calculator.calculate():", error);
      this.hideLoading();
      this.isCalculating = false;
      return null;
    }
  }

  calculateVendorTCO(vendor, currentVendor, orgSize, deviceCount, yearsToProject) {
    try {
      if (!window.vendorData[vendor] || !window.vendorData[vendor][orgSize]) {
        console.error(`Invalid vendor or organization size: ${vendor}, ${orgSize}`);
        return {
          totalTCO: 0,
          totalInitialCosts: 0,
          annualCosts: 0,
          migrationCost: 0,
          totalSavings: 0,
          savingsPercentage: 0,
          annualSavings: 0,
          costBreakdown: {
            hardware: 0,
            networkRedesign: 0,
            implementation: 0,
            training: 0,
            maintenance: 0,
            licensing: 0,
            personnel: 0,
            downtime: 0
          }
        };
      }
      
      const vendorInfo = window.vendorData[vendor][orgSize];
      const complexityMultiplier = calculateComplexityMultiplier ? calculateComplexityMultiplier(vendor, window.vendorData[vendor].cloudBased) : 1.0;
      
      // Get cost multipliers from custom settings if available
      const customHardwareMultiplier = parseFloat(document.getElementById('custom-hardware-cost')?.value) || 1.0;
      const customLicensingMultiplier = parseFloat(document.getElementById('custom-licensing-cost')?.value) || 1.0;
      const customMaintenanceMultiplier = parseFloat(document.getElementById('custom-maintenance-cost')?.value) || 1.0;
      const customImplementationMultiplier = parseFloat(document.getElementById('custom-implementation-cost')?.value) || 1.0;
      const customTrainingMultiplier = parseFloat(document.getElementById('training-cost-multiplier')?.value) || 1.0;
      
      // Get custom FTE costs if available
      const customNetworkAdminSalary = parseFloat(document.getElementById('network-admin-salary')?.value) || 120000;
      const customSecurityAdminSalary = parseFloat(document.getElementById('security-admin-salary')?.value) || 135000;
      const customSystemAdminSalary = parseFloat(document.getElementById('system-admin-salary')?.value) || 110000;
      const customHelpdeskSalary = parseFloat(document.getElementById('helpdesk-salary')?.value) || 75000;
      
      // Get custom downtime cost if available
      const customDowntimeCost = parseFloat(document.getElementById('downtime-cost')?.value) || 5000;
      
      // Calculate initial costs with custom multipliers
      const initialHardware = vendorInfo.initialHardware * customHardwareMultiplier;
      const networkRedesign = vendorInfo.networkRedesign;
      const implementation = vendorInfo.implementation * customImplementationMultiplier;
      const training = vendorInfo.training * customTrainingMultiplier;
      
      const totalInitialCosts = (initialHardware + networkRedesign + implementation + training) * complexityMultiplier;
      
      // Calculate annual costs with custom multipliers
      const annualMaintenance = vendorInfo.annualMaintenance * customMaintenanceMultiplier;
      const annualLicensing = vendorInfo.annualLicensing * customLicensingMultiplier;
      
      // Use custom FTE costs for calculation
      const fteCosts = {
        networkAdmin: customNetworkAdminSalary,
        securityAdmin: customSecurityAdminSalary,
        systemAdmin: customSystemAdminSalary,
        helpDesk: customHelpdeskSalary
      };
      
      let fteCost = 0;
      for (const [role, amount] of Object.entries(vendorInfo.fteAllocation)) {
        fteCost += fteCosts[role] * amount;
      }
      
      const downtimeCost = vendorInfo.annualDowntime * customDowntimeCost;
      
      const annualCosts = (annualMaintenance + annualLicensing + fteCost + downtimeCost) * complexityMultiplier;
      
      // Calculate TCO
      const totalTCO = totalInitialCosts + (annualCosts * yearsToProject);
      
      // Calculate migration cost (if different from current vendor)
      let migrationCost = 0;
      if (vendor !== currentVendor) {
        const migrationFactor = this.getMigrationFactor ? this.getMigrationFactor(currentVendor, vendor) : 0.5;
        migrationCost = implementation * complexityMultiplier * migrationFactor;
      }
      
      // Calculate savings vs current solution
      let totalSavings = 0;
      let savingsPercentage = 0;
      let annualSavings = 0;
      
      if (vendor !== currentVendor) {
        const currentVendorInfo = window.vendorData[currentVendor][orgSize];
        const currentComplexity = calculateComplexityMultiplier ? calculateComplexityMultiplier(currentVendor, window.vendorData[currentVendor].cloudBased) : 1.0;
        
        // Apply the same custom multipliers to current vendor for fair comparison
        const currentInitialHardware = currentVendorInfo.initialHardware * customHardwareMultiplier;
        const currentNetworkRedesign = currentVendorInfo.networkRedesign;
        const currentImplementation = currentVendorInfo.implementation * customImplementationMultiplier;
        const currentTraining = currentVendorInfo.training * customTrainingMultiplier;
        
        const currentInitial = (currentInitialHardware + currentNetworkRedesign + 
                              currentImplementation + currentTraining) * currentComplexity;
        
        const currentAnnualMaintenance = currentVendorInfo.annualMaintenance * customMaintenanceMultiplier;
        const currentAnnualLicensing = currentVendorInfo.annualLicensing * customLicensingMultiplier;
        
        // Calculate current FTE cost with custom salaries
        let currentFteCost = 0;
        for (const [role, amount] of Object.entries(currentVendorInfo.fteAllocation)) {
          currentFteCost += fteCosts[role] * amount;
        }
        
        const currentDowntimeCost = currentVendorInfo.annualDowntime * customDowntimeCost;
        
        const currentAnnual = (currentAnnualMaintenance + currentAnnualLicensing + 
                              currentFteCost + currentDowntimeCost) * currentComplexity;
        
        const currentTCO = currentInitial + (currentAnnual * yearsToProject);
        
        totalSavings = currentTCO - totalTCO - migrationCost;
        savingsPercentage = currentTCO > 0 ? (totalSavings / currentTCO) * 100 : 0;
        annualSavings = currentAnnual - annualCosts;
      }
      
      // Create cost breakdown
      const costBreakdown = {
        hardware: initialHardware * complexityMultiplier,
        networkRedesign: networkRedesign * complexityMultiplier,
        implementation: implementation * complexityMultiplier,
        training: training * complexityMultiplier,
        maintenance: annualMaintenance * yearsToProject * complexityMultiplier,
        licensing: annualLicensing * yearsToProject * complexityMultiplier,
        personnel: fteCost * yearsToProject * complexityMultiplier,
        downtime: downtimeCost * yearsToProject * complexityMultiplier
      };
      
      return {
        totalTCO,
        totalInitialCosts,
        annualCosts,
        migrationCost,
        totalSavings,
        savingsPercentage,
        annualSavings,
        costBreakdown
      };
    } catch (error) {
      console.error(`Error calculating TCO for vendor ${vendor}:`, error);
      return {
        totalTCO: 0,
        totalInitialCosts: 0,
        annualCosts: 0,
        migrationCost: 0,
        totalSavings: 0,
        savingsPercentage: 0,
        annualSavings: 0,
        costBreakdown: {
          hardware: 0,
          networkRedesign: 0,
          implementation: 0,
          training: 0,
          maintenance: 0,
          licensing: 0,
          personnel: 0,
          downtime: 0
        }
      };
    }
  }

  // Helper method to get migration factor
  getMigrationFactor(fromVendor, toVendor) {
    // Use global migration factors if available
    if (window.migrationFactors && 
        window.migrationFactors[fromVendor] && 
        window.migrationFactors[fromVendor][toVendor]) {
      return window.migrationFactors[fromVendor][toVendor];
    }
    
    // Fallback to default migration factors
    return window.calculateMigrationFactor ? 
      window.calculateMigrationFactor(fromVendor, toVendor) : 0.5;
  }

  // Update UI with calculation results
  updateUI() {
    // To be implemented based on your UI components
    console.log("Calculation complete, update UI here");
  }
  
  // Show loading indicator
  showLoading() {
    // Implementation depends on your loading indicator
    console.log("Showing loading indicator");
  }
  
  // Hide loading indicator
  hideLoading() {
    // Implementation depends on your loading indicator
    console.log("Hiding loading indicator");
  }
}
EOF
    echo "Created new calculator.js with custom cost multipliers support"
fi

#==============================================================================
# Step 8: Add PDF export functionality to ui-controller.js
#==============================================================================
echo "Adding PDF export functionality..."

# Check if ui-controller.js exists
if [ -f "${PROJECT_DIR}/js/components/ui-controller.js" ]; then
    # Check if exportToPDF already exists
    if ! grep -q "exportToPDF" "${PROJECT_DIR}/js/components/ui-controller.js"; then
        # Create a working copy
        cp "${PROJECT_DIR}/js/components/ui-controller.js" "${TEMP_DIR}/ui-controller.js"
        
        # Create exportToPDF function
        cat > "${TEMP_DIR}/export_to_pdf.js" << 'EOF'
  exportToPDF() {
    if (!window.jspdf || !window.calculator || !window.calculator.results) {
      console.warn('PDF export functionality not available or no results to export');
      if (window.notificationManager) {
        window.notificationManager.warn('PDF export functionality not available or no results to export');
      } else {
        alert('PDF export functionality not available or no results to export');
      }
      return false;
    }
    
    try {
      // Create new PDF document
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.setTextColor(27, 103, 178); // Primary color
      doc.text('NAC Solution TCO Comparison Report', 105, 20, { align: 'center' });
      
      // Add date
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80); // Gray
      const date = new Date().toLocaleDateString();
      doc.text(`Generated on ${date}`, 105, 30, { align: 'center' });
      
      // Add organization info
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      const results = window.calculator.results;
      doc.text(`Organization Size: ${results.orgSize.charAt(0).toUpperCase() + results.orgSize.slice(1)}`, 20, 45);
      doc.text(`Device Count: ${results.deviceCount.toLocaleString()}`, 20, 52);
      doc.text(`Years Projected: ${results.yearsToProject}`, 20, 59);
      
      // Add TCO summary table
      doc.setFontSize(14);
      doc.text('TCO Summary', 20, 75);
      
      const vendors = Object.keys(window.vendorData || {});
      const summaryTableData = vendors.map(vendor => {
        const result = results[vendor];
        if (!result) return null;
        
        return [
          window.vendorData[vendor].name,
          window.formatCurrency ? window.formatCurrency(result.totalInitialCosts) : '$' + result.totalInitialCosts.toLocaleString(),
          window.formatCurrency ? window.formatCurrency(result.annualCosts) : '$' + result.annualCosts.toLocaleString(),
          window.formatCurrency ? window.formatCurrency(result.migrationCost) : '$' + result.migrationCost.toLocaleString(),
          window.formatCurrency ? window.formatCurrency(result.totalTCO) : '$' + result.totalTCO.toLocaleString()
        ];
      }).filter(row => row !== null);
      
      // Add table headers
      const summaryHeaders = ['Vendor', 'Initial Costs', 'Annual Costs', 'Migration Costs', 'Total TCO'];
      
      // Create auto table if the plugin is available
      if (doc.autoTable) {
        doc.autoTable({
          head: [summaryHeaders],
          body: summaryTableData,
          startY: 80,
          theme: 'grid',
          headStyles: {
            fillColor: [27, 103, 178],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          alternateRowStyles: {
            fillColor: [240, 240, 240]
          }
        });
      } else {
        // Fallback if autoTable plugin is not available
        doc.setFontSize(10);
        doc.text("TCO Summary Table (autoTable plugin not available)", 20, 80);
        doc.text("Please install jspdf.plugin.autotable.min.js for better tables", 20, 90);
      }
      
      // Add footer
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Portnox Cloud NAC Solution TCO Calculator', 20, 285);
      doc.text(`Page 1 of 1`, 180, 285);
      
      // Save PDF
      doc.save(`NAC_TCO_Comparison_${date.replace(/\//g, '-')}.pdf`);
      
      // Show success message
      if (window.notificationManager) {
        window.notificationManager.success('PDF report generated successfully');
      } else {
        alert('PDF report generated successfully');
      }
      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      if (window.notificationManager) {
        window.notificationManager.error('Error generating PDF: ' + error.message);
      } else {
        alert('Error generating PDF: ' + error.message);
      }
      return false;
    }
  }
EOF

        # Find exportToCSV function to position our new function
        EXPORT_CSV=$(grep -n "exportToCSV" "${TEMP_DIR}/ui-controller.js" | head -n 1 | cut -d: -f1)
        
        if [ -n "$EXPORT_CSV" ]; then
            # Find end of exportToCSV function
            awk -v start="$EXPORT_CSV" '
            BEGIN { in_function = 0; brace_count = 0; start_line = 0; }
            
            NR == start {
                in_function = 1;
                start_line = NR;
                print NR > "/tmp/export_csv_start.txt";
            }
            
            in_function {
                for (i = 1; i <= length($0); i++) {
                    c = substr($0, i, 1);
                    if (c == "{") brace_count++;
                    if (c == "}") brace_count--;
                    
                    # If braces are balanced and we found at least one closing brace
                    if (brace_count == 0 && c == "}" && NR > start_line) {
                        print NR > "/tmp/export_csv_end.txt";
                        exit;
                    }
                }
            }
            ' "${TEMP_DIR}/ui-controller.js"
            
            if [ -f "/tmp/export_csv_end.txt" ]; then
                EXPORT_CSV_END=$(cat /tmp/export_csv_end.txt)
                
                # Insert exportToPDF function after exportToCSV
                {
                    head -n "$EXPORT_CSV_END" "${TEMP_DIR}/ui-controller.js"
                    echo "" # Add an empty line
                    cat "${TEMP_DIR}/export_to_pdf.js"
                    tail -n +$((EXPORT_CSV_END + 1)) "${TEMP_DIR}/ui-controller.js"
                } > "${TEMP_DIR}/ui-controller.js.fixed"
                
                # Replace the original
                cp "${TEMP_DIR}/ui-controller.js.fixed" "${PROJECT_DIR}/js/components/ui-controller.js"
                echo "Added exportToPDF function to ui-controller.js"
                
                # Clean up temp file
                rm -f /tmp/export_csv_start.txt /tmp/export_csv_end.txt
            else
                echo "Warning: Could not find end of exportToCSV function"
                
                # Try a different approach - add function to end of file
                cp "${PROJECT_DIR}/js/components/ui-controller.js" "${BACKUP_DIR}/ui-controller.js.orig"
                echo "" >> "${PROJECT_DIR}/js/components/ui-controller.js" # Add an empty line
                cat "${TEMP_DIR}/export_to_pdf.js" >> "${PROJECT_DIR}/js/components/ui-controller.js"
                echo "Added exportToPDF function at the end of ui-controller.js"
            fi
        else
            echo "Warning: exportToCSV function not found in ui-controller.js"
            
            # Add exportToPDF function at end of file
            cp "${PROJECT_DIR}/js/components/ui-controller.js" "${BACKUP_DIR}/ui-controller.js.orig"
            echo "" >> "${PROJECT_DIR}/js/components/ui-controller.js" # Add an empty line
            cat "${TEMP_DIR}/export_to_pdf.js" >> "${PROJECT_DIR}/js/components/ui-controller.js"
            echo "Added exportToPDF function at the end of ui-controller.js"
        fi
    else
        echo "exportToPDF function already exists in ui-controller.js"
    fi
else
    echo "Warning: ui-controller.js not found"
    
    # Create a basic ui-controller.js with the export functions
    ensure_dir "${PROJECT_DIR}/js/components"
    
    cat > "${PROJECT_DIR}/js/components/ui-controller.js" << 'EOF'
/**
 * UI Controller for TCO Calculator
 */

class UIController {
  constructor() {
    this.activeVendor = null;
    this.activeTab = 'comparison-tab';
    this.activeSubTab = 'cost-breakdown';
    this.initEventListeners();
  }
  
  // Initialize event listeners
  initEventListeners() {
    // Initialize vendor card clicks
    document.querySelectorAll('.vendor-card').forEach(card => {
      card.addEventListener('click', () => {
        const vendor = card.getAttribute('data-vendor');
        if (vendor) {
          this.setActiveVendor(vendor);
        }
      });
    });
    
    // Initialize export buttons
    const exportCsvBtn = document.getElementById('export-csv-btn');
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => {
        this.exportToCSV();
      });
    }
    
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    if (exportPdfBtn) {
      exportPdfBtn.addEventListener('click', () => {
        this.exportToPDF();
      });
    }
  }
  
  // Set active vendor
  setActiveVendor(vendor) {
    this.activeVendor = vendor;
    
    // Update UI to reflect active vendor
    document.querySelectorAll('.vendor-card').forEach(card => {
      const cardVendor = card.getAttribute('data-vendor');
      if (cardVendor === vendor) {
        card.classList.add('active');
        card.setAttribute('aria-checked', 'true');
      } else {
        card.classList.remove('active');
        card.setAttribute('aria-checked', 'false');
      }
    });
    
    // Recalculate if calculator is available
    if (window.calculator && typeof window.calculator.calculate === 'function') {
      window.calculator.calculate();
    }
  }
  
  // Export to CSV
  exportToCSV() {
    if (!window.calculator || !window.calculator.results) {
      console.warn('No calculation results available to export');
      if (window.notificationManager) {
        window.notificationManager.warn('No calculation results available to export');
      } else {
        alert('No calculation results available to export');
      }
      return false;
    }
    
    try {
      const results = window.calculator.results;
      const vendors = Object.keys(window.vendorData || {});
      
      // Create CSV header
      let csv = ['Vendor,Initial Costs,Annual Costs,Migration Costs,Total TCO'];
      
      // Add data rows
      vendors.forEach(vendor => {
        const result = results[vendor];
        if (!result) return;
        
        const row = [
          window.vendorData[vendor].name,
          result.totalInitialCosts,
          result.annualCosts,
          result.migrationCost,
          result.totalTCO
        ].join(',');
        
        csv.push(row);
      });
      
      // Create data URL and download link
      const csvContent = csv.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      // Set download attributes
      link.setAttribute('href', url);
      link.setAttribute('download', 'tco_comparison.csv');
      link.style.visibility = 'hidden';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message
      if (window.notificationManager) {
        window.notificationManager.success('CSV exported successfully');
      } else {
        alert('CSV exported successfully');
      }
      
      return true;
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      if (window.notificationManager) {
        window.notificationManager.error('Error exporting to CSV: ' + error.message);
      } else {
        alert('Error exporting to CSV: ' + error.message);
      }
      return false;
    }
  }
  
  // Export to PDF
  exportToPDF() {
    if (!window.jspdf || !window.calculator || !window.calculator.results) {
      console.warn('PDF export functionality not available or no results to export');
      if (window.notificationManager) {
        window.notificationManager.warn('PDF export functionality not available or no results to export');
      } else {
        alert('PDF export functionality not available or no results to export');
      }
      return false;
    }
    
    try {
      // Create new PDF document
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.setTextColor(27, 103, 178); // Primary color
      doc.text('NAC Solution TCO Comparison Report', 105, 20, { align: 'center' });
      
      // Add date
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80); // Gray
      const date = new Date().toLocaleDateString();
      doc.text(`Generated on ${date}`, 105, 30, { align: 'center' });
      
      // Add organization info
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      const results = window.calculator.results;
      doc.text(`Organization Size: ${results.orgSize.charAt(0).toUpperCase() + results.orgSize.slice(1)}`, 20, 45);
      doc.text(`Device Count: ${results.deviceCount.toLocaleString()}`, 20, 52);
      doc.text(`Years Projected: ${results.yearsToProject}`, 20, 59);
      
      // Add TCO summary table
      doc.setFontSize(14);
      doc.text('TCO Summary', 20, 75);
      
      const vendors = Object.keys(window.vendorData || {});
      const summaryTableData = vendors.map(vendor => {
        const result = results[vendor];
        if (!result) return null;
        
        return [
          window.vendorData[vendor].name,
          window.formatCurrency ? window.formatCurrency(result.totalInitialCosts) : '$' + result.totalInitialCosts.toLocaleString(),
          window.formatCurrency ? window.formatCurrency(result.annualCosts) : '$' + result.annualCosts.toLocaleString(),
          window.formatCurrency ? window.formatCurrency(result.migrationCost) : '$' + result.migrationCost.toLocaleString(),
          window.formatCurrency ? window.formatCurrency(result.totalTCO) : '$' + result.totalTCO.toLocaleString()
        ];
      }).filter(row => row !== null);
      
      // Add table headers
      const summaryHeaders = ['Vendor', 'Initial Costs', 'Annual Costs', 'Migration Costs', 'Total TCO'];
      
      // Create auto table if the plugin is available
      if (doc.autoTable) {
        doc.autoTable({
          head: [summaryHeaders],
          body: summaryTableData,
          startY: 80,
          theme: 'grid',
          headStyles: {
            fillColor: [27, 103, 178],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          alternateRowStyles: {
            fillColor: [240, 240, 240]
          }
        });
      } else {
        // Fallback if autoTable plugin is not available
        doc.setFontSize(10);
        doc.text("TCO Summary Table (autoTable plugin not available)", 20, 80);
        doc.text("Please install jspdf.plugin.autotable.min.js for better tables", 20, 90);
      }
      
      // Add footer
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Portnox Cloud NAC Solution TCO Calculator', 20, 285);
      doc.text(`Page 1 of 1`, 180, 285);
      
      // Save PDF
      doc.save(`NAC_TCO_Comparison_${date.replace(/\//g, '-')}.pdf`);
      
      // Show success message
      if (window.notificationManager) {
        window.notificationManager.success('PDF report generated successfully');
      } else {
        alert('PDF report generated successfully');
      }
      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      if (window.notificationManager) {
        window.notificationManager.error('Error generating PDF: ' + error.message);
      } else {
        alert('Error generating PDF: ' + error.message);
      }
      return false;
    }
  }
}
EOF
    echo "Created new ui-controller.js with PDF export functionality"
fi

#==============================================================================
# Final cleanup and summary
#==============================================================================
echo "Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

echo "=========================================================="
echo "  NAC Solution TCO Calculator Update Complete"
echo "=========================================================="
echo "Summary of changes:"
echo "1. Fixed duplicate DOM Cache script tag issue"
echo "2. Added missing chart canvases for feature comparison, ROI, and implementation charts"
echo "3. Added options-grid CSS for custom cost configuration"
echo "4. Added jsPDF libraries for PDF export"
echo "5. Added custom cost configuration section"
echo "6. Updated main.js with toggle handlers for advanced options"
echo "7. Updated calculator.js to support custom cost multipliers"
echo "8. Added PDF export functionality"
echo ""
echo "The NAC Solution TCO Calculator has been successfully updated!"
echo "A backup of the original files is available at: $BACKUP_DIR"
echo "Log file: $LOG_FILE"
echo ""
echo "To test the updated application, open index.html in your browser."

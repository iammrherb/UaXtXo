#!/bin/bash

# Enhanced NAC Solution TCO Calculator Update Script
# This script updates the NAC Solution TCO Calculator with improved reliability

# Exit on error
set -e

# Set variables
PROJECT_DIR="$(pwd)"
BACKUP_DIR="${PROJECT_DIR}/backups/$(date +%Y%m%d_%H%M%S)"
TEMP_DIR="${PROJECT_DIR}/temp_update"
LOG_FILE="${PROJECT_DIR}/update_log_$(date +%Y%m%d_%H%M%S).log"

# Enable logging
exec > >(tee -a "$LOG_FILE") 2>&1

# Print banner
echo "========================================================"
echo "  NAC Solution TCO Calculator Update"
echo "========================================================"
echo "Date: $(date)"
echo "Project directory: $PROJECT_DIR"
echo "Backup directory: $BACKUP_DIR"
echo "Log file: $LOG_FILE"
echo "========================================================"

# Function to handle errors
handle_error() {
    local line=$1
    local command=$2
    local code=$3
    echo "ERROR: Command '$command' failed with exit code $code at line $line"
    echo "Rolling back changes..."
    
    # Restore from backup if needed
    if [ -d "$BACKUP_DIR" ] && [ "$(ls -A "$BACKUP_DIR")" ]; then
        echo "Restoring from backup..."
        cp -r "$BACKUP_DIR"/* "$PROJECT_DIR/"
        echo "Restore complete."
    fi
    
    # Clean up temp directory
    if [ -d "$TEMP_DIR" ]; then
        rm -rf "$TEMP_DIR"
    fi
    
    echo "Update failed. Please check the log file: $LOG_FILE"
    exit 1
}

# Set up error trap
trap 'handle_error $LINENO "$BASH_COMMAND" $?' ERR

# Function to ensure directory exists
ensure_dir() {
    if [ ! -d "$1" ]; then
        echo "Creating directory: $1"
        mkdir -p "$1"
    fi
}

# Function to safely create or update a file
update_file() {
    local file_path="$1"
    local content="$2"
    
    ensure_dir "$(dirname "$file_path")"
    echo "$content" > "$file_path"
    echo "Updated: $file_path"
    
    # Verify file was created properly
    if [ ! -f "$file_path" ] || [ ! -s "$file_path" ]; then
        echo "ERROR: Failed to create or update file: $file_path"
        return 1
    fi
    
    return 0
}

# Function to download a file with timeout and retries
download_file() {
    local file_path="$1"
    local url="$2"
    local retries=3
    local timeout=30
    
    ensure_dir "$(dirname "$file_path")"
    
    if [ -f "$file_path" ]; then
        echo "File already exists: $file_path"
        return 0
    fi
    
    echo "Downloading: $url to $file_path"
    
    for i in $(seq 1 $retries); do
        if timeout $timeout curl -s -L -o "$file_path" "$url"; then
            echo "Download successful after attempt $i"
            
            # Verify file was downloaded properly
            if [ -f "$file_path" ] && [ -s "$file_path" ]; then
                return 0
            else
                echo "Warning: Downloaded file is empty or not created"
            fi
        fi
        
        echo "Attempt $i failed. Retrying..."
        sleep 2
    done
    
    echo "ERROR: Failed to download after $retries attempts: $url"
    return 1
}

# Function to safely apply HTML changes
apply_html_changes() {
    local file="$1"
    local search_pattern="$2"
    local insert_content="$3"
    local insert_type="$4"  # "before", "after", or "replace"
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "ERROR: File does not exist: $file"
        return 1
    fi
    
    # Create temp file
    local temp_file="${TEMP_DIR}/$(basename "$file").tmp"
    cp "$file" "$temp_file"
    
    # Check if pattern exists
    if ! grep -q "$search_pattern" "$temp_file"; then
        echo "WARNING: Pattern not found in $file: $search_pattern"
        return 1
    fi
    
    # Create a marker file with unique content
    local marker_file="${TEMP_DIR}/marker_$(date +%s%N).txt"
    echo "MARKER_CONTENT_${RANDOM}_${RANDOM}" > "$marker_file"
    
    # Apply changes based on insert type
    case "$insert_type" in
        before)
            # Insert content before pattern
            awk -v pattern="$search_pattern" -v marker="$(cat "$marker_file")" '
                $0 ~ pattern {print marker; print $0; next}
                {print}
            ' "$temp_file" > "${temp_file}.new"
            ;;
        after)
            # Insert content after pattern
            awk -v pattern="$search_pattern" -v marker="$(cat "$marker_file")" '
                $0 ~ pattern {print $0; print marker; next}
                {print}
            ' "$temp_file" > "${temp_file}.new"
            ;;
        replace)
            # Replace pattern with content
            awk -v pattern="$search_pattern" -v marker="$(cat "$marker_file")" '
                $0 ~ pattern {print marker; next}
                {print}
            ' "$temp_file" > "${temp_file}.new"
            ;;
        *)
            echo "ERROR: Invalid insert type: $insert_type"
            return 1
            ;;
    esac
    
    # Replace marker with actual content
    sed -i "s|$(cat "$marker_file")|$(printf '%s' "$insert_content" | sed 's/[&/]/\\&/g')|g" "${temp_file}.new"
    
    # Verify changes were applied
    if grep -q "$insert_content" "${temp_file}.new"; then
        cp "${temp_file}.new" "$file"
        echo "Successfully applied changes to $file"
        rm -f "$marker_file" "${temp_file}.new" "$temp_file"
        return 0
    else
        echo "WARNING: Failed to apply changes to $file"
        rm -f "$marker_file" "${temp_file}.new" "$temp_file"
        return 1
    fi
}

# Function to replace a function in a JavaScript file
replace_js_function() {
    local file="$1"
    local function_name="$2"
    local new_function_content="$3"
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "ERROR: File does not exist: $file"
        return 1
    fi
    
    # Create temp file
    local temp_file="${TEMP_DIR}/$(basename "$file").tmp"
    cp "$file" "$temp_file"
    
    # Check if function exists
    if ! grep -q "$function_name" "$temp_file"; then
        echo "WARNING: Function not found in $file: $function_name"
        return 1
    fi
    
    # Create a marker for the function
    local marker="FUNCTION_REPLACEMENT_MARKER_${RANDOM}_${RANDOM}"
    
    # Create pattern to match function start
    local function_pattern="${function_name}[[:space:]]*("
    
    # Find the function and replace it with the marker
    local result=$(awk -v pattern="$function_pattern" -v marker="$marker" -v in_function=0 -v brace_count=0 '
        # If we detect the function start, set the flag and output marker
        $0 ~ pattern && !in_function {
            in_function = 1;
            brace_count = 0;
            print marker;
            next;
        }
        
        # Count opening and closing braces while inside function
        in_function {
            for (i = 1; i <= length($0); i++) {
                c = substr($0, i, 1);
                if (c == "{") brace_count++;
                if (c == "}") brace_count--;
                
                # If braces are balanced, we reached the end of the function
                if (brace_count == 0 && length($0) >= i && substr($0, i, 1) == "}") {
                    in_function = 0;
                    next;
                }
            }
            next;
        }
        
        # Output non-matching lines
        {print}
    ' "$temp_file" > "${temp_file}.new")
    
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to process JavaScript file with awk"
        return 1
    fi
    
    # Replace marker with the new function content
    sed -i "s|$marker|$new_function_content|" "${temp_file}.new"
    
    # Check if replacement worked
    if grep -q "$new_function_content" "${temp_file}.new"; then
        cp "${temp_file}.new" "$file"
        echo "Successfully replaced function in $file"
        rm -f "${temp_file}.new" "$temp_file"
        return 0
    else
        echo "WARNING: Failed to replace function in $file"
        rm -f "${temp_file}.new" "$temp_file"
        return 1
    fi
}

# Create backup
echo "Creating backup of current application..."
ensure_dir "$BACKUP_DIR"
find "$PROJECT_DIR" -maxdepth 1 -not -path "$PROJECT_DIR" -not -path "$BACKUP_DIR" -not -path "$TEMP_DIR" -exec cp -r {} "$BACKUP_DIR/" \;
echo "Backup created at: $BACKUP_DIR"

# Create temporary directory for changes
echo "Creating temporary directory for updates..."
rm -rf "$TEMP_DIR" 2>/dev/null || true
ensure_dir "$TEMP_DIR"

#==============================================================================
# Step 1: Fix missing chart canvases in HTML
#==============================================================================
echo "Adding missing chart canvas elements to HTML..."

# Create a file with the missing chart canvas HTML
cat > "${TEMP_DIR}/chart-canvas.html" << 'EOF'
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

# Create a file with the implementation chart
cat > "${TEMP_DIR}/implementation-chart.html" << 'EOF'
<!-- Implementation Comparison Chart -->
<div class="result-card">
    <h3>Implementation Timeline Comparison</h3>
    <div class="chart-container" aria-label="Implementation Comparison Chart">
        <canvas id="implementation-comparison-chart"></canvas>
    </div>
</div>
EOF

# Insert the missing charts
if [ -f "${PROJECT_DIR}/index.html" ]; then
    echo "Modifying index.html to add missing charts..."
    
    # Read chart content
    comparison_charts=$(cat "${TEMP_DIR}/chart-canvas.html")
    implementation_chart=$(cat "${TEMP_DIR}/implementation-chart.html")
    
    # Insert feature comparison and ROI charts
    apply_html_changes "${PROJECT_DIR}/index.html" '<div class="comparison-highlight-card">' "$comparison_charts" "before"
    
    # Insert implementation chart
    apply_html_changes "${PROJECT_DIR}/index.html" '<div id="implementation-tab" class="tab-pane"' "$implementation_chart" "after"
    
    echo "Added missing chart canvases to index.html"
else
    echo "Error: index.html not found"
    exit 1
fi

#==============================================================================
# Step 2: Add configurable options and extend advanced settings
#==============================================================================
echo "Adding configurable cost options..."

# Create a file with the custom costs section
cat > "${TEMP_DIR}/custom-costs.html" << 'EOF'
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

# Insert custom costs section
if grep -q "advanced-options-panel" "${PROJECT_DIR}/index.html"; then
    # Read custom costs content
    custom_costs=$(cat "${TEMP_DIR}/custom-costs.html")
    
    # Use safer method to insert content
    apply_html_changes "${PROJECT_DIR}/index.html" '<div id="advanced-options-panel" class="advanced-options-panel hidden"' "<!-- Custom Cost Configuration -->\n$custom_costs" "after"
    
    echo "Added custom cost configuration to index.html"
else
    echo "Warning: Could not find advanced-options-panel in index.html"
fi

#==============================================================================
# Step 3: Create sensitivity analysis page
#==============================================================================
echo "Creating sensitivity analysis page and related files..."

# Create sensitivity.html
update_file "${PROJECT_DIR}/sensitivity.html" "$(cat << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="NAC Solution TCO Calculator - Sensitivity Analysis">
    <title>NAC Solution Sensitivity Analysis</title>
    <link rel="stylesheet" href="libs/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/sensitivity.css">
</head>
<body>
    <div class="app-container">
        <header class="app-header">
            <div class="logo">
                <img src="img/portnox-logo.png" alt="Portnox Logo">
                <h1>NAC Solution Sensitivity Analysis</h1>
            </div>
            <div class="header-actions">
                <a href="index.html" class="btn btn-outline">Back to TCO Calculator</a>
            </div>
        </header>
        
        <div class="sensitivity-container">
            <div class="sidebar" aria-label="Sensitivity Parameters">
                <div class="parameter-card">
                    <h3>Sensitivity Parameters</h3>
                    <form id="sensitivity-form">
                        <div class="input-group">
                            <label for="param-variable">Variable to Analyze</label>
                            <select id="param-variable">
                                <option value="deviceCount">Device Count</option>
                                <option value="legacyPercentage">Legacy Device Percentage</option>
                                <option value="locationCount">Number of Locations</option>
                                <option value="yearsToProject">Years to Project</option>
                                <option value="hardwareCost">Hardware Cost</option>
                                <option value="licensingCost">Licensing Cost</option>
                                <option value="maintenanceCost">Maintenance Cost</option>
                                <option value="fteCost">FTE Cost</option>
                            </select>
                        </div>
                        
                        <div class="input-group">
                            <label for="param-vendor">Vendor to Analyze</label>
                            <select id="param-vendor">
                                <option value="all">All Vendors</option>
                                <option value="cisco">Cisco ISE</option>
                                <option value="aruba">Aruba ClearPass</option>
                                <option value="forescout">Forescout</option>
                                <option value="nps">Microsoft NPS</option>
                                <option value="fortinac">FortiNAC</option>
                                <option value="securew2">SecureW2</option>
                                <option value="portnox">Portnox Cloud</option>
                            </select>
                        </div>
                        
                        <div class="input-group">
                            <label for="param-min">Minimum Value</label>
                            <input type="number" id="param-min" value="500">
                        </div>
                        
                        <div class="input-group">
                            <label for="param-max">Maximum Value</label>
                            <input type="number" id="param-max" value="5000">
                        </div>
                        
                        <div class="input-group">
                            <label for="param-steps">Number of Steps</label>
                            <input type="number" id="param-steps" value="10" min="2" max="20">
                        </div>
                        
                        <button id="sensitivity-btn" type="button" class="btn btn-primary">
                            <i class="fas fa-chart-line"></i> Run Sensitivity Analysis
                        </button>
                    </form>
                </div>
                
                <div class="instructions-card">
                    <h3>How to Use</h3>
                    <ol>
                        <li>Select the variable you want to analyze</li>
                        <li>Choose a vendor (or all vendors)</li>
                        <li>Set the minimum and maximum value range</li>
                        <li>Set the number of steps (data points)</li>
                        <li>Click "Run Sensitivity Analysis"</li>
                    </ol>
                    <p>This tool helps you understand how changes in different variables affect the Total Cost of Ownership (TCO) for NAC solutions.</p>
                </div>
            </div>
            
            <div id="results-container" class="results-container" aria-label="Sensitivity Results" tabindex="-1">
                <div class="tabs" role="tablist" aria-label="Results Tabs">
                    <button class="tab-button active" id="tab-graph" role="tab" aria-selected="true" aria-controls="graph-tab" data-tab="graph-tab" tabindex="0">Graph View</button>
                    <button class="tab-button" id="tab-table" role="tab" aria-selected="false" aria-controls="table-tab" data-tab="table-tab" tabindex="-1">Table View</button>
                </div>
                
                <div class="tab-content">
                    <div id="message-container"></div>
                    <div class="export-options">
                        <button id="export-csv-btn" class="btn btn-outline"><i class="fas fa-file-csv"></i> Export CSV</button>
                        <button id="export-pdf-btn" class="btn btn-outline"><i class="fas fa-file-pdf"></i> Export PDF</button>
                    </div>
                    
                    <div id="graph-tab" class="tab-pane active" role="tabpanel" aria-labelledby="tab-graph">
                        <div class="result-card">
                            <h3>Sensitivity Analysis: Total Cost of Ownership</h3>
                            <div class="chart-container" aria-label="Sensitivity Analysis Chart">
                                <canvas id="sensitivity-chart"></canvas>
                            </div>
                        </div>
                        
                        <div class="result-card">
                            <h3>Savings Impact Analysis</h3>
                            <div class="chart-container" aria-label="Savings Impact Chart">
                                <canvas id="savings-impact-chart"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <div id="table-tab" class="tab-pane" role="tabpanel" aria-labelledby="tab-table">
                        <div class="result-card">
                            <h3>Sensitivity Data Table</h3>
                            <div class="table-container">
                                <table class="data-table" id="sensitivity-table">
                                    <caption class="sr-only">Sensitivity Analysis Data</caption>
                                    <thead>
                                        <tr id="sensitivity-table-header">
                                            <th scope="col">Variable Value</th>
                                            <!-- Other headers will be added dynamically -->
                                        </tr>
                                    </thead>
                                    <tbody id="sensitivity-table-body">
                                        <!-- Populated by JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <footer class="app-footer">
            <div class="copyright">
                &copy; 2025 Portnox | All Rights Reserved
            </div>
            <div class="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Contact Us</a>
            </div>
        </footer>
    </div>
    
    <!-- Chart.js -->
    <script src="libs/charts/chart.min.js"></script>
    
    <!-- jsPDF for PDF export -->
    <script src="libs/jspdf/jspdf.umd.min.js"></script>
    <script src="libs/jspdf/jspdf.plugin.autotable.min.js"></script>
    
    <!-- Core JavaScript -->
    <script src="js/utils/helpers.js"></script>
    <script src="js/managers/dom-cache.js"></script>
    <script src="js/managers/tab-manager.js"></script>
    <script src="js/managers/validation-manager.js"></script>
    <script src="js/managers/notification-manager.js"></script>
    <script src="js/managers/loading-manager.js"></script>
    
    <!-- Application Components -->
    <script src="js/vendors/vendor-data.js"></script>
    <script src="js/charts/chart-builder.js"></script>
    <script src="js/components/calculator.js"></script>
    <script src="js/components/ui-controller.js"></script>
    <script src="js/components/sensitivity-analyzer.js"></script>
    
    <!-- Main Entry Point -->
    <script src="js/sensitivity.js"></script>
</body>
</html>
EOF
)"

# Create sensitivity.css
ensure_dir "${PROJECT_DIR}/css"
update_file "${PROJECT_DIR}/css/sensitivity.css" "$(cat << 'EOF'
/* Styles specific to the Sensitivity Analysis page */

.sensitivity-container {
    display: flex;
    flex: 1;
    padding: var(--spacing-xl);
    gap: var(--spacing-xl);
}

.parameter-card,
.instructions-card {
    background-color: var(--bg-white);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

.parameter-card h3,
.instructions-card h3 {
    margin-bottom: var(--spacing-md);
    color: var(--text-primary);
    font-size: 1.2rem;
    font-weight: 600;
}

.instructions-card ol {
    padding-left: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
}

.instructions-card li {
    margin-bottom: var(--spacing-xs);
}

.instructions-card p {
    color: var(--text-secondary);
    font-size: 0.95rem;
}

#sensitivity-btn {
    width: 100%;
    padding: var(--spacing-md);
    margin-top: var(--spacing-md);
    font-weight: 600;
}

.options-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

/* Responsive adjustments */
@media (max-width: 1100px) {
    .sensitivity-container {
        flex-direction: column;
    }
    
    .sidebar {
        width: 100%;
    }
}
EOF
)"

# Create sensitivity-analyzer.js
ensure_dir "${PROJECT_DIR}/js/components"
update_file "${PROJECT_DIR}/js/components/sensitivity-analyzer.js" "$(cat << 'EOF'
/**
 * Sensitivity Analyzer for the TCO Calculator
 * Performs sensitivity analysis on various parameters to understand their impact on TCO
 */

class SensitivityAnalyzer {
  constructor() {
    this.results = null;
    this.analyzing = false;
    this.charts = {};
    
    // Reference to calculator
    this.calculator = window.calculator;
    
    // Chart colors from chart builder
    this.chartColors = window.chartBuilder ? window.chartBuilder.chartColors : {
      cisco: '#049fd9',      // Cisco blue
      aruba: '#ff8300',      // Aruba orange
      forescout: '#005daa',  // Forescout blue
      nps: '#00a4ef',        // Microsoft blue
      fortinac: '#ee3124',   // FortiNAC red
      securew2: '#8bc53f',   // SecureW2 green
      portnox: '#2bd25b',    // Portnox green
      neutral: '#888888'     // Neutral gray
    };
  }
  
  // Main analysis function
  analyze() {
    if (this.analyzing) {
      console.log('Analysis already in progress');
      return;
    }
    
    this.analyzing = true;
    this.showLoading();
    
    try {
      // Get input parameters
      const variableToAnalyze = document.getElementById('param-variable').value;
      const vendorToAnalyze = document.getElementById('param-vendor').value;
      const minValue = parseFloat(document.getElementById('param-min').value);
      const maxValue = parseFloat(document.getElementById('param-max').value);
      const steps = parseInt(document.getElementById('param-steps').value);
      
      console.log(`Running sensitivity analysis for ${variableToAnalyze}, vendor: ${vendorToAnalyze}, range: ${minValue}-${maxValue}, steps: ${steps}`);
      
      // Validate inputs
      if (isNaN(minValue) || isNaN(maxValue) || isNaN(steps)) {
        throw new Error('Invalid input parameters');
      }
      
      if (minValue >= maxValue) {
        throw new Error('Maximum value must be greater than minimum value');
      }
      
      if (steps < 2 || steps > 20) {
        throw new Error('Number of steps must be between 2 and 20');
      }
      
      // Generate data points
      const stepSize = (maxValue - minValue) / (steps - 1);
      const dataPoints = Array.from({length: steps}, (_, i) => minValue + (i * stepSize));
      
      // Run analysis for each data point
      const analysisResults = {
        variable: variableToAnalyze,
        vendor: vendorToAnalyze,
        minValue,
        maxValue,
        steps,
        dataPoints,
        results: []
      };
      
      // Keep a copy of the original form values
      const originalValues = this.saveOriginalValues();
      
      // For each data point, calculate TCO by modifying the relevant form value
      dataPoints.forEach(dataPoint => {
        // Set the form value for the variable being analyzed
        this.setVariableValue(variableToAnalyze, dataPoint);
        
        // Calculate TCO for this data point
        const calculationResults = this.runCalculation();
        
        // Store results
        analysisResults.results.push({
          dataPoint,
          calculationResults
        });
      });
      
      // Restore original form values
      this.restoreOriginalValues(originalValues);
      
      // Save results
      this.results = analysisResults;
      
      // Update UI with results
      this.updateUI();
      
      // Hide loading indicator
      this.hideLoading();
      this.analyzing = false;
      
      return analysisResults;
    } catch (error) {
      console.error("Error in sensitivity analysis:", error);
      
      // Hide loading indicator
      this.hideLoading();
      this.analyzing = false;
      
      // Show error message
      this.showError("Error in sensitivity analysis: " + error.message);
      
      return null;
    }
  }
  
  // Save original form values
  saveOriginalValues() {
    return {
      deviceCount: document.getElementById('device-count').value,
      legacyPercentage: document.getElementById('legacy-percentage').value,
      locationCount: document.getElementById('location-count').value,
      yearsToProject: document.getElementById('years-to-project').value,
      // Add any other form values that might be part of sensitivity analysis
    };
  }
  
  // Restore original form values
  restoreOriginalValues(originalValues) {
    document.getElementById('device-count').value = originalValues.deviceCount;
    document.getElementById('legacy-percentage').value = originalValues.legacyPercentage;
    document.getElementById('location-count').value = originalValues.locationCount;
    document.getElementById('years-to-project').value = originalValues.yearsToProject;
    // Restore any other form values
  }
  
  // Set the value of the variable being analyzed
  setVariableValue(variable, value) {
    switch (variable) {
      case 'deviceCount':
        document.getElementById('device-count').value = Math.round(value);
        break;
      case 'legacyPercentage':
        document.getElementById('legacy-percentage').value = Math.round(value);
        if (value > 0) {
          document.getElementById('legacy-devices').checked = true;
        }
        break;
      case 'locationCount':
        document.getElementById('location-count').value = Math.round(value);
        if (value > 1) {
          document.getElementById('multiple-locations').checked = true;
        }
        break;
      case 'yearsToProject':
        document.getElementById('years-to-project').value = Math.round(value);
        break;
      // Add cases for other variables
      default:
        console.warn(`Unknown variable: ${variable}`);
    }
  }
  
  // Run TCO calculation using current form values
  runCalculation() {
    if (!this.calculator) {
      console.error("Calculator not available");
      return null;
    }
    
    try {
      // Get values from form
      const deviceCount = parseInt(document.getElementById('device-count').value) || 1000;
      const orgSize = document.getElementById('organization-size').value;
      const yearsToProject = parseInt(document.getElementById('years-to-project').value) || 3;
      const currentVendor = window.uiController ? window.uiController.activeVendor : 'cisco';
      
      // Calculate TCO for all vendors directly, without updating UI
      const tcoResults = {};
      
      Object.keys(window.vendorData).forEach(vendor => {
        const result = this.calculator.calculateVendorTCO(vendor, currentVendor, orgSize, deviceCount, yearsToProject);
        tcoResults[vendor] = result;
      });
      
      // Add metadata to results
      tcoResults.yearsToProject = yearsToProject;
      tcoResults.deviceCount = deviceCount;
      tcoResults.orgSize = orgSize;
      
      return tcoResults;
    } catch (error) {
      console.error("Error in calculation:", error);
      return null;
    }
  }
  
  // Update UI with analysis results
  updateUI() {
    if (!this.results) {
      console.warn("No analysis results available");
      return;
    }
    
    // Update sensitivity chart
    this.updateSensitivityChart();
    
    // Update savings impact chart
    this.updateSavingsImpactChart();
    
    // Update data table
    this.updateDataTable();
    
    // Show success message
    this.showSuccess("Sensitivity analysis completed successfully");
  }
  
  // Update sensitivity chart
  updateSensitivityChart() {
    const ctx = document.getElementById('sensitivity-chart');
    if (!ctx) {
      console.warn('Sensitivity chart canvas element not found');
      return;
    }
    
    // Prepare chart data
    const labels = this.results.dataPoints.map(dp => this.formatDataPoint(this.results.variable, dp));
    
    const datasets = [];
    const vendors = this.results.vendor === 'all' ? 
      Object.keys(window.vendorData) : 
      [this.results.vendor];
    
    vendors.forEach(vendor => {
      const vendorName = window.vendorData[vendor]?.name || vendor;
      const vendorColor = this.chartColors[vendor] || this.chartColors.neutral;
      
      const data = this.results.results.map(result => {
        return result.calculationResults[vendor]?.totalTCO || 0;
      });
      
      datasets.push({
        label: vendorName,
        data: data,
        backgroundColor: vendorColor,
        borderColor: vendorColor,
        borderWidth: 2,
        fill: false
      });
    });
    
    // Create or update chart
    if (this.charts.sensitivity) {
      this.charts.sensitivity.data.labels = labels;
      this.charts.sensitivity.data.datasets = datasets;
      this.charts.sensitivity.update();
    } else {
      this.charts.sensitivity = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Total Cost of Ownership ($)'
              },
              ticks: {
                callback: function(value) {
                  return '$' + value.toLocaleString();
                }
              }
            },
            x: {
              title: {
                display: true,
                text: this.getVariableLabel(this.results.variable)
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: `TCO Sensitivity to ${this.getVariableLabel(this.results.variable)}`,
              font: {
                size: 16
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
                }
              }
            }
          }
        }
      });
    }
  }
  
  // Update savings impact chart
  updateSavingsImpactChart() {
    const ctx = document.getElementById('savings-impact-chart');
    if (!ctx) {
      console.warn('Savings impact chart canvas element not found');
      return;
    }
    
    // Only relevant when comparing to Portnox
    if (!window.vendorData.portnox) {
      return;
    }
    
    // Prepare chart data
    const labels = this.results.dataPoints.map(dp => this.formatDataPoint(this.results.variable, dp));
    
    const datasets = [];
    const vendors = this.results.vendor === 'all' ? 
      Object.keys(window.vendorData).filter(v => v !== 'portnox') : 
      [this.results.vendor];
    
    vendors.forEach(vendor => {
      // Skip Portnox as we're calculating savings vs. Portnox
      if (vendor === 'portnox') return;
      
      const vendorName = window.vendorData[vendor]?.name || vendor;
      const vendorColor = this.chartColors[vendor] || this.chartColors.neutral;
      
      const data = this.results.results.map(result => {
        const vendorTCO = result.calculationResults[vendor]?.totalTCO || 0;
        const portnoxTCO = result.calculationResults['portnox']?.totalTCO || 0;
        return vendorTCO > 0 && portnoxTCO > 0 ? 
          ((vendorTCO - portnoxTCO) / vendorTCO) * 100 : 0;
      });
      
      datasets.push({
        label: `Savings vs. ${vendorName}`,
        data: data,
        backgroundColor: vendorColor,
        borderColor: vendorColor,
        borderWidth: 2,
        fill: false
      });
    });
    
    // Create or update chart
    if (this.charts.savingsImpact) {
      this.charts.savingsImpact.data.labels = labels;
      this.charts.savingsImpact.data.datasets = datasets;
      this.charts.savingsImpact.update();
    } else {
      this.charts.savingsImpact = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Savings Percentage (%)'
              },
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            },
            x: {
              title: {
                display: true,
                text: this.getVariableLabel(this.results.variable)
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: `Portnox Savings Impact by ${this.getVariableLabel(this.results.variable)}`,
              font: {
                size: 16
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '%';
                }
              }
            }
          }
        }
      });
    }
  }
  
  // Update data table
  updateDataTable() {
    const tableHeader = document.getElementById('sensitivity-table-header');
    const tableBody = document.getElementById('sensitivity-table-body');
    
    if (!tableHeader || !tableBody) {
      console.warn('Data table elements not found');
      return;
    }
    
    // Clear existing table
    tableHeader.innerHTML = `<th scope="col">${this.getVariableLabel(this.results.variable)}</th>`;
    tableBody.innerHTML = '';
    
    // Add vendor columns to header
    const vendors = this.results.vendor === 'all' ? 
      Object.keys(window.vendorData) : 
      [this.results.vendor];
    
    vendors.forEach(vendor => {
      const vendorName = window.vendorData[vendor]?.name || vendor;
      tableHeader.innerHTML += `<th scope="col">${vendorName}</th>`;
      
      // Add Portnox savings column if comparing to other vendors
      if (vendor !== 'portnox' && vendors.includes('portnox')) {
        tableHeader.innerHTML += `<th scope="col">Savings vs. ${vendorName}</th>`;
      }
    });
    
    // Add data rows
    this.results.results.forEach(result => {
      const row = document.createElement('tr');
      
      // Add data point column
      row.innerHTML = `<td>${this.formatDataPoint(this.results.variable, result.dataPoint)}</td>`;
      
      // Add vendor TCO columns
      vendors.forEach(vendor => {
        const tco = result.calculationResults[vendor]?.totalTCO || 0;
        row.innerHTML += `<td>${window.formatCurrency(tco)}</td>`;
        
        // Add Portnox savings column if comparing to other vendors
        if (vendor !== 'portnox' && vendors.includes('portnox')) {
          const vendorTCO = result.calculationResults[vendor]?.totalTCO || 0;
          const portnoxTCO = result.calculationResults['portnox']?.totalTCO || 0;
          
          const savingsAmount = vendorTCO - portnoxTCO;
          const savingsPercentage = vendorTCO > 0 ? (savingsAmount / vendorTCO) * 100 : 0;
          
          row.innerHTML += `<td>${window.formatCurrency(savingsAmount)} (${savingsPercentage.toFixed(1)}%)</td>`;
        }
      });
      
      tableBody.appendChild(row);
    });
  }
  
  // Format data point based on variable type
  formatDataPoint(variable, value) {
    switch (variable) {
      case 'deviceCount':
        return window.formatNumber(value) + ' devices';
      case 'legacyPercentage':
        return value + '%';
      case 'locationCount':
        return window.formatNumber(value) + ' locations';
      case 'yearsToProject':
        return value + ' years';
      case 'hardwareCost':
      case 'licensingCost':
      case 'maintenanceCost':
      case 'fteCost':
        return value.toFixed(1) + 'x';
      default:
        return value.toString();
    }
  }
  
  // Get human-readable label for variable
  getVariableLabel(variable) {
    switch (variable) {
      case 'deviceCount':
        return 'Device Count';
      case 'legacyPercentage':
        return 'Legacy Device Percentage';
      case 'locationCount':
        return 'Number of Locations';
      case 'yearsToProject':
        return 'Years to Project';
      case 'hardwareCost':
        return 'Hardware Cost Multiplier';
      case 'licensingCost':
        return 'Licensing Cost Multiplier';
      case 'maintenanceCost':
        return 'Maintenance Cost Multiplier';
      case 'fteCost':
        return 'FTE Cost Multiplier';
      default:
        return variable;
    }
  }
  
  // Show loading indicator
  showLoading() {
    if (window.loadingManager) {
      window.loadingManager.showGlobal('Running sensitivity analysis...');
    } else {
      const resultsContainer = document.querySelector('.results-container');
      if (!resultsContainer) return;
      
      // Check if loading overlay already exists
      let loadingOverlay = resultsContainer.querySelector('.loading-overlay');
      if (loadingOverlay) return;
      
      // Create loading overlay
      loadingOverlay = document.createElement('div');
      loadingOverlay.className = 'loading-overlay';
      loadingOverlay.innerHTML = `
        <div class="spinner"></div>
        <div class="loading-text">Running sensitivity analysis...</div>
      `;
      
      resultsContainer.appendChild(loadingOverlay);
    }
  }
  
  // Hide loading indicator
  hideLoading() {
    if (window.loadingManager) {
      window.loadingManager.hideGlobal();
    } else {
      const loadingOverlay = document.querySelector('.loading-overlay');
      if (loadingOverlay) {
        loadingOverlay.parentNode.removeChild(loadingOverlay);
      }
    }
  }
  
  // Show error message
  showError(message) {
    if (window.notificationManager) {
      window.notificationManager.error(message);
    } else {
      const messageContainer = document.getElementById('message-container');
      if (!messageContainer) return;
      
      messageContainer.innerHTML = `
        <div class="error-message-box">
          <i class="fas fa-exclamation-circle"></i>
          <span>${message}</span>
          <button class="close-error"><i class="fas fa-times"></i></button>
        </div>
      `;
      
      // Add close button functionality
      const closeBtn = messageContainer.querySelector('.close-error');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          messageContainer.innerHTML = '';
        });
      }
    }
  }
  
  // Show success message
  showSuccess(message) {
    if (window.notificationManager) {
      window.notificationManager.success(message);
    } else {
      const messageContainer = document.getElementById('message-container');
      if (!messageContainer) return;
      
      messageContainer.innerHTML = `
        <div class="success-message-box">
          <i class="fas fa-check-circle"></i>
          <span>${message}</span>
          <button class="close-error"><i class="fas fa-times"></i></button>
        </div>
      `;
      
      // Add close button functionality
      const closeBtn = messageContainer.querySelector('.close-error');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          messageContainer.innerHTML = '';
        });
      }
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        if (messageContainer.querySelector('.success-message-box')) {
          messageContainer.innerHTML = '';
        }
      }, 3000);
    }
  }
}
EOF
)"

# Create sensitivity.js
ensure_dir "${PROJECT_DIR}/js"
update_file "${PROJECT_DIR}/js/sensitivity.js" "$(cat << 'EOF'
/**
 * Main JavaScript file for the Sensitivity Analysis page
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Sensitivity Analysis...');
  
  try {
    // Initialize DOM Cache
    window.domCache = new DOMCache();
    window.domCache.init();
    console.log('DOM Cache initialized');
    
    // Initialize TabManager
    window.tabManager = new TabManager();
    console.log('Tab Manager initialized');
    
    // Initialize NotificationManager
    window.notificationManager = new NotificationManager();
    console.log('Notification Manager initialized');
    
    // Initialize LoadingManager
    window.loadingManager = new LoadingManager();
    console.log('Loading Manager initialized');
    
    // Initialize ValidationManager
    window.validationManager = new ValidationManager();
    console.log('Validation Manager initialized');
    
    // Initialize UI Controller
    window.uiController = new UIController();
    console.log('UI Controller initialized');
    
    // Initialize Calculator
    window.calculator = new Calculator();
    console.log('Calculator initialized');
    
    // Initialize Chart Builder
    window.chartBuilder = new ChartBuilder();
    window.chartBuilder.initCharts();
    console.log('Chart Builder initialized');
    
    // Initialize Sensitivity Analyzer
    window.sensitivityAnalyzer = new SensitivityAnalyzer();
    console.log('Sensitivity Analyzer initialized');
    
    // Add sensitivity button event listener
    const sensitivityBtn = document.getElementById('sensitivity-btn');
    if (sensitivityBtn) {
      sensitivityBtn.addEventListener('click', function() {
        console.log('Sensitivity analysis button clicked');
        window.sensitivityAnalyzer.analyze();
      });
    }
    
    // Add variable change event listener to update min/max values
    const variableSelect = document.getElementById('param-variable');
    if (variableSelect) {
      variableSelect.addEventListener('change', function() {
        updateRangeDefaults(this.value);
      });
      
      // Initial update
      updateRangeDefaults(variableSelect.value);
    }
    
    // Add export button listeners
    initExportButtons();
    
    console.log('Sensitivity Analysis initialized and ready');
  } catch (error) {
    console.error('Error initializing Sensitivity Analysis:', error);
    showError('Error initializing Sensitivity Analysis. Please refresh the page.');
  }
});

// Function to update range defaults based on selected variable
function updateRangeDefaults(variable) {
  const minInput = document.getElementById('param-min');
  const maxInput = document.getElementById('param-max');
  const stepsInput = document.getElementById('param-steps');
  
  if (!minInput || !maxInput || !stepsInput) return;
  
  switch (variable) {
    case 'deviceCount':
      minInput.value = '500';
      maxInput.value = '5000';
      stepsInput.value = '10';
      break;
    case 'legacyPercentage':
      minInput.value = '0';
      maxInput.value = '100';
      stepsInput.value = '11';
      break;
    case 'locationCount':
      minInput.value = '1';
      maxInput.value = '20';
      stepsInput.value = '10';
      break;
    case 'yearsToProject':
      minInput.value = '1';
      maxInput.value = '10';
      stepsInput.value = '10';
      break;
    case 'hardwareCost':
    case 'licensingCost':
    case 'maintenanceCost':
    case 'fteCost':
      minInput.value = '0.5';
      maxInput.value = '2.0';
      stepsInput.value = '7';
      break;
    default:
      minInput.value = '0';
      maxInput.value = '100';
      stepsInput.value = '10';
  }
}

// Function to initialize export buttons
function initExportButtons() {
  const exportCsvBtn = document.getElementById('export-csv-btn');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', function() {
      if (window.sensitivityAnalyzer && window.sensitivityAnalyzer.results) {
        exportToCSV(window.sensitivityAnalyzer.results);
      } else {
        alert('No sensitivity analysis results available to export');
      }
    });
  }
  
  const exportPdfBtn = document.getElementById('export-pdf-btn');
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', function() {
      if (window.sensitivityAnalyzer && window.sensitivityAnalyzer.results) {
        exportToPDF();
      } else {
        alert('No sensitivity analysis results available to export');
      }
    });
  }
}

// Export to CSV function
function exportToCSV(results) {
  if (!results) return;
  
  try {
    const variable = results.variable;
    const vendors = results.vendor === 'all' ? 
      Object.keys(window.vendorData) : 
      [results.vendor];
    
    // Create CSV header row
    let csv = [getVariableLabel(variable) + ',' + vendors.map(v => window.vendorData[v]?.name || v).join(',')];
    
    // Add data rows
    results.results.forEach(result => {
      const dataPoint = formatDataPoint(variable, result.dataPoint);
      const vendorValues = vendors.map(vendor => {
        return result.calculationResults[vendor]?.totalTCO || 0;
      });
      
      csv.push(dataPoint + ',' + vendorValues.join(','));
    });
    
    // Join rows with newlines
    const csvContent = csv.join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', `sensitivity_analysis_${variable}_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if (window.notificationManager) {
      window.notificationManager.success('CSV data exported successfully');
    }
  } catch (error) {
    console.error('Error exporting CSV:', error);
    if (window.notificationManager) {
      window.notificationManager.error('Error exporting CSV: ' + error.message);
    }
  }
}

// Export to PDF function
function exportToPDF() {
  if (!window.jspdf || !window.sensitivityAnalyzer || !window.sensitivityAnalyzer.results) {
    console.warn('PDF export functionality not available or no sensitivity analysis results to export');
    if (window.notificationManager) {
      window.notificationManager.warn('PDF export functionality not available or no sensitivity analysis results to export');
    } else {
      alert('PDF export functionality not available or no sensitivity analysis results to export');
    }
    return;
  }
  
  try {
    const results = window.sensitivityAnalyzer.results;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(27, 103, 178); // Primary color
    doc.text('NAC Solution Sensitivity Analysis Report', 105, 20, { align: 'center' });
    
    // Add date
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80); // Gray
    const date = new Date().toLocaleDateString();
    doc.text(`Generated on ${date}`, 105, 30, { align: 'center' });
    
    // Add analysis parameters
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Variable Analyzed: ${getVariableLabel(results.variable)}`, 20, 45);
    doc.text(`Vendor Analyzed: ${results.vendor === 'all' ? 'All Vendors' : (window.vendorData[results.vendor]?.name || results.vendor)}`, 20, 52);
    doc.text(`Value Range: ${results.minValue} to ${results.maxValue}`, 20, 59);
    doc.text(`Number of Steps: ${results.steps}`, 20, 66);
    
    // Add data table
    doc.setFontSize(14);
    doc.text('Sensitivity Analysis Data', 20, 80);
    
    // Prepare table headers and data
    const vendors = results.vendor === 'all' ? 
      Object.keys(window.vendorData) : 
      [results.vendor];
    
    const headers = [`${getVariableLabel(results.variable)}`].concat(
      vendors.map(vendor => window.vendorData[vendor]?.name || vendor)
    );
    
    const tableData = results.results.map(result => {
      const row = [formatDataPoint(results.variable, result.dataPoint)];
      
      vendors.forEach(vendor => {
        row.push(window.formatCurrency(result.calculationResults[vendor]?.totalTCO || 0));
      });
      
      return row;
    });
    
    // Create table
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 85,
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
    
    // Get current Y position
    let currentY = doc.previousAutoTable.finalY + 15;
    
    // Add Portnox savings table if comparing with Portnox
    if (vendors.includes('portnox') && vendors.length > 1) {
      doc.setFontSize(14);
      doc.text('Portnox Savings Analysis', 20, currentY);
      currentY += 10;
      
      const nonPortnoxVendors = vendors.filter(v => v !== 'portnox');
      
      const savingsHeaders = [`${getVariableLabel(results.variable)}`].concat(
        nonPortnoxVendors.map(vendor => `Savings vs. ${window.vendorData[vendor]?.name || vendor}`)
      );
      
      const savingsData = results.results.map(result => {
        const row = [formatDataPoint(results.variable, result.dataPoint)];
        
        nonPortnoxVendors.forEach(vendor => {
          const vendorTCO = result.calculationResults[vendor]?.totalTCO || 0;
          const portnoxTCO = result.calculationResults['portnox']?.totalTCO || 0;
          
          const savingsAmount = vendorTCO - portnoxTCO;
          const savingsPercentage = vendorTCO > 0 ? (savingsAmount / vendorTCO) * 100 : 0;
          
          row.push(`${window.formatCurrency(savingsAmount)} (${savingsPercentage.toFixed(1)}%)`);
        });
        
        return row;
      });
      
      // Create savings table
      doc.autoTable({
        head: [savingsHeaders],
        body: savingsData,
        startY: currentY,
        theme: 'grid',
        headStyles: {
          fillColor: [43, 210, 91], // Accent color
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        }
      });
      
      currentY = doc.previousAutoTable.finalY + 15;
    }
    
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Portnox Cloud NAC Solution Sensitivity Analysis', 20, 285);
      doc.text(`Page ${i} of ${pageCount}`, 180, 285);
    }
    
    // Save PDF
    doc.save(`NAC_Sensitivity_Analysis_${results.variable}_${date.replace(/\//g, '-')}.pdf`);
    
    // Show success message
    if (window.notificationManager) {
      window.notificationManager.success('PDF report generated successfully');
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    if (window.notificationManager) {
      window.notificationManager.error('Error generating PDF: ' + error.message);
    } else {
      alert('Error generating PDF: ' + error.message);
    }
  }
}

// Helper functions
function getVariableLabel(variable) {
  switch (variable) {
    case 'deviceCount':
      return 'Device Count';
    case 'legacyPercentage':
      return 'Legacy Device Percentage';
    case 'locationCount':
      return 'Number of Locations';
    case 'yearsToProject':
      return 'Years to Project';
    case 'hardwareCost':
      return 'Hardware Cost Multiplier';
    case 'licensingCost':
      return 'Licensing Cost Multiplier';
    case 'maintenanceCost':
      return 'Maintenance Cost Multiplier';
    case 'fteCost':
      return 'FTE Cost Multiplier';
    default:
      return variable;
  }
}

function formatDataPoint(variable, value) {
  switch (variable) {
    case 'deviceCount':
      return value + ' devices';
    case 'legacyPercentage':
      return value + '%';
    case 'locationCount':
      return value + ' locations';
    case 'yearsToProject':
      return value + ' years';
    case 'hardwareCost':
    case 'licensingCost':
    case 'maintenanceCost':
    case 'fteCost':
      return value.toFixed(1) + 'x';
    default:
      return value.toString();
  }
}

// Function to show an error message
function showError(message) {
  const messageContainer = document.getElementById('message-container');
  if (messageContainer) {
    messageContainer.innerHTML = `
      <div class="error-message-box">
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
        <button class="close-error"><i class="fas fa-times"></i></button>
      </div>
    `;
    
    // Add close button functionality
    const closeBtn = messageContainer.querySelector('.close-error');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        messageContainer.innerHTML = '';
      });
    }
  }
}
EOF
)"

echo "Created sensitivity analysis page and related files"

#==============================================================================
# Step 4: Fix PDF export functionality
#==============================================================================
echo "Implementing PDF export functionality..."

# Download jsPDF libraries if needed
ensure_dir "${PROJECT_DIR}/libs/jspdf"
download_file "${PROJECT_DIR}/libs/jspdf/jspdf.umd.min.js" "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
download_file "${PROJECT_DIR}/libs/jspdf/jspdf.plugin.autotable.min.js" "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"

# Add the jsPDF libraries to index.html
if [ -f "${PROJECT_DIR}/index.html" ] && ! grep -q "jspdf.umd.min.js" "${PROJECT_DIR}/index.html"; then
    # Use safer method to add scripts
    apply_html_changes "${PROJECT_DIR}/index.html" '<script src="libs/charts/chart.min.js"></script>' '
    <!-- jsPDF for PDF export -->
    <script src="libs/jspdf/jspdf.umd.min.js"></script>
    <script src="libs/jspdf/jspdf.plugin.autotable.min.js"></script>' "after"
    
    echo "Added jsPDF libraries to index.html"
fi

# Create the exportToPDF function
cat > "${TEMP_DIR}/export-to-pdf.js" << 'EOF'
  exportToPDF() {
    if (!window.jspdf || !window.calculator || !window.calculator.results) {
      console.warn('PDF export functionality not available or no results to export');
      window.notificationManager?.warn('PDF export functionality not available or no results to export');
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
      
      const vendors = Object.keys(window.vendorData);
      const summaryTableData = vendors.map(vendor => {
        const result = results[vendor];
        if (!result) return null;
        
        return [
          window.vendorData[vendor].name,
          window.formatCurrency(result.totalInitialCosts),
          window.formatCurrency(result.annualCosts),
          window.formatCurrency(result.migrationCost),
          window.formatCurrency(result.totalTCO)
        ];
      }).filter(row => row !== null);
      
      // Add table headers
      const summaryHeaders = [
        { header: 'Vendor', dataKey: 'vendor' },
        { header: 'Initial Costs', dataKey: 'initial' },
        { header: 'Annual Costs', dataKey: 'annual' },
        { header: 'Migration Costs', dataKey: 'migration' },
        { header: 'Total TCO', dataKey: 'total' }
      ];
      
      doc.autoTable({
        head: [summaryHeaders.map(h => h.header)],
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
        },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 35, halign: 'right' },
          2: { cellWidth: 35, halign: 'right' },
          3: { cellWidth: 35, halign: 'right' },
          4: { cellWidth: 35, halign: 'right' }
        }
      });
      
      // Get current Y position
      let currentY = doc.previousAutoTable.finalY + 15;
      
      // Add savings comparison
      doc.setFontSize(14);
      doc.text('Portnox Cloud Savings Analysis', 20, currentY);
      currentY += 10;
      
      const currentVendor = window.uiController.activeVendor;
      const currentVendorName = window.vendorData[currentVendor].name;
      const portnoxResult = results['portnox'];
      
      if (portnoxResult && results[currentVendor]) {
        const savings = portnoxResult.totalSavings;
        const savingsPercentage = portnoxResult.savingsPercentage;
        
        doc.setFontSize(12);
        doc.text(`Comparison to ${currentVendorName}:`, 20, currentY);
        currentY += 7;
        
        doc.text(`Total Savings: ${window.formatCurrency(savings)}`, 30, currentY);
        currentY += 7;
        
        doc.text(`Savings Percentage: ${savingsPercentage.toFixed(1)}%`, 30, currentY);
        currentY += 7;
        
        doc.text(`Annual Savings: ${window.formatCurrency(portnoxResult.annualSavings)}`, 30, currentY);
        currentY += 15;
      }
      
      // Add implementation comparison section if data available
      if (results.implementationResults) {
        doc.setFontSize(14);
        doc.text('Implementation Time Comparison', 20, currentY);
        currentY += 10;
        
        const implementationData = vendors.map(vendor => {
          const implTime = results.implementationResults[vendor] || 0;
          return [
            window.vendorData[vendor].name,
            `${implTime.toFixed(1)} days`,
            vendor === 'portnox' ? '—' : `${((results.implementationResults['portnox'] / implTime) * 100).toFixed(1)}%`
          ];
        });
        
        doc.autoTable({
          head: [['Vendor', 'Implementation Time', 'Portnox Time Ratio']],
          body: implementationData,
          startY: currentY,
          theme: 'grid',
          headStyles: {
            fillColor: [43, 210, 91], // Accent color
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          alternateRowStyles: {
            fillColor: [240, 240, 240]
          }
        });
        
        currentY = doc.previousAutoTable.finalY + 15;
      }
      
      // Add cost breakdown for current vendor
      doc.setFontSize(14);
      doc.text(`${currentVendorName} Cost Breakdown`, 20, currentY);
      currentY += 10;
      
      if (results[currentVendor] && results[currentVendor].costBreakdown) {
        const breakdown = results[currentVendor].costBreakdown;
        const breakdownData = Object.entries(breakdown).map(([key, value]) => {
          let category = key.charAt(0).toUpperCase() + key.slice(1);
          return [category, window.formatCurrency(value)];
        });
        
        // Sort by cost (highest first)
        breakdownData.sort((a, b) => {
          const aValue = parseFloat(a[1].replace(/[^0-9.-]+/g, ""));
          const bValue = parseFloat(b[1].replace(/[^0-9.-]+/g, ""));
          return bValue - aValue;
        });
        
        doc.autoTable({
          head: [['Cost Category', 'Amount']],
          body: breakdownData,
          startY: currentY,
          theme: 'grid',
          headStyles: {
            fillColor: [80, 80, 80],
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          alternateRowStyles: {
            fillColor: [240, 240, 240]
          },
          columnStyles: {
            0: { cellWidth: 80 },
            1: { cellWidth: 80, halign: 'right' }
          }
        });
        
        currentY = doc.previousAutoTable.finalY + 15;
      }
      
      // Add footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Portnox Cloud NAC Solution TCO Calculator', 20, 285);
        doc.text(`Page ${i} of ${pageCount}`, 180, 285);
      }
      
      // Save PDF
      doc.save(`NAC_TCO_Comparison_${date.replace(/\//g, '-')}.pdf`);
      
      // Show success message
      window.notificationManager?.success('PDF report generated successfully');
      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      window.notificationManager?.error('Error generating PDF: ' + error.message);
      return false;
    }
  }
EOF

# Add exportToPDF function to ui-controller.js
if [ -f "${PROJECT_DIR}/js/components/ui-controller.js" ]; then
    # Find where to add the exportToPDF function
    if grep -q "exportToCSV()" "${PROJECT_DIR}/js/components/ui-controller.js"; then
        # Extract the export function content
        export_to_pdf=$(cat "${TEMP_DIR}/export-to-pdf.js")
        
        # Get the content of the file
        file_content=$(cat "${PROJECT_DIR}/js/components/ui-controller.js")
        
        # Use a temporary file to make this replacement
        temp_file="${TEMP_DIR}/ui-controller.js.tmp"
        
        # Write the pattern to find to a temporary file
        echo "exportToCSV" > "${TEMP_DIR}/search_pattern.txt"
        
        # Use awk to find the function and add our new function after it
        awk -v pdf_func="$export_to_pdf" '
        /exportToCSV\(\)/ {
            # Output the current line (function definition)
            print $0;
            # Track opening braces
            brace_count = 0;
            in_function = 1;
        }
        
        {
            if (!in_function) {
                print $0;
                next;
            }
            
            # Count braces in the line
            for (i = 1; i <= length($0); i++) {
                c = substr($0, i, 1);
                if (c == "{") brace_count++;
                if (c == "}") brace_count--;
            }
            
            # If not the opening line, print the current line
            if (!/exportToCSV\(\)/) {
                print $0;
            }
            
            # If we have found the end of the function
            if (in_function && brace_count <= 0 && /^\s*\}/) {
                # Function has ended, insert our new function
                print "";
                print pdf_func;
                in_function = 0;
            }
        }' "${PROJECT_DIR}/js/components/ui-controller.js" > "$temp_file"
        
        # Check if the operation was successful
        if [ -f "$temp_file" ] && [ -s "$temp_file" ]; then
            # Replace the original file
            cp "$temp_file" "${PROJECT_DIR}/js/components/ui-controller.js"
            rm -f "$temp_file"
            echo "Added exportToPDF function to ui-controller.js"
        else
            echo "Warning: Failed to modify ui-controller.js file"
        fi
    else
        echo "Warning: exportToCSV function not found in ui-controller.js"
    fi
else
    echo "Warning: ui-controller.js not found"
fi

#==============================================================================
# Step 5: Update calculator.js to support custom cost multipliers
#==============================================================================
echo "Updating calculator.js to support custom cost multipliers..."

# Create the updated calculateVendorTCO function
cat > "${TEMP_DIR}/calculate-vendor-tco.js" << 'EOF'
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

# Update the calculator.js file
if [ -f "${PROJECT_DIR}/js/components/calculator.js" ]; then
    # Define the function name to look for
    function_name="calculateVendorTCO"
    
    # Get the new function content
    new_function=$(cat "${TEMP_DIR}/calculate-vendor-tco.js")
    
    # Use the js function replacement function
    replace_js_function "${PROJECT_DIR}/js/components/calculator.js" "$function_name" "$new_function"
    
    echo "Updated calculator.js with custom cost multiplier support"
else
    echo "Warning: calculator.js not found"
fi

#==============================================================================
# Step 6: Enhanced Vendor Card Styling
#==============================================================================
echo "Updating vendor card styling..."

# Create the vendor card styling
cat > "${TEMP_DIR}/vendor-card-styles.css" << 'EOF'
/* Enhanced vendor card styling */
.vendor-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-md);
}

.vendor-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: var(--bg-white);
  height: 100px;
  overflow: hidden;
}

.vendor-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
  border-color: var(--primary-light);
}

.vendor-card.active {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  background-color: rgba(27, 103, 178, 0.05);
  box-shadow: var(--shadow-md);
}

.vendor-card img {
  max-height: 40px;
  width: auto;
  max-width: 90%;
  margin-bottom: var(--spacing-md);
  object-fit: contain;
  transition: all 0.3s ease;
}

.vendor-card span {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-align: center;
  font-weight: 500;
}

.vendor-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 4px;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.vendor-card:hover::after {
  width: 100%;
}

.vendor-card.active::after {
  width: 100%;
  background-color: var(--accent-color);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .vendor-options {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .vendor-options {
    grid-template-columns: 1fr;
  }
}
EOF

# Add vendor card styles to CSS
if [ -f "${PROJECT_DIR}/css/styles.css" ]; then
    # Check if the styles already exist
    if ! grep -q "Enhanced vendor card styling" "${PROJECT_DIR}/css/styles.css"; then
        # Add the styles to the end of the CSS file
        cat "${TEMP_DIR}/vendor-card-styles.css" >> "${PROJECT_DIR}/css/styles.css"
        echo "Added enhanced vendor card styling to styles.css"
    else
        echo "Vendor card styling already exists in styles.css"
    fi
else
    echo "Warning: styles.css not found"
fi

#==============================================================================
# Step 7: Download vendor logos
#==============================================================================
echo "Downloading vendor logos..."

# Create the directory for logos if it doesn't exist
ensure_dir "${PROJECT_DIR}/img"

# Download vendor logos
download_file "${PROJECT_DIR}/img/cisco-logo.png" "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Cisco_logo.svg/1024px-Cisco_logo.svg.png"
download_file "${PROJECT_DIR}/img/aruba-logo.png" "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Aruba_Networks_logo.svg/2560px-Aruba_Networks_logo.svg.png"
download_file "${PROJECT_DIR}/img/forescout-logo.png" "https://upload.wikimedia.org/wikipedia/commons/f/fa/Forescout_Technologies_Logo.png"
download_file "${PROJECT_DIR}/img/microsoft-logo.png" "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1024px-Microsoft_logo_%282012%29.svg.png"
download_file "${PROJECT_DIR}/img/fortinac-logo.png" "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Fortinet_logo.png/1200px-Fortinet_logo.png"
download_file "${PROJECT_DIR}/img/securew2-logo.png" "https://securew2.com/wp-content/uploads/2021/02/SecureW2_Logo_Dark.png"
download_file "${PROJECT_DIR}/img/portnox-logo.png" "https://www.portnox.com/wp-content/themes/portnox/dist/images/portnox-logo.svg"

# You could add image optimization here, but we'll skip it for simplicity
echo "Vendor logos downloaded successfully"

#==============================================================================
# Step 8: Update main.js with enhanced functionality
#==============================================================================
echo "Updating main.js..."

# Create the updated main.js
update_file "${PROJECT_DIR}/js/main.js" "$(cat << 'EOF'
/**
 * Enhanced main JavaScript file for the TCO Calculator
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing TCO Calculator...');
  
  try {
    // Initialize DOM Cache first to prevent conflicts
    window.domCache = new DOMCache();
    window.domCache.init();
    console.log('DOM Cache initialized');
    
    // Initialize TabManager
    window.tabManager = new TabManager();
    console.log('Tab Manager initialized');
    
    // Initialize NotificationManager
    window.notificationManager = new NotificationManager();
    console.log('Notification Manager initialized');
    
    // Initialize LoadingManager
    window.loadingManager = new LoadingManager();
    console.log('Loading Manager initialized');
    
    // Initialize ValidationManager
    window.validationManager = new ValidationManager();
    console.log('Validation Manager initialized');
    
    // Initialize UI Controller
    window.uiController = new UIController();
    console.log('UI Controller initialized');
    
    // Initialize Chart Builder
    window.chartBuilder = new ChartBuilder();
    window.chartBuilder.initCharts();
    console.log('Chart Builder initialized');
    
    // Initialize Calculator
    window.calculator = new Calculator();
    console.log('Calculator initialized');
    
    // Set default active vendor
    window.uiController.setActiveVendor('cisco');
    console.log('Active vendor set to Cisco');
    
    // Add calculate button event listener
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', function() {
        console.log('Calculate button clicked');
        window.calculator.calculate();
      });
    }
    
    // Set up advanced options toggles
    setupAdvancedOptionsToggles();
    
    // Add export button listeners
    initExportButtons();
    
    // Pre-calculate for initial state after a delay to ensure DOM is ready
    setTimeout(() => {
      try {
        console.log('Running initial calculation...');
        window.calculator.calculate();
        console.log('Initial calculation completed');
      } catch (err) {
        console.error('Error during initial calculation:', err);
        if (window.notificationManager) {
          window.notificationManager.error('Error calculating TCO. Please try again.');
        } else {
          showError('Error calculating TCO. Please try again.');
        }
      }
    }, 1000); // Increased delay for better reliability
    
    console.log('TCO Calculator initialized and ready');
    
    // Add debug info after 1 second
    setTimeout(addDebugInfo, 1000);
  } catch (error) {
    console.error('Error initializing TCO Calculator:', error);
    showError('Error initializing calculator. Please refresh the page.');
  }
});

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

// Function to initialize export buttons
function initExportButtons() {
  const exportCsvBtn = document.getElementById('export-csv-btn');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', function() {
      if (window.uiController && typeof window.uiController.exportToCSV === 'function') {
        window.uiController.exportToCSV();
      } else {
        alert('Export to CSV functionality is not available');
      }
    });
  }
  
  const exportPdfBtn = document.getElementById('export-pdf-btn');
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', function() {
      if (window.uiController && typeof window.uiController.exportToPDF === 'function') {
        window.uiController.exportToPDF();
      } else {
        alert('Export to PDF functionality is not available');
      }
    });
  }
}

// Function to show an error message
function showError(message) {
  const messageContainer = document.getElementById('message-container');
  if (messageContainer) {
    messageContainer.innerHTML = `
      <div class="error-message-box">
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
        <button class="close-error"><i class="fas fa-times"></i></button>
      </div>
    `;
    
    // Add close button functionality
    const closeBtn = messageContainer.querySelector('.close-error');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        messageContainer.innerHTML = '';
      });
    }
  }
}

// Add initialization info to the UI for debugging
function addDebugInfo() {
  try {
    const resultsContainer = document.querySelector('.results-container');
    if (!resultsContainer) return;
    
    const debugInfo = document.createElement('div');
    debugInfo.id = 'debug-info';
    debugInfo.style.display = 'none';
    debugInfo.style.padding = '10px';
    debugInfo.style.margin = '10px';
    debugInfo.style.border = '1px solid #ccc';
    debugInfo.style.borderRadius = '4px';
    debugInfo.style.backgroundColor = '#f9f9f9';
    
    debugInfo.innerHTML = `
      <h3>Debug Information</h3>
      <p>DOM Cache: ${window.domCache ? 'Initialized' : 'Not initialized'}</p>
      <p>UI Controller: ${window.uiController ? 'Initialized' : 'Not initialized'}</p>
      <p>Chart Builder: ${window.chartBuilder ? 'Initialized' : 'Not initialized'}</p>
      <p>Calculator: ${window.calculator ? 'Initialized' : 'Not initialized'}</p>
      <p>Tab Manager: ${window.tabManager ? 'Initialized' : 'Not initialized'}</p>
      <p>Notification Manager: ${window.notificationManager ? 'Initialized' : 'Not initialized'}</p>
      <p>Loading Manager: ${window.loadingManager ? 'Initialized' : 'Not initialized'}</p>
      <p>Active Vendor: ${window.uiController?.activeVendor || 'None'}</p>
      <p>Calculation Results: ${window.calculator?.resultsAvailable ? 'Available' : 'Not available'}</p>
      <p>Browser: ${navigator.userAgent}</p>
      <button id="refresh-debug" class="btn btn-outline">Refresh Debug Info</button>
      <button id="toggle-charts-debug" class="btn btn-outline">Show Chart Info</button>
    `;
    
    resultsContainer.appendChild(debugInfo);
    
    // Add refresh button functionality
    const refreshBtn = document.getElementById('refresh-debug');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', function() {
        updateDebugInfo();
      });
    }
    
    // Add toggle charts button functionality
    const toggleChartsBtn = document.getElementById('toggle-charts-debug');
    if (toggleChartsBtn) {
      toggleChartsBtn.addEventListener('click', function() {
        const chartInfo = document.getElementById('chart-info');
        if (chartInfo) {
          chartInfo.remove();
          this.textContent = 'Show Chart Info';
        } else {
          addChartDebugInfo();
          this.textContent = 'Hide Chart Info';
        }
      });
    }
    
    // Add debug toggle to footer
    const footer = document.querySelector('.footer-links');
    if (footer) {
      const debugLink = document.createElement('a');
      debugLink.href = '#';
      debugLink.textContent = 'Debug Info';
      debugLink.addEventListener('click', function(e) {
        e.preventDefault();
        const debugInfo = document.getElementById('debug-info');
        if (debugInfo) {
          debugInfo.style.display = debugInfo.style.display === 'none' ? 'block' : 'none';
        }
      });
      
      footer.appendChild(debugLink);
    }
  } catch (err) {
    console.error('Error adding debug info:', err);
  }
}

// Function to update debug info
function updateDebugInfo() {
  const debugInfo = document.getElementById('debug-info');
  if (debugInfo) {
    debugInfo.innerHTML = `
      <h3>Debug Information</h3>
      <p>DOM Cache: ${window.domCache ? 'Initialized' : 'Not initialized'}</p>
      <p>UI Controller: ${window.uiController ? 'Initialized' : 'Not initialized'}</p>
      <p>Chart Builder: ${window.chartBuilder ? 'Initialized' : 'Not initialized'}</p>
      <p>Calculator: ${window.calculator ? 'Initialized' : 'Not initialized'}</p>
      <p>Tab Manager: ${window.tabManager ? 'Initialized' : 'Not initialized'}</p>
      <p>Notification Manager: ${window.notificationManager ? 'Initialized' : 'Not initialized'}</p>
      <p>Loading Manager: ${window.loadingManager ? 'Initialized' : 'Not initialized'}</p>
      <p>Active Vendor: ${window.uiController?.activeVendor || 'None'}</p>
      <p>Calculation Results: ${window.calculator?.resultsAvailable ? 'Available' : 'Not available'}</p>
      <p>Browser: ${navigator.userAgent}</p>
      <button id="refresh-debug" class="btn btn-outline">Refresh Debug Info</button>
      <button id="toggle-charts-debug" class="btn btn-outline">Show Chart Info</button>
    `;
    
    // Re-add click event to buttons
    document.getElementById('refresh-debug').addEventListener('click', updateDebugInfo);
    document.getElementById('toggle-charts-debug').addEventListener('click', function() {
      const chartInfo = document.getElementById('chart-info');
      if (chartInfo) {
        chartInfo.remove();
        this.textContent = 'Show Chart Info';
      } else {
        addChartDebugInfo();
        this.textContent = 'Hide Chart Info';
      }
    });
  }
}

// Function to add chart debug info
function addChartDebugInfo() {
  const debugInfo = document.getElementById('debug-info');
  if (!debugInfo) return;
  
  const chartInfo = document.createElement('div');
  chartInfo.id = 'chart-info';
  chartInfo.style.marginTop = '20px';
  chartInfo.style.padding = '10px';
  chartInfo.style.border = '1px solid #ddd';
  chartInfo.style.borderRadius = '4px';
  
  let chartInfoContent = '<h4>Chart Information</h4>';
  
  if (window.chartBuilder) {
    const charts = window.chartBuilder.charts;
    const chartIds = Object.keys(charts);
    
    chartInfoContent += `<p>Number of Charts: ${chartIds.length}</p>`;
    chartInfoContent += '<ul>';
    
    chartIds.forEach(id => {
      const chart = charts[id];
      chartInfoContent += `<li>${id}: ${chart ? 'Available' : 'Not Available'}</li>`;
    });
    
    chartInfoContent += '</ul>';
  } else {
    chartInfoContent += '<p>Chart Builder not available</p>';
  }
  
  chartInfo.innerHTML = chartInfoContent;
  debugInfo.appendChild(chartInfo);
}
EOF
)"

echo "Updated main.js with enhanced functionality"

#==============================================================================
# Final steps
#==============================================================================
echo "Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

echo "=========================================================="
echo "  NAC Solution TCO Calculator Update Complete"
echo "=========================================================="
echo "Summary of changes:"
echo "1. Fixed missing chart canvases in HTML"
echo "2. Added configurable cost options and extended advanced settings"
echo "3. Implemented sensitivity analysis page"
echo "4. Downloaded updated vendor logos"
echo "5. Implemented PDF export functionality"
echo "6. Enhanced vendor card styling"
echo "7. Updated calculator to support custom cost multipliers"
echo "8. Fixed and improved main.js for better initialization"
echo ""
echo "The NAC Solution TCO Calculator has been successfully updated!"
echo "A backup of the original files is available at: $BACKUP_DIR"
echo "Log file: $LOG_FILE"
echo ""
echo "To test the updated application, open index.html in your browser."

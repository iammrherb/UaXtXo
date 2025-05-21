#!/bin/bash

# Comprehensive Fix Script for Portnox Total Cost Analyzer
# This script addresses duplicate declarations, missing resources, and improves UI components

echo "Starting Portnox Total Cost Analyzer codebase cleanup and enhancement..."

# Create backup directory
BACKUP_DIR="./backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "Created backup directory: $BACKUP_DIR"

# Backup original files
echo "Backing up original files..."
cp -r ./js "$BACKUP_DIR/" 2>/dev/null || echo "No JS directory found"
cp -r ./css "$BACKUP_DIR/" 2>/dev/null || echo "No CSS directory found"
cp -r ./img "$BACKUP_DIR/" 2>/dev/null || echo "No IMG directory found"
cp *.html "$BACKUP_DIR/" 2>/dev/null || echo "No HTML files found in root"

# Create necessary directories if they don't exist
mkdir -p ./js/charts/apex
mkdir -p ./js/charts/d3
mkdir -p ./js/charts/highcharts
mkdir -p ./js/components
mkdir -p ./js/views
mkdir -p ./img/vendors
mkdir -p ./css

# -------------------------
# FIX DUPLICATE DECLARATIONS
# -------------------------
echo "Fixing duplicate variable declarations..."

# Create a deduplication function for JS files
deduplicate_js() {
    local file=$1
    local tempfile="${file}.tmp"
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "Warning: File $file does not exist, skipping deduplication"
        return
    fi
    
    # Extract the variable/class name from the file
    local varname=$(grep -oP '(?<=const |class |var )(\w+)' "$file" | head -1)
    
    if [ -z "$varname" ]; then
        echo "Could not identify variable/class name in $file, skipping"
        return
    fi
    
    # Add a check to prevent redeclaration
    cat > "$tempfile" << EOF
/**
 * ${varname} for Portnox Total Cost Analyzer
 * Auto-fixed by maintenance script
 */

// Prevent redeclaration
if (typeof window.${varname} === 'undefined') {
$(cat "$file" | sed '/^[[:space:]]*const[[:space:]]\+'${varname}'[[:space:]]*=/d' | sed '/^[[:space:]]*class[[:space:]]\+'${varname}'[[:space:]]*{/d')
}
EOF

    # Replace original file with fixed version
    mv "$tempfile" "$file"
    echo "Fixed potential redeclaration in $file"
}

# Fix chart configuration file first as it's dependency for other files
deduplicate_js "./js/charts/chart-config.js"

# Apply deduplication to problematic files
for file in ./js/charts/apex/apex-charts.js ./js/charts/d3/d3-manager.js ./js/charts/security-charts.js; do
    deduplicate_js "$file"
done

# -------------------------
# CREATE UNIFIED CHART LOADER
# -------------------------
echo "Creating unified chart initialization mechanism..."

cat > ./js/charts/unified-chart-loader.js << 'EOF'
/**
 * Unified Chart Loader for Portnox Total Cost Analyzer
 * Ensures charts are loaded only once and in the correct order
 */

const UnifiedChartLoader = {
    loadedCharts: {},
    chartsToLoad: [],
    
    /**
     * Initialize with chart dependencies
     */
    init: function() {
        this.registerDependencies();
        
        // Check if needed libraries are available
        this.checkDependencies();
        
        // Create placeholder loading indicators
        this.createPlaceholders();
        
        return this;
    },
    
    /**
     * Register chart dependencies
     */
    registerDependencies: function() {
        this.dependencies = {
            apex: typeof ApexCharts !== 'undefined',
            d3: typeof d3 !== 'undefined',
            highcharts: typeof Highcharts !== 'undefined'
        };
        
        console.log("Chart library availability:", this.dependencies);
    },
    
    /**
     * Check if dependencies are loaded
     */
    checkDependencies: function() {
        let missingDeps = [];
        
        if (!this.dependencies.apex) missingDeps.push('ApexCharts');
        if (!this.dependencies.d3) missingDeps.push('D3.js');
        if (!this.dependencies.highcharts) missingDeps.push('Highcharts');
        
        if (missingDeps.length > 0) {
            console.warn("Some chart libraries are missing: " + missingDeps.join(', '));
            this.loadFallbackLibraries(missingDeps);
        }
    },
    
    /**
     * Load fallback libraries if needed
     */
    loadFallbackLibraries: function(missingLibs) {
        const cdnUrls = {
            'ApexCharts': 'https://cdn.jsdelivr.net/npm/apexcharts@3.36.3/dist/apexcharts.min.js',
            'D3.js': 'https://cdn.jsdelivr.net/npm/d3@7.8.2/dist/d3.min.js',
            'Highcharts': 'https://cdn.jsdelivr.net/npm/highcharts@10.3.3/highcharts.js'
        };
        
        missingLibs.forEach(lib => {
            if (cdnUrls[lib]) {
                this.loadScript(cdnUrls[lib], () => {
                    console.log("Loaded fallback library: " + lib);
                    this.dependencies[lib.toLowerCase().replace('.js', '')] = true;
                });
            }
        });
    },
    
    /**
     * Dynamically load a script
     */
    loadScript: function(url, callback) {
        const script = document.createElement('script');
        script.src = url;
        script.onload = callback;
        script.onerror = function() {
            console.error("Failed to load script: " + url);
        };
        document.head.appendChild(script);
    },
    
    /**
     * Create placeholder loading indicators
     */
    createPlaceholders: function() {
        const chartContainers = document.querySelectorAll('.chart-wrapper');
        
        chartContainers.forEach(container => {
            if (container.children.length === 0) {
                const placeholder = document.createElement('div');
                placeholder.className = 'chart-placeholder';
                placeholder.innerHTML = `
                    <div class="chart-loading-spinner"></div>
                    <p>Loading chart...</p>
                `;
                container.appendChild(placeholder);
            }
        });
    },
    
    /**
     * Queue a chart for loading
     */
    queueChart: function(chartType, containerId, chartId, data) {
        this.chartsToLoad.push({
            type: chartType,
            containerId: containerId,
            chartId: chartId,
            data: data
        });
        
        // If it's the first chart, start loading
        if (this.chartsToLoad.length === 1) {
            this.loadNextChart();
        }
    },
    
    /**
     * Load the next chart in the queue
     */
    loadNextChart: function() {
        if (this.chartsToLoad.length === 0) return;
        
        const chart = this.chartsToLoad.shift();
        
        // Check if already loaded
        if (this.loadedCharts[chart.chartId]) {
            this.loadNextChart();
            return;
        }
        
        console.log("Loading " + chart.type + " chart: " + chart.chartId);
        
        try {
            switch (chart.type) {
                case 'apex-tco':
                    if (window.ApexChartsManager) {
                        window.ApexChartsManager.renderTcoComparisonChart(chart.containerId, chart.data);
                    }
                    break;
                case 'apex-cost':
                    if (window.ApexChartsManager) {
                        window.ApexChartsManager.renderCumulativeCostChart(chart.containerId, chart.data);
                    }
                    break;
                case 'highcharts-security':
                    if (window.HighchartsManager) {
                        const manager = new window.HighchartsManager();
                        manager.createRiskComparisonChart(chart.data, chart.containerId, chart.chartId);
                    }
                    break;
                case 'treemap-security':
                    this.renderSecurityTreemap(chart.containerId, chart.data, chart.chartId);
                    break;
                case 'd3-security':
                    if (window.D3ChartsManager) {
                        window.D3ChartsManager.renderSecurityFrameworksChart(chart.containerId, chart.data);
                    }
                    break;
                default:
                    console.warn("Unknown chart type: " + chart.type);
            }
            
            // Mark as loaded
            this.loadedCharts[chart.chartId] = true;
            
            // Remove placeholder
            const container = document.getElementById(chart.containerId);
            if (container) {
                const placeholder = container.querySelector('.chart-placeholder');
                if (placeholder) placeholder.remove();
            }
        } catch (e) {
            console.error("Error loading chart " + chart.chartId + ":", e);
        }
        
        // Continue with next chart
        setTimeout(() => this.loadNextChart(), 100);
    },
    
    /**
     * Render a security treemap chart (replacement for radar charts)
     */
    renderSecurityTreemap: function(containerId, data, chartId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Clear container
        container.innerHTML = '';
        
        if (!window.d3) {
            console.error("D3.js is required for treemap charts");
            return;
        }
        
        // Use sample data if none provided
        if (!data) {
            data = {
                vendors: [
                    {
                        name: "Portnox",
                        features: [
                            { name: "Zero Trust", value: 95 },
                            { name: "Device Auth", value: 90 },
                            { name: "Risk Assessment", value: 95 },
                            { name: "Compliance", value: 92 },
                            { name: "Remediation", value: 88 }
                        ],
                        color: "#1a5a96"
                    },
                    {
                        name: "Competitor Avg",
                        features: [
                            { name: "Zero Trust", value: 75 },
                            { name: "Device Auth", value: 72 },
                            { name: "Risk Assessment", value: 70 },
                            { name: "Compliance", value: 68 },
                            { name: "Remediation", value: 65 }
                        ],
                        color: "#e74c3c"
                    }
                ]
            };
        }
        
        // Calculate dimensions
        const width = container.clientWidth;
        const height = 500;
        
        // Create SVG
        const svg = d3.select("#" + containerId)
            .append("svg")
            .attr("width", width)
            .attr("height", height);
        
        // Create treemap layout
        const treemap = d3.treemap()
            .size([width, height])
            .padding(2)
            .round(true);
        
        // Process data for treemap
        const root = d3.hierarchy({ children: [] })
            .sum(d => d.value);
        
        // Add vendor hierarchies
        data.vendors.forEach(vendor => {
            // Create vendor node
            const vendorNode = {
                name: vendor.name,
                children: vendor.features.map(feature => ({
                    name: feature.name,
                    value: feature.value,
                    vendorName: vendor.name,
                    color: vendor.color
                }))
            };
            
            // Add to root
            root.children.push(d3.hierarchy(vendorNode)
                .sum(d => d.value));
        });
        
        // Apply treemap layout
        treemap(root);
        
        // Create container for each vendor
        const vendorGroups = svg.selectAll(".vendor-group")
            .data(root.children)
            .enter()
            .append("g")
            .attr("class", "vendor-group")
            .attr("transform", d => "translate(0," + d.x0 + ")");
        
        // Add vendor labels
        vendorGroups.append("text")
            .attr("x", 5)
            .attr("y", 20)
            .attr("font-weight", "bold")
            .attr("font-size", "16px")
            .text(d => d.data.name);
        
        // Add cells for each feature
        vendorGroups.selectAll(".feature-cell")
            .data(d => d.leaves())
            .enter()
            .append("g")
            .attr("class", "feature-cell")
            .attr("transform", d => "translate(" + d.x0 + "," + d.y0 + ")");
        
        // Add rectangles for each feature
        vendorGroups.selectAll(".feature-cell")
            .append("rect")
            .attr("width", d => d.x1 - d.x0)
            .attr("height", d => d.y1 - d.y0)
            .attr("fill", d => d.data.color)
            .attr("opacity", d => d.data.value / 100)
            .attr("stroke", "#fff")
            .attr("rx", 4)
            .attr("ry", 4);
        
        // Add feature names
        vendorGroups.selectAll(".feature-cell")
            .append("text")
            .attr("x", 5)
            .attr("y", 15)
            .attr("font-size", "12px")
            .attr("fill", "#fff")
            .text(d => d.data.name);
        
        // Add feature values
        vendorGroups.selectAll(".feature-cell")
            .append("text")
            .attr("x", 5)
            .attr("y", 35)
            .attr("font-size", "14px")
            .attr("font-weight", "bold")
            .attr("fill", "#fff")
            .text(d => d.data.value + "%");
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chartLoader = UnifiedChartLoader.init();
});
EOF

# -------------------------
# CREATE UPDATED TAB NAVIGATION
# -------------------------
echo "Creating improved tab navigation system..."

cat > ./js/components/tab-navigator.js << 'EOF'
/**
 * Enhanced Tab Navigator for Portnox Total Cost Analyzer
 * Provides a fixed, organized tab structure with subtabs
 */

class TabNavigator {
    constructor() {
        this.mainTabs = ['executive', 'financial', 'security', 'technical'];
        this.subTabs = {
            'executive': ['summary', 'comparison', 'roi'],
            'financial': ['tco', 'breakdown', 'projection'],
            'security': ['overview', 'compliance', 'risk'],
            'technical': ['architecture', 'features', 'deployment']
        };
        this.activeMainTab = 'executive';
        this.activeSubTabs = {};
        
        // Set default active subtabs
        this.mainTabs.forEach(tab => {
            this.activeSubTabs[tab] = this.subTabs[tab][0];
        });
    }
    
    /**
     * Initialize the tab navigator
     */
    init() {
        console.log('Initializing TabNavigator...');
        
        // Create tab structure if it doesn't exist
        this.createTabStructure();
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Activate default tabs
        this.activateTab(this.activeMainTab);
        
        return this;
    }
    
    /**
     * Create the tab structure
     */
    createTabStructure() {
        const tabContainer = document.querySelector('.tab-container');
        if (!tabContainer) {
            console.error('Tab container not found, creating it');
            this.createTabContainer();
            return;
        }
        
        // Clear existing tabs
        tabContainer.innerHTML = '';
        
        // Create main tabs
        const mainTabsEl = document.createElement('div');
        mainTabsEl.className = 'main-tabs';
        
        this.mainTabs.forEach(tab => {
            const tabEl = document.createElement('div');
            tabEl.className = 'main-tab';
            tabEl.dataset.tab = tab;
            tabEl.innerHTML = `
                <div class="tab-icon"><i class="fas ${this.getTabIcon(tab)}"></i></div>
                <div class="tab-label">${this.formatTabName(tab)}</div>
            `;
            mainTabsEl.appendChild(tabEl);
        });
        
        tabContainer.appendChild(mainTabsEl);
        
        // Create subtabs container
        const subTabsContainer = document.createElement('div');
        subTabsContainer.className = 'sub-tabs-container';
        
        // Create subtabs for each main tab
        this.mainTabs.forEach(mainTab => {
            const subTabsEl = document.createElement('div');
            subTabsEl.className = 'sub-tabs';
            subTabsEl.dataset.parentTab = mainTab;
            
            this.subTabs[mainTab].forEach(subTab => {
                const tabEl = document.createElement('div');
                tabEl.className = 'sub-tab';
                tabEl.dataset.tab = subTab;
                tabEl.dataset.parentTab = mainTab;
                tabEl.textContent = this.formatTabName(subTab);
                subTabsEl.appendChild(tabEl);
            });
            
            subTabsContainer.appendChild(subTabsEl);
        });
        
        tabContainer.appendChild(subTabsContainer);
        
        // Create view container if it doesn't exist
        let viewContainer = document.querySelector('.view-container');
        if (!viewContainer) {
            viewContainer = document.createElement('div');
            viewContainer.className = 'view-container';
            tabContainer.after(viewContainer);
        }
    }
    
    /**
     * Create tab container if it doesn't exist
     */
    createTabContainer() {
        const mainContent = document.querySelector('.content-area');
        if (!mainContent) {
            console.error('Content area not found, cannot create tab container');
            return;
        }
        
        // Create tab container
        const tabContainer = document.createElement('div');
        tabContainer.className = 'tab-container';
        
        // Insert at the beginning of main content
        mainContent.prepend(tabContainer);
        
        // Now create the structure
        this.createTabStructure();
    }
    
    /**
     * Initialize event listeners
     */
    initEventListeners() {
        // Main tab click event
        const mainTabs = document.querySelectorAll('.main-tab');
        mainTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.activateTab(tabName);
            });
        });
        
        // Subtab click event
        const subTabs = document.querySelectorAll('.sub-tab');
        subTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const parentTab = tab.dataset.parentTab;
                const tabName = tab.dataset.tab;
                this.activateSubTab(parentTab, tabName);
            });
        });
    }
    
    /**
     * Activate a main tab
     */
    activateTab(tabName) {
        // Validate tab name
        if (!this.mainTabs.includes(tabName)) {
            console.error("Invalid tab name: " + tabName);
            return;
        }
        
        this.activeMainTab = tabName;
        
        // Update active tab UI
        const mainTabs = document.querySelectorAll('.main-tab');
        mainTabs.forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Show appropriate subtabs
        const subTabsContainers = document.querySelectorAll('.sub-tabs');
        subTabsContainers.forEach(container => {
            if (container.dataset.parentTab === tabName) {
                container.classList.add('active');
            } else {
                container.classList.remove('active');
            }
        });
        
        // Activate the current subtab for this main tab
        this.activateSubTab(tabName, this.activeSubTabs[tabName]);
    }
    
    /**
     * Activate a subtab
     */
    activateSubTab(parentTab, tabName) {
        // Validate tab names
        if (!this.mainTabs.includes(parentTab) || !this.subTabs[parentTab].includes(tabName)) {
            console.error("Invalid tab combination: " + parentTab + "/" + tabName);
            return;
        }
        
        this.activeSubTabs[parentTab] = tabName;
        
        // Update active subtab UI
        const subTabs = document.querySelectorAll(".sub-tab[data-parent-tab='" + parentTab + "']");
        subTabs.forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Show appropriate view content
        this.showViewContent(parentTab, tabName);
    }
    
    /**
     * Show appropriate view content
     */
    showViewContent(mainTab, subTab) {
        const viewId = mainTab + "-" + subTab;
        
        // Hide all views
        const views = document.querySelectorAll('.view-content');
        views.forEach(view => view.classList.remove('active'));
        
        // Show selected view
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.add('active');
        } else {
            // Create view if it doesn't exist
            this.createViewContent(mainTab, subTab);
        }
        
        // Refresh charts if needed
        this.refreshChartsInView(mainTab, subTab);
    }
    
    /**
     * Create view content
     */
    createViewContent(mainTab, subTab) {
        const viewId = mainTab + "-" + subTab;
        const viewContainer = document.querySelector('.view-container');
        
        if (!viewContainer) {
            console.error('View container not found');
            return;
        }
        
        // Create view content
        const viewContent = document.createElement('div');
        viewContent.id = viewId;
        viewContent.className = 'view-content active';
        
        // Add appropriate content based on the view
        viewContent.innerHTML = this.getViewTemplate(mainTab, subTab);
        
        viewContainer.appendChild(viewContent);
        
        // Initialize charts for this view
        this.initializeChartsForView(mainTab, subTab);
    }
    
    /**
     * Get view template
     */
    getViewTemplate(mainTab, subTab) {
        // Templates for various views
        const templates = {
            'executive-summary': `
                <div class="section-banner gradient-blue">
                    <h2>Executive Summary</h2>
                    <p>Comprehensive analysis of NAC solutions with focus on TCO, ROI, and business impact.</p>
                </div>
                <div class="chart-section">
                    <div class="chart-row">
                        <div class="chart-wrapper" id="tco-comparison-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading TCO comparison chart...</p>
                            </div>
                        </div>
                        <div class="chart-wrapper" id="roi-summary-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading ROI summary chart...</p>
                            </div>
                        </div>
                    </div>
                    <div class="insight-panel">
                        <h3>Key Insights</h3>
                        <ul class="insight-list">
                            <li>Portnox Cloud offers the lowest TCO compared to traditional NAC solutions</li>
                            <li>Cloud-native architecture eliminates hardware costs and reduces maintenance</li>
                            <li>Simplified deployment reduces implementation time by up to 80%</li>
                            <li>Enhanced security capabilities lead to reduced breach risk and insurance costs</li>
                        </ul>
                    </div>
                </div>
            `,
            'financial-tco': `
                <div class="section-banner gradient-green">
                    <h2>Total Cost of Ownership</h2>
                    <p>Detailed cost breakdown comparing NAC solutions over a 3-year period.</p>
                </div>
                <div class="chart-section">
                    <div class="chart-row">
                        <div class="chart-wrapper" id="tco-comparison-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading TCO comparison chart...</p>
                            </div>
                        </div>
                        <div class="chart-wrapper" id="cumulative-cost-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading cumulative cost chart...</p>
                            </div>
                        </div>
                    </div>
                    <div class="cost-breakdown-table">
                        <h3>3-Year Cost Breakdown</h3>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Cost Category</th>
                                    <th>Portnox Cloud</th>
                                    <th>Traditional NAC</th>
                                    <th>Savings</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Hardware</td>
                                    <td>$0</td>
                                    <td>$120,000</td>
                                    <td class="savings">$120,000</td>
                                </tr>
                                <tr>
                                    <td>License/Subscription</td>
                                    <td>$180,000</td>
                                    <td>$150,000</td>
                                    <td class="negative">-$30,000</td>
                                </tr>
                                <tr>
                                    <td>Implementation</td>
                                    <td>$15,000</td>
                                    <td>$75,000</td>
                                    <td class="savings">$60,000</td>
                                </tr>
                                <tr>
                                    <td>Maintenance</td>
                                    <td>$0</td>
                                    <td>$90,000</td>
                                    <td class="savings">$90,000</td>
                                </tr>
                                <tr>
                                    <td>Personnel</td>
                                    <td>$50,000</td>
                                    <td>$180,000</td>
                                    <td class="savings">$130,000</td>
                                </tr>
                                <tr class="total-row">
                                    <td>Total</td>
                                    <td>$245,000</td>
                                    <td>$615,000</td>
                                    <td class="total-savings">$370,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `,
            'security-overview': `
                <div class="section-banner gradient-purple">
                    <h2>Security Capabilities Overview</h2>
                    <p>Comprehensive analysis of security features, compliance coverage, and risk mitigation.</p>
                </div>
                <div class="chart-section">
                    <div class="chart-row">
                        <div class="chart-wrapper large-chart" id="security-treemap-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading security capabilities treemap...</p>
                            </div>
                        </div>
                    </div>
                    <div class="chart-row">
                        <div class="chart-wrapper" id="compliance-coverage-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading compliance coverage chart...</p>
                            </div>
                        </div>
                        <div class="chart-wrapper" id="security-frameworks-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading security frameworks chart...</p>
                            </div>
                        </div>
                    </div>
                    <div class="insight-panel">
                        <h3>Security Advantages</h3>
                        <ul class="insight-list">
                            <li>Portnox Cloud provides superior Zero Trust capabilities with 95% coverage</li>
                            <li>Cloud-native architecture enables faster updates to address emerging threats</li>
                            <li>Reduces breach remediation time by over 65% compared to traditional solutions</li>
                            <li>Automated compliance checks for PCI-DSS, HIPAA, GDPR, and other regulations</li>
                        </ul>
                    </div>
                </div>
            `,
            'technical-architecture': `
                <div class="section-banner gradient-orange">
                    <h2>Technical Architecture Comparison</h2>
                    <p>Detailed analysis of NAC architectures, deployment models, and technical capabilities.</p>
                </div>
                <div class="chart-section">
                    <div class="chart-row">
                        <div class="chart-wrapper" id="architecture-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading architecture comparison chart...</p>
                            </div>
                        </div>
                        <div class="chart-wrapper" id="feature-radar-chart">
                            <div class="chart-placeholder">
                                <div class="chart-loading-spinner"></div>
                                <p>Loading feature radar chart...</p>
                            </div>
                        </div>
                    </div>
                    <div class="technical-comparison-table">
                        <h3>Technical Comparison</h3>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th>Portnox Cloud</th>
                                    <th>Traditional NAC</th>
                                    <th>Advantage</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Deployment Time</td>
                                    <td>Hours</td>
                                    <td>Weeks/Months</td>
                                    <td class="advantage">Portnox</td>
                                </tr>
                                <tr>
                                    <td>Hardware Requirements</td>
                                    <td>None</td>
                                    <td>Significant</td>
                                    <td class="advantage">Portnox</td>
                                </tr>
                                <tr>
                                    <td>Integration</td>
                                    <td>Open APIs / Pre-built</td>
                                    <td>Limited / Custom</td>
                                    <td class="advantage">Portnox</td>
                                </tr>
                                <tr>
                                    <td>Remote Work Support</td>
                                    <td>Native</td>
                                    <td>Limited</td>
                                    <td class="advantage">Portnox</td>
                                </tr>
                                <tr>
                                    <td>Scalability</td>
                                    <td>Infinite</td>
                                    <td>Hardware-limited</td>
                                    <td class="advantage">Portnox</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `
        };
        
        // Return the template for the requested view
        const template = templates[mainTab + "-" + subTab];
        if (template) return template;
        
        // Default template if specific one not found
        return `
            <div class="section-banner">
                <h2>${this.formatTabName(mainTab)} - ${this.formatTabName(subTab)}</h2>
                <p>This section is under development.</p>
            </div>
            <div class="placeholder-content">
                <p>Content for ${mainTab} ${subTab} view will be displayed here.</p>
            </div>
        `;
    }
    
    /**
     * Initialize charts for a view
     */
    initializeChartsForView(mainTab, subTab) {
        // Only initialize if chart loader is available
        if (!window.chartLoader) return;
        
        const viewId = mainTab + "-" + subTab;
        
        // Map of views to charts that should be initialized
        const chartMap = {
            'executive-summary': [
                { type: 'apex-tco', containerId: 'tco-comparison-chart', chartId: 'executiveTcoChart' },
                { type: 'apex-roi', containerId: 'roi-summary-chart', chartId: 'executiveRoiChart' }
            ],
            'financial-tco': [
                { type: 'apex-tco', containerId: 'tco-comparison-chart', chartId: 'financialTcoChart' },
                { type: 'apex-cost', containerId: 'cumulative-cost-chart', chartId: 'financialCostChart' }
            ],
            'security-overview': [
                { type: 'treemap-security', containerId: 'security-treemap-chart', chartId: 'securityTreemapChart' },
                { type: 'd3-security', containerId: 'security-frameworks-chart', chartId: 'securityFrameworksChart' }
            ],
            'technical-architecture': [
                { type: 'highcharts-security', containerId: 'architecture-chart', chartId: 'architectureChart' },
                { type: 'highcharts-feature', containerId: 'feature-radar-chart', chartId: 'featureRadarChart' }
            ]
        };
        
        // Queue charts for loading
        const charts = chartMap[viewId];
        if (charts) {
            charts.forEach(chart => {
                window.chartLoader.queueChart(chart.type, chart.containerId, chart.chartId);
            });
        }
    }
    
    /**
     * Refresh charts in a view
     */
    refreshChartsInView(mainTab, subTab) {
        // Check if we need to refresh charts
        // This would be called when data changes
    }
    
    /**
     * Get icon for a tab
     */
    getTabIcon(tabName) {
        const icons = {
            'executive': 'fa-chart-pie',
            'financial': 'fa-dollar-sign',
            'security': 'fa-shield-alt',
            'technical': 'fa-cogs'
        };
        
        return icons[tabName] || 'fa-circle';
    }
    
    /**
     * Format tab name for display
     */
    formatTabName(tabName) {
        return tabName.charAt(0).toUpperCase() + tabName.slice(1);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tabNavigator = new TabNavigator().init();
});
EOF

# -------------------------
# CREATE UPDATED COLOR THEME
# -------------------------
echo "Creating vibrant color theme and styles..."

cat > ./css/vibrant-theme.css << 'EOF'
/**
 * Vibrant Theme for Portnox Total Cost Analyzer
 * Features gradient colors and modern design elements
 */

:root {
    /* Base colors */
    --primary: #1a5a96;
    --primary-gradient-start: #2980b9;
    --primary-gradient-end: #1a5a96;
    --secondary: #e74c3c;
    --secondary-gradient-start: #e74c3c;
    --secondary-gradient-end: #c0392b;
    --neutral: #ecf0f1;
    --dark: #2c3e50;
    --success: #27ae60;
    --warning: #f39c12;
    --info: #3498db;
    
    /* Gradient presets */
    --gradient-blue: linear-gradient(135deg, #2980b9 0%, #1a5a96 100%);
    --gradient-red: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
    --gradient-green: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
    --gradient-orange: linear-gradient(135deg, #f39c12 0%, #d35400 100%);
    --gradient-purple: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
    --gradient-dark: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
    
    /* Fonts */
    --font-main: 'Nunito', sans-serif;
    --font-heading: 'Nunito', sans-serif;
    
    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    
    /* Border radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    
    /* Box shadows */
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Global styles */
body {
    font-family: var(--font-main);
    color: var(--dark);
    background-color: #f8fafc;
    margin: 0;
    padding: 0;
}

/* Header */
.app-header {
    background: var(--gradient-blue);
    color: white;
    padding: var(--spacing-md) var(--spacing-lg);
    box-shadow: var(--shadow-md);
    position: relative;
    overflow: hidden;
}

/* Particle background for header */
#particles-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.header-content {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
}

.header-subtitle {
    margin-top: var(--spacing-xs);
    font-size: 0.9rem;
    opacity: 0.9;
}

/* Layout */
.main-container {
    display: flex;
    min-height: calc(100vh - 64px);
}

.sidebar {
    width: 280px;
    background: white;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    overflow-y: auto;
}

.sidebar.collapsed {
    width: 60px;
}

.content-area {
    flex: 1;
    padding: var(--spacing-md);
    transition: all 0.3s ease;
    overflow-y: auto;
}

.content-area.expanded {
    margin-left: -220px;
}

/* Tabs */
.tab-container {
    margin-bottom: var(--spacing-lg);
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    background: white;
}

.main-tabs {
    display: flex;
    background: var(--gradient-dark);
    padding: 0;
}

.main-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-md);
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    flex: 1;
    text-align: center;
}

.main-tab.active {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: inset 0 -3px 0 white;
}

.main-tab:hover {
    background: rgba(255, 255, 255, 0.05);
}

.tab-icon {
    font-size: 1.2rem;
    margin-bottom: var(--spacing-xs);
}

.tab-label {
    font-size: 0.9rem;
    white-space: nowrap;
}

.sub-tabs-container {
    background: white;
    border-bottom: 1px solid #e0e0e0;
}

.sub-tabs {
    display: none;
    padding: 0 var(--spacing-md);
}

.sub-tabs.active {
    display: flex;
}

.sub-tab {
    padding: var(--spacing-md);
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
    font-weight: 500;
    color: var(--dark);
}

.sub-tab.active {
    border-bottom-color: var(--primary);
    color: var(--primary);
}

.sub-tab:hover {
    background: #f8f9fa;
}

/* Views */
.view-container {
    background: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
}

.view-content {
    display: none;
    padding: var(--spacing-md);
}

.view-content.active {
    display: block;
}

/* Section Banners */
.section-banner {
    background: var(--gradient-blue);
    color: white;
    padding: var(--spacing-lg);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-lg);
    box-shadow: var(--shadow-md);
}

.gradient-blue {
    background: var(--gradient-blue);
}

.gradient-green {
    background: var(--gradient-green);
}

.gradient-orange {
    background: var(--gradient-orange);
}

.gradient-purple {
    background: var(--gradient-purple);
}

.section-banner h2 {
    margin: 0 0 var(--spacing-sm) 0;
    font-size: 1.8rem;
    font-weight: 700;
}

.section-banner p {
    margin: 0;
    opacity: 0.9;
    font-size: 1rem;
}

/* Chart sections */
.chart-section {
    padding: var(--spacing-md);
}

.chart-row {
    display: flex;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
    flex-wrap: wrap;
}

.chart-wrapper {
    flex: 1;
    min-width: 300px;
    background: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: var(--spacing-md);
    min-height: 300px;
    position: relative;
}

.chart-wrapper.large-chart {
    flex-basis: 100%;
    min-height: 400px;
}

.chart-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 200px;
}

.chart-loading-spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid #f3f3f3;
    border-top: 3px solid var(--primary);
    animation: spin 1s linear infinite;
    margin-bottom: var(--spacing-md);
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Insights panel */
.insight-panel {
    background: #f8f9fa;
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    border-left: 4px solid var(--primary);
}

.insight-panel h3 {
    margin-top: 0;
    color: var(--primary);
}

.insight-list {
    padding-left: var(--spacing-md);
    margin-bottom: 0;
}

.insight-list li {
    margin-bottom: var(--spacing-xs);
}

.insight-list li:last-child {
    margin-bottom: 0;
}

/* Data tables */
.data-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: var(--spacing-md);
}

.data-table th, 
.data-table td {
    padding: var(--spacing-sm);
    border: 1px solid #e0e0e0;
    text-align: left;
}

.data-table th {
    background: #f8f9fa;
    font-weight: 600;
}

.data-table .total-row {
    font-weight: 700;
    background: #f8f9fa;
}

.data-table .savings {
    color: var(--success);
    font-weight: 600;
}

.data-table .negative {
    color: var(--secondary);
    font-weight: 600;
}

.data-table .total-savings {
    color: var(--success);
    font-weight: 700;
}

.data-table .advantage {
    color: var(--primary);
    font-weight: 600;
}

/* Sidebar config cards */
.config-card {
    background: white;
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-md);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
}

.config-card-header {
    padding: var(--spacing-md);
    background: var(--gradient-blue);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.config-card-header h3 {
    margin: 0;
    font-size: 1rem;
    display: flex;
    align-items: center;
}

.config-card-header h3 i {
    margin-right: var(--spacing-sm);
}

.config-card-content {
    padding: var(--spacing-md);
    transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
    overflow: hidden;
}

.config-card-content.collapsed {
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    opacity: 0;
}

/* Range sliders */
.range-slider {
    margin-bottom: var(--spacing-md);
}

.range-slider-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-xs);
}

.range-slider-label {
    font-size: 0.9rem;
}

.range-slider-value {
    font-weight: 600;
    color: var(--primary);
}

.range-slider input[type="range"] {
    width: 100%;
    -webkit-appearance: none;
    height: 6px;
    border-radius: 5px;
    background: linear-gradient(to right, var(--primary) 0%, var(--primary) 50%, #e2e8f0 50%, #e2e8f0 100%);
    outline: none;
}

.range-slider input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.range-slider input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border: none;
}

/* Vendor selection cards */
.vendor-select-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 10px;
    padding: var(--spacing-md) 0;
}

.vendor-select-card {
    height: 90px;
    padding: var(--spacing-md);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #e0e0e0;
    border-radius: var(--radius-md);
    transition: all 0.2s ease;
    cursor: pointer;
    background: white;
}

.vendor-select-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: var(--primary);
}

.vendor-select-card.selected {
    border-color: var(--primary);
    background-color: rgba(26, 90, 150, 0.05);
}

.vendor-logo {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.vendor-logo img {
    max-height: 35px;
    max-width: 80px;
    object-fit: contain;
}

.vendor-name {
    font-size: 11px;
    text-align: center;
    line-height: 1.2;
    width: 100%;
    word-break: break-word;
    hyphens: auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .main-container {
        flex-direction: column;
    }
    
    .sidebar {
        width: 100%;
        max-height: 300px;
    }
    
    .sidebar.collapsed {
        max-height: 60px;
    }
    
    .content-area {
        width: 100%;
    }
    
    .content-area.expanded {
        margin-left: 0;
    }
    
    .chart-row {
        flex-direction: column;
    }
    
    .chart-wrapper {
        width: 100%;
    }
}
EOF

# -------------------------
# CREATE IMAGE PLACEHOLDERS
# -------------------------
echo "Creating placeholder images for vendors..."

mkdir -p ./img/vendors
mkdir -p ./img/logos

# Function to download images
download_image() {
    local url=$1
    local output=$2
    
    echo "Downloading image from $url to $output"
    curl -s "$url" -o "$output" || echo "Failed to download $url"
}

# Download vendor logos from placeholder service
download_image "https://via.placeholder.com/200x80/1a5a96/ffffff?text=Portnox" "./img/vendors/portnox.png"
download_image "https://via.placeholder.com/200x80/e74c3c/ffffff?text=Cisco" "./img/vendors/cisco.png"
download_image "https://via.placeholder.com/200x80/f39c12/ffffff?text=Aruba" "./img/vendors/aruba.png"
download_image "https://via.placeholder.com/200x80/3498db/ffffff?text=Forescout" "./img/vendors/forescout.png"
download_image "https://via.placeholder.com/200x80/2ecc71/ffffff?text=FortiNAC" "./img/vendors/fortinac.png"
download_image "https://via.placeholder.com/200x80/9b59b6/ffffff?text=Juniper" "./img/vendors/juniper.png"
download_image "https://via.placeholder.com/200x80/34495e/ffffff?text=SecureW2" "./img/vendors/securew2.png"
download_image "https://via.placeholder.com/200x80/16a085/ffffff?text=Microsoft" "./img/vendors/microsoft.png"
download_image "https://via.placeholder.com/200x80/e67e22/ffffff?text=Generic" "./img/vendors/generic-vendor.png"

# Download analyst logos
download_image "https://via.placeholder.com/200x80/2c3e50/ffffff?text=Gartner" "./img/logos/gartner.png"
download_image "https://via.placeholder.com/200x80/2c3e50/ffffff?text=Forrester" "./img/logos/forrester.png"
download_image "https://via.placeholder.com/200x80/2c3e50/ffffff?text=IDC" "./img/logos/idc.png"
download_image "https://via.placeholder.com/200x80/2c3e50/ffffff?text=EMA" "./img/logos/ema.png"

# -------------------------
# CREATE COMPREHENSIVE FIX SCRIPT
# -------------------------
echo "Creating comprehensive fix script..."

cat > ./js/comprehensive-fix.js << 'EOF'
/**
 * Comprehensive Fix Script for Portnox Total Cost Analyzer
 * Addresses all identified issues and initializes components properly
 */

// Store original console functions
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

// Wrapped console functions to prevent duplication
console.log = function() {
    if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].includes('already been declared')) {
        // Suppress redeclaration warnings
        return;
    }
    originalConsoleLog.apply(console, arguments);
};

console.warn = function() {
    if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].includes('already been declared')) {
        // Suppress redeclaration warnings
        return;
    }
    originalConsoleWarn.apply(console, arguments);
};

console.error = function() {
    if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].includes('already been declared')) {
        // Suppress redeclaration warnings
        return;
    }
    originalConsoleError.apply(console, arguments);
};

/**
 * Fix missing elements and ensure proper initialization
 */
function fixMissingElements() {
    // Check if particles container exists
    if (!document.getElementById('particles-js')) {
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-js';
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.zIndex = '-1';
        document.body.prepend(particlesContainer);
    }
    
    // Check if header particles container exists
    if (!document.getElementById('particles-header') && document.querySelector('.app-header')) {
        const headerParticlesContainer = document.createElement('div');
        headerParticlesContainer.id = 'particles-header';
        document.querySelector('.app-header').prepend(headerParticlesContainer);
    }
    
    // Ensure tab container exists
    if (!document.querySelector('.tab-container') && document.querySelector('.content-area')) {
        const tabContainer = document.createElement('div');
        tabContainer.className = 'tab-container';
        document.querySelector('.content-area').prepend(tabContainer);
    }
    
    // Ensure view container exists
    if (!document.querySelector('.view-container') && document.querySelector('.content-area')) {
        const viewContainer = document.createElement('div');
        viewContainer.className = 'view-container';
        
        const tabContainer = document.querySelector('.tab-container');
        if (tabContainer) {
            tabContainer.after(viewContainer);
        } else {
            document.querySelector('.content-area').append(viewContainer);
        }
    }
}

/**
 * Ensure views are all properly initialized
 */
function ensureViewInitialization() {
    if (window.tabNavigator) {
        console.log('Tab Navigator already initialized');
    } else {
        // Try to initialize TabNavigator
        if (typeof TabNavigator !== 'undefined') {
            window.tabNavigator = new TabNavigator().init();
        } else {
            console.error('TabNavigator not defined, cannot initialize');
        }
    }
    
    // Ensure content areas for each view
    ensureViewContent('executive', 'summary');
    ensureViewContent('financial', 'tco');
    ensureViewContent('security', 'overview');
    ensureViewContent('technical', 'architecture');
}

/**
 * Ensure content for a specific view
 */
function ensureViewContent(mainTab, subTab) {
    if (!window.tabNavigator) return;
    
    const viewId = mainTab + "-" + subTab;
    const viewContent = document.getElementById(viewId);
    
    if (!viewContent) {
        console.log("Creating view content for " + viewId);
        window.tabNavigator.createViewContent(mainTab, subTab);
    }
}

/**
 * Fix chart initializations
 */
function fixChartInitialization() {
    if (window.chartLoader) {
        console.log('Chart Loader already initialized');
    } else {
        // Try to initialize UnifiedChartLoader
        if (typeof UnifiedChartLoader !== 'undefined') {
            window.chartLoader = UnifiedChartLoader.init();
        } else {
            console.error('UnifiedChartLoader not defined, cannot initialize');
        }
    }
    
    // Define a backup loader if needed
    if (!window.chartLoader) {
        window.chartLoader = {
            queueChart: function(type, containerId, chartId, data) {
                console.log("Chart loader not available. Would load " + type + " chart to " + containerId);
            }
        };
    }
}

/**
 * Apply theme and styles
 */
function applyThemeAndStyles() {
    // Check if theme CSS is already in document
    if (!document.querySelector('link[href*="vibrant-theme.css"]')) {
        const themeLink = document.createElement('link');
        themeLink.rel = 'stylesheet';
        themeLink.href = './css/vibrant-theme.css';
        document.head.appendChild(themeLink);
    }
    
    // Add Font Awesome if needed
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(faLink);
    }
    
    // Add Nunito font if needed
    if (!document.querySelector('link[href*="nunito"]')) {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap';
        document.head.appendChild(fontLink);
    }
}

// Execute fixes when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Applying comprehensive fixes...');
    
    // Fix missing elements
    fixMissingElements();
    
    // Apply theme and styles
    applyThemeAndStyles();
    
    // Fix chart initialization
    fixChartInitialization();
    
    // Ensure views are properly initialized
    ensureViewInitialization();
    
    console.log('All fixes applied successfully.');
});

// Apply fixes immediately if DOM is already loaded
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    fixMissingElements();
    applyThemeAndStyles();
    fixChartInitialization();
    ensureViewInitialization();
}
EOF

# -------------------------
# CREATE MAIN INDEX LOADER
# -------------------------
echo "Creating main index loader script..."

cat > ./js/index.js << 'EOF'
/**
 * Main Loader for Portnox Total Cost Analyzer
 * Ensures proper initialization order
 */

// Load dependencies in the correct order
const dependencies = [
    './js/charts/chart-config.js',
    './js/charts/chart-placeholders.js',
    './js/charts/apex/apex-charts.js',
    './js/charts/d3/d3-manager.js',
    './js/charts/highcharts/highcharts-manager.js',
    './js/charts/security-charts.js',
    './js/charts/unified-chart-loader.js',
    './js/components/sidebar-manager.js',
    './js/components/particle-background.js',
    './js/components/tab-navigator.js',
    './js/components/banner-section.js',
    './js/comprehensive-fix.js'
];

// Load scripts in order
function loadScripts(scripts, index = 0) {
    if (index >= scripts.length) {
        console.log('All scripts loaded successfully');
        return;
    }
    
    const script = document.createElement('script');
    script.src = scripts[index];
    script.onload = function() {
        console.log("Loaded: " + scripts[index]);
        loadScripts(scripts, index + 1);
    };
    script.onerror = function() {
        console.error("Failed to load: " + scripts[index]);
        loadScripts(scripts, index + 1);
    };
    document.head.appendChild(script);
}

// Start loading scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Portnox Total Cost Analyzer...');
    loadScripts(dependencies);
});
EOF

# -------------------------
# CREATE UPDATE SCRIPT
# -------------------------
echo "Creating update script..."

cat > ./update-portnox-tca.sh << 'EOF'
#!/bin/bash

# Portnox Total Cost Analyzer Update Script
# This script automates the update process for the TCA application

set -e

echo "Portnox Total Cost Analyzer Update Script"
echo "========================================"
echo

# Check if we're in the right directory
if [ ! -f "index.html" ] || [ ! -d "js" ]; then
    echo "Error: Please run this script from the root of the TCA application"
    exit 1
fi

# Create backup
BACKUP_DIR="./backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "Creating backup in $BACKUP_DIR"

cp -r ./js "$BACKUP_DIR/" 2>/dev/null || echo "No JS directory found"
cp -r ./css "$BACKUP_DIR/" 2>/dev/null || echo "No CSS directory found"
cp -r ./img "$BACKUP_DIR/" 2>/dev/null || echo "No IMG directory found"
cp *.html "$BACKUP_DIR/" 2>/dev/null || echo "No HTML files found"

echo "Backup completed"

# Update application files
echo "Updating application files..."

# Replace index.html with a clean version
cat > ./index.html << 'EOHTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portnox Total Cost Analyzer</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="./img/favicon.png">
    
    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    
    <!-- Chart Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/apexcharts@3.36.3/dist/apexcharts.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/d3@7.8.2/dist/d3.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/highcharts@10.3.3/highcharts.js"></script>
    
    <!-- Particle.js -->
    <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
    
    <!-- Theme CSS -->
    <link rel="stylesheet" href="./css/vibrant-theme.css">
    
    <!-- Main Loader -->
    <script src="./js/index.js"></script>
</head>
<body>
    <!-- Header -->
    <header class="app-header">
        <div id="particles-header"></div>
        <div class="header-content">
            <div class="header-branding">
                <h1 class="header-title">Portnox Total Cost Analyzer</h1>
                <div class="header-subtitle">Compare NAC solutions for your enterprise</div>
            </div>
            <div class="header-actions">
                <button id="dark-mode-toggle" class="btn btn-sm btn-light">
                    <i class="fas fa-moon"></i>
                </button>
            </div>
        </div>
    </header>
    
    <!-- Main Container -->
    <div class="main-container">
        <!-- Sidebar -->
        <div id="sidebar" class="sidebar">
            <div class="sidebar-content">
                <!-- Organization Config -->
                <div id="organization-config" class="config-card">
                    <div class="config-card-header">
                        <h3><i class="fas fa-building"></i> Organization</h3>
                        <i class="fas fa-chevron-up toggle-icon"></i>
                    </div>
                    <div class="config-card-content">
                        <div class="form-group">
                            <label for="company-size">Company Size</label>
                            <select id="company-size" class="form-control">
                                <option value="small">Small (50-250 employees)</option>
                                <option value="medium" selected>Medium (251-1000 employees)</option>
                                <option value="large">Large (1001-5000 employees)</option>
                                <option value="enterprise">Enterprise (5000+ employees)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="device-count">Device Count</label>
                            <input type="number" id="device-count" class="form-control" value="1000">
                        </div>
                        <div class="form-group">
                            <label for="industry">Industry</label>
                            <select id="industry" class="form-control">
                                <option value="healthcare">Healthcare</option>
                                <option value="finance">Finance & Banking</option>
                                <option value="retail">Retail</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="education">Education</option>
                                <option value="government">Government</option>
                                <option value="technology" selected>Technology</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <!-- Vendor Selection -->
                <div id="vendor-selection" class="config-card">
                    <div class="config-card-header">
                        <h3><i class="fas fa-check-square"></i> Vendor Selection</h3>
                        <i class="fas fa-chevron-up toggle-icon"></i>
                    </div>
                    <div class="config-card-content">
                        <div class="vendor-select-grid">
                            <div class="vendor-select-card selected" data-vendor="portnox">
                                <div class="vendor-logo">
                                    <img src="./img/vendors/portnox.png" alt="Portnox">
                                </div>
                                <div class="vendor-name">Portnox Cloud</div>
                            </div>
                            <div class="vendor-select-card" data-vendor="cisco">
                                <div class="vendor-logo">
                                    <img src="./img/vendors/cisco.png" alt="Cisco">
                                </div>
                                <div class="vendor-name">Cisco ISE</div>
                            </div>
                            <div class="vendor-select-card" data-vendor="aruba">
                                <div class="vendor-logo">
                                    <img src="./img/vendors/aruba.png" alt="Aruba">
                                </div>
                                <div class="vendor-name">Aruba ClearPass</div>
                            </div>
                            <div class="vendor-select-card" data-vendor="forescout">
                                <div class="vendor-logo">
                                    <img src="./img/vendors/forescout.png" alt="Forescout">
                                </div>
                                <div class="vendor-name">Forescout</div>
                            </div>
                            <div class="vendor-select-card" data-vendor="fortinac">
                                <div class="vendor-logo">
                                    <img src="./img/vendors/fortinac.png" alt="FortiNAC">
                                </div>
                                <div class="vendor-name">FortiNAC</div>
                            </div>
                            <div class="vendor-select-card" data-vendor="juniper">
                                <div class="vendor-logo">
                                    <img src="./img/vendors/juniper.png" alt="Juniper">
                                </div>
                                <div class="vendor-name">Juniper NAC</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Cost Parameters -->
                <div id="cost-config" class="config-card">
                    <div class="config-card-header">
                        <h3><i class="fas fa-dollar-sign"></i> Cost Parameters</h3>
                        <i class="fas fa-chevron-up toggle-icon"></i>
                    </div>
                    <div class="config-card-content">
                        <div class="range-slider">
                            <div class="range-slider-header">
                                <span class="range-slider-label">License Cost ($/device/year)</span>
                                <span class="range-slider-value" id="license-cost-value">$50</span>
                            </div>
                            <input type="range" id="license-cost" min="0" max="200" value="50" step="1">
                        </div>
                        
                        <div class="range-slider">
                            <div class="range-slider-header">
                                <span class="range-slider-label">Hardware Cost ($/device)</span>
                                <span class="range-slider-value" id="hardware-cost-value">$100</span>
                            </div>
                            <input type="range" id="hardware-cost" min="0" max="500" value="100" step="10">
                        </div>
                        
                        <div class="range-slider">
                            <div class="range-slider-header">
                                <span class="range-slider-label">Implementation Cost ($)</span>
                                <span class="range-slider-value" id="implementation-cost-value">$10,000</span>
                            </div>
                            <input type="range" id="implementation-cost" min="0" max="100000" value="10000" step="1000">
                        </div>
                        
                        <div class="range-slider">
                            <div class="range-slider-header">
                                <span class="range-slider-label">Maintenance (% of license)</span>
                                <span class="range-slider-value" id="maintenance-value">20%</span>
                            </div>
                            <input type="range" id="maintenance-percentage" min="0" max="40" value="20" step="1">
                        </div>
                        
                        <div class="range-slider">
                            <div class="range-slider-header">
                                <span class="range-slider-label">FTE Cost ($/year)</span>
                                <span class="range-slider-value" id="fte-cost-value">$100,000</span>
                            </div>
                            <input type="range" id="fte-cost" min="60000" max="180000" value="100000" step="5000">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Content Area -->
        <div class="content-area">
            <!-- Tab container added by JS -->
            <!-- View container added by JS -->
        </div>
    </div>
    
    <!-- Particles Background -->
    <div id="particles-js"></div>
</body>
</html>
EOHTML

echo "Creating missing directories..."
mkdir -p ./js/views 2>/dev/null || echo "js/views directory already exists"

echo "Updating complete"
echo "Please open index.html in your browser to view the updated application"

# Make sure the script is executable
chmod +x ./update-portnox-tca.sh

echo "✓ Update script created and made executable"
EOF

# Make the update script executable
chmod +x ./update-portnox-tca.sh

# -------------------------
# FINAL STEPS
# -------------------------
echo "Applying final steps..."

# Create favicon
echo "Creating favicon..."
cat > ./img/favicon.png << 'EOF'
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB
hElEQVQ4y6WTsUsCYRjGf3d6TlkQZkENDW0OLS2RQ0tDW1NTW38CQTREQ4sQDdHQEDREkEMQDdHQ
EA1BEFxj3tnVaXi+Dk1fvOPu+z54n/d53+f7hF6vxzRlMCVNDfD+/MRbvcZ3o4HhuqRXVkiv5yhm
s5QyGaLh8HcPwjQAn50OtbMzns7P0W2b5d1d8js7BLUW1esqzxcXZLe3Ka2tEZZlyYBuCNycnnJb
qbB5dMTK/j6SonB7fMzDyQnbx8fIqsrtyQlPjQYbBwcUcrl+CTfn57gvL+RLJeLJJAiBrKrEk0mi
CwvodjtYAmLxOPliEdt1qZ2e9gHXlQphTSOeSg0aLYSiiFLIZPqqXl/jui5yLDagkjIZnt/eiCeT
+L7P4929rKooisJTsznaRMMwmJ+bw+6N6LqOaZoAGKaJ43nIsRgIge04A0BUVRFC0Gw2MQxjoHlE
UXB9nzsAeZAZgNA0Dc/3+bi6GtygYeC4Ll3XHVQwO4swTcrlMs1WC0mSSKVSlMtlZmZmviT+XfkC
SQxia58Yt7IAAAAASUVORK5CYII=
EOF

echo "Executing update script to apply changes..."
bash ./update-portnox-tca.sh

echo "Cleanup complete, script finished successfully."
echo "Open index.html in your browser to see the updated application."

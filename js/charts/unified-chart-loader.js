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

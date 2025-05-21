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
        if (!this.chartsToLoad) {
            this.chartsToLoad = [];
        }
        
        this.chartsToLoad.push({
            type: chartType,
            containerId: containerId,
            chartId: chartId,
            data: data || null
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
        if (!this.chartsToLoad || this.chartsToLoad.length === 0) return;
        
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
        
        // Process the data for D3
        let processedData = [];
        
        // Create leaf nodes from the features
        data.vendors.forEach(vendor => {
            vendor.features.forEach(feature => {
                processedData.push({
                    vendor: vendor.name,
                    feature: feature.name,
                    value: feature.value,
                    color: vendor.color
                });
            });
        });
        
        // Calculate dimensions
        const width = container.clientWidth || 800;
        const height = 400;
        
        // Create SVG
        const svg = d3.select("#" + containerId)
            .append("svg")
            .attr("width", width)
            .attr("height", height);
        
        // Group by vendor for the treemap
        const nested = d3.group(processedData, d => d.vendor);
        
        // Create hierarchical data
        const root = {
            name: "root",
            children: Array.from(nested, ([key, value]) => {
                return {
                    name: key,
                    children: value.map(d => ({
                        name: d.feature,
                        value: d.value,
                        color: d.color
                    }))
                };
            })
        };
        
        // Create hierarchy
        const hierarchy = d3.hierarchy(root)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);
        
        // Create treemap layout
        const treemap = d3.treemap()
            .size([width, height])
            .paddingOuter(10)
            .paddingTop(20)
            .paddingInner(2)
            .round(true);
        
        // Apply layout
        const nodes = treemap(hierarchy);
        
        // Create vendor groups
        const vendorGroups = svg.selectAll('.vendor-group')
            .data(nodes.children)
            .enter()
            .append('g')
            .attr('class', 'vendor-group')
            .attr('transform', d => `translate(${d.x0},${d.y0})`);
        
        // Add vendor labels
        vendorGroups.append('text')
            .attr('x', 5)
            .attr('y', 15)
            .attr('font-size', '16px')
            .attr('font-weight', 'bold')
            .text(d => d.data.name);
        
        // Create nodes for each feature
        const featureNodes = vendorGroups.selectAll('.feature-node')
            .data(d => d.children)
            .enter()
            .append('g')
            .attr('class', 'feature-node')
            .attr('transform', d => `translate(${d.x0 - d.parent.x0},${d.y0 - d.parent.y0 + 25})`);
        
        // Add rectangles
        featureNodes.append('rect')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0 - 25)
            .attr('fill', d => d.data.color)
            .attr('opacity', d => d.data.value / 100)
            .attr('rx', 4)
            .attr('ry', 4);
        
        // Add feature names
        featureNodes.append('text')
            .attr('x', d => (d.x1 - d.x0) / 2)
            .attr('y', d => (d.y1 - d.y0 - 25) / 2 - 10)
            .attr('text-anchor', 'middle')
            .attr('font-size', '14px')
            .attr('font-weight', 'bold')
            .attr('fill', '#ffffff')
            .text(d => d.data.name);
        
        // Add values
        featureNodes.append('text')
            .attr('x', d => (d.x1 - d.x0) / 2)
            .attr('y', d => (d.y1 - d.y0 - 25) / 2 + 10)
            .attr('text-anchor', 'middle')
            .attr('font-size', '16px')
            .attr('font-weight', 'bold')
            .attr('fill', '#ffffff')
            .text(d => d.data.value + '%');
    }
};

// Initialize when DOM is loaded
if (typeof window !== 'undefined') {
    window.UnifiedChartLoader = UnifiedChartLoader;
    
    document.addEventListener('DOMContentLoaded', () => {
        window.chartLoader = UnifiedChartLoader.init();
    });
}

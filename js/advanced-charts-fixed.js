// Advanced Charts Module
const AdvancedCharts = {
    chartInstances: {},
    
    init() {
        console.log('📊 Initializing advanced charts...');
        this.setupChartDefaults();
        console.log('✅ Advanced charts initialized');
    },
    
    setupChartDefaults() {
        if (typeof Chart === 'undefined') return;
        
        // Set global defaults
        Chart.defaults.font.family = "'Segoe UI', 'Roboto', sans-serif";
        Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        Chart.defaults.plugins.tooltip.padding = 12;
        Chart.defaults.plugins.tooltip.cornerRadius = 4;
    },
    
    createWaterfallChart(canvasId, data) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        // Destroy existing chart
        if (this.chartInstances[canvasId]) {
            this.chartInstances[canvasId].destroy();
        }
        
        const ctx = canvas.getContext('2d');
        const datasets = [{
            label: 'Cost Components',
            data: data.values,
            backgroundColor: data.values.map(v => v >= 0 ? '#4CAF50' : '#F44336'),
            borderWidth: 1
        }];
        
        this.chartInstances[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Cost Breakdown Waterfall'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => '$' + value.toLocaleString()
                        }
                    }
                }
            }
        });
    },
    
    createHeatmap(canvasId, data) {
        const container = document.getElementById(canvasId);
        if (!container) return;
        
        // Create HTML heatmap as canvas heatmaps require additional libraries
        let html = '<div class="heatmap-grid">';
        
        data.rows.forEach((row, i) => {
            html += '<div class="heatmap-row">';
            html += `<div class="heatmap-label">${row.label}</div>`;
            
            row.values.forEach((value, j) => {
                const intensity = value / 100;
                const color = `rgba(0, 180, 216, ${intensity})`;
                html += `<div class="heatmap-cell" style="background-color: ${color}">
                    ${value}%
                </div>`;
            });
            
            html += '</div>';
        });
        
        html += '</div>';
        container.innerHTML = html;
    },
    
    createSankeyDiagram(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Simplified Sankey visualization
        container.innerHTML = `
            <div class="sankey-diagram">
                <div class="sankey-sources">
                    ${data.sources.map(s => `
                        <div class="sankey-node source">
                            ${s.name}: $${s.value.toLocaleString()}
                        </div>
                    `).join('')}
                </div>
                <div class="sankey-flows">
                    <!-- Flow visualization would go here -->
                </div>
                <div class="sankey-targets">
                    ${data.targets.map(t => `
                        <div class="sankey-node target">
                            ${t.name}: $${t.value.toLocaleString()}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    destroy(canvasId) {
        if (this.chartInstances[canvasId]) {
            this.chartInstances[canvasId].destroy();
            delete this.chartInstances[canvasId];
        }
    },
    
    destroyAll() {
        Object.keys(this.chartInstances).forEach(id => this.destroy(id));
    }
};

// Register with ModuleLoader
if (window.ModuleLoader) {
    window.ModuleLoader.register('AdvancedCharts', AdvancedCharts);
}

window.AdvancedCharts = AdvancedCharts;
console.log('✅ Advanced Charts module loaded');

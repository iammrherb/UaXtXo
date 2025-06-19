// Chart Renderer Module
(function() {
    'use strict';
    
    class ChartRenderer {
        constructor() {
            this.charts = new Map();
            this.chartInstances = new Map();
            this.colors = {
                portnox: '#1B67B2',
                fortinet: '#E21D38',
                aruba: '#F8991D',
                cisco: '#1BA0D7',
                success: '#10B981',
                warning: '#F59E0B',
                error: '#EF4444',
                info: '#3B82F6'
            };
        }
        
        initialize() {
            console.log('[ChartRenderer] Initializing chart renderer...');
            this.loadChartLibrary();
            return Promise.resolve();
        }
        
        loadChartLibrary() {
            // In a real implementation, load Chart.js or another library
            // For now, we'll use canvas-based custom charts
            this.chartTypes = {
                bar: this.renderBarChart.bind(this),
                line: this.renderLineChart.bind(this),
                pie: this.renderPieChart.bind(this),
                gauge: this.renderGaugeChart.bind(this),
                comparison: this.renderComparisonChart.bind(this)
            };
        }
        
        createChart(containerId, type, data, options = {}) {
            const container = document.getElementById(containerId);
            if (!container) {
                console.error(`[ChartRenderer] Container ${containerId} not found`);
                return null;
            }
            
            // Clear existing chart
            if (this.chartInstances.has(containerId)) {
                this.destroyChart(containerId);
            }
            
            // Create canvas
            const canvas = document.createElement('canvas');
            canvas.width = options.width || container.offsetWidth;
            canvas.height = options.height || 300;
            container.innerHTML = '';
            container.appendChild(canvas);
            
            const ctx = canvas.getContext('2d');
            const chart = {
                ctx,
                canvas,
                data,
                options,
                type
            };
            
            // Render chart
            if (this.chartTypes[type]) {
                this.chartTypes[type](chart);
            }
            
            this.chartInstances.set(containerId, chart);
            return chart;
        }
        
        renderBarChart(chart) {
            const { ctx, canvas, data } = chart;
            const padding = 40;
            const barWidth = (canvas.width - padding * 2) / data.labels.length;
            const maxValue = Math.max(...data.datasets[0].data);
            const scale = (canvas.height - padding * 2) / maxValue;
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw axes
            ctx.strokeStyle = '#666';
            ctx.beginPath();
            ctx.moveTo(padding, padding);
            ctx.lineTo(padding, canvas.height - padding);
            ctx.lineTo(canvas.width - padding, canvas.height - padding);
            ctx.stroke();
            
            // Draw bars
            data.labels.forEach((label, index) => {
                const value = data.datasets[0].data[index];
                const x = padding + index * barWidth + barWidth * 0.1;
                const y = canvas.height - padding;
                const height = value * scale;
                const width = barWidth * 0.8;
                
                // Gradient fill
                const gradient = ctx.createLinearGradient(0, y - height, 0, y);
                gradient.addColorStop(0, this.colors.portnox);
                gradient.addColorStop(1, this.colors.info);
                
                ctx.fillStyle = gradient;
                ctx.fillRect(x, y - height, width, height);
                
                // Label
                ctx.fillStyle = '#666';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(label, x + width / 2, canvas.height - 20);
                
                // Value
                ctx.fillStyle = '#333';
                ctx.fillText('$' + (value / 1000).toFixed(0) + 'k', x + width / 2, y - height - 10);
            });
        }
        
        renderLineChart(chart) {
            const { ctx, canvas, data } = chart;
            const padding = 40;
            const points = data.datasets[0].data.length;
            const xStep = (canvas.width - padding * 2) / (points - 1);
            const maxValue = Math.max(...data.datasets[0].data);
            const yScale = (canvas.height - padding * 2) / maxValue;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw grid
            ctx.strokeStyle = '#eee';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 5; i++) {
                const y = padding + (canvas.height - padding * 2) * i / 5;
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(canvas.width - padding, y);
                ctx.stroke();
            }
            
            // Draw line
            ctx.strokeStyle = this.colors.portnox;
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            data.datasets[0].data.forEach((value, index) => {
                const x = padding + index * xStep;
                const y = canvas.height - padding - (value * yScale);
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                
                // Draw point
                ctx.fillStyle = this.colors.portnox;
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fill();
            });
            
            ctx.stroke();
        }
        
        renderPieChart(chart) {
            const { ctx, canvas, data } = chart;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(canvas.width, canvas.height) / 2 - 20;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const total = data.datasets[0].data.reduce((sum, val) => sum + val, 0);
            let currentAngle = -Math.PI / 2;
            
            data.datasets[0].data.forEach((value, index) => {
                const sliceAngle = (value / total) * Math.PI * 2;
                
                // Draw slice
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
                ctx.closePath();
                
                const colors = [this.colors.portnox, this.colors.fortinet, this.colors.aruba, this.colors.cisco];
                ctx.fillStyle = colors[index % colors.length];
                ctx.fill();
                
                // Draw label
                const labelAngle = currentAngle + sliceAngle / 2;
                const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
                const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
                
                ctx.fillStyle = 'white';
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(data.labels[index], labelX, labelY);
                
                currentAngle += sliceAngle;
            });
        }
        
        renderGaugeChart(chart) {
            const { ctx, canvas, data } = chart;
            const centerX = canvas.width / 2;
            const centerY = canvas.height * 0.7;
            const radius = Math.min(canvas.width, canvas.height) / 2 - 20;
            const value = data.value;
            const maxValue = data.max || 100;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw background arc
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, Math.PI, 0);
            ctx.strokeStyle = '#eee';
            ctx.lineWidth = 20;
            ctx.stroke();
            
            // Draw value arc
            const angle = Math.PI + (value / maxValue) * Math.PI;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, Math.PI, angle);
            
            // Color based on value
            if (value < 33) {
                ctx.strokeStyle = this.colors.error;
            } else if (value < 66) {
                ctx.strokeStyle = this.colors.warning;
            } else {
                ctx.strokeStyle = this.colors.success;
            }
            
            ctx.lineWidth = 20;
            ctx.stroke();
            
            // Draw value text
            ctx.fillStyle = '#333';
            ctx.font = 'bold 36px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(value + '%', centerX, centerY);
            
            // Draw label
            ctx.font = '16px Arial';
            ctx.fillText(data.label || '', centerX, centerY + 40);
        }
        
        renderComparisonChart(chart) {
            const { ctx, canvas, data } = chart;
            const vendors = data.vendors;
            const metrics = ['Initial Cost', 'Annual Cost', '3-Year TCO'];
            const barHeight = 30;
            const padding = 40;
            const chartHeight = vendors.length * metrics.length * (barHeight + 10) + padding * 2;
            
            canvas.height = chartHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            let y = padding;
            
            vendors.forEach((vendor, vendorIndex) => {
                // Vendor name
                ctx.fillStyle = '#333';
                ctx.font = 'bold 16px Arial';
                ctx.fillText(vendor.name, padding, y);
                y += 25;
                
                metrics.forEach((metric, metricIndex) => {
                    const value = vendor.metrics[metricIndex];
                    const maxValue = Math.max(...vendors.map(v => v.metrics[metricIndex]));
                    const barWidth = (value / maxValue) * (canvas.width - padding * 3 - 100);
                    
                    // Metric label
                    ctx.fillStyle = '#666';
                    ctx.font = '12px Arial';
                    ctx.fillText(metric, padding + 20, y + barHeight / 2 + 4);
                    
                    // Bar
                    const gradient = ctx.createLinearGradient(padding + 120, y, padding + 120 + barWidth, y);
                    if (vendor.name.includes('Portnox')) {
                        gradient.addColorStop(0, this.colors.portnox);
                        gradient.addColorStop(1, this.colors.info);
                    } else {
                        gradient.addColorStop(0, '#ddd');
                        gradient.addColorStop(1, '#bbb');
                    }
                    
                    ctx.fillStyle = gradient;
                    ctx.fillRect(padding + 120, y, barWidth, barHeight);
                    
                    // Value
                    ctx.fillStyle = '#333';
                    ctx.font = 'bold 12px Arial';
                    ctx.fillText('$' + (value / 1000).toFixed(0) + 'k', padding + 130 + barWidth, y + barHeight / 2 + 4);
                    
                    y += barHeight + 10;
                });
                
                y += 20;
            });
        }
        
        updateChart(containerId, newData) {
            const chart = this.chartInstances.get(containerId);
            if (!chart) return;
            
            chart.data = newData;
            if (this.chartTypes[chart.type]) {
                this.chartTypes[chart.type](chart);
            }
        }
        
        destroyChart(containerId) {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = '';
            }
            this.chartInstances.delete(containerId);
        }
        
        createDashboardCharts(vendorData) {
            // TCO Comparison Chart
            if (document.getElementById('tco-comparison-chart')) {
                const tcoData = {
                    labels: vendorData.map(v => v.vendor.name),
                    datasets: [{
                        data: vendorData.map(v => v.tco.total)
                    }]
                };
                this.createChart('tco-comparison-chart', 'bar', tcoData);
            }
            
            // ROI Timeline Chart
            if (document.getElementById('roi-timeline-chart')) {
                const roiData = {
                    labels: ['Year 1', 'Year 2', 'Year 3'],
                    datasets: [{
                        data: [20, 45, 85]
                    }]
                };
                this.createChart('roi-timeline-chart', 'line', roiData);
            }
            
            // Cost Breakdown Pie Chart
            if (document.getElementById('cost-breakdown-chart')) {
                const breakdownData = {
                    labels: ['Licensing', 'Implementation', 'Operations', 'Maintenance'],
                    datasets: [{
                        data: [35, 25, 30, 10]
                    }]
                };
                this.createChart('cost-breakdown-chart', 'pie', breakdownData);
            }
            
            // Risk Reduction Gauge
            if (document.getElementById('risk-gauge-chart')) {
                const riskData = {
                    value: 85,
                    max: 100,
                    label: 'Risk Reduction'
                };
                this.createChart('risk-gauge-chart', 'gauge', riskData);
            }
        }
    }
    
    // Create and register
    const chartRenderer = new ChartRenderer();
    
    if (window.ModuleLoader && window.ModuleLoader.register) {
        window.ModuleLoader.register('ChartRenderer', chartRenderer);
        console.log('[ChartRenderer] ✓ Registered with ModuleLoader');
    }
    
    window.ChartRenderer = chartRenderer;
})();

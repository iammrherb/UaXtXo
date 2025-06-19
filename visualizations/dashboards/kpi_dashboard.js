// KPI Dashboard Component with Real-time Updates
class KPIDashboard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.metrics = {};
        this.charts = {};
        this.updateInterval = 5000; // 5 seconds
    }

    initialize(vendorData) {
        this.vendorData = vendorData;
        this.createDashboardLayout();
        this.initializeMetrics();
        this.startRealTimeUpdates();
    }

    createDashboardLayout() {
        this.container.innerHTML = `
            <div class="kpi-dashboard">
                <div class="kpi-header">
                    <h2 class="kpi-title">Executive KPI Dashboard</h2>
                    <div class="kpi-timestamp" id="kpiTimestamp"></div>
                </div>
                
                <div class="kpi-grid">
                    <div class="kpi-metric" id="kpiTotalSavings">
                        <div class="kpi-icon"><i class="fas fa-dollar-sign"></i></div>
                        <div class="kpi-content">
                            <div class="kpi-label">Total Savings</div>
                            <div class="kpi-value">$0K</div>
                            <div class="kpi-trend"></div>
                        </div>
                        <div class="kpi-sparkline">
                            <canvas id="savingsSparkline"></canvas>
                        </div>
                    </div>
                    
                    <div class="kpi-metric" id="kpiRiskScore">
                        <div class="kpi-icon"><i class="fas fa-shield-alt"></i></div>
                        <div class="kpi-content">
                            <div class="kpi-label">Risk Score</div>
                            <div class="kpi-value">0</div>
                            <div class="kpi-trend"></div>
                        </div>
                        <div class="kpi-gauge">
                            <canvas id="riskGauge"></canvas>
                        </div>
                    </div>
                    
                    <div class="kpi-metric" id="kpiCompliance">
                        <div class="kpi-icon"><i class="fas fa-certificate"></i></div>
                        <div class="kpi-content">
                            <div class="kpi-label">Compliance</div>
                            <div class="kpi-value">0%</div>
                            <div class="kpi-trend"></div>
                        </div>
                        <div class="kpi-progress">
                            <div class="kpi-progress-bar"></div>
                        </div>
                    </div>
                    
                    <div class="kpi-metric" id="kpiIncidents">
                        <div class="kpi-icon"><i class="fas fa-bug"></i></div>
                        <div class="kpi-content">
                            <div class="kpi-label">Incidents Prevented</div>
                            <div class="kpi-value">0</div>
                            <div class="kpi-trend"></div>
                        </div>
                        <div class="kpi-chart">
                            <canvas id="incidentChart"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="kpi-alerts" id="kpiAlerts">
                    <!-- Dynamic alerts will be added here -->
                </div>
            </div>
        `;
    }

    initializeMetrics() {
        // Calculate initial metrics
        const portnox = this.vendorData.portnox;
        const competitors = Object.values(this.vendorData).filter(v => v.name !== 'Portnox');
        
        // Total savings calculation
        const avgCompetitorCost = competitors.reduce((sum, v) => sum + v.projections['3_year'].total_cost, 0) / competitors.length;
        const totalSavings = avgCompetitorCost - portnox.projections['3_year'].total_cost;
        
        // Update metrics
        this.updateMetric('kpiTotalSavings', {
            value: `${(totalSavings / 1000).toFixed(0)}K`,
            trend: 'up',
            trendValue: '68%'
        });
        
        this.updateMetric('kpiRiskScore', {
            value: portnox.risk_profile.security_effectiveness,
            trend: 'up',
            trendValue: '+15%'
        });
        
        this.updateMetric('kpiCompliance', {
            value: `${portnox.risk_profile.compliance_automation}%`,
            trend: 'up',
            trendValue: '+25%'
        });
        
        this.updateMetric('kpiIncidents', {
            value: portnox.projections['3_year'].incidents_prevented,
            trend: 'down',
            trendValue: '-85%'
        });
        
        // Initialize mini charts
        this.initializeSparklines();
        this.initializeGauges();
    }

    updateMetric(metricId, data) {
        const metric = document.getElementById(metricId);
        if (!metric) return;
        
        const valueEl = metric.querySelector('.kpi-value');
        const trendEl = metric.querySelector('.kpi-trend');
        
        // Animate value change
        this.animateValue(valueEl, valueEl.textContent, data.value);
        
        // Update trend
        if (trendEl && data.trend) {
            trendEl.className = `kpi-trend ${data.trend}`;
            trendEl.innerHTML = `<i class="fas fa-arrow-${data.trend}"></i> ${data.trendValue}`;
        }
        
        // Add pulse animation
        metric.classList.add('pulse');
        setTimeout(() => metric.classList.remove('pulse'), 1000);
    }

    animateValue(element, start, end) {
        const duration = 1000;
        const startTime = performance.now();
        
        const isNumber = !isNaN(parseFloat(end));
        const startValue = isNumber ? parseFloat(start) || 0 : 0;
        const endValue = isNumber ? parseFloat(end) : 100;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = startValue + (endValue - startValue) * this.easeOutQuart(progress);
            
            if (isNumber) {
                element.textContent = end.includes(') ? 
                    `${Math.round(currentValue)}K` : 
                    end.includes('%') ? 
                    `${Math.round(currentValue)}%` : 
                    Math.round(currentValue).toString();
            } else {
                element.textContent = end;
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    initializeSparklines() {
        // Savings sparkline
        const savingsCtx = document.getElementById('savingsSparkline');
        if (savingsCtx) {
            this.charts.savings = new Chart(savingsCtx, {
                type: 'line',
                data: {
                    labels: Array(12).fill(''),
                    datasets: [{
                        data: this.generateSparklineData(12, 20, 100),
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { enabled: false } },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    }
                }
            });
        }
    }

    initializeGauges() {
        // Risk gauge
        const riskCtx = document.getElementById('riskGauge');
        if (riskCtx) {
            const riskScore = this.vendorData.portnox.risk_profile.security_effectiveness;
            
            this.charts.riskGauge = new Chart(riskCtx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [riskScore, 100 - riskScore],
                        backgroundColor: [
                            this.getGaugeColor(riskScore),
                            'rgba(255, 255, 255, 0.05)'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    circumference: 180,
                    rotation: 270,
                    cutout: '80%',
                    plugins: { legend: { display: false }, tooltip: { enabled: false } }
                }
            });
        }
    }

    getGaugeColor(value) {
        if (value >= 90) return '#10B981';
        if (value >= 70) return '#F59E0B';
        return '#EF4444';
    }

    generateSparklineData(points, min, max) {
        const data = [];
        let current = (min + max) / 2;
        
        for (let i = 0; i < points; i++) {
            current += (Math.random() - 0.5) * 20;
            current = Math.max(min, Math.min(max, current));
            data.push(current);
        }
        
        return data;
    }

    startRealTimeUpdates() {
        // Update timestamp
        this.updateTimestamp();
        setInterval(() => this.updateTimestamp(), 1000);
        
        // Simulate real-time metric updates
        setInterval(() => {
            // Add some variance to metrics
            const variance = 0.05; // 5% variance
            
            // Update sparklines with new data point
            if (this.charts.savings) {
                const data = this.charts.savings.data.datasets[0].data;
                data.shift();
                data.push(data[data.length - 1] + (Math.random() - 0.5) * 10);
                this.charts.savings.update('none');
            }
            
            // Check for alerts
            this.checkAlerts();
        }, this.updateInterval);
    }

    updateTimestamp() {
        const timestamp = document.getElementById('kpiTimestamp');
        if (timestamp) {
            timestamp.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
        }
    }

    checkAlerts() {
        const alerts = [];
        
        // Check various conditions
        if (Math.random() > 0.9) {
            alerts.push({
                type: 'success',
                message: 'Compliance score improved by 2%',
                icon: 'fa-check-circle'
            });
        }
        
        if (Math.random() > 0.95) {
            alerts.push({
                type: 'warning',
                message: 'Unusual authentication pattern detected',
                icon: 'fa-exclamation-triangle'
            });
        }
        
        // Display alerts
        this.displayAlerts(alerts);
    }

    displayAlerts(alerts) {
        const alertContainer = document.getElementById('kpiAlerts');
        if (!alertContainer || alerts.length === 0) return;
        
        alerts.forEach(alert => {
            const alertEl = document.createElement('div');
            alertEl.className = `kpi-alert ${alert.type}`;
            alertEl.innerHTML = `
                <i class="fas ${alert.icon}"></i>
                <span>${alert.message}</span>
                <span class="alert-time">${new Date().toLocaleTimeString()}</span>
            `;
            
            alertContainer.insertBefore(alertEl, alertContainer.firstChild);
            
            // Remove old alerts
            while (alertContainer.children.length > 5) {
                alertContainer.removeChild(alertContainer.lastChild);
            }
            
            // Fade in animation
            setTimeout(() => alertEl.classList.add('show'), 10);
        });
    }
}

// Export for use
if (typeof window !== 'undefined') {
    window.KPIDashboard = KPIDashboard;
}

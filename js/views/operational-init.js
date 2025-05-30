/**
 * Operational Tab Initialization
 */

window.addEventListener('DOMContentLoaded', function() {
    console.log('⚙️ Initializing Operational Tab...');
    
    const checkPlatform = setInterval(() => {
        if (window.platform && window.platform.renderOperationalImpact) {
            clearInterval(checkPlatform);
            integrateOperationalModule();
        }
    }, 100);
    
    function integrateOperationalModule() {
        window.platform.renderOperationalImpact = function(container) {
            console.log('📊 Rendering Operational Impact...');
            
            if (!container) return;
            
            if (!this.calculationResults || Object.keys(this.calculationResults).length === 0) {
                container.innerHTML = '<div class="no-data">Calculating operational analysis...</div>';
                return;
            }
            
            container.innerHTML = `
                <div class="operational-impact">
                    <div class="operational-header">
                        <h2 class="gradient-text">Operational Efficiency Analysis</h2>
                        <p>Process improvement and automation impact</p>
                    </div>
                    
                    <div class="operational-metrics-grid">
                        <div class="operational-metric">
                            <i class="fas fa-tachometer-alt"></i>
                            <h3>Efficiency Gain</h3>
                            <div class="metric-value">85%</div>
                            <p>Process automation</p>
                        </div>
                        <div class="operational-metric">
                            <i class="fas fa-clock"></i>
                            <h3>Time Saved</h3>
                            <div class="metric-value">320 hrs</div>
                            <p>Per month</p>
                        </div>
                        <div class="operational-metric">
                            <i class="fas fa-rocket"></i>
                            <h3>Deployment</h3>
                            <div class="metric-value">30 days</div>
                            <p>Full implementation</p>
                        </div>
                        <div class="operational-metric">
                            <i class="fas fa-chart-line"></i>
                            <h3>Productivity</h3>
                            <div class="metric-value">+45%</div>
                            <p>IT team efficiency</p>
                        </div>
                    </div>
                    
                    <div class="chart-section">
                        <h3>Operational Efficiency Timeline</h3>
                        <div class="chart-container">
                            <div id="operational-timeline-chart" style="height: 400px;"></div>
                        </div>
                    </div>
                </div>
            `;
            
            // Render operational chart
            setTimeout(() => {
                this.renderOperationalTimeline();
            }, 100);
        };
        
        // Add renderOperationalTimeline method
        if (!window.platform.renderOperationalTimeline) {
            window.platform.renderOperationalTimeline = function() {
                const container = document.getElementById('operational-timeline-chart');
                if (!container) return;
                
                const months = ['Month 1', 'Month 2', 'Month 3', 'Month 6', 'Month 9', 'Month 12'];
                const efficiency = [20, 35, 50, 70, 85, 95];
                const automation = [10, 25, 40, 65, 80, 90];
                
                Highcharts.chart(container, {
                    chart: {
                        type: 'line',
                        backgroundColor: '#334155'
                    },
                    title: { text: null },
                    xAxis: {
                        categories: months,
                        labels: { style: { color: '#CBD5E1' } }
                    },
                    yAxis: {
                        title: { text: 'Efficiency %', style: { color: '#CBD5E1' } },
                        labels: { style: { color: '#CBD5E1' } },
                        max: 100
                    },
                    series: [{
                        name: 'Process Efficiency',
                        data: efficiency,
                        color: '#00D4AA'
                    }, {
                        name: 'Automation Level',
                        data: automation,
                        color: '#3B82F6'
                    }],
                    credits: { enabled: false }
                });
            };
        }
    }
});

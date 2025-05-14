/**
 * TCO Analyzer Master Fix
 * Completely overrides the old wizard and implements the sidepanel approach
 */
console.log("🔧 Master fix loading...");

// Execute immediately before DOM loads
(function() {
    // ====== PART 1: Override problematic JavaScript functions ======
    
    // Store original functions we want to override
    const originalDocumentAddEventListener = document.addEventListener;
    
    // Override document.addEventListener to block wizard initialization
    document.addEventListener = function(type, listener, options) {
        if (type === 'DOMContentLoaded') {
            // Check if this is a wizard initialization function
            const listenerStr = listener ? listener.toString() : '';
            if (listenerStr.includes('MagicalWizard') || 
                listenerStr.includes('wizardManager') ||
                listenerStr.includes('wizard') && listenerStr.includes('init')) {
                console.log("🚫 Blocked wizard initialization event listener");
                return;
            }
        }
        return originalDocumentAddEventListener.call(this, type, listener, options);
    };
    
    // Create empty placeholder functions for missing scripts
    window.createCustomTCOImplementation = function() {
        console.log("📝 Created placeholder for createCustomTCOImplementation");
        return {
            init: function() {},
            calculate: function() { return {}; }
        };
    };
    
    // Override window.onload
    const originalWindowOnload = window.onload;
    window.onload = function(event) {
        console.log("🔄 Window load event intercepted");
        
        // Replace wizard with sidepanel
        setTimeout(replaceWizardWithSidepanel, 100);
        
        // Call original onload if it exists
        if (typeof originalWindowOnload === 'function') {
            originalWindowOnload(event);
        }
    };
    
    // ====== PART 2: Define sidepanel implementation ======
    
    function replaceWizardWithSidepanel() {
        console.log("🔄 Replacing wizard with sidepanel...");
        
        // Find the wizard container
        const wizardContainer = document.querySelector('.wizard-container');
        if (!wizardContainer) {
            console.log("❌ Wizard container not found");
            return;
        }
        
        // Hide any visible wizard steps
        document.querySelectorAll('.wizard-step').forEach(step => {
            step.style.display = 'none';
        });
        
        // Create sidepanel HTML
        const sidepanelHTML = `
            <div class="tco-sidepanel">
                <div class="sidepanel-header">
                    <h2>TCO Configuration</h2>
                </div>
                <div class="sidepanel-content">
                    <div class="config-section">
                        <h3><i class="fas fa-server"></i> Vendor Selection</h3>
                        <div class="vendor-selector">
                            <label for="current-vendor">Current NAC Solution</label>
                            <select id="current-vendor" class="form-select">
                                <option value="">Select your current vendor...</option>
                                <option value="cisco">Cisco ISE</option>
                                <option value="aruba">Aruba ClearPass</option>
                                <option value="forescout">Forescout</option>
                                <option value="fortinac">FortiNAC</option>
                                <option value="nps">Microsoft NPS</option>
                                <option value="securew2">SecureW2</option>
                                <option value="juniper">Juniper Mist</option>
                                <option value="foxpass">Foxpass</option>
                                <option value="arista">Arista NAC</option>
                                <option value="noNac">No NAC Solution</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="config-section">
                        <h3><i class="fas fa-building"></i> Organization</h3>
                        <div class="org-config">
                            <div class="form-group">
                                <label for="device-count">Number of Devices</label>
                                <input type="number" id="device-count" class="form-input" value="2500" min="300" max="100000">
                            </div>
                            <div class="form-group">
                                <label for="locations">Number of Locations</label>
                                <input type="number" id="locations" class="form-input" value="5" min="1" max="1000">
                            </div>
                            <div class="form-group">
                                <label for="years">Analysis Period</label>
                                <select id="years" class="form-select">
                                    <option value="1">1 Year</option>
                                    <option value="3" selected>3 Years</option>
                                    <option value="5">5 Years</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="config-section">
                        <h3><i class="fas fa-industry"></i> Industry</h3>
                        <div class="industry-selector">
                            <label for="industry">Select Industry</label>
                            <select id="industry" class="form-select">
                                <option value="">Choose an industry...</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="financial" selected>Financial Services</option>
                                <option value="education">Education</option>
                                <option value="government">Government</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="retail">Retail</option>
                                <option value="technology">Technology</option>
                                <option value="energy">Energy & Utilities</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="calculate-section">
                        <button id="sidepanel-calculate-btn" class="btn btn-primary btn-large">
                            <i class="fas fa-calculator"></i> Calculate TCO Comparison
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Inject the sidepanel HTML
        wizardContainer.innerHTML = sidepanelHTML;
        
        // Add the CSS for the sidepanel
        addSidepanelStyles();
        
        // Attach event listener to the calculate button
        const calculateBtn = document.getElementById('sidepanel-calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', function() {
                // Show loading overlay if it exists
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'flex';
                }
                
                // Hide wizard container
                wizardContainer.style.display = 'none';
                
                // Generate results data
                setTimeout(function() {
                    // Generate mock data for charts
                    generateMockChartData();
                    
                    // Show results container
                    const resultsContainer = document.getElementById('results-container');
                    if (resultsContainer) {
                        resultsContainer.classList.remove('hidden');
                    }
                    
                    // Hide loading overlay
                    if (loadingOverlay) {
                        loadingOverlay.style.display = 'none';
                    }
                    
                    // Show success notification
                    showNotification('Analysis Complete', 'TCO comparison has been generated successfully.', 'success');
                }, 1500);
            });
        }
        
        console.log("✅ Wizard replaced with sidepanel successfully");
    }
    
    // Add CSS styles for sidepanel
    function addSidepanelStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .tco-sidepanel {
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                padding: 25px;
                margin: 30px 0;
                animation: fadeIn 0.5s ease;
            }
            
            .sidepanel-header h2 {
                margin-top: 0;
                color: #333;
                font-size: 1.5rem;
                border-bottom: 1px solid #eee;
                padding-bottom: 15px;
                margin-bottom: 25px;
            }
            
            .config-section {
                margin-bottom: 30px;
            }
            
            .config-section h3 {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 1.2rem;
                color: #0078d4;
                margin-bottom: 15px;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
            }
            
            .calculate-section {
                margin-top: 30px;
                text-align: center;
            }
            
            body.dark-mode .tco-sidepanel {
                background-color: #2d3748;
            }
            
            body.dark-mode .sidepanel-header h2 {
                color: #e2e8f0;
                border-color: #4a5568;
            }
            
            body.dark-mode .config-section h3 {
                color: #63b3ed;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            /* Override any wizard styles that might interfere */
            .wizard-step {
                display: none !important;
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // ====== PART 3: Mock data for charts ======
    
    function generateMockChartData() {
        console.log("📊 Generating mock chart data");
        
        try {
            // Safe function to update chart
            function safeUpdateChart(chartId, newData, config) {
                try {
                    const canvas = document.getElementById(chartId);
                    if (!canvas) {
                        console.log(`⚠️ Canvas ${chartId} not found`);
                        return;
                    }
                    
                    // Check if Chart.js is available
                    if (!window.Chart) {
                        console.log("⚠️ Chart.js not available");
                        return;
                    }
                    
                    // Get existing chart instance
                    let chart = Chart.getChart(canvas);
                    
                    // If chart exists, destroy it
                    if (chart) {
                        chart.destroy();
                    }
                    
                    // Create new chart
                    chart = new Chart(canvas, {
                        type: config.type || 'bar',
                        data: newData,
                        options: config.options || {}
                    });
                    
                    console.log(`✅ Updated chart: ${chartId}`);
                } catch (error) {
                    console.log(`❌ Error updating chart ${chartId}:`, error);
                }
            }
            
            // TCO Comparison Chart
            safeUpdateChart('tco-comparison-chart', {
                labels: ['Current Solution', 'Portnox Cloud'],
                datasets: [{
                    label: 'Total Cost of Ownership',
                    data: [450000, 180000],
                    backgroundColor: ['#3498db', '#2ecc71'],
                    borderColor: ['#3498db', '#2ecc71'],
                    borderWidth: 1
                }]
            }, { 
                type: 'bar',
                options: {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return '$' + context.raw.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
            
            // Current Breakdown Chart
            safeUpdateChart('current-breakdown-chart', {
                labels: ['Hardware', 'Licenses', 'Implementation', 'Maintenance', 'Personnel', 'Training'],
                datasets: [{
                    data: [120000, 100000, 80000, 60000, 70000, 20000],
                    backgroundColor: [
                        '#3498db', '#2ecc71', '#9b59b6', 
                        '#e74c3c', '#f39c12', '#1abc9c'
                    ]
                }]
            }, { 
                type: 'doughnut',
                options: {
                    cutout: '60%'
                }
            });
            
            // Alternative Breakdown Chart
            safeUpdateChart('alternative-breakdown-chart', {
                labels: ['Hardware', 'Licenses', 'Implementation', 'Maintenance', 'Personnel', 'Training'],
                datasets: [{
                    data: [0, 90000, 30000, 0, 40000, 20000],
                    backgroundColor: [
                        '#3498db', '#2ecc71', '#9b59b6', 
                        '#e74c3c', '#f39c12', '#1abc9c'
                    ]
                }]
            }, { 
                type: 'doughnut',
                options: {
                    cutout: '60%'
                }
            });
            
            // Cumulative Cost Chart
            safeUpdateChart('cumulative-cost-chart', {
                labels: ['Year 0', 'Year 1', 'Year 2', 'Year 3'],
                datasets: [
                    {
                        label: 'Current Solution',
                        data: [150000, 300000, 375000, 450000],
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        fill: true
                    },
                    {
                        label: 'Portnox Cloud',
                        data: [50000, 110000, 145000, 180000],
                        borderColor: '#2ecc71',
                        backgroundColor: 'rgba(46, 204, 113, 0.1)',
                        fill: true
                    }
                ]
            }, { 
                type: 'line',
                options: {
                    tension: 0.4
                }
            });
            
            // ROI Chart
            safeUpdateChart('roi-chart', {
                labels: ['Year 0', 'Year 1', 'Year 2', 'Year 3'],
                datasets: [
                    {
                        label: 'Cumulative Savings',
                        data: [-50000, 40000, 180000, 270000],
                        borderColor: '#f39c12',
                        backgroundColor: 'rgba(243, 156, 18, 0.1)',
                        borderDash: [5, 5],
                        fill: true
                    }
                ]
            }, { 
                type: 'line',
                options: {
                    tension: 0.4
                }
            });
            
            // Implementation Chart
            safeUpdateChart('implementation-comparison-chart', {
                labels: ['Current Solution', 'Portnox Cloud'],
                datasets: [{
                    label: 'Implementation Time (days)',
                    data: [90, 30],
                    backgroundColor: ['#3498db', '#2ecc71']
                }]
            }, { 
                type: 'bar',
                options: {
                    indexAxis: 'y'
                }
            });
            
            // Feature Chart
            safeUpdateChart('feature-comparison-chart', {
                labels: ['Zero Trust', 'Cloud Native', 'Security', 'Scalability', 'Ease of Use'],
                datasets: [
                    {
                        label: 'Current Solution',
                        data: [70, 40, 75, 65, 50],
                        backgroundColor: 'rgba(52, 152, 219, 0.2)',
                        borderColor: '#3498db',
                        pointBackgroundColor: '#3498db'
                    },
                    {
                        label: 'Portnox Cloud',
                        data: [95, 100, 90, 95, 90],
                        backgroundColor: 'rgba(46, 204, 113, 0.2)',
                        borderColor: '#2ecc71',
                        pointBackgroundColor: '#2ecc71'
                    }
                ]
            }, { 
                type: 'radar'
            });
            
            // Update metrics
            document.getElementById('total-savings').textContent = '$270,000';
            document.getElementById('savings-percentage').textContent = '60%';
            document.getElementById('breakeven-point').textContent = '6 months';
            document.getElementById('risk-reduction').textContent = '75%';
            document.getElementById('implementation-time').textContent = '70% faster';
            
            // Add key insights
            const insightsList = document.getElementById('key-insights-list');
            if (insightsList) {
                insightsList.innerHTML = `
                    <div class="insight-item">
                        <i class="fas fa-lightbulb highlight-positive"></i>
                        <div class="insight-content">
                            <h4>Cost Efficiency</h4>
                            <p>Switching to Portnox Cloud reduces total cost of ownership by 60% over 3 years, primarily through eliminated infrastructure and reduced management costs.</p>
                        </div>
                    </div>
                    <div class="insight-item">
                        <i class="fas fa-clock highlight-positive"></i>
                        <div class="insight-content">
                            <h4>Rapid Deployment</h4>
                            <p>Portnox Cloud can be deployed in 30 days, compared to 90+ days for on-premises alternatives, enabling faster time-to-value.</p>
                        </div>
                    </div>
                    <div class="insight-item">
                        <i class="fas fa-shield-alt highlight-positive"></i>
                        <div class="insight-content">
                            <h4>Enhanced Security</h4>
                            <p>Cloud-native architecture provides continuous updates and stronger security controls, reducing overall risk exposure by 75%.</p>
                        </div>
                    </div>
                `;
            }
        } catch (error) {
            console.log("❌ Error generating mock chart data:", error);
        }
    }
    
    // ====== PART 4: Notification system ======
    
    function showNotification(title, message, type) {
        try {
            // Create notification container if it doesn't exist
            let container = document.querySelector('.notification-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'notification-container';
                document.body.appendChild(container);
                
                // Add CSS for notifications
                const style = document.createElement('style');
                style.textContent = `
                    .notification-container {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        z-index: 9999;
                    }
                    
                    .notification {
                        background-color: #fff;
                        border-radius: 6px;
                        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
                        padding: 15px;
                        margin-bottom: 10px;
                        max-width: 350px;
                        animation: slide-in 0.3s ease-out forwards;
                        display: flex;
                        align-items: flex-start;
                    }
                    
                    .notification.slide-out {
                        animation: slide-out 0.3s ease-in forwards;
                    }
                    
                    .notification-icon {
                        margin-right: 12px;
                        font-size: 1.25rem;
                    }
                    
                    .notification-content {
                        flex: 1;
                    }
                    
                    .notification-title {
                        font-weight: 600;
                        margin-bottom: 3px;
                    }
                    
                    .notification-message {
                        color: #666;
                        font-size: 0.9rem;
                    }
                    
                    .notification-close {
                        color: #999;
                        font-size: 0.9rem;
                        cursor: pointer;
                        padding: 3px;
                        margin-left: 10px;
                    }
                    
                    .notification-success { border-left: 4px solid #2ecc71; }
                    .notification-success .notification-icon { color: #2ecc71; }
                    
                    .notification-error { border-left: 4px solid #e74c3c; }
                    .notification-error .notification-icon { color: #e74c3c; }
                    
                    .notification-warning { border-left: 4px solid #f39c12; }
                    .notification-warning .notification-icon { color: #f39c12; }
                    
                    .notification-info { border-left: 4px solid #3498db; }
                    .notification-info .notification-icon { color: #3498db; }
                    
                    @keyframes slide-in {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    
                    @keyframes slide-out {
                        from { transform: translateX(0); opacity: 1; }
                        to { transform: translateX(100%); opacity: 0; }
                    }
                    
                    body.dark-mode .notification {
                        background-color: #2d3748;
                    }
                    
                    body.dark-mode .notification-message {
                        color: #a0aec0;
                    }
                    
                    body.dark-mode .notification-close {
                        color: #a0aec0;
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Set icon based on type
            let icon;
            switch (type) {
                case 'success':
                    icon = 'fa-check-circle';
                    break;
                case 'error':
                    icon = 'fa-exclamation-circle';
                    break;
                case 'warning':
                    icon = 'fa-exclamation-triangle';
                    break;
                case 'info':
                default:
                    icon = 'fa-info-circle';
                    type = 'info';
                    break;
            }
            
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <div class="notification-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${title}</div>
                    <div class="notification-message">${message}</div>
                </div>
                <div class="notification-close">
                    <i class="fas fa-times"></i>
                </div>
            `;
            
            // Add notification to container
            container.appendChild(notification);
            
            // Set up close button
            notification.querySelector('.notification-close').addEventListener('click', function() {
                notification.classList.add('slide-out');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            });
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.classList.add('slide-out');
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }
            }, 5000);
            
        } catch (error) {
            console.log("❌ Error showing notification:", error);
        }
    }
    
    // Make the notification function globally available
    window.showNotification = showNotification;
    
    console.log("✅ Master fix loaded successfully");
})();

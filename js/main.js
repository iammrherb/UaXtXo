// Total Cost Analyzer - Main Application
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Total Cost Analyzer...');
    
    // Initialize particle background
    initParticleBackground();
    
    // Initialize theme
    initTheme();
    
    // Load default results immediately
    loadDefaultResults();
    
    // Initialize result tabs
    initResultsTabs();
    
    // Initialize animations
    initAnimations();
    
    console.log('✅ Application initialized successfully!');
});

// Initialize particle background
function initParticleBackground() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 40,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#1a73e8'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.1,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#1a73e8',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// Initialize theme handling
function initTheme() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            updateThemeIcon(isDarkMode);
        });
    }
}

function updateThemeIcon(isDarkMode) {
    const icon = document.querySelector('#dark-mode-toggle i');
    if (icon) {
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Load default results
function loadDefaultResults() {
    const resultsContent = document.querySelector('.results-content');
    if (resultsContent) {
        // Create default content
        resultsContent.innerHTML = `
            <!-- Overview Tab -->
            <div class="result-panel active" id="overview-panel">
                <div class="executive-summary">
                    <h2>Executive Summary</h2>
                    <div class="summary-grid">
                        <div class="summary-card highlight">
                            <div class="card-icon">
                                <i class="fas fa-piggy-bank"></i>
                            </div>
                            <div class="card-content">
                                <h4>Total Savings</h4>
                                <div class="metric-value" id="total-savings">$425,000</div>
                                <div class="metric-detail" id="savings-percentage">35%</div>
                            </div>
                        </div>
                        
                        <div class="summary-card">
                            <div class="card-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="card-content">
                                <h4>Break-even Point</h4>
                                <div class="metric-value" id="breakeven-point">18 months</div>
                                <div class="metric-detail">Time to positive ROI</div>
                            </div>
                        </div>
                        
                        <div class="summary-card">
                            <div class="card-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <div class="card-content">
                                <h4>Risk Reduction</h4>
                                <div class="metric-value" id="risk-reduction">62%</div>
                                <div class="metric-detail">Security improvement</div>
                            </div>
                        </div>
                        
                        <div class="summary-card">
                            <div class="card-icon">
                                <i class="fas fa-rocket"></i>
                            </div>
                            <div class="card-content">
                                <h4>Implementation Time</h4>
                                <div class="metric-value" id="implementation-time">14 days</div>
                                <div class="metric-detail">vs. current solution</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="key-insights">
                    <h3>Key Insights</h3>
                    <div class="insights-list" id="key-insights-list">
                        <div class="insight-item high-impact">
                            <div class="insight-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="insight-content">
                                <h4>Significant Cost Reduction</h4>
                                <p>Switching to Portnox Cloud could save your organization 35% over 3 years.</p>
                            </div>
                        </div>
                        <div class="insight-item high-impact">
                            <div class="insight-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="insight-content">
                                <h4>Faster Implementation</h4>
                                <p>Deploy 76% faster with cloud-native architecture.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Comparison Tab -->
            <div class="result-panel" id="comparison-panel">
                <div class="comparison-charts">
                    <div class="chart-card">
                        <h3>3-Year TCO Comparison</h3>
                        <canvas id="tco-comparison-chart"></canvas>
                    </div>
                    
                    <div class="chart-card">
                        <h3>Cost Breakdown by Category</h3>
                        <canvas id="cost-breakdown-chart"></canvas>
                    </div>
                </div>
            </div>
            
            <!-- Other panels -->
            <div class="result-panel" id="implementation-panel">
                <h3>Implementation Timeline</h3>
                <canvas id="implementation-chart"></canvas>
            </div>
            
            <div class="result-panel" id="features-panel">
                <h3>Feature Comparison</h3>
                <canvas id="features-chart"></canvas>
            </div>
            
            <div class="result-panel" id="roi-panel">
                <h3>ROI Analysis</h3>
                <canvas id="roi-chart"></canvas>
            </div>
            
            <div class="result-panel" id="risk-panel">
                <h3>Risk Analysis</h3>
                <canvas id="risk-chart"></canvas>
            </div>
            
            <div class="result-panel" id="sensitivity-panel">
                <h3>Sensitivity Analysis</h3>
                <div id="sensitivity-controls">
                    <!-- Sensitivity controls here -->
                </div>
                <canvas id="sensitivity-chart"></canvas>
            </div>
        `;
    }

    // Load default charts
    setTimeout(() => {
        createDefaultCharts();
    }, 500);
}

// Create default charts
function createDefaultCharts() {
    // TCO Comparison Chart
    const tcoCtx = document.getElementById('tco-comparison-chart');
    if (tcoCtx) {
        new Chart(tcoCtx, {
            type: 'bar',
            data: {
                labels: ['Cisco ISE', 'Portnox Cloud'],
                datasets: [{
                    label: '3-Year TCO',
                    data: [1200000, 775000],
                    backgroundColor: ['#ea4335', '#34a853'],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => `$${value.toLocaleString()}`
                        }
                    }
                }
            }
        });
    }

    // Cost Breakdown Chart
    const breakdownCtx = document.getElementById('cost-breakdown-chart');
    if (breakdownCtx) {
        new Chart(breakdownCtx, {
            type: 'doughnut',
            data: {
                labels: ['Hardware', 'Licensing', 'Implementation', 'Maintenance', 'Personnel'],
                datasets: [{
                    data: [150000, 280000, 125000, 180000, 465000],
                    backgroundColor: [
                        '#1a73e8',
                        '#34a853',
                        '#fbbc04',
                        '#ea4335',
                        '#4285f4'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right' }
                }
            }
        });
    }
}

// Initialize result tabs
function initResultsTabs() {
    const tabs = document.querySelectorAll('.result-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchResultTab(tabName);
        });
    });
}

function switchResultTab(tabName) {
    // Update tabs
    document.querySelectorAll('.result-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    // Update panels
    document.querySelectorAll('.result-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `${tabName}-panel`);
    });
}

// Initialize animations
function initAnimations() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
}

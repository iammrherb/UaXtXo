// Sensitivity Analysis Component
class SensitivityAnalyzer {
    constructor() {
        this.chart = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const runButton = document.getElementById('run-sensitivity');
        if (runButton) {
            runButton.addEventListener('click', () => this.runAnalysis());
        }

        const variable = document.getElementById('sensitivity-variable');
        if (variable) {
            variable.addEventListener('change', () => this.updateRangeDefaults());
        }
    }

    updateRangeDefaults() {
        const variable = document.getElementById('sensitivity-variable').value;
        const minInput = document.getElementById('sensitivity-min');
        const maxInput = document.getElementById('sensitivity-max');

        const defaults = {
            deviceCount: { min: 100, max: 10000 },
            cost: { min: 1, max: 10 },
            fte: { min: 0.1, max: 2.0 },
            implementation: { min: 7, max: 90 }
        };

        if (minInput && maxInput && defaults[variable]) {
            minInput.value = defaults[variable].min;
            maxInput.value = defaults[variable].max;
        }
    }

    async runAnalysis() {
        const variable = document.getElementById('sensitivity-variable').value;
        const minValue = parseFloat(document.getElementById('sensitivity-min').value);
        const maxValue = parseFloat(document.getElementById('sensitivity-max').value);

        if (!variable || isNaN(minValue) || isNaN(maxValue)) {
            if (window.NotificationManager) {
                window.NotificationManager.show('Please fill in all required fields', 'error');
            }
            return;
        }

        if (window.LoadingManager) {
            window.LoadingManager.show('Running sensitivity analysis...');
        }

        // Simulate analysis
        setTimeout(() => {
            const results = this.generateResults(variable, minValue, maxValue);
            this.displayResults(results);
            
            if (window.LoadingManager) {
                window.LoadingManager.hide();
            }
        }, 1500);
    }

    generateResults(variable, minValue, maxValue) {
        const steps = 10;
        const increment = (maxValue - minValue) / steps;
        const results = {
            labels: [],
            currentVendor: [],
            portnox: []
        };

        for (let i = 0; i <= steps; i++) {
            const value = minValue + (increment * i);
            results.labels.push(Math.round(value));
            
            // Simulate cost calculations
            results.currentVendor.push(this.calculateCost('current', variable, value));
            results.portnox.push(this.calculateCost('portnox', variable, value));
        }

        return results;
    }

    calculateCost(vendor, variable, value) {
        // Simulate cost calculation based on variable
        const baseCost = vendor === 'current' ? 1000000 : 600000;
        const multipliers = {
            deviceCount: vendor === 'current' ? 120 : 60,
            cost: vendor === 'current' ? 1000 : 500,
            fte: vendor === 'current' ? 120000 : 40000,
            implementation: vendor === 'current' ? 2000 : 800
        };

        return baseCost + (value * multipliers[variable]);
    }

    displayResults(results) {
        const ctx = document.getElementById('sensitivity-chart');
        if (!ctx) return;

        // Destroy existing chart
        if (this.chart) {
            this.chart.destroy();
        }

        // Create new chart
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: results.labels,
                datasets: [{
                    label: 'Current Solution',
                    data: results.currentVendor,
                    borderColor: '#ea4335',
                    backgroundColor: 'rgba(234, 67, 53, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Portnox Cloud',
                    data: results.portnox,
                    borderColor: '#34a853',
                    backgroundColor: 'rgba(52, 168, 83, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(context.parsed.y);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: this.getAxisLabel(document.getElementById('sensitivity-variable').value)
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Total Cost ($)'
                        },
                        ticks: {
                            callback: function(value) {
                                return new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                }).format(value);
                            }
                        }
                    }
                }
            }
        });
    }

    getAxisLabel(variable) {
        const labels = {
            deviceCount: 'Number of Devices',
            cost: 'Cost per Device ($)',
            fte: 'FTE Requirements',
            implementation: 'Implementation Days'
        };
        return labels[variable] || variable;
    }
}

// Initialize sensitivity analyzer
window.sensitivityAnalyzer = new SensitivityAnalyzer();

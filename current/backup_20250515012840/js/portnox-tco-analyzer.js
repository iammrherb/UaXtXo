/**
 * Portnox Total Cost Analyzer
 * Main JavaScript file to handle all functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeParticles();
    initializeSidebar();
    initializeViewSwitcher();
    initializeResultsTabs();
    initializeTooltips();
    initializeCalculateButtons();
    initializeHelpModal();
    initializeRangeSliders();
    
    // Attempt to initialize charts if libraries are loaded
    setTimeout(initializeCharts, 500);
    
    // Show welcome toast notification
    showToast('Welcome to the Portnox Total Cost Analyzer. Select vendors to compare and adjust parameters as needed.', 'info');
});

// Initialize particle background
function initializeParticles() {
    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#0052CC"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                },
                "opacity": {
                    "value": 0.1,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#0052CC",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.warn("particles.js not loaded");
    }
}

// Initialize sidebar functionality
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const contentArea = document.getElementById('content-area');
    
    if (sidebar && sidebarToggle && contentArea) {
        // Toggle sidebar visibility
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            
            // Adjust content area margin for desktop
            if (window.innerWidth >= 768) {
                if (sidebar.classList.contains('collapsed')) {
                    contentArea.style.marginLeft = '0';
                } else {
                    contentArea.style.marginLeft = '320px';
                }
            }
            
            // Update toggle icon
            const icon = sidebarToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-chevron-left');
                icon.classList.toggle('fa-chevron-right');
            }
            
            // Force chart resize
            window.dispatchEvent(new Event('resize'));
        });
        
        // Toggle config card sections
        const configCards = document.querySelectorAll('.config-card');
        configCards.forEach(card => {
            const header = card.querySelector('.config-card-header');
            const content = card.querySelector('.config-card-content');
            
            if (header && content) {
                header.addEventListener('click', function(e) {
                    // Only toggle if clicking on the header itself, not its children
                    if (e.target === header || e.target === header.querySelector('h3') || e.target === header.querySelector('i')) {
                        content.classList.toggle('collapsed');
                        const icon = header.querySelector('i.fa-chevron-down, i.fa-chevron-up');
                        
                        if (icon) {
                            icon.classList.toggle('fa-chevron-down');
                            icon.classList.toggle('fa-chevron-up');
                        }
                    }
                });
            }
        });
        
        // Initialize vendor selection
        initializeVendorSelection();
    }
}

// Initialize vendor selection
function initializeVendorSelection() {
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(card => {
        card.addEventListener('click', function() {
            const vendor = this.getAttribute('data-vendor');
            
            // Portnox is always selected
            if (vendor === 'portnox') {
                return;
            }
            
            // Toggle selection state
            this.classList.toggle('selected');
            
            // Make sure at least one other vendor is selected besides Portnox
            const selectedVendors = document.querySelectorAll('.vendor-card.selected');
            if (selectedVendors.length < 2) {
                this.classList.add('selected');
            }
        });
    });
}

// Initialize view switcher
function initializeViewSwitcher() {
    const viewButtons = document.querySelectorAll('.view-button');
    const viewPanels = document.querySelectorAll('.view-panel');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Update button states
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update panel visibility
            viewPanels.forEach(panel => {
                if (panel.getAttribute('data-view') === view) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
            
            // Force chart resize
            window.dispatchEvent(new Event('resize'));
        });
    });
}

// Initialize results tabs
function initializeResultsTabs() {
    const resultsTabs = document.querySelectorAll('.results-tab');
    
    resultsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const panel = this.getAttribute('data-panel');
            const viewPanel = this.closest('.view-panel');
            
            // Update tab states
            const siblings = Array.from(this.parentNode.children);
            siblings.forEach(sibling => sibling.classList.remove('active'));
            this.classList.add('active');
            
            // Update panel visibility
            const resultsPanels = viewPanel.querySelectorAll('.results-panel');
            resultsPanels.forEach(resultsPanel => {
                if (resultsPanel.id === panel) {
                    resultsPanel.classList.add('active');
                } else {
                    resultsPanel.classList.remove('active');
                }
            });
            
            // Force chart resize
            window.dispatchEvent(new Event('resize'));
        });
    });
}

// Initialize tooltips
function initializeTooltips() {
    // Get all elements with tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    const tooltipContainer = document.getElementById('tooltip-container') || createTooltipContainer();
    
    tooltipElements.forEach(element => {
        // Show tooltip on hover
        element.addEventListener('mouseenter', function(e) {
            const tooltip = this.getAttribute('data-tooltip');
            showTooltip(tooltip, this);
        });
        
        // Hide tooltip on mouse leave
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
    
    // Create and position tooltip
    function showTooltip(text, element) {
        tooltipContainer.textContent = text;
        tooltipContainer.style.opacity = 1;
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltipContainer.getBoundingClientRect();
        
        // Default position above the element
        let top = rect.top - tooltipRect.height - 10;
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        
        // Reposition if out of bounds
        if (top < 10) {
            // If not enough space above, place below
            top = rect.bottom + 10;
        }
        
        // Adjust horizontal position if needed
        if (left < 10) {
            left = 10;
        } else if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipContainer.style.top = `${top}px`;
        tooltipContainer.style.left = `${left}px`;
    }
    
    // Hide tooltip
    function hideTooltip() {
        tooltipContainer.style.opacity = 0;
    }
    
    // Create tooltip container if it doesn't exist
    function createTooltipContainer() {
        const container = document.createElement('div');
        container.id = 'tooltip-container';
        container.className = 'tooltip-container';
        document.body.appendChild(container);
        return container;
    }
}

// Initialize calculate buttons
function initializeCalculateButtons() {
    const calculateBtn = document.getElementById('calculate-btn');
    const calculateBtnHeader = document.getElementById('calculate-btn-header');
    
    const calculateHandler = function() {
        // Show loading overlay
        showLoading();
        
        // Simulate calculation delay
        setTimeout(function() {
            // Hide loading overlay
            hideLoading();
            
            // Update charts and metrics with calculated values
            updateCalculatedResults();
            
            // Show success message
            showToast('Analysis completed successfully!', 'success');
            
            // Animate results
            animateMetrics();
        }, 1500); // 1.5 second calculation delay
    };
    
    // Add event listeners to both buttons
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateHandler);
    }
    
    if (calculateBtnHeader) {
        calculateBtnHeader.addEventListener('click', calculateHandler);
    }
}

// Initialize help modal
function initializeHelpModal() {
    const helpBtn = document.getElementById('help-btn');
    const helpModal = document.getElementById('help-modal');
    const closeBtn = helpModal?.querySelector('.modal-close');
    
    if (helpBtn && helpModal) {
        // Show modal when clicking help button
        helpBtn.addEventListener('click', function() {
            helpModal.style.display = 'block';
        });
        
        // Close modal when clicking X button
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                helpModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside content
        window.addEventListener('click', function(e) {
            if (e.target === helpModal) {
                helpModal.style.display = 'none';
            }
        });
    }
}

// Initialize range sliders
function initializeRangeSliders() {
    const rangeSliders = document.querySelectorAll('input[type="range"]');
    
    rangeSliders.forEach(slider => {
        const valueId = slider.id + '-value';
        const valueDisplay = document.getElementById(valueId);
        
        if (valueDisplay) {
            // Update value display when slider changes
            slider.addEventListener('input', function() {
                const value = this.value;
                let formattedValue = value;
                
                // Format based on slider ID
                if (this.id.includes('cost')) {
                    formattedValue = '$' + parseInt(value).toLocaleString();
                } else if (this.id.includes('percentage') || this.id.includes('discount') || this.id.includes('allocation') || this.id.includes('reduction')) {
                    formattedValue = value + '%';
                } else if (this.id === 'portnox-base-price') {
                    formattedValue = '$' + parseFloat(value).toFixed(2);
                } else if (this.id.includes('days')) {
                    formattedValue = value + ' days';
                }
                
                valueDisplay.textContent = formattedValue;
            });
        }
    });
}

// Initialize charts
function initializeCharts() {
    // Only proceed if Chart is available
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js is not loaded. Charts will not be initialized.');
        return;
    }
    
    // Initialize main charts
    initializeTcoComparisonChart();
    initializeCumulativeCostChart();
    
    // Additional charts can be initialized here
}

// Initialize TCO comparison chart
function initializeTcoComparisonChart() {
    const chartElement = document.getElementById('tco-comparison-chart');
    if (!chartElement) return;
    
    // Sample data for initial chart
    const data = {
        labels: ['Year 1', 'Year 2', 'Year 3'],
        datasets: [
            {
                label: 'Portnox Cloud',
                backgroundColor: '#36B37E',
                data: [80000, 75000, 75000]
            },
            {
                label: 'Cisco ISE',
                backgroundColor: '#0052CC',
                data: [180000, 120000, 140000]
            }
        ]
    };
    
    // Chart configuration
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            label += '$' + context.parsed.y.toLocaleString();
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    };
    
    // Create chart
    new Chart(chartElement, config);
}

// Initialize cumulative cost chart
function initializeCumulativeCostChart() {
    const chartElement = document.getElementById('cumulative-cost-chart');
    if (!chartElement) return;
    
    // Sample data for initial chart
    const data = {
        labels: ['Initial', 'Month 3', 'Month 6', 'Month 9', 'Year 1', 'Year 2', 'Year 3'],
        datasets: [
            {
                label: 'Portnox Cloud',
                borderColor: '#36B37E',
                backgroundColor: 'rgba(54, 179, 126, 0.1)',
                data: [30000, 50000, 70000, 90000, 110000, 185000, 260000],
                fill: true,
                tension: 0.4
            },
            {
                label: 'Cisco ISE',
                borderColor: '#0052CC',
                backgroundColor: 'rgba(0, 82, 204, 0.1)',
                data: [120000, 150000, 180000, 210000, 240000, 360000, 480000],
                fill: true,
                tension: 0.4
            }
        ]
    };
    
    // Chart configuration
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            label += '$' + context.parsed.y.toLocaleString();
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    };
    
    // Create chart
    new Chart(chartElement, config);
}

// Update calculated results based on form inputs
function updateCalculatedResults() {
    // Get values from form
    const deviceCount = parseInt(document.getElementById('device-count').value) || 500;
    const years = parseInt(document.getElementById('years-to-project').value) || 3;
    const basePrice = parseFloat(document.getElementById('portnox-base-price').value) || 3;
    const discount = parseInt(document.getElementById('portnox-discount').value) || 15;
    
    // Calculate basic values
    const portnoxMonthly = deviceCount * basePrice * (1 - discount / 100);
    const portnoxAnnual = portnoxMonthly * 12;
    const portnoxTotal = portnoxAnnual * years;
    
    // Calculate Cisco TCO (simple estimate for demo)
    const ciscoHardware = deviceCount < 1000 ? 100000 : deviceCount < 5000 ? 200000 : 350000;
    const ciscoSoftware = deviceCount * 120;
    const ciscoMaintenance = (ciscoHardware + ciscoSoftware) * 0.18 * years;
    const ciscoImplementation = deviceCount < 1000 ? 50000 : deviceCount < 5000 ? 100000 : 200000;
    const ciscoTotal = ciscoHardware + ciscoSoftware + ciscoMaintenance + ciscoImplementation;
    
    // Calculate savings
    const savings = ciscoTotal - portnoxTotal;
    const savingsPercentage = Math.round((savings / ciscoTotal) * 100);
    
    // Calculate implementation time
    const portnoxImplementation = deviceCount < 1000 ? 14 : deviceCount < 5000 ? 21 : 30;
    const ciscoImplementationDays = deviceCount < 1000 ? 60 : deviceCount < 5000 ? 90 : 120;
    const implementationSavings = Math.round((1 - portnoxImplementation / ciscoImplementationDays) * 100);
    
    // Update metrics on page
    updateMetric('total-savings', formatCurrency(savings));
    updateMetric('savings-percentage', `${savingsPercentage}% reduction vs. Cisco ISE`);
    updateMetric('portnox-tco', formatCurrency(portnoxTotal));
    updateMetric('tco-comparison', `vs. ${formatCurrency(ciscoTotal)} (Cisco ISE)`);
    updateMetric('implementation-time', `${portnoxImplementation} days`);
    updateMetric('implementation-comparison', `${implementationSavings}% faster than on-premises`);
    
    // Update ROI metrics
    const roi = Math.round((savings / portnoxTotal) * 100);
    updateMetric('three-year-roi', `${roi}%`);
    updateMetric('annual-savings', formatCurrency(savings / years));
    
    // Update payback period (simplified calculation)
    const monthlySavings = savings / (years * 12);
    const initialCost = portnoxAnnual * 0.25; // Assume 3 months upfront
    const paybackMonths = Math.ceil(initialCost / monthlySavings);
    updateMetric('payback-period', `${paybackMonths} months`);
}

// Update a metric element with new value
function updateMetric(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

// Format a number as currency
function formatCurrency(value) {
    return '$' + Math.round(value).toLocaleString();
}

// Animate metrics for visual appeal
function animateMetrics() {
    const metrics = document.querySelectorAll('.metric-value');
    metrics.forEach(metric => {
        // Add fade-in animation
        metric.style.animation = 'none';
        void metric.offsetWidth; // Trigger reflow
        metric.style.animation = 'fadeIn 0.8s ease forwards';
    });
}

// Show loading overlay
function showLoading(message = 'Calculating results...') {
    const loadingOverlay = document.getElementById('loading-overlay');
    const messageElement = loadingOverlay?.querySelector('p');
    
    if (loadingOverlay) {
        if (messageElement) {
            messageElement.textContent = message;
        }
        loadingOverlay.classList.add('active');
    }
}

// Hide loading overlay
function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('active');
    }
}

// Show toast notification
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container') || createToastContainer();
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Set toast content
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${getToastIcon(type)}"></i>
        </div>
        <div class="toast-content">${message}</div>
        <button class="toast-close">&times;</button>
    `;
    
    // Add to container
    container.appendChild(toast);
    
    // Show with animation
    setTimeout(() => {
        toast.classList.add('toast-visible');
    }, 10);
    
    // Auto close after 5 seconds
    const timeout = setTimeout(() => {
        closeToast(toast);
    }, 5000);
    
    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            clearTimeout(timeout);
            closeToast(toast);
        });
    }
    
    return toast;
}

// Close a toast notification
function closeToast(toast) {
    toast.classList.remove('toast-visible');
    toast.classList.add('toast-hidden');
    
    // Remove from DOM after animation
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// Create toast container if it doesn't exist
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// Get icon for toast notification type
function getToastIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'warning': return 'exclamation-triangle';
        case 'error': return 'exclamation-circle';
        case 'info':
        default: return 'info-circle';
    }
}

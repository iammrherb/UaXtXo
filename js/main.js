// NAC Architecture Designer Pro - Main Application
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing NAC Architecture Designer Pro...');
    
    // Initialize particle background
    initParticleBackground();
    
    // Initialize theme
    initTheme();
    
    // Initialize vendor selection
    initVendorSelection();
    
    // Initialize industry selection
    initIndustrySelection();
    
    // Initialize form handlers
    initFormHandlers();
    
    // Initialize cost configuration
    initCostConfiguration();
    
    // Initialize sensitivity analysis
    initSensitivityAnalysis();
    
    // Initialize results tabs
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
                    value: 80,
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
                    value: 0.3,
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
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
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
            
            // Dispatch theme change event
            document.dispatchEvent(new CustomEvent('themeChanged', {
                detail: { theme: isDarkMode ? 'dark' : 'light' }
            }));
        });
    }
}

function updateThemeIcon(isDarkMode) {
    const icon = document.querySelector('#dark-mode-toggle i');
    if (icon) {
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Initialize vendor selection
function initVendorSelection() {
    const vendorCards = document.querySelectorAll('.vendor-card');
    
    vendorCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selection from all cards
            vendorCards.forEach(c => c.classList.remove('selected'));
            
            // Add selection to clicked card
            card.classList.add('selected');
            
            // Update state
            const vendor = card.dataset.vendor;
            stateManager.setCurrentVendor(vendor);
            
            // Show vendor preview
            updateVendorPreview(vendor);
            
            // Enable next button
            updateNavigationState();
        });
    });
}

function updateVendorPreview(vendor) {
    const preview = document.getElementById('vendor-preview');
    if (!preview) return;
    
    const vendorData = VendorData.getVendor(vendor);
    if (!vendorData) return;
    
    preview.innerHTML = `
        <div class="vendor-preview">
            <h4>${vendorData.name}</h4>
            <p>${vendorData.description}</p>
            <div class="vendor-metrics">
                <div class="metric">
                    <span class="metric-label">Implementation Time</span>
                    <span class="metric-value">${Object.values(vendorData.implementation).reduce((a, b) => a + b, 0)} days</span>
                </div>
                <div class="metric">
                    <span class="metric-label">License Cost</span>
                    <span class="metric-value">$${vendorData.costs.licensing}/device/year</span>
                </div>
                <div class="metric">
                    <span class="metric-label">FTE Required</span>
                    <span class="metric-value">${vendorData.costs.fte}</span>
                </div>
            </div>
        </div>
    `;
    
    // Animate preview
    gsap.from(preview, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out'
    });
}

// Initialize industry selection
function initIndustrySelection() {
    const industrySelect = document.getElementById('industry-select');
    if (!industrySelect) return;
    
    industrySelect.addEventListener('change', (e) => {
        const industry = e.target.value;
        if (!industry) return;
        
        stateManager.setIndustry(industry);
        updateComplianceFrameworks(industry);
        updateIndustryInsights(industry);
        updateNavigationState();
    });
}

function updateComplianceFrameworks(industry) {
    const container = document.getElementById('compliance-frameworks');
    if (!container) return;
    
    // Mock compliance data
    const frameworks = {
        healthcare: ['HIPAA', 'HITECH', 'FDA 21 CFR Part 11'],
        financial: ['PCI DSS', 'SOX', 'GLBA', 'FINRA'],
        education: ['FERPA', 'COPPA', 'CIPA'],
        government: ['FISMA', 'FedRAMP', 'NIST 800-53'],
        manufacturing: ['ISO 27001', 'NIST CSF', 'IEC 62443'],
        retail: ['PCI DSS', 'CCPA', 'GDPR'],
        technology: ['SOC 2', 'ISO 27001', 'GDPR'],
        energy: ['NERC CIP', 'ISO 27001', 'NIST CSF']
    };
    
    const industryFrameworks = frameworks[industry] || [];
    
    container.innerHTML = `
        <h3>Compliance Requirements</h3>
        <div class="frameworks-grid">
            ${industryFrameworks.map(framework => `
                <div class="framework-card">
                    <i class="fas fa-shield-alt"></i>
                    <span>${framework}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    // Animate frameworks
    const cards = container.querySelectorAll('.framework-card');
    gsap.from(cards, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
    });
}

function updateIndustryInsights(industry) {
    const container = document.getElementById('industry-insights');
    if (!container) return;
    
    // Mock insights data
    const insights = {
        healthcare: {
            avgBreachCost: '$10.93M',
            compliancePenalty: '$1.5M average',
            adoptionRate: '67%',
            challenges: ['Medical device security', 'PHI protection', 'Remote access']
        },
        financial: {
            avgBreachCost: '$5.85M',
            compliancePenalty: '$2.5M average',
            adoptionRate: '82%',
            challenges: ['Transaction security', 'Customer data protection', 'Regulatory compliance']
        }
        // Add more industries...
    };
    
    const industryData = insights[industry] || {
        avgBreachCost: '$4.45M',
        compliancePenalty: '$500K average',
        adoptionRate: '45%',
        challenges: ['Network security', 'Access control', 'Compliance']
    };
    
    container.innerHTML = `
        <h3>Industry Insights</h3>
        <div class="insights-grid">
            <div class="insight-card">
                <i class="fas fa-dollar-sign"></i>
                <div class="insight-content">
                    <h4>Average Breach Cost</h4>
                    <p>${industryData.avgBreachCost}</p>
                </div>
            </div>
            <div class="insight-card">
                <i class="fas fa-gavel"></i>
                <div class="insight-content">
                    <h4>Compliance Penalties</h4>
                    <p>${industryData.compliancePenalty}</p>
                </div>
            </div>
            <div class="insight-card">
                <i class="fas fa-chart-line"></i>
                <div class="insight-content">
                    <h4>NAC Adoption Rate</h4>
                    <p>${industryData.adoptionRate}</p>
                </div>
            </div>
        </div>
        <div class="challenges-section">
            <h4>Key Challenges</h4>
            <ul>
                ${industryData.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
            </ul>
        </div>
    `;
}

// Initialize form handlers
function initFormHandlers() {
    // Organization size handler
    const orgSize = document.getElementById('organization-size');
    if (orgSize) {
        orgSize.addEventListener('change', updateDeviceCountRange);
    }
    
    // Device count handler
    const deviceCount = document.getElementById('device-count');
    if (deviceCount) {
        deviceCount.addEventListener('input', updateDeviceCountDisplay);
    }
    
    // Checkbox handlers
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateFormState);
    });
    
    // Initialize form state
    updateFormState();
}

function updateDeviceCountRange(e) {
    const size = e.target.value;
    const deviceCount = document.getElementById('device-count');
    
    const ranges = {
        small: { min: 100, max: 1000, default: 500 },
        medium: { min: 1000, max: 5000, default: 2500 },
        large: { min: 5000, max: 10000, default: 7500 },
        enterprise: { min: 10000, max: 100000, default: 25000 }
    };
    
    if (deviceCount && ranges[size]) {
        deviceCount.min = ranges[size].min;
        deviceCount.max = ranges[size].max;
        deviceCount.value = ranges[size].default;
        updateDeviceCountDisplay();
    }
}

function updateDeviceCountDisplay() {
    const deviceCount = document.getElementById('device-count');
    if (deviceCount) {
        const value = parseInt(deviceCount.value);
        // Update display with formatted number
    }
}

function updateFormState() {
    if (!window.wizardManager) { window.wizardManager = new WizardManager(); }
    const orgData = wizardManager.getOrganizationData();
    stateManager.setOrganization(orgData);
    updateNavigationState();
}

// Initialize cost configuration
function initCostConfiguration() {
    // Cost tabs
    const costTabs = document.querySelectorAll('.cost-tab');
    costTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchCostTab(tabName);
        });
    });
    
    // Range sliders
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        slider.addEventListener('input', updateSliderValue);
    });
    
    // Portnox pricing updates
    const portnoxPrice = document.getElementById('portnox-base-price');
    const portnoxDiscount = document.getElementById('portnox-discount');
    
    if (portnoxPrice) {
        portnoxPrice.addEventListener('input', updatePortnoxPricing);
    }
    
    if (portnoxDiscount) {
        portnoxDiscount.addEventListener('input', updatePortnoxPricing);
    }
}

function switchCostTab(tabName) {
    // Update tabs
    document.querySelectorAll('.cost-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    // Update panels
    document.querySelectorAll('.cost-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `${tabName}-costs`);
    });
}

function updateSliderValue(e) {
    const slider = e.target;
    const valueDisplay = slider.parentElement.querySelector('.slider-value');
    
    if (valueDisplay) {
        let value = slider.value;
        
        // Format based on slider type
        if (slider.id.includes('cost') || slider.id.includes('rate')) {
            value = `$${parseInt(value).toLocaleString()}`;
        } else if (slider.id.includes('percentage') || slider.id.includes('allocation')) {
            value = `${value}%`;
        } else if (slider.id.includes('days')) {
            value = `${value} days`;
        }
        
        valueDisplay.textContent = value;
    }
    
    // Update state
    const costData = wizardManager.getCostData();
    stateManager.setCosts(costData);
}

function updatePortnoxPricing() {
    const basePrice = parseFloat(document.getElementById('portnox-base-price')?.value || 4);
    const discount = parseInt(document.getElementById('portnox-discount')?.value || 0);
    const deviceCount = parseInt(document.getElementById('device-count')?.value || 1000);
    
    const effectivePrice = basePrice * (1 - discount / 100);
    const annualCost = effectivePrice * deviceCount * 12;
    
    document.getElementById('effective-price').textContent = `$${effectivePrice.toFixed(2)}`;
    document.getElementById('annual-cost').textContent = `$${annualCost.toLocaleString()}`;
}

// Initialize sensitivity analysis
function initSensitivityAnalysis() {
    const sensitivityToggle = document.getElementById('sensitivity-toggle');
    const sensitivitySidebar = document.getElementById('sensitivity-sidebar');
    const closeSensitivity = document.getElementById('close-sensitivity');
    
    if (sensitivityToggle && sensitivitySidebar) {
        sensitivityToggle.addEventListener('click', () => {
            sensitivitySidebar.classList.add('active');
        });
    }
    
    if (closeSensitivity) {
        closeSensitivity.addEventListener('click', () => {
            sensitivitySidebar.classList.remove('active');
        });
    }
    
    // Run sensitivity analysis
    const runSensitivity = document.getElementById('run-sensitivity');
    if (runSensitivity) {
        runSensitivity.addEventListener('click', performSensitivityAnalysis);
    }
}

function performSensitivityAnalysis() {
    const variable = document.getElementById('sensitivity-variable').value;
    const minValue = parseFloat(document.getElementById('sensitivity-min').value);
    const maxValue = parseFloat(document.getElementById('sensitivity-max').value);
    
    LoadingManager.show('Running sensitivity analysis...');
    
    // Simulate analysis
    setTimeout(() => {
        LoadingManager.hide();
        displaySensitivityResults();
    }, 1500);
}

function displaySensitivityResults() {
    const ctx = document.getElementById('sensitivity-chart');
    if (!ctx) return;
    
    // Generate sample data
    const labels = [];
    const currentData = [];
    const portnoxData = [];
    
    for (let i = 100; i <= 5000; i += 500) {
        labels.push(i);
        currentData.push(Math.floor(i * 350 + Math.random() * 50000));
        portnoxData.push(Math.floor(i * 200 + Math.random() * 30000));
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Current Solution',
                data: currentData,
                borderColor: '#ea4335',
                backgroundColor: 'rgba(234, 67, 53, 0.1)',
                fill: true
            }, {
                label: 'Portnox Cloud',
                data: portnoxData,
                borderColor: '#34a853',
                backgroundColor: 'rgba(52, 168, 83, 0.1)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Device Count'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Total Cost ($)'
                    },
                    ticks: {
                        callback: value => `$${value.toLocaleString()}`
                    }
                }
            }
        }
    });
}

// Initialize results tabs
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
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
    
    // Initialize GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate cards on scroll
        gsap.utils.toArray('.animate-card').forEach(card => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%'
                }
            });
        });
    }
}

// Navigation state management
function updateNavigationState() {
    const nextBtn = document.getElementById('next-step');
    if (nextBtn) {
        nextBtn.disabled = !wizardManager.validateCurrentStep();
    }
}

// Initialize wizard manager if not already initialized
if (!window.wizardManager) {
    window.wizardManager = new WizardManager();
}

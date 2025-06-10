// Main Platform Application
class PortnoxPlatform {
    constructor() {
        this.eventSystem = null;
        this.configManager = null;
        this.vendorDatabase = null;
        this.state = {
            currentSection: 'dashboard',
            organization: {},
            devices: {},
            analysis: {}
        };
    }
    
    async initialize() {
        console.log('🌟 Initializing Portnox Platform...');
        
        // Initialize all modules
        ModuleLoader.initializeAll();
        
        // Get module instances
        this.eventSystem = ModuleLoader.get('EventSystem');
        this.configManager = ModuleLoader.get('ConfigManager');
        this.vendorDatabase = ModuleLoader.get('VendorDatabase');
        
        if (!this.eventSystem || !this.configManager || !this.vendorDatabase) {
            console.error('❌ Failed to initialize core modules');
            return false;
        }
        
        console.log('✅ All modules initialized successfully');
        
        // Setup UI
        this.setupEventListeners();
        this.updateDashboard();
        
        return true;
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.navigateToSection(section);
            });
        });
        
        // Buttons
        const startBtn = document.getElementById('startAssessment');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startAssessment());
        }
        
        const nextBtns = document.querySelectorAll('.btn-next');
        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.target;
                this.nextStep(target);
            });
        });
        
        // Device counters
        document.querySelectorAll('.device-increment').forEach(btn => {
            btn.addEventListener('click', () => {
                const device = btn.dataset.device;
                this.incrementDevice(device);
            });
        });
        
        document.querySelectorAll('.device-decrement').forEach(btn => {
            btn.addEventListener('click', () => {
                const device = btn.dataset.device;
                this.decrementDevice(device);
            });
        });
    }
    
    navigateToSection(section) {
        // Update nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === section) {
                item.classList.add('active');
            }
        });
        
        // Update content
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
        });
        
        const targetSection = document.getElementById(section);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        this.state.currentSection = section;
        
        // Special handling
        if (section === 'tco') {
            this.calculateTCO();
        }
        
        // Emit event
        if (this.eventSystem) {
            this.eventSystem.emit('navigation', { section });
        }
    }
    
    startAssessment() {
        this.navigateToSection('organization');
    }
    
    nextStep(target) {
        this.saveCurrentSection();
        this.navigateToSection(target);
        this.showNotification('Progress saved', 'success');
    }
    
    saveCurrentSection() {
        switch (this.state.currentSection) {
            case 'organization':
                this.state.organization = {
                    name: document.getElementById('companyName')?.value || '',
                    industry: document.getElementById('industry')?.value || '',
                    employees: document.getElementById('employees')?.value || '',
                    locations: document.getElementById('locations')?.value || ''
                };
                break;
            case 'scoping':
                const devices = ['windows', 'mac', 'linux', 'mobile', 'iot', 'printers'];
                devices.forEach(device => {
                    const input = document.getElementById(`${device}-count`);
                    if (input) {
                        this.state.devices[device] = parseInt(input.value) || 0;
                    }
                });
                break;
        }
        
        // Save to localStorage
        localStorage.setItem('portnoxState', JSON.stringify(this.state));
    }
    
    incrementDevice(device) {
        const input = document.getElementById(`${device}-count`);
        if (input) {
            input.value = parseInt(input.value) + 1;
            this.updateDeviceTotal();
        }
    }
    
    decrementDevice(device) {
        const input = document.getElementById(`${device}-count`);
        if (input && parseInt(input.value) > 0) {
            input.value = parseInt(input.value) - 1;
            this.updateDeviceTotal();
        }
    }
    
    updateDeviceTotal() {
        const devices = ['windows', 'mac', 'linux', 'mobile', 'iot', 'printers'];
        let total = 0;
        
        devices.forEach(device => {
            const input = document.getElementById(`${device}-count`);
            if (input) {
                total += parseInt(input.value) || 0;
            }
        });
        
        const totalElement = document.getElementById('totalDevices');
        if (totalElement) {
            totalElement.textContent = total;
        }
    }
    
    calculateTCO() {
        const totalDevices = Object.values(this.state.devices).reduce((a, b) => a + b, 0);
        
        if (totalDevices === 0) {
            this.showNotification('Please add devices first', 'warning');
            return;
        }
        
        // Calculate for all vendors
        const vendors = this.vendorDatabase.getAll();
        const results = {};
        
        for (const [vendorId, vendor] of Object.entries(vendors)) {
            results[vendorId] = this.vendorDatabase.calculateTCO(vendorId, totalDevices);
        }
        
        this.state.analysis = results;
        this.updateTCODisplay();
    }
    
    updateTCODisplay() {
        const tbody = document.getElementById('tcoTableBody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        // Sort by total TCO
        const sorted = Object.entries(this.state.analysis)
            .sort((a, b) => a[1].total - b[1].total);
        
        sorted.forEach(([vendorId, tco]) => {
            const vendor = this.vendorDatabase.get(vendorId);
            const row = document.createElement('tr');
            
            if (vendorId === 'portnox') {
                row.classList.add('vendor-highlight');
            }
            
            row.innerHTML = `
                <td>${vendor.logo} ${vendor.name}</td>
                <td>$${tco.licensing.toLocaleString()}</td>
                <td>$${tco.hardware.toLocaleString()}</td>
                <td>$${tco.implementation.toLocaleString()}</td>
                <td>$${tco.operations.toLocaleString()}</td>
                <td><strong>$${tco.total.toLocaleString()}</strong></td>
            `;
            
            tbody.appendChild(row);
        });
        
        // Update metrics
        this.updateMetrics();
    }
    
    updateMetrics() {
        const portnox = this.state.analysis.portnox;
        const cisco = this.state.analysis.cisco_ise;
        
        if (portnox && cisco) {
            const savings = cisco.total - portnox.total;
            const savingsPercent = (savings / cisco.total * 100).toFixed(0);
            
            // Update dashboard metrics
            const savingsElement = document.querySelector('.metric-value');
            if (savingsElement) {
                savingsElement.textContent = `$${(savings/1000).toFixed(0)}K`;
            }
        }
    }
    
    updateDashboard() {
        // Load saved state
        const saved = localStorage.getItem('portnoxState');
        if (saved) {
            this.state = JSON.parse(saved);
        }
        
        // Update device total
        this.updateDeviceTotal();
    }
    
    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.className = `notification show ${type}`;
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌟 DOM Ready - Starting platform initialization...');
    
    window.platform = new PortnoxPlatform();
    const initialized = await window.platform.initialize();
    
    if (initialized) {
        console.log('✅ Platform fully initialized and ready!');
    } else {
        console.error('❌ Platform initialization failed');
    }
});

// Main Platform Application
class PortnoxPlatform {
    constructor() {
        this.modules = {};
        this.state = {
            currentSection: 'dashboard',
            organization: {},
            devices: {},
            infrastructure: {},
            compliance: [],
            analysis: {},
            selectedVendors: ['portnox', 'cisco_ise', 'aruba_clearpass', 'forescout']
        };
        this.initialized = false;
    }
    
    async initialize() {
        console.log('🌟 Initializing Portnox Ultimate Platform...');
        
        try {
            // Initialize all modules
            ModuleLoader.initializeAll();
            
            // Get module instances
            this.modules = {
                eventSystem: ModuleLoader.get('EventSystem'),
                configManager: ModuleLoader.get('ConfigManager'),
                vendorDatabase: ModuleLoader.get('VendorDatabase'),
                industryDatabase: ModuleLoader.get('IndustryDatabase'),
                complianceDatabase: ModuleLoader.get('ComplianceDatabase')
            };
            
            // Verify all modules loaded
            const missingModules = [];
            Object.entries(this.modules).forEach(([name, module]) => {
                if (!module) {
                    missingModules.push(name);
                }
            });
            
            if (missingModules.length > 0) {
                throw new Error(`Failed to load modules: ${missingModules.join(', ')}`);
            }
            
            console.log('✅ All modules loaded successfully');
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Load saved state
            this.loadState();
            
            // Update UI
            this.updateDashboard();
            
            // Setup auto-save
            if (this.modules.configManager.get('features.autoSave')) {
                setInterval(() => this.saveState(), 30000);
            }
            
            this.initialized = true;
            console.log('✅ Platform fully initialized!');
            
            return true;
            
        } catch (error) {
            console.error('❌ Platform initialization failed:', error);
            this.showError('Platform initialization failed. Please refresh the page.');
            return false;
        }
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
        
        const saveBtn = document.getElementById('saveProgress');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveState());
        }
        
        const exportBtn = document.getElementById('exportReport');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportReport());
        }
        
        // Form inputs
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('change', () => this.handleInputChange(input));
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
        
        // Vendor selection
        document.querySelectorAll('.vendor-select').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateSelectedVendors());
        });
        
        // Listen to module events
        if (this.modules.eventSystem) {
            this.modules.eventSystem.on('config:changed', (data) => {
                console.log('Config changed:', data);
            });
        }
    }
    
    navigateToSection(section) {
        // Update navigation
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
        
        // Section-specific logic
        switch (section) {
            case 'tco':
                this.calculateTCO();
                break;
            case 'roi':
                this.calculateROI();
                break;
            case 'compliance':
                this.updateComplianceView();
                break;
            case 'vendors':
                this.updateVendorComparison();
                break;
            case 'timeline':
                this.updateTimeline();
                break;
        }
        
        // Emit navigation event
        if (this.modules.eventSystem) {
            this.modules.eventSystem.emit('navigation', { section });
        }
    }
    
    startAssessment() {
        this.navigateToSection('organization');
        this.updateProgress('organization');
    }
    
    handleInputChange(input) {
        const section = input.closest('.content-section')?.id;
        
        switch (section) {
            case 'organization':
                this.updateOrganizationData(input);
                break;
            case 'scoping':
                this.updateScopingData(input);
                break;
        }
        
        // Auto-save if enabled
        if (this.modules.configManager?.get('features.autoSave')) {
            this.saveState();
        }
    }
    
    updateOrganizationData(input) {
        const field = input.id;
        const value = input.type === 'checkbox' ? input.checked : input.value;
        
        if (field === 'compliance') {
            if (!this.state.compliance) this.state.compliance = [];
            if (input.checked) {
                this.state.compliance.push(value);
            } else {
                this.state.compliance = this.state.compliance.filter(c => c !== value);
            }
        } else {
            this.state.organization[field] = value;
        }
    }
    
    updateScopingData(input) {
        const field = input.id;
        const value = input.value;
        
        if (field.includes('-count')) {
            const device = field.replace('-count', '');
            this.state.devices[device] = parseInt(value) || 0;
            this.updateDeviceTotal();
        } else {
            this.state.infrastructure[field] = value;
        }
    }
    
    incrementDevice(device) {
        const input = document.getElementById(`${device}-count`);
        if (input) {
            input.value = parseInt(input.value) + 1;
            this.state.devices[device] = parseInt(input.value);
            this.updateDeviceTotal();
        }
    }
    
    decrementDevice(device) {
        const input = document.getElementById(`${device}-count`);
        if (input && parseInt(input.value) > 0) {
            input.value = parseInt(input.value) - 1;
            this.state.devices[device] = parseInt(input.value);
            this.updateDeviceTotal();
        }
    }
    
    updateDeviceTotal() {
        const total = Object.values(this.state.devices).reduce((sum, count) => sum + (count || 0), 0);
        
        const totalElement = document.getElementById('totalDevices');
        if (totalElement) {
            totalElement.textContent = total.toLocaleString();
        }
        
        // Update dashboard metrics
        this.updateDashboardMetrics(total);
    }
    
    updateDashboardMetrics(deviceCount) {
        if (!deviceCount || !this.modules.vendorDatabase) return;
        
        // Calculate quick metrics
        const portnoxTCO = this.modules.vendorDatabase.calculateTCO('portnox', deviceCount, 3);
        const ciscoTCO = this.modules.vendorDatabase.calculateTCO('cisco_ise', deviceCount, 3);
        
        if (portnoxTCO && ciscoTCO) {
            const savings = ciscoTCO.costs.total - portnoxTCO.costs.total;
            const savingsPercent = Math.round((savings / ciscoTCO.costs.total) * 100);
            
            // Update metric cards
            const savingsElement = document.querySelector('[data-metric="savings"]');
            if (savingsElement) {
                savingsElement.textContent = `$${(savings / 1000).toFixed(0)}K`;
            }
            
            const percentElement = document.querySelector('[data-metric="reduction"]');
            if (percentElement) {
                percentElement.textContent = `${savingsPercent}%`;
            }
        }
    }
    
    calculateTCO() {
        const totalDevices = Object.values(this.state.devices).reduce((sum, count) => sum + (count || 0), 0);
        
        if (totalDevices === 0) {
            this.showNotification('Please add devices first', 'warning');
            return;
        }
        
        if (!this.modules.vendorDatabase) {
            this.showError('Vendor database not loaded');
            return;
        }
        
        // Calculate TCO for selected vendors
        const results = {};
        this.state.selectedVendors.forEach(vendorId => {
            results[vendorId] = this.modules.vendorDatabase.calculateTCO(vendorId, totalDevices, 3);
        });
        
        this.state.analysis.tco = results;
        this.updateTCODisplay();
    }
    
    updateTCODisplay() {
        const tbody = document.getElementById('tcoTableBody');
        if (!tbody || !this.state.analysis.tco) return;
        
        tbody.innerHTML = '';
        
        // Sort by total cost
        const sorted = Object.entries(this.state.analysis.tco)
            .filter(([_, tco]) => tco !== null)
            .sort((a, b) => a[1].costs.total - b[1].costs.total);
        
        sorted.forEach(([vendorId, tco]) => {
            const vendor = this.modules.vendorDatabase.get(vendorId);
            if (!vendor) return;
            
            const row = document.createElement('tr');
            if (vendorId === 'portnox') {
                row.classList.add('vendor-highlight');
            }
            
            row.innerHTML = `
                <td>${vendor.logo} ${vendor.name}</td>
                <td>$${tco.costs.licensing.toLocaleString()}</td>
                <td>$${tco.costs.hardware.toLocaleString()}</td>
                <td>$${tco.costs.implementation.toLocaleString()}</td>
                <td>$${tco.costs.operations.toLocaleString()}</td>
                <td><strong>$${tco.costs.total.toLocaleString()}</strong></td>
            `;
            
            tbody.appendChild(row);
        });
        
        // Update summary metrics
        this.updateTCOMetrics();
    }
    
    updateTCOMetrics() {
        if (!this.state.analysis.tco) return;
        
        const portnox = this.state.analysis.tco.portnox;
        const others = Object.entries(this.state.analysis.tco)
            .filter(([id, _]) => id !== 'portnox')
            .map(([_, tco]) => tco);
        
        if (!portnox || others.length === 0) return;
        
        // Find highest cost vendor
        const highest = others.reduce((max, tco) => 
            tco.costs.total > max.costs.total ? tco : max
        );
        
        const savings = highest.costs.total - portnox.costs.total;
        const savingsPercent = Math.round((savings / highest.costs.total) * 100);
        
        // Update metric displays
        document.getElementById('totalSavings').textContent = `$${(savings / 1000).toFixed(0)}K`;
        document.getElementById('costReduction').textContent = `${savingsPercent}%`;
        document.getElementById('costPerDevice').textContent = `$${portnox.metrics.costPerDeviceYear}`;
        document.getElementById('fteSavings').textContent = 
            `${(highest.metrics.fteRequired - portnox.metrics.fteRequired).toFixed(2)} FTE`;
    }
    
    calculateROI() {
        // Implement ROI calculation logic
        console.log('Calculating ROI...');
    }
    
    updateComplianceView() {
        // Update compliance view with selected frameworks
        console.log('Updating compliance view...');
    }
    
    updateVendorComparison() {
        // Update vendor comparison view
        console.log('Updating vendor comparison...');
    }
    
    updateTimeline() {
        // Update implementation timeline
        console.log('Updating timeline...');
    }
    
    updateProgress(step) {
        // Update workflow progress indicators
        document.querySelectorAll('.workflow-step').forEach(ws => {
            ws.classList.remove('active', 'completed');
            const wsStep = ws.dataset.step;
            if (wsStep === step) {
                ws.classList.add('active');
            } else if (this.state.progress?.[wsStep]) {
                ws.classList.add('completed');
            }
        });
    }
    
    updateDashboard() {
        // Update device total
        this.updateDeviceTotal();
        
        // Update other dashboard elements
        const orgName = this.state.organization?.companyName;
        if (orgName) {
            const nameDisplay = document.getElementById('dashboardOrgName');
            if (nameDisplay) {
                nameDisplay.textContent = orgName;
            }
        }
    }
    
    saveState() {
        try {
            localStorage.setItem('portnoxPlatformState', JSON.stringify(this.state));
            this.showNotification('Progress saved', 'success');
        } catch (error) {
            console.error('Error saving state:', error);
            this.showError('Failed to save progress');
        }
    }
    
    loadState() {
        try {
            const saved = localStorage.getItem('portnoxPlatformState');
            if (saved) {
                this.state = JSON.parse(saved);
                this.restoreFormData();
                console.log('State loaded from storage');
            }
        } catch (error) {
            console.error('Error loading state:', error);
        }
    }
    
    restoreFormData() {
        // Restore organization data
        if (this.state.organization) {
            Object.entries(this.state.organization).forEach(([field, value]) => {
                const input = document.getElementById(field);
                if (input) {
                    input.value = value;
                }
            });
        }
        
        // Restore device counts
        if (this.state.devices) {
            Object.entries(this.state.devices).forEach(([device, count]) => {
                const input = document.getElementById(`${device}-count`);
                if (input) {
                    input.value = count || 0;
                }
            });
        }
        
        // Restore compliance selections
        if (this.state.compliance) {
            this.state.compliance.forEach(framework => {
                const checkbox = document.querySelector(`input[value="${framework}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
    }
    
    exportReport() {
        console.log('Exporting comprehensive report...');
        // Implement report export
        this.showNotification('Report generation started...', 'info');
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
    
    showError(message) {
        this.showNotification(message, 'error');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌟 DOM Ready - Starting platform initialization...');
    
    // Create global platform instance
    window.platform = new PortnoxPlatform();
    
    // Initialize platform
    const initialized = await window.platform.initialize();
    
    if (initialized) {
        console.log('✅ Portnox Ultimate Platform ready!');
    } else {
        console.error('❌ Failed to initialize platform');
    }
});

// Export for module access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortnoxPlatform;
}

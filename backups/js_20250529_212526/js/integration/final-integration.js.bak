/**
 * Final Integration Script
 * Ensures all components work together seamlessly
 */

class FinalIntegration {
    constructor() {
        this.componentsReady = {
            platform: false,
            enhancedUI: false,
            advancedContent: false,
            dataExport: false
        };
    }
    
    init() {
        console.log('🚀 Starting final integration...');
        
        this.checkComponents();
        this.setupGlobalHandlers();
        this.enhanceExportFunctionality();
        this.addKeyboardShortcuts();
        this.setupAutoSave();
        
        console.log('✅ Final integration complete');
    }
    
    checkComponents() {
        const checkInterval = setInterval(() => {
            this.componentsReady.platform = window.zeroTrustExecutivePlatform?.initialized || false;
            this.componentsReady.enhancedUI = window.enhancedUI !== undefined;
            this.componentsReady.advancedContent = window.advancedTabContent !== null;
            this.componentsReady.dataExport = window.dataExport !== null;
            
            const allReady = Object.values(this.componentsReady).every(status => status === true);
            
            if (allReady) {
                clearInterval(checkInterval);
                console.log('✅ All components ready:', this.componentsReady);
                this.performFinalSetup();
            }
        }, 100);
    }
    
    performFinalSetup() {
        // Enhance the export button
        const exportBtn = document.getElementById('export-executive');
        if (exportBtn) {
            exportBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showExportOptions();
            });
        }
        
        // Add refresh functionality
        this.setupRefreshFunctionality();
        
        // Initialize tooltips
        this.initializeTooltips();
        
        // Setup responsive handlers
        this.setupResponsiveHandlers();
    }
    
    showExportOptions() {
        const modal = document.createElement('div');
        modal.className = 'export-modal';
        modal.innerHTML = `
            <div class="export-modal-content">
                <h3>Select Export Format</h3>
                <div class="export-options">
                    <button class="export-option" data-format="excel">
                        <i class="fas fa-file-excel"></i>
                        <span>Excel Workbook</span>
                        <small>Detailed data analysis</small>
                    </button>
                    <button class="export-option" data-format="pdf">
                        <i class="fas fa-file-pdf"></i>
                        <span>PDF Report</span>
                        <small>Executive presentation</small>
                    </button>
                    <button class="export-option" data-format="powerpoint">
                        <i class="fas fa-file-powerpoint"></i>
                        <span>PowerPoint</span>
                        <small>Board presentation</small>
                    </button>
                </div>
                <button class="close-modal">Cancel</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .export-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            }
            
            .export-modal-content {
                background: #1a1a2e;
                border-radius: 12px;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            }
            
            .export-modal-content h3 {
                color: white;
                margin-bottom: 1.5rem;
                text-align: center;
            }
            
            .export-options {
                display: grid;
                gap: 1rem;
                margin-bottom: 1.5rem;
            }
            
            .export-option {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .export-option:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: #1a5a96;
                transform: translateY(-2px);
            }
            
            .export-option i {
                font-size: 1.5rem;
            }
            
            .export-option span {
                font-weight: 600;
            }
            
            .export-option small {
                display: block;
                color: rgba(255, 255, 255, 0.7);
                font-size: 0.875rem;
            }
            
            .close-modal {
                width: 100%;
                padding: 0.75rem;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                color: white;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
        
        // Handle export selection
        modal.querySelectorAll('.export-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const format = btn.dataset.format;
                this.handleExport(format);
                document.body.removeChild(modal);
            });
        });
        
        // Handle close
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    handleExport(format) {
        if (!window.dataExport) {
            console.error('Export module not ready');
            return;
        }
        
        switch (format) {
            case 'excel':
                window.dataExport.exportToExcel();
                break;
            case 'pdf':
                window.dataExport.exportToPDF();
                break;
            case 'powerpoint':
                window.dataExport.exportToPowerPoint();
                break;
        }
        
        // Show success notification
        if (window.zeroTrustExecutivePlatform) {
            window.zeroTrustExecutivePlatform.showNotification(
                `Exporting ${format.toUpperCase()} report...`, 
                'success'
            );
        }
    }
    
    setupRefreshFunctionality() {
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                console.log('🔄 Refreshing analysis...');
                
                // Recalculate all data
                if (window.zeroTrustExecutivePlatform) {
                    window.zeroTrustExecutivePlatform.performCalculations();
                }
                
                // Show notification
                if (window.zeroTrustExecutivePlatform) {
                    window.zeroTrustExecutivePlatform.showNotification(
                        'Analysis refreshed successfully!', 
                        'success'
                    );
                }
            });
        }
    }
    
    enhanceExportFunctionality() {
        // Override platform export method
        if (window.zeroTrustExecutivePlatform) {
            window.zeroTrustExecutivePlatform.exportReport = () => {
                this.showExportOptions();
            };
        }
    }
    
    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + E for export
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                this.showExportOptions();
            }
            
            // Ctrl/Cmd + R for refresh
            if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
                e.preventDefault();
                document.getElementById('refresh-btn')?.click();
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                const modal = document.querySelector('.export-modal');
                if (modal) {
                    document.body.removeChild(modal);
                }
            }
        });
    }
    
    setupAutoSave() {
        // Save configuration to localStorage every 30 seconds
        setInterval(() => {
            if (window.zeroTrustExecutivePlatform) {
                const config = {
                    selectedVendors: window.zeroTrustExecutivePlatform.selectedVendors,
                    configuration: window.zeroTrustExecutivePlatform.config,
                    timestamp: Date.now()
                };
                
                localStorage.setItem('zerotrust-analysis-config', JSON.stringify(config));
            }
        }, 30000);
        
        // Load saved configuration on startup
        const savedConfig = localStorage.getItem('zerotrust-analysis-config');
        if (savedConfig && window.zeroTrustExecutivePlatform) {
            try {
                const config = JSON.parse(savedConfig);
                console.log('📂 Loaded saved configuration from', new Date(config.timestamp));
            } catch (e) {
                console.error('Failed to load saved configuration:', e);
            }
        }
    }
    
    initializeTooltips() {
        // Add helpful tooltips
        const tooltips = [
            {
                selector: '#calculate-btn',
                text: 'Run comprehensive analysis with current parameters'
            },
            {
                selector: '#export-executive',
                text: 'Export analysis in multiple formats'
            },
            {
                selector: '#reset-analysis',
                text: 'Reset all parameters to defaults'
            },
            {
                selector: '.vendor-select-card',
                text: 'Click to include/exclude vendor from comparison'
            }
        ];
        
        tooltips.forEach(tooltip => {
            const elements = document.querySelectorAll(tooltip.selector);
            elements.forEach(el => {
                el.setAttribute('data-tooltip', tooltip.text);
            });
        });
    }
    
    setupResponsiveHandlers() {
        // Handle responsive layout changes
        const handleResize = () => {
            const width = window.innerWidth;
            
            if (width < 768) {
                document.body.classList.add('mobile-view');
            } else {
                document.body.classList.remove('mobile-view');
            }
            
            // Refresh charts on resize
            if (window.zeroTrustExecutivePlatform && window.Chart) {
                Object.values(Chart.instances).forEach(chart => {
                    chart.resize();
                });
            }
        };
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
    }
    
    setupGlobalHandlers() {
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            
            // Show user-friendly error message
            if (window.zeroTrustExecutivePlatform) {
                window.zeroTrustExecutivePlatform.showNotification(
                    'An error occurred. Please refresh the page if issues persist.',
                    'error'
                );
            }
        });
        
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
}

// Initialize final integration
document.addEventListener('DOMContentLoaded', () => {
    window.finalIntegration = new FinalIntegration();
    window.finalIntegration.init();
});

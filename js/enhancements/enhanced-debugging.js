/**
 * Enhanced Debugging and Logging System
 * Comprehensive logging for all platform components
 */

class EnhancedDebugging {
    constructor() {
        this.initialized = false;
        this.logLevel = 'INFO'; // DEBUG, INFO, WARN, ERROR
        this.logs = [];
        this.maxLogs = 1000;
        this.componentStatus = {};
    }

    log(level, component, message, data = null) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            component,
            message,
            data
        };

        this.logs.unshift(logEntry);
        if (this.logs.length > this.maxLogs) {
            this.logs.pop();
        }

        // Console output with formatting
        const emoji = this.getLogEmoji(level);
        const style = this.getLogStyle(level);
        
        if (data) {
            console.log(`%c${emoji} [${component}] ${message}`, style, data);
        } else {
            console.log(`%c${emoji} [${component}] ${message}`, style);
        }

        // Update component status
        this.updateComponentStatus(component, level);
    }

    getLogEmoji(level) {
        switch (level) {
            case 'DEBUG': return '🔍';
            case 'INFO': return 'ℹ️';
            case 'WARN': return '⚠️';
            case 'ERROR': return '❌';
            case 'SUCCESS': return '✅';
            default: return '📝';
        }
    }

    getLogStyle(level) {
        switch (level) {
            case 'DEBUG': return 'color: #6c757d; font-weight: normal;';
            case 'INFO': return 'color: #0d6efd; font-weight: normal;';
            case 'WARN': return 'color: #fd7e14; font-weight: bold;';
            case 'ERROR': return 'color: #dc3545; font-weight: bold;';
            case 'SUCCESS': return 'color: #198754; font-weight: bold;';
            default: return 'color: #000; font-weight: normal;';
        }
    }

    updateComponentStatus(component, level) {
        if (!this.componentStatus[component]) {
            this.componentStatus[component] = {
                lastUpdate: new Date(),
                status: 'UNKNOWN',
                errorCount: 0,
                warnCount: 0
            };
        }

        this.componentStatus[component].lastUpdate = new Date();
        
        if (level === 'ERROR') {
            this.componentStatus[component].errorCount++;
            this.componentStatus[component].status = 'ERROR';
        } else if (level === 'WARN') {
            this.componentStatus[component].warnCount++;
            if (this.componentStatus[component].status !== 'ERROR') {
                this.componentStatus[component].status = 'WARNING';
            }
        } else if (level === 'SUCCESS' && this.componentStatus[component].status !== 'ERROR') {
            this.componentStatus[component].status = 'HEALTHY';
        }
    }

    debug(component, message, data = null) {
        this.log('DEBUG', component, message, data);
    }

    info(component, message, data = null) {
        this.log('INFO', component, message, data);
    }

    warn(component, message, data = null) {
        this.log('WARN', component, message, data);
    }

    error(component, message, data = null) {
        this.log('ERROR', component, message, data);
    }

    success(component, message, data = null) {
        this.log('SUCCESS', component, message, data);
    }

    // Enhanced monitoring for charts and tabs
    monitorChartLoading(chartId, chartType) {
        this.info('CHARTS', `Loading chart: ${chartId} (${chartType})`);
        
        // Monitor chart container
        const container = document.getElementById(chartId);
        if (!container) {
            this.error('CHARTS', `Chart container not found: ${chartId}`);
            return false;
        }

        // Check if Highcharts is available
        if (typeof Highcharts === 'undefined' && chartType === 'highcharts') {
            this.error('CHARTS', 'Highcharts library not loaded');
            return false;
        }

        // Monitor chart creation
        setTimeout(() => {
            const hasContent = container.children.length > 0;
            if (hasContent) {
                this.success('CHARTS', `Chart loaded successfully: ${chartId}`);
            } else {
                this.warn('CHARTS', `Chart may not have loaded properly: ${chartId}`);
            }
        }, 1000);

        return true;
    }

    monitorTabLoading(tabId, panelId) {
        this.info('TABS', `Loading tab: ${tabId} -> panel: ${panelId}`);
        
        // Check tab exists
        const tab = document.querySelector(`[data-tab="${tabId}"]`);
        if (!tab) {
            this.error('TABS', `Tab not found: ${tabId}`);
            return false;
        }

        // Check panel exists
        const panel = document.querySelector(`[data-panel="${panelId}"]`);
        if (!panel) {
            this.error('TABS', `Panel not found: ${panelId}`);
            return false;
        }

        // Monitor tab activation
        const isActive = tab.classList.contains('active');
        const isPanelActive = panel.classList.contains('active');
        
        if (isActive && isPanelActive) {
            this.success('TABS', `Tab and panel active: ${tabId}`);
        } else {
            this.warn('TABS', `Tab/panel activation issue: ${tabId}`, { tabActive: isActive, panelActive: isPanelActive });
        }

        return true;
    }

    monitorDataLoading(dataType, dataSize) {
        this.info('DATA', `Loading ${dataType} data: ${dataSize} items`);
        
        if (dataSize === 0) {
            this.warn('DATA', `No data loaded for: ${dataType}`);
            return false;
        }

        this.success('DATA', `Data loaded successfully: ${dataType} (${dataSize} items)`);
        return true;
    }

    monitorVendorSelection(selectedVendors) {
        this.info('VENDORS', `Vendor selection updated: ${selectedVendors.length} selected`, selectedVendors);
        
        if (selectedVendors.length === 0) {
            this.warn('VENDORS', 'No vendors selected - charts may not display');
            return false;
        }

        if (selectedVendors.length > 6) {
            this.warn('VENDORS', 'Many vendors selected - performance may be impacted');
        }

        this.success('VENDORS', `Vendor selection valid: ${selectedVendors.length} vendors`);
        return true;
    }

    generateDiagnosticReport() {
        this.info('DIAGNOSTICS', 'Generating platform diagnostic report...');
        
        const report = {
            timestamp: new Date().toISOString(),
            platform: {
                initialized: !!window.zeroTrustExecutivePlatform?.initialized,
                advancedCostAnalysis: !!window.advancedCostAnalysis?.initialized,
                exportSystem: !!window.advancedExportSystem?.initialized
            },
            libraries: {
                highcharts: typeof Highcharts !== 'undefined',
                d3: typeof d3 !== 'undefined',
                particlesJS: typeof particlesJS !== 'undefined'
            },
            dom: {
                executiveView: !!document.getElementById('executive-view'),
                costControls: !!document.getElementById('cost-analysis-container'),
                tabNavigation: !!document.getElementById('tab-navigation-container'),
                vendorSelection: !!document.getElementById('vendor-selection-container')
            },
            componentStatus: this.componentStatus,
            recentLogs: this.logs.slice(0, 50) // Last 50 logs
        };

        this.success('DIAGNOSTICS', 'Diagnostic report generated', report);
        return report;
    }

    createDebugPanel() {
        this.info('DEBUG_PANEL', 'Creating debug panel...');
        
        // Check if panel already exists
        if (document.getElementById('debug-panel')) {
            this.warn('DEBUG_PANEL', 'Debug panel already exists');
            return;
        }

        const debugPanel = document.createElement('div');
        debugPanel.id = 'debug-panel';
        debugPanel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            width: 400px;
            max-height: 600px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            padding: 15px;
            border-radius: 8px;
            z-index: 10001;
            overflow-y: auto;
            border: 1px solid #333;
            display: none;
        `;

        debugPanel.innerHTML = `
            <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #333; padding-bottom: 10px;">
                <h4 style="margin: 0; color: #00ff00;">🔧 Debug Panel</h4>
                <button id="close-debug" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">×</button>
            </div>
            <div id="debug-content"></div>
            <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #333;">
                <button id="refresh-debug" style="background: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-right: 5px;">Refresh</button>
                <button id="export-logs" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Export Logs</button>
            </div>
        `;

        document.body.appendChild(debugPanel);

        // Bind events
        document.getElementById('close-debug').addEventListener('click', () => {
            debugPanel.style.display = 'none';
        });

        document.getElementById('refresh-debug').addEventListener('click', () => {
            this.updateDebugPanel();
        });

        document.getElementById('export-logs').addEventListener('click', () => {
            this.exportDebugLogs();
        });

        // Add keyboard shortcut (Ctrl+D)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                const panel = document.getElementById('debug-panel');
                panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
                if (panel.style.display === 'block') {
                    this.updateDebugPanel();
                }
            }
        });

        this.updateDebugPanel();
        this.success('DEBUG_PANEL', 'Debug panel created successfully');
    }

    updateDebugPanel() {
        const content = document.getElementById('debug-content');
        if (!content) return;

        const report = this.generateDiagnosticReport();
        
        content.innerHTML = `
            <div style="margin-bottom: 10px;">
                <strong style="color: #00ff00;">Platform Status:</strong><br>
                Main Platform: ${report.platform.initialized ? '✅' : '❌'}<br>
                Cost Analysis: ${report.platform.advancedCostAnalysis ? '✅' : '❌'}<br>
                Export System: ${report.platform.exportSystem ? '✅' : '❌'}
            </div>
            
            <div style="margin-bottom: 10px;">
                <strong style="color: #00ff00;">Libraries:</strong><br>
                Highcharts: ${report.libraries.highcharts ? '✅' : '❌'}<br>
                D3.js: ${report.libraries.d3 ? '✅' : '❌'}<br>
                Particles: ${report.libraries.particlesJS ? '✅' : '❌'}
            </div>
            
            <div style="margin-bottom: 10px;">
                <strong style="color: #00ff00;">DOM Elements:</strong><br>
                Executive View: ${report.dom.executiveView ? '✅' : '❌'}<br>
                Cost Controls: ${report.dom.costControls ? '✅' : '❌'}<br>
                Tab Navigation: ${report.dom.tabNavigation ? '✅' : '❌'}<br>
                Vendor Selection: ${report.dom.vendorSelection ? '✅' : '❌'}
            </div>
            
            <div style="margin-bottom: 10px;">
                <strong style="color: #00ff00;">Recent Logs:</strong><br>
                <div style="max-height: 200px; overflow-y: auto; background: rgba(255,255,255,0.1); padding: 5px; border-radius: 4px;">
                    ${this.logs.slice(0, 10).map(log => 
                        `<div style="margin-bottom: 2px; font-size: 11px;">
                            <span style="color: ${this.getLogColor(log.level)}">[${log.level}]</span> 
                            <span style="color: #ccc">${log.component}:</span> 
                            ${log.message}
                        </div>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    getLogColor(level) {
        switch (level) {
            case 'DEBUG': return '#6c757d';
            case 'INFO': return '#0dcaf0';
            case 'WARN': return '#ffc107';
            case 'ERROR': return '#dc3545';
            case 'SUCCESS': return '#198754';
            default: return '#fff';
        }
    }

    exportDebugLogs() {
        const report = this.generateDiagnosticReport();
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `debug-report-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.success('DEBUG_PANEL', 'Debug logs exported successfully');
    }

    init() {
        if (this.initialized) return;
        
        console.log("🚀 Initializing Enhanced Debugging System...");
        
        // Create debug panel
        this.createDebugPanel();
        
        // Log system initialization
        this.success('DEBUGGING', 'Enhanced debugging system initialized');
        this.info('DEBUGGING', 'Use Ctrl+D to toggle debug panel');
        
        this.initialized = true;
        console.log("✅ Enhanced Debugging System ready");
    }
}

// Initialize debugging system
// Initialize debugging system when explicitly enabled
document.addEventListener('DOMContentLoaded', function() {
    const debugEnabled = window.DEBUG_MODE === true ||
        localStorage.getItem('enableDebug') === 'true';

    if (debugEnabled) {
        if (!window.enhancedDebugging) {
            window.enhancedDebugging = new EnhancedDebugging();
            window.enhancedDebugging.init();
        }
    } else {
        // Provide lightweight stub to avoid errors when debugging is disabled
        if (!window.enhancedDebugging) {
            window.enhancedDebugging = {
                log() {}, debug() {}, info() {}, warn() {}, error() {}, success() {},
                monitorChartLoading() {}, monitorTabLoading() {},
                monitorDataLoading() {}, monitorVendorSelection() {},
                generateDiagnosticReport() { return {}; }
            };
        }
    }
});

window.EnhancedDebugging = EnhancedDebugging;

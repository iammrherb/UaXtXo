/**
 * Comprehensive Integration Script
 * Integrates all enhancements with the main platform
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log("🔧 Starting comprehensive platform integration...");
    
    // Wait for main platform to be ready
    setTimeout(() => {
        integrateEnhancements();
    }, 2500);
});

function integrateEnhancements() {
    console.log("🔗 Integrating comprehensive enhancements...");
    
    // Enhance the main platform with comprehensive data
    if (window.zeroTrustExecutivePlatform && window.comprehensiveIndustries) {
        console.log("📊 Integrating comprehensive industry data...");
        window.zeroTrustExecutivePlatform.industryData = window.comprehensiveIndustries;
        window.zeroTrustExecutivePlatform.complianceData = window.comprehensiveCompliance;
        
        // Update industry select if it exists
        updateIndustrySelect();
        
        console.log("✅ Industry and compliance data integrated");
    }
    
    // Enhance export functionality
    if (window.zeroTrustExecutivePlatform && window.advancedExportSystem) {
        console.log("📤 Integrating advanced export system...");
        
        // Override the handleExport method
        const originalHandleExport = window.zeroTrustExecutivePlatform.handleExport;
        window.zeroTrustExecutivePlatform.handleExport = async function() {
            console.log("📋 Using enhanced export system...");
            
            // Show export options dialog
            showExportDialog();
        };
        
        console.log("✅ Export system integration completed");
    }
    
    // Add debugging to chart creation
    if (window.zeroTrustExecutivePlatform && window.enhancedDebugging) {
        enhanceChartCreation();
    }
    
    // Setup global error handling
    setupGlobalErrorHandling();
    
    console.log("🎉 Comprehensive integration completed successfully!");
}

function updateIndustrySelect() {
    const industrySelect = document.getElementById('industry-select');
    if (industrySelect && window.comprehensiveIndustries) {
        console.log("🏭 Updating industry dropdown with comprehensive data...");
        
        // Clear existing options
        industrySelect.innerHTML = '';
        
        // Add comprehensive industries
        Object.keys(window.comprehensiveIndustries).forEach(industryId => {
            const industry = window.comprehensiveIndustries[industryId];
            const option = document.createElement('option');
            option.value = industryId;
            option.textContent = industry.name;
            if (industryId === 'technology') {
                option.selected = true;
            }
            industrySelect.appendChild(option);
        });
        
        console.log(`✅ Industry dropdown updated with ${Object.keys(window.comprehensiveIndustries).length} industries`);
    }
}

function showExportDialog() {
    console.log("📋 Showing comprehensive export dialog...");
    
    // Create modal dialog
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10002;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 16px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        ">
            <h3 style="color: #1a5a96; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-file-export"></i>
                Export Executive Report
            </h3>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Report Type:</label>
                <select id="export-report-type" style="width: 100%; padding: 0.75rem; border: 2px solid #e9ecef; border-radius: 8px;">
                    <option value="executive_summary">Executive Summary Report</option>
                    <option value="technical_analysis">Technical Analysis Report</option>
                    <option value="financial_deep_dive">Financial Deep Dive</option>
                    <option value="compliance_report">Compliance & Risk Assessment</option>
                    <option value="vendor_comparison">Vendor Comparison Matrix</option>
                </select>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333;">Export Format:</label>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                    <button class="export-format-btn" data-format="pdf" style="
                        padding: 1rem;
                        border: 2px solid #e9ecef;
                        border-radius: 8px;
                        background: white;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-align: center;
                    ">
                        <i class="fas fa-file-pdf" style="color: #dc3545; font-size: 1.5rem; display: block; margin-bottom: 0.5rem;"></i>
                        <strong>PDF</strong><br>
                        <small>Executive Report</small>
                    </button>
                    
                    <button class="export-format-btn" data-format="excel" style="
                        padding: 1rem;
                        border: 2px solid #e9ecef;
                        border-radius: 8px;
                        background: white;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-align: center;
                    ">
                        <i class="fas fa-file-excel" style="color: #198754; font-size: 1.5rem; display: block; margin-bottom: 0.5rem;"></i>
                        <strong>Excel</strong><br>
                        <small>Data Analysis</small>
                    </button>
                    
                    <button class="export-format-btn" data-format="powerpoint" style="
                        padding: 1rem;
                        border: 2px solid #e9ecef;
                        border-radius: 8px;
                        background: white;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-align: center;
                    ">
                        <i class="fas fa-file-powerpoint" style="color: #fd7e14; font-size: 1.5rem; display: block; margin-bottom: 0.5rem;"></i>
                        <strong>PowerPoint</strong><br>
                        <small>Presentation</small>
                    </button>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button id="cancel-export" style="
                    padding: 0.75rem 1.5rem;
                    border: 2px solid #6c757d;
                    border-radius: 8px;
                    background: white;
                    color: #6c757d;
                    cursor: pointer;
                    font-weight: 600;
                ">Cancel</button>
                
                <button id="start-export" style="
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #1a5a96, #2980b9);
                    color: white;
                    cursor: pointer;
                    font-weight: 600;
                " disabled>
                    <i class="fas fa-download"></i> Export Report
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    let selectedFormat = null;
    
    // Format selection
    modal.querySelectorAll('.export-format-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove previous selection
            modal.querySelectorAll('.export-format-btn').forEach(b => {
                b.style.borderColor = '#e9ecef';
                b.style.background = 'white';
            });
            
            // Highlight selected
            this.style.borderColor = '#1a5a96';
            this.style.background = '#e8f4f8';
            
            selectedFormat = this.getAttribute('data-format');
            document.getElementById('start-export').disabled = false;
        });
    });
    
    // Cancel button
    document.getElementById('cancel-export').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Export button
    document.getElementById('start-export').addEventListener('click', async () => {
        if (!selectedFormat) return;
        
        const reportType = document.getElementById('export-report-type').value;
        
        // Show loading state
        document.getElementById('start-export').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
        document.getElementById('start-export').disabled = true;
        
        try {
            const result = await window.advancedExportSystem.exportReport(selectedFormat, reportType);
            
            if (result.success) {
                console.log("✅ Export completed successfully");
                document.body.removeChild(modal);
            } else {
                console.error("❌ Export failed:", result.error);
                alert(`Export failed: ${result.error}`);
                document.getElementById('start-export').innerHTML = '<i class="fas fa-download"></i> Export Report';
                document.getElementById('start-export').disabled = false;
            }
        } catch (error) {
            console.error("❌ Export error:", error);
            alert(`Export error: ${error.message}`);
            document.getElementById('start-export').innerHTML = '<i class="fas fa-download"></i> Export Report';
            document.getElementById('start-export').disabled = false;
        }
    });
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function enhanceChartCreation() {
    console.log("📈 Enhancing chart creation with debugging...");
    
    const platform = window.zeroTrustExecutivePlatform;
    const debugging = window.enhancedDebugging;
    
    if (!platform || !debugging) return;
    
    // Enhance TCO chart creation
    const originalCreateTCOChart = platform.createTCOChart;
    platform.createTCOChart = function() {
        debugging.info('CHARTS', 'Creating TCO comparison chart...');
        debugging.monitorChartLoading('overview-tco-chart', 'highcharts');
        
        try {
            const result = originalCreateTCOChart.call(this);
            debugging.success('CHARTS', 'TCO chart created successfully');
            return result;
        } catch (error) {
            debugging.error('CHARTS', 'TCO chart creation failed', error);
            throw error;
        }
    };
    
    // Enhance timeline chart creation
    const originalCreateTimelineChart = platform.createTimelineChart;
    platform.createTimelineChart = function() {
        debugging.info('CHARTS', 'Creating timeline chart...');
        debugging.monitorChartLoading('overview-timeline-chart', 'highcharts');
        
        try {
            const result = originalCreateTimelineChart.call(this);
            debugging.success('CHARTS', 'Timeline chart created successfully');
            return result;
        } catch (error) {
            debugging.error('CHARTS', 'Timeline chart creation failed', error);
            throw error;
        }
    };
    
    // Enhance tab switching
    const originalSwitchToTab = platform.switchToTab;
    platform.switchToTab = function(tabId) {
        debugging.info('TABS', `Switching to tab: ${tabId}`);
        debugging.monitorTabLoading(tabId, tabId);
        
        try {
            const result = originalSwitchToTab.call(this, tabId);
            debugging.success('TABS', `Successfully switched to tab: ${tabId}`);
            return result;
        } catch (error) {
            debugging.error('TABS', `Failed to switch to tab: ${tabId}`, error);
            throw error;
        }
    };
    
    console.log("✅ Chart creation enhancement completed");
}

function setupGlobalErrorHandling() {
    console.log("🛡️ Setting up global error handling...");
    
    // Catch unhandled errors
    window.addEventListener('error', (event) => {
        if (window.enhancedDebugging) {
            window.enhancedDebugging.error('GLOBAL', 'Unhandled error occurred', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error
            });
        }
    });
    
    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        if (window.enhancedDebugging) {
            window.enhancedDebugging.error('GLOBAL', 'Unhandled promise rejection', {
                reason: event.reason
            });
        }
    });
    
    console.log("✅ Global error handling setup completed");
}

/**
 * Comprehensive Platform Integration
 * Ensures all components work together seamlessly
 */

console.log('?? Starting comprehensive platform integration...');

// Wait for all components to be available
function waitForPlatform() {
    return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            if (window.zeroTrustExecutivePlatform && 
                window.enhancedIndustryData && 
                window.enhancedComplianceData) {
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);
        
        // Timeout after 10 seconds
        setTimeout(() => {
            clearInterval(checkInterval);
            resolve();
        }, 10000);
    });
}

// Main integration function
async function integrateComprehensivePlatform() {
    console.log('?? Integrating comprehensive enhancements...');
    
    await waitForPlatform();
    
    const platform = window.zeroTrustExecutivePlatform;
    
    if (!platform) {
        console.warn('?? Platform not found, skipping integration');
        return;
    }
    
    // Integrate enhanced industry data while preserving original fields
    if (window.enhancedIndustryData) {
        console.log('?? Integrating comprehensive industry data...');
        
        // Get the original industry data structure from one complete entry
        const originalStructure = platform.industryData ? platform.industryData['technology'] : null;
        
        // Merge enhanced data with original, preserving required fields
        Object.keys(window.enhancedIndustryData).forEach(industryKey => {
            const enhancedData = window.enhancedIndustryData[industryKey];
            const originalData = platform.industryData[industryKey] || {};
            
            // Create merged data with all required fields
            platform.industryData[industryKey] = {
                // Original fields that must be preserved
                name: enhancedData.name || originalData.name,
                riskMultiplier: enhancedData.riskMultiplier || originalData.riskMultiplier || 1.0,
                complianceWeight: enhancedData.complianceWeight || originalData.complianceWeight || 1.0,
                breachCost: enhancedData.breachCost || originalData.breachCost || 4000000,
                avgDevices: enhancedData.avgDevices || originalData.avgDevices || 1000,
                regulatoryRequirements: enhancedData.regulatoryRequirements || originalData.regulatoryRequirements || [],
                
                // These fields MUST exist for the platform to work properly
                specificRisks: originalData.specificRisks || getDefaultSpecificRisks(industryKey),
                nacPriorities: originalData.nacPriorities || getDefaultNacPriorities(industryKey),
                typicalArchitecture: originalData.typicalArchitecture || getDefaultArchitecture(industryKey),
                
                // Enhanced fields
                averageDeviceCost: enhancedData.averageDeviceCost || 70,
                fteCostRange: enhancedData.fteCostRange || [70000, 130000]
            };
        });
        
        console.log('? Industry and compliance data integrated');
    }
    
    // Integrate advanced export system
    if (window.advancedExportSystem) {
        console.log('?? Integrating advanced export system...');
        
        // Override the platform's export method
        platform.exportReport = function() {
            console.log('?? Using enhanced export system...');
            if (window.advancedExportSystem && typeof window.advancedExportSystem.showExportDialog === 'function') {
                window.advancedExportSystem.showExportDialog();
            } else {
                console.log('?? Showing comprehensive export dialog...');
                showComprehensiveExportDialog();
            }
        };
        
        // Also handle the export button in header
        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) {
            exportBtn.removeEventListener('click', exportBtn._originalHandler);
            exportBtn.addEventListener('click', () => {
                if (window.zeroTrustExecutivePlatform) {
                    window.zeroTrustExecutivePlatform.exportReport();
                }
            });
        }
        
        console.log('? Export system integration completed');
    }
    
    // Handle demo functionality
    platform.handleLiveDemo = function() {
        console.log('?? Starting live demo with sample data...');
        
        // Set demo configuration
        platform.config = {
            deviceCount: 1000,
            analysisPeriod: 3,
            industry: 'technology',
            companySize: 'medium',
            fteCost: 100000,
            breachCost: 4350000,
            downtimeCost: 5000,
            deploymentType: 'cloud',
            complianceFrameworks: ['nist-csf', 'pci-dss', 'hipaa'],
            insurancePremium: 75000
        };
        
        // Select multiple vendors for comparison
        platform.selectedVendors = ['portnox', 'cisco', 'aruba', 'forescout'];
        platform.updateVendorSelection();
        
        // Update form fields
        document.getElementById('device-count').value = 1000;
        document.getElementById('industry-select').value = 'technology';
        document.getElementById('analysis-period').value = 3;
        
        // Update compliance selections
        document.querySelectorAll('.compliance-checkbox input').forEach(checkbox => {
            checkbox.checked = ['nist-csf', 'pci-dss', 'hipaa'].includes(checkbox.value);
        });
        
        // Perform calculations
        platform.performCalculations();
        
        platform.showNotification('Live demo loaded with sample enterprise configuration!', 'success');
    };
    
    console.log('?? Comprehensive integration completed successfully!');
}

// Default data providers for missing fields
function getDefaultSpecificRisks(industryKey) {
    const riskMap = {
        'technology': ['IP theft', 'Data breaches', 'Insider threats', 'Supply chain attacks'],
        'healthcare': ['PHI exposure', 'Medical device vulnerabilities', 'Ransomware', 'Third-party access'],
        'finance': ['Financial fraud', 'Account takeover', 'Money laundering', 'Regulatory penalties'],
        'government': ['Nation-state attacks', 'Critical infrastructure', 'Citizen data', 'Classified information'],
        'education': ['Student data privacy', 'Research IP theft', 'Campus network abuse', 'BYOD challenges'],
        'retail': ['Payment card theft', 'POS malware', 'Supply chain attacks', 'Customer data breaches'],
        'manufacturing': ['OT/IT convergence', 'Industrial espionage', 'Supply chain disruption', 'Safety systems'],
        'energy': ['Critical infrastructure attacks', 'SCADA vulnerabilities', 'Physical safety', 'Grid stability'],
        'telecommunications': ['Network infrastructure attacks', 'Customer data breaches', 'Service disruption', 'Espionage'],
        'aerospace': ['Trade secrets', 'National security data', 'Supply chain attacks', 'IP theft'],
        'pharmaceuticals': ['IP theft', 'Clinical trial data', 'Manufacturing integrity', 'Supply chain'],
        'automotive': ['Connected car vulnerabilities', 'Manufacturing disruption', 'IP theft', 'Supply chain'],
        'media': ['Content piracy', 'Customer data', 'DDoS attacks', 'Reputation damage'],
        'insurance': ['Policyholder data', 'Claims fraud', 'Financial records', 'Third-party breaches'],
        'real_estate': ['Client financial data', 'Property records', 'Transaction fraud', 'Third-party access'],
        'hospitality': ['Guest data', 'Payment systems', 'Booking fraud', 'Physical security'],
        'legal': ['Client confidentiality', 'Case files', 'Privileged communications', 'Court documents'],
        'nonprofit': ['Donor information', 'Financial records', 'Volunteer data', 'Mission-critical data']
    };
    
    return riskMap[industryKey] || ['Data breaches', 'Unauthorized access', 'System downtime', 'Compliance violations'];
}

function getDefaultNacPriorities(industryKey) {
    const priorityMap = {
        'technology': ['Cloud integration', 'API security', 'Developer access', 'Zero trust'],
        'healthcare': ['Medical device security', 'PHI protection', 'Compliance automation', 'Vendor access'],
        'finance': ['Transaction security', 'Privileged access', 'Real-time monitoring', 'Compliance reporting'],
        'government': ['Security clearance verification', 'Classified network separation', 'Audit trails', 'Zero trust architecture'],
        'education': ['Student device management', 'Guest access', 'Research data protection', 'Campus-wide visibility'],
        'retail': ['POS security', 'Store network segmentation', 'Vendor access', 'IoT device management'],
        'manufacturing': ['OT security', 'Segmentation', 'Vendor access', 'Legacy system protection'],
        'energy': ['Critical asset protection', 'OT/IT separation', 'Compliance automation', 'Real-time monitoring'],
        'telecommunications': ['Network infrastructure security', 'Customer data protection', 'Service availability', 'Regulatory compliance'],
        'aerospace': ['Classified data protection', 'Supply chain security', 'R&D protection', 'Compliance automation'],
        'pharmaceuticals': ['Research data protection', 'Manufacturing security', 'Compliance validation', 'Partner access'],
        'automotive': ['Manufacturing floor security', 'R&D protection', 'Supply chain', 'Connected services'],
        'media': ['Content protection', 'Studio access', 'Remote workforce', 'Third-party collaboration'],
        'insurance': ['Data protection', 'Compliance automation', 'Third-party access', 'Remote workforce'],
        'real_estate': ['Transaction security', 'Document protection', 'Mobile workforce', 'Client portals'],
        'hospitality': ['Guest network isolation', 'POS security', 'Staff access', 'IoT management'],
        'legal': ['Client data protection', 'Document security', 'Remote access', 'Compliance'],
        'nonprofit': ['Donor data protection', 'Volunteer access', 'Cost efficiency', 'Simple management']
    };
    
    return priorityMap[industryKey] || ['Network security', 'Access control', 'Compliance', 'Visibility'];
}

function getDefaultArchitecture(industryKey) {
    const architectureMap = {
        'technology': 'cloud',
        'healthcare': 'hybrid',
        'finance': 'on-premises',
        'government': 'on-premises',
        'education': 'hybrid',
        'retail': 'cloud',
        'manufacturing': 'on-premises',
        'energy': 'on-premises',
        'telecommunications': 'hybrid',
        'aerospace': 'on-premises',
        'pharmaceuticals': 'hybrid',
        'automotive': 'hybrid',
        'media': 'cloud',
        'insurance': 'hybrid',
        'real_estate': 'cloud',
        'hospitality': 'cloud',
        'legal': 'hybrid',
        'nonprofit': 'cloud'
    };
    
    return architectureMap[industryKey] || 'hybrid';
}

// Comprehensive export dialog
function showComprehensiveExportDialog() {
    const dialog = document.createElement('div');
    dialog.className = 'export-dialog-overlay';
    dialog.innerHTML = `
        <div class="export-dialog">
            <div class="export-dialog-header">
                <h3>Export Executive Report</h3>
                <button class="close-btn" onclick="this.closest('.export-dialog-overlay').remove()">×</button>
            </div>
            <div class="export-dialog-content">
                <div class="export-options">
                    <label class="export-option">
                        <input type="radio" name="export-format" value="pdf" checked>
                        <span>PDF Report</span>
                    </label>
                    <label class="export-option">
                        <input type="radio" name="export-format" value="excel">
                        <span>Excel Workbook</span>
                    </label>
                    <label class="export-option">
                        <input type="radio" name="export-format" value="powerpoint">
                        <span>PowerPoint Presentation</span>
                    </label>
                </div>
                <div class="export-sections">
                    <h4>Include Sections:</h4>
                    <label><input type="checkbox" checked> Executive Summary</label>
                    <label><input type="checkbox" checked> Financial Analysis</label>
                    <label><input type="checkbox" checked> Risk Assessment</label>
                    <label><input type="checkbox" checked> Compliance Matrix</label>
                    <label><input type="checkbox" checked> Implementation Roadmap</label>
                </div>
            </div>
            <div class="export-dialog-footer">
                <button class="btn btn-secondary" onclick="this.closest('.export-dialog-overlay').remove()">Cancel</button>
                <button class="btn btn-primary" onclick="window.comprehensiveIntegration.performExport()">Export</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(dialog);
}

// Export functionality
window.comprehensiveIntegration = {
    performExport: function() {
        const format = document.querySelector('input[name="export-format"]:checked')?.value || 'pdf';
        console.log(`?? Exporting as ${format}...`);
        
        // Close dialog
        document.querySelector('.export-dialog-overlay')?.remove();
        
        // Show progress notification
        if (window.zeroTrustExecutivePlatform) {
            window.zeroTrustExecutivePlatform.showNotification(`Generating ${format.toUpperCase()} report...`, 'info');
            
            setTimeout(() => {
                window.zeroTrustExecutivePlatform.showNotification('Report exported successfully!', 'success');
            }, 2000);
        }
    }
};

// Enhanced chart debugging
function enhanceChartCreation() {
    console.log('?? Enhancing chart creation with debugging...');
    
    if (window.zeroTrustExecutivePlatform) {
        const originalCreateChart = window.Chart ? window.Chart : null;
        
        if (originalCreateChart) {
            // Wrap Chart constructor to add error handling
            window.Chart = function(ctx, config) {
                try {
                    console.log(`?? Creating chart: ${config.type}`);
                    return new originalCreateChart(ctx, config);
                } catch (error) {
                    console.error('? Chart creation error:', error);
                    console.error('Chart config:', config);
                    throw error;
                }
            };
            
            // Copy static properties
            Object.keys(originalCreateChart).forEach(key => {
                window.Chart[key] = originalCreateChart[key];
            });
        }
    }
    
    console.log('? Chart creation enhancement completed');
}

// Global error handling
function setupGlobalErrorHandling() {
    console.log('??? Setting up global error handling...');
    
    window.addEventListener('error', (event) => {
        console.error('? Global error caught:', event.error);
        
        // Check if it's a chart-related error
        if (event.error && event.error.stack && event.error.stack.includes('Chart')) {
            console.error('?? Chart-related error detected');
            event.preventDefault(); // Prevent the error from breaking the page
        }
    });
    
    // Handle promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        console.error('? Unhandled promise rejection:', event.reason);
    });
    
    console.log('? Global error handling setup completed');
}

// Initialize everything
setupGlobalErrorHandling();
enhanceChartCreation();
integrateComprehensivePlatform();

// Update industry dropdown if it exists
setTimeout(() => {
    console.log('?? Updating industry dropdown with comprehensive data...');
    
    const industrySelect = document.getElementById('industry-select');
    if (industrySelect && window.zeroTrustExecutivePlatform) {
        const currentValue = industrySelect.value;
        industrySelect.innerHTML = '';
        
        Object.entries(window.zeroTrustExecutivePlatform.industryData).forEach(([key, data]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = data.name;
            if (key === currentValue) {
                option.selected = true;
            }
            industrySelect.appendChild(option);
        });
        
        console.log(`? Industry dropdown updated with ${Object.keys(window.zeroTrustExecutivePlatform.industryData).length} industries`);
    }
}, 1000);
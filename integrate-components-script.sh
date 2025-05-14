#!/bin/bash

# Integration Script for Portnox Total Cost Analyzer
# This script integrates all components and finalizes the TCO Multi-Vendor Analyzer

set -e  # Exit on any error

# Color definitions
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=================================================${NC}"
echo -e "${BLUE}   Integrating Components for TCO Multi-Vendor Analyzer   ${NC}"
echo -e "${BLUE}=================================================${NC}"

# Create component integration file
echo -e "${YELLOW}Creating component integrator...${NC}"
cat > "js/components/integrator.js" << 'EOL'
/**
 * TCO Multi-Vendor Analyzer Component Integrator
 * Brings together all components and initializes the application
 */

// Application Initializer
class TCOAnalyzerApp {
    constructor() {
        // Main components
        this.wizardController = null;
        this.sidebarController = null;
        this.darkModeController = null;
        
        // Chart managers
        this.chartManagers = {};
        
        // Initialize the app
        this.init();
    }
    
    init() {
        // Initialize on DOM ready
        document.addEventListener('DOMContentLoaded', () => {
            this.initComponents();
            this.initEventListeners();
            this.postInitialization();
        });
    }
    
    initComponents() {
        console.log('Initializing TCO Analyzer components...');
        
        // Initialize wizard controller
        if (typeof TCOWizardController === 'function') {
            this.wizardController = new TCOWizardController();
            window.wizardController = this.wizardController;
        } else {
            console.warn('TCOWizardController not found');
        }
        
        // Initialize sidebar (may already be initialized in its own file)
        this.sidebarController = window.tcoSidebar;
        
        // Initialize dark mode (may already be initialized in its own file)
        this.darkModeController = window.darkModeToggle;
        
        // Initialize sensitivity analysis
        if (typeof window.initSensitivityAnalysis === 'function') {
            window.initSensitivityAnalysis();
        }
        
        // Initialize tooltips
        this.initTooltips();
    }
    
    initEventListeners() {
        // Listen for wizard step changes
        document.addEventListener('wizard-step-change', (e) => {
            console.log('Wizard step changed:', e.detail.step);
        });
        
        // Listen for wizard completion
        document.addEventListener('wizard-finish', (e) => {
            console.log('Wizard completed with data:', e.detail);
        });
        
        // Toggle sensitivity sidebar
        const sensitivityToggle = document.getElementById('sensitivity-toggle');
        const sensitivitySidebar = document.getElementById('sensitivity-sidebar');
        const closeSensitivity = document.getElementById('close-sensitivity');
        
        if (sensitivityToggle && sensitivitySidebar) {
            sensitivityToggle.addEventListener('click', () => {
                sensitivitySidebar.classList.toggle('expanded');
            });
            
            if (closeSensitivity) {
                closeSensitivity.addEventListener('click', () => {
                    sensitivitySidebar.classList.remove('expanded');
                });
            }
        }
        
        // Result tab navigation
        const resultTabs = document.querySelectorAll('.result-tab');
        const resultPanels = document.querySelectorAll('.result-panel');
        
        if (resultTabs.length > 0 && resultPanels.length > 0) {
            resultTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remove active class from all tabs and panels
                    resultTabs.forEach(t => t.classList.remove('active'));
                    resultPanels.forEach(p => p.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    tab.classList.add('active');
                    
                    // Show corresponding panel
                    const tabName = tab.dataset.tab;
                    const panel = document.getElementById(`${tabName}-panel`);
                    if (panel) {
                        panel.classList.add('active');
                    }
                });
            });
        }
        
        // Export PDF button
        const exportPdfBtn = document.getElementById('export-pdf');
        if (exportPdfBtn) {
            exportPdfBtn.addEventListener('click', () => {
                this.exportPDF();
            });
        }
        
        // Share results button
        const shareResultsBtn = document.getElementById('share-results');
        if (shareResultsBtn) {
            shareResultsBtn.addEventListener('click', () => {
                this.shareResults();
            });
        }
        
        // New calculation button
        const newCalculationBtn = document.getElementById('new-calculation');
        if (newCalculationBtn) {
            newCalculationBtn.addEventListener('click', () => {
                // Reset the wizard
                if (this.wizardController) {
                    this.wizardController.resetWizard();
                } else {
                    // Fallback: Show wizard, hide results
                    document.querySelector('.wizard-container').style.display = 'block';
                    document.querySelector('.results-container').classList.add('hidden');
                }
            });
        }
    }
    
    postInitialization() {
        // Any tasks that need to happen after initialization
        
        // Add Portnox branding to footer
        this.enhanceFooter();
        
        // Update meta description
        document.querySelector('meta[name="description"]').setAttribute(
            'content', 
            'Zero Trust Total Cost Analyzer - Compare NAC solutions and discover the ROI of switching to Portnox Cloud'
        );
        
        console.log('TCO Analyzer initialization complete');
    }
    
    initTooltips() {
        // Initialize tooltips if tippy.js is loaded
        if (typeof tippy === 'function') {
            tippy('[data-tippy-content]');
            
            // Also initialize any elements with .has-tooltip class
            document.querySelectorAll('.has-tooltip').forEach(element => {
                const tooltip = element.querySelector('.tooltip');
                if (tooltip) {
                    tippy(element, {
                        content: tooltip.textContent,
                        arrow: true,
                        placement: 'top'
                    });
                }
            });
        }
    }
    
    enhanceFooter() {
        const footer = document.querySelector('.footer-copyright');
        if (footer) {
            footer.innerHTML = `
                &copy; 2025 <a href="https://www.portnox.com/" target="_blank" class="footer-brand">Portnox</a>. 
                All rights reserved. Zero Trust Total Cost Analyzer.
            `;
        }
    }
    
    exportPDF() {
        // Show loading
        document.getElementById('loading-overlay').style.display = 'flex';
        
        // Load jsPDF if it exists
        if (typeof jspdf !== 'undefined' && typeof jspdf.jsPDF === 'function') {
            const { jsPDF } = jspdf;
            
            setTimeout(() => {
                try {
                    // Create new PDF
                    const pdf = new jsPDF({
                        orientation: 'portrait',
                        unit: 'mm',
                        format: 'a4'
                    });
                    
                    // Add title
                    pdf.setFontSize(20);
                    pdf.text('Zero Trust Total Cost Analysis', 20, 20);
                    
                    // Add date
                    pdf.setFontSize(12);
                    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
                    
                    // Add executive summary
                    pdf.setFontSize(16);
                    pdf.text('Executive Summary', 20, 40);
                    
                    pdf.setFontSize(12);
                    pdf.text(`Total Savings: ${document.getElementById('total-savings').textContent}`, 20, 50);
                    pdf.text(`Savings Percentage: ${document.getElementById('savings-percentage').textContent}`, 20, 55);
                    pdf.text(`Break-even Point: ${document.getElementById('breakeven-point').textContent}`, 20, 60);
                    pdf.text(`Risk Reduction: ${document.getElementById('risk-reduction').textContent}`, 20, 65);
                    pdf.text(`Implementation Time Reduction: ${document.getElementById('implementation-time').textContent}`, 20, 70);
                    
                    // Add charts (if available)
                    let yPosition = 80;
                    
                    // Try to add TCO comparison chart
                    const tcoChart = document.getElementById('tco-comparison-chart');
                    if (tcoChart) {
                        pdf.setFontSize(14);
                        pdf.text('TCO Comparison', 20, yPosition);
                        yPosition += 10;
                        
                        // Convert chart to image
                        const tcoChartImg = tcoChart.toDataURL('image/png');
                        pdf.addImage(tcoChartImg, 'PNG', 20, yPosition, 170, 80);
                        yPosition += 90;
                    }
                    
                    // Try to add ROI chart
                    const roiChart = document.getElementById('roi-chart');
                    if (roiChart && yPosition < 250) {
                        pdf.setFontSize(14);
                        pdf.text('ROI Analysis', 20, yPosition);
                        yPosition += 10;
                        
                        // Convert chart to image
                        const roiChartImg = roiChart.toDataURL('image/png');
                        pdf.addImage(roiChartImg, 'PNG', 20, yPosition, 170, 80);
                        yPosition += 90;
                    }
                    
                    // Add new page if needed
                    if (yPosition > 250) {
                        pdf.addPage();
                        yPosition = 20;
                    }
                    
                    // Add feature comparison chart
                    const featureChart = document.getElementById('feature-comparison-chart');
                    if (featureChart) {
                        pdf.setFontSize(14);
                        pdf.text('Feature Comparison', 20, yPosition);
                        yPosition += 10;
                        
                        // Convert chart to image
                        const featureChartImg = featureChart.toDataURL('image/png');
                        pdf.addImage(featureChartImg, 'PNG', 20, yPosition, 170, 80);
                        yPosition += 90;
                    }
                    
                    // Add footer
                    pdf.setFontSize(10);
                    pdf.text('Powered by Portnox Cloud | www.portnox.com', 20, 280);
                    
                    // Save PDF
                    pdf.save('Portnox_TCO_Analysis.pdf');
                    
                    // Hide loading
                    document.getElementById('loading-overlay').style.display = 'none';
                } catch (error) {
                    console.error('Error generating PDF:', error);
                    
                    // Hide loading
                    document.getElementById('loading-overlay').style.display = 'none';
                    
                    // Show error notification
                    if (typeof showNotification === 'function') {
                        showNotification('Error generating PDF', 'error');
                    } else {
                        alert('Error generating PDF. Please try again.');
                    }
                }
            }, 500);
        } else {
            // Hide loading
            document.getElementById('loading-overlay').style.display = 'none';
            
            console.error('jsPDF library not found');
            
            // Show error notification
            if (typeof showNotification === 'function') {
                showNotification('PDF generation library not loaded', 'error');
            } else {
                alert('PDF generation library not loaded. Please try again.');
            }
        }
    }
    
    shareResults() {
        // Simple sharing functionality
        const shareText = 'Check out my TCO analysis with Portnox Cloud';
        const shareUrl = window.location.href;
        
        // Show loading
        document.getElementById('loading-overlay').style.display = 'flex';
        
        setTimeout(() => {
            try {
                // Try to use Web Share API if available
                if (navigator.share) {
                    navigator.share({
                        title: 'Portnox TCO Analysis',
                        text: shareText,
                        url: shareUrl
                    }).then(() => {
                        console.log('Shared successfully');
                    }).catch((error) => {
                        console.error('Error sharing:', error);
                    }).finally(() => {
                        // Hide loading
                        document.getElementById('loading-overlay').style.display = 'none';
                    });
                } else {
                    // Fallback to clipboard
                    const shareData = `${shareText}\n${shareUrl}`;
                    
                    navigator.clipboard.writeText(shareData).then(() => {
                        // Show success notification
                        if (typeof showNotification === 'function') {
                            showNotification('Link copied to clipboard', 'success');
                        } else {
                            alert('Link copied to clipboard');
                        }
                    }).catch((error) => {
                        console.error('Error copying to clipboard:', error);
                        
                        // Show error notification
                        if (typeof showNotification === 'function') {
                            showNotification('Error copying to clipboard', 'error');
                        } else {
                            alert('Error copying to clipboard');
                        }
                    }).finally(() => {
                        // Hide loading
                        document.getElementById('loading-overlay').style.display = 'none';
                    });
                }
            } catch (error) {
                console.error('Error sharing:', error);
                
                // Hide loading
                document.getElementById('loading-overlay').style.display = 'none';
                
                // Show error notification
                if (typeof showNotification === 'function') {
                    showNotification('Error sharing results', 'error');
                } else {
                    alert('Error sharing results');
                }
            }
        }, 500);
    }
}

// Initialize the application
window.tcoApp = new TCOAnalyzerApp();
EOL

# Create notification manager for user feedback
echo -e "${YELLOW}Creating notification manager...${NC}"
cat > "js/utils/notification-manager.js" << 'EOL'
/**
 * Notification Manager
 * Provides toast notifications for user feedback
 */

// Toast notification types
const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
};

// Show a notification toast
function showNotification(message, type = NOTIFICATION_TYPES.INFO, duration = 5000) {
    // Get the notification container
    const container = document.getElementById('toast-container');
    
    if (!container) {
        console.error('Toast container not found');
        return;
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `toast-notification ${type}`;
    
    // Add icon based on type
    let icon;
    switch (type) {
        case NOTIFICATION_TYPES.SUCCESS:
            icon = 'fa-check-circle';
            break;
        case NOTIFICATION_TYPES.ERROR:
            icon = 'fa-exclamation-circle';
            break;
        case NOTIFICATION_TYPES.WARNING:
            icon = 'fa-exclamation-triangle';
            break;
        case NOTIFICATION_TYPES.INFO:
        default:
            icon = 'fa-info-circle';
            break;
    }
    
    // Set notification content
    notification.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-message">${message}</div>
        </div>
        <div class="toast-close">
            <i class="fas fa-times"></i>
        </div>
    `;
    
    // Add notification to container
    container.appendChild(notification);
    
    // Add animation class
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Set up close button
    const closeBtn = notification.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after duration
    const timeoutId = setTimeout(() => {
        closeNotification(notification);
    }, duration);
    
    // Store timeout ID
    notification.dataset.timeoutId = timeoutId;
    
    return notification;
}

// Close a notification
function closeNotification(notification) {
    // Clear timeout
    const timeoutId = notification.dataset.timeoutId;
    if (timeoutId) {
        clearTimeout(parseInt(timeoutId));
    }
    
    // Remove show class to trigger exit animation
    notification.classList.remove('show');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Export functions
window.showNotification = showNotification;
window.closeNotification = closeNotification;
EOL

# Create notification CSS
echo -e "${YELLOW}Creating notification CSS...${NC}"
cat > "css/components/notifications.css" << 'EOL'
/* Toast Notifications */
.toast-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.toast-notification {
    display: flex;
    align-items: center;
    min-width: 300px;
    max-width: 450px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
    padding: 15px;
    margin-bottom: 10px;
    opacity: 0;
    transform: translateX(50px);
    transition: opacity 0.3s, transform 0.3s;
}

.toast-notification.show {
    opacity: 1;
    transform: translateX(0);
}

.toast-icon {
    margin-right: 15px;
    font-size: 1.5rem;
}

.toast-content {
    flex: 1;
}

.toast-message {
    font-size: 1rem;
    line-height: 1.4;
}

.toast-close {
    cursor: pointer;
    padding: 5px;
    margin-left: 10px;
    color: #999;
    transition: color 0.2s;
}

.toast-close:hover {
    color: #555;
}

/* Toast Types */
.toast-notification.success {
    border-left: 4px solid #2ecc71;
}

.toast-notification.success .toast-icon {
    color: #2ecc71;
}

.toast-notification.error {
    border-left: 4px solid #e74c3c;
}

.toast-notification.error .toast-icon {
    color: #e74c3c;
}

.toast-notification.warning {
    border-left: 4px solid #f39c12;
}

.toast-notification.warning .toast-icon {
    color: #f39c12;
}

.toast-notification.info {
    border-left: 4px solid #3498db;
}

.toast-notification.info .toast-icon {
    color: #3498db;
}

/* Dark Mode */
body.dark-mode .toast-notification {
    background-color: #2d3748;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
    color: #e2e8f0;
}

body.dark-mode .toast-close {
    color: #a0aec0;
}

body.dark-mode .toast-close:hover {
    color: #e2e8f0;
}
EOL

# Create enhanced CSS for the results pages
echo -e "${YELLOW}Creating enhanced results CSS...${NC}"
cat > "css/components/results.css" << 'EOL'
/* Enhanced Results Styles */
.results-container {
    padding: 20px;
    transition: all 0.3s ease;
}

.results-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;
}

.results-tabs {
    display: flex;
    gap: 5px;
    overflow-x: auto;
    padding-bottom: 5px;
}

.result-tab {
    white-space: nowrap;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
    background-color: transparent;
    border: none;
    color: #555;
}

.result-tab:hover {
    background-color: #f5f5f5;
    color: #333;
}

.result-tab.active {
    background-color: #0078d4;
    color: white;
}

.results-actions {
    display: flex;
    gap: 10px;
}

.result-panel {
    display: none;
    animation: fadeIn 0.5s;
}

.result-panel.active {
    display: block;
}

.executive-summary {
    margin-bottom: 30px;
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

.summary-card {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    border: 1px solid #eee;
}

.summary-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.summary-card.highlight {
    background-color: #f0f7ff;
    border: 1px solid #cce5ff;
}

.card-icon {
    width: 60px;
    height: 60px;
    background-color: #edf2f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #0078d4;
    margin-right: 15px;
}

.summary-card.highlight .card-icon {
    background-color: #ebf5ff;
    color: #0078d4;
}

.card-content {
    flex: 1;
}

.metric-value {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 5px;
    color: #333;
}

.summary-card.highlight .metric-value {
    color: #0078d4;
}

.metric-detail {
    font-size: 0.9rem;
    color: #666;
}

.key-insights {
    margin-top: 30px;
}

.insights-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.insight-item {
    display: flex;
    align-items: flex-start;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    border: 1px solid #eee;
    transition: all 0.3s;
}

.insight-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.insight-item i {
    font-size: 1.5rem;
    margin-right: 15px;
    color: #0078d4;
}

.insight-content {
    flex: 1;
}

.insight-content h4 {
    margin: 0 0 10px 0;
    font-size: 1.1rem;
    color: #333;
}

.insight-content p {
    margin: 0;
    font-size: 0.95rem;
    color: #555;
    line-height: 1.5;
}

/* ROI Analysis Styles */
.roi-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
}

.roi-details {
    margin-top: 20px;
}

.roi-summary {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 30px;
    border: 1px solid #eee;
}

.roi-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.roi-metric {
    text-align: center;
}

.roi-metric .metric-label {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 5px;
}

.roi-metric .metric-value {
    font-size: 1.8rem;
    font-weight: 600;
    color: #333;
}

.savings-chart {
    margin: 20px 0;
    position: relative;
    height: 40px;
    background-color: #f3f4f6;
    border-radius: 5px;
    overflow: hidden;
}

.savings-bar {
    display: flex;
    height: 100%;
    width: 100%;
}

.savings-segment {
    height: 100%;
    position: relative;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.8rem;
    font-weight: 500;
}

.savings-segment .segment-label {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
    padding: 0 5px;
}

.savings-segment.infrastructure {
    background-color: #3498db;
}

.savings-segment.personnel {
    background-color: #2ecc71;
}

.savings-segment.implementation {
    background-color: #9b59b6;
}

.savings-segment.downtime {
    background-color: #e74c3c;
}

.savings-segment.risk {
    background-color: #f39c12;
}

.savings-table {
    margin-top: 20px;
}

.savings-row {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    gap: 15px;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    align-items: center;
}

.savings-row:last-child {
    border-bottom: none;
}

.savings-row.total {
    font-weight: 600;
    border-top: 2px solid #ddd;
}

.savings-category {
    font-weight: 500;
}

.savings-value {
    text-align: right;
}

.roi-highlights {
    margin-top: 30px;
}

.highlights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.highlight-card {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s;
    border: 1px solid #eee;
}

.highlight-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.highlight-value {
    font-size: 2rem;
    font-weight: 600;
    color: #0078d4;
    margin-bottom: 10px;
}

.highlight-label {
    font-size: 0.9rem;
    color: #666;
}

/* Risk Analysis Styles */
.risk-reduction-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.risk-metric {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s;
    border: 1px solid #eee;
}

.risk-metric:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.risk-metric .metric-label {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 10px;
}

.risk-metric .metric-value {
    font-size: 1.6rem;
    font-weight: 600;
}

.mitigation-strategies {
    margin-top: 30px;
}

.strategies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.strategy-card {
    display: flex;
    align-items: flex-start;
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    transition: all 0.3s;
    border: 1px solid #eee;
}

.strategy-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.strategy-icon {
    width: 50px;
    height: 50px;
    background-color: #edf2f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #0078d4;
    margin-right: 15px;
}

.strategy-content {
    flex: 1;
}

.strategy-content h5 {
    margin: 0 0 10px 0;
    font-size: 1.1rem;
    color: #333;
}

.strategy-content p {
    margin: 0;
    font-size: 0.9rem;
    color: #555;
    line-height: 1.5;
}

.security-gap-analysis {
    margin-top: 30px;
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    border: 1px solid #eee;
}

.gap-meter {
    height: 20px;
    background-color: #edf2f7;
    border-radius: 10px;
    margin: 15px 0;
    overflow: hidden;
}

.gap-meter-fill {
    height: 100%;
    background-color: #e74c3c;
    border-radius: 10px;
}

.gap-label {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 10px;
    text-align: center;
}

/* Implementation Styles */
.roadmap-comparison {
    margin-top: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    border: 1px solid #eee;
    margin-bottom: 30px;
}

.roadmap-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #eee;
    font-weight: 600;
}

.roadmap-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
}

.roadmap-row:last-child {
    border-bottom: none;
}

.roadmap-row.total {
    font-weight: 600;
    border-top: 2px solid #eee;
}

.phase-name {
    font-weight: 500;
}

.phase-details {
    display: flex;
    flex-direction: column;
}

.phase-duration {
    font-weight: 600;
    margin-bottom: 5px;
}

.phase-description {
    font-size: 0.9rem;
    color: #666;
}

.implementation-benefits {
    margin-top: 30px;
}

.benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.benefit-card {
    display: flex;
    align-items: flex-start;
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    transition: all 0.3s;
    border: 1px solid #eee;
}

.benefit-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.benefit-icon {
    width: 50px;
    height: 50px;
    background-color: #edf2f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #0078d4;
    margin-right: 15px;
}

.benefit-content {
    flex: 1;
}

.benefit-content h5 {
    margin: 0 0 10px 0;
    font-size: 1.1rem;
    color: #333;
}

.benefit-content p {
    margin: 0;
    font-size: 0.9rem;
    color: #555;
    line-height: 1.5;
}

/* Dark Mode Styles */
body.dark-mode .results-nav {
    border-color: #4a5568;
}

body.dark-mode .result-tab {
    color: #e2e8f0;
}

body.dark-mode .result-tab:hover {
    background-color: #4a5568;
    color: #e2e8f0;
}

body.dark-mode .result-tab.active {
    background-color: #3182ce;
    color: white;
}

body.dark-mode .summary-card,
body.dark-mode .insight-item,
body.dark-mode .roi-summary,
body.dark-mode .highlight-card,
body.dark-mode .risk-metric,
body.dark-mode .strategy-card,
body.dark-mode .security-gap-analysis,
body.dark-mode .roadmap-comparison,
body.dark-mode .benefit-card {
    background-color: #2d3748;
    border-color: #4a5568;
}

body.dark-mode .summary-card.highlight {
    background-color: #2c5282;
    border-color: #2b6cb0;
}

body.dark-mode .card-icon,
body.dark-mode .strategy-icon,
body.dark-mode .benefit-icon {
    background-color: #4a5568;
    color: #63b3ed;
}

body.dark-mode .summary-card.highlight .card-icon {
    background-color: #2c5282;
    color: #63b3ed;
}

body.dark-mode .metric-value,
body.dark-mode .insight-content h4,
body.dark-mode .strategy-content h5,
body.dark-mode .benefit-content h5 {
    color: #e2e8f0;
}

body.dark-mode .summary-card.highlight .metric-value {
    color: #63b3ed;
}

body.dark-mode .metric-detail,
body.dark-mode .insight-content p,
body.dark-mode .strategy-content p,
body.dark-mode .benefit-content p,
body.dark-mode .phase-description,
body.dark-mode .gap-label {
    color: #a0aec0;
}

body.dark-mode .savings-chart {
    background-color: #4a5568;
}

body.dark-mode .savings-row {
    border-color: #4a5568;
}

body.dark-mode .savings-row.total {
    border-top-color: #718096;
}

body.dark-mode .highlight-value {
    color: #63b3ed;
}

body.dark-mode .highlight-label {
    color: #a0aec0;
}

body.dark-mode .gap-meter {
    background-color: #4a5568;
}

body.dark-mode .roadmap-header {
    border-color: #4a5568;
}

body.dark-mode .roadmap-row {
    border-color: #4a5568;
}

body.dark-mode .roadmap-row.total {
    border-top-color: #4a5568;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
EOL

# Create CSS for the sensitivity sidebar
echo -e "${YELLOW}Creating sensitivity sidebar CSS...${NC}"
cat > "css/components/sensitivity-sidebar.css" << 'EOL'
/* Sensitivity Sidebar Styles */
.sensitivity-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 350px;
    background-color: #f8f9fa;
    border-left: 1px solid #e9ecef;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    z-index: 1000;
    overflow-y: auto;
    transform: translateX(100%);
}

.sensitivity-sidebar.expanded {
    transform: translateX(0);
}

.sensitivity-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #e9ecef;
    background-color: #0078d4;
    color: white;
}

.sensitivity-header h3 {
    margin: 0;
    font-size: 1.2rem;
}

.btn-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
}

.sensitivity-content {
    padding: 20px;
}

.sensitivity-controls {
    margin-bottom: 20px;
}

.range-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 20px;
}

.input-group {
    margin-bottom: 15px;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
    font-size: 0.9rem;
    color: #555;
    font-weight: 500;
}

.form-input,
.form-select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #333;
    transition: all 0.3s;
}

.form-input:focus,
.form-select:focus {
    outline: none;
    border-color: #0078d4;
    box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.2);
}

.sensitivity-results {
    height: 400px;
    margin-top: 20px;
}

.sensitivity-results canvas {
    width: 100%;
    height: 100%;
}

/* Dark Mode Styles */
body.dark-mode .sensitivity-sidebar {
    background-color: #2d3748;
    border-color: #4a5568;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
}

body.dark-mode .sensitivity-header {
    background-color: #1a202c;
    border-color: #4a5568;
}

body.dark-mode .input-group label {
    color: #e2e8f0;
}

body.dark-mode .form-input,
body.dark-mode .form-select {
    background-color: #2d3748;
    border-color: #4a5568;
    color: #e2e8f0;
}

body.dark-mode .form-input:focus,
body.dark-mode .form-select:focus {
    border-color: #63b3ed;
    box-shadow: 0 0 0 3px rgba(99, 179, 237, 0.2);
}
EOL

# Update index.html with new CSS and JS files
echo -e "${YELLOW}Updating index.html with new CSS and JS files...${NC}"

# Add new CSS files
sed -i.bak '/<link rel="stylesheet" href="css\/components\/enhanced-wizard.css">/a \
    <link rel="stylesheet" href="css/components/notifications.css">\
    <link rel="stylesheet" href="css/components/results.css">\
    <link rel="stylesheet" href="css/components/sensitivity-sidebar.css">' index.html

# Add new JS files
sed -i.bak '/<script src="js\/components\/ui\/dark-mode.js"><\/script>/a \
    <script src="js/utils/notification-manager.js"></script>\
    <script src="js/components/integrator.js"></script>' index.html

# Create favicon image if it doesn't exist
echo -e "${YELLOW}Creating favicon...${NC}"
mkdir -p img
cat > "img/favicon.svg" << 'EOL'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="10" fill="#0078d4"/>
  <path d="M50 20c-16.569 0-30 13.431-30 30s13.431 30 30 30 30-13.431 30-30-13.431-30-30-30zm-5 40h-5V40h5v20zm15 0h-5V40h5v20z" fill="white"/>
  <path d="M25 30h50v5H25v-5zm0 35h50v5H25v-5z" fill="white"/>
</svg>
EOL

# Create improved HTML structure for results
echo -e "${YELLOW}Enhancing results HTML structure...${NC}"

# Create a temporary file with improved results HTML
cat > "results_html.txt" << 'EOL'
            <!-- Results Container -->
            <div class="results-container hidden" id="results-container">
                <!-- Results Navigation -->
                <div class="results-nav">
                    <div class="results-tabs">
                        <button class="result-tab active" data-tab="overview">Overview</button>
                        <button class="result-tab" data-tab="comparison">Cost Comparison</button>
                        <button class="result-tab" data-tab="implementation">Implementation</button>
                        <button class="result-tab" data-tab="features">Features</button>
                        <button class="result-tab" data-tab="industry">Industry & Compliance</button>
                        <button class="result-tab" data-tab="roi">ROI Analysis</button>
                        <button class="result-tab" data-tab="risk">Risk Analysis</button>
                        <button class="result-tab" data-tab="sensitivity">Sensitivity</button>
                    </div>
                    
                    <div class="results-actions">
                        <button id="export-pdf" class="btn btn-outline">
                            <i class="fas fa-file-pdf"></i> Export PDF
                        </button>
                        <button id="share-results" class="btn btn-outline">
                            <i class="fas fa-share-alt"></i> Share
                        </button>
                        <button id="new-calculation" class="btn btn-outline">
                            <i class="fas fa-plus"></i> New Calculation
                        </button>
                    </div>
                </div>
                
                <!-- Results Content -->
                <div class="results-content">
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
                                        <div class="metric-value" id="total-savings">$0</div>
                                        <div class="metric-detail" id="savings-percentage">0%</div>
                                    </div>
                                </div>
                                
                                <div class="summary-card">
                                    <div class="card-icon">
                                        <i class="fas fa-clock"></i>
                                    </div>
                                    <div class="card-content">
                                        <h4>Break-even Point</h4>
                                        <div class="metric-value" id="breakeven-point">0 months</div>
                                        <div class="metric-detail">Time to positive ROI</div>
                                    </div>
                                </div>
                                
                                <div class="summary-card">
                                    <div class="card-icon">
                                        <i class="fas fa-shield-alt"></i>
                                    </div>
                                    <div class="card-content">
                                        <h4>Risk Reduction</h4>
                                        <div class="metric-value" id="risk-reduction">0%</div>
                                        <div class="metric-detail">Security improvement</div>
                                    </div>
                                </div>
                                
                                <div class="summary-card">
                                    <div class="card-icon">
                                        <i class="fas fa-rocket"></i>
                                    </div>
                                    <div class="card-content">
                                        <h4>Implementation Time</h4>
                                        <div class="metric-value" id="implementation-time">0 days</div>
                                        <div class="metric-detail">vs. current solution</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="key-insights">
                            <h3>Key Insights</h3>
                            <div class="insights-list" id="key-insights-list">
                                <!-- Insights populated dynamically -->
                            </div>
                        </div>
                    </div>
                    
                    <!-- Comparison Tab -->
                    <div class="result-panel" id="comparison-panel">
                        <div class="comparison-charts">
                            <div class="chart-grid">
                                <div class="chart-card">
                                    <h3>3-Year TCO Comparison</h3>
                                    <canvas id="tco-comparison-chart"></canvas>
                                </div>

                                <div class="chart-card">
                                    <h3>Current Solution Cost Breakdown</h3>
                                    <canvas id="current-breakdown-chart"></canvas>
                                </div>

                                <div class="chart-card">
                                    <h3>Portnox Cloud Cost Breakdown</h3>
                                    <canvas id="alternative-breakdown-chart"></canvas>
                                </div>

                                <div class="chart-card">
                                    <h3>Cumulative Cost Over Time</h3>
                                    <canvas id="cumulative-cost-chart"></canvas>
                                </div>
                            </div>
                        </div>

                        <div class="comparison-table">
                            <h3>Detailed Cost Comparison</h3>
                            <table id="cost-comparison-table" class="data-table">
                                <!-- Table populated dynamically -->
                            </table>
                        </div>
                    </div>

                    <!-- Implementation Tab -->
                    <div class="result-panel" id="implementation-panel">
                        <div class="implementation-content">
                            <div class="chart-card">
                                <h3>Implementation Timeline Comparison</h3>
                                <canvas id="implementation-comparison-chart"></canvas>
                            </div>

                            <div class="implementation-details">
                                <h3>Implementation Roadmap</h3>
                                <div id="implementation-roadmap">
                                    <!-- Roadmap populated dynamically -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Features Tab -->
                    <div class="result-panel" id="features-panel">
                        <div class="features-content">
                            <div class="chart-card">
                                <h3>Feature Comparison</h3>
                                <canvas id="feature-comparison-chart"></canvas>
                            </div>

                            <div class="features-matrix">
                                <h3>Detailed Feature Matrix</h3>
                                <table id="features-matrix-table" class="data-table">
                                    <!-- Table populated dynamically -->
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- Industry & Compliance Tab --> 
                    <div class="result-panel" id="industry-panel"> 
                        <div class="industry-compliance-content"> 
                            <div class="chart-card"> 
                                <h3>Industry Compliance Framework Coverage</h3> 
                                <canvas id="industry-compliance-chart"></canvas> 
                            </div> 
                            
                            <div class="industry-details"> 
                                <h3>Industry-Specific Requirements</h3> 
                                <div id="industry-requirements-container"> 
                                    <!-- Industry requirements loaded dynamically --> 
                                </div> 
                            </div> 
                            
                            <div class="compliance-matrix"> 
                                <h3>Detailed Compliance Matrix</h3> 
                                <div id="compliance-matrix-container"> 
                                    <!-- Compliance matrix loaded dynamically --> 
                                </div> 
                            </div> 
                        </div> 
                    </div>

                    <!-- ROI Tab -->
                    <div class="result-panel" id="roi-panel">
                        <div class="roi-content">
                            <div class="chart-card">
                                <h3>ROI Analysis</h3>
                                <canvas id="roi-chart"></canvas>
                            </div>

                            <div class="roi-details">
                                <h3>ROI Breakdown</h3>
                                <div id="roi-breakdown">
                                    <!-- ROI details populated dynamically -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Risk Tab -->
                    <div class="result-panel" id="risk-panel">
                        <div class="risk-content">
                            <div class="chart-card">
                                <h3>Risk Assessment Analysis</h3>
                                <canvas id="risk-analysis-chart"></canvas>
                            </div>
                            <div class="risk-matrix">
                                <h3>Risk Assessment Matrix</h3>
                                <div id="risk-matrix">
                                    <!-- Risk matrix populated dynamically -->
                                </div>
                            </div>

                            <div class="risk-mitigation">
                                <h3>Risk Mitigation Strategies</h3>
                                <div id="risk-mitigation-strategies">
                                    <!-- Strategies populated dynamically -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sensitivity Tab -->
                    <div class="result-panel" id="sensitivity-panel">
                        <div class="sensitivity-content">
                            <div class="sensitivity-controls">
                                <h3>Sensitivity Analysis Parameters</h3>
                                <div class="parameter-grid">
                                    <div class="parameter-card">
                                        <label for="sensitivity-variable">Variable to Analyze</label>
                                        <select id="sensitivity-variable" class="form-select">
                                            <option value="deviceCount">Device Count</option>
                                            <option value="cost">Cost per Device</option>
                                            <option value="fteCost">FTE Costs</option>
                                            <option value="fteAllocation">FTE Allocation</option>
                                            <option value="years">Analysis Period</option>
                                            <option value="portnoxBasePrice">Portnox Price</option>
                                            <option value="portnoxDiscount">Portnox Discount</option>
                                        </select>
                                    </div>
                                    
                                    <div class="parameter-card">
                                        <label>Value Range</label>
                                        <div class="range-inputs">
                                            <input type="number" id="sensitivity-min" class="form-input" placeholder="Min">
                                            <input type="number" id="sensitivity-max" class="form-input" placeholder="Max">
                                        </div>
                                    </div>
                                </div>
                                
                                <button id="run-sensitivity" class="btn btn-primary">
                                    Run Sensitivity Analysis
                                </button>
                            </div>
                            
                            <div class="sensitivity-results">
                                <div class="chart-card">
                                    <h3>Sensitivity Analysis Results</h3>
                                    <canvas id="sensitivity-chart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Integrated Sensitivity Analysis -->
            <div class="sensitivity-sidebar" id="sensitivity-sidebar">
                <div class="sensitivity-header">
                    <h3>Sensitivity Analysis</h3>
                    <button id="close-sensitivity" class="btn-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="sensitivity-content">
                    <div class="sensitivity-controls">
                        <div class="input-group">
                            <label for="sensitivity-variable-sidebar">Variable to Analyze</label>
                            <select id="sensitivity-variable-sidebar" class="form-select">
                                <option value="deviceCount">Device Count</option>
                                <option value="fteCost">FTE Costs</option>
                                <option value="fteAllocation">FTE Allocation</option>
                                <option value="years">Analysis Period</option>
                                <option value="portnoxBasePrice">Portnox Price</option>
                                <option value="portnoxDiscount">Portnox Discount</option>
                            </select>
                        </div>
                        
                        <div class="range-inputs">
                            <div class="input-group">
                                <label for="sensitivity-min-sidebar">Min Value</label>
                                <input type="number" id="sensitivity-min-sidebar" class="form-input">
                            </div>
                            <div class="input-group">
                                <label for="sensitivity-max-sidebar">Max Value</label>
                                <input type="number" id="sensitivity-max-sidebar" class="form-input">
                            </div>
                        </div>
                        
                        <button id="run-sensitivity-sidebar" class="btn btn-primary">
                            Run Analysis
                        </button>
                    </div>
                    
                    <div class="sensitivity-results">
                        <canvas id="sensitivity-chart-sidebar"></canvas>
                    </div>
                </div>
            </div>
EOL

# Replace the results container in index.html
sed -i.bak '/<!-- Results Container -->/,/<!-- Integrated Sensitivity Analysis -->/c\ 
'"$(cat results_html.txt)" index.html

# Remove temporary file
rm results_html.txt

# Create custom styling tweaks for better appearance
echo -e "${YELLOW}Creating additional style tweaks...${NC}"
cat > "css/style-tweaks.css" << 'EOL'
/* Custom style tweaks for better appearance */
.app-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
}

.app-header {
    padding: 15px 0;
}

.footer-brand {
    color: #0078d4;
    text-decoration: none;
    font-weight: 600;
}

body.dark-mode .footer-brand {
    color: #63b3ed;
}

.chart-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

.chart-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: all 0.3s;
}

.chart-card:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.chart-card h3 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.1rem;
    color: #333;
}

body.dark-mode .chart-card {
    background-color: #2d3748;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

body.dark-mode .chart-card h3 {
    color: #e2e8f0;
}

.highlight-positive {
    color: #2ecc71;
}

.highlight-negative {
    color: #e74c3c;
}

.highlight-neutral {
    color: #3498db;
}

.highlight-warning {
    color: #f39c12;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

.data-table th, .data-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.data-table th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #333;
}

.data-table tr:hover {
    background-color: #f5f5f5;
}

body.dark-mode .data-table th {
    background-color: #4a5568;
    color: #e2e8f0;
}

body.dark-mode .data-table td, body.dark-mode .data-table th {
    border-color: #4a5568;
}

body.dark-mode .data-table tr:hover {
    background-color: #3a4556;
}

/* Fix the wizard animation */
.wizard-step.active {
    animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Make buttons more appealing */
.btn {
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.3s;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.btn-primary {
    background-color: #0078d4;
    color: white;
    border: none;
}

.btn-primary:hover {
    background-color: #006cbe;
}

.btn-outline {
    background-color: transparent;
    color: #555;
    border: 1px solid #ddd;
}

.btn-outline:hover {
    background-color: #f5f5f5;
}

.btn-large {
    padding: 12px 24px;
    font-size: 1.1rem;
}

body.dark-mode .btn-outline {
    color: #e2e8f0;
    border-color: #4a5568;
}

body.dark-mode .btn-outline:hover {
    background-color: #4a5568;
}

/* Fix the wizard navigation */
.wizard-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}
EOL

# Add the style tweaks CSS to index.html
sed -i.bak '/<link rel="stylesheet" href="css\/components\/sensitivity-sidebar.css">/a \
    <link rel="stylesheet" href="css/style-tweaks.css">' index.html

# Create README file for future reference
echo -e "${YELLOW}Creating README file...${NC}"
cat > "README.md" << 'EOL'
# Portnox Total Cost Analyzer

## Overview

The Portnox Total Cost Analyzer is an interactive web application that helps organizations compare the total cost of ownership (TCO) of various Network Access Control (NAC) solutions against Portnox Cloud NAC-as-a-Service. The analyzer provides detailed cost comparisons, ROI analysis, feature comparisons, compliance coverage, risk assessment, and implementation timelines.

## Features

- **Multi-vendor comparison**: Compare TCO across major NAC vendors including Cisco ISE, Aruba ClearPass, Forescout, and more
- **Detailed TCO analysis**: Break down costs into hardware, software, implementation, maintenance, and personnel
- **Interactive charts**: Visualize cost comparisons and savings with interactive charts
- **Feature comparison**: Compare feature sets across different NAC solutions
- **Compliance analysis**: Evaluate compliance coverage for industry-specific frameworks
- **Risk assessment**: Quantify security risks and potential breach costs
- **Implementation planning**: Compare deployment timelines and resource requirements
- **Sensitivity analysis**: Test how changes to key parameters affect the overall TCO
- **PDF export**: Generate and download analysis reports
- **Dark mode support**: Toggle between light and dark themes for better viewing comfort

## Technical Details

- **Framework**: Plain JavaScript with Chart.js for visualizations
- **UI Components**: Responsive design with CSS Grid and Flexbox
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Dependencies**: 
  - Chart.js for data visualization
  - Font Awesome for icons
  - Tippy.js for tooltips
  - jsPDF for PDF generation

## Project Structure

```
├── css/               # CSS files
│   ├── components/    # Component-specific CSS
│   └── main.css       # Main stylesheet
├── img/               # Images and icons
│   └── vendors/       # Vendor logos
├── js/                # JavaScript files
│   ├── charts/        # Chart generators
│   ├── components/    # UI components
│   ├── data/          # Data models and calculations
│   └── utils/         # Utility functions
├── libs/              # Third-party libraries
│   ├── css/           # Third-party CSS
│   └── js/            # Third-party JavaScript
└── index.html         # Main HTML file
```

## Usage

1. Open `index.html` in a web browser
2. Select your current NAC vendor (or "No NAC" if none)
3. Complete the wizard steps to provide information about your organization
4. View the TCO comparison and detailed analysis

## Maintenance and Updates

The application uses a modular structure to facilitate updates and maintenance:

- To add a new vendor, add its data to `js/data/vendors/vendors-data.js`
- To update compliance frameworks, modify `js/data/compliance/compliance-data.js`
- To adjust the TCO calculation logic, update `js/data/tco/tco-calculator.js`

## License

Copyright © 2025 Portnox. All rights reserved.
EOL

# Add particle background configuration
echo -e "${YELLOW}Creating particles background configuration...${NC}"
mkdir -p js/config
cat > "js/config/particles-config.js" << 'EOL'
// Particles.js configuration for the background effect
document.addEventListener('DOMContentLoaded', function() {
    if (typeof particlesJS === 'function' && document.getElementById('particles-js')) {
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
                    "value": "#0078d4"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3,
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
                    "color": "#0078d4",
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
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 100,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
        
        // Update particle colors when dark mode changes
        document.addEventListener('darkModeChanged', function(e) {
            const isDarkMode = e.detail.isDarkMode;
            const color = isDarkMode ? '#63b3ed' : '#0078d4';
            
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                const particles = window.pJSDom[0].pJS.particles;
                
                particles.color.value = color;
                particles.line_linked.color = color;
                
                particles.particles.forEach(function(p) {
                    p.color.value = color;
                });
            }
        });
    }
});
EOL

# Add script reference to particles config
sed -i.bak '/<script src="libs\/js\/particles.min.js"><\/script>/a \
    <script src="js/config/particles-config.js"></script>' index.html

# Final adjustments to ensure smooth integration
echo -e "${YELLOW}Making final adjustments...${NC}"

# Create temp file to store the modified CSS
cat > "css/fixes/final-adjustments.css" << 'EOL'
/* Final adjustments for smoother integration */

/* Fix z-index issues with sidebar and other elements */
.tco-sidebar {
    z-index: 1001; /* Higher than sensitivity sidebar */
}

.sensitivity-sidebar {
    z-index: 1000;
}

.loading-overlay {
    z-index: 2000; /* Highest z-index to cover everything */
}

.toast-container {
    z-index: 1900; /* Lower than loading but higher than other elements */
}

/* Ensure the wizard container has appropriate padding and spacing */
.calculator-container {
    padding: 20px 0;
}

.wizard-container {
    margin-bottom: 40px;
}

/* Fix header alignment */
.logo-section {
    display: flex;
    align-items: center;
}

.company-logo {
    max-height: 40px;
    margin-right: 15px;
}

.app-title h1 {
    margin: 0;
    font-size: 1.5rem;
}

.subtitle {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
}

body.dark-mode .subtitle {
    color: #a0aec0;
}

/* Ensure proper vendor card heights */
.vendor-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}

.vendor-card {
    display: flex;
    flex-direction: column;
    min-height: 180px;
}

.vendor-logo {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.vendor-logo img {
    max-height: 50px;
    max-width: 100%;
    object-fit: contain;
}

/* Improve progress steps visibility */
.progress-steps {
    margin-top: 10px;
}

.progress-step {
    position: relative;
}

.progress-step:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 50%;
    width: 100%;
    height: 2px;
    background-color: #eee;
    z-index: -1;
}

body.dark-mode .progress-step:not(:last-child)::after {
    background-color: #4a5568;
}

.progress-step.completed:not(:last-child)::after {
    background-color: #0078d4;
}

body.dark-mode .progress-step.completed:not(:last-child)::after {
    background-color: #3182ce;
}

/* Fix the footer */
.app-footer {
    margin-top: 40px;
    padding: 20px 0;
    border-top: 1px solid #eee;
}

body.dark-mode .app-footer {
    border-color: #4a5568;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

.footer-links {
    display: flex;
    gap: 20px;
}

.footer-links a {
    color: #666;
    text-decoration: none;
    transition: color 0.2s;
}

.footer-links a:hover {
    color: #0078d4;
}

body.dark-mode .footer-links a {
    color: #a0aec0;
}

body.dark-mode .footer-links a:hover {
    color: #63b3ed;
}

.footer-social {
    display: flex;
    gap: 10px;
}

.social-link {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    transition: all 0.2s;
}

.social-link:hover {
    background-color: #0078d4;
    color: white;
    border-color: #0078d4;
}

body.dark-mode .social-link {
    border-color: #4a5568;
    color: #a0aec0;
}

body.dark-mode .social-link:hover {
    background-color: #3182ce;
    color: white;
    border-color: #3182ce;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .header-content {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .header-actions {
        margin-top: 15px;
        width: 100%;
        justify-content: space-between;
    }
    
    .results-nav {
        flex-direction: column;
        gap: 15px;
    }
    
    .results-tabs {
        width: 100%;
        overflow-x: auto;
    }
    
    .results-actions {
        width: 100%;
        justify-content: space-between;
    }
    
    .footer-content {
        flex-direction: column;
        align-items: center;
    }
    
    .summary-grid,
    .insights-list,
    .chart-grid,
    .strategies-grid,
    .benefits-grid {
        grid-template-columns: 1fr;
    }
    
    .roadmap-row,
    .roadmap-header {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
    }
    
    .roadmap-row div:not(:first-child) {
        margin-left: 20px;
    }
    
    .sensitivity-sidebar {
        width: 100%;
    }
}
EOL

# Add the final adjustments CSS to index.html
sed -i.bak '/<link rel="stylesheet" href="css\/style-tweaks.css">/a \
    <link rel="stylesheet" href="css/fixes/final-adjustments.css">' index.html

echo -e "${GREEN}Integration completed successfully!${NC}"
echo -e "${YELLOW}The TCO Multi-Vendor Analyzer is now ready to use.${NC}"
echo -e "${YELLOW}Please verify the application by opening index.html in your browser.${NC}"

/**
 * UI and Workflow Enhancements for Portnox Total Cost Analyzer
 * Improves user experience and streamlines the analysis process
 */

(function() {
    'use strict';
    
    class UIWorkflowEnhancements {
        constructor() {
            this.initialized = false;
            this.currentStep = 1;
            this.totalSteps = 4;
        }
        
        init() {
            console.log('🎨 Initializing UI and Workflow enhancements...');
            
            // Add quick action handlers
            this.setupQuickActions();
            
            // Enhance form interactions
            this.enhanceFormInputs();
            
            // Add progress indicators
            this.addProgressIndicators();
            
            // Setup keyboard shortcuts
            this.setupKeyboardShortcuts();
            
            // Add tooltips
            this.addTooltips();
            
            // Enhance sidebar
            this.enhanceSidebar();
            
            this.initialized = true;
            console.log('✅ UI and Workflow enhancements initialized');
        }
        
        setupQuickActions() {
            // Quick Compare
            const quickCompare = document.getElementById('quick-compare');
            if (quickCompare) {
                quickCompare.addEventListener('click', () => {
                    this.quickCompareVendors();
                });
            }
            
            // Quick Insights
            const quickInsights = document.getElementById('quick-insights');
            if (quickInsights) {
                quickInsights.addEventListener('click', () => {
                    if (window.ultimateExecutiveView) {
                        window.ultimateExecutiveView.generateAIInsights();
                    }
                });
            }
            
            // Quick Report
            const quickReport = document.getElementById('quick-report');
            if (quickReport) {
                quickReport.addEventListener('click', () => {
                    if (window.ultimateExecutiveView) {
                        window.ultimateExecutiveView.generatePresentation();
                    }
                });
            }
        }
        
        quickCompareVendors() {
            // Select top 3 competitors automatically
            const vendorCards = document.querySelectorAll('.vendor-card');
            const topVendors = ['portnox', 'cisco-ise', 'aruba-clearpass', 'forescout'];
            
            vendorCards.forEach(card => {
                const vendorId = card.getAttribute('data-vendor');
                if (topVendors.includes(vendorId)) {
                    card.classList.add('selected');
                    if (window.ultimateExecutiveView) {
                        window.ultimateExecutiveView.selectedVendors.push(vendorId);
                    }
                }
            });
            
            // Trigger calculation
            document.getElementById('main-calculate-btn')?.click();
            
            this.showNotification('Quick comparison loaded with top vendors', 'success');
        }
        
        enhanceFormInputs() {
            // Add input validation and formatting
            const numberInputs = document.querySelectorAll('input[type="number"]');
            
            numberInputs.forEach(input => {
                input.addEventListener('input', (e) => {
                    // Format with commas
                    const value = e.target.value.replace(/,/g, '');
                    if (!isNaN(value) && value !== '') {
                        e.target.setAttribute('data-raw-value', value);
                    }
                });
                
                input.addEventListener('blur', (e) => {
                    const rawValue = e.target.getAttribute('data-raw-value');
                    if (rawValue) {
                        e.target.value = parseInt(rawValue).toLocaleString();
                    }
                });
                
                // Add increment/decrement buttons
                this.addSpinnerButtons(input);
            });
        }
        
        addSpinnerButtons(input) {
            const wrapper = document.createElement('div');
            wrapper.className = 'input-spinner-wrapper';
            
            const upButton = document.createElement('button');
            upButton.className = 'spinner-button up';
            upButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
            
            const downButton = document.createElement('button');
            downButton.className = 'spinner-button down';
            downButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
            
            upButton.addEventListener('click', () => {
                const step = parseInt(input.step) || 1;
                const max = parseInt(input.max) || Infinity;
                const current = parseInt(input.value.replace(/,/g, '')) || 0;
                if (current + step <= max) {
                    input.value = current + step;
                    input.dispatchEvent(new Event('change'));
                }
            });
            
            downButton.addEventListener('click', () => {
                const step = parseInt(input.step) || 1;
                const min = parseInt(input.min) || 0;
                const current = parseInt(input.value.replace(/,/g, '')) || 0;
                if (current - step >= min) {
                    input.value = current - step;
                    input.dispatchEvent(new Event('change'));
                }
            });
            
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);
            wrapper.appendChild(upButton);
            wrapper.appendChild(downButton);
        }
        
        addProgressIndicators() {
            const progressBar = document.createElement('div');
            progressBar.className = 'workflow-progress';
            progressBar.innerHTML = `
                <div class="progress-steps">
                    <div class="progress-step active" data-step="1">
                        <div class="step-icon"><i class="fas fa-cog"></i></div>
                        <div class="step-label">Configure</div>
                    </div>
                    <div class="progress-line"></div>
                    <div class="progress-step" data-step="2">
                        <div class="step-icon"><i class="fas fa-balance-scale"></i></div>
                        <div class="step-label">Compare</div>
                    </div>
                    <div class="progress-line"></div>
                    <div class="progress-step" data-step="3">
                        <div class="step-icon"><i class="fas fa-chart-line"></i></div>
                        <div class="step-label">Analyze</div>
                    </div>
                    <div class="progress-line"></div>
                    <div class="progress-step" data-step="4">
                        <div class="step-icon"><i class="fas fa-file-export"></i></div>
                        <div class="step-label">Export</div>
                    </div>
                </div>
            `;
            
            const header = document.querySelector('.header-content');
            if (header) {
                header.appendChild(progressBar);
            }
        }
        
        updateProgress(step) {
            this.currentStep = step;
            const steps = document.querySelectorAll('.progress-step');
            
            steps.forEach((stepEl, index) => {
                if (index + 1 <= step) {
                    stepEl.classList.add('active');
                    if (index + 1 < step) {
                        stepEl.classList.add('completed');
                    }
                } else {
                    stepEl.classList.remove('active', 'completed');
                }
            });
        }
        
        setupKeyboardShortcuts() {
            document.addEventListener('keydown', (e) => {
                // Ctrl/Cmd + S: Save/Export
                if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                    e.preventDefault();
                    document.getElementById('export-btn')?.click();
                }
                
                // Ctrl/Cmd + Enter: Calculate
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    document.getElementById('main-calculate-btn')?.click();
                }
                
                // Ctrl/Cmd + I: AI Insights
                if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
                    e.preventDefault();
                    document.getElementById('quick-insights')?.click();
                }
                
                // Escape: Close modals
                if (e.key === 'Escape') {
                    this.closeAllModals();
                }
            });
        }
        
        closeAllModals() {
            document.querySelectorAll('.modal, .ai-insights-modal, .scenarios-modal').forEach(modal => {
                modal.remove();
            });
        }
        
        addTooltips() {
            const tooltipTargets = [
                { selector: '#device-count', text: 'Total number of devices to be managed' },
                { selector: '#location-count', text: 'Number of physical locations or sites' },
                { selector: '#fte-cost', text: 'Average fully-loaded cost per IT FTE' },
                { selector: '#breach-cost', text: 'Estimated cost of a security breach' },
                { selector: '#risk-multiplier', text: 'Adjust based on your industry risk profile' }
            ];
            
            tooltipTargets.forEach(({ selector, text }) => {
                const element = document.querySelector(selector);
                if (element) {
                    element.setAttribute('data-tooltip', text);
                    element.classList.add('has-tooltip');
                }
            });
        }
        
        enhanceSidebar() {
            const sidebar = document.getElementById('sidebar');
            const toggleBtn = document.getElementById('sidebar-toggle');
            
            if (sidebar && toggleBtn) {
                // Add smooth collapse/expand
                toggleBtn.addEventListener('click', () => {
                    sidebar.classList.toggle('collapsed');
                    const icon = toggleBtn.querySelector('i');
                    if (sidebar.classList.contains('collapsed')) {
                        icon.className = 'fas fa-chevron-right';
                    } else {
                        icon.className = 'fas fa-chevron-left';
                    }
                });
                
                // Remember sidebar state
                const savedState = localStorage.getItem('sidebarCollapsed');
                if (savedState === 'true') {
                    sidebar.classList.add('collapsed');
                    toggleBtn.querySelector('i').className = 'fas fa-chevron-right';
                }
            }
        }
        
        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `ui-notification ${type}`;
            notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => notification.classList.add('show'), 10);
            
            // Auto remove
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 4000);
        }
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.uiWorkflowEnhancements = new UIWorkflowEnhancements();
            window.uiWorkflowEnhancements.init();
        });
    } else {
        window.uiWorkflowEnhancements = new UIWorkflowEnhancements();
        window.uiWorkflowEnhancements.init();
    }
})();

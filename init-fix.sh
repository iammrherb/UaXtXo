#!/bin/bash

# Portnox TCO Analyzer Direct Syntax and Navigation Fixes
# This script directly addresses the specific syntax errors and UI positioning issues

# Set script to exit on error
set -e

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Define project directory (update this to your actual project path)
PROJECT_DIR="$(pwd)"
BACKUP_DIR="${PROJECT_DIR}/syntax_fix_backup_$(date +%Y%m%d_%H%M%S)"

# Log function
log() {
    echo -e "${GREEN}[$(date +%T)]${NC} $1"
}

# Warning function
warn() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Error function
error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Create backup directory
create_backup() {
    log "Creating backup in ${BACKUP_DIR}"
    mkdir -p "${BACKUP_DIR}"
    
    # Backup the specific files we're going to modify
    mkdir -p "${BACKUP_DIR}/js/wizards" "${BACKUP_DIR}/js/components" "${BACKUP_DIR}/css"
    
    # Backup wizard.js
    if [ -f "${PROJECT_DIR}/js/wizards/wizard-controller.js" ]; then
        cp "${PROJECT_DIR}/js/wizards/wizard-controller.js" "${BACKUP_DIR}/js/wizards/" || warn "Could not backup wizard-controller.js"
    fi
    
    # Backup calculator.js
    if [ -f "${PROJECT_DIR}/js/components/calculator.js" ]; then
        cp "${PROJECT_DIR}/js/components/calculator.js" "${BACKUP_DIR}/js/components/" || warn "Could not backup calculator.js"
    fi
    
    # Backup wizard.css
    if [ -f "${PROJECT_DIR}/css/wizard.css" ]; then
        cp "${PROJECT_DIR}/css/wizard.css" "${BACKUP_DIR}/css/" || warn "Could not backup wizard.css"
    fi
    
    # Backup index.html
    if [ -f "${PROJECT_DIR}/index.html" ]; then
        cp "${PROJECT_DIR}/index.html" "${BACKUP_DIR}/" || warn "Could not backup index.html"
    fi
    
    log "Backup completed"
}

# Fix specific syntax errors
fix_syntax_errors() {
    log "Fixing specific syntax errors in JavaScript files..."
    
    # Fix wizard.js line 355
    if [ -f "${PROJECT_DIR}/js/wizards/wizard-controller.js" ]; then
        log "Fixing wizard-controller.js line 355"
        # Create a temporary file with the fixed content
        awk 'NR==355 {gsub(/if \(currentStep == totalSteps\) nextButton.innerText = "View Results"/, "if (currentStep === totalSteps) { nextButton.innerText = \"View Results\"; }")} {print}' "${PROJECT_DIR}/js/wizards/wizard-controller.js" > "${PROJECT_DIR}/js/wizards/wizard-controller.js.fixed"
        
        # Replace original with fixed version
        mv "${PROJECT_DIR}/js/wizards/wizard-controller.js.fixed" "${PROJECT_DIR}/js/wizards/wizard-controller.js"
        
        # Additional fixes for wizard.js
        log "Applying additional fixes to wizard-controller.js"
        # Fix potential issue with event listener binding
        sed -i.bak 's/nextButton.addEventListener("click", () => this.nextStep());/nextButton.addEventListener("click", () => { this.nextStep(); });/g' "${PROJECT_DIR}/js/wizards/wizard-controller.js"
        sed -i.bak 's/prevButton.addEventListener("click", () => this.prevStep());/prevButton.addEventListener("click", () => { this.prevStep(); });/g' "${PROJECT_DIR}/js/wizards/wizard-controller.js"
        
        # Fix potential issue with showCurrentStep function
        sed -i.bak 's/showCurrentStep() {/showCurrentStep() { try {/g' "${PROJECT_DIR}/js/wizards/wizard-controller.js"
        sed -i.bak '/updateNavigationButtons();/a \ \ \ \ \ \ \ \ } catch (error) { console.error("Error in showCurrentStep:", error); }' "${PROJECT_DIR}/js/wizards/wizard-controller.js"
    else
        warn "Could not locate wizard-controller.js file"
    fi
    
    # Fix calculator.js line 315
    if [ -f "${PROJECT_DIR}/js/components/calculator.js" ]; then
        log "Fixing calculator.js line 315"
        # Create a temporary file with the fixed content
        awk 'NR==315 {gsub(/if \(currentCost = 0\)/, "if (currentCost === 0)")} {print}' "${PROJECT_DIR}/js/components/calculator.js" > "${PROJECT_DIR}/js/components/calculator.js.fixed"
        
        # Replace original with fixed version
        mv "${PROJECT_DIR}/js/components/calculator.js.fixed" "${PROJECT_DIR}/js/components/calculator.js"
        
        # Additional fixes for calculator.js
        log "Applying additional fixes to calculator.js"
        # Fix potential issue with event listener binding
        sed -i.bak 's/calculateButton.addEventListener("click", () => this.calculateTCO());/calculateButton.addEventListener("click", () => { this.calculateTCO(); });/g' "${PROJECT_DIR}/js/components/calculator.js"
        
        # Fix potential issue with calculateTCO function
        sed -i.bak 's/calculateTCO() {/calculateTCO() { try {/g' "${PROJECT_DIR}/js/components/calculator.js"
        sed -i.bak '/updateUIWithResults(results);/a \ \ \ \ \ \ \ \ } catch (error) { console.error("Error in calculateTCO:", error); }' "${PROJECT_DIR}/js/components/calculator.js"
    else
        warn "Could not locate calculator.js file"
    fi
    
    log "Syntax errors fixed"
}

# Create completely new wizard functionality to ensure it works
create_new_wizard() {
    log "Creating new wizard functionality..."
    
    # Create directory for the new wizard implementation
    mkdir -p "${PROJECT_DIR}/js/wizards/new"
    
    # Create a completely new wizard implementation
    cat > "${PROJECT_DIR}/js/wizards/new/wizard-implementation.js" << 'EOL'
/**
 * Portnox TCO Analyzer - New Wizard Implementation
 * This is a complete rewrite of the wizard functionality to ensure it works correctly
 */
const TCOWizard = (function() {
    // Private variables
    let currentStep = 1;
    const totalSteps = 5;
    
    // DOM elements
    let wizardContainer;
    let wizardSteps;
    let prevButton;
    let nextButton;
    let stepIndicators;
    
    // Configuration
    const config = {
        selectors: {
            container: '.wizard-container',
            steps: '.wizard-step',
            prevButton: '#prev-step',
            nextButton: '#next-step',
            progressBar: '#wizard-progress-fill',
            stepIndicators: '.wizard-step-indicator'
        },
        classes: {
            active: 'active',
            completed: 'completed'
        }
    };
    
    // Initialize wizard
    function init() {
        console.log('Initializing TCO Wizard...');
        
        // Find DOM elements
        wizardContainer = document.querySelector(config.selectors.container);
        wizardSteps = document.querySelectorAll(config.selectors.steps);
        prevButton = document.querySelector(config.selectors.prevButton);
        nextButton = document.querySelector(config.selectors.nextButton);
        stepIndicators = document.querySelectorAll(config.selectors.stepIndicators);
        
        if (!wizardContainer || !wizardSteps.length) {
            console.error('Wizard container or steps not found');
            return;
        }
        
        // Setup navigation
        setupNavigation();
        
        // Show initial step
        showStep(currentStep);
        
        // Setup event listeners for wizard interactions (vendor selection, etc.)
        setupWizardInteractions();
        
        console.log('TCO Wizard initialized');
    }
    
    // Setup navigation buttons
    function setupNavigation() {
        if (prevButton) {
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                goToPrevStep();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                goToNextStep();
            });
        }
        
        // Setup step indicators if they exist
        if (stepIndicators && stepIndicators.length) {
            stepIndicators.forEach(indicator => {
                indicator.addEventListener('click', function() {
                    const step = parseInt(this.dataset.step);
                    if (step <= currentStep) {
                        goToStep(step);
                    }
                });
            });
        }
    }
    
    // Go to next step
    function goToNextStep() {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                goToStep(currentStep + 1);
            } else {
                // This is the last step, perform final action (show results)
                showResults();
            }
        }
    }
    
    // Go to previous step
    function goToPrevStep() {
        if (currentStep > 1) {
            goToStep(currentStep - 1);
        }
    }
    
    // Go to specific step
    function goToStep(step) {
        if (step < 1 || step > totalSteps) {
            console.error('Invalid step number:', step);
            return;
        }
        
        currentStep = step;
        showStep(currentStep);
    }
    
    // Show specific step
    function showStep(step) {
        try {
            // Hide all steps
            wizardSteps.forEach(stepEl => {
                stepEl.classList.remove(config.classes.active);
            });
            
            // Show current step
            const currentStepElement = wizardSteps[step - 1];
            if (currentStepElement) {
                currentStepElement.classList.add(config.classes.active);
                
                // Scroll to the step
                currentStepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
            // Update step indicators
            updateStepIndicators();
            
            // Update navigation buttons
            updateNavigationButtons();
            
            // Update progress bar if exists
            updateProgressBar();
            
            console.log(`Showing step ${step} of ${totalSteps}`);
        } catch (error) {
            console.error('Error showing step:', error);
        }
    }
    
    // Update step indicators
    function updateStepIndicators() {
        if (!stepIndicators || !stepIndicators.length) return;
        
        stepIndicators.forEach(indicator => {
            const step = parseInt(indicator.dataset.step);
            
            indicator.classList.remove(config.classes.active, config.classes.completed);
            
            if (step === currentStep) {
                indicator.classList.add(config.classes.active);
            } else if (step < currentStep) {
                indicator.classList.add(config.classes.completed);
            }
        });
    }
    
    // Update navigation buttons
    function updateNavigationButtons() {
        if (prevButton) {
            prevButton.disabled = currentStep === 1;
            prevButton.style.display = currentStep === 1 ? 'none' : 'block';
        }
        
        if (nextButton) {
            nextButton.textContent = currentStep === totalSteps ? 'View Results' : 'Next';
        }
    }
    
    // Update progress bar
    function updateProgressBar() {
        const progressBar = document.querySelector(config.selectors.progressBar);
        if (progressBar) {
            const progress = (currentStep - 1) / (totalSteps - 1) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }
    
    // Validate current step before proceeding
    function validateCurrentStep() {
        try {
            // Check which step we're on and validate accordingly
            switch(currentStep) {
                case 1:
                    // Vendor selection
                    const selectedVendor = document.querySelector('.vendor-card.active');
                    if (!selectedVendor) {
                        showValidationError('Please select a current NAC vendor or "No NAC" option');
                        return false;
                    }
                    break;
                
                case 2:
                    // Industry selection
                    const industrySelect = document.getElementById('industry-select');
                    if (industrySelect && !industrySelect.value) {
                        showValidationError('Please select your industry');
                        return false;
                    }
                    break;
                    
                case 3:
                    // Organization details
                    const deviceCount = document.getElementById('device-count');
                    if (deviceCount && (!deviceCount.value || parseInt(deviceCount.value) <= 0)) {
                        showValidationError('Please enter a valid device count');
                        return false;
                    }
                    break;
                    
                // Add more validation as needed
            }
            
            // If we get here, validation passed
            return true;
        } catch (error) {
            console.error('Error validating step:', error);
            return false;
        }
    }
    
    // Show validation error
    function showValidationError(message) {
        // Check if we have a notification manager
        if (typeof NotificationManager !== 'undefined' && NotificationManager.showNotification) {
            NotificationManager.showNotification({
                title: 'Validation Error',
                message: message,
                type: 'error',
                duration: 5000
            });
        } else {
            // Fallback to alert
            alert(message);
        }
    }
    
    // Show results
    function showResults() {
        console.log('Showing results...');
        
        // Hide wizard container
        if (wizardContainer) {
            wizardContainer.style.display = 'none';
        }
        
        // Show results container
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
            resultsContainer.classList.remove('hidden');
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // If we have a calculator, calculate the results
        if (typeof Calculator !== 'undefined' && Calculator.calculateTCO) {
            try {
                Calculator.calculateTCO();
            } catch (error) {
                console.error('Error calculating TCO:', error);
            }
        }
    }
    
    // Setup wizard interactions
    function setupWizardInteractions() {
        // Vendor selection
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach(card => {
            card.addEventListener('click', function() {
                // Remove active class from all cards
                vendorCards.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked card
                this.classList.add('active');
            });
        });
        
        // Industry selection change
        const industrySelect = document.getElementById('industry-select');
        if (industrySelect) {
            industrySelect.addEventListener('change', function() {
                // Update compliance frameworks based on industry
                updateComplianceFrameworks(this.value);
            });
        }
    }
    
    // Update compliance frameworks based on selected industry
    function updateComplianceFrameworks(industry) {
        const frameworksContainer = document.getElementById('compliance-frameworks');
        if (!frameworksContainer) return;
        
        // Show loading state
        frameworksContainer.innerHTML = '<div class="loading">Loading compliance frameworks...</div>';
        
        // Map of industries to relevant compliance frameworks
        const industryFrameworks = {
            healthcare: ['HIPAA', 'HITRUST', 'NIST'],
            financial: ['PCI DSS', 'SOX', 'GLBA', 'NIST'],
            education: ['FERPA', 'COPPA', 'NIST'],
            government: ['FISMA', 'FedRAMP', 'NIST'],
            manufacturing: ['ISO 27001', 'NIST', 'CMMC'],
            retail: ['PCI DSS', 'GDPR', 'CCPA'],
            technology: ['ISO 27001', 'SOC 2', 'NIST'],
            energy: ['NERC CIP', 'ISO 27001', 'NIST']
        };
        
        // Get relevant frameworks for selected industry
        const frameworks = industryFrameworks[industry] || [];
        
        if (frameworks.length === 0) {
            frameworksContainer.innerHTML = '<div class="no-frameworks">No specific compliance frameworks for this industry</div>';
            return;
        }
        
        // Build HTML for frameworks
        let html = '<div class="frameworks-grid">';
        frameworks.forEach(framework => {
            html += `
                <div class="framework-card">
                    <div class="framework-header">
                        <h4>${framework}</h4>
                        <div class="framework-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                    </div>
                    <p>Portnox Cloud helps achieve compliance with ${framework} requirements.</p>
                </div>
            `;
        });
        html += '</div>';
        
        // Update container
        frameworksContainer.innerHTML = html;
    }
    
    // Public API
    return {
        init: init,
        goToStep: goToStep,
        goToNextStep: goToNextStep,
        goToPrevStep: goToPrevStep,
        getCurrentStep: function() { return currentStep; },
        getTotalSteps: function() { return totalSteps; }
    };
})();

// Initialize wizard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the new wizard
    TCOWizard.init();
});
EOL
    
    # Create enhanced CSS for the wizard
    cat > "${PROJECT_DIR}/css/fixes/wizard-enhanced.css" << 'EOL'
/**
 * Enhanced Wizard Styling
 * Repositions navigation buttons to be directly under each step
 */

/* Wizard container styling */
.wizard-container {
    padding-bottom: 0 !important; /* Remove padding that was used for fixed navigation */
}

/* Wizard step styling */
.wizard-step {
    position: relative;
    padding-bottom: 70px; /* Add padding for the navigation */
    margin-bottom: 2rem;
}

/* Navigation styling - positioned at the bottom of each step */
.wizard-navigation {
    position: relative !important; /* Override fixed positioning */
    bottom: auto;
    left: auto;
    right: auto;
    background-color: transparent;
    border-top: none;
    box-shadow: none;
    padding: 1rem 0;
    margin-top: 1.5rem;
    z-index: 10;
}

/* Position the navigation at the bottom of each active step */
.wizard-step.active .wizard-navigation {
    display: flex;
    justify-content: space-between;
    position: absolute !important;
    bottom: 0;
    left: 0;
    right: 0;
}

/* Hide navigation on inactive steps */
.wizard-step:not(.active) .wizard-navigation {
    display: none;
}

/* Ensure navigation buttons are appropriately styled */
.wizard-navigation button {
    min-width: 120px;
    padding: 0.75rem 1.25rem;
    border-radius: 0.375rem;
    transition: all 0.3s ease;
}

.wizard-navigation button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Make sure wizard steps are properly hidden/shown */
.wizard-step {
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.wizard-step.active {
    display: block;
    opacity: 1;
}

/* Step indicator styling */
.wizard-progress {
    margin-bottom: 2rem;
}

.wizard-step-indicator {
    cursor: pointer;
    transition: all 0.3s ease;
}

.wizard-step-indicator.completed {
    color: #1b67b2;
}

.wizard-step-indicator.active {
    font-weight: bold;
    color: #1b67b2;
}

/* Progress bar styling */
.progress-bar {
    height: 6px;
    background-color: #e5e7eb;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 1rem;
}

.progress-fill {
    height: 100%;
    background-color: #1b67b2;
    width: 0%;
    transition: width 0.3s ease;
}

/* Vendor cards styling */
.vendor-card {
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.vendor-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.vendor-card.active {
    border-color: #1b67b2;
    background-color: rgba(27, 103, 178, 0.05);
}
EOL
    
    # Create basic notification utility
    cat > "${PROJECT_DIR}/js/utils/notification-manager.js" << 'EOL'
/**
 * Notification Manager
 * Simple utility for showing notifications
 */
const NotificationManager = (function() {
    // Default options
    const defaults = {
        type: 'info',
        duration: 5000,
        position: 'top-right'
    };
    
    // Show notification
    function showNotification(options) {
        // Merge with defaults
        const settings = {...defaults, ...options};
        
        // Find or create container
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            container.className = `notification-container ${settings.position}`;
            document.body.appendChild(container);
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${settings.type}`;
        
        // Add content
        notification.innerHTML = `
            <div class="notification-header">
                <strong>${settings.title || 'Notification'}</strong>
                <button type="button" class="notification-close">&times;</button>
            </div>
            <div class="notification-body">
                ${settings.message || ''}
            </div>
        `;
        
        // Add to container
        container.appendChild(notification);
        
        // Add close handler
        const closeButton = notification.querySelector('.notification-close');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                removeNotification(notification);
            });
        }
        
        // Auto remove after duration
        if (settings.duration) {
            setTimeout(() => {
                removeNotification(notification);
            }, settings.duration);
        }
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        return notification;
    }
    
    // Remove notification
    function removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // Clear all notifications
    function clearAll() {
        const container = document.getElementById('notification-container');
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }
    }
    
    // Public API
    return {
        showNotification,
        clearAll
    };
})();

// Add to global scope
window.NotificationManager = NotificationManager;
EOL
    
    # Add notification styling
    cat > "${PROJECT_DIR}/css/fixes/notifications-enhanced.css" << 'EOL'
/**
 * Enhanced Notification Styling
 */
.notification-container {
    position: fixed;
    z-index: 9999;
    pointer-events: none;
}

.notification-container.top-right {
    top: 20px;
    right: 20px;
}

.notification-container.top-left {
    top: 20px;
    left: 20px;
}

.notification-container.bottom-right {
    bottom: 20px;
    right: 20px;
}

.notification-container.bottom-left {
    bottom: 20px;
    left: 20px;
}

.notification {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    margin-bottom: 10px;
    max-width: 350px;
    opacity: 0;
    pointer-events: auto;
    transform: translateX(30px);
    transition: all 0.3s ease;
}

.notification.show {
    opacity: 1;
    transform: translateX(0);
}

.notification-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
}

.notification-body {
    padding: 12px 15px;
    color: #4b5563;
}

.notification-close {
    background: none;
    border: none;
    font-size: 18px;
    color: #9ca3af;
    cursor: pointer;
}

.notification-info {
    border-left: 4px solid #1b67b2;
}

.notification-success {
    border-left: 4px solid #65BD44;
}

.notification-warning {
    border-left: 4px solid #f59e0b;
}

.notification-error {
    border-left: 4px solid #ef4444;
}
EOL
    
    # Update the index.html to use the new wizard implementation
    if [ -f "${PROJECT_DIR}/index.html" ]; then
        log "Updating index.html to use new wizard implementation"
        
        # First, add the new CSS files
        if ! grep -q "wizard-enhanced.css" "${PROJECT_DIR}/index.html"; then
            sed -i.bak '/<link rel="stylesheet" href="css\/wizard.css">/a\    <link rel="stylesheet" href="css\/fixes\/wizard-enhanced.css">' "${PROJECT_DIR}/index.html"
        fi
        
        if ! grep -q "notifications-enhanced.css" "${PROJECT_DIR}/index.html"; then
            sed -i.bak '/<link rel="stylesheet" href="css\/animations.css">/a\    <link rel="stylesheet" href="css\/fixes\/notifications-enhanced.css">' "${PROJECT_DIR}/index.html"
        fi
        
        # Add the new JavaScript files
        if ! grep -q "notification-manager.js" "${PROJECT_DIR}/index.html"; then
            sed -i.bak '/<script src="js\/utils\/error-handler.js"><\/script>/a\    <script src="js\/utils\/notification-manager.js"><\/script>' "${PROJECT_DIR}/index.html"
        fi
        
        if ! grep -q "wizard-implementation.js" "${PROJECT_DIR}/index.html"; then
            sed -i.bak '/<script src="js\/managers\/wizard.js"><\/script>/a\    <script src="js\/wizards\/new\/wizard-implementation.js"><\/script>' "${PROJECT_DIR}/index.html"
        fi
        
        # Move the wizard navigation inside each wizard step
        # First, create a backup
        cp "${PROJECT_DIR}/index.html" "${PROJECT_DIR}/index.html.bak"
        
        # Now modify the file to move the wizard navigation
        awk '
            /<!-- Wizard Navigation -->/ {
                print "<!-- Wizard Navigation moved inside each step -->";
                skip = 1;
                next;
            }
            skip && /div>$/ {
                skip = 0;
                next;
            }
            skip {
                next;
            }
            {print}
        ' "${PROJECT_DIR}/index.html" > "${PROJECT_DIR}/index.html.temp"
        
        # Add navigation to each wizard step
        awk '
            /class="wizard-step"/ {
                in_step = 1;
                step_content = $0 "\n";
                next;
            }
            in_step && /<\/div>$/ {
                in_step = 0;
                step_content = step_content "    <!-- Wizard Navigation -->\n    <div class=\"wizard-navigation\">\n        <button id=\"prev-step\" class=\"btn btn-outline\">\n            <i class=\"fas fa-chevron-left\"></i> Previous\n        </button>\n        <button id=\"next-step\" class=\"btn btn-primary\">\n            Next <i class=\"fas fa-chevron-right\"></i>\n        </button>\n    </div>\n" $0 "\n";
                print step_content;
                next;
            }
            in_step {
                step_content = step_content $0 "\n";
                next;
            }
            {print}
        ' "${PROJECT_DIR}/index.html.temp" > "${PROJECT_DIR}/index.html"
        
        # Clean up temporary file
        rm "${PROJECT_DIR}/index.html.temp"
    else
        warn "Could not locate index.html file"
    fi
    
    log "New wizard implementation created"
}

# Main execution
main() {
    log "Starting Portnox TCO Analyzer direct syntax and navigation fixes"
    
    # Create backup
    create_backup
    
    # Fix specific syntax errors
    fix_syntax_errors
    
    # Create new wizard implementation
    create_new_wizard
    
    log "Script completed successfully"
    log "A backup of modified files is available at: ${BACKUP_DIR}"
    log "Please run the application and verify the fixes."
}

# Run main function
main

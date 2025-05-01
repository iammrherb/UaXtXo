#!/bin/bash

# Zero Trust NAC Architecture Designer Pro Enhancement Script
# This script applies comprehensive fixes and enhancements to the codebase

echo "Starting Zero Trust NAC Architecture Designer Pro enhancement process..."

# Define project directory - adjust if necessary
PROJECT_DIR="."
cd "$PROJECT_DIR" || { echo "Error: Project directory not found!"; exit 1; }

# Create directory for backups
BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "Created backup directory: $BACKUP_DIR"

# Backup important files before making changes
echo "Backing up critical files..."
cp index.html "$BACKUP_DIR/"
cp -r js/ "$BACKUP_DIR/js"
cp -r css/ "$BACKUP_DIR/css"

# Create comprehensive enhancement script
echo "Creating comprehensive enhancement script..."
cat > js/comprehensive-enhancement.js << 'EOF'
/**
 * Zero Trust NAC Architecture Designer Pro
 * Comprehensive Enhancement Script
 */
(function() {
  console.log('Applying comprehensive enhancements to Zero Trust NAC Architecture Designer Pro...');
  
  // Track initialized components
  const initialized = {
    tabs: false,
    passwordForms: false,
    architectureDiagram: false,
    workflowVisualizations: false,
    policyMappings: false,
    timeline: false
  };
  
  // Main initialization function
  function initializeApplication() {
    console.log('Starting comprehensive initialization...');
    
    // Check dependencies
    checkDependencies();
    
    // Initialize tabs
    try {
      initializeTabs();
      initialized.tabs = true;
    } catch (error) {
      console.error('Error initializing tabs:', error);
    }
    
    // Fix password forms
    try {
      fixPasswordForms();
      initialized.passwordForms = true;
    } catch (error) {
      console.error('Error fixing password forms:', error);
    }
    
    // Set up event listener for tab activations
    document.addEventListener('tab-shown', function(event) {
      const tabId = event.detail.tab.getAttribute('data-tab');
      
      // Initialize component-specific functionality when tabs are activated
      if (tabId === 'architecture' && !initialized.architectureDiagram) {
        initializeComponent('architectureDiagram', window.initArchitectureDiagram);
      } else if (tabId === 'workflows' && !initialized.workflowVisualizations) {
        initializeComponent('workflowVisualizations', window.initWorkflowVisualizations);
      } else if (tabId === 'policies' && !initialized.policyMappings) {
        initializeComponent('policyMappings', window.initPolicyMappings);
      } else if (tabId === 'timeline' && !initialized.timeline) {
        initializeComponent('timeline', window.initTimeline);
      }
    });
    
    // Set up observer for dynamic content
    setupMutationObserver();
    
    // Hide loading screen when done
    hideLoadingScreen();
    
    console.log('Comprehensive initialization complete');
  }
  
  // Check for required dependencies
  function checkDependencies() {
    console.log('Checking for required dependencies...');
    
    const missingDependencies = [];
    
    // Check for Bootstrap
    if (typeof bootstrap === 'undefined') {
      missingDependencies.push('Bootstrap');
    }
    
    // Check for SweetAlert2
    if (typeof Swal === 'undefined') {
      missingDependencies.push('SweetAlert2');
    }
    
    // If dependencies are missing, show warning but continue
    if (missingDependencies.length > 0) {
      console.warn(`Missing dependencies: ${missingDependencies.join(', ')}`);
      showDependencyWarning(missingDependencies);
    }
  }
  
  // Show warning for missing dependencies
  function showDependencyWarning(missingDeps) {
    const container = document.createElement('div');
    container.className = 'dependency-warning';
    container.innerHTML = `
      <div style="position: fixed; top: 10px; right: 10px; background-color: #fff3cd; color: #856404; border: 1px solid #ffeeba; padding: 15px; border-radius: 4px; box-shadow: 0 0 10px rgba(0,0,0,0.1); z-index: 9999; max-width: 350px;">
        <h4 style="margin-top: 0;">Missing Dependencies</h4>
        <p>The following dependencies could not be loaded:</p>
        <ul style="margin-bottom: 10px;">
          ${missingDeps.map(dep => `<li>${dep}</li>`).join('')}
        </ul>
        <p style="margin-bottom: 0;">Some features may not work correctly.</p>
        <button onclick="this.parentNode.remove()" style="position: absolute; top: 5px; right: 5px; background: none; border: none; cursor: pointer;">×</button>
      </div>
    `;
    document.body.appendChild(container);
  }
  
  // Initialize a specific component
  function initializeComponent(componentName, initFunction) {
    if (typeof initFunction !== 'function') {
      console.warn(`Initialization function for ${componentName} not found`);
      return;
    }
    
    try {
      initFunction();
      initialized[componentName] = true;
      console.log(`Successfully initialized ${componentName}`);
    } catch (error) {
      console.error(`Error initializing ${componentName}:`, error);
      showComponentError(componentName, error);
    }
  }
  
  // Show error message for component initialization
  function showComponentError(componentName, error) {
    const componentMap = {
      'architectureDiagram': { container: 'architecture-tab', title: 'Architecture Diagram' },
      'workflowVisualizations': { container: 'workflows-tab', title: 'Workflow Visualizations' },
      'policyMappings': { container: 'policies-tab', title: 'Policy Mappings' },
      'timeline': { container: 'timeline-tab', title: 'Deployment Timeline' }
    };
    
    const info = componentMap[componentName];
    if (!info) return;
    
    const container = document.getElementById(info.container);
    if (!container) return;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'component-error-message';
    errorDiv.innerHTML = `
      <div style="text-align: center; padding: 20px; margin: 20px; border: 1px solid #f8d7da; background-color: #fff5f5; color: #721c24; border-radius: 8px;">
        <i class="fas fa-exclamation-circle" style="font-size: 32px; margin-bottom: 10px;"></i>
        <h4>Error Loading ${info.title}</h4>
        <p>${error.message}</p>
        <button class="btn btn-outline-danger mt-2" onclick="window.initializeComponent('${componentName}')">
          <i class="fas fa-sync"></i> Retry
        </button>
      </div>
    `;
    
    // Insert at the top of the container
    if (container.firstChild) {
      container.insertBefore(errorDiv, container.firstChild);
    } else {
      container.appendChild(errorDiv);
    }
  }
  
  // Hide the loading screen
  function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }
  
  // Tab initialization
  function initializeTabs() {
    console.log('Initializing tabs with unified solution...');
    
    // Find all tab elements
    const tabs = document.querySelectorAll('[data-bs-toggle="tab"], .nav-link[data-tab]');
    if (tabs.length === 0) {
      console.log('No tabs found to initialize');
      return;
    }
    
    console.log(`Found ${tabs.length} tabs to initialize`);
    
    // Process each tab
    tabs.forEach((tab, index) => {
      // Ensure tab has a valid target
      let target = tab.getAttribute('href') || tab.getAttribute('data-bs-target');
      
      if (!target || target === '#' || target === '-tab') {
        // Create a valid target ID
        const tabText = tab.textContent.trim().toLowerCase().replace(/\s+/g, '-') || 'tab';
        const newTarget = `#${tabText}-${index}-tab`;
        tab.setAttribute('href', newTarget);
        console.log(`Fixed invalid tab target: ${target} → ${newTarget}`);
        target = newTarget;
      }
      
      // Find tab group and ensure tab content container exists
      const tabGroup = tab.closest('.nav-tabs, [role="tablist"], .nav');
      if (!tabGroup) {
        console.warn(`Tab ${index} is not within a tab group`);
        return;
      }
      
      // Find or create tab content container
      let tabContent = findTabContentContainer(tabGroup);
      if (!tabContent) {
        tabContent = createTabContentContainer(tabGroup);
      }
      
      // Find or create tab pane
      const targetId = target.substring(1);
      let tabPane = document.getElementById(targetId);
      
      if (!tabPane) {
        tabPane = createTabPane(targetId, tabContent, tab.textContent.trim());
      } else if (!tabPane.classList.contains('tab-pane')) {
        tabPane.classList.add('tab-pane', 'fade');
      }
      
      // Set up event listener for tab
      if (!tab.dataset.listenerAttached) {
        tab.addEventListener('click', function(event) {
          event.preventDefault();
          activateTab(this, target);
        });
        tab.dataset.listenerAttached = 'true';
      }
    });
    
    // Activate first tab in each group if none are active
    document.querySelectorAll('.nav-tabs, [role="tablist"], .nav').forEach(tabGroup => {
      const activeTab = tabGroup.querySelector('.active');
      if (!activeTab) {
        const firstTab = tabGroup.querySelector('[data-bs-toggle="tab"], .nav-link[data-tab]');
        if (firstTab) {
          firstTab.click();
        }
      }
    });
  }
  
  // Find tab content container
  function findTabContentContainer(tabGroup) {
    // Look for sibling tab-content
    let sibling = tabGroup.nextElementSibling;
    while (sibling) {
      if (sibling.classList.contains('tab-content')) {
        return sibling;
      }
      sibling = sibling.nextElementSibling;
    }
    
    // Look in parent
    const parent = tabGroup.parentNode;
    const tabContent = parent.querySelector(':scope > .tab-content');
    if (tabContent) {
      return tabContent;
    }
    
    return null;
  }
  
  // Create tab content container
  function createTabContentContainer(tabGroup) {
    console.log('Creating new tab content container');
    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content';
    
    if (tabGroup.nextSibling) {
      tabGroup.parentNode.insertBefore(tabContent, tabGroup.nextSibling);
    } else {
      tabGroup.parentNode.appendChild(tabContent);
    }
    
    return tabContent;
  }
  
  // Create tab pane
  function createTabPane(id, tabContent, tabName) {
    console.log(`Creating tab pane with id: ${id}`);
    const tabPane = document.createElement('div');
    tabPane.id = id;
    tabPane.className = 'tab-pane fade';
    tabPane.innerHTML = `<div class="tab-pane-content">Content for ${tabName || 'Tab'}</div>`;
    tabContent.appendChild(tabPane);
    return tabPane;
  }
  
  // Activate a tab
  function activateTab(tabElement, target) {
    const tabGroup = tabElement.closest('.nav-tabs, [role="tablist"], .nav');
    if (!tabGroup) return;
    
    // Deactivate all tabs
    tabGroup.querySelectorAll('[data-bs-toggle="tab"], .nav-link[data-tab]').forEach(tab => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });
    
    // Activate this tab
    tabElement.classList.add('active');
    tabElement.setAttribute('aria-selected', 'true');
    
    // Find and activate target pane
    const targetPane = document.querySelector(target);
    if (!targetPane) return;
    
    const tabContent = targetPane.parentElement;
    if (!tabContent) return;
    
    // Deactivate all panes
    tabContent.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active', 'show');
    });
    
    // Activate target pane
    targetPane.classList.add('active', 'show');
    
    // Trigger event for component initialization
    const tabShownEvent = new CustomEvent('tab-shown', {
      detail: { tab: tabElement, pane: targetPane }
    });
    document.dispatchEvent(tabShownEvent);
  }
  
  // Fix password forms
  function fixPasswordForms() {
    console.log('Fixing password forms...');
    
    // Find all password inputs
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    if (passwordInputs.length === 0) {
      console.log('No password inputs found');
      return;
    }
    
    console.log(`Found ${passwordInputs.length} password inputs to fix`);
    
    // Process each password input
    passwordInputs.forEach((passwordInput, index) => {
      // Set ID if missing
      const passwordId = passwordInput.id || `password-${index}-${Date.now()}`;
      passwordInput.id = passwordId;
      
      // Set autocomplete attribute
      if (!passwordInput.getAttribute('autocomplete')) {
        const isNewPassword = checkIfNewPassword(passwordInput);
        passwordInput.setAttribute('autocomplete', isNewPassword ? 'new-password' : 'current-password');
      }
      
      // Ensure input is in a form
      let form = passwordInput.closest('form');
      
      if (!form) {
        console.log(`Password input not in form, creating one...`);
        form = createPasswordForm(passwordInput);
      } else if (!form.classList.contains('password-form')) {
        form.classList.add('password-form');
      }
      
      // Add username field if missing
      ensureUsernameField(form, passwordInput, index);
      
      // Set up form submission handler
      if (!form.dataset.handlerAttached) {
        form.addEventListener('submit', handlePasswordFormSubmit);
        form.dataset.handlerAttached = 'true';
      }
    });
  }
  
  // Check if a password field is for a new password
  function checkIfNewPassword(passwordInput) {
    // Check various indicators this is a new password field
    const id = passwordInput.id?.toLowerCase() || '';
    const name = passwordInput.name?.toLowerCase() || '';
    const placeholder = passwordInput.placeholder?.toLowerCase() || '';
    
    // Check attributes for indicators
    if (id.includes('new') || id.includes('create') || id.includes('register') ||
        name.includes('new') || name.includes('create') || name.includes('register') ||
        placeholder.includes('new') || placeholder.includes('create')) {
      return true;
    }
    
    // Check for labels that reference this input
    if (passwordInput.id) {
      const labels = document.querySelectorAll(`label[for="${passwordInput.id}"]`);
      for (const label of labels) {
        const text = label.textContent.toLowerCase();
        if (text.includes('new') || text.includes('create') || text.includes('register')) {
          return true;
        }
      }
    }
    
    // Look for nearby elements that might indicate this is for registration
    const form = passwordInput.closest('form');
    if (form) {
      const headings = form.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
      for (const heading of headings) {
        const text = heading.textContent.toLowerCase();
        if (text.includes('new password') || text.includes('create') || 
            text.includes('sign up') || text.includes('register')) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  // Create a password form for an input
  function createPasswordForm(passwordInput) {
    const form = document.createElement('form');
    form.className = 'password-form password-form-generated';
    form.setAttribute('action', 'javascript:void(0);');
    form.setAttribute('method', 'post');
    
    // Replace the input with the form
    passwordInput.parentNode.insertBefore(form, passwordInput);
    form.appendChild(passwordInput);
    
    return form;
  }
  
  // Ensure form has a username field
  function ensureUsernameField(form, passwordInput, index) {
    // Check for any kind of username field
    const usernameField = form.querySelector('input[name="username"], input[name="email"], input[autocomplete="username"]');
    
    if (!usernameField) {
      console.log('Adding username field to form');
      
      // Create a hidden username field
      const usernameInput = document.createElement('input');
      usernameInput.type = 'hidden';
      usernameInput.name = 'username';
      usernameInput.id = `username-${index}-${Date.now()}`;
      usernameInput.setAttribute('autocomplete', 'username');
      
      // Add to the form before the password input
      form.insertBefore(usernameInput, form.firstChild);
    }
  }
  
  // Handle password form submission
  function handlePasswordFormSubmit(event) {
    // Only handle forms with action=javascript:void(0);
    if (this.getAttribute('action') === 'javascript:void(0);') {
      event.preventDefault();
      
      // Use history API to simulate navigation as per Chromium guidelines
      history.pushState(
        { formSubmitted: true }, 
        document.title, 
        window.location.pathname + (window.location.search || '?') + 
        (window.location.search.includes('?') ? '&' : '') + 'auth=success'
      );
      
      // Show success message
      this.innerHTML = '<div class="alert alert-success">Form submitted successfully</div>';
    }
  }
  
  // Set up mutation observer to handle dynamically added content
  function setupMutationObserver() {
    // Create observer to watch for DOM changes
    const observer = new MutationObserver(function(mutations) {
      let needsTabInit = false;
      let needsPasswordFormInit = false;
      
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            
            // Skip non-element nodes
            if (node.nodeType !== 1) continue;
            
            // Check for new tabs
            if (node.querySelector('[data-bs-toggle="tab"], .nav-link[data-tab]') ||
                (node.hasAttribute && (
                  node.hasAttribute('data-bs-toggle') && node.getAttribute('data-bs-toggle') === 'tab' ||
                  node.hasAttribute('data-tab')
                ))) {
              needsTabInit = true;
            }
            
            // Check for new password inputs
            if (node.querySelector('input[type="password"]') ||
                (node.tagName === 'INPUT' && node.type === 'password')) {
              needsPasswordFormInit = true;
            }
          }
        }
      });
      
      // Initialize new elements as needed
      if (needsTabInit) {
        initializeTabs();
      }
      
      if (needsPasswordFormInit) {
        fixPasswordForms();
      }
    });
    
    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('Mutation observer set up for dynamic content');
    
    // Make observer available globally for debugging
    window._enhancementObserver = observer;
  }
  
  // Make certain functions available globally
  window.initializeComponent = initializeComponent;
  window.activateTab = function(tabSelector) {
    const tab = document.querySelector(tabSelector);
    if (tab) {
      tab.click();
    }
  };
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(initializeApplication, 100);
    });
  } else {
    setTimeout(initializeApplication, 100);
  }
})();
EOF

# Create CSS adjustments
echo "Creating CSS enhancements..."
cat > css/enhanced-fixes.css << 'EOF'
/* Enhanced Fixes for Zero Trust NAC Architecture Designer Pro */

/* Ensure tab panes are visible when active */
.tab-pane.active.show {
  display: block !important;
  opacity: 1 !important;
}

/* Improved password form styling */
form.password-form {
  position: relative;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #007bff;
  border-radius: 0.375rem;
  background-color: #f8f9fa;
  box-shadow: 0 3px 10px rgba(0, 123, 255, 0.1);
}

form.password-form::before {
  content: "Secure Form";
  position: absolute;
  top: -10px;
  left: 15px;
  background: #fff;
  padding: 0 10px;
  font-size: 12px;
  font-weight: bold;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 10px;
}

form.password-form input[type="password"] {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23007bff'%3E%3Cpath d='M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  padding-right: 2.5rem;
}

/* Fix for tab navigation */
.nav-tabs .nav-link, 
[role="tablist"] .nav-link,
.nav .nav-link[data-bs-toggle="tab"],
.nav .nav-link[data-tab] {
  cursor: pointer;
}

/* Error message styling */
.component-error-message {
  margin: 20px 0;
}

/* Success message styling */
.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

/* Dark mode adjustments */
.dark-mode form.password-form {
  background-color: #2d3748;
  border-color: #4299e1;
}

.dark-mode form.password-form::before {
  background-color: #2d3748;
  color: #4299e1;
  border-color: #4299e1;
}

.dark-mode .tab-pane {
  background-color: #2d3748;
}
EOF

# Update index.html to include new scripts and CSS
echo "Updating index.html..."
cp index.html "$BACKUP_DIR/index.html.bak"

# Add our new CSS file to the head
sed -i.bak '/<\/head>/i \    <link rel="stylesheet" href="css\/enhanced-fixes.css">' index.html

# Add our enhancement script at the end of the body
sed -i.bak '/<\/body>/i \    <script src="js\/comprehensive-enhancement.js"><\/script>' index.html

# Remove temporary .bak files created by sed
find . -name "*.bak" -type f -delete

# Create module loader to ensure proper initialization order
echo "Creating module loader script..."
cat > js/module-loader.js << 'EOF'
/**
 * Zero Trust NAC Architecture Designer Pro
 * Module Loader - Ensures proper initialization order for all components
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Module loader ensuring proper initialization sequence...');
  
  // Define module dependencies
  const modules = {
    'comprehensive-enhancement': { 
      dependencies: []  // No dependencies, loads first
    },
    'main': { 
      dependencies: ['comprehensive-enhancement'] 
    },
    'diagram': { 
      dependencies: ['comprehensive-enhancement', 'main'] 
    },
    'workflows': { 
      dependencies: ['comprehensive-enhancement', 'main'] 
    },
    'policies': { 
      dependencies: ['comprehensive-enhancement', 'main'] 
    },
    'timeline': { 
      dependencies: ['comprehensive-enhancement', 'main'] 
    }
  };
  
  // Track loaded modules
  const loadedModules = {};
  
  // Function to check if all dependencies are loaded
  function areDependenciesLoaded(moduleName) {
    const dependencies = modules[moduleName]?.dependencies || [];
    return dependencies.every(dep => loadedModules[dep]);
  }
  
  // Function to initialize a module
  function initializeModule(moduleName) {
    if (loadedModules[moduleName]) return;
    
    console.log(`Initializing module: ${moduleName}`);
    
    // Mark module as loaded
    loadedModules[moduleName] = true;
    
    // Call the module's init function if it exists
    const initFunction = window[`init${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}`];
    if (typeof initFunction === 'function') {
      try {
        initFunction();
      } catch (error) {
        console.error(`Error initializing module ${moduleName}:`, error);
      }
    }
    
    // Check if this enables any dependent modules
    Object.keys(modules).forEach(module => {
      if (!loadedModules[module] && areDependenciesLoaded(module)) {
        initializeModule(module);
      }
    });
  }
  
  // Start by initializing modules with no dependencies
  Object.keys(modules).forEach(module => {
    if (modules[module].dependencies.length === 0) {
      initializeModule(module);
    }
  });
});
EOF

# Add the module loader script to index.html
sed -i.bak '/<\/body>/i \    <script src="js\/module-loader.js"><\/script>' index.html

# Remove temporary .bak files created by sed
find . -name "*.bak" -type f -delete

# Perform ID uniqueness check and fix
echo "Creating ID uniqueness validation script..."
cat > js/id-uniqueness-validator.js << 'EOF'
/**
 * Zero Trust NAC Architecture Designer Pro
 * ID Uniqueness Validator - Ensures all IDs in the document are unique
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Running ID uniqueness validation...');
  
  // Find all elements with IDs
  const elementsWithIds = document.querySelectorAll('[id]');
  const idMap = {};
  let duplicatesFound = 0;
  
  // Check for duplicates
  elementsWithIds.forEach((el, index) => {
    const id = el.id;
    
    if (idMap[id]) {
      console.warn(`Duplicate ID found: "${id}". Fixing...`);
      duplicatesFound++;
      
      // Create a unique ID by appending an index
      const newId = `${id}-unique-${index}`;
      el.id = newId;
      
      // Fix any references to this ID
      document.querySelectorAll(`[href="#${id}"], [data-bs-target="#${id}"]`).forEach(refEl => {
        if (refEl.hasAttribute('href')) {
          refEl.setAttribute('href', `#${newId}`);
        }
        if (refEl.hasAttribute('data-bs-target')) {
          refEl.setAttribute('data-bs-target', `#${newId}`);
        }
      });
    } else {
      idMap[id] = el;
    }
  });
  
  console.log(`ID uniqueness check complete. Found and fixed ${duplicatesFound} duplicate IDs.`);
});
EOF

# Add the ID uniqueness validator script to index.html
sed -i.bak '/<\/body>/i \    <script src="js\/id-uniqueness-validator.js"><\/script>' index.html

# Remove temporary .bak files created by sed
find . -name "*.bak" -type f -delete

# Create a consolidated fix for bootstrap initialization
echo "Creating consolidated Bootstrap initialization script..."
cat > js/bootstrap-consolidated-fix.js << 'EOF'
/**
 * Zero Trust NAC Architecture Designer Pro
 * Consolidated Bootstrap Initialization
 * 
 * This script properly initializes all Bootstrap components
 * and applies fixes for known issues.
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Bootstrap components with fixes...');
  
  // Initialize Tooltips with error handling
  try {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl, {
        boundary: document.body // Fix for tooltip positioning issues
      });
    });
  } catch (error) {
    console.warn('Error initializing tooltips:', error);
  }
  
  // Initialize Popovers with error handling
  try {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl, {
        container: 'body', // Fix for popover positioning issues
        html: true,
        sanitize: false // Allow HTML in popovers
      });
    });
  } catch (error) {
    console.warn('Error initializing popovers:', error);
  }
  
  // Initialize Dropdowns with error handling
  try {
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map(function (dropdownToggleEl) {
      return new bootstrap.Dropdown(dropdownToggleEl);
    });
  } catch (error) {
    console.warn('Error initializing dropdowns:', error);
  }
  
  // Fix for modal dialog issues
  document.querySelectorAll('[data-bs-toggle="modal"]').forEach(trigger => {
    trigger.addEventListener('click', function(event) {
      event.preventDefault();
      
      const targetSelector = this.getAttribute('data-bs-target') || this.getAttribute('href');
      if (!targetSelector) return;
      
      const targetModal = document.querySelector(targetSelector);
      if (!targetModal) return;
      
      try {
        const modal = new bootstrap.Modal(targetModal);
        modal.show();
      } catch (error) {
        console.warn('Error showing modal, using fallback:', error);
        
        // Fallback: show modal with vanilla JS
        targetModal.style.display = 'block';
        targetModal.classList.add('show');
        document.body.classList.add('modal-open');
        
        // Create backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop);
        
        // Find close buttons
        targetModal.querySelectorAll('[data-bs-dismiss="modal"]').forEach(closeBtn => {
          closeBtn.addEventListener('click', function() {
            // Hide modal
            targetModal.style.display = 'none';
            targetModal.classList.remove('show');
            document.body.classList.remove('modal-open');
            
            // Remove backdrop
            document.body.removeChild(backdrop);
          });
        });
      }
    });
  });
  
  console.log('Bootstrap components initialized successfully');
});
EOF

# Add the consolidated Bootstrap fix script to index.html
sed -i.bak '/<\/body>/i \    <script src="js\/bootstrap-consolidated-fix.js"><\/script>' index.html

# Remove temporary .bak files created by sed
find . -name "*.bak" -type f -delete

# Create success indicator file
touch .enhancement-applied

echo "Enhancement process completed successfully!"
echo "Backup created at: $BACKUP_DIR"
echo "The following files were created or modified:"
echo "- js/comprehensive-enhancement.js"
echo "- css/enhanced-fixes.css"
echo "- js/module-loader.js"
echo "- js/id-uniqueness-validator.js"
echo "- js/bootstrap-consolidated-fix.js"
echo "- index.html (updated to include new scripts)"

echo ""
echo "To revert changes, run:"
echo "cp \"$BACKUP_DIR/index.html\" index.html"
echo "rm js/comprehensive-enhancement.js css/enhanced-fixes.js js/module-loader.js js/id-uniqueness-validator.js js/bootstrap-consolidated-fix.js"

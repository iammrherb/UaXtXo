/**
 * Tab Manager - Handles tab switching and view management
 */
const TabManager = (function() {
    // Track current active view and panel
    let currentView = 'executive';
    let currentPanels = {};
    
    // Initialize the tab manager
    function init() {
        console.log('Initializing Tab Manager');
        
        // Set up stakeholder tab event listeners
        const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
        stakeholderTabs.forEach(tab => {
            tab.addEventListener('click', handleStakeholderTabClick);
        });
        
        // Set up results tab event listeners
        const resultsTabs = document.querySelectorAll('.results-tab');
        resultsTabs.forEach(tab => {
            tab.addEventListener('click', handleResultsTabClick);
        });
        
        // Initialize with the active view
        const activeStakeholderTab = document.querySelector('.stakeholder-tab.active');
        if (activeStakeholderTab) {
            currentView = activeStakeholderTab.getAttribute('data-view');
            activateFirstResultsTab(currentView);
        } else {
            // If no active tab, set first tab as active
            const firstTab = document.querySelector('.stakeholder-tab');
            if (firstTab) {
                firstTab.click();
            }
        }
    }
    
    // Handle stakeholder tab clicks
    function handleStakeholderTabClick(event) {
        const viewToActivate = this.getAttribute('data-view');
        console.log(`Switching to ${viewToActivate} view`);
        
        // Update current view
        currentView = viewToActivate;
        
        // Update active stakeholder tab
        document.querySelectorAll('.stakeholder-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        this.classList.add('active');
        
        // Update active view panel
        document.querySelectorAll('.view-panel').forEach(panel => {
            if (panel.getAttribute('data-view') === viewToActivate) {
                panel.classList.add('active');
                
                // Activate the first results tab if none is active
                activateFirstResultsTab(viewToActivate);
            } else {
                panel.classList.remove('active');
            }
        });
    }
    
    // Handle results tab clicks
    function handleResultsTabClick(event) {
        const panelToActivate = this.getAttribute('data-panel');
        const viewPanel = this.closest('.view-panel');
        
        if (!viewPanel) return;
        
        const view = viewPanel.getAttribute('data-view');
        console.log(`Switching to ${view} > ${panelToActivate} panel`);
        
        // Store the active panel for this view
        currentPanels[view] = panelToActivate;
        
        // Update active results tab in this view
        viewPanel.querySelectorAll('.results-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        this.classList.add('active');
        
        // Update active results panel in this view
        viewPanel.querySelectorAll('.results-panel').forEach(panel => {
            if (panel.id === panelToActivate) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }
    
    // Activate the first results tab in a view
    function activateFirstResultsTab(view) {
        const viewPanel = document.querySelector(`.view-panel[data-view="${view}"]`);
        if (!viewPanel) return;
        
        // If we have a stored panel for this view, activate it
        if (currentPanels[view]) {
            const storedPanelTab = viewPanel.querySelector(`.results-tab[data-panel="${currentPanels[view]}"]`);
            if (storedPanelTab) {
                storedPanelTab.click();
                return;
            }
        }
        
        // Otherwise, activate the first tab
        const firstTab = viewPanel.querySelector('.results-tab');
        if (firstTab) {
            firstTab.click();
        }
    }
    
    // Switch to a specific stakeholder view and panel
    function switchToView(view, panel) {
        // Activate the stakeholder tab
        const stakeholderTab = document.querySelector(`.stakeholder-tab[data-view="${view}"]`);
        if (stakeholderTab) {
            stakeholderTab.click();
            
            // If a specific panel is requested, activate it
            if (panel) {
                const viewPanel = document.querySelector(`.view-panel[data-view="${view}"]`);
                if (viewPanel) {
                    const resultsTab = viewPanel.querySelector(`.results-tab[data-panel="${panel}"]`);
                    if (resultsTab) {
                        resultsTab.click();
                    }
                }
            }
        }
    }
    
    // Get current view and panel
    function getCurrentView() {
        return {
            view: currentView,
            panel: currentPanels[currentView]
        };
    }
    
    // Return public API
    return {
        init,
        switchToView,
        getCurrentView
    };
})();

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    TabManager.init();
});

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.TabManager = TabManager;
}

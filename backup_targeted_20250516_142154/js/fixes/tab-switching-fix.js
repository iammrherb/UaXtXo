// Tab Switching Fix
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tab switching fix loaded');
    
    // Fix for stakeholder tabs
    const stakeholderTabs = document.querySelectorAll('.stakeholder-tab');
    const viewPanels = document.querySelectorAll('.view-panel');
    
    stakeholderTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            console.log('Switching to view:', view);
            
            // Update active tab
            stakeholderTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active panel
            viewPanels.forEach(panel => {
                if (panel.getAttribute('data-view') === view) {
                    panel.classList.add('active');
                    
                    // Select first sub-tab by default
                    const firstTab = panel.querySelector('.results-tab');
                    if (firstTab) {
                        firstTab.click();
                    }
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });
    
    // Fix for result tabs
    const resultsTabs = document.querySelectorAll('.results-tab');
    
    resultsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            console.log('Clicked tab:', this.textContent.trim());
            const panelId = this.getAttribute('data-panel');
            const tabsContainer = this.parentElement;
            
            // Update active tab
            const siblingTabs = tabsContainer.querySelectorAll('.results-tab');
            siblingTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Find parent view panel
            const viewPanel = this.closest('.view-panel');
            if (viewPanel) {
                // Update active panel within this view
                const resultsPanels = viewPanel.querySelectorAll('.results-panel');
                resultsPanels.forEach(panel => {
                    if (panel.id === panelId) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Initialize to default tabs
    const activeStakeholderTab = document.querySelector('.stakeholder-tab.active');
    if (activeStakeholderTab) {
        // Trigger click to initialize default view
        activeStakeholderTab.click();
    } else {
        // Set first tab as active if none is active
        const firstStakeholderTab = document.querySelector('.stakeholder-tab');
        if (firstStakeholderTab) {
            firstStakeholderTab.click();
        }
    }
});

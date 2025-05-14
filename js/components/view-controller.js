/**
 * View Controller
 * Manages the different stakeholder views and results panels
 */
class ViewController {
  constructor() {
    // Stakeholder view tabs
    this.viewTabs = document.querySelectorAll('.view-tab');
    this.viewPanels = document.querySelectorAll('.view-panel');
    
    // Results tabs within each view
    this.resultsTabs = document.querySelectorAll('.results-tab');
    this.resultsPanels = document.querySelectorAll('.results-panel');
    
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Stakeholder view switching
    this.viewTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.getAttribute('data-view');
        this.activateView(view);
      });
    });
    
    // Results tab switching
    this.resultsTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const panel = tab.getAttribute('data-panel');
        const view = tab.closest('.view-panel').getAttribute('data-view');
        this.activateResultsPanel(panel, view);
      });
    });
  }
  
  activateView(view) {
    // Update tab states
    this.viewTabs.forEach(tab => {
      if (tab.getAttribute('data-view') === view) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Update panel visibility
    this.viewPanels.forEach(panel => {
      if (panel.getAttribute('data-view') === view) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
    
    // Trigger event for other components
    document.dispatchEvent(new CustomEvent('viewChanged', { 
      detail: { view: view }
    }));
    
    // Trigger resize to fix chart display
    window.dispatchEvent(new Event('resize'));
  }
  
  activateResultsPanel(panelId, view) {
    // Get tabs and panels within the current view
    const viewPanel = document.querySelector(`.view-panel[data-view="${view}"]`);
    
    if (!viewPanel) return;
    
    const tabs = viewPanel.querySelectorAll('.results-tab');
    const panels = viewPanel.querySelectorAll('.results-panel');
    
    // Update tab states
    tabs.forEach(tab => {
      if (tab.getAttribute('data-panel') === panelId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    
    // Update panel visibility
    panels.forEach(panel => {
      if (panel.getAttribute('id') === panelId) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
    
    // Trigger resize to fix chart display
    window.dispatchEvent(new Event('resize'));
  }
  
  // Navigate to a specific view and panel
  navigateTo(view, panel) {
    this.activateView(view);
    if (panel) {
      this.activateResultsPanel(panel, view);
    }
  }
}

// Initialize the view controller when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.viewController = new ViewController();
});

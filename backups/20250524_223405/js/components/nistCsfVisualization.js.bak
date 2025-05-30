/**
 * NIST CSF Visualization Component for Portnox Total Cost Analyzer
 * Creates an interactive visualization of the NIST Cybersecurity Framework
 */

class NistCSFVisualization {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.vendors = window.VENDORS || {};
    this.framework = window.COMPLIANCE_FRAMEWORKS && window.COMPLIANCE_FRAMEWORKS['nist-csf'] ? 
                    window.COMPLIANCE_FRAMEWORKS['nist-csf'] : this.getDefaultFramework();
    this.selectedVendors = ['portnox'];
    this.expanded = {};
  }
  
  /**
   * Get default framework if not defined
   */
  getDefaultFramework() {
    return {
      name: 'NIST Cybersecurity Framework',
      shortName: 'NIST CSF',
      description: 'The NIST Cybersecurity Framework (CSF) provides a policy framework of computer security guidance for how organizations can assess and improve their ability to prevent, detect, and respond to cyber attacks.',
      version: '1.1',
      categories: [
        {
          id: 'identify',
          name: 'Identify',
          description: 'Develop organizational understanding to manage cybersecurity risk to systems, people, assets, data, and capabilities.',
          subcategories: ['Asset Management', 'Business Environment', 'Governance', 'Risk Assessment', 'Risk Management Strategy']
        },
        {
          id: 'protect',
          name: 'Protect',
          description: 'Develop and implement appropriate safeguards to ensure delivery of critical services.',
          subcategories: ['Identity Management', 'Access Control', 'Awareness and Training', 'Data Security', 'Protective Technology']
        },
        {
          id: 'detect',
          name: 'Detect',
          description: 'Develop and implement appropriate activities to identify the occurrence of a cybersecurity event.',
          subcategories: ['Anomalies and Events', 'Security Continuous Monitoring', 'Detection Processes']
        },
        {
          id: 'respond',
          name: 'Respond',
          description: 'Develop and implement appropriate activities to take action regarding a detected cybersecurity incident.',
          subcategories: ['Response Planning', 'Communications', 'Analysis', 'Mitigation', 'Improvements']
        },
        {
          id: 'recover',
          name: 'Recover',
          description: 'Develop and implement appropriate activities to maintain plans for resilience and to restore any capabilities or services that were impaired due to a cybersecurity incident.',
          subcategories: ['Recovery Planning', 'Improvements', 'Communications']
        }
      ]
    };
  }
  
  /**
   * Initialize the visualization
   */
  init() {
    if (!this.container) {
      console.error(`Container element ${this.containerId} not found`);
      return;
    }
    
    // Clear container
    this.container.innerHTML = '';
    
    // Create framework structure
    this.createFrameworkStructure();
    
    // Initialize event listeners
    this.initEventListeners();
    
    // Add CSS styles
    this.addStyles();
    
    return this;
  }
  
  /**
   * Create the framework structure
   */
  createFrameworkStructure() {
    if (!this.framework || !this.framework.categories) {
      console.error('NIST CSF framework data not found');
      return;
    }
    
    // Create header
    const header = document.createElement('div');
    header.className = 'nist-header';
    header.innerHTML = `
      <div class="nist-title">${this.framework.name} Compliance</div>
      <div class="nist-controls">
        <button class="btn btn-sm btn-outline nist-expand-all">Expand All</button>
        <button class="btn btn-sm btn-outline nist-collapse-all">Collapse All</button>
      </div>
    `;
    this.container.appendChild(header);
    
    // Create category grid
    const grid = document.createElement('div');
    grid.className = 'nist-grid';
    
    // Add categories
    this.framework.categories.forEach(category => {
      const categoryEl = this.createCategoryElement(category);
      grid.appendChild(categoryEl);
    });
    
    this.container.appendChild(grid);
    
    // Create legend
    const legend = document.createElement('div');
    legend.className = 'nist-legend';
    legend.innerHTML = this.createLegendContent();
    this.container.appendChild(legend);
  }
  
  /**
   * Create a category element
   */
  createCategoryElement(category) {
    const categoryEl = document.createElement('div');
    categoryEl.className = `nist-category nist-category-${category.id}`;
    categoryEl.dataset.category = category.id;
    
    // Calculate average score for this category across selected vendors
    const scores = this.calculateCategoryScores(category.id);
    
    // Prepare category content
    categoryEl.innerHTML = `
      <div class="nist-category-header">
        <div class="nist-category-icon">${this.getCategoryIcon(category.id)}</div>
        <h4 class="nist-category-name">${category.name}</h4>
      </div>
      <p class="nist-category-description">${category.description}</p>
      <div class="nist-score">
        <div class="nist-score-bar" style="width: ${scores.portnox}%"></div>
      </div>
      <div class="nist-score-values">
        <span class="nist-score-value">Portnox: ${scores.portnox}%</span>
        <span class="nist-score-value">Industry Avg: ${scores.industry}%</span>
      </div>
      <div class="nist-subcategories" style="display: none;">
        ${this.createSubcategoriesContent(category.subcategories)}
      </div>
      <button class="btn btn-sm btn-outline nist-expand-btn" data-category="${category.id}">
        <i class="fas fa-chevron-down"></i> Details
      </button>
    `;
    
    return categoryEl;
  }
  
  /**
   * Create subcategories content
   */
  createSubcategoriesContent(subcategories) {
    if (!subcategories || !subcategories.length) return '';
    
    return subcategories.map(sub => `
      <div class="nist-subcategory">
        <span class="nist-subcategory-name">${sub}</span>
        <span class="nist-subcategory-value">${this.getRandomScore(80, 95)}%</span>
      </div>
    `).join('');
  }
  
  /**
   * Create legend content
   */
  createLegendContent() {
    let content = '';
    
    // Add vendor legend items
    content += `
      <div class="nist-legend-item">
        <div class="nist-legend-color" style="background-color: var(--color-primary-600);"></div>
        <span>Portnox Cloud</span>
      </div>
      <div class="nist-legend-item">
        <div class="nist-legend-color" style="background-color: var(--color-neutral-400);"></div>
        <span>Industry Average</span>
      </div>
    `;
    
    // Add category legend items
    const categoryColors = {
      identify: 'var(--color-primary-600)',
      protect: 'var(--color-success-600)',
      detect: 'var(--color-warning-600)',
      respond: 'var(--color-danger-600)',
      recover: 'var(--color-secondary-600)'
    };
    
    this.framework.categories.forEach(category => {
      const color = categoryColors[category.id] || 'var(--color-primary-600)';
      
      content += `
        <div class="nist-legend-item">
          <div class="nist-legend-color" style="background-color: ${color};"></div>
          <span>${category.name}</span>
        </div>
      `;
    });
    
    return content;
  }
  
  /**
   * Initialize event listeners
   */
  initEventListeners() {
    // Expand/collapse individual categories
    const expandButtons = this.container.querySelectorAll('.nist-expand-btn');
    expandButtons.forEach(btn => {
      btn.addEventListener('click', e => {
        const categoryId = btn.dataset.category;
        const categoryEl = this.container.querySelector(`.nist-category-${categoryId}`);
        const subcategories = categoryEl.querySelector('.nist-subcategories');
        
        if (this.expanded[categoryId]) {
          // Collapse
          subcategories.style.display = 'none';
          btn.innerHTML = '<i class="fas fa-chevron-down"></i> Details';
          this.expanded[categoryId] = false;
        } else {
          // Expand
          subcategories.style.display = 'block';
          btn.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Details';
          this.expanded[categoryId] = true;
        }
      });
    });
    
    // Expand all button
    const expandAllBtn = this.container.querySelector('.nist-expand-all');
    if (expandAllBtn) {
      expandAllBtn.addEventListener('click', () => {
        const subcategories = this.container.querySelectorAll('.nist-subcategories');
        subcategories.forEach(el => el.style.display = 'block');
        
        const buttons = this.container.querySelectorAll('.nist-expand-btn');
        buttons.forEach(btn => {
          btn.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Details';
          this.expanded[btn.dataset.category] = true;
        });
      });
    }
    
    // Collapse all button
    const collapseAllBtn = this.container.querySelector('.nist-collapse-all');
    if (collapseAllBtn) {
      collapseAllBtn.addEventListener('click', () => {
        const subcategories = this.container.querySelectorAll('.nist-subcategories');
        subcategories.forEach(el => el.style.display = 'none');
        
        const buttons = this.container.querySelectorAll('.nist-expand-btn');
        buttons.forEach(btn => {
          btn.innerHTML = '<i class="fas fa-chevron-down"></i> Details';
          this.expanded[btn.dataset.category] = false;
        });
      });
    }
  }
  
  /**
   * Calculate scores for a category
   */
  calculateCategoryScores(categoryId) {
    // Get Portnox data
    const portnoxData = this.vendors.portnox?.compliance?.frameworks?.find(f => f.name === 'NIST CSF');
    
    if (portnoxData && portnoxData.details && portnoxData.details[categoryId]) {
      // We have real data
      return {
        portnox: portnoxData.details[categoryId],
        industry: this.calculateIndustryAverage(categoryId)
      };
    }
    
    // Fallback to simulated data
    return {
      portnox: this.getSimulatedScore('portnox', categoryId),
      industry: this.getSimulatedScore('industry', categoryId)
    };
  }
  
  /**
   * Calculate industry average for a category
   */
  calculateIndustryAverage(categoryId) {
    let total = 0;
    let count = 0;
    
    Object.keys(this.vendors).forEach(vendorId => {
      if (vendorId === 'portnox' || vendorId === 'no-nac') return;
      
      const vendor = this.vendors[vendorId];
      const frameworkData = vendor?.compliance?.frameworks?.find(f => f.name === 'NIST CSF');
      
      if (frameworkData && frameworkData.details && frameworkData.details[categoryId]) {
        total += frameworkData.details[categoryId];
        count++;
      }
    });
    
    return count > 0 ? Math.round(total / count) : this.getSimulatedScore('industry', categoryId);
  }
  
  /**
   * Get simulated score for a vendor and category
   */
  getSimulatedScore(type, categoryId) {
    // Simulated scores for demonstration purposes
    const scores = {
      portnox: {
        identify: 92,
        protect: 96,
        detect: 95,
        respond: 94,
        recover: 90
      },
      industry: {
        identify: 82,
        protect: 85,
        detect: 80,
        respond: 78,
        recover: 75
      }
    };
    
    return scores[type][categoryId] || 80;
  }
  
  /**
   * Get a random score between min and max
   */
  getRandomScore(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /**
   * Get icon for a category
   */
  getCategoryIcon(categoryId) {
    const icons = {
      identify: '<i class="fas fa-search"></i>',
      protect: '<i class="fas fa-shield-alt"></i>',
      detect: '<i class="fas fa-radar"></i>',
      respond: '<i class="fas fa-bolt"></i>',
      recover: '<i class="fas fa-sync-alt"></i>'
    };
    
    return icons[categoryId] || '<i class="fas fa-check"></i>';
  }
  
  /**
   * Add CSS styles
   */
  addStyles() {
    // Check if styles are already added
    if (document.getElementById('nist-csf-styles')) return;
    
    // Create style element
    const style = document.createElement('style');
    style.id = 'nist-csf-styles';
    
    // Add CSS rules
    style.textContent = `
      .nist-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }
      
      .nist-title {
        font-size: 1.25rem;
        font-weight: 600;
      }
      
      .nist-controls {
        display: flex;
        gap: 8px;
      }
      
      .nist-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 16px;
        margin-bottom: 16px;
      }
      
      .nist-category {
        background-color: white;
        padding: 16px;
      }
      
      .nist-category-header {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }
      
      .nist-category-icon {
        font-size: 1.25rem;
        margin-right: 8px;
      }
      
      .nist-category-name {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
      }
      
      .nist-category-description {
        font-size: 0.875rem;
        margin-bottom: 12px;
        color: var(--color-neutral-600);
      }
      
      .nist-score {
        height: 8px;
        background-color: var(--color-neutral-200);
        margin-bottom: 4px;
      }
      
      .nist-score-bar {
        height: 100%;
        background-color: var(--color-primary-600);
      }
      
      .nist-category-identify .nist-score-bar {
        background-color: var(--color-primary-600);
      }
      
      .nist-category-protect .nist-score-bar {
        background-color: var(--color-success-600);
      }
      
      .nist-category-detect .nist-score-bar {
        background-color: var(--color-warning-600);
      }
      
      .nist-category-respond .nist-score-bar {
        background-color: var(--color-danger-600);
      }
      
      .nist-category-recover .nist-score-bar {
        background-color: var(--color-secondary-600);
      }
      
      .nist-score-values {
        display: flex;
        justify-content: space-between;
        font-size: 0.75rem;
        color: var(--color-neutral-600);
        margin-bottom: 12px;
      }
      
      .nist-subcategories {
        margin-bottom: 12px;
        border-top: 1px solid var(--color-neutral-200);
        padding-top: 8px;
      }
      
      .nist-subcategory {
        display: flex;
        justify-content: space-between;
        font-size: 0.875rem;
        padding: 4px 0;
        border-bottom: 1px solid var(--color-neutral-100);
      }
      
      .nist-expand-btn {
        width: 100%;
      }
      
      .nist-legend {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 16px;
        margin-top: 16px;
      }
      
      .nist-legend-item {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
      }
      
      .nist-legend-color {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }
    `;
    
    // Add style to document
    document.head.appendChild(style);
  }
  
  /**
   * Update selected vendors
   */
  updateSelectedVendors(vendors) {
    this.selectedVendors = vendors;
    this.init();
  }
}

// Make globally available
window.NistCSFVisualization = NistCSFVisualization;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('NIST CSF Visualization component loaded');
});

/**
 * NIST CSF Visualization Component for Portnox Total Cost Analyzer
 * Creates an interactive visualization of the NIST Cybersecurity Framework
 */

class NistCSFVisualization {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.vendors = window.VENDORS || {};
    this.framework = window.COMPLIANCE_FRAMEWORKS['nist-csf'] || {};
    this.selectedVendors = ['portnox'];
    this.expanded = {};
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
      <h3 class="nist-title">NIST Cybersecurity Framework Compliance</h3>
      <div class="nist-controls">
        <button class="btn btn-sm btn-outline-primary nist-expand-all">Expand All</button>
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
    this.framework.categories.forEach(category => {
      let color = 'var(--color-primary-600)';
      
      if (category.id === 'protect') color = 'var(--color-success-600)';
      else if (category.id === 'detect') color = 'var(--color-warning-600)';
      else if (category.id === 'respond') color = 'var(--color-danger-600)';
      else if (category.id === 'recover') color = 'var(--color-secondary-600)';
      
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
    // Check if we have real data
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
      if (vendorId === 'portnox') return;
      
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
   * Update selected vendors
   */
  updateSelectedVendors(vendors) {
    this.selectedVendors = vendors;
    this.init();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize NIST CSF visualization if container exists
  const container = document.getElementById('nist-csf-visualization');
  if (container) {
    window.nistCsfVisualization = new NistCSFVisualization('nist-csf-visualization').init();
  }
});

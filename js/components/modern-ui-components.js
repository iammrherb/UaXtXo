/**
 * Modern UI Components for Portnox Total Cost Analyzer
 * Clean, professional design with smooth animations
 */

class ModernUIComponents {
  constructor() {
    this.theme = {
      colors: {
        primary: '#1a5a96',
        secondary: '#2980b9',
        success: '#27ae60',
        warning: '#f39c12',
        danger: '#e74c3c',
        info: '#3498db',
        dark: '#2c3e50',
        light: '#ecf0f1',
        white: '#ffffff',
        gradient: 'linear-gradient(135deg, #1a5a96 0%, #2980b9 100%)'
      },
      shadows: {
        small: '0 2px 4px rgba(0,0,0,0.1)',
        medium: '0 4px 8px rgba(0,0,0,0.12)',
        large: '0 8px 16px rgba(0,0,0,0.15)',
        hover: '0 12px 24px rgba(0,0,0,0.18)'
      },
      transitions: {
        fast: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        medium: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    };
  }
  
  /**
   * Create animated metric card
   */
  createMetricCard(config) {
    const {
      id,
      icon,
      title,
      value,
      subtitle,
      trend,
      color = 'primary',
      animate = true
    } = config;
    
    const card = document.createElement('div');
    card.className = `metric-card modern-card ${color}`;
    card.innerHTML = `
      <div class="metric-card-inner">
        <div class="metric-icon">
          <i class="${icon}"></i>
        </div>
        <div class="metric-content">
          <div class="metric-value" ${animate ? `data-animate="${value}"` : ''}>
            ${animate ? '0' : value}
          </div>
          <div class="metric-title">${title}</div>
          ${subtitle ? `<div class="metric-subtitle">${subtitle}</div>` : ''}
          ${trend ? `
            <div class="metric-trend ${trend.direction}">
              <i class="fas fa-arrow-${trend.direction}"></i>
              <span>${trend.text}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
    
    return card;
  }
  
  /**
   * Create comparison table
   */
  createComparisonTable(vendors, metrics) {
    const table = document.createElement('div');
    table.className = 'modern-comparison-table';
    
    // Create header
    let headerHTML = '<div class="table-header"><div class="table-cell">Metric</div>';
    vendors.forEach(vendor => {
      headerHTML += `<div class="table-cell">${vendor.shortName}</div>`;
    });
    headerHTML += '</div>';
    
    // Create rows
    let rowsHTML = '';
    metrics.forEach(metric => {
      rowsHTML += '<div class="table-row">';
      rowsHTML += `<div class="table-cell metric-name">${metric.name}</div>`;
      
      vendors.forEach(vendor => {
        const value = this.getNestedValue(vendor, metric.key);
        const formatted = metric.format ? metric.format(value) : value;
        const cellClass = metric.highlight ? this.getCellClass(value, metric) : '';
        
        rowsHTML += `<div class="table-cell ${cellClass}">${formatted}</div>`;
      });
      
      rowsHTML += '</div>';
    });
    
    table.innerHTML = headerHTML + rowsHTML;
    return table;
  }
  
  /**
   * Create interactive chart card
   */
  createChartCard(config) {
    const {
      id,
      title,
      subtitle,
      type,
      height = 350,
      controls = []
    } = config;
    
    const card = document.createElement('div');
    card.className = 'chart-card modern-card';
    card.innerHTML = `
      <div class="chart-header">
        <div class="chart-title-section">
          <h3 class="chart-title">${title}</h3>
          ${subtitle ? `<p class="chart-subtitle">${subtitle}</p>` : ''}
        </div>
        ${controls.length > 0 ? `
          <div class="chart-controls">
            ${controls.map(control => `
              <button class="chart-control-btn" data-action="${control.action}">
                <i class="${control.icon}"></i>
                ${control.label || ''}
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>
      <div class="chart-body">
        <div id="${id}" class="chart-container" style="height: ${height}px;"></div>
      </div>
    `;
    
    return card;
  }
  
  /**
   * Create tab navigation
   */
  createTabNavigation(tabs, activeTab = 0) {
    const nav = document.createElement('div');
    nav.className = 'modern-tab-nav';
    
    tabs.forEach((tab, index) => {
      const tabEl = document.createElement('button');
      tabEl.className = `modern-tab ${index === activeTab ? 'active' : ''}`;
      tabEl.dataset.tab = tab.id;
      tabEl.innerHTML = `
        <i class="${tab.icon}"></i>
        <span>${tab.label}</span>
      `;
      nav.appendChild(tabEl);
    });
    
    return nav;
  }
  
  /**
   * Create progress indicator
   */
  createProgressIndicator(config) {
    const {
      label,
      value,
      max = 100,
      color = 'primary',
      showValue = true,
      animate = true
    } = config;
    
    const progress = document.createElement('div');
    progress.className = 'modern-progress';
    progress.innerHTML = `
      <div class="progress-header">
        <span class="progress-label">${label}</span>
        ${showValue ? `<span class="progress-value">${value}%</span>` : ''}
      </div>
      <div class="progress-bar">
        <div class="progress-fill ${color}" 
             style="width: ${animate ? '0' : value}%"
             data-value="${value}">
        </div>
      </div>
    `;
    
    if (animate) {
      setTimeout(() => {
        const fill = progress.querySelector('.progress-fill');
        fill.style.width = `${value}%`;
      }, 100);
    }
    
    return progress;
  }
  
  /**
   * Create vendor badge
   */
  createVendorBadge(vendor) {
    const badge = document.createElement('div');
    badge.className = 'vendor-badge';
    badge.style.borderColor = vendor.color;
    badge.innerHTML = `
      <img src="${vendor.logo}" alt="${vendor.name}" class="vendor-badge-logo">
      <span class="vendor-badge-name">${vendor.shortName}</span>
    `;
    
    return badge;
  }
  
  /**
   * Create feature comparison grid
   */
  createFeatureGrid(vendors, features) {
    const grid = document.createElement('div');
    grid.className = 'modern-feature-grid';
    
    features.forEach(feature => {
      const row = document.createElement('div');
      row.className = 'feature-row';
      
      const featureLabel = document.createElement('div');
      featureLabel.className = 'feature-label';
      featureLabel.innerHTML = `
        <i class="${feature.icon}"></i>
        <span>${feature.name}</span>
      `;
      row.appendChild(featureLabel);
      
      const vendorSupport = document.createElement('div');
      vendorSupport.className = 'vendor-support';
      
      vendors.forEach(vendor => {
        const supported = this.getNestedValue(vendor, feature.key);
        const supportEl = document.createElement('div');
        supportEl.className = `support-indicator ${supported ? 'supported' : 'not-supported'}`;
        supportEl.innerHTML = supported ? 
          '<i class="fas fa-check-circle"></i>' : 
          '<i class="fas fa-times-circle"></i>';
        supportEl.title = `${vendor.shortName}: ${supported ? 'Supported' : 'Not Supported'}`;
        vendorSupport.appendChild(supportEl);
      });
      
      row.appendChild(vendorSupport);
      grid.appendChild(row);
    });
    
    return grid;
  }
  
  /**
   * Create timeline visualization
   */
  createTimeline(events) {
    const timeline = document.createElement('div');
    timeline.className = 'modern-timeline';
    
    events.forEach((event, index) => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <div class="timeline-date">${event.date}</div>
          <div class="timeline-title">${event.title}</div>
          <div class="timeline-description">${event.description}</div>
        </div>
      `;
      timeline.appendChild(item);
    });
    
    return timeline;
  }
  
  /**
   * Helper: Get nested object value
   */
  getNestedValue(obj, path) {
    return path.split('.').reduce((curr, prop) => curr?.[prop], obj);
  }
  
  /**
   * Helper: Get cell class based on value
   */
  getCellClass(value, metric) {
    if (metric.highlightBest) {
      // Implementation for highlighting best values
      return '';
    }
    if (metric.threshold) {
      return value >= metric.threshold ? 'good' : 'poor';
    }
    return '';
  }
  
  /**
   * Initialize animations
   */
  initializeAnimations() {
    // Animate metric values
    document.querySelectorAll('[data-animate]').forEach(element => {
      const target = parseInt(element.getAttribute('data-animate'));
      this.animateValue(element, 0, target, 1500);
    });
    
    // Fade in elements
    document.querySelectorAll('.fade-in').forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, index * 100);
    });
  }
  
  /**
   * Animate numeric value
   */
  animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const isPercentage = element.textContent.includes('%');
    const isCurrency = element.textContent.includes('$');
    
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const current = Math.round(start + (end - start) * progress);
      
      if (isCurrency) {
        element.textContent = '$' + current.toLocaleString();
      } else if (isPercentage) {
        element.textContent = current + '%';
      } else {
        element.textContent = current.toLocaleString();
      }
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    
    requestAnimationFrame(update);
  }
}

// Initialize modern UI components
window.modernUI = new ModernUIComponents();
console.log('✅ Modern UI components initialized');

/**
 * Vendor Comparison View for Portnox Total Cost Analyzer
 * Provides detailed comparison of selected vendors
 */

class VendorComparisonView {
  constructor(app) {
    this.app = app;
    this.container = null;
    this.vendors = [];
    this.criteria = [
      { id: 'tco', name: 'Total Cost of Ownership', type: 'currency', lowerIsBetter: true },
      { id: 'implementation', name: 'Implementation Time', type: 'days', lowerIsBetter: true },
      { id: 'roi', name: 'Return on Investment', type: 'percentage', lowerIsBetter: false },
      { id: 'security', name: 'Security Improvement', type: 'percentage', lowerIsBetter: false },
      { id: 'payback', name: 'Payback Period', type: 'months', lowerIsBetter: true },
      { id: 'features', name: 'Feature Coverage', type: 'percentage', lowerIsBetter: false }
    ];
  }
  
  /**
   * Initialize the comparison view
   */
  init(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container not found: ${containerId}`);
      return false;
    }
    
    return true;
  }
  
  /**
   * Update the comparison view with results data
   */
  update(resultsData, selectedVendors) {
    if (!this.container || !resultsData) return;
    
    this.vendors = selectedVendors.map(id => ({
      id,
      data: this.getVendorData(id, resultsData)
    }));
    
    this.render();
  }
  
  /**
   * Extract relevant vendor data from results
   */
  getVendorData(vendorId, resultsData) {
    const vendorInfo = VENDORS[vendorId];
    const vendorTco = resultsData.vendors[vendorId];
    const vendorRoi = resultsData.roi[vendorId];
    const vendorSecurity = resultsData.security[vendorId];
    
    const vendorData = {
      name: vendorInfo.name,
      logo: vendorInfo.logo,
      architecture: vendorInfo.architecture,
      description: vendorInfo.description,
      
      // TCO data
      tco: vendorTco.totalTco,
      implementation: vendorTco.implementation.time,
      
      // ROI data
      roi: vendorRoi ? vendorRoi.roiPercentage : 0,
      payback: vendorRoi ? vendorRoi.paybackPeriod : 0,
      
      // Security data
      security: vendorSecurity ? vendorSecurity.improvements.overall : 0,
      
      // Features
      features: this.calculateFeatureCoverage(vendorInfo)
    };
    
    return vendorData;
  }
  
  /**
   * Calculate feature coverage percentage
   */
  calculateFeatureCoverage(vendorInfo) {
    if (!vendorInfo.features) return 0;
    
    const featureCount = Object.values(vendorInfo.features).filter(v => v).length;
    const totalFeatures = Object.keys(vendorInfo.features).length;
    
    return (featureCount / totalFeatures) * 100;
  }
  
  /**
   * Render the comparison view
   */
  render() {
    this.container.innerHTML = '';
    
    // Create comparison header
    const header = document.createElement('div');
    header.className = 'comparison-header';
    
    const title = document.createElement('h2');
    title.textContent = 'Vendor Comparison Matrix';
    header.appendChild(title);
    
    const description = document.createElement('p');
    description.className = 'subtitle';
    description.textContent = 'Compare key metrics and features across selected vendors';
    header.appendChild(description);
    
    this.container.appendChild(header);
    
    // Create comparison table
    this.renderComparisonTable();
    
    // Create feature comparison
    this.renderFeatureComparison();
    
    // Create architecture comparison
    this.renderArchitectureComparison();
  }
  
  /**
   * Render the main comparison table
   */
  renderComparisonTable() {
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-responsive';
    
    const table = document.createElement('table');
    table.className = 'data-table comparison-table';
    
    // Create header row with vendor logos and names
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // Add criteria column
    const criteriaHeader = document.createElement('th');
    criteriaHeader.textContent = 'Criteria';
    headerRow.appendChild(criteriaHeader);
    
    // Add vendor columns
    this.vendors.forEach(vendor => {
      const vendorHeader = document.createElement('th');
      
      const logoImg = document.createElement('img');
      logoImg.src = vendor.data.logo;
      logoImg.alt = vendor.data.name;
      logoImg.className = 'vendor-logo-small';
      
      const vendorName = document.createElement('div');
      vendorName.textContent = vendor.data.name;
      
      vendorHeader.appendChild(logoImg);
      vendorHeader.appendChild(vendorName);
      
      headerRow.appendChild(vendorHeader);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body with comparison criteria
    const tbody = document.createElement('tbody');
    
    this.criteria.forEach(criterion => {
      const row = document.createElement('tr');
      
      // Add criterion name
      const nameCell = document.createElement('td');
      nameCell.textContent = criterion.name;
      row.appendChild(nameCell);
      
      // Find best value for this criterion
      let bestValue = criterion.lowerIsBetter ? Infinity : -Infinity;
      
      this.vendors.forEach(vendor => {
        const value = vendor.data[criterion.id];
        
        if (criterion.lowerIsBetter) {
          bestValue = Math.min(bestValue, value);
        } else {
          bestValue = Math.max(bestValue, value);
        }
      });
      
      // Add vendor values
      this.vendors.forEach(vendor => {
        const cell = document.createElement('td');
        const value = vendor.data[criterion.id];
        
        // Format value based on type
        let formattedValue = '';
        switch (criterion.type) {
          case 'currency':
            formattedValue = this.formatCurrency(value);
            break;
          case 'percentage':
            formattedValue = this.formatPercentage(value);
            break;
          case 'days':
            formattedValue = `${Math.round(value)} days`;
            break;
          case 'months':
            formattedValue = `${Math.round(value)} months`;
            break;
          default:
            formattedValue = value.toString();
        }
        
        cell.textContent = formattedValue;
        
        // Highlight best value
        if ((criterion.lowerIsBetter && value === bestValue) || 
            (!criterion.lowerIsBetter && value === bestValue)) {
          cell.classList.add('highlight-cell');
        }
        
        row.appendChild(cell);
      });
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    tableContainer.appendChild(table);
    
    this.container.appendChild(tableContainer);
  }
  
  /**
   * Render feature comparison
   */
  renderFeatureComparison() {
    const featureContainer = document.createElement('div');
    featureContainer.className = 'feature-comparison-container';
    
    const title = document.createElement('h3');
    title.textContent = 'Feature Comparison';
    featureContainer.appendChild(title);
    
    // Create feature matrix
    const featureMatrixContainer = document.createElement('div');
    featureMatrixContainer.className = 'feature-matrix-container';
    
    // Get all feature keys
    const featureKeys = {
      cloudIntegration: 'Cloud Integration',
      legacyDevices: 'Legacy Device Support',
      byod: 'BYOD Support',
      iot: 'IoT Device Support',
      wireless: 'Wireless Network',
      remoteUsers: 'Remote User Support'
    };
    
    // Create feature table
    const table = document.createElement('table');
    table.className = 'data-table feature-table';
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const featureHeader = document.createElement('th');
    featureHeader.textContent = 'Feature';
    headerRow.appendChild(featureHeader);
    
    this.vendors.forEach(vendor => {
      const vendorHeader = document.createElement('th');
      vendorHeader.textContent = vendor.data.name;
      headerRow.appendChild(vendorHeader);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    
    for (const [key, label] of Object.entries(featureKeys)) {
      const row = document.createElement('tr');
      
      const featureCell = document.createElement('td');
      featureCell.textContent = label;
      row.appendChild(featureCell);
      
      // Add vendor support for this feature
      this.vendors.forEach(vendor => {
        const vendorId = vendor.id;
        const vendorInfo = VENDORS[vendorId];
        
        const supportCell = document.createElement('td');
        const isSupported = vendorInfo.features && vendorInfo.features[key];
        
        const icon = document.createElement('i');
        icon.className = isSupported ? 
          'fas fa-check-circle feature-supported' : 
          'fas fa-times-circle feature-unsupported';
        
        supportCell.appendChild(icon);
        row.appendChild(supportCell);
      });
      
      tbody.appendChild(row);
    }
    
    table.appendChild(tbody);
    featureMatrixContainer.appendChild(table);
    featureContainer.appendChild(featureMatrixContainer);
    
    this.container.appendChild(featureContainer);
  }
  
  /**
   * Render architecture comparison
   */
  renderArchitectureComparison() {
    const architectureContainer = document.createElement('div');
    architectureContainer.className = 'architecture-comparison-container';
    
    const title = document.createElement('h3');
    title.textContent = 'Architecture Comparison';
    architectureContainer.appendChild(title);
    
    // Create architecture cards
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'architecture-cards';
    
    this.vendors.forEach(vendor => {
      const card = document.createElement('div');
      card.className = 'architecture-card';
      
      // Architecture type badge
      const badge = document.createElement('div');
      badge.className = `arch-badge ${vendor.data.architecture}`;
      badge.textContent = this.formatArchitectureType(vendor.data.architecture);
      card.appendChild(badge);
      
      // Vendor name
      const name = document.createElement('h4');
      name.textContent = vendor.data.name;
      card.appendChild(name);
      
      // Architecture description
      const description = document.createElement('p');
      description.textContent = this.getArchitectureDescription(vendor.data.architecture);
      card.appendChild(description);
      
      // Key benefits
      const benefits = document.createElement('ul');
      benefits.className = 'architecture-benefits';
      
      const benefitsList = this.getArchitectureBenefits(vendor.data.architecture);
      benefitsList.forEach(benefit => {
        const item = document.createElement('li');
        item.textContent = benefit;
        benefits.appendChild(item);
      });
      
      card.appendChild(benefits);
      
      cardsContainer.appendChild(card);
    });
    
    architectureContainer.appendChild(cardsContainer);
    this.container.appendChild(architectureContainer);
  }
  
  /**
   * Format architecture type for display
   */
  formatArchitectureType(architecture) {
    switch (architecture) {
      case 'cloud':
        return 'Cloud-Native';
      case 'on-premises':
        return 'On-Premises';
      case 'hybrid':
        return 'Hybrid';
      default:
        return 'Unknown';
    }
  }
  
  /**
   * Get architecture description
   */
  getArchitectureDescription(architecture) {
    switch (architecture) {
      case 'cloud':
        return 'Fully cloud-based solution with no on-premises infrastructure requirements. Managed service with automatic updates and global scalability.';
      case 'on-premises':
        return 'Traditional deployment model requiring on-premises hardware and software. Provides complete control over the deployment environment.';
      case 'hybrid':
        return 'Combination of cloud and on-premises components, providing flexibility while leveraging existing infrastructure investments.';
      default:
        return '';
    }
  }
  
  /**
   * Get key benefits for architecture type
   */
  getArchitectureBenefits(architecture) {
    switch (architecture) {
      case 'cloud':
        return [
          'No hardware costs or maintenance',
          'Automatic updates and scaling',
          'Reduced IT overhead',
          'Global accessibility',
          'Rapid deployment'
        ];
      case 'on-premises':
        return [
          'Complete control over infrastructure',
          'Data remains within corporate network',
          'No ongoing subscription costs',
          'Customizable deployment',
          'Offline operation capability'
        ];
      case 'hybrid':
        return [
          'Flexible deployment options',
          'Leverage existing investments',
          'Balance of control and convenience',
          'Scalable cloud components',
          'Phased migration pathway'
        ];
      default:
        return [];
    }
  }
  
  /**
   * Format currency value
   */
  formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
  
  /**
   * Format percentage value
   */
  formatPercentage(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    }).format(value / 100);
  }
}

// Export for use across the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VendorComparisonView };
}

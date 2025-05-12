/**
 * Enhanced utility functions for the Total Cost Analyzer
 */

// Format currency - make globally available for chart tooltips
window.formatCurrency = function(value) {
  if (value === undefined || value === null) return '$0';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

// Format percentage with customizable precision
window.formatPercentage = function(value, precision = 1) {
  if (value === undefined || value === null) return '0.0%';
  
  return `${value.toFixed(precision)}%`;
};

// Format number with commas
window.formatNumber = function(value, precision = 0) {
  if (value === undefined || value === null) return '0';
  
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: precision
  }).format(value);
};

// Format duration in days to readable format
window.formatDuration = function(days) {
  if (!days) return '0 days';
  
  if (days < 1) {
    const hours = Math.round(days * 24);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }
  
  if (days >= 30) {
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;
    
    if (remainingDays === 0) {
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    }
    
    return `${months} ${months === 1 ? 'month' : 'months'}, ${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`;
  }
  
  return `${Math.round(days)} ${Math.round(days) === 1 ? 'day' : 'days'}`;
};

// Calculate complexity multiplier based on settings
function calculateComplexityMultiplier(vendor, cloudBased) {
  let multiplier = 1.0;
  
  // Cloud vendors are less affected by complexity factors
  const cloudReductionFactor = cloudBased ? 0.4 : 1.0;
  
  if (document.getElementById('multiple-locations')?.checked) {
    // Additional 10% per location beyond the first, up to a max of 100% extra
    const locationCount = parseInt(document.getElementById('location-count')?.value) || 1;
    multiplier += Math.min(0.1 * (locationCount - 1), 1.0) * cloudReductionFactor;
  }
  
  if (document.getElementById('complex-authentication')?.checked) {
    multiplier += 0.15 * cloudReductionFactor;
  }
  
  if (document.getElementById('legacy-devices')?.checked) {
    // Additional 0-30% based on percentage of legacy devices
    const legacyPercentage = parseInt(document.getElementById('legacy-percentage')?.value) || 10;
    multiplier += (legacyPercentage / 100) * 0.3 * cloudReductionFactor;
  }
  
  if (document.getElementById('cloud-integration')?.checked) {
    // Cloud vendors handle this better
    multiplier += 0.1 * cloudReductionFactor;
  }
  
  if (document.getElementById('custom-policies')?.checked) {
    // Different multipliers based on policy complexity
    const policyComplexity = document.getElementById('policy-complexity')?.value || 'medium';
    if (policyComplexity === 'low') {
      multiplier += 0.05 * cloudReductionFactor;
    } else if (policyComplexity === 'medium') {
      multiplier += 0.15 * cloudReductionFactor;
    } else if (policyComplexity === 'high') {
      multiplier += 0.25 * cloudReductionFactor;
    }
  }
  
  return multiplier;
}

// Enhanced version using DOM Cache
window.calculateComplexityMultiplier = function(vendor, cloudBased) {
  // Use DOM Cache if available
  const domCache = window.domCache;
  
  let multiplier = 1.0;
  
  // Cloud vendors are less affected by complexity factors
  const cloudReductionFactor = cloudBased ? 0.4 : 1.0;
  
  // Use DOM Cache if available, otherwise fallback to document.getElementById
  const getElement = (id) => {
    return domCache ? domCache.get(id) : document.getElementById(id);
  };
  
  const getInputValue = (id, defaultValue) => {
    const element = getElement(id);
    if (!element) return defaultValue;
    
    if (element.type === 'checkbox') {
      return element.checked;
    } else if (element.type === 'number') {
      return parseFloat(element.value) || defaultValue;
    } else {
      return element.value;
    }
  };
  
  if (getInputValue('multiple-locations', false)) {
    // Additional 10% per location beyond the first, up to a max of 100% extra
    const locationCount = getInputValue('location-count', 1);
    multiplier += Math.min(0.1 * (locationCount - 1), 1.0) * cloudReductionFactor;
  }
  
  if (getInputValue('complex-authentication', false)) {
    multiplier += 0.15 * cloudReductionFactor;
  }
  
  if (getInputValue('legacy-devices', false)) {
    // Additional 0-30% based on percentage of legacy devices
    const legacyPercentage = getInputValue('legacy-percentage', 10);
    multiplier += (legacyPercentage / 100) * 0.3 * cloudReductionFactor;
  }
  
  if (getInputValue('cloud-integration', false)) {
    // Cloud vendors handle this better
    multiplier += 0.1 * cloudReductionFactor;
  }
  
  if (getInputValue('custom-policies', false)) {
    // Different multipliers based on policy complexity
    const policyComplexity = getInputValue('policy-complexity', 'medium');
    if (policyComplexity === 'low') {
      multiplier += 0.05 * cloudReductionFactor;
    } else if (policyComplexity === 'medium') {
      multiplier += 0.15 * cloudReductionFactor;
    } else if (policyComplexity === 'high') {
      multiplier += 0.25 * cloudReductionFactor;
    }
  }
  
  return multiplier;
};

// Enhanced migration complexity factor calculation
window.calculateMigrationFactor = function(fromVendor, toVendor) {
  if (!fromVendor || !toVendor) return 0.5; // Default factor
  
  const migrationFactors = {
    cisco: {
      aruba: 0.7,
      forescout: 0.6,
      nps: 0.5,
      portnox: 0.3
    },
    aruba: {
      cisco: 0.7,
      forescout: 0.6,
      nps: 0.5,
      portnox: 0.3
    },
    forescout: {
      cisco: 0.7,
      aruba: 0.6,
      nps: 0.5,
      portnox: 0.3
    },
    nps: {
      cisco: 0.8,
      aruba: 0.7,
      forescout: 0.7,
      portnox: 0.3
    },
    portnox: {
      cisco: 0.8,
      aruba: 0.7,
      forescout: 0.7,
      nps: 0.6
    }
  };
  
  if (fromVendor === toVendor) {
    return 0; // Same vendor has no migration cost
  }
  
  if (migrationFactors[fromVendor] && migrationFactors[fromVendor][toVendor]) {
    return migrationFactors[fromVendor][toVendor];
  }
  
  return 0.5; // Default factor if not found
};

// Get FTE costs with enhanced accuracy
window.calculateFTECosts = function(allocation) {
  if (!allocation) return 0;
  
  const fteCosts = {
    networkAdmin: 120000,
    securityAdmin: 135000,
    systemAdmin: 110000,
    helpDesk: 75000
  };
  
  let totalCost = 0;
  for (const [role, amount] of Object.entries(allocation)) {
    totalCost += fteCosts[role] * amount;
  }
  
  return totalCost;
};

// Function to toggle visibility of an element
window.toggleVisibility = function(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle('hidden');
    
    // Update aria-expanded if it's a toggle control
    const controls = document.querySelectorAll(`[aria-controls="${elementId}"]`);
    controls.forEach(control => {
      if (control.hasAttribute('aria-expanded')) {
        const isExpanded = !element.classList.contains('hidden');
        control.setAttribute('aria-expanded', isExpanded.toString());
      }
    });
    
    return !element.classList.contains('hidden');
  }
  return false;
};

// Function to set active tab - deprecated, use TabManager instead
window.setActiveTab = function(tabId) {
  console.warn('setActiveTab is deprecated, use window.tabManager.setActiveTab instead');
  if (window.tabManager) {
    window.tabManager.setActiveTab(tabId);
    return;
  }
  
  // Fallback implementation
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
  });
  
  const selectedPane = document.getElementById(tabId);
  if (selectedPane) {
    selectedPane.classList.add('active');
  }
  
  document.querySelectorAll(`.tab-button[data-tab="${tabId}"]`).forEach(button => {
    button.classList.add('active');
  });
};

// Function to set active sub tab - deprecated, use TabManager instead
window.setActiveSubTab = function(subtabId) {
  console.warn('setActiveSubTab is deprecated, use window.tabManager.setActiveSubTab instead');
  if (window.tabManager) {
    window.tabManager.setActiveSubTab(subtabId);
    return;
  }
  
  // Fallback implementation
  document.querySelectorAll('.sub-tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });
  
  document.querySelectorAll('.sub-tab-button').forEach(button => {
    button.classList.remove('active');
  });
  
  const selectedPane = document.getElementById(subtabId);
  if (selectedPane) {
    selectedPane.classList.add('active');
  }
  
  document.querySelectorAll(`.sub-tab-button[data-subtab="${subtabId}"]`).forEach(button => {
    button.classList.add('active');
  });
};

// Function to create a HTML element with class and text
window.createElement = function(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
};

// Enhanced deep copy function to avoid circular references
window.deepCopy = function(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => window.deepCopy(item));
  }
  
  const copy = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = window.deepCopy(obj[key]);
    }
  }
  
  return copy;
};

// Utility for efficient DOM manipulation
window.batchDOMUpdates = function(updates, callback) {
  // Use requestAnimationFrame to batch DOM updates
  requestAnimationFrame(() => {
    const fragment = document.createDocumentFragment();
    
    updates.forEach(update => {
      if (typeof update.render === 'function') {
        fragment.appendChild(update.render());
      } else if (update.element) {
        if (update.innerHTML !== undefined) {
          update.element.innerHTML = update.innerHTML;
        }
        if (update.textContent !== undefined) {
          update.element.textContent = update.textContent;
        }
        if (update.attributes) {
          Object.entries(update.attributes).forEach(([attr, value]) => {
            update.element.setAttribute(attr, value);
          });
        }
        if (update.styles) {
          Object.entries(update.styles).forEach(([prop, value]) => {
            update.element.style[prop] = value;
          });
        }
        if (update.classes) {
          update.classes.add?.forEach(cls => update.element.classList.add(cls));
          update.classes.remove?.forEach(cls => update.element.classList.remove(cls));
        }
      }
    });
    
    if (fragment.hasChildNodes() && updates[0].container) {
      updates[0].container.appendChild(fragment);
    }
    
    if (typeof callback === 'function') {
      callback();
    }
  });
};

// Export functions for CVS or Excel
window.exportTableToCSV = function(tableId, filename) {
  const table = document.getElementById(tableId);
  if (!table) return false;
  
  let csv = [];
  const rows = table.querySelectorAll('tr');
  
  for (let i = 0; i < rows.length; i++) {
    const row = [], cols = rows[i].querySelectorAll('td, th');
    
    for (let j = 0; j < cols.length; j++) {
      // Clean data: remove tabs, newlines, double quotes (replace with single quotes)
      let data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, ' ').replace(/(\s\s)/gm, ' ').replace(/"/g, "'");
      // Escape commas in data
      data = data.includes(',') ? `"${data}"` : data;
      row.push(data);
    }
    
    csv.push(row.join(','));
  }
  
  // Download CSV file
  const csvContent = csv.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename || 'export.csv');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
};

// Download data as JSON file
window.downloadJSON = function(data, filename) {
  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename || 'export.json');
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Utility to get correct element dimensions even for hidden elements
window.getHiddenElementDimensions = function(element) {
  if (!element) return { width: 0, height: 0 };
  
  const clone = element.cloneNode(true);
  const style = {
    display: 'block',
    position: 'absolute',
    visibility: 'hidden',
    maxHeight: 'none',
    maxWidth: 'none',
    width: 'auto',
    height: 'auto'
  };
  
  Object.assign(clone.style, style);
  document.body.appendChild(clone);
  
  const dimensions = {
    width: clone.offsetWidth,
    height: clone.offsetHeight
  };
  
  document.body.removeChild(clone);
  return dimensions;
};

// Debounce function to limit rapid execution
window.debounce = function(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    
    if (immediate && !timeout) func.apply(context, args);
  };
};

// Throttle function to limit execution frequency
window.throttle = function(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

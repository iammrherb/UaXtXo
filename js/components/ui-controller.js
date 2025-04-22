/**
 * UI Controller for handling user interface interactions
 */

class UIController {
  constructor() {
    this.initEventListeners();
    this.initAdvancedOptions();
    this.activeVendor = 'cisco'; // Default active vendor
  }

  initEventListeners() {
    // Tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        setActiveTab(tabId);
      });
    });

    // Sub-tab buttons
    document.querySelectorAll('.sub-tab-button').forEach(button => {
      button.addEventListener('click', () => {
        const subtabId = button.getAttribute('data-subtab');
        setActiveSubTab(subtabId);
      });
    });

    // Advanced options toggle
    const advancedToggle = document.getElementById('advanced-toggle');
    if (advancedToggle) {
      advancedToggle.addEventListener('click', () => {
        toggleVisibility('advanced-options');
        const icon = advancedToggle.querySelector('.fa-chevron-down, .fa-chevron-up');
        if (icon) {
          icon.classList.toggle('fa-chevron-down');
          icon.classList.toggle('fa-chevron-up');
        }
      });
    }

    // Vendor cards
    document.querySelectorAll('.vendor-card').forEach(card => {
      card.addEventListener('click', () => {
        this.setActiveVendor(card.getAttribute('data-vendor'));
      });
    });

    // Conditional display fields
    const multipleLocations = document.getElementById('multiple-locations');
    if (multipleLocations) {
      multipleLocations.addEventListener('change', () => {
        document.querySelector('.location-count-container').classList.toggle('hidden', !multipleLocations.checked);
      });
    }

    const legacyDevices = document.getElementById('legacy-devices');
    if (legacyDevices) {
      legacyDevices.addEventListener('change', () => {
        document.querySelector('.legacy-devices-container').classList.toggle('hidden', !legacyDevices.checked);
      });
    }

    const customPolicies = document.getElementById('custom-policies');
    if (customPolicies) {
      customPolicies.addEventListener('change', () => {
        document.querySelector('.custom-policies-container').classList.toggle('hidden', !customPolicies.checked);
      });
    }

    // Legacy percentage range input
    const legacyPercentage = document.getElementById('legacy-percentage');
    if (legacyPercentage) {
      legacyPercentage.addEventListener('input', () => {
        document.getElementById('legacy-percentage-display').textContent = `${legacyPercentage.value}%`;
      });
    }

    // Calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        // Trigger calculation in main.js
        if (window.calculator) {
          window.calculator.calculate();
        }
      });
    }

    // Modal close button
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        document.getElementById('results-modal').classList.add('hidden');
      });
    }

    // Close modal button
    const closeModal = document.getElementById('close-modal');
    if (closeModal) {
      closeModal.addEventListener('click', () => {
        document.getElementById('results-modal').classList.add('hidden');
      });
    }
  }

  initAdvancedOptions() {
    // Hide conditional containers initially
    document.querySelector('.location-count-container').classList.add('hidden');
    document.querySelector('.legacy-devices-container').classList.add('hidden');
    document.querySelector('.custom-policies-container').classList.add('hidden');
  }

  setActiveVendor(vendor) {
    // Remove active class from all vendor cards
    document.querySelectorAll('.vendor-card').forEach(card => {
      card.classList.remove('active');
    });
    
    // Add active class to selected vendor card
    const selectedCard = document.querySelector(`.vendor-card[data-vendor="${vendor}"]`);
    if (selectedCard) {
      selectedCard.classList.add('active');
    }
    
    this.activeVendor = vendor;
    
    // Update UI elements with vendor name
    const vendorName = vendorData[vendor].name;
    document.getElementById('current-solution-name').textContent = vendorName;
    document.getElementById('breakdown-current-solution').textContent = vendorName;
    
    // If calculation is already done, recalculate
    if (window.calculator && window.calculator.resultsAvailable) {
      window.calculator.calculate();
    }
  }

  showResults() {
    document.getElementById('results-modal').classList.remove('hidden');
  }

  updateBenefits() {
    const benefitsGrid = document.querySelector('.benefits-grid');
    if (!benefitsGrid) return;
    
    // Clear previous benefits
    benefitsGrid.innerHTML = '';
    
    // Add benefit cards
    portnoxBenefits.forEach(benefit => {
      const benefitCard = createElement('div', 'benefit-card');
      
      const iconElement = createElement('div', 'benefit-icon');
      iconElement.textContent = benefit.icon;
      
      const contentElement = createElement('div', 'benefit-content');
      
      const titleElement = createElement('h5', '', benefit.title);
      const descElement = createElement('p', '', benefit.description);
      const metricElement = createElement('div', 'benefit-metric', benefit.metric);
      
      contentElement.appendChild(titleElement);
      contentElement.appendChild(descElement);
      contentElement.appendChild(metricElement);
      
      benefitCard.appendChild(iconElement);
      benefitCard.appendChild(contentElement);
      
      benefitsGrid.appendChild(benefitCard);
    });
  }

  populateTCOSummaryTable(results) {
    const tableBody = document.querySelector('#tco-summary-table tbody');
    if (!tableBody) return;
    
    // Clear previous rows
    tableBody.innerHTML = '';
    
    const currentVendor = this.activeVendor;
    const currentTCO = results[currentVendor].totalTCO;
    
    // Add a row for each vendor
    Object.keys(vendorData).forEach(vendor => {
      const vendorResult = results[vendor];
      const row = document.createElement('tr');
      
      // Highlight current solution and Portnox
      if (vendor === currentVendor) {
        row.classList.add('current-solution');
        row.style.backgroundColor = 'rgba(27, 103, 178, 0.1)';
      } else if (vendor === 'portnox') {
        row.style.backgroundColor = 'rgba(43, 210, 91, 0.1)';
      }
      
      // Make row clickable to set focus vendor
      row.style.cursor = 'pointer';
      row.addEventListener('click', () => {
        document.getElementById('breakdown-alt-solution').textContent = vendorData[vendor].name;
        // Update charts
        if (window.chartBuilder) {
          window.chartBuilder.updateBreakdownCharts(currentVendor, vendor);
        }
      });
      
      // Vendor cell
      const vendorCell = document.createElement('td');
      vendorCell.innerHTML = `
        <div style="display: flex; align-items: center;">
          <img src="${vendorData[vendor].logo}" alt="${vendorData[vendor].name}" style="height: 25px; margin-right: 10px;">
          <div>
            <div>${vendorData[vendor].name}</div>
            <div style="font-size: 0.8rem; color: var(--text-light);">
              ${vendorData[vendor].cloudBased ? 
                '<span style="color: var(--accent-color);">Cloud</span>' : 
                '<span style="color: var(--primary-color);">On-Premise</span>'}
            </div>
          </div>
        </div>
      `;
      
      // Create and append cells
      row.appendChild(vendorCell);
      
      // TCO cell
      const tcoCell = document.createElement('td');
      tcoCell.innerHTML = `
        <div>${formatCurrency(vendorResult.totalTCO)}</div>
        <div style="font-size: 0.8rem; color: var(--text-light);">
          ${formatCurrency(vendorResult.totalTCO / results.yearsToProject)}/year
        </div>
      `;
      row.appendChild(tcoCell);
      
      // Initial costs cell
      const initialCell = document.createElement('td');
      initialCell.innerHTML = `
        <div>${formatCurrency(vendorResult.totalInitialCosts)}</div>
        ${vendor !== currentVendor ? 
          `<div style="font-size: 0.8rem; color: var(--text-light);">
            +${formatCurrency(vendorResult.migrationCost)} migration
          </div>` : 
          ''}
      `;
      row.appendChild(initialCell);
      
      // Annual costs cell
      const annualCell = document.createElement('td');
      annualCell.innerHTML = `
        <div>${formatCurrency(vendorResult.annualCosts)}/year</div>
        <div style="font-size: 0.8rem; color: var(--text-light);">
          ${formatCurrency(vendorResult.annualCosts * results.yearsToProject)} total
        </div>
      `;
      row.appendChild(annualCell);
      
      // Only show savings columns if comparing to current solution
      if (vendor !== currentVendor) {
        // Savings vs Current cell
        const savingsCell = document.createElement('td');
        const savings = vendorResult.totalSavings;
        savingsCell.innerHTML = `
          <div style="color: ${savings > 0 ? 'var(--accent-dark)' : 'var(--danger-color)'}">${formatCurrency(savings)}</div>
        `;
        row.appendChild(savingsCell);
        
        // Savings % cell
        const savingsPercentCell = document.createElement('td');
        const savingsPercent = vendorResult.savingsPercentage;
        savingsPercentCell.innerHTML = `
          <div style="color: ${savingsPercent > 0 ? 'var(--accent-dark)' : 'var(--danger-color)'}">${savingsPercent.toFixed(1)}%</div>
        `;
        row.appendChild(savingsPercentCell);
      } else {
        // Empty cells for current solution
        const emptyCell1 = document.createElement('td');
        emptyCell1.innerHTML = '<span style="color: var(--text-light);">—</span>';
        row.appendChild(emptyCell1);
        
        const emptyCell2 = document.createElement('td');
        emptyCell2.innerHTML = '<span style="color: var(--text-light);">—</span>';
        row.appendChild(emptyCell2);
      }
      
      tableBody.appendChild(row);
    });
  }

  updatePortnoxAdvantageSection(results) {
    if (!results || !results.portnox) return;
    
    const currentVendor = this.activeVendor;
    const currentSolution = results[currentVendor];
    const portnoxSolution = results.portnox;
    
    // Update potential savings
    const savingsAmount = document.getElementById('potential-savings-amount');
    if (savingsAmount) {
      savingsAmount.textContent = formatCurrency(portnoxSolution.totalSavings);
    }
    
    // Update implementation time reduction
    const timeReduction = document.getElementById('implementation-time-reduction');
    if (timeReduction) {
      const currentTime = results.implementationResults[currentVendor];
      const portnoxTime = results.implementationResults.portnox;
      const reductionPercentage = ((currentTime - portnoxTime) / currentTime) * 100;
      timeReduction.textContent = `${reductionPercentage.toFixed(0)}%`;
    }
    
    // Update TCO comparison card
    document.getElementById('tco-savings-amount').textContent = formatCurrency(portnoxSolution.totalSavings);
    document.getElementById('savings-percentage').textContent = `${portnoxSolution.savingsPercentage.toFixed(1)}% savings`;
    
    // Update the progress bar width
    const savingsProgressBar = document.querySelector('.progress');
    if (savingsProgressBar) {
      savingsProgressBar.style.width = `${Math.min(Math.max(portnoxSolution.savingsPercentage, 0), 100)}%`;
    }
    
    // Update annual cost reduction
    document.getElementById('annual-cost-reduction').textContent = `${formatCurrency(portnoxSolution.annualSavings)}/year`;
    document.getElementById('operating-reduction-percentage').textContent = 
      `${((portnoxSolution.annualSavings / currentSolution.annualCosts) * 100).toFixed(1)}% reduction`;
    
    // Update the progress bar width
    const operatingProgressBar = document.querySelector('.progress-bar .progress:nth-child(2)');
    if (operatingProgressBar) {
      operatingProgressBar.style.width = 
        `${Math.min(Math.max((portnoxSolution.annualSavings / currentSolution.annualCosts) * 100, 0), 100)}%`;
    }
    
    // Update benefits
    this.updateBenefits();
  }
}

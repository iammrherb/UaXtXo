/**
 * Comprehensive Tooltips System
 * Provides detailed explanations for all metrics and charts
 */

const TOOLTIPS = {
  // Metrics
  'tco': {
    title: 'Total Cost of Ownership (TCO)',
    content: 'TCO includes all direct and indirect costs associated with implementing and operating a NAC solution over a 3-year period. This includes hardware, software licenses, implementation services, maintenance, and personnel costs.',
    calculation: 'TCO = Hardware + Licenses + Implementation + Maintenance + (Personnel × 3 years)'
  },
  
  'roi': {
    title: 'Return on Investment (ROI)',
    content: 'ROI measures the financial return from NAC investment through cost savings, risk reduction, and operational efficiency gains.',
    calculation: 'ROI = ((Total Benefits - Total Costs) / Total Costs) × 100%'
  },
  
  'risk-score': {
    title: 'Security Risk Score',
    content: 'Composite score based on threat exposure, vulnerability assessment, and potential breach impact. Lower scores indicate better security posture.',
    calculation: 'Risk Score = (Threat Probability × Impact) × (1 - Mitigation Factor)'
  },
  
  'breach-cost': {
    title: 'Data Breach Cost',
    content: 'Estimated financial impact of a data breach based on industry averages, including investigation, remediation, legal fees, and reputation damage.',
    calculation: 'Breach Cost = (Records at Risk × Cost per Record) + Fixed Costs'
  },
  
  'fte': {
    title: 'Full-Time Equivalent (FTE)',
    content: 'Number of full-time employees required to manage and maintain the NAC solution.',
    calculation: 'FTE = Total Annual Hours Required / 2080 hours'
  },
  
  // Compliance
  'compliance-coverage': {
    title: 'Compliance Coverage',
    content: 'Percentage of regulatory requirements addressed by the NAC solution\'s security controls and features.',
    calculation: 'Coverage = (Controls Implemented / Total Required Controls) × 100%'
  },
  
  'cyber-insurance': {
    title: 'Cyber Insurance Premium',
    content: 'Annual cost of cyber liability insurance. NAC implementation typically reduces premiums by 40-70% due to improved security posture.',
    calculation: 'Premium = Base Rate × Risk Multiplier × Coverage Amount'
  },
  
  // Technical
  'zero-trust': {
    title: 'Zero Trust Architecture',
    content: 'Security model that requires continuous verification of all users and devices, regardless of location. "Never trust, always verify" principle.',
    benefits: ['Reduced attack surface', 'Granular access control', 'Continuous risk assessment']
  },
  
  'deployment-time': {
    title: 'Time to Deployment',
    content: 'Total time from purchase decision to full production deployment, including planning, implementation, and testing phases.',
    factors: ['Architecture complexity', 'Integration requirements', 'Organization size']
  }
};

class TooltipManager {
  constructor() {
    this.tooltipElement = null;
    this.init();
  }
  
  init() {
    // Create tooltip element
    this.tooltipElement = document.createElement('div');
    this.tooltipElement.className = 'advanced-tooltip';
    this.tooltipElement.style.display = 'none';
    document.body.appendChild(this.tooltipElement);
    
    // Add event listeners
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Add tooltips to elements with data-tooltip attribute
    document.addEventListener('mouseover', (e) => {
      const element = e.target.closest('[data-tooltip]');
      if (element) {
        const tooltipKey = element.getAttribute('data-tooltip');
        this.showTooltip(element, tooltipKey);
      }
    });
    
    document.addEventListener('mouseout', (e) => {
      const element = e.target.closest('[data-tooltip]');
      if (element) {
        this.hideTooltip();
      }
    });
  }
  
  showTooltip(element, key) {
    const tooltip = TOOLTIPS[key];
    if (!tooltip) return;
    
    let content = `<div class="tooltip-header">${tooltip.title}</div>`;
    content += `<div class="tooltip-content">${tooltip.content}</div>`;
    
    if (tooltip.calculation) {
      content += `<div class="tooltip-calculation">
        <strong>Calculation:</strong><br>
        ${tooltip.calculation}
      </div>`;
    }
    
    if (tooltip.benefits) {
      content += `<div class="tooltip-benefits">
        <strong>Benefits:</strong>
        <ul>${tooltip.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
      </div>`;
    }
    
    this.tooltipElement.innerHTML = content;
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();
    
    let top = rect.bottom + 10;
    let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
    
    // Adjust if tooltip goes off screen
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }
    
    this.tooltipElement.style.top = top + 'px';
    this.tooltipElement.style.left = left + 'px';
    this.tooltipElement.style.display = 'block';
  }
  
  hideTooltip() {
    this.tooltipElement.style.display = 'none';
  }
}

// Initialize tooltip manager
window.tooltipManager = new TooltipManager();

// Add tooltip styles
const tooltipStyles = `
<style>
.advanced-tooltip {
  position: fixed;
  background: rgba(0, 0, 0, 0.95);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  max-width: 400px;
  z-index: 10000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  font-size: 0.875rem;
  line-height: 1.5;
}

.tooltip-header {
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #3498db;
}

.tooltip-content {
  margin-bottom: 0.5rem;
}

.tooltip-calculation,
.tooltip-benefits {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.tooltip-benefits ul {
  margin: 0.25rem 0 0 1rem;
  padding: 0;
}

[data-tooltip] {
  cursor: help;
  position: relative;
}

[data-tooltip]::after {
  content: '?';
  position: absolute;
  top: -4px;
  right: -4px;
  width: 14px;
  height: 14px;
  background: #3498db;
  color: white;
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', tooltipStyles);

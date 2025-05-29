/**
 * Comprehensive Help Tooltips for All Charts
 */

class HelpTooltipSystem {
    constructor() {
        this.tooltips = {
            // Executive Overview Charts
            'tco-comparison-chart': {
                title: 'Total Cost of Ownership Comparison',
                content: `
                    <h4>What This Shows:</h4>
                    <p>3-year total cost of ownership for each vendor including all direct and indirect costs.</p>
                    
                    <h4>How It's Calculated:</h4>
                    <ul>
                        <li><strong>Licensing:</strong> Monthly per-device cost × devices × 36 months</li>
                        <li><strong>Implementation:</strong> One-time deployment and setup costs</li>
                        <li><strong>Operations:</strong> FTE requirements × annual salary × 3 years</li>
                        <li><strong>Infrastructure:</strong> Hardware, servers, and network equipment</li>
                        <li><strong>Support:</strong> Annual maintenance and support contracts</li>
                        <li><strong>Training:</strong> Initial and ongoing training expenses</li>
                    </ul>
                    
                    <h4>Why It Matters:</h4>
                    <p>TCO reveals the true cost beyond initial pricing, helping identify long-term value.</p>
                `
            },
            
            'roi-timeline-chart': {
                title: 'Return on Investment Timeline',
                content: `
                    <h4>What This Shows:</h4>
                    <p>ROI progression over 36 months, showing when each solution reaches break-even.</p>
                    
                    <h4>How It's Calculated:</h4>
                    <ul>
                        <li><strong>Initial Investment:</strong> Implementation + training + hardware</li>
                        <li><strong>Monthly Costs:</strong> Licensing + operational expenses</li>
                        <li><strong>Monthly Savings:</strong> Automation + efficiency + risk reduction</li>
                        <li><strong>ROI Formula:</strong> ((Savings - Costs) / Costs) × 100</li>
                    </ul>
                    
                    <h4>Key Insights:</h4>
                    <p>Earlier break-even = faster value realization. Steeper curves indicate better long-term returns.</p>
                `
            },
            
            'cost-breakdown-chart': {
                title: 'Cost Component Analysis',
                content: `
                    <h4>What This Shows:</h4>
                    <p>Breakdown of total costs by category to identify major expense drivers.</p>
                    
                    <h4>Components:</h4>
                    <ul>
                        <li><strong>Licensing (40-60%):</strong> Software subscription costs</li>
                        <li><strong>Operations (20-30%):</strong> Staff time and management</li>
                        <li><strong>Implementation (10-20%):</strong> Initial setup and deployment</li>
                        <li><strong>Infrastructure (5-15%):</strong> Hardware and hosting</li>
                        <li><strong>Other (5-10%):</strong> Training, support, maintenance</li>
                    </ul>
                    
                    <h4>Optimization Opportunities:</h4>
                    <p>Focus on reducing the largest cost components for maximum savings impact.</p>
                `
            },
            
            'payback-period-chart': {
                title: 'Investment Payback Analysis',
                content: `
                    <h4>What This Shows:</h4>
                    <p>Time required to recover initial investment through operational savings.</p>
                    
                    <h4>Calculation Method:</h4>
                    <ul>
                        <li><strong>Total Investment:</strong> All upfront and deployment costs</li>
                        <li><strong>Monthly Savings:</strong> Efficiency gains + risk reduction</li>
                        <li><strong>Payback Period:</strong> Investment ÷ Monthly Savings</li>
                    </ul>
                    
                    <h4>Decision Criteria:</h4>
                    <ul>
                        <li><strong>&lt; 6 months:</strong> Excellent - immediate value</li>
                        <li><strong>6-12 months:</strong> Good - reasonable return</li>
                        <li><strong>12-24 months:</strong> Average - standard IT investment</li>
                        <li><strong>&gt; 24 months:</strong> Consider alternatives</li>
                    </ul>
                `
            },
            
            'risk-matrix-chart': {
                title: 'Cybersecurity Risk Assessment Matrix',
                content: `
                    <h4>What This Shows:</h4>
                    <p>Comprehensive risk evaluation across multiple threat vectors and security domains.</p>
                    
                    <h4>Risk Factors Evaluated:</h4>
                    <ul>
                        <li><strong>Network Access:</strong> Unauthorized device/user access risks</li>
                        <li><strong>Data Breach:</strong> Sensitive information exposure probability</li>
                        <li><strong>Compliance:</strong> Regulatory violation and penalty risks</li>
                        <li><strong>Operational:</strong> Business disruption and downtime risks</li>
                        <li><strong>Insider Threat:</strong> Internal security breach probability</li>
                    </ul>
                    
                    <h4>Risk Reduction Calculation:</h4>
                    <p>Based on security features, automation level, and threat detection capabilities.</p>
                `
            },
            
            'compliance-matrix-chart': {
                title: 'Regulatory Compliance Coverage',
                content: `
                    <h4>What This Shows:</h4>
                    <p>Vendor compliance readiness across major regulatory frameworks.</p>
                    
                    <h4>Compliance Scoring:</h4>
                    <ul>
                        <li><strong>90-100%:</strong> Full compliance with automated reporting</li>
                        <li><strong>70-89%:</strong> Good coverage, minor gaps</li>
                        <li><strong>50-69%:</strong> Partial compliance, manual work needed</li>
                        <li><strong>&lt; 50%:</strong> Significant compliance gaps</li>
                    </ul>
                    
                    <h4>Key Frameworks:</h4>
                    <p>GDPR, HIPAA, PCI-DSS, SOX, ISO 27001, NIST, and industry-specific regulations.</p>
                `
            },
            
            'sensitivity-chart': {
                title: 'Cost Sensitivity Analysis',
                content: `
                    <h4>What This Shows:</h4>
                    <p>How TCO changes with variations in key parameters.</p>
                    
                    <h4>Variables Tested:</h4>
                    <ul>
                        <li><strong>Device Count:</strong> ±50% change impact</li>
                        <li><strong>FTE Costs:</strong> ±30% salary variation</li>
                        <li><strong>Implementation:</strong> ±20% project cost variance</li>
                    </ul>
                    
                    <h4>Interpretation:</h4>
                    <p>Flatter curves indicate more predictable costs. Steep curves show high sensitivity to changes.</p>
                `
            },
            
            'cashflow-chart': {
                title: 'Cumulative Cash Flow Analysis',
                content: `
                    <h4>What This Shows:</h4>
                    <p>Total cash outflow over time, including all costs and investments.</p>
                    
                    <h4>Components:</h4>
                    <ul>
                        <li><strong>Year 0:</strong> Initial capital expenditure</li>
                        <li><strong>Years 1-5:</strong> Operational expenses and licensing</li>
                        <li><strong>Curve Shape:</strong> Steeper = higher ongoing costs</li>
                    </ul>
                    
                    <h4>Financial Planning:</h4>
                    <p>Use for budget forecasting and cash flow management.</p>
                `
            }
        };
        
        this.initializeTooltips();
    }
    
    initializeTooltips() {
        // Add help icons to all charts
        setTimeout(() => {
            this.addHelpIcons();
        }, 1000);
        
        // Re-add icons when content changes
        const observer = new MutationObserver(() => {
            this.addHelpIcons();
        });
        
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            observer.observe(mainContent, { childList: true, subtree: true });
        }
    }
    
    addHelpIcons() {
        document.querySelectorAll('.chart-container').forEach(container => {
            const chartDiv = container.querySelector('[id$="-chart"]');
            if (!chartDiv || container.querySelector('.help-icon')) return;
            
            const header = container.querySelector('.chart-header');
            if (!header) return;
            
            const helpIcon = document.createElement('button');
            helpIcon.className = 'help-icon';
            helpIcon.innerHTML = '<i class="fas fa-question-circle"></i>';
            helpIcon.onclick = () => this.showTooltip(chartDiv.id);
            
            header.appendChild(helpIcon);
        });
    }
    
    showTooltip(chartId) {
        const tooltip = this.tooltips[chartId];
        if (!tooltip) return;
        
        // Remove existing tooltip
        const existing = document.querySelector('.help-tooltip-modal');
        if (existing) existing.remove();
        
        const modal = document.createElement('div');
        modal.className = 'help-tooltip-modal';
        modal.innerHTML = `
            <div class="help-tooltip-content">
                <div class="help-tooltip-header">
                    <h3>${tooltip.title}</h3>
                    <button class="close-help" onclick="this.closest('.help-tooltip-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="help-tooltip-body">
                    ${tooltip.content}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Initialize help system
window.helpTooltipSystem = new HelpTooltipSystem();
console.log("✅ Comprehensive help tooltips initialized");

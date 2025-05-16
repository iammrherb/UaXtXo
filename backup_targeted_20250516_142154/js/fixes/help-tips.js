// Enhanced Help Tips for Portnox TCO Analyzer
(function() {
    console.log('💡 Initializing enhanced help tips...');
    
    // Help tip configuration
    const helpTips = {
        // TCO Calculation Tips
        tco: {
            title: 'TCO Calculation Methodology',
            content: `
                <p>The Total Cost of Ownership (TCO) calculation includes all direct and indirect costs associated with deploying and maintaining a NAC solution over a three-year period:</p>
                <ul>
                    <li><strong>Hardware Costs:</strong> Servers, appliances, and infrastructure required for on-premises solutions (not applicable for cloud-native solutions)</li>
                    <li><strong>Software Licensing:</strong> Subscription fees for cloud solutions or perpetual license costs for on-premises solutions</li>
                    <li><strong>Implementation Costs:</strong> Professional services, installation, and integration with existing systems</li>
                    <li><strong>Maintenance Costs:</strong> Annual maintenance fees, hardware refreshes, and software updates (not applicable for fully-managed cloud solutions)</li>
                    <li><strong>Personnel Costs:</strong> IT staff time allocated to managing and maintaining the solution</li>
                    <li><strong>Training & Support:</strong> Staff training, ongoing support, and documentation</li>
                </ul>
                <p>All costs are projected over a three-year period, with initial capital expenditures amortized appropriately.</p>
            `
        },
        
        // ROI Calculation Tips
        roi: {
            title: 'ROI Calculation Methodology',
            content: `
                <p>Return on Investment (ROI) is calculated based on the total benefits (savings and value) provided by Portnox Cloud compared to alternative solutions, divided by the total investment in Portnox Cloud over three years:</p>
                <p><strong>ROI Formula:</strong> (Total Benefits - Total Investment) / Total Investment × 100%</p>
                <p>Total Benefits include:</p>
                <ul>
                    <li><strong>Direct Cost Savings:</strong> Hardware, licenses, and maintenance savings</li>
                    <li><strong>Operational Efficiencies:</strong> Reduced IT staff time and management overhead</li>
                    <li><strong>Risk Reduction Value:</strong> Decreased probability and impact of security incidents</li>
                    <li><strong>Compliance Automation:</strong> Streamlined audits and reporting</li>
                    <li><strong>Insurance Premium Reduction:</strong> Lower cybersecurity insurance costs due to improved security posture</li>
                </ul>
                <p>The payback period is calculated by determining when the cumulative benefits equal or exceed the initial investment.</p>
            `
        },
        
        // Implementation Time Tips
        implementation: {
            title: 'Implementation Time Comparison Methodology',
            content: `
                <p>Implementation time estimates are based on real-world deployments and industry benchmarks, considering the following factors:</p>
                <ul>
                    <li><strong>Architecture Complexity:</strong> Cloud-native solutions require no on-premises infrastructure, reducing deployment time</li>
                    <li><strong>Integration Requirements:</strong> Time required to integrate with existing systems and authenticate users</li>
                    <li><strong>Configuration Complexity:</strong> Effort required to define policies, network segments, and authentication methods</li>
                    <li><strong>Testing and Validation:</strong> Time required to test and validate the solution before full deployment</li>
                    <li><strong>Training and Knowledge Transfer:</strong> Time required to train IT staff on the new solution</li>
                </ul>
                <p>Portnox Cloud's implementation time advantage stems from its cloud-native architecture, pre-configured policies, and simplified deployment model.</p>
            `
        },
        
        // Security Posture Tips
        security: {
            title: 'Security Posture Improvement Methodology',
            content: `
                <p>Security posture improvement is calculated based on multiple factors that contribute to an organization's overall security stance:</p>
                <ul>
                    <li><strong>Zero Trust Capability:</strong> Ability to implement a zero trust security model with continuous verification</li>
                    <li><strong>Device Visibility:</strong> Percentage of devices that can be discovered and monitored</li>
                    <li><strong>Authentication Strength:</strong> Robustness of authentication methods and policies</li>
                    <li><strong>Continuous Monitoring:</strong> Ability to continuously monitor device posture and compliance</li>
                    <li><strong>Automated Remediation:</strong> Ability to automatically quarantine or remediate non-compliant devices</li>
                    <li><strong>Threat Intelligence Integration:</strong> Ability to leverage threat intelligence to enhance security decisions</li>
                </ul>
                <p>The security posture improvement is calculated as a percentage increase from a baseline with no NAC solution in place.</p>
            `
        },
        
        // Compliance Tips
        compliance: {
            title: 'Compliance Framework Coverage Methodology',
            content: `
                <p>Compliance framework coverage is assessed based on a solution's ability to address the specific requirements of each regulatory framework:</p>
                <ul>
                    <li><strong>PCI DSS:</strong> Requirements 1, 2, 6, 7, 8, 9, 10, 11, and 12 relating to network security, access control, and monitoring</li>
                    <li><strong>HIPAA:</strong> Technical safeguards for access control, authentication, integrity, and transmission security</li>
                    <li><strong>NIST 800-53:</strong> Access control, identification and authentication, system and communications protection</li>
                    <li><strong>GDPR:</strong> Technical measures for data protection, access control, and security of processing</li>
                    <li><strong>ISO 27001:</strong> Controls for access control, communications security, and compliance</li>
                </ul>
                <p>Coverage percentages represent the portion of framework requirements that can be addressed directly or indirectly by the NAC solution.</p>
            `
        },
        
        // Risk Reduction Tips
        risk: {
            title: 'Risk Reduction Methodology',
            content: `
                <p>Risk reduction is calculated based on the decreased likelihood and potential impact of security incidents after implementing a NAC solution:</p>
                <ul>
                    <li><strong>Unauthorized Access Prevention:</strong> Reduction in the probability of unauthorized network access</li>
                    <li><strong>Malicious Device Detection:</strong> Ability to identify and block compromised or malicious devices</li>
                    <li><strong>Lateral Movement Prevention:</strong> Ability to prevent attackers from moving laterally within the network</li>
                    <li><strong>Data Breach Prevention:</strong> Reduction in the probability of data breaches due to improved access controls</li>
                    <li><strong>Compliance Violation Prevention:</strong> Reduction in the probability of compliance violations</li>
                </ul>
                <p>Risk reduction values are based on industry benchmarks and real-world case studies of organizations that have implemented NAC solutions.</p>
            `
        },
        
        // Vendor Comparison Tips
        vendors: {
            title: 'Vendor Comparison Methodology',
            content: `
                <p>Vendor capabilities are assessed based on the following criteria:</p>
                <ul>
                    <li><strong>Cloud Architecture:</strong> Degree to which the solution is built for and delivered from the cloud</li>
                    <li><strong>Zero Trust:</strong> Alignment with zero trust principles and implementation capabilities</li>
                    <li><strong>Deployment Speed:</strong> Typical time required to deploy and operationalize the solution</li>
                    <li><strong>FTE Requirements:</strong> IT staff resources required to manage and maintain the solution</li>
                    <li><strong>Remote Access:</strong> Support for remote and mobile users outside the corporate network</li>
                    <li><strong>Hardware Footprint:</strong> On-premises infrastructure required to deploy the solution</li>
                    <li><strong>Automatic Updates:</strong> Ability to automatically update without IT intervention</li>
                    <li><strong>IoT Support:</strong> Capabilities for discovering and securing IoT devices</li>
                </ul>
                <p>Assessments are based on vendor documentation, independent research, and customer feedback.</p>
            `
        },
        
        // Device Count Tips
        devices: {
            title: 'Device Count Calculation',
            content: `
                <p>The device count should include all endpoints that will be authenticated and monitored by the NAC solution:</p>
                <ul>
                    <li><strong>Corporate Laptops and Desktops:</strong> All company-owned computers</li>
                    <li><strong>Mobile Devices:</strong> Smartphones and tablets that connect to the corporate network</li>
                    <li><strong>BYOD Devices:</strong> Personal devices used for work purposes</li>
                    <li><strong>IoT Devices:</strong> Internet of Things devices on your network (printers, cameras, etc.)</li>
                    <li><strong>Servers and Network Equipment:</strong> Physical and virtual servers, network switches, etc.</li>
                </ul>
                <p>The device count directly affects licensing costs for all NAC solutions and should be as accurate as possible.</p>
            `
        },
        
        // Cost Parameters Tips
        costs: {
            title: 'Cost Parameter Guidance',
            content: `
                <p>These parameters help customize the TCO and ROI calculations for your specific environment:</p>
                <ul>
                    <li><strong>Portnox Cost per Device:</strong> Monthly subscription cost per device for Portnox Cloud</li>
                    <li><strong>Volume Discount:</strong> Discount percentage based on the total number of devices</li>
                    <li><strong>Average FTE Cost:</strong> Annual fully-loaded cost of an IT staff member</li>
                    <li><strong>FTE Allocation:</strong> Percentage of an IT staff member's time dedicated to managing the NAC solution</li>
                    <li><strong>Annual Maintenance:</strong> Percentage of initial license cost for annual maintenance (on-premises solutions)</li>
                    <li><strong>Downtime Cost:</strong> Hourly cost of network downtime to your organization</li>
                    <li><strong>Risk Reduction:</strong> Estimated percentage reduction in breach costs with a NAC solution</li>
                    <li><strong>Insurance Reduction:</strong> Potential reduction in cybersecurity insurance premiums</li>
                </ul>
                <p>Adjusting these parameters will provide more accurate TCO and ROI calculations for your specific environment.</p>
            `
        }
    };
    
    // Initialize help tips
    function initHelpTips() {
        try {
            console.log('Initializing help tips...');
            
            // Add help icons to relevant elements
            addHelpIcon('tco-comparison-chart', 'tco', 'TCO Calculation');
            addHelpIcon('roi-chart', 'roi', 'ROI Calculation');
            addHelpIcon('implementation-time', 'implementation', 'Implementation Time');
            addHelpIcon('risk-reduction-total', 'risk', 'Risk Reduction');
            addHelpIcon('security-improvement', 'security', 'Security Posture');
            addHelpIcon('compliance-coverage', 'compliance', 'Compliance Coverage');
            addHelpIcon('vendor-radar-chart', 'vendors', 'Vendor Comparison');
            addHelpIcon('device-count', 'devices', 'Device Count');
            addHelpIcon('portnox-cost-value', 'costs', 'Cost Parameters');
            
            // Add event listener for help button
            const helpBtn = document.getElementById('help-btn');
            if (helpBtn) {
                helpBtn.addEventListener('click', function() {
                    showHelpModal('TCO Analyzer Help', `
                        <h3>About this Tool</h3>
                        <p>The Portnox Total Cost Analyzer helps you compare the total cost of ownership (TCO) and return on investment (ROI) for different Network Access Control (NAC) solutions.</p>
                        
                        <h3>How to Use</h3>
                        <ol>
                            <li><strong>Select vendors</strong> to compare with Portnox Cloud</li>
                            <li><strong>Choose your industry</strong> and compliance requirements</li>
                            <li><strong>Enter your organization details</strong> such as size and device count</li>
                            <li><strong>Adjust cost parameters</strong> if needed</li>
                            <li><strong>Click "Calculate TCO & ROI"</strong> to generate results</li>
                        </ol>
                        
                        <h3>Understanding Results</h3>
                        <p>Results are organized into different views for various stakeholders:</p>
                        <ul>
                            <li><strong>Executive View:</strong> High-level overview for decision makers</li>
                            <li><strong>Financial View:</strong> Detailed cost breakdown and ROI analysis</li>
                            <li><strong>Security View:</strong> Risk assessment and compliance coverage</li>
                            <li><strong>Technical View:</strong> Feature comparison and implementation details</li>
                        </ul>
                        
                        <h3>Getting Help</h3>
                        <p>Look for the <i class="fas fa-question-circle"></i> icons throughout the application for detailed explanations of specific calculations and methodologies.</p>
                    `);
                });
            }
            
            console.log('Help tips initialization complete');
        } catch (e) {
            console.error('Error initializing help tips:', e);
        }
    }
    
    // Add help icon to an element
    function addHelpIcon(elementId, tipKey, tipTitle) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        // Get the appropriate parent element
        let parentElement;
        
        if (element.tagName === 'CANVAS') {
            // For charts, add to the parent container
            parentElement = element.closest('.chart-container');
            if (parentElement) {
                const heading = parentElement.querySelector('h3');
                if (heading) {
                    parentElement = heading;
                }
            } else {
                parentElement = element.parentElement;
            }
        } else if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
            // For form controls, find the label
            const formGroup = element.closest('.form-group');
            if (formGroup) {
                const label = formGroup.querySelector('label');
                if (label) {
                    parentElement = label;
                } else {
                    parentElement = formGroup;
                }
            } else {
                const rangeSlider = element.closest('.range-slider');
                if (rangeSlider) {
                    const label = rangeSlider.querySelector('.range-slider-label');
                    if (label) {
                        parentElement = label;
                    } else {
                        parentElement = rangeSlider;
                    }
                } else {
                    parentElement = element.parentElement;
                }
            }
        } else {
            // For other elements, add after the element
            parentElement = element;
        }
        
        if (!parentElement) return;
        
        // Create the help icon
        const helpIcon = document.createElement('i');
        helpIcon.className = 'fas fa-question-circle help-icon';
        helpIcon.setAttribute('data-tip', tipKey);
        helpIcon.setAttribute('title', tipTitle);
        helpIcon.style.marginLeft = '5px';
        helpIcon.style.color = '#3498db';
        helpIcon.style.cursor = 'pointer';
        helpIcon.style.fontSize = '14px';
        
        // Add the help icon to the parent element
        if (parentElement.tagName === 'LABEL' || parentElement.tagName === 'H3') {
            parentElement.appendChild(document.createTextNode(' '));
            parentElement.appendChild(helpIcon);
        } else {
            helpIcon.style.position = 'absolute';
            helpIcon.style.right = '10px';
            helpIcon.style.top = '10px';
            
            if (parentElement.style.position !== 'absolute' && parentElement.style.position !== 'relative') {
                parentElement.style.position = 'relative';
            }
            
            parentElement.appendChild(helpIcon);
        }
        
        // Add event listener to show the help modal
        helpIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const tipKey = this.getAttribute('data-tip');
            const tip = helpTips[tipKey];
            
            if (tip) {
                showHelpModal(tip.title, tip.content);
            }
        });
    }
    
    // Show help modal
    function showHelpModal(title, content) {
        // Check if modal already exists
        let helpModal = document.getElementById('help-modal');
        
        if (!helpModal) {
            // Create modal element
            helpModal = document.createElement('div');
            helpModal.id = 'help-modal';
            helpModal.className = 'modal';
            helpModal.style.display = 'none';
            helpModal.style.position = 'fixed';
            helpModal.style.zIndex = '9999';
            helpModal.style.left = '0';
            helpModal.style.top = '0';
            helpModal.style.width = '100%';
            helpModal.style.height = '100%';
            helpModal.style.overflow = 'auto';
            helpModal.style.backgroundColor = 'rgba(0,0,0,0.4)';
            
            // Create modal content
            helpModal.innerHTML = `
                <div class="modal-content" style="background-color: #fefefe; margin: 10% auto; padding: 20px; border: 1px solid #888; border-radius: 8px; width: 80%; max-width: 700px; max-height: 80vh; overflow-y: auto;">
                    <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 15px;">
                        <h2 id="modal-title" style="margin: 0; font-size: 1.5rem; color: #1B67B2;"></h2>
                        <button class="modal-close" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; font-weight: bold;">&times;</button>
                    </div>
                    <div id="modal-body" class="modal-body" style="line-height: 1.6;"></div>
                </div>
            `;
            
            // Add to document body
            document.body.appendChild(helpModal);
            
            // Add event listener to close button
            const closeButton = helpModal.querySelector('.modal-close');
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    helpModal.style.display = 'none';
                });
            }
            
            // Close when clicking outside the modal
            helpModal.addEventListener('click', function(e) {
                if (e.target === helpModal) {
                    helpModal.style.display = 'none';
                }
            });
        }
        
        // Update modal content
        const modalTitle = helpModal.querySelector('#modal-title');
        const modalBody = helpModal.querySelector('#modal-body');
        
        if (modalTitle) modalTitle.textContent = title;
        if (modalBody) modalBody.innerHTML = content;
        
        // Show the modal
        helpModal.style.display = 'block';
    }
    
    // Initialize help tips when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Add small delay to ensure other components are initialized
        setTimeout(initHelpTips, 500);
    });
})();

/**
 * Comprehensive Feature Comparison Matrix
 * Shows all capabilities across all vendors
 */

class FeatureMatrix {
    constructor(platform) {
        this.platform = platform;
        this.vendorData = window.ComprehensiveVendorDatabase;
    }
    
    render(container) {
        const selectedVendors = this.platform.selectedVendors;
        
        container.innerHTML = `
            <div class="feature-matrix-view">
                <h1>Comprehensive Feature Comparison Matrix</h1>
                
                <!-- Feature Categories -->
                <div class="feature-categories">
                    <button class="category-btn active" data-category="all">All Features</button>
                    <button class="category-btn" data-category="deployment">Deployment & Architecture</button>
                    <button class="category-btn" data-category="security">Security Features</button>
                    <button class="category-btn" data-category="compliance">Compliance & Audit</button>
                    <button class="category-btn" data-category="operations">Operations & Management</button>
                    <button class="category-btn" data-category="integration">Integration & APIs</button>
                    <button class="category-btn" data-category="advanced">Advanced Capabilities</button>
                </div>
                
                <!-- Feature Matrix Table -->
                <div class="matrix-container">
                    ${this.renderFeatureTable(selectedVendors)}
                </div>
                
                <!-- Feature Scores Visualization -->
                <div class="feature-scores-section">
                    <h2>Feature Completeness Analysis</h2>
                    <div class="charts-grid">
                        <div class="chart-container">
                            <h3>Overall Feature Coverage</h3>
                            <canvas id="feature-coverage-chart" height="300"></canvas>
                        </div>
                        <div class="chart-container">
                            <h3>Category Breakdown</h3>
                            <canvas id="category-breakdown-chart" height="300"></canvas>
                        </div>
                    </div>
                </div>
                
                <!-- Unique Features -->
                <div class="unique-features-section">
                    <h2>Exclusive Portnox Capabilities</h2>
                    ${this.renderUniqueFeatures()}
                </div>
            </div>
        `;
        
        // Attach event listeners
        this.attachEventListeners();
        
        // Render charts
        setTimeout(() => {
            this.renderFeatureCharts(selectedVendors);
        }, 100);
    }
    
    renderFeatureTable(selectedVendors) {
        const features = this.getFeatureList();
        
        return `
            <table class="feature-matrix-table">
                <thead>
                    <tr>
                        <th class="feature-category-header">Category</th>
                        <th class="feature-name-header">Feature</th>
                        ${selectedVendors.map(vendorId => {
                            const vendor = this.vendorData[vendorId];
                            return `
                                <th class="vendor-header">
                                    <img src="${vendor.logo}" alt="${vendor.name}" class="vendor-logo-small">
                                    <span>${vendor.shortName}</span>
                                </th>
                            `;
                        }).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(features).map(([category, categoryFeatures]) => {
                        return categoryFeatures.map((feature, index) => `
                            <tr class="feature-row" data-category="${category}">
                                ${index === 0 ? `
                                    <td rowspan="${categoryFeatures.length}" class="category-cell">
                                        ${this.getCategoryName(category)}
                                    </td>
                                ` : ''}
                                <td class="feature-name">
                                    ${feature.name}
                                    ${feature.description ? `
                                        <i class="fas fa-info-circle" 
                                           data-tooltip="${feature.description}"></i>
                                    ` : ''}
                                </td>
                                ${selectedVendors.map(vendorId => {
                                    const support = this.getFeatureSupport(vendorId, feature.key);
                                    return `
                                        <td class="feature-support ${support.class}">
                                            ${support.display}
                                        </td>
                                    `;
                                }).join('')}
                            </tr>
                        `).join('');
                    }).join('')}
                </tbody>
                <tfoot>
                    <tr class="summary-row">
                        <td colspan="2" class="summary-label">Total Features Supported</td>
                        ${selectedVendors.map(vendorId => {
                            const score = this.calculateFeatureScore(vendorId);
                            return `
                                <td class="summary-score">
                                    <div class="score-value">${score.supported}/${score.total}</div>
                                    <div class="score-percent">${score.percentage}%</div>
                                </td>
                            `;
                        }).join('')}
                    </tr>
                </tfoot>
            </table>
        `;
    }
    
    getFeatureList() {
        return {
            deployment: [
                { key: 'cloudNative', name: 'Cloud-Native Architecture', description: '100% cloud-based, no on-premises infrastructure' },
                { key: 'deploymentTime', name: 'Deployment Time < 1 Day', description: 'Can be deployed in less than 24 hours' },
                { key: 'zeroInfrastructure', name: 'Zero Infrastructure Required', description: 'No hardware, appliances, or servers needed' },
                { key: 'autoScaling', name: 'Automatic Scaling', description: 'Scales automatically with demand' },
                { key: 'multiTenancy', name: 'Multi-Tenancy Support', description: 'True multi-tenant architecture' },
                { key: 'globalAvailability', name: 'Global Availability', description: 'Available in multiple regions worldwide' }
            ],
            security: [
                { key: 'zeroTrust', name: 'Native Zero Trust', description: 'Built from ground up with Zero Trust principles' },
                { key: 'continuousVerification', name: 'Continuous Verification', description: 'Never trust, always verify approach' },
                { key: 'aiThreatDetection', name: 'AI-Powered Threat Detection', description: 'Machine learning for threat detection' },
                { key: 'microsegmentation', name: 'Dynamic Microsegmentation', description: 'Granular network segmentation' },
                { key: 'riskBasedAccess', name: 'Risk-Based Access Control', description: 'Dynamic access based on risk score' },
                { key: 'automatedResponse', name: 'Automated Incident Response', description: 'Automatic remediation of threats' },
                { key: 'deviceTrust', name: 'Device Trust Assessment', description: 'Continuous device health monitoring' },
                { key: 'behavioralAnalytics', name: 'User Behavioral Analytics', description: 'Detect anomalous user behavior' }
            ],
            compliance: [
                { key: 'automatedCompliance', name: 'Automated Compliance', description: '95%+ automation of compliance tasks' },
                { key: 'realTimeReporting', name: 'Real-Time Compliance Reporting', description: 'Live compliance dashboards' },
                { key: 'auditTrail', name: 'Immutable Audit Trail', description: 'Complete, tamper-proof audit logs' },
                { key: 'evidenceCollection', name: 'Automated Evidence Collection', description: 'Automatic gathering of compliance evidence' },
                { key: 'multiFramework', name: 'Multi-Framework Support', description: 'Support for 10+ compliance frameworks' },
                { key: 'complianceWorkflows', name: 'Compliance Workflows', description: 'Built-in compliance automation workflows' }
            ],
            operations: [
                { key: 'selfService', name: 'Self-Service Portal', description: 'User and device self-service' },
                { key: 'zeroTouch', name: 'Zero-Touch Provisioning', description: 'Automatic device onboarding' },
                { key: 'automation95', name: '95%+ Process Automation', description: 'Near-complete automation' },
                { key: 'noPatching', name: 'No Patching Required', description: 'Automatic updates without downtime' },
                { key: 'minimalFTE', name: 'Minimal FTE Required', description: 'Less than 0.25 FTE needed' },
                { key: 'instantUpdates', name: 'Instant Policy Updates', description: 'Real-time policy propagation' }
            ],
            integration: [
                { key: 'restAPI', name: 'Modern REST API', description: 'Comprehensive RESTful API' },
                { key: 'webhooks', name: 'Webhooks Support', description: 'Real-time event notifications' },
                { key: 'preBuilt150', name: '150+ Pre-Built Integrations', description: 'Ready-to-use integrations' },
                { key: 'samlScim', name: 'SAML & SCIM Support', description: 'Standards-based identity integration' },
                { key: 'cloudIntegration', name: 'Cloud Platform Integration', description: 'AWS, Azure, GCP native integration' },
                { key: 'siemIntegration', name: 'SIEM/SOAR Integration', description: 'Security tool integration' }
            ],
            advanced: [
                { key: 'conditionalAccess', name: 'Conditional Access for Apps', description: 'Application-level access control' },
                { key: 'cloudPKI', name: 'Cloud PKI Services', description: 'Built-in certificate management' },
                { key: 'cloudRADIUS', name: 'Cloud RADIUS', description: 'Globally distributed RADIUS' },
                { key: 'tacacs', name: 'TACACS+ Support', description: 'Network device administration' },
                { key: 'guestAccess', name: 'Advanced Guest Access', description: 'Sophisticated guest management' },
                { key: 'byodManagement', name: 'BYOD Management', description: 'Bring your own device support' },
                { key: 'iotSecurity', name: 'IoT Device Security', description: 'IoT device discovery and control' },
                { key: 'containerSupport', name: 'Container/K8s Support', description: 'Container environment security' }
            ]
        };
    }
    
    getFeatureSupport(vendorId, featureKey) {
        // Feature support mapping
        const support = {
            portnox: {
                // Portnox supports all features
                default: true
            },
            cisco: {
                cloudNative: false,
                deploymentTime: false,
                zeroInfrastructure: false,
                autoScaling: false,
                zeroTrust: false,
                aiThreatDetection: false,
                automatedCompliance: false,
                automation95: false,
                conditionalAccess: false,
                cloudPKI: false,
                cloudRADIUS: false,
                default: 'partial'
            },
            aruba: {
                cloudNative: false,
                deploymentTime: false,
                zeroInfrastructure: false,
                zeroTrust: false,
                aiThreatDetection: false,
                automatedCompliance: false,
                automation95: false,
                conditionalAccess: false,
                cloudPKI: false,
                default: 'partial'
            },
            forescout: {
                cloudNative: false,
                deploymentTime: false,
                zeroInfrastructure: false,
                automation95: false,
                conditionalAccess: false,
                cloudPKI: false,
                cloudRADIUS: false,
                tacacs: false,
                default: 'partial'
            }
        };
        
        const vendorSupport = support[vendorId] || {};
        const hasFeature = vendorSupport[featureKey] !== undefined ? 
            vendorSupport[featureKey] : vendorSupport.default;
        
        if (hasFeature === true) {
            return { class: 'full-support', display: '<i class="fas fa-check-circle"></i> Full' };
        } else if (hasFeature === 'partial') {
            return { class: 'partial-support', display: '<i class="fas fa-adjust"></i> Partial' };
        } else {
            return { class: 'no-support', display: '<i class="fas fa-times-circle"></i> No' };
        }
    }
    
    calculateFeatureScore(vendorId) {
        const features = this.getFeatureList();
        let total = 0;
        let supported = 0;
        
        Object.values(features).forEach(categoryFeatures => {
            categoryFeatures.forEach(feature => {
                total++;
                const support = this.getFeatureSupport(vendorId, feature.key);
                if (support.class === 'full-support') {
                    supported++;
                } else if (support.class === 'partial-support') {
                    supported += 0.5;
                }
            });
        });
        
        return {
            total,
            supported: Math.round(supported),
            percentage: Math.round((supported / total) * 100)
        };
    }
    
    renderUniqueFeatures() {
        const uniqueFeatures = [
            {
                icon: 'fa-cloud',
                title: '100% Cloud-Native Architecture',
                description: 'Only NAC solution built from the ground up for the cloud. No legacy baggage, no compromises.',
                impact: 'Deploy in 4 hours instead of weeks'
            },
            {
                icon: 'fa-infinity',
                title: 'Unlimited Scalability',
                description: 'Scale from 50 to 500,000 devices with no infrastructure changes or performance impact.',
                impact: 'Future-proof your investment'
            },
            {
                icon: 'fa-shield-alt',
                title: 'Native Zero Trust',
                description: 'Zero Trust isn\'t an add-on or marketing term - it\'s our core architecture.',
                impact: '94% breach risk reduction'
            },
            {
                icon: 'fa-robot',
                title: '95% Process Automation',
                description: 'Near-complete automation of all NAC operations, from onboarding to compliance.',
                impact: 'Reduce IT workload by 90%'
            },
            {
                icon: 'fa-dollar-sign',
                title: 'All-Inclusive Pricing',
                description: 'Every feature included. No modules, no add-ons, no surprises.',
                impact: 'Predictable costs, maximum value'
            },
            {
                icon: 'fa-rocket',
                title: 'Continuous Innovation',
                description: 'New features every month, automatically available to all customers.',
                impact: 'Always stay ahead of threats'
            }
        ];
        
        return `
            <div class="unique-features-grid">
                ${uniqueFeatures.map(feature => `
                    <div class="unique-feature-card">
                        <div class="feature-icon">
                            <i class="fas ${feature.icon}"></i>
                        </div>
                        <h3>${feature.title}</h3>
                        <p>${feature.description}</p>
                        <div class="feature-impact">
                            <strong>Business Impact:</strong> ${feature.impact}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    getCategoryName(category) {
        const names = {
            deployment: 'Deployment & Architecture',
            security: 'Security Features',
            compliance: 'Compliance & Audit',
            operations: 'Operations & Management',
            integration: 'Integration & APIs',
            advanced: 'Advanced Capabilities'
        };
        return names[category] || category;
    }
    
    attachEventListeners() {
        // Category filters
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                const category = e.target.dataset.category;
                this.filterFeatures(category);
            });
        });
    }
    
    filterFeatures(category) {
        const rows = document.querySelectorAll('.feature-row');
        rows.forEach(row => {
            if (category === 'all' || row.dataset.category === category) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    renderFeatureCharts(selectedVendors) {
        // Overall Coverage Chart
        const coverageCtx = document.getElementById('feature-coverage-chart');
        if (coverageCtx) {
            const data = selectedVendors.map(vendorId => {
                const vendor = this.vendorData[vendorId];
                const score = this.calculateFeatureScore(vendorId);
                return {
                    vendor: vendor.shortName,
                    score: score.percentage,
                    color: vendorId === 'portnox' ? '#00D4AA' : '#94A3B8'
                };
            });
            
            ChartManager.createChart(coverageCtx, {
                type: 'bar',
                data: {
                    labels: data.map(d => d.vendor),
                    datasets: [{
                        label: 'Feature Coverage %',
                        data: data.map(d => d.score),
                        backgroundColor: data.map(d => d.color)
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: value => value + '%'
                            }
                        }
                    },
                    plugins: {
                        datalabels: {
                            anchor: 'end',
                            align: 'top',
                            formatter: value => value + '%'
                        }
                    }
                }
            });
        }
        
        // Category Breakdown Chart
        const categoryCtx = document.getElementById('category-breakdown-chart');
        if (categoryCtx) {
            const categories = Object.keys(this.getFeatureList());
            const datasets = selectedVendors.map(vendorId => {
                const vendor = this.vendorData[vendorId];
                const scores = categories.map(cat => {
                    return this.calculateCategoryScore(vendorId, cat);
                });
                
                return {
                    label: vendor.shortName,
                    data: scores,
                    backgroundColor: vendorId === 'portnox' ? 'rgba(0, 212, 170, 0.8)' : undefined,
                    borderColor: vendorId === 'portnox' ? '#00D4AA' : undefined,
                    borderWidth: vendorId === 'portnox' ? 2 : 1
                };
            });
            
            ChartManager.createChart(categoryCtx, {
                type: 'radar',
                data: {
                    labels: categories.map(c => this.getCategoryName(c)),
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                stepSize: 20
                            }
                        }
                    }
                }
            });
        }
    }
    
    calculateCategoryScore(vendorId, category) {
        const features = this.getFeatureList()[category] || [];
        let total = features.length;
        let supported = 0;
        
        features.forEach(feature => {
            const support = this.getFeatureSupport(vendorId, feature.key);
            if (support.class === 'full-support') {
                supported++;
            } else if (support.class === 'partial-support') {
                supported += 0.5;
            }
        });
        
        return Math.round((supported / total) * 100);
    }
}

window.FeatureMatrix = FeatureMatrix;
console.log('✅ Feature Matrix loaded');

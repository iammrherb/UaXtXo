/**
 * Enhanced Compliance Matrix showing how Portnox addresses specific controls
 */

class EnhancedComplianceMatrix {
    constructor() {
        this.frameworks = {
            'gdpr': {
                name: 'GDPR',
                controls: {
                    'access_control': {
                        requirement: 'Limit access to personal data (Art. 32)',
                        portnoxSolution: 'Zero Trust NAC with granular policy enforcement, role-based access, and continuous authentication',
                        coverage: 95
                    },
                    'data_protection': {
                        requirement: 'Encryption of personal data (Art. 32)',
                        portnoxSolution: '802.1X with EAP-TLS, certificate-based authentication, and encrypted communications',
                        coverage: 90
                    },
                    'audit_logs': {
                        requirement: 'Processing activity records (Art. 30)',
                        portnoxSolution: 'Comprehensive audit logging, real-time monitoring, and automated compliance reporting',
                        coverage: 98
                    },
                    'breach_detection': {
                        requirement: '72-hour breach notification (Art. 33)',
                        portnoxSolution: 'Real-time threat detection, automated incident response, and instant alerting',
                        coverage: 92
                    },
                    'privacy_by_design': {
                        requirement: 'Privacy by design and default (Art. 25)',
                        portnoxSolution: 'Default-deny policies, least privilege access, and automated data minimization',
                        coverage: 88
                    }
                }
            },
            'hipaa': {
                name: 'HIPAA',
                controls: {
                    'access_control': {
                        requirement: 'Access Control (§164.312(a)(1))',
                        portnoxSolution: 'Unique user identification, automatic logoff, encryption/decryption management',
                        coverage: 96
                    },
                    'audit_controls': {
                        requirement: 'Audit Controls (§164.312(b))',
                        portnoxSolution: 'Hardware/software audit mechanisms, continuous monitoring, log analysis',
                        coverage: 94
                    },
                    'integrity': {
                        requirement: 'Integrity Controls (§164.312(c)(1))',
                        portnoxSolution: 'Network segmentation, secure communications, ePHI protection mechanisms',
                        coverage: 91
                    },
                    'transmission_security': {
                        requirement: 'Transmission Security (§164.312(e)(1))',
                        portnoxSolution: 'End-to-end encryption, secure VPN access, protected wireless communications',
                        coverage: 93
                    },
                    'device_control': {
                        requirement: 'Device and Media Controls (§164.310(d)(1))',
                        portnoxSolution: 'Device inventory, access tracking, media sanitization policies',
                        coverage: 89
                    }
                }
            },
            'pci_dss': {
                name: 'PCI DSS',
                controls: {
                    'network_segmentation': {
                        requirement: 'Network Segmentation (Req. 1.3)',
                        portnoxSolution: 'Dynamic VLAN assignment, microsegmentation, CDE isolation',
                        coverage: 97
                    },
                    'access_control': {
                        requirement: 'Restrict Access (Req. 7-8)',
                        portnoxSolution: 'Role-based access, unique IDs, multi-factor authentication',
                        coverage: 95
                    },
                    'monitoring': {
                        requirement: 'Track and Monitor (Req. 10)',
                        portnoxSolution: 'Comprehensive logging, real-time alerts, automated log review',
                        coverage: 94
                    },
                    'vulnerability_mgmt': {
                        requirement: 'Vulnerability Management (Req. 5-6)',
                        portnoxSolution: 'Continuous device profiling, patch status verification, malware detection',
                        coverage: 88
                    },
                    'physical_security': {
                        requirement: 'Physical Security (Req. 9)',
                        portnoxSolution: 'Device location tracking, visitor network isolation, badge system integration',
                        coverage: 85
                    }
                }
            },
            'iso27001': {
                name: 'ISO 27001',
                controls: {
                    'access_management': {
                        requirement: 'Access Management (A.9)',
                        portnoxSolution: 'Identity lifecycle management, privileged access control, password policies',
                        coverage: 93
                    },
                    'operations_security': {
                        requirement: 'Operations Security (A.12)',
                        portnoxSolution: 'Change management, capacity monitoring, malware protection',
                        coverage: 90
                    },
                    'communications': {
                        requirement: 'Communications Security (A.13)',
                        portnoxSolution: 'Network segmentation, secure data transfer, information flow policies',
                        coverage: 92
                    },
                    'incident_management': {
                        requirement: 'Incident Management (A.16)',
                        portnoxSolution: 'Automated response, incident tracking, lessons learned integration',
                        coverage: 91
                    },
                    'compliance': {
                        requirement: 'Compliance (A.18)',
                        portnoxSolution: 'Policy enforcement, compliance dashboards, automated audits',
                        coverage: 94
                    }
                }
            },
            'nist': {
                name: 'NIST CSF',
                controls: {
                    'identify': {
                        requirement: 'Identify (ID)',
                        portnoxSolution: 'Asset discovery, risk assessment, governance policies',
                        coverage: 92
                    },
                    'protect': {
                        requirement: 'Protect (PR)',
                        portnoxSolution: 'Access control, data security, protective technology deployment',
                        coverage: 95
                    },
                    'detect': {
                        requirement: 'Detect (DE)',
                        portnoxSolution: 'Anomaly detection, continuous monitoring, security event analysis',
                        coverage: 93
                    },
                    'respond': {
                        requirement: 'Respond (RS)',
                        portnoxSolution: 'Automated response, containment, mitigation actions',
                        coverage: 91
                    },
                    'recover': {
                        requirement: 'Recover (RC)',
                        portnoxSolution: 'Recovery planning, improvements, communications',
                        coverage: 88
                    }
                }
            },
            'sox': {
                name: 'SOX',
                controls: {
                    'access_controls': {
                        requirement: 'IT General Controls - Access',
                        portnoxSolution: 'Segregation of duties, access reviews, privileged user monitoring',
                        coverage: 94
                    },
                    'change_management': {
                        requirement: 'Change Management Controls',
                        portnoxSolution: 'Configuration tracking, change authorization, deployment controls',
                        coverage: 90
                    },
                    'security_monitoring': {
                        requirement: 'Security Monitoring',
                        portnoxSolution: 'Continuous monitoring, log retention, audit trail integrity',
                        coverage: 93
                    },
                    'data_integrity': {
                        requirement: 'Data Integrity Controls',
                        portnoxSolution: 'Input validation, processing controls, output verification',
                        coverage: 89
                    }
                }
            }
        };
    }
    
    render(container) {
        const selectedFramework = document.getElementById('compliance-framework-select')?.value || 'gdpr';
        const framework = this.frameworks[selectedFramework];
        
        if (!framework) return;
        
        container.innerHTML = `
            <div class="compliance-matrix-enhanced">
                <div class="matrix-header">
                    <h3>${framework.name} Compliance Matrix - Portnox Control Coverage</h3>
                    <select id="compliance-framework-select" onchange="enhancedComplianceMatrix.updateFramework(this.value)">
                        ${Object.entries(this.frameworks).map(([key, fw]) => `
                            <option value="${key}" ${key === selectedFramework ? 'selected' : ''}>${fw.name}</option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="controls-grid">
                    ${Object.entries(framework.controls).map(([key, control]) => `
                        <div class="control-card">
                            <div class="control-header">
                                <h4>${control.requirement}</h4>
                                <div class="coverage-indicator">
                                    <div class="coverage-bar" style="width: ${control.coverage}%"></div>
                                    <span class="coverage-text">${control.coverage}%</span>
                                </div>
                            </div>
                            <div class="control-solution">
                                <h5>How Portnox Addresses This:</h5>
                                <p>${control.portnoxSolution}</p>
                            </div>
                            <div class="control-features">
                                <h5>Key Features:</h5>
                                <ul>
                                    ${this.getFeatures(key).map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="compliance-summary">
                    <h4>Overall ${framework.name} Compliance Score</h4>
                    <div class="overall-score">
                        <div class="score-circle">
                            <span class="score-value">${this.calculateOverallScore(framework)}%</span>
                        </div>
                        <div class="score-details">
                            <p><strong>Gap Analysis:</strong> Portnox addresses ${Object.keys(framework.controls).length} critical ${framework.name} controls with an average coverage of ${this.calculateOverallScore(framework)}%.</p>
                            <p><strong>Recommendation:</strong> Portnox provides comprehensive ${framework.name} compliance capabilities, significantly reducing audit preparation time and compliance risk.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    getFeatures(controlKey) {
        const features = {
            'access_control': ['802.1X authentication', 'RADIUS integration', 'SAML/OAuth support', 'Conditional access'],
            'data_protection': ['TLS encryption', 'Certificate management', 'Secure protocols', 'Key management'],
            'audit_logs': ['Centralized logging', 'Log retention policies', 'Real-time alerts', 'Compliance reports'],
            'breach_detection': ['Anomaly detection', 'Threat intelligence', 'Automated response', 'Incident workflows'],
            'network_segmentation': ['Dynamic VLANs', 'Microsegmentation', 'Policy enforcement', 'Isolation rules'],
            'monitoring': ['24/7 monitoring', 'Dashboard analytics', 'Custom alerts', 'Trend analysis']
        };
        
        return features[controlKey] || ['Policy enforcement', 'Automated controls', 'Compliance tracking'];
    }
    
    calculateOverallScore(framework) {
        const scores = Object.values(framework.controls).map(c => c.coverage);
        return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    }
    
    updateFramework(framework) {
        const container = document.querySelector('.compliance-matrix-enhanced')?.parentElement;
        if (container) {
            this.render(container);
        }
    }
}

window.enhancedComplianceMatrix = new EnhancedComplianceMatrix();
console.log("✅ Enhanced compliance matrix initialized");

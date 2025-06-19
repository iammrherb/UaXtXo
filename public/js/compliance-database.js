// Compliance Database Module
(function() {
    'use strict';
    
    class ComplianceDatabase {
        constructor() {
            this.frameworks = new Map();
            this.controls = new Map();
            this.mappings = new Map();
            this.initialized = false;
            
            this.initializeComplianceData();
        }
        
        initialize() {
            console.log('[ComplianceDatabase] Initializing...');
            return Promise.resolve();
        }
        
        initializeComplianceData() {
            // NIST Cybersecurity Framework
            this.addFramework('nist', {
                name: 'NIST Cybersecurity Framework',
                version: '2.0',
                description: 'Framework for improving critical infrastructure cybersecurity',
                categories: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'],
                nac_controls: [
                    {
                        id: 'PR.AC-1',
                        title: 'Identities and credentials are issued, managed, verified, revoked, and audited',
                        category: 'Protect',
                        portnox_capability: 'Complete automated lifecycle management with real-time updates',
                        implementation: 'Automatic'
                    },
                    {
                        id: 'PR.AC-3',
                        title: 'Remote access is managed',
                        category: 'Protect',
                        portnox_capability: 'Cloud-native secure remote access with Zero Trust',
                        implementation: 'Automatic'
                    },
                    {
                        id: 'PR.AC-4',
                        title: 'Access permissions and authorizations are managed',
                        category: 'Protect',
                        portnox_capability: 'Dynamic policy-based access control with continuous verification',
                        implementation: 'Automatic'
                    },
                    {
                        id: 'PR.AC-5',
                        title: 'Network integrity is protected',
                        category: 'Protect',
                        portnox_capability: 'Network segmentation and isolation policies',
                        implementation: 'Automatic'
                    },
                    {
                        id: 'DE.CM-7',
                        title: 'Monitoring for unauthorized personnel, connections, devices, and software',
                        category: 'Detect',
                        portnox_capability: 'Real-time continuous monitoring with AI-powered detection',
                        implementation: 'Automatic'
                    },
                    {
                        id: 'RS.AN-1',
                        title: 'Notifications from detection systems are investigated',
                        category: 'Respond',
                        portnox_capability: 'Automated incident response and remediation',
                        implementation: 'Automatic'
                    }
                ]
            });
            
            // ISO 27001:2022
            this.addFramework('iso27001', {
                name: 'ISO 27001:2022',
                version: '2022',
                description: 'International standard for information security management',
                categories: ['Organizational', 'People', 'Physical', 'Technological'],
                nac_controls: [
                    {
                        id: 'A.8.1.3',
                        title: 'Acceptable use of assets',
                        category: 'Technological',
                        portnox_capability: 'Device compliance enforcement with automated policies',
                        implementation: 'Automatic'
                    },
                    {
                        id: 'A.8.3',
                        title: 'Information access restriction',
                        category: 'Technological',
                        portnox_capability: 'Granular access policies based on user, device, and context',
                        implementation: 'Automatic'
                    },
                    {
                        id: 'A.9.1.2',
                        title: 'Access to networks and network services',
                        category: 'Technological',
                        portnox_capability: 'Zero Trust network access with continuous authentication',
                        implementation: 'Automatic'
                    },
                    {
                        id: 'A.9.2.1',
                        title: 'User registration and de-registration',
                        category: 'Technological',
                        portnox_capability: 'Automated user lifecycle management',
                        implementation: 'Automatic'
                    },
                    {
                        id: 'A.12.4.1',
                        title: 'Event logging',
                        category: 'Technological',
                        portnox_capability: 'Comprehensive audit logging with tamper protection',
                        implementation: 'Automatic'
                    }
                ]
            });
            
            // SOC 2 Type II
            this.addFramework('soc2', {
                name: 'SOC 2 Type II',
                version: '2017',
                description: 'Trust services criteria for service organizations',
                categories: ['Security', 'Availability', 'Processing Integrity', 'Confidentiality', 'Privacy'],
                trust_principles: [
                    {
                        principle: 'Security',
                        id: 'CC6.1',
                        title: 'Logical and physical access controls',
                        portnox_capability: 'Continuous security assessment and access control',
                        implementation: 'Automatic'
                    },
                    {
                        principle: 'Security',
                        id: 'CC6.6',
                        title: 'Network security controls',
                        portnox_capability: 'Zero Trust network segmentation and monitoring',
                        implementation: 'Automatic'
                    },
                    {
                        principle: 'Availability',
                        id: 'A1.1',
                        title: 'Capacity and performance management',
                        portnox_capability: '99.99% uptime SLA with global redundancy',
                        implementation: 'Built-in'
                    },
                    {
                        principle: 'Confidentiality',
                        id: 'C1.1',
                        title: 'Protection of confidential information',
                        portnox_capability: 'Encryption in transit and at rest with key management',
                        implementation: 'Automatic'
                    }
                ]
            });
            
            // HIPAA Security Rule
            this.addFramework('hipaa', {
                name: 'HIPAA Security Rule',
                version: '2013',
                description: 'Standards for protecting electronic PHI',
                categories: ['Administrative', 'Physical', 'Technical'],
                safeguards: [
                    {
                        type: 'Technical',
                        id: '164.312(a)',
                        title: 'Access Control',
                        portnox_capability: 'Role-based access with audit trails and unique user identification',
                        implementation: 'Automatic',
                        required: true
                    },
                    {
                        type: 'Technical',
                        id: '164.312(b)',
                        title: 'Audit Controls',
                        portnox_capability: 'Comprehensive logging and reporting with 7-year retention',
                        implementation: 'Automatic',
                        required: true
                    },
                    {
                        type: 'Technical',
                        id: '164.312(c)',
                        title: 'Integrity Controls',
                        portnox_capability: 'Data integrity verification and tamper detection',
                        implementation: 'Automatic',
                        required: true
                    },
                    {
                        type: 'Technical',
                        id: '164.312(d)',
                        title: 'Transmission Security',
                        portnox_capability: 'End-to-end encryption for all PHI transmission',
                        implementation: 'Automatic',
                        required: true
                    },
                    {
                        type: 'Administrative',
                        id: '164.308(a)(5)',
                        title: 'Security Awareness Training',
                        portnox_capability: 'Security training tracking and compliance monitoring',
                        implementation: 'Supported',
                        required: true
                    }
                ]
            });
            
            // PCI DSS 4.0
            this.addFramework('pci_dss', {
                name: 'PCI DSS',
                version: '4.0',
                description: 'Payment Card Industry Data Security Standard',
                categories: ['Network Security', 'Access Control', 'Monitoring', 'Testing'],
                requirements: [
                    {
                        id: '1.2',
                        title: 'Network segmentation controls',
                        category: 'Network Security',
                        portnox_capability: 'Dynamic VLAN assignment and microsegmentation',
                        implementation: 'Automatic',
                        priority: 'Critical'
                    },
                    {
                        id: '2.2',
                        title: 'Configuration standards',
                        category: 'Network Security',
                        portnox_capability: 'Automated configuration compliance checking',
                        implementation: 'Automatic',
                        priority: 'High'
                    },
                    {
                        id: '7.1',
                        title: 'Restrict access to cardholder data',
                        category: 'Access Control',
                        portnox_capability: 'Need-to-know access policies with dynamic enforcement',
                        implementation: 'Automatic',
                        priority: 'Critical'
                    },
                    {
                        id: '8.2',
                        title: 'User authentication',
                        category: 'Access Control',
                        portnox_capability: 'Multi-factor authentication with adaptive policies',
                        implementation: 'Automatic',
                        priority: 'Critical'
                    },
                    {
                        id: '10.1',
                        title: 'Audit trails',
                        category: 'Monitoring',
                        portnox_capability: 'Immutable audit logs with real-time monitoring',
                        implementation: 'Automatic',
                        priority: 'Critical'
                    }
                ]
            });
            
            // GDPR
            this.addFramework('gdpr', {
                name: 'GDPR',
                version: '2016/679',
                description: 'General Data Protection Regulation',
                categories: ['Lawfulness', 'Rights', 'Security', 'Accountability'],
                articles: [
                    {
                        article: '25',
                        title: 'Data protection by design and by default',
                        category: 'Security',
                        portnox_capability: 'Privacy-first architecture with data minimization',
                        implementation: 'Built-in'
                    },
                    {
                        article: '32',
                        title: 'Security of processing',
                        category: 'Security',
                        portnox_capability: 'Encryption, access controls, and resilience measures',
                        implementation: 'Automatic'
                    },
                    {
                        article: '33',
                        title: 'Breach notification',
                        category: 'Security',
                        portnox_capability: 'Automated breach detection and notification workflows',
                        implementation: 'Automatic'
                    },
                    {
                        article: '35',
                        title: 'Data protection impact assessment',
                        category: 'Accountability',
                        portnox_capability: 'DPIA templates and automated risk assessment',
                        implementation: 'Supported'
                    }
                ]
            });
            
            this.createComplianceMappings();
            console.log('[ComplianceDatabase] ✓ Compliance data initialized');
        }
        
        addFramework(id, data) {
            this.frameworks.set(id, {
                id,
                ...data,
                addedAt: Date.now()
            });
            
            // Index controls
            const controls = data.nac_controls || data.trust_principles || 
                           data.safeguards || data.requirements || data.articles || [];
            
            controls.forEach(control => {
                const controlId = `${id}:${control.id || control.article || control.principle}`;
                this.controls.set(controlId, {
                    ...control,
                    framework: id,
                    frameworkName: data.name
                });
            });
        }
        
        createComplianceMappings() {
            // Cross-framework mappings
            this.mappings.set('access-control', [
                'nist:PR.AC-1',
                'iso27001:A.9.1.2',
                'soc2:CC6.1',
                'hipaa:164.312(a)',
                'pci_dss:7.1',
                'gdpr:32'
            ]);
            
            this.mappings.set('audit-logging', [
                'nist:DE.CM-7',
                'iso27001:A.12.4.1',
                'soc2:CC6.1',
                'hipaa:164.312(b)',
                'pci_dss:10.1',
                'gdpr:32'
            ]);
            
            this.mappings.set('network-security', [
                'nist:PR.AC-5',
                'iso27001:A.9.1.2',
                'soc2:CC6.6',
                'hipaa:164.312(c)',
                'pci_dss:1.2',
                'gdpr:32'
            ]);
        }
        
        getFramework(id) {
            return this.frameworks.get(id);
        }
        
        getAllFrameworks() {
            return Array.from(this.frameworks.values());
        }
        
        getControl(controlId) {
            return this.controls.get(controlId);
        }
        
        getControlsByFramework(frameworkId) {
            const framework = this.getFramework(frameworkId);
            if (!framework) return [];
            
            return Array.from(this.controls.values())
                .filter(control => control.framework === frameworkId);
        }
        
        getComplianceMapping(capability) {
            return this.mappings.get(capability) || [];
        }
        
        generateComplianceReport(frameworkIds = []) {
            const report = {
                summary: {
                    totalControls: 0,
                    implementedControls: 0,
                    automaticControls: 0,
                    coverage: 0
                },
                frameworks: {},
                recommendations: []
            };
            
            const targetFrameworks = frameworkIds.length > 0 
                ? frameworkIds 
                : Array.from(this.frameworks.keys());
            
            targetFrameworks.forEach(frameworkId => {
                const framework = this.getFramework(frameworkId);
                const controls = this.getControlsByFramework(frameworkId);
                
                const implemented = controls.filter(c => 
                    c.implementation === 'Automatic' || c.implementation === 'Built-in'
                ).length;
                
                const automatic = controls.filter(c => 
                    c.implementation === 'Automatic'
                ).length;
                
                report.frameworks[frameworkId] = {
                    name: framework.name,
                    totalControls: controls.length,
                    implementedControls: implemented,
                    automaticControls: automatic,
                    coverage: (implemented / controls.length * 100).toFixed(1) + '%',
                    controls: controls
                };
                
                report.summary.totalControls += controls.length;
                report.summary.implementedControls += implemented;
                report.summary.automaticControls += automatic;
            });
            
            report.summary.coverage = 
                (report.summary.implementedControls / report.summary.totalControls * 100).toFixed(1) + '%';
            
            // Generate recommendations
            if (report.summary.coverage < 100) {
                report.recommendations.push({
                    priority: 'high',
                    title: 'Complete automation coverage',
                    description: 'Portnox can automatically implement remaining controls'
                });
            }
            
            return report;
        }
        
        checkCompliance(frameworkId, requirements) {
            const framework = this.getFramework(frameworkId);
            if (!framework) return null;
            
            const controls = this.getControlsByFramework(frameworkId);
            const results = {
                framework: framework.name,
                compliant: true,
                coverage: 0,
                gaps: [],
                strengths: []
            };
            
            controls.forEach(control => {
                const implemented = control.implementation === 'Automatic' || 
                                  control.implementation === 'Built-in';
                
                if (implemented) {
                    results.strengths.push({
                        control: control.id || control.title,
                        description: control.portnox_capability
                    });
                } else {
                    results.compliant = false;
                    results.gaps.push({
                        control: control.id || control.title,
                        description: control.title,
                        remediation: 'Enable Portnox feature'
                    });
                }
            });
            
            results.coverage = (results.strengths.length / controls.length * 100).toFixed(1);
            
            return results;
        }
    }
    
    // Create instance and register
    const complianceDatabase = new ComplianceDatabase();
    
    if (window.ModuleLoader && window.ModuleLoader.register) {
        window.ModuleLoader.register('ComplianceDatabase', complianceDatabase);
        console.log('[ComplianceDatabase] ✓ Registered with ModuleLoader');
    }
    
    window.ComplianceDatabase = complianceDatabase;
})();

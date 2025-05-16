#!/bin/bash

# Targeted Fix Script for Portnox TCO Analyzer
# Addresses vendor data loading, logo display, and sidebar layout issues

echo "==============================================="
echo "🔧 Portnox TCO Analyzer Targeted Fix Script"
echo "==============================================="

# Define application directory - update this to your actual path
APP_DIR="."

# Ensure we're in the right directory
if [ ! -f "$APP_DIR/index.html" ]; then
    echo "❌ Error: index.html not found. Make sure you're running this script from the application root directory."
    exit 1
fi

# Create backup directory
BACKUP_DIR="$APP_DIR/backup_targeted_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📦 Created backup directory: $BACKUP_DIR"

# Backup critical files
echo "💾 Backing up critical files..."
cp -r "$APP_DIR/css" "$BACKUP_DIR/"
cp -r "$APP_DIR/js" "$BACKUP_DIR/"
cp "$APP_DIR/index.html" "$BACKUP_DIR/"

# 1. Fix vendor data loading issue (syntax error)
echo "🛠️ Fixing vendor data loading issue..."
cat > "$APP_DIR/js/fixes/vendor-data-fix.js" << 'EOL'
// Fixed Vendor Data Module for Portnox TCO Analyzer
(function() {
    console.log('📋 Initializing vendor data module (fixed)...');
    
    // Vendor data configuration
    const vendorData = {
        portnox: {
            name: 'Portnox Cloud',
            type: 'Cloud-native NAC',
            deploymentModel: 'SaaS',
            description: 'Cloud-native NAC solution with zero infrastructure requirements and continuous compliance monitoring.',
            threeYearTCO: 202500,
            implementationTime: 21, // days
            riskReduction: 58, // percentage
            zeroTrustScore: 92, // percentage
            cloudArchitecture: 'Native',
            fteRequirement: 0.25, // FTE count
            advantages: [
                'Cloud-native architecture eliminates hardware costs and complexity',
                'Fully managed service reduces IT staff burden',
                'Built for Zero Trust security from the ground up',
                'Continuous compliance monitoring and automated remediation',
                'Seamless remote access support for distributed workforce',
                'Automatic updates and maintenance',
                'Global scalability with no infrastructure limits',
                'Rapid deployment with minimal expertise required',
                'Subscription model provides predictable costs',
                'Comprehensive API integration capabilities'
            ],
            features: {
                easeOfDeployment: 95,
                cloudIntegration: 98,
                scalability: 92,
                costEffectiveness: 88,
                compliance: 94,
                security: 96,
                ztna: 90,
                mfa: 85,
                devicePosture: 92,
                automatedRemediation: 88,
                remoteAccess: 95,
                iotSupport: 90
            },
            costBreakdown: {
                hardware: 0,
                software: 135000,
                implementation: 17500,
                maintenance: 0,
                personnel: 40000,
                training: 10000
            },
            complianceScores: {
                pci: 94,
                hipaa: 92,
                nist: 96,
                gdpr: 90,
                iso: 93,
                cmmc: 91,
                ferpa: 88,
                sox: 89
            }
        },
        cisco: {
            name: 'Cisco ISE',
            type: 'Enterprise NAC',
            deploymentModel: 'On-premises',
            description: 'Enterprise network access control solution with extensive hardware requirements and complex deployment.',
            threeYearTCO: 450000,
            implementationTime: 120, // days
            riskReduction: 52, // percentage
            zeroTrustScore: 45, // percentage
            cloudArchitecture: 'Partial',
            fteRequirement: 1.5, // FTE count
            advantages: [
                'Extensive integration with Cisco infrastructure',
                'Robust on-premises deployment',
                'Strong enterprise capabilities',
                'Advanced network segmentation'
            ],
            features: {
                easeOfDeployment: 35,
                cloudIntegration: 50,
                scalability: 80,
                costEffectiveness: 40,
                compliance: 85,
                security: 88,
                ztna: 65,
                mfa: 80,
                devicePosture: 85,
                automatedRemediation: 75,
                remoteAccess: 60,
                iotSupport: 82
            },
            costBreakdown: {
                hardware: 90000,
                software: 112500,
                implementation: 67500,
                maintenance: 81000,
                personnel: 67500,
                training: 31500
            },
            complianceScores: {
                pci: 85,
                hipaa: 82,
                nist: 88,
                gdpr: 78,
                iso: 86,
                cmmc: 84,
                ferpa: 75,
                sox: 80
            }
        },
        aruba: {
            name: 'Aruba ClearPass',
            type: 'Policy Manager',
            deploymentModel: 'On-premises',
            description: 'Network policy manager with strong wired and wireless capabilities but complex implementation requirements.',
            threeYearTCO: 380000,
            implementationTime: 90, // days
            riskReduction: 50, // percentage
            zeroTrustScore: 42, // percentage
            cloudArchitecture: 'Partial',
            fteRequirement: 1.25, // FTE count
            advantages: [
                'Strong integration with Aruba infrastructure',
                'Comprehensive wireless capabilities',
                'Good guest management features',
                'Granular policy controls'
            ],
            features: {
                easeOfDeployment: 45,
                cloudIntegration: 55,
                scalability: 78,
                costEffectiveness: 45,
                compliance: 80,
                security: 85,
                ztna: 60,
                mfa: 75,
                devicePosture: 80,
                automatedRemediation: 70,
                remoteAccess: 65,
                iotSupport: 75
            },
            costBreakdown: {
                hardware: 76000,
                software: 95000,
                implementation: 57000,
                maintenance: 68400,
                personnel: 57000,
                training: 26600
            },
            complianceScores: {
                pci: 82,
                hipaa: 80,
                nist: 85,
                gdpr: 75,
                iso: 82,
                cmmc: 80,
                ferpa: 72,
                sox: 76
            }
        },
        forescout: {
            name: 'Forescout',
            type: 'Device Visibility',
            deploymentModel: 'On-premises',
            description: 'Device visibility and control platform with strong IoT capabilities but significant hardware requirements.',
            threeYearTCO: 405000,
            implementationTime: 100, // days
            riskReduction: 48, // percentage
            zeroTrustScore: 40, // percentage
            cloudArchitecture: 'Limited',
            fteRequirement: 1.25, // FTE count
            advantages: [
                'Excellent device discovery capabilities',
                'Strong IoT security features',
                'Good network visibility',
                'Detailed device profiling'
            ],
            features: {
                easeOfDeployment: 40,
                cloudIntegration: 40,
                scalability: 75,
                costEffectiveness: 35,
                compliance: 82,
                security: 86,
                ztna: 55,
                mfa: 70,
                devicePosture: 90,
                automatedRemediation: 80,
                remoteAccess: 60,
                iotSupport: 95
            },
            costBreakdown: {
                hardware: 81000,
                software: 101250,
                implementation: 60750,
                maintenance: 72900,
                personnel: 60750,
                training: 28350
            },
            complianceScores: {
                pci: 85,
                hipaa: 80,
                nist: 82,
                gdpr: 75,
                iso: 80,
                cmmc: 78,
                ferpa: 70,
                sox: 75
            }
        },
        fortinac: {
            name: 'FortiNAC',
            type: 'Fortinet NAC',
            deploymentModel: 'On-premises',
            description: 'Network access control solution integrated with Fortinet security ecosystem.',
            threeYearTCO: 325000,
            implementationTime: 80, // days
            riskReduction: 45, // percentage
            zeroTrustScore: 38, // percentage
            cloudArchitecture: 'Limited',
            fteRequirement: 1.0, // FTE count
            advantages: [
                'Integration with Fortinet security ecosystem',
                'Good network segmentation capabilities',
                'Moderate deployment complexity',
                'Solid baseline security features'
            ],
            features: {
                easeOfDeployment: 50,
                cloudIntegration: 45,
                scalability: 70,
                costEffectiveness: 55,
                compliance: 75,
                security: 80,
                ztna: 50,
                mfa: 65,
                devicePosture: 75,
                automatedRemediation: 70,
                remoteAccess: 55,
                iotSupport: 70
            },
            costBreakdown: {
                hardware: 65000,
                software: 81250,
                implementation: 48750,
                maintenance: 58500,
                personnel: 48750,
                training: 22750
            },
            complianceScores: {
                pci: 78,
                hipaa: 75,
                nist: 76,
                gdpr: 70,
                iso: 75,
                cmmc: 72,
                ferpa: 65,
                sox: 70
            }
        },
        juniper: {
            name: 'Juniper Mist',
            type: 'AI-driven NAC',
            deploymentModel: 'Hybrid',
            description: 'AI-driven wireless networking platform with NAC capabilities and cloud management.',
            threeYearTCO: 340000,
            implementationTime: 70, // days
            riskReduction: 46, // percentage
            zeroTrustScore: 40, // percentage
            cloudArchitecture: 'Partial',
            fteRequirement: 1.0, // FTE count
            advantages: [
                'Strong AI capabilities for network optimization',
                'Good cloud management features',
                'Excellent wireless capabilities',
                'Increasingly strong zero trust features'
            ],
            features: {
                easeOfDeployment: 60,
                cloudIntegration: 65,
                scalability: 75,
                costEffectiveness: 50,
                compliance: 72,
                security: 78,
                ztna: 65,
                mfa: 70,
                devicePosture: 75,
                automatedRemediation: 70,
                remoteAccess: 60,
                iotSupport: 65
            },
            costBreakdown: {
                hardware: 68000,
                software: 85000,
                implementation: 51000,
                maintenance: 61200,
                personnel: 51000,
                training: 23800
            },
            complianceScores: {
                pci: 75,
                hipaa: 72,
                nist: 76,
                gdpr: 70,
                iso: 75,
                cmmc: 70,
                ferpa: 65,
                sox: 70
            }
        },
        securew2: {
            name: 'SecureW2',
            type: 'Cloud RADIUS',
            deploymentModel: 'Cloud',
            description: 'Cloud-based RADIUS service with certificate-based authentication for wireless networks.',
            threeYearTCO: 280000,
            implementationTime: 45, // days
            riskReduction: 40, // percentage
            zeroTrustScore: 35, // percentage
            cloudArchitecture: 'Native',
            fteRequirement: 0.75, // FTE count
            advantages: [
                'Strong certificate-based authentication',
                'Cloud-native architecture',
                'Good integration with identity providers',
                'Simplified wireless security'
            ],
            features: {
                easeOfDeployment: 65,
                cloudIntegration: 75,
                scalability: 65,
                costEffectiveness: 70,
                compliance: 65,
                security: 70,
                ztna: 60,
                mfa: 75,
                devicePosture: 60,
                automatedRemediation: 60,
                remoteAccess: 75,
                iotSupport: 45
            },
            costBreakdown: {
                hardware: 0,
                software: 154000,
                implementation: 33600,
                maintenance: 0,
                personnel: 70000,
                training: 22400
            },
            complianceScores: {
                pci: 70,
                hipaa: 68,
                nist: 72,
                gdpr: 65,
                iso: 70,
                cmmc: 65,
                ferpa: 60,
                sox: 68
            }
        },
        microsoft: {
            name: 'Microsoft NPS',
            type: 'Windows Server NAC',
            deploymentModel: 'On-premises',
            description: 'Network Policy Server for Windows Server with basic NAC capabilities for Windows environments.',
            threeYearTCO: 290000,
            implementationTime: 60, // days
            riskReduction: 35, // percentage
            zeroTrustScore: 25, // percentage
            cloudArchitecture: 'None',
            fteRequirement: 1.0, // FTE count
            advantages: [
                'Included with Windows Server licensing',
                'Good integration with Active Directory',
                'Familiar administration for Windows administrators',
                'Basic network access control features'
            ],
            features: {
                easeOfDeployment: 40,
                cloudIntegration: 60,
                scalability: 55,
                costEffectiveness: 65,
                compliance: 60,
                security: 65,
                ztna: 30,
                mfa: 70,
                devicePosture: 65,
                automatedRemediation: 45,
                remoteAccess: 60,
                iotSupport: 40
            },
            costBreakdown: {
                hardware: 58000,
                software: 72500,
                implementation: 43500,
                maintenance: 52200,
                personnel: 43500,
                training: 20300
            },
            complianceScores: {
                pci: 65,
                hipaa: 62,
                nist: 70,
                gdpr: 60,
                iso: 68,
                cmmc: 65,
                ferpa: 60,
                sox: 65
            }
        },
        arista: {
            name: 'Arista Agni',
            type: 'Network Control',
            deploymentModel: 'On-premises',
            description: 'Network control solution integrated with Arista networking infrastructure.',
            threeYearTCO: 300000,
            implementationTime: 75, // days
            riskReduction: 42, // percentage
            zeroTrustScore: 30, // percentage
            cloudArchitecture: 'Limited',
            fteRequirement: 1.0, // FTE count
            advantages: [
                'Strong integration with Arista networks',
                'Good network visibility features',
                'Solid performance in Arista environments',
                'Enterprise-grade scalability'
            ],
            features: {
                easeOfDeployment: 45,
                cloudIntegration: 50,
                scalability: 80,
                costEffectiveness: 60,
                compliance: 70,
                security: 75,
                ztna: 45,
                mfa: 65,
                devicePosture: 70,
                automatedRemediation: 65,
                remoteAccess: 55,
                iotSupport: 60
            },
            costBreakdown: {
                hardware: 60000,
                software: 75000,
                implementation: 45000,
                maintenance: 54000,
                personnel: 45000,
                training: 21000
            },
            complianceScores: {
                pci: 72,
                hipaa: 70,
                nist: 75,
                gdpr: 65,
                iso: 72,
                cmmc: 70,
                ferpa: 62,
                sox: 68
            }
        },
        foxpass: {
            name: 'Foxpass',
            type: 'Cloud RADIUS/LDAP',
            deploymentModel: 'Cloud',
            description: 'Cloud-based RADIUS and LDAP service for network authentication and access control.',
            threeYearTCO: 240000,
            implementationTime: 40, // days
            riskReduction: 38, // percentage
            zeroTrustScore: 32, // percentage
            cloudArchitecture: 'Native',
            fteRequirement: 0.5, // FTE count
            advantages: [
                'Cloud-native RADIUS and LDAP',
                'Simple deployment for small to medium businesses',
                'Good developer-friendly features',
                'Straightforward user management'
            ],
            features: {
                easeOfDeployment: 70,
                cloudIntegration: 80,
                scalability: 60,
                costEffectiveness: 75,
                compliance: 60,
                security: 65,
                ztna: 45,
                mfa: 70,
                devicePosture: 55,
                automatedRemediation: 50,
                remoteAccess: 70,
                iotSupport: 45
            },
            costBreakdown: {
                hardware: 0,
                software: 132000,
                implementation: 28800,
                maintenance: 0,
                personnel: 60000,
                training: 19200
            },
            complianceScores: {
                pci: 65,
                hipaa: 62,
                nist: 68,
                gdpr: 60,
                iso: 65,
                cmmc: 60,
                ferpa: 55,
                sox: 60
            }
        },
        'no-nac': {
            name: 'No NAC',
            type: 'High risk baseline',
            deploymentModel: 'None',
            description: 'No network access control solution, used as a baseline for comparison.',
            threeYearTCO: 0,
            implementationTime: 0, // days
            riskReduction: 0, // percentage
            zeroTrustScore: 0, // percentage
            cloudArchitecture: 'None',
            fteRequirement: 0, // FTE count
            advantages: [],
            features: {
                easeOfDeployment: 100,
                cloudIntegration: 0,
                scalability: 0,
                costEffectiveness: 100,
                compliance: 0,
                security: 0,
                ztna: 0,
                mfa: 0,
                devicePosture: 0,
                automatedRemediation: 0,
                remoteAccess: 0,
                iotSupport: 0
            },
            costBreakdown: {
                hardware: 0,
                software: 0,
                implementation: 0,
                maintenance: 0,
                personnel: 0,
                training: 0
            },
            complianceScores: {
                pci: 0,
                hipaa: 0,
                nist: 0,
                gdpr: 0,
                iso: 0,
                cmmc: 0,
                ferpa: 0,
                sox: 0
            }
        }
    };
    
    // Industry data configuration
    const industryData = {
        healthcare: {
            name: 'Healthcare',
            complianceFrameworks: ['hipaa', 'pci', 'nist'],
            challenges: [
                'Protecting sensitive patient data',
                'Meeting strict regulatory requirements',
                'Managing diverse medical devices',
                'Balancing security with clinical workflows',
                'Maintaining availability of critical systems'
            ],
            solutions: {
                portnox: [
                    'Built-in HIPAA compliance controls',
                    'Medical device visibility and classification',
                    'Automated compliance reporting',
                    'Zero disruption to clinical services',
                    'Simplified remote access for practitioners'
                ]
            },
            averageBreachCost: 9230000, // $9.23M per IBM Cost of a Data Breach Report
            riskProfile: 'high'
        },
        financial: {
            name: 'Financial Services',
            complianceFrameworks: ['pci', 'sox', 'gdpr', 'nist'],
            challenges: [
                'Protecting customer financial data',
                'Meeting strict regulatory requirements',
                'Preventing fraud and unauthorized access',
                'Managing complex vendor ecosystems',
                'Maintaining continuous availability'
            ],
            solutions: {
                portnox: [
                    'PCI DSS and SOX compliance controls',
                    'Advanced authentication for financial systems',
                    'Continuous monitoring and automated response',
                    'Comprehensive audit trails for compliance',
                    'Secure remote access for employees and vendors'
                ]
            },
            averageBreachCost: 5850000, // $5.85M per IBM Cost of a Data Breach Report
            riskProfile: 'high'
        }
    };
    
    // Compliance framework data
    const complianceData = {
        pci: {
            name: 'PCI DSS',
            fullName: 'Payment Card Industry Data Security Standard',
            description: 'Security standard for organizations that handle credit card data',
            requirements: [
                'Network security controls',
                'Cardholder data protection',
                'Vulnerability management',
                'Access control measures',
                'Network monitoring and testing',
                'Information security policy'
            ],
            portnoxCoverage: 94,
            industryAvgCoverage: 72,
            applicableIndustries: ['retail', 'financial', 'healthcare', 'technology']
        },
        hipaa: {
            name: 'HIPAA',
            fullName: 'Health Insurance Portability and Accountability Act',
            description: 'Regulations for protecting sensitive patient health information',
            requirements: [
                'Access controls',
                'Audit controls',
                'Integrity controls',
                'Authentication',
                'Transmission security',
                'Device and media controls'
            ],
            portnoxCoverage: 92,
            industryAvgCoverage: 68,
            applicableIndustries: ['healthcare']
        }
    };
    
    // Make data available to the application
    window.PortnoxData = {
        vendors: vendorData,
        industries: industryData,
        compliance: complianceData,
        
        // Helper methods
        getVendor: function(vendorId) {
            return vendorData[vendorId] || null;
        },
        
        getIndustry: function(industryId) {
            return industryData[industryId] || null;
        },
        
        getComplianceFramework: function(complianceId) {
            return complianceData[complianceId] || null;
        },
        
        // Get all vendor IDs
        getAllVendorIds: function() {
            return Object.keys(vendorData);
        },
        
        // Get selected vendors (for initialization)
        getSelectedVendors: function() {
            // Always include Portnox
            const selected = ['portnox'];
            
            // Include some default competitors for initial view
            return selected.concat(['cisco', 'aruba']);
        }
    };
    
    console.log('Vendor data module initialized successfully');
})();
EOL

# Update main-integration.js to use the fixed vendor data module
sed -i 's|js/fixes/vendor-data.js|js/fixes/vendor-data-fix.js|' "$APP_DIR/js/fixes/main-integration.js"

# 2. Fix image loading issues
echo "🖼️ Fixing image loading issues..."

# Create a script to verify and debug image loading
cat > "$APP_DIR/js/fixes/image-loader-fix.js" << 'EOL'
// Image Loader Fix for Portnox TCO Analyzer
(function() {
    console.log('🖼️ Initializing image loader fix...');
    
    // Function to ensure images are loaded properly
    function ensureImagesLoaded() {
        // Fix any broken paths in the HTML
        fixImagePaths();
        
        // Check vendor logo elements
        checkVendorLogos();
        
        console.log('Image loader fix applied');
    }
    
    // Fix image paths in the document
    function fixImagePaths() {
        // Fix all image paths starting with /img/
        const images = document.querySelectorAll('img[src^="/img/"]');
        images.forEach(img => {
            const currentSrc = img.getAttribute('src');
            const newSrc = currentSrc.replace(/^\/img\//, 'img/');
            console.log(`Fixing image path: ${currentSrc} -> ${newSrc}`);
            img.setAttribute('src', newSrc);
        });
        
        // Fix vendor logo paths specifically
        const vendorLogos = document.querySelectorAll('img[src*="vendors/"]');
        vendorLogos.forEach(img => {
            const currentSrc = img.getAttribute('src');
            if (!currentSrc.match(/^img\/vendors\//)) {
                const filename = currentSrc.split('/').pop();
                const newSrc = `img/vendors/${filename}`;
                console.log(`Fixing vendor logo path: ${currentSrc} -> ${newSrc}`);
                img.setAttribute('src', newSrc);
            }
        });
    }
    
    // Check vendor logos and apply fallback only when needed
    function checkVendorLogos() {
        const vendorCards = document.querySelectorAll('.vendor-card');
        
        vendorCards.forEach(card => {
            const vendor = card.getAttribute('data-vendor');
            const logoContainer = card.querySelector('.vendor-logo');
            
            if (logoContainer) {
                const logoImg = logoContainer.querySelector('img');
                
                if (logoImg) {
                    // Fix path if needed
                    const currentSrc = logoImg.getAttribute('src');
                    if (!currentSrc.match(/^img\/vendors\//)) {
                        const filename = currentSrc.split('/').pop();
                        logoImg.setAttribute('src', `img/vendors/${filename}`);
                    }
                    
                    // Set up error handler to apply fallback only if needed
                    logoImg.onerror = function() {
                        console.warn(`Could not load logo for ${vendor}, applying text fallback`);
                        this.style.display = 'none';
                        
                        // Check if fallback already exists
                        if (!logoContainer.querySelector('svg')) {
                            const vendorColors = {
                                portnox: '#2c3e50',
                                cisco: '#049fd9',
                                aruba: '#ff8300',
                                forescout: '#6b2a94',
                                fortinac: '#c8102e',
                                juniper: '#84bc41',
                                securew2: '#1a4d80',
                                microsoft: '#00a4ef',
                                arista: '#2d7de1',
                                foxpass: '#ff5722',
                                'no-nac': '#f44336'
                            };
                            
                            // Create fallback text 
                            const text = document.createElement('div');
                            text.className = 'vendor-text-fallback';
                            text.textContent = vendor.charAt(0).toUpperCase() + vendor.slice(1).replace('-', ' ');
                            text.style.color = vendorColors[vendor] || '#666666';
                            text.style.fontWeight = 'bold';
                            text.style.textAlign = 'center';
                            text.style.fontSize = '14px';
                            text.style.padding = '5px';
                            logoContainer.appendChild(text);
                        }
                    };
                    
                    // Reset any existing error handler
                    logoImg.style.display = '';
                }
            }
        });
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', ensureImagesLoaded);
    
    // Also initialize on window load as a fallback
    window.addEventListener('load', ensureImagesLoaded);
})();
EOL

# 3. Fix vendor grid layout in sidebar
echo "🔳 Fixing vendor grid layout in sidebar..."

# Create enhanced CSS for vendor grid
cat > "$APP_DIR/css/fixes/vendor-grid-fix.css" << 'EOL'
/* Enhanced Vendor Grid Layout for Portnox TCO Analyzer */

/* Vendor grid layout - make smaller and side by side */
.vendor-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important;
    gap: 8px !important;
    margin-top: 10px !important;
}

/* Vendor card styling */
.vendor-card {
    display: flex !important;
    flex-direction: column !important;
    background-color: #fff !important;
    border-radius: 6px !important;
    border: 1px solid #e0e0e0 !important;
    overflow: hidden !important;
    transition: all 0.2s ease-in-out !important;
    cursor: pointer !important;
    padding: 8px !important;
    height: 100px !important; /* Fixed height for uniformity */
}

.vendor-card:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
    border-color: #1B67B2 !important;
}

.vendor-card.selected {
    border: 2px solid #2BD25B !important;
    background-color: rgba(43, 210, 91, 0.05) !important;
}

/* Vendor logo styling */
.vendor-logo {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    height: 40px !important;
    margin-bottom: 5px !important;
    overflow: hidden !important;
}

.vendor-logo img {
    max-height: 30px !important;
    max-width: 90% !important;
    object-fit: contain !important;
}

/* Vendor info styling */
.vendor-info {
    text-align: center !important;
    padding: 0 5px !important;
}

.vendor-info h3 {
    font-size: 12px !important;
    margin: 0 0 2px 0 !important;
    font-weight: 600 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

.vendor-info p {
    font-size: 10px !important;
    margin: 0 !important;
    color: #666 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

/* Vendor badge styling */
.vendor-badge {
    display: flex !important;
    justify-content: center !important;
    margin-top: 4px !important;
}

.vendor-badge .badge {
    padding: 2px 5px !important;
    font-size: 8px !important;
    border-radius: 3px !important;
    font-weight: 600 !important;
}

.badge-primary {
    background-color: #1B67B2 !important;
    color: white !important;
}

.badge-warning {
    background-color: #f39c12 !important;
    color: white !important;
}

.badge-danger {
    background-color: #e74c3c !important;
    color: white !important;
}

/* Fix sidebar height to ensure all vendors are shown */
.sidebar-content {
    max-height: calc(100vh - 250px) !important;
    overflow-y: auto !important;
}

/* Enhanced scrollbar for the sidebar */
.sidebar-content::-webkit-scrollbar {
    width: 6px !important;
}

.sidebar-content::-webkit-scrollbar-track {
    background: #f1f1f1 !important;
}

.sidebar-content::-webkit-scrollbar-thumb {
    background: #c1c1c1 !important;
    border-radius: 3px !important;
}

.sidebar-content::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1 !important;
}

/* Config card enhancements */
.config-card-content {
    padding: 10px !important;
    transition: max-height 0.3s ease, opacity 0.3s ease !important;
    overflow: hidden !important;
}

/* Make logo-related class overrides stronger */
.company-logo {
    height: 40px !important;
    width: auto !important;
    object-fit: contain !important;
    margin-right: 15px !important;
}
EOL

# 4. Create integration script for the fixes
echo "🔄 Creating integration script for the fixes..."
cat > "$APP_DIR/js/fixes/targeted-fixes.js" << 'EOL'
// Targeted Fixes Integration for Portnox TCO Analyzer
(function() {
    console.log('🔧 Initializing targeted fixes...');
    
    // Load required scripts
    function loadScripts() {
        const scripts = [
            'js/fixes/vendor-data-fix.js',
            'js/fixes/image-loader-fix.js'
        ];
        
        loadNextScript(scripts, 0);
    }
    
    // Load scripts sequentially
    function loadNextScript(scripts, index) {
        if (index >= scripts.length) {
            console.log('All fix scripts loaded successfully');
            initializeFixes();
            return;
        }
        
        const script = document.createElement('script');
        script.src = scripts[index];
        script.onload = function() {
            console.log(`Loaded script: ${scripts[index]}`);
            loadNextScript(scripts, index + 1);
        };
        script.onerror = function() {
            console.error(`Failed to load script: ${scripts[index]}`);
            loadNextScript(scripts, index + 1);
        };
        
        document.head.appendChild(script);
    }
    
    // Initialize fixes
    function initializeFixes() {
        // 1. Fix sidebar expansion
        fixSidebarExpansion();
        
        // 2. Fix vendor selection
        fixVendorSelection();
        
        // 3. Ensure data is loaded properly
        ensureDataLoaded();
        
        // 4. Apply all CSS fixes
        applyCssOverrides();
        
        console.log('All targeted fixes applied successfully');
    }
    
    // Fix sidebar expansion
    function fixSidebarExpansion() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;
        
        // Ensure sidebar has correct width
        sidebar.style.width = '350px';
        sidebar.style.minWidth = '350px';
        sidebar.style.maxWidth = '350px';
        
        // Fix sidebar height to show all content
        const sidebarContent = sidebar.querySelector('.sidebar-content');
        if (sidebarContent) {
            sidebarContent.style.maxHeight = 'calc(100vh - 250px)';
            sidebarContent.style.overflowY = 'auto';
        }
        
        // Fix sidebar toggle position
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.style.left = '350px';
        }
        
        console.log('Sidebar expansion fixed');
    }
    
    // Fix vendor selection
    function fixVendorSelection() {
        const vendorCards = document.querySelectorAll('.vendor-card');
        
        vendorCards.forEach(card => {
            // Make sure Portnox is always selected
            if (card.getAttribute('data-vendor') === 'portnox') {
                card.classList.add('selected');
            }
            
            // Remove existing event listeners
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            // Add new event listener
            newCard.addEventListener('click', function() {
                const vendor = this.getAttribute('data-vendor');
                
                // Prevent deselecting Portnox
                if (vendor === 'portnox') {
                    return;
                }
                
                this.classList.toggle('selected');
                
                // Get all selected vendors
                const selectedVendors = [];
                document.querySelectorAll('.vendor-card.selected').forEach(card => {
                    selectedVendors.push(card.getAttribute('data-vendor'));
                });
                
                console.log('Selected vendors:', selectedVendors);
                
                // Update charts when selection changes
                if (typeof window.initializeCharts === 'function') {
                    window.initializeCharts();
                }
            });
        });
        
        console.log('Vendor selection fixed');
    }
    
    // Ensure data is loaded properly
    function ensureDataLoaded() {
        // Check if vendor data is available
        if (!window.PortnoxData) {
            console.warn('PortnoxData not available, charts may not render correctly');
            return;
        }
        
        // Initialize with default selections if needed
        if (document.querySelectorAll('.vendor-card.selected').length < 2) {
            // Select some default competitors
            const defaultCompetitors = ['cisco', 'aruba'];
            
            defaultCompetitors.forEach(vendorId => {
                const card = document.querySelector(`.vendor-card[data-vendor="${vendorId}"]`);
                if (card) {
                    card.classList.add('selected');
                }
            });
            
            console.log('Default vendors selected for comparison');
        }
        
        // Make sure calc button is working
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', function() {
                // Show loading overlay
                const loadingOverlay = document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'flex';
                }
                
                // Trigger chart updates with slight delay
                setTimeout(function() {
                    if (typeof window.initializeCharts === 'function') {
                        window.initializeCharts();
                    }
                    
                    // Hide loading overlay
                    if (loadingOverlay) {
                        loadingOverlay.style.display = 'none';
                    }
                    
                    // Show success toast
                    if (window.showToast) {
                        window.showToast('Analysis updated successfully!', 'success');
                    }
                }, 1000);
            });
        }
        
        console.log('Data loading ensured');
    }
    
    // Apply CSS overrides
    function applyCssOverrides() {
        const style = document.createElement('style');
        style.textContent = `
            /* Ensure all vendor logos load correctly */
            .vendor-logo img {
                max-height: 30px !important;
                max-width: 90% !important;
                object-fit: contain !important;
            }
            
            /* Fix image paths for vendor logos */
            .vendor-logo img[src*="portnox-logo"] {
                content: url('img/vendors/portnox-logo.png');
            }
            
            .vendor-logo img[src*="cisco-logo"] {
                content: url('img/vendors/cisco-logo.png');
            }
            
            .vendor-logo img[src*="aruba-logo"] {
                content: url('img/vendors/aruba-logo.png');
            }
            
            .vendor-logo img[src*="forescout-logo"] {
                content: url('img/vendors/forescout-logo.png');
            }
            
            .vendor-logo img[src*="fortinac-logo"] {
                content: url('img/vendors/fortinac-logo.png');
            }
            
            .vendor-logo img[src*="juniper-logo"] {
                content: url('img/vendors/juniper-logo.png');
            }
            
            .vendor-logo img[src*="securew2-logo"] {
                content: url('img/vendors/securew2-logo.png');
            }
            
            .vendor-logo img[src*="microsoft-logo"] {
                content: url('img/vendors/microsoft-logo.png');
            }
            
            .vendor-logo img[src*="arista-logo"] {
                content: url('img/vendors/arista-logo.png');
            }
            
            .vendor-logo img[src*="foxpass-logo"] {
                content: url('img/vendors/foxpass-logo.png');
            }
            
            .vendor-logo img[src*="no-nac-icon"] {
                content: url('img/vendors/no-nac-icon.png');
            }
            
            /* Fix company logo in header */
            .company-logo {
                content: url('img/vendors/portnox-logo.png') !important;
                height: 40px !important;
                width: auto !important;
                object-fit: contain !important;
            }
        `;
        
        document.head.appendChild(style);
        console.log('CSS overrides applied');
    }
    
    // Load scripts when DOM is ready
    document.addEventListener('DOMContentLoaded', loadScripts);
    
    // Also initialize on window load as a fallback
    window.addEventListener('load', function() {
        if (!window.PortnoxData) {
            console.log('Initializing fixes on window load (fallback)');
            loadScripts();
        }
    });
})();
EOL

# 5. Update index.html to include the new fixes
echo "📄 Updating index.html..."

# Add CSS file reference
sed -i 's|<link rel="stylesheet" href="css/fixes/sidebar-fixes.css">|<link rel="stylesheet" href="css/fixes/sidebar-fixes.css">\n    <link rel="stylesheet" href="css/fixes/vendor-grid-fix.css">|' "$APP_DIR/index.html"

# Add JS file reference
sed -i 's|<script src="js/fixes/debug-utilities.js"></script>|<script src="js/fixes/debug-utilities.js"></script>\n    <script src="js/fixes/targeted-fixes.js"></script>|' "$APP_DIR/index.html"

# Fix image paths in index.html
sed -i 's|/img/vendors/|img/vendors/|g' "$APP_DIR/index.html"

echo "==============================================="
echo "✅ Portnox TCO Analyzer Targeted Fix Script Complete!"
echo "==============================================="
echo 
echo "The script has successfully applied the following targeted fixes:"
echo "1. Fixed vendor data loading issue (syntax error)"
echo "2. Fixed image loading for vendor logos"
echo "3. Improved vendor grid layout in sidebar (smaller, side-by-side)"
echo "4. Fixed sidebar expansion to show all vendors"
echo "5. Added appropriate CSS and JS overrides"
echo 
echo "All of these fixes use the existing PNG files in img/vendors/ and"
echo "do not create any placeholders or fallbacks unless absolutely necessary."
echo 
echo "You should now see all vendors properly displayed in the sidebar and"
echo "the data loading correctly for charts and comparisons."
echo "==============================================="

// Vendor Data Fix
// Enhances vendor data with more vendors and detailed information

(function() {
    console.log("📊 Initializing enhanced vendor data...");
    
    // Complete vendor data with all requested vendors
    window.vendorData = [
        {
            id: "portnox",
            name: "Portnox Cloud",
            type: "Cloud-native NAC",
            threeYearTCO: 202500,
            description: "Cloud-native NAC solution with zero trust security",
            strengths: [
                "True cloud-native architecture with no on-premises hardware",
                "Fast deployment with minimal IT staff requirements",
                "Built-in zero trust security framework",
                "Continuous compliance monitoring",
                "Seamless remote access support"
            ],
            weaknesses: [
                "May require cloud connectivity for full functionality",
                "Less customizable than some on-premises solutions"
            ],
            idealFor: "Organizations seeking a modern, scalable NAC solution with minimal infrastructure"
        },
        {
            id: "cisco",
            name: "Cisco ISE",
            type: "Enterprise NAC",
            threeYearTCO: 450000,
            description: "Enterprise-grade on-premises NAC solution",
            strengths: [
                "Comprehensive security features",
                "Strong integration with Cisco networking equipment",
                "Mature platform with extensive capabilities",
                "Detailed policy controls",
                "Strong support for complex enterprise environments"
            ],
            weaknesses: [
                "Expensive hardware and licensing costs",
                "Complex deployment requiring specialized expertise",
                "High maintenance overhead",
                "Significant IT staff requirements"
            ],
            idealFor: "Large enterprises with substantial Cisco infrastructure and dedicated security teams"
        },
        {
            id: "aruba",
            name: "Aruba ClearPass",
            type: "Policy Manager",
            threeYearTCO: 380000,
            description: "Comprehensive policy management NAC solution",
            strengths: [
                "Strong wireless integration",
                "Good multi-vendor support",
                "Built-in guest management",
                "Solid policy controls",
                "Integration with HPE/Aruba ecosystem"
            ],
            weaknesses: [
                "Complex deployment and configuration",
                "High hardware requirements",
                "Expensive licensing model",
                "Limited cloud capabilities"
            ],
            idealFor: "Mid to large enterprises with Aruba wireless infrastructure"
        },
        {
            id: "forescout",
            name: "Forescout",
            type: "Device Visibility",
            threeYearTCO: 405000,
            description: "Device visibility and control platform",
            strengths: [
                "Excellent device discovery capabilities",
                "Agentless architecture",
                "Strong IoT device support",
                "Good multi-vendor integration",
                "Detailed visibility dashboards"
            ],
            weaknesses: [
                "High cost for full functionality",
                "Complex deployment architecture",
                "Requires significant hardware",
                "Limited cloud capabilities"
            ],
            idealFor: "Organizations with large IoT environments requiring strong device visibility"
        },
        {
            id: "fortinac",
            name: "FortiNAC",
            type: "Fortinet NAC",
            threeYearTCO: 325000,
            description: "NAC solution within Fortinet security ecosystem",
            strengths: [
                "Strong integration with Fortinet products",
                "Good security fabric integration",
                "IoT security capabilities",
                "Rogue device detection",
                "Consistent security policy framework"
            ],
            weaknesses: [
                "Limited features outside Fortinet ecosystem",
                "Complex deployment process",
                "Requires on-premises infrastructure",
                "Limited cloud integration"
            ],
            idealFor: "Organizations already invested in Fortinet security products"
        },
        {
            id: "juniper",
            name: "Juniper Mist",
            type: "AI-driven NAC",
            threeYearTCO: 340000,
            description: "AI-driven wireless and NAC solution",
            strengths: [
                "Strong AI-driven insights",
                "Good wireless integration",
                "Cloud management capabilities",
                "Modern user interface",
                "Automation capabilities"
            ],
            weaknesses: [
                "Less mature NAC capabilities than dedicated solutions",
                "Primarily focused on wireless networks",
                "Limited wired network capabilities",
                "Less comprehensive than dedicated NAC solutions"
            ],
            idealFor: "Organizations with Juniper infrastructure seeking integrated wireless NAC"
        },
        {
            id: "securew2",
            name: "SecureW2",
            type: "Cloud RADIUS",
            threeYearTCO: 280000,
            description: "Cloud-based RADIUS and certificate services",
            strengths: [
                "Cloud-based architecture",
                "Strong certificate management",
                "Good integration with identity providers",
                "Simple deployment model",
                "No on-premises hardware required"
            ],
            weaknesses: [
                "More limited NAC features compared to dedicated solutions",
                "Focused primarily on authentication vs. comprehensive NAC",
                "Limited device enforcement capabilities",
                "Less mature compliance features"
            ],
            idealFor: "Organizations seeking cloud-based identity and certificate management"
        },
        {
            id: "microsoft",
            name: "Microsoft NPS",
            type: "Windows Server NAC",
            threeYearTCO: 290000,
            description: "Network Policy Server for Windows environments",
            strengths: [
                "Integrated with Windows Server",
                "Familiar management interface for Windows admins",
                "Good Active Directory integration",
                "No additional licensing for Windows environments",
                "Basic NAC functionality"
            ],
            weaknesses: [
                "Limited features compared to dedicated NAC solutions",
                "Windows Server dependency",
                "Limited device visibility capabilities",
                "Basic policy controls",
                "Limited multi-vendor support"
            ],
            idealFor: "Windows-centric organizations with basic NAC requirements"
        },
        {
            id: "arista",
            name: "Arista Agni",
            type: "Network Control",
            threeYearTCO: 300000,
            description: "Network access control integrated with Arista networking",
            strengths: [
                "Tight integration with Arista networks",
                "Strong policy enforcement",
                "Good multi-vendor switch support",
                "Scalable architecture",
                "Cloud management options"
            ],
            weaknesses: [
                "Less mature than established NAC solutions",
                "Limited recognition outside Arista customer base",
                "Fewer integrations with third-party security tools",
                "More limited compliance features"
            ],
            idealFor: "Organizations with Arista networking infrastructure"
        },
        {
            id: "foxpass",
            name: "Foxpass",
            type: "Cloud RADIUS/LDAP",
            threeYearTCO: 240000,
            description: "Cloud-based RADIUS, LDAP, and certificate services",
            strengths: [
                "Fully cloud-hosted solution",
                "Easy deployment model",
                "Good identity provider integration",
                "Developer-friendly approach",
                "No on-premises hardware required"
            ],
            weaknesses: [
                "More limited NAC features compared to comprehensive solutions",
                "Focused on authentication rather than full NAC",
                "Less mature compliance capabilities",
                "Limited device enforcement features"
            ],
            idealFor: "Small to mid-sized organizations seeking cloud identity and basic access control"
        },
        {
            id: "extreme",
            name: "Extreme Networks NAC",
            type: "Integrated NAC",
            threeYearTCO: 320000,
            description: "Network access control integrated with Extreme networking",
            strengths: [
                "Strong integration with Extreme Networks infrastructure",
                "Good policy management",
                "Solid device visibility",
                "Centralized management",
                "IOT device profiling"
            ],
            weaknesses: [
                "Requires on-premises infrastructure",
                "Complex deployment",
                "Best with Extreme networking equipment",
                "Limited cloud capabilities"
            ],
            idealFor: "Organizations with Extreme Networks infrastructure"
        },
        {
            id: "no-nac",
            name: "No NAC",
            type: "High risk baseline",
            threeYearTCO: 0,
            description: "Baseline for comparison - no NAC solution deployed",
            strengths: [
                "No upfront costs",
                "No deployment requirements",
                "No maintenance overhead",
                "No licensing costs",
                "No training required"
            ],
            weaknesses: [
                "No network visibility",
                "No access control capabilities",
                "No device authentication",
                "No compliance capabilities",
                "High security risk",
                "Non-compliant with most security frameworks"
            ],
            idealFor: "Not recommended for any organization concerned with security"
        }
    ];
    
    // Enhanced vendor features matrix
    window.vendorFeatures = {
        // Security Features
        zeroTrust: {
            portnox: 95,
            cisco: 80,
            aruba: 75,
            forescout: 80,
            fortinac: 70,
            juniper: 75,
            securew2: 65,
            microsoft: 50,
            arista: 70,
            foxpass: 60,
            extreme: 70,
            "no-nac": 0
        },
        deviceVisibility: {
            portnox: 90,
            cisco: 85,
            aruba: 80,
            forescout: 95,
            fortinac: 80,
            juniper: 75,
            securew2: 60,
            microsoft: 50,
            arista: 75,
            foxpass: 55,
            extreme: 80,
            "no-nac": 0
        },
        threatProtection: {
            portnox: 85,
            cisco: 90,
            aruba: 80,
            forescout: 85,
            fortinac: 85,
            juniper: 75,
            securew2: 60,
            microsoft: 60,
            arista: 70,
            foxpass: 50,
            extreme: 75,
            "no-nac": 0
        },
        
        // Deployment Features
        cloudNative: {
            portnox: 95,
            cisco: 40,
            aruba: 50,
            forescout: 40,
            fortinac: 45,
            juniper: 70,
            securew2: 90,
            microsoft: 30,
            arista: 60,
            foxpass: 95,
            extreme: 45,
            "no-nac": 0
        },
        deploymentSpeed: {
            portnox: 90,
            cisco: 40,
            aruba: 50,
            forescout: 45,
            fortinac: 50,
            juniper: 60,
            securew2: 85,
            microsoft: 55,
            arista: 55,
            foxpass: 85,
            extreme: 50,
            "no-nac": 100
        },
        hardwareRequirements: {
            portnox: 95, // Lower is better (less hardware required)
            cisco: 30,
            aruba: 40,
            forescout: 35,
            fortinac: 45,
            juniper: 50,
            securew2: 90,
            microsoft: 50,
            arista: 45,
            foxpass: 95,
            extreme: 40,
            "no-nac": 100
        },
        
        // Operational Features
        staffingRequirements: {
            portnox: 90, // Lower is better (less staff required)
            cisco: 40,
            aruba: 50,
            forescout: 45,
            fortinac: 50,
            juniper: 55,
            securew2: 80,
            microsoft: 60,
            arista: 55,
            foxpass: 85,
            extreme: 50,
            "no-nac": 100
        },
        multiVendorSupport: {
            portnox: 90,
            cisco: 60,
            aruba: 75,
            forescout: 85,
            fortinac: 60,
            juniper: 65,
            securew2: 80,
            microsoft: 55,
            arista: 65,
            foxpass: 75,
            extreme: 70,
            "no-nac": 0
        },
        scalability: {
            portnox: 95,
            cisco: 85,
            aruba: 80,
            forescout: 75,
            fortinac: 75,
            juniper: 70,
            securew2: 85,
            microsoft: 65,
            arista: 75,
            foxpass: 80,
            extreme: 75,
            "no-nac": 0
        },
        
        // Compliance Features
        complianceReporting: {
            portnox: 90,
            cisco: 85,
            aruba: 80,
            forescout: 85,
            fortinac: 75,
            juniper: 70,
            securew2: 65,
            microsoft: 60,
            arista: 65,
            foxpass: 60,
            extreme: 75,
            "no-nac": 0
        },
        automatedRemediation: {
            portnox: 85,
            cisco: 80,
            aruba: 75,
            forescout: 80,
            fortinac: 75,
            juniper: 70,
            securew2: 60,
            microsoft: 50,
            arista: 65,
            foxpass: 55,
            extreme: 70,
            "no-nac": 0
        },
        continuousMonitoring: {
            portnox: 95,
            cisco: 80,
            aruba: 75,
            forescout: 85,
            fortinac: 75,
            juniper: 70,
            securew2: 65,
            microsoft: 45,
            arista: 70,
            foxpass: 60,
            extreme: 75,
            "no-nac": 0
        }
    };
    
    // Enhanced industry compliance matrix
    window.industryCompliance = {
        healthcare: {
            portnox: 95,
            cisco: 90,
            aruba: 85,
            forescout: 90,
            fortinac: 80,
            juniper: 75,
            securew2: 70,
            microsoft: 65,
            arista: 75,
            foxpass: 65,
            extreme: 80,
            "no-nac": 10
        },
        financial: {
            portnox: 95,
            cisco: 90,
            aruba: 85,
            forescout: 85,
            fortinac: 85,
            juniper: 80,
            securew2: 75,
            microsoft: 70,
            arista: 80,
            foxpass: 70,
            extreme: 85,
            "no-nac": 5
        },
        education: {
            portnox: 90,
            cisco: 85,
            aruba: 90,
            forescout: 80,
            fortinac: 75,
            juniper: 80,
            securew2: 85,
            microsoft: 75,
            arista: 75,
            foxpass: 80,
            extreme: 80,
            "no-nac": 15
        },
        government: {
            portnox: 90,
            cisco: 90,
            aruba: 85,
            forescout: 90,
            fortinac: 80,
            juniper: 75,
            securew2: 70,
            microsoft: 80,
            arista: 75,
            foxpass: 65,
            extreme: 85,
            "no-nac": 5
        },
        manufacturing: {
            portnox: 90,
            cisco: 85,
            aruba: 80,
            forescout: 90,
            fortinac: 80,
            juniper: 75,
            securew2: 70,
            microsoft: 65,
            arista: 75,
            foxpass: 65,
            extreme: 85,
            "no-nac": 10
        },
        retail: {
            portnox: 90,
            cisco: 85,
            aruba: 80,
            forescout: 85,
            fortinac: 80,
            juniper: 75,
            securew2: 75,
            microsoft: 65,
            arista: 70,
            foxpass: 70,
            extreme: 75,
            "no-nac": 15
        },
        technology: {
            portnox: 95,
            cisco: 85,
            aruba: 80,
            forescout: 85,
            fortinac: 80,
            juniper: 85,
            securew2: 85,
            microsoft: 75,
            arista: 80,
            foxpass: 85,
            extreme: 80,
            "no-nac": 20
        },
        energy: {
            portnox: 90,
            cisco: 90,
            aruba: 85,
            forescout: 90,
            fortinac: 85,
            juniper: 75,
            securew2: 70,
            microsoft: 70,
            arista: 80,
            foxpass: 65,
            extreme: 85,
            "no-nac": 5
        }
    };
    
    // Regulatory compliance matrix
    window.regulatoryCompliance = {
        pci: {
            portnox: 95,
            cisco: 90,
            aruba: 85,
            forescout: 90,
            fortinac: 85,
            juniper: 80,
            securew2: 75,
            microsoft: 70,
            arista: 80,
            foxpass: 70,
            extreme: 85,
            "no-nac": 0
        },
        hipaa: {
            portnox: 95,
            cisco: 90,
            aruba: 85,
            forescout: 90,
            fortinac: 80,
            juniper: 75,
            securew2: 70,
            microsoft: 70,
            arista: 75,
            foxpass: 65,
            extreme: 80,
            "no-nac": 0
        },
        nist: {
            portnox: 90,
            cisco: 90,
            aruba: 85,
            forescout: 90,
            fortinac: 85,
            juniper: 75,
            securew2: 70,
            microsoft: 75,
            arista: 80,
            foxpass: 65,
            extreme: 85,
            "no-nac": 0
        },
        gdpr: {
            portnox: 95,
            cisco: 85,
            aruba: 80,
            forescout: 85,
            fortinac: 80,
            juniper: 75,
            securew2: 80,
            microsoft: 70,
            arista: 75,
            foxpass: 75,
            extreme: 80,
            "no-nac": 0
        },
        iso: {
            portnox: 95,
            cisco: 90,
            aruba: 85,
            forescout: 85,
            fortinac: 85,
            juniper: 80,
            securew2: 75,
            microsoft: 75,
            arista: 80,
            foxpass: 70,
            extreme: 85,
            "no-nac": 0
        },
        cmmc: {
            portnox: 90,
            cisco: 90,
            aruba: 85,
            forescout: 90,
            fortinac: 85,
            juniper: 75,
            securew2: 70,
            microsoft: 80,
            arista: 80,
            foxpass: 65,
            extreme: 85,
            "no-nac": 0
        },
        ferpa: {
            portnox: 95,
            cisco: 85,
            aruba: 85,
            forescout: 80,
            fortinac: 75,
            juniper: 75,
            securew2: 75,
            microsoft: 70,
            arista: 70,
            foxpass: 70,
            extreme: 75,
            "no-nac": 0
        },
        sox: {
            portnox: 95,
            cisco: 90,
            aruba: 85,
            forescout: 85,
            fortinac: 85,
            juniper: 80,
            securew2: 75,
            microsoft: 75,
            arista: 80,
            foxpass: 70,
            extreme: 85,
            "no-nac": 0
        }
    };
    
    // Cost breakdown structure by vendor
    window.vendorCostStructure = {
        portnox: {
            initialCosts: {
                hardware: 0,
                software: 0,
                implementation: 25,
                training: 5
            },
            recurringCosts: {
                subscription: 55,
                maintenance: 0,
                support: 0,
                operations: 15
            },
            indirectCosts: {
                downtime: 2,
                security: 1,
                compliance: 2
            }
        },
        cisco: {
            initialCosts: {
                hardware: 20,
                software: 15,
                implementation: 10,
                training: 5
            },
            recurringCosts: {
                subscription: 0,
                maintenance: 18,
                support: 10,
                operations: 15
            },
            indirectCosts: {
                downtime: 3,
                security: 2,
                compliance: 2
            }
        },
        aruba: {
            initialCosts: {
                hardware: 18,
                software: 12,
                implementation: 10,
                training: 5
            },
            recurringCosts: {
                subscription: 0,
                maintenance: 15,
                support: 10,
                operations: 20
            },
            indirectCosts: {
                downtime: 4,
                security: 3,
                compliance: 3
            }
        },
        forescout: {
            initialCosts: {
                hardware: 15,
                software: 18,
                implementation: 12,
                training: 5
            },
            recurringCosts: {
                subscription: 0,
                maintenance: 15,
                support: 10,
                operations: 18
            },
            indirectCosts: {
                downtime: 3,
                security: 2,
                compliance: 2
            }
        }
        // Additional vendors would be added similarly
    };
    
    // Function to initialize all vendor data in the UI
    window.initializeVendorData = function() {
        console.log("Initializing vendor data in UI");
        
        // Update vendor grid with all vendors
        updateVendorGrid();
        
        // Initialize vendor comparison data
        initializeVendorComparison();
        
        console.log("Vendor data initialization complete");
    };
    
    // Function to update vendor grid with all vendors
    function updateVendorGrid() {
        const vendorGrid = document.querySelector('.vendor-grid');
        if (!vendorGrid) {
            console.error("Vendor grid not found");
            return;
        }
        
        // Check if we need to add Extreme Networks
        if (!document.querySelector('.vendor-card[data-vendor="extreme"]')) {
            const extremeCard = document.createElement('div');
            extremeCard.className = 'vendor-card';
            extremeCard.setAttribute('data-vendor', 'extreme');
            extremeCard.innerHTML = `
                <div class="vendor-logo">
                    <img src="img/vendors/extreme-logo.png" alt="Extreme Networks">
                </div>
                <div class="vendor-info">
                    <h3>Extreme Networks</h3>
                    <p>Integrated NAC</p>
                </div>
            `;
            vendorGrid.appendChild(extremeCard);
            
            // Add click event listener
            extremeCard.addEventListener('click', function() {
                this.classList.toggle('selected');
            });
        }
    }
    
    // Function to initialize vendor comparison data
    function initializeVendorComparison() {
        // This would populate any vendor comparison UI elements
        
        // For example, update the vendor strengths table if it exists
        const vendorStrengthsTable = document.getElementById('vendor-strengths-table');
        if (vendorStrengthsTable) {
            // Update headers to include all selected vendors
            const headerRow = vendorStrengthsTable.querySelector('thead tr');
            if (headerRow) {
                // Clear existing headers (keep the first one)
                while (headerRow.children.length > 1) {
                    headerRow.removeChild(headerRow.lastChild);
                }
                
                // Add headers for primary vendors
                const primaryVendors = ['portnox', 'cisco', 'aruba', 'forescout', 'extreme'];
                primaryVendors.forEach(vendorId => {
                    const vendor = window.vendorData.find(v => v.id === vendorId);
                    if (vendor) {
                        const th = document.createElement('th');
                        th.textContent = vendor.name;
                        headerRow.appendChild(th);
                    }
                });
            }
            
            // Update rows with capability data
            const capabilities = [
                { name: 'Cloud Architecture', feature: 'cloudNative' },
                { name: 'Zero Trust', feature: 'zeroTrust' },
                { name: 'Deployment Speed', feature: 'deploymentSpeed' },
                { name: 'FTE Requirements', feature: 'staffingRequirements' },
                { name: 'Remote Access', feature: 'remoteAccess' },
                { name: 'Hardware Footprint', feature: 'hardwareRequirements' }
            ];
            
            const tbody = vendorStrengthsTable.querySelector('tbody');
            if (tbody) {
                // Clear existing rows
                tbody.innerHTML = '';
                
                // Add new rows
                capabilities.forEach(capability => {
                    const tr = document.createElement('tr');
                    
                    // Add capability name
                    const tdName = document.createElement('td');
                    tdName.textContent = capability.name;
                    tr.appendChild(tdName);
                    
                    // Add ratings for each vendor
                    primaryVendors.forEach(vendorId => {
                        const td = document.createElement('td');
                        
                        // Get rating if available
                        if (window.vendorFeatures[capability.feature]) {
                            const rating = window.vendorFeatures[capability.feature][vendorId];
                            
                            // Convert numeric rating to text
                            if (rating >= 90) {
                                td.textContent = 'Excellent';
                                if (vendorId === 'portnox') {
                                    td.className = 'highlight-cell';
                                }
                            } else if (rating >= 75) {
                                td.textContent = 'Good';
                            } else if (rating >= 60) {
                                td.textContent = 'Adequate';
                            } else if (rating >= 40) {
                                td.textContent = 'Limited';
                            } else {
                                td.textContent = 'Poor';
                            }
                        } else {
                            // Special handling for non-standard features
                            if (capability.name === 'Remote Access') {
                                if (vendorId === 'portnox') {
                                    td.textContent = 'Built-in';
                                    td.className = 'highlight-cell';
                                } else if (vendorId === 'cisco') {
                                    td.textContent = 'Add-on';
                                } else {
                                    td.textContent = 'Limited';
                                }
                            } else {
                                td.textContent = 'N/A';
                            }
                        }
                        
                        tr.appendChild(td);
                    });
                    
                    tbody.appendChild(tr);
                });
            }
        }
    }
    
    // Initialize vendor data when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        window.initializeVendorData();
        
        // Also fix the vendor-data.json file if needed
        const vendorDataFromJson = {
            "status": "success",
            "data": {
                "vendors": {}
            }
        };
        
        // Populate vendor data
        window.vendorData.forEach(vendor => {
            vendorDataFromJson.data.vendors[vendor.id] = {
                "name": vendor.name,
                "type": vendor.type,
                "threeYearTCO": vendor.threeYearTCO
            };
        });
        
        // If we could write to files, we would update the JSON file here
        // Since we can't, we'll just override the window object that would be loaded from JSON
        window.apiVendorData = vendorDataFromJson;
    });
    
    console.log("📊 Enhanced vendor data initialized successfully");
})();

/**
 * Comprehensive Vendor Database - Fixed Version
 */
window.ComprehensiveVendorDatabase = {
    portnox: {
        id: "portnox",
        name: "Portnox CLEAR",
        company: "Portnox",
        category: "cloud-native",
        architecture: "Pure SaaS Zero Trust",
        score: 94,
        badges: ["Cloud Native", "Zero Trust", "Automated"],
        deployment: {
            time: 4,
            timeDisplay: "4 hours",
            method: "100% Cloud SaaS",
            complexity: "Simple",
            professionalServices: 0,
            training: 0,
            prerequisites: "None"
        },
        pricing: {
            model: "All-inclusive subscription",
            transparent: true,
            perDevice: {
                list: 5.00,
                negotiated: 3.50,
                volume: {
                    "1000": 3.50,
                    "5000": 2.50,
                    "10000": 2.00,
                    "25000": 1.50
                }
            }
        },
        licensing: {
            authentication: {
                "802.1X": { included: true, cost: 0 },
                "MAC-Auth": { included: true, cost: 0 },
                "Certificate": { included: true, cost: 0 },
                "MFA": { included: true, cost: 0 },
                "SAML/OAuth": { included: true, cost: 0 },
                "LDAP/AD": { included: true, cost: 0 }
            }
        },
        infrastructure: {
            servers: { required: false, cost: 0 },
            appliances: { required: false, cost: 0 },
            database: { required: false, cost: 0 },
            loadBalancer: { required: false, cost: 0 }
        },
        operations: {
            fte: 0.25,
            automation: 95,
            maintenanceWindows: 0,
            patching: "Automatic cloud updates",
            endOfLife: "N/A - Continuous updates"
        },
        hiddenCosts: {
            total: 0,
            breakdown: {
                networkRedesign: 0,
                downtime: 0,
                integration: 0,
                scaling: 0,
                consulting: 0
            }
        }
    }
};

// Make it available globally
window.VendorDatabase = window.ComprehensiveVendorDatabase;
console.log('✅ Vendor Database loaded');

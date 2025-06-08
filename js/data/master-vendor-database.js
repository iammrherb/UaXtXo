window.MasterVendorDatabase = {
    portnox: {
        id: "portnox",
        name: "Portnox CLEAR",
        category: "cloud-native",
        score: 94,
        badges: ["Cloud Native", "Zero Trust", "Automated"],
        deployment: { time: 4, timeDisplay: "4 hours" },
        pricing: { perDevice: { negotiated: 3.50 } },
        operations: { fte: 0.25, automation: 95 },
        hiddenCosts: { total: 0, breakdown: {} }
    },
    cisco: {
        id: "cisco",
        name: "Cisco ISE",
        category: "legacy-onprem",
        score: 73,
        badges: ["Legacy", "Complex"],
        deployment: { time: 2160, timeDisplay: "90 days" },
        pricing: { perDevice: { total: 710 } },
        operations: { fte: 2.5, automation: 25 },
        hiddenCosts: { total: 1085000, breakdown: { networkRedesign: 150000 } }
    },
    aruba: {
        id: "aruba",
        name: "Aruba ClearPass",
        category: "legacy-onprem",
        score: 74,
        badges: ["Modular", "Complex"],
        deployment: { time: 1800, timeDisplay: "75 days" },
        pricing: { perDevice: { total: 635 } },
        operations: { fte: 1.5, automation: 40 },
        hiddenCosts: { total: 365000, breakdown: {} }
    },
    microsoft: {
        id: "microsoft",
        name: "Microsoft NPS/Intune",
        category: "hybrid",
        score: 81,
        badges: ["Hybrid", "Microsoft"],
        deployment: { time: 720, timeDisplay: "30 days" },
        pricing: { perDevice: { intuneStandalone: 12 } },
        operations: { fte: 1.0, automation: 60 },
        hiddenCosts: { total: 165000, breakdown: {} }
    },
    juniper: {
        id: "juniper",
        name: "Juniper Mist Access Assurance",
        category: "cloud-managed",
        score: 80,
        badges: ["Cloud Managed", "AI-Driven"],
        deployment: { time: 840, timeDisplay: "35 days" },
        pricing: { perDevice: { wired: 72 } },
        operations: { fte: 0.75, automation: 75 },
        hiddenCosts: { total: 55000, breakdown: {} }
    },
    forescout: {
        id: "forescout",
        name: "Forescout eyeSight",
        category: "agentless",
        score: 74,
        badges: ["Agentless", "Visibility"],
        deployment: { time: 1440, timeDisplay: "60 days" },
        pricing: { perDevice: { annual: 65 } },
        operations: { fte: 1.25, automation: 60 },
        hiddenCosts: { total: 180000, breakdown: {} }
    },
    arista: {
        id: "arista",
        name: "Arista CloudVision",
        category: "cloud-managed",
        score: 78,
        badges: ["Automated", "Cloud Managed"],
        deployment: { time: 720, timeDisplay: "30 days" },
        pricing: { perDevice: { standard: 48 } },
        operations: { fte: 0.75, automation: 80 },
        hiddenCosts: { total: 40000, breakdown: {} }
    },
    securew2: {
        id: "securew2",
        name: "SecureW2",
        category: "cloud-radius",
        score: 76,
        badges: ["Cloud Native", "Certificate-based"],
        deployment: { time: 336, timeDisplay: "14 days" },
        pricing: { perUser: { annual: 24 } },
        operations: { fte: 0.25, automation: 85 },
        hiddenCosts: { total: 180000, breakdown: {} }
    },
    extreme: {
        id: "extreme",
        name: "ExtremeCloud IQ",
        category: "cloud-managed",
        score: 74,
        badges: ["Cloud Managed"],
        deployment: { time: 672, timeDisplay: "28 days" },
        pricing: { perDevice: { pilot: 24 } },
        operations: { fte: 0.5, automation: 70 },
        hiddenCosts: { total: 35000, breakdown: {} }
    },
    foxpass: {
        id: "foxpass",
        name: "Foxpass",
        category: "cloud-radius",
        score: 72,
        badges: ["Cloud Native", "Simple"],
        deployment: { time: 336, timeDisplay: "14 days" },
        pricing: { perUser: { annual: 30 } },
        operations: { fte: 0.25, automation: 80 },
        hiddenCosts: { total: 265000, breakdown: {} }
    },
    fortinet: {
        id: "fortinet",
        name: "FortiNAC",
        category: "security-integrated",
        score: 68,
        badges: ["Security Suite"],
        deployment: { time: 1080, timeDisplay: "45 days" },
        pricing: { perDevice: { base: 40 } },
        operations: { fte: 1.0, automation: 50 },
        hiddenCosts: { total: 75000, breakdown: {} }
    },
    radiusaas: {
        id: "radiusaas",
        name: "RADIUS-as-a-Service",
        category: "cloud-radius",
        score: 68,
        badges: ["Cloud Native", "Basic"],
        deployment: { time: 168, timeDisplay: "7 days" },
        pricing: { perDevice: { annual: 25 } },
        operations: { fte: 0.25, automation: 75 },
        hiddenCosts: { total: 185000, breakdown: {} }
    },
    pulse: {
        id: "pulse",
        name: "Pulse Policy Secure",
        category: "legacy-vpn",
        score: 66,
        badges: ["VPN-focused"],
        deployment: { time: 1080, timeDisplay: "45 days" },
        pricing: { perDevice: { appliance: 85 } },
        operations: { fte: 1.25, automation: 35 },
        hiddenCosts: { total: 95000, breakdown: {} }
    },
    packetfence: {
        id: "packetfence",
        name: "PacketFence",
        category: "open-source",
        score: 49,
        badges: ["Open Source"],
        deployment: { time: 1440, timeDisplay: "60 days" },
        pricing: { perDevice: { software: 0, support: 35 } },
        operations: { fte: 2.0, automation: 20 },
        hiddenCosts: { total: 405000, breakdown: {} }
    }
};
// window.VendorDatabase = window.ComprehensiveVendorDatabase; // This line is removed
console.log('✅ Master Vendor Database loaded with', Object.keys(window.MasterVendorDatabase).length, 'vendors');

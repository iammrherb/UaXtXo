// Configuration and Constants
const CONFIG = {
    defaults: {
        deviceCount: 2500,
        locations: 5,
        yearsToProject: 3,
        fteCost: 120000,
        maintenancePercentage: 0.18
    },
    vendors: {
        cisco: { name: 'Cisco ISE', licenseCost: 35 },
        aruba: { name: 'Aruba ClearPass', licenseCost: 28 },
        forescout: { name: 'Forescout', licenseCost: 32 },
        fortinac: { name: 'FortiNAC', licenseCost: 22 },
        portnox: { name: 'Portnox Cloud', licenseCost: 4 }
    }
};

#!/bin/bash
# =============================================================================
# Enhanced Calculation Engine
# =============================================================================
set -euo pipefail

PROJECT_DIR="$(dirname "$(dirname "$PWD")")"

cat >> "${PROJECT_DIR}/script.js" << 'EOF'

// Comprehensive TCO/ROI Calculation Engine
class TCOCalculator {
    constructor() {
        this.vendorPricing = {
            portnoxCloud: {
                name: "Portnox Cloud",
                baseLicenseCost: 30, // annual per device
                hardwareCost: 0,
                maintenanceCost: 0,
                professionalServices: 0,
                training: 0,
                minimumDevices: 1,
                setupTime: 0.25,
                includedFeatures: ['Conditional Access', 'PKI', 'IoT Profiling', 'TACACS', 'Cloud RADIUS']
            },
            ciscoISE: {
                name: "Cisco ISE",
                baseLicenseCost: 150,
                hardwareCost: 25000,
                maintenanceCost: 0.22,
                professionalServices: 50000,
                training: 15000,
                minimumDevices: 100,
                setupTime: 6
            },
            arubaClearPass: {
                name: "Aruba ClearPass",
                baseLicenseCost: 120,
                hardwareCost: 20000,
                maintenanceCost: 0.20,
                professionalServices: 35000,
                training: 12000,
                minimumDevices: 50,
                setupTime: 4
            },
            forescout: {
                name: "Forescout",
                baseLicenseCost: 80,
                hardwareCost: 15000,
                maintenanceCost: 0.18,
                professionalServices: 25000,
                training: 8000,
                minimumDevices: 100,
                setupTime: 3
            },
            fortiNAC: {
                name: "FortiNAC",
                baseLicenseCost: 45,
                hardwareCost: 12000,
                maintenanceCost: 0.15,
                professionalServices: 15000,
                training: 6000,
                minimumDevices: 25,
                setupTime: 2
            },
            microsoftNPS: {
                name: "Microsoft NPS",
                baseLicenseCost: 0,
                hardwareCost: 8000,
                maintenanceCost: 0.25,
                professionalServices: 20000,
                training: 10000,
                minimumDevices: 1,
                setupTime: 4,
                windowsServerLicense: 1500
            },
            packetFence: {
                name: "PacketFence",
                baseLicenseCost: 0,
                hardwareCost: 6000,
                maintenanceCost: 0.20,
                professionalServices: 30000,
                training: 15000,
                minimumDevices: 1,
                setupTime: 6,
                supportCost: 5000
            },
            freeRADIUS: {
                name: "FreeRADIUS",
                baseLicenseCost: 0,
                hardwareCost: 4000,
                maintenanceCost: 0.30,
                professionalServices: 25000,
                training: 20000,
                minimumDevices: 1,
                setupTime: 8
            },
            aristaCloudVision: {
                name: "Arista CloudVision",
                baseLicenseCost: 100,
                hardwareCost: 18000,
                maintenanceCost: 0.20,
                professionalServices: 40000,
                training: 12000,
                minimumDevices: 100,
                setupTime: 4
            },
            extremeControl: {
                name: "Extreme Control",
                baseLicenseCost: 75,
                hardwareCost: 16000,
                maintenanceCost: 0.18,
                professionalServices: 20000,
                training: 8000,
                minimumDevices: 50,
                setupTime: 3
            }
        };
    }
    
    calculateTCO(vendor, deviceCount, years) {
        const pricing = this.vendorPricing[vendor];
        const effectiveDevices = Math.max(deviceCount, pricing.minimumDevices);
        
        // Initial costs (Year 0)
        const initialCosts = {
            hardware: pricing.hardwareCost,
            implementation: pricing.professionalServices,
            training: pricing.training,
            licensing: vendor === 'portnoxCloud' ? 0 : pricing.baseLicenseCost * effectiveDevices
        };
        
        // Annual costs
        const annualCosts = {
            licensing: vendor === 'portnoxCloud' ? pricing.baseLicenseCost * effectiveDevices : 
                      pricing.baseLicenseCost * effectiveDevices * 0.2,
            maintenance: pricing.hardwareCost * pricing.maintenanceCost,
            support: pricing.supportCost || 0
        };
        
        const totalInitial = Object.values(initialCosts).reduce((a, b) => a + b, 0);
        const totalAnnual = Object.values(annualCosts).reduce((a, b) => a + b, 0);
        
        return {
            initial: totalInitial,
            annual: totalAnnual,
            total: totalInitial + (totalAnnual * years),
            perDevice: (totalInitial + (totalAnnual * years)) / effectiveDevices
        };
    }
    
    calculateROI(currentCosts, newCosts, benefits, years) {
        const savings = (currentCosts - newCosts) + benefits;
        const roi = (savings / newCosts) * 100;
        const paybackPeriod = newCosts / (savings / years);
        
        return { roi, paybackPeriod, totalSavings: savings };
    }
}

// Cyber Insurance Calculator
class CyberInsuranceCalculator {
    calculatePremiumReduction(nacType, companySize) {
        const reductions = {
            portnoxCloud: 0.30,
            advancedNAC: 0.25,
            basicNAC: 0.15,
            noNAC: 0
        };
        
        const basePremiums = {
            small: 5000,
            medium: 25000,
            large: 100000
        };
        
        const basePremium = basePremiums[companySize] || basePremiums.medium;
        const reduction = reductions[nacType] || 0;
        
        return {
            basePremium,
            reducedPremium: basePremium * (1 - reduction),
            annualSavings: basePremium * reduction,
            reductionPercentage: reduction * 100
        };
    }
}

// Export calculators
window.tcoCalculator = new TCOCalculator();
window.insuranceCalculator = new CyberInsuranceCalculator();
EOF

echo "Calculation engine updated successfully"

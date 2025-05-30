/**
 * Real-Time Sync
 * Ensures all components stay synchronized
 */

class RealTimeSync {
    constructor() {
        this.listeners = [];
        this.state = {
            selectedVendors: [],
            configuration: {},
            calculationResults: {}
        };
    }
    
    subscribe(callback) {
        this.listeners.push(callback);
    }
    
    updateState(newState) {
        this.state = { ...this.state, ...newState };
        this.notifyListeners();
    }
    
    notifyListeners() {
        this.listeners.forEach(callback => {
            callback(this.state);
        });
    }
    
    getState() {
        return this.state;
    }
}

window.realTimeSync = new RealTimeSync();

// Auto-sync with platform
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.zeroTrustExecutivePlatform) {
            window.realTimeSync.subscribe((state) => {
                console.log("📡 Syncing state:", state);
            });
        }
    }, 2000);
});

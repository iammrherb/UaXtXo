/**
 * Safe Integration Module
 * Enhances existing functionality without modifying UI
 */
(function(global) {
    'use strict';
    
    const ZeroTrustEnhancements = {
        version: '1.0.0',
        initialized: false,
        config: {},
        modules: {}
    };
    
    class CoreEnhancementModule {
        constructor() {
            this.platform = null;
            this.originalMethods = {};
            this.eventBus = new EventTarget();
        }
        
        init() {
            return new Promise((resolve) => {
                this.waitForPlatform().then(() => {
                    this.preserveOriginalMethods();
                    this.injectEnhancements();
                    this.setupEventMonitoring();
                    console.log('✅ Core Enhancement Module initialized');
                    resolve();
                });
            });
        }
        
        waitForPlatform() {
            return new Promise((resolve) => {
                const checkInterval = setInterval(() => {
                    if (global.zeroTrustExecutivePlatform?.initialized) {
                        this.platform = global.zeroTrustExecutivePlatform;
                        clearInterval(checkInterval);
                        resolve();
                    }
                }, 100);
                
                setTimeout(() => {
                    clearInterval(checkInterval);
                    console.warn('⚠️ Platform not found, running in standalone mode');
                    resolve();
                }, 30000);
            });
        }
        
        preserveOriginalMethods() {
            if (!this.platform) return;
            
            const methodsToPreserve = [
                'createTCOChart', 'createTimelineChart', 'createROIChart',
                'refreshCurrentTab', 'refreshKPIs'
            ];
            
            methodsToPreserve.forEach(method => {
                if (typeof this.platform[method] === 'function') {
                    this.originalMethods[method] = this.platform[method].bind(this.platform);
                }
            });
        }
        
        injectEnhancements() {
            if (!this.platform) return;
            
            this.enhanceMethod('refreshCurrentTab', () => {
                this.eventBus.dispatchEvent(new CustomEvent('refreshTriggered'));
            });
        }
        
        enhanceMethod(methodName, enhancement) {
            if (!this.originalMethods[methodName]) return;
            
            this.platform[methodName] = (...args) => {
                const result = this.originalMethods[methodName](...args);
                setTimeout(() => enhancement(...args), 100);
                return result;
            };
        }
        
        setupEventMonitoring() {
            document.addEventListener('input', (e) => {
                if (e.target.matches('input[type="range"], select')) {
                    this.handleConfigChange(e.target);
                }
            }, true);
        }
        
        handleConfigChange(element) {
            this.eventBus.dispatchEvent(new CustomEvent('configChanged', {
                detail: { id: element.id, value: element.value }
            }));
        }
        
        on(event, callback) {
            this.eventBus.addEventListener(event, callback);
        }
    }
    
    class EnhancementOrchestrator {
        constructor() {
            this.modules = {};
            this.initialized = false;
        }
        
        async init() {
            console.log('🚀 Initializing Zero Trust Platform Enhancements...');
            
            try {
                this.modules.core = new CoreEnhancementModule();
                await this.modules.core.init();
                
                ZeroTrustEnhancements.modules = this.modules;
                ZeroTrustEnhancements.initialized = true;
                
                console.log('✅ Enhancement modules initialized successfully');
            } catch (error) {
                console.error('❌ Enhancement initialization failed:', error);
            }
        }
        
        getAPI() {
            return {
                version: ZeroTrustEnhancements.version,
                initialized: ZeroTrustEnhancements.initialized,
                modules: this.modules,
                on: (event, callback) => this.modules.core?.on(event, callback)
            };
        }
    }
    
    const orchestrator = new EnhancementOrchestrator();
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => orchestrator.init());
    } else {
        orchestrator.init();
    }
    
    global.ZeroTrustEnhancements = {
        ...ZeroTrustEnhancements,
        api: orchestrator.getAPI()
    };
    
})(window);

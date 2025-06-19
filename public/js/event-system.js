// Event System Module
(function() {
    'use strict';
    
    // Wait for ModuleLoader to be available
    function waitForModuleLoader(callback) {
        if (window.ModuleLoader && typeof window.ModuleLoader.register === 'function') {
            callback();
        } else {
            setTimeout(function() {
                waitForModuleLoader(callback);
            }, 10);
        }
    }
    
    class EventSystem {
        constructor() {
            this.events = new Map();
            this.globalHandlers = new Map();
            this.eventHistory = [];
            this.maxHistorySize = 100;
        }
        
        initialize() {
            console.log('[EventSystem] Initializing...');
            this.setupGlobalHandlers();
            return Promise.resolve();
        }
        
        on(event, handler, context = null) {
            if (!this.events.has(event)) {
                this.events.set(event, []);
            }
            
            this.events.get(event).push({
                handler,
                context,
                id: Date.now() + Math.random()
            });
            
            return () => this.off(event, handler);
        }
        
        off(event, handler) {
            if (!this.events.has(event)) return;
            
            const handlers = this.events.get(event);
            const index = handlers.findIndex(h => h.handler === handler);
            
            if (index !== -1) {
                handlers.splice(index, 1);
            }
            
            if (handlers.length === 0) {
                this.events.delete(event);
            }
        }
        
        emit(event, data = {}) {
            // Record event in history
            this.recordEvent(event, data);
            
            // Emit to specific handlers
            if (this.events.has(event)) {
                const handlers = [...this.events.get(event)];
                handlers.forEach(({ handler, context }) => {
                    try {
                        handler.call(context, data);
                    } catch (error) {
                        console.error(`[EventSystem] Error in handler for ${event}:`, error);
                    }
                });
            }
            
            // Emit to global handlers
            this.globalHandlers.forEach((handler, key) => {
                try {
                    handler(event, data);
                } catch (error) {
                    console.error(`[EventSystem] Error in global handler:`, error);
                }
            });
        }
        
        onAny(handler) {
            const id = Date.now() + Math.random();
            this.globalHandlers.set(id, handler);
            return () => this.globalHandlers.delete(id);
        }
        
        recordEvent(event, data) {
            this.eventHistory.push({
                event,
                data,
                timestamp: Date.now()
            });
            
            if (this.eventHistory.length > this.maxHistorySize) {
                this.eventHistory.shift();
            }
        }
        
        getHistory(event = null) {
            if (event) {
                return this.eventHistory.filter(h => h.event === event);
            }
            return [...this.eventHistory];
        }
        
        setupGlobalHandlers() {
            console.log('[EventSystem] ✓ Global handlers configured');
        }
    }
    
    // Create instance
    const eventSystem = new EventSystem();
    
    // Register when ModuleLoader is ready
    waitForModuleLoader(function() {
        window.ModuleLoader.register('EventSystem', eventSystem);
        console.log('[EventSystem] ✓ Registered with ModuleLoader');
    });
    
    // Also expose globally for direct access
    window.EventSystem = eventSystem;
})();

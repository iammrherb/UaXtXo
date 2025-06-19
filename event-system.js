// Event System Module
(function() {
    'use strict';
    
    const EventSystem = {
        events: new Map(),
        
        on(event, handler) {
            if (!this.events.has(event)) {
                this.events.set(event, []);
            }
            this.events.get(event).push(handler);
        },
        
        emit(event, data) {
            if (this.events.has(event)) {
                this.events.get(event).forEach(handler => {
                    try {
                        handler(data);
                    } catch (error) {
                        console.error(`Error in event handler for ${event}:`, error);
                    }
                });
            }
        },
        
        off(event, handler) {
            if (this.events.has(event)) {
                const handlers = this.events.get(event);
                const index = handlers.indexOf(handler);
                if (index > -1) {
                    handlers.splice(index, 1);
                }
            }
        }
    };
    
    // Register with ModuleLoader
    if (window.ModuleLoader && window.ModuleLoader.register) {
        window.ModuleLoader.register('EventSystem', () => EventSystem);
    }
    
    window.EventSystem = EventSystem;
})();

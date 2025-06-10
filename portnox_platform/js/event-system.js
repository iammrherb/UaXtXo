// Event System Module
class EventSystem {
    constructor() {
        this.events = new Map();
        this.debug = true;
        console.log('[EventSystem] Initialized');
    }
    
    on(event, handler) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(handler);
        if (this.debug) {
            console.log(`[EventSystem] Handler registered for: ${event}`);
        }
    }
    
    off(event, handler) {
        if (this.events.has(event)) {
            const handlers = this.events.get(event);
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }
    
    emit(event, data) {
        if (this.debug) {
            console.log(`[EventSystem] Emitting event: ${event}`, data);
        }
        if (this.events.has(event)) {
            this.events.get(event).forEach(handler => {
                try {
                    handler(data);
                } catch (error) {
                    console.error(`[EventSystem] Error in handler for ${event}:`, error);
                }
            });
        }
    }
}

// Register with ModuleLoader
ModuleLoader.register('EventSystem', EventSystem);

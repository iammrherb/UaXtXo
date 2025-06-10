// Enhanced Event System Module
class EventSystem {
    constructor() {
        this.events = new Map();
        this.debug = true;
        this.history = [];
        console.log('[EventSystem] Enhanced Event System initialized');
    }
    
    on(event, handler, context = null) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push({ handler, context });
        if (this.debug) {
            console.log(`[EventSystem] Handler registered for: ${event}`);
        }
        return () => this.off(event, handler); // Return unsubscribe function
    }
    
    off(event, handler) {
        if (this.events.has(event)) {
            const handlers = this.events.get(event);
            const index = handlers.findIndex(h => h.handler === handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }
    
    emit(event, data = {}) {
        if (this.debug) {
            console.log(`[EventSystem] Emitting event: ${event}`, data);
        }
        
        // Add to history
        this.history.push({ event, data, timestamp: Date.now() });
        if (this.history.length > 100) {
            this.history.shift(); // Keep only last 100 events
        }
        
        if (this.events.has(event)) {
            this.events.get(event).forEach(({ handler, context }) => {
                try {
                    if (context) {
                        handler.call(context, data);
                    } else {
                        handler(data);
                    }
                } catch (error) {
                    console.error(`[EventSystem] Error in handler for ${event}:`, error);
                }
            });
        }
        
        // Also emit a wildcard event
        this.emit('*', { event, data });
    }
    
    once(event, handler, context = null) {
        const wrapper = (data) => {
            this.off(event, wrapper);
            if (context) {
                handler.call(context, data);
            } else {
                handler(data);
            }
        };
        this.on(event, wrapper);
    }
    
    getHistory(event = null) {
        if (event) {
            return this.history.filter(h => h.event === event);
        }
        return [...this.history];
    }
}

// Register with ModuleLoader
ModuleLoader.register('EventSystem', EventSystem);

// Replace global eventBus with the real EventSystem when loaded
ModuleLoader.get('EventSystem');
const eventSystem = ModuleLoader.get('EventSystem');
if (eventSystem) {
    window.eventBus = eventSystem;
}

/**
 * Event System
 * Global event bus for inter-module communication
 */
ModuleLoader.register('EventSystem', [], function() {
    class EventSystem {
        constructor() {
            this.events = new Map();
            this.onceEvents = new Map();
            this.eventHistory = [];
            this.maxHistorySize = 100;
        }

        // Subscribe to an event
        on(event, callback, context = null) {
            if (!this.events.has(event)) {
                this.events.set(event, []);
            }
            
            this.events.get(event).push({
                callback,
                context,
                id: Date.now() + Math.random()
            });
            
            return () => this.off(event, callback, context);
        }

        // Subscribe to an event once
        once(event, callback, context = null) {
            const wrappedCallback = (...args) => {
                callback.apply(context, args);
                this.off(event, wrappedCallback, context);
            };
            
            return this.on(event, wrappedCallback, context);
        }

        // Unsubscribe from an event
        off(event, callback = null, context = null) {
            if (!this.events.has(event)) return;
            
            if (!callback) {
                this.events.delete(event);
                return;
            }
            
            const listeners = this.events.get(event);
            const filtered = listeners.filter(listener => {
                return !(listener.callback === callback && listener.context === context);
            });
            
            if (filtered.length > 0) {
                this.events.set(event, filtered);
            } else {
                this.events.delete(event);
            }
        }

        // Emit an event
        emit(event, ...args) {
            // Add to history
            this.addToHistory(event, args);
            
            // Execute listeners
            if (this.events.has(event)) {
                const listeners = [...this.events.get(event)];
                listeners.forEach(listener => {
                    try {
                        listener.callback.apply(listener.context, args);
                    } catch (error) {
                        console.error(`Error in event listener for '${event}':`, error);
                    }
                });
            }
            
            // Execute once listeners
            if (this.onceEvents.has(event)) {
                const onceListeners = [...this.onceEvents.get(event)];
                this.onceEvents.delete(event);
                onceListeners.forEach(listener => {
                    try {
                        listener.callback.apply(listener.context, args);
                    } catch (error) {
                        console.error(`Error in once event listener for '${event}':`, error);
                    }
                });
            }
        }

        // Add event to history
        addToHistory(event, args) {
            this.eventHistory.push({
                event,
                args,
                timestamp: Date.now()
            });
            
            if (this.eventHistory.length > this.maxHistorySize) {
                this.eventHistory.shift();
            }
        }

        // Get event history
        getHistory(event = null) {
            if (event) {
                return this.eventHistory.filter(item => item.event === event);
            }
            return [...this.eventHistory];
        }

        // Clear all events
        clear() {
            this.events.clear();
            this.onceEvents.clear();
            this.eventHistory = [];
        }

        // Get all registered events
        getEvents() {
            return Array.from(this.events.keys());
        }

        // Check if event has listeners
        hasListeners(event) {
            return this.events.has(event) && this.events.get(event).length > 0;
        }
    }
    
    return new EventSystem();
});

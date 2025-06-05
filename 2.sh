#!/bin/bash
# stage-2-core-infrastructure.sh
# Purpose: Create core module loader and configuration system

echo "=================================================="
echo "STAGE 2: CORE INFRASTRUCTURE"
echo "=================================================="

# Create module loader system
echo "→ Creating module loader..."
cat > js/core/module-loader.js << 'EOF'
/**
 * Module Loader System
 * Handles dynamic loading and dependency management
 */
class ModuleLoader {
    constructor() {
        this.modules = new Map();
        this.loadQueue = [];
        this.loadedModules = new Set();
        this.dependencies = new Map();
        this.loadPromises = new Map();
    }

    // Register a module with its dependencies
    register(name, dependencies = [], factory) {
        if (typeof dependencies === 'function') {
            factory = dependencies;
            dependencies = [];
        }
        
        this.modules.set(name, { factory, dependencies });
        this.dependencies.set(name, dependencies);
    }

    // Load a module and its dependencies
    async load(name) {
        // Check if already loaded
        if (this.loadedModules.has(name)) {
            return this.modules.get(name).instance;
        }

        // Check if currently loading
        if (this.loadPromises.has(name)) {
            return this.loadPromises.get(name);
        }

        // Create loading promise
        const loadPromise = this._loadModule(name);
        this.loadPromises.set(name, loadPromise);
        
        try {
            const result = await loadPromise;
            this.loadPromises.delete(name);
            return result;
        } catch (error) {
            this.loadPromises.delete(name);
            throw error;
        }
    }

    async _loadModule(name) {
        const module = this.modules.get(name);
        
        if (!module) {
            throw new Error(`Module '${name}' not found`);
        }

        // Load dependencies first
        const deps = await Promise.all(
            module.dependencies.map(dep => this.load(dep))
        );

        // Create module instance
        const instance = await module.factory(...deps);
        module.instance = instance;
        this.loadedModules.add(name);
        
        console.log(`✓ Loaded module: ${name}`);
        return instance;
    }

    // Load multiple modules
    async loadAll(modules) {
        return Promise.all(modules.map(m => this.load(m)));
    }

    // Get loaded module
    get(name) {
        const module = this.modules.get(name);
        return module ? module.instance : null;
    }

    // Check if module is loaded
    isLoaded(name) {
        return this.loadedModules.has(name);
    }
}

// Create global instance
window.ModuleLoader = new ModuleLoader();
EOF

# Create configuration manager
echo "→ Creating configuration manager..."
cat > js/core/config-manager.js << 'EOF'
/**
 * Configuration Manager
 * Centralized configuration and settings management
 */
ModuleLoader.register('ConfigManager', [], function() {
    class ConfigManager {
        constructor() {
            this.config = {
                // Application settings
                app: {
                    name: 'Portnox Total Cost Analyzer',
                    version: '4.0.0',
                    environment: 'production',
                    debug: false
                },
                
                // Default analysis parameters
                defaults: {
                    devices: 2500,
                    users: 1500,
                    locations: 5,
                    years: 3,
                    industry: 'technology',
                    currency: 'USD',
                    locale: 'en-US'
                },
                
                // API endpoints (if needed)
                api: {
                    baseUrl: '',
                    timeout: 30000
                },
                
                // Feature flags
                features: {
                    advancedAnalytics: true,
                    exportPDF: true,
                    exportPPT: true,
                    exportExcel: true,
                    aiInsights: true,
                    collaboration: false
                },
                
                // Theme settings
                theme: {
                    mode: 'light',
                    primaryColor: '#00D4AA',
                    accentColor: '#FF6B35'
                }
            };
            
            this.listeners = new Map();
            this.loadSavedConfig();
        }

        // Get configuration value
        get(path, defaultValue = null) {
            const keys = path.split('.');
            let value = this.config;
            
            for (const key of keys) {
                if (value && typeof value === 'object' && key in value) {
                    value = value[key];
                } else {
                    return defaultValue;
                }
            }
            
            return value;
        }

        // Set configuration value
        set(path, value) {
            const keys = path.split('.');
            const lastKey = keys.pop();
            let target = this.config;
            
            for (const key of keys) {
                if (!(key in target) || typeof target[key] !== 'object') {
                    target[key] = {};
                }
                target = target[key];
            }
            
            const oldValue = target[lastKey];
            target[lastKey] = value;
            
            // Notify listeners
            this.notifyListeners(path, value, oldValue);
            
            // Save to localStorage
            this.saveConfig();
        }

        // Add configuration listener
        on(path, callback) {
            if (!this.listeners.has(path)) {
                this.listeners.set(path, new Set());
            }
            this.listeners.get(path).add(callback);
        }

        // Remove configuration listener
        off(path, callback) {
            const callbacks = this.listeners.get(path);
            if (callbacks) {
                callbacks.delete(callback);
            }
        }

        // Notify listeners of changes
        notifyListeners(path, newValue, oldValue) {
            // Notify exact path listeners
            const callbacks = this.listeners.get(path);
            if (callbacks) {
                callbacks.forEach(cb => cb(newValue, oldValue, path));
            }
            
            // Notify parent path listeners
            const parts = path.split('.');
            for (let i = parts.length - 1; i > 0; i--) {
                const parentPath = parts.slice(0, i).join('.');
                const parentCallbacks = this.listeners.get(parentPath);
                if (parentCallbacks) {
                    parentCallbacks.forEach(cb => cb(this.get(parentPath), null, parentPath));
                }
            }
        }

        // Save configuration to localStorage
        saveConfig() {
            try {
                localStorage.setItem('portnox-tco-config', JSON.stringify(this.config));
            } catch (error) {
                console.error('Failed to save configuration:', error);
            }
        }

        // Load saved configuration
        loadSavedConfig() {
            try {
                const saved = localStorage.getItem('portnox-tco-config');
                if (saved) {
                    const savedConfig = JSON.parse(saved);
                    this.config = this.mergeConfig(this.config, savedConfig);
                }
            } catch (error) {
                console.error('Failed to load saved configuration:', error);
            }
        }

        // Merge configurations
        mergeConfig(target, source) {
            const result = { ...target };
            
            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                        result[key] = this.mergeConfig(target[key] || {}, source[key]);
                    } else {
                        result[key] = source[key];
                    }
                }
            }
            
            return result;
        }

        // Reset to defaults
        reset() {
            this.config = this.getDefaultConfig();
            this.saveConfig();
            this.notifyListeners('', this.config, null);
        }

        // Get default configuration
        getDefaultConfig() {
            return JSON.parse(JSON.stringify(this.config));
        }
    }
    
    return new ConfigManager();
});
EOF

# Create event system
echo "→ Creating event system..."
cat > js/core/event-system.js << 'EOF'
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
EOF

# Create error handler
echo "→ Creating error handler..."
cat > js/core/error-handler.js << 'EOF'
/**
 * Error Handler
 * Global error handling and reporting
 */
ModuleLoader.register('ErrorHandler', ['EventSystem'], function(EventSystem) {
    class ErrorHandler {
        constructor() {
            this.errors = [];
            this.maxErrors = 50;
            this.setupGlobalHandlers();
        }

        setupGlobalHandlers() {
            // Handle uncaught errors
            window.addEventListener('error', (event) => {
                this.handleError({
                    type: 'uncaught',
                    message: event.message,
                    filename: event.filename,
                    line: event.lineno,
                    column: event.colno,
                    error: event.error
                });
            });

            // Handle promise rejections
            window.addEventListener('unhandledrejection', (event) => {
                this.handleError({
                    type: 'unhandledRejection',
                    message: 'Unhandled Promise Rejection',
                    reason: event.reason,
                    promise: event.promise
                });
            });
        }

        handleError(errorInfo) {
            // Add to error log
            this.errors.push({
                ...errorInfo,
                timestamp: Date.now(),
                userAgent: navigator.userAgent,
                url: window.location.href
            });

            // Trim error log
            if (this.errors.length > this.maxErrors) {
                this.errors = this.errors.slice(-this.maxErrors);
            }

            // Log to console in development
            if (this.isDevelopment()) {
                console.error('Error caught:', errorInfo);
            }

            // Emit error event
            EventSystem.emit('error', errorInfo);

            // Show user notification for critical errors
            if (this.isCriticalError(errorInfo)) {
                this.showErrorNotification(errorInfo);
            }
        }

        isCriticalError(errorInfo) {
            // Define what constitutes a critical error
            return errorInfo.type === 'uncaught' || 
                   errorInfo.message?.includes('Critical') ||
                   errorInfo.message?.includes('Fatal');
        }

        showErrorNotification(errorInfo) {
            // This will be implemented by the UI module
            EventSystem.emit('ui:notification', {
                type: 'error',
                title: 'An error occurred',
                message: this.getUserFriendlyMessage(errorInfo),
                duration: 5000
            });
        }

        getUserFriendlyMessage(errorInfo) {
            // Convert technical errors to user-friendly messages
            if (errorInfo.message?.includes('Network')) {
                return 'Network connection error. Please check your internet connection.';
            }
            if (errorInfo.message?.includes('Not found')) {
                return 'The requested resource could not be found.';
            }
            return 'An unexpected error occurred. Please refresh the page and try again.';
        }

        isDevelopment() {
            return window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1';
        }

        getErrors() {
            return [...this.errors];
        }

        clearErrors() {
            this.errors = [];
        }

        // Custom error logging
        log(message, data = {}, level = 'error') {
            const errorInfo = {
                type: 'custom',
                level,
                message,
                data,
                timestamp: Date.now()
            };

            this.handleError(errorInfo);
        }
    }

    return new ErrorHandler();
});
EOF

echo "✅ Stage 2 Complete: Core infrastructure created"

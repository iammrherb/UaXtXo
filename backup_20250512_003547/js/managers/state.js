// Application State Manager
class StateManager {
    constructor() {
        this.state = {
            currentVendor: null,
            industry: null,
            organization: {},
            costs: {},
            results: {},
            preferences: {
                theme: 'light',
                currency: 'USD',
                units: 'metric'
            }
        };
        
        this.subscribers = [];
        this.init();
    }

    init() {
        this.loadState();
        this.setupEventListeners();
    }

    loadState() {
        const savedState = localStorage.getItem('appState');
        if (savedState) {
            try {
                this.state = { ...this.state, ...JSON.parse(savedState) };
            } catch (error) {
                console.error('Error loading state:', error);
            }
        }
    }

    saveState() {
        try {
            localStorage.setItem('appState', JSON.stringify(this.state));
        } catch (error) {
            console.error('Error saving state:', error);
        }
    }

    getState() {
        return { ...this.state };
    }

    setState(updates) {
        this.state = { ...this.state, ...updates };
        this.saveState();
        this.notifySubscribers();
    }

    subscribe(callback) {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    notifySubscribers() {
        this.subscribers.forEach(callback => callback(this.state));
    }

    setupEventListeners() {
        // Listen for theme changes
        document.addEventListener('themeChanged', (e) => {
            this.setState({
                preferences: {
                    ...this.state.preferences,
                    theme: e.detail.theme
                }
            });
        });

        // Listen for calculation results
        document.addEventListener('calculationComplete', (e) => {
            this.setState({
                results: e.detail.results
            });
        });
    }

    // Convenience methods
    setCurrentVendor(vendor) {
        this.setState({ currentVendor: vendor });
    }

    setIndustry(industry) {
        this.setState({ industry });
    }

    setOrganization(organization) {
        this.setState({ organization });
    }

    setCosts(costs) {
        this.setState({ costs });
    }

    setResults(results) {
        this.setState({ results });
    }

    getPreferences() {
        return this.state.preferences;
    }

    updatePreference(key, value) {
        this.setState({
            preferences: {
                ...this.state.preferences,
                [key]: value
            }
        });
    }

    clearState() {
        this.state = {
            currentVendor: null,
            industry: null,
            organization: {},
            costs: {},
            results: {},
            preferences: this.state.preferences // Keep preferences
        };
        this.saveState();
        this.notifySubscribers();
    }
}

// Initialize state manager
const stateManager = new StateManager();
window.stateManager = stateManager;

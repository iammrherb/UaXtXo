// Loading Manager
class LoadingManager {
    constructor() {
        this.overlay = null;
        this.init();
    }

    init() {
        this.createOverlay();
    }

    createOverlay() {
        this.overlay = document.getElementById('loading-overlay');
        if (!this.overlay) {
            this.overlay = document.createElement('div');
            this.overlay.id = 'loading-overlay';
            this.overlay.className = 'loading-overlay';
            this.overlay.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner"></div>
                    <p>Loading...</p>
                </div>
            `;
            document.body.appendChild(this.overlay);
        }
    }

    show(message = 'Loading...') {
        const text = this.overlay.querySelector('p');
        if (text) {
            text.textContent = message;
        }

        this.overlay.classList.add('active');
        
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
    }

    hide() {
        this.overlay.classList.remove('active');
        
        // Restore scrolling
        document.body.style.overflow = '';
    }

    async withLoading(asyncFunction, message = 'Loading...') {
        this.show(message);
        try {
            const result = await asyncFunction();
            this.hide();
            return result;
        } catch (error) {
            this.hide();
            throw error;
        }
    }
}

// Initialize loading manager
const LoadingManager = new LoadingManager();
window.LoadingManager = LoadingManager;

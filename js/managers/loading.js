// Loading state management
const LoadingManager = {
    show(message = 'Loading...') {
        if (window.EnhancedUI) {
            window.EnhancedUI.showLoading(message);
        }
    },
    
    hide() {
        if (window.EnhancedUI) {
            window.EnhancedUI.hideLoading();
        }
    },
    
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
};

window.LoadingManager = LoadingManager;

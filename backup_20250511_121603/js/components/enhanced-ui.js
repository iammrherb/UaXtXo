// Enhanced UI Components with animations and interactions
const EnhancedUI = {
    // Initialize all UI enhancements
    init() {
        this.initTheme();
        this.initTooltips();
        this.initModals();
        this.initFormEnhancements();
        this.initNotifications();
        this.initLoadingStates();
        this.initScrollEffects();
    },

    // Theme management
    initTheme() {
        const themeToggle = document.getElementById('dark-mode-toggle');
        const body = document.body;
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            this.updateThemeIcon(true);
        }
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                body.classList.toggle('dark-mode');
                const isDarkMode = body.classList.contains('dark-mode');
                localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
                this.updateThemeIcon(isDarkMode);
            });
        }
    },
    
    updateThemeIcon(isDarkMode) {
        const icon = document.querySelector('#dark-mode-toggle i');
        if (icon) {
            icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        }
    },

    // Enhanced tooltips
    initTooltips() {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(tooltip => {
            tooltip.addEventListener('mouseenter', (e) => {
                const text = tooltip.querySelector('.tooltip-text');
                if (text) {
                    gsap.to(text, {
                        opacity: 1,
                        y: -5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            tooltip.addEventListener('mouseleave', (e) => {
                const text = tooltip.querySelector('.tooltip-text');
                if (text) {
                    gsap.to(text, {
                        opacity: 0,
                        y: 0,
                        duration: 0.3,
                        ease: 'power2.in'
                    });
                }
            });
        });
    },

    // Enhanced modals
    initModals() {
        const modals = document.querySelectorAll('.modal');
        
        modals.forEach(modal => {
            const closeButtons = modal.querySelectorAll('.close-button, [data-close-modal]');
            
            closeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    this.closeModal(modal);
                });
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
    },
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            gsap.from(modal.querySelector('.modal-content'), {
                scale: 0.9,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    },
    
    closeModal(modal) {
        gsap.to(modal.querySelector('.modal-content'), {
            scale: 0.9,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                modal.classList.remove('active');
            }
        });
    },

    // Form enhancements
    initFormEnhancements() {
        // Enhanced select dropdowns
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
            select.addEventListener('change', (e) => {
                gsap.to(select, {
                    scale: 1.02,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                });
            });
        });
        
        // Enhanced input fields
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                gsap.to(input, {
                    borderColor: getComputedStyle(document.documentElement)
                        .getPropertyValue('--color-primary'),
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            input.addEventListener('blur', (e) => {
                gsap.to(input, {
                    borderColor: getComputedStyle(document.documentElement)
                        .getPropertyValue('--border-color'),
                    duration: 0.3,
                    ease: 'power2.in'
                });
            });
        });
        
        // Range sliders
        const ranges = document.querySelectorAll('input[type="range"]');
        ranges.forEach(range => {
            const updateRangeValue = () => {
                const value = range.value;
                const max = range.max;
                const percentage = (value / max) * 100;
                const valueDisplay = range.parentElement.querySelector('.range-value');
                
                if (valueDisplay) {
                    valueDisplay.textContent = value;
                    gsap.to(valueDisplay, {
                        x: `${percentage}%`,
                        duration: 0.1,
                        ease: 'power2.out'
                    });
                }
            };
            
            range.addEventListener('input', updateRangeValue);
            updateRangeValue();
        });
    },

    // Notification system
    initNotifications() {
        this.notificationQueue = [];
        this.notificationContainer = document.createElement('div');
        this.notificationContainer.className = 'notification-container';
        document.body.appendChild(this.notificationContainer);
    },
    
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icon = this.getNotificationIcon(type);
        notification.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        this.notificationContainer.appendChild(notification);
        
        // Animate in
        gsap.from(notification, {
            x: 100,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
        
        // Auto remove
        setTimeout(() => {
            this.removeNotification(notification);
        }, duration);
    },
    
    removeNotification(notification) {
        gsap.to(notification, {
            x: 100,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                notification.remove();
            }
        });
    },
    
    getNotificationIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    },

    // Loading states
    initLoadingStates() {
        // Create loading overlay
        this.loadingOverlay = document.createElement('div');
        this.loadingOverlay.className = 'loading-overlay';
        this.loadingOverlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-text">Loading...</div>
            </div>
        `;
        document.body.appendChild(this.loadingOverlay);
    },
    
    showLoading(message = 'Loading...') {
        const spinnerText = this.loadingOverlay.querySelector('.spinner-text');
        spinnerText.textContent = message;
        
        this.loadingOverlay.classList.add('active');
        gsap.from(this.loadingOverlay.querySelector('.loading-spinner'), {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    },
    
    hideLoading() {
        gsap.to(this.loadingOverlay.querySelector('.loading-spinner'), {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                this.loadingOverlay.classList.remove('active');
            }
        });
    },

    // Scroll effects
    initScrollEffects() {
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    gsap.to(window, {
                        duration: 0.8,
                        scrollTo: target,
                        ease: 'power2.inOut'
                    });
                }
            });
        });
        
        // Back to top button
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(backToTop);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            gsap.to(window, {
                duration: 0.8,
                scrollTo: 0,
                ease: 'power2.inOut'
            });
        });
    },

    // Animate numbers
    animateNumbers(element, endValue, options = {}) {
        const defaults = {
            duration: 2,
            prefix: '',
            suffix: '',
            decimals: 0,
            separator: ','
        };
        
        const settings = { ...defaults, ...options };
        
        const countUp = new CountUp(element, endValue, {
            duration: settings.duration,
            useEasing: true,
            useGrouping: true,
            separator: settings.separator,
            decimal: '.',
            decimalPlaces: settings.decimals,
            prefix: settings.prefix,
            suffix: settings.suffix
        });
        
        if (!countUp.error) {
            countUp.start();
        } else {
            console.error(countUp.error);
        }
    },

    // Progress bar animation
    animateProgressBar(element, percentage, duration = 1000) {
        const progress = element.querySelector('.progress');
        if (progress) {
            gsap.to(progress, {
                width: `${percentage}%`,
                duration: duration / 1000,
                ease: 'power2.out'
            });
        }
    },

    // Tab animation
    switchTab(tabId, contentId) {
        const tabs = document.querySelectorAll('.tab-button');
        const contents = document.querySelectorAll('.tab-pane');
        
        tabs.forEach(tab => {
            if (tab.getAttribute('data-tab') === contentId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        contents.forEach(content => {
            if (content.id === contentId) {
                gsap.fromTo(content, 
                    {
                        opacity: 0,
                        x: 20
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.3,
                        display: 'block',
                        ease: 'power2.out'
                    }
                );
            } else {
                gsap.to(content, {
                    opacity: 0,
                    x: -20,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        content.style.display = 'none';
                    }
                });
            }
        });
    }
};

// Export for use in other modules
window.EnhancedUI = EnhancedUI;

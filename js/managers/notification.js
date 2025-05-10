// Notification Manager
if (!window.NotificationManager) {
    class NotificationManagerClass {
        constructor() {
            this.container = null;
            this.init();
        }

        init() {
            this.createContainer();
        }

        createContainer() {
            this.container = document.getElementById('toast-container');
            if (!this.container) {
                this.container = document.createElement('div');
                this.container.id = 'toast-container';
                this.container.className = 'toast-container';
                document.body.appendChild(this.container);
            }
        }

        show(message, type = 'info', duration = 3000) {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            
            const icon = this.getIcon(type);
            
            toast.innerHTML = `
                <i class="${icon}"></i>
                <span>${message}</span>
                <button class="toast-close">&times;</button>
            `;

            this.container.appendChild(toast);

            // Animate in
            if (typeof gsap !== 'undefined') {
                gsap.from(toast, {
                    x: 100,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            // Close button
            const closeBtn = toast.querySelector('.toast-close');
            closeBtn.addEventListener('click', () => this.remove(toast));

            // Auto remove
            if (duration > 0) {
                setTimeout(() => this.remove(toast), duration);
            }

            return toast;
        }

        remove(toast) {
            if (typeof gsap !== 'undefined') {
                gsap.to(toast, {
                    x: 100,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => toast.remove()
                });
            } else {
                toast.remove();
            }
        }

        getIcon(type) {
            const icons = {
                success: 'fas fa-check-circle',
                error: 'fas fa-exclamation-circle',
                warning: 'fas fa-exclamation-triangle',
                info: 'fas fa-info-circle'
            };
            return icons[type] || icons.info;
        }
    }

    // Initialize notification manager
    window.NotificationManager = new NotificationManagerClass();
}

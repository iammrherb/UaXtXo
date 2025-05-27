/**
 * Real-time Collaboration Features
 * Enables team collaboration on TCO analysis
 */

class RealTimeCollaboration {
    constructor() {
        this.sessionId = null;
        this.participants = [];
        this.sharedState = {};
        this.ws = null;
    }
    
    /**
     * Initialize collaboration features
     */
    init() {
        console.log('👥 Initializing Real-time Collaboration...');
        
        // Generate or retrieve session ID
        this.sessionId = this.getSessionId();
        
        // Setup collaboration UI
        this.setupCollaborationUI();
        
        // Initialize WebSocket connection (if backend available)
        this.initializeWebSocket();
        
        // Setup state synchronization
        this.setupStateSynchronization();
        
        console.log('✅ Real-time Collaboration initialized');
    }
    
    /**
     * Get or create session ID
     */
    getSessionId() {
        const urlParams = new URLSearchParams(window.location.search);
        let sessionId = urlParams.get('session');
        
        if (!sessionId) {
            sessionId = this.generateSessionId();
            // Update URL without reload
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('session', sessionId);
            window.history.pushState({}, '', newUrl);
        }
        
        return sessionId;
    }
    
    /**
     * Generate unique session ID
     */
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    /**
     * Setup collaboration UI elements
     */
    setupCollaborationUI() {
        // Create collaboration panel
        const collabPanel = document.createElement('div');
        collabPanel.className = 'collaboration-panel';
        collabPanel.innerHTML = `
            <div class="collab-header">
                <h3><i class="fas fa-users"></i> Team Collaboration</h3>
                <button class="collab-toggle" id="collab-toggle">
                    <i class="fas fa-chevron-down"></i>
                </button>
            </div>
            <div class="collab-content">
                <div class="session-info">
                    <label>Session ID:</label>
                    <div class="session-id-container">
                        <input type="text" value="${this.sessionId}" readonly id="session-id-input">
                        <button onclick="window.realTimeCollaboration.copySessionLink()">
                            <i class="fas fa-copy"></i> Copy Link
                        </button>
                    </div>
                </div>
                
                <div class="participants-section">
                    <h4>Active Participants</h4>
                    <div id="participants-list" class="participants-list">
                        <div class="participant you">
                            <i class="fas fa-user"></i>
                            <span>You</span>
                            <span class="status active"></span>
                        </div>
                    </div>
                </div>
                
                <div class="share-actions">
                    <button class="share-btn" onclick="window.realTimeCollaboration.shareAnalysis()">
                        <i class="fas fa-share-alt"></i> Share Analysis
                    </button>
                    <button class="share-btn" onclick="window.realTimeCollaboration.startPresentation()">
                        <i class="fas fa-presentation"></i> Start Presentation
                    </button>
                </div>
                
                <div class="activity-log">
                    <h4>Activity Log</h4>
                    <div id="activity-log" class="activity-items"></div>
                </div>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(collabPanel);
        
        // Setup toggle
        document.getElementById('collab-toggle').addEventListener('click', () => {
            collabPanel.classList.toggle('collapsed');
        });
        
        // Add collaboration indicators to interactive elements
        this.addCollaborationIndicators();
    }
    
    /**
     * Add visual indicators for collaborative actions
     */
    addCollaborationIndicators() {
        // Add cursors for other users
        document.addEventListener('mousemove', this.throttle((e) => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.broadcastCursorPosition(e.clientX, e.clientY);
            }
        }, 50));
        
        // Add selection indicators
        document.addEventListener('click', (e) => {
            const target = e.target.closest('.vendor-card, .chart-container, .config-item');
            if (target) {
                this.broadcastSelection(target);
            }
        });
    }
    
    /**
     * Initialize WebSocket connection
     */
    initializeWebSocket() {
        // Note: This would connect to a real WebSocket server in production
        // For demo purposes, we'll simulate collaboration features
        
        try {
            // Simulated WebSocket behavior
            this.simulateCollaboration();
        } catch (error) {
            console.warn('WebSocket not available, using local simulation');
            this.simulateCollaboration();
        }
    }
    
    /**
     * Simulate collaboration features
     */
    simulateCollaboration() {
        // Simulate other participants joining
        setTimeout(() => {
            this.addParticipant({
                id: 'user_2',
                name: 'Sarah Chen',
                role: 'Financial Analyst'
            });
            this.logActivity('Sarah Chen joined the session');
        }, 5000);
        
        setTimeout(() => {
            this.addParticipant({
                id: 'user_3',
                name: 'Mike Johnson',
                role: 'IT Director'
            });
            this.logActivity('Mike Johnson joined the session');
        }, 8000);
        
        // Simulate activities
        setTimeout(() => {
            this.logActivity('Sarah Chen selected Cisco ISE for comparison');
            this.simulateRemoteCursor('user_2', 400, 300);
        }, 12000);
        
        setTimeout(() => {
            this.logActivity('Mike Johnson updated device count to 1,500');
            this.updateSharedState('deviceCount', 1500);
        }, 15000);
    }
    
    /**
     * Setup state synchronization
     */
    setupStateSynchronization() {
        // Monitor configuration changes
        const configInputs = document.querySelectorAll('.enhanced-input, .enhanced-select');
        configInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.syncConfigChange(e.target.id, e.target.value);
            });
        });
        
        // Monitor vendor selections
        document.addEventListener('vendorSelectionChanged', (e) => {
            this.syncVendorSelection(e.detail);
        });
    }
    
    /**
     * Copy session link to clipboard
     */
    copySessionLink() {
        const link = window.location.href;
        navigator.clipboard.writeText(link).then(() => {
            this.showNotification('Session link copied to clipboard!');
        });
    }
    
    /**
     * Share current analysis
     */
    shareAnalysis() {
        const analysisData = {
            sessionId: this.sessionId,
            config: window.ultimateExecutiveView?.config,
            selectedVendors: window.ultimateExecutiveView?.selectedVendors,
            timestamp: new Date().toISOString()
        };
        
        // Create shareable link
        const shareData = btoa(JSON.stringify(analysisData));
        const shareUrl = `${window.location.origin}${window.location.pathname}?share=${shareData}`;
        
        // Show share dialog
        this.showShareDialog(shareUrl);
    }
    
    /**
     * Start presentation mode
     */
    startPresentation() {
        document.body.classList.add('presentation-mode');
        
        // Broadcast presentation start
        this.broadcastEvent('presentationStarted', {
            presenter: 'You',
            timestamp: Date.now()
        });
        
        this.logActivity('You started presentation mode');
        
        // Add presentation controls
        this.addPresentationControls();
    }
    
    /**
     * Add presentation controls
     */
    addPresentationControls() {
        const controls = document.createElement('div');
        controls.className = 'presentation-controls';
        controls.innerHTML = `
            <button onclick="window.realTimeCollaboration.previousSlide()">
                <i class="fas fa-chevron-left"></i>
            </button>
            <span class="slide-indicator">Slide 1 of 5</span>
            <button onclick="window.realTimeCollaboration.nextSlide()">
                <i class="fas fa-chevron-right"></i>
            </button>
            <button onclick="window.realTimeCollaboration.endPresentation()">
                <i class="fas fa-times"></i> End
            </button>
        `;
        
        document.body.appendChild(controls);
    }
    
    /**
     * Add participant to the session
     */
    addParticipant(participant) {
        this.participants.push(participant);
        
        const participantEl = document.createElement('div');
        participantEl.className = 'participant';
        participantEl.innerHTML = `
            <i class="fas fa-user"></i>
            <span>${participant.name}</span>
            <span class="role">${participant.role}</span>
            <span class="status active"></span>
        `;
        
        document.getElementById('participants-list').appendChild(participantEl);
        
        // Create cursor for participant
        this.createRemoteCursor(participant.id, participant.name);
    }
    
    /**
     * Log activity
     */
    logActivity(message) {
        const activityEl = document.createElement('div');
        activityEl.className = 'activity-item';
        activityEl.innerHTML = `
            <span class="timestamp">${new Date().toLocaleTimeString()}</span>
            <span class="message">${message}</span>
        `;
        
        const log = document.getElementById('activity-log');
        log.insertBefore(activityEl, log.firstChild);
        
        // Keep only last 10 activities
        while (log.children.length > 10) {
            log.removeChild(log.lastChild);
        }
    }
    
    /**
     * Create remote cursor
     */
    createRemoteCursor(userId, userName) {
        const cursor = document.createElement('div');
        cursor.className = 'remote-cursor';
        cursor.id = `cursor-${userId}`;
        cursor.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M0 0 L0 16 L4 12 L7 19 L10 18 L7 11 L16 11 Z" fill="#FF6B6B"/>
            </svg>
            <span class="cursor-label">${userName}</span>
        `;
        cursor.style.display = 'none';
        
        document.body.appendChild(cursor);
    }
    
    /**
     * Simulate remote cursor movement
     */
    simulateRemoteCursor(userId, x, y) {
        const cursor = document.getElementById(`cursor-${userId}`);
        if (cursor) {
            cursor.style.display = 'block';
            cursor.style.left = x + 'px';
            cursor.style.top = y + 'px';
            
            // Hide after 3 seconds of inactivity
            clearTimeout(cursor.hideTimeout);
            cursor.hideTimeout = setTimeout(() => {
                cursor.style.display = 'none';
            }, 3000);
        }
    }
    
    /**
     * Broadcast cursor position
     */
    broadcastCursorPosition(x, y) {
        this.broadcastEvent('cursorMove', { x, y });
    }
    
    /**
     * Broadcast selection
     */
    broadcastSelection(element) {
        const selector = this.getElementSelector(element);
        this.broadcastEvent('elementSelected', { selector });
        
        // Add selection highlight
        element.classList.add('collaborator-selected');
        setTimeout(() => {
            element.classList.remove('collaborator-selected');
        }, 2000);
    }
    
    /**
     * Get unique selector for element
     */
    getElementSelector(element) {
        if (element.id) return `#${element.id}`;
        if (element.className) return `.${element.className.split(' ')[0]}`;
        return element.tagName.toLowerCase();
    }
    
    /**
     * Broadcast event
     */
    broadcastEvent(type, data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type,
                data,
                sessionId: this.sessionId,
                timestamp: Date.now()
            }));
        }
    }
    
    /**
     * Sync configuration change
     */
    syncConfigChange(inputId, value) {
        this.updateSharedState(inputId, value);
        this.logActivity(`You updated ${inputId} to ${value}`);
    }
    
    /**
     * Sync vendor selection
     */
    syncVendorSelection(vendors) {
        this.updateSharedState('selectedVendors', vendors);
        this.logActivity(`You updated vendor selection`);
    }
    
    /**
     * Update shared state
     */
    updateSharedState(key, value) {
        this.sharedState[key] = value;
        this.broadcastEvent('stateUpdate', { key, value });
    }
    
    /**
     * Show notification
     */
    showNotification(message) {
        if (window.uiWorkflowEnhancements) {
            window.uiWorkflowEnhancements.showNotification(message, 'success');
        }
    }
    
    /**
     * Show share dialog
     */
    showShareDialog(shareUrl) {
        const dialog = document.createElement('div');
        dialog.className = 'share-dialog-modal';
        dialog.innerHTML = `
            <div class="share-dialog">
                <h3>Share Analysis</h3>
                <p>Share this link with your team:</p>
                <input type="text" value="${shareUrl}" readonly>
                <div class="share-options">
                    <button onclick="navigator.clipboard.writeText('${shareUrl}'); window.realTimeCollaboration.showNotification('Link copied!')">
                        <i class="fas fa-copy"></i> Copy Link
                    </button>
                    <button onclick="window.open('mailto:?subject=TCO Analysis&body=' + encodeURIComponent('${shareUrl}'))">
                        <i class="fas fa-envelope"></i> Email
                    </button>
                </div>
                <button class="close-dialog" onclick="this.closest('.share-dialog-modal').remove()">Close</button>
            </div>
        `;
        
        document.body.appendChild(dialog);
    }
    
    /**
     * Throttle function for performance
     */
    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    /**
     * End presentation
     */
    endPresentation() {
        document.body.classList.remove('presentation-mode');
        document.querySelector('.presentation-controls')?.remove();
        this.logActivity('Presentation ended');
    }
}

// Create global instance
window.realTimeCollaboration = new RealTimeCollaboration();

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.realTimeCollaboration.init();
    }, 1500);
});

console.log('✅ Real-time Collaboration features loaded');

// Minimal working executive view to prevent errors
class ExecutiveViewComplete {
  constructor() {
    this.initialized = false;
  }
  
  init() {
    console.log('ExecutiveViewComplete (minimal) initialized');
    this.initialized = true;
    return this;
  }
}

// Create global instance
window.executiveViewComplete = new ExecutiveViewComplete();
console.log('✅ ExecutiveViewComplete minimal class loaded');

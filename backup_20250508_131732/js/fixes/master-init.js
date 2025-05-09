/**
 * Master Initialization Script
 * Coordinates all fixes and ensures proper initialization sequence
 */
(function() {
  console.log('Starting master initialization...');
  
  // Initialization sequence
  const initSequence = [
    'js/fixes/script-coordinator.js',
    'js/fixes/dom-hierarchy-fix.js',
    'js/fixes/resource-fallbacks.js',
    'js/fixes/chart-init-fix.js'
  ];
  
  // Load scripts in sequence
  function loadNextScript(index) {
    if (index >= initSequence.length) {
      console.log('All fix scripts loaded, running final initialization');
      finalizeInitialization();
      return;
    }
    
    const script = document.createElement('script');
    script.src = initSequence[index];
    script.onload = function() {
      console.log(`Loaded fix script: ${initSequence[index]}`);
      loadNextScript(index + 1);
    };
    script.onerror = function() {
      console.error(`Failed to load fix script: ${initSequence[index]}`);
      loadNextScript(index + 1);
    };
    
    document.body.appendChild(script);
  }
  
  // Final initialization steps
  function finalizeInitialization() {
    console.log('Performing final initialization steps');
    
    // Wait for all components to be available
    setTimeout(function() {
      // Initialize charts once
      if (window.initializeAllCharts) {
        window.initializeAllCharts();
      }
      
      // Fix any remaining UI issues
      cleanupUI();
      
      console.log('Master initialization complete');
    }, 1000);
  }
  
  // UI cleanup function
  function cleanupUI() {
    // Remove duplicate elements
    const ids = new Set();
    document.querySelectorAll('[id]').forEach(el => {
      const id = el.id;
      if (ids.has(id)) {
        console.log(`Removing duplicate element with id: ${id}`);
        el.parentNode.removeChild(el);
      } else {
        ids.add(id);
      }
    });
    
    // Remove empty containers
    document.querySelectorAll('.chart-container, .result-card').forEach(container => {
      if (container.children.length === 0) {
        console.log('Removing empty container');
        container.parentNode.removeChild(container);
      }
    });
    
    // Force layout updates
    document.body.style.display = 'none';
    setTimeout(() => {
      document.body.style.display = '';
    }, 50);
  }
  
  // Start loading scripts
  loadNextScript(0);
})();

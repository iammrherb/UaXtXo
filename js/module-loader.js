/**
 * Zero Trust NAC Architecture Designer Pro
 * Module Loader - Ensures proper initialization order for all components
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Module loader ensuring proper initialization sequence...');
  
  // Define module dependencies
  const modules = {
    'comprehensive-enhancement': { 
      dependencies: []  // No dependencies, loads first
    },
    'main': { 
      dependencies: ['comprehensive-enhancement'] 
    },
    'diagram': { 
      dependencies: ['comprehensive-enhancement', 'main'] 
    },
    'workflows': { 
      dependencies: ['comprehensive-enhancement', 'main'] 
    },
    'policies': { 
      dependencies: ['comprehensive-enhancement', 'main'] 
    },
    'timeline': { 
      dependencies: ['comprehensive-enhancement', 'main'] 
    }
  };
  
  // Track loaded modules
  const loadedModules = {};
  
  // Function to check if all dependencies are loaded
  function areDependenciesLoaded(moduleName) {
    const dependencies = modules[moduleName]?.dependencies || [];
    return dependencies.every(dep => loadedModules[dep]);
  }
  
  // Function to initialize a module
  function initializeModule(moduleName) {
    if (loadedModules[moduleName]) return;
    
    console.log(`Initializing module: ${moduleName}`);
    
    // Mark module as loaded
    loadedModules[moduleName] = true;
    
    // Call the module's init function if it exists
    const initFunction = window[`init${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}`];
    if (typeof initFunction === 'function') {
      try {
        initFunction();
      } catch (error) {
        console.error(`Error initializing module ${moduleName}:`, error);
      }
    }
    
    // Check if this enables any dependent modules
    Object.keys(modules).forEach(module => {
      if (!loadedModules[module] && areDependenciesLoaded(module)) {
        initializeModule(module);
      }
    });
  }
  
  // Start by initializing modules with no dependencies
  Object.keys(modules).forEach(module => {
    if (modules[module].dependencies.length === 0) {
      initializeModule(module);
    }
  });
});

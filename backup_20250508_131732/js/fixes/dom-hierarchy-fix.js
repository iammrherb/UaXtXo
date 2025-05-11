/**
 * DOM Hierarchy Fix - Resolves circular DOM references
 */
(function() {
  console.log('Applying DOM hierarchy fixes...');
  
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Fix 1: Check for and resolve circular references
    function fixCircularReferences(element, processed = new Set()) {
      if (!element || processed.has(element)) return;
      processed.add(element);
      
      // Get all child nodes
      const children = Array.from(element.childNodes);
      
      // Check each child for circular references
      children.forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          // If child contains its own parent, detach it
          if (child.contains(element)) {
            console.log('Found circular reference, fixing...');
            element.removeChild(child);
            // Create a cleaned clone of the child
            const cleanChild = child.cloneNode(true);
            // Reattach the clean child
            element.appendChild(cleanChild);
          } else {
            // Continue checking descendants
            fixCircularReferences(child, processed);
          }
        }
      });
    }
    
    // Apply fix to the entire document
    fixCircularReferences(document.body);
    console.log('DOM hierarchy fixes applied');
  });
})();

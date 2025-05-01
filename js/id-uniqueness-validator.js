/**
 * Zero Trust NAC Architecture Designer Pro
 * ID Uniqueness Validator - Ensures all IDs in the document are unique
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Running ID uniqueness validation...');
  
  // Find all elements with IDs
  const elementsWithIds = document.querySelectorAll('[id]');
  const idMap = {};
  let duplicatesFound = 0;
  
  // Check for duplicates
  elementsWithIds.forEach((el, index) => {
    const id = el.id;
    
    if (idMap[id]) {
      console.warn(`Duplicate ID found: "${id}". Fixing...`);
      duplicatesFound++;
      
      // Create a unique ID by appending an index
      const newId = `${id}-unique-${index}`;
      el.id = newId;
      
      // Fix any references to this ID
      document.querySelectorAll(`[href="#${id}"], [data-bs-target="#${id}"]`).forEach(refEl => {
        if (refEl.hasAttribute('href')) {
          refEl.setAttribute('href', `#${newId}`);
        }
        if (refEl.hasAttribute('data-bs-target')) {
          refEl.setAttribute('data-bs-target', `#${newId}`);
        }
      });
    } else {
      idMap[id] = el;
    }
  });
  
  console.log(`ID uniqueness check complete. Found and fixed ${duplicatesFound} duplicate IDs.`);
});

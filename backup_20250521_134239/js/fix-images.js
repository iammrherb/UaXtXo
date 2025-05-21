/**
 * Fix missing images by replacing with SVG versions
 */
document.addEventListener('DOMContentLoaded', function() {
  // Map of PNG files to SVG replacements
  const imageReplacements = {
    'gartner.png': 'img/analysts/gartner.svg',
    'forrester.png': 'img/analysts/forrester.svg',
    'idc.png': 'img/analysts/idc.svg',
    'ema.png': 'img/analysts/ema.svg'
  };
  
  // Replace image sources
  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    
    // Check if this is one of our missing images
    if (src) {
      const filename = src.split('/').pop();
      if (imageReplacements[filename]) {
        img.setAttribute('src', imageReplacements[filename]);
        console.log('Replaced image source: ' + src + ' -> ' + imageReplacements[filename]);
      }
    }
  });
});

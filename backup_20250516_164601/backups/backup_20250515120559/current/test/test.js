console.log('Portnox test script loaded successfully');

// Log browser info
console.log('Browser information:', navigator.userAgent);

// Test DOM manipulation
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Add dynamic element
    const dynamicElement = document.createElement('div');
    dynamicElement.id = 'dynamic-element';
    dynamicElement.innerHTML = '<p>This element was created by JavaScript</p>';
    
    const container = document.querySelector('.test-box:nth-child(3)');
    if (container) {
        container.appendChild(dynamicElement);
        console.log('Dynamic element added');
    } else {
        console.error('Could not find container for dynamic element');
    }
    
    // Set up button
    const button = document.getElementById('test-button');
    const result = document.getElementById('js-result');
    
    if (button && result) {
        button.addEventListener('click', function() {
            result.innerHTML = '<p style="color: green; font-weight: bold;">JavaScript is working correctly!</p>';
            console.log('Button clicked');
        });
        console.log('Button event listener added');
    } else {
        console.error('Button or result element not found');
    }
});

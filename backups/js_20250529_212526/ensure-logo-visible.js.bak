// Ensure Logo Visible
document.addEventListener('DOMContentLoaded', function() {
    const portnoxLogo = document.querySelector('.portnox-logo');
    if (portnoxLogo) {
        // Try to load image
        const img = document.createElement('img');
        img.src = './img/vendors/portnox-logo.png';
        img.alt = 'Portnox';
        img.onerror = function() {
            // If image fails, show text
            portnoxLogo.innerHTML = '<span style="font-size: 2rem; font-weight: 900; color: #00a652;">PORTNOX</span>';
        };
        
        portnoxLogo.innerHTML = '';
        portnoxLogo.appendChild(img);
    }
});

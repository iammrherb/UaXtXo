// Minimal test to verify enhancements are working
window.addEventListener('load', () => {
    setTimeout(() => {
        console.log('🧪 Running minimal integration test...');
        
        if (window.ZeroTrustEnhancements && window.ZeroTrustEnhancements.initialized) {
            console.log('✅ Enhancements loaded successfully');
            console.log('   Version:', window.ZeroTrustEnhancements.api.version);
            console.log('   Modules:', Object.keys(window.ZeroTrustEnhancements.modules));
        } else {
            console.log('⚠️ Enhancements not loaded yet');
        }
        
        if (window.zeroTrustExecutivePlatform) {
            console.log('✅ Executive platform detected');
        } else {
            console.log('⚠️ Executive platform not found');
        }
    }, 3000);
});

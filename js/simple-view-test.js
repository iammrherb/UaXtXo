// Simple view content test
setTimeout(() => {
    const viewContent = document.querySelector('#executive-view .view-content');
    if (viewContent) {
        viewContent.innerHTML = '<h2>Test Content Loaded!</h2><p>If you see this, view rendering works.</p>';
        console.log('✅ Test content added to executive view');
    }
}, 3000);

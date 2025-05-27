// Complete Vendor Data loader with redeclaration guard
if (!window.vendorIds) {
    // Example vendor data; in real deployment this would include all vendor IDs
    window.vendorIds = Object.keys(window.VENDORS || {});
} else {
    console.log('vendorIds already defined, skipping redeclaration');
}

// This script removes HPE from the vendor data
// Run this in the browser console if needed
if (window.ultimateExecutiveView && window.ultimateExecutiveView.vendorData) {
    delete window.ultimateExecutiveView.vendorData.hpe;
    console.log("✅ HPE vendor removed (duplicate of Aruba)");
}

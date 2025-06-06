// Create vendor logo placeholders
const vendors = {
    'portnox': '#00D4AA',
    'cisco': '#1BA0D8',
    'aruba': '#FF8300',
    'microsoft': '#0078D4',
    'juniper': '#0F6FBE',
    'forescout': '#0073B7',
    'arista': '#243854',
    'securew2': '#4A90E2',
    'extreme': '#7B2D81',
    'foxpass': '#FF6B6B',
    'fortinet': '#EE2E24',
    'radiusaas': '#00BCD4',
    'pulse': '#F57C00',
    'packetfence': '#4CAF50'
};

Object.entries(vendors).forEach(([vendor, color]) => {
    const svg = `
<svg width="120" height="40" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" rx="8" fill="${color}"/>
    <text x="60" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white">
        ${vendor.toUpperCase()}
    </text>
</svg>`;
    
    // Convert to base64
    const base64 = btoa(svg);
    console.log(`${vendor}-logo.png: data:image/svg+xml;base64,${base64}`);
});

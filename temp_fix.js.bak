  generateCostBreakdownRows(vendors) {
    const costCategories = ['licensing', 'hardware', 'implementation', 'maintenance', 'personnel', 'downtime', 'training'];
    
    return costCategories.map(category => {
      const row = `<tr>
        <td class="category-name">${this.formatCapabilityName(category)}</td>
        ${Array.from(this.selectedVendors).map(vendorId => {
          const vendor = vendors[vendorId];
          const cost = vendor?.breakdown[category] || 0;
          const isLowest = this.isLowestCost(category, vendorId, vendors);
          return `<td class="${isLowest ? 'highlight-cell' : ''}">${cost > 0 ? "$" + this.formatCurrency(cost) : "Included"}</td>`;
        }).join('')}
      </tr>`;
      return row;
    }).join('') + `
      <tr class="total-row">
        <td><strong>Total TCO</strong></td>
        ${Array.from(this.selectedVendors).map(vendorId => {
          const vendor = vendors[vendorId];
          const isLowest = vendor?.totalTCO === Math.min(...Array.from(this.selectedVendors).map(id => vendors[id]?.totalTCO || Infinity));
          return `<td class="${isLowest ? 'total-savings' : ''}">${vendor ? "$" + this.formatCurrency(vendor.totalTCO) : "N/A"}</td>`;
        }).join('')}
      </tr>
    `;
  }

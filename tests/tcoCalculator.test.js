const { VENDORS } = require('../js/models/vendor-data');

let TcoCalculator;

beforeAll(() => {
  global.window = {};
  TcoCalculator = require('../js/models/calculator').TcoCalculator;
  global.VENDORS = VENDORS;
});

describe('TcoCalculator', () => {
  test('calculateVendorTco returns TCO for Portnox', () => {
    const calculator = new TcoCalculator();
    const result = calculator.calculateVendorTco(VENDORS['portnox']);
    expect(result.vendorName).toBe('Portnox Cloud');
    expect(result.totalTco).toBeGreaterThan(0);
  });

  test('calculate processes selected vendors', () => {
    const calculator = new TcoCalculator();
    const results = calculator.calculate(['portnox']);
    expect(results.vendors.portnox.totalTco).toBeGreaterThan(0);
  });
});

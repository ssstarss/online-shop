const calcDiscountedPrice = require('../src/utils/calcDiscountedPrice');
test('15% discounted price from 100 is 85', () => {
  expect(calcDiscountedPrice(100, 15)).toBe(85);
});

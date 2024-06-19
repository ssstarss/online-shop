const calculateDiscountedRate = require('../src/utils/calcDiscountedRate');
test('discount when orig price is 100 and new price is 75 is 25 percent', () => {
  expect(calculateDiscountedRate(100, 75)).toBe('25');
});

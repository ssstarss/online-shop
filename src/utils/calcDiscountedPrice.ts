export default function calculateDiscountedPrice(
  originalPrice: number,
  discountPercentage: number
) {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discountAmount;
  return finalPrice;
}
module.exports = calculateDiscountedPrice;

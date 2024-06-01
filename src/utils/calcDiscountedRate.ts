export default function calculateDiscountedRate(
  originalPrice: number,
  discountedPrice: number
): string {
  const discount = originalPrice - discountedPrice;
  const discountPercentage = (discount / originalPrice) * 100;
  return Math.round(discountPercentage).toString();
}
module.exports = calculateDiscountedRate;

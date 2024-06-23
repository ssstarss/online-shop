import { connectionByFetch } from '../app/connectionByFetch';

async function getDiscounts() {
  try {
    const response = await connectionByFetch.getDiscountCodes();
    const discount = response.results[0];
    return discount;
  } catch (error: unknown) {
    throw new Error(`Failed to get cart: ${error}`);
  }
}

export default getDiscounts;

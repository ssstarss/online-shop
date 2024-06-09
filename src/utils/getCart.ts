import { connectionByFetch } from '../app/connectionByFetch';

async function getCart() {
  try {
    const response = await connectionByFetch.getCart();
    return response;
  } catch (error: unknown) {
    throw new Error(`Failed to get cart: ${error}`);
  }
}

export default getCart;

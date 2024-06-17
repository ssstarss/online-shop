import { connectionByFetch } from '../app/connectionByFetch';

async function updateCart(productId: string, action: 'plus' | 'minus' | 'remove') {
  try {
    const response = await connectionByFetch.upDateCart(productId, action);
    return response;
  } catch (error: unknown) {
    throw new Error(`Failed to get cart: ${error}`);
  }
}

export default updateCart;

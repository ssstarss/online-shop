import { connectionByFetch } from '../app/connectionByFetch';

async function updateCart(productId: string, action: 'plus' | 'minus' | 'remove') {
  try {
    const response = await connectionByFetch.updateCart(productId, action);
    return response;
  } catch (error: unknown) {
    throw new Error(`Failed to update cart: ${error}`);

    // return new Error(`Failed to update cart: ${error}`);
  }
}

export default updateCart;

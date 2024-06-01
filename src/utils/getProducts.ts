import { connectionByFetch } from '../app/app';

async function getProducts() {
  try {
    const response = await connectionByFetch.getProducts();

    return response;
  } catch (error: unknown) {
    throw new Error('Failed to get product');
  }
}

export default getProducts;

import { connectionByFetch } from '../app/connectionByFetch';

async function getProducts() {
  try {
    const response = await connectionByFetch.getProducts();

    return response;
  } catch (error: unknown) {
    throw new Error(`Failed to get product: ${error}`);
  }
}

export default getProducts;

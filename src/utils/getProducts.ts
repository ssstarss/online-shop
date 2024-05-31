import { connectionByFetch } from '../app/app';

async function getProducts() {
  try {
    const response = await connectionByFetch.getProducts();

    return response;
  } catch (error: unknown) {
    console.log(error);
    throw new Error('Failed to get product');

    return [];
  }
}

export default getProducts;

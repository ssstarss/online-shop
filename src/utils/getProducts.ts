import { connectionByFetch } from '../app/connectionByFetch';
import { GetProductsParams } from '../interfaces/product';

export const productState = { totalProducts: 0 };

async function getProducts(params?: GetProductsParams) {
  try {
    const response = await connectionByFetch.getProducts(params);
    productState.totalProducts = response.total;
    console.log('catalog');
    console.log(response);
    return response;
  } catch (error: unknown) {
    throw new Error(`Failed to get products: ${error}`);
  }
}

export default getProducts;

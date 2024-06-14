import { connectionByFetch } from '../app/connectionByFetch';
import { GetProductsParams } from '../interfaces/product';

async function getProducts(params?: GetProductsParams) {
  try {
    const response = await connectionByFetch.getProducts(params);
    console.log(response);
    return response;
  } catch (error: unknown) {
    throw new Error(`Failed to get product: ${error}`);
  }
}

export default getProducts;

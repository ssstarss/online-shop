import { connectionByFetch } from '../app/connectionByFetch';

async function getDetailedProduct(id: string) {
  try {
    const response = await connectionByFetch.getProductByID(id);

    return response;
  } catch (error: unknown) {
    throw new Error(`Failed to get detailed product: ${error}`);
  }
}

export default getDetailedProduct;

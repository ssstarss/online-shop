import { connectionByFetch } from '../app/connectionByFetch';

async function getCategories() {
  try {
    const response = await connectionByFetch;

    return response;
  } catch (error: unknown) {
    throw new Error(`Failed to get product: ${error}`);
  }
}

export default getCategories;

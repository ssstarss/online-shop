import { connectionByFetch } from '../app/connectionByFetch';

async function getCategories() {
  try {
    const response = await connectionByFetch.getCategories();

    return response;
  } catch (error: unknown) {
    throw new Error(`Failed to get categories: ${error}`);
  }
}

export default getCategories;

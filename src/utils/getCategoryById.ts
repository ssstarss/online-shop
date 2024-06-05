import { connectionByFetch } from '../app/connectionByFetch';

async function getCategoryById(id: string) {
  try {
    const catResponse = await connectionByFetch.getCategoryByID(id);

    return catResponse;
  } catch (error: unknown) {
    throw new Error(`Failed to get detailed product: ${error}`);
  }
}

export default getCategoryById;

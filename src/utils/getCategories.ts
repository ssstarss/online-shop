import { connectionByFetch } from '../app/connectionByFetch';
// import { ICategories } from '../interfaces/categories';

async function getCategories() {
  try {
    const response = await connectionByFetch.getMainCategories();
    console.log(response);

    return response;
  } catch (error: unknown) {
    throw new Error(`Failed to get categories: ${error}`);
  }
}

export default getCategories;

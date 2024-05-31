// import ConnectionByFetch from '../app/connectionByFetch';
import { connectionByFetch } from '../app/app';
// import { IProduct } from '../interfaces/product';

async function getProducts() {
  // const connection = new ConnectionByFetch();

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

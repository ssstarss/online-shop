import ConnectionByFetch from '../app/connectionByFetch';
// import { IProduct } from '../interfaces/product';

async function getProducts() {
  const connection = new ConnectionByFetch();

  try {
    const response = await connection.getProducts();
    console.log(`products:${response}`);

    return response;
  } catch (error: unknown) {
    return [];
  }
}

export default getProducts;

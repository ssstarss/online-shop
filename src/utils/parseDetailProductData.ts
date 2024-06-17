import { DetailedProduct, IdCategory, Image } from '../interfaces/product';
import getCategoryById from './getCategoryById';

export default async function parseDetailedProductData(data: DetailedProduct) {
  const sizes: Record<string, string> = {
    Small: 'S',
    Medium: 'M',
    Large: 'L',
  };

  const product = data;
  const title = product.name['en-US'];
  const { images } = product.masterVariant;
  const imagesLinks: string[] = images.map((image: Image) => image.url);
  const description = product.description['en-US'];
  const sizeOrig: string = product.masterVariant.attributes[0].value.label;
  const size = sizes[sizeOrig];
  const categoryId = product.categories[0].id;
  const categoryResponse: IdCategory = await getCategoryById(categoryId);
  const productId = product.id;
  const { inCart } = product;

  let price = '';
  let prevPrice = '';

  let params: [
    string,
    string,
    string,
    string,
    { name: string; id: string },
    string[],
    string,
    boolean,
    string?,
  ] = [
    title,
    price,
    description,
    size,
    { name: categoryResponse.name['en-US'], id: categoryId },
    imagesLinks,
    productId,
    inCart,
  ];

  if (product.masterVariant.prices[0].discounted !== undefined) {
    price = (product.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(2);
    prevPrice = (product.masterVariant.prices[0].value.centAmount / 100).toFixed(2);
    params = [
      title,
      price,
      description,
      size,
      { name: categoryResponse.name['en-US'], id: categoryId },
      imagesLinks,
      productId,
      inCart,
      prevPrice,
    ];
  } else {
    price = (product.masterVariant.prices[0].value.centAmount / 100).toFixed(2);
    params = [
      title,
      price,
      description,
      size,
      { name: categoryResponse.name['en-US'], id: categoryId },
      imagesLinks,
      productId,
      inCart,
    ];
  }
  return params;
}

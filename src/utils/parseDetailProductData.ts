import { DetailedProduct, Image } from '../interfaces/product';

export default function parseDetailedProductData(data: DetailedProduct) {
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

  let price = '';
  let prevPrice = '';

  let params: [string, string, string, string, string[], string?] = [
    title,
    price,
    description,
    size,
    imagesLinks,
  ];

  if (product.masterVariant.prices[0].discounted !== undefined) {
    price = (product.masterVariant.prices[0].discounted.value.centAmount / 100).toFixed(2);
    prevPrice = (product.masterVariant.prices[0].value.centAmount / 100).toFixed(2);
    params = [title, price, description, size, imagesLinks, prevPrice];
  } else {
    price = (product.masterVariant.prices[0].value.centAmount / 100).toFixed(2);
    params = [title, price, description, size, imagesLinks];
  }
  return params;
}

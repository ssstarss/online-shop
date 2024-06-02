import { GetProductsParams, IProduct } from '../../interfaces/product';
import calculateDiscountedRate from '../../utils/calcDiscountedRate';
import getProducts from '../../utils/getProducts';
import createCatalogCard from '../catalogCard/catalogCard';
import './_catalog.scss';

export default async function generateCatalog(
  catalogCardsContainer: HTMLElement,
  productParams?: GetProductsParams
) {
  const cardsContainer = catalogCardsContainer;
  cardsContainer.innerHTML = '';
  const products = await getProducts(productParams);

  products?.forEach((product: IProduct) => {
    const name = product.name['en-US'];
    const image = product.masterVariant.images[0].url;
    const id = product.id.toString();
    const price = product.masterVariant.prices[0].value.centAmount / 100;
    let discount = false;
    let params: [string, string, string, string, boolean, string, string?, string?] = [
      image,
      '#',
      id,
      name,
      discount,
      price.toFixed(2),
    ];

    if (product.masterVariant.prices[0].discounted !== undefined) {
      discount = true;
      const newPrice = product.masterVariant.prices[0].discounted.value.centAmount / 100;
      const discountRate = calculateDiscountedRate(price, newPrice);
      params = [
        image,
        '#',
        id,
        name,
        discount,
        newPrice.toFixed(2),
        price.toFixed(2),
        discountRate.toString(),
      ];
    } else {
      params = [image, '#', id, name, discount, price.toFixed(2)];
    }
    const card = createCatalogCard(...params);
    cardsContainer.append(card);
  });

  return cardsContainer;
}

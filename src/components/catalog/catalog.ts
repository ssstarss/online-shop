import createElement from '../../helpers/createElement';
import { GetProductsParams, IProduct, IProducts } from '../../interfaces/product';
import calculateDiscountedRate from '../../utils/calcDiscountedRate';
import getProducts from '../../utils/getProducts';
import createCatalogCard from '../catalogCard/catalogCard';
import './_catalog.scss';

export const productParams: GetProductsParams = {};

export default async function generateCatalog(
  catalogCardsContainer: HTMLElement,
  getProductParams?: GetProductsParams
) {
  const cardsContainer = catalogCardsContainer;
  cardsContainer.innerHTML = '';

  try {
    const products: IProducts = await getProducts(getProductParams);
    if (
      (getProductParams?.searchText && products.results.length === 0) ||
      products.results.length === 0
    ) {
      const nothingFoundMessage = createElement({
        tag: 'p',
        className: 'nothing-found',
        textContent: 'Nothing found',
      });
      return nothingFoundMessage;
    }

    products?.results.forEach((product: IProduct) => {
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

      const productDiscount = product.masterVariant.prices[0].discounted;

      if (productDiscount) {
        discount = true;
        const newPrice = productDiscount.value.centAmount / 100;
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
  } catch (error) {
    console.error('Error generating catalog:', error);
    const errorMessage = createElement({
      tag: 'p',
      className: 'error-message',
      textContent: 'Failed to load catalog. Please try again later.',
    });
    cardsContainer.appendChild(errorMessage);
  }

  return cardsContainer;
}

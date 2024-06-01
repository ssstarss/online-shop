import createElement from '../../helpers/createElement';
import createCatalogCard from '../../components/catalogCard/catalogCard';
import getProducts from '../../utils/getProducts';
import './_catalogPage.scss';
import { IProduct } from '../../interfaces/product';
import calculateDiscountedRate from '../../utils/calcDiscountedRate';
const catalogPage = createElement({
  tag: 'section',
  className: 'catalog',
});

export default async function generateCatalog() {
  catalogPage.innerHTML = '';
  const products = await getProducts();

  products?.forEach((product: IProduct) => {
    const name = product.name['en-US'];
    const image = product.masterVariant.images[0].url;
    const id = product.id.toString();
    let price = product.masterVariant.prices[0].value.centAmount / 100;
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
    catalogPage.append(card);
  });
  return catalogPage;
}

import createElement from '../../helpers/createElement';
import createCatalogCard from '../../components/catalogCard/catalogCard';
import getProducts from '../../utils/getProducts';
import './_catalogPage.scss';
import { IProduct } from '../../interfaces/product';
import calculateDiscountedPrice from '../../utils/calcDiscountedPrice';
const catalogPage = createElement({
  tag: 'section',
  className: 'catalog',
});


export default async function generateCatalog() {
  catalogPage.innerHTML = '';
  const products = await getProducts();

  products?.forEach((product: IProduct) => {
    const name = product.masterData.current.name['en-US'];
    const image = product.masterData.current.masterVariant.images[0].url;
    const id = product.id.toString();
    let price = product.masterData.current.masterVariant.prices[0].value.centAmount / 100;
    let discount = false;
    let params: [string, string, string, string, boolean, string, string?, string?] = [
      image,
      '#',
      id,
      name,
      discount,
      price.toFixed(2),
    ];

    if (product.hasOwnProperty('discount')) {
      discount = true;
      const discountRate = product.discount.value.permyriad / 100;
      const newPrice = calculateDiscountedPrice(price, discountRate);
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
      console.log('discount-rate: ' + discountRate);
    } else {
      params = [image, '#', id, name, discount, price.toFixed(2)];
    }
    console.dir(product.discount);
    const card = createCatalogCard(...params);
    catalogPage.append(card);
  });
  return catalogPage;
}

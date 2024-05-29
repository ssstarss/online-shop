import createElement from '../../helpers/createElement';
import createCatalogCard from '../../components/catalogCard/catalogCard';
import getProducts from '../../utils/getProducts';
import './_catalogPage.scss';
const catalogPage = createElement({
  tag: 'section',
  className: 'catalog',
});

export default async function generateCatalog() {
  const products = await getProducts();

  products?.forEach((product) => {
    const name = product.masterData.current.name['en-US'];
    const image = product.masterData.current.masterVariant.images[0].url;
    let discount = false;
    if (product.hasOwnProperty('discount')) {
      discount = true;
    }
    console.log(product.discount);
    const card = createCatalogCard(image, '#', name, discount, '12', '14', '5');
    catalogPage.append(card);
  });
  return catalogPage;
}

// export default catalogPage;

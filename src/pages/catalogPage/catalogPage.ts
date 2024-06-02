import createElement from '../../helpers/createElement';
// import createCatalogCard from '../../components/catalogCard/catalogCard';
// import getProducts from '../../utils/getProducts';
import './_catalogPage.scss';
// import { GetProductsParams, IProduct } from '../../interfaces/product';
// import calculateDiscountedRate from '../../utils/calcDiscountedRate';
// import generateDetailedProductPage from '../detailedProductPage/detailedProductPage';
import generateCatalogHeader from '../../components/catalog/catalogHeader';
import generateCatalog from '../../components/catalog/catalog';

export default async function generateCatalogPage() {
  const catalogPage = createElement({
    tag: 'section',
    className: 'catalog',
  });
  const catalogCards = createElement({ tag: 'section', className: 'catalog-cards' });
  const catalogInner = await generateCatalog(catalogCards);

  const catalogHeader = generateCatalogHeader();
  catalogPage.append(catalogHeader, catalogInner);
  return catalogPage;
}

import createElement from '../../helpers/createElement';
// import createCatalogCard from '../../components/catalogCard/catalogCard';
// import getProducts from '../../utils/getProducts';
import './_catalogPage.scss';
// import { GetProductsParams, IProduct } from '../../interfaces/product';
// import calculateDiscountedRate from '../../utils/calcDiscountedRate';
// import generateDetailedProductPage from '../detailedProductPage/detailedProductPage';
import generateCatalogHeader from '../../components/catalog/catalogHeader';
import generateCatalog from '../../components/catalog/catalog';
import { GetProductsParams } from '../../interfaces/product';
import generateCatalogSidebar from '../../components/catalog/catalogSidebar';

export default async function generateCatalogPage(productParams?: GetProductsParams) {
  const catalogPage = createElement({
    tag: 'section',
    className: 'catalog',
  });
  const catalogCards = createElement({ tag: 'section', className: 'catalog-cards' });
  const catalogInner = await generateCatalog(catalogCards, productParams);

  const sidebar = generateCatalogSidebar();
  const catalogHeader = generateCatalogHeader();
  catalogPage.append(catalogHeader, sidebar, catalogInner);
  return catalogPage;
}

import createElement from '../../helpers/createElement';
import './_catalogPage.scss';
import generateCatalogHeader from '../../components/catalog/catalogHeader';
import generateCatalog from '../../components/catalog/catalog';
import { GetProductsParams } from '../../interfaces/product';
import generateCatalogSidebar from '../../components/catalog/catalogSidebar';

export default async function generateCatalogPage(productParams?: GetProductsParams) {
  const catalogPage = createElement({
    tag: 'section',
    className: 'catalog',
  });
  const catalogHeader = generateCatalogHeader();
  const catalogCards = createElement({ tag: 'section', className: 'catalog-cards' });
  const catalogInner = await generateCatalog(catalogCards, productParams);

  const sidebar = await generateCatalogSidebar();
  if (window.innerWidth <= 1024) {
    sidebar.classList.add('hidden');
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 1024) {
      sidebar.classList.add('hidden');
    } else {
      sidebar.classList.remove('hidden');
    }
  });
  catalogPage.append(catalogHeader, sidebar, catalogInner);

  return catalogPage;
}

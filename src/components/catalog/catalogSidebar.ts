import createElement from '../../helpers/createElement';
import generateCategories from './categories';
import generatePriceRange from './priceRange';

export default async function generateCatalogSidebar() {
  const sidebar = createElement({ tag: 'aside', className: 'catalog__sidebar' });
  const categoriesTitle = createElement({
    tag: 'h2',
    className: 'catalog__sidebar-title',
    textContent: 'Categories',
  });
  const priceTitle = createElement({
    tag: 'h2',
    className: 'catalog__sidebar-title',
    textContent: 'Price Range',
  });
  const categories = await generateCategories();
  const priceRange = generatePriceRange();
  sidebar.append(categoriesTitle, categories, priceTitle, priceRange);

  return sidebar;
}

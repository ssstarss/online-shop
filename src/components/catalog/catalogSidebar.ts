import createElement from '../../helpers/createElement';
import generatePriceRange from './priceRange';

export default function generateCatalogSidebar() {
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
  const priceRange = generatePriceRange();
  sidebar.append(categoriesTitle, priceTitle, priceRange);
  return sidebar;
}

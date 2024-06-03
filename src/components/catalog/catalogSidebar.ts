import createElement from '../../helpers/createElement';
import generatePriceRange from './priceRange';

export default function generateCatalogSidebar() {
  const sidebar = createElement({ tag: 'aside', className: 'catalog__sidebar' });
  const priceTitle = createElement({
    tag: 'h2',
    className: 'catalog__sidebar-title',
    textContent: 'Price Range',
  });
  const priceRange = generatePriceRange();
  sidebar.append(priceTitle, priceRange);
  return sidebar;
}

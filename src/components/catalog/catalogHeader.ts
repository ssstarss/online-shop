import createElement from '../../helpers/createElement';
import generateSelect from '../select/select';

export default function generateCatalogHeader() {
  const catalogHeader = createElement({ tag: 'div', className: 'catalog__header' });
  const breadcrumbs = createElement({ tag: 'div', className: 'breadcrumbs' });
  const breadcrumb = createElement({
    tag: 'a',
    className: 'breadcrumbs__link',
    href: '/catalog',
    textContent: 'catalog',
  });
  breadcrumbs.append(breadcrumb);
  const select = generateSelect();
  catalogHeader.append(breadcrumbs, select);
  return catalogHeader;
}

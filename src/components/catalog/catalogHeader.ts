import createElement from '../../helpers/createElement';
import generateSelect from '../select/select';

export default function generateCatalogHeader() {
  const catalogHeader = createElement({ tag: 'div', className: 'catalog__header' });
  const select = generateSelect();
  catalogHeader.append(select);
  return catalogHeader;
}

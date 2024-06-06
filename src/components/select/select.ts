import createElement from '../../helpers/createElement';
import generateCatalog, { productParams } from '../catalog/catalog';

import './_select.scss';

export default function generateSelect() {
  const selectWrapper = createElement({ tag: 'div', className: 'sort-select' });
  const selectLabel = createElement({
    tag: 'span',
    className: 'sort-select__label',
    textContent: 'Sort by:',
  });
  const select = createElement({
    tag: 'select',
    className: 'sort-select__select',
  }) as HTMLSelectElement;
  const option1 = createElement({
    tag: 'option',
    className: 'sort-select__option',
    value: 'price-low-high',
    textContent: 'Price: Low to High',
    id: 'price-low-high',
  });
  const option2 = createElement({
    tag: 'option',
    className: 'sort-select__option',
    value: 'price-high-low',
    textContent: 'Price: High to Low',
    id: 'price-high-low',
  });
  const option3 = createElement({
    tag: 'option',
    className: 'sort-select__option',
    value: 'name-alph',
    textContent: 'Name: Alphabetically',
    id: 'name-alph',
  });
  const option4 = createElement({
    tag: 'option',
    className: 'sort-select__option',
    value: 'default',
    textContent: 'Default sorting',
    id: 'default',
  });
  option4.setAttribute('selected', '');

  select.append(option1, option2, option3, option4);
  select.addEventListener('change', (event: Event) => {
    const catalogCards = document.querySelector('.catalog-cards') as HTMLElement;
    const target = event?.target as HTMLSelectElement;
    const selectedOption = target.value;
    if (selectedOption === 'price-low-high') {
      productParams.sort = { param: 'price', direction: 'asc' };
    } else if (selectedOption === 'price-high-low') {
      productParams.sort = { param: 'price', direction: 'desc' };
    } else if (selectedOption === 'name-alph') {
      productParams.sort = { param: 'name', direction: 'asc' };
    } else {
      productParams.sort = undefined;
    }
    generateCatalog(catalogCards!, productParams);
  });
  selectWrapper.append(selectLabel, select);
  return selectWrapper;
}

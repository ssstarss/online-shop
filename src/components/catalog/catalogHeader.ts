import createElement from '../../helpers/createElement';
import generateSelect from '../select/select';

export default function generateCatalogHeader() {
  const catalogHeader = createElement({ tag: 'div', className: 'catalog__header' });

  const filterMenu = createElement({ tag: 'button', className: 'filter-menu' });
  filterMenu.innerHTML = `<svg fill='#46a358' width='18' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/></svg>`;

  filterMenu.addEventListener('click', () => {
    const sidebar = document.querySelector('.catalog__sidebar');
    document.body.classList.toggle('no-scroll');
    filterMenu.classList.toggle('open');
    sidebar!.classList.toggle('hidden');
  });
  const breadcrumbs = createElement({ tag: 'div', className: 'breadcrumbs' });
  const breadcrumb = createElement({
    tag: 'a',
    className: 'breadcrumbs__link',
    href: '/catalog',
    textContent: 'catalog',
  });
  breadcrumbs.append(breadcrumb);
  const select = generateSelect();
  catalogHeader.append(filterMenu, breadcrumbs, select);
  return catalogHeader;
}

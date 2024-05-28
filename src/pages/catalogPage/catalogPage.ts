import createElement from '../../helpers/createElement';
import generateDetailedProductPage from '../detailedProductPage/detailedProductPage';

const catalogPage = createElement({
  tag: 'section',
  className: 'catalog',
  textContent: 'CATALOG PAGE',
});

const detailedPage = generateDetailedProductPage();
catalogPage.append(detailedPage);

export default catalogPage;

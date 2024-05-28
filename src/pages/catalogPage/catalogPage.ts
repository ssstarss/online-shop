import createElement from '../../helpers/createElement';
import generateDetailedProductPage from '../detailedProductPage/detailedProductPage';

const catalogPage = createElement({
  tag: 'section',
  className: 'catalog',
  textContent: 'CATALOG PAGE',
});

const detailedPage = generateDetailedProductPage(
  'Barberton Daisy',
  '119',
  'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground.',
  'S',
  '200'
);
catalogPage.append(detailedPage);

export default catalogPage;

import createElement from '../../helpers/createElement';
import createCatalogCard from '../../components/catalogCard/catalogCard';

const catalogPage = createElement({
  tag: 'section',
  className: 'catalog',
  textContent: 'CATALOG PAGE',
});

const card = createCatalogCard(
  'https://www.ikea.com/gb/en/images/products/clusia-potted-plant-clusia__0653977_pe708206_s5.jpg?f=xl',
  '#',
  'Dypsis lutescens',
  '12',
  '14',
  '5'
);
catalogPage.append(card);

export default catalogPage;

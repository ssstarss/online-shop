import createElement from '../../helpers/createElement';
import './catalogCards.scss';

export default function createCatalogCard(
  imgSrc: string,
  productPageLink: string,
  title: string,
  price: string,
  previousPrice: string,
  saleRate: string
) {
  const card = createElement({ tag: 'article', className: 'card' });
  const cardLink = createElement({ tag: 'a', className: 'card__link', href: productPageLink });
  const imgWrapper = createElement({ tag: 'div', className: 'card__inner' });
  const saleTag = createElement({
    tag: 'span',
    className: 'card__sale-tag',
    textContent: `${saleRate}% OFF`,
  });
  const cardImg = createElement({ tag: 'img', className: 'catalog__img', src: imgSrc });
  const cartBtn = createElement({ tag: 'button', className: 'card__cart-btn', type: 'button' });
  const txtSection = createElement({ tag: 'div', className: 'card__txt-wrapper' });
  const cardTitle = createElement({ tag: 'h3', className: 'card__title', textContent: title });
  const priceWrapper = createElement({ tag: 'div', className: 'card__price-wrapper' });
  const mainPrice = createElement({
    tag: 'span',
    className: 'card__main-price',
    textContent: `$${price}`,
  });
  const prevPrice = createElement({
    tag: 'span',
    className: 'card__prev-price',
    textContent: `$${previousPrice}`,
  });
  imgWrapper.append(cardImg, saleTag, cartBtn);
  priceWrapper.append(mainPrice, prevPrice);
  txtSection.append(cardTitle, priceWrapper);
  cardLink.append(imgWrapper, txtSection);
  card.append(cardLink);
  return card;
}

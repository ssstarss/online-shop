import createElement from '../../helpers/createElement';
import getCart from '../../utils/getCart';
import navigate from '../../utils/navigate';
import updateCart from '../../utils/updateCart';
import updateCartInHeader from '../../utils/updateCartInHeader';
import { addToCartLoader } from '../loader/loader';
import './catalogCards.scss';

export default function createCatalogCard(
  imgSrc: string,
  productPageLink: string,
  id: string,
  title: string,
  discount: boolean,
  price: string,
  inCart: boolean,
  previousPrice?: string,
  saleRate?: string
) {
  const card = createElement({ tag: 'article', className: 'card' });
  if (discount === true) {
    card.classList.add('discount');
  }
  const cardLink = createElement({ tag: 'a', className: 'card__link', href: productPageLink });
  cardLink.setAttribute('id', id);
  const linkId = cardLink.getAttribute('id');
  cardLink.addEventListener('click', () => {
    if (linkId !== null) {
      navigate(`catalog/${linkId}`);
    }
  });

  const imgWrapper = createElement({ tag: 'div', className: 'card__inner' });

  const saleTag = createElement({
    tag: 'span',
    className: 'card__sale-tag',
    textContent: `${saleRate}% OFF`,
  });

  const cardImg = createElement({ tag: 'img', className: 'catalog__img', src: imgSrc });
  const cartBtn = createElement({ tag: 'button', className: 'card__cart-btn', type: 'button' });

  if (inCart) {
    cardLink.classList.add('in-cart');
    cartBtn.setAttribute('disabled', '');
  }
  cartBtn.addEventListener('click', async (event) => {
    if (linkId !== null) {
      event.stopPropagation();
      event.preventDefault();
      const cartPreloader = addToCartLoader();
      cardLink.append(cartPreloader);
      try {
        await updateCart(linkId, 'plus');
        const cartResponse = await getCart();
        const totalItemsInCart = cartResponse.totalLineItemQuantity;
        updateCartInHeader(totalItemsInCart);

        cartPreloader.remove();
        cardLink.classList.add('in-cart');
        cartBtn.setAttribute('disabled', '');
      } catch (error) {
        cartPreloader.remove();
        console.error('Error updating cart:', error);
      }
    }
  });
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

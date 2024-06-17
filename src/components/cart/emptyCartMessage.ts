import { bag } from '../../assets/images';
import createElement from '../../helpers/createElement';
import navigate from '../../utils/navigate';

export default function generateEmptyCartMessage() {
  const emptyMessage = createElement({ tag: 'section', className: 'cart__empty' });
  const emptyHeader = createElement({
    tag: 'h2',
    className: 'cart__empty-title',
    textContent: 'Your Cart is Empty',
  });
  const emptyTxt = createElement({
    tag: 'p',
    className: 'cart__empty-txt',
    textContent:
      'Oops! It looks like your cart is empty. Browse our categories and add items to your cart.',
  });
  const emptyLink = createElement({
    tag: 'a',
    className: 'cart__empty-link',
    textContent: 'Go to the catalog.',
  });

  const emptyImg = createElement({
    tag: 'img',
    className: 'cart__empty-img',
    src: bag,
  });

  emptyLink.addEventListener('click', (e) => {
    e.preventDefault();
    navigate('/catalog');
  });

  emptyTxt.append(emptyLink);
  emptyMessage.append(emptyHeader, emptyTxt, emptyImg);
  return emptyMessage;
}

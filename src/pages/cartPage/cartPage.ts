import generateProductItem from '../../components/cart/cartProductItem';
import createElement from '../../helpers/createElement';
import getCart from '../../utils/getCart';
import navigate from '../../utils/navigate';
import { bag } from '../../assets/images';
import './_cartPage.scss';
import getCartItems from '../../utils/getCartItems';

export default async function generateBasketPage() {
  const cartResponse = await getCart();
  console.log('cartResponse');
  console.log(cartResponse);
  const cart = createElement({ tag: 'section', className: 'cart' });
  if (cartResponse === 'Cart is absent') {
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
    cart.append(emptyMessage);
  } else {
    const cartItems = getCartItems(cartResponse);
    const productsTable = createElement({ tag: 'section', className: 'products-table' });
    const productsTableHead = createElement({ tag: 'header', className: 'products-table__header' });
    const productsTableHeaders = ['Products', 'Price', 'Quantity', 'Total', ''];
    productsTableHeaders.forEach((heading) => {
      const headingElem = createElement({
        tag: 'h3',
        className: 'products-table__header-item',
        textContent: heading,
      });
      productsTableHead.append(headingElem);
    });
    productsTable.append(productsTableHead);
    cartItems.forEach((cartItem) => {
      const product = generateProductItem({
        name: cartItem.name['en-US'],
        price: `$${(cartItem.price.value.centAmount / 100).toFixed(2)}`,
        quantity: cartItem.quantity.toString(),
        totalPrice: `$${(cartItem.totalPrice.centAmount / 100).toFixed(2)}`,
        id: cartItem.id,
        img: cartItem.variant.images![0].url,
      });
      productsTable.append(product);
    });

    const totals = createElement({ tag: 'section', className: 'totals' });
    cart.append(productsTable, totals);
  }

  return cart;
}

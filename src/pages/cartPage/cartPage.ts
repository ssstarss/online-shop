import generateProductItem from '../../components/cart/cartProductItem';
import createElement from '../../helpers/createElement';
import getCart from '../../utils/getCart';
import './_cartPage.scss';
import getCartItems from '../../utils/getCartItems';
import generateEmptyCartMessage from '../../components/cart/emptyCartMessage';

export default async function generateBasketPage() {
  const cart = createElement({ tag: 'section', className: 'cart' });
  try {
    const cartResponse = await getCart();
    if (cartResponse === 'Cart is absent') {
      const emptyMessage = generateEmptyCartMessage();
      cart.append(emptyMessage);
    } else {
      const cartItems = getCartItems(cartResponse);
      console.log('cart items');
      console.log(cartItems);
      const productsTable = createElement({ tag: 'section', className: 'products-table' });
      const productsTableHead = createElement({
        tag: 'header',
        className: 'products-table__header',
      });
      const productsTableHeaders = ['Products', 'Price', 'Quantity', 'Total', ''];
      productsTableHeaders.forEach((heading) => {
        const headingElem = createElement({
          tag: 'h3',
          className: ['products-table__header-item', heading.toLowerCase()],
          textContent: heading,
        });
        productsTableHead.append(headingElem);
      });
      productsTable.append(productsTableHead);
      cartItems.forEach((cartItem) => {
        const product = generateProductItem({
          name: cartItem.name['en-US'],
          price: cartItem.price,
          quantity: cartItem.quantity.toString(),
          totalPrice: cartItem.totalPrice.centAmount / 100,
          productId: cartItem.productId,
          id: cartItem.id,
          img: cartItem.variant.images![0].url,
        });
        productsTable.append(product);
      });

      const totals = createElement({ tag: 'section', className: 'totals' });
      cart.append(productsTable, totals);
    }
  } catch (error) {
    console.log('Error in generating cart:', error);
  }

  return cart;
}

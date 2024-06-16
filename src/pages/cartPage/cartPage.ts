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
      const cartTotalTitle = createElement({
        tag: 'h2',
        className: 'totals__title',
        textContent: 'Cart Totals',
      });
      const coupon = createElement({ tag: 'div', className: 'coupon' });
      const couponLabel = createElement({
        tag: 'label',
        className: 'coupon__label',
        for: 'coupon-input',
        textContent: 'Coupon Apply',
      });
      const couponInner = createElement({ tag: 'div', className: 'coupon__inner' });
      const couponInput = createElement({
        tag: 'input',
        className: 'coupon__input',
        type: 'text',
        id: 'coupon-input',
        placeholder: 'Enter coupon code here...',
      });
      const couponBtn = createElement({
        tag: 'button',
        className: 'coupon__btn',
        textContent: 'Apply',
        type: 'button',
      });

      const couponDiscount = createElement({ tag: 'div', className: 'coupon__discount-wrapper' });
      const couponDiscountSubtitle = createElement({
        tag: 'span',
        className: 'coupon__discount-title',
        textContent: 'Coupon Discount',
      });
      const couponDiscountAmount = createElement({
        tag: 'span',
        className: 'coupon__discount-amount',
        textContent: '(-) 00.00',
      });

      const total = createElement({ tag: 'div', className: 'totals__total' });
      const totalTitle = createElement({
        tag: 'h3',
        className: 'total__title',
        textContent: 'Total',
      });
      const totalPrice = createElement({
        tag: 'span',
        className: 'total__price',
        textContent: `$${(cartResponse.totalPrice.centAmount / 100).toFixed(2)}`,
      });

      const continueShoppingBtn = createElement({
        tag: 'button',
        className: 'totals__continue-btn',
        textContent: 'Continue Shopping',
        type: 'button',
      });

      const clearCartBtn = createElement({
        tag: 'button',
        className: 'totals__clear-cart',
        textContent: 'Clear Cart',
        type: 'button',
      });

      total.append(totalTitle, totalPrice);
      couponInner.append(couponInput, couponBtn);
      coupon.append(couponLabel, couponInner);
      couponDiscount.append(couponDiscountSubtitle, couponDiscountAmount);
      totals.append(
        cartTotalTitle,
        coupon,
        couponDiscount,
        total,
        continueShoppingBtn,
        clearCartBtn
      );
      cart.append(productsTable, totals);
    }
  } catch (error) {
    console.log('Error in generating cart:', error);
  }

  return cart;
}

import generateProductItem, {
  deleteCart,
  updateTotalPrice,
} from '../../components/cart/cartProductItem';
import createElement from '../../helpers/createElement';
import getCart from '../../utils/getCart';
import './_cartPage.scss';
import getCartItems from '../../utils/getCartItems';
import generateEmptyCartMessage from '../../components/cart/emptyCartMessage';
import { generateClearCartPopup } from '../../components/popups/popup';
import navigate from '../../utils/navigate';
import generateDiscountBanner from '../../components/banner/dicountBanner';
import getDiscounts from '../../utils/getDiscounts';
import { connectionByFetch } from '../../app/connectionByFetch';

export default async function generateBasketPage() {
  const cart = createElement({ tag: 'section', className: 'cart' });
  const cartInner = createElement({ tag: 'div', className: 'cart__inner' });
  try {
    const cartResponse = await getCart();
    const promo = await getDiscounts();
    if (promo) {
      const banner = generateDiscountBanner(promo);
      cart.append(banner);
    }
    if (cartResponse === 'Cart is absent') {
      const emptyMessage = generateEmptyCartMessage();
      cart.append(emptyMessage);
    } else if (!cartResponse.totalLineItemQuantity) {
      deleteCart();
    } else {
      const cartItems = getCartItems(cartResponse);
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

      const couponStatusMessage = createElement({ tag: 'span', className: 'coupon__status' });
      const prevPrice = createElement({ tag: 'div', className: ['totals__prev', 'hidden'] });
      const previousPriceTitle = createElement({
        tag: 'h4',
        className: 'totals__prev-title',
        textContent: 'Original price:',
      });
      const previousPriceAmount = createElement({
        tag: 'span',
        className: 'totals__prev-amount',
        textContent: `$${0.0}`,
      });

      couponBtn.addEventListener('click', async () => {
        const { value } = couponInput;
        try {
          const promoResponse = await connectionByFetch.applyDiscountCode(value);
          if (promoResponse === 'Bad code') {
            couponStatusMessage.textContent = 'Wrong promocode';
            couponStatusMessage.classList.remove('success');
            couponStatusMessage.classList.add('error');
            couponBtn.removeAttribute('disabled');
            couponInput.removeAttribute('disabled');
          } else {
            couponStatusMessage.textContent = 'Promo code has been successfully applied';
            couponStatusMessage.classList.remove('error');
            couponStatusMessage.classList.add('success');
            prevPrice.classList.remove('hidden');
            couponInput.setAttribute('disabled', '');
            couponBtn.setAttribute('disabled', '');
            const cartResponse2 = await getCart();
            const newTotal = updateTotalPrice(cartResponse2);
            if (newTotal) {
              const discountedAmount =
                cartResponse2.discountOnTotalPrice.discountedAmount.centAmount / 100;
              const prevPriceCalced = newTotal + discountedAmount;
              previousPriceAmount.textContent = `$${prevPriceCalced.toFixed(2)}`;
            }
          }
        } catch (error) {
          console.log(`Error in applying promo:${error}`);
        }
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

      if (cartResponse.discountOnTotalPrice) {
        couponStatusMessage.textContent = 'Promo code has been successfully applied';
        couponStatusMessage.classList.remove('error');
        couponStatusMessage.classList.add('success');
        prevPrice.classList.remove('hidden');
        couponInput.setAttribute('disabled', '');
        couponInput.value = promo.code;
        couponBtn.setAttribute('disabled', '');
        const newTotal = cartResponse.totalPrice.centAmount / 100;
        const discountedAmount =
          cartResponse.discountOnTotalPrice.discountedAmount.centAmount / 100;
        const prevPriceCalced = newTotal + discountedAmount;
        previousPriceAmount.textContent = `$${prevPriceCalced.toFixed(2)}`;
      }

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

      continueShoppingBtn.addEventListener('click', () => {
        navigate('/catalog');
      });

      clearCartBtn.addEventListener('click', async () => {
        generateClearCartPopup();
      });

      prevPrice.append(previousPriceTitle, previousPriceAmount);

      total.append(totalTitle, totalPrice);
      couponInner.append(couponInput, couponBtn);
      coupon.append(couponLabel, couponInner, couponStatusMessage);
      totals.append(cartTotalTitle, coupon, prevPrice, total, continueShoppingBtn, clearCartBtn);
      cartInner.append(productsTable, totals);
      cart.append(cartInner);
    }
  } catch (error) {
    console.log('Error in generating cart:', error);
  }

  return cart;
}

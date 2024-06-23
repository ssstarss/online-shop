import { Cart } from '@commercetools/platform-sdk';

export default function getCartItems(cart: Cart) {
  const cartObj = cart;
  const cartItems = cartObj.lineItems;
  return cartItems;
}

import { Cart } from '@commercetools/platform-sdk';

export default function getCartItems(cart: Cart) {
  const cartObj = cart;
  const cartItems = cartObj.lineItems;
  console.log(cartItems);
  return cartItems;
}

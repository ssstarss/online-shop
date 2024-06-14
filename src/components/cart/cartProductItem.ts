import { Price } from '@commercetools/platform-sdk';
import createElement from '../../helpers/createElement';
import getCart from '../../utils/getCart';
import updateCart from '../../utils/updateCart';
import updateCartInHeader from '../../utils/updateCartInHeader';

export default function generateProductItem(productData: {
  name: string;
  price: Price;
  quantity: string;
  totalPrice: number;
  productId: string;
  id: string;
  img?: string;
}) {
  const product = createElement({ tag: 'article', className: 'product-cart' });
  let productPriceData: number;
  let currentProductTotalPrice: number = productData.totalPrice;
  if (productData.price.discounted) {
    productPriceData = productData.price.discounted.value.centAmount / 100;
  } else {
    productPriceData = productData.price.value.centAmount / 100;
  }
  const productInner = createElement({
    tag: 'div',
    className: ['product-cart__inner', 'products'],
  });
  const productImg = createElement({
    tag: 'img',
    className: 'product-cart__img',
    src: productData.img,
  });
  const productName = createElement({
    tag: 'h4',
    className: 'product-cart__title',
    textContent: productData.name,
  });
  productInner.append(productImg, productName);
  const productPrice = createElement({
    tag: 'span',
    className: ['product-cart__price', 'price'],
    textContent: `$${productPriceData.toFixed(2)}`,
  });
  const productCounter = createElement({
    tag: 'div',
    className: ['product-cart__counter', 'quantity'],
  });
  const productCounterBtnMin = createElement({
    tag: 'button',
    className: 'product-cart__counter-btn',
    id: 'product-cart-minus',
    textContent: '-',
  });

  const productCounterAmount = createElement({
    tag: 'span',
    className: 'product-cart__counter-amount',
    textContent: productData.quantity,
  });
  const productCounterBtnPlus = createElement({
    tag: 'button',
    className: 'product-cart__counter-btn',
    id: 'product-cart-plus',
    textContent: '+',
  });

  const productTotalPrice = createElement({
    tag: 'span',
    className: ['product-cart__total-price', 'total'],
    textContent: `$${currentProductTotalPrice.toFixed(2)}`,
  });

  if (productCounterAmount.textContent === '1') {
    productCounterBtnMin.setAttribute('disabled', 'true');
  }

  productCounterBtnMin.addEventListener('click', async () => {
    if (productCounterAmount.textContent === '2') {
      productCounterBtnMin.setAttribute('disabled', 'true');
    } else {
      productCounterBtnMin.removeAttribute('disabled');
    }
    try {
      await updateCart(productData.id, 'minus');
      const cartResponse = await getCart();
      const totalItemsInCart = cartResponse.totalLineItemQuantity;
      updateCartInHeader(totalItemsInCart);
      const prevCount = Number(productCounterAmount.textContent);
      productCounterAmount.textContent = (prevCount - 1).toString();
      productTotalPrice.textContent = `$${(currentProductTotalPrice -= productPriceData).toFixed(2)}`;
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  });

  productCounterBtnPlus.addEventListener('click', async () => {
    if (productCounterAmount.textContent === '1') {
      productCounterBtnMin.removeAttribute('disabled');
    }
    try {
      await updateCart(productData.productId, 'plus');
      const cartResponse = await getCart();
      const totalItemsInCart = cartResponse.totalLineItemQuantity;
      updateCartInHeader(totalItemsInCart);
      const prevCount = Number(productCounterAmount.textContent);
      productCounterAmount.textContent = (prevCount + 1).toString();
      productTotalPrice.textContent = `$${(currentProductTotalPrice += productPriceData).toFixed(2)}`;
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  });

  const productDeleteBtn = createElement({
    tag: 'button',
    className: 'product-cart__delete',
  });

  productDeleteBtn.addEventListener('click', async () => {
    product.remove();
    try {
      await updateCart(productData.id, 'remove');
      const cartResponse = await getCart();
      const totalItemsInCart = cartResponse.totalLineItemQuantity;
      updateCartInHeader(totalItemsInCart);
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  });

  productCounter.append(productCounterBtnMin, productCounterAmount, productCounterBtnPlus);
  product.append(productInner, productPrice, productCounter, productTotalPrice, productDeleteBtn);
  return product;
}

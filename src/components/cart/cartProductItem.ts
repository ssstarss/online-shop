import createElement from '../../helpers/createElement';
import updateCart from '../../utils/updateCart';

export default function generateProductItem(productData: {
  name: string;
  price: string;
  quantity: string;
  totalPrice: string;
  id: string;
  img?: string;
}) {
  const product = createElement({ tag: 'article', className: 'product-cart' });
  const productInner = createElement({ tag: 'div', className: 'product-cart__inner' });
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
    className: 'product-cart__price',
    textContent: productData.price,
  });
  const productCounter = createElement({ tag: 'div', className: 'product-cart__counter' });
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
    className: 'product-cart__total-price',
    textContent: productData.totalPrice,
  });

  const productDeleteBtn = createElement({
    tag: 'button',
    className: 'product-cart__delete',
  });

  productDeleteBtn.addEventListener('click', () => {
    updateCart(productData.id, 'remove');
    product.remove();
  });

  productCounter.append(productCounterBtnMin, productCounterAmount, productCounterBtnPlus);
  product.append(productInner, productPrice, productCounter, productTotalPrice, productDeleteBtn);
  return product;
}

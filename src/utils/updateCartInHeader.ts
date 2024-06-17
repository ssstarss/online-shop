export default function updateCartInHeader(productsAmountInCart: number) {
  if (productsAmountInCart) {
    const svg = document.querySelector('.header__basket svg') as SVGSVGElement;
    const productCounterExisting = document.getElementById('cart-counter');
    if (productCounterExisting) {
      productCounterExisting.textContent = productsAmountInCart.toString();
    } else {
      const productCounter = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      productCounter.setAttribute('x', (23).toString());
      productCounter.setAttribute('y', (9).toString());
      productCounter.setAttribute('font-family', 'CeraPro');
      productCounter.setAttribute('font-size', '11');
      productCounter.setAttribute('fill', 'white');
      productCounter.setAttribute('text-anchor', 'middle');
      productCounter.setAttribute('dominant-baseline', 'middle');

      productCounter.id = 'cart-counter';
      productCounter.textContent = productsAmountInCart.toString();
      svg.append(productCounter);
    }
  } else {
    const productCounterExisting = document.getElementById('cart-counter');
    if (productCounterExisting) {
      productCounterExisting.textContent = '';
    }
  }
}

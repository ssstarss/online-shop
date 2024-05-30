import './_detailedProductPage.scss';
import { generateProductSlider } from '../../components/productSlider/productSlider';
import createElement from '../../helpers/createElement';

export default function generateDetailedProductPage(
  title: string,
  price: string,
  description: string,
  size: string,
  prevPrice?: string
) {
  const detailedSection = createElement({ tag: 'section', className: 'detailed-product' });
  const sliderBlock = createElement({ tag: 'div', className: 'slider-section' });
  const slider = generateProductSlider();

  // // initializeSwiper();

  // setTimeout(() => {
  //   initializeSwiper();
  // }, 1000);

  const productInfoSection = createElement({ tag: 'div', className: 'product-info' });
  const productHeader = createElement({ tag: 'div', className: 'product-info__header' });
  const productTitle = createElement({
    tag: 'h1',
    className: 'product-info__title',
    textContent: title,
  });
  const productPriceWrapper = createElement({
    tag: 'div',
    className: 'product-info__price-wrapper',
  });
  const productPrice = createElement({
    tag: 'span',
    className: 'product-info__actual-price',
    textContent: `$${price}`,
  });
  const productPricePrev = createElement({
    tag: 'span',
    className: 'product-info__prev-price',
    textContent: `$${prevPrice}`,
  });
  const productSubtitle = createElement({
    tag: 'h2',
    className: ['product-info__subtitle', 'product-info__subtitle--desc'],
    textContent: 'Description:',
  });

  const productDesc = createElement({
    tag: 'p',
    className: 'product-info__desc',
    textContent: description,
  });
  const productSubtitle2 = createElement({
    tag: 'h2',
    className: ['product-info__subtitle', 'product-info__subtitle--size'],
    textContent: 'Size:',
  });
  const productSize = createElement({
    tag: 'span',
    className: 'product-info__size',
    textContent: size,
  });
  const productBuyBtns = createElement({ tag: 'div', className: 'product-info__btns' });
  const butBtn = createElement({
    tag: 'button',
    className: 'product-info__buy-btn',
    type: 'button',
    textContent: 'But now',
  });
  const addToCartBtn = createElement({
    tag: 'button',
    className: 'product-info__add-btn',
    type: 'button',
    textContent: 'Add to cart',
  });

  // const propList = createElement({ tag: 'ul', className: 'product-info__prop-list' });

  productPriceWrapper.append(productPrice, productPricePrev);
  productHeader.append(productTitle, productPriceWrapper);
  productBuyBtns.append(butBtn, addToCartBtn);
  productInfoSection.append(
    productHeader,
    productSubtitle,
    productDesc,
    productSubtitle2,
    productSize,
    productBuyBtns
  );

  sliderBlock.append(slider);
  detailedSection.append(sliderBlock, productInfoSection);
  return detailedSection;
}

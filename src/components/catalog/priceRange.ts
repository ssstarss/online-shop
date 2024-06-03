import createElement from '../../helpers/createElement';
import generateCatalog from './catalog';

export default function generatePriceRange() {
  const range = createElement({ tag: 'div', className: 'price-range' });
  // Create price-content div
  const priceContent = createElement({
    tag: 'div',
    className: 'price-content',
  });

  const priceLabel = createElement({
    tag: 'span',
    className: 'price-content__label',
    textContent: 'Price:',
  });

  const minValueElement = createElement({
    tag: 'p',
    className: '',
    id: 'min-value',
    textContent: '$5',
  });

  const divider = createElement({
    tag: 'span',
    className: 'price-content__divider',
    textContent: '-',
  });

  const maxValueElement = createElement({
    tag: 'p',
    className: '',
    id: 'max-value',
    textContent: '$150',
  });

  priceContent.append(priceLabel, minValueElement, divider, maxValueElement);

  const rangeSlider = createElement({
    tag: 'div',
    className: 'range-slider',
  });

  const rangeFill = createElement({
    tag: 'div',
    className: 'range-fill',
  });

  const minPriceInput = createElement({
    tag: 'input',
    className: 'min-price',
    type: 'range',
    value: '5',
    min: '5',
    max: '500',
    step: '5',
  });

  const maxPriceInput = createElement({
    tag: 'input',
    className: 'max-price',
    type: 'range',
    value: '150',
    min: '10',
    max: '500',
    step: '5',
  });

  const submitBtn = createElement({
    tag: 'button',
    className: 'price-range__submit',
    type: 'button',
    textContent: 'Filter',
  });

  submitBtn.addEventListener('click', () => {
    const catalogCards = document.querySelector('.catalog-cards') as HTMLElement;
    const minValue = +minPriceInput.value * 100;
    const maxValue = +maxPriceInput.value * 100;
    generateCatalog(catalogCards, { filterPrice: { higherThen: minValue, lowerThen: maxValue } });
  });

  const minValue = minValueElement;
  const maxValue = maxValueElement;
  const rangeFillElement = rangeFill;

  function validateRange() {
    let minPrice = parseInt(minPriceInput.value, 10);
    let maxPrice = parseInt(maxPriceInput.value, 10);

    if (minPrice > maxPrice) {
      const tempValue = maxPrice;
      maxPrice = minPrice;
      minPrice = tempValue;
      minPriceInput.value = minPrice.toString();
      maxPriceInput.value = maxPrice.toString();
    }

    const minPercentage = ((minPrice - 5) / 495) * 100;
    const maxPercentage = ((maxPrice - 5) / 495) * 100;

    rangeFillElement.style.left = `${minPercentage}%`;
    rangeFillElement.style.width = `${maxPercentage - minPercentage}%`;

    minValue.innerHTML = `$ ${minPrice}`;
    maxValue.innerHTML = `$ ${maxPrice}`;
  }

  const inputElements = [minPriceInput, maxPriceInput];

  inputElements.forEach((element) => {
    element.addEventListener('input', validateRange);
  });

  validateRange();
  rangeSlider.append(rangeFill, minPriceInput, maxPriceInput);
  range.append(rangeSlider, priceContent, submitBtn);
  return range;
}

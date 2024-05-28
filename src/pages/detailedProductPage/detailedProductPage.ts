import {
  generateProductSlider,
  initializeSwiper,
} from '../../components/productSlider/productSlider';
import createElement from '../../helpers/createElement';

export default function generateDetailedProductPage() {
  const detailedSection = createElement({ tag: 'section', className: 'detailed-product' });
  const sliderBlock = createElement({ tag: 'div', className: 'slider-section' });
  const slider = generateProductSlider();

  // initializeSwiper();

  setTimeout(() => {
    initializeSwiper();
  }, 1000);

  sliderBlock.append(slider);
  detailedSection.append(sliderBlock);
  return detailedSection;
}

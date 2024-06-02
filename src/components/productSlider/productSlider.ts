// import Swiper from 'swiper';
import Swiper from 'swiper';
import { Thumbs } from 'swiper/modules';
import 'swiper/css/bundle';
import createElement from '../../helpers/createElement';
import './_productSlider.scss';

Swiper.use([Thumbs]);

export function generateProductSlider() {
  const swipersContainer = createElement({ tag: 'div', className: 'swipers-container' });
  const swiper1 = createElement({
    tag: 'div',
    className: 'swiper mySwiper2',
    textContent: '',
  });

  const swiperWrapper1 = createElement({
    tag: 'div',
    className: 'swiper-wrapper',
    textContent: '',
  });

  const imageSources = [
    'https://swiperjs.com/demos/images/nature-1.jpg',
    'https://swiperjs.com/demos/images/nature-2.jpg',
    'https://swiperjs.com/demos/images/nature-3.jpg',
    'https://swiperjs.com/demos/images/nature-4.jpg',
    'https://swiperjs.com/demos/images/nature-5.jpg',
    'https://swiperjs.com/demos/images/nature-6.jpg',
  ];

  imageSources.forEach((src) => {
    const slide = createElement({
      tag: 'div',
      className: 'swiper-slide',
      textContent: '',
    });
    const img = createElement({
      tag: 'img',
      className: '',
      src,
    });
    slide.appendChild(img);
    swiperWrapper1.appendChild(slide);
  });

  swiper1.appendChild(swiperWrapper1);

  const swiper2 = createElement({
    tag: 'div',
    className: 'swiper mySwiper',
    textContent: '',
  });
  swiper2.setAttribute('thumbsSlider', '');

  const swiperWrapper2 = createElement({
    tag: 'div',
    className: 'swiper-wrapper',
    textContent: '',
  });

  imageSources.forEach((src) => {
    const slide = createElement({
      tag: 'div',
      className: 'swiper-slide',
      textContent: '',
    });
    const img = createElement({
      tag: 'img',
      className: '',
      src,
    });
    slide.appendChild(img);
    swiperWrapper2.appendChild(slide);
  });

  swiper2.appendChild(swiperWrapper2);

  swipersContainer.append(swiper1, swiper2);

  //

  return swipersContainer;
}
export default generateProductSlider;

export function initializeSwiper() {
  // eslint-disable-next-line no-new
  const swiper = new Swiper('.mySwiper', {
    loop: true,
    spaceBetween: 16,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    direction: 'vertical',
  });
  // eslint-disable-next-line
  let swiper2 = new Swiper('.mySwiper2', {
    direction: 'vertical',
    loop: true,
    spaceBetween: 16,
    thumbs: {
      swiper,
    },
  });
}

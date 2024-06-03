// import Swiper from 'swiper';
import Swiper from 'swiper';
import { Thumbs, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import createElement from '../../helpers/createElement';
import { search } from '../../assets/icons/index';

import './_productSlider.scss';
import { generateSliderPopup } from '../popups/popup';

Swiper.use([Thumbs, Navigation, Pagination]);

function generatePopupSwiper(images: string[]) {
  const swiperPopup = createElement({
    tag: 'div',
    className: 'swiper swiperPopup',
    textContent: '',
  });

  const swiperWrapperPopup = createElement({
    tag: 'div',
    className: 'swiper-wrapper',
    textContent: '',
  });
  images.forEach((src) => {
    const slidePopup = createElement({
      tag: 'div',
      className: ['swiper-slide', 'product__slide-popup'],
      textContent: '',
    });

    const slidePopupImg = createElement({
      tag: 'img',
      className: 'product__slide-img',
      src,
    });

    slidePopup.append(slidePopupImg);
    swiperWrapperPopup.append(slidePopup);
  });
  const slidePopupNavPrev = createElement({
    tag: 'div',
    className: ['swiper-popup-button-prev', 'swiper-button-prev'],
  });
  const slidePopupNavNext = createElement({
    tag: 'div',
    className: ['swiper-popup-button-next', 'swiper-button-next'],
  });
  const slidePopupPagination = createElement({
    tag: 'div',
    className: ['swiper-pagination', 'swiper-popup-pagination'],
  });
  swiperPopup.append(
    swiperWrapperPopup,
    slidePopupNavPrev,
    slidePopupNavNext,
    slidePopupPagination
  );
  return swiperPopup;
}

export function generateProductSlider(images: string[]) {
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
  const slideMainPagination = createElement({
    tag: 'div',
    className: ['swiper-pagination', 'swiper-product-pagination'],
  });

  const imageSources = images;

  imageSources.forEach((src) => {
    const slide = createElement({
      tag: 'div',
      className: ['swiper-slide', 'product__slide', 'product__slide--main'],
      textContent: '',
    });
    const zoomIcon = createElement({ tag: 'span', className: 'product__zoom-icon' });
    zoomIcon.innerHTML = search;

    const img = createElement({
      tag: 'img',
      className: 'product__slide-img',
      src,
    });

    slide.append(img, zoomIcon);
    slide.addEventListener('click', () => {
      const popupSlider = generatePopupSwiper(imageSources);
      generateSliderPopup(popupSlider);
      // eslint-disable-next-line
      const swiper3 = new Swiper('.swiperPopup', {
        loop: true,
        spaceBetween: 16,
        navigation: {
          nextEl: '.swiper-popup-button-next',
          prevEl: '.swiper-popup-button-prev',
        },
        pagination: {
          el: '.swiper-popup-pagination',
          type: 'bullets',
        },
        breakpoints: {
          1024: {
            pagination: undefined,
          },
        },
      });
    });
    swiperWrapper1.appendChild(slide);
  });

  swiper1.append(swiperWrapper1, slideMainPagination);

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
      className: ['swiper-slide', 'product__slide'],
      textContent: '',
    });
    const img = createElement({
      tag: 'img',
      className: 'product__slide-img',
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
    pagination: {
      el: '.swiper-product-pagination',
      type: 'bullets',
    },
    breakpoints: {
      1024: {
        pagination: undefined,
      },
    },
    thumbs: {
      swiper,
    },
  });
}

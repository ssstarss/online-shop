import Swiper from 'swiper';
import { Pagination, Autoplay, Mousewheel, Navigation, Keyboard } from 'swiper/modules';
import createElement from '../../helpers/createElement';
import { renderSlide, slide1, slide2, slide3 } from './previewSlideOne';

Swiper.use([Pagination, Autoplay, Mousewheel, Navigation, Keyboard]);

const swiperContainer = createElement({ tag: 'div', className: 'swiper' });
const swiperWrapper = createElement({ tag: 'div', className: 'swiper-wrapper' });

const slides = [slide1, slide2, slide3];
slides.forEach((slide) => {
  const swiperSlide = createElement({ tag: 'div', className: 'swiper-slide' });

  swiperSlide.append(renderSlide(slide));

  swiperWrapper.append(swiperSlide);
});
const swiperPagination = createElement({ tag: 'div', className: 'swiper-pagination' });
const swiperButtonPrev = createElement({ tag: 'div', className: 'swiper-button-prev' });
const swiperButtonNext = createElement({ tag: 'div', className: 'swiper-button-next' });

swiperContainer.append(swiperWrapper, swiperPagination, swiperButtonPrev, swiperButtonNext);

setTimeout(() => {
  // eslint-disable-next-line no-new
  new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    speed: 1000,
    preventClicks: true,
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    effect: 'paralax',
    cubeEffect: {
      slideShadows: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    mousewheel: {
      enabled: true,
      eventsTarget: '.swiper',
    },
    updateOnWindowResize: true,
  });
}, 0);

export default swiperContainer;

import { previewImg, previewImgSlide2, previewImgSlide3 } from '../../assets/images';
import createElement from '../../helpers/createElement';
import navigate from '../../utils/navigate';

interface Slide {
  title: string;
  titleAccent: string;
  description: string;
  src: string;
}

export const slide1 = {
  title: "Let's Make a Better ",
  titleAccent: 'Planet',
  description:
    'We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create a unique Urban Jungle. Order your favorite plants!',
  src: previewImg,
};

export const slide2 = {
  title: 'Our ',
  titleAccent: 'Advantages',
  description:
    'Explore our diverse range of plants, from exotic species to popular favorites. Find exactly what you’re looking for!',
  src: previewImgSlide2,
};

export const slide3 = {
  title: 'Urban ',
  titleAccent: 'Jungle Inspiration',
  description:
    'Turn your home into an urban jungle with our curated plant collection. Plants improve air quality, reduce stress, and boost creativity.',
  src: previewImgSlide3,
};

export function renderSlide(slide: Slide) {
  const previewContainer = createElement({ tag: 'div', className: 'preview' });

  const textContainer = createElement({ tag: 'div', className: 'preview__text' });
  const textWelcome = createElement({
    tag: 'p',
    className: 'preview__text-welcome',
    textContent: 'WELCOME TO GREENSHOP',
  });
  const textTitle = createElement({
    tag: 'h1',
    className: 'preview__text-title',
    textContent: slide.title,
  });
  const textAccent = createElement({
    tag: 'span',
    className: 'preview__text-title__accent',
    textContent: slide.titleAccent,
  });
  textTitle.append(textAccent);

  const textDescription = createElement({
    tag: 'p',
    className: 'preview__text-description',
    textContent: slide.description,
  });

  const buttonShopNow = createElement({
    tag: 'button',
    className: 'preview__text-btn button',
    textContent: 'SHOP NOW',
  });
  buttonShopNow.addEventListener('click', (event) => {
    event.preventDefault();
    navigate('/catalog');
  });

  textContainer.append(textWelcome, textTitle, textDescription, buttonShopNow);

  const imgContainer = createElement({ tag: 'div', className: 'preview__img-wrap' });

  const imgPreview = createElement({
    tag: 'img',
    className: 'preview__img',
    src: slide.src,
    title: 'Preview img',
  });

  imgContainer.append(imgPreview);
  previewContainer.append(textContainer, imgContainer);

  return previewContainer;
}

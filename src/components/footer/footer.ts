import { themeOneImg, themeThreeImg, themeTwoImg } from '../../assets/images';
import createElement from '../../helpers/createElement';

const footerContainer = createElement({ tag: 'footer', className: 'footer container' });
const newslettersBlock = createElement({ tag: 'div', className: 'footer__newsletters' });
const newslettersTitle = createElement({
  tag: 'h3',
  className: 'footer__newsletters-title',
  textContent: 'Would you like to join newsletters?',
});
const newslettersInputGroup = createElement({ tag: 'div', className: 'footer__newsletters-group' });
const newslettersInput = createElement({
  tag: 'input',
  className: 'footer__newsletters-input',
  type: 'email',
  placeholder: 'enter your email address...',
});
const newslettersJoin = createElement({
  tag: 'button',
  className: 'footer__newsletters-button button',
  type: 'submit',
  textContent: 'Join',
});

newslettersInputGroup.append(newslettersInput, newslettersJoin);
const newslettersDesc = createElement({
  tag: 'p',
  className: 'footer__newsletters-desc',
  textContent:
    'We usually post offers and challenges in newsletter. We’re your online houseplant destination. We offer a wide range of houseplants and accessories shipped directly from our (green)house to yours!',
});
newslettersBlock.append(newslettersTitle, newslettersInputGroup, newslettersDesc);
const themeContainer = createElement({ tag: 'div', className: 'footer__theme-container' });

const themeOne = createElement({ tag: 'div', className: 'footer__theme' });
const themeOneImage = createElement({
  tag: 'img',
  className: 'footer__theme-img',
  src: themeOneImg,
});
const themeOneTitle = createElement({
  tag: 'h3',
  className: 'footer__theme-title',
  textContent: 'Garden Care',
});
const themeOneDescription = createElement({
  tag: 'p',
  className: 'footer__theme-desc',
  textContent: 'We are an online plant shop offering a wide range of cheap and trendy plants.',
});
themeOne.append(themeOneImage, themeOneTitle, themeOneDescription);

const themeTwo = createElement({ tag: 'div', className: 'footer__theme' });
const themeTwoImage = createElement({
  tag: 'img',
  className: 'footer__theme-img',
  src: themeTwoImg,
});
const themeTwoTitle = createElement({
  tag: 'h3',
  className: 'footer__theme-title',
  textContent: 'Plant Renovation',
});
const themeTwoDescription = createElement({
  tag: 'p',
  className: 'footer__theme-desc',
  textContent: 'We are an online plant shop offering a wide range of cheap and trendy plants.',
});

themeTwo.append(themeTwoImage, themeTwoTitle, themeTwoDescription);

const themeThree = createElement({ tag: 'div', className: 'footer__theme' });
const themeThreeImage = createElement({
  tag: 'img',
  className: 'footer__theme-img',
  src: themeThreeImg,
});
const themeThreeTitle = createElement({
  tag: 'h3',
  className: 'footer__theme-title',
  textContent: 'Watering Graden',
});
const themeThreeDescription = createElement({
  tag: 'p',
  className: 'footer__theme-desc',
  textContent: 'We are an online plant shop offering a wide range of cheap and trendy plants.',
});
themeThree.append(themeThreeImage, themeThreeTitle, themeThreeDescription);

themeContainer.append(themeOne, themeTwo, themeThree);
footerContainer.append(themeContainer, newslettersBlock);

export default footerContainer;

import { callingSvg, locationSvg, logoSvg, messageSvg } from '../../assets/icons';
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
const footerContactsContainer = createElement({ tag: 'div', className: 'footer__contacts' });
const footerLogo = createElement({
  tag: 'div',
  className: 'footer__contacts-logo',
});
footerLogo.innerHTML = logoSvg;

const footerLocation = createElement({
  tag: 'div',
  className: 'footer__contacts-img',
});
footerLocation.innerHTML = locationSvg;
const footerLocationText = createElement({
  tag: 'a',
  className: 'footer__contacts-text',
  textContent: '70 West Buckingham Ave. Farmingdale, NY 11735',
  href: 'https://www.google.com/maps/search/70+West+Buckingham+Ave.+Farmingdale,+NY+11735/@40.7317583,-73.4582906,15z/data=!3m1!4b1?entry=ttu',
});
footerLocation.append(footerLocationText);

const footerMessage = createElement({
  tag: 'div',
  className: 'footer__contacts-img',
});
footerMessage.innerHTML = messageSvg;
const footerMessageText = createElement({
  tag: 'a',
  className: 'footer__contacts-text',
  textContent: 'contact@greenshop.com',
  href: 'mailto:contact@greenshop.com',
});

const footerCalling = createElement({
  tag: 'div',
  className: 'footer__contacts-img',
});
footerCalling.innerHTML = callingSvg;
const footerCallingText = createElement({
  tag: 'a',
  className: 'footer__contacts-text',
  textContent: '+88 01911 717 490',
  href: 'tel:+8801911717490',
});

footerCalling.append(footerCallingText);
footerMessage.append(footerMessageText);
footerLocation.append(footerLocationText);
footerContactsContainer.append(footerLogo, footerLocation, footerMessage, footerCalling);
const footerOne = createElement({ tag: 'div', className: 'footer__wrap' });
footerOne.append(themeContainer, newslettersBlock);
footerContainer.append(footerOne, footerContactsContainer);

export default footerContainer;

import createElement from '../../helpers/createElement';
import { basket, login, logoSvg, search } from '../../assets/icons/index';

const header = createElement({ tag: 'header', className: 'header container' });
export const logoLink = createElement({ tag: 'a', className: 'logo__link' });
logoLink.innerHTML = logoSvg;
logoLink.title = 'Home';
const headerLinksList = createElement({ tag: 'ul', className: 'header__links-list' });

export const headerLinkHome = createElement({
  tag: 'li',
  className: 'header__list-item home-link active-header',
  textContent: 'Home',
});

export const headerLinkCatalog = createElement({
  tag: 'li',
  className: 'header__list-item catalog-link',
  textContent: 'Catalog',
});

export const headerLinkBlogs = createElement({
  tag: 'li',
  className: 'header__list-item blogs-link',
  textContent: 'Blogs',
});

headerLinksList.append(headerLinkHome, headerLinkCatalog, headerLinkBlogs);

const linkWrap = createElement({ tag: 'div', className: 'header__wrap' });
export const searchLink = createElement({ tag: 'a', className: 'header__search' });
searchLink.innerHTML = search;
export const basketLink = createElement({ tag: 'a', className: 'header__basket' });
basketLink.innerHTML = basket;

export const loginButton = createElement({
  tag: 'a',
  className: 'header__login button',
});
loginButton.innerHTML = login;
const loginText = createElement({
  tag: 'span',
  className: 'header__login-text',
  textContent: 'Login',
});
loginButton.append(loginText);

// burger
export const burgerMenu = createElement({ tag: 'button', className: 'burger-menu' });
const burgerMenuLine = createElement({ tag: 'span', className: 'burger-menu__line' });
burgerMenu.append(
  burgerMenuLine.cloneNode(),
  burgerMenuLine.cloneNode(),
  burgerMenuLine.cloneNode()
);

// Creating new elements for the mobile menu
const mobileLinksList = createElement({ tag: 'ul', className: 'mobile__links-list' });
export const mobileLinkHome = createElement({
  tag: 'li',
  className: 'mobile__list-item home-link active',
  textContent: 'Home',
});
export const mobileLinkCatalog = createElement({
  tag: 'li',
  className: 'mobile__list-item catalog-link',
  textContent: 'Catalog',
});
export const mobileLinkBlogs = createElement({
  tag: 'li',
  className: 'mobile__list-item blogs-link',
  textContent: 'Blogs',
});
export const mobileSearchLink = createElement({
  tag: 'li',
  className: 'mobile__list-item mobile__search',
  textContent: 'Search',
});
export const mobileBasketLink = createElement({
  tag: 'li',
  className: 'mobile__list-item mobile__basket',
  textContent: 'Basket',
});

export const mobileLoginButton = createElement({
  tag: 'li',
  className: 'mobile__list-item mobile__login',
  textContent: 'Login',
});

mobileLinksList.append(
  mobileLinkHome,
  mobileLinkCatalog,
  mobileLinkBlogs,
  mobileSearchLink,
  mobileBasketLink,
  mobileLoginButton
);

export const mobileMenu = createElement({ tag: 'div', className: 'mobile-menu' });
mobileMenu.append(mobileLinksList);

linkWrap.append(searchLink, basketLink, loginButton);
header.append(logoLink, headerLinksList, linkWrap, burgerMenu, mobileMenu);

export default header;

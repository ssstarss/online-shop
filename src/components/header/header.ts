import createElement from '../../helpers/createElement';
import { basket, login, logoSvg, search } from '../../assets/icons/index';

const header = createElement({ tag: 'header', className: 'header container' });
export const logoLink = createElement({ tag: 'a', className: 'logo__link' });
logoLink.innerHTML = logoSvg;
logoLink.title = 'Home';
const headerLinksList = createElement({ tag: 'ul', className: 'header__links-list' });
export const headerLinkHome = createElement({
  tag: 'li',
  className: 'header__list-item home-link active',
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
const searchLink = createElement({ tag: 'a', className: 'header__search' });
searchLink.innerHTML = search;
const basketLink = createElement({ tag: 'a', className: 'header__basket' });
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
linkWrap.append(searchLink, basketLink, loginButton);
header.append(logoLink, headerLinksList, linkWrap);

export default header;

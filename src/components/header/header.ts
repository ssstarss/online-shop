import createElement from '../../helpers/createElement';
import { basket, login, logoSvg, register, search, userSvg } from '../../assets/icons/index';
// import generateCatalog from '../catalog/catalog';
import generateCatalogPage from '../../pages/catalogPage/catalogPage';
import { productParams } from '../catalog/catalog';

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
export const searchLink = createElement({ tag: 'div', className: 'header__search' });
const searchLinkBtn = createElement({
  tag: 'button',
  className: 'header__search-btn button',
  type: 'button',
});

const searchInput = createElement({
  tag: 'input',
  className: ['header__search-input'],
  type: 'search',
});

searchLinkBtn.addEventListener('click', async () => {
  if (searchInput.value !== '') {
    const main = document.querySelector('main');
    main!.innerHTML = '';
    productParams.searchText = searchInput.value;
    productParams.category = undefined;
    productParams.filterPrice = undefined;
    productParams.sort = undefined;

    const catalog = await generateCatalogPage({ searchText: searchInput.value });
    main?.append(catalog);
  } else {
    searchInput.focus();
  }
});

searchLinkBtn.innerHTML = search;
searchLink.append(searchInput, searchLinkBtn);
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

export const registerButton = createElement({
  tag: 'a',
  className: 'header__register button',
});
registerButton.innerHTML = register;
const registerText = createElement({
  tag: 'span',
  className: 'header__register-text',
  textContent: 'Register',
});
registerButton.append(registerText);

export const logoutButton = createElement({
  tag: 'a',
  className: 'header__logout button',
});

const logoutText = createElement({
  tag: 'span',
  className: 'header__logout-text',
  textContent: 'Logout',
});
logoutButton.append(logoutText);

export const userProfile = createElement({
  tag: 'a',
  className: 'header__user-profile button',
});
userProfile.innerHTML = userSvg;

// burger
export const burgerMenu = createElement({ tag: 'button', className: 'burger-menu' });
const burgerMenuLine = createElement({ tag: 'span', className: 'burger-menu__line' });
burgerMenu.append(
  burgerMenuLine.cloneNode(),
  burgerMenuLine.cloneNode(),
  burgerMenuLine.cloneNode()
);
export const mobileMenu = createElement({ tag: 'div', className: 'mobile-menu' });
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
  textContent: '',
});
const mobileSearchInput = createElement({
  tag: 'input',
  className: ['mobile__search-input', 'hidden'],
  type: 'search',
});
const mobileSearchBtn = createElement({
  tag: 'button',
  className: 'mobile__search-btn',
  type: 'button',
});
mobileSearchBtn.innerHTML = search;

mobileSearchBtn.addEventListener('click', async () => {
  if (mobileSearchInput.value !== '') {
    const main = document.querySelector('main');
    main!.innerHTML = '';
    productParams.searchText = mobileSearchInput.value;
    productParams.category = undefined;
    productParams.filterPrice = undefined;
    productParams.sort = undefined;

    const catalog = await generateCatalogPage({ searchText: mobileSearchInput.value });
    main?.append(catalog);
    mobileMenu.classList.remove('active');
    burgerMenu.classList.remove('active');
  } else {
    mobileSearchInput.focus();
  }
});

mobileSearchLink.append(mobileSearchInput, mobileSearchBtn);

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

export const mobileRegisterButton = createElement({
  tag: 'li',
  className: 'mobile__list-item mobile__register',
  textContent: 'Register',
});
export const mobileLogoutButton = createElement({
  tag: 'li',
  className: 'mobile__list-item mobile__logout',
  textContent: 'Logout',
});

export const mobileUserProfileButton = createElement({
  tag: 'li',
  className: 'mobile__list-item mobile__user-profile',
  textContent: 'User Profile',
});

mobileLinksList.append(
  mobileSearchLink,
  mobileLinkHome,
  mobileLinkCatalog,
  mobileLinkBlogs,
  mobileBasketLink,
  mobileLoginButton,
  mobileRegisterButton,
  mobileLogoutButton,
  mobileUserProfileButton
);

mobileMenu.append(mobileLinksList);

linkWrap.append(searchLink, basketLink, loginButton, registerButton, userProfile, logoutButton);
header.append(logoLink, headerLinksList, linkWrap, burgerMenu, mobileMenu);

export default header;

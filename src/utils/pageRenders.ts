import mainContainer from '../components/mainContainer/mainContainer';
import loginPage from '../pages/loginPage/loginPage';
import mainPage from '../pages/mainPage/mainPage';
import { page404 } from '../pages/page404/page404';
import RegistrationPage from '../pages/registrationPage/registrationPage';
// import catalogPage from '../pages/catalogPage/catalogPage';

import blogsPage from '../pages/blogsPage/blogsPage';
import loginHeader, { loginLink, registerLink } from '../components/loginHeader/loginHeader';
import { initializeSwiper } from '../components/productSlider/productSlider';
import generateCatalogPage from '../pages/catalogPage/catalogPage';
import userProfilePage from '../pages/userProfilePage/userProfilePage';
import { headerLinkBlogs, headerLinkCatalog, headerLinkHome } from '../components/header/header';
import generateDetailedProductPage from '../pages/detailedProductPage/detailedProductPage';
import { initSwiperPreview } from '../components/previewMainPage/swiperSlider';
import getDetailedProduct from './getDetailedProduct';
import parseDetailedProductData from './parseDetailProductData';
import { fillCustomerDetails } from '../components/userProfile/accountDetails/accountDetails';
import { GetProductsParams } from '../interfaces/product';

const registrationPage = new RegistrationPage();

export function renderMainPage(): void {
  mainContainer.innerHTML = '';
  mainContainer.append(mainPage);
  headerLinkHome.classList.add('active-header');
  headerLinkBlogs.classList.remove('active-header');
  headerLinkCatalog.classList.remove('active-header');
  initSwiperPreview();
}

export function renderLoginPage(): void {
  mainContainer.innerHTML = '';
  mainContainer.append(loginHeader, loginPage);
  loginLink.classList.add('login__link--active');
  registerLink.classList.remove('login__link--active');
}

export function renderRegisterPage(): void {
  mainContainer.innerHTML = '';
  mainContainer.append(loginHeader, registrationPage.element);
  loginLink.classList.remove('login__link--active');
  registerLink.classList.add('login__link--active');
}

export async function renderCatalogPage(params?: GetProductsParams) {
  mainContainer.innerHTML = '';
  const catalog = await generateCatalogPage(params);
  mainContainer.append(catalog);
}

export async function renderCatalogDetailedPage(pageID: string) {
  mainContainer.innerHTML = '';
  const data = await getDetailedProduct(pageID);
  const parsedParams: [string, string, string, string, string[], string?] =
    parseDetailedProductData(data);
  const detailedPage = generateDetailedProductPage(...parsedParams);
  mainContainer.append(detailedPage);
  initializeSwiper();
  headerLinkCatalog.classList.add('active-header');
  headerLinkBlogs.classList.remove('active-header');
  headerLinkHome.classList.remove('active-header');
}

export function renderBlogsPage(): void {
  mainContainer.innerHTML = '';
  mainContainer.append(blogsPage);
  headerLinkBlogs.classList.add('active-header');
  headerLinkCatalog.classList.remove('active-header');
  headerLinkHome.classList.remove('active-header');
}

export function render404Page(): void {
  mainContainer.innerHTML = '';
  mainContainer.append(page404);
}

export function renderUserProfilePage(): void {
  mainContainer.innerHTML = '';
  mainContainer.append(userProfilePage);
  fillCustomerDetails();
}

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
import generateDetailedProductPage from '../pages/detailedProductPage/detailedProductPage';
import { initSwiperPreview } from '../components/previewMainPage/swiperSlider';
import getDetailedProduct from './getDetailedProduct';
import parseDetailedProductData from './parseDetailProductData';

const registrationPage = new RegistrationPage();

export function renderMainPage(): void {
  mainContainer.innerHTML = '';
  mainContainer.append(mainPage);
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

export async function renderCatalogPage() {
  mainContainer.innerHTML = '';
  const catalog = await generateCatalogPage();
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
}

export function renderBlogsPage(): void {
  mainContainer.innerHTML = '';
  mainContainer.append(blogsPage);
}

export function render404Page(): void {
  mainContainer.innerHTML = '';
  mainContainer.append(page404);
}

export function renderUserProfilePage(): void {
  mainContainer.innerHTML = '';
  mainContainer.append(userProfilePage);
}

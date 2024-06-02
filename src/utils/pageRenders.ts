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

const registrationPage = new RegistrationPage();

export function renderMainPage(): void {
  mainContainer.innerHTML = '';
  mainContainer.append(mainPage);
  headerLinkHome.classList.add('active-header');
  headerLinkBlogs.classList.remove('active-header');
  headerLinkCatalog.classList.remove('active-header');
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

// export function renderCatalogPage(): void {
//   mainContainer.innerHTML = '';
//   mainContainer.append(catalogPage);
// }

export async function renderCatalogPage() {
  mainContainer.innerHTML = '';
  const catalog = await generateCatalogPage();
  mainContainer.append(catalog);
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
}

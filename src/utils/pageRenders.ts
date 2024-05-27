import mainContainer from '../components/mainContainer/mainContainer';
import loginPage from '../pages/loginPage/loginPage';
import mainPage from '../pages/mainPage/mainPage';
import { page404 } from '../pages/page404/page404';
import RegistrationPage from '../pages/registrationPage/registrationPage';
import catalogPage from '../pages/catalogPage/catalogPage';
import blogsPage from '../pages/blogsPage/blogsPage';
import loginHeader, { loginLink, registerLink } from '../components/loginHeader/loginHeader';
import userProfilePage from '../pages/userProfilePage/userProfilePage';

const registrationPage = new RegistrationPage();

export function renderMainPage(): void {
  mainContainer.innerHTML = '';
  mainContainer.append(mainPage);
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

export function renderCatalogPage(): void {
  mainContainer.innerHTML = '';
  mainContainer.append(catalogPage);
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

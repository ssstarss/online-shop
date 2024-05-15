import './_loginPage.scss';
import createElement from '../../helpers/createElement';
import { createEmailInput, createPasswordInput } from '../../components/inputs/inputs';
import generateSubmitBtn from '../../components/btns/btns';

const loginPage = createElement({ tag: 'section', className: 'login' });
const loginContainer = createElement({ tag: 'div', className: 'login__container' });
const loginHeader = createElement({ tag: 'header', className: 'login__header' });

const loginLink = createElement({
  tag: 'a',
  className: ['login__link', 'login__link--active'],
  href: '/login',
  textContent: 'Login',
});

const registerLink = createElement({
  tag: 'a',
  className: 'login__link',
  href: '/register',
  textContent: 'Register',
});

const loginForm = createElement({ tag: 'form', className: 'login__form' });
const loginFormTitle = createElement({
  tag: 'h1',
  className: 'login__form-title',
  textContent: 'Enter your username and password to login.',
});
const loginBtn = generateSubmitBtn('login-btn', 'Login') as HTMLButtonElement;
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
});
const emailInput = createEmailInput(
  ['login__input', 'login__input--login'],
  'almamun_uxui@outlook.com',
  loginBtn
) as HTMLInputElement;

const passwordInput = createPasswordInput(
  ['login__input', 'login__input--password'],
  '********',
  loginBtn
);

loginPage.append(loginContainer);
loginContainer.append(loginHeader);
loginHeader.append(loginLink, registerLink);
loginContainer.append(loginForm);
loginForm.append(loginFormTitle, emailInput, passwordInput, loginBtn);

export default loginPage;

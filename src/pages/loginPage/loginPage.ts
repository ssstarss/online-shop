import './_loginPage.scss';
import createElement from '../../helpers/createElement';
import { createEmailInput, createPasswordInput } from '../../components/inputs/inputs';
import generateSubmitBtn from '../../components/btns/btns';

const loginPage = createElement('section', 'login');
const loginContainer = createElement('div', 'login__container');
const loginHeader = createElement('header', 'login__header');

const loginLink = createElement(
  'a',
  ['login__link', 'login__link--active'],
  '',
  '',
  undefined,
  undefined,
  '/login'
);
loginLink.textContent = 'Login';

const registerLink = createElement('a', 'login__link', '', '', undefined, undefined, '/register');
registerLink.textContent = 'Register';

const loginForm = createElement('form', 'login__form');
const loginFormTitle = createElement('h1', 'login__form-title');
loginFormTitle.textContent = 'Enter your username and password to login.';
const loginBtn = generateSubmitBtn('login-btn', 'Login');
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

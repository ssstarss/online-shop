import createElement from '../../helpers/createElement';
import { createEmailInput, createPasswordInput } from '../../components/inputs/inputs';
import './_loginPage.scss';

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

const emailInput = createEmailInput(
  ['login__input', 'login__input--login'],
  'almamun_uxui@outlook.com'
) as HTMLInputElement;

// emailInput.addEventListener('keypress', () => {
//   validateEmail(emailInput);
// });

const passwordInput = createPasswordInput(['login__input', 'login__input--password'], '********');

loginPage.append(loginContainer);
loginContainer.append(loginHeader);
loginHeader.append(loginLink);
loginHeader.append(registerLink);
loginContainer.append(loginForm);
loginForm.append(loginFormTitle);
loginForm.append(emailInput, passwordInput);

export default loginPage;

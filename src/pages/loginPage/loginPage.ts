import './_loginPage.scss';
import createElement from '../../helpers/createElement';
import { createEmailInput, createPasswordInput } from '../../components/inputs/inputs';
import generateSubmitBtn from '../../components/btns/btns';
import loginFunc from '../../utils/loginFunc';

const loginPage = createElement({ tag: 'section', className: 'login' });
const loginContainer = createElement({ tag: 'div', className: 'login__container' });

const loginForm = createElement({ tag: 'form', className: 'login__form' });
const loginFormTitle = createElement({
  tag: 'h1',
  className: 'login__form-title',
  textContent: 'Enter your username and password to login.',
});
const loginBtn = generateSubmitBtn('login-btn', 'Login') as HTMLButtonElement;

const emailInput = createEmailInput(
  ['login__input', 'login__input--login'],
  'almamun_uxui@outlook.com',
  loginBtn
) as HTMLInputElement;

const passwordInput = createPasswordInput(
  ['login__input', 'login__input--password'],
  '********',
  loginBtn
) as HTMLInputElement;

loginPage.append(loginContainer);
loginContainer.append(loginForm);
loginForm.append(loginFormTitle, emailInput, passwordInput);

loginBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  await loginFunc('.login__input--login', '.login__input--password');
});

loginForm.append(loginBtn);

export default loginPage;

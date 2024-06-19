import createElement from '../../helpers/createElement';

const loginHeader = createElement({ tag: 'header', className: 'login__header' });

export const loginLink = createElement({
  tag: 'a',
  className: ['login__link', 'login__link--active'],
  textContent: 'Login',
});

export const registerLink = createElement({
  tag: 'a',
  className: 'login__link',
  textContent: 'Register',
});
loginHeader.append(loginLink, registerLink);

export default loginHeader;

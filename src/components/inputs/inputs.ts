import createElement from '../../helpers/createElement';
import { validateEmail, validatePassword } from './validation';
import './_inputs.scss';

function togglePasswordVisibility(passwordInput: HTMLInputElement, toggleBtn: HTMLButtonElement) {
  const input = passwordInput;
  const passwordToggle = toggleBtn;

  if (input.type === 'password') {
    input.type = 'text';
    passwordToggle.classList.toggle('toggle-password-btn--hide');
  } else {
    input.type = 'password';
    passwordToggle.classList.toggle('toggle-password-btn--hide');
  }
}

export function createEmailInput(
  inputClassName: string | string[],
  placeholder: string,
  submitBtn: HTMLButtonElement
) {
  const inputContainer = createElement({ tag: 'div', className: 'input-container' });
  const emailInput = createElement({
    tag: 'input',
    className: inputClassName,
    type: 'email',
    placeholder,
  });
  const errorMessage = createElement({
    tag: 'p',
    className: ['error-message', 'error-message--hidden'],
    textContent: 'Error message',
  });
  emailInput.addEventListener('keyup', () => validateEmail(emailInput, errorMessage, submitBtn));
  inputContainer.append(emailInput);
  inputContainer.append(errorMessage);

  return inputContainer;
}

export function createPasswordInput(
  inputClassName: string | string[],
  placeholder: string,
  submitBtn: HTMLButtonElement
) {
  const inputContainer = createElement({ tag: 'div', className: 'input-container' });
  const passwordWrapper = createElement({ tag: 'div', className: 'password-wrapper' });
  const passwordInput = createElement({
    tag: 'input',
    className: inputClassName,
    type: 'password',
    placeholder,
  });
  const showPswrdToggle = createElement({
    tag: 'button',
    className: 'toggle-password-btn',
    type: 'button',
  });
  showPswrdToggle.addEventListener('click', () => {
    togglePasswordVisibility(passwordInput, showPswrdToggle);
  });
  const errorMessage = createElement({
    tag: 'p',
    className: ['error-message', 'error-message--hidden'],
    textContent: 'Error Message',
  });
  passwordInput.addEventListener('keyup', () =>
    validatePassword(passwordInput, errorMessage, submitBtn)
  );
  inputContainer.append(passwordWrapper);
  passwordWrapper.append(passwordInput, showPswrdToggle);
  inputContainer.append(errorMessage);
  return inputContainer;
}

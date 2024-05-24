import createElement from '../../helpers/createElement';
import { validateEmail, validatePassword } from './validation';
import './_inputs.scss';

let emailValidated = false;
let passwordValidated = false;

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
    type: 'text',
    placeholder,
    required: true,
  });
  emailInput.setAttribute('autocomplete', 'on');
  const errorMessage = createElement({
    tag: 'p',
    className: ['error-message', 'error-message--hidden'],
    textContent: 'Error message',
  });
  emailInput.addEventListener('keyup', () => {
    emailValidated = validateEmail(emailInput, errorMessage, submitBtn);
    if (emailValidated && passwordValidated) {
      submitBtn.removeAttribute('disabled');
    }
  });
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
    required: true,
  });
  passwordInput.setAttribute('autocomplete', 'on');
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
  passwordInput.addEventListener('keyup', () => {
    passwordValidated = validatePassword(passwordInput, errorMessage, submitBtn);
    if (emailValidated && passwordValidated) {
      submitBtn.removeAttribute('disabled');
    }
  });
  inputContainer.append(passwordWrapper);
  passwordWrapper.append(passwordInput, showPswrdToggle);
  inputContainer.append(errorMessage);
  return inputContainer;
}

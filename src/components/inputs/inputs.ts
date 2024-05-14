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
  const inputContainer = createElement('div', 'input-container');
  const emailInput = createElement('input', inputClassName, 'email', placeholder);
  const errorMessage = createElement('p', ['error-message', 'error-message--hidden']);
  emailInput.addEventListener('keyup', () => validateEmail(emailInput, errorMessage, submitBtn));
  errorMessage.textContent = 'Lorem Ipsum';
  inputContainer.append(emailInput);
  inputContainer.append(errorMessage);

  return inputContainer;
}

export function createPasswordInput(
  inputClassName: string | string[],
  placeholder: string,
  submitBtn: HTMLButtonElement
) {
  const inputContainer = createElement('div', 'input-container');
  const passwordWrapper = createElement('div', 'password-wrapper');
  const passwordInput = createElement('input', inputClassName, 'password', placeholder);
  const showPswrdToggle = createElement('button', 'toggle-password-btn', 'button');
  showPswrdToggle.addEventListener('click', () => {
    togglePasswordVisibility(passwordInput, showPswrdToggle);
  });
  const errorMessage = createElement('p', ['error-message', 'error-message--hidden']);
  passwordInput.addEventListener('keyup', () =>
    validatePassword(passwordInput, errorMessage, submitBtn)
  );
  errorMessage.textContent = 'Lorem Ipsum';
  inputContainer.append(passwordWrapper);
  passwordWrapper.append(passwordInput, showPswrdToggle);
  inputContainer.append(errorMessage);
  return inputContainer;
}

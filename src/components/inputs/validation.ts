import {
  isPasswordLengthValid,
  containsUppercase,
  containsLowercase,
  containsDigit,
  containsSpecialCharacter,
  hasNoLeadingOrTrailingWhitespace,
} from '../../helpers/validationRegexFuncs';

export function validateEmail(
  input: HTMLInputElement,
  errorTxt: HTMLParagraphElement,
  submitBtn: HTMLButtonElement
) {
  const regex = /^\S+@\S+\.\S+$/;
  const inputValue = input.value;
  const errorMessage = errorTxt;
  const submitButton = submitBtn;

  function isValidEmail(email: string) {
    return regex.test(email);
  }

  const validationResult = isValidEmail(inputValue);
  if (validationResult) {
    input.classList.remove('login__input--error');
    errorMessage.classList.add('error-message--hidden');
    submitButton.removeAttribute('disabled');
    return true;
  }
  errorMessage.classList.remove('error-message--hidden');
  input.classList.add('login__input--error');
  errorMessage.textContent = `Valid email: no whitespace, includes '@' and valid domain name.`;
  submitButton.setAttribute('disabled', '');
  return false;
}

export function validatePassword(
  input: HTMLInputElement,
  errorTxt: HTMLParagraphElement,
  submitBtn: HTMLButtonElement
) {
  const inputValue = input.value;

  const validationResult = function fireAllChecks(
    value: string,
    errorTxtMessage: HTMLParagraphElement
  ): boolean {
    const passwordValue = value;
    const errorMessage = errorTxtMessage;
    const submitButton = submitBtn;

    if (!isPasswordLengthValid(passwordValue)) {
      errorMessage.textContent = `Password must be at least 8 characters long.`;
      submitButton.setAttribute('disabled', '');
      return false;
    }
    if (!containsUppercase(passwordValue)) {
      errorMessage.textContent = `Password must contain at least one uppercase letter (A-Z).`;
      submitButton.setAttribute('disabled', '');
      return false;
    }
    if (!containsLowercase(passwordValue)) {
      errorMessage.textContent = `Password must contain at least one lowercase letter (a-z).`;
      submitButton.setAttribute('disabled', '');
      return false;
    }
    if (!containsDigit(passwordValue)) {
      errorMessage.textContent = `Password must contain at least one digit (0-9).`;
      submitButton.setAttribute('disabled', '');
      return false;
    }
    if (!containsSpecialCharacter(passwordValue)) {
      errorMessage.textContent = `Password must contain at least one special character (e.g., !@#$%^&*).`;
      submitButton.setAttribute('disabled', '');
      return false;
    }
    if (!hasNoLeadingOrTrailingWhitespace(passwordValue)) {
      errorMessage.textContent = `Password must not contain leading or trailing whitespace.`;
      submitButton.setAttribute('disabled', '');
      return false;
    }
    submitButton.removeAttribute('disabled');
    return true;
  };
  if (validationResult(inputValue, errorTxt)) {
    input.classList.remove('login__input--error');
    errorTxt.classList.add('error-message--hidden');
    return true;
  }
  errorTxt.classList.remove('error-message--hidden');
  input.classList.add('login__input--error');
  return false;
}

export function validateEmail(input: HTMLInputElement, errorTxt: HTMLParagraphElement) {
  const regex = /^\S+@\S+\.\S+$/;
  const inputValue = input.value;
  const errorMessage = errorTxt;

  function isValidEmail(email: string) {
    return regex.test(email);
  }

  const validationResult = isValidEmail(inputValue);
  if (validationResult) {
    input.classList.remove('login__input--error');
    errorMessage.classList.add('error-message--hidden');
    return true;
  }
  errorMessage.classList.remove('error-message--hidden');
  input.classList.add('login__input--error');
  errorMessage.textContent = `Valid email: no whitespace, includes '@' and valid domain name.`;
  return false;
}

export function validatePassword(input: HTMLInputElement, errorTxt: HTMLParagraphElement) {
  const inputValue = input.value;

  function isPasswordLengthValid(value: string) {
    return value.length >= 8;
  }

  function containsUppercase(value: string) {
    return /[A-Z]/.test(value);
  }

  function containsLowercase(value: string) {
    return /[a-z]/.test(value);
  }

  function containsDigit(value: string) {
    return /\d/.test(value);
  }

  function containsSpecialCharacter(value: string) {
    return /[!@#$%^&*]/.test(value);
  }

  function hasNoLeadingOrTrailingWhitespace(value: string) {
    return /^\S(.*\S)?$/.test(value);
  }

  const validationResult = function fireAllChecks(
    value: string,
    errorTxtMessage: HTMLParagraphElement
  ): boolean {
    const passwordValue = value;
    const errorMessage = errorTxtMessage;
    if (!isPasswordLengthValid(passwordValue)) {
      errorMessage.textContent = `Password must be at least 8 characters long.`;
      return false;
    }
    if (!containsUppercase(passwordValue)) {
      errorMessage.textContent = `Password must contain at least one uppercase letter (A-Z).`;
      return false;
    }
    if (!containsLowercase(passwordValue)) {
      errorMessage.textContent = `Password must contain at least one lowercase letter (a-z).`;
      return false;
    }
    if (!containsDigit(passwordValue)) {
      errorMessage.textContent = `Password must contain at least one digit (0-9).`;
      return false;
    }
    if (!containsSpecialCharacter(passwordValue)) {
      errorMessage.textContent = `Password must contain at least one special character (e.g., !@#$%^&*).`;
      return false;
    }
    if (!hasNoLeadingOrTrailingWhitespace(passwordValue)) {
      errorMessage.textContent = `Password must not contain leading or trailing whitespace.`;
      return false;
    }
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

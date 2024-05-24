export function isPasswordLengthValid(value: string) {
  return value.length >= 8;
}

export function containsUppercase(value: string) {
  return /[A-Z]/.test(value);
}

export function containsLowercase(value: string) {
  return /[a-z]/.test(value);
}

export function containsDigit(value: string) {
  return /\d/.test(value);
}

export function containsSpecialCharacter(value: string) {
  return /[!@#$%^&*]/.test(value);
}

export function hasNoLeadingOrTrailingWhitespace(value: string) {
  return /^\S(.*\S)?$/.test(value);
}

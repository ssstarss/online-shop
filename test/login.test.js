const {
  isPasswordLengthValid,
  containsUppercase,
  containsLowercase,
  containsDigit,
  containsSpecialCharacter,
  hasNoLeadingOrTrailingWhitespace,
} = require('../src/helpers/validationRegexFuncs');

test('kekosichek is a valid length for a password', () => {
  expect(isPasswordLengthValid('kekosichek')).toBe(true);
});

test('Kekosichek contains uppercase', () => {
  expect(containsUppercase('Kekosichek')).toBe(true);
});

test('Kekosichek contains lowercase', () => {
  expect(containsLowercase('Kekosichek')).toBe(true);
});
test('Kekos1ichek contains digit', () => {
  expect(containsDigit('Kekos1ichek')).toBe(true);
});
test('Kekosich@ek contains specialCharacter', () => {
  expect(containsSpecialCharacter('Kekosich@ek')).toBe(true);
});
test('Kekosichek has no whitespaces', () => {
  expect(hasNoLeadingOrTrailingWhitespace('Kekosichek')).toBe(true);
});

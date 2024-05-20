export function checkTextValidity(value: string, pattern: RegExp) {
  return pattern.test(value);
}

/* export function checkPasswordValidity(password: string) {
  /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}/.test(password);
} */

export function checkDateValidity(date: string) {
  const checkdate = new Date(date);
  const today = new Date();
  if (
    today.getFullYear() - checkdate.getFullYear() > 13 ||
    (today.getFullYear() - checkdate.getFullYear() === 12 &&
      today.getMonth() > checkdate.getMonth())
  )
    return true;
  return false;
}

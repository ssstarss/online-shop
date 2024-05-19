import Connection from '../app/connection';

async function loginFunc(emailInputClass: string, passwordInputClass: string) {
  const email = document.querySelector(emailInputClass) as HTMLInputElement;
  const password = document.querySelector(passwordInputClass) as HTMLInputElement;
  const connection = new Connection(email?.value, password?.value);
  const response = await connection.login(email?.value, password?.value);
  return response;
}

export default loginFunc;

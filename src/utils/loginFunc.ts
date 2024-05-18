import Connection from '../app/connection';

async function loginFunc(emailInputClass: string, passwordInputClass: string) {
  const connection = new Connection();

  const email = document.querySelector(emailInputClass) as HTMLInputElement;
  const password = document.querySelector(passwordInputClass) as HTMLInputElement;
  const response = await connection.login(email?.value, password?.value);
  console.log(response);
  return response;
}

export default loginFunc;

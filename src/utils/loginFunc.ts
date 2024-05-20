import Connection from '../app/connection';
import generateErrorPopup from '../components/popups/popup';
import { AuthResponse } from '../interfaces/authResponse';

async function loginFunc(emailInputClass: string, passwordInputClass: string) {
  const emailInput = document.querySelector(emailInputClass) as HTMLInputElement;
  const passwordInput = document.querySelector(passwordInputClass) as HTMLInputElement;
  const connection = new Connection(emailInput?.value, passwordInput?.value);

  try {
    const response: AuthResponse = await connection.login(emailInput?.value, passwordInput?.value);
    const { email } = response.body.customer;
    const tokenStore = connection.tokenCache.get();
    const tokenStoreStringified = JSON.stringify(tokenStore);
    localStorage.setItem(email, tokenStoreStringified);
    localStorage.setItem('logged', 'true');
    /* navigate to main page */
    return response;
  } catch (error: unknown) {
    const errorTxt = `${(error as Error).name}: ${(error as Error).message}`;
    generateErrorPopup(errorTxt);
    return undefined;
  }
}

export default loginFunc;

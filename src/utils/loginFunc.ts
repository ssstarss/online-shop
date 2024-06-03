import generateErrorPopup from '../components/popups/popup';
import navigate from './navigate';
import { connectionByFetch } from '../app/connectionByFetch';

async function loginFunc(emailInputClass: string, passwordInputClass: string) {
  const emailInput = document.querySelector(emailInputClass) as HTMLInputElement;
  const passwordInput = document.querySelector(passwordInputClass) as HTMLInputElement;
  // const connection = new Connection(emailInput?.value, passwordInput?.value);

  connectionByFetch
    .loginByPassword(emailInput?.value, passwordInput?.value)
    .then((response) => {
      if (response.ok) {
        localStorage.setItem('token', connectionByFetch.bearerToken);
        localStorage.setItem('logged', 'true');
        response.json().then((result) => {
          localStorage.setItem('id', result.customer.id);
          connectionByFetch.currentCustomer.id = result.customer.id;
          connectionByFetch.currentCustomer.version = result.customer.version;
          window.dispatchEvent(new Event('storage'));
          /* navigate to main page */
          navigate('/main');
        });
      }
    })
    .catch((error) => {
      generateErrorPopup(error);
      return undefined;
    });
}

export default loginFunc;

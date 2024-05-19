import Navigo from 'navigo';

import mainContainer from '../components/mainContainer/mainContainer';
import loginPage from '../pages/loginPage/loginPage';
import mainPage from '../pages/mainPage/mainPage';
import { page404 } from '../pages/page404/page404';
import RegistrationPage from '../pages/registrationPage/registrationPage';

const root = '/';

const router = new Navigo(root);
const registrationPage = new RegistrationPage();

router
  .on({
    '/': () => {
      mainContainer.innerHTML = '';
      mainContainer.append(mainPage);
    },
    '/login': () => {
      mainContainer.innerHTML = '';
      mainContainer.append(loginPage);
    },
    '/register': () => {
      mainContainer.innerHTML = '';
      mainContainer.append(registrationPage.element);
    },
  })
  .notFound(() => {
    mainContainer.innerHTML = '';
    mainContainer.append(page404);
  })
  .resolve();

export function navigate(path: string): void {
  router.navigate(path);
}

export default navigate;

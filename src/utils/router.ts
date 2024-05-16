import Navigo from 'navigo';

import mainContainer from '../components/mainContainer/mainContainer';
import loginPage from '../pages/loginPage/loginPage';
import mainPage from '../pages/mainPage/mainPage';
import registrationPage from '../pages/registrationPage/registrationPage';
import { page404 } from '../pages/page404/page404';

const root = '/';

const router = new Navigo(root);

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
      mainContainer.append(registrationPage);
    },
  })
  .notFound(() => {
    mainContainer.append(page404);
  })
  .resolve();

export function navigate(path: string): void {
  router.navigate(path);
}

export default navigate;

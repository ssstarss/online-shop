import RegistrationPage from '../registrationPage/registrationPage';
import createElement from '../../helpers/createElement';
// import loginPage from '../loginPage/loginPage';

const registrationPage = new RegistrationPage();
const mainPage = createElement({ tag: 'section', className: 'main', textContent: 'MAIN PAGE' });
mainPage.append(registrationPage.element);
// mainPage.append(loginPage);

export default mainPage;

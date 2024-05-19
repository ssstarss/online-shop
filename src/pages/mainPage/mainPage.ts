import RegistrationPage from '../registrationPage/registrationPage';
import createElement from '../../helpers/createElement';

const registrationPage = new RegistrationPage();
const mainPage = createElement({ tag: 'section', className: 'main', textContent: 'MAIN PAGE' });
mainPage.append(registrationPage.element);

export default mainPage;

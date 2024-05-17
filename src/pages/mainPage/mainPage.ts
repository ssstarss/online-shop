import RegistrationPage from '../registrationPage/registrationPage';
import BaseComponent from '../../components/baseComponent';
const registrationPage = new RegistrationPage();
const mainPage = createElement({ tag: 'section', className: 'main', textContent: 'MAIN PAGE' });
mainPage.element.append(registrationPage.element);

export default mainPage;

import RegistrationPage from '../registrationPage/registrationPage';
import BaseComponent from '../../components/baseComponent';

const mainPage = new BaseComponent({
  tag: 'div',
  classNames: ['mainPage'],
});

mainPage.setTextContent('MAINPAGE');
const registrationPage = new RegistrationPage();
mainPage.element.append(registrationPage.element);

export default mainPage;

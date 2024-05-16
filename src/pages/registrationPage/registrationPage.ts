import BaseComponent from '../../components/baseComponent';
import RegistrationPageHeader from './registrationPageHeader/registrationPageHeader';
import RegistrationForm from './registrationForm/registrationForm';
import './registrationPage.css';

export default class RegistrationPage extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      classNames: ['registrationPage'],
      id: 'registrationPage',
    });

    const registrationPageHeader = new RegistrationPageHeader();
    this.addElement(registrationPageHeader);
    const registrationForm = new RegistrationForm();
    this.addElement(registrationForm);
  }
}

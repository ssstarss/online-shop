import BaseComponent from '../../helpers/baseComponent';
import RegistrationForm from './registrationForm/registrationForm';
import './registrationPage.css';

export default class RegistrationPage extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      classNames: ['registrationPage'],
      id: 'registrationPage',
    });

    const registrationForm = new RegistrationForm();
    this.addElement(registrationForm);
  }
}

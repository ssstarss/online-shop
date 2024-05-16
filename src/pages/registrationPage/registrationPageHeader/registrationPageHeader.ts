import './registrationPageHeader.css';
import BaseComponent from '../../../components/baseComponent';

export default class RegistrationPageHeader extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
      classNames: ['registrationPageHeader'],
    });
    this.create();
  }

  create(): void {
    const login = new BaseComponent({
      tag: 'a',
      classNames: ['loginPageReference'],
      text: 'Login',
    });

    const divider = new BaseComponent({
      tag: 'a',
      classNames: ['referencesDivider'],
      text: '|',
    });

    const register = new BaseComponent({
      tag: 'a',
      classNames: ['registerPageReference'],
      text: 'Register',
    });
    this.addElement(login, divider, register);
  }
}

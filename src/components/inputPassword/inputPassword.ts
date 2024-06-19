import BaseComponent from '../../helpers/baseComponent';
import './inputPassword.css';

export default class PasswordInput extends BaseComponent {
  showPasswordIcon: BaseComponent;

  public input: BaseComponent;

  constructor() {
    super({
      tag: 'div',
      classNames: ['passwordWrapper'],
    });
    const inputWrapper = new BaseComponent({
      tag: 'div',
      classNames: ['inputWrapper'],
    });
    this.addElement(inputWrapper);

    this.input = new BaseComponent({
      tag: 'input',
      classNames: ['password', 'inputField'],
      type: 'text',
      placeholder: 'Password',
      pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}/,
      tip: 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
    });

    inputWrapper.addElement(this.input);

    this.showPasswordIcon = new BaseComponent({
      tag: 'div',
      classNames: ['showPasswordIcon'],
      callback: () => this.togglePasswordVisibility(this.input),
    });

    this.addElement(this.showPasswordIcon);
  }

  togglePasswordVisibility(input: BaseComponent) {
    const item = input;
    if ((item.element as HTMLInputElement).type === 'password') {
      (item.element as HTMLInputElement).type = 'text';
      this.showPasswordIcon.element.classList.toggle('passWordIconHide');
    } else {
      (item.element as HTMLInputElement).type = 'password';
      this.showPasswordIcon.element.classList.toggle('passWordIconHide');
    }
  }
}

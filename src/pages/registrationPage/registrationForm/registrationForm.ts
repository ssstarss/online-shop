import './registrationForm.css';
import { BaseComponent } from '../../../components/baseComponent';
import BaseInputComponent from '../../../components/baseInputComponent';

export default class RegistrationForm extends BaseComponent {
  constructor() {
    super({
      tag: 'form',
      classNames: ['registrationForm'],
    });
    this.create();
  }

  create() {
    const registrationFormText = new BaseComponent({
      tag: 'p',
      classNames: ['registrationFormText'],
      text: 'Enter your email and password to register.',
    });

    const firstName = new BaseInputComponent({
      tag: '',
      classNames: ['firstName', 'inputField'],
      type: 'text',
      required: true,
      placeholder: 'First Name',
      pattern: '',
    });

    const lastName = new BaseInputComponent({
      tag: '',
      classNames: ['lastName', 'inputField'],
      type: 'text',
      required: true,
      placeholder: 'Last Name',
      pattern: '',
    });

    const emailAdress = new BaseInputComponent({
      tag: '',
      classNames: ['emailAdress', 'inputField'],
      type: 'email',
      required: true,
      placeholder: 'Enter your email address',
      pattern: '',
    });

    const password = new BaseInputComponent({
      tag: '',
      classNames: ['password', 'inputField'],
      type: 'password',
      required: true,
      placeholder: 'Password',
      pattern: '',
    });

    const dateOfBirth = new BaseInputComponent({
      tag: '',
      classNames: ['dateOfBirth', 'inputField'],
      type: 'date',
      required: true,
      placeholder: '',
      pattern: '',
    });

    this.addElement(
      registrationFormText.element,
      firstName.element,
      lastName.element,
      emailAdress.element,
      password.element,
      dateOfBirth.element
    );
  }
}

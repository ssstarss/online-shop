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
    const formHeader = new BaseComponent({
      tag: 'p',
      classNames: ['regFormText'],
      text: 'Enter registration data:',
    });

    const firstName = new BaseInputComponent({
      tag: '',
      classNames: ['firstName', 'inputField'],
      type: 'text',
      required: true,
      placeholder: 'First Name',
      pattern: '^[A-Za-z]+$',
    });

    const lastName = new BaseComponent({
      tag: 'input',
      classNames: ['lastName', 'inputField'],
      type: 'text',
      required: true,
      placeholder: 'Last Name',
      pattern: '^[A-Za-z]+$',
    });

    const emailAdress = new BaseComponent({
      tag: 'input',
      classNames: ['emailAdress', 'inputField'],
      type: 'email',
      required: true,
      placeholder: 'Enter your email address',
      pattern: '',
    });

    const password = new BaseInputComponent({
      tag: '',
      classNames: ['password', 'inputField'],
      type: 'text',
      required: true,
      placeholder: 'Password',
      pattern: `(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}`,
    });

    const dateOfBirth = new BaseComponent({
      tag: 'input',
      classNames: ['dateOfBirth', 'inputField'],
      type: 'date',
      required: true,
      placeholder: '',
      pattern: '',
    });

    const adressesHeader = new BaseComponent({
      tag: 'p',
      classNames: ['regFormAdressesText'],
      text: 'Enter your adress:',
    });

    const street = new BaseComponent({
      tag: 'input',
      classNames: ['regFormStreet', 'inputField'],
      type: 'text',
      required: true,
      placeholder: 'Street',
      pattern: '^*{1,}$',
    });

    const city = new BaseComponent({
      tag: 'input',
      classNames: ['regFormCity', 'inputField'],
      type: 'text',
      required: true,
      placeholder: 'City',
      pattern: '^[A-Za-z]+$',
    });

    const postalCode = new BaseComponent({
      tag: 'input',
      classNames: ['regFormPostal', 'inputField'],
      type: 'text',
      required: true,
      placeholder: 'Postal Code',
      pattern: '',
    });

    const country = new BaseComponent({
      tag: 'input',
      classNames: ['regFormCountry', 'inputField'],
      type: 'text',
      required: true,
      placeholder: 'Country',
      pattern: '',
    });

    const submitButton = new BaseComponent({
      tag: 'input',
      classNames: ['regFormSubmit', 'inputField'],
      type: 'submit',
      value: 'Register',
      placeholder: '',
      pattern: '',
    });
    (submitButton.element as HTMLInputElement).disabled = true;

    this.addElement(
      formHeader.element,
      firstName.element,
      lastName.element,
      emailAdress.element,
      password.element,
      dateOfBirth.element,
      adressesHeader.element,
      street.element,
      city.element,
      postalCode.element,
      country.element,
      submitButton.element
    );
  }
}

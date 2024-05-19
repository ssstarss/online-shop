import './registrationForm.css';
import { CustomerDraft } from '@commercetools/platform-sdk';
import BaseComponent from '../../../helpers/baseComponent';
import Connection from '../../../app/connection';

const countriesArray = ['USA', 'Canada', 'United Kingdom'];

export default class RegistrationForm extends BaseComponent {
  constructor() {
    super({
      tag: 'div',
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
    const connection = new Connection();
    const firstName = new BaseComponent({
      tag: 'input',
      classNames: ['firstName', 'inputField'],
      type: 'text',
      placeholder: 'First Name',
      pattern: /^[A-Za-z]+$/,
      tip: 'Must contain at least one character and no special characters or numbers',
    });

    const lastName = new BaseComponent({
      tag: 'input',
      classNames: ['lastName', 'inputField'],
      type: 'text',
      placeholder: 'Last Name',
      pattern: /^[A-Za-z]+$/,
      tip: 'Must contain at least one character and no special characters or numbers',
    });

    const emailAdress = new BaseComponent({
      tag: 'input',
      classNames: ['emailAdress', 'inputField'],
      type: 'text',
      placeholder: 'Enter your email address',
      pattern: /^[\w]{1}[\w\-.]*@[\w-]+\.[a-z]{2,4}$/i,
      tip: 'Please enter valid e-mail',
    });

    const password = new BaseComponent({
      tag: 'input',
      classNames: ['password', 'inputField'],
      type: 'text',
      placeholder: 'Password',
      pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}/,
      tip: 'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
    });

    const dateOfBirth = new BaseComponent({
      tag: 'input',
      classNames: ['dateOfBirth', 'inputField'],
      type: 'date',
      required: true,
      placeholder: '',
      tip: 'Please enter your birthDay',
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
      placeholder: 'Street',
      pattern: /^[A-Za-z0-9ws]{1,}$/,
      tip: 'Please enter your street',
    });

    const city = new BaseComponent({
      tag: 'input',
      classNames: ['regFormCity', 'inputField'],
      type: 'text',
      placeholder: 'City',
      pattern: /^[A-Za-z]+$/,
      tip: 'Please enter your city. No special characters or numbers',
    });

    const postalCode = new BaseComponent({
      tag: 'input',
      classNames: ['regFormPostal', 'inputField'],
      type: 'text',
      placeholder: 'Postal Code',
      tip: 'Please enter correct Postal Code',
    });

    const country = new BaseComponent({
      tag: 'input',
      classNames: ['regFormCountry', 'inputField'],
      type: 'text',
      placeholder: 'Country',
      tip: 'Please choose country',
    });
    (country.element as HTMLInputElement).setAttribute('list', 'countries');

    const dataList = new BaseComponent({
      tag: 'datalist',
      classNames: ['dataList'],
      id: 'countries',
    });
    country.addElement(dataList);

    countriesArray.forEach((item) => {
      const line = new BaseComponent({
        tag: 'option',
        classNames: ['countries'],
      });
      line.element.setAttribute('value', item);
      dataList.addElement(line);
    });

    const submitButton = new BaseComponent({
      tag: 'button',
      classNames: ['regFormSubmit'],
      type: 'submit',
      text: 'Register',
      id: 'regFormSubmit',
      placeholder: '',
      callback: () => {
        if (
          firstName.isValid &&
          lastName.isValid &&
          emailAdress.isValid &&
          password.isValid &&
          dateOfBirth.isValid &&
          street.isValid &&
          city.isValid &&
          postalCode.isValid &&
          country
        ) {
          const customer: CustomerDraft = {
            firstName: (firstName.element as HTMLInputElement).value,
            lastName: (lastName.element as HTMLInputElement).value,
            email: (emailAdress.element as HTMLInputElement).value,
            password: (password.element as HTMLInputElement).value,
            dateOfBirth: (dateOfBirth.element as HTMLInputElement).value,
            addresses: [
              {
                country: 'US',
                city: (city.element as HTMLInputElement).value,
                streetName: (street.element as HTMLInputElement).value,
                postalCode: (postalCode.element as HTMLInputElement).value,
              },
            ],
          };

          //  Добавить выаод ошибки в случае если юзер уже есть
          connection.newCustomer(customer).catch((error) => alert(error));
        }
      },
    });

    //  (submitButton.element as HTMLInputElement).disabled = true;

    this.addElement(
      formHeader,
      firstName,
      lastName,
      emailAdress,
      password,
      dateOfBirth,
      adressesHeader,
      street,
      city,
      postalCode,
      country,
      submitButton
    );
  }
}

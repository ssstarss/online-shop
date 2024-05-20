import './registrationForm.css';
import { CustomerDraft } from '@commercetools/platform-sdk';
import BaseComponent from '../../../helpers/baseComponent';
import Connection from '../../../app/connection';
import PopUpMessage from './popUpMessage/popUpMessage';
import PasswordInput from '../../../components/inputPassword/inputPassword';
import AdressesBlock from '../../../components/adressesBLock/adressesBlock';
import countries from '../../../components/adressesBLock/countries';

type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K];
};

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

    const password = new PasswordInput();

    const dateOfBirth = new BaseComponent({
      tag: 'input',
      classNames: ['dateOfBirth', 'inputField'],
      type: 'date',
      required: true,
      placeholder: '',
      tip: 'Our clients should be at least 13 years old',
    });

    const adressesBlock = new AdressesBlock();
    this.addElement(adressesBlock);

    const inputsForValidation = [
      lastName,
      emailAdress,
      password,
      dateOfBirth,
      adressesBlock.shippingAdress.street,
      adressesBlock.shippingAdress.city,
      adressesBlock.shippingAdress.postalCode,
      adressesBlock.shippingAdress.country,
      adressesBlock.billingAdress.street,
      adressesBlock.billingAdress.city,
      adressesBlock.billingAdress.postalCode,
      adressesBlock.billingAdress.country,
    ];

    const popUpMessageCanvas = new BaseComponent({
      tag: 'div',
      classNames: ['popUpMessageCanvas'],
      id: 'popUpMessageCanvas',
    });
    this.addElement(popUpMessageCanvas);
    const popUpMessage = new PopUpMessage();
    this.addElement(popUpMessage);

    const submitButton = new BaseComponent({
      tag: 'button',
      classNames: ['regFormSubmit'],
      type: 'submit',
      text: 'Register',
      id: 'regFormSubmit',
      placeholder: '',
      callback: () => {
        if ((adressesBlock.useSameChkBox.element as HTMLInputElement).checked) {
          (adressesBlock.billingAdress.street.element as HTMLInputElement).value = (
            adressesBlock.shippingAdress.street.element as HTMLInputElement
          ).value;
          (adressesBlock.billingAdress.city.element as HTMLInputElement).value = (
            adressesBlock.shippingAdress.city.element as HTMLInputElement
          ).value;
          (adressesBlock.billingAdress.postalCode.element as HTMLInputElement).value = (
            adressesBlock.shippingAdress.postalCode.element as HTMLInputElement
          ).value;
          (adressesBlock.billingAdress.country.element as HTMLInputElement).value = (
            adressesBlock.shippingAdress.country.element as HTMLInputElement
          ).value;
          adressesBlock.billingAdress.street.isValid = adressesBlock.shippingAdress.street.isValid;
          adressesBlock.billingAdress.city.isValid = adressesBlock.shippingAdress.street.isValid;
          adressesBlock.billingAdress.postalCode.isValid =
            adressesBlock.shippingAdress.street.isValid;
          adressesBlock.billingAdress.country.isValid = adressesBlock.shippingAdress.street.isValid;
        }

        if (
          firstName.isValid &&
          lastName.isValid &&
          emailAdress.isValid &&
          password.input.isValid &&
          dateOfBirth.isValid &&
          adressesBlock.shippingAdress.street.isValid &&
          adressesBlock.shippingAdress.city.isValid &&
          adressesBlock.shippingAdress.postalCode.isValid &&
          adressesBlock.shippingAdress.country.isValid &&
          adressesBlock.billingAdress.street.isValid &&
          adressesBlock.billingAdress.city.isValid &&
          adressesBlock.billingAdress.postalCode.isValid &&
          adressesBlock.billingAdress.country.isValid
        ) {
          const billingCountryCode = countries.find(
            (country) =>
              country.country ===
              (adressesBlock.billingAdress.country.element as HTMLInputElement).value
          )?.ISO;
          const shippingCountryCode = countries.find(
            (country) =>
              country.country ===
              (adressesBlock.shippingAdress.country.element as HTMLInputElement).value
          )?.ISO;
          const customer: Mutable<CustomerDraft> = {
            firstName: (firstName.element as HTMLInputElement).value,
            lastName: (lastName.element as HTMLInputElement).value,
            email: (emailAdress.element as HTMLInputElement).value,
            password: (password.input.element as HTMLInputElement).value,
            dateOfBirth: (dateOfBirth.element as HTMLInputElement).value,
            addresses: [
              {
                country: shippingCountryCode || '',
                city: (adressesBlock.shippingAdress.city.element as HTMLInputElement).value,
                streetName: (adressesBlock.shippingAdress.street.element as HTMLInputElement).value,
                postalCode: (adressesBlock.shippingAdress.postalCode.element as HTMLInputElement)
                  .value,
              },
            ],
          };
          customer.shippingAddresses = [0];
          customer.billingAddresses = [1];
          if (!(adressesBlock.useSameChkBox.element as HTMLInputElement).checked) {
            customer.addresses?.push({
              country: billingCountryCode || '',
              city: (adressesBlock.billingAdress.city.element as HTMLInputElement).value,
              streetName: (adressesBlock.billingAdress.street.element as HTMLInputElement).value,
              postalCode: (adressesBlock.billingAdress.postalCode.element as HTMLInputElement)
                .value,
            });
            customer.billingAddresses = [1];
          } else customer.billingAddresses = [0];
          if ((adressesBlock.shippingAdress.setDefaultChkBox.element as HTMLInputElement).checked) {
            customer.defaultShippingAddress = 0;
          }
          if ((adressesBlock.billingAdress.setDefaultChkBox.element as HTMLInputElement).checked) {
            const temp = customer.billingAddresses[0];
            customer.defaultBillingAddress = temp;
          }

          connection
            .newCustomer(customer)
            .then(() => {
              popUpMessage.showMessage(
                'Customer succesfully registered. Welcome to green Shop',
                true
              );
              localStorage.setItem('logged', 'true');
            })
            .catch(() => popUpMessage.showMessage('User with this email already exists', false));
        } else {
          popUpMessage.showMessage('Please fulfill all fields correctly', false);
          inputsForValidation.forEach((input) => {
            const elem = input;
            if (!input.isValid) (elem.element.nextSibling as HTMLElement).style.opacity = '100%';
          });
        }
      },
    });

    this.addElement(
      formHeader,
      firstName,
      lastName,
      emailAdress,
      password,
      dateOfBirth,
      adressesBlock,
      submitButton
    );
  }
}

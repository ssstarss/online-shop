import BaseComponent from '../baseComponent';
import countries from './countries';

type CountryCode = {
  country: string;
  ISO: string;
  regExp: string;
  tip: string;
};

export default class Adress extends BaseComponent {
  adressesHeader: BaseComponent;

  street: BaseComponent;

  city: BaseComponent;

  postalCode: BaseComponent;

  country: BaseComponent;

  setDefaultChkBox: BaseComponent;

  constructor(typeOfAdress: string) {
    super({
      tag: 'div',
      classNames: ['Adresses'],
    });

    this.adressesHeader = new BaseComponent({
      tag: 'p',
      classNames: ['regFormAdressesText'],
      text: `Please enter ${typeOfAdress} adress`,
    });

    this.street = new BaseComponent({
      tag: 'input',
      classNames: ['regFormStreet', 'inputField'],
      type: 'text',
      placeholder: 'Street',
      pattern: /^([A-Za-z0-9]|.){1,}$/,
      tip: 'Please enter your street',
    });

    this.city = new BaseComponent({
      tag: 'input',
      classNames: ['regFormCity', 'inputField'],
      type: 'text',
      placeholder: 'City',
      pattern: /^[A-Za-z]+$/,
      tip: 'Please enter your city. No special characters or numbers',
    });

    this.postalCode = new BaseComponent({
      tag: 'input',
      classNames: ['regFormPostal', 'inputField'],
      type: 'text',
      placeholder: 'Postal Code',
      tip: 'Please enter correct Postal Code',
    });

    this.country = new BaseComponent({
      tag: 'input',
      classNames: ['regFormCountry', 'inputField'],
      type: 'text',
      placeholder: 'Country',
      tip: 'Please choose country',
    });
    this.country.element.onchange = () => {
      (this.postalCode.element as HTMLInputElement).value = '';
      const index = countries.findIndex(
        (country) => country.country === (this.country.element as HTMLInputElement).value
      );
      if (index > 0) {
        this.postalCode.pattern = new RegExp(countries[index].regExp);
        (this.postalCode.element.nextSibling as HTMLElement).innerHTML =
          `Postal Code for ${countries[index].country} looks like: ${countries[index].tip}`;
        (this.country.element.nextSibling as HTMLElement).style.opacity = '0%';
      } else {
        (this.country.element.nextSibling as HTMLElement).style.opacity = '100%';
      }
    };
    (this.country.element as HTMLInputElement).setAttribute('list', 'countries');

    const dataList = new BaseComponent({
      tag: 'datalist',
      classNames: ['dataList'],
      id: 'countries',
    });
    this.country.addElement(dataList);

    countries.forEach((item: CountryCode) => {
      const line = new BaseComponent({
        tag: 'option',
        classNames: ['countries'],
      });
      line.element.setAttribute('value', item.country);
      dataList.addElement(line);
    });

    const setDefaultWrapper = new BaseComponent({
      tag: 'div',
      classNames: ['setDefaultWrapper'],
    });

    const setDefaultText = new BaseComponent({
      tag: 'a',
      classNames: ['setDefaultText'],
      text: `Set as default ${typeOfAdress} address`,
    });

    this.setDefaultChkBox = new BaseComponent({
      tag: 'input',
      classNames: ['setDefaultChkBox'],
      type: 'checkbox',
    });
    setDefaultWrapper.addElement(setDefaultText, this.setDefaultChkBox);
    this.addElement(
      this.adressesHeader,
      this.street,
      this.city,
      this.postalCode,
      this.country,
      setDefaultWrapper
    );
  }
}

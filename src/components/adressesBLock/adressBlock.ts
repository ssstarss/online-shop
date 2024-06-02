import BaseComponent from '../../helpers/baseComponent';
import countries from './countries';

type Country = {
  country: string;
  ISO: string;
  regExp: string;
  tip: string;
};

export default class Adress extends BaseComponent {
  adressesTitle: BaseComponent;

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

    this.adressesTitle = new BaseComponent({
      tag: 'h3',
      classNames: ['addresses-title'],
      text: `${typeOfAdress} address:`,
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
      tip: 'Please enter your street. You may use letters, numbers, special symbols ',
    });

    this.city = new BaseComponent({
      tag: 'input',
      classNames: ['regFormCity', 'inputField'],
      type: 'text',
      placeholder: 'City',
      pattern: /^[A-Za-zА-Яа-я]+$/,
      tip: 'Please enter your city. Only letters, no special characters or numbers',
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
      this.postalCode.isValid = false;
      const index = countries.findIndex(
        (country) => country.country === (this.country.element as HTMLInputElement).value
      );
      if (index > -1) {
        this.postalCode.pattern = new RegExp(countries[index].regExp);
        (this.postalCode.element.nextSibling as HTMLElement).innerHTML =
          `Postal Code for ${countries[index].country} looks like: ${countries[index].tip}`;
        (this.country.element.nextSibling as HTMLElement).style.opacity = '0%';
      } else {
        (this.postalCode.element.nextSibling as HTMLElement).innerHTML = `Please enter Postal Code`;
        (this.country.element.nextSibling as HTMLElement).style.opacity = '100%';
        (this.postalCode.element as HTMLInputElement).value = '';
        this.postalCode.isValid = false;
      }
    };
    (this.country.element as HTMLInputElement).setAttribute('list', 'countries');

    const dataList = new BaseComponent({
      tag: 'datalist',
      classNames: ['dataList'],
      id: 'countries',
    });
    this.country.addElement(dataList);

    countries.forEach((item: Country) => {
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
      this.adressesTitle,
      this.adressesHeader,
      this.street,
      this.city,
      this.country,
      this.postalCode,
      setDefaultWrapper
    );
  }
}

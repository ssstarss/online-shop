import createElement from '../../../helpers/createElement';
import RegistrationForm from '../../../pages/registrationPage/registrationForm/registrationForm';
import AdressesBlock from '../../adressesBLock/adressesBlock';
import countries from '../../adressesBLock/countries';
import getCustomerData from '../getCustomerData';

interface Address {
  id: string;
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
}

const addressContainer = createElement({ tag: 'div', className: 'address-container' });
const registrationForm = new RegistrationForm();
const buttonSubmit = registrationForm.getSubmitButton();

const addressBlock = new AdressesBlock();

function disableAllFieldsShipping() {
  addressBlock.shippingAdress.street.disable();
  addressBlock.shippingAdress.city.disable();
  addressBlock.shippingAdress.country.disable();
  addressBlock.shippingAdress.postalCode.disable();
  addressBlock.shippingAdress.setDefaultChkBox.disable();
  addressBlock.useSameChkBox.disable();
}

export function enableAllFieldsShipping() {
  addressBlock.shippingAdress.street.enable();
  addressBlock.shippingAdress.city.enable();
  addressBlock.shippingAdress.country.enable();
  addressBlock.shippingAdress.postalCode.enable();
  addressBlock.shippingAdress.setDefaultChkBox.enable();
  addressBlock.useSameChkBox.enable();
}

disableAllFieldsShipping();

export function disableAllFieldsBilling() {
  addressBlock.billingAdress.street.disable();
  addressBlock.billingAdress.city.disable();
  addressBlock.billingAdress.country.disable();
  addressBlock.billingAdress.postalCode.disable();
  addressBlock.billingAdress.setDefaultChkBox.disable();
}
export function enableAllFieldsBilling() {
  addressBlock.billingAdress.street.enable();
  addressBlock.billingAdress.city.enable();
  addressBlock.billingAdress.country.enable();
  addressBlock.billingAdress.postalCode.enable();
  addressBlock.billingAdress.setDefaultChkBox.enable();
}
export function enableSubmitButton() {
  buttonSubmit.enable();
  buttonSubmit.removeClass('disable-btn');
}
disableAllFieldsBilling();

addressBlock.shippingAdress.adressesHeader.setTextContent(
  'The following addresses will be used on the checkout page by default.'
);

function getCountryName(countryISO: string): string {
  const countryData = countries.find((country) => country.ISO === countryISO);
  return countryData ? countryData.country : countryISO;
}
function isDefaultAddress(addressId: string, defaultAddressId: string | undefined): boolean {
  return addressId === defaultAddressId;
}

export async function fillCustomerData() {
  const customer = await getCustomerData();
  if (customer) {
    const shippingAddresses = customer.addresses.filter((address: Address) =>
      customer.shippingAddressIds.includes(address.id)
    );
    const billingAddresses = customer.addresses.filter((address: Address) =>
      customer.billingAddressIds.includes(address.id)
    );
    shippingAddresses.forEach((address: Address) => {
      const countryName = getCountryName(address.country);
      addressBlock.shippingAdress.street.setValue(`${address.streetName}`);
      addressBlock.shippingAdress.city.setValue(`${address.city}`);
      addressBlock.shippingAdress.country.setValue(`${countryName}`);
      addressBlock.shippingAdress.postalCode.setValue(`${address.postalCode}`);
      const checkboxShipping = addressBlock.shippingAdress.setDefaultChkBox
        .element as HTMLInputElement;
      checkboxShipping.checked = isDefaultAddress(address.id, customer.defaultShippingAddressId);
    });
    billingAddresses.forEach((address: Address) => {
      const countryName = getCountryName(address.country);
      addressBlock.billingAdress.street.setValue(`${address.streetName}`);
      addressBlock.billingAdress.city.setValue(`${address.city}`);
      addressBlock.billingAdress.country.setValue(`${countryName}`);
      addressBlock.billingAdress.postalCode.setValue(`${address.postalCode}`);
      const checkboxBilling = addressBlock.billingAdress.setDefaultChkBox
        .element as HTMLInputElement;
      checkboxBilling.checked = isDefaultAddress(address.id, customer.defaultBillingAddressId);
    });
  }
}

addressBlock.shippingAdress.street.addLabel('Street');
addressBlock.shippingAdress.city.addLabel('City');
addressBlock.shippingAdress.country.addLabel('Country');
addressBlock.shippingAdress.postalCode.addLabel('Postal Code');

addressBlock.billingAdress.street.addLabel('Street');
addressBlock.billingAdress.city.addLabel('City');
addressBlock.billingAdress.country.addLabel('Country');
addressBlock.billingAdress.postalCode.addLabel('Postal Code');

export const buttonWrap = createElement({ tag: 'div', className: 'button-wrap' });

export const buttonChangeAddress = createElement({
  tag: 'button',
  className: 'button-change button',
  textContent: 'Change',
});
buttonChangeAddress.addEventListener('click', () => {
  enableAllFieldsShipping();
  enableAllFieldsBilling();
  enableSubmitButton();
});

buttonSubmit.setTextContent('Save change');
buttonSubmit.disable();
buttonSubmit.setCssClasses(['disable-btn']);

buttonWrap.append(buttonChangeAddress, buttonSubmit.getElement());

addressContainer.append(addressBlock.getElement(), buttonWrap);

document.addEventListener('DOMContentLoaded', fillCustomerData);

export default addressContainer;

import createElement from '../../../helpers/createElement';
import AdressesBlock from '../../adressesBLock/adressesBlock';

const addressContainer = createElement({ tag: 'div', className: 'address-container' });
const addressBlock = new AdressesBlock();

addressBlock.shippingAdress.adressesHeader.setTextContent(
  'The following addresses will be used on the checkout page by default.'
);

addressBlock.shippingAdress.street.addLabel('Street');
addressBlock.shippingAdress.city.addLabel('City');
addressBlock.shippingAdress.country.addLabel('Country');
addressBlock.shippingAdress.postalCode.addLabel('Postal Code');

addressBlock.billingAdress.street.addLabel('Street');
addressBlock.billingAdress.city.addLabel('City');
addressBlock.billingAdress.country.addLabel('Country');
addressBlock.billingAdress.postalCode.addLabel('Postal Code');

const buttonWrap = createElement({ tag: 'div', className: 'button-wrap' });

const buttonChange = createElement({
  tag: 'button',
  className: 'button-change button',
  textContent: 'Change',
});

const buttonSaveChange = createElement({
  tag: 'button',
  className: 'button-save-change button',
  textContent: 'Save Change',
});
buttonWrap.append(buttonChange, buttonSaveChange);
addressContainer.append(addressBlock.getElement(), buttonWrap);

export default addressContainer;

import createElement from '../../../helpers/createElement';
import AdressesBlock from '../../adressesBLock/adressesBlock';

const addressContainer = createElement({ tag: 'div', className: 'address-container' });

const addressBlock = new AdressesBlock();
// const addressBillingWrap = createElement({ tag: 'div', className: 'address__billing-wrap' });
// const addressShippingWrap = createElement({ tag: 'div', className: 'address__shipping-wrap' });

// const addressBillingTitle = createElement({
//   tag: 'h3',
//   className: 'address__title',
//   textContent: 'Billing Address',
// });

// const addressShippingTitle = createElement({
//   tag: 'h3',
//   className: 'address__title',
//   textContent: 'Shipping Address',
// });

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

import BaseComponent from '../../../helpers/baseComponent';
import createElement from '../../../helpers/createElement';
import RegistrationForm from '../../../pages/registrationPage/registrationForm/registrationForm';
import getCustomerData from '../getCustomerData';

const accountDetails = createElement({ tag: 'form', className: 'account-details' });
const accountDetailsTitle = createElement({
  tag: 'h3',
  className: 'account-details__title',
  textContent: 'Personal Information',
});
const registrationForm = new RegistrationForm();
const firstNameField = registrationForm.getFirstName();
const lastNameField = registrationForm.getLastName();
const dateOfBirthField = registrationForm.getDateOfBirth();
const emailAdressField = registrationForm.getEmailAdress();
const passwordField = registrationForm.getPassword();
const buttonSubmit = registrationForm.getSubmitButton();

export async function enableFields() {
  firstNameField.enable();
  lastNameField.enable();
  dateOfBirthField.enable();
  emailAdressField.enable();
  passwordField.enable();
  buttonSubmit.enable();
  buttonSubmit.removeClass('disable-btn');
}

export async function disableFields() {
  firstNameField.disable();
  lastNameField.disable();
  dateOfBirthField.disable();
  emailAdressField.disable();
  passwordField.disable();
}

disableFields();

let labelsAdded = false;

export async function fillCustomerDetails() {
  const customer = await getCustomerData();
  console.log(customer);
  if (customer) {
    firstNameField.setValue(`${customer.firstName}`);
    lastNameField.setValue(`${customer.lastName}`);
    dateOfBirthField.setValue(`${customer.dateOfBirth}`);
    emailAdressField.setValue(`${customer.email}`);
    passwordField.setValue(`${customer.password}`);

    if (!labelsAdded) {
      firstNameField.addLabel('First Name');
      lastNameField.addLabel('Last Name');
      dateOfBirthField.addLabel('Date of Birth');
      emailAdressField.addLabel('Email Address');
      passwordField.addLabel('Password');
      labelsAdded = true;
    }
  }
}
export const buttonWrap = createElement({ tag: 'div', className: 'button-wrap' });

export const buttonChange = createElement({
  tag: 'button',
  className: 'button-change button',
  textContent: 'Change',
});
buttonChange.addEventListener('click', enableFields);

buttonSubmit.setTextContent('Save change');
buttonSubmit.disable();
buttonSubmit.setCssClasses(['disable-btn']);

const accountDetailsWrapper = new BaseComponent({
  tag: 'div',
  classNames: ['accountDetailsWrapper'],
});

accountDetailsWrapper.addElement(
  registrationForm.firstName,
  registrationForm.lastName,
  registrationForm.dateOfBirth,
  registrationForm.emailAdress,
  registrationForm.password
);

buttonWrap.append(buttonChange, buttonSubmit.getElement());
accountDetails.append(accountDetailsTitle, accountDetailsWrapper.getElement(), buttonWrap);

export default accountDetails;

import { connectionByFetch } from '../../../app/connectionByFetch';
import BaseComponent from '../../../helpers/baseComponent';
import createElement from '../../../helpers/createElement';
import PopUpMessage from '../../../pages/registrationPage/registrationForm/popUpMessage/popUpMessage';
import RegistrationForm from '../../../pages/registrationPage/registrationForm/registrationForm';
import getCustomerData from '../getCustomerData';
import { CustomerAccauntDetails } from '../../../interfaces/customer';

const accountDetails = createElement({ tag: 'form', className: 'account-details' });
const accountDetailsTitle = createElement({
  tag: 'h3',
  className: 'account-details__title',
  textContent: 'Personal Information',
});
const registrationForm = new RegistrationForm();
const firstNameField = registrationForm.getFirstName();
firstNameField.isValid = true;
const lastNameField = registrationForm.getLastName();
lastNameField.isValid = true;
const dateOfBirthField = registrationForm.getDateOfBirth();
dateOfBirthField.isValid = true;
const emailAdressField = registrationForm.getEmailAdress();
emailAdressField.isValid = true;

const buttonSubmit = registrationForm.getSubmitButton();

const popUpMessageCanvas = new BaseComponent({
  tag: 'div',
  classNames: ['popUpMessageCanvas'],
  id: 'popUpMessageCanvas',
});
accountDetails.append(popUpMessageCanvas.element);
const popUpMessage = new PopUpMessage();
accountDetails.append(popUpMessage.element);

export async function enableFields() {
  firstNameField.enable();
  lastNameField.enable();
  dateOfBirthField.enable();
  emailAdressField.enable();
  buttonSubmit.enable();
  buttonSubmit.removeClass('disable-btn');
}

export async function disableFields() {
  firstNameField.disable();
  lastNameField.disable();
  dateOfBirthField.disable();
  emailAdressField.disable();
  buttonSubmit.disable();
  buttonSubmit.setCssClasses(['disable-btn']);
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

    if (!labelsAdded) {
      firstNameField.addLabel('First Name');
      lastNameField.addLabel('Last Name');
      dateOfBirthField.addLabel('Date of Birth');
      emailAdressField.addLabel('Email Address');
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
  registrationForm.emailAdress

);

buttonWrap.append(buttonChange, buttonSubmit.getElement());
accountDetails.append(accountDetailsTitle, accountDetailsWrapper.getElement(), buttonWrap);
buttonSubmit.element.onclick = (event) => {
  event.preventDefault();
  if (
    registrationForm.firstName.isValid &&
    registrationForm.lastName.isValid &&
    registrationForm.emailAdress.isValid &&
    registrationForm.dateOfBirth.isValid
  ) {
    const customerUpdate: CustomerAccauntDetails = {
      version: connectionByFetch.currentCustomer.version,
      id: connectionByFetch.currentCustomer.id,
      firstName: firstNameField.getValue(),
      lastName: lastNameField.getValue(),
      dateOfBirth: dateOfBirthField.getValue(),
      email: emailAdressField.getValue(),
    };
    connectionByFetch
      .updateCustomer(customerUpdate)
      .then((response) => {
        popUpMessage.registered = false;
        if (response.ok) popUpMessage.showMessage('Customer data succesfully changed', false);
        disableFields();
      })
      .catch((error) => popUpMessage.showMessage(error, false));
  } else popUpMessage.showMessage('Please fulfill all fields correctly', false);
};

export default accountDetails;

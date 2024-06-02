import createElement from '../../../helpers/createElement';
import RegistrationForm from '../../../pages/registrationPage/registrationForm/registrationForm';
import { buttonWrap } from '../buttonWrap/buttonWrap';
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

let labelsAdded = false;

export async function fillCustomerDetails() {
  const customer = await getCustomerData();
  if (customer) {
    firstNameField.setValue(`${customer.firstName}`);
    lastNameField.setValue(`${customer.lastName}`);
    dateOfBirthField.setValue(`${customer.dateOfBirth}`);

    if (!labelsAdded) {
      firstNameField.addLabel('First Name');
      firstNameField.disable();
      lastNameField.addLabel('Last Name');
      lastNameField.disable();
      dateOfBirthField.addLabel('Date of Birth');
      dateOfBirthField.disable();
      labelsAdded = true;
    }
  }
}

accountDetails.append(
  accountDetailsTitle,
  registrationForm.firstName.getElement(),
  registrationForm.lastName.getElement(),
  registrationForm.dateOfBirth.getElement(),
  buttonWrap
);

export default accountDetails;

import createElement from '../../../helpers/createElement';

const accountDetails = createElement({ tag: 'div', className: 'account-details' });
const accountDetailsTitle = createElement({
  tag: 'h3',
  className: 'account-details__title',
  textContent: 'Personal Information',
});

const firstNameLabel = createElement({
  tag: 'label',
  className: 'label',
  for: 'firstName',
  textContent: 'First Name',
});

const firstName = createElement({
  tag: 'input',
  className: 'firstName inputField',
  type: 'text',
  placeholder: 'First Name',
  id: 'firstName',
});

const lastNameLabel = createElement({
  tag: 'label',
  className: 'label',
  for: 'lastName',
  textContent: 'Last Name',
});

const lastName = createElement({
  tag: 'input',
  className: 'lastName inputField',
  type: 'text',
  placeholder: 'Last Name',
  title: 'Last Name',
  id: 'lastName',
});

const dateOfBirthLabel = createElement({
  tag: 'label',
  className: 'label',
  for: 'dateOfBirth',
  textContent: 'Date of Birth',
});

const dateOfBirth = createElement({
  tag: 'input',
  className: 'dateOfBirth inputField',
  type: 'date',
  placeholder: '',
  id: 'dateOfBirth',
});

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
accountDetails.append(
  accountDetailsTitle,
  firstNameLabel,
  firstName,
  lastNameLabel,
  lastName,
  dateOfBirthLabel,
  dateOfBirth,
  buttonWrap
);

export default accountDetails;

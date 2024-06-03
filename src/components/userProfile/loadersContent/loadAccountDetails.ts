import userProfilePage from '../../../pages/userProfilePage/userProfilePage';
import accountDetails, { fillCustomerDetails } from '../accountDetails/accountDetails';
import profileList from '../userProfileMenu/userProfileMenu';

const loadAccountDetails = () => {
  userProfilePage.innerHTML = '';
  userProfilePage.append(profileList, accountDetails);
  fillCustomerDetails();

  return userProfilePage;
};

export default loadAccountDetails;

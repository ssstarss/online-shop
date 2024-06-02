import userProfilePage from '../../../pages/userProfilePage/userProfilePage';
import accountDetails from '../accountDetails/accountDetails';
import profileList from '../userProfileMenu/userProfileMenu';

const loadAccountDetails = () => {
  userProfilePage.innerHTML = '';
  userProfilePage.append(profileList, accountDetails);

  return userProfilePage;
};

export default loadAccountDetails;

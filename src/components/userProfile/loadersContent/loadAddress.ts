import userProfilePage from '../../../pages/userProfilePage/userProfilePage';
import addressContainer from '../address/address';
import profileList from '../userProfileMenu/userProfileMenu';

const loadAddress = () => {
  userProfilePage.innerHTML = '';
  userProfilePage.append(profileList, addressContainer);

  return userProfilePage;
};

export default loadAddress;

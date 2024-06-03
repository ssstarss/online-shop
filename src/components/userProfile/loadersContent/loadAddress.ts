import userProfilePage from '../../../pages/userProfilePage/userProfilePage';
import addressContainer, { fillCustomerData } from '../address/address';
import profileList from '../userProfileMenu/userProfileMenu';

const loadAddress = () => {
  userProfilePage.innerHTML = '';
  userProfilePage.append(profileList, addressContainer);
  fillCustomerData();

  return userProfilePage;
};

export default loadAddress;

import accountDetails from '../../components/userProfile/accountDetails/assountDetails';
import profileList from '../../components/userProfile/userProfileMenu/userProfileMenu';
import createElement from '../../helpers/createElement';

const userProfilePage = createElement({
  tag: 'section',
  className: 'user-profile',
});

userProfilePage.append(profileList, accountDetails);

export default userProfilePage;

import accountDetails from '../../components/userProfile/accountDetails/accountDetails';
import profileList, {
  profileAccountDetails,
} from '../../components/userProfile/userProfileMenu/userProfileMenu';
import createElement from '../../helpers/createElement';

const userProfilePage = createElement({
  tag: 'section',
  className: 'user-profile',
});

profileAccountDetails.classList.add('active__item');
userProfilePage.append(profileList, accountDetails);

export default userProfilePage;

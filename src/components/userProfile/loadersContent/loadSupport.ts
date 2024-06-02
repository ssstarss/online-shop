import createElement from '../../../helpers/createElement';
import userProfilePage from '../../../pages/userProfilePage/userProfilePage';
import profileList from '../userProfileMenu/userProfileMenu';

const loadSupport = () => {
  userProfilePage.innerHTML = '';
  const supportContainer = createElement({
    tag: 'div',
    className: 'support-container',
    textContent: 'Support',
  });
  userProfilePage.append(profileList, supportContainer);

  return userProfilePage;
};

export default loadSupport;

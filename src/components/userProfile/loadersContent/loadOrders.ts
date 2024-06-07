import createElement from '../../../helpers/createElement';
import userProfilePage from '../../../pages/userProfilePage/userProfilePage';
import profileList from '../userProfileMenu/userProfileMenu';

const loadOrders = () => {
  userProfilePage.innerHTML = '';
  const ordersContainer = createElement({
    tag: 'div',
    className: 'orders-container',
    textContent: 'ORDERS',
  });
  userProfilePage.append(profileList, ordersContainer);

  return userProfilePage;
};

export default loadOrders;

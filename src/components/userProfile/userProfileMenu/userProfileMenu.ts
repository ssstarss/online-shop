import { locationSvg, logoutSvg, shoppingSvg, supportSvg, userSvg } from '../../../assets/icons';
import createElement from '../../../helpers/createElement';

const profileList = createElement({
  tag: 'ul',
  className: 'profile__menu-list',
  textContent: 'My account',
});

const createProfileMenuItem = (text: string, svg: string) => {
  const item = createElement({
    tag: 'li',
    className: 'profile__menu-list-item',
  });
  item.innerHTML = `${svg} <span>${text}</span>`;
  return item;
};

const profileAccountDetails = createProfileMenuItem('Account Details', userSvg);
const profileAddress = createProfileMenuItem('Address', locationSvg);
const profileOrders = createProfileMenuItem('Orders', shoppingSvg);
const profileSupport = createProfileMenuItem('Support', supportSvg);
const profileLogout = createProfileMenuItem('Logout', logoutSvg);

profileList.append(
  profileAccountDetails,
  profileAddress,
  profileOrders,
  profileSupport,
  profileLogout
);

export default profileList;

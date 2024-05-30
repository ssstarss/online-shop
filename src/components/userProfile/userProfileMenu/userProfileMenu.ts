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

export const profileAccountDetails = createProfileMenuItem('Account Details', userSvg);
export const profileAddress = createProfileMenuItem('Address', locationSvg);
export const profileOrders = createProfileMenuItem('Orders', shoppingSvg);
export const profileSupport = createProfileMenuItem('Support', supportSvg);
export const profileLogout = createProfileMenuItem('Logout', logoutSvg);

profileList.append(
  profileAccountDetails,
  profileAddress,
  profileOrders,
  profileSupport,
  profileLogout
);

export default profileList;

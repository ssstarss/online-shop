import { loginLink, registerLink } from '../components/loginHeader/loginHeader';
import { buttonHome } from '../pages/page404/page404';
import {
  basketLink,
  burgerMenu,
  headerLinkBlogs,
  headerLinkCatalog,
  headerLinkHome,
  loginButton,
  logoLink,
  logoutButton,
  mobileBasketLink,
  mobileLinkBlogs,
  mobileLinkCatalog,
  mobileLinkHome,
  mobileLoginButton,
  mobileLogoutButton,
  mobileMenu,
  mobileRegisterButton,
  mobileSearchLink,
  mobileUserProfileButton,
  registerButton,
  searchLink,
  userProfile,
} from '../components/header/header';
import navigate from '../utils/navigate';
import {
  profileAccountDetails,
  profileAddress,
  profileLogout,
  profileOrders,
  profileSupport,
} from '../components/userProfile/userProfileMenu/userProfileMenu';
import loadAccountDetails from '../components/userProfile/loadersContent/loadAccountDetails';
import loadAddress from '../components/userProfile/loadersContent/loadAddress';
import {
  buttonChange,
  enableFields,
} from '../components/userProfile/accountDetails/accountDetails';
import loadOrders from '../components/userProfile/loadersContent/loadOrders';
import loadSupport from '../components/userProfile/loadersContent/loadSupport';
import {
  buttonChangeAddress,
  enableAllFieldsBilling,
  enableAllFieldsShipping,
  enableSubmitButton,
} from '../components/userProfile/address/address';

buttonHome.addEventListener('click', () => {
  navigate('/main');
});

logoLink.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/main');
});

headerLinkHome.addEventListener('click', (event) => {
  event.preventDefault();
  headerLinkHome.classList.add('active-header');
  headerLinkBlogs.classList.remove('active-header');
  headerLinkCatalog.classList.remove('active-header');
  navigate('/main');
});

headerLinkCatalog.addEventListener('click', (event) => {
  event.preventDefault();
  headerLinkHome.classList.remove('active-header');
  headerLinkBlogs.classList.remove('active-header');
  headerLinkCatalog.classList.add('active-header');
  navigate('/catalog');
});

headerLinkBlogs.addEventListener('click', (event) => {
  event.preventDefault();
  headerLinkHome.classList.remove('active-header');
  headerLinkBlogs.classList.add('active-header');
  headerLinkCatalog.classList.remove('active-header');
  navigate('/blogs');
});

searchLink.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/main');
});
basketLink.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/main');
});

loginButton.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/login');
});

registerButton.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/register');
});

loginLink.addEventListener('click', (event) => {
  event.preventDefault();
  registerLink.classList.remove('login__link--active');
  loginLink.classList.add('login__link--active');
  navigate('/login');
});

registerLink.addEventListener('click', (event) => {
  event.preventDefault();
  loginLink.classList.remove('login__link--active');
  registerLink.classList.add('login__link--active');
  navigate('/register');
});

burgerMenu.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  burgerMenu.classList.toggle('active');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 550) {
    mobileMenu.classList.remove('active');
    burgerMenu.classList.remove('active');
  }
});

mobileLinkHome.addEventListener('click', (event) => {
  mobileMenu.classList.toggle('active');
  event.preventDefault();
  navigate('/main');
});

mobileLinkCatalog.addEventListener('click', (event) => {
  mobileMenu.classList.toggle('active');
  event.preventDefault();
  navigate('/catalog');
});
mobileLinkBlogs.addEventListener('click', (event) => {
  mobileMenu.classList.toggle('active');
  event.preventDefault();
  navigate('/blogs');
});
mobileSearchLink.addEventListener('click', (event) => {
  mobileMenu.classList.toggle('active');
  event.preventDefault();
  navigate('/main');
});
mobileBasketLink.addEventListener('click', (event) => {
  mobileMenu.classList.toggle('active');
  event.preventDefault();
  navigate('/main');
});

mobileLoginButton.addEventListener('click', (event) => {
  mobileMenu.classList.toggle('active');
  event.preventDefault();
  navigate('/login');
});

mobileRegisterButton.addEventListener('click', (event) => {
  mobileMenu.classList.toggle('active');
  event.preventDefault();
  navigate('/register');
});

const updateButtonVisibility = () => {
  const isLoggedIn = localStorage.getItem('logged');
  if (isLoggedIn) {
    mobileLoginButton.style.display = 'none';
    mobileRegisterButton.style.display = 'none';
    mobileLogoutButton.style.display = 'block';
    mobileUserProfileButton.style.display = 'block';
    loginButton.style.display = 'none';
    registerButton.style.display = 'none';
    logoutButton.style.display = 'block';
    userProfile.style.display = 'block';
  } else {
    mobileLoginButton.style.display = 'flex';
    mobileRegisterButton.style.display = 'flex';
    mobileLogoutButton.style.display = 'none';
    mobileUserProfileButton.style.display = 'none';
    loginButton.style.display = 'flex';
    registerButton.style.display = 'flex';
    logoutButton.style.display = 'none';
    userProfile.style.display = 'none';
  }
};

window.addEventListener('storage', updateButtonVisibility);

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('logged');
  localStorage.removeItem('id');
  localStorage.removeItem('token');
  updateButtonVisibility();
  navigate('/main');
});

userProfile.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/profile');
  document.querySelectorAll('.profile__menu-list-item').forEach((element) => {
    element.classList.remove('active__item');
  });
  profileAccountDetails.classList.add('active__item');
  loadAccountDetails();
});

mobileUserProfileButton.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/profile');
  document.querySelectorAll('.profile__menu-list-item').forEach((element) => {
    element.classList.remove('active__item');
  });
  profileAccountDetails.classList.add('active__item');
  loadAccountDetails();
});
profileAddress.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelectorAll('.profile__menu-list-item').forEach((element) => {
    element.classList.remove('active__item');
  });
  profileAddress.classList.add('active__item');
});

profileOrders.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelectorAll('.profile__menu-list-item').forEach((element) => {
    element.classList.remove('active__item');
  });
  profileOrders.classList.add('active__item');
  loadOrders();
});

profileSupport.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelectorAll('.profile__menu-list-item').forEach((element) => {
    element.classList.remove('active__item');
  });
  profileSupport.classList.add('active__item');
  loadSupport();
});

profileAccountDetails.addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelectorAll('.profile__menu-list-item').forEach((element) => {
    element.classList.remove('active__item');
  });
  profileAccountDetails.classList.add('active__item');
});

profileAccountDetails.addEventListener('click', (event) => {
  event.preventDefault();
  loadAccountDetails();
});

profileAddress.addEventListener('click', (event) => {
  event.preventDefault();
  loadAddress();
});

profileLogout.addEventListener('click', (event) => {
  event.preventDefault();
  localStorage.removeItem('logged');
  localStorage.removeItem('id');
  localStorage.removeItem('token');
  updateButtonVisibility();
  navigate('/main');
});

buttonChange.addEventListener('click', (event) => {
  event.preventDefault();
  enableFields();
});

buttonChangeAddress.addEventListener('click', (event) => {
  event.preventDefault();
  enableAllFieldsBilling();
  enableAllFieldsShipping();
  enableSubmitButton();
});

document.addEventListener('DOMContentLoaded', updateButtonVisibility);

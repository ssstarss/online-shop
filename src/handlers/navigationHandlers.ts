import { loginLink, registerLink } from '../components/loginHeader/loginHeader';
import {
  blogsLinkMain,
  catalogLinkMain,
  loginLinkMain,
  mainLink,
  registerLinkMain,
} from '../pages/mainPage/mainPage';
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
  registerButton,
  searchLink,
} from '../components/header/header';
import navigate from '../utils/navigate';

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

mainLink.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/main');
});

loginLinkMain.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/login');
});

registerLinkMain.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/register');
});

catalogLinkMain.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/catalog');
});

blogsLinkMain.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/blogs');
});
const updateButtonVisibility = () => {
  const isLoggedIn = localStorage.getItem('logged');
  if (isLoggedIn) {
    mobileLoginButton.style.display = 'none';
    mobileRegisterButton.style.display = 'none';
    mobileLogoutButton.style.display = 'block';
    loginButton.style.display = 'none';
    registerButton.style.display = 'none';
    logoutButton.style.display = 'block';
  } else {
    mobileLoginButton.style.display = 'flex';
    mobileRegisterButton.style.display = 'flex';
    mobileLogoutButton.style.display = 'none';
    loginButton.style.display = 'flex';
    registerButton.style.display = 'flex';
    logoutButton.style.display = 'none';
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

document.addEventListener('DOMContentLoaded', updateButtonVisibility);

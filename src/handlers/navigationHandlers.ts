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
  mobileBasketLink,
  mobileLinkBlogs,
  mobileLinkCatalog,
  mobileLinkHome,
  mobileLoginButton,
  mobileMenu,
  mobileSearchLink,
  searchLink,
} from '../components/header/header';
import navigate from '../utils/navigate';

buttonHome.addEventListener('click', () => {
  navigate('/');
});

logoLink.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/');
});

headerLinkHome.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/');
});

headerLinkCatalog.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/catalog');
});

headerLinkBlogs.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/blogs');
});

searchLink.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/');
});
basketLink.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/blogs');
});

loginButton.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/login');
});

loginLink.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/login');
});

registerLink.addEventListener('click', (event) => {
  event.preventDefault();
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
  navigate('/');
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
  navigate('/');
});
mobileBasketLink.addEventListener('click', (event) => {
  mobileMenu.classList.toggle('active');
  event.preventDefault();
  navigate('/');
});

mobileLoginButton.addEventListener('click', (event) => {
  mobileMenu.classList.toggle('active');
  event.preventDefault();
  navigate('/login');
});

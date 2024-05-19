import { buttonHome } from '../pages/page404/page404';
import {
  headerLinkBlogs,
  headerLinkCatalog,
  headerLinkHome,
  loginButton,
  logoLink,
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

loginButton.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/login');
});

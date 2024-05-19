import { navigate } from '../utils/router';
import { buttonHome } from '../pages/page404/page404';
import { logoLink } from '../components/header/header';

buttonHome.addEventListener('click', () => {
  navigate('/');
});

logoLink.addEventListener('click', (event) => {
  event.preventDefault();
  navigate('/');
});

import { navigate } from '../utils/router';
import { buttonHome } from '../pages/page404/page404';

buttonHome.addEventListener('click', () => {
  navigate('/');
});
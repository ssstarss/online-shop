import header from '../components/header/header';
import mainContainer from '../components/mainContainer/mainContainer';
import { navigate } from '../utils/router';

const App = () => {
  navigate(window.location.pathname);
  document.body.append(header, mainContainer);
};

document.addEventListener('DOMContentLoaded', App);

export default App;

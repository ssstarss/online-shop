import mainContainer from '../components/mainContainer/mainContainer';
import { navigate } from '../utils/router';

const App = () => {
  navigate(window.location.pathname);
  document.body.append(mainContainer);
};

document.addEventListener('DOMContentLoaded', App);

export default App;

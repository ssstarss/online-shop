import footerContainer from '../components/footer/footer';
import header from '../components/header/header';
import mainContainer from '../components/mainContainer/mainContainer';
import navigate from '../utils/navigate';
import initRouting from '../utils/router2';

const App = () => {
  navigate(window.location.pathname);
  document.body.append(header, mainContainer, footerContainer);
};

document.addEventListener('DOMContentLoaded', App);
initRouting();
export default App;

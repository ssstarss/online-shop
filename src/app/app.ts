import footerContainer from '../components/footer/footer';
import header from '../components/header/header';
import generatePreloader from '../components/loader/loader';
import mainContainer from '../components/mainContainer/mainContainer';
import initRouting from '../utils/router2';
import { connectionByFetch } from './connectionByFetch';

const connectionByFetchInit = connectionByFetch;

const App = async () => {
  const preloader = generatePreloader();
  document.body.append(preloader);
  await connectionByFetchInit.init();
  document.body.append(header, mainContainer, footerContainer);
  initRouting();
  preloader.classList.add('hidden');
};

document.addEventListener('DOMContentLoaded', App);

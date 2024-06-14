import footerContainer from '../components/footer/footer';
import header from '../components/header/header';
import generatePreloader from '../components/loader/loader';
import mainContainer from '../components/mainContainer/mainContainer';
import getCart from '../utils/getCart';
import initRouting from '../utils/router2';
import updateCartInHeader from '../utils/updateCartInHeader';
import { connectionByFetch } from './connectionByFetch';

const connectionByFetchInit = connectionByFetch;

const App = async () => {
  const preloader = generatePreloader();
  document.body.append(preloader);

  try {
    await connectionByFetchInit.init();

    const [cartResponse] = await Promise.all([getCart()]);

    const totalItemsInCart = cartResponse.totalLineItemQuantity;
    updateCartInHeader(totalItemsInCart);
  } catch (error) {
    console.error('Error during initialization:', error);
  } finally {
    document.body.append(header, mainContainer, footerContainer);
    initRouting();
    preloader.remove();
  }
};

document.addEventListener('DOMContentLoaded', App);

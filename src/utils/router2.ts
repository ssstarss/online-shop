import handleCatalogLoading from '../handlers/handleCatalogLoading';
import {
  renderMainPage,
  renderLoginPage,
  renderRegisterPage,
  renderAboutUsPage,
  render404Page,
  renderUserProfilePage,
  renderCatalogDetailedPage,
  renderCartPage,
} from './pageRenders';
import router from './router';

export default function initRouting() {
  router
    .on({
      '/': renderMainPage,
      '/main': renderMainPage,
      '/login': () => {
        if (localStorage.getItem('logged')) {
          router.navigate('/main');
        } else {
          renderLoginPage();
        }
      },
      '/register': () => {
        if (localStorage.getItem('logged')) {
          router.navigate('/main');
        } else {
          renderRegisterPage();
        }
      },
      '/cart': renderCartPage,
      '/about-us': renderAboutUsPage,
      '/profile': () => {
        if (localStorage.getItem('logged')) {
          renderUserProfilePage();
        } else {
          router.navigate('/login');
        }
      },
    })
    .on('/catalog/:productId', (urlId) => {
      if (urlId) {
        const obj = urlId.data;
        const id = obj!.productId;
        renderCatalogDetailedPage(id);
      }
    })
    .on('/catalog', handleCatalogLoading)
    .notFound(render404Page)
    .resolve();
}

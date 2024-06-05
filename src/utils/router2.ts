// import generateCatalog from '../components/catalog/catalog';
import {
  renderMainPage,
  renderLoginPage,
  renderRegisterPage,
  renderCatalogPage,
  renderBlogsPage,
  render404Page,
  renderUserProfilePage,
  renderCatalogDetailedPage,
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
      '/catalog': renderCatalogPage,
      '/blogs': renderBlogsPage,
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
    .on('/catalog/?categories', () => {
      // const catalogCards = document.querySelector('.catalog-cards') as HTMLElement;
      // generateCatalog(catalogCards);
    })
    .notFound(render404Page)
    .resolve();
}

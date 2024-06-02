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
      // [`/catalog/${productId}#`]: () => {
      //   renderCatalogDetailedPage(productId!);
      // },
      '/blogs': renderBlogsPage,
      '/profile': renderUserProfilePage,
    })
    .on('/catalog/:productId', (urlId) => {
      if (urlId) {
        console.log(urlId.data);
        const obj = urlId.data;
        const id = obj!.productId;
        console.log(id);
        renderCatalogDetailedPage(id);
      }
    })
    .notFound(render404Page)
    .resolve();
}

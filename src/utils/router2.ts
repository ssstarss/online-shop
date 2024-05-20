import {
  renderMainPage,
  renderLoginPage,
  renderRegisterPage,
  renderCatalogPage,
  renderBlogsPage,
  render404Page,
} from './pageRenders';
import router from './router';

export default function initRouting() {
  router
    .on({
      '/': renderMainPage,
      '/main': renderMainPage,
      '/login': renderLoginPage,
      '/register': renderRegisterPage,
      '/catalog': renderCatalogPage,
      '/blogs': renderBlogsPage,
    })
    .notFound(render404Page)
    .resolve();
}

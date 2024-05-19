import Navigo from 'navigo';
import {
  renderMainPage,
  renderLoginPage,
  renderRegisterPage,
  renderCatalogPage,
  renderBlogsPage,
  render404Page,
} from './pageRenders';

const root = '/';

const router = new Navigo(root);

router
  .on({
    '/': renderMainPage,
    '/login': renderLoginPage,
    '/register': renderRegisterPage,
    '/catalog': renderCatalogPage,
    '/blogs': renderBlogsPage,
  })
  .notFound(render404Page)
  .resolve();

export default router;

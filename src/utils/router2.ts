import generateCatalog, { productParams } from '../components/catalog/catalog';
import createElement from '../helpers/createElement';
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
    .on('/catalog', async (params) => {
      if (params?.params === null) {
        renderCatalogPage();
        productParams.category = undefined;
        productParams.filterPrice = undefined;
        productParams.searchText = undefined;
        productParams.sort = undefined;
      }
      if (params?.params?.category) {
        const category = params?.params?.category;
        const categoryId = params?.params?.id ? params.params.id.toString() : '';
        const catalogCards = document.querySelector('.catalog-cards') as HTMLElement;
        const categoriesLinks = document.querySelectorAll('.categories__link');
        categoriesLinks.forEach((link) => {
          link.classList.remove('categories__link--active');
        });
        productParams.category = categoryId;

        if (catalogCards) {
          generateCatalog(catalogCards, { category: categoryId });
          const breadcrumbs = document.querySelector('.breadcrumbs');
          const existingBreadcrumbs = breadcrumbs?.querySelectorAll('.breadcrumbs__link');
          if (existingBreadcrumbs && existingBreadcrumbs?.length > 1) {
            existingBreadcrumbs[1].remove();
          }

          const breadcrumb = createElement({
            tag: 'a',
            className: 'breadcrumbs__link',
            href: category,
            textContent: category,
          });
          breadcrumbs?.append(breadcrumb);
        } else {
          await renderCatalogPage({ category: categoryId });
          const activeLink = document.getElementById(categoryId);
          activeLink?.classList.add('categories__link--active');
          const breadcrumbs = document.querySelector('.breadcrumbs');
          const existingBreadcrumbs = breadcrumbs?.querySelectorAll('.breadcrumbs__link');
          if (existingBreadcrumbs && existingBreadcrumbs?.length > 1) {
            existingBreadcrumbs[1].remove();
          }

          const breadcrumb = createElement({
            tag: 'a',
            className: 'breadcrumbs__link',
            href: category,
            textContent: category,
          });
          breadcrumbs?.append(breadcrumb);
        }
      }
    })
    .notFound(render404Page)
    .resolve();
}

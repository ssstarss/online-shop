import { Match } from 'navigo';
import generateCatalog, { productParams } from '../components/catalog/catalog';
import generatePagination from '../components/catalog/pagination';
import createElement from '../helpers/createElement';
import { productState } from '../utils/getProducts';
import { renderCatalogPage } from '../utils/pageRenders';

function resetProductParams() {
  productParams.category = undefined;
  productParams.filterPrice = undefined;
  productParams.searchText = undefined;
  productParams.sort = undefined;
  productParams.pagination = undefined;
}

function updatePagination() {
  const existingPag = document.querySelector('.pagination');
  if (existingPag) {
    existingPag.remove();
  }
  const catalogWrapper = document.querySelector('.catalog-wrapper');
  const pagination = generatePagination(Math.ceil(productState.totalProducts / 6));
  catalogWrapper?.append(pagination);
}

function updateActiveLink(categoryId: string) {
  const categoriesLinks = document.querySelectorAll('.categories__link');
  categoriesLinks.forEach((link) => link.classList.remove('categories__link--active'));

  const activeLink = document.getElementById(categoryId);
  activeLink?.classList.add('categories__link--active');
}

function updateActivePagination(pageNum: number) {
  const paginationBtns = document.querySelectorAll('.pagination__item');
  paginationBtns.forEach((btn) => btn.classList.remove('active'));

  const activeBtn = document.getElementById(`pag-item-${pageNum}`);
  activeBtn?.classList.add('active');
}

export default async function handleCatalogLoading(match: Match | undefined) {
  const limit = 6;
  if (!match || !match.params) {
    resetProductParams();

    try {
      await renderCatalogPage({ pagination: { limit, offset: 0 } });
      updatePagination();
      updateActivePagination(1);
    } catch (error) {
      console.error('Error rendering catalog page:', error);
    }
    return;
  }

  const { category } = match.params;
  const categoryId = match.params.id ? match.params.id.toString() : '';
  productParams.category = categoryId;

  const pageNum = match.params.page ? Number(match.params.page.trim()) : 1;
  const pagination = { limit, offset: (pageNum - 1) * limit };
  productParams.pagination = pagination;

  const catalogCards = document.querySelector('.catalog-cards') as HTMLElement;
  try {
    if (catalogCards) {
      await generateCatalog(catalogCards, productParams);
      updatePagination();
      updateActiveLink(categoryId);
      updateActivePagination(pageNum);
    } else {
      await renderCatalogPage(productParams);
      updatePagination();
      updateActiveLink(categoryId);
      updateActivePagination(pageNum);
    }
  } catch (error) {
    console.error('Error generating or rendering catalog:', error);
  }

  if (category) {
    const breadcrumbs = document.querySelector('.breadcrumbs');
    const existingBreadcrumbs = breadcrumbs?.querySelectorAll('.breadcrumbs__link');
    if (existingBreadcrumbs && existingBreadcrumbs?.length > 1) {
      existingBreadcrumbs[1].remove();
    }

    const breadcrumb = createElement({
      tag: 'a',
      className: 'breadcrumbs__link',
      href: `catalog?category=${category}&id=${categoryId}`,
      textContent: category,
    });
    breadcrumbs?.append(breadcrumb);
  }
}

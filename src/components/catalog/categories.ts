import createElement from '../../helpers/createElement';
import navigate from '../../utils/navigate';
// import getCategories from '../../utils/getCategories';

export default function generateCategories() {
  // const mainCategoriesData = getCategories();
  const categories = ['plants', 'seeds', 'artificial'];
  const categoriesWrapper = createElement({ tag: 'div', className: 'categories' });

  categories.forEach((category) => {
    const link = createElement({ tag: 'a', className: 'categories__link', textContent: category });

    link.addEventListener('click', () => {
      link.classList.add('categories__link--active');
      const path = `?category=${category}`;
      navigate(`catalog/${path}`);
      const breadcrumbs = document.querySelector('.breadcrumbs');
      const breadcrumb = createElement({
        tag: 'a',
        className: 'breadcrumbs__link',
        href: path,
        textContent: category,
      });
      breadcrumbs?.append(breadcrumb);
    });
    categoriesWrapper.append(link);
  });

  return categoriesWrapper;
}

import createElement from '../../helpers/createElement';
import navigate from '../../utils/navigate';
import getCategories from '../../utils/getCategories';

export const categoriesUrRegex = /\/catalog\?category=(.*)/;

export default async function generateCategories() {
  const mainCategoriesData = await getCategories();

  const categoriesWrapper = createElement({ tag: 'div', className: 'categories' });
  for (let index = 0; index < mainCategoriesData.length; index += 1) {
    const category = mainCategoriesData[index];
    const categoryName = category.name['en-US'];
    const path = `?category=${categoryName}&id=${category.id}`;
    const link = createElement({
      tag: 'a',
      className: 'categories__link',
      textContent: categoryName,
      id: category.id,
    });

    link.addEventListener('click', (e) => {
      e.preventDefault();

      navigate(`catalog${path}`);
      link.classList.add('categories__link--active');

      //   // const breadcrumbs = document.querySelector('.breadcrumbs');
      //   // const breadcrumb = createElement({
      //   //   tag: 'a',
      //   //   className: 'breadcrumbs__link',
      //   //   href: path,
      //   //   textContent: category,
      //   // });
      //   // breadcrumbs?.append(breadcrumb);
    });
    categoriesWrapper.append(link);
  }
  // router.updatePageLinks();

  return categoriesWrapper;
}

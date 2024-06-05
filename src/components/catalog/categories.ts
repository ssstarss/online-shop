import createElement from '../../helpers/createElement';
import navigate from '../../utils/navigate';
import getCategories from '../../utils/getCategories';
import closeSidebarOnMomile from '../../utils/closeSidebar';

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
      if (window.innerWidth <= 1024) {
        closeSidebarOnMomile();
      }
    });
    categoriesWrapper.append(link);
  }

  return categoriesWrapper;
}

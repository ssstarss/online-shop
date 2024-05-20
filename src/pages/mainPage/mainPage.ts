import createElement from '../../helpers/createElement';
import './_mainPage.scss';

const mainPage = createElement({ tag: 'section', className: 'main', textContent: 'MAIN PAGE' });
const linksList = createElement({ tag: 'div', className: 'links-list' });
export const mainLink = createElement({
  tag: 'a',
  className: 'links-list__link',
  textContent: 'Main Page',
});
export const loginLinkMain = createElement({
  tag: 'a',
  className: 'links-list__link',
  textContent: 'Log in',
});
export const registerLinkMain = createElement({
  tag: 'a',
  className: 'links-list__link',
  textContent: 'Register',
});
export const catalogLinkMain = createElement({
  tag: 'a',
  className: 'links-list__link',
  textContent: 'Catalog',
});
export const blogsLinkMain = createElement({
  tag: 'a',
  className: 'links-list__link',
  textContent: 'Blogs',
});
mainPage.append(linksList);
linksList.append(mainLink, loginLinkMain, registerLinkMain, catalogLinkMain, blogsLinkMain);

export default mainPage;

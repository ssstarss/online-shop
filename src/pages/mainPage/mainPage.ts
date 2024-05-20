import createElement from '../../helpers/createElement';
import './_mainPage.scss';

const mainPage = createElement({ tag: 'section', className: 'main', textContent: 'MAIN PAGE' });
const linksList = createElement({ tag: 'div', className: 'links-list' });
const mainLink = createElement({
  tag: 'a',
  href: '',
  className: 'links-list__link',
  textContent: 'Main Page',
});
const loginLink = createElement({
  tag: 'a',
  href: '',
  className: 'links-list__link',
  textContent: 'Log in',
});
const registerLink = createElement({
  tag: 'a',
  href: '',
  className: 'links-list__link',
  textContent: 'Register',
});
const catalogLink = createElement({
  tag: 'a',
  href: '',
  className: 'links-list__link',
  textContent: 'Catalog',
});
const blogsLink = createElement({
  tag: 'a',
  href: '',
  className: 'links-list__link',
  textContent: 'Blogs',
});
mainPage.append(linksList);
linksList.append(mainLink, loginLink, registerLink, catalogLink, blogsLink);

export default mainPage;

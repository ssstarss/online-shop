import createElement from '../../helpers/createElement';

export const page404 = createElement({ tag: 'section', className: 'not-found' });
const imgError = createElement({ tag: 'div', className: 'not-found__img' });
const textWrap = createElement({ tag: 'div', className: 'not-found__text-wrap' });
const h2Error = createElement({
  tag: 'h2',
  className: 'not-found__title',
  textContent: '404 Page Not Found :(',
});
const pError = createElement({
  tag: 'h2',
  className: 'not-found__description',
  textContent: 'The request URL was not found on this server.',
});

export const buttonHome = createElement({
  tag: 'button',
  className: 'not-found__home-btn button',
  textContent: 'HOME',
});

textWrap.append(h2Error, pError, buttonHome);
page404.append(imgError, textWrap);

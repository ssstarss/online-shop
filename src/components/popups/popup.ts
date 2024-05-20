import createElement from '../../helpers/createElement';
import './_popup.scss';

export default function generateErrorPopup(error: string) {
  const errorPopupContainer = createElement({ tag: 'div', className: 'error-popup__container' });
  const errorPopup = createElement({ tag: 'div', className: 'error-popup' });
  const closeBtn = createElement({
    tag: 'button',
    className: 'error-popup__close',
    type: 'button',
  });

  const errorMessage = createElement({
    tag: 'p',
    className: 'error-popup__txt',
    textContent: error,
  });
  const { body } = document;

  closeBtn.addEventListener('click', () => {
    errorPopupContainer.remove();
  });
  body.append(errorPopupContainer);
  errorPopupContainer.append(errorPopup);
  errorPopup.append(closeBtn, errorMessage);
  document.addEventListener('click', (e) => {
    if (errorPopupContainer && e.target !== errorPopup && e.target === errorPopupContainer) {
      errorPopupContainer.remove();
    }
  });
}

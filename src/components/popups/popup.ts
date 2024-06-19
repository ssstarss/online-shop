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

export function generateSliderPopup(slider: HTMLElement) {
  const popupContainer = createElement({
    tag: 'div',
    className: ['error-popup__container', 'slider-popup__container'],
  });
  const popup = createElement({ tag: 'div', className: ['error-popup', 'slider-popup'] });
  const closeBtn = createElement({
    tag: 'button',
    className: ['error-popup__close', 'slider-popup__close'],
    type: 'button',
  });

  const { body } = document;

  closeBtn.addEventListener('click', () => {
    popupContainer.remove();
  });
  body.append(popupContainer);
  popupContainer.append(popup);
  popup.append(closeBtn, slider);
  document.addEventListener('click', (e) => {
    if (popupContainer && e.target !== popup && e.target === popupContainer) {
      popupContainer.remove();
    }
  });
}

import createElement from '../../helpers/createElement';
import { deleteCart } from '../cart/cartProductItem';
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

  let { body } = document;

  if (!body) {
    body = document.createElement('body');
    document.append(body);
  }

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

export function generateClearCartPopup() {
  const popupContainer = createElement({
    tag: 'div',
    className: ['error-popup__container', 'clear-cart-popup__container'],
  });
  const popup = createElement({ tag: 'div', className: ['error-popup', 'clear-cart-popup'] });
  const closeBtn = createElement({
    tag: 'button',
    className: ['error-popup__close', 'clear-cart-popup__close'],
    type: 'button',
  });
  const popupMessage = createElement({
    tag: 'p',
    className: 'clear-cart-popup__txt',
    textContent: 'Are you sure you want to clear your cart?',
  });
  const popupBtns = createElement({ tag: 'div', className: 'clear-cart-popup__btns' });
  const cancelBtn = createElement({
    tag: 'button',
    className: 'clear-cart-popup__cancel-btn',
    textContent: 'Cancel',
  });
  const removeBtn = createElement({
    tag: 'button',
    className: 'clear-cart-popup__clear-btn',
    textContent: 'Clear Cart',
  });

  cancelBtn.addEventListener('click', () => {
    popupContainer.remove();
  });

  removeBtn.addEventListener('click', async () => {
    deleteCart(popupContainer);
  });

  popupBtns.append(cancelBtn, removeBtn);

  const { body } = document;

  closeBtn.addEventListener('click', () => {
    popupContainer.remove();
  });
  body.append(popupContainer);
  popupContainer.append(popup);
  popup.append(closeBtn, popupMessage, popupBtns);
  document.addEventListener('click', (e) => {
    if (popupContainer && e.target !== popup && e.target === popupContainer) {
      popupContainer.remove();
    }
  });
}

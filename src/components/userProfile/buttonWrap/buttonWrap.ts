import createElement from '../../../helpers/createElement';

export const buttonWrap = createElement({ tag: 'div', className: 'button-wrap' });

export const buttonChange = createElement({
  tag: 'button',
  className: 'button-change button',
  textContent: 'Change',
});

export const buttonSaveChange = createElement({
  tag: 'button',
  className: 'button-save-change button',
  textContent: 'Save Change',
});

buttonSaveChange.disabled = true;
buttonSaveChange.classList.add('disable-btn');

buttonWrap.append(buttonChange, buttonSaveChange);

import createElement from '../../helpers/createElement';
import './_btns.scss';

function generateSubmitBtn(classNames: string | string[], btnText: string) {
  const btn = createElement({ tag: 'button', className: classNames, type: 'submit' });
  btn.textContent = btnText;
  return btn;
}

export default generateSubmitBtn;

import { checkDateValidity, checkTextValidity } from '../utils/checkValidity';

import BaseComponentParams from '../interfaces/baseComponentParams';

export default class BaseComponent {
  element: HTMLElement | HTMLInputElement;

  tip = '';

  pattern = /[\w]/;

  isValid = false;

  constructor(params: BaseComponentParams) {
    this.element = document.createElement(params.tag);
    if (params.tip) this.tip = params.tip;
    if (params.pattern) this.pattern = params.pattern;
    this.createElement(params);
  }

  getElement() {
    return this.element;
  }

  addElement(...args: BaseComponent[]) {
    args.forEach((element) => {
      if (element instanceof BaseComponent) {
        this.element.append(element.getElement());
      } else {
        this.element.append(element);
      }
      if (element.tip) {
        const tip = new BaseComponent({
          tag: 'p',
          classNames: ['errorTip'],
          text: element.tip,
        });
        this.element.appendChild(tip.element);
      }
    });
  }

  createElement(params: BaseComponentParams) {
    this.element = document.createElement(params.tag);
    this.setCssClasses(params.classNames);
    this.setTextContent(params.text);
    if (params.id) this.element.id = params.id;

    if (params.callback) this.element.onclick = params.callback;
    if (params.tag === 'input') {
      if (params.type) (this.element as HTMLInputElement).type = params.type;
      if (params.placeholder) (this.element as HTMLInputElement).placeholder = params.placeholder;
      if (params.value) (this.element as HTMLInputElement).value = params.value;
      if (this.element)
        this.element.onchange = () => {
          if (this.checkValidity()) (this.element.nextSibling as HTMLElement).style.opacity = '0%';
          else (this.element.nextSibling as HTMLElement).style.opacity = '100%';
        };
    }
  }

  checkValidity() {
    if ((this.element as HTMLInputElement).type === 'password') {
      this.isValid = checkTextValidity((this.element as HTMLInputElement).value, this.pattern);
      return this.isValid;
    }

    if ((this.element as HTMLInputElement).type === 'date') {
      this.isValid = checkDateValidity((this.element as HTMLInputElement).value);
      return this.isValid;
    }

    if ((this.element as HTMLInputElement).type === 'text') {
      this.isValid = checkTextValidity((this.element as HTMLInputElement).value, this.pattern);
      return this.isValid;
    }
    return false;
  }

  setCssClasses(cssClasses = ['']) {
    cssClasses.map((cssClass) => this.element.classList.add(cssClass));
  }

  setTextContent(text = '') {
    this.element.textContent = text;
  }
}

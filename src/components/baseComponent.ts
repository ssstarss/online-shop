export interface BaseComponentParams {
  tag: string;
  id?: string;
  classNames: Array<string>;
  text?: string;
  callback?: () => void;
}

export class BaseComponent {
  element: HTMLElement | HTMLInputElement;

  constructor(params: BaseComponentParams) {
    this.element = document.createElement(params.tag);
    this.createElement(params);
  }

  getElement() {
    return this.element;
  }

  addElement(...args: HTMLElement[] | BaseComponent[]) {
    args.forEach((element) => {
      if (element instanceof BaseComponent) {
        this.element.append(element.getElement());
      } else {
        this.element.append(element);
      }
    });
  }

  createElement(params: BaseComponentParams) {
    this.element = document.createElement(params.tag);
    this.setCssClasses(params.classNames);
    this.setTextContent(params.text);
    if (params.callback) this.element.onclick = params.callback;
    // if (params.callback) this.setCallback(params.callback);
  }

  setCssClasses(cssClasses = ['']) {
    cssClasses.map((cssClass) => this.element.classList.add(cssClass));
  }

  setTextContent(text = '') {
    this.element.textContent = text;
  }

  /* setCallback(callback) {
    if (typeof callback === 'function') {
      this.element.addEventListener('click', (event) => callback(event));
    }
  } */
}

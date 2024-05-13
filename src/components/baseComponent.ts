export interface BaseComponentParams {
  tag: string;
  id?: string;
  classNames: Array<string>;
  text?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  value?: string;
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
    if (params.tag === 'input') {
      if (params.type) (this.element as HTMLInputElement).type = params.type;
      if (params.required) (this.element as HTMLInputElement).required = params.required;
      if (params.placeholder) (this.element as HTMLInputElement).placeholder = params.placeholder;
      if (params.pattern) (this.element as HTMLInputElement).pattern = params.pattern;
      if (params.value) (this.element as HTMLInputElement).value = params.value;
    }
  }

  setCssClasses(cssClasses = ['']) {
    cssClasses.map((cssClass) => this.element.classList.add(cssClass));
  }

  setTextContent(text = '') {
    this.element.textContent = text;
  }
}

import { BaseComponent, BaseComponentParams } from './baseComponent';

export interface InputFieldParams extends BaseComponentParams {
  type: string;
  required: boolean;
  placeholder: string;
  pattern: string;
}
export default class BaseInputComponent extends BaseComponent {
  constructor(params: InputFieldParams) {
    super({
      tag: 'input',
      classNames: params.classNames,
    });
    // this.element = document.createElement('input');

    (this.element as HTMLInputElement).type = params.type;
    (this.element as HTMLInputElement).required = params.required;
    (this.element as HTMLInputElement).placeholder = params.placeholder;
    (this.element as HTMLInputElement).pattern = params.pattern;
    if (params.callback) this.element.oninput = params.callback;
  }

  /* setCallback(callback: Function) {
    if (typeof callback === 'function') {
      this.element.addEventListener('keyup', (event) => callback(event));
    }
  } */
}

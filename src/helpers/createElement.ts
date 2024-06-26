interface ElementParams<K extends keyof HTMLElementTagNameMap> {
  tag: K;
  className: string | string[];
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  href?: string;
  target?: string;
  textContent?: string;
  src?: string;
  title?: string;
  value?: string;
  for?: string;
  id?: string;
  step?: string;
  min?: string;
  max?: string;
}

const createElement = <K extends keyof HTMLElementTagNameMap>(
  params: ElementParams<K>
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(params.tag);
  if (params.textContent) {
    element.textContent = params.textContent;
  }
  if (params.id) {
    element.id = params.id;
  }
  if (Array.isArray(params.className)) {
    element.className = params.className.join(' ');
  } else {
    element.className = params.className;
  }
  switch (params.tag) {
    case 'input':
      if (params.type) {
        element.setAttribute('type', params.type);
      }
      if (params.placeholder) {
        (element as HTMLInputElement).placeholder = params.placeholder;
      }
      if (params.required) {
        (element as HTMLInputElement).required = true;
      }
      if (params.id) {
        (element as HTMLElement).id = params.id;
      }
      if (params.step) {
        (element as HTMLInputElement).step = params.step;
      }
      if (params.min) {
        (element as HTMLInputElement).min = params.min;
      }
      if (params.max) {
        (element as HTMLInputElement).max = params.max;
      }
      if (params.value) {
        (element as HTMLInputElement).value = params.value;
      }
      break;
    case 'button':
      if (params.type) {
        element.setAttribute('type', params.type);
      }
      if (params.disabled) {
        (element as HTMLButtonElement).disabled = true;
      }
      break;
    case 'a':
      if (params.href) {
        (element as HTMLAnchorElement).href = params.href;
      }
      if (params.target) {
        (element as HTMLAnchorElement).target = params.target;
      }
      break;
    case 'img':
      if (params.src) {
        (element as HTMLImageElement).src = params.src;
      }
      if (params.title) {
        (element as HTMLAnchorElement).title = params.title;
      }
      break;
    case 'option':
      if (params.value) {
        (element as HTMLOptionElement).value = params.value;
      }
      if (params.title) {
        (element as HTMLAnchorElement).title = params.title;
      }
      break;
    case 'label':
      if (params.for) {
        (element as HTMLLabelElement).htmlFor = params.for;
      }
      break;
    default:
      break;
  }

  return element;
};

export default createElement;

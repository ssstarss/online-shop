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
  for?: string;
  id?: string;
}

const createElement = <K extends keyof HTMLElementTagNameMap>(
  params: ElementParams<K>
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(params.tag);
  if (params.textContent) {
    element.textContent = params.textContent;
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

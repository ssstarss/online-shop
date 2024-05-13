const createElement = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string | string[],
  type?: string,
  placeholder?: string,
  required?: boolean,
  disabled?: boolean,
  href?: string,
  target?: string
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tag);
  if (Array.isArray(className)) {
    element.className = className.join(' ');
  } else {
    element.className = className;
  }
  switch (tag) {
    case 'input':
      if (type) {
        element.setAttribute('type', type);
      }
      if (placeholder) {
        (element as HTMLInputElement).placeholder = placeholder;
      }
      if (required) {
        (element as HTMLInputElement).required = true;
      }
      break;
    case 'button':
      if (type) {
        element.setAttribute('type', type);
      }
      if (disabled) {
        (element as HTMLButtonElement).disabled = true;
      }
      break;
    case 'a':
      if (href) {
        (element as HTMLAnchorElement).href = href;
      }
      if (target) {
        (element as HTMLAnchorElement).target = target;
      }
      break;
    default:
      break;
  }

  return element;
};

export default createElement;

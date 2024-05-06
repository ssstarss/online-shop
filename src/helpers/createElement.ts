const createElement = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  type?: string,
  placeholder?: string,
  required?: boolean,
  disabled?: boolean
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tag);
  element.className = className;

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
    default:
      break;
  }

  return element;
};

export default createElement;

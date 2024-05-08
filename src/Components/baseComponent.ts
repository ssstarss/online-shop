export type Props = {
  tag?: string;
  txt?: string;
  className?: string;
  id?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  callback?: (e: Event | null) => void;
};

export class Component<T extends HTMLElement | HTMLInputElement> {
  public node: T;

  constructor(p: Props) {
    this.node = document.createElement(p.tag ?? 'div') as T;
    this.node.innerHTML = p.txt || '';
    this.node.className = p.className || '';
    this.node.id = p.id || '';
    this.node.innerHTML = p.txt ? p.txt : '';
    if (p.callback) this.node.onclick = p.callback;
    if (this.node instanceof HTMLInputElement) {
      this.node.required = p.required ? p.required : false;
      this.node.placeholder = p.placeholder ? p.placeholder : '';
      this.node.pattern = p.pattern ? p.pattern : '';
      this.node.type = p.type ? p.type : '';
      if (p.callback) this.node.oninput = p.callback;
    }
  }

  add(element: Component<HTMLElement>): void {
    this.node.append(element.node);
  }
}

export default interface BaseComponentParams {
  tag: string;
  id?: string;
  classNames: Array<string>;
  text?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  pattern?: RegExp;
  value?: string;
  tip?: string;
  callback?: () => void;
}

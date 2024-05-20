import './adressesBlock.css';
import Adress from './adressBlock';
import BaseComponent from '../../helpers/baseComponent';

export default class AdressesBlock extends BaseComponent {
  shippingAdress: Adress;

  billingAdress: Adress;

  useSameChkBox: BaseComponent;

  constructor() {
    super({
      tag: 'div',
      classNames: ['adressesBlock'],
    });

    const useSameWrapper = new BaseComponent({
      tag: 'div',
      classNames: ['useSameWrapper'],
    });

    const useSameText = new BaseComponent({
      tag: 'a',
      classNames: ['useSameText'],
      text: 'Use the same adress for billing',
    });

    this.useSameChkBox = new BaseComponent({
      tag: 'input',
      classNames: ['useSameChkBox'],
      type: 'checkbox',
      callback: () => this.hideBillingAdress(),
    });
    useSameWrapper.addElement(useSameText, this.useSameChkBox);

    this.shippingAdress = new Adress('shipping');
    this.billingAdress = new Adress('billing');
    this.addElement(this.shippingAdress, useSameWrapper, this.billingAdress);
  }

  hideBillingAdress() {
    const elements = this.billingAdress.element.childNodes;
    if ((this.useSameChkBox.element as HTMLInputElement).checked) {
      [].forEach.call(elements, (elem: HTMLElement) => {
        const item = elem;
        item.style.display = 'none';
      });
      (elements[elements.length - 1] as HTMLElement).style.display = 'flex';
    } else {
      [].forEach.call(elements, (elem: HTMLElement) => {
        const item = elem;
        item.style.display = 'flex';
      });
    }
  }
}

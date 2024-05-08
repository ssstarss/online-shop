import { Component } from '../baseComponent';
import { IProduct } from '../../interfaces/interfaces';
import './productCard.css';
export default class ProductCard extends Component<HTMLElement> {
  product: IProduct;
  constructor(product: IProduct) {
    super({
      tag: 'div',
      className: 'productCardWrapper',
    });
    this.product = product;

    const productImg = new Component({
      tag: 'img',
      className: 'productImg',
    });
    this.add(productImg);
    productImg.node.setAttribute(
      'src',
      this.product.masterData.current.masterVariant.images[0].url
    );

    const productName = new Component({
      tag: 'div',
      className: 'productName',
      txt: this.product.masterData.current.name['en-US'],
    });
    this.add(productName);

    const productPrice = new Component({
      tag: 'div',
      className: 'productPrice',
      txt:
        (
          this.product.masterData.current.masterVariant.prices[0].value.centAmount / 100
        ).toString() + '$',
    });
    this.add(productPrice);
  }
}

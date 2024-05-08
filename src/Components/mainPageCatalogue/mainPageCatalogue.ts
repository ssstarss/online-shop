import { Component } from '../baseComponent';
import { IProduct, IProducts } from '../../interfaces/interfaces';
import ProductCard from '../productCard/productCard';
import sdkProductsList from '../../Functions/sdkRequests';
import './mainPageCatalogue.css';

export default class MainPageCatalogue extends Component<HTMLElement> {
  //products: IProducts;
  constructor() {
    super({
      tag: 'div',
      className: 'MainPageCatalogue',
      id: 'MainPageCatalogue',
    });

    const leftSideWrapper = new Component({
      tag: 'div',
      className: 'MainPageCatalogue',
      id: 'MainPageCatalogue',
    });
    this.add(leftSideWrapper);

    const rightSideWrapper = new Component({
      tag: 'div',
      className: 'rightSideWrapper',
      id: 'rightSideWrapper',
    });
    this.add(rightSideWrapper);

    const sortingAndFilters = new Component({
      tag: 'div',
      className: 'sortingAndFilters',
      id: 'sortingAndFilters',
    });
    rightSideWrapper.add(sortingAndFilters);

    const productsList = new Component({
      tag: 'div',
      className: 'productsList',
      id: 'productsList',
    });
    rightSideWrapper.add(productsList);
    sdkProductsList().then((response: { body: IProducts }) => {
      response.body.results.forEach((product) => {
        const productCard = new ProductCard(product);
        productsList.add(productCard);
      });
    });
  }
}

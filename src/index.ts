import { IProduct, IProducts, IResponse } from './interfaces/interfaces';
import returnProductByKey from './Functions/sdkRequests';
import { Component } from './Components/baseComponent';
import MainBanner from './Components/mainBanner/mainBanner';
import MainPageCatalogue from './Components/mainPageCatalogue/mainPageCatalogue';
import './main.css';

const body = document.getElementsByTagName('body')[0];

const mainWrapper = new Component<HTMLElement>({
  tag: 'div',
  className: 'mainWrapper',
  id: 'mainWrapper',
});
body.append(mainWrapper.node);

const mainBanner = new MainBanner();
mainWrapper.add(mainBanner);

const mainPageCatalogue = new MainPageCatalogue();
mainWrapper.add(mainPageCatalogue);

/*returnProductByKey()
  .then((response: IResponse) => {
    const products: IProducts = response.body;
    products.results.forEach((product: IProduct) =>
      console.log(product.masterData.current.name['en-US'])
    );
  })

  .catch(console.error);*/

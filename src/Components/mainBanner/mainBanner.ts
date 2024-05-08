import { Component } from '../baseComponent';
import './mainBanner.css';
//import { createCustomer } from '../../Functions/sdkRequests';

export default class MainBanner extends Component<HTMLElement> {
  constructor() {
    super({
      tag: 'div',
      className: 'mainBanner',
      id: 'mainBanner',
    });

    const mainBannerInfo = new Component({
      tag: 'div',
      className: 'mainBannerInfo',
      id: 'mainBannerInfo',
    });
    this.add(mainBannerInfo);

    const mainBannerWelcome = new Component({
      tag: 'p',
      className: 'mainBannerWelcome',
      id: 'mainBannerWelcome',
      txt: 'Welcome to GreenShop',
    });
    mainBannerInfo.add(mainBannerWelcome);

    const mainBannerSlogan = new Component({
      tag: 'p',
      className: 'mainBannerSlogan',
      id: 'mainBannerSlogan',
      txt: 'LET’S MAKE A' + '<br />' + ' BETTER ' + `<span class = 'sloganGreen'>PLANET</span>`,
    });
    mainBannerInfo.add(mainBannerSlogan);

    const mainBannerDescription = new Component({
      tag: 'p',
      className: 'mainBannerDescription',
      id: 'mainBannerDescription',
      txt:
        'We are an online plant shop offering a wide range of cheap and trendy plants. Use' +
        '<br />' +
        'our plants to create an unique Urban Jungle. Order your favorite plants!',
    });
    mainBannerInfo.add(mainBannerDescription);

    const mainBannerButton = new Component({
      tag: 'button',
      className: 'mainBannerButton',
      id: 'mainBannerButton',
      txt: 'SHOP NOW',
    });
    mainBannerInfo.add(mainBannerButton);

    const mainBannerImgWrapper = new Component({
      tag: 'div',
      className: 'mainBannerImgWrapper',
      id: 'mainBannerImgWrapper',
    });
    this.add(mainBannerImgWrapper);

    const mainBannerImgBig = new Component({
      tag: 'div',
      className: 'mainBannerImgBig',
      id: 'mainBannerImgBig',
    });
    mainBannerImgWrapper.add(mainBannerImgBig);
  }
}

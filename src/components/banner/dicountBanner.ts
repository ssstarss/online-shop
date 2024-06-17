import { DiscountCode } from '@commercetools/platform-sdk';
import createElement from '../../helpers/createElement';

export default function generateDiscountBanner(discountsData: DiscountCode) {
  const banner = createElement({ tag: 'article', className: 'discount-banner' });
  const promocode = createElement({
    tag: 'span',
    className: 'discount-banner__promo',
    textContent: discountsData.code,
  });

  const bannerTxt = createElement({
    tag: 'p',
    className: 'discount-banner__txt',
    textContent: `Use promocode to get 10% off your total cart `,
  });
  bannerTxt.append(promocode);

  banner.append(bannerTxt);
  return banner;
}

import swiperContainer from '../../components/previewMainPage/swiperSlider';

import createElement from '../../helpers/createElement';
import './_mainPage.scss';

const mainPage = createElement({ tag: 'section', className: 'main' });

mainPage.append(swiperContainer);

export default mainPage;

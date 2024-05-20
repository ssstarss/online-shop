import BaseComponent from '../../../../helpers/baseComponent';
import navigate from '../../../../utils/navigate';
import './popUpMessage.css';

export default class PopUpMessage extends BaseComponent {
  popUpMessage: BaseComponent;

  registered = false;

  constructor() {
    super({
      tag: 'div',
      classNames: ['modalWrapper'],
    });

    this.popUpMessage = new BaseComponent({
      tag: 'p',
      classNames: ['popUpMessage'],
      text: 'Error',
    });
    this.addElement(this.popUpMessage);

    const closeMessageButton = new BaseComponent({
      tag: 'button',
      classNames: ['button', 'closeMessageButton'],
      text: `Close`,
    });
    this.addElement(closeMessageButton);

    closeMessageButton.element.addEventListener('click', () => {
      const body = document.getElementsByTagName('body');
      body[0].style.overflow = 'scroll';
      this.element.style.display = 'none';
      const popUpMessageCanvas = document.getElementById('popUpMessageCanvas');
      if (popUpMessageCanvas) popUpMessageCanvas.style.display = 'none';
      if (this.registered) navigate('/main');
    });
  }

  showMessage(message: string, registered: boolean) {
    this.registered = registered;
    this.popUpMessage.setTextContent(message);

    const body = document.getElementsByTagName('body');
    body[0].style.overflow = 'hidden';
    const popUpMessageCanvas = document.getElementById('popUpMessageCanvas');
    if (popUpMessageCanvas) popUpMessageCanvas.style.display = 'block';
    this.element.style.display = 'flex';
  }

  setErrorMessage(message: string) {
    this.popUpMessage.setTextContent(message);
  }
}

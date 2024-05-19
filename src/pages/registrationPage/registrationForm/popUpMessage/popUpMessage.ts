import BaseComponent from '../../../../components/baseComponent';
import './popUpMessage.css';

export default class PopUpMessage extends BaseComponent {
  popUpMessage: BaseComponent;

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
      const errorCanvas = document.getElementById('errorCanvas');
      if (errorCanvas) errorCanvas.style.display = 'none';
    });
  }

  showMessage(message: string) {
    this.popUpMessage.setTextContent(message);
    const body = document.getElementsByTagName('body');
    body[0].style.overflow = 'hidden';
    const errorCanvas = document.getElementById('errorCanvas');
    if (errorCanvas) errorCanvas.style.display = 'block';
    this.element.style.display = 'flex';
  }

  setErrorMessage(message: string) {
    this.popUpMessage.setTextContent(message);
  }
}

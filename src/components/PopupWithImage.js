import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(selector) { 
    super(selector);
  }

  open(cardPhoto, cardTitle) {
    super.open();
    this._popup.querySelector('.popup__image').src = cardPhoto;
    this._popup.querySelector('.popup__inscription').textContent = cardTitle;
  }

}
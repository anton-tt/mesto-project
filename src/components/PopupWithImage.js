import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(selector) { 
    super(selector);
    
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupInscription = this._popup.querySelector('.popup__inscription');
  }

  open(cardPhoto, cardTitle) {
    super.open();
    this._popupImage.src = cardPhoto;
    this._popupImage.alt = cardTitle;
    this._popupInscription.textContent = cardTitle;
  }

}
export default class Popup {

  constructor(selector) { 
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleButtonClose = this._handleButtonClose.bind(this);
    this._handlePopupClose = this._handlePopupClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened'); 
    this.removeEventListeners;
  } 

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleButtonClose(event) {
    if (event.target.classList.contains('popup__close-button')) {
      this.close();
    }
  }

  _handlePopupClose(event) {
    if (event.target.classList.contains('popup_opened')) {
      this.close(); 
    }
  }

  setEventListeners() {
    document.addEventListener('keyup', this._handleEscClose);  
    this._popup.addEventListener('click',  this._handleButtonClose);
    document.addEventListener('click',  this._handlePopupClose);
  }

  removeEventListeners() {
    document.removeEventListener('keyup', this._handleEscClose);   
    this._popup.removeEventListener('click', this._handleButtonClose);
    document.removeEventListener('click', this._handlePopupClose);
  }

}
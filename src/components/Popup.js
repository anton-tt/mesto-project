export default class Popup {

  constructor(selector) { 
    this._popup = document.querySelector(selector);
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
    document.addEventListener('keyup', (event) => { this._handleEscClose(event) });  
    this._popup.addEventListener('click', (event) => { this._handleButtonClose(event) });
    document.addEventListener('click', (event) => { this._handlePopupClose(event) } );
  }

  removeEventListeners() {
    document.removeEventListener('keyup', (event) => { this._handleEscClose(event) });   
    this._popup.removeEventListener('click', (event) => { this._handleButtonClose(event) });
    document.removeEventListener('click', (event) => { this._handlePopupClose(event) } );
  }

}
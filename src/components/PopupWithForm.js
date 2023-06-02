import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor(selector, submit) { 
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__info');
    this._button = this._popup.querySelector('.popup__button-save');
  }

  close() {
    super.close();
    this._form.reset();
  }
  
    // метод, который собирает данные всех полей формы
  _getInputValues() {
    this._dataInputs = {};
    this._inputs.forEach((input) => {  
      this._dataInputs[input.name] = input.value;
    });
    return this._dataInputs;
  }

  _handleSubmit(event) {
      event.preventDefault();
      this._submit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => { this._handleSubmit(event) });
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener('submit', (event) => { this._handleSubmit(event) });
  }

  setInputValues(dataInputs) {
    this._inputs.forEach((input) => {  
      input.value = dataInputs[input.name];
    });
  }

  setTitleButtonSave(title) {
    this._button.textContent = title;
  }

}
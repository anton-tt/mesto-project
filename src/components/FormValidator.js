export default class FormValidator {
    
    /* конструктор принимает объект настроек с селекторами и классами формы (параметр 1), 
    элемент той формы, которая валидируется (параметр 2); */
  constructor (validation, formElement) { 
    this._validation = validation;
    this._formElement = formElement;
  }

  _showInputError = (inputElement, errorMessage) => { 
    /* получаем элемент с текстом об ошибке, визуализируем его и добавляем текст в сообщение пользователю */ 
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(this._validation.errorClass);
    errorElement.textContent = errorMessage;
    /* выделяем поле с невалидными данными */
    inputElement.classList.add(this._validation.inputErrorClass);  
  };

  _hideInputError = (inputElement) => {
    /* получаем элемент с текстом об ошибке, скрываем его и удаляем текст в сообщении пользователю */ 
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._validation.errorClass);
    errorElement.textContent = '';
    /* снимаем выделение с поля с невалидными данными */
    inputElement.classList.remove(this._validation.inputErrorClass); 
  }; 

    /* задаём функцию, которая снимет с полей формы выделения */
  hideFormError = () => {
    /* получаем поля формы */
    const inputList = Array.from(this._formElement.querySelectorAll(this._validation.inputSelector));
    /* для каждого поля вызываем функцию, которая скроет ошибку */
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      console.log(inputElement);
    });
  }; 

    /* задаём функцию, которая проверит наличие у формы невалидных полей (до первого true) */
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

    /* задаём функцию, которая принимает DOM-элемент кнопки формы и инактивирует её */ 
  disabledButtonSave = (buttonElement) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(this._validation.inactiveButtonClass);
  };

    /* задаём функцию, которая изменяет состояние кнопки формы в зависимости от валидности её полей */
  _toggleButtonState = (inputList, buttonElement) => {
    /* если есть невалидное поле формы, то кнопка блокирована */
    if (this._hasInvalidInput(inputList)) {
      this.disabledButtonSave(buttonElement);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._validation.inactiveButtonClass);
    }
  }; 
  
    /* задаём функцию, которая проверит валидность поля формы */
  _isValid = (inputElement) => {
    /* сначала проверяем данные требованиями регулярных выражений */
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorText);
    } else {
      inputElement.setCustomValidity("");
    }
  
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }; 
  
    /* задаём фукцию, которая добавляет полям формы обработчик события */
  _setEventListeners = () => {
    /* получаем поля формы */
    const inputList = Array.from(this._formElement.querySelectorAll(this._validation.inputSelector));
    const buttonElement = this._formElement.querySelector(this._validation.submitButtonSelector);
    /* каждому полю добавляем обработчик события input и вызываем функции, проверяющую его валидность 
     и изменяющую в зависимости от этого состояние кнопки формы */
     this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }; 
  
  enableValidation = () => {
    this._setEventListeners(); 
  }
  
}
export default class FormValidator {
    
    /* конструктор принимает объект настроек с селекторами и классами формы (параметр 1), 
    элемент той формы, которая валидируется (параметр 2); */
  constructor (validation, formElement) { 
    this._validation = validation;
    this._formElement = formElement;
    /* получаем поля формы, кнопку "Сохранить" */
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validation.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._validation.submitButtonSelector);
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
    /* для каждого поля вызываем функцию, которая скроет ошибку */
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      console.log(inputElement);
    });
  }; 

    /* задаём функцию, которая проверит наличие у формы невалидных полей (до первого true) */
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

    /* задаём функцию, которая принимает DOM-элемент кнопки формы и инактивирует её */ 
  disabledButtonSave = () => {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._validation.inactiveButtonClass);
  };

    /* задаём функцию, которая изменяет состояние кнопки формы в зависимости от валидности её полей */
  _toggleButtonState = () => {
    /* если есть невалидное поле формы, то кнопка блокирована */
    if (this._hasInvalidInput()) {
      this.disabledButtonSave();
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._validation.inactiveButtonClass);
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
      /* каждому полю добавляем обработчик события input и вызываем функции, проверяющую его валидность 
      и изменяющую в зависимости от этого состояние кнопки формы */
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }; 

  enableValidation = () => {
    this._setEventListeners(); 
  }
  
}
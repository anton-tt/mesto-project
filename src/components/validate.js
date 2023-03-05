import { initialCards, validation, page, popupEditProfile, popupAddCard, popupPhoto, profile, profileButtonEdit, profileButtonAdd, profileUserName, profileUserProfession,
  formUser, userNameForm, userProfForm, formLocation, locPlaceForm, locLinkForm, popupCloseButtonEdit, popupCloseButtonAdd, popupCloseButtonPhoto, elements, elementsCards, 
  popupImage, popupInscription, cardElementTemplate } from './constants.js';
 
  /*import { openPopupEdit, openPopupAdd, openPopupPhoto, changeLike, deleteCard, createCard, addCard, closePopupEdit, editInfoProfile,
    submitEditProfileForm, closePopupAdd, submitAddCardForm, closePopupPhoto } from './index.js';*/

    import {  openPopup, closePopup, openPopupPhoto, closePopupPhoto} from './modal.js';
    import {  createCard, addCard, changeLike, deleteCard }  from './card.js';

  /* задаём две функции, которая выделит поле формы с невалидными данными и которая снимет выделение */
const showInputError = (formElement, inputElement, errorMessage, object) => { 
    /* получаем элемент с текстом об ошибке, визуализируем его и добавляем текст в сообщение пользователю */ 
  const errorElement = formElement.querySelector(`.popup__errorInput_id_${inputElement.id}`);
  errorElement.classList.add(object.errorClass);
  errorElement.textContent = errorMessage;
    /* выделяем поле с невалидными данными */
  inputElement.classList.add(object.inputErrorClass);  
};
  
const hideInputError = (formElement, inputElement, object) => {
    /* получаем элемент с текстом об ошибке, скрываем его и удаляем текст в сообщении пользователю */ 
  const errorElement = formElement.querySelector(`.popup__errorInput_id_${inputElement.id}`);
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
    /* снимаем выделение с поля с невалидными данными */
  inputElement.classList.remove(object.inputErrorClass); 
}; 
  
  /* задаём функцию, которая проверит наличие у формы невалидных полей (до первого true) */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 
  
  /* задаём функцию, которая изменяет состояние кнопки формы в зависимости от валидности её полей */
  const toggleButtonState = (inputList, buttonElement, object) => {
    /* если есть невалидное поле формы, то кнопка блокирована */
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(object.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(object.inactiveButtonClass);
    }
  }; 
  
  /* задаём функцию, которая проверит валидность поля формы */
  const isValid = (formElement, inputElement, object) => {
    /* сначала проверяем данные требованиями регулярных выражений */
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorText);
    } else {
      inputElement.setCustomValidity("");
    }
  
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, object);
    } else {
      hideInputError(formElement, inputElement, object);
    }
  }; 
  
  /* задаём фукцию, которая добавляет полям формы обработчик события */
  const setEventListeners = (formElement, object) => {
    /* получаем поля формы */
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
    const buttonElement = formElement.querySelector(object.submitButtonSelector);
   // toggleButtonState(inputList, buttonElement, object);
    /* каждому полю добавляем обработчик события input и вызываем функции, проверяющую его валидность 
    и изменяющую в зависимости от этого состояние кнопки формы */
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, object);
        toggleButtonState(inputList, buttonElement, object);
      });
    });
  }; 
  
  export const enableValidation = (object) => {
    /* получаем все формы */
    const formList = Array.from(document.querySelectorAll(object.formSelector));
    /* для каждой формы вызываем функцию, которая добавит её полям обработчики событий */
    formList.forEach((formElement) => {
      setEventListeners(formElement, object);
    });
  };
  